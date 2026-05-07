import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

export default function Staff() {
  const { t } = useLanguage();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('staff')
      .select('id,name,role,avatar_url,bio,department')
      .order('name')
      .then(({ data }) => {
        setLoading(false);
        setMembers(data || []);
      });
  }, []);

  return (
    <div style={{ padding: '60px 8vw 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="section-tag mb-3">{t('staff_tag')}</div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1 }}>
          {t('staff_header1')}
          <span style={{ color: 'var(--lavender)' }}>{t('staff_header2')}</span>
        </h1>
      </div>

      {loading && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--lavender)', letterSpacing: '0.2em' }}>
          {t('staff_loading')}
        </div>
      )}

      {!loading && members.length === 0 && (
        <div className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.4)' }}>
          {t('staff_no_data')}
        </div>
      )}

      {!loading && members.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {members.map((m, idx) => (
            <div
              key={m.id}
              className="player-card fade-in"
              style={{ padding: '1.5rem', animationDelay: `${idx * 0.07}s`, position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--neon), var(--lavender), transparent)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                {m.avatar_url ? (
                  <img
                    src={m.avatar_url}
                    alt={m.name}
                    style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(177,133,219,0.3)' }}
                  />
                ) : (
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--purple), var(--neon))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#fff',
                  }}>
                    {m.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-rajdhani" style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{m.name}</div>
                  <div className="font-mono" style={{ fontSize: 9, color: 'var(--lavender)', letterSpacing: '0.15em' }}>
                    {m.role || 'STAFF'}
                  </div>
                </div>
              </div>

              {m.department && (
                <div className="font-mono" style={{ fontSize: 9, color: 'var(--neon)', marginBottom: 8, letterSpacing: '0.2em', opacity: 0.7 }}>
                  // {m.department.toUpperCase()}
                </div>
              )}

              {m.bio && (
                <p style={{ fontSize: 12, color: 'rgba(240,242,245,0.55)', lineHeight: 1.6 }}>{m.bio}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
