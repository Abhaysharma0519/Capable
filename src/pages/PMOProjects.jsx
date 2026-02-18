import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PMOSidebar from "../components/PMOSidebar";

export default function PMOProjects() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const [userData] = useState({
    name: localStorage.getItem("user_name") || "PMO User",
    email: localStorage.getItem("user_email") || "pmo@capable.com",
  });

  // Mock Notifications
  const [notifications] = useState([
    { id: 1, title: "System", desc: "Project milestone completed", time: "2m ago" },
    { id: 2, title: "Update", desc: "New auditor assigned to compliance audit", time: "1h ago" },
  ]);

  const projects = [
    { id: 1, client: "Company-1 Pvt. Ltd", framework: "ISO/IEC 27001:2022", type: "Readiness Assessment", status: "On-going", auditors: ["A1", "A2", "A3"] },
    { id: 2, client: "Company-1 Pvt. Ltd", framework: "ISO/IEC 27001:2022", type: "Readiness Assessment", status: "Completed", auditors: ["A1", "A2", "A3"] },
    { id: 3, client: "Company-1 Pvt. Ltd", framework: "ISO/IEC 27001:2022", type: "Readiness Assessment", status: "Completed", auditors: ["A1", "A2", "A3"] },
    { id: 4, client: "Company-1 Pvt. Ltd", framework: "ISO/IEC 27001:2022", type: "Readiness Assessment", status: "Completed", auditors: ["A1", "A2", "A3"] },
    { id: 5, client: "Company-1 Pvt. Ltd", framework: "ISO/IEC 27001:2022", type: "Readiness Assessment", status: "Completed", auditors: ["A1", "A2", "A3"] },
  ];

  // Check if user is actually a PMO
  useEffect(() => {
    const userRole = localStorage.getItem("user_role");
    if (userRole !== "pmo") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    navigate("/login");
  };

  const filteredProjects = projects.filter(p => 
    activeTab === "All" || p.status.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <PMOSidebar />

      <main className="flex-1 px-4 py-8 md:px-10 max-w-7xl mx-auto overflow-x-hidden">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-[#6A5AFF]">
          <h2 className="text-2xl font-black text-[#111827] tracking-tight">Projects</h2>
          
          <div className="flex gap-3 items-center">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative ${
                    showNotifications ? "bg-[#6A5AFF] text-white" : "bg-white border border-gray-100 text-gray-400 shadow-sm"
                }`}
              >
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-20"
                    >
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <h4 className="font-bold text-sm text-gray-800">Activity Log</h4>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((n) => (
                          <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 flex gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-[#6A5AFF] shrink-0" />
                            <div>
                              <div className="flex justify-between items-center gap-4">
                                <span className="text-[10px] font-black uppercase text-gray-400">{n.title}</span>
                                <span className="text-[9px] text-gray-300 font-medium">{n.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 font-medium leading-snug">{n.desc}</p>
                            </div>
                          </div>
                        ))}
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
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-gray-50 py-3 z-20"
                    >
                      <div className="px-4 pb-3 border-b border-gray-50 mb-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{userData.name}</p>
                      </div>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left">
                        <SettingsIcon size={16} /> Account Settings
                      </button>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 font-semibold transition-colors text-left">
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="mb-8">
          <h3 className="text-xl font-black text-slate-800 mb-1">Manage and Monitor Projects</h3>
          <p className="text-sm text-slate-500">Track and oversee all the ongoing and completed compliance projects across all client organizations.</p>
        </div>

        <div className="flex gap-8 mb-6 border-b border-gray-200">
          {["All", "On-going", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold transition-all px-2 ${
                activeTab === tab 
                ? "text-[#6A5AFF] border-b-2 border-[#6A5AFF]" 
                : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden min-h-150">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-black text-slate-800 border-l-4 border-[#6A5AFF] pl-3">
                Projects List
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Client Name</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Compliance Framework/Standard</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Type of Assessment</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Auditors</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProjects.map((project) => (
                    <motion.tr 
                      key={project.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-gray-200">
                            <User size={14} className="text-gray-400" />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{project.client}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <span className="text-sm font-medium text-slate-600">{project.framework}</span>
                      </td>
                      <td className="py-5 px-4">
                        <span className="text-sm font-medium text-slate-600">{project.type}</span>
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex -space-x-2 items-center">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="auditor" className="w-full h-full object-cover" />
                            </div>
                          ))}
                          <span className="ml-3 text-[10px] font-bold text-gray-400 uppercase">+3 more</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-right">
                        <span className={`text-sm font-bold ${
                          project.status === "On-going" ? "text-slate-700" : "text-slate-700 opacity-60"
                        }`}>
                          {project.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
