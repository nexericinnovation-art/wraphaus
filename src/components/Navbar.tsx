import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none shadow-none">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
        <a href="#home" className="flex items-center shrink-0 overflow-visible">
          <img
            src={logo}
            alt="Its Wrap Haus"
            className="h-16 lg:h-20 w-28 lg:w-36 object-contain -ml-3"
          />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white hover:text-primary transition-colors uppercase tracking-wider drop-shadow-md"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="bg-primary text-white hover:bg-primary/90 font-display font-semibold uppercase tracking-wider drop-shadow-md"
          >
            <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
              <Phone className="w-4 h-4 mr-2 text-white" />
              Book Now
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white drop-shadow-md"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border/10 py-4 px-4">
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
            className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold uppercase tracking-wider"
          >
            <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
              <Phone className="w-4 h-4 mr-2" />
              Book Now
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
