import React from "react";
import Sidebar from "../components/ClientSidebar";
import { FileText, Download, ExternalLink, Search, BookOpen, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Documentation() {
  const docs = [
    { title: "ISO 27001:2022 Framework Guide", size: "2.4 MB", type: "PDF", category: "Standard" },
    { title: "Internal Security Policy v1.2", size: "1.1 MB", type: "DOCX", category: "Internal" },
    { title: "Risk Assessment Methodology", size: "850 KB", type: "PDF", category: "Guidelines" },
    { title: "Access Control Matrix Template", size: "45 KB", type: "XLSX", category: "Templates" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F9]">
      <Sidebar />
      <main className="flex-1 px-4 py-24 md:px-10 md:py-10 max-w-400 mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Compliance Documentation</h2>
          <p className="text-slate-500 text-sm mt-1">Access framework standards and organization policies.</p>
        </header>

        {/* SEARCH & FILTERS */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 mb-8 flex items-center gap-4">
          <Search size={20} className="text-slate-400 ml-2" />
          <input type="text" placeholder="Search documentation..." className="flex-1 bg-transparent outline-none text-sm font-medium" />
        </div>

        {/* DOCS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {docs.map((doc, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#6A5AFF] mb-4 group-hover:bg-[#6A5AFF] group-hover:text-white transition-all">
                  <FileText size={24} />
                </div>
                <span className="text-[10px] font-black text-[#6A5AFF] uppercase tracking-widest">{doc.category}</span>
                <h4 className="font-bold text-slate-800 mt-1 mb-2 leading-tight">{doc.title}</h4>
                <p className="text-xs text-slate-400 font-medium">{doc.type} • {doc.size}</p>
              </div>

              <button className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-50 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all">
                <Download size={14} /> Download
              </button>
            </motion.div>
          ))}
        </div>

        {/* HELP SECTION */}
        <div className="mt-12 bg-[#6A5AFF] rounded-4xl p-10 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2">Need help with compliance?</h3>
            <p className="text-indigo-100 opacity-90 max-w-md">Our expert auditors are available for a quick sync to help you understand specific ISO clauses.</p>
            <button className="mt-6 bg-white text-[#6A5AFF] px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2">
              <BookOpen size={18} /> Visit Knowledge Base
            </button>
          </div>
          <div className="absolute -right-5 -bottom-5 opacity-10 rotate-12">
            <Shield size={240} />
          </div>
        </div>
      </main>
    </div>
  );
}