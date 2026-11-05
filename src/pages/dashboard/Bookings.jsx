
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Search, Download, Plus, ChevronDown,
  Globe, UserRound, X
} from "lucide-react";
import "../../styles/Bookings.css";

const bookingsData = [
  {
    id: "WB-2027-004530",
    customer: "Khan & Sons",
    phone: "0321 445 8890",
    date: "Tue 17 Nov",
    type: "Dinner",
    hall: "Grand Hall",
    amount: 1484800,
    paid: "Rs 3,71,200 paid",
    status: "Waiting for you",
    source: "Online",
  },
  {
    id: "WB-2027-004541",
    customer: "Hira Malik",
    phone: "0300 998 2211",
    date: "Sat 5 Dec",
    type: "Lunch",
    hall: "Crystal Room",
    amount: 900000,
    paid: "Rs 2,25,000 paid",
    status: "Waiting for you",
    source: "Online",
  },
  {
    id: "WB-2027-004512",
    customer: "Ayesha Khan",
    phone: "0300 123 4567",
    date: "Sat 13 Feb",
    type: "Dinner",
    hall: "Grand Hall",
    amount: 1658800,
    paid: "25% paid",
    status: "Confirmed",
    source: "Online",
  },
  {
    id: "WK-0098",
    customer: "Ahmed family",
    phone: "0333 221 0098",
    date: "Sat 14 Nov",
    type: "Lunch",
    hall: "Crystal Room",
    amount: 660000,
    paid: "Balance due today",
    status: "Payment due",
    source: "Walk-in",
  },
  {
    id: "WB-2027-004498",
    customer: "Sana & Bilal",
    phone: "0312 555 0101",
    date: "Sat 14 Nov",
    type: "Dinner",
    hall: "Grand Hall",
    amount: 1920000,
    paid: "Fully paid",
    status: "Confirmed",
    source: "Online",
  },
  {
    id: "WB-2027-004470",
    customer: "Usman Tariq",
    phone: "0345 101 2020",
    date: "Sun 22 Nov",
    type: "Dinner",
    hall: "Garden Lawn",
    amount: 750000,
    paid: "—",
    status: "Reschedule asked",
    source: "Online",
  },
];

const tabs = [
  { label: "Needs reply", count: 2 },
  { label: "Upcoming", count: 31 },
  { label: "Payment due", count: 3 },
  { label: "Completed" },
  { label: "Cancelled" },
];

const money = (amount) => "Rs " + amount.toLocaleString("en-PK");

