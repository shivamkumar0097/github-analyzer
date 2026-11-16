import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (!Number.isFinite(target) || reduced) return;

    let frame;
    let start = null;

    const tick = (now) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    const fallback = setTimeout(() => setValue(target), duration + 150);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
    };
  }, [target, duration, reduced]);

  return reduced ? target : value;
}
