import { lazy, Suspense, useState } from 'react'
import SimulationModal from './ProjectSimulations'

const RoverModel = lazy(() => import('./RoverModel'))

const projects = [
  {
    title: 'AI-Powered Fraud Detection System',
    tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Pandas'],
    description: 'Production-ready ML pipeline with unsupervised learning algorithms for real-time financial transaction analysis. Feature engineering and model validation techniques.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Enterprise Cloud DevOps Platform',
    tags: ['Terraform', 'Azure', 'Kubernetes', 'Prometheus', 'Grafana'],
    description: 'End-to-end DevOps automation platform with Infrastructure-as-Code, containerization, monitoring, self-healing infrastructure, and automated scaling.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Real-time Image Processing on FPGA',
    tags: ['VHDL', 'FPGA', 'Hardware Optimization', 'VLSI'],
    description: 'RGB to grayscale image processing algorithms implemented on FPGA with optimized hardware resource utilization and real-time processing capabilities.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="9" y="9" width="6" height="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Facial Emotion Recognition System',
    tags: ['Deep Learning', 'CNNs', 'Keras', 'Python'],
    description: 'End-to-end emotion detection model using convolutional neural networks for multi-class facial expression classification.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'RAG-based Hardware Debugger',
    tags: ['RAG', 'Python', 'Verilog', 'VCD', 'LLMs'],
    description: 'Retrieval-Augmented Generation system to debug Verilog designs by analyzing VCD waveforms and log traces with LLM-powered reasoning.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Glaucoma Detection System',
    tags: ['Image Processing', 'MATLAB', 'Python', 'Medical AI'],
    description: 'Automated diagnostic pipeline using optic disc and cup segmentation for glaucoma risk prediction with classical image processing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

function RoverLoader() {
  return (
    <div className="rover-loader">
      <div className="rover-loader__spinner" />
      <p>Loading 3D Model...</p>
      <style>{`
        .rover-loader {
          width: 100%;
          height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
        }
        .rover-loader__spinner {
          width: 32px;
          height: 32px;
          border: 2px solid var(--border-subtle);
          border-top-color: var(--peach);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default function Projects() {
  const [activeSimulation, setActiveSimulation] = useState(null)

  return (
    <section className="projects" id="projects">
      <div className="container">
        <span className="section-label reveal">Projects</span>
        <h2 className="section-title reveal reveal-delay-1">
          Selected work
        </h2>

        {/* ── Featured Project: Rover ── */}
        <div className="projects__featured reveal reveal-delay-2">
          <div className="projects__featured-badge">Featured Project</div>
          <div className="projects__featured-grid">
            <div className="projects__featured-info">
              <h3 className="projects__featured-title">Autonomous Navigation Rover</h3>
              <p className="projects__featured-desc">
                Intelligent ground vehicle with autonomous navigation using computer vision and sensor fusion.
                Integrated real-time decision-making algorithms for obstacle avoidance and path optimization
                with embedded AI processing.
              </p>
              <div className="projects__featured-tags">
                {['Computer Vision', 'AI', 'Embedded Systems', 'Sensor Fusion', 'Real-time Processing'].map((tag) => (
                  <span key={tag} className="projects__featured-tag">{tag}</span>
                ))}
              </div>
              <div className="projects__featured-meta">
                <span className="projects__featured-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  2025
                </span>
                <span className="projects__featured-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Full Stack Hardware + Software
                </span>
              </div>
            </div>
            <div className="projects__featured-canvas">
              <Suspense fallback={<RoverLoader />}>
                <RoverModel />
              </Suspense>
              <p className="projects__featured-hint">Drag to rotate the model</p>
            </div>
          </div>
        </div>

        {/* ── Project Grid ── */}
        <div className="projects__grid">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`projects__card reveal reveal-delay-${(idx % 3) + 1}`}
              onClick={() => setActiveSimulation(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveSimulation(idx) }}
            >
              <div className="projects__card-icon">{project.icon}</div>
              <h3 className="projects__card-title">{project.title}</h3>
              <p className="projects__card-desc">{project.description}</p>
              <div className="projects__card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="projects__card-tag">{tag}</span>
                ))}
              </div>
              <div className="projects__card-sim-hint">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View Simulation
              </div>
              <div className="projects__card-glow" />
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Modal */}
      {activeSimulation !== null && (
        <SimulationModal
          projectIndex={activeSimulation}
          title={projects[activeSimulation].title}
          onClose={() => setActiveSimulation(null)}
        />
      )}

      <style>{`
        .projects {
          padding: var(--section-padding) 0;
          position: relative;
        }
        .projects::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
        }

        /* ── Featured ── */
        .projects__featured {
          margin-bottom: 64px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .projects__featured::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--brown-deep), var(--peach), var(--taupe));
        }
        .projects__featured-badge {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--peach);
          background: rgba(254, 224, 198, 0.08);
          border: 1px solid rgba(254, 224, 198, 0.15);
          padding: 4px 14px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 28px;
        }
        .projects__featured-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          align-items: center;
        }
        .projects__featured-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .projects__featured-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .projects__featured-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .projects__featured-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--taupe);
          border: 1px solid rgba(212, 184, 150, 0.25);
          padding: 5px 12px;
          border-radius: 3px;
        }
        .projects__featured-meta {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .projects__featured-meta-item {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .projects__featured-canvas {
          position: relative;
        }
        .projects__featured-hint {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-top: 8px;
          opacity: 0.6;
        }

        /* ── Grid ── */
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .projects__card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 32px 28px;
          transition: all 0.45s var(--ease-out-expo);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          cursor: pointer;
          outline: none;
        }
        .projects__card:hover,
        .projects__card:focus-visible {
          border-color: rgba(212, 184, 150, 0.35);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
        }
        .projects__card:focus-visible {
          box-shadow: 0 0 0 2px rgba(254, 224, 198, 0.4), 0 16px 48px rgba(0, 0, 0, 0.25);
        }
        .projects__card-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 0%, rgba(254, 224, 198, 0.04) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .projects__card:hover .projects__card-glow {
          opacity: 1;
        }
        .projects__card-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(92, 74, 56, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--taupe);
          margin-bottom: 20px;
        }
        .projects__card-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .projects__card-desc {
          font-size: 0.82rem;
          line-height: 1.65;
          color: var(--text-tertiary);
          margin-bottom: 18px;
        }
        .projects__card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .projects__card-tag {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--brown-muted);
          background: var(--brown-ghost);
          padding: 3px 8px;
          border-radius: 3px;
        }

        /* ── Simulation hint ── */
        .projects__card-sim-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--peach);
          opacity: 0;
          transform: translateY(6px);
          transition: all 0.35s var(--ease-out-expo);
        }
        .projects__card:hover .projects__card-sim-hint {
          opacity: 0.8;
          transform: translateY(0);
        }

        @media (max-width: 1024px) {
          .projects__featured-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .projects__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .projects__grid {
            grid-template-columns: 1fr;
          }
          .projects__featured { padding: 24px; }
          .projects__card-sim-hint {
            opacity: 0.6;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
