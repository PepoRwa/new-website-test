import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

export default function NewsPost() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) { setNotFound(true); return; }
        setPost(data);
      });
  }, [slug]);

  const getTitle = () => {
    if (!post) return '';
    if (lang === 'en') return post.title_en || post.title;
    if (lang === 'ko') return post.title_ko || post.title;
    return post.title;
  };

  const getContent = () => {
    if (!post) return '';
    if (lang === 'en') return post.content_en || post.content;
    if (lang === 'ko') return post.content_ko || post.content;
    return post.content;
  };

  if (loading) {
    return (
      <div style={{ padding: '100px 8vw' }}>
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--lavender)', letterSpacing: '0.2em' }}>
          {t('news_init_satellite')}
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ padding: '100px 8vw' }}>
        <div className="section-tag mb-4">{t('news_err_satellite')}</div>
        <Link to="/news" className="btn-ghost" style={{ display: 'inline-block' }}>{t('news_back')}</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 8vw 80px', maxWidth: 860, margin: '0 auto' }}>
      {/* Back */}
      <Link
        to="/news"
        className="font-mono"
        style={{ fontSize: 10, color: 'var(--lavender)', textDecoration: 'none', letterSpacing: '0.2em', display: 'inline-block', marginBottom: 32 }}
      >
        ← {t('news_back')}
      </Link>

      {/* Meta */}
      <div className="font-mono" style={{ fontSize: 9, color: 'var(--neon)', letterSpacing: '0.3em', marginBottom: 12 }}>
        {new Date(post.created_at).toLocaleDateString()} // {(post.category || 'GRX').toUpperCase()}
      </div>

      {/* Title */}
      <h1 className="font-rajdhani" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, color: '#fff', marginBottom: '2rem' }}>
        {getTitle()}
      </h1>

      <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, var(--neon), var(--lavender))', marginBottom: '2.5rem' }} />

      {/* Content */}
      <div
        style={{
          fontSize: 15, lineHeight: 1.9, color: 'rgba(240,242,245,0.78)',
          whiteSpace: 'pre-wrap', fontFamily: 'Poppins, sans-serif',
        }}
        dangerouslySetInnerHTML={{ __html: getContent() }}
      />

      {/* Footer */}
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(177,133,219,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/news" className="btn-ghost" style={{ fontSize: 11 }}>{t('news_back')}</Link>
        <span className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.3)', letterSpacing: '0.2em' }}>
          GOWRAX_INTELLIGENCE_FEED // 2026
        </span>
      </div>
    </div>
  );
}
