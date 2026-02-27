import { motion } from "framer-motion";
import { MapPin, Award, Users, Shield } from "lucide-react";

const highlights = [
  {
    icon: MapPin,
    title: "Based in Nairobi",
    description: "Located along Ruiru Bypass, serving clients across Kenya.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "International-grade materials and certified installation techniques.",
  },
  {
    icon: Users,
    title: "Kenyan Expertise",
    description: "Skilled local technicians trained to global standards.",
  },
  {
    icon: Shield,
    title: "Trusted by Many",
    description: "Hundreds of satisfied clients trust us with their vehicles.",
  },
];

const ProudlyKenyanSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-dark-surface relative overflow-hidden">
      {/* African pattern overlay */}
      <div className="absolute inset-0 african-pattern opacity-40" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-display font-semibold uppercase tracking-widest text-sm"
          >
            🇰🇪 Our Heritage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-display font-bold mt-2"
          >
            Proudly <span className="text-gradient-gold">Kenyan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg"
          >
            Born and built in Kenya, we bring world-class automotive customization to East Africa — with pride, precision, and passion.
          </motion.p>

          {/* African border pattern */}
          <div className="african-border mx-auto max-w-xs mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-xl border border-border/10 bg-card/5 hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProudlyKenyanSection;
