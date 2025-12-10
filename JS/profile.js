/**
 * Profile Management Functions
 * Handles user profile updates
 */

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('profile.html')) {
        initProfile();
    }
});

function initProfile() {
    // Check auth
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load user data
    const user = getCurrentUser();
    if (user) {
        document.getElementById('profileName').value = user.name;
        document.getElementById('profileEmail').value = user.email;
        document.getElementById('profilePhone').value = user.phone;
    }
    
    // Load theme
    const theme = localStorage.getItem('theme') || 'light';
    document.getElementById('currentTheme').textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
}

// Handle profile update
function handleProfileUpdate(event) {
    event.preventDefault();
    
    if (!isLoggedIn()) {
        showAlert('Please login to update profile', 'error');
        return;
    }
    
    const user = getCurrentUser();
    if (!user) return;
    
    const name = document.getElementById('profileName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    
    // Validate
    if (name.length < 3) {
        showAlert('Name must be at least 3 characters', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('Invalid email format', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showAlert('Invalid phone number', 'error');
        return;
    }
    
    // Check if email is already taken by another user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailTaken = users.find(u => u.email === email && u.id !== user.id);
    
    if (emailTaken) {
        showAlert('Email already taken by another user', 'error');
        return;
    }
    
    // Update user
    const updatedUser = {
        ...user,
        name,
        email,
        phone,
        updatedAt: new Date().toISOString()
    };
    
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update session
        const session = JSON.parse(localStorage.getItem('session') || '{}');
        session.email = email;
        localStorage.setItem('session', JSON.stringify(session));
        
        showAlert('Profile updated successfully!', 'success');
    } else {
        showAlert('Failed to update profile', 'error');
    }
}

// Handle password change
function handlePasswordChange(event) {
    event.preventDefault();
    
    if (!isLoggedIn()) {
        showAlert('Please login to change password', 'error');
        return;
    }
    
    const user = getCurrentUser();
    if (!user) return;
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    // Validate current password
    if (currentPassword !== user.password) {
        showAlert('Current password is incorrect', 'error');
        return;
    }
    
    // Validate new password
    if (!validatePassword(newPassword)) {
        showAlert('New password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        showAlert('New passwords do not match', 'error');
        return;
    }
    
    // Update password
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword; // In production, hash this
        users[userIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        showAlert('Password changed successfully!', 'success');
        document.getElementById('passwordForm').reset();
    } else {
        showAlert('Failed to change password', 'error');
    }
}
