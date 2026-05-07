import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

function StatBar({ label, value, color = 'var(--neon)' }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 300); return () => clearTimeout(t); }, [value]);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', letterSpacing: '0.15em' }}>{label}</span>
        <span className="font-mono" style={{ fontSize: 9, color }}>{value}%</span>
      </div>
      <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${w}%`,
          background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.4))`,
          transition: 'width 1s ease-out',
          boxShadow: `0 0 8px ${color}`,
        }} />
      </div>
    </div>
  );
}

export default function MemberProfile() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) { setNotFound(true); return; }
        setMember(data);
      });
  }, [id]);

  if (loading) return (
    <div style={{ padding: '100px 8vw' }}>
      <div className="font-mono" style={{ fontSize: 12, color: 'var(--lavender)', letterSpacing: '0.2em' }}>
        {t('member_sync')}
      </div>
    </div>
  );

  if (notFound) return (
    <div style={{ padding: '100px 8vw' }}>
      <div className="font-mono" style={{ fontSize: 16, color: 'var(--neon)', marginBottom: 24 }}>{t('member_not_found')}</div>
      <Link to="/profiles" className="btn-ghost">{t('member_back')}</Link>
    </div>
  );

  const stats = member.stats || {};
  const socials = member.socials || {};

  return (
    <div style={{ padding: '60px 8vw 80px', maxWidth: 900, margin: '0 auto' }}>
      {/* Back */}
      <Link to="/profiles" className="font-mono" style={{ fontSize: 10, color: 'var(--lavender)', textDecoration: 'none', letterSpacing: '0.2em', display: 'inline-block', marginBottom: 32 }}>
        ← {t('member_back')}
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'start' }}>
        {/* Avatar column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {member.avatar_url ? (
            <img
              src={member.avatar_url}
              alt={member.ign || member.name}
              style={{
                width: 160, height: 160, objectFit: 'cover',
                border: '2px solid rgba(214,47,127,0.5)',
                boxShadow: '0 0 30px rgba(214,47,127,0.2)',
              }}
            />
          ) : (
            <div style={{
              width: 160, height: 160,
              background: 'linear-gradient(135deg, var(--purple), var(--neon))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 64, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#fff',
            }}>
              {(member.ign || member.name)?.[0]?.toUpperCase()}
            </div>
          )}

          {/* Status pill */}
          <div className="font-mono" style={{
            fontSize: 9, padding: '4px 12px',
            border: '1px solid var(--neon)', color: 'var(--neon)', letterSpacing: '0.2em',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{ width: 5, height: 5, background: 'var(--neon)', borderRadius: '50%', animation: 'blink 1s step-end infinite' }} />
            {t('member_status_op')}
          </div>

          {/* Socials */}
          {Object.keys(socials).length > 0 && (
            <div style={{ width: '100%' }}>
              <div className="font-mono" style={{ fontSize: 9, color: 'var(--lavender)', letterSpacing: '0.2em', marginBottom: 8 }}>
                {t('member_network_tag')}
              </div>
              {socials.twitch && (
                <a href={socials.twitch} target="_blank" rel="noopener noreferrer"
                  className="font-mono"
                  style={{ display: 'block', fontSize: 10, color: '#9146FF', textDecoration: 'none', marginBottom: 6 }}>
                  ▶ TWITCH
                </a>
              )}
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
                  className="font-mono"
                  style={{ display: 'block', fontSize: 10, color: 'var(--ether)', textDecoration: 'none', marginBottom: 6 }}>
                  ◆ TWITTER
                </a>
              )}
              {socials.tracker && (
                <a href={socials.tracker} target="_blank" rel="noopener noreferrer"
                  className="font-mono"
                  style={{ display: 'block', fontSize: 10, color: 'var(--gold)', textDecoration: 'none', marginBottom: 6 }}>
                  ◈ TRACKER
                </a>
              )}
            </div>
          )}
        </div>

        {/* Info column */}
        <div>
          <div className="font-mono" style={{ fontSize: 9, color: 'var(--neon)', letterSpacing: '0.3em', marginBottom: 8 }}>
            // AGENT_FILE_{member.id?.toString().padStart(4, '0')}
          </div>
          <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 4 }}>
            {member.ign || member.name}
          </h1>
          {member.name && member.ign && (
            <div className="font-mono" style={{ fontSize: 11, color: 'rgba(240,242,245,0.4)', marginBottom: 6 }}>{member.name}</div>
          )}
          <div className="font-mono" style={{ fontSize: 10, color: 'var(--lavender)', letterSpacing: '0.15em', marginBottom: 20 }}>
            {member.role || 'AGENT'}{member.game ? ` // ${member.game.toUpperCase()}` : ''}
          </div>

          {member.unit && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.4)', letterSpacing: '0.15em' }}>{t('member_unit')}:</span>
              <span className="font-mono" style={{ fontSize: 10, color: 'var(--neon)' }}>{member.unit}</span>
            </div>
          )}

          {/* Stats */}
          {(stats.aim || stats.tactic) && (
            <div style={{ marginBottom: 24 }}>
              {stats.aim && <StatBar label={t('member_stat_aim')} value={stats.aim} color="var(--neon)" />}
              {stats.tactic && <StatBar label={t('member_stat_tactic')} value={stats.tactic} color="var(--lavender)" />}
            </div>
          )}

          {/* Bio */}
          {member.bio && (
            <div>
              <div className="font-mono" style={{ fontSize: 9, color: 'var(--lavender)', letterSpacing: '0.2em', marginBottom: 8 }}>
                {t('member_bio_tag')}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(240,242,245,0.7)' }}>
                {showMore ? member.bio : member.bio.slice(0, 200) + (member.bio.length > 200 ? '...' : '')}
              </p>
              {member.bio.length > 200 && (
                <button
                  onClick={() => setShowMore((p) => !p)}
                  className="font-mono"
                  style={{ background: 'none', border: 'none', color: 'var(--lavender)', fontSize: 10, marginTop: 8, letterSpacing: '0.15em', cursor: 'pointer' }}
                >
                  {showMore ? t('member_bio_less') : t('member_bio_more')}
                </button>
              )}
            </div>
          )}
          {!member.bio && (
            <p className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.3)' }}>{t('member_no_bio')}</p>
          )}
        </div>
      </div>

      <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.2)', letterSpacing: '0.25em', marginTop: 48, textAlign: 'center' }}>
        {t('member_footer')}
      </div>
    </div>
  );
}
