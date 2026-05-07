import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

const ROLE_COLORS = {
  rifler: 'var(--ether)',
  awper: 'var(--neon)',
  igl: 'var(--gold)',
  support: 'var(--lavender)',
  lurker: 'rgba(177,133,219,0.8)',
  coach: 'rgba(240,242,245,0.5)',
};

function roleColor(role = '') {
  return ROLE_COLORS[role.toLowerCase()] || 'var(--ether)';
}

export default function RosterCS2() {
  const { t } = useLanguage();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('roster_cs2')
      .select('id,ign,name,role,rank,avatar_url,is_igl,country,stats_url')
      .order('is_igl', { ascending: false })
      .then(({ data }) => {
        setLoading(false);
        setPlayers(data || []);
      });
  }, []);

  return (
    <div style={{ padding: '60px 8vw 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48, borderBottom: '1px solid rgba(162,210,255,0.15)', paddingBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Link to="/roster" className="font-mono" style={{ fontSize: 10, color: 'rgba(240,242,245,0.4)', textDecoration: 'none', letterSpacing: '0.15em' }}>
            ← UNITS
          </Link>
          <span className="font-mono" style={{ color: 'rgba(240,242,245,0.2)', fontSize: 10 }}>/</span>
          <span className="font-mono" style={{ fontSize: 10, color: 'var(--ether)', letterSpacing: '0.15em' }}>CS2</span>
        </div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1 }}>
          GRX <span style={{ color: 'var(--ether)' }}>CS2</span>
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(240,242,245,0.55)', marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
          {t('roster_cs2_title')}
        </p>
      </div>

      {loading && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--ether)', letterSpacing: '0.2em' }}>
          {t('roster_loading')}
        </div>
      )}

      {!loading && players.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.3)', marginBottom: 24 }}>
            {t('roster_no_data')}
          </div>
          <Link to="/contact/join" className="btn-ghost" style={{ fontSize: 11, color: 'var(--ether)', borderColor: 'rgba(162,210,255,0.3)' }}>
            REJOINDRE L'UNITÉ →
          </Link>
        </div>
      )}

      {!loading && players.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {players.map((p, idx) => (
            <div
              key={p.id}
              className="fade-in"
              style={{
                background: 'linear-gradient(135deg, rgba(26,28,46,0.9), rgba(13,14,21,0.95))',
                border: '1px solid rgba(162,210,255,0.12)',
                padding: '2rem', position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s',
                animationDelay: `${idx * 0.08}s`,
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--ether)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(162,210,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${roleColor(p.role)}, transparent)` }} />

              {p.is_igl && (
                <div className="font-mono" style={{
                  position: 'absolute', top: 14, right: 14, fontSize: 8,
                  padding: '2px 8px', background: 'rgba(162,210,255,0.1)',
                  border: '1px solid var(--ether)', color: 'var(--ether)', letterSpacing: '0.2em',
                }}>
                  IGL
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                {p.avatar_url ? (
                  <img src={p.avatar_url} alt={p.ign}
                    style={{ width: 56, height: 56, objectFit: 'cover', border: '2px solid rgba(162,210,255,0.25)' }} />
                ) : (
                  <div style={{
                    width: 56, height: 56,
                    background: 'linear-gradient(135deg, #1A2A40, var(--purple))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#fff',
                  }}>
                    {(p.ign || p.name)?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-rajdhani" style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{p.ign}</div>
                  {p.name && <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.35)' }}>{p.name}</div>}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div className="font-mono" style={{ fontSize: 9, color: roleColor(p.role), letterSpacing: '0.15em' }}>
                  {p.role?.toUpperCase() || 'PLAYER'}
                </div>
                {p.rank && (
                  <div className="font-mono" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em' }}>{p.rank}</div>
                )}
              </div>

              {p.stats_url && (
                <a href={p.stats_url} target="_blank" rel="noopener noreferrer"
                  className="font-mono" style={{ fontSize: 9, color: 'var(--ether)', textDecoration: 'none', letterSpacing: '0.15em' }}>
                  ◈ STATS →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <Link to="/contact/join" className="btn-ghost" style={{ color: 'var(--ether)', borderColor: 'rgba(162,210,255,0.3)', fontSize: 11 }}>
          REJOINDRE L'UNITÉ →
        </Link>
      </div>
    </div>
  );
}
