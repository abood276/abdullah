// Dark mode toggle
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

// Click toggles for non-hover sections (none needed for always visible sections)
const sections = document.querySelectorAll(".cv-section:not(.hover-section):not(.always-visible)");

sections.forEach(section => {
    const title = section.querySelector(".toggle-title");
    title.addEventListener("click", () => {
        // Close others
        sections.forEach(s => {
            if (s !== section) s.classList.remove("active");
        });
        section.classList.toggle("active");
    });
});
