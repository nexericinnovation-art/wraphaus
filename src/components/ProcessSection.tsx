import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Discuss your vision, choose materials, colors, and finishes that match your style.",
  },
  {
    number: "02",
    title: "Preparation",
    description: "Thorough cleaning, surface decontamination, and precise measurement of your vehicle.",
  },
  {
    number: "03",
    title: "Application",
    description: "Expert installation by certified technicians using premium-grade vinyl and tools.",
  },
  {
    number: "04",
    title: "Final Inspection",
    description: "Quality check, heat treatment of edges, and final detailing for a flawless result.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
            How It Works
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mt-2">
            Our <span className="text-gradient-gold">Process</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative group p-6 rounded-xl border border-border hover:border-primary/30 transition-colors"
            >
              <span className="font-display text-6xl lg:text-7xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors leading-none">
                {step.number}
              </span>
              <div className="mt-[-0.5rem] relative z-10">
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
