import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(214,47,127,0.2)',
        background: 'rgba(2,2,5,0.95)',
        padding: '1rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div className="font-mono-share text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {t('footer_rights')}
        </div>
        <div className="font-mono-share text-xs" style={{ color: 'rgba(214,47,127,0.5)' }}>
          SYS_CLOCK: {time} // GRX-AUTH
        </div>
      </div>
    </footer>
  );
}
