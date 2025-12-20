// Dark mode toggle (single icon)
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Switch icon
    if (document.body.classList.contains("dark")) {
        themeIcon.textContent = "🌙";
    } else {
        themeIcon.textContent = "☀️";
    }
});
