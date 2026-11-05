import { useState } from "react";
import {
  CalendarDays,
  Wallet,
  Building2,
  RefreshCw,
  Download,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import "../../styles/Reports.css";

const occupancyData = [
  {
    hall: "Grand Hall",
    values: [55, 48, 62, 81, 96, 98],
  },
  {
    hall: "Crystal Room",
    values: [40, 38, 51, 70, 88, 91],
  },
  {
    hall: "Garden Lawn",
    values: [20, 15, 22, 64, 90, 85],
  },
];

const eventData = [
  { name: "Barat", bookings: 48 },
  { name: "Walima", bookings: 41 },
  { name: "Mehndi", bookings: 22 },
  { name: "Corporate", bookings: 12 },
  { name: "Other", bookings: 9 },
];

const bookingSources = [
  { label: "Online (app + web)", value: "96 · 73%" },
  { label: "Walk-in / phone", value: "36 · 27%" },
  { label: "Average advance paid", value: "27%" },
  { label: "Average guests", value: "412" },
];

const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Reports() {
  const [period, setPeriod] = useState("Jul – Dec 2026");

  const stats = [
    {
      title: "Bookings",
      value: "132",
      note: "+24 vs last year",
      change: "+22%",
      icon: CalendarDays,
      status: "positive",
    },
    {
      title: "Revenue",
      value: "Rs 2.1 crore",
      note: "After commission",
      change: "+31%",
      icon: Wallet,
      status: "positive",
    },
    {
      title: "Occupancy",
      value: "71%",
      note: "Weekends 96%",
      change: "+9%",
      icon: Building2,
      status: "positive",
    },
    {
      title: "Cancellations",
      value: "4",
      note: "3%",
      change: "-2",
      icon: RefreshCw,
      status: "neutral",
    },
  ];

  const exportExcel = () => {
    const rows = [
      ["Crown Elite - Reports"],
      ["Period", period],
      [],
      ["Performance", "Value", "Change", "Details"],
      ...stats.map((item) => [
        item.title,
        item.value,
        item.change,
        item.note,
      ]),
      [],
      ["Hall Occupancy"],
      ["Hall", ...months],
      ...occupancyData.map((hall) => [hall.hall, ...hall.values.map((value) => `${value}%`)]),
      [],
      ["Event Type", "Bookings"],
      ...eventData.map((item) => [item.name, item.bookings]),
      [],
      ["Booking Sources / Details", "Value"],
      ...bookingSources.map((item) => [item.label, item.value]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Crown-Elite-Reports-${period.replaceAll(" ", "-")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getOccupancyClass = (value) => {
    if (value >= 85) return "occupancy-high";
    if (value >= 60) return "occupancy-medium";
    if (value >= 35) return "occupancy-low";
    return "occupancy-very-low";
  };

  return (
    <main className="reports-page">
      {/* PAGE HEADING */}
      <div className="reports-heading">
        <div>
          <h1>Reports</h1>
          <p>Simple numbers to plan your season.</p>
        </div>

        <div className="reports-heading-actions">
          <div className="period-select-wrap">
            <CalendarDays size={17} />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              aria-label="Select report period"
            >
              <option>Jul – Dec 2026</option>
              <option>Jan – Jun 2026</option>
              <option>Jan – Dec 2026</option>
              <option>Jul – Dec 2025</option>
            </select>

            <ChevronDown size={16} className="period-chevron" />
          </div>

          <button className="export-button" onClick={exportExcel}>
            <Download size={18} />
            Export Excel
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <section className="report-stats">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article className="report-stat-card" key={item.title}>
              <div className="stat-card-top">
                <div className="stat-icon">
                  <Icon size={21} />
                </div>

                <span className={`stat-change ${item.status}`}>
                  <span className="change-dot">●</span>
                  {item.change}
                </span>
              </div>

              <p className="stat-title">{item.title}</p>
              <h2>{item.value}</h2>
              <span className="stat-note">{item.note}</span>
            </article>
          );
        })}
      </section>

      {/* OCCUPANCY HEATMAP */}
      <section className="occupancy-card">
        <div className="section-heading">
          <h2>How full were your halls?</h2>
          <p>% of lunch + dinner slots booked</p>
        </div>

        <div className="occupancy-table-wrap">
          <div className="occupancy-table">
            <div className="occupancy-row occupancy-header">
              <div className="hall-name-cell" />

              {months.map((month) => (
                <div className="month-cell" key={month}>
                  {month}
                </div>
              ))}
            </div>

            {occupancyData.map((hall) => (
              <div className="occupancy-row" key={hall.hall}>
                <div className="hall-name-cell">{hall.hall}</div>

                {hall.values.map((value, index) => (
                  <div
                    className={`occupancy-cell ${getOccupancyClass(value)}`}
                    key={`${hall.hall}-${months[index]}`}
                  >
                    {value}%
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIP BANNER */}
      <section className="report-tip">
        <div className="tip-icon">
          <Sparkles size={20} />
        </div>

        <div className="tip-content">
          <h3>Tip: Garden Lawn is mostly empty Jul–Sep</h3>
          <p>
            Try a 15% weekday discount in summer — similar halls filled 30%
            more slots.
          </p>
        </div>

        <button
          className="create-discount-button"
          onClick={() => {
            window.location.href = "/pricing";
          }}
        >
          Create discount
        </button>
      </section>

      {/* BOTTOM REPORT CARDS */}
      <section className="reports-bottom-grid">
        {/* EVENT TYPE */}
        <article className="report-detail-card">
          <h2>By event type</h2>

          <div className="event-bars">
            {eventData.map((item) => (
              <div className="event-bar-row" key={item.name}>
                <span className="event-name">{item.name}</span>

                <div className="event-progress">
                  <div
                    className="event-progress-fill"
                    style={{ width: `${(item.bookings / 48) * 100}%` }}
                  />
                </div>

                <span className="event-count">
                  {item.bookings} bookings
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* BOOKING SOURCES */}
        <article className="report-detail-card sources-card">
          <h2>Where bookings came from</h2>

          <div className="sources-list">
            {bookingSources.map((item) => (
              <div className="source-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default Reports;