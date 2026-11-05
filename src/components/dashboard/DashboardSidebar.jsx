
import { NavLink } from "react-router-dom";
import "../../styles/DashboardSidebar.css";

import {
  LayoutDashboard,
  CalendarDays,
  List,
  Plus,
  MessageCircle,
  Building2,
  Utensils,
  Percent,
  ShieldCheck,
  CreditCard,
  FileText,
  Wallet,
  Star,
  ChartNoAxesColumn,
  Users,
  SlidersHorizontal,
  Crown,
} from "lucide-react";

const navigationGroups = [
  {
    title: "",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Calendar", icon: CalendarDays, path: "/calendar" },
      { label: "Bookings", icon: List, path: "/bookings" },
      { label: "New booking", icon: Plus, path: "/new-booking" },
      { label: "Inbox", icon: MessageCircle, path: "/inbox" },
    ],
  },
  {
    title: "MY VENUE",
    items: [
      {
        label: "Venues & halls",
        icon: Building2,
        path: "/venue-details",
      },
      {
        label: "Menus & packages",
        icon: Utensils,
        path: "/menus-packages",
      },
      {
        label: "Pricing",
        icon: Percent,
        path: "/pricing",
      },
      {
        label: "Policies",
        icon: ShieldCheck,
        path: "/policies",
      },
    ],
  },
  {
    title: "MONEY",
    items: [
      {
        label: "Payments",
        icon: Wallet,
        path: "/payments",
      },
      {
        label: "Invoices",
        icon: FileText,
        path: "/invoices",
      },
      {
        label: "Payouts",
        icon: CreditCard,
        path: "/payouts",
      },
     
    ],
  },
  {
    title: "MORE",
    items: [
     { label: "Reviews", icon: Star, path: "/reviews" },
      { label: "Reports", icon: ChartNoAxesColumn, path: "/reports" },
     { label: "Staff", icon: Users, path: "/staff" },
      { label: "Settings", icon: SlidersHorizontal },
    ],
  },
];

function DashboardSidebar({ mobileMenuOpen, closeMobileMenu }) {
  return (
    <aside
      className={`dashboard-sidebar ${
        mobileMenuOpen ? "sidebar-open" : ""
      }`}
    >
      {/* LOGO */}
      <div className="dashboard-logo">
        <div className="dashboard-logo-icon">
          <Crown size={19} strokeWidth={2} />
        </div>

        <div>
          <h2>Crown Elite</h2>
          <span>HALL PARTNER</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="dashboard-navigation">
        {navigationGroups.map((group, index) => (
          <div className="nav-group" key={group.title || index}>
            {group.title && (
              <h3 className="nav-group-title">{group.title}</h3>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;

              return item.path ? (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "nav-item-active" : ""}`
                  }
                >
                  <span className="nav-item-icon">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>

                  <span className="nav-item-label">
                    {item.label}
                  </span>
                </NavLink>
              ) : (
                <button
                  type="button"
                  className="nav-item"
                  key={item.label}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-item-icon">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>

                  <span className="nav-item-label">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* GOLD PLAN CARD */}
      <div className="plan-card">
        <strong>Gold plan</strong>
        <p>Renews 12 Jan 2027 · 3 of 5 venues used</p>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
