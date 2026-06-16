import React, { useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { seaLogo } from './assets/seaLogo';
import { seaSecondaryLogo } from './assets/seaSecondaryLogo';
import './styles.css';

/* ── Types ────────────────────────────────────────── */
type PageKey =
  | 'welcome' | 'overview' | 'ponds' | 'feeding'
  | 'applications' | 'water' | 'growth' | 'inventory'
  | 'insights' | 'reports' | 'admin';

interface NavItem {
  key: PageKey;
  label: string;
  icon: string;
  description: string;
  section: string;
}

/* ── Nav Config ───────────────────────────────────── */
const navItems: NavItem[] = [
  { key: 'welcome',      label: 'Home',                icon: '🏠', description: 'Farm overview',              section: '' },
  { key: 'overview',     label: 'Operations',          icon: '📊', description: 'Live farm performance',      section: 'Operations' },
  { key: 'ponds',        label: 'Pond Portfolio',      icon: '🌊', description: 'Crops & pond status',        section: 'Operations' },
  { key: 'feeding',      label: 'Feed Operations',     icon: '🧾', description: 'Plans, usage & trends',      section: 'Operations' },
  { key: 'applications', label: 'Treatments',          icon: '🧪', description: 'Minerals & probiotics',      section: 'Operations' },
  { key: 'water',        label: 'Water Quality',       icon: '💧', description: 'Parameters & alerts',        section: 'Monitoring' },
  { key: 'growth',       label: 'Growth & Sampling',   icon: '⚖️', description: 'Biomass & harvest readiness', section: 'Monitoring' },
  { key: 'inventory',    label: 'Inventory',           icon: '📦', description: 'Stock & inputs',             section: 'Management' },
  { key: 'insights',     label: 'Insights',            icon: '✨', description: 'AI recommendations',         section: 'Management' },
  { key: 'reports',      label: 'Reports',             icon: '📑', description: 'Business & audit records',   section: 'Management' },
  { key: 'admin',        label: 'Administration',      icon: '⚙️', description: 'Users & configuration',      section: 'System' },
];

const kpis = [
  { label: 'Active Ponds',    value: '5',      sub: 'T1 – T5 biofloc',       badge: 'Operational',  badgeType: 'green', icon: '🌊' },
  { label: 'Farm Footprint',  value: '34 ac',  sub: 'Nidadavolu, W. Godavari', badge: 'L. vannamei', badgeType: 'blue',  icon: '📍' },
  { label: 'Cycle Stage',     value: 'DOC 42', sub: 'Current crop cycle',    badge: 'Active',       badgeType: 'green', icon: '📅' },
  { label: 'Today\'s Track',  value: 'Daily',  sub: 'Feed · Water · Growth', badge: 'Live sync',   badgeType: 'blue',  icon: '📋' },
];

const priorities = [
  { icon: '🎯', title: 'Operational Control',   body: 'Single view of pond activity, daily inputs, water condition and crop progress across all biofloc tanks.' },
  { icon: '📈', title: 'Management Visibility', body: 'Farm owners and managers get clear visibility of performance, risks and pending actions in real time.' },
  { icon: '📂', title: 'Audit-Ready Records',   body: 'Standardised daily records ensure decisions are traceable, consistent and ready for review or certification.' },
];

/* ── Date helper ──────────────────────────────────── */
function formatDate() {
  return new Date().toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/* ── App ──────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState<PageKey>('welcome');
  const [open, setOpen] = useState(false);
  const activeItem = useMemo(() => navItems.find(n => n.key === active)!, [active]);

  // Group navItems by section
  const sections = useMemo(() => {
    const map = new Map<string, NavItem[]>();
    navItems.forEach(item => {
      const s = item.section;
      if (!map.has(s)) map.set(s, []);
      map.get(s)!.push(item);
    });
    return map;
  }, []);

  const navigate = (key: PageKey) => {
    setActive(key);
    if (window.innerWidth <= 768) setOpen(false);
  };

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !sidebar.contains(e.target as Node)) setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className={open ? 'appShell sidebarExpanded' : 'appShell'}>

      {/* ── Sidebar ── */}
      <aside className="sidebar" aria-label="SEA Farms navigation">

        {/* Top / Logo */}
        <div className="sidebarTop">
          {/* Collapsed: circular badge */}
          <div className="logoCollapsed">
            <button
              className="logoCollapsedBtn"
              onClick={() => setOpen(true)}
              title="Expand menu"
              aria-label="Expand navigation"
            >
              <img src={seaSecondaryLogo} alt="SEA Farms" />
            </button>
          </div>

          {/* Expanded: full wordmark + collapse */}
          <div className="logoExpanded">
            <div className="logoFullWrap">
              <img src={seaLogo} alt="SEA Farms" />
            </div>
            <button
              className="collapseBtn"
              onClick={() => setOpen(false)}
              title="Collapse menu"
              aria-label="Collapse navigation"
            >
              ‹
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sideNav" aria-label="Main navigation">
          {Array.from(sections.entries()).map(([section, items]) => (
            <React.Fragment key={section}>
              {section && <div className="navSection">{section}</div>}
              {items.map(item => (
                <button
                  key={item.key}
                  className={item.key === active ? 'navItem active' : 'navItem'}
                  onClick={() => navigate(item.key)}
                  title={!open ? item.label : undefined}
                  type="button"
                  aria-current={item.key === active ? 'page' : undefined}
                >
                  <span className="navIcon" aria-hidden="true">{item.icon}</span>
                  <span className="navLabel">
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebarFooter">
          <div className="sidebarFooterInner">
            <div className="sidebarFooterDot" aria-hidden="true" />
            <div className="sidebarFooterText">
              <span>Systems Operational</span>
              <small>Precision Aquaculture · Sustainable Results</small>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="contentArea">
        {/* Top bar */}
        <header className="topBar">
          <div className="topBarLeft">
            <div className="topBarEyebrow">SEA Farms Operations</div>
            <div className="topBarTitle">
              {active === 'welcome' ? 'Aquaculture Command Centre' : activeItem.label}
            </div>
          </div>
          <div className="topBarRight">
            <span className="topBarDate">{formatDate()}</span>
            <div className="topBarPill">
              <div className="topBarPillDot" />
              All Systems Live
            </div>
            <button
              className="mobileMenuBtn"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              ☰
            </button>
          </div>
        </header>

        {/* Page */}
        <main className="pageContent">
          {active === 'welcome'
            ? <WelcomePage onNavigate={navigate} />
            : <PlaceholderPage item={activeItem} />
          }
        </main>
      </div>
    </div>
  );
}

/* ── Welcome Page ─────────────────────────────────── */
function WelcomePage({ onNavigate }: { onNavigate: (k: PageKey) => void }) {
  return (
    <>
      {/* Hero */}
      <div className="heroBlock">
        <div className="heroCopy">
          <img className="heroLogoImg" src={seaLogo} alt="SEA Farms" />
          <div className="heroEyebrow">Commercial Aquaculture Management</div>
          <h2 className="heroHeadline">
            Operate every pond with <em>clarity</em> and real-time control.
          </h2>
          <p className="heroBody">
            SEA Farms brings daily farm operations into one structured platform — pond activity,
            feeding, treatments, water quality, growth tracking and management reporting, all in one place.
          </p>
          <div className="heroActions">
            <button className="btnPrimary" onClick={() => onNavigate('overview')}>
              Open Operations →
            </button>
            <button className="btnGhost" onClick={() => onNavigate('ponds')}>
              View Pond Portfolio
            </button>
          </div>
        </div>
        <div className="heroPanel">
          <div className="heroPanelWave" aria-hidden="true" />
          <div className="heroPanelBadge">
            <img src={seaSecondaryLogo} alt="" aria-hidden="true" />
          </div>
          <div className="heroPanelTag">Nidadavolu · West Godavari · AP</div>
          <div className="heroPanelTitle">
            Freshwater L. vannamei<br />Biofloc System
          </div>
          <div className="heroPanelSub">
            5 pond tanks · Precision aquaculture · Sustainable results
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpiRow">
        {kpis.map(k => (
          <div className="kpiCard" key={k.label}>
            <div className="kpiIcon" aria-hidden="true">{k.icon}</div>
            <div className="kpiLabel">{k.label}</div>
            <div className="kpiValue">{k.value}</div>
            <div className="kpiSub">{k.sub}</div>
            <div className={`kpiBadge ${k.badgeType}`}>{k.badge}</div>
          </div>
        ))}
      </div>

      {/* Priority Cards */}
      <div className="cardGrid">
        {priorities.map(p => (
          <div className="card" key={p.title}>
            <div className="cardIcon" aria-hidden="true">{p.icon}</div>
            <div className="cardTitle">{p.title}</div>
            <div className="cardBody">{p.body}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Placeholder Page ─────────────────────────────── */
function PlaceholderPage({ item }: { item: NavItem }) {
  return (
    <div className="placeholderWrap">
      <div className="placeholderInner">
        <div className="placeholderBadge" aria-hidden="true">{item.icon}</div>
        <h2>{item.label}</h2>
        <p>{item.description} — this module is being built out as part of the SEA Farms platform.</p>
        <div className="placeholderBox">
          <strong>Coming next</strong>
          <span>
            Structured workflows, record capture, approvals, AI insights and management-ready views
            for this business area will be available in the next release.
          </span>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
