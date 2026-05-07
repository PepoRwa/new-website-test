import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function News() {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    supabase
      .from('posts')
      .select('id,slug,title,title_en,title_ko,created_at,category,excerpt,excerpt_en,excerpt_ko')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        setLoading(false);
        if (err) { setError(true); return; }
        setPosts(data || []);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter((p) => {
      const title = lang === 'en' ? (p.title_en || p.title) : lang === 'ko' ? (p.title_ko || p.title) : p.title;
      return title.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q);
    });
  }, [search, posts, lang]);

  const getTitle = (p) => {
    if (lang === 'en') return p.title_en || p.title;
    if (lang === 'ko') return p.title_ko || p.title;
    return p.title;
  };

  const getExcerpt = (p) => {
    if (lang === 'en') return p.excerpt_en || p.excerpt || '';
    if (lang === 'ko') return p.excerpt_ko || p.excerpt || '';
    return p.excerpt || '';
  };

  return (
    <div style={{ padding: '60px 8vw 80px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="section-tag mb-3">{t('news_db_access')}</div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1 }}>
          {t('news_header_title1')}
          <span style={{ color: 'var(--lavender)' }}>{t('news_header_title2')}</span>
        </h1>
        <div style={{ marginTop: 20 }}>
          <input
            className="grx-input"
            style={{ maxWidth: 400 }}
            placeholder={t('news_search_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--lavender)', letterSpacing: '0.2em' }}>
          {t('news_init_satellite')}
        </div>
      )}
      {error && (
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--neon)' }}>{t('news_err_satellite')}</div>
      )}
      {!loading && !error && filtered.length === 0 && (
        <div className="font-mono" style={{ fontSize: 12, color: 'rgba(240,242,245,0.4)' }}>{t('news_no_results')}</div>
      )}
      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.map((post, idx) => (
            <Link
              key={post.id || post.slug}
              to={`/news/${post.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="news-card fade-in"
                style={{ padding: '20px 24px', animationDelay: `${idx * 0.07}s` }}
              >
                <div className="font-mono" style={{ fontSize: 9, color: 'var(--lavender)', letterSpacing: '0.25em', marginBottom: 8 }}>
                  {t('news_ref')}{post.id?.toString().padStart(4, '0') || '0000'} //
                  {new Date(post.created_at).toLocaleDateString()} //
                  {(post.category || 'GRX').toUpperCase()}
                </div>
                <div className="font-rajdhani" style={{ fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>
                  {escapeHTML(getTitle(post))}
                </div>
                {getExcerpt(post) && (
                  <p style={{ fontSize: 13, color: 'rgba(240,242,245,0.5)', lineHeight: 1.6, marginBottom: 10 }}>
                    {escapeHTML(getExcerpt(post))}
                  </p>
                )}
                <span className="font-mono" style={{ fontSize: 10, color: 'var(--neon)', letterSpacing: '0.15em' }}>
                  {t('news_open_file')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
