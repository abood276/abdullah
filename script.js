// --- Scene Setup ---
const canvas = document.getElementById('bg-engine');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

// --- Lights ---
const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50,50,50);
scene.add(pointLight);

// --- Skills & Projects ---
const skills = [
  {name:"HTML", desc:"Markup language for web pages"},
  {name:"CSS", desc:"Styling web pages"},
  {name:"JavaScript", desc:"Interactive frontend logic"},
  {name:"Python", desc:"Backend & scripting"},
  {name:"React", desc:"Frontend library"},
  {name:"Node.js", desc:"Backend runtime"}
];

const projects = [
  {name:"Portfolio", desc:"Personal portfolio website"},
  {name:"E-commerce App", desc:"Fullstack web application"},
  {name:"Blog Platform", desc:"Content management system"}
];

// --- Create Shapes ---
const shapes = [];
function createShapes(data, zStart){
  const geom = new THREE.IcosahedronGeometry(2,0);
  data.forEach((item,i)=>{
    const mat = new THREE.MeshStandardMaterial({color:0xffffff, transparent:true, opacity:1});
    const mesh = new THREE.Mesh(geom.clone(), mat);
    mesh.position.set(
      (Math.random()-0.5)*8,
      (Math.random()-0.5)*5,
      zStart - i*6
    );
    mesh.userData = {name:item.name, desc:item.desc};
    scene.add(mesh);
    shapes.push(mesh);
  });
}

// Skills near camera
createShapes(skills, 0);
// Projects further down
createShapes(projects, -50);

// --- Camera ---
camera.position.z = 20;

// --- Raycaster for hover ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = null;

const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');

window.addEventListener('mousemove', (event)=>{
  mouse.x = (event.clientX / window.innerWidth)*2 -1;
  mouse.y = -(event.clientY / window.innerHeight)*2 +1;
});

// --- Scroll to move camera ---
window.addEventListener('scroll', ()=>{
  const scrollY = window.scrollY;
  camera.position.z = 20 - scrollY * 0.05; // adjust speed
});

// --- Animate Shapes ---
function animate(){
  requestAnimationFrame(animate);

  shapes.forEach(s=>{
    s.rotation.x += 0.01;
    s.rotation.y += 0.01;
  });

  // Hover detection
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(shapes);

  if(intersects.length>0){
    if(INTERSECTED != intersects[0].object){
      INTERSECTED = intersects[0].object;
      infoTitle.innerText = INTERSECTED.userData.name;
      infoDesc.innerText = INTERSECTED.userData.desc;

      anime({
        targets: INTERSECTED.scale,
        x:1.5, y:1.5, z:1.5,
        duration:300,
        easing:'easeOutExpo'
      });
    }
  } else {
    if(INTERSECTED){
      anime({
        targets: INTERSECTED.scale,
        x:1, y:1, z:1,
        duration:300,
        easing:'easeOutExpo'
      });
    }
    INTERSECTED = null;
    infoTitle.innerText = "Scroll to explore skills";
    infoDesc.innerText = "";
  }

  renderer.render(scene,camera);
}
animate();

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
