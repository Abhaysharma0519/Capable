import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Search,
  Plus,
  Trash2,
  X,
  Pencil,
  LogOut,
  Settings as SettingsIcon,
  FileText,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// reference `motion` to satisfy some linters that don't detect JSX usage
void motion;
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminCompliances() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [editingCompliance, setEditingCompliance] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const nextIdRef = useRef(0);

  // User data
  const [userData] = useState({
    name: localStorage.getItem("user_name") || "Admin Name",
    email: localStorage.getItem("user_email") || "super.admin@capable.com",
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System",
      desc: "Compliance framework added successfully",
      time: "Just now",
      type: "info",
    },
  ]);

  // Default Compliances List with Enhanced Data
  const [compliances, setCompliances] = useState([
    { id: 1, name: "ISO/IEC 27001:2022", version: "2022", status: "Active", sections: 14, lastUpdated: "2024-01-15", description: "Information security management" },
    { id: 2, name: "ISO 22301:2019", version: "2019", status: "Active", sections: 8, lastUpdated: "2024-01-10", description: "Business continuity management" },
    { id: 3, name: "GDPR", version: "2018", status: "Active", sections: 11, lastUpdated: "2024-01-20", description: "General Data Protection Regulation" },
    { id: 4, name: "HIPAA", version: "2013", status: "Pending", sections: 6, lastUpdated: "2024-01-05", description: "Health Insurance Portability" },
    { id: 5, name: "PCI-DSS", version: "3.2.1", status: "Active", sections: 12, lastUpdated: "2024-01-18", description: "Payment Card Industry Data Security" },
  ]);

  // Modal State
  const [newCompliance, setNewCompliance] = useState({
    name: "",
    version: "",
    description: "",
    status: "Active",
    sections: [
      {
        id: 1,
        type: "Clause",
        name: "",
        description: "",
        subSections: [],
      },
    ],
  });



  const resetModal = () => {
    nextIdRef.current = 0;
    setNewCompliance({
      name: "",
      version: "",
      description: "",
      status: "Active",
      sections: [
        {
          id: 1,
          type: "Clause",
          name: "",
          description: "",
          subSections: [],
        },
      ],
    });
    setEditingCompliance(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEdit = (compliance) => {
    setEditingCompliance({ ...compliance });
    setNewCompliance({ ...compliance });
    setShowEditModal(true);
  };

  const handleDeleteCompliance = () => {
    if (selectedCompliance) {
      setCompliances(compliances.filter(c => c.id !== selectedCompliance.id));
      toast.success(`${selectedCompliance.name} deleted successfully`);
      setShowDeleteConfirm(false);
      setSelectedCompliance(null);
      setNotifications([...notifications, {
        id: Date.now(),
        title: "System",
        desc: `${selectedCompliance.name} has been deleted`,
        time: "Just now",
        type: "info",
      }]);
    }
  };

  const handleSaveEdit = () => {
    if (!newCompliance.name.trim() || !newCompliance.version.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    const updatedCompliance = {
      ...editingCompliance,
      name: newCompliance.name,
      version: newCompliance.version,
      description: newCompliance.description,
      status: newCompliance.status,
      sections: newCompliance.sections.length,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setCompliances(compliances.map(c => c.id === editingCompliance.id ? updatedCompliance : c));
    toast.success(`${newCompliance.name} updated successfully`);
    setShowEditModal(false);
    resetModal();
    setNotifications([...notifications, {
      id: Date.now(),
      title: "System",
      desc: `${newCompliance.name} has been updated`,
      time: "Just now",
      type: "info",
    }]);
  };

  // Logic to add a main section (Clause/Control)
  const addSection = () => {
    nextIdRef.current += 1;
    setNewCompliance((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: nextIdRef.current,
          type: "Clause",
          name: "",
          description: "",
          subSections: [],
        },
      ],
    }));
  };

  const handleAddSubSection = (sectionId) => {
    nextIdRef.current += 1;
    setNewCompliance(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              subSections: [
                ...sec.subSections,
                { id: nextIdRef.current, type: "Clause", name: "", description: "" }
              ]
            }
          : sec
      )
    }));
  };

  const removeSection = (sectionId) => {
    setNewCompliance(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  const removeSubSection = (sectionId, subSectionId) => {
    setNewCompliance(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              subSections: sec.subSections.filter(sub => sub.id !== subSectionId)
            }
          : sec
      )
    }));
  };

  const handleSave = () => {
    if (!newCompliance.name.trim()) {
      toast.error("Please enter compliance name");
      return;
    }
    if (!newCompliance.version.trim()) {
      toast.error("Please enter compliance version");
      return;
    }
    const newItem = {
      id: Date.now(),
      name: newCompliance.name,
      version: newCompliance.version,
      status: newCompliance.status,
      sections: newCompliance.sections.length,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setCompliances([...compliances, newItem]);
    toast.success("Compliance added successfully");
    setShowAddModal(false);
    resetModal();
  };



  const filteredCompliances = compliances.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.version.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
      <AdminSidebar />

      <main className="flex-1 px-4 py-24 md:px-10 md:py-8 lg:py-10 max-w-7xl mx-auto overflow-x-hidden">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-blue-500">
          <div className="flex flex-col text-left">
            <h2 className="text-2xl font-black text-[#111827] tracking-tight">
              Compliances
            </h2>
            <p className="text-xs text-gray-500 font-medium md:hidden">
              Welcome, {userData.name}
            </p>
          </div>

          <div className="flex gap-3 relative">
            {/* Notifications */}
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
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-slate-800 mb-1">
                  Manage and Monitor Compliances
                </h3>
                <p className="text-sm text-slate-500">
                  Create, control, and oversee all compliance frameworks in one place.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetModal();
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#5D45FD] transition-all"
              >
                <Plus size={18} />
                Add Compliance
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-8 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search here with compliance name"
                className="w-full pl-12 pr-4 py-3 bg-[#F3F4F9] rounded-2xl border-none focus:ring-2 focus:ring-[#6A5AFF] outline-none text-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Compliance List */}
          <div className="p-8">
            <div className="mb-6">
              <h4 className="text-sm font-black text-slate-800 border-l-4 border-[#6A5AFF] pl-3">
                Available Compliances
              </h4>
            </div>

            <div className="space-y-1">
              {filteredCompliances.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer"
                >
                  <div className="flex-1">
                    <span className="text-sm font-bold text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-600 hover:text-[#6A5AFF] hover:bg-indigo-50 rounded-lg transition-all"
                      title="Edit compliance"
                    >
                      <Pencil size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedCompliance(item);
                        setShowDeleteConfirm(true);
                      }}
                      className="p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      title="Delete compliance"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Compliance Modal */}
      <AnimatePresence>
        {showEditModal && editingCompliance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowEditModal(false);
                resetModal();
              }}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-start bg-linear-to-r from-gray-50 to-white">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Edit Compliance</h3>
                  <p className="text-gray-600 text-sm mt-1">Modify compliance framework details</p>
                </div>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    resetModal();
                  }}
                  className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
                {/* About the Compliance */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <h4 className="text-sm font-bold text-[#6A5AFF] mb-4 border-l-4 border-blue-600 pl-3 uppercase tracking-tight">
                    About the Compliance
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Name of the Compliance</label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
                          value={newCompliance.name}
                          onChange={(e) => setNewCompliance({...newCompliance, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Version</label>
                        <input
                          type="text"
                          placeholder="e.g., 2022"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
                          value={newCompliance.version}
                          onChange={(e) => setNewCompliance({...newCompliance, version: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Requirements Description</label>
                      <textarea
                        placeholder="Write the description of the compliance requirements here."
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all min-h-20 resize-none"
                        value={newCompliance.description}
                        onChange={(e) => setNewCompliance({...newCompliance, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    resetModal();
                  }}
                  className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveEdit}
                  className="px-8 py-2.5 bg-linear-to-r from-[#6A5AFF] to-[#5D45FD] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Update Compliance
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowDeleteConfirm(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Compliance?</h3>
              <p className="text-gray-600 text-center text-sm mb-6">
                Are you sure you want to delete <strong>{selectedCompliance?.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCompliance}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Compliance Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowAddModal(false);
                resetModal();
              }}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-start bg-linear-to-r from-gray-50 to-white">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Add New Compliance</h3>
                  <p className="text-gray-600 text-sm mt-1">Create and define a new compliance framework</p>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetModal();
                  }}
                  className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
                {/* Section 1: About the Organization */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <h4 className="text-sm font-bold text-[#6A5AFF] mb-4 border-l-4 border-blue-600 pl-3 uppercase tracking-tight">
                    About the Organization
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Name of the Compliance</label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
                          value={newCompliance.name}
                          onChange={(e) => setNewCompliance({...newCompliance, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Version</label>
                        <input
                          type="text"
                          placeholder="e.g., 2022"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
                          value={newCompliance.version}
                          onChange={(e) => setNewCompliance({...newCompliance, version: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Requirements Description</label>
                      <textarea
                        placeholder="Write the description of the compliance requirements here."
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all min-h-20 resize-none"
                        value={newCompliance.description}
                        onChange={(e) => setNewCompliance({...newCompliance, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Define Compliance Structure */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <h4 className="text-sm font-bold text-[#6A5AFF] mb-4 border-l-4 border-blue-600 pl-3 uppercase tracking-tight">
                    Define Compliance Structure
                  </h4>

                  <div className="space-y-4">
                    {newCompliance.sections.map((section, idx) => (
                      <div key={section.id} className="p-4 border-l-4 border-blue-500 bg-blue-50/30 rounded-r-lg">
                        <p className="text-xs font-bold text-[#6A5AFF] mb-3 uppercase italic">Add new Section (Controls or Clauses)</p>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Type of Section</label>
                              <select
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                value={section.type}
                                onChange={(e) => {
                                  const updated = [...newCompliance.sections];
                                  updated[idx].type = e.target.value;
                                  setNewCompliance({...newCompliance, sections: updated});
                                }}
                              >
                                <option>Clause</option>
                                <option>Control</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Name of Section</label>
                              <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                value={section.name}
                                onChange={(e) => {
                                  const updated = [...newCompliance.sections];
                                  updated[idx].name = e.target.value;
                                  setNewCompliance({...newCompliance, sections: updated});
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Description</label>
                            <textarea
                              placeholder="Description"
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-12"
                              value={section.description}
                              onChange={(e) => {
                                const updated = [...newCompliance.sections];
                                updated[idx].description = e.target.value;
                                setNewCompliance({...newCompliance, sections: updated});
                              }}
                            />
                          </div>
                          <button
                            onClick={() => handleAddSubSection(section.id)}
                            className="text-xs font-bold text-[#6A5AFF] flex items-center gap-1 hover:underline"
                          >
                            <Plus size={12} /> Add Sub-section
                          </button>

                          {/* Sub-sections */}
                          {section.subSections && section.subSections.length > 0 && (
                            <div className="mt-3 space-y-3 pl-4 border-l-2 border-blue-300">
                              {section.subSections.map((subSec, subIdx) => (
                                <div key={subSec.id} className="space-y-2 bg-white p-3 rounded-md border border-gray-100">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Type of Section</label>
                                      <select
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        value={subSec.type || "Clause"}
                                        onChange={(e) => {
                                          const updatedSections = [...newCompliance.sections];
                                          updatedSections[idx].subSections[subIdx].type = e.target.value;
                                          setNewCompliance({...newCompliance, sections: updatedSections});
                                        }}
                                      >
                                        <option>Clause</option>
                                        <option>Control</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Name of Section</label>
                                      <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        value={subSec.name}
                                        onChange={(e) => {
                                          const updatedSections = [...newCompliance.sections];
                                          updatedSections[idx].subSections[subIdx].name = e.target.value;
                                          setNewCompliance({...newCompliance, sections: updatedSections});
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Description</label>
                                    <textarea
                                      placeholder="Description"
                                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-12"
                                      value={subSec.description}
                                      onChange={(e) => {
                                        const updatedSections = [...newCompliance.sections];
                                        updatedSections[idx].subSections[subIdx].description = e.target.value;
                                        setNewCompliance({...newCompliance, sections: updatedSections});
                                      }}
                                    />
                                  </div>
                                  <div className="flex justify-end">
                                    <button
                                      onClick={() => removeSubSection(section.id, subSec.id)}
                                      className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline"
                                    >
                                      <X size={12} /> Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {newCompliance.sections.length > 1 && (
                            <button
                              onClick={() => removeSection(section.id)}
                              className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline"
                            >
                              <X size={12} /> Remove Section
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={addSection}
                    className="w-full mt-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-[#6A5AFF] hover:border-blue-500 text-xs font-bold transition-all"
                  >
                    + Add another section
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetModal();
                  }}
                  className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="px-8 py-2.5 bg-linear-to-r from-[#6A5AFF] to-[#5D45FD] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Save Compliance
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}