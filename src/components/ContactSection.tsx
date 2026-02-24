import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
            Get In Touch
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mt-2">
            Visit <span className="text-gradient-primary">Us</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-border h-80 lg:h-full min-h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d36.96!3d-1.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRuiru+Bypass!5e0!3m2!1sen!2ske!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Its Wrap Haus Location - Ruiru Bypass"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Location</h3>
                <p className="text-muted-foreground">Ruiru Bypass — Trunked Coffee, Ruiru, Kenya</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Phone</h3>
                <p className="text-muted-foreground">+254 700 000 000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Business Hours</h3>
                <p className="text-muted-foreground">Mon – Sat: 8:00 AM – 6:00 PM</p>
                <p className="text-muted-foreground">Sunday: By Appointment</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold uppercase tracking-wider"
              >
                <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted font-display font-semibold uppercase tracking-wider"
              >
                <a href="tel:+254700000000">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
