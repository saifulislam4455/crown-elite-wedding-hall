
import { useState } from "react";
import "../../styles/Inbox.css";

/* ICONS */
const Icons = {
  ChevronDown: () => (
    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="m6 9 6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  Paperclip: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  FileText: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
      <polyline points="14 2 14 8 20 8" strokeWidth="2" />
      <line x1="16" y1="13" x2="8" y2="13" strokeWidth="2" />
      <line x1="16" y1="17" x2="8" y2="17" strokeWidth="2" />
    </svg>
  ),

  Send: () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="22" y1="2" x2="11" y2="13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  Trash: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const threads = [
  {
    id: "hm",
    avatar: "HM",
    name: "Hira Malik",
    time: "2m",
    snippet: "Is Sat 5 Dec lunch free for 300?",
    tagType: "inquiry",
    tagText: "New inquiry",
  },
  {
    id: "ks",
    avatar: "KS",
    name: "Khan & Sons",
    time: "1h",
    snippet: "Can you add a projector?",
    tagType: "booking",
    tagText: "Booking",
  },
  {
    id: "ut",
    avatar: "UT",
    name: "Usman Tariq",
    time: "3h",
    snippet: "Can we move to 29 Nov?",
    tagType: "reschedule",
    tagText: "Reschedule",
  },
  {
    id: "na",
    avatar: "NA",
    name: "Nida A.",
    time: "Yesterday",
    snippet: "What's included in Platinum?",
    tagType: "quote",
    tagText: "Quote sent",
  },
];

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("Open 5");
  const [selectedThreadId, setSelectedThreadId] = useState("hm");
  const [replyText, setReplyText] = useState("");

  return (
    <main className="ib-content">
      <div className="ib-chat-card">

        {/* LEFT THREAD LIST */}
        <div className="ib-threads-pane">
          <div className="ib-threads-header">
            <h2 className="ib-inbox-title">Inbox</h2>

            <div className="ib-tabs">
              {["Open 5", "Mine", "Closed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`ib-tab-btn ${activeTab === tab ? "active" : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="ib-threads-list">
            {threads.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedThreadId(item.id)}
                className={`ib-thread-item ${
                  selectedThreadId === item.id ? "selected" : ""
                }`}
              >
                <div className="ib-thread-avatar">{item.avatar}</div>

                <div className="ib-thread-info">
                  <div className="ib-thread-top">
                    <span className="ib-thread-name">{item.name}</span>
                    <span className="ib-thread-time">{item.time}</span>
                  </div>

                  <p className="ib-thread-snippet">{item.snippet}</p>

                  <span className={`ib-pill ${item.tagType}`}>
                    <span className="ib-pill-dot" />
                    <span>{item.tagText}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT COLUMN */}
        <div className="ib-chat-pane">

          {/* CHAT HEADER */}
          <div className="ib-chat-header">
            <div className="ib-chat-user-left">
              <div className="ib-avatar">HM</div>

              <div>
                <h3 className="ib-chat-user-name">Hira Malik</h3>
                <p className="ib-chat-user-sub">
                  Walima · Sat 5 Dec · Lunch · 300 guests · Crystal Room
                </p>
              </div>
            </div>

            <button className="ib-assigned-btn">
              <span>Assigned: Me</span>
              <Icons.ChevronDown />
            </button>
          </div>

          {/* CHAT MESSAGES */}
          <div className="ib-messages-body">

            <div className="ib-msg-incoming">
              <p style={{ margin: 0 }}>
                Assalam-o-Alaikum. Is Sat 5 Dec lunch free for 300? We want
                Silver package but with fish instead of one starter. What
                would it cost?
              </p>
              <div className="ib-msg-time">10:02</div>
            </div>

            <div className="ib-msg-outgoing">
              <p style={{ margin: 0 }}>
                Walaikum Assalam Hira! Yes, Crystal Room is free. Let me
                send you a custom quote now.
              </p>

              <div className="ib-msg-time-out">
                <span>10:05</span>
                <span>✓✓</span>
              </div>
            </div>

            {/* CUSTOM QUOTE CARD */}
            <div className="ib-quote-card">
              <div className="ib-quote-header">
                <div className="ib-quote-title">
                  <Icons.FileText />
                  <span>New custom quote</span>
                </div>

                <span className="ib-quote-validity">
                  Valid for 72 hours
                </span>
              </div>

              <div className="ib-quote-item">
                <span className="ib-quote-item-name">
                  Silver package (fish instead of 1 starter)
                </span>
                <span className="ib-quote-item-calc">
                  300 × Rs 2,700
                </span>
                <span className="ib-quote-item-price">Rs 8,10,000</span>

                <button className="ib-quote-trash-btn">
                  <Icons.Trash />
                </button>
              </div>

              <div className="ib-quote-item">
                <span className="ib-quote-item-name">
                  Floral entrance
                </span>
                <span className="ib-quote-item-calc">
                  1 × Rs 60,000
                </span>
                <span className="ib-quote-item-price">Rs 60,000</span>

                <button className="ib-quote-trash-btn">
                  <Icons.Trash />
                </button>
              </div>

              <button className="ib-btn-add-item">
                <span>+ Add item</span>
              </button>

              {/* SUMMARY */}
              <div className="ib-quote-summary-row">
                <span>Discount</span>
                <span style={{ fontWeight: 600 }}>— Rs 20,000</span>
              </div>

              <div className="ib-quote-summary-row">
                <span>Sales tax (16%)</span>
                <span style={{ fontWeight: 600 }}>Rs 1,36,000</span>
              </div>

              <div className="ib-quote-summary-row total-row">
                <span className="label">Total</span>
                <span className="amount">Rs 9,86,000</span>
              </div>

              <div className="ib-quote-summary-row advance-row">
                <span>Customer pays now (25%)</span>
                <span className="amount">Rs 2,46,500</span>
              </div>

              {/* QUOTE ACTIONS */}
              <div className="ib-quote-actions">
                <button className="ib-btn-save-draft">
                  Save draft
                </button>

                <button className="ib-btn-send-quote">
                  <span>Send quote</span>
                  <Icons.Send />
                </button>
              </div>
            </div>
          </div>

          {/* CHAT FOOTER */}
          <div className="ib-chat-footer">

            <div className="ib-quick-actions">
              <button className="ib-quick-pill">Send menu PDF</button>
              <button className="ib-quick-pill">Share location</button>
              <button className="ib-quick-pill">Invite to visit</button>
            </div>

            <div className="ib-input-bar">
              <button className="ib-icon-action-btn" title="Attach file">
                <Icons.Paperclip />
              </button>

              <button className="ib-quote-btn-pill">
                <Icons.FileText />
                <span>Quote</span>
              </button>

              <div className="ib-text-input-wrap">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="ib-text-input"
                />
              </div>

              <button className="ib-send-btn" title="Send message">
                <Icons.Send />
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
