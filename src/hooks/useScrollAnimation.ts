'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  animate?: Record<string, unknown>;
  initial?: Record<string, unknown>;
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  controls: ReturnType<typeof useAnimation>;
  isInView: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}): UseScrollAnimationReturn {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          controls.start('visible');
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
          controls.start('hidden');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [controls, threshold, rootMargin, once]);

  return { ref, controls, isInView };
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
