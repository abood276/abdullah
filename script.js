/* ---------------------- Theme Toggle ---------------------- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if(body.classList.contains('dark-mode')) {
        themeIcon.textContent = '🌙';
        starCanvasInit();
    } else {
        themeIcon.textContent = '☀️';
        stopStars();
    }
});

/* ---------------------- Star Animation for Dark Mode ---------------------- */
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let starsArray = [];
let animationId;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Star(x,y,radius,speed){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.alpha = Math.random();
}

Star.prototype.draw = function(){
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
}

Star.prototype.update = function(){
    this.y -= this.speed;
    if(this.y < 0) this.y = canvas.height;
    this.draw();
}

function starCanvasInit(){
    starsArray = [];
    for(let i=0;i<150;i++){
        let x = Math.random()*canvas.width;
        let y = Math.random()*canvas.height;
        let radius = Math.random()*2;
        let speed = Math.random()*0.5+0.2;
        starsArray.push(new Star(x,y,radius,speed));
    }
    animateStars();
}

function animateStars(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    starsArray.forEach(star=>star.update());
    animationId = requestAnimationFrame(animateStars);
}

function stopStars(){
    cancelAnimationFrame(animationId);
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

/* Resize canvas */
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
