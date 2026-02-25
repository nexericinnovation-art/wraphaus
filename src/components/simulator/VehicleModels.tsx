import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VehicleProps {
  color: string;
  roughness: number;
  autoRotate?: boolean;
}

// Shared materials
const useVehicleMaterials = (color: string, roughness: number) => {
  const bodyMat = (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      metalness={0.6}
      clearcoat={1}
      clearcoatRoughness={roughness * 0.5}
      envMapIntensity={1.2}
    />
  );

  const glassMat = (
    <meshPhysicalMaterial
      color="#0a1520"
      roughness={0.05}
      metalness={0.1}
      transmission={0.7}
      transparent
      opacity={0.6}
      envMapIntensity={0.8}
    />
  );

  const tireMat = <meshStandardMaterial color="#111111" roughness={0.95} />;
  const rimMat = <meshStandardMaterial color="#b8b8b8" metalness={0.95} roughness={0.1} />;
  const chromeMat = <meshStandardMaterial color="#d4d4d4" metalness={1} roughness={0.05} />;
  const grillMat = <meshStandardMaterial color="#0a0a0a" roughness={0.6} metalness={0.3} />;
  const headlightMat = (
    <meshStandardMaterial color="#ffffee" emissive="#ffffaa" emissiveIntensity={0.6} />
  );
  const taillightMat = (
    <meshStandardMaterial color="#cc0000" emissive="#ff0000" emissiveIntensity={0.5} />
  );
  const interiorMat = <meshStandardMaterial color="#1a1a1a" roughness={0.8} />;
  const underbodyMat = <meshStandardMaterial color="#0a0a0a" roughness={0.9} />;

  return { bodyMat, glassMat, tireMat, rimMat, chromeMat, grillMat, headlightMat, taillightMat, interiorMat, underbodyMat };
};

// Wheel assembly component
const WheelAssembly = ({
  position,
  tireMat,
  rimMat,
  scale = 1,
}: {
  position: [number, number, number];
  tireMat: JSX.Element;
  rimMat: JSX.Element;
  scale?: number;
}) => (
  <group position={position} scale={scale}>
    {/* Tire */}
    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
      <torusGeometry args={[0.34, 0.14, 16, 32]} />
      {tireMat}
    </mesh>
    {/* Rim */}
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
      {rimMat}
    </mesh>
    {/* Rim detail (center cap) */}
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.07]}>
      <cylinderGeometry args={[0.08, 0.08, 0.02, 12]} />
      {rimMat}
    </mesh>
    {/* Brake caliper */}
    <mesh position={[0, -0.05, 0.04]}>
      <boxGeometry args={[0.08, 0.12, 0.04]} />
      <meshStandardMaterial color="#cc2200" roughness={0.4} />
    </mesh>
  </group>
);

// Side mirror component
const SideMirror = ({
  position,
  side,
  bodyMat,
}: {
  position: [number, number, number];
  side: "left" | "right";
  bodyMat: JSX.Element;
}) => (
  <group position={position}>
    {/* Mirror arm */}
    <mesh>
      <boxGeometry args={[0.06, 0.04, side === "left" ? 0.2 : 0.2]} />
      {bodyMat}
    </mesh>
    {/* Mirror housing */}
    <mesh position={[0, 0, side === "left" ? 0.15 : -0.15]}>
      <boxGeometry args={[0.12, 0.1, 0.06]} />
      {bodyMat}
    </mesh>
  </group>
);

