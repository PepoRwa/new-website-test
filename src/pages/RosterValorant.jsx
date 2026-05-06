import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

const ROLE_COLORS = {
  duelist: 'var(--neon)',
  controller: 'var(--lavender)',
  initiator: 'var(--ether)',
  sentinel: 'var(--gold)',
  igl: 'var(--neon)',
  coach: 'rgba(240,242,245,0.6)',
};

function roleColor(role = '') {
  return ROLE_COLORS[role.toLowerCase()] || 'var(--lavender)';
}

export default function RosterValorant() {
  const { t } = useLanguage();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('roster_valorant')
      .select('id,ign,name,role,rank,agents,avatar_url,is_igl,country')
      .order('is_igl', { ascending: false })
      .then(({ data }) => {
        setLoading(false);
        setPlayers(data || []);
      });
  }, []);

  return (
    <div style={{ padding: '60px 8vw 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48, borderBottom: '1px solid rgba(214,47,127,0.15)', paddingBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Link to="/roster" className="font-mono" style={{ fontSize: 10, color: 'rgba(240,242,245,0.4)', textDecoration: 'none', letterSpacing: '0.15em' }}>
            ← UNITS
          </Link>
          <span className="font-mono" style={{ color: 'rgba(240,242,245,0.2)', fontSize: 10 }}>/</span>
          <span className="font-mono" style={{ fontSize: 10, color: 'var(--neon)', letterSpacing: '0.15em' }}>VALORANT</span>
        </div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1 }}>
          GRX <span style={{ color: 'var(--neon)' }}>VALORANT</span>
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(240,242,245,0.55)', marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
          {t('roster_valo_desc')}
        </p>
      </div>

      {loading && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--neon)', letterSpacing: '0.2em' }}>
          {t('roster_loading')}
        </div>
      )}

      {!loading && players.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.3)', marginBottom: 24 }}>
            {t('roster_no_data')}
          </div>
          <a href="#" className="btn-neon" style={{ fontSize: 11 }}>{t('roster_valo_btn_recruit')}</a>
        </div>
      )}

      {!loading && players.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {players.map((p, idx) => (
            <div
              key={p.id}
              className="player-card fade-in"
              style={{ padding: '2rem', animationDelay: `${idx * 0.08}s`, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${roleColor(p.role)}, transparent)` }} />

              {p.is_igl && (
                <div className="font-mono" style={{
                  position: 'absolute', top: 16, right: 16, fontSize: 8,
                  padding: '2px 8px', background: 'rgba(214,47,127,0.15)',
                  border: '1px solid var(--neon)', color: 'var(--neon)', letterSpacing: '0.2em',
                }}>
                  IGL
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                {p.avatar_url ? (
                  <img src={p.avatar_url} alt={p.ign}
                    style={{ width: 56, height: 56, objectFit: 'cover', border: '2px solid rgba(214,47,127,0.3)' }} />
                ) : (
                  <div style={{
                    width: 56, height: 56,
                    background: 'linear-gradient(135deg, var(--purple), var(--neon))',
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
                  <div className="font-mono" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em' }}>
                    {p.rank}
                  </div>
                )}
              </div>

              {p.agents && Array.isArray(p.agents) && p.agents.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.agents.slice(0, 3).map((agent) => (
                    <span key={agent} className="font-mono" style={{
                      fontSize: 8, padding: '2px 7px',
                      border: '1px solid rgba(177,133,219,0.2)',
                      color: 'rgba(240,242,245,0.5)', letterSpacing: '0.1em',
                    }}>
                      {agent}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <Link to="/contact/join" className="btn-neon" style={{ fontSize: 11 }}>{t('roster_valo_btn_recruit')}</Link>
      </div>
    </div>
  );
}
