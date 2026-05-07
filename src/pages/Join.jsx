import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { SITE_CONFIG } from '../config/data';

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function Join() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    discord: '', firstname: '', age: '', role: '', tracker: '', presentation: '', motivations: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const { error: err } = await supabase.from('applications').insert([{
      discord: escapeHTML(form.discord),
      firstname: escapeHTML(form.firstname),
      age: parseInt(form.age, 10),
      role: form.role,
      tracker: form.tracker,
      presentation: escapeHTML(form.presentation),
      motivations: escapeHTML(form.motivations),
    }]);
    setSending(false);
    if (err) { setError(t('join_err_transmit')); return; }
    setSuccess(true);
  };

  const reset = () => {
    setForm({ discord: '', firstname: '', age: '', role: '', tracker: '', presentation: '', motivations: '' });
    setSuccess(false);
    setError('');
  };

  return (
    <div style={{ padding: '60px 8vw 80px', maxWidth: 760, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div className="section-tag mb-3">{t('join_header_sub')}</div>
        <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1 }}>
          {t('join_header_title1')}
          <span style={{ color: 'var(--neon)' }}>{t('join_header_title2')}</span>
        </h1>
      </div>

      {/* Warning banner */}
      <div style={{
        padding: '1rem 1.5rem', border: '1px solid rgba(233,196,106,0.25)',
        background: 'rgba(233,196,106,0.04)', marginBottom: 32,
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        <div className="font-mono" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: 6 }}>
          {t('join_secondary_channel')} // {t('join_backup_protocol')}
        </div>
        <p style={{ fontSize: 12, color: 'rgba(240,242,245,0.6)', lineHeight: 1.6 }}>
          {t('join_warning_desc')}{' '}
          <a href={SITE_CONFIG.discord} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            Discord →
          </a>
        </p>
      </div>

      {success ? (
        <div className="fade-in" style={{ padding: '2rem', border: '1px solid rgba(177,133,219,0.3)', background: 'rgba(177,133,219,0.04)' }}>
          <div style={{ height: 2, background: 'linear-gradient(90deg, var(--lavender), transparent)', marginBottom: 20 }} />
          <div className="font-rajdhani" style={{ fontSize: 28, fontWeight: 700, color: 'var(--lavender)', marginBottom: 8 }}>
            {t('join_success_title')}
          </div>
          <p style={{ fontSize: 13, color: 'rgba(240,242,245,0.65)', lineHeight: 1.7, marginBottom: 20 }}>
            {t('join_success_desc')}
          </p>
          <button onClick={reset} className="btn-ghost" style={{ fontSize: 11 }}>{t('join_new_file')}</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>
                {t('join_label_discord')} *
              </label>
              <input className="grx-input" required value={form.discord} onChange={(e) => set('discord', e.target.value)}
                placeholder={t('join_ph_discord')} />
            </div>
            <div>
              <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>
                {t('join_label_firstname')} *
              </label>
              <input className="grx-input" required value={form.firstname} onChange={(e) => set('firstname', e.target.value)}
                placeholder={t('join_ph_firstname')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
            <div>
              <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>
                {t('join_label_age')} *
              </label>
              <input className="grx-input" type="number" min="12" max="99" required value={form.age}
                onChange={(e) => set('age', e.target.value)} placeholder="18" />
            </div>
            <div>
              <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>
                {t('join_label_role')} *
              </label>
              <select className="grx-select" required value={form.role} onChange={(e) => set('role', e.target.value)}>
                <option value="">{t('join_opt_default')}</option>
                <option value="Valorant">{t('join_opt_valo')}</option>
                <option value="Rocket League">{t('join_opt_rl')}</option>
                <option value="Fortnite">{t('join_opt_fortnite')}</option>
                <option value="Coach">{t('join_opt_coach')}</option>
                <option value="Staff">{t('join_opt_staff')}</option>
                <option value="Web/GFX">{t('join_opt_web')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>
              {t('join_label_tracker')}
            </label>
            <input className="grx-input" type="url" value={form.tracker} onChange={(e) => set('tracker', e.target.value)}
              placeholder="https://tracker.gg/..." />
          </div>

          <div>
            <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>
              {t('join_label_presentation')} *
            </label>
            <textarea className="grx-input" rows={4} required value={form.presentation}
              onChange={(e) => set('presentation', e.target.value)}
              placeholder={t('join_ph_presentation')}
              style={{ resize: 'vertical' }} />
          </div>

          <div>
            <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>
              {t('join_label_motivations')} *
            </label>
            <textarea className="grx-input" rows={3} required value={form.motivations}
              onChange={(e) => set('motivations', e.target.value)}
              placeholder={t('join_ph_motivations')}
              style={{ resize: 'vertical' }} />
          </div>

          {error && <div className="font-mono" style={{ fontSize: 11, color: 'var(--neon)' }}>{error}</div>}

          <button type="submit" className="btn-neon" style={{ fontSize: 11 }} disabled={sending}>
            {sending ? t('join_js_encrypting') : t('join_btn_submit')}
          </button>
        </form>
      )}

      <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.2)', letterSpacing: '0.25em', marginTop: 40, textAlign: 'center' }}>
        {t('join_footer')}
      </div>
    </div>
  );
}
