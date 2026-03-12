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
  "chrome", "emblem", "badge", "logo", "grille", "grill", "bumper_lower", "front_grille",
  "mirror_glass", "exhaust", "pipe", "muffler",
  "interior", "seat", "dash", "steering", "carpet", "trim_interior",
];

// Patterns that identify glass/window meshes for tinting
const GLASS_PATTERNS = [
  "glass", "window", "windshield", "windscreen",
];

function matchesAny(name: string, patterns: string[]): boolean {
  const lower = name.toLowerCase();
  return patterns.some((p) => lower.includes(p));
}

const SimulatorVehicle = ({ color, roughness, tintLevel, tintColor: tintColorHex, isChameleon = false, tintZone = "all", autoRotate = true, modelUrl }: SimulatorVehicleProps) => {
  const url = modelUrl || DEFAULT_MODEL_URL;
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Apply wrap color to body panels only
  useEffect(() => {
    const bodyColor = new THREE.Color(color);
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;
      const meshName = (child.name || "").toLowerCase();
      const materials = Array.isArray(child.material) ? child.material : [child.material];

      materials.forEach((mat) => {
        if (!(mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial)) return;
        const matName = (mat.name || "").toLowerCase();

        // Check if this is glass (for tint handling, skip wrap)
        const isGlass = matchesAny(meshName, GLASS_PATTERNS) || matchesAny(matName, GLASS_PATTERNS) ||
          (mat.transparent && mat.opacity < 0.9);

        if (isGlass) return;

        // Check exclusions by mesh name and material name
        const isExcludedMesh = matchesAny(meshName, EXCLUDED_FROM_WRAP);
        const isExcludedMat = matchesAny(matName, EXCLUDED_FROM_WRAP);

        // Heuristic: very dark + rough = tire/rubber
        const hsl = { h: 0, s: 0, l: 0 };
        mat.color.getHSL(hsl);
        const isTireOrRubber = hsl.l < 0.08 && mat.roughness > 0.7;

        if (!isExcludedMesh && !isExcludedMat && !isTireOrRubber) {
          mat.color.set(bodyColor);
          mat.roughness = roughness;
          mat.metalness = 0.6;
          mat.needsUpdate = true;
        }
      });
    });
  }, [clonedScene, color, roughness]);

  // Helper: check if a mesh/mat should be tinted based on zone
  const shouldTintMesh = (meshName: string, matName: string, mat: THREE.MeshStandardMaterial) => {
    const isGlass = matchesAny(meshName, GLASS_PATTERNS) || matchesAny(matName, GLASS_PATTERNS) ||
      (mat.transparent && mat.opacity < 0.9);
    if (!isGlass) return false;

    const isWindscreen = matchesAny(meshName, WINDSCREEN_PATTERNS) || matchesAny(matName, WINDSCREEN_PATTERNS);
    const isSideWindow = matchesAny(meshName, SIDE_WINDOW_PATTERNS) || matchesAny(matName, SIDE_WINDOW_PATTERNS);

    if (tintZone === "windscreen") return isWindscreen || (!isSideWindow && !isWindscreen); // windscreen + unidentified glass
    if (tintZone === "windows") return isSideWindow || (!isSideWindow && !isWindscreen); // side windows + unidentified
    return true; // "all"
  };

  // Apply tint to windows/glass
  useEffect(() => {
    const baseTintColor = new THREE.Color(tintColorHex || "#1a1a2e");
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;
      const meshName = (child.name || "").toLowerCase();
      const materials = Array.isArray(child.material) ? child.material : [child.material];

      materials.forEach((mat) => {
        if (!(mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial)) return;
        const matName = (mat.name || "").toLowerCase();

        const isGlass = matchesAny(meshName, GLASS_PATTERNS) || matchesAny(matName, GLASS_PATTERNS) ||
          (mat.transparent && mat.opacity < 0.9);
        if (!isGlass) return;

        mat.transparent = true;
        if (shouldTintMesh(meshName, matName, mat)) {
          const baseOpacity = 0.35;
          const tintedOpacity = baseOpacity + tintLevel * 0.55;
          mat.opacity = tintedOpacity;
          mat.color.lerpColors(new THREE.Color(0x88ccff), baseTintColor, tintLevel);
        } else {
          // Reset untinted glass
          mat.opacity = 0.35;
          mat.color.set(0x88ccff);
        }
        mat.roughness = 0.05;
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
        if (!(mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial)) return;
        const matName = (mat.name || "").toLowerCase();
        if (!shouldTintMesh(meshName, matName, mat)) return;
        mat.color.setHSL(hue, 0.6, 0.3 + (1 - tintLevel) * 0.2);
        mat.needsUpdate = true;
      });
    });
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={url.includes("audi") ? 0.005 : 0.8}>
      <primitive object={clonedScene} />
    </group>
  );
};

export default SimulatorVehicle;

useGLTF.preload(DEFAULT_MODEL_URL);
useGLTF.preload("/models/land-cruiser.glb");
useGLTF.preload("/models/hilux.glb");
