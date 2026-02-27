import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceWrapping from "@/assets/service-wrapping.jpg";
import servicePpf from "@/assets/service-ppf.jpg";
import serviceRemoval from "@/assets/service-removal.jpg";
import serviceTinting from "@/assets/service-tinting.jpg";
import serviceDetailing from "@/assets/service-detailing.jpg";
import serviceCeramic from "@/assets/service-ceramic.jpg";

const services = [
  {
    image: serviceWrapping,
    title: "Car Body Wrapping",
    description: "Full and partial body wraps in premium vinyl with gloss, matte, satin, and metallic finishes. We handle everything from color-change wraps to custom designs — transforming your vehicle's look while protecting the original paint.",
    features: ["Full & partial wraps", "Gloss, matte, satin finishes", "Custom designs & graphics", "Premium 3M & Avery materials"],
  },
  {
    image: servicePpf,
    title: "Vinyl & PPF Installation",
    description: "Paint Protection Film to guard against scratches, rock chips, and UV damage. Our XPEL and 3M PPF installations provide invisible armor that keeps your paint flawless for years.",
    features: ["Self-healing film", "UV & scratch protection", "XPEL & 3M products", "10-year warranty"],
  },
  {
    image: serviceRemoval,
    title: "Wrap Removal",
    description: "Safe, clean removal of old wraps without damaging the original paintwork. Whether you want a fresh wrap or just want to restore your factory paint, we handle it with care.",
    features: ["Safe heat removal", "No paint damage", "Surface prep included", "Quick turnaround"],
  },
  {
    image: serviceTinting,
    title: "Headlight Tint & Car Tinting",
    description: "Professional window tinting and headlight tinting for style and UV protection. We use high-quality ceramic tint films for optimal heat rejection and clarity.",
    features: ["Ceramic tint films", "99% UV block", "Legal compliance", "Headlight tinting"],
  },
  {
    image: serviceDetailing,
    title: "Auto Detailing & Buffing",
    description: "Deep cleaning, paint correction, and buffing to restore your car's showroom shine. Our multi-stage detailing process removes swirl marks, oxidation, and imperfections.",
    features: ["Paint correction", "Interior deep clean", "Engine bay cleaning", "Swirl mark removal"],
  },
  {
    image: serviceCeramic,
    title: "Ceramic Coating",
    description: "Long-lasting nano-ceramic coating for superior protection and hydrophobic finish. Our ceramic coatings bond at the molecular level, creating an incredibly durable shield.",
    features: ["9H hardness rating", "Hydrophobic finish", "5-year durability", "Easy maintenance"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-dark-surface relative overflow-hidden">
        <div className="absolute inset-0 african-pattern opacity-30" />
        <div className="container mx-auto px-4 relative text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-display font-semibold uppercase tracking-widest text-sm"
          >
            What We Do
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-display font-bold mt-3"
          >
            Our <span className="text-gradient-gold">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg"
          >
            From full body wraps to ceramic coatings, we deliver premium automotive customization with precision and care.
          </motion.p>
          <div className="african-border mx-auto max-w-xs mt-6" />
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="rounded-2xl overflow-hidden border border-border shadow-card">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-72 lg:h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="font-display font-bold text-2xl lg:text-3xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold uppercase tracking-wider"
                  >
                    <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                      Get a Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
