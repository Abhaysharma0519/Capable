import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  CheckCircle,
  XCircle,
  Save,
  Phone,
  Briefcase,
  MapPin,
  Plus,
  Bell,
  X,
} from "lucide-react";
import AuditorSidebar from "../components/AuditorSidebar";

export default function AuditorSettings() {
  /* ---------------- USER DATA ---------------- */
  // Initialized with fields found in the new Profile image

  const [profile, setProfile] = useState({ avatar: null });
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ avatar: imageUrl });
    }
  };

  const [userData, setUserData] = useState({
    name: localStorage.getItem("user_name") || "Auditor User",
    email: localStorage.getItem("user_email") || "auditor@capable.com",
    designation: "Lead Auditor",
    phone: "+91 98765 43210",
    streetAddress: "Address Line 1",
    city: "City/District",
    state: "State",
    country: "Country",
    postalCode: "Postal Code/PIN",
    certifications: ["ISO/IEC 27001:2022 Lead Auditor"],
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [toast, setToast] = useState(null);

  /* ---------------- TOAST ---------------- */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ---------------- PROFILE SAVE ---------------- */
  const handleProfileSave = () => {
    localStorage.setItem("user_name", userData.name);
    localStorage.setItem("user_email", userData.email);
    showToast("Profile updated successfully", "success");
  };

  /* ---------------- PASSWORD SAVE ---------------- */
  const handlePasswordSave = () => {
    if (
      !passwordData.current ||
      !passwordData.newPass ||
      !passwordData.confirm
    ) {
      showToast("All password fields are required", "error");
      return;
    }
    if (passwordData.newPass !== passwordData.confirm) {
      showToast("Passwords do not match", "error");
      return;
    }
    showToast("Password updated successfully", "success");
    setPasswordData({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <AuditorSidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-8 lg:py-10 max-w-6xl mx-auto">
        {/* HEADER MATCHING IMAGE 3 */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Profile
          </h2>
        </div>

        <div className="space-y-8">
          {/* ABOUT THE USER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-4xl border border-slate-200 shadow-sm p-8 relative overflow-hidden"
          >
            <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
            <h3 className="text-lg font-black text-slate-800 mb-6 ml-2">
              About the User
            </h3>

            <div className="flex flex-col lg:flex-row gap-8 ml-2">
              {/* Profile Logo Box */}
              <div
                className="w-40 h-40 bg-slate-900 rounded-3xl overflow-hidden cursor-pointer relative shadow-lg group shrink-0 flex items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-white opacity-70 group-hover:opacity-100 transition-opacity">
                    <User size={32} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Upload Logo
                    </span>
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

              <div className="grid md:grid-cols-2 gap-6 flex-1">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#6A5AFF] outline-none transition-all font-medium bg-slate-50/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    placeholder="Designation"
                    value={userData.designation}
                    onChange={(e) =>
                      setUserData({ ...userData, designation: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#6A5AFF] outline-none transition-all font-medium bg-slate-50/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Phone"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#6A5AFF] outline-none transition-all font-medium bg-slate-50/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#6A5AFF] outline-none transition-all font-medium bg-slate-50/30"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* COMMUNICATION ADDRESS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-4xl border border-slate-200 shadow-sm p-8 relative overflow-hidden"
          >
            <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
            <h3 className="text-lg font-black text-slate-800 mb-6 ml-2">
              Communication Address
            </h3>

            <div className="ml-2 space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Organization HQ
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    value={userData.streetAddress}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/30"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/30"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/30"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      City/District
                    </label>
                    <input
                      type="text"
                      placeholder="City/District"
                      value={userData.city}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="State"
                      value={userData.state}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/30"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="Country"
                      value={userData.country}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      Postal Code/PIN
                    </label>
                    <input
                      type="text"
                      placeholder="Postal Code/PIN"
                      value={userData.postalCode}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CERTIFICATIONS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-4xl border border-slate-200 shadow-sm p-8 relative overflow-hidden"
          >
            <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
            <h3 className="text-lg font-black text-slate-800 mb-6 ml-2">
              Certifications
            </h3>

            <div className="flex flex-wrap gap-4 ml-2">
              {userData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-md"
                >
                  {cert} <X size={14} className="cursor-pointer" />
                </div>
              ))}
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-200 text-slate-400 rounded-lg text-xs font-bold hover:border-[#6A5AFF] hover:text-[#6A5AFF] transition-all">
                <Plus size={14} /> Add another address
              </button>
            </div>
          </motion.div>

          {/* PASSWORD SECTION (Maintain Logic) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-4xl border border-slate-200 shadow-sm p-8 relative overflow-hidden"
          >
            <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
            <h3 className="text-lg font-black text-slate-800 mb-6 ml-2">
              Security Settings
            </h3>
            <div className="grid md:grid-cols-3 gap-6 ml-2">
              {["current", "newPass", "confirm"].map((field) => (
                <div key={field}>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    {field === "current"
                      ? "Current Password"
                      : field === "newPass"
                        ? "New Password"
                        : "Confirm Password"}
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="password"
                      value={passwordData[field]}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          [field]: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-[#6A5AFF] outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* GLOBAL SAVE ACTION */}
          <div className="flex justify-end gap-4 mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleProfileSave();
                handlePasswordSave();
              }}
              className="inline-flex items-center gap-2 px-10 py-4 bg-linear-to-r from-[#6A5AFF] to-[#5A4AEF] text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all uppercase tracking-widest text-xs"
            >
              <Save size={18} />
              Save All Profile Settings
            </motion.button>
          </div>
        </div>

        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <div
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"} text-white font-bold`}
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
