import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import serviceWrapping from "@/assets/service-wrapping.jpg";
import servicePpf from "@/assets/service-ppf.jpg";
import serviceCeramic from "@/assets/service-ceramic.jpg";

const services = [
  {
    image: serviceWrapping,
    title: "Car Body Wrapping",
    description: "Full and partial body wraps in premium vinyl.",
  },
  {
    image: servicePpf,
    title: "Vinyl & PPF",
    description: "Paint Protection Film against scratches and UV.",
  },
  {
    image: serviceCeramic,
    title: "Ceramic Coating",
    description: "Nano-ceramic coating for lasting protection.",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
          <div>
            <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
              What We Do
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mt-2">
              Our <span className="text-gradient-gold">Services</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
          </div>
          <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-display font-semibold uppercase tracking-wider self-start lg:self-auto">
            <Link to="/services">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group rounded-2xl border border-border bg-card shadow-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-44 sm:h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>
              <div className="p-6 pt-2">
                <h3 className="font-display font-bold text-xl text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
