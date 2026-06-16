import React, { useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { seaLogo } from './assets/seaLogo';
import { seaSecondaryLogo } from './assets/seaSecondaryLogo';
import './styles.css';

/* ── Types ────────────────────────────────────────── */
type PageKey =
  | 'welcome' | 'overview' | 'ponds' | 'feeding' | 'pondLog'
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
  { key: 'welcome',      label: 'Home',                icon: '🏠', description: 'Farm overview',                section: '' },
  { key: 'overview',     label: 'Operations',          icon: '📊', description: 'Farm performance view',        section: 'Operations' },
  { key: 'ponds',        label: 'Pond Portfolio',      icon: '🌊', description: 'Crop cycles and pond status',  section: 'Operations' },
  { key: 'feeding',      label: 'Feed Operations',     icon: '🧾', description: 'Feed plans, usage and trends', section: 'Operations' },
  { key: 'pondLog',      label: 'Pond Log',            icon: '📝', description: 'Open pond log AI assistant',   section: 'Operations' },
  { key: 'applications', label: 'Treatments',          icon: '🧪', description: 'Minerals and probiotics',      section: 'Operations' },
  { key: 'water',        label: 'Water Quality',       icon: '💧', description: 'Parameters and alerts',        section: 'Monitoring' },
  { key: 'growth',       label: 'Growth & Sampling',   icon: '⚖️', description: 'Biomass and harvest readiness', section: 'Monitoring' },
  { key: 'inventory',    label: 'Inventory',           icon: '📦', description: 'Stock and input availability', section: 'Management' },
  { key: 'insights',     label: 'Insights',            icon: '✨', description: 'Operational recommendations',  section: 'Management' },
  { key: 'reports',      label: 'Reports',             icon: '📑', description: 'Business and audit records',   section: 'Management' },
  { key: 'admin',        label: 'Administration',      icon: '⚙️', description: 'Users and access control',     section: 'System' },
];

const kpis = [
  { label: 'Active Ponds',        value: '12',         sub: 'P1 to P12',               badge: 'Operational', badgeType: 'green', icon: '🌊' },
  { label: 'Farm Footprint',      value: '34 acres',   sub: 'Nidadavolu, E. Godavari', badge: 'L. vannamei', badgeType: 'blue',  icon: '📍' },
  { label: 'Culture System',      value: 'Freshwater', sub: 'Earthen pond culture',    badge: 'Commercial',  badgeType: 'green', icon: '🦐' },
  { label: 'Operations Tracking', value: 'Daily',      sub: 'Feed · Water · Growth',   badge: 'Traceable',   badgeType: 'blue',  icon: '📋' },
];

const priorities = [
  { icon: '🎯', title: 'Operational Control',   body: 'Maintain one reliable view of pond activity, daily inputs, water condition and crop progress across the farm.' },
  { icon: '📈', title: 'Management Visibility', body: 'Provide farm owners and managers with clear visibility of performance, risks and pending actions.' },
  { icon: '📂', title: 'Audit-Ready Records',   body: 'Standardise daily records so operational decisions are traceable, consistent and ready for review.' },
];

const pondLogAssistantUrl = 'https://chatgpt.com/g/g-6a2fb6e4464c8191abadc81b370e725e-shrimp-pond-log-assistant';

const sidebarAlignmentOverrides = `
  .sidebarExpanded .navItem {
    justify-content: flex-start !important;
    text-align: left !important;
  }

  .sidebarExpanded .navLabel {
    align-items: flex-start !important;
    text-align: left !important;
    width: 100% !important;
  }

  .sidebarExpanded .navLabel strong,
  .sidebarExpanded .navLabel small {
    display: block !important;
    width: 100% !important;
    text-align: left !important;
  }

  .sidebarExpanded .navSection {
    text-align: left !important;
  }

  .sidebarExpanded .sidebarFooterText,
  .sidebarExpanded .sidebarFooterText span,
  .sidebarExpanded .sidebarFooterText small {
    text-align: left !important;
  }
`;

