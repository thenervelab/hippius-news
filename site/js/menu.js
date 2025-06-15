'use strict';

// Toggle mobile menu
const btn = document.getElementById("mobile-menu-button");
const dialog = document.getElementById("mobile-menu-dialog");
const closeBtn = document.getElementById("mobile-menu-close");

btn.addEventListener("click", () => dialog.classList.toggle("hidden"));
closeBtn.addEventListener("click", () => dialog.classList.add("hidden"));

// Scroll-threshold styling
const navInner = document.getElementById("nav-inner");
window.addEventListener("scroll", () => {
  if (window.scrollY < 20) {
    navInner.classList.remove("bg-grey-100", "shadow-root-nav", "px-4");
  } else {
    navInner.classList.add("bg-grey-100", "shadow-root-nav", "px-4");
  }
});

