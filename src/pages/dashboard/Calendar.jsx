
import { useState } from "react";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Ban,
  X,
  Check,
  Clock3,
  CalendarCheck,
} from "lucide-react";

import "../../styles/Calendar.css";

const halls = [
  "All halls",
  "Grand Hall",
  "Crystal Room",
  "Garden Lawn",
];

const bookings = {
  2: [
    { type: "booked", text: "L · Ali", hall: "Grand Hall" },
    { type: "booked", text: "D · Raza", hall: "Crystal Room" },
  ],
  6: [
    { type: "free", text: "Lunch · free", hall: "Grand Hall" },
    { type: "booked", text: "D · Shah", hall: "Crystal Room" },
  ],
  8: [
    { type: "free", text: "Lunch · free", hall: "Grand Hall" },
    { type: "waiting", text: "D · On hold", hall: "Garden Lawn" },
  ],
  13: [
    { type: "booked", text: "L · Khan", hall: "Grand Hall" },
    { type: "booked", text: "D · Malik", hall: "Crystal Room" },
  ],
  14: [
    { type: "booked", text: "L · Ahmed", hall: "Grand Hall" },
    { type: "booked", text: "D · Sana", hall: "Grand Hall" },
  ],
  17: [
    { type: "free", text: "Lunch · free", hall: "Grand Hall" },
    { type: "waiting", text: "D · Khan & Sons", hall: "Garden Lawn" },
  ],
  19: [
    { type: "booked", text: "L · Fatima", hall: "Crystal Room" },
    { type: "free", text: "Dinner · free", hall: "Grand Hall" },
  ],
  20: [
    { type: "blocked", text: "Maintenance", hall: "Grand Hall" },
    { type: "blocked", text: "Maintenance", hall: "Grand Hall" },
  ],
  21: [
    { type: "booked", text: "L · Butt", hall: "Grand Hall" },
    { type: "booked", text: "D · Hussain", hall: "Crystal Room" },
  ],
  28: [
    { type: "booked", text: "L · Rehman", hall: "Grand Hall" },
    { type: "booked", text: "D · Javed", hall: "Crystal Room" },
  ],
};

const weekdayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getSlots(day, month, year) {
  if (month === 10 && year === 2026 && bookings[day]) {
    return bookings[day];
  }

  if (day % 7 === 0) {
    return [
      { type: "booked", text: "L · Ahmed", hall: "Grand Hall" },
      { type: "booked", text: "D · Family", hall: "Crystal Room" },
    ];
  }

  return [
    { type: "free", text: "Lunch · free", hall: "Grand Hall" },
    { type: "free", text: "Dinner · free", hall: "Grand Hall" },
  ];
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      date,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentMonth: date.getMonth() === month,
    };
  });
}

