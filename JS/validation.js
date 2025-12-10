/**
 * Form Validation Functions
 * Validates user inputs for forms
 */

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password (minimum 6 characters)
function validatePassword(password) {
    return password.length >= 6;
}

// Validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Validate required fields
function validateRequired(value) {
    return value.trim().length > 0;
}

// Validate date range (end date must be after start date)
function validateDateRange(startDate, endDate) {
    if (!startDate || !endDate) return false;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end > start;
}

// Check if car is available for booking dates
function isCarAvailable(carId, pickupDate, returnDate) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const activeBookings = bookings.filter(booking => 
        booking.carId === carId && 
        booking.status === 'active'
    );
    
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    
    // Check for overlapping bookings
    for (const booking of activeBookings) {
        const bookingPickup = new Date(booking.pickupDate);
        const bookingReturn = new Date(booking.returnDate);
        
        // Check if dates overlap
        if (
            (pickup >= bookingPickup && pickup <= bookingReturn) ||
            (returnD >= bookingPickup && returnD <= bookingReturn) ||
            (pickup <= bookingPickup && returnD >= bookingReturn)
        ) {
            return false;
        }
    }
    
    return true;
}

// Validate car form
function validateCarForm(formData) {
    const errors = [];
    
    if (!validateRequired(formData.name)) {
        errors.push('Car name is required');
    }
    
    if (!validateRequired(formData.brand)) {
        errors.push('Brand is required');
    }
    
    if (!formData.pricePerDay || formData.pricePerDay < 1) {
        errors.push('Price per day must be at least $1');
    }
    
    if (!formData.seats || formData.seats < 2 || formData.seats > 8) {
        errors.push('Seats must be between 2 and 8');
    }
    
    if (!formData.image || !formData.image.startsWith('http')) {
        errors.push('Valid image URL is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}
