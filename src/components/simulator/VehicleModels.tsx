import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type TintZone = "all" | "windscreen" | "windows";

interface SimulatorVehicleProps {
  color: string;
  roughness: number;
  tintLevel: number;
  tintColor?: string;
  isChameleon?: boolean;
  tintZone?: TintZone;
  autoRotate?: boolean;
  modelUrl?: string;
}

const WINDSCREEN_PATTERNS = ["windshield", "windscreen", "front_glass", "frontglass"];
const SIDE_WINDOW_PATTERNS = ["window", "side_glass", "rear_glass", "rearglass", "sideglass"];

const DEFAULT_MODEL_URL = "/models/audi-rs5.glb";

// Mesh/material name patterns to EXCLUDE from wrap coloring
const EXCLUDED_FROM_WRAP = [
  "glass", "window", "windshield", "windscreen",
  "tire", "tyre", "rubber",
  "wheel", "rim", "hub", "spoke", "brake", "caliper", "rotor", "disc",
  "light", "lamp", "lens", "headlight", "taillight", "signal", "indicator",
  "chrome", "emblem", "badge", "logo", "grille", "grill", "bumper", "front_grille",
  "mirror", "exhaust", "pipe", "muffler",
  "interior", "seat", "dash", "dashboard", "carpet", "trim_interior", "display", "console", "floor",
  "cuero", "plastic", "defrost", "seatb",
];

const LAND_CRUISER_PAINT_MATERIAL_PATTERNS = ["carpaint", "carpaint_n2"];
const LAND_CRUISER_INTERIOR_PATTERNS = [
  "interior", "inner", "inside", "cabin", "cockpit", "headliner", "liner", "trim", "seat",
  "steering", "dash", "dashboard", "console", "door_card", "doorcard", "pillar",
];

const HILUX_BODY_PANEL_PATTERNS = [
  "body_main", "body_shell",
  "door_fl", "door_fr", "door_rl", "door_rr", "door",
  "hood", "bonnet", "fender", "quarter",
  "bed", "rear_bed", "tailgate",
  "side_panel", "sidepanel", "outer_panel", "exterior_panel",
  "cab",
  "carpaint", "paint",
];

const HILUX_NON_BODY_PATTERNS = [
  "chassis", "frame", "underbody", "suspension", "axle", "engine", "exhaust",
  "grille", "grill", "bumper", "mirror", "handle", "step", "rail", "rack", "rollbar",
  "wheel", "rim", "tire", "tyre", "glass", "window", "light", "lamp", "indicator",
  "interior", "inner", "inside", "seat", "dash", "console", "trim",
];

// Patterns that identify glass/window meshes for tinting
const GLASS_PATTERNS = [
  "glass", "window", "windshield", "windscreen",
];

function matchesAny(name: string, patterns: string[]): boolean {
  const lower = name.toLowerCase();
  return patterns.some((p) => lower.includes(p));
}

function isBodyPanelTarget(modelUrl: string, meshName: string, matName: string): boolean {
  const normalizedUrl = modelUrl.toLowerCase();
  const normalizedMeshName = meshName.toLowerCase();
  const normalizedMatName = matName.toLowerCase();
  const target = `${normalizedMeshName} ${normalizedMatName}`;

  if (matchesAny(target, EXCLUDED_FROM_WRAP)) return false;

  if (normalizedUrl.includes("land-cruiser")) {
    const isLandCruiserPaintMaterial = matchesAny(normalizedMatName, LAND_CRUISER_PAINT_MATERIAL_PATTERNS);
    const isLandCruiserInterior = matchesAny(target, LAND_CRUISER_INTERIOR_PATTERNS);
    return isLandCruiserPaintMaterial && !isLandCruiserInterior;
  }

  if (normalizedUrl.includes("hilux")) {
    const isHiluxBodyPanel = matchesAny(target, HILUX_BODY_PANEL_PATTERNS);
    const isHiluxNonBodyPart = matchesAny(target, HILUX_NON_BODY_PATTERNS);
    return isHiluxBodyPanel && !isHiluxNonBodyPart;
  }

  return true;
}

