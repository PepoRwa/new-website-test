import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 8vw', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG number */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(150px, 35vw, 400px)',
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 900,
        color: 'rgba(214,47,127,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>
        404
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="font-mono" style={{ fontSize: 10, color: 'var(--neon)', letterSpacing: '0.5em', marginBottom: 20 }}>
          {t('not_found_tag')}
        </div>

        <h1
          className="font-rajdhani glitch"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1 }}
        >
          {t('not_found_title')}
        </h1>

        <p className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.5)', marginBottom: 8, letterSpacing: '0.15em' }}>
          {t('not_found_sub')}
        </p>
        <p className="font-mono" style={{ fontSize: 10, color: 'rgba(240,242,245,0.25)', marginBottom: 40, letterSpacing: '0.1em' }}>
          {t('not_found_code')}
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-neon" style={{ fontSize: 11 }}>{t('not_found_home')}</Link>
          <Link to="/roster" className="btn-ghost" style={{ fontSize: 11 }}>{t('not_found_roster')}</Link>
        </div>
      </div>
    </div>
  );
}
