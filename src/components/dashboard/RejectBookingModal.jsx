

import { useState } from "react";
import { X, Info } from "lucide-react";
import "../../styles/RejectBookingModal.css";

export default function RejectBookingModal({
  bookingName,
  refundAmount,
  onCancel,
  onConfirm,
}) {
  const [selectedReason, setSelectedReason] = useState(
    "Already booked by phone / walk-in"
  );

  const reasons = [
    "Hall is under maintenance on this date",
    "Already booked by phone / walk-in",
    "Event type not allowed",
    "Other reason",
  ];

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="reject-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onCancel}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="reject-modal-icon">
          <Info size={25} />
        </div>

        <span className="reject-modal-label">BOOKING ACTION</span>

        <h2 id="reject-modal-title" className="reject-modal-title">
          Reject this booking?
        </h2>

        <p className="reject-modal-subtitle">
          <strong>{bookingName}</strong> will get a full refund of{" "}
          <strong>{refundAmount}</strong> automatically and the date opens
          for others.
        </p>

        <label className="reject-reasons-label">
          Reason (the customer will see this)
        </label>

        <div className="reject-reasons-list">
          {reasons.map((reason) => {
            const isSelected = selectedReason === reason;

            return (
              <button
                type="button"
                key={reason}
                className={`reason-option ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedReason(reason)}
                aria-pressed={isSelected}
              >
                <span className="custom-radio">
                  {isSelected && <span className="custom-radio-inner" />}
                </span>

                <span className="reason-text">{reason}</span>
              </button>
            );
          })}
        </div>

        <div className="modal-tip-banner">
          <span className="modal-tip-icon">
            <Info size={17} />
          </span>

          <span>
            Tip: add walk-in bookings in the portal so this date is never
            sold twice.
          </span>
        </div>

        <div className="modal-action-buttons">
          <button className="btn-modal-back" onClick={onCancel}>
            Go back
          </button>

          <button
            className="btn-modal-reject"
            onClick={() => onConfirm(selectedReason)}
          >
            Reject &amp; refund customer
          </button>
        </div>

        <p className="reject-modal-footer">
          Crown Elite · Hall Partner
        </p>
      </div>
    </div>
  );
}
