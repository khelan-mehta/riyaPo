const experiences = [
  {
    role: 'Student Researcher & First Author',
    company: 'Nirma University Research Laboratory',
    location: 'Ahmedabad, India',
    period: 'Jan 2024 — Present',
    description: [
      'Lead cutting-edge research in AI-based cybersecurity, resulting in published IEEE papers',
      'Developed novel XAI-based DoS attack detection framework for smart grid systems, achieving 94% accuracy',
      'Architected AI-powered spam classification system for autonomous vehicle communication networks',
      'Collaborate with faculty mentors and industry experts to translate research findings into practical applications',
    ],
    tags: ['Machine Learning', 'XAI', 'Cybersecurity', 'IEEE'],
    accent: 'var(--peach)',
  },
  {
    role: 'General Secretary',
    company: 'IEEE Young Professionals, Ahmedabad Section',
    location: 'Ahmedabad, India',
    period: 'Mar 2025 — Present',
    description: [
      'Spearhead strategic initiatives for increase in event participation through innovative programming',
      'Orchestrate cross-functional collaborations with industry partners and academic institutions',
      'Manage organizational operations, budget allocation, and stakeholder communications',
    ],
    tags: ['Leadership', 'Strategy', 'Community Building'],
    accent: 'var(--taupe)',
  },
  {
    role: 'Cloud DevOps & Automation Intern',
    company: 'Wipro Limited',
    location: 'Ahmedabad, India',
    period: 'May 2025 — Jul 2025',
    description: [
      'Engineered scalable cloud infrastructure using Terraform, reducing deployment time through IaC',
      'Architected and deployed containerized applications on Azure Kubernetes Service (AKS)',
      'Implemented comprehensive CI/CD pipelines with Azure DevOps',
      'Designed monitoring solutions using Prometheus & Grafana for proactive system optimization',
    ],
    tags: ['Terraform', 'Azure', 'Kubernetes', 'CI/CD', 'Docker'],
    accent: 'var(--brown-light)',
  },
]

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <span className="section-label reveal">Experience</span>
        <h2 className="section-title reveal reveal-delay-1">
          Professional journey
        </h2>

        <div className="exp__timeline">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`exp__item reveal reveal-delay-${idx + 1}`}>
              <div className="exp__timeline-dot" style={{ borderColor: exp.accent }}>
                <div className="exp__timeline-dot-inner" style={{ background: exp.accent }} />
              </div>
              <div className="exp__timeline-line" />

              <div className="exp__card">
                <div className="exp__card-header">
                  <div>
                    <h3 className="exp__role">{exp.role}</h3>
                    <p className="exp__company">{exp.company}</p>
                  </div>
                  <div className="exp__meta">
                    <span className="exp__period">{exp.period}</span>
                    <span className="exp__location">{exp.location}</span>
                  </div>
                </div>

                <ul className="exp__list">
                  {exp.description.map((item, i) => (
                    <li key={i} className="exp__list-item">{item}</li>
                  ))}
                </ul>

                <div className="exp__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="exp__tag" style={{ borderColor: exp.accent, color: exp.accent }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .experience {
          padding: var(--section-padding) 0;
          position: relative;
        }
        .experience::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
        }

        .exp__timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .exp__item {
          display: grid;
          grid-template-columns: 20px 1fr;
          gap: 32px;
          position: relative;
          padding-bottom: 48px;
        }
        .exp__item:last-child { padding-bottom: 0; }

        .exp__timeline-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--taupe);
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          margin-top: 4px;
        }
        .exp__timeline-dot-inner {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--taupe);
        }
        .exp__timeline-line {
          position: absolute;
          left: 9px;
          top: 24px;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, var(--border-subtle), transparent);
        }
        .exp__item:last-child .exp__timeline-line { display: none; }

        .exp__card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 32px;
          transition: all 0.4s var(--ease-out-expo);
          backdrop-filter: blur(10px);
        }
        .exp__card:hover {
          border-color: rgba(212, 184, 150, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }

        .exp__card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .exp__role {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .exp__company {
          font-size: 0.88rem;
          color: var(--taupe);
          font-weight: 400;
        }
        .exp__meta {
          text-align: right;
          flex-shrink: 0;
        }
        .exp__period {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 2px;
        }
        .exp__location {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-tertiary);
          letter-spacing: 0.04em;
        }

        .exp__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .exp__list-item {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
          padding-left: 18px;
          position: relative;
        }
        .exp__list-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--taupe);
          opacity: 0.5;
        }

        .exp__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .exp__tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid;
          border-radius: 3px;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .exp__card-header { flex-direction: column; }
          .exp__meta { text-align: left; }
          .exp__card { padding: 24px; }
        }
      `}</style>
    </section>
  )
}
