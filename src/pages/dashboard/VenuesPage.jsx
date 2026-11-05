
import { useState } from "react";
import {
  Eye,
  Save,
  Plus,
  Building2,
  UsersRound,
  Sun,
  Moon,
  Pencil,
  MoreVertical,
  Layers,
  Check,
  X,
} from "lucide-react";

import "../../styles/VenuesPage.css";

const initialHalls = [
  {
    id: 1,
    name: "Grand Hall",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
    capacity: "300 – 1,000 guests",
    minimum: "Min 300 for booking",
    facilities: "Indoor · AC · Separate ladies seating",
    live: true,
  },
  {
    id: 2,
    name: "Crystal Room",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
    capacity: "150 – 300 guests",
    minimum: "Min 120",
    facilities: "Indoor · AC",
    live: true,
  },
 {
  id: 3,
  name: "Garden Lawn",
  image:
    "https://cdn0.weddingwire.com/vendor/917490/3_2/1920/jpg/south-lawn-tent-boho_51_94719-172296645710845.jpeg",
  capacity: "Up to 800 guests",
  minimum: "Min 200",
  facilities: "Outdoor · Generator",
  live: true,
},
];

const tabs = [
  "Details",
  "Halls inside",
  "Time slots",
  "Photos",
  "Amenities",
  "House rules",
];

