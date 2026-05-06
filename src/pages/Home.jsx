import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { SITE_CONFIG } from '../config/data';
import HudCorners from '../components/HudCorners';

export default function Home() {
  const { t } = useLanguage();
  const [news, setNews] = useState([]);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    supabase
      .from('posts')
      .select('slug,title,title_en,title_ko,created_at,category')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setNews(data || []));
  }, []);

  const handleMusic = () => {
    if (!musicPlaying) {
      window.open(`https://www.youtube.com/watch?v=${SITE_CONFIG.backgroundMusic}`, '_blank', 'noopener,noreferrer');
    }
    setMusicPlaying((p) => !p);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Hero */}
      <section
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          padding: '0 10vw', position: 'relative',
        }}
      >
        <div className="scanline" />
        {/* BG text */}
        <div
          style={{
            position: 'absolute', right: '-5vw', top: '50%', transform: 'translateY(-50%)',
            fontSize: 'clamp(80px, 20vw, 300px)', fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 900, color: 'rgba(214,47,127,0.04)', userSelect: 'none',
            letterSpacing: '-0.02em', lineHeight: 1, pointerEvents: 'none',
          }}
        >
          GRX-04
        </div>

        <HudCorners />

        <div className="font-mono-share text-xs mb-4" style={{ color: 'var(--magenta)', letterSpacing: '0.3em' }}>
          {t('home_hero_badge')}
        </div>
        <h1
          className="glitch font-rajdhani font-bold"
          style={{
            fontSize: 'clamp(3rem, 12vw, 9rem)', lineHeight: 0.9,
            color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem',
          }}
        >
          GOW<span style={{ color: 'var(--magenta)' }}>RAX</span>
        </h1>
        <div
          className="font-rajdhani font-semibold tracking-widest"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem', letterSpacing: '0.4em' }}
        >
          {t('home_hero_subtitle')}
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link
            to="/roster"
            style={{
              padding: '12px 32px', background: 'var(--magenta)', color: '#fff',
              fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: '0.2em',
              textDecoration: 'none', border: '2px solid var(--magenta)', transition: '0.3s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--magenta)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'var(--magenta)'; e.currentTarget.style.color = '#fff'; }}
          >
            {t('home_enter')}
          </Link>
          <button
            onClick={handleMusic}
            style={{
              padding: '12px 24px', background: 'transparent', color: musicPlaying ? 'var(--cyan)' : 'rgba(255,255,255,0.4)',
              fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: '0.2em',
              border: `2px solid ${musicPlaying ? 'var(--cyan)' : 'rgba(255,255,255,0.2)'}`,
              cursor: 'pointer', transition: '0.3s',
            }}
          >
            {musicPlaying ? '♪ ON' : '♪ MUSIC'}
          </button>
        </div>
      </section>

      {/* Latest News */}
      <section style={{ padding: '80px 10vw' }}>
        <div className="font-mono-share text-xs mb-8" style={{ color: 'var(--magenta)', letterSpacing: '0.3em' }}>
          {t('home_broadcast')}
        </div>
        {news.length === 0 ? (
          <p className="font-mono-share text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {t('home_no_news')}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720 }}>
            {news.map((post) => (
              <div key={post.slug} className="news-card" style={{ padding: '16px 20px' }}>
                <div className="font-mono-share text-xs mb-1" style={{ color: 'var(--magenta)', opacity: 0.6 }}>
                  {new Date(post.created_at).toLocaleDateString()} // {post.category || 'GRX'}
                </div>
                <div className="font-rajdhani font-semibold text-lg text-white">{post.title}</div>
                <Link
                  to={`/news/${post.slug}`}
                  className="font-mono-share text-xs"
                  style={{ color: 'var(--magenta)', textDecoration: 'none', display: 'inline-block', marginTop: 8 }}
                >
                  {t('home_news_open')}
                </Link>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 32 }}>
          <Link
            to="/news"
            className="font-mono-share text-xs"
            style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.2em' }}
          >
            {t('news_archives_tag')} →
          </Link>
        </div>
      </section>
    </div>
  );
}
