import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { seaLogo } from './assets/seaLogo';
import './styles.css';

type PageKey =
  | 'welcome'
  | 'overview'
  | 'ponds'
  | 'feeding'
  | 'applications'
  | 'water'
  | 'growth'
  | 'inventory'
  | 'insights'
  | 'reports'
  | 'admin';

type NavItem = {
  key: PageKey;
  label: string;
  icon: string;
  description: string;
};

const navItems: NavItem[] = [
  { key: 'welcome', label: 'Home', icon: '🏠', description: 'Business overview and priorities' },
  { key: 'overview', label: 'Operations Overview', icon: '📊', description: 'Executive view of farm performance' },
  { key: 'ponds', label: 'Pond Portfolio', icon: '🌊', description: 'Pond status, crop cycles and ownership' },
  { key: 'feeding', label: 'Feed Operations', icon: '🧾', description: 'Feed plans, usage and consumption trends' },
  { key: 'applications', label: 'Treatments & Inputs', icon: '🧪', description: 'Minerals, probiotics and pond applications' },
  { key: 'water', label: 'Water Quality', icon: '💧', description: 'Water parameters, alerts and trend monitoring' },
  { key: 'growth', label: 'Growth & Sampling', icon: '⚖️', description: 'Biomass, survival, growth and harvest readiness' },
  { key: 'inventory', label: 'Inventory Control', icon: '📦', description: 'Stock visibility and input availability' },
  { key: 'insights', label: 'Insights Centre', icon: '✨', description: 'Operational recommendations and summaries' },
  { key: 'reports', label: 'Management Reports', icon: '📑', description: 'Business reports and audit-ready records' },
  { key: 'admin', label: 'Administration', icon: '⚙️', description: 'Users, access and business configuration' }
];

const priorities = [
  { title: 'Operational Control', text: 'Maintain a single view of pond activity, daily inputs, water condition and crop progress.' },
  { title: 'Management Visibility', text: 'Give farm owners and managers clear visibility of performance, risks and pending actions.' },
  { title: 'Audit-Ready Records', text: 'Standardise daily records so decisions are traceable, consistent and easy to review.' }
];

function App() {
  const [activePage, setActivePage] = useState<PageKey>('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeItem = useMemo(() => navItems.find((item) => item.key === activePage) ?? navItems[0], [activePage]);

  return (
    <div className={sidebarOpen ? 'appShell sidebarExpanded' : 'appShell'}>
      <aside className="sidebar" aria-label="SEA Farms sidebar">
        <div className="sidebarTop">
          <button
            className="sidebarToggle"
            type="button"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            ☰
          </button>
          <img className="brandLogoCompact" src={seaLogo} alt="SEA Farms" />
        </div>

        <div className="brandPanel">
          <img className="brandLogo" src={seaLogo} alt="SEA Farms" />
          <div className="brandText">
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
              title={item.label}
              type="button"
            >
              <span className="navIcon">{item.icon}</span>
              <span className="navText">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebarFooter">
          <span>Business Focus</span>
          <strong>Precision Aquaculture • Sustainable Results</strong>
        </div>
      </aside>

      <main className="contentArea">
        <header className="topBar">
          <div className="topBarTitle">
            <p className="eyebrow">SEA Farms Operations</p>
            <h1>{activePage === 'welcome' ? 'Aquaculture Operations Command Centre' : activeItem.label}</h1>
          </div>
          <div className="topBarActions">
            <button className="mobileMenuButton" type="button" onClick={() => setSidebarOpen((open) => !open)}>
              ☰
            </button>
            <div className="statusPill">Production Preview</div>
          </div>
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
          <img className="heroLogo" src={seaLogo} alt="SEA Farms" />
          <span className="sectionLabel">Commercial aquaculture management</span>
          <h2>Operate every pond with clarity, discipline and real-time business visibility.</h2>
          <p>
            SEA Farms brings daily farm operations into a structured business platform covering pond activity,
            feeding, applications, water quality, growth tracking, inventory and management reporting.
          </p>
          <div className="heroActions">
            <button type="button">Open Operations Overview</button>
            <button type="button" className="ghostButton">Review Farm Modules</button>
          </div>
        </div>
        <div className="summaryPanel">
          <span>Operating Model</span>
          <strong>Clear records. Faster decisions. Better crop control.</strong>
          <small>Designed for commercial shrimp farm operations</small>
        </div>
      </section>

      <section className="metricGrid">
        <div className="metricCard"><span>12</span><small>Pond Portfolio</small></div>
        <div className="metricCard"><span>34 ac</span><small>Farm Footprint</small></div>
        <div className="metricCard"><span>Daily</span><small>Operations Tracking</small></div>
        <div className="metricCard"><span>360°</span><small>Management View</small></div>
      </section>

      <section className="cards">
        {priorities.map((item) => (
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
        <strong>Module scope</strong>
        <span>This section will provide structured workflows, record capture, approvals, insights and management-ready views for the selected business area.</span>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
