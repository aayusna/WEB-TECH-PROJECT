// Global Initialization
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Theme from LocalStorage
    initTheme();

    // 2. Initialize Dashboard Welcome Message
    const welcomeMsg = document.getElementById("welcomeMessage");
    if (welcomeMsg) {
        const username = localStorage.getItem("series_username");
        if (username) {
            welcomeMsg.innerText = `Welcome back, ${username}!`;
            welcomeMsg.style.display = "block";
        }
    }

    // 3. Initialize Favorites UI state based on LocalStorage
    initFavorites();
});

// --- Authentication & Validation ---
function login() {
    const user = document.getElementById("username")?.value;
    const pass = document.getElementById("password")?.value;
    const errorSpan = document.getElementById("loginError");
    
    if (user && pass || user === "" && pass === "") {
        // Simple mock validation pass
        errorSpan.classList.remove("visible");
        errorSpan.innerText = "";
        window.location.href = "cat.html";
    } else {
        errorSpan.innerText = "Please enter both username and password.";
        errorSpan.classList.add("visible");
    }
}

function register() {
    const name = document.getElementById("regname").value.trim();
    const email = document.getElementById("regemail").value.trim();
    const pass = document.getElementById("regpass").value.trim();
    const errorSpan = document.getElementById("regError");
    
    if (name && email && pass.length >= 6) {
        errorSpan.classList.remove("visible");
        // Save the username for persistence
        localStorage.setItem("series_username", name);
        
        alert("Registration successful! You have been logged in.");
        window.location.href = "cat.html";
    } else if (pass.length > 0 && pass.length < 6) {
        errorSpan.innerText = "Password must be at least 6 characters.";
        errorSpan.classList.add("visible");
    } else {
        errorSpan.innerText = "Please fill in all registration fields.";
        errorSpan.classList.add("visible");
    }
}

function toggleRegPassword() {
    const passField = document.getElementById("regpass");
    if (passField.type === "password") {
        passField.type = "text";
    } else {
        passField.type = "password";
    }
}

function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
    document.querySelector(".title").innerText = "Register";
    document.querySelector(".subtitle").innerText = "Create a new account";
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    document.querySelector(".title").innerText = "Welcome";
    document.querySelector(".subtitle").innerText = "Please Login or Register to continue";
}

// --- Dynamic Theme Toggling ---
function initTheme() {
    const theme = localStorage.getItem("series_theme");
    if (theme === "light") {
        document.body.classList.add("light-theme");
    }
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        localStorage.setItem("series_theme", "light");
    } else {
        localStorage.setItem("series_theme", "dark");
    }
}

// --- Favorites System ---
function getFavorites() {
    const favs = localStorage.getItem("series_favorites");
    return favs ? JSON.parse(favs) : [];
}

function initFavorites() {
    const favorites = getFavorites();
    const favBtns = document.querySelectorAll(".fav-btn");
    
    favBtns.forEach(btn => {
        // Navigate DOM to find the title
        const cardInfo = btn.parentElement.querySelector(".series-info h2");
        if (cardInfo) {
            const title = cardInfo.innerText;
            if (favorites.includes(title)) {
                btn.classList.add("active");
            }
        }
    });
}

function toggleFavorite(btn) {
    const cardInfo = btn.parentElement.querySelector(".series-info h2");
    if (!cardInfo) return;
    
    const title = cardInfo.innerText;
    let favorites = getFavorites();
    
    if (favorites.includes(title)) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav !== title);
        btn.classList.remove("active");
    } else {
        // Add to favorites
        favorites.push(title);
        btn.classList.add("active");
    }
    
    localStorage.setItem("series_favorites", JSON.stringify(favorites));
}

// --- Navigation & Search ---
function goCategory1() {
    window.location.href = "cat1.html";
}

function goCategory2() {
    window.location.href = "cat2.html";
}

// Search functionality for category pages
function searchSeries() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const items = document.getElementsByClassName("series-card");
    
    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].innerText.toLowerCase();
        if (itemText.includes(input)) {
            items[i].style.display = "flex";
        } else {
            items[i].style.display = "none";
        }
    }
}

// Global search for the dashboard
function globalSearch() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const dashContent = document.getElementById("dashboardContent");
    const searchRes = document.getElementById("globalSearchResults");
    const resHeader = document.getElementById("searchResultsHeader");
    const resTitle = document.getElementById("searchResultsTitle");
    const items = document.getElementsByClassName("global-card");
    
    if (input.trim() === "") {
        clearView();
    } else {
        // Show global grid
        dashContent.style.display = "none";
        searchRes.style.display = "grid";
        if(resHeader) {
            resHeader.style.display = "block";
            resTitle.innerText = `Searching for "${input}"`;
        }
        
        // Filter global grid items
        for (let i = 0; i < items.length; i++) {
            const itemText = items[i].innerText.toLowerCase();
            if (itemText.includes(input)) {
                items[i].style.display = "flex";
            } else {
                items[i].style.display = "none";
            }
        }
        // Re-initialize favorites for the newly displayed global search cards
        initFavorites();
    }
}

function showFavorites() {
    const favorites = getFavorites();
    const dashContent = document.getElementById("dashboardContent");
    const searchRes = document.getElementById("globalSearchResults");
    const resHeader = document.getElementById("searchResultsHeader");
    const resTitle = document.getElementById("searchResultsTitle");
    const items = document.getElementsByClassName("global-card");
    
    document.getElementById("searchInput").value = "";
    
    dashContent.style.display = "none";
    searchRes.style.display = "grid";
    if(resHeader) {
        resHeader.style.display = "block";
        resTitle.innerText = favorites.length > 0 ? "Your Favorite Series ❤️" : "You have no favorites yet 💔";
    }
    
    for (let i = 0; i < items.length; i++) {
        // Find exact title from inner h2
        const itemText = items[i].querySelector("h2").innerText;
        if (favorites.includes(itemText)) {
            items[i].style.display = "flex";
        } else {
            items[i].style.display = "none";
        }
    }
    initFavorites();
}

function clearView() {
    const searchInput = document.getElementById("searchInput");
    if(searchInput) searchInput.value = "";
    const dashContent = document.getElementById("dashboardContent");
    const searchRes = document.getElementById("globalSearchResults");
    const resHeader = document.getElementById("searchResultsHeader");
    
    if(dashContent) dashContent.style.display = "block";
    if(searchRes) searchRes.style.display = "none";
    if(resHeader) resHeader.style.display = "none";
}

function filterTopRated() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const items = document.getElementsByClassName("top-rated-item");
    
    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].innerText.toLowerCase();
        if (itemText.includes(input)) {
            items[i].style.display = "flex";
        } else {
            items[i].style.display = "none";
        }
    }
}