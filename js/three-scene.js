// ===== Three.js Teddy Bear Scene =====
class TeddyBearScene {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.bear = null;
    this.mouse = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    this.init();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x212529, 0.02);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 8);
    this.camera.lookAt(0, 1, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('three-canvas'),
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lights
    this.setupLights();

    // Create Bear
    this.createBear();

    // Particles
    this.createParticles();

    // Events
    window.addEventListener('resize', () => this.onResize());
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));

    // Start Animation
    this.animate();
  }

  setupLights() {
    // Ambient Light
    const ambient = new THREE.AmbientLight(0xc3a6ff, 0.6);
    this.scene.add(ambient);

    // Main Directional Light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    this.scene.add(mainLight);

    // Purple Accent Light
    const purpleLight = new THREE.PointLight(0xc3a6ff, 1.5, 20);
    purpleLight.position.set(-5, 3, 3);
    this.scene.add(purpleLight);

    // Pink Accent Light
    const pinkLight = new THREE.PointLight(0xffb7d5, 1.2, 20);
    pinkLight.position.set(5, 2, -3);
    this.scene.add(pinkLight);

    // Rim Light
    const rimLight = new THREE.PointLight(0x6b4fcf, 0.8, 15);
    rimLight.position.set(0, 5, -5);
    this.scene.add(rimLight);
  }

  createBear() {
    this.bear = new THREE.Group();

    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e0f0,
      roughness: 0.7,
      metalness: 0.1,
    });

    const noseMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2e4f,
      roughness: 0.3,
      metalness: 0.2,
    });

    const blushMaterial = new THREE.MeshStandardMaterial({
      color: 0xffb7d5,
      roughness: 0.5,
      metalness: 0,
      transparent: true,
      opacity: 0.7,
    });

    // Body
    const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    body.scale.set(1, 1.1, 0.9);
    body.castShadow = true;
    this.bear.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.9, 32, 32);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.y = 1.8;
    head.castShadow = true;
    this.bear.add(head);

    // Ears
    const earGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    
    const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
    leftEar.position.set(-0.55, 2.4, 0);
    leftEar.scale.set(1, 1.2, 0.8);
    leftEar.castShadow = true;
    this.bear.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
    rightEar.position.set(0.55, 2.4, 0);
    rightEar.scale.set(1, 1.2, 0.8);
    rightEar.castShadow = true;
    this.bear.add(rightEar);

    // Inner Ears
    const innerEarGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    
    const leftInnerEar = new THREE.Mesh(innerEarGeometry, blushMaterial);
    leftInnerEar.position.set(-0.55, 2.45, 0.12);
    leftInnerEar.scale.set(1, 1.2, 0.5);
    this.bear.add(leftInnerEar);

    const rightInnerEar = new THREE.Mesh(innerEarGeometry, blushMaterial);
    rightInnerEar.position.set(0.55, 2.45, 0.12);
    rightInnerEar.scale.set(1, 1.2, 0.5);
    this.bear.add(rightInnerEar);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    
    this.leftEye = new THREE.Mesh(eyeGeometry, noseMaterial);
    this.leftEye.position.set(-0.28, 1.9, 0.75);
    this.bear.add(this.leftEye);

    this.rightEye = new THREE.Mesh(eyeGeometry, noseMaterial);
    this.rightEye.position.set(0.28, 1.9, 0.75);
    this.bear.add(this.rightEye);

    // Eye Highlights
    const highlightGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    leftHighlight.position.set(-0.25, 1.93, 0.85);
    this.bear.add(leftHighlight);

    const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    rightHighlight.position.set(0.31, 1.93, 0.85);
    this.bear.add(rightHighlight);

    // Nose
    const noseGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 1.72, 0.82);
    nose.scale.set(1.2, 0.8, 0.8);
    this.bear.add(nose);

    // Mouth
    const mouthCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.15, 1.62, 0.85),
      new THREE.Vector3(0, 1.55, 0.9),
      new THREE.Vector3(0.15, 1.62, 0.85)
    );
    const mouthGeometry = new THREE.TubeGeometry(mouthCurve, 20, 0.02, 8, false);
    const mouth = new THREE.Mesh(mouthGeometry, noseMaterial);
    this.bear.add(mouth);

    // Blush
    const blushGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    
    const leftBlush = new THREE.Mesh(blushGeometry, blushMaterial);
    leftBlush.position.set(-0.45, 1.7, 0.7);
    leftBlush.scale.set(1.3, 0.7, 0.5);
    this.bear.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeometry, blushMaterial);
    rightBlush.position.set(0.45, 1.7, 0.7);
    rightBlush.scale.set(1.3, 0.7, 0.5);
    this.bear.add(rightBlush);

    // Arms
    const armGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    
    this.leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    this.leftArm.position.set(-1.1, 0.3, 0.2);
    this.leftArm.scale.set(0.7, 1.2, 0.8);
    this.leftArm.castShadow = true;
    this.bear.add(this.leftArm);

    this.rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    this.rightArm.position.set(1.1, 0.3, 0.2);
    this.rightArm.scale.set(0.7, 1.2, 0.8);
    this.rightArm.castShadow = true;
    this.bear.add(this.rightArm);

    // Paws
    const pawGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    
    const leftPaw = new THREE.Mesh(pawGeometry, blushMaterial);
    leftPaw.position.set(-1.1, -0.15, 0.35);
    leftPaw.scale.set(1.2, 0.8, 0.8);
    this.bear.add(leftPaw);

    const rightPaw = new THREE.Mesh(pawGeometry, blushMaterial);
    rightPaw.position.set(1.1, -0.15, 0.35);
    rightPaw.scale.set(1.2, 0.8, 0.8);
    this.bear.add(rightPaw);

    // Legs
    const legGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    
    const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    leftLeg.position.set(-0.5, -1, 0.3);
    leftLeg.scale.set(0.8, 1, 1.1);
    leftLeg.castShadow = true;
    this.bear.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    rightLeg.position.set(0.5, -1, 0.3);
    rightLeg.scale.set(0.8, 1, 1.1);
    rightLeg.castShadow = true;
    this.bear.add(rightLeg);

    // Feet Pads
    const feetPadGeometry = new THREE.SphereGeometry(0.22, 16, 16);
    
    const leftFootPad = new THREE.Mesh(feetPadGeometry, blushMaterial);
    leftFootPad.position.set(-0.5, -1.15, 0.6);
    leftFootPad.scale.set(1.3, 0.7, 0.5);
    this.bear.add(leftFootPad);

    const rightFootPad = new THREE.Mesh(feetPadGeometry, blushMaterial);
    rightFootPad.position.set(0.5, -1.15, 0.6);
    rightFootPad.scale.set(1.3, 0.7, 0.5);
    this.bear.add(rightFootPad);

    // Belly
    const bellyGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const bellyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f0fa,
      roughness: 0.8,
      metalness: 0,
    });
    const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
    belly.position.set(0, 0.1, 0.5);
    belly.scale.set(0.9, 1, 0.5);
    this.bear.add(belly);

    // Position bear
    this.bear.position.y = -1;
    this.scene.add(this.bear);
  }

  createParticles() {
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const purple = new THREE.Color(0xc3a6ff);
    const pink = new THREE.Color(0xffb7d5);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 20 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = Math.random() > 0.5 ? purple : pink;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = this.clock.getElapsedTime();

    // Bear idle animation
    if (this.bear) {
      // Floating effect
      this.bear.position.y = -1 + Math.sin(time * 1.5) * 0.1;
      
      // Gentle rotation following mouse
      this.targetRotation.y = this.mouse.x * 0.3;
      this.targetRotation.x = this.mouse.y * 0.15;
      
      this.bear.rotation.y += (this.targetRotation.y - this.bear.rotation.y) * 0.05;
      this.bear.rotation.x += (this.targetRotation.x - this.bear.rotation.x) * 0.05;

      // Arm wave animation
      if (this.leftArm) {
        this.leftArm.rotation.z = Math.sin(time * 2) * 0.1 - 0.3;
      }

      // Ear wiggle
      const ears = this.bear.children.filter((_, i) => i >= 3 && i <= 6);
      ears.forEach((ear, i) => {
        ear.rotation.z = Math.sin(time * 2 + i * 0.5) * 0.05;
      });
    }

    // Particles animation
    if (this.particles) {
      this.particles.rotation.y = time * 0.05;
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.002;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE !== 'undefined') {
    new TeddyBearScene();
  }
});
