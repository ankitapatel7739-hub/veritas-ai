import { useState } from "react";

function UploadBox() {
  const [files, setFiles] = useState([]);

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, fileIndex) => fileIndex !== index));
  };

  return (
    <div className="upload-container">
      <label className="upload-box">
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFiles}
          hidden
        />

        <div className="upload-icon">📄</div>

        <h2>Drop your documents here</h2>

        <p>
          Click to select multiple documents for investigation.
        </p>

        <span className="browse-button">Browse Files</span>

        <small>Supported: PDF, JPG, JPEG, PNG</small>
      </label>

      {files.length > 0 && (
        <div className="file-list">
          <h3>Selected Documents ({files.length})</h3>

          {files.map((file, index) => (
            <div className="file-item" key={index}>
              <div>
                <strong>📄 {file.name}</strong>
                <p>{(file.size / 1024).toFixed(1)} KB</p>
              </div>

              <button onClick={() => removeFile(index)}>
                Remove
              </button>
            </div>
          ))}

          <button className="primary-button start-button">
            Start Investigation →
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadBox;