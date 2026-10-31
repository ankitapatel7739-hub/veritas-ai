import {
  LayoutDashboard,
  FolderOpen,
  FileSearch,
  AlertTriangle,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  ShieldCheck,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

import "./App.css";

function App() {
  const investigations = [
    {
      name: "Identity Verification Case",
      documents: 3,
      status: "High Risk",
      findings: 2,
    },
    {
      name: "Loan Application Review",
      documents: 4,
      status: "Under Review",
      findings: 1,
    },
    {
      name: "Document Verification",
      documents: 2,
      status: "Verified",
      findings: 0,
    },
  ];

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h2>Veritas AI</h2>
            <span>DOCUMENT FORENSICS</span>
          </div>
        </div>

        <nav className="nav-menu">
          <a className="nav-item active" href="#">
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a className="nav-item" href="#">
            <FolderOpen size={20} />
            Investigations
          </a>

          <a className="nav-item" href="#">
            <FileSearch size={20} />
            Document Analysis
          </a>

          <a className="nav-item" href="#">
            <AlertTriangle size={20} />
            Findings
          </a>

          <a className="nav-item" href="#">
            <FileText size={20} />
            Reports
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a className="nav-item" href="#">
            <Settings size={20} />
            Settings
          </a>

          <div className="user-card">
            <div className="avatar">AA</div>

            <div>
              <strong>Abhishek</strong>
              <span>Investigator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="header">
          <div>
            <p className="breadcrumb">Overview</p>
            <h1>Investigation Dashboard</h1>
          </div>

          <div className="header-actions">
            <button className="icon-button">
              <Search size={20} />
            </button>

            <button className="icon-button notification">
              <Bell size={20} />
              <span></span>
            </button>

            <button className="new-case-btn">
              <Plus size={19} />
              New Investigation
            </button>
          </div>
        </header>

        {/* STATISTICS */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FolderOpen size={23} />
            </div>

            <div>
              <p>Total Investigations</p>
              <h2>12</h2>
              <span className="positive">+2 this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <FileText size={23} />
            </div>

            <div>
              <p>Documents Processed</p>
              <h2>48</h2>
              <span className="positive">+8 this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <AlertTriangle size={23} />
            </div>

            <div>
              <p>Potential Anomalies</p>
              <h2>7</h2>
              <span className="warning">Requires review</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">
              <ShieldCheck size={23} />
            </div>

            <div>
              <p>High Risk Findings</p>
              <h2>3</h2>
              <span className="danger">Immediate attention</span>
            </div>
          </div>
        </section>

        {/* RECENT INVESTIGATIONS */}
        <section className="content-section">
          <div className="section-header">
            <div>
              <h2>Recent Investigations</h2>
              <p>Monitor and review your latest document analysis cases.</p>
            </div>

            <button className="view-all">
              View All <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="investigation-table">
            <div className="table-header">
              <span>INVESTIGATION</span>
              <span>DOCUMENTS</span>
              <span>FINDINGS</span>
              <span>STATUS</span>
              <span>ACTION</span>
            </div>

            {investigations.map((item, index) => (
              <div className="table-row" key={index}>
                <div className="investigation-name">
                  <div className="file-icon">
                    <FileText size={20} />
                  </div>

                  <div>
                    <strong>{item.name}</strong>
                    <p>Case ID: VA-2026-00{index + 1}</p>
                  </div>
                </div>

                <span>{item.documents} Files</span>
                <span>{item.findings}</span>

                <span
                  className={`status ${
                    item.status === "High Risk"
                      ? "high-risk"
                      : item.status === "Verified"
                        ? "verified"
                        : "review"
                  }`}
                >
                  {item.status}
                </span>

                <button className="more-button">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="quick-actions">
          <div className="quick-card primary-card">
            <div>
              <p>Start a New Case</p>
              <h2>Analyze Multiple Documents with AI</h2>

              <span>
                Upload documents and detect inconsistencies, anomalies and
                suspicious patterns.
              </span>

              <button>
                <Plus size={18} />
                Create Investigation
              </button>
            </div>

            <ShieldCheck size={100} className="big-shield" />
          </div>

          <div className="quick-card activity-card">
            <h3>System Activity</h3>

            <div className="activity">
              <div className="activity-dot blue-dot"></div>
              <div>
                <strong>OCR Engine Ready</strong>
                <p>Document extraction service is online.</p>
              </div>
            </div>

            <div className="activity">
              <div className="activity-dot orange-dot"></div>
              <div>
                <strong>AI Analysis Active</strong>
                <p>Cross-document intelligence enabled.</p>
              </div>
            </div>

            <div className="activity">
              <div className="activity-dot green-dot"></div>
              <div>
                <strong>Evidence System Ready</strong>
                <p>Findings can be traced to source documents.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;