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
  const [newUser, setNewUser] = useState({
  userType: "Auditor",
  fullName: "",
  designation: "",
  email: "",      // Added
  password: "",   // Added
  phone: "",
  joiningDate: "",
  // Changed address fields into an array of objects
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
    {
      id: 1,
      title: "System",
      desc: "New user added successfully",
      time: "Just now",
      type: "info",
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Company-1",
      userType: "Client",
      email: "client-1@clientname.com",
      avatar: "C",
      color: "bg-[#6A5AFF]",
    },
    {
      id: 2,
      name: "Company-2",
      userType: "Client",
      email: "client-2@clientname.com",
      avatar: "C",
      color: "bg-[#6A5AFF]",
    },
    {
      id: 3,
      name: "Company-3",
      userType: "Client",
      email: "client-3@clientname.com",
      avatar: "C",
      color: "bg-[#6A5AFF]",
    },
    {
      id: 4,
      name: "Company-4",
      userType: "Client",
      email: "client-4@clientname.com",
      avatar: "C",
      color: "bg-[#6A5AFF]",
    },
    {
      id: 5,
      name: "Company-5",
      userType: "Client",
      email: "client-5@clientname.com",
      avatar: "C",
      color: "bg-[#6A5AFF]",
    },
    {
      id: 6,
      name: "John Doe",
      userType: "Auditor",
      email: "john.doe@capable.com",
      avatar: "https://i.pravatar.cc/150?img=12",
      color: "bg-gray-700",
    },
    {
      id: 7,
      name: "Jack Doe",
      userType: "Auditor",
      email: "jack.doe@capable.com",
      avatar: "https://i.pravatar.cc/150?img=13",
      color: "bg-gray-700",
    },
    {
      id: 8,
      name: "Joe Doe",
      userType: "Auditor",
      email: "joe.doe@capable.com",
      avatar: "https://i.pravatar.cc/150?img=14",
      color: "bg-gray-700",
    },
    {
      id: 9,
      name: "Jane Doe",
      userType: "PMO",
      email: "jane.doe@capable.com",
      avatar: "https://i.pravatar.cc/150?img=47",
      color: "bg-gray-700",
    },
    {
      id: 10,
      name: "Abhay Sharma",
      userType: "Admin",
      email: "super.admin@capable.com",
      avatar: "A",
      color: "bg-[#6A5AFF]",
    },
  ]);

  const tabs = ["All", "Clients", "PMO", "Admin", "Auditors"];

  const filteredUsers = users.filter((user) => {
    if (activeTab === "All") return true;
    if (activeTab === "Clients") return user.userType === "Client";
    if (activeTab === "PMO") return user.userType === "PMO";
    if (activeTab === "Admin") return user.userType === "Admin";
    if (activeTab === "Auditors") return user.userType === "Auditor";
    return true;
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    toast.success(`${userToDelete.name} has been deleted successfully`);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const saveEdit = () => {
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    toast.success(`${editingUser.name} has been updated successfully`);
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleAddCertification = () => {
    setNewUser({
      ...newUser,
      certifications: [
        ...newUser.certifications,
        `Certification ${newUser.certifications.length + 1}`,
      ],
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
      reader.onloadend = () => {
        setNewUser({ ...newUser, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  // Function to update a specific field in a specific address block
const handleAddressChange = (index, field, value) => {
  const updatedAddresses = [...newUser.addresses];
  updatedAddresses[index][field] = value;
  setNewUser({ ...newUser, addresses: updatedAddresses });
};

// Function to add a blank address block (for Clients)
const handleAddAddress = () => {
  setNewUser({
    ...newUser,
    addresses: [...newUser.addresses, {
      addressLine1: "", addressLine2: "", addressLine3: "",
      cityDistrict: "", country: "", state: "", postalCode: ""
    }]
  });
};

  const saveNewUser = () => {
    const newUserData = {
      id: users.length + 1,
      name: newUser.fullName,
      userType: newUser.userType,
      email: `${newUser.fullName.toLowerCase().replace(/\s+/g, ".")}@capable.com`,
      avatar: newUser.profileImage || newUser.fullName.charAt(0).toUpperCase(),
      color: "bg-[#6A5AFF]",
    };
    setUsers([...users, newUserData]);
    toast.success(`${newUser.fullName} has been added successfully`);
    setShowAddUserModal(false);
    setNewUser({
      userType: "Auditor",
      fullName: "",
      designation: "",
      phone: "",
      joiningDate: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      cityDistrict: "",
      country: "",
      state: "",
      postalCode: "",
      certifications: ["Certification 1", "Certification 2"],
      profileImage: null,
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
              Users
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
                  Manage and Monitor Users
                </h3>
                <p className="text-sm text-slate-500">
                  Create, control, and oversee all user access in one place.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#5D45FD] transition-all"
              >
                <Plus size={18} />
                Add User
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-bold transition-all relative ${
                    activeTab === tab
                      ? "text-[#6A5AFF]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A5AFF]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* User List Table */}
          <div className="p-8">
            <div className="mb-4">
              <h4 className="text-sm font-black text-slate-800 border-l-4 border-[#6A5AFF] pl-3">
                User List
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
                      User Type
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
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white font-bold text-xs overflow-hidden`}
                            >
                              {user.avatar.startsWith("http") ? (
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                user.avatar
                              )}
                            </div>
                            <span className="text-sm font-bold text-slate-800">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-600">
                            {user.userType}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-600">
                            {user.email}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(user)}
                              className="p-2 text-gray-600 hover:text-[#6A5AFF] hover:bg-indigo-50 rounded-lg transition-all"
                              title="Edit user"
                            >
                              <Pencil size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(user)}
                              className="p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                              title="Delete user"
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
        {showEditModal && editingUser && (
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
                  Edit User
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
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
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                      User Type
                    </label>
                    <select
                      value={editingUser.userType}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          userType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all"
                    >
                      <option value="Client">Client</option>
                      <option value="Auditor">Auditor</option>
                      <option value="PMO">PMO</option>
                      <option value="Admin">Admin</option>
                    </select>
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
        {showDeleteModal && userToDelete && (
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
                  Delete User?
                </h3>
                <p className="text-sm text-gray-600 text-center mb-8">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-slate-800">
                    {userToDelete.name}
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

      {/* Add User Modal */}
      <AnimatePresence>
  {showAddUserModal && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowAddUserModal(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl z-10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black text-slate-800">
                  Add Users
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Add new Clients, Auditors, PMOs and Admins.
                </p>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-rose-500 hover:bg-rose-50 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* User Type & Credentials */}
            <div className="flex flex-wrap gap-6 items-end">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  User Type
                </label>
                <select
                  value={newUser.userType}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userType: e.target.value })
                  }
                  className="w-48 px-4 py-2.5 rounded-lg bg-[#6A5AFF] text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#6A5AFF] focus:ring-offset-2 transition-all"
                >
                  <option value="Auditor">Auditor</option>
                  <option value="Client">Client</option>
                  <option value="PMO">PMO</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="flex-1 min-w-50">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="email@company.com"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                />
              </div>

              <div className="flex-1 min-w-50">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* About the User / Client Organization */}
            <div className="border-l-4 border-[#6A5AFF] pl-4">
              <h4 className="text-base font-black text-slate-800 mb-4">
                {newUser.userType === "Client" ? "Client Organization" : `About the ${newUser.userType}`}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Image */}
                <div className="md:col-span-2 flex items-start gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#6A5AFF] to-[#5D45FD] flex items-center justify-center overflow-hidden">
                      {newUser.profileImage ? (
                        <img
                          src={newUser.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={32} className="text-white" />
                      )}
                    </div>
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="profileImage"
                      className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-[#6A5AFF] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#6A5AFF] hover:text-white transition-all"
                    >
                      <Pencil size={12} />
                    </label>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        {newUser.userType === "Client" ? "Name of the Organization" : "Full Name"}
                      </label>
                      <input
                        type="text"
                        placeholder={newUser.userType === "Client" ? "Organization Name" : "Full Name"}
                        value={newUser.fullName}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            fullName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        {newUser.userType === "Client" ? "Industry" : "Designation"}
                      </label>
                      <input
                        type="text"
                        placeholder={newUser.userType === "Client" ? "e.g. Technology" : "Designation"}
                        value={newUser.designation}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            designation: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* Joining Date / Representative */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    {newUser.userType === "Client" ? "Name of Representative" : "Joining Date"}
                  </label>
                  <input
                    type="text"
                    placeholder={newUser.userType === "Client" ? "Representative Name" : "DD/MM/YYYY"}
                    value={newUser.joiningDate}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        joiningDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Address Section */}
            <div className="border-l-4 border-[#6A5AFF] pl-4 space-y-6">
              <h4 className="text-base font-black text-slate-800">
                {newUser.userType === "Client" ? "Organization's Address" : "Address"}
              </h4>

              {newUser.userType === "Client" && (
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest -mt-2">
                  Organization HQ
                </div>
              )}

              {(newUser.addresses || [newUser]).map((addr, idx) => (
                <div key={idx} className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-50 first:border-0 first:pt-0">
                  {newUser.userType === "Client" && idx > 0 && (
                     <p className="text-[10px] font-black text-[#6A5AFF] uppercase tracking-widest">Branch Office #{idx}</p>
                  )}
                  {/* Street Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      value={addr.addressLine1}
                      onChange={(e) => handleAddressChange(idx, 'addressLine1', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm mb-3"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      value={addr.addressLine2}
                      onChange={(e) => handleAddressChange(idx, 'addressLine2', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm mb-3"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 3"
                      value={addr.addressLine3}
                      onChange={(e) => handleAddressChange(idx, 'addressLine3', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                    />
                  </div>

                  {/* City and Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">City/District</label>
                      <input
                        type="text"
                        placeholder="City/District"
                        value={addr.cityDistrict}
                        onChange={(e) => handleAddressChange(idx, 'cityDistrict', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        placeholder="Country"
                        value={addr.country}
                        onChange={(e) => handleAddressChange(idx, 'country', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* State and Postal Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        placeholder="State"
                        value={addr.state}
                        onChange={(e) => handleAddressChange(idx, 'state', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">Postal Code/PIN</label>
                      <input
                        type="text"
                        placeholder="Postal Code/PIN"
                        value={addr.postalCode}
                        onChange={(e) => handleAddressChange(idx, 'postalCode', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section: Add Address (Client) OR Certifications (Others) */}
            <div className="border-l-4 border-[#6A5AFF] pl-4">
              {newUser.userType === "Client" ? (
                <button
                  onClick={handleAddAddress}
                  className="text-[#6A5AFF] text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-all"
                >
                  + Add another address
                </button>
              ) : (
                <>
                  <h4 className="text-base font-black text-slate-800 mb-4">
                    Licenses & Certifications
                  </h4>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      Add Certification
                    </label>
                    <div className="flex flex-wrap gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Certification"
                        className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      />
                      <button
                        onClick={handleAddCertification}
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all text-sm font-semibold"
                      >
                        +
                      </button>
                      {newUser.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="px-4 py-2.5 bg-[#6A5AFF] text-white rounded-lg text-sm font-semibold flex items-center gap-2"
                        >
                          {cert}
                          <button
                            onClick={() => handleRemoveCertification(index)}
                            className="hover:bg-white/20 rounded px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-3xl flex justify-end">
            <button
              onClick={saveNewUser}
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
