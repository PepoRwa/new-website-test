import { createContext, useContext, useState, useCallback } from 'react';
import fr from '../locales/fr';
import en from '../locales/en';
import ko from '../locales/ko';

const locales = { fr, en, ko };

function detectLang() {
  const saved = localStorage.getItem('grx_lang');
  if (saved && locales[saved]) return saved;
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  if (browser === 'ko') return 'ko';
  if (browser === 'en') return 'en';
  return 'fr';
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = useCallback((l) => {
    if (locales[l]) {
      localStorage.setItem('grx_lang', l);
      setLangState(l);
    }
  }, []);

  const t = useCallback((key) => locales[lang]?.[key] ?? locales.fr[key] ?? key, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