function Bookings() {
  const navigate = useNavigate();
  const { search: globalSearch } = useOutletContext() || {};

  const [bookings] = useState(bookingsData);
  const [activeTab, setActiveTab] = useState("Needs reply");
  const [tabClicked, setTabClicked] = useState(false);
  const [search, setSearch] = useState("");
  const [hall, setHall] = useState("All halls");
  const [source, setSource] = useState("Online + walk-in");
  const [showWalkIn, setShowWalkIn] = useState(false);

  const filteredBookings = bookings.filter((booking) => {
    const query = `${search} ${globalSearch || ""}`.trim().toLowerCase();

    const matchesSearch =
      !query ||
      booking.customer.toLowerCase().includes(query) ||
      booking.phone.includes(query) ||
      booking.id.toLowerCase().includes(query);

    const matchesHall =
      hall === "All halls" || booking.hall === hall;

    const matchesSource =
      source === "Online + walk-in" || booking.source === source;

    let matchesTab = true;

    // Initial screen shows all six rows like the Figma design.
    // Tabs filter the rows only after the user clicks a tab.
    if (tabClicked) {
      if (activeTab === "Needs reply") {
        matchesTab = booking.status === "Waiting for you";
      } else if (activeTab === "Upcoming") {
        matchesTab = ["Confirmed", "Waiting for you", "Reschedule asked"].includes(booking.status);
      } else if (activeTab === "Payment due") {
        matchesTab = booking.status === "Payment due";
      } else {
        matchesTab = booking.status.toLowerCase() === activeTab.toLowerCase();
      }
    }

    return matchesSearch && matchesHall && matchesSource && matchesTab;
  });

  const openDetails = (booking) => {
    navigate(`/booking-details/${booking.id}`);
  };

  const exportBookings = () => {
    const headers = ["Booking ID", "Customer", "Phone", "Date", "Hall", "Amount", "Status"];

    const rows = filteredBookings.map((b) => [
      b.id, b.customer, b.phone, b.date, b.hall, b.amount, b.status
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "crown-elite-bookings.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bookings-page">

      <div className="bookings-heading">
        <div>
          <h1>Bookings</h1>
          <p>Every online and walk-in booking for all your halls.</p>
        </div>

        <div className="bookings-heading-actions">
          <button className="export-btn" onClick={exportBookings}>
            <Download size={18} />
            Export
          </button>

          <button
            className="walkin-btn"
            onClick={() => setShowWalkIn(true)}
          >
            <Plus size={19} />
            Add walk-in booking
          </button>
        </div>
      </div>

      <div className="booking-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={activeTab === tab.label ? "booking-tab active" : "booking-tab"}
            onClick={() => {
              setActiveTab(tab.label);
              setTabClicked(true);
            }}
          >
            {tab.label}
            {tab.count !== undefined && <span>{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className="booking-filters">

        <div className="booking-search">
          <Search size={19} />
          <input
            placeholder="Search name, phone or booking no."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-select">
          <select value={hall} onChange={(e) => setHall(e.target.value)}>
            <option>All halls</option>
            <option>Grand Hall</option>
            <option>Crystal Room</option>
            <option>Garden Lawn</option>
          </select>
          <ChevronDown size={16} />
        </div>

        <div className="filter-select">
          <select defaultValue="Any date">
            <option>Any date</option>
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
          </select>
          <ChevronDown size={16} />
        </div>

        <div className="filter-select source-filter">
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option>Online + walk-in</option>
            <option>Online</option>
            <option>Walk-in</option>
          </select>
          <ChevronDown size={16} />
        </div>

      </div>

      <div className="booking-table-card">

        <div className="booking-table-scroll">
          <table className="booking-table">

            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Event date</th>
                <th>Hall</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className={booking.status === "Waiting for you" ? "waiting-row" : ""}
                >

                  <td>
                    <strong>{booking.id}</strong>
                    <small className="booking-source">
                      {booking.source === "Online" ? (
                        <><Globe size={13} /> Online</>
                      ) : (
                        <><UserRound size={13} /> Walk-in</>
                      )}
                    </small>
                  </td>

                  <td>
                    <strong>{booking.customer}</strong>
                    <small>{booking.phone}</small>
                  </td>

                  <td>
                    <strong>{booking.date}</strong>
                    <small>{booking.type}</small>
                  </td>

                  <td>{booking.hall}</td>

                  <td>
                    <strong>{money(booking.amount)}</strong>
                    <small className={booking.status === "Payment due" ? "payment-warning" : ""}>
                      {booking.paid}
                    </small>
                  </td>

                  <td>
                    <span className={`booking-status ${
                      booking.status === "Waiting for you" ? "status-waiting" :
                      booking.status === "Confirmed" ? "status-confirmed" :
                      booking.status === "Payment due" ? "status-payment" :
                      "status-reschedule"
                    }`}>
                      <i />
                      {booking.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className={booking.status === "Waiting for you" ? "reply-btn" : "view-btn"}
                      onClick={() => openDetails(booking)}
                    >
                      {booking.status === "Waiting for you" ? "Reply" : "View"}
                    </button>
                  </td>

                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="no-bookings">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="booking-pagination">
          <span>Showing {filteredBookings.length} of 38 bookings</span>

          <div>
            <button disabled>Previous</button>
            <button>Next</button>
          </div>
        </div>

      </div>

      {showWalkIn && (
        <div className="walkin-overlay" onClick={() => setShowWalkIn(false)}>
          <div className="walkin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowWalkIn(false)}>
              <X size={20} />
            </button>

            <h2>New walk-in booking</h2>
            <p>Walk-in booking form will be connected here.</p>

            <button
              className="walkin-btn"
              onClick={() => {
                setShowWalkIn(false);
                navigate("/booking-details/new");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Bookings;
