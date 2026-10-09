import './App.css'

function App() {
  const deliverables = [
    'Clean Monorepo Structure (frontend/ & backend/)',
    'Vite + React 18 frontend environment initialized',
    'Node.js + Express backend REST API configured with health check',
    'Essential libraries installed (Router, Zustand, Axios, Mongoose, JWT)',
    'White & Red Design Tokens established in CSS',
    'Root README.md & ROADMAP.md documentation created',
    'Git repository & remote tracking configured',
  ];

  return (
    <div className="foundation-container">
      <div className="brand-badge">
        🍕 Crazy4U Platform
      </div>

      <h1 className="brand-title">
        Good Food. Good Mood. <span>Crazy4U.</span>
      </h1>

      <p className="brand-subtitle">
        Commercial food-ordering experience in active development. Phase 1 Foundation successfully established.
      </p>

      <div className="phase-card">
        <div className="phase-header">
          <div>
            <h3>Phase 1 — Project Foundation</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Base architecture, tooling, and environment setup
            </p>
          </div>
          <span className="phase-tag">COMPLETED</span>
        </div>

        <ul className="checklist">
          {deliverables.map((item, index) => (
            <li key={index} className="checklist-item">
              <span className="check-icon">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button className="cta-button" onClick={() => alert('Ready for Phase 2: Design System & Navigation!')}>
          Next: Phase 2 — Design System & Global UI →
        </button>
      </div>

      <p className="footer-info">
        Crazy4U © 2026 • Frontend: React + Vite • Backend: Express API • Remote: github.com/lohithpahuja03/Crazy4U
      </p>
    </div>
  )
}

export default App
