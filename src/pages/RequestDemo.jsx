import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, ArrowRight, Building2, Globe2, 
  ChevronRight, ChevronLeft, Sparkles, Mail, ShieldCheck,
  Lock, Zap, BarChart3, Fingerprint, Activity
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const capabilities = [
  { id: 'ac', label: 'Manual Governance', icon: <Fingerprint size={18} /> },
  { id: 'rm', label: 'Framework Mapping', icon: <Lock size={18} /> },
  { id: 'vrm', label: 'Vendor Risk', icon: <Building2 size={18} /> },
  { id: 'tc', label: 'Trust Center', icon: <ShieldCheck size={18} /> },
  { id: 'qa', label: 'Audit Readiness', icon: <Activity size={18} /> },
  { id: 'fed', label: 'Privacy Standards', icon: <Globe2 size={18} /> }
];

const RequestDemo = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: '', headcount: '', country: '', capabilities: [],
    isMsp: false, agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleCapability = (label) => {
    setForm(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(label)
        ? prev.capabilities.filter(i => i !== label)
        : [...prev.capabilities, label]
    }));
  };

  const nextStep = () => {
    if (step === 1 && (!form.email || !form.headcount)) {
      toast.warn("Please fill in your contact details first.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      toast.error("Please agree to the privacy policy.");
      return;
    }
    setIsSubmitted(true);
    toast.success("Strategy session booked!");
  };

  const progress = (step / 2) * 100;
  const themeColor = "#6A5AFF";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1F2937] flex flex-col lg:flex-row overflow-hidden selection:bg-[#6A5AFF]/20">
      <ToastContainer position="top-right" theme="colored" />
      
      {/* LEFT SIDE: BRANDING & SYSTEM PREVIEW */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:w-[45%] p-12 lg:p-24 relative flex flex-col justify-between bg-white border-r border-slate-100"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6A5AFF]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="w-10 h-10 bg-[#6A5AFF] rounded-xl flex items-center justify-center text-white shadow-xl shadow-[#6A5AFF]/20">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Capable</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-8">
            Expert-led <br />
            <span style={{ color: themeColor }}>Trust</span> Infrastructure.
          </h1>
          
          <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-md">
            Go beyond spreadsheets. Coordinate manual evidence, track framework risk, and stay audit-ready with the industry's most precise platform.
          </p>

          {/* Floating HUD Preview */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative p-6 rounded-4xl bg-slate-900 border border-slate-800 shadow-2xl max-w-md hidden md:block"
          >
             <div className="flex gap-1.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                    <span>Audit Readiness</span>
                    <span className="text-emerald-400">94.2%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-[#6A5AFF]" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[9px] text-slate-500 uppercase mb-1">Frameworks</div>
                        <div className="text-sm font-bold text-white">18 Active</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[9px] text-slate-500 uppercase mb-1">Status</div>
                        <div className="text-sm font-bold text-emerald-400">Audit Ready</div>
                    </div>
                </div>
             </div>
          </motion.div>
        </div>

        <div className="relative z-10 pt-12">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trusted by 500+ Security Leads</p>
            </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: INTERACTIVE FORM */}
      <div className="lg:w-[55%] p-6 md:p-12 lg:p-20 flex items-center justify-center relative">
        <div className="w-full max-w-xl">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] p-10 lg:p-14 border border-slate-100 relative overflow-hidden"
              >
                {/* Progress Header */}
                <div className="flex items-center justify-between mb-12">
                   <div className="flex gap-2">
                      <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#6A5AFF]' : 'bg-slate-100'}`} />
                      <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#6A5AFF]' : 'bg-slate-100'}`} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Request Access</span>
                </div>

                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      {step === 1 ? "Start your strategy" : "Select priorities"}
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">Tell us about your compliance goals.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {step === 1 ? (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                        <input 
                          name="email" required type="email" placeholder="name@company.com"
                          value={form.email} onChange={handleChange}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#6A5AFF] focus:bg-white outline-none transition-all font-bold text-lg shadow-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Size</label>
                          <select 
                            name="headcount" required value={form.headcount} onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#6A5AFF] outline-none transition-all appearance-none font-bold text-slate-700 cursor-pointer shadow-sm"
                          >
                            <option value="">Select size</option>
                            {['1-50', '51-200', '201-1000', '1000+'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Country</label>
                          <select 
                            name="country" required value={form.country} onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#6A5AFF] outline-none transition-all appearance-none font-bold text-slate-700 cursor-pointer shadow-sm"
                          >
                            <option value="">Select country</option>
                            {['United States', 'India', 'Canada', 'Europe', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Focus Areas</label>
                        <div className="grid grid-cols-2 gap-3">
                          {capabilities.map(item => (
                            <button
                              key={item.id} type="button"
                              onClick={() => toggleCapability(item.label)}
                              className={`text-left px-4 py-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                                form.capabilities.includes(item.label) 
                                ? "border-[#6A5AFF] bg-[#6A5AFF]/5" 
                                : "border-slate-100 bg-white hover:border-slate-300"
                              }`}
                            >
                              <div className={`${form.capabilities.includes(item.label) ? "text-[#6A5AFF]" : "text-slate-400"}`}>
                                {item.icon}
                              </div>
                              <span className={`text-[12px] font-black ${form.capabilities.includes(item.label) ? "text-[#6A5AFF]" : "text-slate-600"}`}>
                                {item.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" name="agree" required checked={form.agree} onChange={handleChange}
                            className="w-5 h-5 rounded-lg border-2 border-slate-200 accent-[#6A5AFF] cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">I agree to the Expert Privacy Guidelines</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={step === 2 ? handleSubmit : nextStep}
                      className="flex-1 py-4 bg-[#6A5AFF] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-[#6A5AFF]/30 transition-all group"
                    >
                      <span>{step === 2 ? "Book Strategy Session" : "Continue"}</span>
                      <ChevronRight className="group-hover:translate-x-1 transition-transform" size={22} />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3rem] p-16 text-center shadow-2xl border border-white"
              >
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Request Received</h2>
                <p className="text-slate-500 font-medium mb-12 leading-relaxed">
                  Our compliance experts are reviewing your profile. Expect an invitation from <b>@capable.com</b> within the next 2 hours.
                </p>
                <button 
                  onClick={() => window.location.href = "/"}
                  className="px-10 py-4 bg-slate-950 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RequestDemo;