// ===================== SEDAN =====================
export const SedanModel = ({ color, roughness, autoRotate = true }: VehicleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useVehicleMaterials(color, roughness);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.8}>
      {/* Lower body */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[4.8, 0.65, 1.85]} />
        {mats.bodyMat}
      </mesh>
      {/* Front fender curve */}
      <mesh position={[2.15, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>
      {/* Rear fender curve */}
      <mesh position={[-2.15, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.45, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>
      {/* Hood slope */}
      <mesh position={[1.4, 0.72, 0]} rotation={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[1.8, 0.08, 1.75]} />
        {mats.bodyMat}
      </mesh>
      {/* Trunk */}
      <mesh position={[-1.6, 0.72, 0]} rotation={[0, 0, 0.05]} castShadow>
        <boxGeometry args={[1.2, 0.06, 1.7]} />
        {mats.bodyMat}
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <boxGeometry args={[2.2, 0.62, 1.65]} />
        {mats.bodyMat}
      </mesh>
      {/* Roof rail */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.04, 1.5]} />
        {mats.bodyMat}
      </mesh>
      {/* A-pillar left */}
      <mesh position={[0.95, 1.0, 0.78]} rotation={[0, 0, 0.45]} castShadow>
        <boxGeometry args={[0.7, 0.08, 0.06]} />
        {mats.bodyMat}
      </mesh>
      {/* A-pillar right */}
      <mesh position={[0.95, 1.0, -0.78]} rotation={[0, 0, 0.45]} castShadow>
        <boxGeometry args={[0.7, 0.08, 0.06]} />
        {mats.bodyMat}
      </mesh>
      {/* C-pillar left */}
      <mesh position={[-0.95, 1.0, 0.78]} rotation={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.6, 0.08, 0.06]} />
        {mats.bodyMat}
      </mesh>
      {/* C-pillar right */}
      <mesh position={[-0.95, 1.0, -0.78]} rotation={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.6, 0.08, 0.06]} />
        {mats.bodyMat}
      </mesh>

      {/* Windshield */}
      <mesh position={[1.0, 1.02, 0]} rotation={[0, 0, 0.38]}>
        <boxGeometry args={[0.85, 0.04, 1.5]} />
        {mats.glassMat}
      </mesh>
      {/* Rear window */}
      <mesh position={[-1.0, 1.02, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.7, 0.04, 1.45]} />
        {mats.glassMat}
      </mesh>
      {/* Side windows L */}
      <mesh position={[0, 1.08, 0.84]}>
        <boxGeometry args={[1.8, 0.45, 0.03]} />
        {mats.glassMat}
      </mesh>
      {/* Side windows R */}
      <mesh position={[0, 1.08, -0.84]}>
        <boxGeometry args={[1.8, 0.45, 0.03]} />
        {mats.glassMat}
      </mesh>

      {/* Front grill */}
      <mesh position={[2.42, 0.42, 0]}>
        <boxGeometry args={[0.04, 0.3, 1.2]} />
        {mats.grillMat}
      </mesh>
      {/* Chrome grill surround */}
      <mesh position={[2.43, 0.42, 0]}>
        <boxGeometry args={[0.02, 0.35, 1.3]} />
        {mats.chromeMat}
      </mesh>

      {/* Headlights */}
      <mesh position={[2.4, 0.5, 0.7]}>
        <boxGeometry args={[0.08, 0.12, 0.3]} />
        {mats.headlightMat}
      </mesh>
      <mesh position={[2.4, 0.5, -0.7]}>
        <boxGeometry args={[0.08, 0.12, 0.3]} />
        {mats.headlightMat}
      </mesh>
      {/* DRL strips */}
      <mesh position={[2.42, 0.58, 0.7]}>
        <boxGeometry args={[0.02, 0.02, 0.28]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[2.42, 0.58, -0.7]}>
        <boxGeometry args={[0.02, 0.02, 0.28]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.4, 0.5, 0.7]}>
        <boxGeometry args={[0.06, 0.1, 0.35]} />
        {mats.taillightMat}
      </mesh>
      <mesh position={[-2.4, 0.5, -0.7]}>
        <boxGeometry args={[0.06, 0.1, 0.35]} />
        {mats.taillightMat}
      </mesh>

      {/* Chrome trim strip */}
      <mesh position={[0, 0.76, 0.93]}>
        <boxGeometry args={[4.2, 0.02, 0.01]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[0, 0.76, -0.93]}>
        <boxGeometry args={[4.2, 0.02, 0.01]} />
        {mats.chromeMat}
      </mesh>

      {/* Door lines */}
      <mesh position={[0.3, 0.55, 0.93]}>
        <boxGeometry args={[0.01, 0.35, 0.01]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[0.3, 0.55, -0.93]}>
        <boxGeometry args={[0.01, 0.35, 0.01]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.5, 0.55, 0.93]}>
        <boxGeometry args={[0.01, 0.35, 0.01]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.5, 0.55, -0.93]}>
        <boxGeometry args={[0.01, 0.35, 0.01]} />
        {mats.chromeMat}
      </mesh>

      {/* Door handles */}
      <mesh position={[0.5, 0.6, 0.94]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[0.5, 0.6, -0.94]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.3, 0.6, 0.94]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.3, 0.6, -0.94]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>

      {/* Side mirrors */}
      <SideMirror position={[0.9, 0.82, 0.95]} side="left" bodyMat={mats.bodyMat} />
      <SideMirror position={[0.9, 0.82, -0.95]} side="right" bodyMat={mats.bodyMat} />

      {/* Front bumper */}
      <mesh position={[2.3, 0.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.3, 1.9]} />
        {mats.bodyMat}
      </mesh>
      {/* Rear bumper */}
      <mesh position={[-2.3, 0.2, 0]} castShadow>
        <boxGeometry args={[0.25, 0.28, 1.85]} />
        {mats.bodyMat}
      </mesh>
      {/* Exhaust pipes */}
      <mesh position={[-2.42, 0.15, 0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.05, 0.1, 12]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-2.42, 0.15, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.05, 0.1, 12]} />
        {mats.chromeMat}
      </mesh>

      {/* Wheels */}
      <WheelAssembly position={[1.5, 0.05, 1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} />
      <WheelAssembly position={[1.5, 0.05, -1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} />
      <WheelAssembly position={[-1.5, 0.05, 1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} />
      <WheelAssembly position={[-1.5, 0.05, -1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} />

      {/* Underbody */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[4.4, 0.04, 1.7]} />
        {mats.underbodyMat}
      </mesh>
    </group>
  );
};

// ===================== SUV =====================
export const SUVModel = ({ color, roughness, autoRotate = true }: VehicleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useVehicleMaterials(color, roughness);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={0.7}>
      {/* Lower body - taller */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[5.0, 0.9, 2.0]} />
        {mats.bodyMat}
      </mesh>
      {/* Front end */}
      <mesh position={[2.3, 0.65, 0]} castShadow>
        <sphereGeometry args={[0.55, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>
      {/* Rear end */}
      <mesh position={[-2.3, 0.65, 0]} castShadow>
        <sphereGeometry args={[0.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>
      {/* Hood */}
      <mesh position={[1.5, 1.12, 0]} rotation={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[2.0, 0.06, 1.9]} />
        {mats.bodyMat}
      </mesh>
      {/* Cabin - taller, squared */}
      <mesh position={[-0.15, 1.5, 0]} castShadow>
        <boxGeometry args={[2.8, 0.8, 1.85]} />
        {mats.bodyMat}
      </mesh>
      {/* Roof */}
      <mesh position={[-0.15, 1.92, 0]} castShadow>
        <boxGeometry args={[2.6, 0.04, 1.7]} />
        {mats.bodyMat}
      </mesh>
      {/* Roof rails */}
      <mesh position={[-0.15, 1.95, 0.8]}>
        <boxGeometry args={[2.2, 0.04, 0.04]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.15, 1.95, -0.8]}>
        <boxGeometry args={[2.2, 0.04, 0.04]} />
        {mats.chromeMat}
      </mesh>

      {/* Windshield */}
      <mesh position={[1.2, 1.45, 0]} rotation={[0, 0, 0.32]}>
        <boxGeometry args={[0.9, 0.04, 1.7]} />
        {mats.glassMat}
      </mesh>
      {/* Rear window */}
      <mesh position={[-1.4, 1.45, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.7, 0.04, 1.65]} />
        {mats.glassMat}
      </mesh>
      {/* Side windows */}
      <mesh position={[-0.1, 1.5, 0.94]}>
        <boxGeometry args={[2.4, 0.6, 0.03]} />
        {mats.glassMat}
      </mesh>
      <mesh position={[-0.1, 1.5, -0.94]}>
        <boxGeometry args={[2.4, 0.6, 0.03]} />
        {mats.glassMat}
      </mesh>

      {/* Front grill - large */}
      <mesh position={[2.52, 0.7, 0]}>
        <boxGeometry args={[0.04, 0.45, 1.4]} />
        {mats.grillMat}
      </mesh>
      <mesh position={[2.53, 0.7, 0]}>
        <boxGeometry args={[0.02, 0.5, 1.5]} />
        {mats.chromeMat}
      </mesh>
      {/* Grill slats */}
      {[-0.15, -0.05, 0.05, 0.15].map((y, i) => (
        <mesh key={i} position={[2.54, 0.7 + y, 0]}>
          <boxGeometry args={[0.01, 0.02, 1.3]} />
          {mats.chromeMat}
        </mesh>
      ))}

      {/* Headlights - larger */}
      <mesh position={[2.52, 0.8, 0.8]}>
        <boxGeometry args={[0.06, 0.15, 0.3]} />
        {mats.headlightMat}
      </mesh>
      <mesh position={[2.52, 0.8, -0.8]}>
        <boxGeometry args={[0.06, 0.15, 0.3]} />
        {mats.headlightMat}
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.52, 0.8, 0.75]}>
        <boxGeometry args={[0.04, 0.2, 0.35]} />
        {mats.taillightMat}
      </mesh>
      <mesh position={[-2.52, 0.8, -0.75]}>
        <boxGeometry args={[0.04, 0.2, 0.35]} />
        {mats.taillightMat}
      </mesh>

      {/* Wheel arch flares */}
      {[
        [1.6, 0.5, 1.02],
        [1.6, 0.5, -1.02],
        [-1.6, 0.5, 1.02],
        [-1.6, 0.5, -1.02],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.7, 0.5, 0.08]} />
          {mats.bodyMat}
        </mesh>
      ))}

      {/* Skid plate */}
      <mesh position={[2.35, 0.28, 0]}>
        <boxGeometry args={[0.2, 0.08, 1.2]} />
        {mats.chromeMat}
      </mesh>

      {/* Side steps */}
      <mesh position={[0, 0.28, 1.0]}>
        <boxGeometry args={[2.5, 0.04, 0.15]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[0, 0.28, -1.0]}>
        <boxGeometry args={[2.5, 0.04, 0.15]} />
        {mats.chromeMat}
      </mesh>

      {/* Door handles */}
      <mesh position={[0.6, 0.85, 1.02]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[0.6, 0.85, -1.02]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.4, 0.85, 1.02]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.4, 0.85, -1.02]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>

      <SideMirror position={[1.0, 1.2, 1.05]} side="left" bodyMat={mats.bodyMat} />
      <SideMirror position={[1.0, 1.2, -1.05]} side="right" bodyMat={mats.bodyMat} />

      {/* Bumpers */}
      <mesh position={[2.4, 0.35, 0]} castShadow>
        <boxGeometry args={[0.25, 0.4, 2.05]} />
        {mats.bodyMat}
      </mesh>
      <mesh position={[-2.4, 0.35, 0]} castShadow>
        <boxGeometry args={[0.2, 0.38, 2.0]} />
        {mats.bodyMat}
      </mesh>

      {/* Wheels - larger for SUV */}
      <WheelAssembly position={[1.6, 0.15, 1.1]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.2} />
      <WheelAssembly position={[1.6, 0.15, -1.1]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.2} />
      <WheelAssembly position={[-1.6, 0.15, 1.1]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.2} />
      <WheelAssembly position={[-1.6, 0.15, -1.1]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.2} />

      {/* Underbody */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[4.6, 0.04, 1.8]} />
        {mats.underbodyMat}
      </mesh>
    </group>
  );
};

