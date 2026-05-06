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
  '/ceo': 'COMMAND',
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
    { to: '/', label: t('nav_home'), end: true },
    { to: '/news', label: t('nav_news') },
    { to: '/roster', label: t('nav_units') },
    { to: '/roster/calendar', label: t('nav_calendar') },
    { to: '/about', label: t('nav_about') },
    { to: '/staff', label: t('nav_staff') },
    { to: '/ceo', label: t('nav_command') },
    { to: '/profiles', label: t('nav_database') },
    { to: '/partners', label: t('nav_partners') },
    { to: '/contact', label: t('nav_signal') },
  ];

  const linkStyle = { textDecoration: 'none' };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(13,14,21,0.92)',
      borderBottom: '1px solid rgba(177,133,219,0.15)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', height: 58 }}>
        {/* Brand */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 28, height: 28, border: '1px solid var(--neon)', transform: 'rotate(45deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <div style={{ width: 12, height: 12, background: 'var(--neon)', transform: 'rotate(-45deg)' }} />
          </div>
          <span className="font-rajdhani" style={{ fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: '0.05em' }}>
            GOWRAX
          </span>
          <span className="font-mono" style={{ fontSize: 10, color: 'var(--lavender)', opacity: 0.7 }}>
            //{suffix}
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginLeft: 'auto', flexWrap: 'nowrap' }}
          className="hidden lg:flex">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link font-mono text-white ${isActive ? 'nav-link-active' : ''}`
              }
              style={linkStyle}
            >
              {label}
            </NavLink>
          ))}

          {/* Lang switcher */}
          <div style={{ display: 'flex', gap: 4, borderLeft: '1px solid rgba(177,133,219,0.2)', paddingLeft: 14 }}>
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l.toLowerCase())}
                className="font-mono"
                style={{
                  background: 'none', border: 'none', padding: '2px 4px',
                  fontSize: 10, letterSpacing: '0.1em',
                  color: lang === l.toLowerCase() ? 'var(--neon)' : 'rgba(240,242,245,0.35)',
                  fontWeight: lang === l.toLowerCase() ? 700 : 400,
                  transition: '0.25s',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen((p) => !p)}
          style={{
            marginLeft: 'auto', background: 'none', border: '1px solid rgba(214,47,127,0.4)',
            color: 'var(--neon)', fontSize: 18, padding: '4px 10px',
            lineHeight: 1.4,
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          background: 'rgba(13,14,21,0.98)',
          borderTop: '1px solid rgba(177,133,219,0.15)',
          padding: '1.5rem 2rem 2rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 nav-link font-mono text-white ${isActive ? 'nav-link-active' : ''}`
                }
                style={{ ...linkStyle, fontSize: 13 }}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, borderTop: '1px solid rgba(177,133,219,0.1)', paddingTop: 16 }}>
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l.toLowerCase()); setMenuOpen(false); }}
                className="font-mono"
                style={{
                  background: 'none', border: 'none', fontSize: 12, letterSpacing: '0.1em',
                  color: lang === l.toLowerCase() ? 'var(--neon)' : 'rgba(240,242,245,0.4)',
                  fontWeight: lang === l.toLowerCase() ? 700 : 400,
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
