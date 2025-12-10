/**
 * Main JavaScript
 * Handles homepage functionality
 */

// Load featured cars on homepage
function loadFeaturedCars() {
    const carsGrid = document.getElementById('featuredCarsGrid');
    if (!carsGrid) return;
    
    const cars = getAllCars();
    const featured = cars.slice(0, 6); // Show first 6 cars
    
    if (featured.length === 0) {
        carsGrid.innerHTML = '<p class="no-results">No cars available at the moment.</p>';
        return;
    }
    
    carsGrid.innerHTML = featured.map(car => renderCarCard(car)).join('');
}

// Check authentication status
function checkAuthStatus() {
    if (isLoggedIn()) {
        const dashboardLink = document.getElementById('dashboardLink');
        if (dashboardLink) {
            dashboardLink.style.display = 'inline-flex';
        }
        
        const user = getCurrentUser();
        if (user) {
            // Update any user-specific UI elements
        }
    }
}

// View car details
function viewCarDetails(carId) {
    window.location.href = `pages/car-details.html?id=${carId}`;
}
