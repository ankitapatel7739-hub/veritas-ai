function Evidence({ selectedFinding }) {
  // If user directly clicks Evidence Review from Sidebar
  if (!selectedFinding) {
    return (
      <div className="evidence-page">
        <p className="breadcrumb">INVESTIGATION</p>

        <h1>Evidence Review</h1>

        <p className="subtitle">
          Select a finding from Investigation Results to review its evidence.
        </p>
      </div>
    );
  }

  // ===============================
  // DATE OF BIRTH CONFLICT
  // ===============================
  if (selectedFinding.type === "dob") {
    return (
      <div className="evidence-page">
        <p className="breadcrumb">INVESTIGATION</p>

        <h1>Evidence Review</h1>

        <p className="subtitle">
          Review detected inconsistencies and trace findings back to their
          original document source.
        </p>

        <div className="finding-card">
          <div>
            <p className="finding-label">FINDING</p>

            <h2>{selectedFinding.title}</h2>

            <p>{selectedFinding.description}</p>
          </div>

          <span className="risk-badge high-risk">
            {selectedFinding.risk}
          </span>
        </div>

        <div className="evidence-section">
          <h2>Extracted Information</h2>

          <div className="evidence-table">
            <div className="evidence-row evidence-header">
              <strong>Field</strong>
              <strong>ID Proof</strong>
              <strong>Application Form</strong>
            </div>

            <div className="evidence-row">
              <strong>Date of Birth</strong>
              <span>15/05/2004</span>
              <span className="conflict-text">15/05/2006</span>
            </div>
          </div>
        </div>

        <div className="evidence-section">
          <h2>Evidence Source</h2>

          <div className="source-card">
            <div>
              <strong>📄 ID Proof</strong>
              <p>Page 1 • Date of Birth field</p>
            </div>

            <strong className="verified-text">15/05/2004</strong>
          </div>

          <div className="source-card">
            <div>
              <strong>📄 Application Form</strong>
              <p>Page 1 • Personal Information</p>
            </div>

            <strong className="conflict-text">15/05/2006</strong>
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // NAME MISMATCH - ANKITA PATEL
  // ===============================
  if (selectedFinding.type === "name") {
    return (
      <div className="evidence-page">
        <p className="breadcrumb">INVESTIGATION</p>

        <h1>Evidence Review</h1>

        <p className="subtitle">
          Review detected inconsistencies and trace findings back to their
          original document source.
        </p>

        <div className="finding-card">
          <div>
            <p className="finding-label">FINDING</p>

            <h2>{selectedFinding.title}</h2>

            <p>{selectedFinding.description}</p>
          </div>

          <span className="risk-badge medium-risk">
            {selectedFinding.risk}
          </span>
        </div>

        <div className="evidence-section">
          <h2>Extracted Information</h2>

          <div className="evidence-table">
            <div className="evidence-row evidence-header">
              <strong>Field</strong>
              <strong>Application Form</strong>
              <strong>Bank Statement</strong>
            </div>

            <div className="evidence-row">
              <strong>Applicant Name</strong>
              <span>Ankita Patel</span>
              <span className="conflict-text">Ankita P.</span>
            </div>
          </div>
        </div>

        <div className="evidence-section">
          <h2>Evidence Source</h2>

          <div className="source-card">
            <div>
              <strong>📄 Application Form</strong>
              <p>Page 1 • Applicant Name</p>
            </div>

            <strong>Ankita Patel</strong>
          </div>

          <div className="source-card">
            <div>
              <strong>📄 Bank Statement</strong>
              <p>Account Holder Name</p>
            </div>

            <strong className="conflict-text">Ankita P.</strong>
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // ADDRESS VERIFIED
  // ===============================
  return (
    <div className="evidence-page">
      <p className="breadcrumb">INVESTIGATION</p>

      <h1>Evidence Review</h1>

      <p className="subtitle">
        Review verified information across all uploaded documents.
      </p>

      <div className="finding-card">
        <div>
          <p className="finding-label">FINDING</p>

          <h2>{selectedFinding.title}</h2>

          <p>{selectedFinding.description}</p>
        </div>

        <span className="risk-badge verified">
          {selectedFinding.risk}
        </span>
      </div>

      <div className="evidence-section">
        <h2>Extracted Information</h2>

        <div className="evidence-table">
          <div className="evidence-row evidence-header">
            <strong>Field</strong>
            <strong>ID Proof</strong>
            <strong>Bank Statement</strong>
          </div>

          <div className="evidence-row">
            <strong>Address</strong>
            <span>Neemrana, Rajasthan</span>
            <span className="verified-text">Neemrana, Rajasthan</span>
          </div>
        </div>
      </div>

      <div className="evidence-section">
        <h2>Verification Status</h2>

        <div className="source-card">
          <div>
            <strong>✓ Address information matches</strong>

            <p>
              The address is consistent across the available documents.
            </p>
          </div>

          <strong className="verified-text">VERIFIED</strong>
        </div>
      </div>
    </div>
  );
}

export default Evidence;