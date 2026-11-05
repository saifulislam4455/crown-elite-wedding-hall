
import {
  CircleHelp,
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

function DashboardTopbar({
  search,
  setSearch,
  openMobileMenu,
}) {
  return (
    <header className="dashboard-topbar">
      <button
        type="button"
        className="mobile-menu-button"
        onClick={openMobileMenu}
        aria-label="Open navigation"
      >
        <Menu size={22} strokeWidth={1.9} />
      </button>

      <div className="dashboard-search">
        <Search size={17} strokeWidth={1.9} />

        <input
          type="search"
          placeholder="Search bookings, customers, invoices..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="topbar-icon-button"
          aria-label="Help"
        >
          <CircleHelp size={19} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="topbar-icon-button notification-button"
          aria-label="Notifications"
        >
          <Bell size={19} strokeWidth={1.8} />
          <span />
        </button>

        <div className="profile-avatar">RI</div>

        <div className="profile-info">
          <strong>Rana Imran</strong>
          <span>Owner · Royal Palm</span>
        </div>

        <button
          type="button"
          className="profile-menu-button"
          aria-label="Profile menu"
        >
          <ChevronDown size={17} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}

export default DashboardTopbar;