function VenuesPage() {
  const [activeTab, setActiveTab] = useState("Halls inside");
  const [halls, setHalls] = useState(initialHalls);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingHall, setEditingHall] = useState(null);
  const [saved, setSaved] = useState(false);

  // Add new hall
  const addHall = () => {
    if (halls.length >= 5) {
      alert("Your Gold plan allows a maximum of 5 halls.");
      return;
    }

    const newHall = {
      id: Date.now(),
      name: "New Hall",
      image:
        "https://images.squarespace-cdn.com/content/v1/6760417fbfafd84b96fa625b/8460ae60-95c2-4928-ac88-fa0067943ec6/suffolk-wedding-venue-historic-sailcloth.jpg",
      capacity: "100 – 200 guests",
      minimum: "Min 100",
      facilities: "Indoor · AC",
      live: false,
    };

    setHalls((previous) => [...previous, newHall]);
    setEditingHall({ ...newHall });
    setMenuOpen(null);
  };

  // Update hall
  const updateHall = () => {
    if (!editingHall || !editingHall.name.trim()) {
      alert("Please enter a hall name.");
      return;
    }

    setHalls((previous) =>
      previous.map((hall) =>
        hall.id === editingHall.id ? editingHall : hall
      )
    );

    setEditingHall(null);
  };

  // Remove hall
  const removeHall = (id) => {
    setHalls((previous) =>
      previous.filter((hall) => hall.id !== id)
    );

    setMenuOpen(null);
  };

  // Save changes
  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <>
      {/* PAGE CONTENT - Sidebar and Topbar come from DashboardLayout */}

      <main className="venues-content">
        {/* PAGE HEADING */}
        <div className="venues-heading">
          <div>
            <h1>Royal Palm Marquee</h1>

            <p>
              <span className="venues-status-dot" />
              Live · Verified · Main Boulevard, Gulberg III, Lahore
            </p>
          </div>

          <div className="venues-heading-actions">
            <button
              className="venues-preview-button"
              type="button"
            >
              <Eye size={18} />
              Preview listing
            </button>

            <button
              className="venues-save-button"
              onClick={handleSave}
              type="button"
            >
              {saved ? <Check size={18} /> : <Save size={18} />}
              {saved ? "Saved!" : "Save changes"}
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="venues-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={
                activeTab === tab
                  ? "venues-tab active"
                  : "venues-tab"
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* HALLS SECTION */}
        {activeTab === "Halls inside" ? (
          <section className="venues-halls">
            <div className="venues-section-heading">
              <div>
                <h2>Halls inside your venue</h2>
                <p>Manage your halls and event spaces.</p>
              </div>

              <span className="venues-count">
                {halls.length} / 5 Halls
              </span>
            </div>

            <div className="venues-halls-grid">
              {halls.map((hall) => (
                <article
                  className="venue-hall-card"
                  key={hall.id}
                >
                  <div className="venue-image-wrapper">
                    <img
                      className="venue-hall-image"
                      src={hall.image}
                      alt={hall.name}
                    />

                    <span
                      className={
                        hall.live ? "hall-live" : "hall-draft"
                      }
                    >
                      <span />
                      {hall.live ? "Live" : "Draft"}
                    </span>
                  </div>

                  <div className="venue-hall-details">
                    <div className="venue-hall-title">
                      <h2>{hall.name}</h2>

                      <span>
                        {hall.live ? "Published" : "Unpublished"}
                      </span>
                    </div>

                    <div className="venue-hall-meta">
                      <span>
                        <UsersRound size={16} />
                        {hall.capacity}
                      </span>

                      <span>
                        <UsersRound size={16} />
                        {hall.minimum}
                      </span>
                    </div>

                    <p className="venue-hall-facilities">
                      {hall.facilities}
                    </p>

                    <div className="venue-time-slots">
                      <span>
                        <Sun size={18} />
                        Lunch 12–4
                      </span>

                      <span>
                        <Moon size={18} />
                        Dinner 7–11
                      </span>
                    </div>
                  </div>

                  <div className="venue-hall-actions">
                    <button
                      type="button"
                      className="venue-action-circle"
                      onClick={() => setEditingHall({ ...hall })}
                      aria-label={`Edit ${hall.name}`}
                    >
                      <Pencil size={17} />
                    </button>

                    <div className="venue-menu-wrapper">
                      <button
                        type="button"
                        className="venue-action-circle"
                        onClick={() =>
                          setMenuOpen(
                            menuOpen === hall.id ? null : hall.id
                          )
                        }
                        aria-label="More options"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {menuOpen === hall.id && (
                        <div className="venue-dropdown">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingHall({ ...hall });
                              setMenuOpen(null);
                            }}
                          >
                            <Pencil size={15} />
                            Edit hall
                          </button>

                          <button
                            type="button"
                            onClick={() => removeHall(hall.id)}
                          >
                            <X size={15} />
                            Remove hall
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* COMBINED FLOOR */}
            <div className="venues-combined-card">
              <div className="combined-icon">
                <Layers size={22} />
              </div>

              <div className="combined-content">
                <strong>
                  Combined: Grand Hall + Crystal Room = "Full Floor"
                </strong>

                <p>
                  Booking Full Floor blocks both halls. Booking either
                  hall blocks Full Floor. Up to 1,300 guests.
                </p>
              </div>

              <button
                type="button"
                className="combined-edit-button"
                onClick={() =>
                  alert("Full Floor settings can be configured here.")
                }
              >
                Edit
              </button>
            </div>

            {/* ADD HALL */}
            <button
              type="button"
              className="venues-add-hall"
              onClick={addHall}
              disabled={halls.length >= 5}
            >
              <Plus size={20} />

              <span>
                Add another hall ({halls.length} of 5 used on Gold plan)
              </span>
            </button>
          </section>
        ) : (
          <section className="venues-tab-placeholder">
            <div className="venues-placeholder-icon">
              <Building2 size={28} />
            </div>

            <h2>{activeTab}</h2>

            <p>
              Manage your venue {activeTab.toLowerCase()} information
              here.
            </p>

            <button
              type="button"
              onClick={() => setActiveTab("Halls inside")}
            >
              Back to Halls inside
            </button>
          </section>
        )}
      </main>

      {/* EDIT HALL MODAL */}
      {editingHall && (
        <div
          className="venues-modal-overlay"
          onClick={() => setEditingHall(null)}
        >
          <div
            className="venues-edit-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="venues-modal-header">
              <h2>Edit hall</h2>

              <button
                type="button"
                onClick={() => setEditingHall(null)}
              >
                <X size={20} />
              </button>
            </div>

            <label>Hall name</label>

            <input
              type="text"
              value={editingHall.name}
              onChange={(event) =>
                setEditingHall({
                  ...editingHall,
                  name: event.target.value,
                })
              }
              placeholder="Enter hall name"
            />

            <label>Capacity</label>

            <input
              type="text"
              value={editingHall.capacity}
              onChange={(event) =>
                setEditingHall({
                  ...editingHall,
                  capacity: event.target.value,
                })
              }
              placeholder="Enter hall capacity"
            />

            <label>Minimum booking</label>

            <input
              type="text"
              value={editingHall.minimum}
              onChange={(event) =>
                setEditingHall({
                  ...editingHall,
                  minimum: event.target.value,
                })
              }
              placeholder="Enter minimum booking"
            />

            <label>Facilities</label>

            <input
              type="text"
              value={editingHall.facilities}
              onChange={(event) =>
                setEditingHall({
                  ...editingHall,
                  facilities: event.target.value,
                })
              }
              placeholder="Enter hall facilities"
            />

            <div className="venues-modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() => setEditingHall(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-save"
                onClick={updateHall}
              >
                <Save size={16} />
                Save hall
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VenuesPage;
