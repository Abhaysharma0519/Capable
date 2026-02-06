import React, { useState, useRef } from "react";
import { ChevronRight, ChevronDown, Info, Upload, MessageSquare, Download, Trash2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClausesTab() {
    const [expandedClauses, setExpandedClauses] = useState([4]); // Clause 4 expanded by default
    const [expandedSubClauses, setExpandedSubClauses] = useState([]); // Track which sub-clauses show file list
    const [uploadedFiles, setUploadedFiles] = useState({}); // Track uploaded files per sub-clause
    const fileInputRefs = useRef({}); // Store refs for file inputs

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
                        { name: "Evidence-5.docx", dateShared: "Jan 10, 2026", sharedBy: "abhay@clientname.com" },
                        { name: "Evidence-4.docx", dateShared: "Jan 10, 2026", sharedBy: "abhay@clientname.com" },
                        { name: "Evidence-3.docx", dateShared: "Jan 10, 2026", sharedBy: "abhay@clientname.com" },
                        { name: "Evidence-2.docx", dateShared: "Jan 10, 2026", sharedBy: "abhay@clientname.com" },
                        { name: "Evidence-1.docx", dateShared: "Jan 10, 2026", sharedBy: "abhay@clientname.com" },
                    ]
                },
                {
                    id: "4.2",
                    title: "4.2 Understanding the Needs and Expectations of Interested Parties",
                    hasInfo: true,
                    files: []
                },
                {
                    id: "4.3",
                    title: "4.3 Determining the scope of the Information Security Management System",
                    hasInfo: true,
                    files: []
                },
                {
                    id: "4.4",
                    title: "4.4 Information Security Management System",
                    hasInfo: true,
                    files: []
                },
            ]
        },
        {
            id: 5,
            title: "Clause 5 : Leadership",
            hasInfo: true,
            subClauses: [
                { id: "5.1", title: "5.1 Leadership and Commitment", hasInfo: true, files: [] },
                { id: "5.2", title: "5.2 Policy", hasInfo: true, files: [] },
                { id: "5.3", title: "5.3 Organizational Roles", hasInfo: true, files: [] },
            ]
        },
        {
            id: 6,
            title: "Clause 6 : Planning",
            hasInfo: true,
            subClauses: [
                { id: "6.1", title: "6.1 Actions to Address Risks and Opportunities", hasInfo: true, files: [] },
                { id: "6.2", title: "6.2 Information Security ", hasInfo: true, files: [] },
                { id: "6.3", title: "6.3 Planning of Changes", hasInfo: true, files: [] },
            ]
        },
        {
            id: 7,
            title: "Clause 7 : Support",
            hasInfo: true,
            subClauses: [
                { id: "7.1", title: "7.1 Resources", hasInfo: true, files: [] },
                { id: "7.2", title: "7.2 Competence", hasInfo: true, files: [] },
                { id: "7.3", title: "7.3 Awareness", hasInfo: true, files: [] },
                { id: "7.4", title: "7.4 Communication", hasInfo: true, files: [] },
                { id: "7.5", title: "7.5 Documented Information", hasInfo: true, files: [] },
            ]
        },
        {
            id: 8,
            title: "Clause 8 : Operation",
            hasInfo: true,
            subClauses: [
                { id: "8.1", title: "8.1 Operational Planning and Control", hasInfo: true, files: [] },
                { id: "8.2", title: "8.2 Information Security Risk Assessment", hasInfo: true, files: [] },
                { id: "8.3", title: "8.3 Information Security Risk Treatment", hasInfo: true, files: [] },
            ]
        },
        {
            id: 9,
            title: "Clause 9 : Performance Evaluation",
            hasInfo: true,
            subClauses: [
                { id: "9.1", title: "9.1 Monitoring,Analysis and Evaluation", hasInfo: true, files: [] },
                { id: "9.2", title: "9.2 Internal Audit", hasInfo: true, files: [] },
                { id: "9.3", title: "9.3 Management Review", hasInfo: true, files: [] },
            ]
        },
        {
            id: 10,
            title: "Clause 10 : Improvement",
            hasInfo: true,
            subClauses: [
                { id: "10.1", title: "10.1 Nonconformity and Corrective Action", hasInfo: true, files: [] },
                { id: "10.2", title: "10.2 Continual Improvement", hasInfo: true, files: [] },
            ]
        },
    ];

    const toggleClause = (clauseId) => {
        setExpandedClauses(prev =>
            prev.includes(clauseId)
                ? prev.filter(id => id !== clauseId)
                : [...prev, clauseId]
        );
    };

    const toggleSubClause = (subClauseId) => {
        setExpandedSubClauses(prev =>
            prev.includes(subClauseId)
                ? prev.filter(id => id !== subClauseId)
                : [...prev, subClauseId]
        );
    };

    const handleFileUpload = (subClauseId, event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        const newFiles = files.map(file => ({
            name: file.name,
            dateShared: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            sharedBy: "user@example.com", // Replace with actual user email
            file: file
        }));

        setUploadedFiles(prev => ({
            ...prev,
            [subClauseId]: [...(prev[subClauseId] || []), ...newFiles]
        }));

        // Auto-expand the sub-clause to show uploaded files
        if (!expandedSubClauses.includes(subClauseId)) {
            setExpandedSubClauses(prev => [...prev, subClauseId]);
        }
    };

    const handleDeleteFile = (subClauseId, fileIndex) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this file?');

        if (confirmDelete) {
            setUploadedFiles(prev => ({
                ...prev,
                [subClauseId]: prev[subClauseId].filter((_, idx) => idx !== fileIndex)
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
            // In a real application, you would fetch the file from your server here
            console.log('Download file:', file.name);
        }
    };

    const triggerFileInput = (subClauseId) => {
        if (fileInputRefs.current[subClauseId]) {
            fileInputRefs.current[subClauseId].click();
        }
    };

    return (
        <div className="bg-white rounded-4xl border border-slate-200 shadow-sm w-full overflow-hidden">
            {/* Header */}
            <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/30">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Audit Clauses</h2>
            </div>

            {/* Clauses List */}
            <div className="p-4 md:p-6">
                {clausesData.map((clause) => (
                    <div key={clause.id} className="mb-3">
                        {/* Main Clause Header */}
                        <div
                            className={`flex items-center gap-3 py-4 cursor-pointer rounded-2xl px-3 transition-all ${expandedClauses.includes(clause.id) ? "bg-indigo-50/50" : "hover:bg-slate-50"
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
                            <span className="text-sm font-bold text-slate-800">{clause.title}</span>
                            {clause.hasInfo && <Info size={14} className="text-[#6A5AFF] opacity-70" />}
                        </div>

                        {/* Sub-Clauses */}
                        <AnimatePresence>
                            {expandedClauses.includes(clause.id) && clause.subClauses.length > 0 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="ml-4 md:ml-10 mt-3 space-y-3 overflow-hidden"
                                >
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Requirements</div>

                                    {clause.subClauses.map((subClause) => (
                                        <div key={subClause.id} className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden">
                                            {/* Sub-Clause Row - Responsive Flex */}
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <button
                                                        className="mt-0.5 text-slate-400 hover:text-[#6A5AFF] transition-colors"
                                                        onClick={() => toggleSubClause(subClause.id)}
                                                    >
                                                        {expandedSubClauses.includes(subClause.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                    </button>
                                                    <div className="space-y-1">
                                                        <span className="text-sm font-bold text-slate-700 block leading-tight">{subClause.title}</span>
                                                        {subClause.hasInfo && (
                                                            <div className="flex items-center gap-1 text-[10px] text-[#6A5AFF] font-bold uppercase">
                                                                <Info size={10} /> Requirement Info
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Buttons - Wraps on Mobile */}
                                                <div className="flex flex-wrap items-center gap-2 md:gap-4 ml-7 lg:ml-0">
                                                    {/* Hidden File Input */}
                                                    <input
                                                        type="file"
                                                        ref={el => fileInputRefs.current[subClause.id] = el}
                                                        onChange={(e) => handleFileUpload(subClause.id, e)}
                                                        multiple
                                                        className="hidden"
                                                        accept="*/*"
                                                    />
                                                    <button
                                                        onClick={() => triggerFileInput(subClause.id)}
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

                                            {/* File List Table - Horizontal Scroll on Mobile */}
                                            {expandedSubClauses.includes(subClause.id) && (() => {
                                                const allFiles = [...subClause.files, ...(uploadedFiles[subClause.id] || [])];
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
                                                                            const isUploaded = idx >= subClause.files.length;
                                                                            const uploadedIndex = isUploaded ? idx - subClause.files.length : -1;

                                                                            return (
                                                                                <motion.tr
                                                                                    key={`${subClause.id}-${idx}-${file.name}`}
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
                                                                                                onClick={() => isUploaded ? handleDeleteFile(subClause.id, uploadedIndex) : alert('Cannot delete pre-existing files')}
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}