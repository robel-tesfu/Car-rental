/**
 * Admin Dashboard Functions
 * Handles admin dashboard functionality
 */

let currentAdminTab = 'cars';

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin-dashboard.html')) {
        initAdminDashboard();
    }
});

function initAdminDashboard() {
    // Check admin auth
    if (!isAdminLoggedIn()) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Load stats
    loadStats();
    
    // Load cars
    loadAdminCars();
    
    // Load bookings
    loadAllBookings();
}

// Load statistics
function loadStats() {
    const cars = getAllCars();
    const bookings = getAllBookings();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    document.getElementById('totalCars').textContent = cars.length;
    document.getElementById('totalBookings').textContent = bookings.length;
    document.getElementById('totalUsers').textContent = users.length;
}

// Load cars for admin
function loadAdminCars() {
    const cars = getAllCars();
    const carsGrid = document.getElementById('adminCarsGrid');
    
    if (!carsGrid) return;
    
    if (cars.length === 0) {
        carsGrid.innerHTML = '<p class="no-results">No cars available. Add your first car!</p>';
        return;
    }
    
    carsGrid.innerHTML = cars.map(car => renderAdminCarCard(car)).join('');
}

// Render admin car card
function renderAdminCarCard(car) {
    return `
        <div class="car-card">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}">
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
                        <span>💰</span>
                        <span>$${car.pricePerDay}/day</span>
                    </div>
                    <div class="car-detail">
                        <span>👥</span>
                        <span>${car.seats} Seats</span>
                    </div>
                </div>
                <div class="car-footer" style="flex-direction: column; gap: 0.5rem; align-items: stretch;">
                    <button class="btn btn-primary" onclick="editCar('${car.id}')">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteCarConfirm('${car.id}')">Delete</button>
                </div>
            </div>
        </div>
    `;
}

// Switch admin tab
function switchAdminTab(tab) {
    currentAdminTab = tab;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tab === 'cars') {
        document.getElementById('carsAdminTab').classList.add('active');
    } else if (tab === 'bookings') {
        document.getElementById('bookingsAdminTab').classList.add('active');
        loadAllBookings();
    }
}

// Open add car modal
function openAddCarModal() {
    document.getElementById('carFormTitle').textContent = 'Add New Car';
    document.getElementById('carForm').reset();
    document.getElementById('carFormId').value = '';
    document.getElementById('carFormModal').classList.add('active');
}

// Edit car
function editCar(carId) {
    const car = getCarById(carId);
    if (!car) return;
    
    document.getElementById('carFormTitle').textContent = 'Edit Car';
    document.getElementById('carFormId').value = car.id;
    document.getElementById('carName').value = car.name;
    document.getElementById('carBrand').value = car.brand;
    document.getElementById('carType').value = car.type;
    document.getElementById('carPrice').value = car.pricePerDay;
    document.getElementById('carSeats').value = car.seats;
    document.getElementById('carFuel').value = car.fuelType;
    document.getElementById('carTransmission').value = car.transmission;
    document.getElementById('carImage').value = car.image;
    
    document.getElementById('carFormModal').classList.add('active');
}

// Close car form modal
function closeCarFormModal() {
    document.getElementById('carFormModal').classList.remove('active');
    document.getElementById('carForm').reset();
}

// Handle car form submission
function handleCarSubmit(event) {
    event.preventDefault();
    
    const carId = document.getElementById('carFormId').value;
    const formData = {
        name: document.getElementById('carName').value.trim(),
        brand: document.getElementById('carBrand').value.trim(),
        type: document.getElementById('carType').value,
        pricePerDay: parseFloat(document.getElementById('carPrice').value),
        seats: parseInt(document.getElementById('carSeats').value),
        fuelType: document.getElementById('carFuel').value,
        transmission: document.getElementById('carTransmission').value,
        image: document.getElementById('carImage').value.trim()
    };
    
    // Validate
    const validation = validateCarForm(formData);
    if (!validation.isValid) {
        showAlert(validation.errors.join(', '), 'error');
        return;
    }
    
    let result;
    if (carId) {
        // Update existing car
        result = updateCar(carId, formData);
        if (result) {
            showAlert('Car updated successfully!', 'success');
        }
    } else {
        // Add new car
        result = addCar(formData);
        if (result) {
            showAlert('Car added successfully!', 'success');
        }
    }
    
    if (result) {
        closeCarFormModal();
        loadAdminCars();
        loadStats();
    } else {
        showAlert('Failed to save car', 'error');
    }
}

// Delete car confirmation
function deleteCarConfirm(carId) {
    if (confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
        if (deleteCar(carId)) {
            showAlert('Car deleted successfully', 'success');
            loadAdminCars();
            loadStats();
        } else {
            showAlert('Failed to delete car', 'error');
        }
    }
}

// Load all bookings for admin
function loadAllBookings() {
    const bookings = getAllBookings();
    const bookingsList = document.getElementById('adminBookingsList');
    
    if (!bookingsList) return;
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p class="no-results">No bookings found.</p>';
        return;
    }
    
    bookingsList.innerHTML = bookings.map(booking => {
        const car = getCarById(booking.carId);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.id === booking.userId);
        
        if (!car || !user) return '';
        
        return `
            <div class="booking-item">
                <div class="booking-info">
                    <h3>${car.name}</h3>
                    <p><strong>User:</strong> ${user.name} (${user.email})</p>
                    <p><strong>Pickup:</strong> ${formatDate(booking.pickupDate)}</p>
                    <p><strong>Return:</strong> ${formatDate(booking.returnDate)}</p>
                    <p><strong>Total:</strong> $${booking.total.toFixed(2)}</p>
                </div>
                <span class="booking-status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
            </div>
        `;
    }).join('');
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('carFormModal');
    if (event.target === modal) {
        closeCarFormModal();
    }
}
