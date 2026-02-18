import React, { useState, useRef } from "react";
import Sidebar from "../components/AdminSidebar";
import {
  User,
  Shield,
  Building2,
  Bell,
  Users,
  Save,
  CheckCircle,
  XCircle,
  Plus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const fileInputRef = useRef(null);

  /* ---------------- ADMIN DATA ---------------- */

  const [profile, setProfile] = useState({
    name: localStorage.getItem("user_name") || "System Administrator",
    email: localStorage.getItem("user_email") || "admin@capable.com",
    designation: "Super Admin",
    phone: "+91 9876543210",
    avatar: null,
    // Address Logic
    address: {
      street1: "123 Business Park",
      street2: "Sector 45",
      street3: "Primary HQ",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      postalCode: "560001",
    },
    // Certifications Logic
    certifications: ["ISO/IEC 27001:2022 Lead Auditor"],
  });

  const [platformSecurity, setPlatformSecurity] = useState({
    enforce2FA: true,
    passwordPolicy: "Strong",
    sessionTimeout: "30 mins",
  });

  const [orgDefaults, setOrgDefaults] = useState({
    defaultFramework: "ISO/IEC 27001:2022",
    auditCycle: "Annual",
    autoAssignAuditor: true,
  });

  const [userPolicy, setUserPolicy] = useState({
    allowSelfRegistration: false,
    maxProjectsPerOrg: 10,
    requireApproval: true,
  });

  const [notifications, setNotifications] = useState({
    systemAlerts: true,
    newOrganization: true,
    projectEscalations: true,
    complianceFailures: true,
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ---------------- LOGIC HANDLERS ---------------- */

  const handleSave = () => {
    localStorage.setItem("user_name", profile.name);
    localStorage.setItem("user_email", profile.email);
    showToast(`${activeTab} updated successfully`, "success");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCert = (index) => {
    const updated = profile.certifications.filter((_, i) => i !== index);
    setProfile({ ...profile, certifications: updated });
  };

  const addCert = () => {
    const newCert = prompt("Enter Certification Name:");
    if (newCert) {
      setProfile({ ...profile, certifications: [...profile.certifications, newCert] });
    }
  };

  const tabs = [
    { name: "Profile", icon: <User size={18} /> },
    { name: "Platform Security", icon: <Shield size={18} /> },
    { name: "Organization Defaults", icon: <Building2 size={18} /> },
    { name: "User Policies", icon: <Users size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <Sidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-12 max-w-7xl mx-auto">
        <header className="mb-12 text-left">
          <h2 className="text-3xl font-black text-[#111827] tracking-tight">Admin Control Panel</h2>
          <p className="text-gray-500 text-sm font-medium">Manage platform-wide configurations and profile settings.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
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
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-4xl border border-gray-100 shadow-sm p-10 min-h-125"
              >
                <h3 className="text-2xl font-black text-gray-900 mb-10">{activeTab}</h3>

                {/* PROFILE TAB (INTEGRATED IMAGE FEATURES) */}
                {activeTab === "Profile" && (
                  <div className="space-y-12">
                    {/* ABOUT USER SECTION */}
                    <div className="space-y-8">
                      <h4 className="text-sm font-black text-[#6A5AFF] border-l-4 border-[#6A5AFF] pl-4 uppercase">About the User</h4>
                      <div className="flex flex-col md:flex-row gap-10 items-start">
                        {/* Avatar Upload */}
                        <div className="relative group">
                          <div 
                            onClick={() => fileInputRef.current.click()}
                            className="w-36 h-36 bg-gray-900 rounded-3xl overflow-hidden cursor-pointer border-4 border-gray-50 shadow-lg"
                          >
                            {profile.avatar ? (
                              <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                                <User size={32} />
                                <span className="text-xs font-bold">Upload Avatar</span>
                              </div>
                            )}
                          </div>
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                        </div>

                        {/* Fields */}
                        <div className="flex-1 grid md:grid-cols-2 gap-6 w-full">
                          <Input label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                          <Input label="Designation" value={profile.designation} onChange={(e) => setProfile({ ...profile, designation: e.target.value })} />
                          <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                          <Input label="Email Address" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    {/* COMMUNICATION ADDRESS SECTION */}
                    <div className="space-y-8">
                      <h4 className="text-sm font-black text-[#6A5AFF] border-l-4 border-[#6A5AFF] pl-4 uppercase">Communication Address</h4>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 space-y-4">
                          <Input label="Street Address Line 1" value={profile.address.street1} onChange={(e) => setProfile({...profile, address: {...profile.address, street1: e.target.value}})} />
                          <Input label="Line 2" value={profile.address.street2} onChange={(e) => setProfile({...profile, address: {...profile.address, street2: e.target.value}})} />
                          <Input label="Line 3" value={profile.address.street3} onChange={(e) => setProfile({...profile, address: {...profile.address, street3: e.target.value}})} />
                        </div>
                        <div className="space-y-4">
                          <Input label="City/District" value={profile.address.city} onChange={(e) => setProfile({...profile, address: {...profile.address, city: e.target.value}})} />
                          <Input label="State" value={profile.address.state} onChange={(e) => setProfile({...profile, address: {...profile.address, state: e.target.value}})} />
                        </div>
                        <div className="space-y-4">
                          <Input label="Country" value={profile.address.country} onChange={(e) => setProfile({...profile, address: {...profile.address, country: e.target.value}})} />
                          <Input label="Postal Code/PIN" value={profile.address.postalCode} onChange={(e) => setProfile({...profile, address: {...profile.address, postalCode: e.target.value}})} />
                        </div>
                      </div>
                    </div>

                    {/* CERTIFICATIONS SECTION */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black text-[#6A5AFF] border-l-4 border-[#6A5AFF] pl-4 uppercase">Certifications</h4>
                      <div className="flex flex-wrap gap-4 items-center">
                        {profile.certifications.map((cert, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-[#6A5AFF] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-md">
                            {cert}
                            <button onClick={() => removeCert(idx)} className="hover:text-red-300 transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={addCert}
                          className="flex items-center gap-2 border-2 border-dashed border-gray-200 text-gray-400 px-5 py-3 rounded-2xl text-xs font-bold hover:border-[#6A5AFF] hover:text-[#6A5AFF] transition-all"
                        >
                          <Plus size={14} /> Add another certification
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PLATFORM SECURITY */}
                {activeTab === "Platform Security" && (
                  <div className="space-y-8">
                    <SettingCard title="Enforce Two-Factor Authentication" desc="Require all users to enable 2FA.">
                      <Toggle active={platformSecurity.enforce2FA} onClick={() => setPlatformSecurity({...platformSecurity, enforce2FA: !platformSecurity.enforce2FA})} />
                    </SettingCard>
                    <Input label="Password Policy" value={platformSecurity.passwordPolicy} onChange={(e) => setPlatformSecurity({ ...platformSecurity, passwordPolicy: e.target.value })} />
                    <Input label="Session Timeout" value={platformSecurity.sessionTimeout} onChange={(e) => setPlatformSecurity({ ...platformSecurity, sessionTimeout: e.target.value })} />
                  </div>
                )}

                {/* ORGANIZATION DEFAULTS */}
                {activeTab === "Organization Defaults" && (
                  <div className="space-y-8">
                    <Input label="Default Compliance Framework" value={orgDefaults.defaultFramework} onChange={(e) => setOrgDefaults({ ...orgDefaults, defaultFramework: e.target.value })} />
                    <Input label="Default Audit Cycle" value={orgDefaults.auditCycle} onChange={(e) => setOrgDefaults({ ...orgDefaults, auditCycle: e.target.value })} />
                    <SettingCard title="Auto Assign Auditor" desc="Automatically assign auditors to new organizations.">
                      <Toggle active={orgDefaults.autoAssignAuditor} onClick={() => setOrgDefaults({...orgDefaults, autoAssignAuditor: !orgDefaults.autoAssignAuditor})} />
                    </SettingCard>
                  </div>
                )}

                {/* USER POLICIES */}
                {activeTab === "User Policies" && (
                  <div className="space-y-8">
                    <SettingCard title="Allow Self Registration" desc="Allow organizations to register independently.">
                      <Toggle active={userPolicy.allowSelfRegistration} onClick={() => setUserPolicy({...userPolicy, allowSelfRegistration: !userPolicy.allowSelfRegistration})} />
                    </SettingCard>
                    <Input label="Max Projects per Organization" value={userPolicy.maxProjectsPerOrg} onChange={(e) => setUserPolicy({ ...userPolicy, maxProjectsPerOrg: e.target.value })} />
                    <SettingCard title="Require Admin Approval" desc="All new projects must be approved by Admin.">
                      <Toggle active={userPolicy.requireApproval} onClick={() => setUserPolicy({...userPolicy, requireApproval: !userPolicy.requireApproval})} />
                    </SettingCard>
                  </div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === "Notifications" && (
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <SettingCard key={key} title={key.replace(/([A-Z])/g, " $1")} desc="Enable or disable this system notification.">
                        <Toggle active={value} onClick={() => setNotifications({...notifications, [key]: !value})} />
                      </SettingCard>
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
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-8 right-8 z-50">
              <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${toast.type === "success" ? "bg-linear-to-r from-green-500 to-emerald-500" : "bg-linear-to-r from-red-500 to-rose-500"} text-white font-bold`}>
                {toast.type === "success" ? <CheckCircle size={22} /> : <XCircle size={22} />}
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

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
      <input {...props} className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl outline-none focus:border-[#6A5AFF] focus:bg-white transition-all text-sm font-bold text-gray-700" />
    </div>
  );
}

function Toggle({ active, onClick }) {
  return (
    <div onClick={onClick} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${active ? "bg-[#6A5AFF]" : "bg-gray-200"}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? "left-7" : "left-1"}`} />
    </div>
  );
}

function SettingCard({ title, desc, children }) {
  return (
    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
      <div>
        <h4 className="font-bold text-gray-900 text-sm capitalize">{title}</h4>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
      {children}
    </div>
  );
}