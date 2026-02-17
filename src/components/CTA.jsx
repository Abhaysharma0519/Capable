import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Lock, Activity } from "lucide-react";

const CTA = () => {
  const navigate = useNavigate();
  const themeColor = "#6A5AFF";
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * 10 });
  };

  return (
    <section className="relative py-24 sm:py-32 px-12 overflow-hidden bg-white">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 blur-[150px] rounded-full" 
          style={{ backgroundColor: themeColor }}
        />
      </div>

      <div className="max-w-360 mx-auto">
        <div 
          className="relative rounded-[4rem] bg-slate-950 p-10 sm:p-20 lg:p-28 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          {/* Refined Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#6A5AFF_1px,transparent_1px)] bg-size-[30px_30px]" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Side: Content */}
            <Motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div 
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] font-black tracking-[0.2em] mb-10 transition-colors"
                style={{ backgroundColor: `${themeColor}10`, borderColor: `${themeColor}30`, color: themeColor }}
              >
                <Zap size={14} className="animate-pulse" />
                SYSTEM READY FOR ONBOARDING
              </div>
              
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-10">
                Stop chasing evidence. <br />
                <span style={{ color: themeColor }}>Start scaling trust.</span>
              </h2>
              
              <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-lg text-justify">
                Join 1,000+ organizations scaling their manual compliance with Capable. 
                Get audit-ready in weeks with high-fidelity control management.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/login?email=${encodeURIComponent(e.target.email.value)}`);
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-xl group"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your work email"
                  className="flex-1 bg-white/5 border border-slate-800 text-white px-8 py-5 rounded-4xl focus:outline-none focus:border-[#6A5AFF] focus:bg-white/10 transition-all font-bold"
                />
                <button
                  type="submit"
                  className="px-10 py-5 rounded-4xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-2xl hover:scale-105 active:scale-95 group"
                  style={{ backgroundColor: themeColor, color: 'white' }}
                >
                  Get Started 
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>

              <div className="mt-12 flex flex-wrap gap-8 items-center">
                <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  <CheckCircle size={18} style={{ color: themeColor }} /> No credit card
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  <CheckCircle size={18} style={{ color: themeColor }} /> Audit Vetted
                </div>
              </div>
            </Motion.div>

            {/* Right Side: Floating High-Tech HUD */}
            <Motion.div 
              className="hidden lg:block relative"
              style={{ perspective: "2000px" }}
            >
              <Motion.div
                style={{
                  rotateX: tilt.y,
                  rotateY: -tilt.x,
                  transition: "transform 0.2s ease-out"
                }}
                className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-[0_0_80px_-20px_rgba(106,90,255,0.3)] relative overflow-hidden"
              >
                {/* Mac traffic lights */}
                <div className="flex items-center justify-between mb-16">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    Live Engine
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <div>
                      <div className="text-slate-500 text-[10px] font-black mb-1 uppercase tracking-widest">Expert Governance</div>
                      <div className="text-3xl font-black text-white tracking-tighter">18 Frameworks</div>
                    </div>
                    <div 
                      className="p-4 rounded-3xl shadow-lg"
                      style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                    >
                      <ShieldCheck size={36} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                      <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-2">Sync Status</div>
                      <div className="text-white font-black text-lg">Verified</div>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                      <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-2">System Health</div>
                      <div className="text-emerald-400 font-black text-lg">Optimal</div>
                    </div>
                  </div>

                  <div className="p-5 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-5">
                     <div 
                       className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                       style={{ backgroundColor: themeColor }}
                     >
                        <Activity size={22} className="animate-pulse" />
                     </div>
                     <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Monitoring</div>
                        <div className="text-sm text-slate-200 font-bold">Encrypted Control Layer</div>
                     </div>
                  </div>
                </div>
              </Motion.div>

              {/* Underlying Glow */}
              <div 
                className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 blur-[120px] rounded-full" 
                style={{ backgroundColor: themeColor }}
              />
            </Motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;