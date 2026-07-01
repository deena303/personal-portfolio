import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── WhatsApp number (country code + number, no + or spaces) ────────────────
const WA_NUMBER = '916382097752';

// ─── Toast Component ─────────────────────────────────────────────────────────
const Toast = ({ type, onClose }) => {
  if (!type) return null;

  const config = {
    success: {
      icon: '✅',
      title: 'Redirecting to WhatsApp...',
      border: 'border-green-500/40',
    },
    error: {
      icon: '⚠️',
      title: 'Please complete all required fields.',
      border: 'border-red-500/40',
    },
  }[type];

  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-8 right-6 z-[999] flex items-start gap-4 px-6 py-4 rounded-2xl shadow-2xl max-w-sm backdrop-blur-md bg-black/90 border ${config.border} text-white`}
    >
      <span className="text-2xl mt-0.5">{config.icon}</span>
      <div className="flex-1">
        <p className="font-bold text-sm">{config.title}</p>
      </div>
      <button
        onClick={onClose}
        className="text-white/40 hover:text-white transition-colors text-lg leading-none mt-0.5"
      >
        ×
      </button>
    </motion.div>
  );
};

// ─── Contact Section ──────────────────────────────────────────────────────────
const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending
  const [toast, setToast] = useState(null);     // null | 'success' | 'error'

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax for the huge background text
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);

  // ── Show toast helper ────────────────────────────────────────────────────
  const showToast = (type) => {
    setToast(type);
    setTimeout(() => setToast(null), 4000);
  };

  // ── Submit → open WhatsApp ───────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const form = formRef.current;
    const firstName = form.firstName?.value?.trim()  || '';
    const lastName  = form.lastName?.value?.trim()   || '';
    const email     = form.user_email?.value?.trim() || '';
    const message   = form.message?.value?.trim()    || '';

    // Validation — all fields required
    if (!firstName || !lastName || !email || !message) {
      showToast('error');
      return;
    }

    setStatus('sending');

    // Build the pre-filled WhatsApp message
    const waText = `👋 Hello V. Deena,

A new message has been sent through your portfolio website.

👤 Name:
${firstName} ${lastName}

📧 Email:
${email}

💬 Message:
${message}

Looking forward to hearing from you.`;

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`,
      '_blank'
    );

    // Reset form and show success toast
    form.reset();
    setStatus('idle');
    showToast('success');
  };

  // ── Button classes ───────────────────────────────────────────────────────
  const btnClass = [
    'px-8 py-3 rounded-full border border-white/40 text-white font-bold',
    'flex items-center justify-center gap-3 transition-all duration-300 group',
    'whitespace-nowrap self-start sm:self-auto',
    status === 'sending'
      ? 'opacity-50 cursor-not-allowed bg-white/10'
      : 'hover:bg-white hover:text-[#ff2a2a]',
  ].join(' ');

  return (
    <>
      {/* ── Toast ── */}
      <Toast type={toast} onClose={() => setToast(null)} />

      <section
        ref={ref}
        id="contact"
        className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900"
      >
        {/* Huge background text */}
        <motion.div
          style={{ y }}
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
        >
          <h1
            className="text-[25vw] leading-[0.75] font-black text-white uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
            style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
          >
            Contact
          </h1>
        </motion.div>

        {/* Form card overlay */}
        <div className="relative z-10 w-full flex justify-end items-end">
          <div
            data-aos="fade-up"
            className="bg-[#ff2a2a] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between"
          >
            {/* Top label */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
              <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-90">
                Reach Me
              </div>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-12 md:gap-16 w-full"
            >
              {/* Input columns */}
              <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
                {/* Left column */}
                <div className="flex-1 flex flex-col gap-10">
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      required
                      className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      placeholder="Email"
                      required
                      className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                    />
                  </div>

                  {/* Informational Text Block */}
                  <div className="flex-1 flex flex-col justify-center pt-2 md:pt-4">
                    <div className="text-white font-bold text-[18px] leading-[1.8] tracking-[0.2px] text-left flex flex-col gap-[15px]">
                      <p>✔ Available for Freelance & Collaboration</p>
                      <p>⏱ Usually responds within 24–48 hours.</p>
                    </div>
                  </div>
                </div>

                {/* Right column — Message */}
                <div className="flex-1 flex flex-col">
                  <div className="relative h-full flex flex-col">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Type your message here"
                      required
                      className="w-full h-full min-h-[120px] bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium resize-none rounded-none"
                    />
                  </div>
                </div>
              </div>

              {/* Send button row */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={btnClass}
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Opening...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
