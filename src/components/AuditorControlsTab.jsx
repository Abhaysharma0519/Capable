import React, { useState, useRef } from "react";
import {
  ChevronRight,
  ChevronDown,
  Info,
  Upload,
  MessageSquare,
  Download,
  Trash2,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuditorControlsTab() {
  const auditorEmail =
    localStorage.getItem("user_email") || "auditor@capable.com";

  const [expandedControls, setExpandedControls] = useState(["5.1"]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const fileInputRefs = useRef({});

  const controlsData = [
    {
      id: "5.1",
      title: "5.1 Policies for information security",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: [
        {
          name: "Evidence-5.docx",
          dateShared: "Jan 10, 2026",
          sharedBy: auditorEmail,
        },
        {
          name: "Evidence-4.docx",
          dateShared: "Jan 10, 2026",
          sharedBy: auditorEmail,
        },
      ],
    },
    {
      id: "5.2",
      title: "5.2 Information security roles and responsibilities",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: [],
    },
    {
      id: "5.3",
      title: "5.3 Segregation of duties",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: [],
    },
    {
      id: "5.4",
      title: "5.4 Management responsibilities",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: [],
    },
  ];

  const toggleControl = (controlId) => {
    setExpandedControls((prev) =>
      prev.includes(controlId)
        ? prev.filter((id) => id !== controlId)
        : [...prev, controlId]
    );
  };

  const handleFileUpload = (controlId, event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const newFiles = files.map((file) => ({
      name: file.name,
      dateShared: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      sharedBy: auditorEmail,
      file,
    }));

    setUploadedFiles((prev) => ({
      ...prev,
      [controlId]: [...(prev[controlId] || []), ...newFiles],
    }));

    if (!expandedControls.includes(controlId)) {
      setExpandedControls((prev) => [...prev, controlId]);
    }
  };

  const handleDeleteFile = (controlId, index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmDelete) return;

    setUploadedFiles((prev) => ({
      ...prev,
      [controlId]: prev[controlId].filter((_, i) => i !== index),
    }));

    alert("File deleted successfully!");
  };

  const handleDownloadFile = (file) => {
    if (file.file) {
      const url = URL.createObjectURL(file.file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert(`Downloading ${file.name}...`);
    } else {
      alert(`Download initiated for ${file.name}`);
    }
  };

  const triggerFileInput = (controlId) => {
    fileInputRefs.current[controlId]?.click();
  };

  return (
    <div className="bg-white rounded-4xl border border-slate-200 shadow-sm w-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/30">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          Controls
        </h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 px-6 flex gap-8">
        <button className="py-3 text-sm font-bold text-[#6A5AFF] border-b-2 border-[#6A5AFF]">
          Organizational
        </button>
        <button className="py-3 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
          People
        </button>
        <button className="py-3 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
          Physical
        </button>
        <button className="py-3 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
          Technological
        </button>
      </div>

      <div className="p-4 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-sm font-black text-slate-800">
            Organizational Controls
          </h3>
          <div className="w-4 h-4 bg-[#6A5AFF] rounded-full flex items-center justify-center">
            <Info size={12} className="text-white" />
          </div>
        </div>

        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">
          Sub-Control
        </div>

        <div className="space-y-3">
          {controlsData.map((control) => (
            <div
              key={control.id}
              className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row justify-between p-4 gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    className="mt-0.5 text-slate-400 hover:text-[#6A5AFF]"
                    onClick={() => toggleControl(control.id)}
                  >
                    {expandedControls.includes(control.id) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>

                  <div>
                    <span className="text-sm font-bold text-slate-700">
                      {control.title}
                    </span>

                    {control.hasInfo && (
                      <div className="flex items-center gap-1 text-[10px] text-[#6A5AFF] font-bold uppercase">
                        <Info size={10} /> Requirement Info
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-4 ml-7 lg:ml-0">
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[control.id] = el)}
                    onChange={(e) => handleFileUpload(control.id, e)}
                    multiple
                    className="hidden"
                  />

                  <button
                    onClick={() => triggerFileInput(control.id)}
                    className="flex items-center gap-1.5 text-[11px] text-[#6A5AFF] bg-indigo-50 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100"
                  >
                    <Upload size={14} /> Upload File
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg">
                    <MessageSquare size={16} />
                    <span className="text-[11px] font-bold">
                      Client Comments
                    </span>
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg">
                    <MessageSquare size={16} />
                    <span className="text-[11px] font-bold">
                      Auditor Comments
                    </span>
                  </button>

                  <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-md">
                    Applicable
                  </span>
                </div>
              </div>

              {expandedControls.includes(control.id) &&
                (() => {
                  const allFiles = [
                    ...control.files,
                    ...(uploadedFiles[control.id] || []),
                  ];

                  return allFiles.length > 0 ? (
                    <div className="px-4 pb-4">
                      <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-x-auto">
                        <table className="w-full min-w-125">
                          <thead>
                            <tr className="border-b border-slate-200 bg-white/50">
                              <th className="py-3 px-4 text-left text-[10px] font-black text-slate-400 uppercase">
                                Name
                              </th>
                              <th className="py-3 px-4 text-left text-[10px] font-black text-slate-400 uppercase">
                                Date Shared
                              </th>
                              <th className="py-3 px-4 text-left text-[10px] font-black text-slate-400 uppercase">
                                Shared By
                              </th>
                              <th className="py-3 px-4 text-right text-[10px] font-black text-slate-400 uppercase">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <AnimatePresence mode="popLayout">
                              {allFiles.map((file, idx) => {
                                const isUploaded =
                                  idx >= control.files.length;
                                const uploadedIndex = isUploaded
                                  ? idx - control.files.length
                                  : -1;

                                return (
                                  <motion.tr
                                    key={`${control.id}-${idx}-${file.name}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-white"
                                    layout
                                  >
                                    <td className="py-3 px-4">
                                      <div className="flex items-center gap-3">
                                        <motion.div
                                          className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white shadow-sm"
                                          whileHover={{ scale: 1.1 }}
                                        >
                                          <FileText size={14} />
                                        </motion.div>
                                        <span className="text-xs font-bold text-slate-700">
                                          {file.name}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="py-3 px-4 text-xs text-slate-500 font-semibold">
                                      {file.dateShared}
                                    </td>

                                    <td className="py-3 px-4 text-xs text-slate-500 font-semibold">
                                      {file.sharedBy}
                                    </td>

                                    <td className="py-3 px-4">
                                      <div className="flex items-center justify-end gap-2">
                                        <motion.button
                                          onClick={() =>
                                            handleDownloadFile(file)
                                          }
                                          className="p-1.5 text-[#6A5AFF] hover:bg-indigo-50 rounded-lg"
                                          whileHover={{ scale: 1.15 }}
                                        >
                                          <Download size={16} />
                                        </motion.button>

                                        <motion.button
                                          onClick={() =>
                                            isUploaded
                                              ? handleDeleteFile(
                                                  control.id,
                                                  uploadedIndex
                                                )
                                              : alert(
                                                  "Cannot delete pre-existing files"
                                                )
                                          }
                                          className="p-1.5 text-slate-800 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                          whileHover={{ scale: 1.15 }}
                                        >
                                          <Trash2 size={16} />
                                        </motion.button>
                                      </div>
                                    </td>
                                  </motion.tr>
                                );
                              })}
                            </AnimatePresence>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null;
                })()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
