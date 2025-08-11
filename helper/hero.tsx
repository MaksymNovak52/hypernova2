"use client";
import * as THREE from "three";

function createAsciiTexture(char: string, size = 64): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context not supported");

  ctx.fillStyle = "white";
  ctx.font = `bold ${size / 2}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createSoftBeamTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context not supported");

  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0.0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.08)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.15)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.08)");
  gradient.addColorStop(1.0, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}
export { createAsciiTexture, createSoftBeamTexture };
