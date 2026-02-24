import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Paintbrush, RotateCcw } from "lucide-react";
import * as THREE from "three";

// Stylized low-poly car model built from primitives
const CarModel = ({ color, roughness }: { color: string; roughness: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const bodyMaterial = (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      metalness={0.6}
      clearcoat={1}
      clearcoatRoughness={roughness * 0.5}
    />
  );

  const glassMaterial = (
    <meshPhysicalMaterial
      color="#1a2a3a"
      roughness={0.05}
      metalness={0.1}
      transmission={0.6}
      transparent
      opacity={0.7}
    />
  );

  const tireMaterial = (
    <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
  );

  const rimMaterial = (
    <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
  );

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.85}>
      {/* Main body - lower */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[4.2, 0.7, 1.8]} />
        {bodyMaterial}
      </mesh>

      {/* Body - rounded front */}
      <mesh position={[1.8, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.55, 16, 16]} />
        {bodyMaterial}
      </mesh>

      {/* Body - rounded rear */}
      <mesh position={[-1.8, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.55, 16, 16]} />
        {bodyMaterial}
      </mesh>

      {/* Cabin / roof */}
      <mesh position={[-0.2, 1.0, 0]} castShadow>
        <boxGeometry args={[2.2, 0.65, 1.6]} />
        {bodyMaterial}
      </mesh>

      {/* Windshield front */}
      <mesh position={[0.85, 0.95, 0]} rotation={[0, 0, 0.35]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.5]} />
        {glassMaterial}
      </mesh>

      {/* Windshield rear */}
      <mesh position={[-1.15, 0.95, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.6, 0.55, 1.5]} />
        {glassMaterial}
      </mesh>

      {/* Side windows left */}
      <mesh position={[-0.2, 0.98, 0.85]}>
        <boxGeometry args={[1.8, 0.45, 0.05]} />
        {glassMaterial}
      </mesh>

      {/* Side windows right */}
      <mesh position={[-0.2, 0.98, -0.85]}>
        <boxGeometry args={[1.8, 0.45, 0.05]} />
        {glassMaterial}
      </mesh>

      {/* Headlights */}
      <mesh position={[2.1, 0.45, 0.6]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#ffffdd" emissive="#ffffaa" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[2.1, 0.45, -0.6]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#ffffdd" emissive="#ffffaa" emissiveIntensity={0.5} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.1, 0.45, 0.6]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-2.1, 0.45, -0.6]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>

      {/* Wheels */}
      {[
        [1.3, 0, 0.95],
        [1.3, 0, -0.95],
        [-1.3, 0, 0.95],
        [-1.3, 0, -0.95],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.32, 0.12, 12, 24]} />
            {tireMaterial}
          </mesh>
          {/* Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.15, 16]} />
            {rimMaterial}
          </mesh>
        </group>
      ))}

      {/* Undercarriage */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[3.8, 0.05, 1.6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
};

const wrapColors = [
  { name: "Gloss Black", hex: "#0a0a0a", roughness: 0.1 },
  { name: "Matte White", hex: "#e8e8e8", roughness: 0.8 },
  { name: "Electric Blue", hex: "#0080ff", roughness: 0.15 },
  { name: "Racing Red", hex: "#cc1100", roughness: 0.15 },
  { name: "Midnight Purple", hex: "#3a1078", roughness: 0.2 },
  { name: "Nardo Grey", hex: "#7a7d82", roughness: 0.7 },
  { name: "Satin Gold", hex: "#c8a22c", roughness: 0.4 },
  { name: "Forest Green", hex: "#1a5c32", roughness: 0.3 },
  { name: "Chrome Silver", hex: "#c8ccd0", roughness: 0.05 },
  { name: "Lava Orange", hex: "#e85d15", roughness: 0.2 },
  { name: "Tiffany Blue", hex: "#0abab5", roughness: 0.15 },
  { name: "Frozen Berry", hex: "#8b2252", roughness: 0.6 },
];

const finishes = [
  { name: "Gloss", roughness: 0.1 },
  { name: "Matte", roughness: 0.85 },
  { name: "Satin", roughness: 0.4 },
  { name: "Metallic", roughness: 0.15 },
];

const Simulator3D = () => {
  const [selectedColor, setSelectedColor] = useState(wrapColors[2]);
  const [selectedFinish, setSelectedFinish] = useState(finishes[0]);

  const effectiveRoughness = selectedFinish.roughness;

  return (
    <section id="simulator" className="py-20 lg:py-28 bg-dark-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
            Interactive 3D Tool
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-secondary-foreground mt-2">
            3D Wrap <span className="text-gradient-primary">Simulator</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Drag to rotate the car. Pick a color and finish to preview your wrap in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-start">
          {/* Controls */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Color selector */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-primary" />
                Wrap Color
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {wrapColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-full aspect-square rounded-lg border-2 transition-all ${
                      selectedColor.name === color.name
                        ? "border-primary scale-105 shadow-glow"
                        : "border-border/20 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Selected: <span className="text-secondary-foreground font-medium">{selectedColor.name}</span>
              </p>
            </div>

            {/* Finish selector */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Finish Type
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {finishes.map((finish) => (
                  <button
                    key={finish.name}
                    onClick={() => setSelectedFinish(finish)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                      selectedFinish.name === finish.name
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/20 text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {finish.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/254700000000?text=Hi!%20I'd%20like%20a%20${encodeURIComponent(selectedColor.name)}%20${encodeURIComponent(selectedFinish.name)}%20wrap`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-glow"
            >
              Start Your Wrap
            </a>
          </div>

          {/* 3D Canvas */}
          <div className="order-1 lg:order-2 aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden border border-border/10 bg-gradient-to-b from-muted/5 to-muted/10 relative">
            <Canvas
              camera={{ position: [5, 3, 5], fov: 45 }}
              shadows
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <directionalLight
                  position={[5, 8, 5]}
                  intensity={1.2}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />
                <directionalLight position={[-3, 4, -3]} intensity={0.4} />
                <pointLight position={[0, 3, 0]} intensity={0.3} color="#0080ff" />

                <CarModel
                  color={selectedColor.hex}
                  roughness={effectiveRoughness}
                />

                <ContactShadows
                  position={[0, -0.95, 0]}
                  opacity={0.5}
                  scale={12}
                  blur={2.5}
                />

                <Environment preset="city" />

                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  minDistance={4}
                  maxDistance={10}
                  minPolarAngle={Math.PI * 0.2}
                  maxPolarAngle={Math.PI * 0.5}
                  autoRotate={false}
                />
              </Suspense>
            </Canvas>

            {/* Instruction overlay */}
            <div className="absolute bottom-3 left-3 z-10 bg-secondary/70 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Drag to rotate • Scroll to zoom</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simulator3D;
