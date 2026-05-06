import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BootScreen({ onComplete }) {
  const { t } = useLanguage();
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  const bootLines = [
    t('boot_line1'),
    t('boot_line2'),
    t('boot_line3'),
    t('boot_line4'),
    t('boot_line5'),
    t('boot_line6'),
    t('boot_line7'),
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'var(--abyss)', zIndex: 10000,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
        padding: '10vw',
        transition: done ? 'opacity 0.6s ease' : 'none',
        opacity: done ? 0 : 1,
      }}
    >
      <div className="font-mono-share text-xs mb-6" style={{ color: 'var(--magenta)', letterSpacing: '0.2em' }}>
        GOWRAX_OS // BOOT_SEQUENCE
      </div>
      {lines.map((line, idx) => (
        <div key={idx} className="font-mono-share text-sm mb-1" style={{ color: '#aaa' }}>
          <span style={{ color: 'var(--magenta)' }}>{'>'}</span> {line}
        </div>
      ))}
      {lines.length === bootLines.length && (
        <span className="blink font-mono-share text-sm mt-2" style={{ color: 'var(--magenta)' }}>█</span>
      )}
    </div>
  );
}