const pondLogPageStyles = `
  .pondLogPage {
    display: grid;
    gap: 20px;
  }

  .pondLogHero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 24px;
    align-items: stretch;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 8px 32px rgba(15, 28, 46, 0.08), 0 2px 8px rgba(15, 28, 46, 0.04);
  }

  .pondLogEyebrow {
    color: #0a9fad;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .pondLogHero h2 {
    color: #041f46;
    font-size: clamp(30px, 4vw, 48px);
    letter-spacing: -0.04em;
    line-height: 1.05;
    margin-bottom: 14px;
  }

  .pondLogHero h2 em {
    color: #12c4cf;
    font-style: normal;
  }

  .pondLogHero p {
    max-width: 760px;
    color: #4a5568;
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 22px;
  }

  .pondLogActions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  .pondLogPrimary,
  .pondLogSecondary {
    min-height: 44px;
    padding: 0 18px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    text-decoration: none;
  }

  .pondLogPrimary {
    color: #ffffff;
    background: #041f46;
  }

  .pondLogPrimary:hover {
    background: #0b2d5e;
  }

  .pondLogSecondary {
    color: #041f46;
    background: #ffffff;
    border: 1px solid #d9e2ec;
  }

  .pondLogPanel {
    border-radius: 22px;
    background: linear-gradient(160deg, #041f46 0%, #0e6f7e 100%);
    color: #ffffff;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 260px;
    overflow: hidden;
    position: relative;
  }

  .pondLogPanel::after {
    content: '';
    position: absolute;
    width: 210px;
    height: 210px;
    border-radius: 50%;
    right: -70px;
    bottom: -90px;
    background: rgba(18, 196, 207, 0.22);
  }

  .pondLogPanelTop {
    position: relative;
    z-index: 1;
  }

  .pondLogPanelBadge {
    width: 76px;
    height: 76px;
    border-radius: 22px;
    background: #ffffff;
    padding: 8px;
    margin-bottom: 18px;
  }

  .pondLogPanelBadge img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .pondLogPanel span {
    display: block;
    color: rgba(255,255,255,0.72);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .pondLogPanel strong {
    display: block;
    font-size: 28px;
    line-height: 1.12;
    letter-spacing: -0.04em;
  }

  .pondLogPanel small {
    position: relative;
    z-index: 1;
    color: rgba(255,255,255,0.78);
    line-height: 1.5;
  }

  .pondLogGrid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .pondLogCard {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 16px rgba(15, 28, 46, 0.06);
  }

  .pondLogCardIcon {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: #e9fbfc;
    display: grid;
    place-items: center;
    font-size: 20px;
    margin-bottom: 14px;
  }

  .pondLogCard h3 {
    color: #041f46;
    font-size: 17px;
    margin-bottom: 8px;
  }

  .pondLogCard p,
  .pondLogChecklist li {
    color: #4a5568;
    font-size: 14px;
    line-height: 1.55;
  }

  .pondLogWorkflow {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 22px;
    padding: 22px;
    box-shadow: 0 4px 16px rgba(15, 28, 46, 0.06);
  }

  .pondLogWorkflowHeader {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
  }

  .pondLogWorkflowHeader h3 {
    color: #041f46;
    font-size: 20px;
    margin-bottom: 6px;
  }

  .pondLogWorkflowHeader p {
    color: #718096;
    font-size: 14px;
    line-height: 1.5;
  }

  .pondLogSteps {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }

  .pondLogStep {
    border-radius: 16px;
    background: #f7f9fc;
    border: 1px solid #edf2f7;
    padding: 16px;
  }

  .pondLogStepNumber {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: #041f46;
    color: #ffffff;
    font-size: 13px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  .pondLogStep strong {
    display: block;
    color: #041f46;
    font-size: 14px;
    margin-bottom: 6px;
  }

  .pondLogStep small {
    color: #718096;
    line-height: 1.45;
  }

  .pondLogChecklist {
    list-style: none;
    display: grid;
    gap: 8px;
    margin-top: 10px;
  }

  .pondLogChecklist li::before {
    content: '✓';
    color: #0a9fad;
    font-weight: 900;
    margin-right: 8px;
  }

  @media (max-width: 1100px) {
    .pondLogHero,
    .pondLogGrid,
    .pondLogSteps {
      grid-template-columns: 1fr;
    }
  }
`;

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
      <style>{sidebarAlignmentOverrides}</style>
      <style>{pondLogPageStyles}</style>

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
              <span>Operations Workspace</span>
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
              {active === 'welcome' ? 'Aquaculture Operations Centre' : activeItem.label}
            </div>
          </div>
          <div className="topBarRight">
            <span className="topBarDate">{formatDate()}</span>
            <div className="topBarPill">
              <div className="topBarPillDot" />
              Farm Management
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
            : active === 'pondLog'
              ? <PondLogPage />
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
          <div className="heroEyebrow">Commercial Aquaculture Management</div>
          <h2 className="heroHeadline">
            Operate every pond with <em>clarity</em> and disciplined control.
          </h2>
          <p className="heroBody">
            SEA Farms brings daily farm operations into one structured management platform covering pond activity,
            feeding, treatments, water quality, growth tracking, inventory and management reporting.
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
          <div className="heroPanelTag">Nidadavolu · E. Godavari</div>
          <div className="heroPanelTitle">
            Freshwater Vannamei<br />Farm Operations
          </div>
          <div className="heroPanelSub">
            P1 to P12 · 34 acres · Precision aquaculture · Sustainable results
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