// ===================== PICKUP =====================
export const PickupModel = ({ color, roughness, autoRotate = true }: VehicleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useVehicleMaterials(color, roughness);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={0.65}>
      {/* Front body section */}
      <mesh position={[0.8, 0.7, 0]} castShadow>
        <boxGeometry args={[3.5, 0.85, 2.0]} />
        {mats.bodyMat}
      </mesh>
      {/* Cab */}
      <mesh position={[0.6, 1.45, 0]} castShadow>
        <boxGeometry args={[1.8, 0.75, 1.85]} />
        {mats.bodyMat}
      </mesh>
      {/* Cab roof */}
      <mesh position={[0.6, 1.84, 0]} castShadow>
        <boxGeometry args={[1.6, 0.04, 1.7]} />
        {mats.bodyMat}
      </mesh>
      {/* Hood */}
      <mesh position={[1.8, 1.1, 0]} rotation={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[1.5, 0.06, 1.9]} />
        {mats.bodyMat}
      </mesh>
      {/* Front end */}
      <mesh position={[2.4, 0.65, 0]} castShadow>
        <sphereGeometry args={[0.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>

      {/* Truck bed */}
      <mesh position={[-1.6, 0.55, 0]} castShadow>
        <boxGeometry args={[2.4, 0.06, 1.95]} />
        {mats.bodyMat}
      </mesh>
      {/* Bed sides */}
      <mesh position={[-1.6, 0.8, 0.95]} castShadow>
        <boxGeometry args={[2.4, 0.55, 0.08]} />
        {mats.bodyMat}
      </mesh>
      <mesh position={[-1.6, 0.8, -0.95]} castShadow>
        <boxGeometry args={[2.4, 0.55, 0.08]} />
        {mats.bodyMat}
      </mesh>
      {/* Tailgate */}
      <mesh position={[-2.8, 0.8, 0]} castShadow>
        <boxGeometry args={[0.06, 0.55, 1.85]} />
        {mats.bodyMat}
      </mesh>
      {/* Bed liner */}
      <mesh position={[-1.6, 0.58, 0]}>
        <boxGeometry args={[2.3, 0.02, 1.8]} />
        {mats.underbodyMat}
      </mesh>

      {/* Windshield */}
      <mesh position={[1.35, 1.4, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.85, 0.04, 1.65]} />
        {mats.glassMat}
      </mesh>
      {/* Rear cab window */}
      <mesh position={[-0.15, 1.45, 0]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[0.04, 0.5, 1.6]} />
        {mats.glassMat}
      </mesh>
      {/* Side windows */}
      <mesh position={[0.6, 1.45, 0.94]}>
        <boxGeometry args={[1.4, 0.55, 0.03]} />
        {mats.glassMat}
      </mesh>
      <mesh position={[0.6, 1.45, -0.94]}>
        <boxGeometry args={[1.4, 0.55, 0.03]} />
        {mats.glassMat}
      </mesh>

      {/* Front grill */}
      <mesh position={[2.57, 0.7, 0]}>
        <boxGeometry args={[0.04, 0.4, 1.4]} />
        {mats.grillMat}
      </mesh>
      <mesh position={[2.58, 0.7, 0]}>
        <boxGeometry args={[0.02, 0.45, 1.5]} />
        {mats.chromeMat}
      </mesh>

      {/* Headlights */}
      <mesh position={[2.56, 0.8, 0.8]}>
        <boxGeometry args={[0.06, 0.15, 0.3]} />
        {mats.headlightMat}
      </mesh>
      <mesh position={[2.56, 0.8, -0.8]}>
        <boxGeometry args={[0.06, 0.15, 0.3]} />
        {mats.headlightMat}
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.82, 0.8, 0.7]}>
        <boxGeometry args={[0.04, 0.2, 0.3]} />
        {mats.taillightMat}
      </mesh>
      <mesh position={[-2.82, 0.8, -0.7]}>
        <boxGeometry args={[0.04, 0.2, 0.3]} />
        {mats.taillightMat}
      </mesh>

      {/* Front bumper - heavy duty */}
      <mesh position={[2.5, 0.35, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 2.1]} />
        {mats.chromeMat}
      </mesh>
      {/* Rear bumper */}
      <mesh position={[-2.85, 0.35, 0]} castShadow>
        <boxGeometry args={[0.15, 0.3, 2.0]} />
        {mats.chromeMat}
      </mesh>

      <SideMirror position={[1.2, 1.2, 1.05]} side="left" bodyMat={mats.bodyMat} />
      <SideMirror position={[1.2, 1.2, -1.05]} side="right" bodyMat={mats.bodyMat} />

      {/* Wheels - large truck */}
      <WheelAssembly position={[1.7, 0.15, 1.1]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.25} />
      <WheelAssembly position={[1.7, 0.15, -1.1]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.25} />
      <WheelAssembly position={[-1.7, 0.15, 1.1]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.25} />
      <WheelAssembly position={[-1.7, 0.15, -1.1]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.25} />

      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[5.2, 0.04, 1.8]} />
        {mats.underbodyMat}
      </mesh>
    </group>
  );
};

