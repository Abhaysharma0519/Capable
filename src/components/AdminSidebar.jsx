import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3, Users, FileText, Settings,
  Menu, X, ShieldCheck, LogOut, Building2, FolderKanban
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const adminNavItems = [
  { icon: <BarChart3 size={22} />, label: "Overview", path: "/admin-dashboard" },
  { icon: <Users size={22} />, label: "Users", path: "/admin/users" },
  { icon: <Building2 size={22} />, label: "Organizations", path: "/admin/organizations" },
  { icon: <FolderKanban size={22} />, label: "Projects", path: "/admin/projects" },
  { icon: <FileText size={22} />, label: "Compliances", path: "/admin/compliances" },
];

const bottomItems = [
  { icon: <FileText size={20} />, label: "Documentation", path: "/admin/docs" },
  { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
];

const SidebarContent = ({ isHovered, mobile, userName, userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full py-6 select-none bg-white">
      {/* 1. BRAND SECTION */}
      <div className={`px-5 mb-10 flex items-center gap-3 ${!isHovered && !mobile ? "justify-center" : "justify-start"}`}>
        <motion.div
          whileHover={{ rotate: 12, scale: 1.05 }}
          className="relative shrink-0 cursor-pointer"
        >
          <div className="bg-[#6A5AFF] p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
        </motion.div>
        {(isHovered || mobile) && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="font-black text-xl text-slate-900 tracking-tight leading-none uppercase">Capable</span>
            <span className="text-[10px] font-bold text-[#6A5AFF] uppercase tracking-[0.2em] mt-1">Admin Console</span>
          </motion.div>
        )}
      </div>

      {/* 2. MAIN NAV */}
      <nav className="flex-1 px-3 space-y-1.5">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center rounded-2xl transition-all duration-300 py-3.5
              ${!isHovered && !mobile ? "justify-center px-0" : "justify-start px-4 gap-4"}
              ${isActive
                ? "bg-[#6A5AFF] text-white shadow-xl shadow-indigo-100"
                : "text-slate-500 hover:bg-indigo-50/50 hover:text-[#6A5AFF]"
              }`
            }
          >
            <motion.span whileHover={{ scale: 1.1 }} className="shrink-0">{item.icon}</motion.span>

            {(isHovered || mobile) && (
              <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex flex-1 justify-between items-center">
                <span className="text-sm font-bold whitespace-nowrap">{item.label}</span>
              </motion.div>
            )}

            {!isHovered && !mobile && (
              <div className="absolute left-20 bg-slate-900 text-white text-[10px] px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform -translate-x-2.5 group-hover:translate-x-0 font-bold uppercase tracking-widest z-50 whitespace-nowrap shadow-xl">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 3. FOOTER SECTION */}
      <div className="px-3 pt-6 border-t border-slate-100 space-y-1">
        <p className={`text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 transition-all ${!isHovered && !mobile ? "text-center opacity-50" : "px-4"}`}>
          {(isHovered || mobile) ? "Management" : "•••"}
        </p>

        {bottomItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={`group relative flex items-center rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all py-3
              ${!isHovered && !mobile ? "justify-center px-0" : "justify-start px-4 gap-4"}`}
          >
            <motion.span whileHover={{ rotate: 15 }} className="shrink-0">{item.icon}</motion.span>
            {(isHovered || mobile) && <span className="text-sm font-bold">{item.label}</span>}

            {!isHovered && !mobile && (
              <div className="absolute left-20 bg-slate-900 text-white text-[10px] px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform -translate-x-2.5 group-hover:translate-x-0 font-bold uppercase tracking-widest z-50 whitespace-nowrap shadow-xl">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}

        {/* PROFILE CARD */}
        <div
          className={`mt-6 group relative rounded-3xl transition-all duration-500 overflow-hidden ${!isHovered && !mobile ? "bg-transparent" : "bg-slate-900 p-2.5 shadow-2xl"}`}
        >
          <div className={`flex items-center ${!isHovered && !mobile ? "justify-center" : "gap-3"}`}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-[#6A5AFF] to-[#867aff] text-white flex items-center justify-center font-black text-sm border-2 shadow-inner">
                {userName.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            {(isHovered || mobile) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 overflow-hidden"
              >
                <p className="text-xs font-black text-white truncate uppercase tracking-tighter">{userName}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-[9px] text-slate-400 font-bold truncate">System Admin</p>
                </div>
              </motion.div>
            )}

            {(isHovered || mobile) && (
              <motion.button
                whileHover={{ scale: 1.1, color: "#ff4d4d" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:bg-white/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </motion.button>
            )}
          </div>

          {!isHovered && !mobile && (
            <div className="absolute left-20 bg-slate-900 text-white text-[10px] px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform -translate-x-2.5 group-hover:translate-x-0 font-bold z-50 whitespace-nowrap shadow-2xl border border-white/5">
              <p className="text-[#6A5AFF] mb-0.5 uppercase tracking-widest">Admin Account</p>
              {userEmail}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2 text-emerald-400">
                <LogOut size={10} /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AdminSidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [userData] = useState({
    name: localStorage.getItem("user_name") || "Admin Abhay",
    email: localStorage.getItem("user_email") || "abhaysharmans9148@gmail.com"
  });

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 flex items-center justify-between z-100">
        <div className="flex items-center gap-2 text-[#6A5AFF]">
          <ShieldCheck size={24} strokeWidth={2.5} />
          <span className="font-black text-lg tracking-tighter text-slate-900 uppercase">Capable</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 text-slate-600 bg-slate-50 rounded-xl active:scale-90 transition-transform shadow-sm"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ width: isHovered ? 280 : 90 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="hidden lg:flex fixed left-0 top-0 bottom-0 bg-white border-r border-slate-100 flex-col z-110 shadow-[10px_0_30px_rgba(0,0,0,0.01)]"
      >
        <SidebarContent
          isHovered={isHovered}
          userName={userData.name}
          userEmail={userData.email}
        />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 z-120 lg:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-130 lg:hidden shadow-2xl overflow-hidden"
            >
              <SidebarContent
                mobile={true}
                isHovered={true}
                userName={userData.name}
                userEmail={userData.email}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="hidden lg:block shrink-0 transition-all duration-300" style={{ width: 90 }} />
    </>
  );
}