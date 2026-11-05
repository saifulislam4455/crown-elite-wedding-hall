
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Signup from "./pages/Signup";
import DocumentsPage from "./pages/DocumentsPage";

// Dashboard Layout
import DashboardLayout from "./components/dashboard/DashboardLayout";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Calendar from "./pages/dashboard/Calendar";
import Bookings from "./pages/dashboard/Bookings";
import BookingDetails from "./pages/dashboard/BookingDetails";
import VenuesPage from "./pages/dashboard/VenuesPage";
import Pricing from "./pages/dashboard/Pricing";
import MenusPackages from "./pages/dashboard/MenusPackages";
import Policies from "./pages/dashboard/Policies";
import Payments from "./pages/dashboard/Payments";
import Payouts from "./pages/dashboard/Payouts";
import Invoice from "./pages/dashboard/Invoice";
import Inbox from "./pages/dashboard/Inbox";
import Reviews from "./pages/dashboard/Reviews";
import Reports from "./pages/dashboard/Reports";
import Staff from "./pages/dashboard/Staff";
import NewBooking from "./pages/NewBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/documents" element={<DocumentsPage />} />

        {/* Dashboard Common Layout */}
        <Route element={<DashboardLayout />}>

          {/* Default URL */}
          <Route
            index
            element={<Navigate to="/dashboard" replace />}
          />

          {/* Main Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Bookings */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route
            path="/booking-details/:id"
            element={<BookingDetails />}
          />
          <Route path="/new-booking" element={<NewBooking />} />

          {/* Venue Management */}
          <Route path="/venue-details" element={<VenuesPage />} />
          <Route path="/menus-packages" element={<MenusPackages />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/policies" element={<Policies />} />

          {/* Money Management */}
          <Route path="/payments" element={<Payments />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/invoices" element={<Invoice />} />

          {/* Communication */}
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/reviews" element={<Reviews />} />

          {/* More */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/staff" element={<Staff />} />

        </Route>

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
