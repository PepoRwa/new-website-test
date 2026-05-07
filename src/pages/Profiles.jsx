import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

export default function Profiles() {
  const { t } = useLanguage();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id,name,ign,role,avatar_url,game,is_command,bio')
      .order('is_command', { ascending: false })
      .then(({ data }) => {
        setLoading(false);
        setMembers(data || []);
      });
  }, []);

  const commanders = members.filter((m) => m.is_command);
  const agents = members.filter((m) => !m.is_command);

  return (
    <div style={{ padding: '60px 8vw 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="section-tag mb-3">{t('profiles_header_sub')}</div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1 }}>
          {t('profiles_header_title')}
          <span style={{ color: 'var(--lavender)' }}>{t('profiles_header_highlight')}</span>
        </h1>
      </div>

      {loading && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--lavender)', letterSpacing: '0.2em' }}>
          {t('profiles_loading')}
        </div>
      )}

      {!loading && (
        <>
          {/* Command Unit */}
          {commanders.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <div className="section-tag mb-4">{t('profiles_cmd_unit')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
                {commanders.map((m, idx) => (
                  <ProfileCard key={m.id} member={m} idx={idx} t={t} accent="var(--neon)" />
                ))}
              </div>
            </div>
          )}

          {/* Field Agents */}
          {agents.length > 0 && (
            <div>
              <div className="section-tag mb-4">{t('profiles_field_agents')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
                {agents.map((m, idx) => (
                  <ProfileCard key={m.id} member={m} idx={idx} t={t} accent="var(--lavender)" />
                ))}
              </div>
            </div>
          )}

          {members.length === 0 && (
            <div className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.4)' }}>
              {t('profiles_no_data')}
            </div>
          )}
        </>
      )}

      <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.2)', letterSpacing: '0.25em', marginTop: 48, textAlign: 'center' }}>
        {t('profiles_footer')}
      </div>
    </div>
  );
}

function ProfileCard({ member: m, idx, t, accent }) {
  return (
    <Link to={`/profiles/${m.id}`} style={{ textDecoration: 'none' }}>
      <div
        className="player-card fade-in"
        style={{ padding: '1.5rem', animationDelay: `${idx * 0.06}s`, position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          {m.avatar_url ? (
            <img
              src={m.avatar_url}
              alt={m.ign || m.name}
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}40` }}
            />
          ) : (
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: `linear-gradient(135deg, ${accent}, var(--purple))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#fff',
            }}>
              {(m.ign || m.name)?.[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <div className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>
              {m.ign || m.name}
            </div>
            {m.name && m.ign && (
              <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.4)' }}>{m.name}</div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="font-mono" style={{ fontSize: 9, color: accent, letterSpacing: '0.15em' }}>
            {m.role || 'AGENT'}
          </div>
          {m.game && (
            <span className="font-mono" style={{
              fontSize: 8, padding: '2px 7px',
              border: '1px solid rgba(177,133,219,0.2)', color: 'rgba(240,242,245,0.5)',
              letterSpacing: '0.1em',
            }}>
              {m.game.toUpperCase()}
            </span>
          )}
        </div>

        <div className="font-mono" style={{ fontSize: 9, color: accent, marginTop: 12, opacity: 0.5, letterSpacing: '0.15em' }}>
          {t('profiles_btn_dossier')}
        </div>
      </div>
    </Link>
  );
}
