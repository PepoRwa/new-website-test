import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE_CONFIG } from '../config/data';

const phases = [
  { key: 'about_phase1', descKey: 'about_phase1_desc', status: 'ACTIVE', color: 'var(--neon)' },
  { key: 'about_phase2', descKey: 'about_phase2_desc', status: 'IN_PROGRESS', color: 'var(--lavender)' },
  { key: 'about_phase3', descKey: 'about_phase3_desc', status: 'LOCKED', color: 'var(--gold)' },
];

const founders = [
  {
    nameKey: 'about_founder1_name',
    roleKey: 'about_founder1_role',
    descKey: 'about_founder1_desc',
    quote: '"Ensemble, il y aura toujours une place pour briller."',
    accent: 'var(--neon)',
    id: 1,
  },
  {
    nameKey: 'about_founder2_name',
    roleKey: 'about_founder2_role',
    descKey: 'about_founder2_desc',
    quote: '"C\'est pas parce qu\'on est p\'tit qu\'on doit se laisser faire"',
    accent: 'var(--lavender)',
    id: 2,
  },
  {
    nameKey: 'about_founder3_name',
    roleKey: 'about_founder3_role',
    descKey: 'about_founder3_desc',
    quote: '[CLASSIFIÉ]',
    accent: 'var(--gold)',
    id: 3,
  },
];

const stats = [
  { value: '3', labelKey: 'about_stat_founders' },
  { value: '∞', labelKey: 'about_stat_ambition' },
  { value: '2+', labelKey: 'about_stat_units' },
  { value: '2026', labelKey: 'about_stat_days' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div style={{ color: 'var(--starlight)' }}>
      {/* ── Header ── */}
      <section
        style={{
          padding: '100px 8vw 60px',
          position: 'relative',
          borderBottom: '1px solid rgba(177,133,219,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%',
            background: 'linear-gradient(90deg, transparent, rgba(111,45,189,0.05))',
            pointerEvents: 'none',
          }}
        />
        <div className="section-tag mb-3">{t('about_tag')}</div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
          {t('about_title1')}
          <br />
          <span style={{ color: 'var(--lavender)' }}>{t('about_title2')}</span>
        </h1>
        <p className="font-mono" style={{ fontSize: 12, color: 'var(--neon)', marginTop: '1rem', letterSpacing: '0.2em' }}>
          {t('about_origin_date')}
        </p>
      </section>

      {/* ── Origin story ── */}
      <section style={{ padding: '80px 8vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(240,242,245,0.75)', maxWidth: 520 }}>
            {t('about_origin_text')}
          </p>
        </div>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(26,28,46,0.9), rgba(13,14,21,0.95))',
            border: '1px solid rgba(177,133,219,0.2)',
            padding: '2rem',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: -1, left: 24, right: 24, height: 2, background: 'linear-gradient(90deg, var(--neon), var(--lavender), transparent)' }} />
          <div className="font-mono" style={{ fontSize: 9, color: 'var(--lavender)', letterSpacing: '0.3em', marginBottom: '1rem' }}>
            // ARCHIVE_COMM :: DECRYPTED
          </div>
          <blockquote className="font-poppins" style={{ fontSize: 14, lineHeight: 1.8, fontStyle: 'italic', color: 'rgba(240,242,245,0.8)', borderLeft: '2px solid var(--neon)', paddingLeft: '1rem' }}>
            {t('about_quote')}
          </blockquote>
          <div className="font-mono" style={{ fontSize: 10, color: 'var(--neon)', marginTop: '1rem' }}>
            {t('about_quote_author')}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: 'rgba(26,28,46,0.4)', borderTop: '1px solid rgba(177,133,219,0.1)', borderBottom: '1px solid rgba(177,133,219,0.1)', padding: '2rem 8vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, textAlign: 'center' }}>
          {stats.map(({ value, labelKey }) => (
            <div key={labelKey}>
              <div className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--neon)' }}>{value}</div>
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(240,242,245,0.5)', marginTop: 4 }}>{t(labelKey)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Triumvirate ── */}
      <section style={{ padding: '80px 8vw' }}>
        <div className="section-tag mb-6">{t('about_triumvirate')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {founders.map((f) => (
            <div
              key={f.id}
              className="player-card"
              style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: f.accent }} />
              <div className="font-mono" style={{ fontSize: 9, color: f.accent, letterSpacing: '0.3em', marginBottom: 8 }}>
                {t('about_founders_label')} // #{f.id.toString().padStart(2, '0')}
              </div>
              <div className="font-rajdhani" style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                {t(f.nameKey)}
              </div>
              <div className="font-mono" style={{ fontSize: 10, color: f.accent, letterSpacing: '0.15em', marginBottom: 12, opacity: 0.8 }}>
                {t(f.roleKey)}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(240,242,245,0.65)', marginBottom: 16 }}>
                {t(f.descKey)}
              </p>
              <div style={{ fontSize: 12, fontStyle: 'italic', color: f.accent, opacity: 0.7 }}>
                {f.quote}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Roadmap / Horizon ── */}
      <section style={{ padding: '60px 8vw 80px', background: 'rgba(13,14,21,0.6)', borderTop: '1px solid rgba(177,133,219,0.08)' }}>
        <div className="section-tag mb-2">{t('about_horizon')}</div>
        <h2 className="font-rajdhani" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#fff', marginBottom: '2.5rem' }}>
          {t('about_roadmap_title')}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
          {phases.map(({ key, descKey, status, color }) => (
            <div key={key} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 2, minHeight: 60, background: `linear-gradient(180deg, ${color}, transparent)`, flexShrink: 0, marginTop: 4 }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <div className="font-rajdhani" style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{t(key)}</div>
                  <span className="font-mono" style={{ fontSize: 9, padding: '2px 8px', border: `1px solid ${color}`, color, letterSpacing: '0.2em' }}>
                    {status}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(240,242,245,0.6)', lineHeight: 1.6 }}>{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Terminal ── */}
      <section style={{ padding: '60px 8vw 80px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href={SITE_CONFIG.discord} target="_blank" rel="noopener noreferrer" className="btn-neon">
            {t('about_cta_discord')}
          </a>
          <Link to="/roster" className="btn-ghost">{t('about_cta_rosters')}</Link>
          <Link to="/partners" className="btn-ghost" style={{ color: 'var(--gold)', borderColor: 'rgba(233,196,106,0.4)' }}>
            {t('about_cta_network')}
          </Link>
        </div>
      </section>
    </div>
  );
}
