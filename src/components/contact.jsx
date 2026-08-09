import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { ArrowUpRight } from './icons';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const details = [
  { label: 'Email', value: 'ayomidepaul784@gmail.com', href: 'mailto:ayomidepaul784@gmail.com' },
  { label: 'Phone', value: '+234 916 889 7258', href: 'tel:+2349168897258' },
  { label: 'WhatsApp', value: 'Message me', href: 'https://wa.me/qr/MKEHQ4R4AOQKO1' },
  { label: 'Location', value: 'Lagos, Nigeria — remote friendly', href: null },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/dev-ayomide' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwoayomide/' },
  { label: 'X', href: 'https://x.com/dev_ayomide' },
  { label: 'Instagram', href: 'https://www.instagram.com/dev_ayomide_/' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setStatus({
        type: 'success',
        message: "Message sent. I'll get back to you shortly.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Try again, or email me directly.',
      });
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="inverted section grain relative">
      <div className="wrap relative z-10" ref={ref}>
        <span className="section-cap">Contact</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Pitch */}
          <div className={`lg:col-span-6 reveal ${isVisible ? 'is-visible' : ''}`}>
            <h2 className="display-lg">
              Let&apos;s build <span className="serif-italic">something</span> together.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: 'var(--inv-text-2)' }}>
              I&apos;m open to freelance projects, internships and full-time roles. Tell me what
              you&apos;re working on — I usually reply within a day.
            </p>

            <a
              href="mailto:ayomidepaul784@gmail.com"
              className="link-line link-line--static inline-flex mt-8 text-lg md:text-xl font-medium tracking-tight"
              style={{ color: 'var(--inv-text)' }}
            >
              ayomidepaul784@gmail.com
              <ArrowUpRight size={16} />
            </a>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-7">
              {details.map((item) => (
                <div key={item.label}>
                  <span className="eyebrow">{item.label}</span>
                  <span className="block text-sm mt-1.5" style={{ color: 'var(--inv-text)' }}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="link-line"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line font-mono text-[11px] tracking-[0.14em] uppercase"
                  style={{ color: 'var(--inv-text-2)' }}
                >
                  {s.label}
                  <ArrowUpRight size={8} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-6 lg:pl-10 reveal stagger-2 ${isVisible ? 'is-visible' : ''}`}>
            <form onSubmit={handleSubmit} className="space-y-9">
              <div>
                <label htmlFor="name" className="field-label">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="field mt-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="field-label">
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="field mt-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="field-label">
                  What do you have in mind?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="A short brief, a timeline, a link…"
                  className="field mt-2 resize-none"
                  required
                />
              </div>

              {status.message && (
                <p
                  className="flex items-start gap-3 text-sm"
                  style={{ color: 'var(--inv-text)' }}
                  role="status"
                >
                  <span className="font-mono text-xs pt-0.5">
                    {status.type === 'success' ? '✓' : '!'}
                  </span>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-solid w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending…' : 'Send message'}
                <FaArrowRight size={11} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
