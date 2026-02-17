import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  Zap,
  Lock,
  CheckCircle,
  ArrowRight,
  FileText,
  Search,
  BarChart,
  ShieldCheck,
  Activity,
  Globe,
  Cpu,
  Users,
  FileSearch,
  FileCheck,
  Landmark,
  Server,
  Cloud,
  Scale,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

const Home = () => {
  const navigate = useNavigate();
  const themeColor = "#6A5AFF";

  // Data for the rotating HUD nodes
  const hudNodes = [
    { icon: <ShieldCheck size={20} /> },
    { icon: <Activity size={20} /> },
    { icon: <Lock size={20} /> },
    { icon: <Globe size={20} /> },
    { icon: <Cpu size={20} /> },
    { icon: <Users size={20} /> },
  ];

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * 10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#6A5AFF]/10 overflow-x-hidden">
      <Header />

      {/* 2. HERO SECTION WITH ANIMATED HUD */}
      <section className="relative pt-30 pb-20 px-12 bg-linear-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-360 mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left z-10"
          >
            <h1 className="text-6xl md:text-5xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900">
              Automate compliance, manage risk, and accelerate the process{" "}
              <br />
              <span style={{ color: themeColor }}>Scale your trust.</span>
            </h1>
            <p className="text-xl text-black max-w-6xl mb-10 leading-relaxed text-justify">
              Capable helps you achieve compliance with confidence. This
              platform is built for accuracy and reliability—streamlining
              evidence collection, continuous monitoring, security reviews, and
              vendor risk management. Whether you're just starting your
              compliance journey or scaling your organization, Capable ensures
              your compliance program is thorough, consistent, and
              audit-ready.{" "}
            </p>
            <div className="w-full max-w-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  navigate(`/login?email=${encodeURIComponent(email)}`);
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your work email"
                  className="flex-1 px-6 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-lg"
                  style={{ focusRingColor: themeColor }}
                />

                <button
                  type="submit"
                  className="text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl"
                  style={{ backgroundColor: themeColor }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </Motion.div>

          {/* Right: Animated circular UI (HUD) */}
          <div className="relative flex items-center justify-center min-h-150">
            {/* Outer Rotating Dotted Circle */}
            <Motion.div
              className="absolute w-105 h-105 border border-dashed border-slate-200 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle Node Ring */}
            <Motion.div
              className="absolute w-[320px] h-80 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {hudNodes.map((node, i) => (
                <div
                  key={i}
                  className="absolute p-3 bg-white border border-slate-100 shadow-md rounded-xl text-[#6A5AFF]"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-160px) rotate(${-i * 60}deg)`,
                  }}
                >
                  {node.icon}
                </div>
              ))}
            </Motion.div>

            {/* Central Tick Mark Core */}
            <Motion.div
              className="relative w-56 h-56 bg-white rounded-full shadow-[0_0_50px_rgba(106,90,255,0.15)] border-4 border-slate-50 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Spinning Scanners */}
              <Motion.div
                className="absolute inset-2 border-t-2 border-[#6A5AFF] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="z-10 bg-[#6A5AFF]/5 p-6 rounded-full border border-[#6A5AFF]/20">
                <CheckCircle
                  className="w-16 h-16"
                  style={{ color: themeColor }}
                />
              </div>

              {/* Data Floating Labels */}
              <div className="absolute -top-10 -right-10 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400">
                  STATUS
                </div>
                <div className="text-sm font-black text-green-500">
                  COMPLIANCE
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BRANDS SECTION */}
<section className="py-30 bg-[#F0f4ff]">
  <div className="max-w-360 px-12 mx-auto">
    {/* Section Title */}
    <p className="text-center text-slate-900 text-2xl font-bold mb-16 tracking-tight">
      Trusted by 1,000+ customers, from startup to enterprise
    </p>

    {/* Logo Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-16 gap-y-16 items-center justify-items-center">
      {[
        "github",
        "gitlab",
        "atlassian",
        "notion",
        "stripe",
        "shopify",
        "airbnb",
        "figma",
        "dropbox",
        "cloudflare",
        "digitalocean",
        "vercel",
        "zoom",
        "mongodb",
        "postgresql",
        "snowflake",
        "replit",
        "duolingo",
      ].map((brand) => (
        <div key={brand} className="group relative">
          <img
            src={`https://cdn.simpleicons.org/${brand}/0F172A`} // Using a deep slate color for better contrast
            alt={`${brand} logo`}
            className="h-8 md:h-10 object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 4. PLATFORM CAPABILITIES */}
<section className="py-30 px-12 bg-white relative overflow-hidden">
  <div className="max-w-360 mx-auto">
    {/* Heading */}
    <div className="max-w-4xl mb-24">
      <h2 className="text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
        The Compliance & Trust Management Platform
      </h2>
      <p className="text-2xl text-slate-600 leading-relaxed text-justify">
        No matter your size, Capable helps you manage compliance, reduce
        risk, and demonstrate trust continuously — all from one accurate,
        audit-ready platform.
      </p>
    </div>

    {/* Capability Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
      {[
        {
          icon: <Zap size={24} />,
          title: "Evidence Management",
          desc: "Collect, organize, and maintain audit evidence from your tools without spreadsheets or manual follow-ups."
        },
        {
          icon: <Search size={24} />,
          title: "Continuous Monitoring",
          desc: "Maintain ongoing visibility into security controls and detect gaps before they become audit issues."
        },
        {
          icon: <Lock size={24} />,
          title: "Trust Center",
          desc: "Share your security posture with customers through a live, branded trust portal that builds confidence instantly."
        },
        {
          icon: <ShieldCheck size={24} />,
          title: "Audit Readiness",
          desc: "Stay prepared year-round with structured documentation and evidence aligned to compliance frameworks."
        },
        {
          icon: <Users size={24} />,
          title: "Vendor Risk Management",
          desc: "Assess, track, and manage third-party vendor risk from a single, centralized workspace."
        },
        {
          icon: <FileSearch size={24} />,
          title: "Security Reviews",
          desc: "Respond to customer security questionnaires faster with organized, reusable compliance data."
        }
      ].map((feature, idx) => (
        <div 
          key={idx} 
          className="group relative p-8 rounded-3xl border border-slate-100 bg-slate-50/50 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2"
        >
          {/* Accent Line on Hover */}
          <div 
            className="absolute top-0 left-12 right-12 h-1 rounded-b-full transition-all duration-500 opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: themeColor }}
          />

          {/* Icon Box */}
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 shadow-sm bg-white border border-slate-100"
            style={{ color: themeColor }}
          >
            {feature.icon}
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-black transition-colors">
            {feature.title}
          </h3>
          
          <p className="text-slate-500 leading-relaxed text-[16px] group-hover:text-slate-600 transition-colors">
            {feature.desc}
          </p>

          {/* Subtle decoration */}
          <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
            <ArrowRight size={20} style={{ color: themeColor }} />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 5. VALUE PROP SECTION */}
