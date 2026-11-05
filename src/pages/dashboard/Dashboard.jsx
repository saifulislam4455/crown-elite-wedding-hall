
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  CalendarDays,
  Wallet,
  Building2,
  Star,
  Clock3,
  CreditCard,
  MessageCircle,
  ArrowRight,
  Plus,
  LockKeyhole,
  Check,
  X,
} from "lucide-react";

import "../../styles/Dashboard.css";

const initialBookings = [
  {
    id: 1,
    date: "Sat 14 Nov",
    type: "Dinner",
    customer: "Sana & Bilal",
    event: "Barat",
    hall: "Grand Hall",
    guests: 600,
    status: "Confirmed",
  },
  {
    id: 2,
    date: "Sat 14 Nov",
    type: "Lunch",
    customer: "Ahmed family",
    event: "Walima",
    hall: "Crystal Room",
    guests: 220,
    status: "Balance due",
  },
  {
    id: 3,
    date: "Sun 15 Nov",
    type: "Dinner",
    customer: "Mehwish R.",
    event: "Mehndi",
    hall: "Garden Lawn",
    guests: 350,
    status: "Confirmed",
  },
  {
    id: 4,
    date: "Tue 17 Nov",
    type: "Dinner",
    customer: "Khan & Sons",
    event: "Corporate",
    hall: "Grand Hall",
    guests: 400,
    status: "Waiting for you",
  },
  {
    id: 5,
    date: "Thu 19 Nov",
    type: "Lunch",
    customer: "Fatima Z.",
    event: "Nikah",
    hall: "Crystal Room",
    guests: 150,
    status: "Confirmed",
  },
];

const initialRequests = [
  {
    id: 1,
    name: "Khan & Sons",
    date: "Tue 17 Nov",
    event: "Dinner",
    guests: 400,
    amount: "Rs 3,71,200 paid",
    time: "18 h left",
  },
  {
    id: 2,
    name: "Hira M.",
    date: "Sat 5 Dec",
    event: "Lunch",
    guests: 300,
    amount: "Rs 2,25,000 paid",
    time: "22 h left",
  },
];

const payments = [
  {
    name: "Ahmed family",
    amount: "Rs 2,10,000",
    status: "Due today",
    type: "warning",
  },
  {
    name: "Zara & Hamza",
    amount: "Rs 3,60,000",
    status: "2 days late",
    type: "danger",
  },
  {
    name: "Mehwish R.",
    amount: "Rs 1,50,000",
    status: "Due Mon",
    type: "neutral",
  },
];

const chartData = [
  { month: "Jun", height: 38 },
  { month: "Jul", height: 32 },
  { month: "Aug", height: 58 },
  { month: "Sep", height: 65 },
  { month: "Oct", height: 82 },
  { month: "Nov", height: 100 },
];

