'use client';

import { useEffect } from 'react';

const ClientSharesLayout = ({ children }: React.PropsWithChildren) => {
  const setVhVariable = () => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVhVariable();
      window.addEventListener('resize', setVhVariable);
    }

    return () => {
      window.removeEventListener('resize', setVhVariable);
    };
  }, []);

  return (
    <main
      className="flex w-full flex-col items-center justify-center overflow-hidden bg-[#f7f7f9] mx-auto max-[375px]:max-h-[812px]:pt-20"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 15px)',
      }}
    >
      <section className="flex max-w-[500px] flex-col gap-[95px]">{children}</section>
    </main>
  );
};

export default ClientSharesLayout;