<section className="py-32 bg-slate-950 text-white relative overflow-hidden">
  {/* Advanced Ambient Background Lighting */}
  <div 
    className="absolute top-0 right-0 w-125 h-125 opacity-20 blur-[150px] pointer-events-none"
    style={{ backgroundColor: themeColor }}
  />
  <div 
    className="absolute bottom-0 left-0 w-125 h-125 opacity-10 blur-[150px] pointer-events-none"
    style={{ backgroundColor: themeColor }}
  />

  <div className="max-w-360 mx-auto px-12 grid lg:grid-cols-2 gap-20 items-center relative z-10">
    {/* LEFT SIDE — MESSAGE */}
    <div className="relative">
      <h2 className="text-6xl font-extrabold leading-tight mb-8 tracking-tighter">
        Built for security teams. <br />
        <span className="text-slate-600 font-semibold italic">
          Trusted by auditors.
        </span>
      </h2>

      <p className="text-slate-400 text-xl mb-12 leading-relaxed max-w-xl text-justify border-l-2 border-slate-800 pl-6">
        Capable provides a high-fidelity workspace to manage
        manual evidence, monitor controls, and track framework risk 
        year-round — eliminating the chaos of fragmented spreadsheets.
      </p>

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
        {[
          {
            title: "Expert Mapping",
            desc: "Expert-vetted policies and controls manually mapped to ISO, GDPR, and HIPAA frameworks.",
          },
          {
            title: "Unified Workspace",
            desc: "Give auditors structured access to evidence, documents, and control status anytime.",
          },
          {
            title: "Continuous Oversight",
            desc: "Maintain constant visibility into security controls and detect gaps before audit season.",
          },
          {
            title: "Security Reviews",
            desc: "Complete customer questionnaires faster using centralized, high-accuracy compliance data.",
          },
        ].map((item, i) => (
          <div key={i} className="group relative">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-900 border border-slate-800 group-hover:border-slate-500 transition-all duration-300 shadow-inner"
                style={{ color: themeColor }}
              >
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">{item.title}</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed text-justify group-hover:text-slate-300 transition-colors">
              {item.desc}
            </p>
            {/* Subtle bottom line decoration */}
            <div className="absolute -bottom-2 left-0 w-0 h-px bg-linear-to-r from-transparent via-slate-500 to-transparent group-hover:w-full transition-all duration-700 opacity-30"></div>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT SIDE — REALISTIC UI PANEL */}
    <div
      className="relative group/panel"
      style={{ perspective: "2000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      {/* Floating background glow that follows the panel slightly */}
      <div 
        className="absolute -inset-4 opacity-0 group-hover/panel:opacity-20 blur-3xl transition-opacity duration-500 rounded-[3rem]"
        style={{ backgroundColor: themeColor }}
      />

      <div
        className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/50 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] p-10 transition-all duration-500 ease-out relative overflow-hidden"
        style={{
          transform: `rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        {/* Glass reflection effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/5 to-transparent pointer-events-none z-0" />

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800/50 pb-6 mb-8 relative z-10">
          <div className="flex gap-2">
  {/* Close */}
  <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] shadow-inner opacity-90 hover:opacity-100 transition-opacity"></div>
  {/* Minimize */}
  <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89D24] shadow-inner opacity-90 hover:opacity-100 transition-opacity"></div>
  {/* Maximize */}
  <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29] shadow-inner opacity-90 hover:opacity-100 transition-opacity"></div>
</div>
          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em]">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: themeColor }}
              ></span>
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: themeColor }}
              ></span>
            </span>
            <span className="opacity-60">core_governance_v3.0</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 relative z-10">
          {/* Capability Metrics Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Precision", value: "94%" },
              { label: "Manual Sync", value: "LIVE" },
              {
                label: "Audit Status",
                value: "READY",
                highlight: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 border transition-all duration-500 ${
                  item.highlight
                    ? "text-center shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] border-white/10"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-600 hover:bg-slate-950"
                }`}
                style={
                  item.highlight ? { backgroundColor: themeColor } : {}
                }
              >
                <p className={`text-[9px] mb-1 font-bold uppercase tracking-widest ${item.highlight ? "text-white/80" : "text-slate-500"}`}>
                  {item.label}
                </p>
                <p className={`text-xl font-black tracking-tight ${item.highlight ? "text-white" : "text-slate-100"}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Real-time Capability Logs */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                 Validation Stream
               </p>
               <div className="h-px flex-1 mx-4 bg-slate-800/50"></div>
            </div>
            {[
              "Audit evidence manually verified",
              "ISO 27001 control mapping confirmed",
              "Access review documentation synced",
              "Trust portal security layer active",
            ].map((log, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-xs text-slate-400 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/50 hover:border-slate-500 hover:translate-x-1 transition-all duration-300 cursor-default group/item"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor: themeColor,
                    boxShadow: `0 0 12px ${themeColor}`,
                  }}
                />
                <span className="group-hover/item:text-slate-100 transition-colors">
                  {log}
                </span>
                <span className="ml-auto text-[8px] text-slate-600 font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  SECURE
                </span>
              </div>
            ))}
          </div>

          {/* Progress Footer */}
          <div className="pt-4 px-1">
            <div className="flex justify-between text-[10px] text-slate-500 mb-3 font-mono font-bold uppercase tracking-widest">
              <span>Framework Integrity</span>
              <span className="text-white">94.8%</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ width: "94%", backgroundColor: themeColor }}
              >
                {/* Internal shine animation on the progress bar */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* COMPLIANCE FRAMEWORKS */}
<section className="py-32 bg-white border-t border-slate-100 relative overflow-hidden">
  {/* Subtle Background Pattern */}
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
       style={{ backgroundImage: `radial-gradient(${themeColor} 1px, transparent 1px)`, size: '30px 30px' }} />

  <div className="max-w-360 mx-auto px-12 relative z-10">
    {/* Heading */}
    <div className="text-center max-w-4xl mx-auto mb-24">
      <h2 className="text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
        Support for Global Compliance Frameworks
      </h2>
      <p className="text-2xl font-medium leading-relaxed" style={{ color: themeColor }}>
        Capable aligns your manual controls across international standards for
        information security, privacy, governance, and regulatory compliance.
      </p>
    </div>

    {/* Framework Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {[
        { name: "ISO/IEC 27001", cat: "Security" },
        { name: "ISO 22301", cat: "Security" },
        { name: "ISO/IEC 33001", cat: "Security" },
        { name: "ISO/IEC 42001", cat: "AI Gov" },
        { name: "ISO 14001", cat: "Security" },
        { name: "ISO/IEC 27701", cat: "Privacy" },
        { name: "GDPR", cat: "Privacy" },
        { name: "DPDPA (India)", cat: "Regulatory" },
        { name: "PDPL", cat: "Regulatory" },
        { name: "CCPA", cat: "Privacy" },
        { name: "HIPAA", cat: "Privacy" },
        { name: "PCI DSS", cat: "Security" },
        { name: "SOC 1 / 2 / 3", cat: "Security" },
        { name: "FedRAMP", cat: "Gov" },
        { name: "HITRUST", cat: "Security" },
        { name: "NIST CSF", cat: "Security" },
        { name: "CISA Assessment", cat: "Security" },
        { name: "Cloud Security", cat: "Cloud" },
      ].map((fw, i) => (
        <div
          key={i}
          className="group relative border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 bg-white hover:border-transparent hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 overflow-hidden"
        >
          {/* Hover Background Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500"
               style={{ backgroundColor: themeColor }} />
          
          {/* Animated Icon Logic */}
          <div className="h-14 w-14 mb-5 flex items-center justify-center rounded-2xl bg-slate-50 group-hover:bg-white transition-colors duration-500 shadow-sm"
               style={{ color: themeColor }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </svg>
          </div>

          <div className="text-[13px] font-black text-slate-800 leading-tight mb-2 tracking-tight group-hover:text-black">
            {fw.name}
          </div>
          
          <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors">
            {fw.cat}
          </div>

          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
          </div>
        </div>
      ))}
    </div>

    {/* CTA Section */}
    <div className="text-center mt-24">
      <div className="inline-block p-px rounded-full bg-linear-to-r from-transparent via-slate-200 to-transparent mb-10 w-full max-w-2xl"></div>
      
      <div className="relative inline-block">
        {/* Button Shadow Glow */}
        <div className="absolute inset-0 blur-xl opacity-30 animate-pulse rounded-full" style={{ backgroundColor: themeColor }} />
        
        <button
          onClick={() => navigate("/request-demo")}
          className="relative px-12 py-5 rounded-full text-white font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 overflow-hidden group"
          style={{ backgroundColor: themeColor }}
        >
          <span className="relative z-10">Request a Full Demo</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </button>
      </div>
      
      <p className="mt-6 text-slate-400 font-medium text-sm">
        Join leading GRC teams scaling their compliance manually with Capable.
      </p>
    </div>
  </div>
</section>

      {/* SOLUTIONS BY STAGE SECTION */}
<section className="py-24 sm:py-32 bg-[#F0f4ff] relative overflow-hidden">
  {/* Ambient background glow */}
  <div 
    className="absolute top-0 right-0 w-125 h-125 opacity-10 blur-[120px] rounded-full pointer-events-none" 
    style={{ backgroundColor: themeColor }}
  />

  <div className="max-w-360 mx-auto px-12">
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
      
      {/* LEFT SIDE: CONTENT & TIERS */}
      <div className="z-10">
        <div className="max-w-xl mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tighter mb-8 leading-[1.1]">
            Security and compliance <br />
            <span style={{ color: themeColor }}>at every stage</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed text-justify">
            Whether you’re working toward your first SOC 2 audit or
            running a global program at enterprise scale, we provide the 
            manual precision and tools to scale with confidence.
          </p>
        </div>

        {/* STAGE CARDS */}
        <div className="space-y-4">
          {[
            {
              stage: "Startup",
              title: "Close larger clients fast.",
              desc: "Achieve SOC 2 and reach new milestones with expert-led workflows.",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
              linkText: "Explore startup solutions",
            },
            {
              stage: "Mid-market",
              title: "Scale your processes.",
              desc: "Gain continuous visibility and manual control across your growing security program.",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>,
              linkText: "Explore mid-market solutions",
            },
            {
              stage: "Enterprise",
              title: "Enterprise-grade governance.",
              desc: "Complex controls tailored to the manual oversight needs of global organizations.",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 21h18M3 7v1a3 3 0 006 0V7m6 0v1a3 3 0 006 0V7M7 11v8M17 11v8M9 11v8M15 11v8"/></svg>,
              linkText: "Explore enterprise solutions",
            },
          ].map((tier, idx) => (
            <div
              key={idx}
              className="group flex gap-6 p-6 rounded-4xl bg-white border border-slate-200 hover:border-transparent hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              {/* Hover highlight bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: themeColor }}
              />

              <div
                className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 shadow-sm border border-slate-100"
                style={{
                  backgroundColor: `${themeColor}08`,
                  color: themeColor,
                }}
              >
                {tier.icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">
                  {tier.stage}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {tier.title}
                </h3>
                <p className="text-slate-500 text-[15px] mb-4 leading-relaxed">
                  {tier.desc}
                </p>
                <div
                  className="flex items-center gap-2 text-sm font-black transition-all group-hover:gap-4"
                  style={{ color: themeColor }}
                >
                  {tier.linkText} <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: VISUAL IMAGE PANEL */}
      <div className="relative">
        {/* Main Image Container */}
        <div className="relative z-10 rounded-[3rem] border-8 border-white bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden aspect-4/5 sm:aspect-square lg:aspect-4/5 transform hover:scale-[1.02] transition-transform duration-700">
          <img
            src="/src/assets/startup.jpg"
            alt="Capable Solutions Stage Dashboard"
            className="w-full h-full object-cover rounded-[2.2rem]"
          />

          {/* Floating "Mac-Style" Badge */}
          <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-2xl flex flex-col gap-4 animate-bounce-slow">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
              </div>
              <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Verification Node</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: themeColor, color: 'white' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Current Status</div>
                <div className="text-base font-black text-slate-900 tracking-tight">MANUALLY VETTED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative HUD Elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 border-2 border-dashed border-slate-300 rounded-full -z-10 opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-slate-200 rounded-full -z-10" />
      </div>
    </div>
  </div>

  {/* CSS logic for slow bounce animation */}
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    .animate-bounce-slow {
      animation: bounce-slow 4s ease-in-out infinite;
    }
  `}} />
</section>

      {/* 7. EXPERT TRUST INTELLIGENCE SECTION */}
<section className="relative py-20 px-12 bg-white overflow-hidden">
  <div className="max-w-360 mx-auto">
    {/* Section Header */}
    <div className="mb-20">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Learn more about Capable and <br />
        <span style={{ color: themeColor }}>
          Expert-led trust management
        </span>
      </h2>
    </div>

    {/* Intelligence Grid */}
    <div className="grid lg:grid-cols-3 gap-12 xl:gap-16">
      {/* CARD 1: GOVERNANCE */}
      <div className="group flex flex-col">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 aspect-video mb-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          {/* Visual: Manual Verification Log */}
          <div className="absolute inset-0 p-6 font-mono text-[10px] text-slate-500 flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 shadow-sm transition-transform group-hover:scale-105 duration-500">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>ISO 27001:2022 — Control A.5.1 Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 shadow-sm transition-transform group-hover:scale-105 duration-500 delay-75">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>NIST CSF — PR.AC-1 Documented</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 shadow-sm opacity-50 transition-transform group-hover:scale-105 duration-500 delay-150">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <span>ISO 42001:2023 — Review Pending</span>
              </div>
            </div>
          </div>
          {/* Icon Badge */}
          <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-xl border border-slate-100 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="m9 14 2 2 4-4"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 text-justify">
          Specialized in Governance workflows action to have supercharge GRC teams
        </h3>
        <p className="text-slate-500 leading-relaxed mb-6 text-justify">
          Expert-led workflows guide you through key compliance steps,
          ensuring precise evidence validation for ISO 27001 and NIST CSF
          frameworks.
        </p>
        <div className="mt-auto flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-3" style={{ color: themeColor }}>
          Learn more <span>→</span>
        </div>
      </div>

      {/* CARD 2: FRAMEWORK EXPANSION */}
      <div className="group flex flex-col">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-900 bg-slate-900 aspect-video mb-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          {/* Visual: Framework Grid */}
          <div className="absolute inset-0 p-4 grid grid-cols-3 gap-2 items-center opacity-80">
            {["GDPR", "SOC2", "HIPAA", "PCI DSS", "DPDPA", "PDPL", "CCPA", "CISA", "HITRUST"].map((fw) => (
              <div key={fw} className="border border-slate-700 rounded py-1 px-1 text-[8px] text-slate-400 text-center font-bold tracking-tighter">
                {fw}
              </div>
            ))}
            <div
              className="absolute left-0 w-full h-1 bg-linear-to-r from-transparent via-current to-transparent opacity-20 animate-bounce"
              style={{ color: themeColor, top: "45%" }}
            />
          </div>
          <div className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur rounded-xl border border-white/10 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 text-justify">
          Force multiply your team with Capable’s Trust Platform
        </h3>
        <p className="text-slate-500 leading-relaxed mb-6 text-justify">
          Coordinate manual assessments across GDPR, HIPAA, and PDPL.
          Expand continuous coverage and security posture oversight.
        </p>
        <div className="mt-auto flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-3" style={{ color: themeColor }}>
          Learn more <span>→</span>
        </div>
      </div>

      {/* CARD 3: AUDIT READINESS */}
      <div className="group flex flex-col">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 aspect-video mb-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          {/* Visual: Audit Progress */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>AUDIT READINESS</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: "92%", backgroundColor: themeColor }}></div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm transform group-hover:translate-x-2 transition-transform duration-500">
              <div className="flex items-center gap-3 text-[10px] text-slate-600 font-bold uppercase">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                FedRAMP Assessment Active
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-xl border border-slate-100 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 text-justify">
          Precision VRM solution for third-party risk management
        </h3>
        <p className="text-slate-500 leading-relaxed mb-6 text-justify">
          Move beyond checkbox exercises. Unlock manual, high-fidelity
          monitoring to maintain oversight of FedRAMP and HITRUST vendor
          security.
        </p>
        <div className="mt-auto flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-3" style={{ color: themeColor }}>
          Learn more <span>→</span>
        </div>
      </div>
    </div>
  </div>
</section>

      <CTA />
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, themeColor }) => (
  <div className="group p-10 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 text-left">
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 shadow-sm"
      style={{ backgroundColor: `${themeColor}10` }}
    >
      {React.cloneElement(icon, { size: 30 })}
    </div>
    <h3 className="text-xl font-bold mb-4 text-slate-800">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default Home;
