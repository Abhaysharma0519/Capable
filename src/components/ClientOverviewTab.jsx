import React, { useState } from "react";
import { ArrowRight, Download, Trash2, FileText, CheckCircle, XCircle, Plus, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stripedBg = {
  background: `linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)`,
  backgroundSize: '1.5rem 1.5rem'
};

export default function OverviewTab({ onScheduleClick }) {
  const userEmail = localStorage.getItem("user_email") || "user@clientname.com";

  // Initialize evidence list with localStorage persistence
  const [evidenceList, setEvidenceList] = useState(() => {
    const savedList = localStorage.getItem("evidenceList");
    if (savedList) {
      return JSON.parse(savedList);
    }
    // Default initial data
    return [
      { id: 1, name: "Evidence-5.docx", date: "Jan 10, 2026", sharedBy: userEmail },
      { id: 2, name: "Evidence-4.docx", date: "Jan 10, 2026", sharedBy: userEmail },
      { id: 3, name: "Evidence-3.docx", date: "Jan 10, 2026", sharedBy: userEmail },
    ];
  });

  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvidence, setNewEvidence] = useState({ name: "", file: null });

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle file download
  const handleDownload = (name) => {
    try {
      // Create a sample file content (in real app, this would be actual file data)
      const fileContent = `This is a sample evidence file: ${name}\n\nGenerated on: ${new Date().toLocaleString()}`;
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showToast(`Successfully downloaded ${name}`, "success");
    } catch (error) {
      showToast(`Failed to download ${name}`, "error");
    }
  };

  // Handle file deletion with confirmation
  const handleDelete = (id, name) => {
    setDeleteConfirm({ id, name });
  };

  const confirmDelete = () => {
    const { id, name } = deleteConfirm;
    const updatedList = evidenceList.filter(item => item.id !== id);
    setEvidenceList(updatedList);
    // Persist to localStorage
    localStorage.setItem("evidenceList", JSON.stringify(updatedList));
    showToast(`${name} has been deleted`, "success");
    setDeleteConfirm(null);
  };

  // Handle adding new evidence
  const handleAddEvidence = () => {
    if (!newEvidence.name.trim()) {
      showToast("Please enter a file name", "error");
      return;
    }

    const newId = evidenceList.length > 0 ? Math.max(...evidenceList.map(e => e.id)) + 1 : 1;
    const newItem = {
      id: newId,
      name: newEvidence.name.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      sharedBy: userEmail
    };

    const updatedList = [newItem, ...evidenceList];
    setEvidenceList(updatedList);
    localStorage.setItem("evidenceList", JSON.stringify(updatedList));

    showToast(`${newEvidence.name} has been added successfully`, "success");
    setShowAddModal(false);
    setNewEvidence({ name: "", file: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full max-w-400 mx-auto pb-10"
    >
      {/* 1. ABOUT SECTION */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-4xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden"
      >
        <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
        <h3 className="text-xl font-black text-slate-800 mb-3 ml-2">About ISO/IEC 27001:2022</h3>
        <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed ml-2 max-w-4xl">
          ISO/IEC 27001:2022 ensures organizations protect information through a strong ISMS. It defines controls for risk management, access security, data protection, and incident handling.
        </p>
      </motion.div>

      {/* 2. PROGRESS & SCHEDULE SECTION */}
      <div className="bg-white rounded-4xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] relative overflow-hidden">
        <div className="p-6 md:p-8 relative">
          <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
          <h4 className="text-[15px] font-black text-slate-800 mb-6 ml-2">Compliance Progress</h4>

          {/* Responsive Flex: Column on mobile, Row on tablet+ */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 ml-2">
            <div className="flex flex-row md:flex-col justify-between md:justify-start gap-1 min-w-25">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
              <span className="bg-[#FFBD69] text-white px-4 py-2 rounded-xl text-[10px] font-black text-center shadow-lg shadow-orange-100 uppercase">On-Going</span>
            </div>

            <div className="flex flex-row md:flex-col justify-between md:justify-start gap-1 min-w-25">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Controls</span>
              <span className="bg-slate-50 text-slate-700 px-5 py-2 rounded-xl text-sm font-black border border-slate-100 text-center">46/93</span>
            </div>

            <div className="flex-1 w-full flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit Progress</span>
              <div className="h-11 bg-[#F1F4F9] rounded-2xl overflow-hidden flex relative border border-slate-50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '49%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-[#6A5AFF] flex items-center justify-center text-xs font-black text-white z-10 rounded-2xl shadow-lg"
                >
                  49%
                </motion.div>
                <div className="flex-1 opacity-20" style={stripedBg} />
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Sidebar Section */}
        <div className="p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-slate-100 relative bg-slate-50/30">
          <h4 className="text-[15px] font-black text-slate-800 mb-6">Schedule</h4>
          <div className="flex gap-8">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Start Date</p>
              <p className="text-sm font-black text-slate-800 whitespace-nowrap">28 Feb 2025</p>
            </div>
            <div className="border-l border-slate-200 pl-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">End Date</p>
              <p className="text-sm font-black text-slate-800 whitespace-nowrap">28 Feb 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENTLY UPLOADED EVIDENCES */}
      <div className="bg-white rounded-4xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
        <div className="p-6 md:p-8">
          <div className="mb-8 ml-2">
            <h4 className="text-[15px] font-black text-slate-800">Recently Uploaded Evidences</h4>
          </div>

          {/* Table Container with horizontal scroll for mobile */}
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-150">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4">File Name</th>
                  <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4">Date Shared</th>
                  <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4">Owner</th>
                  <th className="text-right pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {evidenceList.map((evidence) => (
                  <tr key={evidence.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#6A5AFF] group-hover:bg-[#6A5AFF] group-hover:text-white transition-all">
                          <FileText size={20} />
                        </div>
                        <span className="text-sm font-bold text-slate-800">{evidence.name}</span>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-slate-500 font-medium whitespace-nowrap">{evidence.date}</td>
                    <td className="py-5 text-sm text-slate-500 font-medium truncate max-w-37.5 md:max-w-none">{evidence.sharedBy}</td>
                    <td className="py-5 text-right">
                      <div className="flex items-center justify-end gap-1 md:gap-2">
                        <button
                          onClick={() => handleDownload(evidence.name)}
                          className="p-2 text-slate-400 hover:text-[#6A5AFF] hover:bg-white rounded-lg transition-all"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(evidence.id, evidence.name)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${toast.type === "success"
              ? "bg-linear-to-r from-green-500 to-emerald-500"
              : "bg-linear-to-r from-red-500 to-rose-500"
              } text-white font-bold`}>
              {toast.type === "success" ? (
                <CheckCircle size={24} className="shrink-0" />
              ) : (
                <XCircle size={24} className="shrink-0" />
              )}
              <span className="text-sm">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-xl mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>

              <h3 className="text-lg font-black text-slate-800 text-center mb-2">
                Delete File?
              </h3>

              <p className="text-sm text-slate-500 text-center mb-1">
                Are you sure you want to delete
              </p>
              <p className="text-sm text-slate-800 font-bold text-center mb-4 truncate px-2">
                "{deleteConfirm.name}"?
              </p>

              <p className="text-xs text-slate-400 text-center mb-6">
                This action cannot be undone.
              </p>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-200 transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Evidence Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddModal(false);
              setNewEvidence({ name: "", file: null });
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl mx-auto mb-6">
                <Upload size={32} className="text-[#6A5AFF]" />
              </div>

              <h3 className="text-2xl font-black text-slate-800 text-center mb-2">
                Add New Evidence
              </h3>

              <p className="text-sm text-slate-500 text-center mb-8">
                Upload a new evidence file to your compliance records
              </p>

              {/* File Name Input */}
              <div className="mb-6">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  File Name *
                </label>
                <input
                  type="text"
                  value={newEvidence.name}
                  onChange={(e) => setNewEvidence({ ...newEvidence, name: e.target.value })}
                  placeholder="e.g., Evidence-Document.docx"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-[#6A5AFF] focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-slate-800"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddEvidence();
                    }
                  }}
                />
              </div>

              {/* File Upload Area */}
              <div className="mb-8">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Upload File (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setNewEvidence({ ...newEvidence, file: e.target.files[0] })}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-[#6A5AFF] hover:bg-indigo-50/30 transition-all group"
                  >
                    <FileText size={32} className="text-slate-400 group-hover:text-[#6A5AFF] transition-colors mb-2" />
                    <p className="text-sm font-bold text-slate-600 group-hover:text-[#6A5AFF] transition-colors">
                      {newEvidence.file ? newEvidence.file.name : "Click to browse files"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PDF, DOC, DOCX, TXT, XLS, XLSX
                    </p>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowAddModal(false);
                    setNewEvidence({ name: "", file: null });
                  }}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddEvidence}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-[#6A5AFF] to-[#5A4AEF] hover:from-[#5A4AEF] hover:to-[#4A3ADF] text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all"
                >
                  Add Evidence
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}