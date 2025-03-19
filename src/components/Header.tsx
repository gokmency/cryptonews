
import { Link, useLocation } from "react-router-dom";
import { Bookmark, LayoutDashboard, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-10",
        isScrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-primary rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h1 className="text-xl font-medium tracking-tight hidden md:block">{t("app.name")}</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full transition-all",
              isActive("/") ? "bg-secondary text-foreground" : "hover:bg-background/80"
            )}
            asChild
          >
            <Link to="/" className="flex items-center space-x-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>{t("nav.dashboard")}</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full transition-all",
              isActive("/bookmarks") ? "bg-secondary text-foreground" : "hover:bg-background/80"
            )}
            asChild
          >
            <Link to="/bookmarks" className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4" />
              <span>{t("nav.bookmarks")}</span>
            </Link>
          </Button>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full h-8"
            onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
          >
            <span className="font-medium">{language === 'en' ? 'TR' : 'EN'}</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-50 md:hidden transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in">
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full transition-all w-48",
                isActive("/") ? "bg-secondary text-foreground" : "hover:bg-background/80"
              )}
              asChild
              onClick={toggleMenu}
            >
              <Link to="/" className="flex items-center justify-center space-x-2">
                <LayoutDashboard className="h-5 w-5" />
                <span className="text-lg">{t("nav.dashboard")}</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full transition-all w-48",
                isActive("/bookmarks") ? "bg-secondary text-foreground" : "hover:bg-background/80"
              )}
              asChild
              onClick={toggleMenu}
            >
              <Link to="/bookmarks" className="flex items-center justify-center space-x-2">
                <Bookmark className="h-5 w-5" />
                <span className="text-lg">{t("nav.bookmarks")}</span>
              </Link>
            </Button>
            
            {/* Language Toggle Mobile */}
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-48"
              onClick={() => {
                setLanguage(language === 'en' ? 'tr' : 'en');
                toggleMenu();
              }}
            >
              <span className="font-medium">{language === 'en' ? 'Türkçe' : 'English'}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
