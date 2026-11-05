import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ApplicationStatus.css";

function ApplicationStatus() {
  const navigate = useNavigate();

  const [deedFile, setDeedFile] = useState(null);
  const [mapFixed, setMapFixed] = useState(false);
  const [showMapEditor, setShowMapEditor] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 });
  const [submitted, setSubmitted] = useState(false);

  const approvedItems = [
    "Owner CNIC",
    "Business licence",
    "NTN certificate",
    "Bank account",
    "24 photos & 3 halls",
  ];

  const handleUpload = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setDeedFile(file);
    }
  };

  const handleMapClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setPinPosition({
      x: Math.min(95, Math.max(5, x)),
      y: Math.min(95, Math.max(5, y)),
    });
  };

  const handleSavePin = () => {
    setMapFixed(true);
    setShowMapEditor(false);
  };

  const handleSubmit = () => {
    if (!deedFile || !mapFixed) return;

    setSubmitted(true);
  };

  return (
    <div className="status-page">
      {/* Header */}
      <header className="status-header">
        <div className="status-brand">
          <div className="status-brand-icon">♛</div>

          <div className="status-brand-text">
            <h2>Crown Elite</h2>
            <span>HALL PARTNER</span>
          </div>
        </div>

        <div className="status-header-actions">
          <span className="saved-status">
            <span className="saved-check">✓</span>
            Saved just now
          </span>

          <button
            type="button"
            className="save-exit-btn"
            onClick={() => navigate("/documents")}
          >
            Save &amp; exit
          </button>
        </div>
      </header>

      <main className="status-main">
        {submitted ? (
          <section className="submission-success">
            <div className="success-icon">✓</div>
            <h1>Application sent for review</h1>
            <p>
              Your corrections have been submitted. Our team will review the
              updated documents and hall location.
            </p>

            <button
              type="button"
              className="success-back-btn"
              onClick={() => navigate("/documents")}
            >
              Back to documents
            </button>
          </section>
        ) : (
          <>
            {/* Page heading */}
            <section className="status-intro">
              <span className="status-badge">
                <span className="badge-dot"></span>
                Changes requested
              </span>

              <h1>Almost there — 2 things to fix</h1>

              <p>
                Our team reviewed your application on 12 Nov. Fix the items
                below and send it back. Everything else is saved.
              </p>
            </section>

            {/* Application progress */}
            <section className="progress-card">
              <div className="progress-step completed">
                <div className="step-icon">✓</div>
                <h3>Submitted</h3>
                <p>10 Nov</p>
              </div>

              <div className="progress-line completed-line"></div>

              <div className="progress-step completed">
                <div className="step-icon">✓</div>
                <h3>Under review</h3>
                <p>11 Nov</p>
              </div>

              <div className="progress-line completed-line"></div>

              <div className="progress-step current">
                <div className="step-icon">✎</div>
                <h3>Changes requested</h3>
                <p>12 Nov</p>
              </div>

              <div className="progress-line"></div>

              <div className="progress-step pending">
                <div className="step-icon">♢</div>
                <h3>Approved</h3>
                <p>—</p>
              </div>
            </section>

            {/* Items to fix */}
            <section className="fix-card">
              <h2>What to fix</h2>

              {/* Ownership deed */}
              <div className="fix-item">
                <div className="warning-icon">⚠</div>

                <div className="fix-content">
                  <h3>Ownership deed is not readable</h3>

                  <p>
                    The photo is blurry on page 2. Please upload a clearer scan
                    or PDF.
                  </p>

                  {deedFile && (
                    <div className="selected-file">
                      <span>✓</span>
                      {deedFile.name}
                    </div>
                  )}
                </div>

                <label className="fix-action-btn upload-label">
                  {deedFile ? "Change file" : "Upload again"}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleUpload}
                  />
                </label>
              </div>

              {/* Map pin */}
              <div className="fix-item">
                <div className="warning-icon">⚠</div>

                <div className="fix-content">
                  <h3>Map pin doesn’t match the address</h3>

                  <p>
                    Your pin is about 1.4 km from “Main Boulevard, Gulberg
                    III”. Drag it to the hall entrance.
                  </p>

                  {mapFixed && (
                    <div className="selected-file">
                      <span>✓</span>
                      Hall location updated
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="fix-action-btn"
                  onClick={() => setShowMapEditor(true)}
                >
                  {mapFixed ? "Edit map pin" : "Fix map pin"}
                </button>
              </div>
            </section>

            {/* Already approved */}
            <section className="approved-card">
              <h2>Already approved</h2>

              <ul>
                {approvedItems.map((item) => (
                  <li key={item}>
                    <span className="approved-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Submit button */}
            <button
              type="button"
              className={`send-review-btn ${
                deedFile && mapFixed ? "enabled" : ""
              }`}
              disabled={!deedFile || !mapFixed}
              onClick={handleSubmit}
            >
              Send back for review
            </button>

            <p className="review-hint">
              {!deedFile || !mapFixed
                ? "Complete both corrections to send your application back for review."
                : "Both corrections are ready. You can now send your application for review."}
            </p>
          </>
        )}
      </main>

      {/* Map pin editor modal */}
      {showMapEditor && (
        <div
          className="map-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowMapEditor(false);
            }
          }}
        >
          <div
            className="map-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-modal-title"
          >
            <div className="map-modal-heading">
              <div>
                <h2 id="map-modal-title">Fix your hall location</h2>
                <p>Click the map to place the pin at your hall entrance.</p>
              </div>

              <button
                type="button"
                className="map-close-btn"
                onClick={() => setShowMapEditor(false)}
                aria-label="Close map editor"
              >
                ×
              </button>
            </div>

            <div
              className="mock-map"
              onClick={handleMapClick}
              role="button"
              tabIndex={0}
              aria-label="Select hall location on the map"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setPinPosition({ x: 50, y: 50 });
                }
              }}
            >
              <div className="map-road road-one"></div>
              <div className="map-road road-two"></div>
              <div className="map-road road-three"></div>
              <div className="map-park">GULBERG PARK</div>
              <div className="map-label map-label-one">Main Boulevard</div>
              <div className="map-label map-label-two">Gulberg III</div>

              <div
                className="map-pin"
                style={{
                  left: `${pinPosition.x}%`,
                  top: `${pinPosition.y}%`,
                }}
              >
                <span>📍</span>
              </div>
            </div>

            <p className="map-instruction">
              This is a demo map area. Select the approximate entrance
              location, then save your pin.
            </p>

            <div className="map-modal-actions">
              <button
                type="button"
                className="map-cancel-btn"
                onClick={() => setShowMapEditor(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="map-save-btn"
                onClick={handleSavePin}
              >
                Save map pin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationStatus;