import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

const GAME_COLORS = {
  valorant: 'var(--neon)',
  cs2: 'var(--ether)',
  default: 'var(--lavender)',
};

function gameColor(game = '') {
  return GAME_COLORS[game.toLowerCase()] || GAME_COLORS.default;
}

export default function Calendar() {
  const { t } = useLanguage();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('matches')
      .select('id,date,opponent,opponent_logo,game,format,result,score,tournament,stream_url')
      .order('date', { ascending: true })
      .then(({ data }) => {
        setLoading(false);
        setMatches(data || []);
      });
  }, []);

  const past = matches.filter((m) => new Date(m.date) < new Date());
  const upcoming = matches.filter((m) => new Date(m.date) >= new Date());

  const resultLabel = (r) => {
    if (!r) return null;
    if (r === 'win') return { label: t('calendar_result_win'), color: 'var(--gold)' };
    if (r === 'loss') return { label: t('calendar_result_loss'), color: 'var(--neon)' };
    return { label: t('calendar_result_draw'), color: 'var(--lavender)' };
  };

  const MatchCard = ({ match, isPast }) => {
    const res = resultLabel(match.result);
    const gc = gameColor(match.game);
    return (
      <div
        style={{
          background: `linear-gradient(135deg, rgba(26,28,46,${isPast ? 0.5 : 0.9}), rgba(13,14,21,${isPast ? 0.6 : 0.95}))`,
          border: `1px solid ${isPast ? 'rgba(177,133,219,0.08)' : `${gc}30`}`,
          padding: '1.5rem',
          position: 'relative',
          opacity: isPast ? 0.65 : 1,
          transition: 'all 0.3s',
        }}
        onMouseOver={(e) => !isPast && (e.currentTarget.style.borderColor = gc)}
        onMouseOut={(e) => !isPast && (e.currentTarget.style.borderColor = `${gc}30`)}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: isPast ? 'transparent' : `linear-gradient(90deg, ${gc}, transparent)` }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div className="font-mono" style={{ fontSize: 9, color: gc, letterSpacing: '0.2em' }}>
            {match.game?.toUpperCase()} // {match.tournament || 'MATCH'}
          </div>
          {!isPast && (
            <span className="font-mono" style={{ fontSize: 8, padding: '2px 8px', border: `1px solid ${gc}`, color: gc, letterSpacing: '0.2em' }}>
              {t('calendar_upcoming')}
            </span>
          )}
          {res && (
            <span className="font-mono" style={{ fontSize: 9, color: res.color, fontWeight: 700, letterSpacing: '0.1em' }}>
              {res.label}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
          <div>
            <div className="font-rajdhani" style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>GOWRAX</div>
            <div className="font-mono" style={{ fontSize: 8, color: 'rgba(240,242,245,0.4)' }}>HOME</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div className="font-mono" style={{ fontSize: 11, color: gc, letterSpacing: '0.3em', marginBottom: 4 }}>
              {t('calendar_vs')}
            </div>
            {match.score && (
              <div className="font-rajdhani" style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{match.score}</div>
            )}
            {match.format && (
              <div className="font-mono" style={{ fontSize: 8, color: 'rgba(240,242,245,0.3)', letterSpacing: '0.1em' }}>{match.format}</div>
            )}
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="font-rajdhani" style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>
              {match.opponent || '???'}
            </div>
            <div className="font-mono" style={{ fontSize: 8, color: 'rgba(240,242,245,0.4)' }}>OPPONENT</div>
          </div>
        </div>

        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.4)' }}>
            {new Date(match.date).toLocaleString()}
          </div>
          {match.stream_url && !isPast && (
            <a href={match.stream_url} target="_blank" rel="noopener noreferrer"
              className="font-mono" style={{ fontSize: 9, color: 'var(--neon)', textDecoration: 'none', letterSpacing: '0.15em' }}>
              ▶ LIVE →
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '60px 8vw 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <div className="section-tag mb-3">{t('calendar_tag')}</div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1 }}>
          {t('calendar_header1')}
          <span style={{ color: 'var(--lavender)' }}>{t('calendar_header2')}</span>
        </h1>
      </div>

      {loading && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--lavender)', letterSpacing: '0.2em' }}>
          {t('calendar_loading')}
        </div>
      )}

      {!loading && matches.length === 0 && (
        <div className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.3)' }}>{t('calendar_no_data')}</div>
      )}

      {!loading && upcoming.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <div className="section-tag mb-4">// UPCOMING_MATCHES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
            {upcoming.map((m) => <MatchCard key={m.id} match={m} isPast={false} />)}
          </div>
        </div>
      )}

      {!loading && past.length > 0 && (
        <div>
          <div className="section-tag mb-4">// MATCH_HISTORY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
            {past.reverse().map((m) => <MatchCard key={m.id} match={m} isPast />)}
          </div>
        </div>
      )}
    </div>
  );
}
