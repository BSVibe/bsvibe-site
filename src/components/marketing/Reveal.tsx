'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-driven reveal: fades + rises its children once they enter the
 * viewport. Brand-register motion (impeccable): one well-rehearsed entrance,
 * confident ease-out, honored `prefers-reduced-motion` (the .reveal CSS shows
 * content immediately when reduced motion is requested).
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: 'div' | 'section';
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLElement>}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms', ...style }}
    >
      {children}
    </Tag>
  );
}
