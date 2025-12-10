/**
 * Utility Functions
 * Common helper functions used across the application
 */

// Initialize app - set minimum dates and load theme
function initApp() {
    setMinDate();
    loadTheme();
    setupNavigation();
}

// Set minimum date for date inputs
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (input) {
            input.setAttribute('min', today);
        }
    });
}

// Setup navigation menu toggle
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `
        <span>${getAlertIcon(type)}</span>
        <span>${message}</span>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 5000);
}

// Get alert icon based on type
function getAlertIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️'
    };
    return icons[type] || 'ℹ️';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Calculate days between two dates
function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Load theme from localStorage
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

// Update theme icon
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Check if user is logged in
function isLoggedIn() {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session.userId && session.expires > Date.now();
}

// Check if admin is logged in
function isAdminLoggedIn() {
    const session = JSON.parse(localStorage.getItem('adminSession') || '{}');
    return session.adminId && session.expires > Date.now();
}

// Get current user
function getCurrentUser() {
    if (!isLoggedIn()) return null;
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(u => u.id === session.userId) || null;
}

// Get current admin
function getCurrentAdmin() {
    if (!isAdminLoggedIn()) return null;
    const session = JSON.parse(localStorage.getItem('adminSession') || '{}');
    return session;
}

// Initialize localStorage with default data
function initLocalStorage() {
    // Initialize users array
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    
    // Initialize admin
    if (!localStorage.getItem('admin')) {
        const defaultAdmin = {
            id: 'admin1',
            email: 'admin@admin.com',
            password: 'admin123',
            name: 'Admin User'
        };
        localStorage.setItem('admin', JSON.stringify(defaultAdmin));
    }
    
    // Initialize cars array with sample data
    if (!localStorage.getItem('cars') || JSON.parse(localStorage.getItem('cars')).length === 0) {
        const sampleCars = [
            {
                id: generateId(),
                name: 'Toyota Camry',
                brand: 'Toyota',
                type: 'economy',
                pricePerDay: 45,
                seats: 5,
                fuelType: 'petrol',
                transmission: 'automatic',
                image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'
            },
            {
                id: generateId(),
                name: 'BMW 3 Series',
                brand: 'BMW',
                type: 'luxury',
                pricePerDay: 120,
                seats: 5,
                fuelType: 'petrol',
                transmission: 'automatic',
                image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'
            },
            {
                id: generateId(),
                name: 'Toyota RAV4',
                brand: 'Toyota',
                type: 'suv',
                pricePerDay: 65,
                seats: 5,
                fuelType: 'hybrid',
                transmission: 'automatic',
                image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'
            },
            {
                id: generateId(),
                name: 'Porsche 911',
                brand: 'Porsche',
                type: 'sports',
                pricePerDay: 250,
                seats: 2,
                fuelType: 'petrol',
                transmission: 'automatic',
                image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'
            },
            {
                id: generateId(),
                name: 'Tesla Model 3',
                brand: 'Tesla',
                type: 'luxury',
                pricePerDay: 95,
                seats: 5,
                fuelType: 'electric',
                transmission: 'automatic',
                image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80'
            },
            {
                id: generateId(),
                name: 'Mercedes-Benz C-Class',
                brand: 'Mercedes-Benz',
                type: 'luxury',
                pricePerDay: 135,
                seats: 5,
                fuelType: 'petrol',
                transmission: 'automatic',
                image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80'
            }
        ];
        localStorage.setItem('cars', JSON.stringify(sampleCars));
    }
    
    // Initialize bookings array
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
    }
    
    // Initialize theme
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'light');
    }
    
    // Initialize session
    if (!localStorage.getItem('session')) {
        localStorage.setItem('session', JSON.stringify({}));
    }
    
    // Initialize admin session
    if (!localStorage.getItem('adminSession')) {
        localStorage.setItem('adminSession', JSON.stringify({}));
    }
}

// Call initialization on load
if (typeof window !== 'undefined') {
    initLocalStorage();
}
