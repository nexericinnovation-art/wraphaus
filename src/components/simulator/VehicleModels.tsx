import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type VehicleType = "sedan" | "coupe" | "pickup" | "sports" | "supercar";

interface VehicleProps {
  color: string;
  roughness: number;
  autoRotate?: boolean;
}

const MODEL_URLS: Record<VehicleType, string> = {
  sedan: "/models/sedan.glb",
  coupe: "/models/coupe.glb",
  pickup: "/models/pickup.glb",
  sports: "/models/sports.glb",
  supercar: "/models/supercar.glb",
};

// Scale and position adjustments per model (tuned to each GLB's bounding box)
const MODEL_CONFIG: Record<VehicleType, { scale: number; position: [number, number, number] }> = {
  sedan: { scale: 0.006, position: [0, -0.5, 0] },      // BB ~230x117x489, needs heavy downscale
  coupe: { scale: 0.7, position: [0, -0.5, 0] },         // BB ~1.9x1.4x4.6
  pickup: { scale: 0.65, position: [0, -0.5, 0] },       // BB ~2.3x1.85x5.18
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
            // Skip very dark materials (tires, interior) and transparent (glass)
            const hsl = { h: 0, s: 0, l: 0 };
            mat.color.getHSL(hsl);
            const isVeryDark = hsl.l < 0.15;
            const isGlass = mat.transparent && mat.opacity < 0.9;
            
            if (!isVeryDark && !isGlass) {
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
export const PickupModel = (props: VehicleProps) => <GLBVehicle {...props} type="pickup" />;
export const SportsModel = (props: VehicleProps) => <GLBVehicle {...props} type="sports" />;
export const SupercarModel = (props: VehicleProps) => <GLBVehicle {...props} type="supercar" />;

// Map for dynamic rendering
export const vehicleComponents: Record<VehicleType, React.FC<VehicleProps>> = {
  sedan: SedanModel,
  coupe: CoupeModel,
  pickup: PickupModel,
  sports: SportsModel,
  supercar: SupercarModel,
};

// Preload all models
Object.values(MODEL_URLS).forEach((url) => useGLTF.preload(url));
