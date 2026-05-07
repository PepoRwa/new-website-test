import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Roster() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 8vw' }}>
      {/* BG text */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(60px, 18vw, 240px)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 900,
        color: 'rgba(177,133,219,0.03)', letterSpacing: '-0.04em', pointerEvents: 'none', userSelect: 'none',
      }}>
        UNITS
      </div>

      <div className="section-tag mb-4" style={{ letterSpacing: '0.4em' }}>{t('roster_sel_decrypted')}</div>

      <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
        GOWRAX <span style={{ color: 'var(--lavender)' }}>UNITS</span>
      </h1>

      <p className="font-mono" style={{ fontSize: 10, color: 'rgba(240,242,245,0.4)', letterSpacing: '0.3em', marginBottom: 56, textAlign: 'center' }}>
        {t('roster_deployed')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, width: '100%', maxWidth: 760 }}>
        {/* Valorant */}
        <Link to="/roster/valorant" style={{ textDecoration: 'none' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(214,47,127,0.1), rgba(13,14,21,0.95))',
              border: '1px solid rgba(214,47,127,0.2)',
              padding: '3rem 2.5rem',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.4s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--neon)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(214,47,127,0.15)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(214,47,127,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--neon), transparent)' }} />
            <div style={{
              position: 'absolute', bottom: -20, right: -20, fontSize: 100,
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 900,
              color: 'rgba(214,47,127,0.06)', lineHeight: 1,
            }}>VL</div>
            <div className="font-mono" style={{ fontSize: 9, color: 'var(--neon)', letterSpacing: '0.4em', marginBottom: 16 }}>UNIT_01 // ACTIVE</div>
            <div className="font-rajdhani" style={{ fontSize: 42, fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 8 }}>VALORANT</div>
            <div className="font-mono" style={{ fontSize: 11, color: 'rgba(240,242,245,0.5)', marginBottom: 20, letterSpacing: '0.1em' }}>
              {t('roster_sel_valorant')}
            </div>
            <div className="font-mono" style={{ fontSize: 10, color: 'var(--neon)', letterSpacing: '0.2em' }}>
              ACCÉDER À L'UNITÉ →
            </div>
          </div>
        </Link>

        {/* CS2 */}
        <Link to="/roster/cs2" style={{ textDecoration: 'none' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(162,210,255,0.08), rgba(13,14,21,0.95))',
              border: '1px solid rgba(162,210,255,0.15)',
              padding: '3rem 2.5rem',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.4s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--ether)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(162,210,255,0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(162,210,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--ether), transparent)' }} />
            <div style={{
              position: 'absolute', bottom: -20, right: -20, fontSize: 100,
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 900,
              color: 'rgba(162,210,255,0.05)', lineHeight: 1,
            }}>CS</div>
            <div className="font-mono" style={{ fontSize: 9, color: 'var(--ether)', letterSpacing: '0.4em', marginBottom: 16 }}>UNIT_02 // ACTIVE</div>
            <div className="font-rajdhani" style={{ fontSize: 42, fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 8 }}>CS2</div>
            <div className="font-mono" style={{ fontSize: 11, color: 'rgba(240,242,245,0.5)', marginBottom: 20, letterSpacing: '0.1em' }}>
              {t('roster_sel_cs2')}
            </div>
            <div className="font-mono" style={{ fontSize: 10, color: 'var(--ether)', letterSpacing: '0.2em' }}>
              ACCÉDER À L'UNITÉ →
            </div>
          </div>
        </Link>
      </div>

      <Link to="/roster/calendar" style={{ textDecoration: 'none', marginTop: 32 }}>
        <div className="font-mono" style={{ fontSize: 10, color: 'rgba(240,242,245,0.4)', letterSpacing: '0.3em', textAlign: 'center' }}>
          {t('nav_calendar')} →
        </div>
      </Link>
    </div>
  );
}
