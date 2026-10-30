import { useEffect } from 'react';

/**
 * Active la révélation progressive et feutrée (.kr-reveal -> data-kr-visible="true")
 * des sections et cartes au fil du défilement, dans le respect de prefers-reduced-motion.
 * Utilise data-kr-visible="true" (en plus de .is-visible) afin que les re-rendus React
 * qui mettent à jour className n'écrasent jamais l'état visible d'un élément déjà révélé.
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const markVisible = (el: Element) => {
      if (el instanceof HTMLElement) {
        el.dataset.krVisible = 'true';
      }
      el.classList.add('is-visible');
    };

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll<HTMLElement>('.kr-reveal').forEach(markVisible);
      return;
    }

    document.documentElement.classList.add('js-reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            markVisible(entry.target);
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
      const elements = Array.from(
        root.querySelectorAll<HTMLElement>('.kr-reveal:not([data-kr-visible="true"])')
      );
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          markVisible(el);
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
