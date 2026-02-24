import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-dark-surface border-t border-border/10 py-10">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
        <a href="#home" className="inline-flex items-center">
          <img src={logo} alt="Its Wrap Haus" className="h-10 lg:h-12 w-auto object-contain" />
        </a>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Its Wrap Haus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
