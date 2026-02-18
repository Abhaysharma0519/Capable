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

export default function AuditorClausesTab() {
  const auditorEmail =
    localStorage.getItem("user_email") || "auditor@capable.com";

  const [expandedClauses, setExpandedClauses] = useState([4]);
  const [expandedSubClauses, setExpandedSubClauses] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const fileInputRefs = useRef({});

  const clausesData = [
    {
      id: 4,
      title: "Clause 4 : Context of Organization",
      hasInfo: true,
      subClauses: [
        {
          id: "4.1",
          title: "4.1 Understanding the Organization and its Context",
          hasInfo: true,
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
          id: "4.2",
          title:
            "4.2 Understanding the Needs and Expectations of Interested Parties",
          hasInfo: true,
          files: [],
        },
        {
          id: "4.3",
          title:
            "4.3 Determining the scope of the Information Security Management System",
          hasInfo: true,
          files: [],
        },
        {
          id: "4.4",
          title: "4.4 Information Security Management System",
          hasInfo: true,
          files: [],
        },
      ],
    },
    {
      id: 5,
      title: "Clause 5 : Leadership",
      hasInfo: true,
      subClauses: [
        { id: "5.1", title: "5.1 Leadership and Commitment", hasInfo: true, files: [] },
        { id: "5.2", title: "5.2 Policy", hasInfo: true, files: [] },
        { id: "5.3", title: "5.3 Organizational Roles", hasInfo: true, files: [] },
      ],
    },
    {
      id: 6,
      title: "Clause 6 : Planning",
      hasInfo: true,
      subClauses: [
        { id: "6.1", title: "6.1 Actions to Address Risks and Opportunities", hasInfo: true, files: [] },
        { id: "6.2", title: "6.2 Information Security Objectives", hasInfo: true, files: [] },
        { id: "6.3", title: "6.3 Planning of Changes", hasInfo: true, files: [] },
      ],
    },
  ];

  const toggleClause = (id) => {
    setExpandedClauses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleSubClause = (id) => {
    setExpandedSubClauses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (subClauseId, event) => {
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
      [subClauseId]: [...(prev[subClauseId] || []), ...newFiles],
    }));

    if (!expandedSubClauses.includes(subClauseId)) {
      setExpandedSubClauses((prev) => [...prev, subClauseId]);
    }
  };

  const handleDeleteFile = (subClauseId, index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmDelete) return;

    setUploadedFiles((prev) => ({
      ...prev,
      [subClauseId]: prev[subClauseId].filter((_, i) => i !== index),
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
    } else {
      alert(`Download initiated for ${file.name}`);
    }
  };

  const triggerFileInput = (subClauseId) => {
    fileInputRefs.current[subClauseId]?.click();
  };

  return (
    <div className="bg-white rounded-4xl border border-slate-200 shadow-sm w-full overflow-hidden">
      <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/30">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          Audit Clauses
        </h2>
      </div>

      <div className="p-4 md:p-6">
        {clausesData.map((clause) => (
          <div key={clause.id} className="mb-3">
            <div
              className={`flex items-center gap-3 py-4 cursor-pointer rounded-2xl px-3 transition-all ${
                expandedClauses.includes(clause.id)
                  ? "bg-indigo-50/50"
                  : "hover:bg-slate-50"
              }`}
              onClick={() => toggleClause(clause.id)}
            >
              <div className="p-1 bg-white rounded-lg shadow-sm border border-slate-100">
                {expandedClauses.includes(clause.id) ? (
                  <ChevronDown size={18} className="text-[#6A5AFF]" />
                ) : (
                  <ChevronRight size={18} className="text-slate-400" />
                )}
              </div>
              <span className="text-sm font-bold text-slate-800">
                {clause.title}
              </span>
              {clause.hasInfo && (
                <Info size={14} className="text-[#6A5AFF] opacity-70" />
              )}
            </div>

            <AnimatePresence>
              {expandedClauses.includes(clause.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="ml-6 mt-3 space-y-3 overflow-hidden"
                >
                  {clause.subClauses.map((sub) => (
                    <div
                      key={sub.id}
                      className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden"
                    >
                      <div className="flex flex-col lg:flex-row justify-between p-4 gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            onClick={() => toggleSubClause(sub.id)}
                            className="text-slate-400 hover:text-[#6A5AFF]"
                          >
                            {expandedSubClauses.includes(sub.id) ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>

                          <div>
                            <span className="text-sm font-bold text-slate-700">
                              {sub.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                          <input
                            type="file"
                            multiple
                            ref={(el) =>
                              (fileInputRefs.current[sub.id] = el)
                            }
                            onChange={(e) =>
                              handleFileUpload(sub.id, e)
                            }
                            className="hidden"
                          />

                          <button
                            onClick={() => triggerFileInput(sub.id)}
                            className="flex items-center gap-1 text-[11px] text-[#6A5AFF] bg-indigo-50 px-3 py-1.5 rounded-lg font-bold"
                          >
                            <Upload size={14} /> Upload File
                          </button>

                          <button className="text-[11px] font-bold text-slate-600">
                            <MessageSquare size={14} /> Comments
                          </button>

                          <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-md">
                            Applicable
                          </span>
                        </div>
                      </div>

                      {expandedSubClauses.includes(sub.id) && (
                        <div className="px-4 pb-4">
                          {[...(sub.files || []), ...(uploadedFiles[sub.id] || [])]
                            .length > 0 && (
                            <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-x-auto">
                              <table className="w-full min-w-125">
                                <thead>
                                  <tr className="border-b border-slate-200">
                                    <th className="py-3 px-4 text-left text-[10px] font-black text-slate-400 uppercase">
                                      Name
                                    </th>
                                    <th className="py-3 px-4 text-left text-[10px] font-black text-slate-400 uppercase">
                                      Date
                                    </th>
                                    <th className="py-3 px-4 text-left text-[10px] font-black text-slate-400 uppercase">
                                      Shared By
                                    </th>
                                    <th className="py-3 px-4 text-right text-[10px] font-black text-slate-400 uppercase">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...(sub.files || []), ...(uploadedFiles[sub.id] || [])].map(
                                    (file, idx) => (
                                      <tr key={idx} className="hover:bg-white">
                                        <td className="py-3 px-4 text-xs font-bold">
                                          {file.name}
                                        </td>
                                        <td className="py-3 px-4 text-xs">
                                          {file.dateShared}
                                        </td>
                                        <td className="py-3 px-4 text-xs">
                                          {file.sharedBy}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                          <button
                                            onClick={() =>
                                              handleDownloadFile(file)
                                            }
                                            className="mr-2 text-[#6A5AFF]"
                                          >
                                            <Download size={14} />
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDeleteFile(sub.id, idx)
                                            }
                                            className="text-red-500"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
