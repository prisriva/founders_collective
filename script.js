// ---------- COOKIE UTILS ----------
function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let c of cookies) {
    const [key, value] = c.split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

// ---------- FIRST-TIME PROMPT ----------
let userName = getCookie('name');
let userTheme = getCookie('theme');

if (!userName || !userTheme) {
  userName = prompt("What’s your name?") || "Guest";
  userTheme = (prompt("Do you prefer dark or light theme?") || "light").toLowerCase();
  if (userTheme !== "dark" && userTheme !== "light") userTheme = "light";
  setCookie('name', userName);
  setCookie('theme', userTheme);
}

// ---------- APPLY THEME ----------
function applyTheme(theme) {
  const body = document.body;
  if (theme === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}
if (userTheme) applyTheme(userTheme);

// ---------- THEME TOGGLE SUPPORT ----------
const toggleButton = document.getElementById("themeToggle");
if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const newTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    setCookie("theme", newTheme);
  });
}

// ---------- SHOW GREETING ONLY ON INDEX ----------
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  const welcome = document.getElementById("welcome-message");
  if (welcome && userName) {
    welcome.textContent = `Welcome back, ${userName}`;
  }
}

// ---------- Responsive Nav Toggle ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
