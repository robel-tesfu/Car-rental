/**
 * Car Management Functions
 * Handles car CRUD operations and display
 */

// Get all cars
function getAllCars() {
    return JSON.parse(localStorage.getItem('cars') || '[]');
}

// Get car by ID
function getCarById(carId) {
    const cars = getAllCars();
    return cars.find(car => car.id === carId);
}

// Add new car
function addCar(carData) {
    const cars = getAllCars();
    const newCar = {
        id: generateId(),
        ...carData,
        createdAt: new Date().toISOString()
    };
    cars.push(newCar);
    localStorage.setItem('cars', JSON.stringify(cars));
    return newCar;
}

// Update car
function updateCar(carId, carData) {
    const cars = getAllCars();
    const index = cars.findIndex(car => car.id === carId);
    
    if (index === -1) {
        return null;
    }
    
    cars[index] = {
        ...cars[index],
        ...carData,
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('cars', JSON.stringify(cars));
    return cars[index];
}

// Delete car
function deleteCar(carId) {
    const cars = getAllCars();
    const filteredCars = cars.filter(car => car.id !== carId);
    localStorage.setItem('cars', JSON.stringify(filteredCars));
    return true;
}

// Render car card
function renderCarCard(car) {
    return `
        <div class="car-card" onclick="viewCarDetails('${car.id}')">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${car.name.replace(' ', '+')}'">
            </div>
            <div class="car-info">
                <div class="car-header">
                    <div>
                        <div class="car-name">${car.name}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">${car.brand}</div>
                    </div>
                    <span class="car-category">${car.type}</span>
                </div>
                <div class="car-details">
                    <div class="car-detail">
                        <span>👥</span>
                        <span>${car.seats} Seats</span>
                    </div>
                    <div class="car-detail">
                        <span>⚙️</span>
                        <span>${car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}</span>
                    </div>
                    <div class="car-detail">
                        <span>⛽</span>
                        <span>${car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}</span>
                    </div>
                </div>
                <div class="car-footer">
                    <div class="car-price">
                        $${car.pricePerDay}<span>/day</span>
                    </div>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openBookingModal('${car.id}')">Book Now</button>
                </div>
            </div>
        </div>
    `;
}

// Filter cars
function filterCars(cars, filters) {
    let filtered = [...cars];
    
    // Search filter
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(car => 
            car.name.toLowerCase().includes(searchTerm) ||
            car.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    // Brand filter
    if (filters.brand) {
        filtered = filtered.filter(car => car.brand === filters.brand);
    }
    
    // Price filter
    if (filters.price) {
        const [min, max] = filters.price.split('-').map(p => p === '+' ? Infinity : parseInt(p));
        filtered = filtered.filter(car => {
            if (max === Infinity) {
                return car.pricePerDay >= min;
            }
            return car.pricePerDay >= min && car.pricePerDay <= max;
        });
    }
    
    // Transmission filter
    if (filters.transmission) {
        filtered = filtered.filter(car => car.transmission === filters.transmission);
    }
    
    return filtered;
}

// Get unique brands from cars
function getUniqueBrands() {
    const cars = getAllCars();
    const brands = [...new Set(cars.map(car => car.brand))];
    return brands.sort();
}
