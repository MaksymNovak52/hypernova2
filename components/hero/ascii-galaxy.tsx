"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = { width?: number; height?: number; left?: string; top?: string };

export function ASCIIGalaxy3D({
  width = 1200,
  height = 1000,
  left = " sm:left-[40%] left-[60%]",
  top = "top-[65%]",
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  const [asciiWidth, setAsciiWidth] = useState(width);
  const [brightness] = useState(10);
  const [contrast] = useState(1000);
  const [blur] = useState(1);
  const [invert] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

    // компактні розміри для мобільних
    const W = width;
    const H = height;
    container.style.width = `${W}px`;
    container.style.height = `${H}px`;

    const asciiPre = document.createElement("pre");
    Object.assign(asciiPre.style, {
      fontFamily: "monospace",
      fontSize: isMobile ? "8px" : "8px",
      lineHeight: isMobile ? "8px" : "6px",
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

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance",
      preserveDrawingBuffer: false,
    });
    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)
    );
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    (renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();
    let activeCamera: THREE.Camera = new THREE.PerspectiveCamera(
      90,
      W / H,
      0.1,
      2000
    );
    (activeCamera as THREE.PerspectiveCamera).position.set(0, 0, 6);

    // Lights (спрощуємо на мобільних)
    const ambient = new THREE.AmbientLight(0xffffff, isMobile ? 0.6 : 0.1);
    scene.add(ambient);

    if (!isMobile) {
      const key = new THREE.DirectionalLight(0xffffff, 1.35);
      key.position.set(4, 6, 8);
      const rim = new THREE.DirectionalLight(0xffffff, 0.9);
      rim.position.set(-3, 4, -6);
      const fill = new THREE.DirectionalLight(0xffffff, 0.4);
      fill.position.set(-6, 0.5, 4);
      const spot = new THREE.SpotLight(
        0xffffff,
        2.1,
        0,
        Math.PI / 5,
        0.22,
        1.2
      );
      spot.position.set(6, 10, 8);
      spot.castShadow = true;
      spot.shadow.mapSize.set(1024, 1024);
      spot.shadow.radius = 2;
      spot.shadow.bias = -0.00022;
      scene.add(key, rim, fill, spot, spot.target);
    }

    // Root group
    const root = new THREE.Group();
    scene.add(root);

    // Ground (лише на десктопі для тіней)
    let ground: THREE.Mesh | null = null;
    if (!isMobile) {
      ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.ShadowMaterial({ opacity: 0.92 })
      );
      ground.receiveShadow = true;
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.75;
      scene.add(ground);
    }

    // Canvas для зчитування
    const grab = document.createElement("canvas");
    grab.width = W;
    grab.height = H;
    const g2d = grab.getContext("2d", { willReadFrequently: true })!;

    // попередні обчислення контрасту
    const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    // більші кроки на мобільних (менше семплів → швидше)
    const sx = isMobile ? 6 : 4;
    const sy = isMobile ? 12 : 8;

    // частота ASCII (нижча на мобільних)
    const asciiFps = isMobile ? 11 : 20;
    const asciiInterval = 1000 / asciiFps;

    // гаму/інші константи лишаємо
    const gamma = 1.0,
      k = 10.5,
      lift = -0.015,
      gain = 0.82;
    const vigStrength = 0.9,
      vigPower = 1.6;
    const edgeFloor = 0.35,
      bgCut = 0.02;

    const chars =
      " .`^,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$".split(
        ""
      );
    const charLen = chars.length - 1;

    // конвертер у ASCII (оптимізований)
    const toASCII = (img: ImageData, w: number, h: number) => {
      // збираємо рядок через масив — менше навантаження на GC
      const lines: string[] = [];
      let outLine: string[] = [];

      // легкий блюр лише якщо треба
      if (blur > 0) {
        g2d.filter = `blur(${blur}px)`;
        g2d.drawImage(renderer.domElement, 0, 0, w, h);
        img = g2d.getImageData(0, 0, w, h);
        g2d.filter = "none";
      }

      for (let y = 0; y < h; y += sy) {
        outLine.length = 0;
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
            outLine.push(" ");
            continue;
          }

          let v0 = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (v0 < bgCut) {
            outLine.push(" ");
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
          outLine.push(chars[idx]);
        }
        lines.push(outLine.join(""));
      }
      return lines.join("\n");
    };

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    // Завантаження моделі
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
            pc.aspect = W / H;
            pc.updateProjectionMatrix();
          }
        }

        if (gltf.scene) {
          gltf.scene.traverse((obj) => {
            if ((obj as THREE.Mesh).isMesh) {
              const m = obj as THREE.Mesh;
              m.castShadow = !isMobile && true;
              m.receiveShadow = false;
              const prev = (m.material as THREE.Material) || undefined;
              // легкий матеріал
              m.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
              (prev as any)?.dispose?.();
            }
          });

          // нормалізація сценки
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const targetSize = 3.0;
          const scale = targetSize / maxDim;
          gltf.scene.scale.setScalar(scale);

          box.setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          gltf.scene.position.sub(center);

          if (ground) {
            box.setFromObject(gltf.scene);
            const minY = box.min.y;
            const liftY = -minY + 0.12;
            gltf.scene.position.y += liftY;
            ground.position.y = -0.02;
          }

          root.add(gltf.scene);
        }

        loaded = true;
      } catch {
        const geo = new THREE.IcosahedronGeometry(1.8, 1);
        const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const mesh = new THREE.Mesh(geo, mat);
        root.add(mesh);
        loaded = true;
      }
    })();

    // Анімація: throttling + пауза якщо невидимо
    let lastAsciiTime = 0;
    let running = true;

    const tick = (time: number) => {
      if (!running) return;

      // помірні оберти (менше перерахунків)
      root.rotation.y += isMobile ? 0.004 : 0.007;
      root.rotation.x += isMobile ? 0.0015 : 0.0025;

      renderer.render(scene, activeCamera);

      if (loaded && time - lastAsciiTime > asciiInterval) {
        const w = Math.min(asciiWidth, W);
        g2d.drawImage(renderer.domElement, 0, 0, w, H);
        const img = g2d.getImageData(0, 0, w, H);
        asciiPre.textContent = toASCII(img, w, H);
        lastAsciiTime = time;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    // пауза коли елемент не в viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          running = e.isIntersecting && !document.hidden;
          if (running) requestAnimationFrame(tick);
        });
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    let resizeTid: number | null = null;
    const onResize = () => {
      if (resizeTid) window.clearTimeout(resizeTid);
      resizeTid = window.setTimeout(() => {
        const w = container.clientWidth || W;
        const h = container.clientHeight || H;
        renderer.setSize(w, h);
        grab.width = w;
        grab.height = h;
        if ((activeCamera as any).isPerspectiveCamera) {
          const pc = activeCamera as THREE.PerspectiveCamera;
          pc.aspect = w / h;
          pc.updateProjectionMatrix();
        }
      }, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      window.removeEventListener("resize", onResize);

      try {
        container.removeChild(asciiPre);
      } catch {}

      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as
          | THREE.Material
          | THREE.Material[]
          | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose?.());
        else mat?.dispose?.();
      });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, asciiWidth]); // не прив'язуємось до brightness/contrast/blur/invert щоб не перевлаштовувати сцену

  return (
    <div
      ref={mountRef}
      style={{ zIndex: -1 }}
      className={`absolute ${left} ${top} -translate-x-1/2 -translate-y-1/2 z-0 rotate-[13deg]`}
    />
  );
}
