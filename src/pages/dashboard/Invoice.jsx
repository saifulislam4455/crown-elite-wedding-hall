import React from "react";
import "../../styles/Invoice.css";

const Icons = {
  Send: () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="22" y1="2" x2="11" y2="13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Download: () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Invoice() {
  const handlePrint = () => {
    window.print();
  };

  const handleSendSMS = () => {
    alert("Invoice link sent via SMS to 0321 445 8890");
  };

  return (
    <div className="invoice-container">
      {/* ----------------- PAGE TOP HEADER ----------------- */}
      <div className="inv-header-row">
        <div>
          <h1 className="inv-page-title">Invoice INV-2026-0412</h1>
          <p className="inv-page-subtitle">
            Generated when Khan &amp; Sons' booking was confirmed.
          </p>
        </div>

        <div className="inv-action-buttons">
          <button className="inv-btn-sms" onClick={handleSendSMS}>
            <Icons.Send />
            <span>Send by SMS</span>
          </button>
          <button className="inv-btn-download" onClick={handlePrint}>
            <Icons.Download />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* ----------------- WHITE INVOICE CARD ----------------- */}
      <div className="inv-card">
        {/* Top Marquee Info & Invoice Meta */}
        <div className="inv-card-top">
          <div>
            <h2 className="inv-marquee-title">Royal Palm Marquee</h2>
            <p className="inv-marquee-address">Main Boulevard, Gulberg III, Lahore</p>
            <p className="inv-marquee-tax">NTN 4455667-8 · STRN 32-77-8800-112-55</p>
          </div>

          <div className="inv-card-top-right">
            <p className="inv-tag">INVOICE</p>
            <p className="inv-number">INV-2026-0412</p>
            <p className="inv-date">Issued 13 Nov 2026</p>
          </div>
        </div>

        {/* 3-Column Info (Bill to, Event, Booking) */}
        <div className="inv-meta-grid">
          <div>
            <p className="inv-meta-label">Bill to</p>
            <p className="inv-meta-main">Khan &amp; Sons (Faisal Khan)</p>
            <p className="inv-meta-sub">0321 445 8890</p>
          </div>

          <div>
            <p className="inv-meta-label">Event</p>
            <p className="inv-meta-main">Tue 17 Nov 2026 · Dinner</p>
            <p className="inv-meta-sub">Grand Hall · 400 guests</p>
          </div>

          <div>
            <p className="inv-meta-label">Booking</p>
            <p className="inv-meta-main">WB-2027-004530</p>
            <p className="inv-meta-sub">Online</p>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="inv-table-wrap">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Item</th>
                <th className="col-center">Qty</th>
                <th className="col-center">Rate</th>
                <th className="col-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gold package (Mutton karahi, Chicken biryani, 3 starters, 2 desserts)</td>
                <td className="col-center">400</td>
                <td className="col-center">Rs 3,200</td>
                <td className="col-right">Rs 12,80,000</td>
              </tr>
              <tr>
                <td>Sales tax on services (16%)</td>
                <td className="col-center"></td>
                <td className="col-center"></td>
                <td className="col-right">Rs 2,04,800</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary (Total, Paid, Balance) */}
        <div className="inv-summary-section">
          <div className="inv-summary-box">
            <div className="inv-summary-row total-row">
              <span className="label">Total</span>
              <span className="amount">Rs 14,84,800</span>
            </div>
            <div className="inv-summary-row">
              <span>Paid · advance by card (13 Nov)</span>
              <span style={{ fontWeight: 600 }}>Rs 3,71,200</span>
            </div>
            <div className="inv-summary-row balance-row">
              <span className="label">Balance</span>
              <span className="amount">Rs 11,13,600</span>
            </div>
          </div>
        </div>

        {/* Payment Schedule Card */}
        <div className="inv-schedule-card">
          <h3 className="inv-schedule-title">Payment schedule</h3>
          <div className="inv-schedule-row">
            <span>50% by 17 Oct 2026</span>
            <span className="amount">Rs 7,42,400</span>
          </div>
          <div className="inv-schedule-row">
            <span>25% by 10 Nov 2026</span>
            <span className="amount">Rs 3,71,200</span>
          </div>
        </div>

        {/* Footer Policy */}
        <p className="inv-footer-policy">
          Cancellation: Moderate policy applies. Pay online at crownelite.pk/b/WB-2027-004530 or at the hall. Thank you for choosing Royal Palm.
        </p>
      </div>
    </div>
  );
}