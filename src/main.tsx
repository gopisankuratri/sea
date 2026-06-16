import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { seaLogo } from './assets/seaLogo';
import { seaSecondaryLogo } from './assets/seaSecondaryLogo';
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
  { key: 'welcome',      label: 'Home',                icon: '🏠', description: 'Business overview and priorities' },
  { key: 'overview',     label: 'Operations Overview', icon: '📊', description: 'Executive view of farm performance' },
  { key: 'ponds',        label: 'Pond Portfolio',      icon: '🌊', description: 'Pond status, crop cycles and ownership' },
  { key: 'feeding',      label: 'Feed Operations',     icon: '🧾', description: 'Feed plans, usage and consumption trends' },
  { key: 'applications', label: 'Treatments & Inputs', icon: '🧪', description: 'Minerals, probiotics and pond applications' },
  { key: 'water',        label: 'Water Quality',       icon: '💧', description: 'Water parameters, alerts and trend monitoring' },
  { key: 'growth',       label: 'Growth & Sampling',   icon: '⚖️', description: 'Biomass, survival, growth and harvest readiness' },
  { key: 'inventory',    label: 'Inventory Control',   icon: '📦', description: 'Stock visibility and input availability' },
  { key: 'insights',     label: 'Insights Centre',     icon: '✨', description: 'Operational recommendations and summaries' },
  { key: 'reports',      label: 'Management Reports',  icon: '📑', description: 'Business reports and audit-ready records' },
  { key: 'admin',        label: 'Administration',      icon: '⚙️', description: 'Users, access and business configuration' },
];

const priorities = [
  { title: 'Operational Control',    text: 'Maintain a single view of pond activity, daily inputs, water condition and crop progress.' },
  { title: 'Management Visibility',  text: 'Give farm owners and managers clear visibility of performance, risks and pending actions.' },
  { title: 'Audit-Ready Records',    text: 'Standardise daily records so decisions are traceable, consistent and easy to review.' },
];

function App() {
  const [activePage, setActivePage] = useState<PageKey>('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeItem = useMemo(
    () => navItems.find((item) => item.key === activePage) ?? navItems[0],
    [activePage],
  );

  const navigate = (key: PageKey) => {
    setActivePage(key);
    // auto-close sidebar on mobile after nav
    if (window.innerWidth <= 900) setSidebarOpen(false);
  };

  return (
    <div className={sidebarOpen ? 'appShell sidebarExpanded' : 'appShell'}>

      {/* ── Sidebar ── */}
      <aside className="sidebar" aria-label="SEA Farms navigation">

        {/* Collapsed state: circular logo badge acts as toggle */}
        <div className="sidebarTop">
          <button
            className="logoToggleButton"
            type="button"
            aria-label="Expand sidebar"
            onClick={() => setSidebarOpen(true)}
            title="Expand menu"
          >
            <img className="brandLogoCompact" src={seaSecondaryLogo} alt="SEA Farms" />
          </button>
        </div>

        {/* Expanded state: full logo + collapse button */}
        <div className="brandPanel">
          <div className="brandLogoFull">
            <img src={seaLogo} alt="SEA Farms" />
          </div>
          <button
            className="sidebarToggle"
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setSidebarOpen(false)}
            title="Collapse menu"
          >
            ‹
          </button>
        </div>

        {/* Navigation */}
        <nav className="sideNav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={item.key === activePage ? 'navItem active' : 'navItem'}
              onClick={() => navigate(item.key)}
              title={!sidebarOpen ? item.label : undefined}
              type="button"
            >
              <span className="navIcon" aria-hidden="true">{item.icon}</span>
              <span className="navText">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </nav>

        {/* Footer tag */}
        <div className="sidebarFooter">
          <span>Business Focus</span>
          <strong>Precision Aquaculture · Sustainable Results</strong>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="contentArea">
        <header className="topBar">
          <div className="topBarTitle">
            <p className="eyebrow">SEA Farms Operations</p>
            <h1>
              {activePage === 'welcome'
                ? 'Aquaculture Command Centre'
                : activeItem.label}
            </h1>
          </div>
          <div className="topBarActions">
            <button
              className="mobileMenuButton"
              type="button"
              aria-label="Open menu"
              onClick={() => setSidebarOpen((o) => !o)}
            >
              ☰
            </button>
            <div className="statusPill">🟢 Live</div>
          </div>
        </header>

        {activePage === 'welcome'
          ? <WelcomePage onNavigate={navigate} />
          : <PlaceholderPage item={activeItem} />}
      </main>
    </div>
  );
}

function WelcomePage({ onNavigate }: { onNavigate: (k: PageKey) => void }) {
  return (
    <>
      <section className="heroCard">
        <div className="heroCopy">
          <img className="heroLogo" src={seaLogo} alt="SEA Farms" />
          <span className="sectionLabel">Commercial aquaculture management</span>
          <h2>Operate every pond with clarity, discipline and real-time visibility.</h2>
          <p>
            SEA Farms brings daily farm operations into a structured business platform — covering
            pond activity, feeding, applications, water quality, growth tracking, inventory and
            management reporting.
          </p>
          <div className="heroActions">
            <button type="button" onClick={() => onNavigate('overview')}>
              Open Operations Overview →
            </button>
            <button type="button" className="ghostButton" onClick={() => onNavigate('ponds')}>
              View Pond Portfolio
            </button>
          </div>
        </div>
        <div className="summaryPanel">
          <span>Operating Model</span>
          <strong>Clear records. Faster decisions. Better crop control.</strong>
          <small>Designed for commercial vannamei shrimp farm operations in Nidadavolu, West Godavari.</small>
        </div>
      </section>

      <section className="metricGrid">
        <div className="metricCard"><span>12</span><small>Active Ponds</small></div>
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
      <div className="placeholderIcon" aria-hidden="true">{item.icon}</div>
      <h2>{item.label}</h2>
      <p>{item.description}</p>
      <div className="placeholderBox">
        <strong>Module scope</strong>
        <span>
          This section will provide structured workflows, record capture, approvals, insights and
          management-ready views for the selected business area.
        </span>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
