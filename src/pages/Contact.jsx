import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { SITE_CONFIG } from '../config/data';

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const STEPS = [1, 2, 3];

export default function Contact() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticket, setTicket] = useState('');
  const [error, setError] = useState('');

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleNext = () => {
    if (step === 2 && form.type === 'RECRUTEMENT') {
      alert(t('contact_js_recruit_msg') + '\n' + SITE_CONFIG.discord);
      return;
    }
    setStep((p) => p + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const ticketId = 'GRX-' + Date.now().toString(36).toUpperCase();
    const { error: err } = await supabase.from('contacts').insert([{
      name: escapeHTML(form.name),
      email: form.email,
      type: form.type,
      message: escapeHTML(form.message),
      ticket_id: ticketId,
    }]);
    setSending(false);
    if (err) { setError(t('contact_err_transmit')); return; }
    setTicket(ticketId);
    setSuccess(true);
  };

  const reset = () => {
    setStep(1);
    setForm({ name: '', email: '', type: '', message: '' });
    setSuccess(false);
    setTicket('');
    setError('');
  };

  const faqItems = [
    { titleKey: 'contact_faq1_title', descKey: 'contact_faq1_desc' },
    { titleKey: 'contact_faq2_title', descKey: 'contact_faq2_desc' },
    { titleKey: 'contact_faq3_title', descKey: 'contact_faq3_desc' },
    { titleKey: 'contact_faq4_title', descKey: 'contact_faq4_desc' },
  ];

  return (
    <div style={{ padding: '60px 8vw 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, maxWidth: 1100, margin: '0 auto', alignItems: 'start' }}>
        {/* Form column */}
        <div>
          <div style={{ marginBottom: 36 }}>
            <div className="section-tag mb-3">{t('contact_header_sub')}</div>
            <h1 className="font-rajdhani" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1 }}>
              {t('contact_header_title1')}
              <span style={{ color: 'var(--lavender)' }}>{t('contact_header_title2')}</span>
            </h1>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
            {STEPS.map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: step >= s ? 'var(--neon)' : 'transparent',
                  border: `1px solid ${step >= s ? 'var(--neon)' : 'rgba(177,133,219,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontFamily: 'Space Mono, monospace', color: step >= s ? '#fff' : 'rgba(240,242,245,0.4)',
                }}>
                  {s}
                </div>
                {s < 3 && <div style={{ width: 30, height: 1, background: step > s ? 'var(--neon)' : 'rgba(177,133,219,0.2)' }} />}
              </div>
            ))}
          </div>

          {success ? (
            <div className="fade-in" style={{ padding: '2rem', border: '1px solid rgba(233,196,106,0.3)', background: 'rgba(233,196,106,0.04)' }}>
              <div style={{ position: 'relative', paddingTop: 0 }}>
                <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: 20 }} />
              </div>
              <div className="font-rajdhani" style={{ fontSize: 28, fontWeight: 700, color: 'var(--gold)', marginBottom: 8 }}>
                {t('contact_success_msg')}
              </div>
              <div className="font-mono" style={{ fontSize: 10, color: 'rgba(240,242,245,0.5)', marginBottom: 20, letterSpacing: '0.15em' }}>
                {t('contact_ticket_ref')} <span style={{ color: 'var(--neon)' }}>{ticket}</span>
              </div>
              {form.type === 'PARTENARIAT' && (
                <div style={{ marginBottom: 20, padding: '1rem', border: '1px solid rgba(214,47,127,0.2)' }}>
                  <div className="font-mono" style={{ fontSize: 10, color: 'var(--neon)', marginBottom: 8 }}>{t('contact_partner_act')}</div>
                  <p style={{ fontSize: 12, color: 'rgba(240,242,245,0.6)', marginBottom: 12 }}>{t('contact_partner_desc')}</p>
                  <a
                    href={`mailto:contact@gowrax.me?subject=${encodeURIComponent(t('contact_faq3_title'))}&body=Ref: ${ticket}`}
                    className="btn-neon" style={{ fontSize: 11 }}
                  >
                    {t('contact_partner_btn')}
                  </a>
                </div>
              )}
              <button onClick={reset} className="btn-ghost" style={{ fontSize: 11 }}>
                {t('contact_new_report')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="fade-in">
                  <div className="font-mono" style={{ fontSize: 10, color: 'var(--lavender)', letterSpacing: '0.2em', marginBottom: 20 }}>
                    {t('contact_step1_title')}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.15em' }}>
                      {t('contact_step1_label1')}
                    </label>
                    <input className="grx-input" required value={form.name} onChange={(e) => set('name', e.target.value)}
                      placeholder={t('contact_placeholder_name')} />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.5)', display: 'block', marginBottom: 6, letterSpacing: '0.15em' }}>
                      {t('contact_step1_label2')}
                    </label>
                    <input className="grx-input" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)}
                      placeholder={t('contact_placeholder_mail')} />
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (form.name && form.email) setStep(2); }}
                    className="btn-neon" style={{ fontSize: 11 }}
                  >
                    {t('contact_step1_btn')}
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="fade-in">
                  <div className="font-mono" style={{ fontSize: 10, color: 'var(--lavender)', letterSpacing: '0.2em', marginBottom: 20 }}>
                    {t('contact_step2_title')}
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <select className="grx-select" required value={form.type} onChange={(e) => set('type', e.target.value)}>
                      <option value="">{t('contact_opt_default')}</option>
                      <option value="PARTENARIAT">{t('contact_opt_1')}</option>
                      <option value="RECRUTEMENT">{t('contact_opt_2')}</option>
                      <option value="INTER-EQUIPES">{t('contact_opt_3')}</option>
                      <option value="SUGGESTIONS">{t('contact_opt_4')}</option>
                      <option value="TECHNIQUE">{t('contact_opt_5')}</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="button" onClick={() => setStep(1)} className="btn-ghost" style={{ fontSize: 11 }}>{t('contact_btn_back')}</button>
                    <button type="button" onClick={handleNext} disabled={!form.type} className="btn-neon" style={{ fontSize: 11, opacity: form.type ? 1 : 0.4 }}>
                      {t('contact_btn_analyze')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="fade-in">
                  <div className="font-mono" style={{ fontSize: 10, color: 'var(--lavender)', letterSpacing: '0.2em', marginBottom: 20 }}>
                    {t('contact_step3_title')}
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <textarea
                      className="grx-input"
                      rows={6}
                      required
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder={t('contact_placeholder_report')}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  {error && <div className="font-mono" style={{ fontSize: 11, color: 'var(--neon)', marginBottom: 12 }}>{error}</div>}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="button" onClick={() => setStep(2)} className="btn-ghost" style={{ fontSize: 11 }}>{t('contact_btn_back')}</button>
                    <button type="submit" className="btn-neon" style={{ fontSize: 11 }} disabled={sending}>
                      {sending ? t('contact_btn_transmitting') : t('contact_btn_transmit')}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* FAQ sidebar */}
        <div style={{ minWidth: 280, maxWidth: 320 }}>
          <div className="font-mono" style={{ fontSize: 10, color: 'var(--lavender)', letterSpacing: '0.25em', marginBottom: 20 }}>
            {t('contact_faq_title')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqItems.map(({ titleKey, descKey }) => (
              <div key={titleKey} style={{ padding: '1rem', border: '1px solid rgba(177,133,219,0.12)', background: 'rgba(26,28,46,0.5)' }}>
                <div className="font-mono" style={{ fontSize: 9, color: 'var(--neon)', letterSpacing: '0.2em', marginBottom: 6 }}>
                  {t(titleKey)}
                </div>
                <p style={{ fontSize: 11, color: 'rgba(240,242,245,0.5)', lineHeight: 1.5 }}>{t(descKey)}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, padding: '1rem', border: '1px solid rgba(214,47,127,0.2)' }}>
            <div className="font-mono" style={{ fontSize: 9, color: 'var(--neon)', letterSpacing: '0.2em', marginBottom: 6 }}>DISCORD_FAST_TRACK</div>
            <p style={{ fontSize: 11, color: 'rgba(240,242,245,0.5)', marginBottom: 12, lineHeight: 1.5 }}>
              Réponse moyenne : 6H via Discord.
            </p>
            <a href={SITE_CONFIG.discord} target="_blank" rel="noopener noreferrer"
              className="font-mono" style={{ fontSize: 10, color: 'var(--neon)', textDecoration: 'none', letterSpacing: '0.15em' }}>
              → OUVRIR DISCORD
            </a>
          </div>
        </div>
      </div>

      <div className="font-mono" style={{ fontSize: 9, color: 'rgba(240,242,245,0.2)', letterSpacing: '0.25em', marginTop: 48, textAlign: 'center' }}>
        {t('contact_footer')}
      </div>
    </div>
  );
}
