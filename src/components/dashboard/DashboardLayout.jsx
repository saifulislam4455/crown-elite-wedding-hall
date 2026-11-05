
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

import "../../styles/DashboardLayout.css";

function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const location = useLocation();

  // Page change hone par mobile sidebar close hoga
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  return (
    <div className="dashboard-layout">

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          className="dashboard-backdrop"
          aria-label="Close sidebar"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        mobileMenuOpen={mobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
      />

      {/* Main content */}
      <div className="dashboard-main">

        {/* Topbar */}
        <DashboardTopbar
          search={search}
          setSearch={setSearch}
          openMobileMenu={openMobileMenu}
        />

        {/* All dashboard pages */}
        <main className="dashboard-page-content">
          <Outlet
            context={{
              search,
              setSearch,
            }}
          />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
