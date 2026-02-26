import { motion } from "framer-motion";
import { Car, Shield, Droplet, Sun, Sparkles, Scissors } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Car Body Wrapping",
    description: "Full and partial body wraps in premium vinyl with gloss, matte, satin, and metallic finishes.",
  },
  {
    icon: Shield,
    title: "Vinyl & PPF Installation",
    description: "Paint Protection Film to guard against scratches, rock chips, and UV damage.",
  },
  {
    icon: Scissors,
    title: "Wrap Removal",
    description: "Safe, clean removal of old wraps without damaging the original paintwork.",
  },
  {
    icon: Sun,
    title: "Headlight Tint & Car Tinting",
    description: "Professional window tinting and headlight tinting for style and UV protection.",
  },
  {
    icon: Sparkles,
    title: "Auto Detailing & Buffing",
    description: "Deep cleaning, paint correction, and buffing to restore your car's showroom shine.",
  },
  {
    icon: Droplet,
    title: "Ceramic Coating",
    description: "Long-lasting nano-ceramic coating for superior protection and hydrophobic finish.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-secondary overflow-hidden">
      {/* Oversized background headline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[12rem] sm:text-[16rem] lg:text-[22rem] font-display font-bold uppercase tracking-tight text-secondary-foreground/[0.03] leading-none whitespace-nowrap">
          WHAT WE DO
        </span>
      </div>

      {/* Subtle top/bottom edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
          <div>
            <span className="text-primary font-cta font-semibold uppercase tracking-[0.3em] text-sm">
              What We Do
            </span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-secondary-foreground mt-3 uppercase tracking-wide">
              Our <span className="text-gradient-primary">Services</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full mt-5" />
          </div>
          <p className="text-muted-foreground max-w-md lg:text-lg font-body">
            From full body wraps to ceramic coatings, we deliver premium automotive customization with precision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Gradient border wrapper */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glow effect on hover */}
              <div className="absolute -inset-4 rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />

              <div className="relative p-8 rounded-2xl border border-border/30 bg-card/5 backdrop-blur-sm hover:-translate-y-2 transition-all duration-400 ease-out overflow-hidden h-full">
                {/* Inner highlight sweep */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(211_100%_50%/0.2)] transition-all duration-400">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title with animated underline */}
                  <h3 className="font-display font-bold text-xl text-secondary-foreground mb-3 uppercase tracking-wide">
                    <span className="relative">
                      {service.title}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed font-body">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
