import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll naar top bij route changes, behalve voor sectie navigatie binnen homepage
    if (location.pathname !== '/' || !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
};
