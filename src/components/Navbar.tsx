import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "3D Simulator", href: "/#simulator" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.split("#")[0]);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (location.pathname === path || (path === "/" && location.pathname === "/")) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center shrink-0 overflow-visible">
          <img
            src={logo}
            alt="Its Wrap Haus"
            className="h-16 lg:h-20 w-28 lg:w-36 object-contain -ml-3"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                isActive(link.href)
                  ? "text-primary"
                  : scrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white hover:text-primary drop-shadow-md"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold uppercase tracking-wider"
          >
            <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
              <Phone className="w-4 h-4 mr-2" />
              Book Now
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-white drop-shadow-md"}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border/10 py-4 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`block py-3 text-sm font-medium transition-colors uppercase tracking-wider ${
                isActive(link.href) ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
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
