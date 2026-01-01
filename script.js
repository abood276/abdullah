const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '🌙'; // Moon for dark mode
    } else {
        themeIcon.textContent = '☀️'; // Sun for day mode
    }
});
