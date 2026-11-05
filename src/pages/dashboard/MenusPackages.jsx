
import { useState } from "react";
import {
  Utensils,
  Plus,
  ChevronDown,
} from "lucide-react";

import "../../styles/MenusPackages.css";

const initialPackages = [
  {
    id: 1,
    name: "Silver",
    price: "2,500",
    status: "Live",
    venues: ["Grand Hall"],
    meals: ["Dinner"],
    starters: [
      "Chicken tikka",
      "Fish pakora",
      "Seekh kebab",
      "Chana chaat",
      "Spring rolls",
      "Dahi bhalla",
    ],
    mainCourses: [
      "Mutton karahi",
      "Chicken biryani",
      "Beef nihari",
      "Chicken qorma",
      "Palak paneer (veg)",
    ],
    desserts: ["Gajar halwa", "Kheer"],
    starterLimit: 3,
    mainLimit: 2,
    dessertLimit: 0,
    included: [
      "Cold drinks",
      "Mineral water",
      "Crockery & service",
      "Basic stage",
    ],
  },
  {
    id: 2,
    name: "Gold",
    price: "3,200",
    status: "Live",
    venues: ["Grand Hall", "Crystal Room"],
    meals: ["Lunch", "Dinner"],
    starters: [
      "Chicken tikka",
      "Fish pakora",
      "Seekh kebab",
      "Chana chaat",
      "Spring rolls",
      "Dahi bhalla",
    ],
    mainCourses: [
      "Mutton karahi",
      "Chicken biryani",
      "Beef nihari",
      "Chicken qorma",
      "Palak paneer (veg)",
    ],
    desserts: ["Gajar halwa", "Kheer"],
    starterLimit: 3,
    mainLimit: 2,
    dessertLimit: 0,
    included: [
      "Cold drinks",
      "Mineral water",
      "Crockery & service",
      "Basic stage",
    ],
  },
  {
    id: 3,
    name: "Platinum",
    price: "4,200",
    status: "Live",
    venues: ["Grand Hall"],
    meals: ["Dinner"],
    starters: [
      "Chicken tikka",
      "Fish pakora",
      "Seekh kebab",
      "Chana chaat",
    ],
    mainCourses: [
      "Mutton karahi",
      "Chicken biryani",
      "Beef nihari",
      "Chicken qorma",
    ],
    desserts: ["Gajar halwa", "Kheer"],
    starterLimit: 4,
    mainLimit: 3,
    dessertLimit: 0,
    included: [
      "Cold drinks",
      "Mineral water",
      "Crockery & service",
      "Basic stage",
    ],
  },
  {
    id: 4,
    name: "Corporate lunch",
    price: "1,800",
    status: "Draft",
    venues: ["Grand Hall"],
    meals: ["Lunch"],
    starters: ["Chicken tikka", "Chana chaat"],
    mainCourses: ["Chicken biryani", "Chicken qorma"],
    desserts: ["Kheer"],
    starterLimit: 1,
    mainLimit: 1,
    dessertLimit: 0,
    included: ["Mineral water", "Crockery & service"],
  },
];

const defaultIncluded = [
  "Cold drinks",
  "Mineral water",
  "Crockery & service",
  "Basic stage",
];

