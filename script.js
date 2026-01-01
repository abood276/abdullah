document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const sections = document.querySelectorAll(".cv-section");

    // Theme toggle
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        icon.textContent = document.body.classList.contains("dark") ? "🌑" : "⭐";
    });

    // Parallax depth on scroll (lightweight)
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        sections.forEach((section, i) => {
            const depth = (i + 1) * 0.04;
            section.style.transform = `translateY(${scrollY * depth}px)`;
        });
    }, { passive: true });

});