const SimulatorVehicle = ({ color, roughness, tintLevel, tintColor: tintColorHex, isChameleon = false, tintZone = "all", autoRotate = true, modelUrl }: SimulatorVehicleProps) => {
  const url = modelUrl || DEFAULT_MODEL_URL;
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const { scene } = useGLTF(url);

  // Deep-clone scene AND materials so each instance is independent
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map((m) => m.clone());
        } else {
          child.material = child.material.clone();
        }
      }
    });
    return clone;
  }, [scene]);

  // Auto-fit: compute bounding box and derive scale + offset to normalize all models
  const { autoScale, autoOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 3.5;
    const s = targetSize / maxDim;
    return {
      autoScale: s,
      autoOffset: new THREE.Vector3(-center.x * s, -box.min.y * s - 1, -center.z * s),
    };
  }, [clonedScene]);

  // Apply wrap color to body panels only
  useEffect(() => {
    const bodyColor = new THREE.Color(color);
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;
      const meshName = (child.name || "").toLowerCase();
      const materials = Array.isArray(child.material) ? child.material : [child.material];

      materials.forEach((mat) => {
        // Support any material with a color property (MeshStandard, MeshPhong, MeshBasic, etc.)
        if (!("color" in mat)) return;
        const matAny = mat as any;
        const matName = (mat.name || "").toLowerCase();

        // Check if this is glass (for tint handling, skip wrap)
        const isGlass =
          matchesAny(meshName, GLASS_PATTERNS) ||
          matchesAny(matName, GLASS_PATTERNS) ||
          (mat.transparent && mat.opacity < 0.9);
        if (isGlass) return;

        if (!isBodyPanelTarget(url, meshName, matName)) return;

        const isToyotaModel = url.includes("land-cruiser") || url.includes("hilux");
        if (isToyotaModel && "map" in matAny && matAny.map) matAny.map = null;
        if (isToyotaModel && "vertexColors" in matAny) matAny.vertexColors = false;

        matAny.color.set(bodyColor);
        if ("roughness" in matAny) matAny.roughness = roughness;
        if ("metalness" in matAny) matAny.metalness = 0.6;
        mat.needsUpdate = true;
      });
    });
  }, [clonedScene, color, roughness, url]);

  // Helper: check if a mesh/mat should be tinted based on zone
  const shouldTintMesh = (meshName: string, matName: string, mat: THREE.Material) => {
    const isGlass = matchesAny(meshName, GLASS_PATTERNS) || matchesAny(matName, GLASS_PATTERNS) ||
      (mat.transparent && mat.opacity < 0.9);
    if (!isGlass) return false;

    const isWindscreen = matchesAny(meshName, WINDSCREEN_PATTERNS) || matchesAny(matName, WINDSCREEN_PATTERNS);
    const isSideWindow = matchesAny(meshName, SIDE_WINDOW_PATTERNS) || matchesAny(matName, SIDE_WINDOW_PATTERNS);

    if (tintZone === "windscreen") return isWindscreen || (!isSideWindow && !isWindscreen);
    if (tintZone === "windows") return isSideWindow || (!isSideWindow && !isWindscreen);
    return true;
  };

  // Apply tint to windows/glass
  useEffect(() => {
    const baseTintColor = new THREE.Color(tintColorHex || "#1a1a2e");
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;
      const meshName = (child.name || "").toLowerCase();
      const materials = Array.isArray(child.material) ? child.material : [child.material];

      materials.forEach((mat) => {
        if (!('color' in mat)) return;
        const matAny = mat as any;
        const matName = (mat.name || "").toLowerCase();

        const isGlass = matchesAny(meshName, GLASS_PATTERNS) || matchesAny(matName, GLASS_PATTERNS) ||
          (mat.transparent && mat.opacity < 0.9);
        if (!isGlass) return;

        mat.transparent = true;
        if (shouldTintMesh(meshName, matName, mat)) {
          const baseOpacity = 0.35;
          const tintedOpacity = baseOpacity + tintLevel * 0.55;
          mat.opacity = tintedOpacity;
          matAny.color.lerpColors(new THREE.Color(0x88ccff), baseTintColor, tintLevel);
        } else {
          mat.opacity = 0.35;
          matAny.color.set(0x88ccff);
        }
        if ('roughness' in matAny) matAny.roughness = 0.05;
        mat.needsUpdate = true;
      });
    });
  }, [clonedScene, tintLevel, tintColorHex, tintZone]);

  // Chameleon iridescent effect — animate glass color shift
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (!isChameleon || tintLevel === 0) return;
    timeRef.current += delta * 0.5;
    const hue = (timeRef.current % 1);
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;
      const meshName = (child.name || "").toLowerCase();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((mat) => {
        if (!('color' in mat)) return;
        const matAny = mat as any;
        const matName = (mat.name || "").toLowerCase();
        if (!shouldTintMesh(meshName, matName, mat)) return;
        matAny.color.setHSL(hue, 0.6, 0.3 + (1 - tintLevel) * 0.2);
        mat.needsUpdate = true;
      });
    });
  });

  return (
    <group ref={groupRef} position={[autoOffset.x, autoOffset.y, autoOffset.z]} scale={autoScale}>
      <primitive object={clonedScene} />
    </group>
  );
};

export default SimulatorVehicle;

useGLTF.preload(DEFAULT_MODEL_URL);
useGLTF.preload("/models/land-cruiser.glb");
useGLTF.preload("/models/hilux.glb");
