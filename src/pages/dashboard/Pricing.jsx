
import { useState } from "react";
import {
  CalendarDays,
  Clock,
  UserRound,
  Sparkles,
  Pencil,
  Plus,
  Info,
  ChevronLeft,
  ChevronRight,
  Save,
} from "lucide-react";

import "../../styles/Pricing.css";

const initialRules = [
  {
    id: 1,
    title: "Specific date",
    subtitle: "31 Dec 2026 · New Year's Eve",
    value: "Rs 4,500",
    type: "date",
  },
  {
    id: 2,
    title: "Wedding season",
    subtitle: "1 Nov – 28 Feb",
    value: "+ 20%",
    type: "season",
  },
  {
    id: 3,
    title: "Weekends",
    subtitle: "Fri, Sat, Sun",
    value: "+ 10%",
    type: "weekend",
  },
  {
    id: 4,
    title: "Normal",
    subtitle: "All other days",
    value: "Rs 2,500",
    type: "normal",
  },
];

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

function Pricing() {
  const [hall, setHall] = useState("Grand Hall");
  const [priceType, setPriceType] = useState("Per guest");
  const [normalPrice, setNormalPrice] = useState("2500");
  const [minimumGuests, setMinimumGuests] = useState("300");
  const [rules, setRules] = useState(initialRules);
  const [month, setMonth] = useState(11);
  const [year, setYear] = useState(2026);
  const [saved, setSaved] = useState(false);

  // Change calendar month
  const changeMonth = (direction) => {
    const date = new Date(year, month + direction, 1);
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  };

  // Add new pricing rule
  const addRule = () => {
    const newRule = {
      id: Date.now(),
      title: "New price rule",
      subtitle: "Click edit to configure this rule",
      value: "+ 10%",
      type: "custom",
    };

    setRules((previousRules) => [...previousRules, newRule]);
  };

  // Edit pricing rule
  const editRule = (rule) => {
    const newValue = window.prompt(
      `Enter price or percentage for ${rule.title}:`,
      rule.value
    );

    if (newValue === null || !newValue.trim()) return;

    setRules((previousRules) =>
      previousRules.map((item) =>
        item.id === rule.id
          ? { ...item, value: newValue.trim() }
          : item
      )
    );
  };

  // Convert values into numbers
  const getNumericValue = (value) => {
    return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
  };

  // Format calendar price
  const formatPrice = (price) => {
    if (price >= 1000) {
      return `${(price / 1000).toFixed(1)}k`;
    }

    return String(Math.round(price));
  };

  // Calculate price for each date
  const getPriceForDay = (day) => {
    const date = new Date(year, month, day);
    const weekday = date.getDay();

    const specialRule = rules.find((rule) => rule.type === "date");
    const seasonRule = rules.find((rule) => rule.type === "season");
    const weekendRule = rules.find((rule) => rule.type === "weekend");

    const basePrice = Number(normalPrice) || 0;

    // Specific date has highest priority
    if (
      year === 2026 &&
      month === 11 &&
      day === 31 &&
      specialRule
    ) {
      return {
        price: getNumericValue(specialRule.value),
        type: "special",
      };
    }

    // Wedding season: November to February
    const isWeddingSeason = [10, 11, 0, 1].includes(month);

    if (isWeddingSeason && seasonRule) {
      const percentage = getNumericValue(seasonRule.value);

      return {
        price: basePrice + (basePrice * percentage) / 100,
        type: "season",
      };
    }

    // Weekend: Friday, Saturday, Sunday
    if ([5, 6, 0].includes(weekday) && weekendRule) {
      const percentage = getNumericValue(weekendRule.value);

      return {
        price: basePrice + (basePrice * percentage) / 100,
        type: "weekend",
      };
    }

    return {
      price: basePrice,
      type: "normal",
    };
  };

  // Save prices
  const savePrices = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  // Calendar calculations
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <main className="pricing-page">
      <div className="pricing-heading">
        <div>
          <h1>Pricing</h1>
          <p>
            Set your normal price, then add weekend and wedding-season
            changes. Specific dates override everything.
          </p>
        </div>

        <button className="save-button" onClick={savePrices}>
          <Save size={17} />
          {saved ? "Saved ✓" : "Save prices"}
        </button>
      </div>

      <div className="pricing-layout">
        {/* LEFT CONTENT */}
        <div className="pricing-left">

          {/* NORMAL PRICING */}
          <section className="pricing-card normal-card">
            <div className="hall-select-wrapper">
              <select
                className="hall-select"
                value={hall}
                onChange={(e) => setHall(e.target.value)}
              >
                <option>Grand Hall</option>
                <option>Royal Hall</option>
                <option>Garden Hall</option>
              </select>
            </div>

            <div className="pricing-tabs">
              {["Per guest", "Fixed hall rent", "Package only"].map(
                (type) => (
                  <button
                    key={type}
                    className={`pricing-tab ${
                      priceType === type ? "active" : ""
                    }`}
                    onClick={() => setPriceType(type)}
                  >
                    {type}
                  </button>
                )
              )}
            </div>

            <div className="price-inputs">
              <div className="input-group">
                <label>
                  {priceType === "Per guest"
                    ? "Normal price per guest"
                    : priceType === "Fixed hall rent"
                    ? "Normal fixed hall rent"
                    : "Normal package price"}
                </label>

                <div className="price-input">
                  <span>Rs</span>
                  <input
                    type="number"
                    min="0"
                    value={normalPrice}
                    onChange={(e) => setNormalPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Minimum guests charged</label>
                <input
                  type="number"
                  min="0"
                  value={minimumGuests}
                  onChange={(e) => setMinimumGuests(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* PRICE RULES */}
          <section className="pricing-card rules-card">
            <div className="rules-header">
              <div>
                <h2>Price changes</h2>
                <p>
                  Priority: Specific date → Season → Weekend → Normal
                </p>
              </div>

              <button className="add-rule-button" onClick={addRule}>
                <Plus size={17} /> Add rule
              </button>
            </div>

            <div className="rules-list">
              {rules.map((rule, index) => (
                <div className="rule-item" key={rule.id}>
                  <div className="rule-number">{index + 1}</div>

                  <div className="rule-icon">
                    {rule.type === "date" && <CalendarDays size={19} />}
                    {rule.type === "season" && <Sparkles size={19} />}
                    {rule.type === "weekend" && <Clock size={19} />}
                    {rule.type === "normal" && <UserRound size={19} />}
                    {rule.type === "custom" && <Plus size={19} />}
                  </div>

                  <div className="rule-content">
                    <h3>{rule.title}</h3>
                    <p>{rule.subtitle}</p>
                  </div>

                  <div className={`rule-value ${rule.type}`}>
                    {rule.value}
                  </div>

                  <button
                    className="edit-rule-button"
                    onClick={() => editRule(rule)}
                    aria-label={`Edit ${rule.title}`}
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="info-message">
              <Info size={17} />
              Price changes never affect bookings already made.
            </div>
          </section>
        </div>

        {/* RIGHT CONTENT: PRICE PREVIEW */}
        <section className="pricing-card preview-card">
          <h2>Price preview</h2>

          <p className="preview-subtitle">
            {hall} · {priceType === "Per guest" ? "Dinner · per guest" : priceType}
          </p>

          <div className="calendar-header">
            <button
              className="pricing-calendar-nav"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft size={19} />
            </button>

            <h3>
              {months[month]} {year}
            </h3>

            <button
              className="pricing-calendar-nav"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight size={19} />
            </button>
          </div>

          <div className="calendar-grid">
            {["M", "T", "W", "T", "F", "S", "S"].map(
              (day, index) => (
                <div className="weekday" key={index}>
                  {day}
                </div>
              )
            )}

            {Array.from({ length: offset }).map((_, index) => (
              <div className="calendar-empty" key={`empty-${index}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const data = getPriceForDay(day);

              return (
                <div
                  key={day}
                  className={`pricing-calendar-day ${data.type}`}
                  title={`${day} ${months[month]}: Rs ${Math.round(data.price).toLocaleString("en-PK")}`}
                >
                  <span className="pricing-day-number">{day}</span>
                  <span className="day-price">
                    {formatPrice(data.price)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pricing-calendar-legend">
            <span className="legend-item">
              <i className="legend-normal" /> Normal
            </span>
            <span className="legend-item">
              <i className="legend-weekend" /> Weekend
            </span>
            <span className="legend-item">
              <i className="legend-season" /> Season
            </span>
            <span className="legend-item">
              <i className="legend-special" /> Special date
            </span>
          </div>

          <div className="preview-note">
            Minimum guests charged: {minimumGuests || 0}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Pricing;
