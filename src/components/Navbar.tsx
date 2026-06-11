import { Link, useLocation } from "react-router-dom";
import { MapPin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/map", label: "Peta" },
  { to: "/#about", label: "Tentang" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") {
        return;
      }
      
      const aboutElement = document.getElementById("about");
      if (aboutElement) {
        const rect = aboutElement.getBoundingClientRect();
        // If the Tentang section's top is scrolled past 40% of viewport height
        if (rect.top <= window.innerHeight * 0.4) {
          setActiveSection("about");
          return;
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger immediately on mount or location change
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (location.pathname === "/") {
      if (to === "/#about") return activeSection === "about";
      if (to === "/") return activeSection === "home";
      return false;
    }
    return location.pathname === to;
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
          <img src="/logo.png" alt="DraCopy Logo" className="w-9 h-9 object-cover rounded-full" />
          <span>DraCopy</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-ink-splash px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.to)
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-secondary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-card px-4 py-3 space-y-1 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.to)
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-secondary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
