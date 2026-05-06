import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import StarField from '../components/StarField';
import CustomCursor from '../components/CustomCursor';

/* ─── Animated stat bar ─── */
function StatBar({ label, value, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 400);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(240,242,245,0.6)' }}>{label}</span>
        <span className="font-mono" style={{ fontSize: 9, color }}>{value}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.3))`,
            transition: 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Glitch text with scan interval ─── */
function GlitchTitle({ text, style }) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let step = 0;
    let loopId;

    function runGlitch() {
      step = 0;
      loopId = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((c, idx) => (idx < step ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
            .join('')
        );
        step++;
        if (step > text.length) {
          clearInterval(loopId);
          setDisplay(text);
          loopId = setTimeout(runGlitch, 4000);
        }
      }, 50);
    }

    runGlitch();
    return () => { clearInterval(loopId); clearTimeout(loopId); };
  }, [text]);

  return <span style={style}>{display}</span>;
}

const ceoData = [
  {
    id: 'crazzynel',
    codename: 'CRAZZYNEL',
    title: 'Co-CEO // Architecte Système',
    quoteKey: 'ceo_crazzynel_quote',
    bioKey: 'ceo_crazzynel_bio',
    objKey: 'ceo_crazzynel_obj',
    stats: [
      { labelKey: 'ceo_stat_strategie', value: 95, color: 'var(--neon)' },
      { labelKey: 'ceo_stat_dev_systeme', value: 92, color: 'var(--ether)' },
      { labelKey: 'ceo_stat_ig_lead', value: 88, color: 'var(--lavender)' },
    ],
    accent: 'var(--neon)',
    gradient: 'linear-gradient(135deg, rgba(214,47,127,0.15), rgba(111,45,189,0.1))',
    number: '01',
  },
  {
    id: 'ptitegow',
    codename: 'PTITEGOW',
    title: 'Co-CEO // Vision & Stratégie',
    quoteKey: 'ceo_ptitegow_quote',
    bioKey: 'ceo_ptitegow_bio',
    objKey: 'ceo_ptitegow_obj',
    stats: [
      { labelKey: 'ceo_stat_leadership', value: 97, color: 'var(--lavender)' },
      { labelKey: 'ceo_stat_logistique', value: 89, color: 'var(--ether)' },
      { labelKey: 'ceo_stat_technique', value: 82, color: 'var(--gold)' },
    ],
    accent: 'var(--lavender)',
    gradient: 'linear-gradient(135deg, rgba(177,133,219,0.15), rgba(111,45,189,0.1))',
    number: '02',
  },
];

export default function CEO() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);
  const [scanLine, setScanLine] = useState(0);

  /* scanning line animation */
  useEffect(() => {
    const id = setInterval(() => setScanLine((p) => (p + 1) % 100), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--abyss)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CustomCursor />
      <StarField />

      {/* Radial gradient overlays */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '20%', left: '15%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214,47,127,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(111,45,189,0.1) 0%, transparent 70%)',
        }} />
      </div>

      {/* Scan line effect */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1, pointerEvents: 'none',
        height: 2, background: 'rgba(177,133,219,0.15)',
        transform: `translateY(${scanLine}vh)`,
        transition: 'transform 0.03s linear',
        boxShadow: '0 0 20px rgba(177,133,219,0.2)',
      }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Top bar */}
        <div style={{
          padding: '20px 5vw',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid rgba(177,133,219,0.1)',
          background: 'rgba(13,14,21,0.8)', backdropFilter: 'blur(10px)',
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, border: '1px solid var(--neon)', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 10, height: 10, background: 'var(--neon)', transform: 'rotate(-45deg)' }} />
            </div>
            <span className="font-rajdhani" style={{ fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '0.05em' }}>
              GOWRAX
            </span>
          </Link>
          <div className="font-mono" style={{ fontSize: 9, color: 'var(--lavender)', letterSpacing: '0.3em' }}>
            {t('ceo_header_tag')}
          </div>
          <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.3)', letterSpacing: '0.2em' }}>
            ACCESS: LEVEL_S // CLASSIFIED
          </div>
        </div>

        {/* Hero section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '60px 5vw' }}>

          {/* Giant BG title */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(120px, 22vw, 300px)',
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 900,
            color: 'rgba(177,133,219,0.03)',
            letterSpacing: '-0.04em', pointerEvents: 'none',
            userSelect: 'none', lineHeight: 1,
          }}>
            COMMAND
          </div>

          {/* Section intro */}
          <div style={{ textAlign: 'center', marginBottom: 64, position: 'relative' }}>
            <div className="font-mono" style={{ fontSize: 9, color: 'var(--neon)', letterSpacing: '0.5em', marginBottom: 16 }}>
              // HAUT_COMMANDEMENT_GOWRAX //
            </div>
            <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
              HIGH{' '}
              <span style={{
                background: 'linear-gradient(90deg, var(--neon), var(--lavender))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                COMMAND
              </span>
            </h1>
            <p className="font-mono" style={{ fontSize: 10, color: 'rgba(240,242,245,0.4)', letterSpacing: '0.3em', marginTop: 10 }}>
              {t('ceo_intro_text')}
            </p>
          </div>

          {/* CEO cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 32, width: '100%', maxWidth: 900,
          }}>
            {ceoData.map((ceo) => (
              <div
                key={ceo.id}
                className="bloom"
                onClick={() => setActive(active === ceo.id ? null : ceo.id)}
                style={{
                  background: ceo.gradient,
                  border: `1px solid ${active === ceo.id ? ceo.accent : 'rgba(177,133,219,0.15)'}`,
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  transform: active === ceo.id ? 'scale(1.02)' : 'scale(1)',
                  cursor: 'pointer',
                }}
              >
                {/* Accent top bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${ceo.accent}, transparent)`,
                }} />

                {/* File number */}
                <div style={{
                  position: 'absolute', top: 20, right: 24,
                  fontFamily: 'Rajdhani, sans-serif', fontSize: 80, fontWeight: 900,
                  color: 'rgba(255,255,255,0.03)', lineHeight: 1,
                }}>
                  {ceo.number}
                </div>

                {/* Header */}
                <div style={{ marginBottom: 20 }}>
                  <div className="font-mono" style={{ fontSize: 9, color: ceo.accent, letterSpacing: '0.3em', marginBottom: 8 }}>
                    DOSSIER_{ceo.number} // COMMANDEMENT_SUPÉRIEUR
                  </div>
                  <div className="font-rajdhani" style={{ fontSize: 38, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1 }}>
                    <GlitchTitle text={ceo.codename} style={{ color: '#fff' }} />
                  </div>
                  <div className="font-mono" style={{ fontSize: 10, color: ceo.accent, marginTop: 4, opacity: 0.8 }}>
                    {ceo.title}
                  </div>
                </div>

                {/* Quote */}
                <blockquote style={{
                  fontFamily: 'Poppins, sans-serif', fontStyle: 'italic', fontSize: 13,
                  color: 'rgba(240,242,245,0.65)',
                  borderLeft: `2px solid ${ceo.accent}`,
                  paddingLeft: 14, marginBottom: 20, lineHeight: 1.6,
                }}>
                  {t(ceo.quoteKey)}
                </blockquote>

                {/* Stats */}
                <div style={{ marginBottom: active === ceo.id ? 20 : 0 }}>
                  {ceo.stats.map(({ labelKey, value, color }) => (
                    <StatBar key={labelKey} label={t(labelKey)} value={value} color={color} />
                  ))}
                </div>

                {/* Expanded content */}
                {active === ceo.id && (
                  <div className="fade-in">
                    <div style={{ height: 1, background: `linear-gradient(90deg, ${ceo.accent}, transparent)`, margin: '16px 0' }} />
                    <div className="font-mono" style={{ fontSize: 9, color: ceo.accent, letterSpacing: '0.2em', marginBottom: 8 }}>
                      // DOSSIER_BIO
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(240,242,245,0.7)', lineHeight: 1.8, marginBottom: 16 }}>
                      {t(ceo.bioKey)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="font-mono" style={{ fontSize: 9, color: ceo.accent, opacity: 0.7 }}>{t('ceo_obj_label')}:</div>
                      <div className="font-mono" style={{ fontSize: 10, color: '#fff', letterSpacing: '0.1em' }}>{t(ceo.objKey)}</div>
                    </div>
                  </div>
                )}

                {/* Click hint */}
                {active !== ceo.id && (
                  <div className="font-mono" style={{ fontSize: 9, color: 'rgba(177,133,219,0.4)', marginTop: 16, letterSpacing: '0.2em' }}>
                    [ CLIQUER POUR DÉCHIFFRER ]
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div style={{ marginTop: 60, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/about" className="btn-ghost">← ABOUT GOWRAX</Link>
            <Link to="/roster" className="btn-neon">VOIR LES UNITÉS</Link>
          </div>

          {/* Footer tag */}
          <div className="font-mono" style={{ marginTop: 40, fontSize: 9, color: 'rgba(240,242,245,0.2)', letterSpacing: '0.3em', textAlign: 'center' }}>
            GOWRAX_CLASSIFIED_FILES // HAUT_COMMANDEMENT // 2026
          </div>
        </div>
      </div>
    </div>
  );
}