// ===================== COUPE =====================
export const CoupeModel = ({ color, roughness, autoRotate = true }: VehicleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useVehicleMaterials(color, roughness);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.8}>
      {/* Lower body - wider, lower */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[4.6, 0.55, 1.9]} />
        {mats.bodyMat}
      </mesh>
      {/* Front slope */}
      <mesh position={[2.1, 0.32, 0]} castShadow>
        <sphereGeometry args={[0.45, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>
      {/* Rear fastback */}
      <mesh position={[-2.0, 0.32, 0]} castShadow>
        <sphereGeometry args={[0.4, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>
      {/* Long hood */}
      <mesh position={[1.2, 0.64, 0]} rotation={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[2.4, 0.06, 1.8]} />
        {mats.bodyMat}
      </mesh>
      {/* Cabin - low, swept */}
      <mesh position={[-0.3, 0.92, 0]} castShadow>
        <boxGeometry args={[1.8, 0.52, 1.6]} />
        {mats.bodyMat}
      </mesh>
      {/* Fastback rear */}
      <mesh position={[-1.1, 0.78, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[1.2, 0.35, 1.55]} />
        {mats.bodyMat}
      </mesh>

      {/* Windshield - raked */}
      <mesh position={[0.55, 0.88, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.8, 0.04, 1.5]} />
        {mats.glassMat}
      </mesh>
      {/* Rear window - fastback */}
      <mesh position={[-1.1, 0.85, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.9, 0.04, 1.4]} />
        {mats.glassMat}
      </mesh>
      {/* Side windows - smaller */}
      <mesh position={[-0.3, 0.92, 0.82]}>
        <boxGeometry args={[1.4, 0.35, 0.03]} />
        {mats.glassMat}
      </mesh>
      <mesh position={[-0.3, 0.92, -0.82]}>
        <boxGeometry args={[1.4, 0.35, 0.03]} />
        {mats.glassMat}
      </mesh>

      {/* Aggressive front grill */}
      <mesh position={[2.32, 0.35, 0]}>
        <boxGeometry args={[0.04, 0.25, 1.4]} />
        {mats.grillMat}
      </mesh>
      {/* Air intakes */}
      <mesh position={[2.2, 0.18, 0.5]}>
        <boxGeometry args={[0.15, 0.08, 0.3]} />
        {mats.grillMat}
      </mesh>
      <mesh position={[2.2, 0.18, -0.5]}>
        <boxGeometry args={[0.15, 0.08, 0.3]} />
        {mats.grillMat}
      </mesh>

      {/* Headlights - angular */}
      <mesh position={[2.32, 0.42, 0.72]}>
        <boxGeometry args={[0.06, 0.1, 0.35]} />
        {mats.headlightMat}
      </mesh>
      <mesh position={[2.32, 0.42, -0.72]}>
        <boxGeometry args={[0.06, 0.1, 0.35]} />
        {mats.headlightMat}
      </mesh>

      {/* Taillights - wide strip */}
      <mesh position={[-2.3, 0.42, 0]}>
        <boxGeometry args={[0.04, 0.06, 1.5]} />
        {mats.taillightMat}
      </mesh>

      {/* Spoiler lip */}
      <mesh position={[-2.1, 0.65, 0]}>
        <boxGeometry args={[0.15, 0.04, 1.5]} />
        {mats.bodyMat}
      </mesh>

      {/* Side skirts */}
      <mesh position={[0, 0.12, 0.96]}>
        <boxGeometry args={[3.8, 0.06, 0.04]} />
        {mats.bodyMat}
      </mesh>
      <mesh position={[0, 0.12, -0.96]}>
        <boxGeometry args={[3.8, 0.06, 0.04]} />
        {mats.bodyMat}
      </mesh>

      <SideMirror position={[0.5, 0.75, 0.92]} side="left" bodyMat={mats.bodyMat} />
      <SideMirror position={[0.5, 0.75, -0.92]} side="right" bodyMat={mats.bodyMat} />

      {/* Door handles - 2 door */}
      <mesh position={[0.2, 0.52, 0.96]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[0.2, 0.52, -0.96]}>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>

      {/* Bumpers */}
      <mesh position={[2.2, 0.16, 0]} castShadow>
        <boxGeometry args={[0.3, 0.25, 1.95]} />
        {mats.bodyMat}
      </mesh>
      <mesh position={[-2.15, 0.18, 0]} castShadow>
        <boxGeometry args={[0.25, 0.22, 1.9]} />
        {mats.bodyMat}
      </mesh>
      {/* Dual exhaust */}
      <mesh position={[-2.32, 0.14, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.06, 0.12, 12]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-2.32, 0.14, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.06, 0.12, 12]} />
        {mats.chromeMat}
      </mesh>

      {/* Wheels */}
      <WheelAssembly position={[1.4, 0.02, 1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.05} />
      <WheelAssembly position={[1.4, 0.02, -1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.05} />
      <WheelAssembly position={[-1.4, 0.02, 1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.05} />
      <WheelAssembly position={[-1.4, 0.02, -1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.05} />

      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[4.2, 0.04, 1.7]} />
        {mats.underbodyMat}
      </mesh>
    </group>
  );
};

// ===================== HATCHBACK =====================
export const HatchbackModel = ({ color, roughness, autoRotate = true }: VehicleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useVehicleMaterials(color, roughness);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.85}>
      {/* Lower body - compact */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[4.2, 0.65, 1.8]} />
        {mats.bodyMat}
      </mesh>
      {/* Front */}
      <mesh position={[1.9, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.45, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>
      {/* Rear - blunt */}
      <mesh position={[-1.9, 0.55, 0]} castShadow>
        <boxGeometry args={[0.3, 0.8, 1.75]} />
        {mats.bodyMat}
      </mesh>
      {/* Hood */}
      <mesh position={[1.2, 0.72, 0]} rotation={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[1.6, 0.06, 1.7]} />
        {mats.bodyMat}
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.1, 1.02, 0]} castShadow>
        <boxGeometry args={[2.2, 0.58, 1.65]} />
        {mats.bodyMat}
      </mesh>
      {/* Roof - slopes down at rear */}
      <mesh position={[-0.2, 1.32, 0]} castShadow>
        <boxGeometry args={[1.9, 0.04, 1.5]} />
        {mats.bodyMat}
      </mesh>

      {/* Windshield */}
      <mesh position={[0.85, 0.98, 0]} rotation={[0, 0, 0.38]}>
        <boxGeometry args={[0.8, 0.04, 1.5]} />
        {mats.glassMat}
      </mesh>
      {/* Large rear hatch window */}
      <mesh position={[-1.1, 1.0, 0]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.8, 0.04, 1.45]} />
        {mats.glassMat}
      </mesh>
      {/* Side windows */}
      <mesh position={[-0.1, 1.02, 0.84]}>
        <boxGeometry args={[1.8, 0.42, 0.03]} />
        {mats.glassMat}
      </mesh>
      <mesh position={[-0.1, 1.02, -0.84]}>
        <boxGeometry args={[1.8, 0.42, 0.03]} />
        {mats.glassMat}
      </mesh>

      {/* Grill */}
      <mesh position={[2.12, 0.42, 0]}>
        <boxGeometry args={[0.04, 0.25, 1.1]} />
        {mats.grillMat}
      </mesh>

      {/* Headlights */}
      <mesh position={[2.12, 0.48, 0.65]}>
        <boxGeometry args={[0.06, 0.12, 0.28]} />
        {mats.headlightMat}
      </mesh>
      <mesh position={[2.12, 0.48, -0.65]}>
        <boxGeometry args={[0.06, 0.12, 0.28]} />
        {mats.headlightMat}
      </mesh>

      {/* Taillights - vertical */}
      <mesh position={[-2.06, 0.7, 0.75]}>
        <boxGeometry args={[0.04, 0.35, 0.15]} />
        {mats.taillightMat}
      </mesh>
      <mesh position={[-2.06, 0.7, -0.75]}>
        <boxGeometry args={[0.04, 0.35, 0.15]} />
        {mats.taillightMat}
      </mesh>

      {/* Rear wiper area */}
      <mesh position={[-1.5, 1.15, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.6]} />
        {mats.underbodyMat}
      </mesh>

      <SideMirror position={[0.7, 0.82, 0.92]} side="left" bodyMat={mats.bodyMat} />
      <SideMirror position={[0.7, 0.82, -0.92]} side="right" bodyMat={mats.bodyMat} />

      {/* Door handles - 4 door */}
      <mesh position={[0.4, 0.58, 0.92]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[0.4, 0.58, -0.92]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.4, 0.58, 0.92]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.4, 0.58, -0.92]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>

      {/* Bumpers */}
      <mesh position={[2.0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.3, 1.85]} />
        {mats.bodyMat}
      </mesh>
      <mesh position={[-2.0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.2, 0.28, 1.8]} />
        {mats.bodyMat}
      </mesh>

      {/* Exhaust */}
      <mesh position={[-2.1, 0.12, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.04, 0.08, 12]} />
        {mats.chromeMat}
      </mesh>

      <WheelAssembly position={[1.3, 0.05, 0.95]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={0.95} />
      <WheelAssembly position={[1.3, 0.05, -0.95]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={0.95} />
      <WheelAssembly position={[-1.3, 0.05, 0.95]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={0.95} />
      <WheelAssembly position={[-1.3, 0.05, -0.95]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={0.95} />

      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[3.8, 0.04, 1.6]} />
        {mats.underbodyMat}
      </mesh>
    </group>
  );
};

// ===================== MINI SUV =====================
export const MiniSUVModel = ({ color, roughness, autoRotate = true }: VehicleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mats = useVehicleMaterials(color, roughness);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.45, 0]} scale={0.78}>
      {/* Lower body */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[4.4, 0.75, 1.85]} />
        {mats.bodyMat}
      </mesh>
      {/* Front */}
      <mesh position={[2.0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.48, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mats.bodyMat}
      </mesh>
      {/* Rear */}
      <mesh position={[-2.0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.3, 0.7, 1.8]} />
        {mats.bodyMat}
      </mesh>
      {/* Hood */}
      <mesh position={[1.3, 0.9, 0]} rotation={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[1.7, 0.06, 1.75]} />
        {mats.bodyMat}
      </mesh>
      {/* Cabin - raised */}
      <mesh position={[-0.1, 1.25, 0]} castShadow>
        <boxGeometry args={[2.4, 0.7, 1.72]} />
        {mats.bodyMat}
      </mesh>
      {/* Roof */}
      <mesh position={[-0.1, 1.62, 0]} castShadow>
        <boxGeometry args={[2.1, 0.04, 1.55]} />
        {mats.bodyMat}
      </mesh>
      {/* Roof rails */}
      <mesh position={[-0.1, 1.65, 0.72]}>
        <boxGeometry args={[1.8, 0.03, 0.03]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.1, 1.65, -0.72]}>
        <boxGeometry args={[1.8, 0.03, 0.03]} />
        {mats.chromeMat}
      </mesh>

      {/* Windshield */}
      <mesh position={[1.0, 1.2, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.85, 0.04, 1.55]} />
        {mats.glassMat}
      </mesh>
      {/* Rear window */}
      <mesh position={[-1.15, 1.2, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.7, 0.04, 1.5]} />
        {mats.glassMat}
      </mesh>
      {/* Side windows */}
      <mesh position={[-0.1, 1.25, 0.87]}>
        <boxGeometry args={[2.0, 0.5, 0.03]} />
        {mats.glassMat}
      </mesh>
      <mesh position={[-0.1, 1.25, -0.87]}>
        <boxGeometry args={[2.0, 0.5, 0.03]} />
        {mats.glassMat}
      </mesh>

      {/* Grill */}
      <mesh position={[2.22, 0.55, 0]}>
        <boxGeometry args={[0.04, 0.35, 1.2]} />
        {mats.grillMat}
      </mesh>
      <mesh position={[2.23, 0.55, 0]}>
        <boxGeometry args={[0.02, 0.4, 1.3]} />
        {mats.chromeMat}
      </mesh>

      {/* Headlights */}
      <mesh position={[2.22, 0.65, 0.72]}>
        <boxGeometry args={[0.06, 0.12, 0.28]} />
        {mats.headlightMat}
      </mesh>
      <mesh position={[2.22, 0.65, -0.72]}>
        <boxGeometry args={[0.06, 0.12, 0.28]} />
        {mats.headlightMat}
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.16, 0.72, 0.72]}>
        <boxGeometry args={[0.04, 0.2, 0.2]} />
        {mats.taillightMat}
      </mesh>
      <mesh position={[-2.16, 0.72, -0.72]}>
        <boxGeometry args={[0.04, 0.2, 0.2]} />
        {mats.taillightMat}
      </mesh>

      {/* Wheel arch cladding */}
      {[
        [1.4, 0.35, 0.94],
        [1.4, 0.35, -0.94],
        [-1.4, 0.35, 0.94],
        [-1.4, 0.35, -0.94],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.6, 0.4, 0.06]} />
          {mats.underbodyMat}
        </mesh>
      ))}

      <SideMirror position={[0.8, 1.0, 0.92]} side="left" bodyMat={mats.bodyMat} />
      <SideMirror position={[0.8, 1.0, -0.92]} side="right" bodyMat={mats.bodyMat} />

      {/* Door handles */}
      <mesh position={[0.4, 0.7, 0.94]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[0.4, 0.7, -0.94]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.4, 0.7, 0.94]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>
      <mesh position={[-0.4, 0.7, -0.94]}>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mats.chromeMat}
      </mesh>

      {/* Bumpers */}
      <mesh position={[2.1, 0.25, 0]} castShadow>
        <boxGeometry args={[0.3, 0.3, 1.9]} />
        {mats.bodyMat}
      </mesh>
      <mesh position={[-2.1, 0.25, 0]} castShadow>
        <boxGeometry args={[0.2, 0.28, 1.85]} />
        {mats.bodyMat}
      </mesh>

      {/* Skid plate */}
      <mesh position={[2.15, 0.12, 0]}>
        <boxGeometry args={[0.15, 0.06, 0.8]} />
        {mats.chromeMat}
      </mesh>

      <WheelAssembly position={[1.4, 0.1, 1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.1} />
      <WheelAssembly position={[1.4, 0.1, -1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.1} />
      <WheelAssembly position={[-1.4, 0.1, 1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.1} />
      <WheelAssembly position={[-1.4, 0.1, -1.0]} tireMat={mats.tireMat} rimMat={mats.rimMat} scale={1.1} />

      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.0, 0.04, 1.7]} />
        {mats.underbodyMat}
      </mesh>
    </group>
  );
};

export const vehicleComponents = {
  sedan: SedanModel,
  suv: SUVModel,
  pickup: PickupModel,
  coupe: CoupeModel,
  hatchback: HatchbackModel,
  minisuv: MiniSUVModel,
};

export type VehicleType = keyof typeof vehicleComponents;