function MenuSection({
  title,
  dishes,
  limit,
  onLimitChange,
  onAddDish,
  onRemoveDish,
}) {
  const [showLimit, setShowLimit] = useState(false);

  return (
    <div className="menu-section">
      <div className="menu-section-header">
        <h3>{title}</h3>

        <div className="limit-wrapper">
          <button
            className="limit-button"
            onClick={() => setShowLimit(!showLimit)}
          >
            {limit === 0
              ? "All included"
              : `Guest chooses ${limit} of ${dishes.length}`}
            <ChevronDown size={14} />
          </button>

          {showLimit && (
            <div className="limit-dropdown">
              <button onClick={() => {
                onLimitChange(0);
                setShowLimit(false);
              }}>
                All included
              </button>

              {Array.from(
                { length: dishes.length },
                (_, index) => index + 1
              ).map((number) => (
                <button
                  key={number}
                  onClick={() => {
                    onLimitChange(number);
                    setShowLimit(false);
                  }}
                >
                  Guest chooses {number}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="dish-list">
        {dishes.map((dish, index) => (
          <button
            className="dish-chip"
            key={`${dish}-${index}`}
            onClick={() => onRemoveDish(index)}
            title="Click to remove dish"
          >
            {dish}
          </button>
        ))}

        <button className="add-dish-button" onClick={onAddDish}>
          <Plus size={16} />
          Add dish
        </button>
      </div>
    </div>
  );
}

export default function MenusPackages() {
  const [packages, setPackages] = useState(initialPackages);
  const [selectedId, setSelectedId] = useState(2);

  const selectedPackage =
    packages.find((item) => item.id === selectedId) || packages[0];

  const [packageName, setPackageName] = useState(selectedPackage.name);
  const [price, setPrice] = useState(selectedPackage.price);

  const [venues, setVenues] = useState(selectedPackage.venues);
  const [meals, setMeals] = useState(selectedPackage.meals);

  const [starters, setStarters] = useState(selectedPackage.starters);
  const [mainCourses, setMainCourses] = useState(
    selectedPackage.mainCourses
  );
  const [desserts, setDesserts] = useState(selectedPackage.desserts);

  const [starterLimit, setStarterLimit] = useState(
    selectedPackage.starterLimit
  );
  const [mainLimit, setMainLimit] = useState(
    selectedPackage.mainLimit
  );
  const [dessertLimit, setDessertLimit] = useState(
    selectedPackage.dessertLimit
  );

  const [included, setIncluded] = useState(
    selectedPackage.included
  );

  const [message, setMessage] = useState("");

  function selectPackage(item) {
    setSelectedId(item.id);
    setPackageName(item.name);
    setPrice(item.price);

    setVenues(item.venues);
    setMeals(item.meals);

    setStarters(item.starters);
    setMainCourses(item.mainCourses);
    setDesserts(item.desserts);

    setStarterLimit(item.starterLimit);
    setMainLimit(item.mainLimit);
    setDessertLimit(item.dessertLimit);

    setIncluded(item.included);
    setMessage("");
  }

  function toggleOption(value, current, setter) {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function addDish(section, setter) {
    const dish = window.prompt(`Enter new ${section} dish name:`);

    if (dish && dish.trim()) {
      setter((previous) => [...previous, dish.trim()]);
    }
  }

  function removeDish(index, setter) {
    setter((previous) => previous.filter((_, i) => i !== index));
  }

  function savePackage() {
    const updated = packages.map((item) =>
      item.id === selectedId
        ? {
            ...item,
            name: packageName,
            price,
            venues,
            meals,
            starters,
            mainCourses,
            desserts,
            starterLimit,
            mainLimit,
            dessertLimit,
            included,
          }
        : item
    );

    setPackages(updated);
    setMessage("Package saved successfully.");
  }

  function createPackage() {
    const newPackage = {
      id: Date.now(),
      name: "New package",
      price: "0",
      status: "Draft",
      venues: [],
      meals: [],
      starters: [],
      mainCourses: [],
      desserts: [],
      starterLimit: 0,
      mainLimit: 0,
      dessertLimit: 0,
      included: [],
    };

    setPackages((previous) => [...previous, newPackage]);
    selectPackage(newPackage);
  }

  return (
    <div className="menus-packages-page">
      <div className="menus-heading">
        <div>
          <h1>Menus &amp; packages</h1>
          <p>
            Customers pick a package, then choose dishes within
            the rules you set.
          </p>
        </div>

        <button className="new-package-button" onClick={createPackage}>
          <Plus size={18} />
          New package
        </button>
      </div>

      <div className="menus-layout">
        {/* LEFT PACKAGE LIST */}

        <div className="package-list">
          {packages.map((item) => (
            <button
              key={item.id}
              className={`package-item ${
                selectedId === item.id ? "selected" : ""
              }`}
              onClick={() => selectPackage(item)}
            >
              <Utensils size={19} className="package-icon" />

              <div className="package-info">
                <h3>{item.name}</h3>
                <p>Rs {item.price} / guest</p>
              </div>

              <span
                className={`package-status ${
                  item.status === "Draft" ? "draft" : "live"
                }`}
              >
                <span className="status-dot" />
                {item.status}
              </span>
            </button>
          ))}
        </div>

        {/* RIGHT EDIT PANEL */}

        <div className="package-editor">
          <div className="package-form-row">
            <div className="package-field">
              <label>Package name</label>
              <input
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              />
            </div>

            <div className="package-field">
              <label>Price per guest</label>
              <div className="package-price-input">
                <span>Rs</span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* AVAILABLE FOR */}

          <div className="available-section">
            <label>Available for</label>

            <div className="option-list">
              {["Grand Hall", "Crystal Room", "Garden Lawn"].map(
                (venue) => (
                  <button
                    key={venue}
                    className={`option-chip ${
                      venues.includes(venue) ? "active" : ""
                    }`}
                    onClick={() => toggleOption(venue, venues, setVenues)}
                  >
                    {venue}
                  </button>
                )
              )}

              {["Lunch", "Dinner"].map((meal) => (
                <button
                  key={meal}
                  className={`option-chip ${
                    meals.includes(meal) ? "active" : ""
                  }`}
                  onClick={() => toggleOption(meal, meals, setMeals)}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* STARTERS */}

          <MenuSection
            title="Starters"
            dishes={starters}
            limit={starterLimit}
            onLimitChange={setStarterLimit}
            onAddDish={() => addDish("starter", setStarters)}
            onRemoveDish={(index) => removeDish(index, setStarters)}
          />

          {/* MAIN COURSE */}

          <MenuSection
            title="Main course"
            dishes={mainCourses}
            limit={mainLimit}
            onLimitChange={setMainLimit}
            onAddDish={() => addDish("main course", setMainCourses)}
            onRemoveDish={(index) => removeDish(index, setMainCourses)}
          />

          {/* DESSERTS */}

          <MenuSection
            title="Desserts"
            dishes={desserts}
            limit={dessertLimit}
            onLimitChange={setDessertLimit}
            onAddDish={() => addDish("dessert", setDesserts)}
            onRemoveDish={(index) => removeDish(index, setDesserts)}
          />

          {/* ALSO INCLUDED */}

          <div className="included-section">
            <h3>Also included</h3>

            <div className="included-list">
              {defaultIncluded.map((item) => (
                <label key={item} className="included-item">
                  <input
                    type="checkbox"
                    checked={included.includes(item)}
                    onChange={() =>
                      toggleOption(item, included, setIncluded)
                    }
                  />
                  <span className="custom-checkbox">✓</span>
                  {item}
                </label>
              ))}
            </div>
          </div>

          {message && <div className="save-message">{message}</div>}

          <div className="package-save-row">
            <button className="package-save-button" onClick={savePackage}>
              Save package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
