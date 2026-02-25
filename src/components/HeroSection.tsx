import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import carSedan from "@/assets/car-sedan.png";
import carSuv from "@/assets/car-suv.png";
import carCoupe from "@/assets/car-coupe.png";

const featuredVehicles = [
  { id: "sedan", name: "Sedan", sub: "BMW 3 Series", image: carSedan },
  { id: "suv", name: "SUV", sub: "Jeep Grand Cherokee", image: carSuv },
  { id: "coupe", name: "Coupe", sub: "Audi A5", image: carCoupe },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium car wrap close-up" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      </div>

      <div className="relative container mx-auto px-4 pt-20 lg:pt-0">
        <div className="max-w-2xl">


          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-secondary-foreground leading-[1.1] mb-6"
          >
            Turn Heads.
            <br />
            <span className="text-gradient-primary">Own the Road.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="text-lg text-muted-foreground max-w-lg mb-8"
          >
            Expert car wrapping, PPF installation, ceramic coating, and auto detailing.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold uppercase tracking-wider text-base px-8 shadow-glow"
              >
                <a href="#simulator">
                  Preview Your Car
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 font-display font-semibold uppercase tracking-wider text-base px-8"
              >
                <a href="#services">Explore Services</a>
              </Button>
            </motion.div>
          </div>

          {/* Featured vehicles strip */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-xl"
          >
            {featuredVehicles.map((v, i) => (
              <a
                key={v.id}
                href="#simulator"
                className="group relative bg-secondary/60 backdrop-blur-sm border border-border/20 rounded-xl p-3 hover:border-primary/50 transition-all hover:bg-secondary/80"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-lg mb-2">
                  <img
                    src={v.image}
                    alt={v.sub}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="font-display font-semibold text-secondary-foreground text-sm">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.sub}</p>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
