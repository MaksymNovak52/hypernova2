import * as THREE from "three";

export const createSmallAsciiStar = (size = 24) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = size;
  canvas.height = size;

  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#ffffff";
  ctx.font = `${size * 0.6}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const starSymbols = ["*", "✦", "✧", "⋆", "★", "☆", "+", "·"];
  const symbol = starSymbols[Math.floor(Math.random() * starSymbols.length)];

  ctx.fillText(symbol, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};
