function ResultCard({
  title,
  description,
  documents,
  risk,
  riskClass,
  onViewEvidence,
}) {
  return (
    <div className="result-card">
      <div className="result-card-top">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <span className={`risk-badge ${riskClass}`}>
          {risk}
        </span>
      </div>

      <div className="result-document">
        <strong>Documents:</strong> {documents}
      </div>

      <button
        className="view-evidence-btn"
        onClick={onViewEvidence}
      >
        View Evidence →
      </button>
    </div>
  );
}

export default ResultCard;