import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const SUFFIXES = {
  '/': 'HQ',
  '/news': 'ARCHIVES',
  '/staff': 'PERSONNEL',
  '/profiles': 'DATABASE',
  '/roster': 'UNITS',
  '/roster/valorant': 'VALORANT',
  '/roster/cs2': 'TACTICAL',
  '/roster/calendar': 'SCHEDULE',
  '/contact': 'SIGNAL',
  '/contact/join': 'RECRUIT',
  '/partners': 'NETWORK',
  '/about': 'INFO',
};

function getSuffix(pathname) {
  if (pathname.startsWith('/news/')) return 'REPORT';
  if (pathname.startsWith('/profiles/')) return 'FILE';
  return SUFFIXES[pathname] || 'HQ';
}

const LANGS = ['FR', 'EN', 'KO'];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const suffix = getSuffix(location.pathname);

  const navItems = [
    { to: '/', label: t('nav_home') },
    { to: '/news', label: t('nav_news') },
    { to: '/roster', label: t('nav_units') },
    { to: '/contact', label: t('nav_signal') },
    { to: '/partners', label: t('nav_partners') },
    { to: '/about', label: t('nav_about') },
  ];

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(2,2,5,0.92)', borderBottom: '1px solid rgba(214,47,127,0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', height: 60 }}>
        {/* Logo / Brand */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="font-rajdhani font-bold text-xl text-white tracking-widest">
            GOWRAX
          </span>
          <span className="font-mono-share text-xs" style={{ color: 'var(--magenta)', opacity: 0.8 }}>
            //{suffix}
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link font-mono-share text-xs text-white tracking-widest ${isActive ? 'nav-link-active' : ''}`
              }
              style={{ textDecoration: 'none' }}
            >
              {label}
            </NavLink>
          ))}
          {/* Language switcher */}
          <div style={{ display: 'flex', gap: 6, borderLeft: '1px solid rgba(214,47,127,0.2)', paddingLeft: 12 }}>
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l.toLowerCase())}
                className="font-mono-share text-xs"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: lang === l.toLowerCase() ? 'var(--magenta)' : 'rgba(255,255,255,0.4)',
                  transition: '0.3s',
                  fontWeight: lang === l.toLowerCase() ? 'bold' : 'normal',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setMenuOpen((p) => !p)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--magenta)', fontSize: 22 }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(2,2,5,0.97)', borderTop: '1px solid rgba(214,47,127,0.2)',
            padding: '1.5rem',
          }}
        >
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-3 nav-link font-mono-share text-sm text-white tracking-widest ${isActive ? 'nav-link-active' : ''}`
              }
              style={{ textDecoration: 'none' }}
            >
              {label}
            </NavLink>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l.toLowerCase()); setMenuOpen(false); }}
                className="font-mono-share text-sm"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: lang === l.toLowerCase() ? 'var(--magenta)' : 'rgba(255,255,255,0.4)',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
