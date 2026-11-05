
import { useState } from "react";
import { ShieldCheck, Check } from "lucide-react";

import "../../styles/Policies.css";

const cancellationOptions = [
  {
    id: "flexible",
    title: "Flexible",
    description: "Full refund until 30 days before",
  },
  {
    id: "moderate",
    title: "Moderate",
    description: "Full refund until 60 days before",
  },
  {
    id: "strict",
    title: "Strict",
    description: "75% refund until 90 days before",
  },
  {
    id: "custom",
    title: "Custom",
    description: "Set your own steps",
  },
];

const refundSteps = [
  {
    time: "60+ days before",
    refund: "100% refund",
    type: "green",
  },
  {
    time: "30–59 days before",
    refund: "75% refund",
    type: "green",
  },
  {
    time: "15–29 days before",
    refund: "50% refund",
    type: "orange",
  },
  {
    time: "0–14 days before",
    refund: "0% refund",
    type: "red",
  },
];

const initialHouseRules = [
  "No outside catering",
  "Music until 10 PM",
  "No fireworks indoors",
  "Security deposit Rs 50,000",
  "Décor must be removed by 1 AM",
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`policy-toggle ${checked ? "active" : ""}`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}

function PolicySelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Policies() {
  const [cancellation, setCancellation] = useState("moderate");

  const [advance, setAdvance] = useState("25% of total");

  const [secondPayment, setSecondPayment] = useState(
    "50% · 30 days before"
  );

  const [finalPayment, setFinalPayment] = useState(
    "25% · 7 days before"
  );

  const [latePayment, setLatePayment] = useState(true);
  const [instantBooking, setInstantBooking] = useState(false);
  const [autoReject, setAutoReject] = useState(true);
  const [reschedule, setReschedule] = useState(true);

  const [houseRules, setHouseRules] = useState(initialHouseRules);
  const [saved, setSaved] = useState(false);

  // Toggle House Rule
  function toggleHouseRule(rule) {
    setHouseRules((previous) =>
      previous.includes(rule)
        ? previous.filter((item) => item !== rule)
        : [...previous, rule]
    );
  }

  // Add New House Rule
  function addHouseRule() {
    const rule = window.prompt("Enter a new house rule:");

    if (rule && rule.trim()) {
      const newRule = rule.trim();

      setHouseRules((previous) =>
        previous.includes(newRule)
          ? previous
          : [...previous, newRule]
      );
    }
  }

  // Save Policies
  function savePolicies() {
    const policyData = {
      cancellation,
      advance,
      secondPayment,
      finalPayment,
      latePayment,
      instantBooking,
      autoReject,
      reschedule,
      houseRules,
    };

    localStorage.setItem(
      "weddingHallPolicies",
      JSON.stringify(policyData)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div className="policies-page">

      {/* Page Heading */}

      <div className="policies-heading">
        <div>
          <h1>Policies</h1>
          <p>
            These rules are shown to customers before they pay and
            saved with every booking.
          </p>
        </div>

        <button
          type="button"
          className="save-policies-button"
          onClick={savePolicies}
        >
          {saved ? (
            <>
              <Check size={17} />
              Saved
            </>
          ) : (
            "Save policies"
          )}
        </button>
      </div>

      {/* Cancellation Policy */}

      <section className="policy-card cancellation-card">
        <h2>Cancellation policy</h2>

        <div className="cancellation-options">
          {cancellationOptions.map((option) => (
            <button
              type="button"
              key={option.id}
              className={`cancellation-option ${
                cancellation === option.id ? "selected" : ""
              }`}
              onClick={() => setCancellation(option.id)}
            >
              <div className="option-title-row">
                <span className="radio-circle">
                  {cancellation === option.id && (
                    <span className="radio-dot" />
                  )}
                </span>

                <strong>{option.title}</strong>
              </div>

              <p>{option.description}</p>
            </button>
          ))}
        </div>

        <div className="refund-grid">
          {refundSteps.map((step) => (
            <div className="refund-item" key={step.time}>
              <p>{step.time}</p>
              <strong className={step.type}>
                {step.refund}
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* Advance and Installments */}

      <section className="policy-card installments-card">
        <h2>Advance &amp; installments</h2>

        <div className="installments-grid">

          <div className="policy-field">
            <label>Advance to confirm</label>

            <PolicySelect
              value={advance}
              onChange={setAdvance}
              options={[
                "10% of total",
                "20% of total",
                "25% of total",
                "30% of total",
                "50% of total",
              ]}
            />
          </div>

          <div className="policy-field">
            <label>2nd payment</label>

            <PolicySelect
              value={secondPayment}
              onChange={setSecondPayment}
              options={[
                "25% · 30 days before",
                "50% · 30 days before",
                "50% · 15 days before",
                "75% · 15 days before",
              ]}
            />
          </div>

          <div className="policy-field">
            <label>Final payment</label>

            <PolicySelect
              value={finalPayment}
              onChange={setFinalPayment}
              options={[
                "25% · 7 days before",
                "25% · 3 days before",
                "50% · 7 days before",
                "100% · 7 days before",
              ]}
            />
          </div>

        </div>

        <div className="policy-toggle-row">
          <div>
            <h3>
              Allow me to cancel if a payment is 7+ days late
            </h3>

            <p>
              Treated as a customer cancellation under your policy
            </p>
          </div>

          <Toggle
            checked={latePayment}
            onChange={setLatePayment}
          />
        </div>
      </section>

      {/* Booking Requests */}

      <section className="policy-card booking-requests-card">
        <h2>Booking requests</h2>

        <div className="booking-policy-list">

          <div className="booking-policy-row">
            <div>
              <h3>Instant booking</h3>

              <p>
                Confirm paid bookings automatically — no need to reply.
                Halls with instant booking get 2× more bookings.
              </p>
            </div>

            <Toggle
              checked={instantBooking}
              onChange={setInstantBooking}
            />
          </div>

          <div className="booking-policy-row">
            <div>
              <h3>If I don’t reply in 24 hours</h3>

              <p>
                Reject and refund automatically (recommended)
              </p>
            </div>

            <Toggle
              checked={autoReject}
              onChange={setAutoReject}
            />
          </div>

          <div className="booking-policy-row">
            <div>
              <h3>Reschedule</h3>

              <p>
                Allow 1 free date change if asked 30+ days before
              </p>
            </div>

            <Toggle
              checked={reschedule}
              onChange={setReschedule}
            />
          </div>

        </div>
      </section>

      {/* House Rules */}

      <section className="policy-card house-rules-card">

        <div className="house-rules-heading">
          <h2>House rules</h2>
        </div>

        <div className="house-rules-list">

          {houseRules.map((rule) => (
            <button
              type="button"
              key={rule}
              className="house-rule-chip active"
              onClick={() => toggleHouseRule(rule)}
            >
              {rule}
            </button>
          ))}

          <button
            type="button"
            className="add-house-rule"
            onClick={addHouseRule}
          >
            + Add rule
          </button>

        </div>
      </section>

    </div>
  );
}

export default Policies;
