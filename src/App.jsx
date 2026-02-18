import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Otp from "./pages/Otp";
import RequestDemo from "./pages/RequestDemo";

// Client Page
import Dashboard from "./pages/ClientDashboard";
import ComplianceDetails from "./pages/ClientDetails";
import Settings from "./pages/ClientSettings";
import Forgotpwd from "./pages/Forgotpwd";

// Admin Page
import AdminDashboard from "./pages/AdminDashboard";
import AdminUser from "./pages/AdminUser";
import AdminOrganizations from "./pages/AdminOrganizations";
import AdminProjects from "./pages/AdminProjects";
import AdminCompliances from "./pages/AdminCompliances";
import AdminSettings from "./pages/AdminSettings";

// PMO Page
import PMODashboard from "./pages/PMODashboard";
import PMOUser from "./pages/PMOUser";
import PMOOrganizations from "./pages/PMOOrganizations";
import PMOProjects from "./pages/PMOProjects";
import PMOCompliances from "./pages/PMOCompliances";
import PMOSettings from "./pages/PMOSettings";

// Auditor Page
import AuditorDashboard from "./pages/AuditorDashboard";
import AuditorDetails from "./pages/AuditorDetails";
import AuditorCompliances from "./pages/AuditorCompliances";
import AuditorSettings from "./pages/AuditorSettings";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate replace to="/login" />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        limit={3}
      />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgot-password" element={<Forgotpwd />} />
          <Route path="/request-demo" element={<RequestDemo />} />

          {/* Client Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/compliance/iso-27001"
            element={
              <ProtectedRoute>
                <ComplianceDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/organizations"
            element={
              <ProtectedRoute>
                <AdminOrganizations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/compliances"
            element={
              <ProtectedRoute>
                <AdminCompliances />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* PMO Routes */}
          <Route
            path="/pmo-dashboard"
            element={
              <ProtectedRoute allowedRole="pmo">
                <PMODashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pmo/users"
            element={
              <ProtectedRoute>
                <PMOUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pmo/organizations"
            element={
              <ProtectedRoute>
                <PMOOrganizations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pmo/projects"
            element={
              <ProtectedRoute>
                <PMOProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pmo/compliances"
            element={
              <ProtectedRoute>
                <PMOCompliances />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pmo/settings"
            element={
              <ProtectedRoute>
                <PMOSettings />
              </ProtectedRoute>
            }
          />

          {/* Auditor Routes */}
          <Route
            path="/auditor-dashboard"
            element={
              <ProtectedRoute allowedRole="auditor">
                <AuditorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auditor/compliance/:id"
            element={
              <ProtectedRoute>
                <AuditorDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auditor/compliances"
            element={
              <ProtectedRoute>
                <AuditorCompliances />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auditor/settings"
            element={
              <ProtectedRoute>
                <AuditorSettings />
              </ProtectedRoute>
            }
          />

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
