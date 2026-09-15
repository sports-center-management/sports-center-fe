import { useEffect, useRef } from 'react';

export function usePinToBottom() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const pin = hero?.parentElement;
    if (!hero || !pin) return;

    const fit = () => {
      pin.style.top = `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`;
    };
    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(hero);
    window.addEventListener('resize', fit);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  return heroRef;
}
