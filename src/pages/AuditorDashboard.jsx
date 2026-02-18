import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  ArrowUpRight,
  LogOut,
  Settings as SettingsIcon,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuditorSidebar from "../components/AuditorSidebar";

const COMPLIANCE_DATA = [
  {
    id: "iso-27001",
    title: "ISO/IEC - 27001:2022",
    progress: 49,
    controls: "46/93",
  },
  {
    id: "dpdpa",
    title: "DPDPA",
    progress: 49,
    controls: "46/93",
  },
  {
    id: "pci-dss",
    title: "PCI-DSS",
    progress: 49,
    controls: "46/93",
  },
];

const ComplianceCard = ({ id, title, progress, controls }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 20px -5px rgba(0,0,0,0.05)",
      }}
      className="bg-white p-6 rounded-4xl border border-gray-100 flex flex-col justify-between shadow-sm relative group text-left"
    >
      <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <h4 className="font-bold text-[#111827] text-base mb-5 tracking-tight">
          {title}
        </h4>

        <div className="flex gap-4 mb-6">
          <div className="shrink-0">
            <p className="text-[9px] text-gray-400 font-bold uppercase mb-1.5 tracking-widest">
              Controls
            </p>
            <div className="bg-gray-50 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 border border-gray-100">
              {controls}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[9px] text-gray-400 font-bold uppercase mb-1.5 tracking-widest">
              Audit Progress
            </p>
            <div className="relative h-8 w-full bg-[#E9EDF7] rounded-xl overflow-hidden border border-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-[#FFB75E] flex items-center justify-center text-white text-[10px] font-bold"
              >
                {progress}%
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 font-bold uppercase">
              Start
            </span>
            <span className="text-xs font-bold text-[#111827]">
              28 Feb 25
            </span>
          </div>

          <div className="flex flex-col border-l border-gray-100 pl-3">
            <span className="text-[9px] text-gray-400 font-bold uppercase">
              End
            </span>
            <span className="text-xs font-bold text-[#111827]">
              28 Feb 25
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/auditor/compliance/${id}`)}
          className="bg-[#6A5AFF] w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-md"
        >
          <ArrowUpRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default function AuditorDashboard() {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Audit Update",
      desc: "New evidence uploaded for ISO-27001",
      time: "Just now",
      type: "info",
    },
    {
      id: 2,
      title: "Critical",
      desc: "Client deadline approaching for DPDPA",
      time: "2h ago",
      type: "urgent",
    },
  ]);

  const userData = {
    name: localStorage.getItem("user_name") || "Auditor Name",
    email: localStorage.getItem("user_email") || "auditor@capable.com",
  };

  const filteredData = useMemo(
    () =>
      COMPLIANCE_DATA.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <AuditorSidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-8 lg:py-10 max-w-7xl mx-auto overflow-x-hidden">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-[#111827] tracking-tight uppercase">
            Overview
          </h2>

          <div className="flex gap-3 relative">

            {/* SEARCH */}
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search compliances..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#6A5AFF]/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* NOTIFICATIONS */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all relative ${
                  showNotifications
                    ? "bg-[#6A5AFF] text-white border-[#6A5AFF]"
                    : "bg-white text-gray-400 border-gray-100 shadow-sm hover:text-[#6A5AFF]"
                }`}
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
                                className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                                  n.type === "urgent"
                                    ? "bg-rose-500"
                                    : "bg-[#6A5AFF]"
                                }`}
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

            {/* PROFILE */}
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

                      <button
                        onClick={() => {
                          navigate("/auditor/settings");
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left"
                      >
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

        {/* BANNER */}
        <motion.div className="bg-[#6A5AFF] rounded-4xl p-10 text-white relative shadow-xl overflow-hidden mb-10">
          <div className="relative z-10 text-left">
            <p className="text-[11px] font-black uppercase opacity-70 tracking-[0.2em]">
              System Access Granted
            </p>
            <h3 className="text-3xl font-bold mt-2 mb-2 tracking-tight">
              Hello, {userData.name}
            </h3>
            <p className="text-sm text-indigo-100 max-w-md font-medium">
              Organization:{" "}
              <span className="text-white font-bold">
                Capable Tech
              </span>
            </p>
          </div>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredData.map((item) => (
            <ComplianceCard key={item.id} {...item} />
          ))}
        </div>

      </main>
    </div>
  );
}
