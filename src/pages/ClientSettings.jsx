import React, { useState } from "react";
import Sidebar from "../components/ClientSidebar";
import {
  User,
  Mail,
  Lock,
  Building2,
  Bell,
  ShieldCheck,
  Save,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientSettings() {
  const [activeTab, setActiveTab] = useState("Profile");

  /* ---------------- USER DATA ---------------- */

  const [profile, setProfile] = useState({
    name: localStorage.getItem("user_name") || "Abhay Sharma",
    email: localStorage.getItem("user_email") || "abhay@clientname.com",
    role: "Compliance Officer",
  });

  const [organization, setOrganization] = useState({
    company: "Capable Tech",
    industry: "Information Security",
    size: "50-200 Employees",
  });

  const [security, setSecurity] = useState({
    current: "",
    newPass: "",
    confirm: "",
    twoFactor: true,
  });

  const [notifications, setNotifications] = useState({
    auditAlerts: true,
    riskReports: false,
    systemUpdates: true,
    weeklySummary: true,
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    localStorage.setItem("user_name", profile.name);
    localStorage.setItem("user_email", profile.email);
    showToast(`${activeTab} updated successfully`, "success");
  };

  const tabs = [
    { name: "Profile", icon: <User size={18} /> },
    { name: "Organization", icon: <Building2 size={18} /> },
    { name: "Security", icon: <ShieldCheck size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <Sidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-12 max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-12 text-left">
          <h2 className="text-3xl font-black text-[#111827] tracking-tight">
            Client Settings
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Configure your account preferences and compliance environment.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

          {/* LEFT NAVIGATION */}
          <div className="flex flex-col gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-4 px-6 py-4 rounded-3xl font-bold transition-all duration-300 ${
                  activeTab === tab.name
                    ? "bg-[#6A5AFF] text-white shadow-xl shadow-indigo-200"
                    : "bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600 border border-gray-100"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* CONTENT AREA */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-4xl border border-gray-100 shadow-sm p-10 min-h-125"
              >
                {/* TAB HEADER */}
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black text-gray-900">
                    {activeTab} Settings
                  </h3>
                  <div className="p-3 bg-indigo-50 rounded-2xl text-[#6A5AFF]">
                    {tabs.find((t) => t.name === activeTab)?.icon}
                  </div>
                </div>

                {/* TAB CONTENT */}
                {activeTab === "Profile" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <Input
                      label="Full Name"
                      icon={<User size={16} />}
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                    <Input
                      label="Email"
                      icon={<Mail size={16} />}
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                    <Input
                      label="Role"
                      value={profile.role}
                      onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })
                      }
                    />
                  </div>
                )}

                {activeTab === "Organization" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <Input
                      label="Company Name"
                      icon={<Building2 size={16} />}
                      value={organization.company}
                      onChange={(e) =>
                        setOrganization({ ...organization, company: e.target.value })
                      }
                    />
                    <Input
                      label="Industry"
                      value={organization.industry}
                      onChange={(e) =>
                        setOrganization({ ...organization, industry: e.target.value })
                      }
                    />
                    <Input
                      label="Company Size"
                      value={organization.size}
                      onChange={(e) =>
                        setOrganization({ ...organization, size: e.target.value })
                      }
                    />
                  </div>
                )}

                {activeTab === "Security" && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <Input
                        label="Current Password"
                        type="password"
                        icon={<Lock size={16} />}
                        value={security.current}
                        onChange={(e) =>
                          setSecurity({ ...security, current: e.target.value })
                        }
                      />
                      <Input
                        label="New Password"
                        type="password"
                        icon={<Lock size={16} />}
                        value={security.newPass}
                        onChange={(e) =>
                          setSecurity({ ...security, newPass: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-xs text-gray-400">
                          Extra protection for your compliance account.
                        </p>
                      </div>
                      <Toggle
                        active={security.twoFactor}
                        onClick={() =>
                          setSecurity({
                            ...security,
                            twoFactor: !security.twoFactor,
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {activeTab === "Notifications" && (
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-5 hover:bg-gray-50 rounded-2xl border border-gray-100"
                      >
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h4>
                          <p className="text-xs text-gray-400">
                            Manage notification preference.
                          </p>
                        </div>
                        <Toggle
                          active={value}
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [key]: !value,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* SAVE BUTTON */}
                <div className="mt-14 pt-8 border-t border-gray-50 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-3 bg-[#6A5AFF] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#5D45FD] shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* TOAST */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <div
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${
                  toast.type === "success"
                    ? "bg-linear-to-r from-green-500 to-emerald-500"
                    : "bg-linear-to-r from-red-500 to-rose-500"
                } text-white font-bold`}
              >
                {toast.type === "success" ? (
                  <CheckCircle size={22} />
                ) : (
                  <XCircle size={22} />
                )}
                <span className="text-sm">{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Input({ label, icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full bg-gray-50 border border-gray-100 ${
            icon ? "pl-11" : "px-5"
          } py-4 rounded-2xl outline-none focus:border-[#6A5AFF] focus:bg-white transition-all text-sm font-bold text-gray-700`}
        />
      </div>
    </div>
  );
}

function Toggle({ active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
        active ? "bg-[#6A5AFF]" : "bg-gray-200"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
          active ? "left-7" : "left-1"
        }`}
      />
    </div>
  );
}
