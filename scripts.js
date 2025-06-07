"use strict";

// Dynamically update the footer year and enable smooth scrolling for internal links
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId && targetId !== "#") {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 60; // Adjust based on your fixed header height
          const top = target.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top,
            behavior: "smooth"
          });
        }
      }
    });
  });
});
