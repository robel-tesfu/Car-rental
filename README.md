# DriveEasy - Full-Featured Car Rental Website

A modern, fully responsive car rental website with dark/light mode, user authentication, admin dashboard, and complete booking system. Built with HTML, CSS, and JavaScript using LocalStorage for data persistence.

## 🎨 Features

### Design
- **Modern Minimal UI**: Clean, stylish design with smooth animations
- **Dark/Light Mode**: Toggle between themes with preference saved in localStorage
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Beautiful Images**: High-quality car images from Unsplash

### User Features
- **User Registration & Login**: Secure authentication system
- **Browse Cars**: View all available cars with filters
- **Search & Filter**: Filter by brand, price, transmission type
- **Car Details**: Detailed view with specifications
- **Booking System**: Book cars with date validation
- **Booking History**: View and manage your bookings
- **Profile Management**: Update profile and change password

### Admin Features
- **Admin Dashboard**: Complete admin panel
- **Car Management**: Add, edit, and delete cars
- **View All Bookings**: Monitor all user bookings
- **Statistics**: View total cars, bookings, and users

### Technical Features
- **LocalStorage**: All data stored in browser localStorage
- **Form Validation**: Comprehensive input validation
- **Date Validation**: Prevent booking conflicts
- **Session Management**: Secure session handling
- **Modular Code**: Organized JavaScript modules

## 📁 Project Structure

```
car-rental-full/
├── index.html              # Landing page
├── pages/
│   ├── login.html          # User login
│   ├── register.html       # User registration
│   ├── admin-login.html    # Admin login
│   ├── dashboard.html      # User dashboard
│   ├── admin-dashboard.html # Admin dashboard
│   ├── profile.html        # User profile
│   └── car-details.html    # Car details page
├── css/
│   └── styles.css          # Main stylesheet with dark/light mode
├── js/
│   ├── utils.js           # Utility functions
│   ├── theme.js            # Theme management
│   ├── validation.js       # Form validation
│   ├── auth.js             # Authentication
│   ├── cars.js             # Car management
│   ├── bookings.js         # Booking management
│   ├── main.js             # Homepage functionality
│   ├── dashboard.js        # User dashboard
│   ├── admin-dashboard.js  # Admin dashboard
│   ├── profile.js          # Profile management
│   └── car-details.js      # Car details page
└── README.md
```

## 🚀 Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **No build process required**: Everything works out of the box!

Or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 👤 Default Credentials

### Admin Login
- **Email**: `admin@admin.com`
- **Password**: `admin123`

### User Registration
- Create a new account from the registration page
- Or use any email/password (minimum 6 characters)

## 📋 Pages Overview

### 1. Landing Page (`index.html`)
- Hero section with search bar
- Featured cars section
- Why choose us section
- Contact information

### 2. User Login (`pages/login.html`)
- Email and password login
- Remember me option
- Link to registration
- Link to admin login

### 3. User Registration (`pages/register.html`)
- Full name, email, phone, password
- Form validation
- Terms & conditions checkbox

### 4. Admin Login (`pages/admin-login.html`)
- Admin credentials
- Separate from user login

### 5. User Dashboard (`pages/dashboard.html`)
- Browse all cars
- Search and filter cars
- Book cars
- View booking history
- Cancel bookings

### 6. Admin Dashboard (`pages/admin-dashboard.html`)
- Statistics overview
- Manage cars (Add/Edit/Delete)
- View all bookings
- User management

### 7. Profile Page (`pages/profile.html`)
- Update profile information
- Change password
- Theme settings

### 8. Car Details (`pages/car-details.html`)
- Large car image
- Detailed specifications
- Related cars section
- Book now button

## 🎨 Theme System

The website supports both light and dark modes:
- Toggle using the theme button in the navigation
- Preference is saved in localStorage
- Smooth transitions between themes

## 💾 LocalStorage Structure

```javascript
{
  users: [],           // Registered users
  admin: {},           // Admin credentials
  cars: [],            // Car inventory
  bookings: [],        // All bookings
  theme: "light",      // Current theme
  session: {},         // User session
  adminSession: {}     // Admin session
}
```

## ✅ Form Validations

- **Email**: Valid email format
- **Password**: Minimum 6 characters
- **Phone**: Valid phone number format
- **Required Fields**: All required fields must be filled
- **Date Range**: Return date must be after pickup date
- **Car Availability**: Prevents double booking

## 🎯 Key Features

### Booking System
- Date validation
- Conflict detection
- Price calculation
- Booking history

### Car Management
- Add new cars with images
- Edit car details
- Delete cars
- Filter and search

### User Management
- Registration
- Login/Logout
- Profile updates
- Password change

## 🔧 Customization

### Adding More Cars
Use the admin dashboard to add cars, or edit `js/utils.js` to add default cars.

### Changing Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary: #3b82f6;
    --primary-dark: #2563eb;
    /* ... */
}
```

### Modifying Default Admin
Edit `js/utils.js` in the `initLocalStorage()` function.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Notes

- This is a **frontend-only** implementation
- All data is stored in browser localStorage
- Data persists across sessions
- Perfect for portfolio or demonstration purposes
- In production, integrate with a backend API

## 🚗 Sample Cars

The website comes with 6 sample cars:
- Toyota Camry (Economy)
- BMW 3 Series (Luxury)
- Toyota RAV4 (SUV)
- Porsche 911 (Sports)
- Tesla Model 3 (Luxury)
- Mercedes-Benz C-Class (Luxury)

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ using HTML, CSS, and JavaScript**
