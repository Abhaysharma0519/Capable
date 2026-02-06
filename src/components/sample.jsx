import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Pencil,
  Trash2,
  Plus,
  LogOut,
  Settings as SettingsIcon,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminUser() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Updated Initial State
  const [newUser, setNewUser] = useState({
    userType: "Auditor",
    fullName: "",
    designation: "",
    email: "",
    password: "",
    phone: "",
    joiningDate: "",
    // Changed to array to support multi-address
    addresses: [{
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      cityDistrict: "",
      country: "",
      state: "",
      postalCode: "",
    }],
    certifications: ["Certification 1"],
    profileImage: null,
  });

  // Check if user is actually an admin
  useEffect(() => {
    const userRole = localStorage.getItem("user_role");
    if (userRole !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [userData] = useState({
    name: localStorage.getItem("user_name") || "Admin User",
    email: localStorage.getItem("user_email") || "abhaysharmans9148@gmail.com",
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: "System", desc: "New user added successfully", time: "Just now", type: "info" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Company-1", userType: "Client", email: "client-1@clientname.com", avatar: "C", color: "bg-[#6A5AFF]" },
    { id: 10, name: "Abhay Sharma", userType: "Admin", email: "super.admin@capable.com", avatar: "A", color: "bg-[#6A5AFF]" },
  ]);

  const tabs = ["All", "Clients", "PMO", "Admin", "Auditors"];

  // Logic to handle multi-address changes
  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...newUser.addresses];
    updatedAddresses[index][field] = value;
    setNewUser({ ...newUser, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    setNewUser({
      ...newUser,
      addresses: [...newUser.addresses, {
        addressLine1: "", addressLine2: "", addressLine3: "",
        cityDistrict: "", country: "", state: "", postalCode: ""
      }]
    });
  };

  const handleAddCertification = () => {
    setNewUser({
      ...newUser,
      certifications: [...newUser.certifications, `Certification ${newUser.certifications.length + 1}`],
    });
  };

  const handleRemoveCertification = (index) => {
    setNewUser({
      ...newUser,
      certifications: newUser.certifications.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setNewUser({ ...newUser, profileImage: reader.result }); };
      reader.readAsDataURL(file);
    }
  };

  const saveNewUser = () => {
    const newUserData = {
      id: users.length + 1,
      name: newUser.fullName,
      userType: newUser.userType,
      email: newUser.email || `${newUser.fullName.toLowerCase().replace(/\s+/g, ".")}@capable.com`,
      avatar: newUser.profileImage || newUser.fullName.charAt(0).toUpperCase(),
      color: "bg-[#6A5AFF]",
    };
    setUsers([...users, newUserData]);
    toast.success(`${newUser.fullName} has been added successfully`);
    setShowAddUserModal(false);
    // Reset State
    setNewUser({
        userType: "Auditor", fullName: "", designation: "", email: "", password: "",
        phone: "", joiningDate: "", addresses: [{ addressLine1: "", addressLine2: "", addressLine3: "", cityDistrict: "", country: "", state: "", postalCode: "" }],
        certifications: ["Certification 1"], profileImage: null
    });
  };

  const handleLogout = () => { localStorage.clear(); navigate("/"); };
  const handleEdit = (user) => { setEditingUser({ ...user }); setShowEditModal(true); };
  const handleDelete = (user) => { setUserToDelete(user); setShowDeleteModal(true); };
  const confirmDelete = () => { setUsers(users.filter((u) => u.id !== userToDelete.id)); setShowDeleteModal(false); };
  const saveEdit = () => { setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u))); setShowEditModal(false); };

  const filteredUsers = users.filter((user) => {
    if (activeTab === "All") return true;
    return user.userType === activeTab.replace(/s$/, ""); // Simple plural to singular match
  });

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <AdminSidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-8 lg:py-10 max-w-7xl mx-auto overflow-x-hidden">
        {/* Header & User List Table (Remains same as your original) */}
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-blue-500">
           <h2 className="text-2xl font-black text-[#111827]">Users</h2>
           <div className="flex gap-3">
              <button onClick={() => setShowNotifications(!showNotifications)} className="w-10 h-10 bg-white rounded-xl border flex items-center justify-center"><Bell size={18}/></button>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-10 h-10 bg-[#6A5AFF] rounded-xl flex items-center justify-center text-white"><User size={18}/></button>
           </div>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black text-slate-800">Manage Users</h3>
                    <p className="text-sm text-slate-500">Create and oversee access.</p>
                </div>
                <button onClick={() => setShowAddUserModal(true)} className="flex items-center gap-2 px-6 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold"><Plus size={18}/> Add User</button>
            </div>
            
            {/* Table placeholder for brevity - your original table goes here */}
            <div className="p-8">
                <table className="w-full text-left">
                    <thead><tr className="border-b text-xs uppercase text-gray-400 font-black"><th className="py-4">Name</th><th>Type</th><th>Email</th><th className="text-right">Action</th></tr></thead>
                    <tbody>
                        {filteredUsers.map(u => (
                            <tr key={u.id} className="border-b border-gray-50 text-sm">
                                <td className="py-4 font-bold">{u.name}</td>
                                <td>{u.userType}</td>
                                <td>{u.email}</td>
                                <td className="text-right">
                                    <button onClick={() => handleEdit(u)} className="p-2 hover:text-[#6A5AFF]"><Pencil size={16}/></button>
                                    <button onClick={() => handleDelete(u)} className="p-2 hover:text-rose-500"><Trash2 size={16}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </main>

      {/* Edit & Delete Modals remain same as your original... */}

      {/* ADD USER MODAL - FULLY UPDATED */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              <div className="sticky top-0 bg-white border-b p-6 rounded-t-3xl z-10 flex justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Add New {newUser.userType === "Client" ? "Client" : "User"}</h3>
                  <p className="text-sm text-gray-500">Configure access and profile details.</p>
                </div>
                <button onClick={() => setShowAddUserModal(false)} className="text-rose-500 font-bold">✕</button>
              </div>

              <div className="p-6 space-y-8">
                {/* 1. Account Credentials */}
                <div className="flex flex-wrap gap-6 items-end">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">User Type</label>
                    <select
                      value={newUser.userType}
                      onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
                      className="w-48 px-4 py-2.5 rounded-lg bg-[#6A5AFF] text-white font-semibold text-sm focus:outline-none"
                    >
                      <option value="Auditor">Auditor</option>
                      <option value="Client">Client</option>
                      <option value="PMO">PMO</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-bold text-gray-700 mb-2">Email Address</label>
                    <input type="email" placeholder="email@company.com" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-[#6A5AFF] outline-none" />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-bold text-gray-700 mb-2">Password</label>
                    <input type="password" placeholder="••••••••" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-[#6A5AFF] outline-none" />
                  </div>
                </div>

                {/* 2. Basic Info Section */}
                <div className="border-l-4 border-[#6A5AFF] pl-4">
                  <h4 className="text-base font-black text-slate-800 mb-4">
                    {newUser.userType === "Client" ? "Client Organization" : `About the ${newUser.userType}`}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 flex items-start gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200">
                          {newUser.profileImage ? <img src={newUser.profileImage} className="w-full h-full object-cover" /> : <User size={32} className="text-gray-300"/>}
                        </div>
                        <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-[#6A5AFF] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#6A5AFF] hover:text-white transition-all">
                          <Pencil size={12}/><input type="file" className="hidden" onChange={handleImageUpload}/>
                        </label>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">{newUser.userType === "Client" ? "Name of the Organization" : "Full Name"}</label>
                          <input type="text" value={newUser.fullName} onChange={(e) => setNewUser({...newUser, fullName: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">{newUser.userType === "Client" ? "Industry" : "Designation"}</label>
                          <input type="text" value={newUser.designation} onChange={(e) => setNewUser({...newUser, designation: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">Phone</label>
                      <input type="tel" value={newUser.phone} onChange={(e) => setNewUser({...newUser, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">{newUser.userType === "Client" ? "Name of Representative" : "Joining Date"}</label>
                      <input type="text" value={newUser.joiningDate} onChange={(e) => setNewUser({...newUser, joiningDate: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm" />
                    </div>
                  </div>
                </div>

                {/* 3. Dynamic Address Section */}
                <div className="border-l-4 border-[#6A5AFF] pl-4 space-y-6">
                  <h4 className="text-base font-black text-slate-800">
                    {newUser.userType === "Client" ? "Organization Addresses" : "Address"}
                  </h4>
                  
                  {newUser.addresses.map((addr, idx) => (
                    <div key={idx} className="space-y-4 pt-4 border-t border-gray-50 first:border-0 first:pt-0">
                      {newUser.userType === "Client" && (
                        <p className="text-[10px] font-black text-[#6A5AFF] uppercase tracking-widest">{idx === 0 ? "Organization HQ" : `Branch Office #${idx}`}</p>
                      )}
                      <div className="grid grid-cols-1 gap-3">
                        <input type="text" placeholder="Address Line 1" value={addr.addressLine1} onChange={(e) => handleAddressChange(idx, 'addressLine1', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border text-sm" />
                        <div className="grid grid-cols-2 gap-4">
                           <input type="text" placeholder="City" value={addr.cityDistrict} onChange={(e) => handleAddressChange(idx, 'cityDistrict', e.target.value)} className="px-4 py-2.5 rounded-lg border text-sm" />
                           <input type="text" placeholder="Country" value={addr.country} onChange={(e) => handleAddressChange(idx, 'country', e.target.value)} className="px-4 py-2.5 rounded-lg border text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <input type="text" placeholder="State" value={addr.state} onChange={(e) => handleAddressChange(idx, 'state', e.target.value)} className="px-4 py-2.5 rounded-lg border text-sm" />
                           <input type="text" placeholder="Postal Code" value={addr.postalCode} onChange={(e) => handleAddressChange(idx, 'postalCode', e.target.value)} className="px-4 py-2.5 rounded-lg border text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {newUser.userType === "Client" && (
                    <button onClick={handleAddAddress} className="text-[#6A5AFF] text-xs font-bold flex items-center gap-2 hover:underline">+ Add another address</button>
                  )}
                </div>

                {/* 4. Certifications (Only for Non-Clients) */}
                {newUser.userType !== "Client" && (
                  <div className="border-l-4 border-[#6A5AFF] pl-4">
                    <h4 className="text-base font-black text-slate-800 mb-4">Licenses & Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                       {newUser.certifications.map((cert, i) => (
                         <span key={i} className="px-3 py-1.5 bg-[#6A5AFF] text-white rounded-lg text-xs font-bold flex items-center gap-2">
                           {cert} <button onClick={() => handleRemoveCertification(i)}>✕</button>
                         </span>
                       ))}
                       <button onClick={handleAddCertification} className="px-3 py-1.5 border border-dashed border-[#6A5AFF] text-[#6A5AFF] rounded-lg text-xs font-bold">+</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-3xl flex justify-end">
                <button onClick={saveNewUser} className="px-10 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold shadow-lg hover:bg-[#5D45FD]">Save User</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}