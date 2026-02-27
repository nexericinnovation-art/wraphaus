import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Mwangi",
    role: "BMW 5 Series Owner",
    text: "The matte black wrap on my BMW is absolutely stunning. The team at Its Wrap Haus delivered beyond my expectations — precision and quality you won't find elsewhere in Nairobi.",
    rating: 5,
  },
  {
    name: "Amina Odhiambo",
    role: "Range Rover Sport Owner",
    text: "I wanted PPF and ceramic coating for my new Range Rover. They handled everything professionally. My car looks brand new months later. Highly recommended!",
    rating: 5,
  },
  {
    name: "Kevin Njoroge",
    role: "Mercedes C-Class Owner",
    text: "From consultation to final delivery, the experience was top-notch. The satin gold wrap turned heads everywhere I go. These guys are the real deal.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
            What Clients Say
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mt-2">
            Client <span className="text-gradient-gold">Reviews</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-6 rounded-2xl border border-border bg-card shadow-card relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div>
                <p className="font-display font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