function Dashboard() {
  const navigate = useNavigate();
  const { search = "" } = useOutletContext() || {};

  const [bookings, setBookings] = useState(initialBookings);
  const [requests, setRequests] = useState(initialRequests);
  const [period, setPeriod] = useState("6 months");
  const [notice, setNotice] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const text = `${booking.customer} ${booking.hall} ${booking.date} ${booking.status}`;
    return text.toLowerCase().includes(search.toLowerCase());
  });

  const handleRequest = (id, action) => {
    const request = requests.find((item) => item.id === id);

    if (action === "accept") {
      setBookings((previous) =>
        previous.map((booking) =>
          booking.customer === request.name
            ? { ...booking, status: "Confirmed" }
            : booking
        )
      );
    }

    setRequests((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setNotice(
      action === "accept"
        ? `${request.name} booking accepted.`
        : `${request.name} request rejected.`
    );

    setTimeout(() => setNotice(""), 3000);
  };

  const stats = [
    {
      title: "Bookings this month",
      value: "24",
      note: "8 more than October",
      change: "+12%",
      icon: CalendarDays,
      color: "gold",
    },
    {
      title: "Money collected",
      value: "Rs 48.2 lakh",
      note: "Rs 21 lakh still to collect",
      change: "+18%",
      icon: Wallet,
      color: "gold",
    },
    {
      title: "Halls booked",
      value: "78%",
      note: "Fridays & Saturdays full",
      change: "High",
      icon: Building2,
      color: "gold",
    },
    {
      title: "Rating",
      value: "4.8",
      note: "126 reviews · 3 new",
      change: "+0.1",
      icon: Star,
      color: "gold",
    },
  ];

  return (
    <div className="dashboard-content">

      {/* Welcome section */}
      <section className="dashboard-welcome">
        <div>
          <h1>Assalam-o-Alaikum, Rana</h1>
          <p>
            Here’s what needs your attention today, Friday 13 Nov.
          </p>
        </div>

        <div className="welcome-actions">
          <button
            className="btn-block-date"
            onClick={() => setNotice("Block date feature coming soon.")}
          >
            <LockKeyhole size={16} />
            Block a date
          </button>

          <button
            className="btn-new-booking"
            onClick={() => navigate("/bookings?new=true")}
          >
            <Plus size={18} />
            New booking
          </button>
        </div>
      </section>

      {/* Alerts */}
      <section className="dashboard-alerts">
        <div className="alert-card alert-bookings">
          <div className="alert-icon">
            <Clock3 size={20} />
          </div>
          <div className="alert-content">
            <strong>2 bookings waiting for you</strong>
            <p>Reply in 18 h or they're auto-rejected</p>
          </div>
          <button onClick={() => navigate("/bookings")}>
            Review now <ArrowRight size={15} />
          </button>
        </div>

        <div className="alert-card alert-payments">
          <div className="alert-icon">
            <CreditCard size={20} />
          </div>
          <div className="alert-content">
            <strong>3 payments overdue</strong>
            <p>Rs 6,20,000 in total</p>
          </div>
          <button onClick={() => navigate("/bookings")}>
            Send reminders <ArrowRight size={15} />
          </button>
        </div>

        <div className="alert-card alert-messages">
          <div className="alert-icon">
            <MessageCircle size={20} />
          </div>
          <div className="alert-content">
            <strong>5 unread messages</strong>
            <p>Oldest is 2 hours old</p>
          </div>
          <button onClick={() => setNotice("Inbox feature coming soon.")}>
            Open inbox <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Statistics */}
      <section className="dashboard-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-card-top">
                <div className="stat-icon">
                  <Icon size={20} strokeWidth={1.9} />
                </div>
                <span className="stat-change">
                  <span>●</span> {stat.change}
                </span>
              </div>

              <p className="stat-title">{stat.title}</p>
              <h2>{stat.value}</h2>
              <span className="stat-note">{stat.note}</span>
            </div>
          );
        })}
      </section>

      {/* Main dashboard columns */}
      <section className="dashboard-middle">

        {/* Next 7 days */}
        <div className="bookings-panel">
          <div className="panel-heading">
            <h2>Next 7 days</h2>
            <button onClick={() => navigate("/calendar")}>
              Open calendar
            </button>
          </div>

          <div className="bookings-table-wrap">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Date & time</th>
                  <th>Customer</th>
                  <th>Hall</th>
                  <th>Guests</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.date}</strong>
                      <span>{booking.type}</span>
                    </td>

                    <td>
                      <strong>{booking.customer}</strong>
                      <span>{booking.event}</span>
                    </td>

                    <td>{booking.hall}</td>
                    <td>{booking.guests}</td>

                    <td>
                      <span
                        className={`booking-status ${
                          booking.status === "Confirmed"
                            ? "status-confirmed"
                            : booking.status === "Balance due"
                            ? "status-balance"
                            : "status-waiting"
                        }`}
                      >
                        ● {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-bookings">
                      No matching bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Waiting for your reply */}
        <div className="dashboard-right-column">
          <div className="pending-panel">
            <h3>
              <Clock3 size={16} />
              Waiting for your reply
            </h3>

            {requests.length === 0 ? (
              <p className="no-requests">
                All booking requests have been handled.
              </p>
            ) : (
              requests.map((request) => (
                <div className="pending-card" key={request.id}>
                  <div className="pending-card-heading">
                    <strong>{request.name}</strong>
                    <span>{request.time}</span>
                  </div>

                  <p>
                    {request.date} · {request.event} · {request.guests}
                  </p>

                  <p>{request.amount}</p>

                  <div className="pending-actions">
                    <button
                      className="accept-button"
                      onClick={() => handleRequest(request.id, "accept")}
                    >
                      Accept
                    </button>

                    <button
                      className="reject-button"
                      onClick={() => handleRequest(request.id, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payments due */}
          <div className="payments-panel">
            <h3>Payments due this week</h3>

            {payments.map((payment) => (
              <div className="payment-row" key={payment.name}>
                <div>
                  <strong>{payment.name}</strong>
                  <span>{payment.amount}</span>
                </div>

                <span className={`payment-status ${payment.type}`}>
                  ● {payment.status}
                </span>
              </div>
            ))}

            <button
              className="send-reminders"
              onClick={() => setNotice("Payment reminders feature coming soon.")}
            >
              Send all reminders
            </button>
          </div>
        </div>
      </section>

      {/* Revenue chart */}
      <section className="revenue-panel">
        <div className="revenue-heading">
          <div>
            <h2>Money collected</h2>
            <p>Online + cash, after platform commission</p>
          </div>

          <div className="revenue-period">
            <button
              className={period === "6 months" ? "selected" : ""}
              onClick={() => setPeriod("6 months")}
            >
              6 months
            </button>
            <button
              className={period === "12 months" ? "selected" : ""}
              onClick={() => setPeriod("12 months")}
            >
              12 months
            </button>
          </div>
        </div>

        <div className="revenue-chart">
          {chartData.map((item, index) => (
            <div className="chart-column" key={item.month}>
              {index === 5 && (
                <strong className="chart-value">Rs 48.2L</strong>
              )}

              <div
                className={`chart-bar ${
                  index === 5 ? "chart-bar-active" : ""
                }`}
                style={{ height: `${item.height}%` }}
              />

              <span>{item.month}</span>
            </div>
          ))}
        </div>
      </section>

      {notice && (
        <div className="dashboard-toast">
          <Check size={17} />
          {notice}
          <button onClick={() => setNotice("")} aria-label="Close notice">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
