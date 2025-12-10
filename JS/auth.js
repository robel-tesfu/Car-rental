/**
 * Authentication Functions
 * Handles user and admin authentication
 */

// Register new user
function registerUser(name, email, phone, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return {
            success: false,
            message: 'Email already registered'
        };
    }
    
    // Validate inputs
    if (!validateEmail(email)) {
        return {
            success: false,
            message: 'Invalid email format'
        };
    }
    
    if (!validatePassword(password)) {
        return {
            success: false,
            message: 'Password must be at least 6 characters'
        };
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name,
        email,
        phone,
        password, // In production, this should be hashed
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return {
        success: true,
        message: 'Registration successful'
    };
}

// Login user
function loginUser(email, password, rememberMe = false) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return {
            success: false,
            message: 'Invalid email or password'
        };
    }
    
    // Create session
    const expires = rememberMe 
        ? Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
        : Date.now() + (24 * 60 * 60 * 1000); // 1 day
    
    const session = {
        userId: user.id,
        email: user.email,
        expires
    };
    
    localStorage.setItem('session', JSON.stringify(session));
    
    return {
        success: true,
        message: 'Login successful',
        user
    };
}

// Login admin
function loginAdmin(email, password) {
    const admin = JSON.parse(localStorage.getItem('admin') || '{}');
    
    if (admin.email !== email || admin.password !== password) {
        return {
            success: false,
            message: 'Invalid admin credentials'
        };
    }
    
    // Create admin session
    const expires = Date.now() + (24 * 60 * 60 * 1000); // 1 day
    
    const session = {
        adminId: admin.id,
        email: admin.email,
        expires
    };
    
    localStorage.setItem('adminSession', JSON.stringify(session));
    
    return {
        success: true,
        message: 'Admin login successful'
    };
}

// Logout user
function logoutUser() {
    localStorage.removeItem('session');
    window.location.href = '../index.html';
}

// Logout admin
function logoutAdmin() {
    localStorage.removeItem('adminSession');
    window.location.href = '../index.html';
}

// Check authentication status and redirect if needed
function checkAuthStatus() {
    const currentPage = window.location.pathname;
    
    // Pages that require authentication
    const protectedPages = ['dashboard.html', 'profile.html'];
    const adminPages = ['admin-dashboard.html'];
    
    const isProtected = protectedPages.some(page => currentPage.includes(page));
    const isAdminPage = adminPages.some(page => currentPage.includes(page));
    
    if (isProtected && !isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    if (isAdminPage && !isAdminLoggedIn()) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Show dashboard link if logged in
    if (isLoggedIn()) {
        const dashboardLink = document.getElementById('dashboardLink');
        if (dashboardLink) {
            dashboardLink.style.display = 'inline-flex';
        }
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        logoutUser();
    }
}

// Handle admin logout
function handleAdminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        logoutAdmin();
    }
}
