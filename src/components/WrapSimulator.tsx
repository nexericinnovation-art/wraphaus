import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Paintbrush } from "lucide-react";

import carSedan from "@/assets/car-sedan.png";
import carSuv from "@/assets/car-suv.png";
import carMiniSuv from "@/assets/car-mini-suv.png";
import carPickup from "@/assets/car-pickup.png";
import carCoupe from "@/assets/car-coupe.png";
import carHatchback from "@/assets/car-hatchback.png";

const vehicles = [
  { id: "sedan", name: "Sedan", sub: "BMW 3 Series", image: carSedan },
  { id: "suv", name: "SUV", sub: "Jeep Grand Cherokee", image: carSuv },
  { id: "mini-suv", name: "Mini SUV", sub: "Honda HR-V", image: carMiniSuv },
  { id: "pickup", name: "Pickup", sub: "Toyota Hilux", image: carPickup },
  { id: "coupe", name: "Coupe", sub: "Audi A5", image: carCoupe },
  { id: "hatchback", name: "Hatchback", sub: "VW Golf", image: carHatchback },
];

const wrapColors = [
  { name: "Gloss Black", hue: 0, saturate: 0, brightness: 0.2, css: "hsl(0,0%,10%)" },
  { name: "Matte White", hue: 0, saturate: 0, brightness: 1.0, css: "hsl(0,0%,95%)" },
  { name: "Electric Blue", hue: 200, saturate: 2.5, brightness: 0.6, css: "hsl(211,100%,50%)" },
  { name: "Racing Red", hue: 340, saturate: 2.5, brightness: 0.55, css: "hsl(0,85%,50%)" },
  { name: "Midnight Purple", hue: 260, saturate: 2, brightness: 0.45, css: "hsl(270,60%,40%)" },
  { name: "Nardo Grey", hue: 0, saturate: 0, brightness: 0.55, css: "hsl(220,5%,55%)" },
  { name: "Satin Gold", hue: 40, saturate: 2, brightness: 0.7, css: "hsl(42,80%,55%)" },
  { name: "Forest Green", hue: 120, saturate: 1.8, brightness: 0.4, css: "hsl(140,50%,35%)" },
  { name: "Chrome Silver", hue: 0, saturate: 0, brightness: 0.85, css: "hsl(220,10%,78%)" },
  { name: "Lava Orange", hue: 20, saturate: 3, brightness: 0.65, css: "hsl(25,95%,55%)" },
];

const finishes = ["Gloss", "Matte", "Satin", "Metallic"];

const WrapSimulator = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [selectedColor, setSelectedColor] = useState(wrapColors[2]); // Electric Blue default
  const [selectedFinish, setSelectedFinish] = useState("Gloss");

  const getFilterStyle = () => {
    const c = selectedColor;
    // For white/no-hue colors, just adjust brightness
    if (c.saturate === 0) {
      return `brightness(${c.brightness}) contrast(1.1)`;
    }
    return `sepia(1) saturate(${c.saturate}) hue-rotate(${c.hue}deg) brightness(${c.brightness}) contrast(1.1)`;
  };

  return (
    <section id="simulator" className="py-20 lg:py-28 bg-dark-surface relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
            Interactive Tool
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-secondary-foreground mt-2">
            Wrap <span className="text-gradient-primary">Simulator</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Choose your vehicle, pick a color & finish, and preview the transformation.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
          {/* Controls */}
          <div className="space-y-6">
            {/* Vehicle selector */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                Select Vehicle
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className={`p-3 rounded-lg text-left transition-all border ${
                      selectedVehicle.id === v.id
                        ? "border-primary bg-primary/10 text-primary-foreground"
                        : "border-border/20 bg-muted/5 text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <div className="font-display font-semibold text-sm">{v.name}</div>
                    <div className="text-xs opacity-70">{v.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color selector */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-primary" />
                Wrap Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {wrapColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? "border-primary scale-110 shadow-glow"
                        : "border-border/20 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.css }}
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
              <div className="flex gap-2">
                {finishes.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      selectedFinish === finish
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/20 text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/254700000000?text=Hi!%20I'm%20interested%20in%20wrapping%20my%20car%20in%20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-glow"
            >
              Start Your Wrap
            </a>
          </div>

          {/* Preview */}
          <div className="relative bg-muted/5 rounded-2xl border border-border/10 p-4 lg:p-8 flex items-center justify-center min-h-[350px] lg:min-h-[450px]">
            {/* Blue diagonal accent like template */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/10 rounded-2xl diagonal-clip pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.img
                key={selectedVehicle.id + selectedColor.name}
                src={selectedVehicle.image}
                alt={`${selectedVehicle.name} - ${selectedColor.name} ${selectedFinish}`}
                className="relative z-10 w-full max-w-lg object-contain drop-shadow-2xl"
                style={{ filter: getFilterStyle() }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>

            {/* Label */}
            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-8 z-20">
              <div className="bg-secondary/80 backdrop-blur-sm border border-border/10 rounded-lg px-4 py-2">
                <p className="font-display font-bold text-secondary-foreground text-lg">
                  {selectedVehicle.sub}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedColor.name} • {selectedFinish}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WrapSimulator;
