// Dark mode toggle
const btn = document.getElementById("themeBtn");
document.body.classList.add("dark");

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// ⭐ STAR BACKGROUND
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.3,
    s: Math.random() * 0.4 + 0.1
}));

function animate() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = document.body.classList.contains("dark")
        ? "white"
        : "rgba(100,150,255,0.6)";

    stars.forEach(star => {
        star.y += star.s;
        if (star.y > h) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();
