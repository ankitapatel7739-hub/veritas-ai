function Home() {
  return (
    <div className="home">
      <div className="page-header">
        <div>
          <p className="breadcrumb">OVERVIEW</p>
          <h1>Investigation Dashboard</h1>
          <p className="subtitle">
            Analyze documents, detect inconsistencies, and review evidence.
          </p>
        </div>

        <button className="primary-button">
          + New Investigation
        </button>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <p>Total Investigations</p>
          <h2>12</h2>
          <span>Active cases</span>
        </div>

        <div className="stat-card">
          <p>Documents Processed</p>
          <h2>48</h2>
          <span>Across all investigations</span>
        </div>

        <div className="stat-card warning-card">
          <p>Potential Anomalies</p>
          <h2>7</h2>
          <span>Requires review</span>
        </div>

        <div className="stat-card danger-card">
          <p>High Risk Findings</p>
          <h2>3</h2>
          <span>Immediate attention</span>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Start an Investigation</h2>
            <p>
              Upload multiple documents and let Veritas AI identify
              inconsistencies and suspicious patterns.
            </p>
          </div>
        </div>

        <div className="investigation-banner">
          <div>
            <h2>Document Intelligence & Forensics</h2>
            <p>
              Compare information across documents, detect anomalies,
              and trace every finding back to its source.
            </p>

            <button className="primary-button">
              Upload Documents
            </button>
          </div>

          <div className="shield-icon">🛡️</div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Recent Investigations</h2>

        <div className="recent-table">
          <div className="recent-row header-row">
            <span>INVESTIGATION</span>
            <span>DOCUMENTS</span>
            <span>FINDINGS</span>
            <span>STATUS</span>
          </div>

          <div className="recent-row">
            <span>Identity Verification Case</span>
            <span>3 Files</span>
            <span>2</span>
            <span className="high-risk">High Risk</span>
          </div>

          <div className="recent-row">
            <span>Loan Application Review</span>
            <span>4 Files</span>
            <span>1</span>
            <span className="under-review">Under Review</span>
          </div>

          <div className="recent-row">
            <span>Document Verification</span>
            <span>2 Files</span>
            <span>0</span>
            <span className="verified">Verified</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;