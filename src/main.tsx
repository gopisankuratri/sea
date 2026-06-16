import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type PageKey =
  | 'welcome'
  | 'dashboard'
  | 'ponds'
  | 'feed'
  | 'applications'
  | 'water'
  | 'sampling'
  | 'inventory'
  | 'reports'
  | 'assistant'
  | 'settings';

type NavItem = {
  key: PageKey;
  label: string;
  icon: string;
  description: string;
};

const navItems: NavItem[] = [
  { key: 'welcome', label: 'Welcome', icon: '🏠', description: 'Landing page and project overview' },
  { key: 'dashboard', label: 'Dashboard', icon: '📊', description: 'Farm performance overview' },
  { key: 'ponds', label: 'Pond Management', icon: '🌊', description: 'Ponds, crop cycles and status' },
  { key: 'feed', label: 'Feed Log', icon: '🧾', description: 'Daily feed entries and summaries' },
  { key: 'applications', label: 'Application Log', icon: '🧪', description: 'Minerals, probiotics and treatments' },
  { key: 'water', label: 'Water Quality', icon: '💧', description: 'pH, DO, alkalinity and salinity records' },
  { key: 'sampling', label: 'Sampling', icon: '⚖️', description: 'ABW, survival, biomass and FCR' },
  { key: 'inventory', label: 'Inventory', icon: '📦', description: 'Feed, mineral and chemical stock' },
  { key: 'reports', label: 'Reports', icon: '📑', description: 'Exports and operational reports' },
  { key: 'assistant', label: 'AI Assistant', icon: '✨', description: 'ChatGPT-powered farm insights' },
  { key: 'settings', label: 'Settings', icon: '⚙️', description: 'Users, sheets and configuration' }
];

const roadmap = [
  { title: 'Google Sheets', text: 'Read and display farm records from Google Sheets in clean operational tables.' },
  { title: 'ChatGPT Assistant', text: 'Ask farm questions such as P1 activities today, weekly applications and pond health summaries.' },
  { title: 'Farm Dashboard', text: 'Pond cards, crop status, feed totals, application history and water quality indicators.' }
];

function App() {
  const [activePage, setActivePage] = useState<PageKey>('welcome');
  const activeItem = useMemo(() => navItems.find((item) => item.key === activePage) ?? navItems[0], [activePage]);

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brandPanel">
          <div className="logoMark">
            <span className="logoSea">SEA</span>
            <span className="logoWave" />
          </div>
          <div>
            <strong>SEA Farms</strong>
            <small>Precision Aquaculture</small>
          </div>
        </div>

        <nav className="sideNav" aria-label="SEA Farms navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={item.key === activePage ? 'navItem active' : 'navItem'}
              onClick={() => setActivePage(item.key)}
              type="button"
            >
              <span className="navIcon">{item.icon}</span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebarFooter">
          <span>Tagline</span>
          <strong>Precision Aquaculture • Sustainable Results</strong>
        </div>
      </aside>

      <main className="contentArea">
        <header className="topBar">
          <div>
            <p className="eyebrow">SEA Farms Operations</p>
            <h1>{activePage === 'welcome' ? 'Welcome to SEA Farms' : activeItem.label}</h1>
          </div>
          <div className="statusPill">Netlify Ready</div>
        </header>

        {activePage === 'welcome' ? <WelcomePage /> : <PlaceholderPage item={activeItem} />}
      </main>
    </div>
  );
}

function WelcomePage() {
  return (
    <>
      <section className="heroCard">
        <div className="heroCopy">
          <span className="sectionLabel">Modern farm operations platform</span>
          <h2>Manage pond records, feed logs, application logs and farm insights from one place.</h2>
          <p>
            This is the first branded shell for the SEA Farms web application. The next phase will connect
            Google Sheets data and add ChatGPT-assisted summaries for daily operations.
          </p>
          <div className="heroActions">
            <button type="button">Start with Dashboard</button>
            <button type="button" className="ghostButton">Review Data Model</button>
          </div>
        </div>
        <div className="summaryPanel">
          <span>Phase 1</span>
          <strong>Welcome Page + Sidebar</strong>
          <small>React • TypeScript • Netlify</small>
        </div>
      </section>

      <section className="metricGrid">
        <div className="metricCard"><span>12</span><small>Planned Ponds</small></div>
        <div className="metricCard"><span>34 ac</span><small>Farm Area</small></div>
        <div className="metricCard"><span>Sheets</span><small>Data Source</small></div>
        <div className="metricCard"><span>AI</span><small>Assistant Ready</small></div>
      </section>

      <section className="cards">
        {roadmap.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function PlaceholderPage({ item }: { item: NavItem }) {
  return (
    <section className="placeholderPage">
      <div className="placeholderIcon">{item.icon}</div>
      <h2>{item.label}</h2>
      <p>{item.description}</p>
      <div className="placeholderBox">
        <strong>Coming next</strong>
        <span>This page is reserved for the next development phase. Layout, forms and Google Sheets data will be added here.</span>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
