// Scene setup
const canvas = document.getElementById('bg-engine');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const point = new THREE.PointLight(0xffffff, 1);
point.position.set(50,50,50);
scene.add(point);

// Skills & projects
const skills = [
  {name:"HTML", desc:"Markup language"},
  {name:"CSS", desc:"Styling web pages"},
  {name:"JS", desc:"Interactive frontend"},
];

const projects = [
  {name:"Portfolio", desc:"My personal website"},
  {name:"E-commerce", desc:"Fullstack project"},
];

// Create shapes
const shapes = [];
function createShapes(data, zStart){
  const geom = new THREE.IcosahedronGeometry(2,0);
  data.forEach((item,i)=>{
    const mat = new THREE.MeshStandardMaterial({color:0xffffff});
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
// Projects further
createShapes(projects, -40);

// Camera
camera.position.z = 15;
let targetZ = 15;

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = null;

const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');

window.addEventListener('mousemove', e=>{
  mouse.x = (e.clientX / window.innerWidth)*2 -1;
  mouse.y = -(e.clientY / window.innerHeight)*2 +1;
});

// Scroll
window.addEventListener('scroll', ()=>{
  const scrollY = window.scrollY;
  targetZ = 15 - scrollY * 0.1; // faster movement
});

// Animate
function animate(){
  requestAnimationFrame(animate);

  // Smooth camera movement
  camera.position.z += (targetZ - camera.position.z) * 0.1;

  // Rotate shapes
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
    infoTitle.innerText = "Hover a shape";
    infoDesc.innerText = "";
  }

  renderer.render(scene,camera);
}
animate();

// Resize
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
