import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Paintbrush, RotateCcw, Sun, Car } from "lucide-react";
import SimulatorVehicle from "./simulator/VehicleModels";
import { Slider } from "@/components/ui/slider";

const vehicles = [
  { name: "Audi RS5", model: "/models/audi-rs5.glb" },
  { name: "Toyota Land Cruiser 250", model: "/models/land-cruiser.glb" },
];

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

const tintPresets = [
  { name: "Clear", vlt: 70, level: 0 },
  { name: "Light", vlt: 50, level: 0.3 },
  { name: "Medium", vlt: 35, level: 0.5 },
  { name: "Dark", vlt: 20, level: 0.75 },
  { name: "Limo", vlt: 5, level: 1 },
];

const chameleonTints = [
  { name: "None", hex: "#1a1a2e", isChameleon: false },
  { name: "Purple-Green", hex: "#6b21a8", isChameleon: true },
  { name: "Blue-Gold", hex: "#1e40af", isChameleon: true },
  { name: "Red-Copper", hex: "#991b1b", isChameleon: true },
  { name: "Emerald Shift", hex: "#065f46", isChameleon: true },
  { name: "Pink-Gold", hex: "#db2777", isChameleon: true },
  { name: "Ocean Teal", hex: "#0d9488", isChameleon: true },
  { name: "Sunset Bronze", hex: "#b45309", isChameleon: true },
  { name: "Violet-Blue", hex: "#7c3aed", isChameleon: true },
];

type TintZone = "all" | "windscreen" | "windows";

type TabMode = "wrap" | "tint";

