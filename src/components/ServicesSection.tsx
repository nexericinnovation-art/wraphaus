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
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mt-2">
              Our <span className="text-gradient-primary">Services</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            From full body wraps to ceramic coatings, we deliver premium automotive customization with precision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-card"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-card-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
