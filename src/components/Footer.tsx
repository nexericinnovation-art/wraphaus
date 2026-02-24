const Footer = () => {
  return (
    <footer className="bg-dark-surface border-t border-border/10 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-xl font-bold text-secondary-foreground tracking-tight">
          ITS WRAP <span className="text-primary">HAUS</span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Its Wrap Haus. All rights reserved. Ruiru Bypass — Trunked Coffee.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
