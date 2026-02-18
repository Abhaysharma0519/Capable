import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Search,
  X,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// reference `motion` to satisfy some linters that don't detect JSX usage
void motion;
import PMOSidebar from "../components/PMOSidebar";

export default function PMOCompliances() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Check if user is actually a PMO
  useEffect(() => {
    const userRole = localStorage.getItem("user_role");
    if (userRole !== "pmo") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // User data
  const [userData] = useState({
    name: localStorage.getItem("user_name") || "PMO User",
    email: localStorage.getItem("user_email") || "pmo@capable.com",
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System",
      desc: "Compliance frameworks loaded successfully",
      time: "Just now",
      type: "info",
    },
  ]);

  // Default Compliances List with Enhanced Data
  const [compliances] = useState([
    {
      id: 1,
      name: "ISO/IEC 27001:2022",
      version: "2022",
      status: "Active",
      sections: 14,
      lastUpdated: "2024-01-15",
      description: "Information security management",
    },
    {
      id: 2,
      name: "ISO 22301:2019",
      version: "2019",
      status: "Active",
      sections: 8,
      lastUpdated: "2024-01-10",
      description: "Business continuity management",
    },
    {
      id: 3,
      name: "GDPR",
      version: "2018",
      status: "Active",
      sections: 11,
      lastUpdated: "2024-01-20",
      description: "General Data Protection Regulation",
    },
    {
      id: 4,
      name: "HIPAA",
      version: "2013",
      status: "Pending",
      sections: 6,
      lastUpdated: "2024-01-05",
      description: "Health Insurance Portability",
    },
    {
      id: 5,
      name: "PCI-DSS",
      version: "3.2.1",
      status: "Active",
      sections: 12,
      lastUpdated: "2024-01-18",
      description: "Payment Card Industry Data Security",
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    navigate("/login");
  };

  const filteredCompliances = compliances.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.version.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <PMOSidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-8 lg:py-10 max-w-7xl mx-auto overflow-x-hidden">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-blue-500">
          <div className="flex flex-col text-left">
            <h2 className="text-2xl font-black text-[#111827] tracking-tight">
              Compliances
            </h2>
            <p className="text-xs text-gray-500 font-medium md:hidden">
              Welcome, {userData.name}
            </p>
          </div>

          <div className="flex gap-3 relative">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all relative ${showNotifications ? "bg-[#6A5AFF] text-white border-[#6A5AFF]" : "bg-white text-gray-400 border-gray-100 shadow-sm hover:text-[#6A5AFF]"}`}
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div
                      className="fixed inset-0 z-90"
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-100"
                    >
                      <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <h4 className="font-bold text-sm text-gray-800">
                          Activity Log
                        </h4>
                        <button
                          onClick={() => setNotifications([])}
                          className="text-[10px] font-bold text-rose-500 hover:underline"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-10 text-center text-gray-400 text-xs">
                            No new activities
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 text-left"
                            >
                              <div
                                className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.type === "urgent" ? "bg-rose-500" : "bg-[#6A5AFF]"}`}
                              />
                              <div>
                                <div className="flex justify-between items-center w-full gap-10">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    {n.title}
                                  </span>
                                  <span className="text-[9px] text-gray-300 font-medium whitespace-nowrap">
                                    {n.time}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 font-medium leading-snug">
                                  {n.desc}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="w-10 h-10 bg-[#6A5AFF] rounded-xl flex items-center justify-center text-white shadow-md hover:bg-[#5D45FD] transition-all"
              >
                <User size={18} />
              </button>
              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-90"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-gray-50 py-3 z-100"
                    >
                      <div className="px-4 pb-3 border-b border-gray-50 mb-2 text-left">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Logged in as
                        </p>
                        <p className="text-sm font-bold text-gray-800 truncate">
                          {userData.name}
                        </p>
                      </div>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left">
                        <SettingsIcon size={16} /> Account Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 font-semibold transition-colors text-left"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Title Section */}
          <div className="p-8 pb-6 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-black text-slate-800 mb-1">
                Manage and Monitor Compliances
              </h3>
              <p className="text-sm text-slate-500">
                View and oversee all compliance frameworks across all client
                organizations.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-8 border-b border-gray-100">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search here with compliance name"
                className="w-full pl-12 pr-4 py-3 bg-[#F3F4F9] rounded-2xl border-none focus:ring-2 focus:ring-[#6A5AFF] outline-none text-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Compliance List */}
          <div className="p-8">
            <div className="mb-6">
              <h4 className="text-sm font-black text-slate-800 border-l-4 border-[#6A5AFF] pl-3">
                Available Compliances
              </h4>
            </div>

            <div className="space-y-1">
              {filteredCompliances.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <span className="text-sm font-bold text-slate-800">
                      {item.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
