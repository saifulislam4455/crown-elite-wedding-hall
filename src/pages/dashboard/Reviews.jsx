import { useState } from "react";
import { Star } from "lucide-react";
import "../../styles/Reviews.css";

const initialReviews = [
  {
    id: 1,
    name: "Tariq A.",
    initials: "TA",
    event: "Barat",
    date: "7 Nov",
    hall: "Grand Hall",
    rating: 3,
    comment:
      "Food was very good but the AC in the Grand Hall was weak for the first hour. Staff tried their best.",
    reply:
      "Thank you Tariq, and sorry about the AC. We've serviced all units and added two standby coolers for the Grand Hall.",
  },
  {
    id: 2,
    name: "Sana F.",
    initials: "SF",
    event: "Walima",
    date: "31 Oct",
    hall: "Crystal Room",
    rating: 5,
    comment:
      "Everything was perfect. Special thanks to the manager for handling our elders with care.",
    reply: "Thank you Sana! It was an honour to host your family.",
    replyDate: "1 Nov",
  },
  {
    id: 3,
    name: "Hira M.",
    initials: "HM",
    event: "Mehndi",
    date: "28 Oct",
    hall: "Garden Lawn",
    rating: 5,
    comment:
      "Beautiful decorations and excellent service. Our family had a wonderful experience.",
    reply: "",
  },
  {
    id: 4,
    name: "Usman K.",
    initials: "UK",
    event: "Wedding",
    date: "25 Oct",
    hall: "Grand Hall",
    rating: 2,
    comment:
      "The arrangements were good but parking management needs improvement.",
    reply: "",
  },
];

const ratingDetails = [
  { label: "Food", value: 4.9, width: "98%" },
  { label: "Service", value: 4.7, width: "94%" },
  { label: "Ambience", value: 4.9, width: "98%" },
  { label: "Value", value: 4.5, width: "90%" },
];

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [activeTab, setActiveTab] = useState("Needs reply");
  const [replyText, setReplyText] = useState({
    1: initialReviews[0].reply,
  });

  const needsReply = reviews.filter((review) => !review.replyDate && !review.reply?.includes("Thank you"));

  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "Needs reply") return !review.replyDate && !review.reply?.includes("Thank you");
    if (activeTab === "5 stars") return review.rating === 5;
    if (activeTab === "1–3 stars") return review.rating >= 1 && review.rating <= 3;
    return true;
  });

  const handleReply = (id) => {
    const message = replyText[id]?.trim();

    if (!message) return;

    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              reply: message,
              replyDate: "Just now",
            }
          : review
      )
    );

    setReplyText((current) => ({
      ...current,
      [id]: "",
    }));
  };

  return (
    <main className="reviews-page">
      <div className="reviews-heading">
        <h1>Reviews</h1>
        <p>Reply to every review — families read your answers too.</p>
      </div>

      <div className="reviews-layout">
        {/* LEFT RATING SUMMARY */}
        <section className="rating-summary">
          <h2>4.8</h2>

          <div className="summary-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={21} fill="currentColor" />
            ))}
          </div>

          <p className="total-reviews">126 reviews · 98% replied</p>

          <div className="rating-breakdown">
            {ratingDetails.map((item) => (
              <div className="rating-row" key={item.label}>
                <span>{item.label}</span>

                <div className="rating-progress">
                  <div style={{ width: item.width }} />
                </div>

                <strong>{item.value.toFixed(1)}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT REVIEWS */}
        <section className="reviews-list-section">
          <div className="reviews-tabs">
            {["Needs reply", "All", "5 stars", "1–3 stars"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === "Needs reply" && (
                  <span>{needsReply.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="reviews-list">
            {filteredReviews.length === 0 ? (
              <div className="empty-reviews">
                <h3>No reviews found</h3>
                <p>There are no reviews in this category.</p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <article className="review-card" key={review.id}>
                  <div className="review-top">
                    <div className="review-customer">
                      <div className="customer-avatar">
                        {review.initials}
                      </div>

                      <div>
                        <h3>{review.name}</h3>
                        <p>
                          {review.event} · {review.date} · {review.hall}
                        </p>
                      </div>
                    </div>

                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={17}
                          fill={star <= review.rating ? "currentColor" : "none"}
                          className={
                            star <= review.rating ? "filled" : "empty"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <p className="review-comment">{review.comment}</p>

                  {review.replyDate ? (
                    <div className="posted-reply">
                      <strong>Your reply · {review.replyDate}</strong>
                      <p>{review.reply}</p>
                    </div>
                  ) : (
                    <div className="reply-box">
                      <label htmlFor={`reply-${review.id}`}>
                        Your reply (shown publicly)
                      </label>

                      <textarea
                        id={`reply-${review.id}`}
                        value={replyText[review.id] || ""}
                        onChange={(e) =>
                          setReplyText((current) => ({
                            ...current,
                            [review.id]: e.target.value,
                          }))
                        }
                        placeholder="Write a polite reply to this review..."
                      />

                      <div className="reply-actions">
                        <button
                          className="report-review"
                          onClick={() =>
                            alert("Report review feature will be connected later.")
                          }
                        >
                          Report review
                        </button>

                        <button
                          className="post-reply-btn"
                          onClick={() => handleReply(review.id)}
                          disabled={!replyText[review.id]?.trim()}
                        >
                          Post reply
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Reviews;