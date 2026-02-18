import React, { useState } from "react";
import {
  Download,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  Upload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stripedBg = {
  background: `linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)`,
  backgroundSize: "1.5rem 1.5rem",
};

export default function AuditorOverviewTab() {
  const userEmail =
    localStorage.getItem("user_email") || "auditor@clientname.com";

  /* -------------------- STATE -------------------- */

  const [evidenceList, setEvidenceList] = useState(() => {
    const saved = localStorage.getItem("auditorEvidenceList");
    if (saved) return JSON.parse(saved);

    return [
      { id: 1, name: "Evidence-5.docx", date: "Jan 10, 2026", sharedBy: userEmail },
      { id: 2, name: "Evidence-4.docx", date: "Jan 10, 2026", sharedBy: userEmail },
      { id: 3, name: "Evidence-3.docx", date: "Jan 10, 2026", sharedBy: userEmail },
    ];
  });

  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [setShowAddModal] = useState(false);
  const [newEvidence, setNewEvidence] = useState({ name: "", file: null });

  /* -------------------- TOAST -------------------- */

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* -------------------- DOWNLOAD -------------------- */

  const handleDownload = (name) => {
    try {
      const fileContent = `Sample evidence file: ${name}\nGenerated: ${new Date().toLocaleString()}`;
      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showToast(`Successfully downloaded ${name}`, "success");
    } catch {
      showToast(`Failed to download ${name}`, "error");
    }
  };

  /* -------------------- DELETE -------------------- */

  const handleDelete = (id, name) => {
    setDeleteConfirm({ id, name });
  };

  const confirmDelete = () => {
    const { id, name } = deleteConfirm;
    const updated = evidenceList.filter((e) => e.id !== id);
    setEvidenceList(updated);
    localStorage.setItem("auditorEvidenceList", JSON.stringify(updated));
    showToast(`${name} has been deleted`, "success");
    setDeleteConfirm(null);
  };

  const cancelDelete = () => setDeleteConfirm(null);

  /* -------------------- ADD EVIDENCE -------------------- */

  const handleAddEvidence = () => {
    if (!newEvidence.name.trim()) {
      showToast("Please enter a file name", "error");
      return;
    }

    const newId =
      evidenceList.length > 0
        ? Math.max(...evidenceList.map((e) => e.id)) + 1
        : 1;

    const newItem = {
      id: newId,
      name: newEvidence.name.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      sharedBy: userEmail,
    };

    const updated = [newItem, ...evidenceList];
    setEvidenceList(updated);
    localStorage.setItem("auditorEvidenceList", JSON.stringify(updated));

    showToast(`${newEvidence.name} added successfully`, "success");
    setShowAddModal(false);
    setNewEvidence({ name: "", file: null });
  };

  /* -------------------- UI -------------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full max-w-400 mx-auto pb-10"
    >
      {/* ABOUT */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-4xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden"
      >
        <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
        <h3 className="text-xl font-black text-slate-800 mb-3 ml-2">
          About ISO/IEC 27001:2022
        </h3>
        <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed ml-2 max-w-4xl">
          ISO/IEC 27001:2022 ensures organizations protect information through a strong ISMS. It defines controls for risk management, access security, data protection, and incident handling.
        </p>
      </motion.div>

      {/* PROGRESS + SCHEDULE */}
      <div className="bg-white rounded-4xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] relative overflow-hidden">
        <div className="p-6 md:p-8 relative">
          <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
          <h4 className="text-[15px] font-black text-slate-800 mb-6 ml-2">
            Compliance Progress
          </h4>

          <div className="flex flex-col md:flex-row gap-6 ml-2">
            <div className="min-w-25">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Status
              </span>
              <div className="bg-[#FFBD69] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase mt-1 text-center shadow-lg">
                On-Going
              </div>
            </div>

            <div className="min-w-25">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Controls
              </span>
              <div className="bg-slate-50 text-slate-700 px-5 py-2 rounded-xl text-sm font-black border border-slate-100 mt-1 text-center">
                46/93
              </div>
            </div>

            <div className="flex-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Audit Progress
              </span>
              <div className="h-11 bg-[#F1F4F9] rounded-2xl overflow-hidden flex border border-slate-50 mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "49%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-[#6A5AFF] flex items-center justify-center text-xs font-black text-white rounded-2xl shadow-lg"
                >
                  49%
                </motion.div>
                <div className="flex-1 opacity-20" style={stripedBg} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 border-t lg:border-l border-slate-100 bg-slate-50/30">
          <h4 className="text-[15px] font-black text-slate-800 mb-6">
            Schedule
          </h4>
          <div className="flex gap-8">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Start Date
              </p>
              <p className="text-sm font-black text-slate-800">
                28 Feb 2025
              </p>
            </div>
            <div className="border-l border-slate-200 pl-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                End Date
              </p>
              <p className="text-sm font-black text-slate-800">
                28 Feb 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EVIDENCE TABLE */}
      <div className="bg-white rounded-4xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-10 w-1.5 h-8 bg-[#6A5AFF] rounded-r-full" />
        <div className="p-6 md:p-8">
          <h4 className="text-[15px] font-black text-slate-800 mb-6 ml-2">
            Recently Uploaded Evidences
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full min-w-150">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4">
                    File Name
                  </th>
                  <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4">
                    Date Shared
                  </th>
                  <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4">
                    Owner
                  </th>
                  <th className="text-right pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {evidenceList.map((e) => (
                  <tr key={e.id} className="group hover:bg-slate-50/50 transition">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#6A5AFF] group-hover:bg-[#6A5AFF] group-hover:text-white transition">
                          <FileText size={20} />
                        </div>
                        <span className="text-sm font-bold text-slate-800">
                          {e.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-slate-500 font-medium whitespace-nowrap">
                      {e.date}
                    </td>
                    <td className="py-5 text-sm text-slate-500 font-medium">
                      {e.sharedBy}
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDownload(e.name)}
                          className="p-2 text-slate-400 hover:text-[#6A5AFF] rounded-lg transition"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(e.id, e.name)}
                          className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition"
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

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${
                toast.type === "success"
                  ? "bg-linear-to-r from-green-500 to-emerald-500"
                  : "bg-linear-to-r from-red-500 to-rose-500"
              } text-white font-bold`}
            >
              {toast.type === "success" ? (
                <CheckCircle size={24} />
              ) : (
                <XCircle size={24} />
              )}
              <span className="text-sm">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-lg font-black text-center mb-4">
                Delete "{deleteConfirm.name}"?
              </h3>

              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-linear-to-r from-red-500 to-rose-500 text-white rounded-xl font-bold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
