/**
 * Booking Management Functions
 * Handles booking operations
 */

// Get all bookings
function getAllBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}

// Get user bookings
function getUserBookings(userId) {
    const bookings = getAllBookings();
    return bookings.filter(booking => booking.userId === userId);
}

// Create booking
function createBooking(bookingData) {
    const bookings = getAllBookings();
    const newBooking = {
        id: generateId(),
        ...bookingData,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return newBooking;
}

// Cancel booking
function cancelBooking(bookingId) {
    const bookings = getAllBookings();
    const index = bookings.findIndex(b => b.id === bookingId);
    
    if (index === -1) {
        return false;
    }
    
    bookings[index].status = 'cancelled';
    bookings[index].cancelledAt = new Date().toISOString();
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return true;
}

// Calculate booking total
function calculateBookingTotal(carId, pickupDate, returnDate) {
    const car = getCarById(carId);
    if (!car) return 0;
    
    const days = calculateDays(pickupDate, returnDate);
    const subtotal = days * car.pricePerDay;
    const tax = subtotal * 0.10; // 10% tax
    return subtotal + tax;
}

// Render booking item
function renderBookingItem(booking) {
    const car = getCarById(booking.carId);
    if (!car) return '';
    
    const pickupDate = formatDate(booking.pickupDate);
    const returnDate = formatDate(booking.returnDate);
    const days = calculateDays(booking.pickupDate, booking.returnDate);
    const total = calculateBookingTotal(booking.carId, booking.pickupDate, booking.returnDate);
    
    return `
        <div class="booking-item">
            <div class="booking-info">
                <h3>${car.name}</h3>
                <p><strong>Pickup:</strong> ${pickupDate}</p>
                <p><strong>Return:</strong> ${returnDate}</p>
                <p><strong>Duration:</strong> ${days} day(s)</p>
                <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            </div>
            <div>
                <span class="booking-status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                ${booking.status === 'active' ? `<button class="btn btn-secondary" onclick="cancelBooking('${booking.id}')" style="margin-top: 0.5rem;">Cancel</button>` : ''}
            </div>
        </div>
    `;
}

// Cancel booking handler
function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        if (cancelBooking(bookingId)) {
            showAlert('Booking cancelled successfully', 'success');
            // Reload bookings if on dashboard
            if (typeof loadUserBookings === 'function') {
                loadUserBookings();
            }
        } else {
            showAlert('Failed to cancel booking', 'error');
        }
    }
}
