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
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
          <div>
            <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
              What We Do
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mt-2 drop-shadow-lg">
              Our <span className="text-gradient-primary">Services</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-pink-500 rounded-full mt-4 mb-2" />
          </div>
          <p className="text-muted-foreground max-w-md lg:text-lg">
            From full body wraps to ceramic coatings, we deliver premium automotive customization with precision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group p-8 rounded-2xl border border-border bg-gradient-to-br from-background via-white/80 to-background shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-pink-200/10 to-transparent blur-2xl" />
              </div>
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors shadow-md">
                <service.icon className="w-8 h-8 text-primary drop-shadow-md" />
              </div>
              <h3 className="font-display font-bold text-xl text-card-foreground mb-2 drop-shadow-sm">
                {service.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
