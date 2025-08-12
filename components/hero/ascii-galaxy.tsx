"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = { width?: number; height?: number; left?: string; top?: string };

export function ASCIIGalaxy3D({
  width = 1200,
  height = 1000,
  left = "left-[40%]",
  top = "top-[60%]",
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [asciiWidth, setAsciiWidth] = useState(width);
  const [brightness, setBrightness] = useState(10);
  const [contrast, setContrast] = useState(1000);
  const [blur, setBlur] = useState(1);
  const [invert, setInvert] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    const asciiPre = document.createElement("pre");
    Object.assign(asciiPre.style, {
      fontFamily: "monospace",
      fontSize: "8px",
      lineHeight: "6px",
      margin: "0",
      padding: "0",
      color: "#ffffff",
      background: "transparent",
      position: "absolute",
      inset: "0",
      pointerEvents: "none",
      whiteSpace: "pre",
      userSelect: "none",
    } as CSSStyleDeclaration);
    container.appendChild(asciiPre);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    (renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    let activeCamera: THREE.Camera = new THREE.PerspectiveCamera(
      90,
      width / height,
      0.1,
      2000
    );
    (activeCamera as THREE.PerspectiveCamera).position.set(0, 0, 6);

    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(4, 6, 8);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(-3, 4, -6);
    const fill = new THREE.DirectionalLight(0xffffff, 0.4);
    fill.position.set(-6, 0.5, 4);
    const spot = new THREE.SpotLight(0xffffff, 2.1, 0, Math.PI / 5, 0.22, 1.2);
    spot.position.set(6, 10, 8);
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    spot.shadow.radius = 2;
    spot.shadow.bias = -0.00022;

    scene.add(ambient, key, rim, fill, spot, spot.target);

    const root = new THREE.Group();
    scene.add(root);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.ShadowMaterial({ opacity: 0.92 })
    );
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.75;
    scene.add(ground);

    const grab = document.createElement("canvas");
    grab.width = width;
    grab.height = height;
    const g2d = grab.getContext("2d", { willReadFrequently: true })!;

    const toASCII = (img: ImageData, w: number, h: number) => {
      const chars =
        " .`^,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$".split(
          ""
        );
      const charLen = chars.length - 1;

      const sx = 4,
        sy = 8;
      const gamma = 1.0,
        k = 10.5,
        lift = -0.015,
        gain = 0.82;
      const vigStrength = 0.9,
        vigPower = 1.6;
      const edgeFloor = 0.35,
        bgCut = 0.02;

      const contrastFactor =
        (259 * (contrast + 255)) / (255 * (259 - contrast));

      if (blur > 0) {
        g2d.filter = `blur(${blur}px)`;
        g2d.drawImage(renderer.domElement, 0, 0, w, h);
        img = g2d.getImageData(0, 0, w, h);
      }

      let out = "";
      for (let y = 0; y < h; y += sy) {
        const ny = (y + sy * 0.5) / h - 0.5;
        for (let x = 0; x < w; x += sx) {
          const cx = Math.min(w - 1, x + (sx >> 1));
          const cy = Math.min(h - 1, y + (sy >> 1));
          const i = (cy * w + cx) * 4;

          let r = img.data[i] / 255,
            g = img.data[i + 1] / 255,
            b = img.data[i + 2] / 255,
            a = img.data[i + 3] / 255;

          if (a < 0.01) {
            out += " ";
            continue;
          }

          let v0 = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (v0 < bgCut) {
            out += " ";
            continue;
          }

          if (invert) v0 = 1 - v0;

          let v =
            clamp(
              contrastFactor * (v0 * 255 - 128) + 128 + brightness,
              0,
              255
            ) / 255;

          v = Math.pow(v, gamma);
          v = 1 / (1 + Math.exp(-k * (v - 0.5)));
          v = Math.min(1, Math.max(0, v * gain + lift));

          const nx = (x + sx * 0.5) / w - 0.5;
          const distSq = nx * nx + ny * ny;
          let vig = 1 - Math.sqrt(distSq) / (0.5 / Math.min(1, vigStrength));
          vig = Math.max(0, Math.min(1, Math.pow(Math.max(0, vig), vigPower)));

          const vigMix = edgeFloor + (1 - edgeFloor) * vig;
          v *= vigMix;

          const idx = Math.max(0, Math.min(charLen, Math.floor(v * charLen)));
          out += chars[idx];
        }
        out += "\n";
      }
      return out;
    };

    let loaded = false;
    (async () => {
      try {
        const { GLTFLoader } = await import(
          "three/examples/jsm/loaders/GLTFLoader.js"
        );
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(
          "https://etzdcequxtapvhzpdyfk.supabase.co/storage/v1/object/public/test/hypernova.glb"
        );

        let cam: THREE.Camera | undefined =
          gltf.cameras?.find((c: any) => c.name?.toLowerCase() === "camera") ||
          gltf.cameras?.[0];
        if (!cam) {
          gltf.scene.traverse((o) => {
            if (!cam && (o as any).isCamera) cam = o as THREE.Camera;
          });
        }
        if (cam) {
          activeCamera = cam;
          if (!cam.parent) scene.add(cam);
          if ((activeCamera as any).isPerspectiveCamera) {
            const pc = activeCamera as THREE.PerspectiveCamera;
            pc.aspect = width / height;
            pc.updateProjectionMatrix();
          }
        }

        if (gltf.scene) {
          gltf.scene.traverse((obj) => {
            if ((obj as THREE.Mesh).isMesh) {
              const m = obj as THREE.Mesh;
              m.castShadow = true;
              m.receiveShadow = false;
              const prev = (m.material as THREE.Material) || undefined;
              m.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
              if (prev && (prev as any).dispose) (prev as any).dispose();
            }
          });

          const box = new THREE.Box3().setFromObject(gltf.scene);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const targetSize = 3.0;
          const scale = targetSize / maxDim;
          gltf.scene.scale.setScalar(scale);

          box.setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          gltf.scene.position.sub(center);

          box.setFromObject(gltf.scene);
          const minY = box.min.y;
          const lift = -minY + 0.12;
          gltf.scene.position.y += lift;

          ground.position.y = -0.02;

          root.add(gltf.scene);
          spot.target = gltf.scene;
        }

        loaded = true;
      } catch {
        const geo = new THREE.IcosahedronGeometry(1.8, 2);
        const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        root.add(mesh);
        loaded = true;
      }
    })();

    let lastAsciiTime = 0;
    const asciiFps = 20;
    const asciiInterval = 1000 / asciiFps;

    const tick = () => {
      root.rotation.y += 0.007;
      root.rotation.x += 0.0025;

      renderer.render(scene, activeCamera);

      const now = performance.now();
      if (loaded && now - lastAsciiTime > asciiInterval) {
        g2d.drawImage(renderer.domElement, 0, 0, asciiWidth, height);
        const img = g2d.getImageData(0, 0, asciiWidth, height);
        asciiPre.textContent = toASCII(img, asciiWidth, height);
        lastAsciiTime = now;
      }
    };

    renderer.setAnimationLoop(tick);

    const onResize = () => {
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      renderer.setSize(w, h);
      grab.width = w;
      grab.height = h;
      if ((activeCamera as any).isPerspectiveCamera) {
        const pc = activeCamera as THREE.PerspectiveCamera;
        pc.aspect = w / h;
        pc.updateProjectionMatrix();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", onResize);
      try {
        container.removeChild(asciiPre);
      } catch {}
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose?.();
        const mat = mesh.material as
          | THREE.Material
          | THREE.Material[]
          | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose?.());
        else mat?.dispose?.();
      });
      renderer.dispose();
    };
  }, [width, height, asciiWidth, brightness, contrast, blur, invert]);

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  return (
    <>
      <div
        ref={mountRef}
        style={{ zIndex: -1 }}
        className={`absolute  ${left}  ${top} -translate-x-1/2 -translate-y-1/2 z-0 rotate-[13deg]`}
      />
      {/* <div className="fixed bottom-0 flex flex-col items-center">
        <div className="controls bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
          <h3 className="text-white text-lg mb-4">Basic Adjustments</h3>
          <div className="mb-4">
            <label className="text-white block mb-1">
              Output Width (chars): {asciiWidth}
            </label>
            <input
              type="range"
              min="20"
              max="1200"
              value={asciiWidth}
              onChange={(e) => setAsciiWidth(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-1">
              Brightness: {brightness}
            </label>
            <input
              type="range"
              min="-100"
              max="1200"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-1">
              Contrast: {contrast}
            </label>
            <input
              type="range"
              min="-100"
              max="1200"
              value={contrast}
              onChange={(e) => setContrast(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-1">Blur (px): {blur}</label>
            <input
              type="range"
              min="0"
              max="1200"
              step="0.1"
              value={blur}
              onChange={(e) => setBlur(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="text-white flex items-center">
              <input
                type="checkbox"
                checked={invert}
                onChange={(e) => setInvert(e.target.checked)}
                className="mr-2"
              />
              Invert Colors
            </label>
          </div>
        </div>
      </div> */}
    </>
  );
}
