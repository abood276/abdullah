/* ======================
   HERO TEXT (ONCE)
====================== */
const heroText = document.querySelector(".animated-text");
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = "";

    [...text].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.animationDelay = `${i * 0.05}s`;
        heroText.appendChild(span);
    });
}

/* ======================
   DARK MODE
====================== */
const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

if (toggle && icon) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        icon.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";

        // subtle pulse effect on theme change
        document.body.classList.add("theme-switching");
        setTimeout(() => {
            document.body.classList.remove("theme-switching");
        }, 500);
    });
}

/* ======================
   STAR BACKGROUND
====================== */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let mouseX = 0;
let mouseY = 0;

const STAR_COUNT = window.innerWidth < 768 ? 90 : 190;

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        alpha: Math.random(),
        dir: Math.random() > 0.5 ? 1 : -1
    });
}

window.addEventListener("mousemove", e => {
    mouseX = (e.clientX / innerWidth - 0.5) * 20;
    mouseY = (e.clientY / innerHeight - 0.5) * 20;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dark = document.body.classList.contains("dark");

    stars.forEach(s => {
        s.alpha += 0.005 * s.dir;
        if (s.alpha <= 0.2 || s.alpha >= 1) s.dir *= -1;

        ctx.fillStyle = dark
            ? `rgba(248,250,252,${s.alpha})`
            : `rgba(56,189,248,${s.alpha})`;

        ctx.beginPath();
        ctx.arc(
            s.x + mouseX * 0.05,
            s.y + mouseY * 0.05,
            s.r,
            0,
            Math.PI * 2
        );
        ctx.fill();

        s.y += s.speed;
        if (s.y > canvas.height) {
            s.y = 0;
            s.x = Math.random() * canvas.width;
        }
    });

    // occasional shooting star
    if (Math.random() < 0.003) {
        const startX = Math.random() * canvas.width * 0.8;
        const startY = Math.random() * canvas.height * 0.4;
        const length = 120;

        const grad = ctx.createLinearGradient(
            startX, startY,
            startX + length, startY + 25
        );
        grad.addColorStop(0, "rgba(248,250,252,0.9)");
        grad.addColorStop(1, "rgba(248,250,252,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + length, startY + 25);
        ctx.stroke();
    }

    requestAnimationFrame(animate);
}

animate();
