/* ======================
   DARK MODE TOGGLE
====================== */
const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    icon.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
});

/* ======================
   STAR BACKGROUND
====================== */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 120;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.3 + 0.1
        });
    }
}
createStars();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dark = document.body.classList.contains("dark");
    ctx.fillStyle = dark ? "white" : "rgba(37,99,235,0.6)";

    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.speed;
        if (s.y > canvas.height) {
            s.y = 0;
            s.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(draw);
}
draw();
