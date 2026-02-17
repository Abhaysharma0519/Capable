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
    orgName: "",
    email: "",
    industry: "",
    phone: "",
    repName: "",
    logo: null,
    logoPreview: null,
    addresses: [
      {
        street: ["", "", ""],
        city: "",
        country: "",
        state: "",
        postalCode: "",
      },
    ],
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

  // Default organizations
  const defaultOrganizations = [
    { id: 1, name: "Company-1 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company1.com", color: "bg-yellow-400", orgName: "Company-1 Pvt. Ltd.", industry: "IT", phone: "+91-123456789", repName: "John Doe" },
    { id: 2, name: "Company-2 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company2.com", color: "bg-rose-400", orgName: "Company-2 Pvt. Ltd.", industry: "Finance", phone: "+91-987654321", repName: "Jane Smith" },
    { id: 3, name: "Company-3 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company3.com", color: "bg-cyan-400", orgName: "Company-3 Pvt. Ltd.", industry: "Healthcare", phone: "+91-456789123", repName: "Mike Johnson" },
    { id: 4, name: "Company-4 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company4.com", color: "bg-green-400", orgName: "Company-4 Pvt. Ltd.", industry: "Manufacturing", phone: "+91-789123456", repName: "Sarah Williams" },
    { id: 5, name: "Company-5 Pvt. Ltd.", date: "Jan 9th, 2026", email: "management@company5.com", color: "bg-pink-400", orgName: "Company-5 Pvt. Ltd.", industry: "Retail", phone: "+91-321654987", repName: "Robert Brown" },
  ];

  const [organizations, setOrganizations] = useState(() => {
    const saved = localStorage.getItem('organizations');
    return saved ? JSON.parse(saved) : defaultOrganizations;
  });

  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showOrgDetailsModal, setShowOrgDetailsModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
  const [projectDetailsTab, setProjectDetailsTab] = useState('overview');
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [orgProjects, setOrgProjects] = useState(() => {
    const saved = localStorage.getItem('orgProjects');
    return saved ? JSON.parse(saved) : {};
  });
  const [newProject, setNewProject] = useState({
    framework: 'ISO/IEC 27001:2022',
    reqDescription: '',
    type: 'Readiness Assessment',
    startDate: '',
    endDate: '',
    auditors: [],
  });

  // Persist organizations to localStorage
  useEffect(() => {
    localStorage.setItem('organizations', JSON.stringify(organizations));
  }, [organizations]);

  // Persist projects to localStorage
  useEffect(() => {
    localStorage.setItem('orgProjects', JSON.stringify(orgProjects));
  }, [orgProjects]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleViewOrgDetails = (org) => {
    setSelectedOrg(org);
    setShowOrgDetailsModal(true);
  };

  const handleAddProject = () => {
    setShowAddProjectModal(true);
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowProjectDetailsModal(true);
  };

  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
    setShowDeleteProjectModal(true);
  };

  const confirmDeleteProject = () => {
    if (selectedOrg && projectToDelete) {
      setOrgProjects(prev => ({
        ...prev,
        [selectedOrg.id]: prev[selectedOrg.id].filter(p => p.id !== projectToDelete.id)
      }));
      toast.success('Project deleted successfully');
      setShowDeleteProjectModal(false);
      setProjectToDelete(null);
    }
  };

  // Get the latest organization data from organizations array
  const getLatestOrgData = () => {
    if (!selectedOrg) return null;
    return organizations.find(o => o.id === selectedOrg.id) || selectedOrg;
  };

  const saveProject = () => {
    const latestOrg = getLatestOrgData();
    if (!latestOrg || !newProject.framework || !newProject.startDate || !newProject.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    const orgId = latestOrg.id;
    const projectId = Date.now();
    const project = {
      id: projectId,
      framework: newProject.framework,
      reqDescription: newProject.reqDescription,
      type: newProject.type,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      auditors: newProject.auditors,
      status: 'active',
    };
    setOrgProjects(prev => ({
      ...prev,
      [orgId]: [...(prev[orgId] || []), project]
    }));
    // Update selectedOrg to latest data
    setSelectedOrg(latestOrg);
    toast.success('Project added successfully');
    setShowAddProjectModal(false);
    setNewProject({
      framework: 'ISO/IEC 27001:2022',
      reqDescription: '',
      type: 'Readiness Assessment',
      startDate: '',
      endDate: '',
      auditors: [],
    });
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
    if (!newOrg.orgName || !newOrg.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    const colors = ["bg-yellow-400", "bg-rose-400", "bg-cyan-400", "bg-green-400", "bg-pink-400"];
    const newOrgData = {
      id: organizations.length + 1,
      name: newOrg.orgName,
      email: newOrg.email,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + "th",
      color: colors[organizations.length % colors.length],
      ...newOrg,
    };
    setOrganizations([...organizations, newOrgData]);
    toast.success(`${newOrg.orgName} has been added successfully`);
    setShowAddOrgModal(false);
    setNewOrg({
      orgName: "",
      email: "",
      industry: "",
      phone: "",
      repName: "",
      logo: null,
      logoPreview: null,
      addresses: [
        {
          street: ["", "", ""],
          city: "",
          country: "",
          state: "",
          postalCode: "",
        },
      ],
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
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-4" onClick={() => handleViewOrgDetails(org)}>
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${org.color} flex items-center justify-center text-white font-bold text-xs`}
                            />
                            <span className="text-sm font-bold text-slate-800">
                              {org.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4" onClick={() => handleViewOrgDetails(org)}>
                          <span className="text-sm text-slate-600">
                            {org.date}
                          </span>
                        </td>
                        <td className="py-4 px-4" onClick={() => handleViewOrgDetails(org)}>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800">
                        Edit Organization
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Update organization details.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="text-rose-500 hover:bg-rose-50 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Logo Upload */}
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-linear-to-br from-[#6A5AFF] to-[#5D45FD] rounded-2xl flex items-center justify-center mb-4 cursor-pointer hover:shadow-lg transition-all" onClick={() => document.getElementById('editOrgLogo').click()}>
                        {editingOrg.logoPreview ? (
                          <img src={editingOrg.logoPreview} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
                        ) : editingOrg.logo ? (
                          <img src={editingOrg.logo} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
                        ) : (
                          <span className="text-white font-bold text-sm text-center px-2">LOGO</span>
                        )}
                      </div>
                      <input
                        id="editOrgLogo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setEditingOrg({
                                ...editingOrg,
                                logoPreview: event.target.result,
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 text-center">Click to upload logo</p>
                    </div>
                  </div>

                  {/* About the Organization */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center">
                      <span className="text-[#6A5AFF] mr-2">📋</span> About the Organization
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Name of the Organization
                        </label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={editingOrg.name || ""}
                          onChange={(e) =>
                            setEditingOrg({ ...editingOrg, name: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          placeholder="Designation"
                          value={editingOrg.industry || ""}
                          onChange={(e) =>
                            setEditingOrg({ ...editingOrg, industry: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={editingOrg.phone || ""}
                          onChange={(e) =>
                            setEditingOrg({ ...editingOrg, phone: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Name of Representative
                        </label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={editingOrg.repName || ""}
                          onChange={(e) =>
                            setEditingOrg({ ...editingOrg, repName: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Organization's Address */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center">
                      <span className="text-[#6A5AFF] mr-2">📍</span> Organization's Address
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Street Address
                        </label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Address Line 1"
                            value={(editingOrg.addresses?.[0]?.street?.[0]) || ""}
                            onChange={(e) => {
                              const newAddresses = [...(editingOrg.addresses || [])];
                              newAddresses[0] = newAddresses[0] || { street: ["", "", ""], city: "", country: "", state: "", postalCode: "" };
                              newAddresses[0].street[0] = e.target.value;
                              setEditingOrg({ ...editingOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Address Line 2"
                            value={(editingOrg.addresses?.[0]?.street?.[1]) || ""}
                            onChange={(e) => {
                              const newAddresses = [...(editingOrg.addresses || [])];
                              newAddresses[0] = newAddresses[0] || { street: ["", "", ""], city: "", country: "", state: "", postalCode: "" };
                              newAddresses[0].street[1] = e.target.value;
                              setEditingOrg({ ...editingOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Address Line 3"
                            value={(editingOrg.addresses?.[0]?.street?.[2]) || ""}
                            onChange={(e) => {
                              const newAddresses = [...(editingOrg.addresses || [])];
                              newAddresses[0] = newAddresses[0] || { street: ["", "", ""], city: "", country: "", state: "", postalCode: "" };
                              newAddresses[0].street[2] = e.target.value;
                              setEditingOrg({ ...editingOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            City/District
                          </label>
                          <input
                            type="text"
                            placeholder="City/District"
                            value={(editingOrg.addresses?.[0]?.city) || ""}
                            onChange={(e) => {
                              const newAddresses = [...(editingOrg.addresses || [])];
                              newAddresses[0] = newAddresses[0] || { street: ["", "", ""], city: "", country: "", state: "", postalCode: "" };
                              newAddresses[0].city = e.target.value;
                              setEditingOrg({ ...editingOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            Country
                          </label>
                          <input
                            type="text"
                            placeholder="Country"
                            value={(editingOrg.addresses?.[0]?.country) || ""}
                            onChange={(e) => {
                              const newAddresses = [...(editingOrg.addresses || [])];
                              newAddresses[0] = newAddresses[0] || { street: ["", "", ""], city: "", country: "", state: "", postalCode: "" };
                              newAddresses[0].country = e.target.value;
                              setEditingOrg({ ...editingOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            placeholder="State"
                            value={(editingOrg.addresses?.[0]?.state) || ""}
                            onChange={(e) => {
                              const newAddresses = [...(editingOrg.addresses || [])];
                              newAddresses[0] = newAddresses[0] || { street: ["", "", ""], city: "", country: "", state: "", postalCode: "" };
                              newAddresses[0].state = e.target.value;
                              setEditingOrg({ ...editingOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            Postal Code/PIN
                          </label>
                          <input
                            type="text"
                            placeholder="Postal Code/PIN"
                            value={(editingOrg.addresses?.[0]?.postalCode) || ""}
                            onChange={(e) => {
                              const newAddresses = [...(editingOrg.addresses || [])];
                              newAddresses[0] = newAddresses[0] || { street: ["", "", ""], city: "", country: "", state: "", postalCode: "" };
                              newAddresses[0].postalCode = e.target.value;
                              setEditingOrg({ ...editingOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-3xl flex gap-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="flex-1 px-6 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold hover:bg-[#5D45FD] transition-all shadow-lg"
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

      {/* Organization Details Modal */}
      <AnimatePresence>
        {showOrgDetailsModal && selectedOrg && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOrgDetailsModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 z-10 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">
                      {selectedOrg.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedOrg.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowOrgDetailsModal(false)}
                    className="text-rose-500 hover:bg-rose-50 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Organization Info */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Organization</p>
                      <p className="text-sm font-bold text-slate-800">{selectedOrg.orgName || selectedOrg.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Industry</p>
                      <p className="text-sm font-bold text-slate-800">{selectedOrg.industry || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Phone</p>
                      <p className="text-sm font-bold text-slate-800">{selectedOrg.phone || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Representative</p>
                      <p className="text-sm font-bold text-slate-800">{selectedOrg.repName || "N/A"}</p>
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-black text-slate-800">Compliance Projects</h4>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddProject()}
                        className="flex items-center gap-2 px-4 py-2 bg-[#6A5AFF] text-white rounded-lg text-sm font-bold hover:bg-[#5D45FD] transition-all"
                      >
                        <Plus size={16} /> Assign New Project
                      </motion.button>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(orgProjects[selectedOrg.id] || []).length > 0 ? (
                        orgProjects[selectedOrg.id].map((project, idx) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="text-sm font-black text-slate-800">{project.framework}</h5>
                              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold">Active</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{project.reqDescription || "No description"}</p>
                            <div className="space-y-2 text-xs">
                              <p><span className="font-bold text-gray-500">Type:</span> {project.type}</p>
                              <p><span className="font-bold text-gray-500">Start:</span> {project.startDate}</p>
                              <p><span className="font-bold text-gray-500">End:</span> {project.endDate}</p>
                              {project.auditors && project.auditors.length > 0 && (
                                <p><span className="font-bold text-gray-500">Auditors:</span> {project.auditors.join(", ")}</p>
                              )}
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button 
                                onClick={() => handleViewProject(project)}
                                className="flex-1 text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-all">View</button>
                              <button 
                                onClick={() => handleDeleteProject(project)}
                                className="flex-1 text-xs px-2 py-1 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-all">Delete</button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-8">
                          <p className="text-gray-500 text-sm mb-4">No projects assigned yet</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddProject()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#6A5AFF] text-white rounded-lg text-sm font-bold hover:bg-[#5D45FD] transition-all"
                          >
                            <Plus size={16} /> Add First Project
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add New Compliance Project Modal */}
      <AnimatePresence>
        {showAddProjectModal && selectedOrg && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddProjectModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800">
                        Add New Compliance Project
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Add a new Compliance Project to this client.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddProjectModal(false)}
                      className="text-rose-500 hover:bg-rose-50 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* About the Organization */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center">
                      <span className="text-[#6A5AFF] mr-2">📋</span> About the Organization
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Name of the Organization
                        </label>
                        <input
                          type="text"
                          disabled
                          value={getLatestOrgData()?.orgName || getLatestOrgData()?.name || ""}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          disabled
                          value={getLatestOrgData()?.industry || "N/A"}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="text"
                          disabled
                          value={getLatestOrgData()?.phone || "N/A"}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Name of Representative
                        </label>
                        <input
                          type="text"
                          disabled
                          value={getLatestOrgData()?.repName || "N/A"}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Requirements Description */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      Requirements Description
                    </label>
                    <textarea
                      placeholder="Write the description of the client's compliance requirements here."
                      value={newProject.reqDescription}
                      onChange={(e) => setNewProject({ ...newProject, reqDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm h-20"
                    />
                  </div>

                  {/* Compliance Framework & Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Compliance Framework/Standards
                      </label>
                      <select
                        value={newProject.framework}
                        onChange={(e) => setNewProject({ ...newProject, framework: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      >
                        <option>ISO/IEC 27001:2022</option>
                        <option>DPDPA</option>
                        <option>PCI-DSS</option>
                        <option>SOC 2</option>
                        <option>HIPAA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Type of Assessment
                      </label>
                      <select
                        value={newProject.type}
                        onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      >
                        <option>Readiness Assessment</option>
                        <option>Gap Analysis</option>
                        <option>Audit</option>
                        <option>Compliance Review</option>
                      </select>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Project Start Date *
                      </label>
                      <input
                        type="date"
                        value={newProject.startDate}
                        onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Project End Date *
                      </label>
                      <input
                        type="date"
                        value={newProject.endDate}
                        onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Assign Auditor */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-black text-slate-800 mb-4">Assign Auditor</h4>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#6A5AFF] text-white rounded-lg text-sm font-bold hover:bg-[#5D45FD] transition-all"
                      >
                        <span>👤</span> John Doe
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#6A5AFF] text-[#6A5AFF] rounded-lg text-sm font-bold hover:bg-indigo-50 transition-all"
                      >
                        <Plus size={16} /> Add another auditor
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex gap-3">
                  <button
                    onClick={() => setShowAddProjectModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveProject}
                    className="flex-1 px-6 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold hover:bg-[#5D45FD] transition-all shadow-lg"
                  >
                    Save
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
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800">
                        Add New Client Organization
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Add new Client Organizations.
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

                <div className="p-6 space-y-8">
                  {/* Logo Upload */}
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-linear-to-br from-[#6A5AFF] to-[#5D45FD] rounded-2xl flex items-center justify-center mb-4 cursor-pointer hover:shadow-lg transition-all" onClick={() => document.getElementById('addOrgLogo').click()}>
                        {newOrg.logoPreview ? (
                          <img src={newOrg.logoPreview} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
                        ) : (
                          <span className="text-white font-bold text-sm text-center px-2">LOGO</span>
                        )}
                      </div>
                      <input
                        id="addOrgLogo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setNewOrg({
                                ...newOrg,
                                logo: file,
                                logoPreview: event.target.result,
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 text-center">Click to upload logo</p>
                    </div>
                  </div>

                  {/* About the Organization */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center">
                      <span className="text-[#6A5AFF] mr-2">📋</span> About the Organization
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Name of the Organization
                        </label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={newOrg.orgName}
                          onChange={(e) =>
                            setNewOrg({ ...newOrg, orgName: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          placeholder="Designation"
                          value={newOrg.industry}
                          onChange={(e) =>
                            setNewOrg({ ...newOrg, industry: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={newOrg.phone}
                          onChange={(e) =>
                            setNewOrg({ ...newOrg, phone: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Name of Representative
                        </label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={newOrg.repName}
                          onChange={(e) =>
                            setNewOrg({ ...newOrg, repName: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Organization's Address */}
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center">
                      <span className="text-[#6A5AFF] mr-2">📍</span> Organization's Address
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Organization HQ
                        </label>
                        <p className="text-xs text-gray-500 mb-2">Street Address</p>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Address Line 1"
                            value={newOrg.addresses[0].street[0]}
                            onChange={(e) => {
                              const newAddresses = [...newOrg.addresses];
                              newAddresses[0].street[0] = e.target.value;
                              setNewOrg({ ...newOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Address Line 2"
                            value={newOrg.addresses[0].street[1]}
                            onChange={(e) => {
                              const newAddresses = [...newOrg.addresses];
                              newAddresses[0].street[1] = e.target.value;
                              setNewOrg({ ...newOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Address Line 3"
                            value={newOrg.addresses[0].street[2]}
                            onChange={(e) => {
                              const newAddresses = [...newOrg.addresses];
                              newAddresses[0].street[2] = e.target.value;
                              setNewOrg({ ...newOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            City/District
                          </label>
                          <input
                            type="text"
                            placeholder="City/District"
                            value={newOrg.addresses[0].city}
                            onChange={(e) => {
                              const newAddresses = [...newOrg.addresses];
                              newAddresses[0].city = e.target.value;
                              setNewOrg({ ...newOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            Country
                          </label>
                          <input
                            type="text"
                            placeholder="Country"
                            value={newOrg.addresses[0].country}
                            onChange={(e) => {
                              const newAddresses = [...newOrg.addresses];
                              newAddresses[0].country = e.target.value;
                              setNewOrg({ ...newOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            placeholder="State"
                            value={newOrg.addresses[0].state}
                            onChange={(e) => {
                              const newAddresses = [...newOrg.addresses];
                              newAddresses[0].state = e.target.value;
                              setNewOrg({ ...newOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            Postal Code/PIN
                          </label>
                          <input
                            type="text"
                            placeholder="Postal Code/PIN"
                            value={newOrg.addresses[0].postalCode}
                            onChange={(e) => {
                              const newAddresses = [...newOrg.addresses];
                              newAddresses[0].postalCode = e.target.value;
                              setNewOrg({ ...newOrg, addresses: newAddresses });
                            }}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#6A5AFF] focus:outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const newAddresses = [...newOrg.addresses, { street: ["", "", ""], city: "", country: "", state: "", postalCode: "" }];
                          setNewOrg({ ...newOrg, addresses: newAddresses });
                        }}
                        className="text-sm font-bold text-[#6A5AFF] hover:text-[#5D45FD] transition-all flex items-center gap-2 mt-2"
                      >
                        + Add another address
                      </button>
                    </div>
                  </div>

                  {/* Email Address - Required */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      Email Address *
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

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-3xl flex gap-3">
                  <button
                    onClick={() => setShowAddOrgModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNewOrg}
                    className="flex-1 px-6 py-3 bg-[#6A5AFF] text-white rounded-xl font-bold hover:bg-[#5D45FD] transition-all shadow-lg"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Project Details Full Screen Modal */}
      <AnimatePresence>
        {showProjectDetailsModal && selectedProject && selectedOrg && (
          <div className="fixed inset-0 bg-white z-200 flex overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col overflow-hidden"
              >
                {/* Top Header with Title */}
                <div className="bg-linear-to-r from-slate-50 to-white border-b border-gray-200">
                  <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-black text-slate-800">
                        {selectedOrg.orgName || selectedOrg.name} / {selectedProject.framework}
                      </h1>
                      <p className="text-base font-bold text-gray-600 mt-2">{selectedProject.type}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        View the complete assessment of {selectedOrg.orgName || selectedOrg.name} for {selectedProject.framework}.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowProjectDetailsModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-all text-2xl font-bold w-8 h-8 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="px-6 flex gap-8 border-t border-gray-200">
                    <button
                      onClick={() => setProjectDetailsTab('overview')}
                      className={`px-0 py-4 text-sm font-bold transition-all ${
                        projectDetailsTab === 'overview'
                          ? 'text-[#6A5AFF] border-b-2 border-[#6A5AFF]'
                          : 'text-gray-500 hover:text-slate-800 border-b-2 border-transparent'
                      }`}
                    >
                      📋 Overview
                    </button>
                    <button
                      onClick={() => setProjectDetailsTab('clauses')}
                      className={`px-0 py-4 text-sm font-bold transition-all ${
                        projectDetailsTab === 'clauses'
                          ? 'text-[#6A5AFF] border-b-2 border-[#6A5AFF]'
                          : 'text-gray-500 hover:text-slate-800 border-b-2 border-transparent'
                      }`}
                    >
                      📑 Clauses
                    </button>
                    <button
                      onClick={() => setProjectDetailsTab('controls')}
                      className={`px-0 py-4 text-sm font-bold transition-all ${
                        projectDetailsTab === 'controls'
                          ? 'text-[#6A5AFF] border-b-2 border-[#6A5AFF]'
                          : 'text-gray-500 hover:text-slate-800 border-b-2 border-transparent'
                      }`}
                    >
                      ⚙️ Controls
                    </button>
                    <button
                      onClick={() => setProjectDetailsTab('evidences')}
                      className={`px-0 py-4 text-sm font-bold transition-all ${
                        projectDetailsTab === 'evidences'
                          ? 'text-[#6A5AFF] border-b-2 border-[#6A5AFF]'
                          : 'text-gray-500 hover:text-slate-800 border-b-2 border-transparent'
                      }`}
                    >
                      📂 Evidences
                    </button>
                  </div>
                </div>

                {/* Content Area - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                  <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Overview Tab */}
                    {projectDetailsTab === 'overview' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                      >
                        {/* About Framework Section */}
                        <div className="border border-gray-200 rounded-2xl p-8 bg-white">
                          <h2 className="text-xl font-black text-slate-800 mb-4">About {selectedProject.framework}</h2>
                          <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {selectedProject.framework} ensures organizations protect information through a strong ISMS. It defines controls for risk management, access security, data protection, and incident handling, with audits verifying implementation through documentation review, evidence checks, and process sampling.
                          </p>
                          {selectedProject.reqDescription && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                              <p className="text-sm font-bold text-gray-700 mb-2">Client Requirements:</p>
                              <p className="text-sm text-gray-600">{selectedProject.reqDescription}</p>
                            </div>
                          )}
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-2 gap-8">
                          {/* Compliance Progress */}
                          <div className="border border-gray-200 rounded-2xl p-8 bg-white">
                            <h2 className="text-xl font-black text-slate-800 mb-6">Compliance Progress</h2>
                            <div className="space-y-6">
                              <div className="flex items-center justify-between p-4 bg-linear-to-r from-orange-50 to-white rounded-xl border border-orange-100">
                                <div>
                                  <p className="text-xs font-bold text-gray-600 mb-1">Status</p>
                                  <span className="inline-block bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold">On-Going</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div>
                                  <p className="text-xs font-bold text-gray-600 mb-1">Controls</p>
                                  <p className="text-xl font-black text-slate-800">46/93</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-4 bg-linear-to-r from-[#6A5AFF]/10 to-white rounded-xl border border-[#6A5AFF]/20">
                                <div>
                                  <p className="text-xs font-bold text-gray-600 mb-1">Audit Progress</p>
                                  <div className="flex items-center gap-2">
                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div className="h-full bg-[#6A5AFF] rounded-full" style={{ width: '49%' }}></div>
                                    </div>
                                    <span className="text-sm font-black text-[#6A5AFF]">49%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Schedule */}
                          <div className="border border-gray-200 rounded-2xl p-8 bg-white">
                            <h2 className="text-xl font-black text-slate-800 mb-6">Schedule</h2>
                            <div className="space-y-6">
                              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-gray-600 mb-1">Audit Start Date</p>
                                <p className="text-2xl font-black text-slate-800">{selectedProject.startDate}</p>
                              </div>
                              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-gray-600 mb-1">Audit End Date</p>
                                <p className="text-2xl font-black text-slate-800">{selectedProject.endDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Organization & Auditors Info */}
                        <div className="grid grid-cols-2 gap-8">
                          {/* Organization Details */}
                          <div className="border border-gray-200 rounded-2xl p-8 bg-white">
                            <h2 className="text-xl font-black text-slate-800 mb-6">Organization Details</h2>
                            <div className="space-y-4">
                              <div>
                                <p className="text-xs font-bold text-gray-600 mb-1">Organization Name</p>
                                <p className="text-sm font-semibold text-slate-800">{selectedOrg.orgName || selectedOrg.name}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-600 mb-1">Email</p>
                                <p className="text-sm font-semibold text-slate-800">{selectedOrg.email}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-600 mb-1">Industry</p>
                                <p className="text-sm font-semibold text-slate-800">{selectedOrg.industry || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-600 mb-1">Phone</p>
                                <p className="text-sm font-semibold text-slate-800">{selectedOrg.phone || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-600 mb-1">Representative Name</p>
                                <p className="text-sm font-semibold text-slate-800">{selectedOrg.repName || "N/A"}</p>
                              </div>
                            </div>
                          </div>

                          {/* Assigned Auditors */}
                          <div className="border border-gray-200 rounded-2xl p-8 bg-white">
                            <h2 className="text-xl font-black text-slate-800 mb-6">Assigned Auditors</h2>
                            {selectedProject.auditors && selectedProject.auditors.length > 0 ? (
                              <div className="space-y-3">
                                {selectedProject.auditors.map((auditor, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-4 p-4 bg-linear-to-r from-[#6A5AFF]/10 to-white rounded-xl border border-[#6A5AFF]/20"
                                  >
                                    <div className="w-12 h-12 rounded-full bg-[#6A5AFF] flex items-center justify-center text-white font-bold text-lg shrink-0">
                                      {auditor.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <p className="text-sm font-bold text-slate-800">{auditor}</p>
                                      <p className="text-xs text-gray-500">ISO/IEC 27001:2022 Certified Auditor</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-sm text-gray-500">No auditors assigned yet</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Clauses Tab */}
                    {projectDetailsTab === 'clauses' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="bg-white border border-gray-200 rounded-2xl p-8">
                          <h2 className="text-xl font-black text-slate-800 mb-4">{selectedProject.framework} Clauses</h2>
                          <p className="text-sm text-gray-600 mb-6">
                            Review and manage compliance with each clause of the {selectedProject.framework} standard.
                          </p>
                          <div className="space-y-3">
                            {[
                              { clause: "4", title: "Context of Organization", completed: 75 },
                              { clause: "5", title: "Leadership", completed: 60 },
                              { clause: "6", title: "Planning", completed: 45 },
                              { clause: "7", title: "Support", completed: 80 },
                              { clause: "8", title: "Operation", completed: 55 },
                              { clause: "9", title: "Performance Evaluation", completed: 35 },
                              { clause: "10", title: "Improvement", completed: 50 },
                            ].map((item) => (
                              <div key={item.clause} className="p-4 border border-gray-150 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="text-sm font-bold text-slate-800">Clause {item.clause}: {item.title}</p>
                                  </div>
                                  <span className="text-xs font-bold text-[#6A5AFF]">{item.completed}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#6A5AFF] rounded-full transition-all" style={{ width: `${item.completed}%` }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Controls Tab */}
                    {projectDetailsTab === 'controls' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="bg-white border border-gray-200 rounded-2xl p-8">
                          <h2 className="text-xl font-black text-slate-800 mb-4">Control Requirements</h2>
                          <p className="text-sm text-gray-600 mb-6">
                            Manage all controls and evidence submission for {selectedProject.framework}.
                          </p>
                          <div className="space-y-3">
                            {[
                              { id: "5.1", title: "Policies for information security", status: "Submitted" },
                              { id: "5.2", title: "Information security roles and responsibilities", status: "Pending" },
                              { id: "5.3", title: "Segregation of duties", status: "Under Review" },
                              { id: "5.4", title: "Management responsibilities", status: "Submitted" },
                              { id: "5.5", title: "Contact with authorities", status: "Not Started" },
                              { id: "6.1", title: "Actions to Address Risks", status: "Submitted" },
                            ].map((control) => {
                              const statusColors = {
                                "Submitted": "bg-green-100 text-green-700",
                                "Pending": "bg-yellow-100 text-yellow-700",
                                "Under Review": "bg-blue-100 text-blue-700",
                                "Not Started": "bg-gray-100 text-gray-700",
                              };
                              return (
                                <div key={control.id} className="p-4 border border-gray-150 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="text-sm font-bold text-slate-800">{control.id}: {control.title}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[control.status]}`}>
                                      {control.status}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Evidences Tab */}
                    {projectDetailsTab === 'evidences' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="bg-white border border-gray-200 rounded-2xl p-8">
                          <h2 className="text-xl font-black text-slate-800 mb-4">Uploaded Evidences</h2>
                          <p className="text-sm text-gray-600 mb-6">
                            All evidence files submitted for {selectedProject.framework} assessment.
                          </p>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left text-xs font-bold text-gray-600 py-3">Name</th>
                                  <th className="text-left text-xs font-bold text-gray-600 py-3">Date Shared</th>
                                  <th className="text-left text-xs font-bold text-gray-600 py-3">Shared By</th>
                                  <th className="text-right text-xs font-bold text-gray-600 py-3">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { name: "Evidence-5.docx", date: "Jan 10, 2026", by: "gurukimarkt@clientname.com" },
                                  { name: "Evidence-4.docx", date: "Jan 10, 2026", by: "gurukimarkt@clientname.com" },
                                  { name: "Evidence-3.docx", date: "Jan 10, 2026", by: "gurukimarkt@clientname.com" },
                                  { name: "Evidence-2.docx", date: "Jan 10, 2026", by: "gurukimarkt@clientname.com" },
                                  { name: "Evidence-1.docx", date: "Jan 10, 2026", by: "gurukimarkt@clientname.com" },
                                ].map((evidence, idx) => (
                                  <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                                  >
                                    <td className="text-sm font-semibold text-slate-800 py-4">📄 {evidence.name}</td>
                                    <td className="text-sm text-gray-600 py-4">{evidence.date}</td>
                                    <td className="text-sm text-gray-600 py-4">{evidence.by}</td>
                                    <td className="text-right py-4">
                                      <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-all text-gray-600 hover:text-slate-800">
                                          ⬇️
                                        </button>
                                        <button className="p-2 hover:bg-red-100 rounded-lg transition-all text-gray-600 hover:text-red-600">
                                          🗑️
                                        </button>
                                      </div>
                                    </td>
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 py-8">
                      <button
                        onClick={() => setShowProjectDetailsModal(false)}
                        className="flex-1 max-w-xs px-6 py-3 border-2 border-gray-200 text-slate-800 rounded-xl font-bold hover:bg-gray-50 transition-all"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteProject(selectedProject);
                          setShowProjectDetailsModal(false);
                        }}
                        className="flex-1 max-w-xs px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all border border-red-200"
                      >
                        Delete Project
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Project Confirmation Modal */}
      <AnimatePresence>
        {showDeleteProjectModal && projectToDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteProjectModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-sm w-full"
              >
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={32} className="text-red-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Delete Project?</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete the "{projectToDelete.framework}" project? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteProjectModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-200 text-slate-800 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDeleteProject}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}