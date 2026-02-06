import React, { useState } from "react";
import Sidebar from "../components/ClientSidebar";
import { User, Bell, Lock, Save, Camera, Mail, ShieldCheck, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const [activeSetting, setActiveSetting] = useState("Profile");

  const menu = [
    { name: "Profile", icon: <User size={18} /> },
    { name: "Security", icon: <Lock size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Sidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-12 max-w-6xl mx-auto">
        <header className="mb-10 text-left">
          <h2 className="text-3xl font-black text-[#111827] tracking-tight">System Settings</h2>
          <p className="text-gray-500 text-sm font-medium">Manage your account preferences and security audits.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

          {/* Settings Navigation */}
          <div className="flex flex-col gap-2">
            {menu.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSetting(item.name)}
                className={`flex items-center gap-4 px-6 py-4 rounded-3xl font-bold transition-all duration-300 ${activeSetting === item.name
                    ? "bg-[#6A5AFF] text-white shadow-xl shadow-indigo-200"
                    : "bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSetting}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm min-h-125 flex flex-col"
              >
                <div className="mb-10 flex justify-between items-center">
                  <h3 className="text-2xl font-black text-[#111827] tracking-tight">{activeSetting} Details</h3>
                  <div className="p-3 bg-indigo-50 rounded-2xl text-[#6A5AFF]">
                    {activeSetting === "Profile" && <User size={24} />}
                    {activeSetting === "Security" && <ShieldCheck size={24} />}
                    {activeSetting === "Notifications" && <Bell size={24} />}
                  </div>
                </div>

                <div className="flex-1">
                  {activeSetting === "Profile" && <ProfileForm />}
                  {activeSetting === "Security" && <SecurityForm />}
                  {activeSetting === "Notifications" && <NotificationsForm />}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-50 flex justify-end">
                  <button
                    onClick={() => toast.success(`${activeSetting} updated successfully!`)}
                    className="flex items-center gap-3 bg-[#6A5AFF] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#5D45FD] shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ProfileForm() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-6 mb-10">
        <div className="relative group">
          <div className="w-24 h-24 bg-indigo-100 rounded-4xl flex items-center justify-center text-[#6A5AFF] border-4 border-white shadow-md overflow-hidden">
            <User size={40} />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#6A5AFF] transition-colors">
            <Camera size={16} />
          </button>
        </div>
        <div className="text-left">
          <h4 className="font-bold text-gray-900">Profile Picture</h4>
          <p className="text-xs text-gray-400 font-medium">PNG, JPG max 5MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <Input label="Full Name" placeholder="Abhay Sharma" icon={<User size={16} />} />
        <Input label="Email Address" placeholder="abhay@clientname.com" icon={<Mail size={16} />} disabled />
        <Input label="Role" placeholder="Compliance Officer" disabled />
        <Input label="Organization" placeholder="Capable Tech" />
      </div>
    </div>
  );
}

function SecurityForm() {
  return (
    <div className="space-y-6 text-left">
      <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm"><Fingerprint className="text-[#6A5AFF]" /></div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Two-Factor Authentication</h4>
            <p className="text-xs text-gray-400 font-medium">Add an extra layer of security to your account.</p>
          </div>
        </div>
        <Toggle active={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Input label="Current Password" type="password" placeholder="••••••••" />
        <Input label="New Password" type="password" placeholder="••••••••" />
      </div>
    </div>
  );
}

function NotificationsForm() {
  return (
    <div className="space-y-4 text-left">
      <NotificationToggle title="Audit Alerts" desc="Get notified when a compliance audit is due." active={true} />
      <NotificationToggle title="Risk Reports" desc="Weekly summary of organization risk scores." active={false} />
      <NotificationToggle title="Security Updates" desc="Important system and security patches." active={true} />
    </div>
  );
}

// --- UI ATOMS ---

function Input({ label, icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">{icon}</div>}
        <input
          {...props}
          className={`w-full bg-gray-50 border border-gray-100 ${icon ? 'pl-11' : 'px-5'} py-4 rounded-2xl outline-none focus:border-[#6A5AFF] focus:bg-white transition-all text-sm font-bold text-gray-700 disabled:opacity-50`}
        />
      </div>
    </div>
  );
}

function Toggle({ active }) {
  return (
    <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-[#6A5AFF]' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </div>
  );
}

function NotificationToggle({ title, desc, active }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors group">
      <div>
        <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-400 font-medium">{desc}</p>
      </div>
      <Toggle active={active} />
    </div>
  );
}