const Simulator3D = () => {
  const [selectedColor, setSelectedColor] = useState(wrapColors[6]);
  const [selectedFinish, setSelectedFinish] = useState(finishes[0]);
  const [tintLevel, setTintLevel] = useState(0);
  const [selectedChameleon, setSelectedChameleon] = useState(chameleonTints[0]);
  const [tintZone, setTintZone] = useState<TintZone>("all");
  const [activeTab, setActiveTab] = useState<TabMode>("wrap");
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

  const effectiveRoughness = selectedFinish.roughness;
  const currentTintPreset = tintPresets.reduce((prev, curr) =>
    Math.abs(curr.level - tintLevel) < Math.abs(prev.level - tintLevel) ? curr : prev
  );

  const whatsappMessage = `Hi! I'd like a ${selectedColor.name} ${selectedFinish.name} wrap${tintLevel > 0 ? ` with ${currentTintPreset.name} tint (${currentTintPreset.vlt}% VLT)${selectedChameleon.isChameleon ? ` - ${selectedChameleon.name} Chameleon` : ""}` : ""} for my vehicle.`;

  return (
    <div className="min-h-screen bg-dark-surface relative overflow-hidden">
      <div className="absolute inset-0 african-pattern opacity-20" />

      <div className="container mx-auto px-4 py-8 relative">
        <div className="text-center mb-8">
          <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
            Interactive 3D Tool
          </span>
          <h1 className="text-3xl lg:text-5xl font-display font-bold mt-2">
            Wrap & Tint <span className="text-gradient-gold">Simulator</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Customize your wrap color and window tint, then see the result in real time.
          </p>
          <div className="african-border mx-auto max-w-xs mt-4" />
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-start">
          {/* Controls */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Tab switcher */}
            <div className="flex rounded-lg border border-border/20 overflow-hidden">
              <button
                onClick={() => setActiveTab("wrap")}
                className={`flex-1 px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === "wrap"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Paintbrush className="w-4 h-4" />
                Wrap
              </button>
              <button
                onClick={() => setActiveTab("tint")}
                className={`flex-1 px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === "tint"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sun className="w-4 h-4" />
                Tint
              </button>
            </div>

            {activeTab === "wrap" ? (
              <>
                {/* Color selector */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <Paintbrush className="w-4 h-4 text-primary" />
                    Wrap Color
                  </h3>
                  <div className="grid grid-cols-6 gap-2">
                    {wrapColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                        className={`w-full aspect-square rounded-lg border-2 transition-all ${
                          selectedColor.name === color.name
                            ? "border-primary scale-110 shadow-glow"
                            : "border-border/20 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: <span className="text-foreground font-medium">{selectedColor.name}</span>
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
              </>
            ) : (
              /* Tint controls */
              <div className="space-y-6">
                {/* Tint zone selector */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Tint Area
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { value: "all" as TintZone, label: "All Glass" },
                      { value: "windscreen" as TintZone, label: "Windscreen" },
                      { value: "windows" as TintZone, label: "Windows Only" },
                    ]).map((zone) => (
                      <button
                        key={zone.value}
                        onClick={() => setTintZone(zone.value)}
                        className={`px-2 py-2.5 rounded-lg text-xs font-medium transition-all border text-center ${
                          tintZone === zone.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/20 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {zone.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-primary" />
                    Window Tint Darkness
                  </h3>
                  <Slider
                    value={[tintLevel * 100]}
                    onValueChange={([val]) => setTintLevel(val / 100)}
                    max={100}
                    step={1}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Clear (70% VLT)</span>
                    <span>Limo (5% VLT)</span>
                  </div>
                </div>

                {/* Tint presets */}
                <div className="grid grid-cols-5 gap-1.5">
                  {tintPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setTintLevel(preset.level)}
                      className={`px-2 py-2.5 rounded-lg text-xs font-medium transition-all border text-center ${
                        currentTintPreset.name === preset.name
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/20 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <span className="block">{preset.name}</span>
                      <span className="text-[10px] opacity-70">{preset.vlt}%</span>
                    </button>
                  ))}
                </div>

                {/* Chameleon tint */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Chameleon Tint
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {chameleonTints.map((ch) => (
                      <button
                        key={ch.name}
                        onClick={() => setSelectedChameleon(ch)}
                        className={`px-2 py-2.5 rounded-lg text-xs font-medium transition-all border text-center ${
                          selectedChameleon.name === ch.name
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/20 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full mx-auto mb-1"
                          style={{
                            background: ch.isChameleon
                              ? `linear-gradient(135deg, ${ch.hex}, #c8a22c, ${ch.hex})`
                              : "hsl(var(--muted))",
                          }}
                        />
                        {ch.name}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Current: <span className="text-foreground font-medium">{currentTintPreset.name} ({currentTintPreset.vlt}% VLT){selectedChameleon.isChameleon ? ` • ${selectedChameleon.name}` : ""}</span>
                </p>
              </div>
            )}

            {/* CTA */}
            <a
              href={`https://wa.me/254700000000?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-glow"
            >
              Get This Look
            </a>
          </div>

          {/* 3D Canvas */}
          <div className="order-1 lg:order-2 aspect-square sm:aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden border border-border/10 bg-gradient-to-b from-muted/5 to-muted/10 relative touch-manipulation">
            <Canvas
              camera={{ position: [5, 3, 5], fov: 45 }}
              shadows
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
                <directionalLight position={[-3, 4, -3]} intensity={0.4} />
                <pointLight position={[0, 3, 0]} intensity={0.3} color="#c8a22c" />

                <SimulatorVehicle
                  color={selectedColor.hex}
                  roughness={effectiveRoughness}
                  tintLevel={tintLevel}
                  tintColor={selectedChameleon.hex}
                  isChameleon={selectedChameleon.isChameleon}
                  tintZone={tintZone}
                  modelUrl={selectedVehicle.model}
                />

                <ContactShadows position={[0, -0.95, 0]} opacity={0.5} scale={12} blur={2.5} />
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

            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              {vehicles.map((v) => (
                <button
                  key={v.name}
                  onClick={() => setSelectedVehicle(v)}
                  className={`bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedVehicle.name === v.name
                      ? "text-primary border border-primary/50"
                      : "text-white/70 hover:text-white border border-transparent"
                  }`}
                >
                  <Car className="w-3 h-3" />
                  {v.name}
                </button>
              ))}
            </div>

            <div className="absolute bottom-3 left-3 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-primary" />
              <span className="text-xs text-white/70">Drag to rotate • Scroll to zoom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator3D;
