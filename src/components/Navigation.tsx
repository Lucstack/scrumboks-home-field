import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Teams", href: "/#teams" },
    { name: "Contact", href: "/#contact" },
    { name: "Club van 50", href: "/club-van-50" },
    { name: "Sponsoren", href: "/sponsoren" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      
      // Check if we're on the homepage
      if (location.pathname === "/") {
        // On homepage: smooth scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // On other pages: navigate to homepage with hash
        window.location.href = `/#${sectionId}`;
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav
        className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-rugby"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Dropdown */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl border border-white/20 shadow-rugby overflow-hidden">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.href.startsWith("/#") ? (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="w-full px-4 py-3 text-left font-medium text-primary-navy hover:bg-accent/10 transition-colors"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 font-medium text-primary-navy hover:bg-accent/10 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-heritage/95 backdrop-blur-md">
            <div className="flex justify-end p-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center h-full space-y-8 -mt-20">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith("/#") ? (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-2xl font-heading font-bold text-white hover:text-accent transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-heading font-bold text-white hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
