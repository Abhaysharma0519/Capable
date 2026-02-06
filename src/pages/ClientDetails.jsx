import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/ClientSidebar";
import OverviewTab from "../components/ClientOverviewTab";
import ControlsTab from "../components/ClientControlsTab";
import ClausesTab from "../components/ClientClausesTab";
import EvidencesTab from "../components/ClientEvidencesTab";
import AuditorProfileTab from "../components/ClientAuditorProfileTab";

import {
  LayoutGrid, List, UserCheck,
  FileCheck, Bell, User, Settings as SettingsIcon, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ComplianceDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  
  // States for visibility
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // State for user and notifications
  const [userName] = useState(localStorage.getItem("user_name") || "Abhay Sharma");
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Critical", desc: "Evidence pending for Control A.5", time: "1h ago", type: "urgent" },
    { id: 2, title: "Update", desc: "Clause 4.1 review completed", time: "3h ago", type: "info" }
  ]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const tabs = [
    { name: "Overview", icon: <LayoutGrid size={16} /> },
    { name: "Clauses", icon: <List size={16} /> },
    { name: "Controls", icon: <List size={16} /> },
    { name: "Auditor Profile", icon: <UserCheck size={16} /> },
    { name: "Evidences", icon: <FileCheck size={16} /> },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <Sidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-8 lg:py-10 max-w-7xl mx-auto overflow-x-hidden">

        {/* TOP HEADER */}
        <header className="flex justify-between items-center mb-6">
          <nav className="flex items-center gap-2 text-xs md:text-xl font-medium text-gray-400">
            <button
              className="hover:text-[#6A5AFF] transition-colors"
              onClick={() => window.history.back()}
            >
              Compliances
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-[#111827] font-bold">ISO/IEC 27001:2022</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right mr-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Operator</p>
              <p className="text-xs font-bold text-gray-700">{userName}</p>
            </div>

            {/* NOTIFICATIONS SECTION */}
            <div className="relative">
              <div 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border transition-all cursor-pointer 
                  ${showNotifications ? 'bg-white border-[#6A5AFF] text-[#6A5AFF]' : 'bg-white border-gray-100 text-gray-400 hover:text-[#6A5AFF]'}`}
              >
                <Bell size={18} />
              </div>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    {/* Background overlay to close menu */}
                    <div className="fixed inset-0 z-90" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-100"
                    >
                      <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <h4 className="font-bold text-sm text-gray-800">Activity Log</h4>
                        <button onClick={() => setNotifications([])} className="text-[10px] font-bold text-rose-500 hover:underline">Clear</button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-10 text-center text-gray-400 text-xs">No new activities</div>
                        ) : (
                          notifications.map((n) => (
                            <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 text-left">
                              <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.type === "urgent" ? "bg-rose-500" : "bg-[#6A5AFF]"}`} />
                              <div>
                                <div className="flex justify-between items-center w-full gap-10">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{n.title}</span>
                                  <span className="text-[9px] text-gray-300 font-medium whitespace-nowrap">{n.time}</span>
                                </div>
                                <p className="text-xs text-gray-600 font-medium leading-snug">{n.desc}</p>
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

            {/* PROFILE SECTION */}
            <div className="relative">
              <div
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                className="w-10 h-10 bg-[#6A5AFF] rounded-xl flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
              >
                <User size={18} />
              </div>
              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-90" onClick={() => setShowProfileMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-gray-50 py-3 z-100"
                    >
                      <div className="px-4 pb-3 border-b border-gray-50 mb-2 text-left">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{userName}</p>
                      </div>
                      <button
                        onClick={() => { navigate("/settings"); setShowProfileMenu(false); }}
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

        {/* TITLE SECTION */}
        <div className="mb-8 text-left">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Technical Assessment</h2>
          <div className="flex items-center gap-3">
            <span className="bg-indigo-50 text-[#6A5AFF] text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">Information Security</span>
            <p className="text-sm text-slate-500 font-medium italic opacity-80">Viewing report for ClientName Pvt. Ltd.</p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-4 md:gap-8 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 pb-4 px-1 text-sm font-bold transition-all relative group ${activeTab === tab.name
                ? "text-[#6A5AFF]"
                : "text-slate-400 hover:text-slate-600"
                }`}
            >
              <span className={`transition-colors ${activeTab === tab.name ? "text-[#6A5AFF]" : "text-slate-400 group-hover:text-slate-500"}`}>
                {tab.icon}
              </span>
              {tab.name}
              {activeTab === tab.name && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#6A5AFF] rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT AREA */}
        <div className="min-h-125">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "Overview" && <OverviewTab />}
              {activeTab === "Clauses" && <ClausesTab />}
              {activeTab === "Controls" && <ControlsTab />}
              {activeTab === "Auditor Profile" && <AuditorProfileTab />}
              {activeTab === "Evidences" && <EvidencesTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}