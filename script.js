// --- Hero Animations ---
anime.timeline()
  .add({
    targets: '.hero p',
    translateY:[50,0],
    opacity:[0,1],
    duration:1500,
    easing:'easeOutExpo'
  });

// --- Skills Animation ---
anime({
  targets:'.skill-card',
  translateY:[50,0],
  opacity:[0,1],
  delay:anime.stagger(200,{start:500}),
  duration:1000,
  easing:'easeOutExpo'
});

// --- Cards Animation ---
anime({
  targets:'.card',
  translateY:[50,0],
  opacity:[0,1],
  delay:anime.stagger(300,{start:1000}),
  duration:1000,
  easing:'easeOutExpo'
});

// --- 3D Background using Three.js ---
const canvas = document.getElementById('bg-3d');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

const shapes = [];
for(let i=0;i<50;i++){
  const geometry = new THREE.IcosahedronGeometry(Math.random()*0.5+0.2,0);
  const material = new THREE.MeshStandardMaterial({color:0xffffff, transparent:true, opacity:0.2});
  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.set((Math.random()-0.5)*20,(Math.random()-0.5)*10,(Math.random()-0.5)*20);
  scene.add(mesh);
  shapes.push(mesh);
}

const light = new THREE.PointLight(0xffffff,1);
light.position.set(10,10,10);
scene.add(light);

camera.position.z = 10;

function animate(){
  requestAnimationFrame(animate);
  shapes.forEach(s=>{ s.rotation.x += 0.01; s.rotation.y += 0.01; });
  renderer.render(scene,camera);
}
animate();

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