/* ── Pond Log Page ────────────────────────────────── */
function PondLogPage() {
  const workflow = [
    { title: 'Capture', text: 'Upload or describe daily pond activity, feed, treatment or observation notes.' },
    { title: 'Extract', text: 'Assistant converts notes into structured pond log fields for review.' },
    { title: 'Validate', text: 'Check pond, date, activity, item, quantity, unit and remarks before using the record.' },
    { title: 'Record', text: 'Use the reviewed output as the clean operational entry for farm records.' },
  ];

  return (
    <div className="pondLogPage">
      <section className="pondLogHero">
        <div>
          <div className="pondLogEyebrow">Daily pond record capture</div>
          <h2>Turn field notes and pond log images into <em>clean operational records.</em></h2>
          <p>
            The Pond Log Assistant supports daily farm documentation by helping extract pond activities,
            standardise entries and prepare review-ready records for feed, treatments, water actions,
            sampling and observations.
          </p>
          <div className="pondLogActions">
            <a className="pondLogPrimary" href={pondLogAssistantUrl} target="_blank" rel="noreferrer">
              Open Pond Log Assistant →
            </a>
            <a className="pondLogSecondary" href={pondLogAssistantUrl} target="_blank" rel="noreferrer">
              Upload Log Image
            </a>
          </div>
        </div>

        <aside className="pondLogPanel">
          <div className="pondLogPanelTop">
            <div className="pondLogPanelBadge">
              <img src={seaSecondaryLogo} alt="SEA Farms" />
            </div>
            <span>Assistant workspace</span>
            <strong>Pond activities, inputs and observations</strong>
          </div>
          <small>Designed for field-level capture and management review before records are finalised.</small>
        </aside>
      </section>

      <section className="pondLogGrid">
        <article className="pondLogCard">
          <div className="pondLogCardIcon">🧾</div>
          <h3>Supported records</h3>
          <ul className="pondLogChecklist">
            <li>Feed applications and daily pond activity</li>
            <li>Minerals, probiotics and treatment inputs</li>
            <li>Water quality notes and observations</li>
          </ul>
        </article>

        <article className="pondLogCard">
          <div className="pondLogCardIcon">✅</div>
          <h3>Review controls</h3>
          <ul className="pondLogChecklist">
            <li>Date, pond and activity type checks</li>
            <li>Quantity and unit validation</li>
            <li>Unclear values flagged for confirmation</li>
          </ul>
        </article>

        <article className="pondLogCard">
          <div className="pondLogCardIcon">📂</div>
          <h3>Output format</h3>
          <ul className="pondLogChecklist">
            <li>Clean table format for business review</li>
            <li>Standard activity categories</li>
            <li>Traceable remarks for audit readiness</li>
          </ul>
        </article>
      </section>

      <section className="pondLogWorkflow">
        <div className="pondLogWorkflowHeader">
          <div>
            <h3>Recommended operating flow</h3>
            <p>Use this page as the entry point for daily pond log capture and review.</p>
          </div>
          <a className="pondLogSecondary" href={pondLogAssistantUrl} target="_blank" rel="noreferrer">
            Open Assistant
          </a>
        </div>

        <div className="pondLogSteps">
          {workflow.map((step, index) => (
            <div className="pondLogStep" key={step.title}>
              <div className="pondLogStepNumber">{index + 1}</div>
              <strong>{step.title}</strong>
              <small>{step.text}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── Placeholder Page ─────────────────────────────── */
function PlaceholderPage({ item }: { item: NavItem }) {
  return (
    <div className="placeholderWrap">
      <div className="placeholderInner">
        <div className="placeholderBadge" aria-hidden="true">{item.icon}</div>
        <h2>{item.label}</h2>
        <p>{item.description} — this module will support structured business workflows within the SEA Farms platform.</p>
        <div className="placeholderBox">
          <strong>Module scope</strong>
          <span>
            Structured workflows, record capture, review controls, operational insights and management-ready views
            will be available for this business area.
          </span>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);