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

    this.isMobile = this._detectMobile();

    const mobileScale = 0.85;

    const defaults = {
      callback: () => {},
      scale: this.isMobile ? 17 * mobileScale : 17,
      position: this.isMobile
        ? { x: 6 * mobileScale, y: 2 * mobileScale, z: 0 }
        : { x: 6, y: 2, z: 0 },
      rotation: { x: 0.45, y: 0, z: -0.5 },
      pivotRotation: { x: -0.05, y: 0, z: 0 },
      rotationSpeed: this.isMobile ? 0.0025 : 0.003,
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

    this.performanceSettings = this._getPerformanceSettings();
  }

  _detectMobile() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      (navigator.maxTouchPoints > 0 && window.innerWidth <= 1024)
    );
  }

  _getPerformanceSettings() {
    if (this.isMobile) {
      return {
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        cellSize: 5.5,
        blurSamples: 6,
        animationFrameSkip: 0,
        simplifiedShader: false,
        reducedLighting: false,
      };
    } else {
      return {
        pixelRatio: Math.min(window.devicePixelRatio, 3.5),
        cellSize: 6.5,
        blurSamples: 5,
        animationFrameSkip: 0,
        simplifiedShader: false,
        reducedLighting: false,
      };
    }
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

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    this.renderer.setPixelRatio(this.performanceSettings.pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    this.pivot = new THREE.Object3D();
    this.containerGroup = new THREE.Group();
    this.scene.add(this.containerGroup);
    this.containerGroup.add(this.pivot);

    this.frameCount = 0;
  }

  _initLights() {
    const ambient = new THREE.AmbientLight(
      0xffffff,
      this.isMobile ? 1.2 : 0.985
    );
    this.scene.add(ambient);

    const dir1 = new THREE.DirectionalLight(
      0xffffff,
      this.isMobile ? 1.8 : 1.3
    );
    dir1.position.set(-25, 5, 40);
    this.scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(
      0xffffff,
      this.isMobile ? 3.2 : 2.5
    );
    dir2.position.set(0, 55, 0);
    this.scene.add(dir2);

    if (this.isMobile) {
      const dir3 = new THREE.DirectionalLight(0xffffff, 0.8);
      dir3.position.set(25, -5, -40);
      this.scene.add(dir3);
    }
  }

  _initModel() {
    const loader = new GLTFLoader();
    loader.load(MODEL_GLB, (gltf) => {
      this.model = gltf.scene;

      this.model.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: this.isMobile ? 0.1 : 0.15,
            metalness: this.isMobile ? 0.05 : 0.0,
          });

          if (this.isMobile) {
            child.material.precision = "highp";
            child.frustumCulled = true;
          }
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
    const blurCode = `
      vec3 blurRGB = vec3(0.0);
      float blurSize = ${this.isMobile ? "15.0" : "20.0"} / resolution.x;
      int samples = 0;
      
      int maxSamples = ${this.isMobile ? "3" : "2"};
      
      for (int x = -maxSamples; x <= maxSamples; x++) {
          for (int y = -maxSamples; y <= maxSamples; y++) {
              vec2 offset = vec2(x, y) * blurSize;
              vec3 sampleColor = texture2D(tDiffuse, sampleUV + offset).rgb;
              blurRGB += sampleColor;
              samples++;
          }
      }
      blurRGB /= float(samples);
    `;

    return {
      uniforms: {
        tDiffuse: { value: null },
        fontTexture: { value: fontTexture },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        mouse: { value: new THREE.Vector2(-10000, -10000) },
        cellSize: { value: this.performanceSettings.cellSize },
        time: { value: 0.0 },
        charCount: { value: this.CHAR_COUNT },
        pad: { value: 0.195 },
        invGamma: { value: this.isMobile ? 1.8 : 2 },
        isMobile: { value: this.isMobile ? 1.0 : 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }
      `,
      fragmentShader: `
        precision ${this.isMobile ? "highp" : "highp"} float;
        
        uniform sampler2D tDiffuse;
        uniform sampler2D fontTexture;
        uniform vec2 resolution;
        uniform float cellSize;
        uniform float time;
        uniform float pad;
        uniform float invGamma;
        uniform int charCount;
        uniform vec2 mouse;
        uniform float isMobile;
        
        varying vec2 vUv;
        
        float rand(vec2 co){
          return fract(sin(dot(co, vec2(12.9898,78.233)) + time*10.0) * 43758.5453);
        }
        
        float brightness(vec3 c){
          return dot(c, vec3(0.15, 0.507, 0.214));
        }
        
        void main(){
          vec2 pixelPos = vUv * resolution;
          vec2 cell = floor(pixelPos / cellSize);
          vec2 baseCenter = (cell + 0.5) * cellSize;
        
          float innerRadius = isMobile > 0.5 ? 18.0 : 20.0;
          float outerRadius = isMobile > 0.5 ? 65.0 : 70.0; 
          vec2 dxy = baseCenter - mouse;
          float dist = length(dxy);
        
          if (dist < innerRadius) {
            gl_FragColor = vec4(0.0);
            return;
          }
        
          float t = 1.8 - smoothstep(innerRadius, outerRadius, dist);
          vec2 dir = (dist > 1e-5) ? dxy / dist : vec2(0.0);
          vec2 repel = dir * (t * t) * (isMobile > 0.5 ? 40.0 : 50.0); 
          vec2 cellCenter = baseCenter + repel;
        
          float noise = rand(cell + vec2(time * 0.008, time * 0.12));
          float drift = time * (isMobile > 0.5 ? 18.0 : 20.0);
          vec2 smokeOffset = vec2(
              sin(time * 6.0 + cell.y * 0.25) * (isMobile > 0.5 ? 0.7 : 0.6), 
              -(drift + noise * 40.0) * 0.25
          );
          cellCenter += smokeOffset;
        
          vec2 sampleUV = cellCenter / resolution;
          vec3 originalSceneRGB = texture2D(tDiffuse, sampleUV).rgb;
          
          float originalBrightness = brightness(originalSceneRGB);
          bool hasContent = originalBrightness > 0.001;
          
          vec3 sceneRGB = originalSceneRGB;
        
          if (hasContent) {
              ${blurCode}
              sceneRGB = mix(originalSceneRGB, blurRGB, isMobile > 0.5 ? 0.4 : 0.6); 
          }
        
          if (hasContent) {
              float noiseMask = rand(cell + vec2(time * 0.05, time * 0.08));
              if (noiseMask < (isMobile > 0.5 ? 0.015 : 0.1)) { 
                  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); 
                  return;
              }
          }
        
          float b = brightness(sceneRGB);
          float darkCutoff = isMobile > 0.5 ? 0.0005 : 0.001; 
        
          if (!hasContent || b <= darkCutoff) {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
              return;
          }
        
          b = clamp((b - darkCutoff) / (1.0 - darkCutoff), isMobile > 0.5 ? 0.25 : 0.35, 1.0);
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
          float fw = fwidth(g.a) * (isMobile > 0.5 ? 0.45 : 0.55); 
          float a = smoothstep(edge - fw, edge + fw, g.a);
        
          vec3 ink = mix(vec3(0.0), vec3(1.0), b);
          float fade = smoothstep(1.0, 0.9, vUv.y);
        
          float finalAlpha = a * b * fade * (isMobile > 0.5 ? 1.1 : 1.0);
        
          gl_FragColor = vec4(ink, finalAlpha);
        }
      `,
    };
  }

  _bindEvents() {
    const mouseMoveHandler = (e) => {
      if (!this.asciiPass) return;
      this.asciiPass.uniforms.mouse.value.set(
        e.clientX,
        window.innerHeight - e.clientY + 100
      );
    };

    if (this.isMobile) {
      let mouseTimeout;
      const handleTouch = (e) => {
        if (mouseTimeout) return;
        mouseTimeout = setTimeout(() => {
          if (e.touches[0]) {
            mouseMoveHandler({
              clientX: e.touches[0].clientX,
              clientY: e.touches[0].clientY,
            });
          }
          mouseTimeout = null;
        }, 8);
      };

      window.addEventListener("touchmove", handleTouch);
      window.addEventListener("touchstart", handleTouch);
    } else {
      window.addEventListener("mousemove", mouseMoveHandler);
    }

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
    this.frameCount++;

    requestAnimationFrame((t) => this._animate(t));

    if (this.model) this.pivot.rotation.y += this.options.rotationSpeed;
    if (this.asciiPass) this.asciiPass.uniforms.time.value = time * 0.00000009;
    this.composer.render();
  }

  updateScale(scale) {
    const adjustedScale = this.isMobile ? scale * 0.85 : scale;
    if (this.model) {
      this.model.scale.set(adjustedScale, adjustedScale, adjustedScale);
    }
    this.options.scale = adjustedScale;
  }

  updatePosition(x, y, z) {
    const adjustedX = this.isMobile ? x * 0.85 : x;
    const adjustedY = this.isMobile ? y * 0.85 : y;
    if (this.containerGroup) {
      this.containerGroup.position.set(adjustedX, adjustedY, z);
    }
    this.options.position = { x: adjustedX, y: adjustedY, z };
  }

  updateRotation(x, y, z) {
    if (this.containerGroup) {
      this.containerGroup.rotation.set(x, y, z);
    }
    this.options.rotation = { x, y, z };
  }

  updateRotationSpeed(speed) {
    this.options.rotationSpeed = this.isMobile ? speed * 0.85 : speed;
  }

  getPerformanceInfo() {
    return {
      isMobile: this.isMobile,
      settings: this.performanceSettings,
      scale: this.options.scale,
      position: this.options.position,
    };
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
