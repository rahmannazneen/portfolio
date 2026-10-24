// Interactive 3D hero: a morphing noise blob, orbiting shapes and a
// colorful particle field that all react to the mouse.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

const NOISE = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vDisp;
  ${NOISE}
  void main() {
    float n = snoise(normal * 1.1 + vec3(uTime * 0.22));
    float detail = snoise(normal * 3.2 + vec3(uTime * 0.35 + uMouse.x, uMouse.y, 0.0)) * 0.35;
    float d = (n + detail) * uIntensity;
    vDisp = d;
    vec4 mv = modelViewMatrix * vec4(position + normal * d, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPos = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vDisp;

  vec3 ramp(float t) {
    vec3 pink = vec3(1.0, 0.31, 0.80);
    vec3 orange = vec3(1.0, 0.62, 0.26);
    vec3 violet = vec3(0.55, 0.36, 0.96);
    vec3 cyan = vec3(0.24, 0.94, 1.0);
    float s = fract(t) * 4.0;
    if (s < 1.0) return mix(pink, orange, smoothstep(0.0, 1.0, s));
    if (s < 2.0) return mix(orange, violet, smoothstep(0.0, 1.0, s - 1.0));
    if (s < 3.0) return mix(violet, cyan, smoothstep(0.0, 1.0, s - 2.0));
    return mix(cyan, pink, smoothstep(0.0, 1.0, s - 3.0));
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 viewDir = normalize(vViewPos);
    float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 2.5);
    float diffuse = dot(n, normalize(vec3(0.4, 0.8, 0.6))) * 0.5 + 0.5;
    vec3 col = ramp(vDisp * 1.6 + n.y * 0.25 + n.x * 0.15 + uTime * 0.04);
    col *= 0.55 + 0.55 * diffuse;
    col = mix(col, vec3(1.0), fresnel * 0.55);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.35, 'rgba(255,255,255,0.6)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export function initScene(canvas, { reduceMotion = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  // Morphing blob
  const uniforms = {
    uTime: { value: 0 },
    uIntensity: { value: 0.3 },
    uMouse: { value: new THREE.Vector2() },
  };
  const blob = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.6, 48),
    new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms }),
  );
  const group = new THREE.Group();
  group.add(blob);
  scene.add(group);

  // Orbiting shapes
  const normalMat = new THREE.MeshNormalMaterial({ flatShading: true });
  const shapes = [
    new THREE.TorusGeometry(0.26, 0.1, 16, 48),
    new THREE.OctahedronGeometry(0.28),
    new THREE.IcosahedronGeometry(0.2, 0),
    new THREE.TorusKnotGeometry(0.15, 0.055, 80, 10),
  ].map((geo, i) => {
    const mesh = new THREE.Mesh(geo, normalMat);
    mesh.userData = { radius: 2.3 + i * 0.2, speed: 0.22 + i * 0.06, offset: (i * Math.PI) / 2, tilt: (i % 2 ? 1 : -1) * 0.6 };
    group.add(mesh);
    return mesh;
  });

  // Particle field
  const count = window.innerWidth < 768 ? 700 : 1600;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = ['#ff4ecd', '#ff9f43', '#3ef0ff', '#8b5cf6', '#ffd93d', '#ffffff'].map((c) => new THREE.Color(c));
  for (let i = 0; i < count; i++) {
    const r = 4 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.set([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)], i * 3);
    const c = palette[i % palette.length];
    colors.set([c.r, c.g, c.b], i * 3);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const points = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({
      size: 0.08,
      map: dotTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  scene.add(points);

  // Layout: blob sits right of the text on wide screens, above it on narrow ones
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const visH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const visW = visH * camera.aspect;
    if (camera.aspect > 1.1) {
      group.position.set(visW * 0.24, 0, 0);
      group.scale.setScalar(1);
    } else {
      group.position.set(0, visH * 0.2, 0);
      group.scale.setScalar(Math.min(0.75, visW / 5.5));
    }
    if (reduceMotion) frame();
  }

  // Interaction
  const target = new THREE.Vector2();
  const mouse = new THREE.Vector2();
  let speed = 0;
  let pulse = 0;
  let last = null;
  window.addEventListener(
    'pointermove',
    (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      if (last) speed = Math.min(speed + Math.hypot(x - last.x, y - last.y) * 2, 1);
      last = { x, y };
      target.set(x, y);
    },
    { passive: true },
  );
  canvas.parentElement.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('a, button')) pulse = 0.6;
  });

  const clock = new THREE.Clock();
  let t = reduceMotion ? 2 : 0;

  function frame() {
    const dt = reduceMotion ? 0 : Math.min(clock.getDelta(), 0.05);
    t += dt;
    mouse.lerp(target, 0.05);
    speed *= 0.95;
    pulse *= 0.93;

    uniforms.uTime.value = t;
    uniforms.uMouse.value.copy(mouse);
    uniforms.uIntensity.value = 0.28 + speed * 0.35 + pulse;

    blob.rotation.y += dt * 0.12;
    blob.rotation.x = THREE.MathUtils.lerp(blob.rotation.x, mouse.y * 0.5, 0.05);
    blob.scale.setScalar(1 + pulse * 0.25);

    for (const m of shapes) {
      const { radius, speed: s, offset, tilt } = m.userData;
      const a = t * s + offset;
      m.position.set(Math.cos(a) * radius, Math.sin(a * 1.3) * tilt, Math.sin(a) * radius);
      m.rotation.x += dt * 0.8;
      m.rotation.y += dt * 0.6;
    }

    points.rotation.y = t * 0.015 + mouse.x * 0.15;
    points.rotation.x = mouse.y * 0.08;

    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.35 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  // Only animate while the hero is on screen and the tab is visible
  let heroVisible = true;
  const updateLoop = () => {
    if (reduceMotion) return;
    renderer.setAnimationLoop(heroVisible && !document.hidden ? frame : null);
  };
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    updateLoop();
  }).observe(canvas);
  document.addEventListener('visibilitychange', updateLoop);
  new ResizeObserver(resize).observe(canvas);

  resize();
  updateLoop();
}
