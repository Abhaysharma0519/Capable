import React, { useState, useRef } from "react";
import Sidebar from "../components/PMOSidebar";
import {
  User,
  ShieldCheck,
  Bell,
  Settings,
  FolderKanban,
  Users,
  Save,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PMOSettings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const fileInputRef = useRef(null);

  /* ---------------- USER DATA ---------------- */

  const [profile, setProfile] = useState({
    name: localStorage.getItem("user_name") || "PMO Officer",
    email: localStorage.getItem("user_email") || "pmo@capable.com",
    department: "Compliance Management",
    designation: "Lead PMO",
    phone: "+91 9876543210",
    avatar: null,
    // Address Logic integrated from image
    address: {
      street1: "",
      street2: "",
      street3: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    // Certifications Logic integrated from image
    certifications: ["ISO/IEC 27001:2022 Lead Auditor"],
  });

  const [projectRules, setProjectRules] = useState({
    autoAssignAuditor: true,
    autoAssignClientOwner: true,
    defaultAuditDuration: "30 Days",
    escalationThreshold: "High Risk Only",
  });

  const [riskSettings, setRiskSettings] = useState({
    riskTolerance: "Medium",
    allowProjectOverride: false,
    autoEscalation: true,
  });

  const [notifications, setNotifications] = useState({
    newProject: true,
    projectDelay: true,
    complianceCompletion: true,
    auditorSubmission: true,
  });

  const [toast, setToast] = useState(null);

  /* ---------------- LOGIC HANDLERS ---------------- */

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    localStorage.setItem("user_name", profile.name);
    localStorage.setItem("user_email", profile.email);
    showToast(`${activeTab} settings saved successfully`);
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

  const addCertification = () => {
    const cert = prompt("Enter Certification Name:");
    if (cert) {
      setProfile({ ...profile, certifications: [...profile.certifications, cert] });
    }
  };

  const removeCertification = (index) => {
    setProfile({
      ...profile,
      certifications: profile.certifications.filter((_, i) => i !== index),
    });
  };

  const tabs = [
    { name: "Profile", icon: <User size={18} /> },
    { name: "Project Governance", icon: <FolderKanban size={18} /> },
    { name: "Risk Controls", icon: <AlertTriangle size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <Sidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-12 max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-12 text-left">
          <h2 className="text-3xl font-black text-[#111827] tracking-tight">
            PMO Settings
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Configure portfolio governance rules, risk policies, and project oversight controls.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

          {/* LEFT MENU */}
          <div className="flex flex-col gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-4 px-6 py-4 rounded-3xl font-bold transition-all ${
                  activeTab === tab.name
                    ? "bg-[#6A5AFF] text-white shadow-xl shadow-indigo-200"
                    : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* RIGHT CONTENT */}
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
                <h3 className="text-2xl font-black text-gray-900 mb-10">
                  {activeTab}
                </h3>

                {/* PROFILE - UPDATED WITH IMAGE FEATURES */}
                {activeTab === "Profile" && (
                  <div className="space-y-12">
                    
                    {/* ABOUT THE USER SECTION */}
                    <div className="space-y-8">
                      <h4 className="text-sm font-black text-[#6A5AFF] border-l-4 border-[#6A5AFF] pl-4 uppercase tracking-tight">
                        About the User
                      </h4>
                      <div className="flex flex-col md:flex-row gap-10 items-start">
                        {/* Avatar Upload Container */}
                        <div 
                          className="w-40 h-40 bg-gray-900 rounded-3xl overflow-hidden cursor-pointer relative shadow-lg group border-4 border-white"
                          onClick={() => fileInputRef.current.click()}
                         >
                          {profile.avatar ? (
                            <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white opacity-70 group-hover:opacity-100 transition-opacity">
                              <User size={32} />
                              <span className="text-xs font-bold">Upload Avatar</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleAvatarChange} 
                          />
                        </div>

                        <div className="flex-1 grid md:grid-cols-2 gap-6 w-full">
                          <Input
                            label="Full Name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                          <Input
                            label="Designation"
                            value={profile.designation}
                            onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                          />
                          <Input
                            label="Phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                          <Input
                            label="Email Address"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* COMMUNICATION ADDRESS SECTION */}
                    <div className="space-y-8">
                      <h4 className="text-sm font-black text-[#6A5AFF] border-l-4 border-[#6A5AFF] pl-4 uppercase tracking-tight">
                        Communication Address
                      </h4>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-4 md:col-span-1">
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Organization HQ</p>
                          <Input label="Street Address Line 1" placeholder="Address Line 1" value={profile.address.street1} onChange={(e) => setProfile({...profile, address: {...profile.address, street1: e.target.value}})} />
                          <Input label="Street Address Line 2" placeholder="Address Line 1" value={profile.address.street2} onChange={(e) => setProfile({...profile, address: {...profile.address, street2: e.target.value}})} />
                          <Input label="Street Address Line 3" placeholder="Address Line 1" value={profile.address.street3} onChange={(e) => setProfile({...profile, address: {...profile.address, street3: e.target.value}})} />
                        </div>
                        <div className="space-y-4">
                          <div className="h-5.25" /> {/* Spacer */}
                          <Input label="City/District" placeholder="City/District" value={profile.address.city} onChange={(e) => setProfile({...profile, address: {...profile.address, city: e.target.value}})} />
                          <Input label="State" placeholder="State" value={profile.address.state} onChange={(e) => setProfile({...profile, address: {...profile.address, state: e.target.value}})} />
                        </div>
                        <div className="space-y-4">
                          <div className="h-5.25" /> {/* Spacer */}
                          <Input label="Country" placeholder="Country" value={profile.address.country} onChange={(e) => setProfile({...profile, address: {...profile.address, country: e.target.value}})} />
                          <Input label="Postal Code/PIN" placeholder="Postal Code/PIN" value={profile.address.postalCode} onChange={(e) => setProfile({...profile, address: {...profile.address, postalCode: e.target.value}})} />
                        </div>
                      </div>
                    </div>

                    {/* CERTIFICATIONS SECTION */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black text-[#6A5AFF] border-l-4 border-[#6A5AFF] pl-4 uppercase tracking-tight">
                        Certifications
                      </h4>
                      <div className="flex flex-wrap gap-4 items-center">
                        {profile.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-3 bg-[#6A5AFF] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-md">
                            {cert}
                            <button onClick={() => removeCertification(index)} className="hover:text-red-300">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={addCertification}
                          className="flex items-center gap-2 border-2 border-dashed border-gray-200 text-gray-400 px-6 py-3 rounded-2xl text-xs font-bold hover:border-[#6A5AFF] hover:text-[#6A5AFF] transition-all"
                        >
                          <Plus size={16} /> Add another certification
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT GOVERNANCE */}
                {activeTab === "Project Governance" && (
                  <div className="space-y-8">
                    <SettingCard
                      title="Auto Assign Auditor"
                      desc="Automatically assign an auditor to new projects."
                    >
                      <Toggle
                        active={projectRules.autoAssignAuditor}
                        onClick={() =>
                          setProjectRules({
                            ...projectRules,
                            autoAssignAuditor:
                              !projectRules.autoAssignAuditor,
                          })
                        }
                      />
                    </SettingCard>

                    <SettingCard
                      title="Auto Assign Client Owner"
                      desc="Automatically assign project owner."
                    >
                      <Toggle
                        active={projectRules.autoAssignClientOwner}
                        onClick={() =>
                          setProjectRules({
                            ...projectRules,
                            autoAssignClientOwner:
                              !projectRules.autoAssignClientOwner,
                          })
                        }
                      />
                    </SettingCard>

                    <Input
                      label="Default Audit Duration"
                      value={projectRules.defaultAuditDuration}
                      onChange={(e) =>
                        setProjectRules({
                          ...projectRules,
                          defaultAuditDuration: e.target.value,
                        })
                      }
                    />

                    <Input
                      label="Escalation Threshold"
                      value={projectRules.escalationThreshold}
                      onChange={(e) =>
                        setProjectRules({
                          ...projectRules,
                          escalationThreshold: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {/* RISK CONTROLS */}
                {activeTab === "Risk Controls" && (
                  <div className="space-y-8">
                    <Input
                      label="Risk Tolerance Level"
                      value={riskSettings.riskTolerance}
                      onChange={(e) =>
                        setRiskSettings({
                          ...riskSettings,
                          riskTolerance: e.target.value,
                        })
                      }
                    />

                    <SettingCard
                      title="Allow Project Override"
                      desc="Allow manual override of risk scoring."
                    >
                      <Toggle
                        active={riskSettings.allowProjectOverride}
                        onClick={() =>
                          setRiskSettings({
                            ...riskSettings,
                            allowProjectOverride:
                              !riskSettings.allowProjectOverride,
                          })
                        }
                      />
                    </SettingCard>

                    <SettingCard
                      title="Auto Escalation"
                      desc="Automatically escalate high-risk projects."
                    >
                      <Toggle
                        active={riskSettings.autoEscalation}
                        onClick={() =>
                          setRiskSettings({
                            ...riskSettings,
                            autoEscalation:
                              !riskSettings.autoEscalation,
                          })
                        }
                      />
                    </SettingCard>
                  </div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === "Notifications" && (
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <SettingCard
                        key={key}
                        title={key.replace(/([A-Z])/g, " $1")}
                        desc="Enable or disable this notification."
                      >
                        <Toggle
                          active={value}
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [key]: !value,
                            })
                          }
                        />
                      </SettingCard>
                    ))}
                  </div>
                )}

                {/* SAVE */}
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
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold">
                <CheckCircle size={20} />
                <span className="text-sm">{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ---------------- REUSABLE UI ---------------- */

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl outline-none focus:border-[#6A5AFF] focus:bg-white transition-all text-sm font-bold text-gray-700"
      />
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

function SettingCard({ title, desc, children }) {
  return (
    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
      <div>
        <h4 className="font-bold text-gray-900 text-sm capitalize">
          {title}
        </h4>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
      {children}
    </div>
  );
}