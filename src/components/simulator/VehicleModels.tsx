import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type VehicleType = "sedan" | "coupe" | "suv" | "sports" | "supercar";

interface VehicleProps {
  color: string;
  roughness: number;
  autoRotate?: boolean;
}

const MODEL_URLS: Record<VehicleType, string> = {
  sedan: "/models/sedan.glb",
  coupe: "/models/coupe.glb",
  suv: "/models/suv.glb",
  sports: "/models/sports.glb",
  supercar: "/models/supercar.glb",
};

// Scale and position adjustments per model (tuned to each GLB's bounding box)
const MODEL_CONFIG: Record<VehicleType, { scale: number; position: [number, number, number] }> = {
  sedan: { scale: 55, position: [0, -0.5, 0] },          // BB ~0.02x0.01x0.05, needs heavy upscale
  coupe: { scale: 0.7, position: [0, -0.5, 0] },         // BB ~1.9x1.4x4.6
  suv: { scale: 0.65, position: [0, -0.5, 0] },          // BB ~2.31x1.85x5.18
  sports: { scale: 0.7, position: [0, -0.5, 0] },        // BB ~1.95x1.27x4.65
  supercar: { scale: 0.65, position: [0, -0.5, 0] },     // BB ~2.03x1.42x4.82
};

const GLBVehicle = ({ color, roughness, autoRotate = true, type }: VehicleProps & { type: VehicleType }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URLS[type]);
  const config = MODEL_CONFIG[type];

  // Clone the scene so each instance is independent
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Apply the user's selected color to all mesh materials
  useEffect(() => {
    const bodyColor = new THREE.Color(color);
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
            // Skip transparent materials (glass/windows) and very reflective chrome parts
            const isGlass = mat.transparent && mat.opacity < 0.9;
            
            // Check if this is likely a tire/rubber (very dark + high roughness)
            const hsl = { h: 0, s: 0, l: 0 };
            mat.color.getHSL(hsl);
            const isTireOrRubber = hsl.l < 0.08 && mat.roughness > 0.7;
            
            // Check material name for common exclusions
            const name = (mat.name || '').toLowerCase();
            const isExcluded = name.includes('glass') || name.includes('window') || 
                              name.includes('tire') || name.includes('tyre') || 
                              name.includes('wheel') || name.includes('light') ||
                              name.includes('lens') || name.includes('chrome');
            
            if (!isGlass && !isTireOrRubber && !isExcluded) {
              mat.color.set(bodyColor);
              mat.roughness = roughness;
              mat.metalness = 0.6;
              mat.needsUpdate = true;
            }
          }
        });
      }
    });
  }, [clonedScene, color, roughness]);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={config.position} scale={config.scale}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Create wrapper components for each vehicle type
export const SedanModel = (props: VehicleProps) => <GLBVehicle {...props} type="sedan" />;
export const CoupeModel = (props: VehicleProps) => <GLBVehicle {...props} type="coupe" />;
export const SUVModel = (props: VehicleProps) => <GLBVehicle {...props} type="suv" />;
export const SportsModel = (props: VehicleProps) => <GLBVehicle {...props} type="sports" />;
export const SupercarModel = (props: VehicleProps) => <GLBVehicle {...props} type="supercar" />;

// Map for dynamic rendering
export const vehicleComponents: Record<VehicleType, React.FC<VehicleProps>> = {
  sedan: SedanModel,
  coupe: CoupeModel,
  suv: SUVModel,
  sports: SportsModel,
  supercar: SupercarModel,
};

// Preload all models
Object.values(MODEL_URLS).forEach((url) => useGLTF.preload(url));
