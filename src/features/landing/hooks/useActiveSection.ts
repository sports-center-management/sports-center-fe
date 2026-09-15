import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = sectionIds.map((id) => document.querySelector(id)).filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },

      { rootMargin: '-45% 0px -50% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
