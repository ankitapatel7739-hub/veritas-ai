import UploadBox from "../components/UploadBox";

function Upload() {
  return (
    <div className="upload-page">
      <div className="page-header">
        <div>
          <p className="breadcrumb">INVESTIGATION</p>
          <h1>Upload Documents</h1>
          <p className="subtitle">
            Upload multiple documents for OCR extraction and forensic analysis.
          </p>
        </div>
      </div>

      <UploadBox />

      <div className="upload-info">
        <h2>How Veritas AI analyzes your documents</h2>

        <div className="upload-steps">
          <div className="upload-step">
            <span>1</span>
            <div>
              <h3>Upload</h3>
              <p>Add multiple documents to your investigation.</p>
            </div>
          </div>

          <div className="upload-step">
            <span>2</span>
            <div>
              <h3>Extract</h3>
              <p>OCR extracts important information from each document.</p>
            </div>
          </div>

          <div className="upload-step">
            <span>3</span>
            <div>
              <h3>Analyze</h3>
              <p>Veritas AI compares documents and detects inconsistencies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;