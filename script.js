// ================================
// Theme Toggle (Sun / Moon)
// ================================
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeIcon.textContent = "🌙";
    } else {
        themeIcon.textContent = "☀️";
    }
});

// ================================
// Accordion Toggle for Sections
// ================================
const sections = document.querySelectorAll(".cv-section");

sections.forEach(section => {
    const title = section.querySelector(".toggle-title");
    title.addEventListener("click", () => {
        section.classList.toggle("active");
    });
});
