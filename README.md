# Series Recommendation (Client-side Demo)

A lightweight static web app that provides a login/register UI and a series recommendation dashboard with category browsing, search, and favorites.

## 📦 Project structure

- `login.html` - Entry point with login and register forms.
- `cat.html` - Main dashboard listing categories, top-rated series, global search, and favorites.
- `cat1.html` - Category 1 page (Action & Thriller series).
- `cat2.html` - Category 2 page (Drama & Fantasy series).
- `style.css` - Shared styling (dark/light themes, glassmorphism, responsive layout, buttons).
- `script.js` - Shared client-side logic (auth flow, theme persistence, search, favorites, navigation).
- Image assets (`*.jpeg`) used in cards and branding.

## 🚀 Features

- Mock login and registration (no backend)
- Theme toggle (dark/light) persisted in `localStorage`
- Dashboard welcome message from registered user in `localStorage`
- Series cards with ratings, seasons, description
- Category navigation buttons to 2 category pages
- Live search in dashboard and category pages
- Favorite toggle (heart button) persisted to `localStorage`
- Favorites screen filtering

## 🧠 In-browser storage keys

- `series_theme`: `light` or `dark`
- `series_username`: name of the user from registration
- `series_favorites`: JSON array of series titles

## ▶️ How to run

1. Open `login.html` in your browser.
2. Register with name/email/password (password minimum 6 characters).
3. You will be redirected to `cat.html`.
4. Explore categories, search, and add favorites.
5. Refresh page to verify persistence.

## 🛠 Development notes

- `script.js` handles DOM events for all pages, so any added page should align with ID/class conventions.
- `cat1.html` and `cat2.html` currently include a duplicate heart button in the first series card (fix recommended).
- `login()` validation currently allows both fields blank due to coalesced condition; adjust expected behavior in `script.js`.

## 🔮 Improvements

- Replace mock auth with server API and secure authentication
- Normalize dataset into JSON and render cards programmatically
- Avoid repeating HTML card markup in each category page
- Add sort/filter by rating and release year
- Add proper form validation and inline alerts
- Add deep linking and SPA routing with hash-based navigation
- Use CSS variables and CSS-in-JS for design tokens

## 🧩 Optional: Run with local web server

```
cd "path/to/web-tech project"
python3 -m http.server 8000
```

Then open `http://localhost:8000/login.html`.

---

Designed by Aayushi | 2025
