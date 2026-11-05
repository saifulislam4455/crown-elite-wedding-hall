
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/BookingDetails.css";
import RejectBookingModal from "../../components/dashboard/RejectBookingModal";

/* Reusable icons */
function Icon({ name, size = 18 }) {
  const paths = {
    back: <path d="m15 18-6-6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    phone: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.14 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
        <path d="M8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
    message: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
    food: (
      <>
        <path d="M3 2v7a4 4 0 0 0 4 4h1V2M7 2v20M17 2v20M17 2c3 2 4 5 4 9h-4" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function BookingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Booking status
  const [status, setStatus] = useState("waiting");
  const [notice, setNotice] = useState("");

  // Reject modal state
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Demo booking information
  const booking = {
    id: id || "BK-2026-001",
    customer: "Khan & Sons",
    contactPerson: "Faisal Khan",
    phone: "0321 445 8890",
    email: "faisal@khanandsons.pk",
    hall: "Grand Hall",
    date: "Tue, 17 Nov 2026",
    time: "Dinner · 7–11 PM",
    guests: 400,
    event: "Corporate dinner",
    booked: "Today, 3:12 AM · online",
    package: "Gold package",
    pricePerGuest: 3200,
    subtotal: 1280000,
    tax: 204800,
    total: 1484800,
    advance: 371200,
    secondPayment: 742400,
    finalPayment: 371200,
    commission: 102400,
    note: "Need a projector and a podium for speeches. Vegetarian option for 20 guests please.",
  };

  const formatPrice = (amount) =>
    `Rs ${amount.toLocaleString("en-PK")}`;

  // Accept booking
  const handleAccept = () => {
    setStatus("confirmed");
    setNotice("Booking accepted successfully. Demo status updated.");
  };

  // Reject booking after modal confirmation
  const handleReject = (reason) => {
    setIsRejectModalOpen(false);
    setStatus("rejected");
    setNotice(`Booking rejected successfully. Reason: ${reason}`);
  };

  // WhatsApp chat
  const handleChat = () => {
    const number = booking.phone.replace(/\D/g, "");
    window.open(
      `https://wa.me/92${number.replace(/^0/, "")}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <main className="bd-content">
        {/* Back navigation */}
        <Link to="/bookings" className="bd-back-link">
          <Icon name="back" size={16} />
          <span>All bookings</span>
        </Link>

        {/* Notification */}
        {notice && (
          <div className="bd-notice" role="status">
            <span>{notice}</span>

            <button
              onClick={() => setNotice("")}
              aria-label="Close notice"
            >
              ×
            </button>
          </div>
        )}

        {/* Booking status banner */}
        <section className="bd-banner">
          <div className="bd-banner-info">
            <div className="bd-banner-time">
              <Icon name="clock" size={15} />

              <span>
                {status === "waiting"
                  ? "Reply within 18 hours"
                  : status === "confirmed"
                  ? "Booking confirmed"
                  : "Booking rejected"}
              </span>
            </div>

            <h2 className="bd-banner-title">
              {booking.customer} wants the {booking.hall} on{" "}
              {booking.date} (Dinner)
            </h2>

            <p className="bd-banner-sub">
              {status === "waiting"
                ? `They have paid ${formatPrice(
                    booking.advance
                  )} as advance. Please respond to this booking request.`
                : status === "confirmed"
                ? "This booking has been accepted in the demo interface."
                : "This booking has been rejected in the demo interface."}
            </p>
          </div>

          {status === "waiting" && (
            <div className="bd-banner-buttons">
              <button
                className="bd-btn-reject"
                onClick={() => setIsRejectModalOpen(true)}
              >
                Reject
              </button>

              <button
                className="bd-btn-accept"
                onClick={handleAccept}
              >
                <Icon name="check" size={16} />
                <span>Accept booking</span>
              </button>
            </div>
          )}

          {status !== "waiting" && (
            <span className={`bd-status-label ${status}`}>
              {status === "confirmed" ? "Confirmed" : "Rejected"}
            </span>
          )}
        </section>

        {/* Main details grid */}
        <div className="bd-grid-split">
          {/* LEFT COLUMN */}
          <div>
            {/* Event details */}
            <section className="bd-card">
              <h3 className="bd-card-title">Event details</h3>

              <div className="bd-event-grid">
                <div className="bd-event-item">
                  <label>Booking ID</label>
                  <p>{booking.id}</p>
                </div>

                <div className="bd-event-item">
                  <label>Date</label>
                  <p>{booking.date}</p>
                </div>

                <div className="bd-event-item">
                  <label>Time</label>
                  <p>{booking.time}</p>
                </div>

                <div className="bd-event-item">
                  <label>Hall</label>
                  <p>{booking.hall}</p>
                </div>

                <div className="bd-event-item">
                  <label>Guests</label>
                  <p>{booking.guests} guests</p>
                </div>

                <div className="bd-event-item">
                  <label>Event type</label>
                  <p>{booking.event}</p>
                </div>

                <div className="bd-event-item">
                  <label>Booked on</label>
                  <p>{booking.booked}</p>
                </div>
              </div>
            </section>

            {/* Order summary */}
            <section className="bd-card">
              <h3 className="bd-card-title">Order summary</h3>

              <div className="bd-order-row">
                <span>
                  {booking.package} · {booking.guests} ×{" "}
                  {formatPrice(booking.pricePerGuest)}
                </span>

                <span className="amount">
                  {formatPrice(booking.subtotal)}
                </span>
              </div>

              <div className="bd-order-row">
                <span>
                  <Icon name="food" size={14} /> Mains: Mutton karahi,
                  Chicken biryani
                </span>
                <span className="amount">Included</span>
              </div>

              <div className="bd-order-row">
                <span>
                  Starters: Chicken tikka, Seekh kebab, Fish pakora
                </span>
                <span className="amount">Included</span>
              </div>

              <div className="bd-order-row">
                <span>Sales tax (16%)</span>
                <span className="amount">
                  {formatPrice(booking.tax)}
                </span>
              </div>

              <div className="bd-order-total">
                <span className="label">Total amount</span>
                <span className="total-amount">
                  {formatPrice(booking.total)}
                </span>
              </div>

              <div className="bd-customer-note">
                <label>Customer note</label>
                <p>{booking.note}</p>
              </div>
            </section>

            {/* Payment plan */}
            <section className="bd-card">
              <h3 className="bd-card-title">Payment plan</h3>

              <div className="bd-payment-row">
                <div>
                  <p className="bd-pay-amount">
                    {formatPrice(booking.advance)}
                  </p>
                  <p className="bd-pay-desc">Advance · paid by card</p>
                </div>

                <span className="bd-pill-paid">
                  <span className="bd-dot-indicator green" />
                  Paid
                </span>
              </div>

              <div className="bd-payment-row">
                <div>
                  <p className="bd-pay-amount">
                    {formatPrice(booking.secondPayment)}
                  </p>
                  <p className="bd-pay-desc">50% · due 17 Oct</p>
                </div>

                <span className="bd-pill-scheduled">
                  <span className="bd-dot-indicator gray" />
                  Scheduled
                </span>
              </div>

              <div className="bd-payment-row">
                <div>
                  <p className="bd-pay-amount">
                    {formatPrice(booking.finalPayment)}
                  </p>
                  <p className="bd-pay-desc">25% · due 10 Nov</p>
                </div>

                <span className="bd-pill-scheduled">
                  <span className="bd-dot-indicator gray" />
                  Scheduled
                </span>
              </div>

              <p className="bd-commission-sub">
                Platform commission (8%):{" "}
                {formatPrice(booking.commission)} · deducted from payouts
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* Customer information */}
            <section className="bd-card">
              <h3 className="bd-card-title">Customer information</h3>

              <div className="bd-customer-header">
                <div className="bd-customer-avatar">KS</div>

                <div>
                  <p className="bd-customer-name">
                    {booking.customer}
                  </p>
                  <p className="bd-customer-sub">
                    {booking.contactPerson} · Verified phone
                  </p>
                </div>
              </div>

              <div className="bd-contact-row">
                <Icon name="phone" size={15} />
                <span>{booking.phone}</span>
              </div>

              <div className="bd-contact-row">
                <Icon name="mail" size={15} />
                <span>{booking.email}</span>
              </div>

              <div className="bd-contact-actions">
                <a
                  className="bd-btn-contact"
                  href={`tel:${booking.phone}`}
                >
                  <Icon name="phone" size={15} />
                  Call
                </a>

                <a
                  className="bd-btn-contact"
                  href={`mailto:${booking.email}`}
                >
                  <Icon name="mail" size={15} />
                  Email
                </a>
              </div>

              <button
                className="bd-btn-contact bd-chat-button"
                onClick={handleChat}
              >
                <Icon name="message" size={15} />
                Chat on WhatsApp
              </button>
            </section>

            {/* Hall availability */}
            <section className="bd-card">
              <h3 className="bd-card-title">
                Same day in {booking.hall}
              </h3>

              <div className="bd-same-day-row">
                <span>Lunch</span>

                <span className="bd-pill-paid">
                  <span className="bd-dot-indicator green" />
                  Free
                </span>
              </div>

              <div className="bd-same-day-row">
                <span>Dinner</span>

                <span className="bd-pill-held">
                  <span className="bd-dot-indicator" />
                  This booking
                </span>
              </div>

              <p className="bd-conflict-free">
                No other conflicts are shown in this demo.
              </p>
            </section>

            {/* Booking history */}
            <section className="bd-card">
              <h3 className="bd-card-title">Booking history</h3>

              <div className="bd-history-item">
                <p className="bd-history-title">
                  Advance paid by card
                </p>
                <p className="bd-history-time">Today · 3:12 AM</p>
              </div>

              <div className="bd-history-item">
                <p className="bd-history-title">
                  Slot held for checkout
                </p>
                <p className="bd-history-time">Today · 3:04 AM</p>
              </div>

              <div className="bd-history-item">
                <p className="bd-history-title">
                  Customer viewed hall
                </p>
                <p className="bd-history-time">Yesterday</p>
              </div>

              {status === "confirmed" && (
                <div className="bd-history-item">
                  <p className="bd-history-title">
                    Booking accepted
                  </p>
                  <p className="bd-history-time">
                    Just now · Demo action
                  </p>
                </div>
              )}

              {status === "rejected" && (
                <div className="bd-history-item">
                  <p className="bd-history-title">
                    Booking rejected
                  </p>
                  <p className="bd-history-time">
                    Just now · Demo action
                  </p>
                </div>
              )}
            </section>

            <button
              className="bd-back-bookings"
              onClick={() => navigate("/bookings")}
            >
              Back to all bookings
            </button>
          </div>
        </div>
      </main>

      {/* Separate Reject Booking Modal */}
      {isRejectModalOpen && (
        <RejectBookingModal
          bookingName={booking.customer}
          refundAmount={formatPrice(booking.advance)}
          onCancel={() => setIsRejectModalOpen(false)}
          onConfirm={handleReject}
        />
      )}
    </>
  );
}
