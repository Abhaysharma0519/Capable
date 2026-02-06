import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Otp from "./pages/Otp"; 
import Dashboard from "./pages/ClientDashboard";
import ComplianceDetails from "./pages/ClientDetails";
import Documentation from "./pages/ClientDocumentation";
import Settings from "./pages/ClientSettings";
import Forgotpwd from "./pages/Forgotpwd";

// Admin Page
import AdminDashboard from "./pages/AdminDashboard";
import AdminUser from "./pages/AdminUser";

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
      <ToastContainer position="top-right" autoClose={3000} theme="light" limit={3} />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgot-password" element={<Forgotpwd />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/compliance/iso-27001" element={<ProtectedRoute><ComplianceDetails /></ProtectedRoute>} />
          <Route path="/docs" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminUser /></ProtectedRoute>} />

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;