function formatMonth(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatSelectedDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 10, 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 10, 17)
  );

  const [selectedHall, setSelectedHall] = useState("All halls");
  const [viewMode, setViewMode] = useState("Month");
  const [notice, setNotice] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const allDays = getCalendarDays(year, month);

  const visibleDays =
    viewMode === "Month"
      ? allDays
      : (() => {
          const weekStart = new Date(selectedDate);
          const mondayOffset = (weekStart.getDay() + 6) % 7;

          weekStart.setDate(
            weekStart.getDate() - mondayOffset
          );

          return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + index);

            return {
              date,
              day: date.getDate(),
              month: date.getMonth(),
              year: date.getFullYear(),
              isCurrentMonth: date.getMonth() === month,
            };
          });
        })();

  const slots = getSlots(
    selectedDate.getDate(),
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  );

  const filteredSlots =
    selectedHall === "All halls"
      ? slots
      : slots.filter((slot) => slot.hall === selectedHall);

  const lunchSlot =
    filteredSlots[0] || {
      type: "free",
      text: "No booking",
      hall: selectedHall,
    };

  const dinnerSlot =
    filteredSlots[1] || {
      type: "free",
      text: "No booking",
      hall: selectedHall,
    };

  function changeMonth(amount) {
    const newDate = new Date(year, month + amount, 1);

    setCurrentDate(newDate);
  }

  function selectDate(item) {
    setSelectedDate(new Date(item.date));

    if (item.month !== month || item.year !== year) {
      setCurrentDate(new Date(item.year, item.month, 1));
    }
  }

  function handleAction(message) {
    setNotice(message);
  }

  function renderSlot(slot, index) {
    if (!slot) return null;

    if (
      selectedHall !== "All halls" &&
      slot.hall !== selectedHall
    ) {
      return null;
    }

    return (
      <div
        key={index}
        className={`calendar-slot slot-${slot.type}`}
        title={slot.text}
      >
        {slot.text}
      </div>
    );
  }

  function renderStatus(type) {
    const statusLabels = {
      free: "Free",
      booked: "Booked",
      blocked: "Blocked",
      waiting: "Waiting",
    };

    return statusLabels[type] || "Unknown";
  }

  return (
    <main className="calendar-content">

      {/* PAGE HEADING */}
      <div className="calendar-page-heading">
        <div>
          <h1>Calendar</h1>
          <p>
            All online and walk-in bookings in one place — no double bookings.
          </p>
        </div>

        <div className="calendar-heading-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              handleAction(
                `Select ${formatSelectedDate(selectedDate)} to block this date.`
              )
            }
          >
            <Ban size={17} />
            Block dates
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              handleAction(
                `Walk-in booking requested for ${formatSelectedDate(selectedDate)}.`
              )
            }
          >
            <Plus size={18} />
            Add walk-in booking
          </button>
        </div>
      </div>

      {/* NOTICE */}
      {notice && (
        <div className="calendar-notice">
          <span>{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Close notice"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* TOOLBAR */}
      <div className="calendar-toolbar">

        <div className="month-navigation">
          <button
            type="button"
            className="month-arrow"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>

          <strong>{formatMonth(currentDate)}</strong>

          <button
            type="button"
            className="month-arrow"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* HALL FILTERS */}
        <div className="hall-filters">
          {halls.map((hall) => (
            <button
              type="button"
              key={hall}
              className={
                selectedHall === hall ? "selected" : ""
              }
              onClick={() => setSelectedHall(hall)}
            >
              {hall}
            </button>
          ))}
        </div>

        {/* VIEW SWITCH */}
        <div className="view-switch">
          {["Month", "Week"].map((view) => (
            <button
              type="button"
              key={view}
              className={
                viewMode === view ? "selected" : ""
              }
              onClick={() => setViewMode(view)}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* LEGEND */}
      <div className="calendar-legend">
        <span>
          <i className="legend-free" />
          Free
        </span>

        <span>
          <i className="legend-waiting" />
          On hold / waiting
        </span>

        <span>
          <i className="legend-booked" />
          Booked
        </span>

        <span>
          <i className="legend-blocked" />
          Blocked
        </span>
      </div>

      {/* CALENDAR LAYOUT */}
      <div className="calendar-layout">

        {/* CALENDAR GRID */}
        <section className="calendar-grid-card">

          <div className="weekday-row">
            {weekdayNames.map((day) => (
              <span key={day}>{day.slice(0, 3)}</span>
            ))}
          </div>

          <div
            className={`days-grid ${
              viewMode === "Week" ? "week-grid" : ""
            }`}
          >
            {visibleDays.map((item) => {
              const daySlots = getSlots(
                item.day,
                item.month,
                item.year
              );

              const isSelected =
                item.date.toDateString() ===
                selectedDate.toDateString();

              const isToday =
                item.date.toDateString() ===
                new Date().toDateString();

              return (
                <button
                  type="button"
                  key={item.date.toISOString()}
                  onClick={() => selectDate(item)}
                  className={[
                    "calendar-day",
                    !item.isCurrentMonth ? "outside-month" : "",
                    isSelected ? "selected-day" : "",
                  ].join(" ")}
                >
                  <span
                    className={`day-number ${
                      isToday ? "today" : ""
                    }`}
                  >
                    {item.day}
                  </span>

                  <div className="day-slots">
                    {daySlots.map(renderSlot)}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* SELECTED DAY PANEL */}
        <aside className="selected-day-panel">
          <div>
            <h2>{formatSelectedDate(selectedDate)}</h2>

            <p className="panel-subtitle">
              {selectedHall}
            </p>

            {/* LUNCH */}
            <div className="slot-detail-card">
              <div className="slot-detail-heading">
                <strong>
                  <CalendarDays size={16} />
                  Lunch · 12–4 PM
                </strong>

                <span className={`status-pill ${lunchSlot.type}`}>
                  {renderStatus(lunchSlot.type)}
                </span>
              </div>

              <h3>
                {lunchSlot.type === "free"
                  ? "Free"
                  : lunchSlot.text}
              </h3>

              <p>
                {lunchSlot.type === "free"
                  ? "Available online"
                  : "Check booking details"}
              </p>
            </div>

            {/* DINNER */}
            <div className="slot-detail-card">
              <div className="slot-detail-heading">
                <strong>
                  <Clock3 size={16} />
                  Dinner · 7–11 PM
                </strong>

                <span className={`status-pill ${dinnerSlot.type}`}>
                  {renderStatus(dinnerSlot.type)}
                </span>
              </div>

              <h3>
                {dinnerSlot.type === "free"
                  ? "Free"
                  : dinnerSlot.text}
              </h3>

              <p>
                {dinnerSlot.type === "waiting"
                  ? "Paid Rs 3,71,200 · reply in 18 h"
                  : dinnerSlot.type === "free"
                  ? "Available online"
                  : "Check booking details"}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="selected-day-actions">
            <button
              type="button"
              className="primary-button full-width"
              onClick={() =>
                handleAction(
                  `Booking action selected for ${formatSelectedDate(selectedDate)}.`
                )
              }
            >
              <CalendarCheck size={17} />
              Accept booking
            </button>

            <button
              type="button"
              className="secondary-button full-width"
              onClick={() =>
                handleAction(
                  `Walk-in booking selected for ${formatSelectedDate(selectedDate)}.`
                )
              }
            >
              <Plus size={17} />
              Add walk-in
            </button>

            <button
              type="button"
              className="text-button"
              onClick={() =>
                handleAction(
                  `${formatSelectedDate(selectedDate)} selected for blocking.`
                )
              }
            >
              <Ban size={16} />
              Block this day
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Calendar;
