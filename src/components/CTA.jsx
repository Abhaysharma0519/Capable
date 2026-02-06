import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Lock } from "lucide-react";

const CTA = () => {
  const navigate = useNavigate();
  const themeColor = "#6A5AFF";
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: y * 15 });
  };

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-12 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-[#6A5AFF]/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-360 mx-auto">
        <div 
          className="relative rounded-[3rem] bg-slate-950 p-8 sm:p-16 lg:p-24 overflow-hidden shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#6A5AFF_1px,transparent_1px),linear-gradient(90deg,#6A5AFF_1px,transparent_1px)] bg-size-[40px_40px]" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Content */}
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6A5AFF]/10 border border-[#6A5AFF]/20 text-[#6A5AFF] text-sm font-bold mb-8">
                <Zap size={16} />
                READY TO SCALE?
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-8">
                Stop chasing evidence. <br />
                <span style={{ color: themeColor }}>Start scaling trust.</span>
              </h2>
              
              <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                Join 1,000+ organizations automating their compliance journey with Capable. 
                Get audit-ready in weeks, not months.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/login?email=${encodeURIComponent(e.target.email.value)}`);
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-lg"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your work email"
                  className="flex-1 bg-slate-900 border border-slate-800 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A5AFF] transition-all"
                />
                <button
                  type="submit"
                  className="bg-[#6A5AFF] hover:bg-[#5849d8] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  Get Started <ArrowRight size={20} />
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <CheckCircle size={16} className="text-green-500" /> No credit card required
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <CheckCircle size={16} className="text-green-500" /> SOC2/ISO 27001 ready
                </div>
              </div>
            </Motion.div>

            {/* Right Side: Floating UI Element */}
            <Motion.div 
              className="hidden lg:block relative"
              style={{ perspective: "1000px" }}
            >
              <Motion.div
                style={{
                  rotateX: tilt.y,
                  rotateY: -tilt.x,
                  transition: "transform 0.1s ease-out"
                }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-3xl"
              >
                <div className="flex items-center justify-between mb-12">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="px-3 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                    Live System
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div>
                      <div className="text-slate-500 text-xs mb-1 uppercase tracking-tight">Active Frameworks</div>
                      <div className="text-2xl font-bold text-white">14 Frameworks</div>
                    </div>
                    <div className="p-3 bg-[#6A5AFF]/10 rounded-2xl text-[#6A5AFF]">
                      <ShieldCheck size={32} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-500 text-[10px] mb-1">EVIDENCE STATUS</div>
                      <div className="text-white font-bold tracking-tight">98.2% Auto-Sync</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-500 text-[10px] mb-1">AUDIT READINESS</div>
                      <div className="text-green-400 font-bold tracking-tight">Vetted</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#6A5AFF]/5 border border-[#6A5AFF]/20 rounded-2xl flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#6A5AFF] flex items-center justify-center text-white">
                        <Lock size={18} />
                     </div>
                     <div className="text-sm text-slate-300 font-medium">Controls encrypted & locked</div>
                  </div>
                </div>
              </Motion.div>

              {/* Decorative Blur Background for UI */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#6A5AFF]/20 blur-[100px] rounded-full" />
            </Motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;