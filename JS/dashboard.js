/**
 * User Dashboard Functions
 * Handles dashboard page functionality
 */

let currentTab = 'cars';
let allCars = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('dashboard.html')) {
        initDashboard();
    }
});

function initDashboard() {
    // Check auth
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load user name
    const user = getCurrentUser();
    if (user) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = user.name;
        }
    }
    
    // Load cars
    loadCars();
    
    // Load brands for filter
    loadBrands();
    
    // Load bookings
    loadUserBookings();
    
    // Set up search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterCars);
    }
}

// Load all cars
function loadCars() {
    allCars = getAllCars();
    renderCars(allCars);
}

// Render cars
function renderCars(cars) {
    const carsGrid = document.getElementById('carsGrid');
    const noCars = document.getElementById('noCars');
    
    if (!carsGrid) return;
    
    if (cars.length === 0) {
        carsGrid.innerHTML = '';
        if (noCars) noCars.style.display = 'block';
        return;
    }
    
    if (noCars) noCars.style.display = 'none';
    carsGrid.innerHTML = cars.map(car => renderCarCard(car)).join('');
}

// Load brands for filter
function loadBrands() {
    const brands = getUniqueBrands();
    const brandSelect = document.getElementById('filterBrand');
    
    if (brandSelect) {
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }
}

// Filter cars
function filterCars() {
    const search = document.getElementById('searchInput')?.value || '';
    const brand = document.getElementById('filterBrand')?.value || '';
    const price = document.getElementById('filterPrice')?.value || '';
    const transmission = document.getElementById('filterTransmission')?.value || '';
    
    const filters = {
        search,
        brand,
        price,
        transmission
    };
    
    const filtered = filterCars(allCars, filters);
    renderCars(filtered);
}

// Reset filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterBrand').value = '';
    document.getElementById('filterPrice').value = '';
    document.getElementById('filterTransmission').value = '';
    renderCars(allCars);
}

// Switch tab
function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tab === 'cars') {
        document.getElementById('carsTab').classList.add('active');
    } else if (tab === 'bookings') {
        document.getElementById('bookingsTab').classList.add('active');
        loadUserBookings();
    }
}

// Load user bookings
function loadUserBookings() {
    if (!isLoggedIn()) return;
    
    const user = getCurrentUser();
    if (!user) return;
    
    const bookings = getUserBookings(user.id);
    const bookingsList = document.getElementById('bookingsList');
    const noBookings = document.getElementById('noBookings');
    
    if (!bookingsList) return;
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '';
        if (noBookings) noBookings.style.display = 'block';
        return;
    }
    
    if (noBookings) noBookings.style.display = 'none';
    bookingsList.innerHTML = bookings.map(booking => renderBookingItem(booking)).join('');
}

// Open car modal
function openCarModal(carId) {
    const car = getCarById(carId);
    if (!car) return;
    
    const modal = document.getElementById('carModal');
    const content = document.getElementById('carModalContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <h2>${car.name}</h2>
        <img src="${car.image}" alt="${car.name}" style="width: 100%; border-radius: 12px; margin: 1rem 0;">
        <p><strong>Brand:</strong> ${car.brand}</p>
        <p><strong>Type:</strong> ${car.type}</p>
        <p><strong>Price:</strong> $${car.pricePerDay}/day</p>
        <p><strong>Seats:</strong> ${car.seats}</p>
        <p><strong>Transmission:</strong> ${car.transmission}</p>
        <p><strong>Fuel Type:</strong> ${car.fuelType}</p>
        <button class="btn btn-primary" onclick="closeCarModal(); openBookingModal('${car.id}')" style="margin-top: 1rem;">Book Now</button>
    `;
    
    modal.classList.add('active');
}

// Close car modal
function closeCarModal() {
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Open booking modal
function openBookingModal(carId) {
    const car = getCarById(carId);
    if (!car) return;
    
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    
    document.getElementById('bookingCarId').value = carId;
    document.getElementById('bookingCarName').value = car.name;
    
    // Set dates from search if available
    const searchCriteria = JSON.parse(localStorage.getItem('searchCriteria') || '{}');
    if (searchCriteria.pickupDate) {
        document.getElementById('bookingPickupDate').value = searchCriteria.pickupDate;
    }
    if (searchCriteria.dropoffDate) {
        document.getElementById('bookingReturnDate').value = searchCriteria.dropoffDate;
    }
    
    validateBookingDates();
    modal.classList.add('active');
}

// Close booking modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.getElementById('bookingForm').reset();
}

// Validate booking dates
function validateBookingDates() {
    const pickupDate = document.getElementById('bookingPickupDate').value;
    const returnDate = document.getElementById('bookingReturnDate').value;
    const carId = document.getElementById('bookingCarId').value;
    const errorDiv = document.getElementById('bookingError');
    
    if (!pickupDate || !returnDate) {
        document.getElementById('bookingTotalPrice').value = '$0.00';
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
        return;
    }
    
    if (!validateDateRange(pickupDate, returnDate)) {
        if (errorDiv) {
            errorDiv.textContent = 'Return date must be after pickup date';
            errorDiv.style.display = 'block';
        }
        document.getElementById('bookingTotalPrice').value = '$0.00';
        return;
    }
    
    if (!isCarAvailable(carId, pickupDate, returnDate)) {
        if (errorDiv) {
            errorDiv.textContent = 'Car is not available for selected dates';
            errorDiv.style.display = 'block';
        }
        document.getElementById('bookingTotalPrice').value = '$0.00';
        return;
    }
    
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    
    const total = calculateBookingTotal(carId, pickupDate, returnDate);
    document.getElementById('bookingTotalPrice').value = `$${total.toFixed(2)}`;
}

// Handle booking submission
function handleBooking(event) {
    event.preventDefault();
    
    if (!isLoggedIn()) {
        showAlert('Please login to book a car', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    const user = getCurrentUser();
    const carId = document.getElementById('bookingCarId').value;
    const pickupDate = document.getElementById('bookingPickupDate').value;
    const returnDate = document.getElementById('bookingReturnDate').value;
    
    // Validate dates
    if (!validateDateRange(pickupDate, returnDate)) {
        showAlert('Return date must be after pickup date', 'error');
        return;
    }
    
    if (!isCarAvailable(carId, pickupDate, returnDate)) {
        showAlert('Car is not available for selected dates', 'error');
        return;
    }
    
    // Create booking
    const booking = createBooking({
        userId: user.id,
        carId,
        pickupDate,
        returnDate,
        total: calculateBookingTotal(carId, pickupDate, returnDate)
    });
    
    if (booking) {
        showAlert('Booking confirmed successfully!', 'success');
        closeBookingModal();
        loadUserBookings();
        switchTab('bookings');
    } else {
        showAlert('Failed to create booking', 'error');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const carModal = document.getElementById('carModal');
    const bookingModal = document.getElementById('bookingModal');
    
    if (event.target === carModal) {
        closeCarModal();
    }
    if (event.target === bookingModal) {
        closeBookingModal();
    }
}
