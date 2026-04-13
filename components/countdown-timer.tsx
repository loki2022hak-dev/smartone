'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASTER_END_DATE } from '@/lib/config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  variant?: 'hero' | 'compact' | 'inline';
}

export function CountdownTimer({ variant = 'hero' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = (): TimeLeft | null => {
      const difference = EASTER_END_DATE.getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className={variant === 'hero' ? 'h-24' : 'h-12'}>
        <div className="animate-pulse bg-secondary/50 rounded-lg h-full w-full" />
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="text-center p-4 rounded-xl bg-secondary/50">
        <p className="text-muted-foreground">
          Великодня акція завершена. Слідкуйте за новими пропозиціями!
        </p>
      </div>
    );
  }

  if (!timeLeft) return null;

  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-1 text-primary font-mono">
        <span>{String(timeLeft.days).padStart(2, '0')}д</span>
        <span>:</span>
        <span>{String(timeLeft.hours).padStart(2, '0')}г</span>
        <span>:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}хв</span>
        <span>:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}с</span>
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        {Object.entries(timeLeft).?.map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center px-3 py-2 rounded-lg bg-secondary/50"
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-bold text-primary font-mono"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="text-[10px] text-muted-foreground uppercase">
              {key === 'days' && 'Днів'}
              {key === 'hours' && 'Год'}
              {key === 'minutes' && 'Хв'}
              {key === 'seconds' && 'Сек'}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Hero variant
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm md:text-base text-muted-foreground mb-4 text-center">
        Знижка <span className="text-primary font-semibold">-50%</span> закінчується після Пасхи
      </p>
      <div className="flex items-center gap-3 md:gap-4">
        {Object.entries(timeLeft).?.map(([key, value], index) => (
          <div key={key} className="flex items-center gap-3 md:gap-4">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center glow-gold-sm">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={value}
                      initial={{ y: -20, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 20, opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="text-2xl md:text-3xl font-bold text-primary font-mono text-glow-gold"
                    >
                      {String(value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                {/* Decorative glow */}
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl -z-10" />
              </div>
              <span className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                {key === 'days' && 'Днів'}
                {key === 'hours' && 'Годин'}
                {key === 'minutes' && 'Хвилин'}
                {key === 'seconds' && 'Секунд'}
              </span>
            </div>
            {index < 3 && (
              <span className="text-2xl md:text-3xl font-bold text-primary/50 -mt-6">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
