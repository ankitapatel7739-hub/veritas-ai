function Dossier() {
  return (
    <div className="dossier-page">
      <div className="page-title">
        <p className="breadcrumb">INVESTIGATION</p>
        <h1>Investigation Dossier</h1>
        <p className="subtitle">
          Complete overview of the investigation and all findings.
        </p>
      </div>

      <div className="dossier-summary">
        <div className="dossier-card">
          <p>Investigation ID</p>
          <h2>VER-2026-001</h2>
        </div>

        <div className="dossier-card">
          <p>Documents</p>
          <h2>9</h2>
        </div>

        <div className="dossier-card">
          <p>Total Findings</p>
          <h2>7</h2>
        </div>

        <div className="dossier-card">
          <p>Risk Level</p>
          <h2 className="risk-text">High</h2>
        </div>
      </div>

      <div className="dossier-section">
        <h2>Investigation Summary</h2>

        <div className="summary-box">
          <p>
            Veritas AI analyzed the uploaded documents and identified several
            inconsistencies requiring further investigation.
          </p>

          <div className="summary-item">
            <span>Date of Birth Conflict</span>
            <strong className="high-risk">High Risk</strong>
          </div>

          <div className="summary-item">
            <span>Name Mismatch</span>
            <strong className="medium-risk">Medium Risk</strong>
          </div>

          <div className="summary-item">
            <span>Address Verification</span>
            <strong className="verified">Verified</strong>
          </div>
        </div>
      </div>

      <div className="dossier-section">
        <h2>Documents Included</h2>

        <div className="document-list">
          <div className="document-item">
            <span>📄</span>
            <div>
              <strong>Identity Proof.pdf</strong>
              <p>Processed successfully</p>
            </div>
          </div>

          <div className="document-item">
            <span>📄</span>
            <div>
              <strong>Application Form.pdf</strong>
              <p>Processed successfully</p>
            </div>
          </div>

          <div className="document-item">
            <span>📄</span>
            <div>
              <strong>Bank Statement.pdf</strong>
              <p>Processed successfully</p>
            </div>
          </div>
        </div>
      </div>

      <button className="primary-button">
        Download Investigation Report
      </button>
    </div>
  );
}

export default Dossier;