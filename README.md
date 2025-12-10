Full-Featured Car Rental Website

A modern, fully responsive car rental website with dark/light mode, user authentication, admin dashboard, and complete booking system. Built with HTML, CSS, and JavaScript using LocalStorage for data persistence.


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
