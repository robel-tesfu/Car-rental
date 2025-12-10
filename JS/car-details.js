/**
 * Car Details Page Functions
 * Handles car details page functionality
 */

// Initialize car details page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('car-details.html')) {
        loadCarDetails();
    }
});

function loadCarDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    
    if (!carId) {
        window.location.href = '../index.html';
        return;
    }
    
    const car = getCarById(carId);
    if (!car) {
        showAlert('Car not found', 'error');
        window.location.href = '../index.html';
        return;
    }
    
    renderCarDetails(car);
    loadRelatedCars(car);
}

// Render car details
function renderCarDetails(car) {
    const content = document.getElementById('carDetailsContent');
    if (!content) return;
    
    content.innerHTML = `
        <div class="car-details-wrapper">
            <div class="car-image-main">
                <img src="${car.image}" alt="${car.name}" id="mainCarImage">
            </div>
            <div class="car-info-main">
                <div class="car-header-details">
                    <div>
                        <h1 class="car-name-large">${car.name}</h1>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${car.brand}</p>
                    </div>
                    <div class="car-price-large">$${car.pricePerDay}<span style="font-size: 1rem; color: var(--text-secondary);">/day</span></div>
                </div>
                
                <div class="key-features">
                    <h3>Key Features</h3>
                    <div class="features-grid-details">
                        <div class="feature-item">
                            <div class="feature-icon-small">👥</div>
                            <div>
                                <div class="feature-label">Seats</div>
                                <div class="feature-value">${car.seats}</div>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon-small">⚙️</div>
                            <div>
                                <div class="feature-label">Transmission</div>
                                <div class="feature-value">${car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}</div>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon-small">⛽</div>
                            <div>
                                <div class="feature-label">Fuel Type</div>
                                <div class="feature-value">${car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}</div>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon-small">🚗</div>
                            <div>
                                <div class="feature-label">Type</div>
                                <div class="feature-value">${car.type.charAt(0).toUpperCase() + car.type.slice(1)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="book-action" style="margin-top: 2rem;">
                    ${isLoggedIn() 
                        ? `<a href="dashboard.html" class="btn btn-primary btn-large">Book Now</a>`
                        : `<a href="login.html" class="btn btn-primary btn-large">Login to Book</a>`
                    }
                </div>
            </div>
        </div>
    `;
    
    // Store car ID for booking
    if (isLoggedIn()) {
        localStorage.setItem('selectedCarId', car.id);
    }
}

// Load related cars
function loadRelatedCars(currentCar) {
    const cars = getAllCars();
    const related = cars
        .filter(car => car.id !== currentCar.id && car.type === currentCar.type)
        .slice(0, 3);
    
    const relatedGrid = document.getElementById('relatedCarsGrid');
    if (!relatedGrid) return;
    
    if (related.length === 0) {
        relatedGrid.innerHTML = '<p class="no-results">No related cars found.</p>';
        return;
    }
    
    relatedGrid.innerHTML = related.map(car => renderCarCard(car)).join('');
}
