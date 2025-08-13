import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
const ASCII_ATLAS_IMG = "/16X18ASCII.png";
const MODEL_GLB = "/hypernova_0005.glb";

class AsciiScene {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.CHAR_COUNT = 16;

    const defaults = {
      callback: () => {},
      scale: 17,
      position: { x: 6, y: 2, z: 0 },
      rotation: { x: 0.45, y: 0, z: -0.5 },
      pivotRotation: { x: -0.05, y: 0, z: 0 },
      rotationSpeed: 0.008,
    };

    this.options = { ...defaults, ...options };
    if (options.position) {
      this.options.position = { ...defaults.position, ...options.position };
    }
    if (options.rotation) {
      this.options.rotation = { ...defaults.rotation, ...options.rotation };
    }
    if (options.pivotRotation) {
      this.options.pivotRotation = {
        ...defaults.pivotRotation,
        ...options.pivotRotation,
      };
    }

    this.onLoadCallBack = this.options.callback;
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 50);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    this.pivot = new THREE.Object3D();
    this.containerGroup = new THREE.Group();
    this.scene.add(this.containerGroup);
    this.containerGroup.add(this.pivot);
  }

  _initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambient);

    const dir1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dir1.position.set(-25, 5, 40);
    this.scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0xffffff, 2.5);
    dir2.position.set(5, 55, 0);
    this.scene.add(dir2);
  }

  _initModel() {
    const loader = new GLTFLoader();
    loader.load(MODEL_GLB, (gltf) => {
      this.model = gltf.scene;

      this.model.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.15,
          });
        }
      });

      this.model.scale.set(
        this.options.scale,
        this.options.scale,
        this.options.scale
      );

      this.pivot.rotation.set(
        this.options.pivotRotation.x,
        this.options.pivotRotation.y,
        this.options.pivotRotation.z
      );

      this.containerGroup.rotation.set(
        this.options.rotation.x,
        this.options.rotation.y,
        this.options.rotation.z
      );

      this.containerGroup.position.set(
        this.options.position.x,
        this.options.position.y,
        this.options.position.z
      );

      const box = new THREE.Box3().setFromObject(this.model);
      const center = box.getCenter(new THREE.Vector3());
      this.model.position.sub(center);

      this.pivot.add(this.model);

      this.onLoadCallBack();
    });
  }

  _initPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    new THREE.TextureLoader().load(ASCII_ATLAS_IMG, (fontTexture) => {
      fontTexture.minFilter = THREE.NearestFilter;
      fontTexture.magFilter = THREE.NearestFilter;
      fontTexture.generateMipmaps = false;
      fontTexture.anisotropy = 1;
      fontTexture.colorSpace = THREE.SRGBColorSpace;
      fontTexture.flipY = false;

      const asciiShader = this._getAsciiShader(fontTexture);
      this.asciiPass = new ShaderPass(asciiShader);
      this.composer.addPass(this.asciiPass);
    });
  }

  _getAsciiShader(fontTexture) {
    return {
      uniforms: {
        tDiffuse: { value: null },
        fontTexture: { value: fontTexture },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        mouse: { value: new THREE.Vector2(-10000, -10000) },
        cellSize: { value: 6.5 },
        time: { value: 0.0 },
        charCount: { value: this.CHAR_COUNT },
        pad: { value: 0.195 },
        invGamma: { value: 1.85 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }
      `,
      fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform sampler2D fontTexture;
                uniform vec2 resolution;
                uniform float cellSize;
                uniform float time;
                uniform float pad;
                uniform float invGamma;
                uniform int charCount;
                uniform vec2 mouse;
                
                varying vec2 vUv;
                
                float rand(vec2 co){
                  return fract(sin(dot(co, vec2(12.9898,78.233)) + time*10.0) * 43758.5453);
                }
                
                float brightness(vec3 c){
                  return dot(c, vec3(0.299, 0.587, 0.114));
                }
                
                void main(){
                  vec2 pixelPos = vUv * resolution;
                  vec2 cell = floor(pixelPos / cellSize);
                  vec2 baseCenter = (cell + 0.5) * cellSize;
                
                  float innerRadius = 20.0;
                  float outerRadius = 70.0;
                  vec2 dxy = baseCenter - mouse;
                  float dist = length(dxy);
                
                  if (dist < innerRadius) {
                    gl_FragColor = vec4(0.0);
                    return;
                  }
                
                  float t = 1.8 - smoothstep(innerRadius, outerRadius, dist);
                  vec2 dir = (dist > 1e-5) ? dxy / dist : vec2(0.0);
                  vec2 repel = dir * (t * t) * 50.0;
                  vec2 cellCenter = baseCenter + repel;
                
                  float noise = rand(cell + vec2(time * 0.01, time * 0.15));
                  float drift = time * 20.0;
                  vec2 smokeOffset = vec2(
                      sin(time * 8.0 + cell.y * 0.3) * 0.8,
                      -(drift + noise * 50.0) * 0.3
                  );
                  cellCenter += smokeOffset;
                
                  vec2 sampleUV = cellCenter / resolution;
                  vec3 originalSceneRGB = texture2D(tDiffuse, sampleUV).rgb;
                  
                  // Перевіряємо, чи є в цьому місці щось від моделі
                  float originalBrightness = brightness(originalSceneRGB);
                  bool hasContent = originalBrightness > 0.001;
                  
                  vec3 sceneRGB = originalSceneRGB;
                
                  // Застосовуємо blur тільки якщо є контент (модель)
                  if (hasContent) {
                      vec3 blurRGB = vec3(0.0);
                      float blurSize = 15.0 / resolution.x;
                      int samples = 0;
                
                      for (int x = -2; x <= 2; x++) {
                          for (int y = -2; y <= 2; y++) {
                              vec2 offset = vec2(x, y) * blurSize;
                              vec3 sampleColor = texture2D(tDiffuse, sampleUV + offset).rgb;
                              blurRGB += sampleColor;
                              samples++;
                          }
                      }
                      blurRGB /= float(samples);
                
                      // Змішуємо оригінал з blur
                      sceneRGB = mix(originalSceneRGB, blurRGB, 0.6);
                  }
                
                  // Noise mask тільки для областей з контентом
                  if (hasContent) {
                      float noiseMask = rand(cell + vec2(time * 0.05, time * 0.08));
                      if (noiseMask < 0.1) {
                          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); 
                          return;
                      }
                  }
                
                  float b = brightness(sceneRGB);
                  float darkCutoff = 0.002;
                
                  // Якщо немає контенту, повертаємо прозорий фон
                  if (!hasContent || b <= darkCutoff) {
                      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
                      return;
                  }
                
                  b = clamp((b - darkCutoff) / (1.0 - darkCutoff), 0.35, 1.0);
                  b = pow(b, invGamma);
                
                  float idxF = b * float(charCount - 1);
                  int charIndex = int(idxF);
                
                  float colW = 1.0 / float(charCount);
                  vec2 cellUV = fract(pixelPos / cellSize);
                
                  float inner = 1.0 - pad;
                  vec2 atlasUV = vec2(
                      colW * (float(charIndex) + pad + cellUV.x * inner),
                      pad + cellUV.y * inner
                  );
                
                  vec4 g = texture2D(fontTexture, atlasUV);
                
                  float edge = 1.0;
                  float fw = fwidth(g.a) * 0.5;
                  float a = smoothstep(edge - fw, edge + fw, g.a);
                
                  vec3 ink = mix(vec3(0.0), vec3(1.0), b);
                  float fade = smoothstep(1.0, 0.9, vUv.y);
                
                  gl_FragColor = vec4(ink, a * b * fade);
                }
                `,
    };
  }

  _bindEvents() {
    window.addEventListener("mousemove", (e) => {
      if (!this.asciiPass) return;
      this.asciiPass.uniforms.mouse.value.set(
        e.clientX,
        window.innerHeight - e.clientY
      );
    });

    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.renderer.setSize(w, h);
      this.composer.setSize(w, h);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      if (this.asciiPass) this.asciiPass.uniforms.resolution.value.set(w, h);
    });
  }

  _animate(time = 0) {
    requestAnimationFrame((t) => this._animate(t));
    if (this.model) this.pivot.rotation.y += this.options.rotationSpeed;
    if (this.asciiPass) this.asciiPass.uniforms.time.value = time * 0.00000009;
    this.composer.render();
  }

  updateScale(scale) {
    if (this.model) {
      this.model.scale.set(scale, scale, scale);
    }
    this.options.scale = scale;
  }

  updatePosition(x, y, z) {
    if (this.containerGroup) {
      this.containerGroup.position.set(x, y, z);
    }
    this.options.position = { x, y, z };
  }

  updateRotation(x, y, z) {
    if (this.containerGroup) {
      this.containerGroup.rotation.set(x, y, z);
    }
    this.options.rotation = { x, y, z };
  }

  updateRotationSpeed(speed) {
    this.options.rotationSpeed = speed;
  }

  init() {
    this._initScene();
    this._initLights();
    this._initModel();
    this._initPostProcessing();

    this._bindEvents();
    this._animate();
  }
}

export default AsciiScene;
