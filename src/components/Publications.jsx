const publications = [
  {
    type: 'First Author',
    id: '10892722',
    title: 'Advanced Security Mechanisms in Smart Grid Infrastructure',
    venue: 'IEEE Xplore',
    color: 'var(--peach)',
  },
  {
    type: 'First Author',
    id: '10914867',
    title: 'XAI-based DoS Attack Detection Framework for Reliable Energy Distribution in Smart Grid Systems',
    venue: 'IEEE Xplore',
    color: 'var(--peach)',
  },
  {
    type: 'Co-Author',
    id: '11091797',
    title: 'AI-based Message Spam Classification Framework for Secure Autonomous Vehicle Communication',
    venue: 'IEEE Xplore',
    color: 'var(--taupe)',
  },
]

export default function Publications() {
  return (
    <section className="publications" id="publications">
      <div className="container">
        <span className="section-label reveal">Research</span>
        <h2 className="section-title reveal reveal-delay-1">
          Published work
        </h2>

        <div className="pub__grid">
          {publications.map((pub, idx) => (
            <a
              key={idx}
              href={`https://ieeexplore.ieee.org/document/${pub.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`pub__card reveal reveal-delay-${idx + 1}`}
            >
              <div className="pub__card-top">
                <span className="pub__badge" style={{ color: pub.color, borderColor: pub.color }}>
                  {pub.type}
                </span>
                <span className="pub__venue">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {pub.venue}
                </span>
              </div>

              <h3 className="pub__title">{pub.title}</h3>

              <div className="pub__footer">
                <span className="pub__id">DOI: {pub.id}</span>
                <span className="pub__link-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>

              <div className="pub__card-accent" style={{ background: pub.color }} />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .publications {
          padding: var(--section-padding) 0;
          position: relative;
        }
        .publications::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
        }

        .pub__grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pub__card {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 32px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all 0.4s var(--ease-out-expo);
          backdrop-filter: blur(10px);
        }
        .pub__card:hover {
          border-color: rgba(212, 184, 150, 0.3);
          transform: translateX(6px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        .pub__card-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          opacity: 0.6;
          transition: opacity 0.3s;
        }
        .pub__card:hover .pub__card-accent {
          opacity: 1;
        }

        .pub__card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pub__badge {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid;
          padding: 3px 10px;
          border-radius: 3px;
          font-weight: 500;
        }
        .pub__venue {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pub__title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 16px;
          transition: color 0.3s;
        }
        .pub__card:hover .pub__title {
          color: var(--taupe-light);
        }

        .pub__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pub__id {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-tertiary);
          letter-spacing: 0.04em;
        }
        .pub__link-icon {
          color: var(--text-tertiary);
          transition: color 0.3s, transform 0.3s;
        }
        .pub__card:hover .pub__link-icon {
          color: var(--peach);
          transform: translate(2px, -2px);
        }

        @media (max-width: 640px) {
          .pub__card { padding: 24px; }
        }
      `}</style>
    </section>
  )
}
