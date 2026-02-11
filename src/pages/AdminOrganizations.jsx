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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminOrganizations() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState(null);
  const [showAddOrgModal, setShowAddOrgModal] = useState(false);
  const [newOrg, setNewOrg] = useState({
    name: "",
    email: "",
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
    {
      id: 1,
      title: "System",
      desc: "New organization added successfully",
      time: "Just now",
      type: "info",
    },
  ]);

  const [organizations, setOrganizations] = useState([
    { id: 1, name: "Company-1 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company1.com", color: "bg-yellow-400" },
    { id: 2, name: "Company-2 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company2.com", color: "bg-rose-400" },
    { id: 3, name: "Company-3 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company3.com", color: "bg-cyan-400" },
    { id: 4, name: "Company-4 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company4.com", color: "bg-green-400" },
    { id: 5, name: "Company-5 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company5.com", color: "bg-pink-400" },
  ]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEdit = (org) => {
    setEditingOrg({ ...org });
    setShowEditModal(true);
  };

  const handleDelete = (org) => {
    setOrgToDelete(org);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setOrganizations(organizations.filter((o) => o.id !== orgToDelete.id));
    toast.success(`${orgToDelete.name} has been deleted successfully`);
    setShowDeleteModal(false);
    setOrgToDelete(null);
  };

  const saveEdit = () => {
    setOrganizations(organizations.map((o) => (o.id === editingOrg.id ? editingOrg : o)));
    toast.success(`${editingOrg.name} has been updated successfully`);
    setShowEditModal(false);
    setEditingOrg(null);
  };

  const saveNewOrg = () => {
    const colors = ["bg-yellow-400", "bg-rose-400", "bg-cyan-400", "bg-green-400", "bg-pink-400"];
    const newOrgData = {
      id: organizations.length + 1,
      name: newOrg.name,
      email: newOrg.email,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + "th",
      color: colors[organizations.length % colors.length],
    };
    setOrganizations([...organizations, newOrgData]);
    toast.success(`${newOrg.name} has been added successfully`);
    setShowAddOrgModal(false);
    setNewOrg({
      name: "",
      email: "",
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <AdminSidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-8 lg:py-10 max-w-7xl mx-auto overflow-x-hidden">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-blue-500">
          <div className="flex flex-col text-left">
            <h2 className="text-2xl font-black text-[#111827] tracking-tight">
              Client Organizations
            </h2>
            <p className="text-xs text-gray-500 font-medium md:hidden">
              Welcome, {userData.name}
            </p>
          </div>

          <div className="flex gap-3 relative">
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all relative ${showNotifications ? "bg-[#6A5AFF] text-white border-[#6A5AFF]" : "bg-white text-gray-400 border-gray-100 shadow-sm hover:text-[#6A5AFF]"}`}
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
                                className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.type === "urgent" ? "bg-rose-500" : "bg-[#6A5AFF]"}`}
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
                          navigate("/admin/settings");
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

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Title Section */}
          <div className="p-8 pb-6 border-b border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-800 mb-1">
                  Manage and Monitor Client Organizations
                </h3>
                <p className="text-sm text-slate-500">
                  Create, control, and oversee all client organizations in one place.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddOrgModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#5D45FD] transition-all"
              >
                <Plus size={18} />
                Add New Company
              </motion.button>
            </div>
          </div>

          {/* Organizations List Table */}
          <div className="p-8">
            <div className="mb-4">
              <h4 className="text-sm font-black text-slate-800 border-l-4 border-[#6A5AFF] pl-3">
                Organizations List
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-xs font-black text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-black text-gray-500 uppercase tracking-wider">
                      Sign Up Date
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-black text-gray-500 uppercase tracking-wider">
                      E-mail
                    </th>
                    <th className="text-right py-4 px-4 text-xs font-black text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {organizations.map((org, index) => (
                      <motion.tr
                        key={org.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${org.color} flex items-center justify-center text-white font-bold text-xs`}
                            />
                            <span className="text-sm font-bold text-slate-800">
                              {org.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-600">
                            {org.date}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-600">
                            {org.email}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(org)}
                              className="p-2 text-gray-600 hover:text-[#6A5AFF] hover:bg-indigo-50 rounded-lg transition-all"
                              title="Edit organization"
                            >
                              <Pencil size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(org)}
                              className="p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                              title="Delete organization"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingOrg && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4"
              >
                <h3 className="text-2xl font-black text-slate-800 mb-6">
                  Edit Organization
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={editingOrg.name}
                      onChange={(e) =>
                        setEditingOrg({ ...editingOrg, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editingOrg.email}
                      onChange={(e) =>
                        setEditingOrg({
                          ...editingOrg,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="flex-1 px-6 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold hover:bg-[#5D45FD] transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && orgToDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4"
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trash2 size={32} className="text-rose-500" />
                </div>

                <h3 className="text-2xl font-black text-slate-800 mb-3 text-center">
                  Delete Organization?
                </h3>
                <p className="text-sm text-gray-600 text-center mb-8">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-slate-800">
                    {orgToDelete.name}
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Organization Modal */}
      <AnimatePresence>
        {showAddOrgModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddOrgModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800">
                        Add Organization
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Add a new client organization.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddOrgModal(false)}
                      className="text-rose-500 hover:bg-rose-50 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex flex-col gap-6">
                    {/* Organization Name */}
                    <div className="w-full">
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={newOrg.name}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="w-full">
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="management@company.com"
                        value={newOrg.email}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-3xl flex justify-start">
                  <button
                    onClick={saveNewOrg}
                    className="px-8 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold hover:bg-[#5D45FD] transition-all shadow-lg"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}