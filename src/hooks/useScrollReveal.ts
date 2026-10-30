import { useEffect } from 'react';

/**
 * Active la révélation progressive et feutrée (.kr-reveal -> .is-visible)
 * des sections et cartes au fil du défilement, dans le respect de prefers-reduced-motion.
 * Inclut un MutationObserver pour détecter instantanément tout élément .kr-reveal monté dynamiquement.
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll<HTMLElement>('.kr-reveal').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('js-reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -24px 0px',
      }
    );

    const registerElements = (root: ParentNode = document) => {
      const elements = Array.from(root.querySelectorAll<HTMLElement>('.kr-reveal:not(.is-visible)'));
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    };

    registerElements(document);

    const mutationObserver = new MutationObserver(() => {
      registerElements(document);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
