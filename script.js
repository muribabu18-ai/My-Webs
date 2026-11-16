// ---------- THEME SWITCHER ----------
// Sets <html data-theme="light | dark | neon"> and remembers your choice.

const root = document.documentElement;
const themeButtons = document.querySelectorAll("[data-set-theme]");

function setTheme(name) {
  root.dataset.theme = name;

  themeButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.setTheme === name);
  });

  try {
    localStorage.setItem("theme", name);
  } catch (error) {
    // Storage can be blocked; the site still works without it
  }
}

themeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setTheme(button.dataset.setTheme);
  });
});

// On load: use the saved theme, otherwise follow the device's light/dark setting
let startTheme = null;
try {
  startTheme = localStorage.getItem("theme");
} catch (error) {}

// Ignore old or unknown saved values (for example the retired "negative" mode)
if (!["light", "dark", "neon"].includes(startTheme)) {
  startTheme = null;
}

if (!startTheme) {
  startTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

setTheme(startTheme);

// ---------- MOBILE MENU ----------
const menuButton = document.querySelector(".menu-button");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", function () {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

// Close the menu after tapping a link
nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// ---------- FOOTER YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();
