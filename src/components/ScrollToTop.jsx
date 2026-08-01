import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "instant" makes sure it jumps to the top immediately without a sliding animation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null; // This component doesn't show anything on the screen
}