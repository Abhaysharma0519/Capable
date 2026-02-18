// src/pages/ContentPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { allPagesData } from '../data/RouteData';
import Header from '../components/Header'; // Assuming Header.jsx is in components

const ContentPage = () => {
  const { slug } = useParams();
  const page = allPagesData[slug];

  if (!page) {
    return <div className="pt-32 text-center">404: Page not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20 px-8 max-w-6xl mx-auto">
        <div className="bg-slate-50 border border-slate-100 rounded-4xl p-12 shadow-sm">
          <span className="text-[#6A5AFF] font-bold text-xs uppercase tracking-widest px-3 py-1 bg-white border border-slate-200 rounded-full">
            {page.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 mb-4">
            {page.title}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            This is the dedicated workspace for {page.title}. Manage your compliance documentation, 
            monitor real-time evidence, and track audit progress here.
          </p>
          
          {/* Specific sections can be conditionally rendered based on the slug */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 bg-white rounded-2xl border border-slate-100">
               <h3 className="font-bold text-slate-800">Status</h3>
               <p className="text-[#6A5AFF] font-bold text-2xl mt-2">Active</p>
             </div>
             <div className="p-6 bg-white rounded-2xl border border-slate-100">
               <h3 className="font-bold text-slate-800">Controls</h3>
               <p className="text-slate-900 font-bold text-2xl mt-2">142 Ready</p>
             </div>
             <div className="p-6 bg-white rounded-2xl border border-slate-100">
               <h3 className="font-bold text-slate-800">Next Audit</h3>
               <p className="text-slate-900 font-bold text-2xl mt-2">Q3 2026</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentPage;