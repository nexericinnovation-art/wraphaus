import { useState } from "react";
import { Menu, X, Phone, Mail, Facebook, Instagram, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Gallery", href: "#gallery" },
  { label: "3D Simulator", href: "#simulator" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-white">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@wraphaus.co.ke" className="underline">info@wraphaus.co.ke</a>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <a href="tel:+2547123456789">+2547123456789</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="facebook" className="opacity-90 hover:opacity-100"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="instagram" className="opacity-90 hover:opacity-100"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-border/10 backdrop-blur-md">
        <div className="container mx-auto px-4 relative flex items-center h-16 lg:h-20">
          <a href="#home" className="flex items-center shrink-0">
            <img src={logo} alt="Its Wrap Haus" className="h-12 lg:h-14 w-auto object-contain" />
          </a>

          {/* Centered nav links for desktop */}
          <div className="absolute inset-x-0 hidden lg:flex justify-center pointer-events-none">
            <div className="flex items-center gap-8 pointer-events-auto">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="ml-auto hidden lg:flex items-center gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold uppercase tracking-wider">
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Book Now
              </a>
            </Button>
            <a href="#" className="text-foreground"><ShoppingBag className="w-5 h-5" /></a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground ml-auto"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-border/10 py-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold uppercase tracking-wider"
            >
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Book Now
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
