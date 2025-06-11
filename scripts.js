"use strict";

// Core DOM interaction logic extracted into a reusable function.
function initialize (doc = document, win = window) {
  const yearEl = doc.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Smooth scrolling for internal anchor links
  doc.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId && targetId !== "#") {
        const target = doc.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 60; // Adjust based on your fixed header height
          const top = target.getBoundingClientRect().top + (win.scrollY || 0) - offset;

          win.scrollTo({
            top,
            behavior: "smooth"
          });
        }
      }
    });
  });
}

module.exports = { initialize };

// Automatically initialise when running in a browser environment
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initialize());
  } else {
    initialize();
  }
}
