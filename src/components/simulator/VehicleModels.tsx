import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface SimulatorVehicleProps {
  color: string;
  roughness: number;
  tintLevel: number; // 0 = no tint, 1 = limo (darkest)
  autoRotate?: boolean;
}

const MODEL_URL = "/models/land-cruiser.glb";

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

const SimulatorVehicle = ({ color, roughness, tintLevel, autoRotate = true }: SimulatorVehicleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);
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

  // Apply tint to windows/glass
  useEffect(() => {
    const tintColor = new THREE.Color(0x1a1a2e); // dark blue-black tint
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
        // tintLevel 0 = clear (opacity ~0.3 original), 1 = limo dark
        const baseOpacity = 0.35;
        const tintedOpacity = baseOpacity + tintLevel * 0.55; // 0.35 → 0.9
        mat.opacity = tintedOpacity;
        mat.color.lerpColors(new THREE.Color(0x88ccff), tintColor, tintLevel);
        mat.roughness = 0.05;
        mat.needsUpdate = true;
      });
    });
  }, [clonedScene, tintLevel]);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={0.8}>
      <primitive object={clonedScene} />
    </group>
  );
};

export default SimulatorVehicle;

useGLTF.preload(MODEL_URL);
