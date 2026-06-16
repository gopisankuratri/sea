import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="heroContent">
          <p className="eyebrow">SEA Farms</p>
          <h1>Welcome to SEA Farms Operations</h1>
          <p className="subtitle">
            A modern aquaculture operations platform for pond records, feed logs,
            application logs, dashboards and AI-assisted farm insights.
          </p>
          <div className="actions">
            <a className="primaryButton" href="#next">View Roadmap</a>
            <a className="secondaryButton" href="https://github.com/gopisankuratri/sea" target="_blank" rel="noreferrer">
              GitHub Repository
            </a>
          </div>
        </div>
        <div className="brandCard">
          <span>Phase 1</span>
          <strong>Welcome Page</strong>
          <small>React + TypeScript + Netlify ready</small>
        </div>
      </section>

      <section id="next" className="cards">
        <article className="card">
          <h2>Google Sheets</h2>
          <p>Next step: read farm records from Google Sheets and display them in clean tables.</p>
        </article>
        <article className="card">
          <h2>ChatGPT Assistant</h2>
          <p>Next step: ask questions like “show today’s P1 activities” and generate summaries.</p>
        </article>
        <article className="card">
          <h2>Farm Dashboard</h2>
          <p>Next step: pond cards, active crop status, feed summary and application history.</p>
        </article>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
