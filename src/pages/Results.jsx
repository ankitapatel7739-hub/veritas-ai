function Results({ setActivePage, setSelectedFinding }) {

  const openEvidence = (finding) => {
    setSelectedFinding(finding);
    setActivePage("evidence");
  };

  return (
    <div className="results-page">

      <div className="page-title">
        <p>INVESTIGATION</p>
        <h1>Investigation Results</h1>
        <span>
          Review inconsistencies and suspicious patterns detected in documents.
        </span>
      </div>

      {/* DATE OF BIRTH */}
      <div className="result-card">
        <div className="result-card-top">

          <div>
            <h2>Date of Birth Conflict</h2>
            <p>
              Different dates of birth were detected across the uploaded documents.
            </p>
          </div>

          <span className="risk-badge high-risk">
            High Risk
          </span>

        </div>

        <div className="result-document">
          <strong>Documents:</strong> ID Proof vs Application Form
        </div>

        <button
          className="view-evidence-btn"
          onClick={() =>
            openEvidence({
              type: "dob",
              title: "Date of Birth Conflict",
              description:
                "Different dates of birth were detected across the uploaded documents.",
              risk: "High Risk",
            })
          }
        >
          View Evidence →
        </button>
      </div>


      {/* NAME MISMATCH */}
      <div className="result-card">
        <div className="result-card-top">

          <div>
            <h2>Name Mismatch</h2>
            <p>
              A possible variation in the applicant's name was detected.
            </p>
          </div>

          <span className="risk-badge medium-risk">
            Medium Risk
          </span>

        </div>

        <div className="result-document">
          <strong>Documents:</strong> Application Form vs Bank Statement
        </div>

        <button
          className="view-evidence-btn"
          onClick={() =>
            openEvidence({
              type: "name",
              title: "Name Mismatch",
              description:
                "A possible variation in the applicant's name was detected.",
              risk: "Medium Risk",
            })
          }
        >
          View Evidence →
        </button>
      </div>


      {/* ADDRESS VERIFIED */}
      <div className="result-card">
        <div className="result-card-top">

          <div>
            <h2>Address Verified</h2>
            <p>
              The address information is consistent across all documents.
            </p>
          </div>

          <span className="risk-badge verified">
            Verified
          </span>

        </div>

        <div className="result-document">
          <strong>Documents:</strong> All Documents
        </div>

        <button
          className="view-evidence-btn"
          onClick={() =>
            openEvidence({
              type: "address",
              title: "Address Verified",
              description:
                "The address information is consistent across all documents.",
              risk: "Verified",
            })
          }
        >
          View Evidence →
        </button>
      </div>

    </div>
  );
}

export default Results;