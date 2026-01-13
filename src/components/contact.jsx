import { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaSpinner,
} from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'ayomidepaul784@gmail.com',
    href: 'mailto:ayomidepaul784@gmail.com',
    color: '#10B981',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+234 916 889 7258',
    href: 'tel:+2349168897258',
    color: '#10B981',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Ogun, Nigeria',
    href: null,
    color: '#10B981',
  },
];

const socialLinks = [
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/taiwoayomide/',
    color: '#0A66C2',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/dev-ayomide',
    color: '#333',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    href: 'https://wa.me/qr/MKEHQ4R4AOQKO1',
    color: '#25D366',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.1, delay: 200 });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
            top: '20%',
            left: '-15%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
            bottom: '10%',
            right: '-10%',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`section-header transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-label">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
            Contact
          </div>
          <h2 className="section-title">
            Let's <span className="text-gradient-static">Connect</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities.
          </p>
        </div>

        {/* Main Content */}
        <div
          ref={formRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-700 ${
            formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="flex flex-col gap-5">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                const content = (
                  <div
                    className="group p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 hover:translate-x-2"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-primary)',
                    }}
                    data-cursor="pointer"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${item.color}15`,
                      }}
                    >
                      <IconComponent size={22} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium mb-1"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={index} href={item.href}>
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h3
                className="text-lg font-bold mb-4 font-display"
                style={{ color: 'var(--text-primary)' }}
              >
                Connect on Social
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-primary)',
                      }}
                      data-cursor="pointer"
                      aria-label={item.label}
                    >
                      <IconComponent
                        size={22}
                        className="transition-colors duration-300"
                        style={{ color: 'var(--text-secondary)' }}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Card */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
                border: '1px solid var(--border-primary)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Available for Work
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                I'm currently open to freelance projects and full-time opportunities. 
                Let's build something amazing together!
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            className="p-8 md:p-10 rounded-3xl"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold mb-2 font-display"
              style={{ color: 'var(--text-primary)' }}
            >
              Send me a message
            </h3>
            <p
              className="mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            {/* Status Message */}
            {status.message && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                  status.type === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}
              >
                {status.type === 'success' ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <span className="text-red-500">✕</span>
                )}
                <span
                  style={{
                    color: status.type === 'success' ? '#10B981' : '#EF4444',
                  }}
                >
                  {status.message}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formData.name
                      ? '-top-2.5 text-xs px-2'
                      : 'top-4 text-sm'
                  }`}
                  style={{
                    color: focusedField === 'name' ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                    background: focusedField === 'name' || formData.name ? 'var(--bg-card)' : 'transparent',
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-4 rounded-xl outline-none transition-all duration-300"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: `2px solid ${focusedField === 'name' ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                    color: 'var(--text-primary)',
                  }}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formData.email
                      ? '-top-2.5 text-xs px-2'
                      : 'top-4 text-sm'
                  }`}
                  style={{
                    color: focusedField === 'email' ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                    background: focusedField === 'email' || formData.email ? 'var(--bg-card)' : 'transparent',
                  }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-4 rounded-xl outline-none transition-all duration-300"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: `2px solid ${focusedField === 'email' ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                    color: 'var(--text-primary)',
                  }}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message
                      ? '-top-2.5 text-xs px-2'
                      : 'top-4 text-sm'
                  }`}
                  style={{
                    color: focusedField === 'message' ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                    background: focusedField === 'message' || formData.message ? 'var(--bg-card)' : 'transparent',
                  }}
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className="w-full px-4 py-4 rounded-xl outline-none transition-all duration-300 resize-none"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: `2px solid ${focusedField === 'message' ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                    color: 'var(--text-primary)',
                  }}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
