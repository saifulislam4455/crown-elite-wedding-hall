import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ApprovedPage.css";

function ApprovedPage() {
  const navigate = useNavigate();

  const [showSetup, setShowSetup] = useState("");
  const [lunchTime, setLunchTime] = useState("12:00 PM - 3:00 PM");
  const [dinnerTime, setDinnerTime] = useState("7:00 PM - 11:00 PM");

  const [price, setPrice] = useState("2500");
  const [weekendPrice, setWeekendPrice] = useState("3500");
  const [packageName, setPackageName] = useState("Wedding Package");

  const [policy, setPolicy] = useState("Moderate");

  const [completed, setCompleted] = useState({
    timings: true,
    prices: false,
    cancellation: false,
  });

  const completedCount = Object.values(completed).filter(Boolean).length;
  const allComplete = completedCount === 3;

  const handleSaveSetup = (event) => {
    event.preventDefault();

    setCompleted((previous) => ({
      ...previous,
      [showSetup]: true,
    }));

    setShowSetup("");
  };

  const handleDashboard = () => {
    if (allComplete) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="approved-page">
      {/* Header */}
      <header className="approved-header">
        <div className="approved-brand">
          <div className="approved-brand-icon">♛</div>

          <div className="approved-brand-text">
            <h2>Crown Elite</h2>
            <span>HALL PARTNER</span>
          </div>
        </div>

        <div className="approved-header-actions">
          <span className="approved-saved">
            <span className="approved-saved-check">✓</span>
            Saved just now
          </span>

          <button
            type="button"
            className="approved-exit-btn"
            onClick={() => navigate("/")}
          >
            Save &amp; exit
          </button>
        </div>
      </header>

      <main className="approved-main">
        {/* Approval introduction */}
        <section className="approved-intro">
          <div className="verified-badge">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M24 3L42 10V23C42 34 34.5 41 24 45C13.5 41 6 34 6 23V10L24 3Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16 24L21.5 29L32 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1>Royal Palm Marquee is approved!</h1>

          <p>
            Your hall now has the Verified badge. Finish 3 quick steps and go
            live so families can book you.
          </p>
        </section>

        {/* Setup checklist */}
        <section className="before-live-card">
          <div className="before-live-heading">
            <h2>Before you go live</h2>

            <span className="setup-count">
              {completedCount} of 3 complete
            </span>
          </div>

          {/* Step 1: Timings */}
          <div
            className={`setup-row ${
              completed.timings ? "setup-row-complete" : ""
            }`}
          >
            <div className="setup-status-icon">
              {completed.timings ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12L10.5 14.5L16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 7V12L15 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            <div className="setup-row-content">
              <h3>Set lunch and dinner times</h3>
              <p>So customers can pick a slot</p>

              {completed.timings && (
                <span className="setup-details">
                  Lunch: {lunchTime} · Dinner: {dinnerTime}
                </span>
              )}
            </div>

            {completed.timings ? (
              <span className="setup-done-label">Done</span>
            ) : (
              <button
                type="button"
                className="setup-action-btn"
                onClick={() => setShowSetup("timings")}
              >
                Set up
              </button>
            )}
          </div>

          {/* Step 2: Prices */}
          <div
            className={`setup-row ${
              completed.prices ? "setup-row-complete" : ""
            }`}
          >
            <div className="setup-status-icon">
              {completed.prices ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12L10.5 14.5L16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 7V12L15 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            <div className="setup-row-content">
              <h3>Add your prices and packages</h3>
              <p>Per guest, weekends and wedding season</p>

              {completed.prices && (
                <span className="setup-details">
                  {packageName}: Rs. {Number(price).toLocaleString()} per
                  guest
                </span>
              )}
            </div>

            {completed.prices ? (
              <button
                type="button"
                className="setup-action-btn"
                onClick={() => setShowSetup("prices")}
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                className="setup-action-btn"
                onClick={() => setShowSetup("prices")}
              >
                Set up
              </button>
            )}
          </div>

          {/* Step 3: Cancellation policy */}
          <div
            className={`setup-row ${
              completed.cancellation ? "setup-row-complete" : ""
            }`}
          >
            <div className="setup-status-icon">
              {completed.cancellation ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12L10.5 14.5L16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 7V12L15 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            <div className="setup-row-content">
              <h3>Choose your cancellation policy</h3>
              <p>Flexible, Moderate or Strict</p>

              {completed.cancellation && (
                <span className="setup-details">
                  Current policy: {policy}
                </span>
              )}
            </div>

            <button
              type="button"
              className="setup-action-btn"
              onClick={() => setShowSetup("cancellation")}
            >
              {completed.cancellation ? "Edit" : "Set up"}
            </button>
          </div>
        </section>

        {/* Go live */}
        <div className="go-live-area">
          <button
            type="button"
            className={`go-dashboard-btn ${allComplete ? "ready" : ""}`}
            disabled={!allComplete}
            onClick={handleDashboard}
          >
            Go to my dashboard
            <span aria-hidden="true">→</span>
          </button>

          {!allComplete && (
            <p className="go-live-hint">
              Complete the remaining {3 - completedCount} setup{" "}
              {3 - completedCount === 1 ? "step" : "steps"} to continue.
            </p>
          )}

          {allComplete && (
            <p className="go-live-hint">
              All set! Your hall is ready for the next step.
            </p>
          )}
        </div>
      </main>

      {/* Setup dialog */}
      {showSetup && (
        <div
          className="approved-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowSetup("");
            }
          }}
        >
          <div
            className="approved-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="setup-modal-title"
          >
            <div className="approved-modal-heading">
              <div>
                <span className="modal-eyebrow">HALL SETUP</span>
                <h2 id="setup-modal-title">
                  {showSetup === "timings" && "Set lunch and dinner times"}
                  {showSetup === "prices" && "Add prices and packages"}
                  {showSetup === "cancellation" && "Cancellation policy"}
                </h2>
              </div>

              <button
                type="button"
                className="approved-modal-close"
                onClick={() => setShowSetup("")}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveSetup}>
              {showSetup === "timings" && (
                <div className="approved-form-fields">
                  <label>
                    Lunch time
                    <select
                      value={lunchTime}
                      onChange={(event) => setLunchTime(event.target.value)}
                    >
                      <option>11:00 AM - 2:00 PM</option>
                      <option>12:00 PM - 3:00 PM</option>
                      <option>1:00 PM - 4:00 PM</option>
                      <option>2:00 PM - 5:00 PM</option>
                    </select>
                  </label>

                  <label>
                    Dinner time
                    <select
                      value={dinnerTime}
                      onChange={(event) => setDinnerTime(event.target.value)}
                    >
                      <option>5:00 PM - 9:00 PM</option>
                      <option>6:00 PM - 10:00 PM</option>
                      <option>7:00 PM - 11:00 PM</option>
                      <option>8:00 PM - 12:00 AM</option>
                    </select>
                  </label>
                </div>
              )}

              {showSetup === "prices" && (
                <div className="approved-form-fields">
                  <label>
                    Package name
                    <input
                      type="text"
                      value={packageName}
                      onChange={(event) => setPackageName(event.target.value)}
                      placeholder="e.g. Wedding Package"
                      required
                    />
                  </label>

                  <label>
                    Weekday price per guest (PKR)
                    <input
                      type="number"
                      min="1"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      required
                    />
                  </label>

                  <label>
                    Weekend price per guest (PKR)
                    <input
                      type="number"
                      min="1"
                      value={weekendPrice}
                      onChange={(event) => setWeekendPrice(event.target.value)}
                      required
                    />
                  </label>
                </div>
              )}

              {showSetup === "cancellation" && (
                <div className="approved-policy-options">
                  <label className="policy-option">
                    <input
                      type="radio"
                      name="policy"
                      value="Flexible"
                      checked={policy === "Flexible"}
                      onChange={(event) => setPolicy(event.target.value)}
                    />
                    <span>
                      <strong>Flexible</strong>
                      <small>
                        Guests have more flexibility to cancel bookings.
                      </small>
                    </span>
                  </label>

                  <label className="policy-option">
                    <input
                      type="radio"
                      name="policy"
                      value="Moderate"
                      checked={policy === "Moderate"}
                      onChange={(event) => setPolicy(event.target.value)}
                    />
                    <span>
                      <strong>Moderate</strong>
                      <small>
                        A balanced cancellation policy for both parties.
                      </small>
                    </span>
                  </label>

                  <label className="policy-option">
                    <input
                      type="radio"
                      name="policy"
                      value="Strict"
                      checked={policy === "Strict"}
                      onChange={(event) => setPolicy(event.target.value)}
                    />
                    <span>
                      <strong>Strict</strong>
                      <small>
                        More restrictive cancellation terms for guests.
                      </small>
                    </span>
                  </label>
                </div>
              )}

              <div className="approved-modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowSetup("")}
                >
                  Cancel
                </button>

                <button type="submit" className="modal-save-btn">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApprovedPage;