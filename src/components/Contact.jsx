export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__inner">
          <span className="section-label reveal">Contact</span>
          <h2 className="contact__title reveal reveal-delay-1">
            Let's work<br /><em>together</em>
          </h2>
          <p className="contact__subtitle reveal reveal-delay-2">
            I'm always open to discussing research collaborations, new opportunities,
            or interesting projects. Feel free to reach out.
          </p>

          <div className="contact__links reveal reveal-delay-3">
            <a href="mailto:riyaupadhyay162005@gmail.com" className="contact__link">
              <div className="contact__link-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4l-10 8L2 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="contact__link-label">Email</p>
                <p className="contact__link-value">riyaupadhyay162005@gmail.com</p>
              </div>
              <svg className="contact__link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a href="https://linkedin.com/in/riyakishoreupadhyay" target="_blank" rel="noopener noreferrer" className="contact__link">
              <div className="contact__link-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="contact__link-label">LinkedIn</p>
                <p className="contact__link-value">linkedin.com/in/riyakishoreupadhyay</p>
              </div>
              <svg className="contact__link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a href="tel:+919512047150" className="contact__link">
              <div className="contact__link-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="contact__link-label">Phone</p>
                <p className="contact__link-value">+91 9512047150</p>
              </div>
              <svg className="contact__link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className="contact__link contact__link--location">
              <div className="contact__link-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="contact__link-label">Location</p>
                <p className="contact__link-value">Ahmedabad, India</p>
              </div>
            </div>
          </div>

          <div className="contact__resume reveal reveal-delay-4">
            <a href="/RiyaUpadhyay_Resume-6.pdf" target="_blank" rel="noopener noreferrer" className="contact__resume-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="18" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 15 12 18 15 15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="contact__footer">
        <div className="container">
          <div className="contact__footer-inner">
            <p className="contact__footer-text">
              Designed & Built by <strong>Riya Upadhyay</strong>
            </p>
            <div className="contact__footer-langs">
              <span>English</span>
              <span className="contact__footer-dot">&middot;</span>
              <span>Hindi</span>
              <span className="contact__footer-dot">&middot;</span>
              <span>Gujarati</span>
              <span className="contact__footer-dot">&middot;</span>
              <span>Marathi</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .contact {
          padding: var(--section-padding) 0 0;
          position: relative;
        }
        .contact::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
        }

        .contact__inner {
          max-width: 640px;
        }
        .contact__title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 6vw, 3.8rem);
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 20px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .contact__title em {
          font-style: italic;
          color: var(--taupe);
        }
        .contact__subtitle {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-tertiary);
          margin-bottom: 40px;
        }

        .contact__links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }
        .contact__link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.4s var(--ease-out-expo);
          backdrop-filter: blur(10px);
        }
        .contact__link:not(.contact__link--location):hover {
          border-color: rgba(212, 184, 150, 0.3);
          transform: translateX(6px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        .contact__link--location {
          cursor: default;
        }
        .contact__link-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(92, 74, 56, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--taupe);
        }
        .contact__link-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 3px;
        }
        .contact__link-value {
          font-size: 0.88rem;
          color: var(--text-primary);
        }
        .contact__link-arrow {
          margin-left: auto;
          color: var(--text-tertiary);
          transition: all 0.3s var(--ease-out-expo);
          flex-shrink: 0;
        }
        .contact__link:hover .contact__link-arrow {
          color: var(--peach);
          transform: translate(3px, -3px);
        }

        .contact__resume {
          margin-bottom: 80px;
        }
        .contact__resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--peach);
          background: rgba(254, 224, 198, 0.06);
          border: 1px solid rgba(254, 224, 198, 0.2);
          padding: 16px 32px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.4s var(--ease-out-expo);
        }
        .contact__resume-btn:hover {
          background: rgba(254, 224, 198, 0.12);
          border-color: var(--peach);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(254, 224, 198, 0.1);
          color: var(--peach);
        }

        /* ── Footer ── */
        .contact__footer {
          padding: 28px 0;
          border-top: 1px solid var(--border-subtle);
        }
        .contact__footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .contact__footer-text {
          font-size: 0.78rem;
          color: var(--text-tertiary);
        }
        .contact__footer-text strong {
          color: var(--text-secondary);
          font-weight: 500;
        }
        .contact__footer-langs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-tertiary);
          letter-spacing: 0.04em;
        }
        .contact__footer-dot {
          color: var(--taupe);
          opacity: 0.4;
        }

        @media (max-width: 640px) {
          .contact__link { padding: 16px; }
          .contact__link-value { font-size: 0.8rem; }
        }
      `}</style>
    </section>
  )
}
