import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, Wrench } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", description: "We pursue the highest standards in every wrap, coat, and detail." },
  { icon: Users, title: "Community", description: "We uplift our local community through employment and mentorship." },
  { icon: Heart, title: "Passion", description: "Every vehicle we touch reflects our genuine love for automotive culture." },
  { icon: Wrench, title: "Craftsmanship", description: "Precision, patience, and skill are at the core of everything we do." },
];

const About = () => {
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
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-display font-bold mt-3"
          >
            Our <span className="text-gradient-gold">Story</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg"
          >
            Built in Kenya, for Kenya — and beyond.
          </motion.p>
          <div className="african-border mx-auto max-w-xs mt-6" />
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                <strong className="text-foreground">Its Wrap Haus</strong> was born from a simple belief: that Kenyan car enthusiasts deserve world-class automotive customization — right here at home. No compromises. No shortcuts.
              </p>
              <p>
                What started as a small workshop along Ruiru Bypass has grown into one of Nairobi's most trusted names in vinyl wrapping, paint protection film, ceramic coating, and professional detailing. Every vehicle we touch is a canvas, and every project is personal.
              </p>
              <p>
                Our team of skilled Kenyan technicians are trained to international standards, using only premium-grade materials sourced from top global suppliers. We combine local talent with global quality — because Kenya deserves nothing less.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-dark-surface relative overflow-hidden">
        <div className="absolute inset-0 african-pattern opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border/10 bg-card/5"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver premium automotive customization services that meet international standards while nurturing local talent and empowering the Kenyan automotive community.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border/10 bg-card/5"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be East Africa's leading automotive transformation studio — setting the standard for quality, innovation, and customer experience in vehicle customization.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-5xl font-display font-bold">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
