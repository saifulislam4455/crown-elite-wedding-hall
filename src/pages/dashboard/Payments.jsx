
import { useState } from "react";
import {
  Wallet,
  Clock3,
  TriangleAlert,
  Bell,
  Banknote,
} from "lucide-react";

import "../../styles/Payments.css";

const initialPayments = [
  {
    id: 1,
    customer: "Zara & Hamza",
    phone: "0301 222 1100",
    booking: "WB-2027-004402",
    bookingInfo: "Sat 21 Nov · Grand Hall",
    installment: "Final 25%",
    amount: "Rs 3,60,000",
    due: "12 Nov",
    status: "2 days late",
    type: "late",
    filter: "overdue",
  },
  {
    id: 2,
    customer: "Ahmed family",
    phone: "0333 221 0098",
    booking: "WK-0098 · walk-in",
    bookingInfo: "Sat 14 Nov · Crystal",
    installment: "Balance",
    amount: "Rs 2,10,000",
    due: "14 Nov",
    status: "Due today",
    type: "today",
    filter: "overdue",
  },
  {
    id: 3,
    customer: "Bilal Shah",
    phone: "0345 777 9090",
    booking: "WB-2027-004377",
    bookingInfo: "Sat 28 Nov · Lawn",
    installment: "2nd 50%",
    amount: "Rs 50,000",
    due: "8 Nov",
    status: "6 days late",
    type: "late",
    filter: "overdue",
  },
];

function SummaryCard({
  icon: Icon,
  badge,
  badgeType,
  label,
  amount,
  description,
}) {
  return (
    <div className="payment-summary-card">
      <div className="payment-summary-top">
        <div className="payment-summary-icon">
          <Icon size={22} />
        </div>

        <span className={`payment-summary-badge ${badgeType}`}>
          <span className="badge-dot" />
          {badge}
        </span>
      </div>

      <p className="payment-summary-label">{label}</p>

      <h2>{amount}</h2>

      <p className="payment-summary-description">
        {description}
      </p>
    </div>
  );
}

function Payments() {
  const [activeTab, setActiveTab] = useState("Overdue");
  const [payments, setPayments] = useState(initialPayments);
  const [reminders, setReminders] = useState(true);
  const [showReminderMessage, setShowReminderMessage] = useState(false);

  const tabs = [
    { name: "Overdue", count: 3 },
    { name: "Due soon", count: 6 },
    { name: "Paid", count: null },
    { name: "All", count: null },
  ];

  const filteredPayments =
    activeTab === "All"
      ? payments
      : activeTab === "Paid"
      ? payments.filter((payment) => payment.filter === "paid")
      : activeTab === "Due soon"
      ? payments.filter((payment) => payment.filter === "due")
      : payments.filter((payment) => payment.filter === "overdue");

  // Record Payment
  function recordPayment(id) {
    setPayments((previous) =>
      previous.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: "Paid",
              type: "paid",
              filter: "paid",
            }
          : payment
      )
    );
  }

  // Remind Customer
  function remindCustomer(customer) {
    window.alert(`Reminder prepared for ${customer}`);
  }

  // Remind All Overdue
  function remindAllOverdue() {
    setShowReminderMessage(true);

    setTimeout(() => {
      setShowReminderMessage(false);
    }, 3000);
  }

  // Record Cash Payment
  function recordCashPayment() {
    window.alert("Record cash payment feature will be connected soon.");
  }

  return (
    <div className="payments-page">

      {/* Heading */}

      <div className="payments-heading">
        <div>
          <h1>Payments</h1>

          <p>
            Track advances and installments for every booking — online and cash.
          </p>
        </div>

        <div className="payments-heading-actions">

          <button
            type="button"
            className="record-cash-button"
            onClick={recordCashPayment}
          >
            <Banknote size={17} />
            Record cash payment
          </button>

          <button
            type="button"
            className="remind-overdue-button"
            onClick={remindAllOverdue}
          >
            <Bell size={17} />
            Remind all overdue
          </button>

        </div>
      </div>

      {/* Summary Cards */}

      <div className="payment-summary-grid">

        <SummaryCard
          icon={Wallet}
          badge="+18%"
          badgeType="green"
          label="Collected this month"
          amount="Rs 48.2 lakh"
          description="Online Rs 39 lakh · cash Rs 9.2 lakh"
        />

        <SummaryCard
          icon={Clock3}
          badge="6 due"
          badgeType="orange"
          label="Due in next 7 days"
          amount="Rs 11.4 lakh"
          description="6 installments"
        />

        <SummaryCard
          icon={TriangleAlert}
          badge="3 late"
          badgeType="red"
          label="Overdue"
          amount="Rs 6.2 lakh"
          description="3 customers"
        />

      </div>

      {/* Tabs */}

      <div className="payments-tabs">

        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.name}
            className={`payments-tab ${
              activeTab === tab.name ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}

            {tab.count !== null && (
              <span>{tab.count}</span>
            )}
          </button>
        ))}

      </div>

      {/* Payments Table */}

      <div className="payments-table-wrapper">

        <table className="payments-table">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Booking</th>
              <th>Installment</th>
              <th>Amount</th>
              <th>Due</th>
              <th>Status</th>
              <th className="payment-actions-heading"></th>
            </tr>
          </thead>

          <tbody>

            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>

                  <td>
                    <div className="payment-customer">
                      <strong>{payment.customer}</strong>
                      <span>{payment.phone}</span>
                    </div>
                  </td>

                  <td>
                    <div className="payment-booking">
                      <strong>{payment.booking}</strong>
                      <span>{payment.bookingInfo}</span>
                    </div>
                  </td>

                  <td>{payment.installment}</td>

                  <td>
                    <strong className="payment-amount">
                      {payment.amount}
                    </strong>
                  </td>

                  <td>{payment.due}</td>

                  <td>
                    <span className={`payment-status ${payment.type}`}>
                      <span className="badge-dot" />
                      {payment.status}
                    </span>
                  </td>

                  <td>
                    <div className="payment-row-actions">

                      {payment.filter !== "paid" && (
                        <>
                          <button
                            type="button"
                            className="payment-remind-button"
                            onClick={() =>
                              remindCustomer(payment.customer)
                            }
                          >
                            <Bell size={15} />
                            Remind
                          </button>

                          <button
                            type="button"
                            className="payment-record-button"
                            onClick={() => recordPayment(payment.id)}
                          >
                            Record
                          </button>
                        </>
                      )}

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="payments-empty">
                  No payments found.
                </td>
              </tr>
            )}

          </tbody>
        </table>

      </div>

      {/* Automatic Reminders */}

      <div className="payment-reminder-banner">

        <Bell size={20} />

        <div>
          <strong>
            {showReminderMessage
              ? "Reminder action started"
              : `Automatic reminders are ${reminders ? "on" : "off"}`}
          </strong>

          <p>
            Customers get SMS + app alerts 7, 3 and 1 day before each due
            date, and on the day it’s late.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setReminders((previous) => !previous)}
        >
          {reminders ? "Change" : "Turn on"}
        </button>

      </div>

    </div>
  );
}

export default Payments;
