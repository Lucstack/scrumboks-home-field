import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useHashScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the # symbol
      
      // Wait for components to render, then scroll
      const scrollToSection = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToSection()) {
        // If not found, try with delays
        const timeouts = [100, 300, 500, 1000];
        
        timeouts.forEach((delay, index) => {
          setTimeout(() => {
            if (!scrollToSection() && index === timeouts.length - 1) {
              console.warn(`Could not find element with ID: ${sectionId}`);
            }
          }, delay);
        });
      }
    }
  }, [location.hash, location.pathname]);
};
