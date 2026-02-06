import React, { useState, useRef } from "react";
import { ChevronRight, ChevronDown, Info, Upload, MessageSquare, Download, Trash2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ControlsTab() {
  const [expandedControls, setExpandedControls] = useState(["5.1"]); // Track which controls show file list - 5.1 expanded by default
  const [uploadedFiles, setUploadedFiles] = useState({}); // Track uploaded files per control
  const fileInputRefs = useRef({}); // Store refs for file inputs

  const controlsData = [
    {
      id: "5.1",
      title: "5.1 Policies for information security",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: [
        { name: "Evidence-5.docx", dateShared: "Jan 10, 2026", sharedBy: "garakerni@clientname.com" },
        { name: "Evidence-4.docx", dateShared: "Jan 10, 2026", sharedBy: "garakerni@clientname.com" },
        { name: "Evidence-3.docx", dateShared: "Jan 10, 2026", sharedBy: "garakerni@clientname.com" },
        { name: "Evidence-2.docx", dateShared: "Jan 10, 2026", sharedBy: "garakerni@clientname.com" },
        { name: "Evidence-1.docx", dateShared: "Jan 10, 2026", sharedBy: "garakerni@clientname.com" },
      ]
    },
    {
      id: "5.2",
      title: "5.2 Information security roles and responsibilities",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.3",
      title: "5.3 Segregation of duties",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.4",
      title: "5.4 Management responsibilities",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.5",
      title: "5.5 Contact with authorities",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.6",
      title: "5.6 Contact with special interest groups",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.7",
      title: "5.7 Threat intelligence",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.8",
      title: "5.8 Information security in project management",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.9",
      title: "5.9 Inventory of information and other associated assets",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.10",
      title: "5.10 Acceptable use of information and other associated assets",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
    {
      id: "5.11",
      title: "5.11 Return of Assets",
      hasInfo: true,
      category: "Organizational Controls",
      subcategory: "Sub-Control",
      files: []
    },
  ];

  const toggleControl = (controlId) => {
    setExpandedControls(prev =>
      prev.includes(controlId)
        ? prev.filter(id => id !== controlId)
        : [...prev, controlId]
    );
  };

  const handleFileUpload = (controlId, event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newFiles = files.map(file => ({
      name: file.name,
      dateShared: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      sharedBy: "garakerni@clientname.com", // Replace with actual user email
      file: file
    }));

    setUploadedFiles(prev => ({
      ...prev,
      [controlId]: [...(prev[controlId] || []), ...newFiles]
    }));

    // Auto-expand the control to show uploaded files
    if (!expandedControls.includes(controlId)) {
      setExpandedControls(prev => [...prev, controlId]);
    }
  };

  const handleDeleteFile = (controlId, fileIndex) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this file?');

    if (confirmDelete) {
      setUploadedFiles(prev => ({
        ...prev,
        [controlId]: prev[controlId].filter((_, idx) => idx !== fileIndex)
      }));

      // Show success message
      alert('File deleted successfully!');
    }
  };

  const handleDownloadFile = (file) => {
    // If it's an uploaded file with a File object, create a download link
    if (file.file) {
      const url = URL.createObjectURL(file.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show success message
      alert(`Downloading ${file.name}...`);
    } else {
      // For pre-existing files, show a message
      alert(`Download initiated for ${file.name}`);
      console.log('Download file:', file.name);
    }
  };

  const triggerFileInput = (controlId) => {
    if (fileInputRefs.current[controlId]) {
      fileInputRefs.current[controlId].click();
    }
  };

  return (
    <div className="bg-white rounded-4xl border border-slate-200 shadow-sm w-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/30">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">Controls</h2>
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

      {/* Controls List */}
      <div className="p-4 md:p-6">
        {/* Category Header */}
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-sm font-black text-slate-800">Organizational Controls</h3>
          <div className="w-4 h-4 bg-[#6A5AFF] rounded-full flex items-center justify-center">
            <Info size={12} className="text-white" />
          </div>
        </div>

        {/* Sub-Control Label */}
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">
          Sub-Control
        </div>

        {/* Controls Items */}
        <div className="space-y-3">
          {controlsData.map((control) => (
            <div key={control.id} className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden">
              {/* Control Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    className="mt-0.5 text-slate-400 hover:text-[#6A5AFF] transition-colors"
                    onClick={() => toggleControl(control.id)}
                  >
                    {expandedControls.includes(control.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-700 block leading-tight">{control.title}</span>
                    {control.hasInfo && (
                      <div className="flex items-center gap-1 text-[10px] text-[#6A5AFF] font-bold uppercase">
                        <Info size={10} /> Requirement Info
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 md:gap-4 ml-7 lg:ml-0">
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={el => fileInputRefs.current[control.id] = el}
                    onChange={(e) => handleFileUpload(control.id, e)}
                    multiple
                    className="hidden"
                    accept="*/*"
                  />
                  <button
                    onClick={() => triggerFileInput(control.id)}
                    className="flex items-center gap-1.5 text-[11px] text-[#6A5AFF] bg-indigo-50 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 transition-colors"
                  >
                    <Upload size={14} /> <span>Upload File</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all" title="Client Comments">
                    <MessageSquare size={16} />
                    <span className="text-[11px] font-bold">Client Comments</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all" title="Auditor Comments">
                    <MessageSquare size={16} />
                    <span className="text-[11px] font-bold">Auditor Comments</span>
                  </button>
                  <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-tighter rounded-md">
                    Applicable
                  </span>
                </div>
              </div>

              {/* File List Table */}
              {expandedControls.includes(control.id) && (() => {
                const allFiles = [...control.files, ...(uploadedFiles[control.id] || [])];
                return allFiles.length > 0 ? (
                  <div className="px-4 pb-4">
                    <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-x-auto">
                      <table className="w-full min-w-125">
                        <thead>
                          <tr className="border-b border-slate-200 bg-white/50">
                            <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                            <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Shared</th>
                            <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Shared By</th>
                            <th className="text-right py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <AnimatePresence mode="popLayout">
                            {allFiles.map((file, idx) => {
                              const isUploaded = idx >= control.files.length;
                              const uploadedIndex = isUploaded ? idx - control.files.length : -1;

                              return (
                                <motion.tr
                                  key={`${control.id}-${idx}-${file.name}`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{
                                    opacity: 0,
                                    x: 20,
                                    height: 0,
                                    transition: { duration: 0.3 }
                                  }}
                                  transition={{ duration: 0.2 }}
                                  className="hover:bg-white transition-colors group"
                                  layout
                                >
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                      <motion.div
                                        className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white shadow-sm"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                      >
                                        <FileText size={14} />
                                      </motion.div>
                                      <span className="text-xs font-bold text-slate-700">{file.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-xs text-slate-500 font-semibold">{file.dateShared}</td>
                                  <td className="py-3 px-4 text-xs text-slate-500 font-semibold">{file.sharedBy}</td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center justify-end gap-2">
                                      <motion.button
                                        onClick={() => handleDownloadFile(file)}
                                        className="p-1.5 text-[#6A5AFF] hover:bg-indigo-50 rounded-lg transition-all"
                                        title="Download"
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                      >
                                        <Download size={16} />
                                      </motion.button>
                                      <motion.button
                                        onClick={() => isUploaded ? handleDeleteFile(control.id, uploadedIndex) : alert('Cannot delete pre-existing files')}
                                        className="p-1.5 text-slate-800 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                                        title="Delete"
                                        whileHover={{
                                          scale: 1.15,
                                          y: -2,
                                          rotate: [0, -10, 10, -10, 0],
                                          transition: { duration: 0.4 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400 }}
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
