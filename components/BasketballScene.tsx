"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BasketballScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progBarRef = useRef<HTMLDivElement>(null);
  const ph0Ref = useRef<HTMLDivElement>(null);
  const ph1Ref = useRef<HTMLDivElement>(null);
  const ph2Ref = useRef<HTMLDivElement>(null);
  const ph3Ref = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const swishFlashRef = useRef<HTMLDivElement>(null);
  const basketGlowRef = useRef<HTMLDivElement>(null);
  const scorePopRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const statTickerRef = useRef<HTMLDivElement>(null);
  const speedIndicatorRef = useRef<HTMLDivElement>(null);
  const segRef0 = useRef<HTMLDivElement>(null);
  const segRef1 = useRef<HTMLDivElement>(null);
  const segRef2 = useRef<HTMLDivElement>(null);
  const segRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── REDUCED MOTION FALLBACK ──
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 66;
        const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        grad.addColorStop(0, "#1a1a1a");
        grad.addColorStop(1, "#060606");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffb800";
        ctx.font = `bold ${Math.min(canvas.width, canvas.height) * 0.1}px 'Russo One', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("MPBL 2026", canvas.width / 2, canvas.height / 2);
      }
      return;
    }

    const getNavOffset = () => document.querySelector("nav")?.offsetHeight ?? 66;

    const W = window.innerWidth;
    const H = window.innerHeight - getNavOffset();

    let animProgress = 0;
    let animActive = true;

    // ── OFF-SCREEN PAUSE ──
    const observer = new IntersectionObserver(
      ([entry]) => { animActive = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606);
    scene.fog = new THREE.FogExp2(0x060606, 0.035);

    const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 200);
    camera.position.set(0, 5, 23);
    camera.lookAt(0, 3.5, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(W, stickyRef.current?.offsetHeight ?? H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    scene.add(new THREE.AmbientLight(0x101018, 0.6));

    const courtSpot = new THREE.SpotLight(0xffffff, 1.8, 60, Math.PI / 4.5, 0.35);
    courtSpot.position.set(0, 28, 6);
    courtSpot.castShadow = true;
    courtSpot.shadow.mapSize.set(1024, 1024);
    scene.add(courtSpot);
    scene.add(courtSpot.target);

    const rimOrange = new THREE.PointLight(0xff4500, 2.2, 14);
    rimOrange.position.set(9, 5, 3);
    scene.add(rimOrange);

    const basketLight = new THREE.PointLight(0xffc107, 1.8, 11);
    basketLight.position.set(-9.5, 5.5, 0);
    scene.add(basketLight);

    const fillBlue = new THREE.DirectionalLight(0x0a0a2a, 0.4);
    fillBlue.position.set(-5, 2, -10);
    scene.add(fillBlue);

    const spot2 = new THREE.SpotLight(0xfff5e0, 0.7, 55, Math.PI / 5.5, 0.55);
    spot2.position.set(-11, 26, -4);
    scene.add(spot2);
    const spot3 = new THREE.SpotLight(0xfff5e0, 0.6, 55, Math.PI / 5.5, 0.55);
    spot3.position.set(9, 26, 4);
    scene.add(spot3);

    /* ── HARDWOOD COURT TEXTURE ──────────────────────────────── */
    const woodCanvas = document.createElement("canvas");
    woodCanvas.width = 1024;
    woodCanvas.height = 512;
    const wc = woodCanvas.getContext("2d")!;

    wc.fillStyle = "#7c4a1e";
    wc.fillRect(0, 0, 1024, 512);

    const plankH = 512 / 38;
    for (let row = 0; row < 38; row++) {
      const y = row * plankH;
      wc.fillStyle = row % 2 === 0 ? "#7a481c" : "#844f21";
      wc.fillRect(0, y, 1024, plankH);
      wc.strokeStyle = "#5a3312";
      wc.lineWidth = 0.6;
      wc.beginPath();
      wc.moveTo(0, y + plankH);
      wc.lineTo(1024, y + plankH);
      wc.stroke();
      for (let g = 0; g < 3 + Math.floor(Math.random() * 2); g++) {
        const gx1 = Math.random() * 1024;
        const gx2 = Math.random() * 1024;
        wc.strokeStyle = "rgba(80,40,10,0.08)";
        wc.lineWidth = 0.5;
        wc.beginPath();
        wc.moveTo(gx1, y + Math.random() * plankH);
        wc.bezierCurveTo(
          gx1 + (Math.random() - 0.5) * 200,
          y + Math.random() * plankH,
          gx2 + (Math.random() - 0.5) * 200,
          y + Math.random() * plankH,
          gx2,
          y + Math.random() * plankH
        );
        wc.stroke();
      }
    }

    const vGrad1 = wc.createLinearGradient(0, 0, 1024, 512);
    vGrad1.addColorStop(0, "rgba(255,220,120,0)");
    vGrad1.addColorStop(0.3, "rgba(255,220,120,0.04)");
    vGrad1.addColorStop(0.6, "rgba(255,220,120,0)");
    wc.fillStyle = vGrad1;
    wc.fillRect(0, 0, 1024, 512);

    const mapX = (x: number) => ((x + 16) / 32) * 1024;
    const mapZ = (z: number) => ((z + 11) / 22) * 512;
    wc.strokeStyle = "#d4a855";
    wc.lineWidth = 4;
    wc.strokeRect(mapX(-15.5), mapZ(-10), mapX(15.5) - mapX(-15.5), mapZ(10) - mapZ(-10));
    wc.strokeRect(mapX(-14), mapZ(-2.6), mapX(-7.2) - mapX(-14), mapZ(2.6) - mapZ(-2.6));

    const woodTexture = new THREE.CanvasTexture(woodCanvas);
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(1, 1);

    const floorGeo = new THREE.PlaneGeometry(32, 22);
    const floorMat = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.78,
      metalness: 0.04,
      envMapIntensity: 0.3,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    /* ── REFLECTION OVERLAY ──────────────────────────────────── */
    const reflMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.04,
      roughness: 0.1,
      metalness: 0.9,
    });
    const reflMesh = new THREE.Mesh(new THREE.PlaneGeometry(32, 22), reflMat);
    reflMesh.rotation.x = -Math.PI / 2;
    reflMesh.position.y = 0.002;
    scene.add(reflMesh);

    /* ── ARENA SHELL ────────────────────────────────────────── */

    /* side walls — Z = ±16 */
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0f, roughness: 0.95 });
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0x1a0500, emissive: 0x1a0500, emissiveIntensity: 0.3 });

    const wallGeo = new THREE.BoxGeometry(32, 14, 0.3);
    [-16, 16].forEach((z) => {
      const w = new THREE.Mesh(wallGeo, wallMat);
      w.position.set(0, 7, z);
      scene.add(w);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(32, 0.2, 0.35), stripeMat);
      stripe.position.set(0, 0.1, z);
      scene.add(stripe);
    });

    /* back walls — X = ±17 */
    const backWallGeo = new THREE.BoxGeometry(0.3, 14, 32);
    [-17, 17].forEach((x) => {
      const bw = new THREE.Mesh(backWallGeo, wallMat);
      bw.position.set(x, 7, 0);
      scene.add(bw);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.2, 32), stripeMat);
      stripe.position.set(x, 0.1, 0);
      scene.add(stripe);
    });

    /* ceiling */
    const ceilMat = new THREE.MeshStandardMaterial({ color: 0x080808 });
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(34, 34), ceilMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 16;
    scene.add(ceiling);

    /* court logo — MPBL centre circle */
    const logoCanvas = document.createElement("canvas");
    logoCanvas.width = logoCanvas.height = 512;
    const lx = logoCanvas.getContext("2d")!;
    lx.clearRect(0, 0, 512, 512);
    lx.strokeStyle = "#2e1a08";
    lx.lineWidth = 8;
    lx.beginPath();
    lx.arc(256, 256, 180, 0, Math.PI * 2);
    lx.stroke();
    lx.lineWidth = 3;
    lx.beginPath();
    lx.arc(256, 256, 140, 0, Math.PI * 2);
    lx.stroke();
    lx.fillStyle = "#1a0900";
    lx.font = "bold 64px 'Barlow Condensed', sans-serif";
    lx.textAlign = "center";
    lx.textBaseline = "middle";
    lx.fillText("MPBL", 256, 256);
    const logoTex = new THREE.CanvasTexture(logoCanvas);
    const logoMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, opacity: 0.35, depthWrite: false });
    const logoMesh = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32), logoMat);
    logoMesh.rotation.x = -Math.PI / 2;
    logoMesh.position.set(0, 0.005, 0);
    scene.add(logoMesh);

    /* arena light rigs — 4 corners */
    const rigMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const rigGeo = new THREE.BoxGeometry(0.15, 0.06, 0.6);
    const cornerPositions: [number, number, number][] = [
      [-14, 13, -10], [-14, 13, 10],
      [14, 13, -10], [14, 13, 10],
    ];
    cornerPositions.forEach(([x, y, z]) => {
      const housing = new THREE.Mesh(rigGeo, rigMat);
      housing.position.set(x, y, z);
      scene.add(housing);
      const spot = new THREE.SpotLight(0xfff8e7, 1.2, 40, Math.PI / 6, 0.4);
      spot.position.set(x, y, z);
      spot.castShadow = true;
      spot.shadow.mapSize.set(512, 512);
      spot.target.position.set(0, 0, 0);
      scene.add(spot);
      scene.add(spot.target);
      const rectLight = new THREE.RectAreaLight(0xfff8e7, 2.0, 0.8, 0.3);
      rectLight.position.set(x, y, z);
      rectLight.lookAt(0, 0, 0);
      scene.add(rectLight);
    });

    const lnMat = new THREE.LineBasicMaterial({ color: 0xd4a855 });
    const addLine = (pts: THREE.Vector3[]) =>
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lnMat));
    const addLoop = (pts: THREE.Vector3[]) =>
      scene.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), lnMat));

    addLine([new THREE.Vector3(0, 0.01, -11), new THREE.Vector3(0, 0.01, 11)]);
    const arcPts: THREE.Vector3[] = [];
    for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.08)
      arcPts.push(new THREE.Vector3(-7.5 + Math.cos(a) * 7.8, 0.01, Math.sin(a) * 7.8));
    addLine(arcPts);
    addLoop([
      new THREE.Vector3(-14, 0.01, -2.6),
      new THREE.Vector3(-7.2, 0.01, -2.6),
      new THREE.Vector3(-7.2, 0.01, 2.6),
      new THREE.Vector3(-14, 0.01, 2.6),
    ]);
    const kcPts: THREE.Vector3[] = [];
    for (let a = 0; a <= Math.PI; a += 0.12)
      kcPts.push(new THREE.Vector3(-7.2 - Math.sin(a) * 1.8, 0.01, Math.cos(a) * 1.8));
    addLine(kcPts);

    const playerGroup = new THREE.Group();
    playerGroup.position.set(7.6, 0, 0);
    scene.add(playerGroup);

    const pMat = new THREE.MeshPhongMaterial({
      color: 0x0d0d28,
      specular: 0xff4400,
      shininess: 45,
      emissive: 0x080818,
    });
    const pMatRed = new THREE.MeshPhongMaterial({
      color: 0xcc2800,
      specular: 0xff5500,
      shininess: 60,
    });

    const pMesh = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
      rx = 0,
      ry = 0,
      rz = 0
    ) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      m.castShadow = true;
      playerGroup.add(m);
      return m;
    };

    pMesh(new THREE.SphereGeometry(0.32, 10, 10), pMat, 0, 2.12, 0);
    pMesh(new THREE.CylinderGeometry(0.27, 0.24, 0.82, 8), pMat, 0, 1.46, 0);
    pMesh(new THREE.CylinderGeometry(0.27, 0.24, 0.12, 8), pMatRed, 0, 1.58, 0);
    const rUA = pMesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.46, 8),
      pMat,
      0.42,
      1.66,
      0,
      0,
      0,
      -0.3
    );
    const rLA = pMesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8),
      pMat,
      0.75,
      1.92,
      0,
      0,
      0,
      0.15
    );
    const lUA = pMesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.46, 8),
      pMat,
      -0.4,
      1.63,
      0,
      0,
      0,
      0.32
    );
    const lLA = pMesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8),
      pMat,
      -0.62,
      1.88,
      0.05,
      0,
      0,
      0.08
    );
    pMesh(new THREE.CylinderGeometry(0.14, 0.12, 0.58, 8), pMat, 0.2, 0.76, 0);
    pMesh(new THREE.CylinderGeometry(0.14, 0.12, 0.58, 8), pMat, -0.2, 0.76, 0);
    pMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8), pMat, 0.22, 0.21, 0);
    pMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8), pMat, -0.22, 0.21, 0);
    pMesh(new THREE.BoxGeometry(0.22, 0.1, 0.34), pMat, 0.24, -0.04, 0.08);
    pMesh(new THREE.BoxGeometry(0.22, 0.1, 0.34), pMat, -0.24, -0.04, 0.08);

    const pShadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.72, 20),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.42 })
    );
    pShadow.rotation.x = -Math.PI / 2;
    pShadow.position.set(7.6, 0.004, 0);
    scene.add(pShadow);

    const jerseyCtx = document.createElement("canvas");
    jerseyCtx.width = jerseyCtx.height = 64;
    const jx = jerseyCtx.getContext("2d")!;
    jx.fillStyle = "#cc2800";
    jx.fillRect(0, 0, 64, 64);
    jx.fillStyle = "#ffffff";
    jx.font = "bold 28px sans-serif";
    jx.textAlign = "center";
    jx.fillText("11", 32, 40);
    const jerseyDecal = new THREE.Mesh(
      new THREE.PlaneGeometry(0.28, 0.28),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(jerseyCtx),
        transparent: true,
      })
    );
    jerseyDecal.position.set(0.12, 1.52, 0.26);
    playerGroup.add(jerseyDecal);

    /* ── DEFENDER PLAYER (Team Purple) ───────────────────────── */
    const defenderGroup = new THREE.Group();
    defenderGroup.position.set(6.2, 0, 0.9);
    defenderGroup.rotation.y = Math.PI * 0.85;
    scene.add(defenderGroup);

    const pMatDef = new THREE.MeshPhongMaterial({
      color: 0x1a0028, specular: 0x6600aa, shininess: 45,
    });
    const pMatDefJersey = new THREE.MeshPhongMaterial({
      color: 0x2d0044, specular: 0x7700bb, shininess: 60,
    });

    const dMesh = (
      geo: THREE.BufferGeometry, mat: THREE.Material,
      x: number, y: number, z: number,
      rx = 0, ry = 0, rz = 0
    ) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      m.castShadow = true;
      defenderGroup.add(m);
      return m;
    };

    dMesh(new THREE.SphereGeometry(0.32, 10, 10), pMatDef, 0, 2.12, 0);
    dMesh(new THREE.CylinderGeometry(0.27, 0.24, 0.82, 8), pMatDef, 0, 1.46, 0);
    dMesh(new THREE.CylinderGeometry(0.27, 0.24, 0.12, 8), pMatDefJersey, 0, 1.58, 0);
    const rUA_d = dMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.46, 8), pMatDef, 0.42, 1.66, 0, 0, 0, -0.2);
    const rLA_d = dMesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8), pMatDef, 0.75, 1.92, 0, 0, 0, 0.1);
    const lUA_d = dMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.46, 8), pMatDef, -0.4, 1.63, 0, 0, 0, 0.32);
    const lLA_d = dMesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8), pMatDef, -0.62, 1.88, 0.05, 0, 0, 0.08);
    dMesh(new THREE.CylinderGeometry(0.14, 0.12, 0.58, 8), pMatDef, 0.2, 0.76, 0);
    dMesh(new THREE.CylinderGeometry(0.14, 0.12, 0.58, 8), pMatDef, -0.2, 0.76, 0);
    dMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8), pMatDef, 0.22, 0.21, 0);
    dMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8), pMatDef, -0.22, 0.21, 0);
    dMesh(new THREE.BoxGeometry(0.22, 0.1, 0.34), pMatDef, 0.24, -0.04, 0.08);
    dMesh(new THREE.BoxGeometry(0.22, 0.1, 0.34), pMatDef, -0.24, -0.04, 0.08);

    /* defender shadow */
    const defShadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.72, 20),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.42 })
    );
    defShadow.rotation.x = -Math.PI / 2;
    defShadow.position.set(6.2, 0.004, 0.9);
    scene.add(defShadow);

    /* defender jersey "07" decal */
    const defJerseyCtx = document.createElement("canvas");
    defJerseyCtx.width = defJerseyCtx.height = 64;
    const djx = defJerseyCtx.getContext("2d")!;
    djx.fillStyle = "#2d0044";
    djx.fillRect(0, 0, 64, 64);
    djx.fillStyle = "#ffffff";
    djx.font = "bold 28px sans-serif";
    djx.textAlign = "center";
    djx.fillText("07", 32, 40);
    const defJerseyDecal = new THREE.Mesh(
      new THREE.PlaneGeometry(0.28, 0.28),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(defJerseyCtx),
        transparent: true,
      })
    );
    defJerseyDecal.position.set(0.12, 1.52, 0.26);
    defenderGroup.add(defJerseyDecal);

    /* ── BLEACHER TIERS ──────────────────────────────────────── */
    const bleacherMat = new THREE.MeshStandardMaterial({ color: 0x0d0d18, roughness: 0.9 });

    const addBleacherSide = (zSign: number) => {
      for (let tier = 0; tier < 3; tier++) {
        const z = zSign * (12.5 + tier * 1.8);
        const y = 1.6 + tier * 1.1;
        const bleacher = new THREE.Mesh(new THREE.BoxGeometry(32, 0.2, 1.8), bleacherMat);
        bleacher.position.set(0, y, z);
        bleacher.rotation.x = -0.22 * tier;
        scene.add(bleacher);
      }
    };
    addBleacherSide(1);
    addBleacherSide(-1);

    /* ── CROWD SILHOUETTES ON BLEACHERS ─────────────────────── */
    const crowdMat = new THREE.MeshBasicMaterial({ color: 0x080810 });
    const crowdGroup = new THREE.Group();
    scene.add(crowdGroup);
    for (let tier = 0; tier < 3; tier++) {
      const zBase = 12.5 + tier * 1.8;
      const yBase = 1.6 + tier * 1.1;
      Array.from({ length: 20 }, (_, i) => -18 + i * 2).forEach((x) => {
        if (Math.random() > 0.1) {
          const hh = new THREE.Mesh(new THREE.SphereGeometry(0.25 + Math.random() * 0.08, 5, 5), crowdMat);
          hh.position.set(x + (Math.random() - 0.5) * 0.5, yBase + 0.65, zBase);
          crowdGroup.add(hh);
          const hb = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.55 + Math.random() * 0.2, 5), crowdMat);
          hb.position.set(x + (Math.random() - 0.5) * 0.5, yBase, zBase);
          crowdGroup.add(hb);
        }
        if (Math.random() > 0.1) {
          const hh = new THREE.Mesh(new THREE.SphereGeometry(0.25 + Math.random() * 0.08, 5, 5), crowdMat);
          hh.position.set(x + (Math.random() - 0.5) * 0.5, yBase + 0.65, -zBase);
          crowdGroup.add(hh);
          const hb = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.55 + Math.random() * 0.2, 5), crowdMat);
          hb.position.set(x + (Math.random() - 0.5) * 0.5, yBase, -zBase);
          crowdGroup.add(hb);
        }
      });
    }

    /* ── GOD RAYS ────────────────────────────────────────────── */
    const godRayCones: { outer: THREE.Mesh; inner: THREE.Mesh }[] = [];
    const rayPositions: [number, number, number][] = [
      [-14, 13, -10], [-14, 13, 10],
      [14, 13, -10], [14, 13, 10],
    ];
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xfff5c0, transparent: true, opacity: 0.025,
      side: THREE.BackSide, depthWrite: false,
    });
    const rayInnerMat = new THREE.MeshBasicMaterial({
      color: 0xfff5c0, transparent: true, opacity: 0.018,
      side: THREE.BackSide, depthWrite: false,
    });
    const coneGeo = new THREE.ConeGeometry(0.6, 13, 8, 1, true);
    const coneInnerGeo = new THREE.ConeGeometry(0.2, 13, 8, 1, true);
    rayPositions.forEach(([x, y, z]) => {
      const outer = new THREE.Mesh(coneGeo, rayMat.clone());
      outer.position.set(x, y, z);
      outer.rotation.x = Math.PI;
      scene.add(outer);
      const inner = new THREE.Mesh(coneInnerGeo, rayInnerMat.clone());
      inner.position.set(x, y, z);
      inner.rotation.x = Math.PI;
      scene.add(inner);
      godRayCones.push({ outer, inner });
    });

    /* ── DUST PARTICLES ──────────────────────────────────────── */
    const DUST_COUNT = 200;
    const dPos = new Float32Array(DUST_COUNT * 3);
    const dDrift: number[] = [];
    for (let i = 0; i < DUST_COUNT; i++) {
      dPos[i * 3] = (Math.random() - 0.5) * 30;
      dPos[i * 3 + 1] = 8 + Math.random() * 6;
      dPos[i * 3 + 2] = (Math.random() - 0.5) * 28;
      dDrift.push(Math.random() * Math.PI * 2);
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
    const dMat = new THREE.PointsMaterial({
      size: 0.08, color: 0xfff8dc, transparent: true,
      opacity: 0.18, depthWrite: false,
    });
    const dustParts = new THREE.Points(dGeo, dMat);
    scene.add(dustParts);

    /* ── CROWD AMBIENT ───────────────────────────────────────── */
    let crowdLerp = 0;
    const originalCrowdColor = new THREE.Color(0x080810);
    const litCrowdColor = new THREE.Color(0x1f1405);

    /* ── HAZE PLANE ──────────────────────────────────────────── */
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a15, transparent: true, opacity: 0.12,
      depthWrite: false, side: THREE.DoubleSide,
    });
    const haze = new THREE.Mesh(new THREE.PlaneGeometry(34, 22), hazeMat);
    haze.rotation.x = -Math.PI / 2;
    haze.position.y = 8;
    scene.add(haze);

    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    const btx = document.createElement("canvas");
    btx.width = btx.height = 512;
    const bx = btx.getContext("2d")!;
    const bg = bx.createRadialGradient(180, 150, 30, 256, 256, 256);
    bg.addColorStop(0, "#e86000");
    bg.addColorStop(0.5, "#c24000");
    bg.addColorStop(1, "#7c2500");
    bx.fillStyle = bg;
    bx.fillRect(0, 0, 512, 512);
    bx.strokeStyle = "#2a0c00";
    bx.lineWidth = 9;
    const seams: [number, number][][] = [
      [
        [0, 256],
        [130, 175],
        [382, 338],
        [512, 256],
      ],
      [
        [0, 256],
        [130, 338],
        [382, 175],
        [512, 256],
      ],
      [
        [256, 0],
        [175, 130],
        [338, 382],
        [256, 512],
      ],
      [
        [256, 0],
        [338, 130],
        [175, 382],
        [256, 512],
      ],
    ];
    seams.forEach((pts) => {
      bx.beginPath();
      bx.moveTo(pts[0][0], pts[0][1]);
      bx.bezierCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1], pts[3][0], pts[3][1]);
      bx.stroke();
    });
    const ballTex = new THREE.CanvasTexture(btx);

    const ballMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.31, 32, 32),
      new THREE.MeshPhongMaterial({
        map: ballTex,
        specular: 0x441100,
        shininess: 90,
      })
    );
    ballMesh.castShadow = true;
    ballGroup.add(ballMesh);

    const ballGlow = new THREE.PointLight(0xff4500, 0, 7);
    ballGroup.add(ballGlow);
    ballGroup.position.set(8.1, 2.65, 0);

    const TRAIL = 10;
    const trailMeshes = Array.from({ length: TRAIL }, (_, i) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.07 * (1 - i / TRAIL), 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xff4500, transparent: true, opacity: 0 })
      );
      scene.add(m);
      return m;
    });
    const trailPos = Array.from({ length: TRAIL }, () => new THREE.Vector3(8.1, 2.65, 0));

    const hoopGroup = new THREE.Group();
    hoopGroup.position.set(-9.8, 0, 0);
    scene.add(hoopGroup);

    const bb = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.1, 1.75),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.82,
        specular: 0xbbbbbb,
        shininess: 100,
      })
    );
    bb.position.set(0, 3.4, 0);
    hoopGroup.add(bb);

    const tbMat = new THREE.LineBasicMaterial({ color: 0xff4500 });
    hoopGroup.add(
      new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0.06, 2.9, -0.3),
          new THREE.Vector3(0.06, 2.9, 0.3),
          new THREE.Vector3(0.06, 3.22, 0.3),
          new THREE.Vector3(0.06, 3.22, -0.3),
        ]),
        tbMat
      )
    );

    const sMat = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 80 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 3.25, 8), sMat);
    pole.position.set(-0.28, 1.62, 0);
    hoopGroup.add(pole);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.55, 6), sMat);
    arm.rotation.z = Math.PI / 2;
    arm.position.set(-0.04, 3.4, 0);
    hoopGroup.add(arm);

    const ringMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.235, 0.026, 8, 32),
      new THREE.MeshPhongMaterial({
        color: 0xff4400,
        specular: 0xff8800,
        shininess: 110,
        emissive: 0x1a0500,
      })
    );
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0.16, 3.06, 0);
    ringMesh.castShadow = true;
    hoopGroup.add(ringMesh);

    const NET_N = 14;
    const NET_SEG = 6;
    const netG = new THREE.Group();
    netG.position.copy(ringMesh.position);
    const netMat = new THREE.LineBasicMaterial({
      color: 0xddddbb,
      transparent: true,
      opacity: 0.8,
    });

    const netStrings: { ln: THREE.Line; basePts: THREE.Vector3[] }[] = [];
    for (let i = 0; i < NET_N; i++) {
      const ang = (i / NET_N) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= NET_SEG; j++) {
        const t = j / NET_SEG;
        const r = 0.235 * (1 - t * 0.86);
        pts.push(new THREE.Vector3(Math.cos(ang) * r, -t * 0.44, Math.sin(ang) * r));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const ln = new THREE.Line(geo, netMat.clone());
      netG.add(ln);
      netStrings.push({ ln, basePts: pts.map((p) => p.clone()) });
    }
    for (let j = 1; j <= NET_SEG; j++) {
      const t = j / NET_SEG;
      const r = 0.235 * (1 - t * 0.86);
      const y = -t * 0.44;
      const hPts: THREE.Vector3[] = [];
      for (let i = 0; i <= NET_N; i++) {
        const a = (i / NET_N) * Math.PI * 2;
        hPts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      netG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(hPts), netMat));
    }
    hoopGroup.add(netG);

    const PC = 72;
    const BASKET_X = -9.8 + 0.16;
    const BASKET_Y = 3.06;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PC * 3);
    const pCol = new Float32Array(PC * 3);
    const pVel: { vx: number; vy: number; vz: number; life: number; dec: number }[] = [];
    for (let i = 0; i < PC; i++) {
      pPos[i * 3] = BASKET_X;
      pPos[i * 3 + 1] = BASKET_Y;
      pPos[i * 3 + 2] = 0;
      const spd = 0.05 + Math.random() * 0.12;
      const ea = Math.random() * Math.PI * 2;
      const el = Math.random() * Math.PI;
      pVel.push({
        vx: Math.sin(el) * Math.cos(ea) * spd,
        vy: Math.cos(el) * spd + 0.04,
        vz: Math.sin(el) * Math.sin(ea) * spd,
        life: 1,
        dec: 0.014 + Math.random() * 0.018,
      });
      const g = Math.random() > 0.5;
      pCol[i * 3] = 1;
      pCol[i * 3 + 1] = g ? 0.75 : 0.38 + Math.random() * 0.2;
      pCol[i * 3 + 2] = 0;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const partMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const parts = new THREE.Points(pGeo, partMat);
    parts.visible = false;
    scene.add(parts);

    const B0 = new THREE.Vector3(8.1, 2.65, 0);
    const B1 = new THREE.Vector3(4.5, 12.5, 0);
    const B2 = new THREE.Vector3(-5.5, 11.5, 0);
    const B3 = new THREE.Vector3(BASKET_X, 3.18, 0);

    const bezier3 = (t: number) => {
      const u = 1 - t;
      return new THREE.Vector3(
        u * u * u * B0.x + 3 * u * u * t * B1.x + 3 * u * t * t * B2.x + t * t * t * B3.x,
        u * u * u * B0.y + 3 * u * u * t * B1.y + 3 * u * t * t * B2.y + t * t * t * B3.y,
        0
      );
    };

    let netSwish = 0;
    let swishActive = false;
    let partsActive = false;
    let scoreShown = false;

    const kfs = [
      { pos: new THREE.Vector3(2, 4.5, 24), look: new THREE.Vector3(0, 3.2, 0), fov: 58 },
      { pos: new THREE.Vector3(-0.5, 5.8, 18), look: new THREE.Vector3(0, 4.5, 0), fov: 52 },
      { pos: new THREE.Vector3(-3, 7.5, 15), look: new THREE.Vector3(2, 5.5, 0), fov: 46 },
      { pos: new THREE.Vector3(-6, 7, 12), look: new THREE.Vector3(-5, 4, 0), fov: 44 },
      { pos: new THREE.Vector3(-9.2, 5.5, 10), look: new THREE.Vector3(-9.6, 3.1, 0), fov: 40 },
    ];
    let targetFov = camera.fov;
    const currentLook = kfs[0].look.clone();
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    gsap.registerPlugin(ScrollTrigger);

    let prevAnimProgress = 0;
    const prevVis = { ph0: true, ph1: false, ph2: false, ph3: false };

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        if (!animActive) return;
        animProgress = self.progress;
        const p = animProgress;

        // ── Directional wipe with exit detection ──
        const curVis = { ph0: p < 0.18, ph1: p >= 0.17 && p < 0.46, ph2: p >= 0.43 && p < 0.74, ph3: p >= 0.8 };
        (Object.entries({ ph0: ph0Ref, ph1: ph1Ref, ph2: ph2Ref, ph3: ph3Ref }) as [keyof typeof curVis, React.RefObject<HTMLDivElement | null>][]).forEach(([key, ref]) => {
          const el = ref.current;
          if (!el) return;
          if (curVis[key]) {
            el.classList.add("vis");
            el.classList.remove("exit");
          } else if (prevVis[key]) {
            el.classList.remove("vis");
            el.classList.add("exit");
            setTimeout(() => el.classList.remove("exit"), 550);
          } else {
            el.classList.remove("vis", "exit");
          }
        });
        Object.assign(prevVis, curVis);

        scrollPromptRef.current?.classList.toggle("gone", p > 0.06);

        // ── Chapter counter ──
        const ch = p < 0.17 ? ["01","GAME POINT"] : p < 0.46 ? ["02","THE RELEASE"] : p < 0.74 ? ["03","IN FLIGHT"] : ["04","NOTHING BUT NET"];
        if (chapterRef.current) {
          const spans = chapterRef.current.querySelectorAll("span");
          if (spans[0]) spans[0].textContent = ch[0] + " / 04";
          if (spans[1]) spans[1].textContent = ch[1];
        }

        // ── Segmented progress bar ──
        [segRef0, segRef1, segRef2, segRef3].forEach((ref, i) => {
          const el = ref.current;
          if (!el) return;
          const segP = Math.max(0, Math.min(1, (p - i * 0.25) / 0.25));
          el.style.width = `${segP * 100}%`;
        });

        // ── Stat ticker visibility ──
        if (statTickerRef.current) {
          statTickerRef.current.style.opacity = p >= 0.14 ? "1" : "0";
        }
      },
    });

    const clock = new THREE.Clock();

    // ── STAT TICKER ──
    const STATS = ["3PT RANGE: 7.5M", "APEX HEIGHT: 12.5M", "FLIGHT TIME: 1.8S", "SWISH RATE: 94%"];
    let statIdx = 0;
    const statTimer = setInterval(() => {
      const el = statTickerRef.current?.querySelector(".stat-text") as HTMLElement | null;
      if (!el) return;
      el.style.transform = "translateX(-30px)";
      el.style.opacity = "0";
      setTimeout(() => {
        statIdx = (statIdx + 1) % STATS.length;
        el.textContent = STATS[statIdx];
        el.style.transform = "translateX(100%)";
        el.style.opacity = "1";
        requestAnimationFrame(() => { el.style.transform = "translateX(0)"; });
      }, 400);
    }, 2000);

    let lastFrame = 0;
    const render = (now: number) => {
      requestAnimationFrame(render);
      if (now - lastFrame < 16.67) return;
      lastFrame = now;
      if (!animActive) return;
      const elapsed = clock.getElapsedTime();
      const p = animProgress;

      // ── SPEED INDICATOR ──
      const scrollDelta = Math.abs(p - prevAnimProgress);
      prevAnimProgress = p;
      if (speedIndicatorRef.current) {
        const h = Math.min(80, Math.max(2, scrollDelta * 8000));
        speedIndicatorRef.current.style.height = `${h}px`;
        if (scrollDelta > 0.002) speedIndicatorRef.current.style.backgroundColor = "#e84500";
        else if (scrollDelta > 0.001) speedIndicatorRef.current.style.backgroundColor = "#ff6030";
        else speedIndicatorRef.current.style.backgroundColor = "#6e6e6e";
      }

      // ── GOD RAY FLICKER ──
      godRayCones.forEach((rc, i) => {
        const flicker = 0.025 + Math.sin(elapsed * 0.4 + i * 1.8) * 0.006;
        (rc.outer.material as THREE.MeshBasicMaterial).opacity = flicker;
        (rc.inner.material as THREE.MeshBasicMaterial).opacity = flicker * 0.72;
      });

      // ── DUST DRIFT ──
      const dArr = (dustParts.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < DUST_COUNT; i++) {
        dArr[i * 3 + 1] += 0.003;
        if (dArr[i * 3 + 1] > 14) dArr[i * 3 + 1] = 8;
        dArr[i * 3] += Math.sin(elapsed + dDrift[i]) * 0.002;
      }
      (dustParts.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // ── CROWD AMBIENT ──
      if (p >= 0.88) {
        crowdLerp = Math.min(1, crowdLerp + 0.025);
      } else if (p < 0.85) {
        crowdLerp = Math.max(0, crowdLerp - 0.025);
      }
      if (crowdLerp > 0.001) {
        crowdGroup.children.forEach((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshBasicMaterial;
            mat.color.copy(originalCrowdColor).lerp(litCrowdColor, crowdLerp);
          }
        });
      }

      if (p < 0.16) {
        playerGroup.rotation.y = Math.sin(elapsed * 0.9) * 0.05;
        playerGroup.position.y = 0;
        playerGroup.rotation.z = 0;
        rUA.rotation.z = -0.3 + Math.sin(elapsed * 0.9) * 0.03;
        lUA.rotation.z = 0.32 + Math.sin(elapsed * 0.9 + 0.8) * 0.03;
        rLA.rotation.z = 0.15;
        lLA.rotation.z = 0.08;
      } else if (p < 0.34) {
        const jt = (p - 0.16) / 0.18;
        playerGroup.position.y = Math.sin(jt * Math.PI) * 0.55;
        playerGroup.rotation.y = -0.35 * jt;
        const at = Math.min(1, jt * 1.9);
        rUA.rotation.z = -0.3 + at * -1.65;
        rLA.rotation.z = 0.15 + at * 1.35;
        lUA.rotation.z = 0.32 + at * -1.05;
        lLA.rotation.z = 0.08 + at * 0.52;
        playerGroup.rotation.z = at * 0.07;
      } else {
        playerGroup.position.y = Math.max(0, 0.55 - (p - 0.34) * 4);
        playerGroup.rotation.y = -0.35;
        const ft = Math.min(1, (p - 0.34) / 0.32);
        rUA.rotation.z = -1.95 + ft * 1.15;
        rLA.rotation.z = 1.5 - ft * 0.85;
        lUA.rotation.z = -0.73 + ft * 0.64;
        lLA.rotation.z = 0.6 - ft * 0.3;
        playerGroup.rotation.z = 0.07 * (1 - ft);
      }

      // ── DEFENDER ANIMATION ──
      if (p < 0.10) {
        defenderGroup.position.y = 0;
        defenderGroup.rotation.z = 0;
        defenderGroup.position.x = 6.2;
        defenderGroup.rotation.y = Math.PI * 0.85 + Math.sin(elapsed * 1.1) * 0.04;
        rUA_d.rotation.z = -0.2;
        rLA_d.rotation.z = 0.1;
        lUA_d.rotation.z = 0.32 + Math.sin(elapsed * 1.1 + 0.5) * 0.03;
        lLA_d.rotation.z = 0.08;
      } else if (p < 0.28) {
        const jt = (p - 0.10) / 0.18;
        defenderGroup.position.y = Math.sin(jt * Math.PI) * 0.42;
        defenderGroup.position.x = 6.2 - jt * 0.25;
        defenderGroup.rotation.y = Math.PI * 0.85 - jt * 0.15;
        const at = Math.min(1, jt * 2.0);
        rUA_d.rotation.z = -0.2 + at * -2.1;
        rLA_d.rotation.z = 0.1 + at * 0.8;
        lUA_d.rotation.z = 0.32 + at * -1.0;
        lLA_d.rotation.z = 0.08 + at * 0.4;
        defenderGroup.rotation.z = 0;
      } else if (p < 0.88) {
        defenderGroup.position.y = Math.max(0, 0.42 - (p - 0.28) * 2);
        defenderGroup.rotation.y = Math.PI * 0.85 - 0.15;
        rUA_d.rotation.z = -2.3;
        rLA_d.rotation.z = 0.9;
        lUA_d.rotation.z = -0.68;
        lLA_d.rotation.z = 0.48;
        defenderGroup.rotation.z = 0;
      } else {
        const dt = Math.min(1, (p - 0.88) / 0.12);
        defenderGroup.rotation.z = dt * 0.12;
        lUA_d.rotation.z = -0.68 + dt * 0.6;
        lLA_d.rotation.z = 0.48 + dt * 0.3;
        defenderGroup.position.y = Math.max(0, 0.3 - dt * 0.4);
      }
      defShadow.position.x = defenderGroup.position.x;
      defShadow.position.z = 0.9;
      defShadow.material.opacity = Math.max(0.1, 0.42 - defenderGroup.position.y * 0.12);

      const ballT = Math.max(0, Math.min(1, (p - 0.16) / 0.74));

      if (p < 0.16) {
        const dribAmt = p < 0.08 ? 0.14 : 0.14 * (1 - (p - 0.08) / 0.08);
        const holdY = 2.65 + Math.abs(Math.sin(elapsed * 5.8)) * dribAmt;
        ballGroup.position.set(8.1 + Math.sin(elapsed * 0.75) * 0.04, holdY, 0);
        ballMesh.rotation.z += 0.012;
        ballMesh.rotation.x += 0.004;
      } else if (p < 0.9) {
        const pos = bezier3(ballT);
        ballGroup.position.copy(pos);
        ballMesh.rotation.z += 0.09;
        ballMesh.rotation.x += 0.05;
        ballGlow.intensity = ballT > 0.08 ? 1.8 + Math.sin(elapsed * 4) * 0.4 : 0;

        trailPos.unshift(pos.clone());
        trailPos.pop();
        const ta = ballT > 0.06 ? 1 : 0;
        for (let i = 0; i < TRAIL; i++) {
          trailMeshes[i].position.copy(trailPos[Math.min(i + 1, TRAIL - 1)]);
          trailMeshes[i].material.opacity = ta * (1 - i / TRAIL) * 0.5;
        }
      } else {
        ballGroup.position.set(BASKET_X, 2.85 - (p - 0.9) * 5, 0);
        ballGlow.intensity = 0;
        trailMeshes.forEach((m) => (m.material.opacity = 0));
      }

      if (p >= 0.87 && !swishActive) {
        swishActive = true;
        netSwish = 0;
      }
      if (p < 0.87 && swishActive) swishActive = false;
      if (swishActive) {
        netSwish = Math.min(1, netSwish + 0.022);
        const sw = Math.sin(netSwish * Math.PI) * 0.14;
        netStrings.forEach(({ ln, basePts }, i) => {
          const ang = (i / NET_N) * Math.PI * 2;
          const pa = ln.geometry.attributes.position;
          for (let j = 0; j <= NET_SEG; j++) {
            const t = j / NET_SEG;
            const bow = sw * Math.sin(t * Math.PI);
            pa.setXYZ(
              j,
              basePts[j].x + Math.cos(ang) * bow,
              basePts[j].y - bow * 0.4,
              basePts[j].z + Math.sin(ang) * bow
            );
          }
          pa.needsUpdate = true;
        });
        if (netSwish >= 1) swishActive = false;
      }

      if (p >= 0.88) {
        if (!scoreShown) {
          scoreShown = true;
          scorePopRef.current?.classList.add("fire");
        }
        const flashT = Math.sin(Math.min(1, (p - 0.88) / 0.05) * Math.PI);
        if (swishFlashRef.current)
          swishFlashRef.current.style.opacity = String(flashT * 0.82);
        if (basketGlowRef.current)
          basketGlowRef.current.style.opacity = String(flashT * 0.9);
      } else {
        if (scoreShown) {
          scoreShown = false;
          scorePopRef.current?.classList.remove("fire");
        }
        if (swishFlashRef.current) swishFlashRef.current.style.opacity = "0";
        if (basketGlowRef.current) basketGlowRef.current.style.opacity = "0";
      }

      if (p >= 0.88 && p < 0.99) {
        if (!partsActive) {
          partsActive = true;
          parts.visible = true;
          partMat.opacity = 1;
          for (let i = 0; i < PC; i++) {
            pPos[i * 3] = BASKET_X;
            pPos[i * 3 + 1] = BASKET_Y;
            pPos[i * 3 + 2] = 0;
            pVel[i].life = 1;
          }
        }
        for (let i = 0; i < PC; i++) {
          const v = pVel[i];
          if (v.life > 0) {
            pPos[i * 3] += v.vx;
            pPos[i * 3 + 1] += v.vy;
            pPos[i * 3 + 2] += v.vz;
            v.vy -= 0.004;
            v.life -= v.dec;
          }
        }
        pGeo.attributes.position.needsUpdate = true;
        partMat.opacity = Math.max(0, 1 - (p - 0.88) / 0.11);
      } else if (p < 0.88) {
        partsActive = false;
        parts.visible = false;
      }

      // ── 5-KEYFRAME CAMERA ──
      const mapRanges = [0, 0.15, 0.34, 0.62, 0.88];
      let ki = 0;
      while (ki < 4 && p >= mapRanges[ki + 1]) ki++;
      ki = Math.min(ki, kfs.length - 2);
      const rangeT = Math.min(1, Math.max(0, (p - mapRanges[ki]) / (mapRanges[ki + 1] - mapRanges[ki])));
      const et = easeInOut(Math.max(0, Math.min(1, rangeT)));

      if (!kfs[ki] || !kfs[ki + 1]) {
        camera.position.copy(kfs[kfs.length - 1].pos);
        currentLook.copy(kfs[kfs.length - 1].look);
      } else {
        camera.position.lerpVectors(kfs[ki].pos, kfs[ki + 1].pos, et);
        currentLook.lerpVectors(kfs[ki].look, kfs[ki + 1].look, et);
      }
      camera.lookAt(currentLook);

      targetFov = kfs[ki].fov + (kfs[ki + 1].fov - kfs[ki].fov) * et;
      camera.fov += (targetFov - camera.fov) * 0.12;
      camera.updateProjectionMatrix();

      if (p >= 0.88) {
        const pullT = Math.min(1, (p - 0.88) / 0.1);
        camera.position.z += pullT * 3;
      }

      // ── BREATHING ──
      camera.position.y += Math.sin(elapsed * 1.8) * 0.008;
      camera.position.x += Math.cos(elapsed * 1.3) * 0.005;

      // ── CAMERA SHAKE (p 0.87–0.94) ──
      if (p >= 0.87 && p < 0.94) {
        const shk = Math.sin(Math.min(1, (p - 0.87) / 0.07) * Math.PI) * 0.045;
        camera.position.x += Math.sin(elapsed * 37) * shk;
        camera.position.y += Math.sin(elapsed * 29 + 1.4) * shk * 0.6;
        camera.position.z += Math.sin(elapsed * 31 + 2) * shk * 0.4;
      }

      // ── VIGNETTE ──
      if (vignetteRef.current) {
        let rx = '80%', ry = '75%';
        if (p >= 0.34 && p < 0.88) {
          const vgT = (p - 0.34) / 0.54;
          rx = `${80 - vgT * 20}%`;
          ry = `${75 - vgT * 17}%`;
        } else if (p >= 0.88) {
          const pulseT = Math.min(1, (p - 0.88) / 0.06);
          const pl = Math.sin(pulseT * Math.PI);
          rx = `${60 - pl * 10}%`;
          ry = `${58 - pl * 8}%`;
        }
        vignetteRef.current.style.background =
          `radial-gradient(ellipse ${rx} ${ry} at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)`;
      }

      if (p > 0.87)
        basketLight.intensity =
          1.8 +
          Math.sin(elapsed * 7) * Math.max(0, 1 - (p - 0.87) / 0.13) * 2.5;
      else basketLight.intensity = 1.8;

      renderer.render(scene, camera);
    };

    render(0);

    const onResize = () => {
      const w = window.innerWidth;
      const navH = getNavOffset();
      const h = window.innerHeight - navH;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, stickyRef.current?.offsetHeight ?? h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(statTimer);
      observer.disconnect();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.globalTimeline.clear();
      st.kill();
      window.removeEventListener("resize", onResize);
      ballTex.dispose();
      woodTexture?.dispose();
      logoTex?.dispose();
      (jerseyDecal.material as THREE.MeshBasicMaterial).map?.dispose();
      (defJerseyDecal.material as THREE.MeshBasicMaterial).map?.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="animation-wrapper"
      className="h-[360vh] relative"
      style={{ zIndex: 1 }}
    >
      <div
        ref={stickyRef}
        id="animation-sticky"
        className="sticky top-[66px] h-[calc(100vh-66px)] overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          id="bball-canvas"
          className="absolute top-0 left-0 w-full h-full block"
        />

        <div className="absolute bottom-0 left-0 right-0 h-[3px] flex gap-[2px] z-[12]">
          {[
            { ref: segRef0 },
            { ref: segRef1 },
            { ref: segRef2 },
            { ref: segRef3 },
          ].map((s, i) => (
            <div key={i} className="flex-1 relative group">
              <span className="absolute -top-[16px] left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[1px] text-gr opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                ref={s.ref}
                className="h-full bg-gradient-to-r from-or to-gold transition-all duration-75"
                style={{ width: "0%" }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none z-10">
          <div
            ref={speedIndicatorRef}
            className="absolute left-0 top-0 w-[2px] z-[15] pointer-events-none"
            style={{ height: "2px", backgroundColor: "#6e6e6e", transition: "height 0.08s ease, background-color 0.12s ease" }}
          />
          <div
            ref={ph0Ref}
            id="ph0"
            className="aphase vis"
            style={{
              position: "absolute",
              bottom: "14%",
              left: "7%",
            }}
          >
            <span className="text-[11.5px] font-bold tracking-[3.5px] uppercase text-or2 block mb-[5px]">
              Court Side &middot; Player No.11
            </span>
            <span className="font-russo text-[clamp(26px,3.8vw,50px)] text-white block leading-[.97]">
              GAME
              <br />
              POINT
            </span>
          </div>
          <div
            ref={ph1Ref}
            id="ph1"
            className="aphase"
            style={{
              position: "absolute",
              top: "18%",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <span className="text-[11.5px] font-bold tracking-[3.5px] uppercase text-or2 block mb-[5px]">
              The Release
            </span>
            <span className="font-russo text-[clamp(26px,3.8vw,50px)] text-white block leading-[.97]">
              Defying
              <br />
              Gravity
            </span>
          </div>
          <div
            ref={ph2Ref}
            id="ph2"
            className="aphase"
            style={{
              position: "absolute",
              top: "28%",
              right: "7%",
            }}
          >
            <span className="text-[11.5px] font-bold tracking-[3.5px] uppercase text-or2 block mb-[5px]">
              In Flight
            </span>
            <span className="font-russo text-[clamp(26px,3.8vw,50px)] text-white block leading-[.97]">
              Perfect
              <br />
              Arc
            </span>
          </div>
          <div
            ref={ph3Ref}
            id="ph3"
            className="aphase"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              textAlign: "center",
            }}
          >
            <span className="text-[11.5px] font-bold tracking-[3.5px] uppercase text-or2 block mb-[5px]">
              🏆 Three Points
            </span>
            <span className="font-russo text-[clamp(50px,8vw,100px)] text-transparent bg-clip-text bg-gradient-to-br from-goldL to-or2 block leading-[.97]">
              NOTHING
              <br />
              BUT NET
            </span>
          </div>

          <div
            ref={chapterRef}
            className="absolute top-[18px] right-[20px] z-[15] pointer-events-none"
          >
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-gr block">
              01 / 04
            </span>
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-or2 block text-right">
              GAME POINT
            </span>
          </div>

          <div
            ref={swishFlashRef}
            id="swish-flash"
            className="absolute inset-0 pointer-events-none z-[6]"
            style={{
              background:
                "radial-gradient(ellipse 55% 65% at 18% 48%,rgba(255,184,0,0.26) 0%,rgba(232,69,0,0.1) 40%,transparent 75%)",
              opacity: 0,
            }}
          />
          <div
            ref={basketGlowRef}
            id="basket-glow"
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              background:
                "radial-gradient(ellipse 28% 34% at 22% 48%,rgba(255,184,0,0.35) 0%,rgba(232,69,0,0.15) 45%,transparent 80%)",
              opacity: 0,
            }}
          />
          <div
            ref={scorePopRef}
            id="score-pop"
            className="font-russo text-[clamp(52px,9vw,108px)] pointer-events-none z-[15] whitespace-nowrap"
            style={{
              position: "absolute",
              top: "36%",
              left: "50%",
              transform: "translate(-50%,-50%) scale(0.3) translateY(30px)",
              background:
                "linear-gradient(135deg, var(--goldL) 0%, var(--or2) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0,
              transition:
                "opacity 0.28s ease, transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.55)",
              filter:
                "drop-shadow(0 0 40px rgba(255,184,0,0.55)) drop-shadow(0 0 80px rgba(232,69,0,0.3))",
              ...({} as React.CSSProperties),
            }}
          >
            +3 POINTS
          </div>

          <div
            ref={vignetteRef}
            className="absolute inset-0 pointer-events-none z-[7]"
            style={{
              background:
                "radial-gradient(ellipse 80% 75% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)",
            }}
          />
          <div
            ref={statTickerRef}
            className="absolute bottom-[28px] right-[12px] z-[15] overflow-hidden pointer-events-none opacity-0 transition-opacity duration-400"
            style={{ width: "220px" }}
          >
            <div className="stat-text text-[10.5px] font-bold tracking-[2px] uppercase text-or2 whitespace-nowrap" style={{ transform: "translateX(100%)", transition: "transform 0.4s ease, opacity 0.4s ease" }}>
              3PT RANGE: 7.5M
            </div>
          </div>
        </div>

        <div
          ref={scrollPromptRef}
          id="scroll-prompt"
          className="absolute bottom-[6%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px] z-10 transition-opacity duration-400"
        >
          <span className="text-[10.5px] font-bold tracking-[3px] uppercase text-gr">
            Scroll to experience
          </span>
          <div className="w-[24px] h-[40px] border-2 border-white/18 rounded-[12px] relative">
            <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[4px] h-[9px] bg-or2 rounded-[2px] animate-smb" />
          </div>
        </div>
      </div>
    </div>
  );
}
