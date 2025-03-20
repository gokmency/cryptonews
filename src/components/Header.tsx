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
  const { language, setLanguage } = useLanguage();

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
        "sticky top-0 left-0 right-0 z-40 transition-all duration-300 px-6 py-3 glass-cream",
        isScrolled && "shadow-soft"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-primary to-primary/70 rounded-full p-2.5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 border border-primary/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary-foreground animate-gentle-swing"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 flex items-center">
              Kripto Haberleri
              <span className="ml-2 bg-gradient-to-r from-primary/80 to-primary text-white text-xs px-2 py-0.5 rounded-md font-medium shadow-sm transform -rotate-2">
                Beta
              </span>
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-xl btn-soft",
              isActive("/") 
                ? "bg-secondary text-foreground shadow-soft" 
                : "hover:bg-secondary/50"
            )}
            asChild
          >
            <Link to="/" className="flex items-center space-x-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>{language === 'tr' ? 'Ana Sayfa' : 'Dashboard'}</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-xl btn-soft",
              isActive("/bookmarks") 
                ? "bg-secondary text-foreground shadow-soft" 
                : "hover:bg-secondary/50"
            )}
            asChild
          >
            <Link to="/bookmarks" className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4" />
              <span>{language === 'tr' ? 'Yer İmleri' : 'Bookmarks'}</span>
            </Link>
          </Button>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl h-9 w-9 text-foreground/80 hover:text-foreground btn-soft"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl btn-soft border border-border/50 hover:border-accent/50 hover:bg-accent/20"
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
            className="rounded-xl h-9 w-9 text-foreground/80 hover:text-foreground btn-soft"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-xl btn-soft" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "fixed inset-0 glass-cream z-50 md:hidden transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in">
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-xl btn-soft w-48",
                isActive("/") 
                  ? "bg-secondary text-foreground shadow-soft" 
                  : "hover:bg-secondary/50"
              )}
              asChild
              onClick={toggleMenu}
            >
              <Link to="/" className="flex items-center justify-center space-x-2">
                <LayoutDashboard className="h-5 w-5" />
                <span className="text-lg">{language === 'tr' ? 'Ana Sayfa' : 'Dashboard'}</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-xl btn-soft w-48",
                isActive("/bookmarks") 
                  ? "bg-secondary text-foreground shadow-soft" 
                  : "hover:bg-secondary/50"
              )}
              asChild
              onClick={toggleMenu}
            >
              <Link to="/bookmarks" className="flex items-center justify-center space-x-2">
                <Bookmark className="h-5 w-5" />
                <span className="text-lg">{language === 'tr' ? 'Yer İmleri' : 'Bookmarks'}</span>
              </Link>
            </Button>
            
            {/* Language Toggle Mobile */}
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl w-48 btn-soft border border-border/50 hover:border-accent/50 hover:bg-accent/20"
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
