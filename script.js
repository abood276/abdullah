// --- Hero Animation ---
anime.timeline()
  .add({
    targets: '.hero h1',
    translateY: [-50, 0],
    opacity: [0,1],
    duration: 1500,
    easing: 'easeOutExpo'
  })
  .add({
    targets: '.hero p',
    translateY: [50, 0],
    opacity: [0,1],
    duration: 1500,
    easing: 'easeOutExpo'
  }, "-=800");

// --- Skills Animation ---
anime({
  targets: '.skill-card',
  translateY: [50,0],
  opacity: [0,1],
  delay: anime.stagger(200, {start: 1000}),
  duration: 1000,
  easing: 'easeOutExpo'
});

// --- Cards Animation ---
anime({
  targets: '.card',
  translateY: [50,0],
  opacity: [0,1],
  delay: anime.stagger(300, {start: 2000}),
  duration: 1000,
  easing: 'easeOutExpo'
});

// --- Floating Shapes Background ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shapes = [];
for(let i=0;i<30;i++){
  shapes.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: Math.random()*20+10,
    dx: (Math.random()-0.5)*1,
    dy: (Math.random()-0.5)*1,
    color: `rgba(255,255,255,${Math.random()*0.3})`
  });
}

function animateShapes(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  shapes.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
    ctx.fillStyle = s.color;
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if(s.x>canvas.width||s.x<0) s.dx*=-1;
    if(s.y>canvas.height||s.y<0) s.dy*=-1;
  });
  requestAnimationFrame(animateShapes);
}
animateShapes();

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
