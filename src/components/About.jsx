export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__left reveal">
            <span className="section-label">About</span>
            <h2 className="section-title">
              Where <em>data science</em><br />meets <em>engineering</em>
            </h2>
            <p className="about__bio">
              I'm a data science researcher pursuing dual degrees from
              <strong> Nirma University</strong> (BTech ECE) and <strong>IIT Madras</strong> (BS Data Science).
              My work sits at the intersection of explainable AI, cybersecurity,
              and embedded systems — published as first author in IEEE with novel
              frameworks achieving 94% accuracy on real-world datasets.
            </p>
            <p className="about__bio about__bio--secondary">
              Beyond research, I lead as General Secretary of IEEE Young Professionals
              Ahmedabad, translating academic insights into community impact. I believe
              the best technology is built when rigorous science meets thoughtful engineering.
            </p>
          </div>

          <div className="about__right">
            <div className="about__stats reveal reveal-delay-2">
              <div className="about__stat">
                <span className="about__stat-number">3</span>
                <span className="about__stat-label">IEEE Papers<br/>Published</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">94<span className="about__stat-unit">%</span></span>
                <span className="about__stat-label">Detection<br/>Accuracy</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">8.46</span>
                <span className="about__stat-label">CGPA at<br/>Nirma University</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">7<span className="about__stat-unit">+</span></span>
                <span className="about__stat-label">Technical<br/>Projects</span>
              </div>
            </div>

            <div className="about__education reveal reveal-delay-3">
              <h3 className="about__edu-title">Education</h3>
              <div className="about__edu-card">
                <div className="about__edu-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3L1 9l11 6 9-4.91V17M5 13.18v4L12 21l7-3.82v-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="about__edu-degree">BTech, Electronics & Communication</p>
                  <p className="about__edu-school">Nirma University, Ahmedabad</p>
                  <p className="about__edu-meta">2023 — 2027 &middot; CGPA 8.46/10</p>
                </div>
              </div>
              <div className="about__edu-card">
                <div className="about__edu-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3L1 9l11 6 9-4.91V17M5 13.18v4L12 21l7-3.82v-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="about__edu-degree">BS, Data Science</p>
                  <p className="about__edu-school">IIT Madras (Online)</p>
                  <p className="about__edu-meta">2023 — 2027 &middot; Foundation Year Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          padding: var(--section-padding) 0;
          position: relative;
        }
        .about::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
        }
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .about__bio {
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        .about__bio strong {
          color: var(--taupe-light);
          font-weight: 500;
        }
        .about__bio--secondary {
          color: var(--text-tertiary);
          font-size: 0.88rem;
        }
        .section-title em {
          font-style: italic;
          color: var(--taupe);
        }

        /* ── Stats ── */
        .about__stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 40px;
        }
        .about__stat {
          background: var(--bg-secondary);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .about__stat-number {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 300;
          color: var(--peach);
          line-height: 1;
        }
        .about__stat-unit {
          font-size: 1.4rem;
          color: var(--peach-dark);
        }
        .about__stat-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          line-height: 1.5;
        }

        /* ── Education ── */
        .about__education {
          padding: 28px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }
        .about__edu-title {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--peach);
          margin-bottom: 20px;
          font-weight: 500;
        }
        .about__edu-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 16px 0;
        }
        .about__edu-card + .about__edu-card {
          border-top: 1px solid var(--border-subtle);
        }
        .about__edu-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(92, 74, 56, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--taupe);
        }
        .about__edu-degree {
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .about__edu-school {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        .about__edu-meta {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-tertiary);
          letter-spacing: 0.03em;
        }

        @media (max-width: 768px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  )
}
