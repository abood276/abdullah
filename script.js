document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            icon.textContent = "🕳️";
        } else {
            icon.textContent = "⭐";
        }
    });

});
