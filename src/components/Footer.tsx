import React from "react";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const openTwitter = () => {
    window.open("https://x.com/gokmeneth", "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-4 border-t">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          GRAINZ GUILD 2025
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={openTwitter}
          className="rounded-full"
        >
          <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="sr-only">Twitter</span>
        </Button>
      </div>
    </footer>
  );
};

export default Footer; 