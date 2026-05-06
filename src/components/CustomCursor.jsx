import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: '2px solid var(--magenta)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        transition: 'left 0.05s ease, top 0.05s ease',
        boxShadow: '0 0 8px var(--magenta)',
      }}
      className="hidden lg:block"
    />
  );
}
