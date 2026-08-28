'use client';

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      if (window.location.hash) {
        setTimeout(() => {
          lenis.scrollTo(window.location.hash, { immediate: true });
        }, 100);
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    } else {
      if (window.location.hash) {
        const id = window.location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.04, 
      smoothWheel: true, 
      syncTouch: true, 
      touchMultiplier: 2, 
      wheelMultiplier: 1.0 
    }}>
      <ScrollReset />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {children as any}
    </ReactLenis>
  );
}
