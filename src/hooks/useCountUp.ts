'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  autoStart?: boolean;
}

interface UseCountUpReturn {
  count: string;
  start: () => void;
  reset: () => void;
  isAnimating: boolean;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNumber(
  value: number,
  decimals: number,
  separator: string
): string {
  const parts = Math.abs(value).toFixed(decimals).split('.');
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return decimals > 0 ? `${intPart}.${parts[1]}` : intPart;
}

export function useCountUp(options: UseCountUpOptions): UseCountUpReturn {
  const {
    end,
    start: startVal = 0,
    duration = 2,
    decimals = 0,
    suffix = '',
    prefix = '',
    separator = ',',
    autoStart = true,
  } = options;

  const [count, setCount] = useState(() => {
    const formatted = formatNumber(startVal, decimals, separator);
    return `${prefix}${formatted}${suffix}`;
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const startValueRef = useRef<number>(startVal);

  const animate = useCallback(() => {
    setIsAnimating(true);
    startTimeRef.current = performance.now();
    startValueRef.current = startVal;

    const step = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = startVal + (end - startVal) * easedProgress;

      const formatted = formatNumber(currentValue, decimals, separator);
      const displayValue = end < 0
        ? `-${prefix}${formatted}${suffix}`
        : `${prefix}${formatted}${suffix}`;

      setCount(displayValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        const finalFormatted = formatNumber(end, decimals, separator);
        const finalDisplay = end < 0
          ? `-${prefix}${finalFormatted}${suffix}`
          : `${prefix}${finalFormatted}${suffix}`;
        setCount(finalDisplay);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  }, [end, startVal, duration, decimals, prefix, suffix, separator]);

  const start = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate();
  }, [animate]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    const formatted = formatNumber(startVal, decimals, separator);
    setCount(end < 0 ? `-${prefix}${formatted}${suffix}` : `${prefix}${formatted}${suffix}`);
    setIsAnimating(false);
  }, [startVal, decimals, prefix, suffix, separator, end]);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        animate();
      }, 300);
      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [animate, autoStart]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { count, start, reset, isAnimating };
}
