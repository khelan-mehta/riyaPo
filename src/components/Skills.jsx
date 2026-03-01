const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.92L12 22M8 6a4 4 0 0 1 8 0" strokeLinecap="round"/>
        <circle cx="12" cy="6" r="1" fill="currentColor"/>
      </svg>
    ),
    skills: ['Machine Learning', 'Deep Learning', 'RAG Systems', 'XAI', 'MLOps', 'Data Mining', 'NLP', 'Statistics', 'Linear Algebra', 'Game Theory'],
    accent: 'var(--peach)',
  },
  {
    title: 'Programming & Development',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16,18 22,12 16,6" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8,6 2,12 8,18" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="14" y1="4" x2="10" y2="20" strokeLinecap="round"/>
      </svg>
    ),
    skills: ['Python', 'C', 'MATLAB', 'SQL', 'Git', 'Linux/Unix', 'DSA', 'DBMS'],
    accent: 'var(--taupe)',
  },
  {
    title: 'Cloud & DevOps',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    skills: ['Terraform', 'Microsoft Azure', 'Kubernetes', 'Docker', 'CI/CD Pipelines', 'YAML', 'Prometheus', 'Grafana'],
    accent: 'var(--brown-light)',
  },
  {
    title: 'Hardware & Embedded',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="9" y="9" width="6" height="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    skills: ['FPGA (VHDL/Verilog)', 'Digital Logic Design', 'Embedded Programming', 'PCB Design', 'VLSI'],
    accent: 'var(--taupe-dark)',
  },
]

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <span className="section-label reveal">Expertise</span>
        <h2 className="section-title reveal reveal-delay-1">
          Technical skills
        </h2>

        <div className="skills__grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className={`skills__category reveal reveal-delay-${idx + 1}`}>
              <div className="skills__category-header">
                <div className="skills__category-icon" style={{ color: cat.accent }}>{cat.icon}</div>
                <h3 className="skills__category-title">{cat.title}</h3>
              </div>
              <div className="skills__tags">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skills__tag"
                    style={{ '--tag-accent': cat.accent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Certifications ── */}
        <div className="skills__certs reveal reveal-delay-3">
          <h3 className="skills__certs-title">Certifications & Achievements</h3>
          <div className="skills__certs-grid">
            {[
              { label: 'Certificate of Scholar', org: 'Nirma University' },
              { label: 'ML & MATLAB OnRamp', org: 'MathWorks' },
              { label: 'Communication Grades 1-8', org: 'Trinity College London' },
              { label: 'Software Engineering', org: 'Goldman Sachs Virtual' },
              { label: 'Data Analytics Simulation', org: 'Accenture' },
              { label: '3 IEEE Papers Published', org: 'First/Co-Author' },
            ].map((cert) => (
              <div key={cert.label} className="skills__cert">
                <span className="skills__cert-dot" />
                <div>
                  <p className="skills__cert-label">{cert.label}</p>
                  <p className="skills__cert-org">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skills {
          padding: var(--section-padding) 0;
          position: relative;
        }
        .skills::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
        }

        .skills__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 56px;
        }
        .skills__category {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 32px;
          transition: all 0.4s var(--ease-out-expo);
          backdrop-filter: blur(10px);
        }
        .skills__category:hover {
          border-color: rgba(212, 184, 150, 0.25);
          transform: translateY(-2px);
        }
        .skills__category-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .skills__category-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(92, 74, 56, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .skills__category-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        .skills__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skills__tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.03em;
          color: var(--text-secondary);
          background: rgba(254, 224, 198, 0.04);
          border: 1px solid rgba(254, 224, 198, 0.08);
          padding: 6px 14px;
          border-radius: 4px;
          transition: all 0.3s var(--ease-out-expo);
          cursor: default;
        }
        .skills__tag:hover {
          background: rgba(254, 224, 198, 0.08);
          border-color: var(--tag-accent);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        /* ── Certs ── */
        .skills__certs {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 36px;
          backdrop-filter: blur(10px);
        }
        .skills__certs-title {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--peach);
          margin-bottom: 24px;
          font-weight: 500;
        }
        .skills__certs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skills__cert {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .skills__cert-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--taupe);
          margin-top: 6px;
          flex-shrink: 0;
        }
        .skills__cert-label {
          font-size: 0.84rem;
          color: var(--text-primary);
          font-weight: 400;
          margin-bottom: 2px;
        }
        .skills__cert-org {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-tertiary);
          letter-spacing: 0.03em;
        }

        @media (max-width: 768px) {
          .skills__grid { grid-template-columns: 1fr; }
          .skills__certs-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .skills__certs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
