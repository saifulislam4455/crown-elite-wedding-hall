
import React, { useState } from "react";
import {
  CalendarDays,
  Sun,
  Moon,
  AlertTriangle,
  UserRound,
  Phone,
  Building2,
  Users,
  Wallet,
  Receipt,
  Check,
} from "lucide-react";

import "../styles/NewBooking.css";

export default function NewBooking() {
  const [date, setDate] = useState("Sat, 14 Nov 2026");
  const [hall, setHall] = useState("Grand Hall");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [sendSms, setSendSms] = useState(true);

  const [customerName, setCustomerName] = useState("Ahmed family");
  const [mobile, setMobile] = useState("0333 221 0098");
  const [packageDetail, setPackageDetail] = useState("Silver · Rs 2,500 / guest");
  const [guests, setGuests] = useState(220);
  const [advance, setAdvance] = useState("150000");
  const [paidBy, setPaidBy] = useState("Cash · receipt #2231");

  const hasConflict =
    date === "Sat, 14 Nov 2026" && hall === "Grand Hall";

  const guestCount = Math.max(0, Number(guests) || 0);
  const pricePerGuest = 2500;
  const subtotal = guestCount * pricePerGuest;
  const tax = subtotal * 0.16;
  const total = subtotal + tax;
  const advanceAmount = Math.max(0, Number(advance) || 0);
  const balance = Math.max(0, total - advanceAmount);

  const formatPrice = (amount) =>
    "Rs " + Math.round(amount).toLocaleString("en-PK");

  const handleSelectSlot = (slot) => {
    if (slot === "Dinner" && hasConflict) return;
    setSelectedSlot(slot);
  };

  const handleSave = () => {
    if (!selectedSlot) {
      alert("Please select an available time slot.");
      return;
    }

    if (!customerName.trim() || !mobile.trim()) {
      alert("Please enter customer name and mobile number.");
      return;
    }

    const booking = {
      customerName,
      mobile,
      date,
      hall,
      slot: selectedSlot,
      packageDetail,
      guests: guestCount,
      total,
      advance: advanceAmount,
      balance,
      paidBy,
      sendSms,
    };

    console.log("New booking:", booking);
    alert("Demo booking created successfully!");
  };

  return (
    <div className="nb-main-container nb-shared-layout">
      <main className="nb-content">

        <div className="nb-page-heading">
          <h1 className="nb-page-title">Add a walk-in booking</h1>
          <p className="nb-page-subtitle">
            For customers who book by phone or at the hall. It blocks the date online straight away.
          </p>
        </div>

        <div className="nb-grid-split">

          <div className="nb-form-column">

            {/* WHEN AND WHERE */}
            <div className="nb-card">
              <h2 className="nb-card-title">1 · When and where</h2>

              <div className="nb-form-row">
                <div className="nb-form-group">
                  <label className="nb-label">Date</label>

                  <div className="nb-input-box">
                    <CalendarDays className="nb-input-icon" size={18} />
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setSelectedSlot(null);
                      }}
                      className="nb-input"
                    />
                  </div>

                  {hasConflict && (
                    <div className="nb-date-conflict-msg">
                      <AlertTriangle className="nb-alert-svg" size={18} />
                      <span>
                        Dinner is already booked by Sana & Bilal (online)
                      </span>
                    </div>
                  )}
                </div>

                <div className="nb-form-group">
                  <label className="nb-label">Hall</label>

                  <div className="nb-input-box">
                    <Building2 className="nb-input-icon" size={18} />
                    <input
                      type="text"
                      value={hall}
                      onChange={(e) => {
                        setHall(e.target.value);
                        setSelectedSlot(null);
                      }}
                      className="nb-input"
                    />
                  </div>
                </div>
              </div>

              {/* TIME SLOTS */}
              <div className="nb-slots-grid">
                <button
                  type="button"
                  className={`nb-slot-card ${
                    selectedSlot === "Lunch" ? "selected" : ""
                  }`}
                  onClick={() => handleSelectSlot("Lunch")}
                >
                  <div className="nb-slot-left">
                    <div className="nb-slot-icon">
                      <Sun size={20} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="nb-slot-title">Lunch</p>
                      <p className="nb-slot-time">12 PM – 4 PM</p>
                    </div>
                  </div>

                  <div className="nb-slot-right">
                    <span className="nb-slot-status">Free</span>
                    <div className="nb-slot-radio">
                      {selectedSlot === "Lunch" && (
                        <span className="nb-slot-radio-dot" />
                      )}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  disabled={hasConflict}
                  className={`nb-slot-card ${
                    hasConflict ? "booked" : ""
                  } ${selectedSlot === "Dinner" ? "selected" : ""}`}
                  onClick={() => handleSelectSlot("Dinner")}
                >
                  <div className="nb-slot-left">
                    <div className="nb-slot-icon">
                      <Moon size={20} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="nb-slot-title">Dinner</p>
                      <p className="nb-slot-time">7 PM – 11 PM</p>
                    </div>
                  </div>

                  <div className="nb-slot-right">
                    <span className="nb-slot-status">
                      {hasConflict ? "Booked" : "Free"}
                    </span>

                    <div className="nb-slot-radio">
                      {selectedSlot === "Dinner" && (
                        <span className="nb-slot-radio-dot" />
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {hasConflict && (
                <div className="nb-alert-banner">
                  <span className="nb-alert-icon">
                    <AlertTriangle size={18} />
                  </span>

                  <div>
                    <p className="nb-alert-title">
                      This slot was just booked online
                    </p>
                    <p className="nb-alert-desc">
                      Sana & Bilal booked Dinner on Sat 14 Nov. Choose Lunch,
                      another hall or another date.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <span className="nb-free-options-label">Free options</span>

                <div className="nb-free-pills">
                  <button
                    type="button"
                    className="nb-pill-btn"
                    onClick={() => handleSelectSlot("Lunch")}
                  >
                    <CalendarDays size={16} />
                    <span>Lunch · same day</span>
                  </button>

                  <button
                    type="button"
                    className="nb-pill-btn"
                    onClick={() => {
                      setHall("Crystal Room");
                      setSelectedSlot("Dinner");
                    }}
                  >
                    <CalendarDays size={16} />
                    <span>Crystal Room · Dinner</span>
                  </button>

                  <button
                    type="button"
                    className="nb-pill-btn"
                    onClick={() => {
                      setDate("Sun, 15 Nov 2026");
                      setSelectedSlot("Dinner");
                    }}
                  >
                    <CalendarDays size={16} />
                    <span>Sun 15 Nov · Dinner</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CUSTOMER */}
            <div className="nb-card">
              <h2 className="nb-card-title">2 · Customer</h2>

              <div className="nb-form-row">
                <div className="nb-form-group">
                  <label className="nb-label">Name</label>

                  <div className="nb-input-box">
                    <UserRound className="nb-input-icon" size={18} />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="nb-input"
                    />
                  </div>
                </div>

                <div className="nb-form-group">
                  <label className="nb-label">Mobile</label>

                  <div className="nb-input-box">
                    <Phone className="nb-input-icon" size={18} />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="nb-input"
                    />
                  </div>
                </div>
              </div>

              <label className="nb-checkbox-row">
                <input
                  type="checkbox"
                  checked={sendSms}
                  onChange={(e) => setSendSms(e.target.checked)}
                />
                <span className="nb-checkbox-label">
                  Send booking confirmation and payment link by SMS
                </span>
              </label>
            </div>

            {/* PACKAGE */}
            <div className="nb-card">
              <h2 className="nb-card-title">
                3 · Package & advance received
              </h2>

              <div className="nb-form-row">
                <div className="nb-form-group">
                  <label className="nb-label">Package</label>

                  <div className="nb-input-box">
                    <Receipt className="nb-input-icon" size={18} />
                    <input
                      type="text"
                      value={packageDetail}
                      onChange={(e) => setPackageDetail(e.target.value)}
                      className="nb-input"
                    />
                  </div>
                </div>

                <div className="nb-form-group">
                  <label className="nb-label">Guests</label>

                  <div className="nb-input-box">
                    <Users className="nb-input-icon" size={18} />
                    <input
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="nb-input"
                    />
                  </div>
                </div>
              </div>

              <div className="nb-form-row">
                <div className="nb-form-group">
                  <label className="nb-label">Advance received (Rs)</label>

                  <div className="nb-input-box">
                    <Wallet className="nb-input-icon" size={18} />
                    <input
                      type="number"
                      min="0"
                      value={advance}
                      onChange={(e) => setAdvance(e.target.value)}
                      className="nb-input"
                    />
                  </div>
                </div>

                <div className="nb-form-group">
                  <label className="nb-label">Paid by</label>

                  <div className="nb-input-box">
                    <Receipt className="nb-input-icon" size={18} />
                    <input
                      type="text"
                      value={paidBy}
                      onChange={(e) => setPaidBy(e.target.value)}
                      className="nb-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="nb-summary-column">
            <div className="nb-summary-card">
              <h3 className="nb-summary-title">Summary</h3>

              <div className="nb-summary-row">
                <span>
                  {packageDetail.split("·")[0]} · {guestCount} × Rs 2,500
                </span>
                <span className="amount">{formatPrice(subtotal)}</span>
              </div>

              <div className="nb-summary-row">
                <span>Tax (16%)</span>
                <span className="amount">{formatPrice(tax)}</span>
              </div>

              <div className="nb-summary-row total-row">
                <span className="label">Total</span>
                <span className="amount">{formatPrice(total)}</span>
              </div>

              <div className="nb-summary-row" style={{ marginTop: "12px" }}>
                <span>Received now</span>
                <span className="amount">{formatPrice(advanceAmount)}</span>
              </div>

              <div className="nb-summary-row balance-row">
                <span>Balance</span>
                <span className="amount">{formatPrice(balance)}</span>
              </div>

              <button
                type="button"
                disabled={!selectedSlot || (hasConflict && selectedSlot === "Dinner")}
                className={`nb-btn-save ${selectedSlot ? "active" : ""}`}
                onClick={handleSave}
              >
                <Check size={17} />
                Save booking
              </button>

              <p className="nb-summary-hint">
                Pick a free slot to save. Walk-in bookings don't pay platform commission.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
