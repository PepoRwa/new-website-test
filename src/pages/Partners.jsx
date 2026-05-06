import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

const TIERS = ['prime', 'official', 'affiliate', 'honor'];
const TIER_LABELS = {
  prime: 'partners_prime_ops',
  official: 'partners_official_links',
  affiliate: 'partners_affiliates',
  honor: 'partners_wall_honor',
};
const TIER_COLORS = {
  prime: 'var(--gold)',
  official: 'var(--neon)',
  affiliate: 'var(--lavender)',
  honor: 'var(--ether)',
};

export default function Partners() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    supabase
      .from('partners')
      .select('id,name,logo_url,tier,url,promo_code,promo_desc')
      .order('tier')
      .then(({ data, error: err }) => {
        setLoading(false);
        if (err) { setError(true); return; }
        setPartners(data || []);
      });
  }, []);

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const byTier = (tier) => partners.filter((p) => p.tier === tier);

  return (
    <div style={{ padding: '60px 8vw 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="section-tag mb-3">{t('partners_header_tag')}</div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1 }}>
          {t('partners_header_network')}
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(240,242,245,0.55)', marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
          {t('partners_header_desc')}
        </p>
      </div>

      {loading && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.2em' }}>
          {t('partners_loading')}
        </div>
      )}

      {error && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--neon)' }}>{t('partners_error_system')}</div>
      )}

      {!loading && !error && (
        <>
          {TIERS.map((tier) => {
            const list = byTier(tier);
            if (list.length === 0) return null;
            const color = TIER_COLORS[tier];
            return (
              <div key={tier} style={{ marginBottom: 48 }}>
                <div className="font-mono" style={{ fontSize: 10, color, letterSpacing: '0.3em', marginBottom: 20 }}>
                  {t(TIER_LABELS[tier])}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                  {list.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        background: 'linear-gradient(135deg, rgba(26,28,46,0.9), rgba(13,14,21,0.95))',
                        border: `1px solid ${color}25`,
                        padding: '1.5rem',
                        position: 'relative',
                        transition: 'all 0.35s',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = `${color}70`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = `${color}25`; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />

                      {p.logo_url ? (
                        <img src={p.logo_url} alt={p.name} style={{ height: 40, objectFit: 'contain', marginBottom: 12 }} />
                      ) : (
                        <div className="font-rajdhani" style={{ fontSize: 24, fontWeight: 700, color, marginBottom: 12 }}>{p.name}</div>
                      )}

                      <div className="font-mono" style={{ fontSize: 10, color: '#fff', marginBottom: 6 }}>{p.name}</div>

                      {p.url && (
                        <a href={p.url} target="_blank" rel="noopener noreferrer"
                          className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.4)', textDecoration: 'none', display: 'block', marginBottom: 10 }}>
                          {p.url.replace(/https?:\/\//, '')}
                        </a>
                      )}

                      {p.promo_code && (
                        <div
                          onClick={() => copyCode(p.promo_code, p.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8, marginTop: 8,
                            padding: '8px 12px', background: `${color}10`,
                            border: `1px dashed ${color}50`, cursor: 'pointer',
                            transition: '0.3s',
                          }}
                        >
                          <span className="font-mono" style={{ fontSize: 9, color, letterSpacing: '0.15em' }}>
                            {t('partners_code')} {p.promo_code}
                          </span>
                          <span className="font-mono" style={{ fontSize: 8, color: copied === p.id ? 'var(--gold)' : 'rgba(240,242,245,0.3)', marginLeft: 'auto' }}>
                            {copied === p.id ? '✓ COPIÉ' : t('partners_click_copy')}
                          </span>
                        </div>
                      )}

                      {p.promo_desc && (
                        <p style={{ fontSize: 11, color: 'rgba(240,242,245,0.5)', marginTop: 8, lineHeight: 1.5 }}>{p.promo_desc}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {partners.length === 0 && (
            <div className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.3)', marginBottom: 48 }}>
              {t('partners_no_alliance')}
            </div>
          )}
        </>
      )}

      {/* CTA */}
      <div style={{ borderTop: '1px solid rgba(233,196,106,0.2)', paddingTop: 40, marginTop: 20 }}>
        <div className="font-rajdhani" style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          {t('partners_join_title')}
        </div>
        <Link to="/contact" className="btn-neon" style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: '#000' }}>
          {t('partners_join_btn')}
        </Link>
      </div>

      <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.2)', letterSpacing: '0.25em', marginTop: 48, textAlign: 'center' }}>
        {t('partners_footer')}
      </div>
    </div>
  );
}
