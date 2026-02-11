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

      {/* TRUSTED BY */}
      <section className="py-30 bg-[#F0f4ff]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-black text-2xl font-semibold mb-14">
            Trusted by 1,000+ customers, from startup to enterprise
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-16 gap-y-12 items-center justify-items-center">
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
              <img
                key={brand}
                src={`https://cdn.simpleicons.org/${brand}/000000`}
                alt={`${brand} logo`}
                className="h-8 md:h-10 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM CAPABILITIES */}
      <section className="py-20 px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="max-w-7xl mb-20">
            <h2 className="text-4xl font-bold text-black mb-6">
              The Compliance & Trust Management Platform
            </h2>
            <p className="text-2xl text-black leading-relaxed">
              No matter your size, Capable helps you manage compliance, reduce
              risk, and demonstrate trust continuously — all from one accurate,
              audit-ready platform.
            </p>
          </div>

          {/* Capability Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            <FeatureCard
              icon={<Zap style={{ color: themeColor }} />}
              title="Evidence Management"
              desc="Collect, organize, and maintain audit evidence from your tools without spreadsheets or manual follow-ups."
              themeColor={themeColor}
            />

            <FeatureCard
              icon={<Search style={{ color: themeColor }} />}
              title="Continuous Monitoring"
              desc="Maintain ongoing visibility into security controls and detect gaps before they become audit issues."
              themeColor={themeColor}
            />

            <FeatureCard
              icon={<Lock style={{ color: themeColor }} />}
              title="Trust Center"
              desc="Share your security posture with customers through a live, branded trust portal that builds confidence instantly."
              themeColor={themeColor}
            />

            <FeatureCard
              icon={<ShieldCheck style={{ color: themeColor }} />}
              title="Audit Readiness"
              desc="Stay prepared year-round with structured documentation and evidence aligned to compliance frameworks."
              themeColor={themeColor}
            />

            <FeatureCard
              icon={<Users style={{ color: themeColor }} />}
              title="Vendor Risk Management"
              desc="Assess, track, and manage third-party vendor risk from a single, centralized workspace."
              themeColor={themeColor}
            />

            <FeatureCard
              icon={<FileSearch style={{ color: themeColor }} />}
              title="Security Reviews"
              desc="Respond to customer security questionnaires faster with organized, reusable compliance data."
              themeColor={themeColor}
            />
          </div>
        </div>
      </section>

      {/* 5. VALUE PROP SECTION */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT SIDE — MESSAGE */}
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-8">
              Built for security teams. <br />
              <span className="text-slate-400 font-light">
                Trusted by auditors.
              </span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
              Capable gives your team a single, reliable workspace to manage
              evidence, monitor controls, track risk, and stay audit-ready
              year-round — without chasing spreadsheets or screenshots.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  title: "Deep Integrations",
                  desc: "Connect AWS, Google Workspace, GitHub, Slack and 300+ tools to collect evidence automatically.",
                },
                {
                  title: "Policy & Control Library",
                  desc: "Expert-vetted policies and mapped controls aligned to global compliance frameworks.",
                },
                {
                  title: "Audit-Ready Workspace",
                  desc: "Give auditors structured access to evidence, documents, and control status anytime.",
                },
                {
                  title: "Security Reviews",
                  desc: "Answer customer questionnaires quickly using centralized, reusable compliance data.",
                },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle
                      className="w-5 h-5"
                      style={{ color: themeColor }}
                    />
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — REALISTIC UI PANEL */}
          <div
            className="relative"
            style={{ perspective: "1200px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
          >
            <div
              className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
              }}
            >
              {/* Glow */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-20 blur-2xl pointer-events-none -z-10"
                style={{ backgroundColor: themeColor }}
              />

              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">
                  compliance_overview
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 relative z-10">
                {/* Status Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Controls Monitored", value: "124" },
                    { label: "Evidence Collected", value: "2,430" },
                    { label: "Audit Status", value: "PASS", highlight: true },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 border transition-all duration-300 ${
                        item.highlight
                          ? "text-center shadow-lg"
                          : "bg-slate-800 border-slate-700 hover:border-slate-600 hover:-translate-y-1"
                      }`}
                      style={
                        item.highlight ? { backgroundColor: themeColor } : {}
                      }
                    >
                      <p
                        className={`text-xs mb-1 ${item.highlight ? "text-white/80" : "text-slate-400"}`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-2xl font-bold ${item.highlight ? "text-white" : ""}`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Activity list */}
                <div className="space-y-3">
                  {[
                    "AWS access review completed",
                    "New vendor risk assessment added",
                    "ISO 27001 evidence synced",
                    "Security questionnaire exported",
                  ].map((log, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-slate-400 bg-slate-800/60 p-3 rounded-lg border border-slate-800 hover:border-slate-600 hover:translate-x-1 transition-all duration-300"
                    >
                      <CheckCircle
                        className="w-4 h-4 shrink-0"
                        style={{ color: themeColor }}
                      />
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE FRAMEWORKS */}
      <section className="py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Support for 20+ Global Compliance Frameworks
            </h2>
            <p className="text-2xl max-w-9xl text-[#6A5AFF]">
              Capable aligns your controls across international standards for
              information security, privacy, AI governance, and regulatory
              compliance.
            </p>
          </div>

          {/* Framework Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { name: "ISO/IEC 27001:2022", icon: <ShieldCheck /> },
              { name: "ISO 22301:2019", icon: <ShieldCheck /> },
              { name: "ISO/IEC 33001:2015", icon: <ShieldCheck /> },
              { name: "ISO/IEC 42001:2023 (AI)", icon: <ShieldCheck /> },
              { name: "ISO 14001:2015", icon: <ShieldCheck /> },
              { name: "ISO/IEC 27701:2025", icon: <ShieldCheck /> },

              { name: "GDPR", icon: <Globe /> },
              { name: "DPDPA (India)", icon: <Scale /> },
              { name: "PDPL", icon: <Scale /> },
              { name: "CCPA", icon: <Scale /> },

              { name: "HIPAA", icon: <Lock /> },
              { name: "PCI DSS", icon: <Lock /> },

              { name: "SOC 1 / SOC 2 / SOC 3", icon: <FileCheck /> },
              { name: "FedRAMP", icon: <Landmark /> },
              { name: "HITRUST", icon: <ShieldCheck /> },
              { name: "NIST CSF", icon: <Server /> },
              { name: "CISA Assessment", icon: <Server /> },

              { name: "Cloud Security Assessments", icon: <Cloud /> },
            ].map((fw, i) => (
              <div
                key={i}
                className="group border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-slate-50"
              >
                <div className="h-12 w-12 mb-4 flex items-center justify-center text-[#6A5AFF]">
                  {React.cloneElement(fw.icon, { size: 36 })}
                </div>

                <div className="text-sm font-bold text-slate-800 leading-snug">
                  {fw.name}
                </div>
              </div>
            ))}
          </div>

          {/* below  */}
          <div className="text-center mt-20">
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:scale-105 transition-all"
              style={{ backgroundColor: themeColor }}
            >
              Request a Demo
            </button>
          </div>
        </div>
      </section>

      {/* SOLUTIONS BY STAGE SECTION */}
      <section className="py-24 sm:py-32 bg-[#F0f4ff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-[#6A5AFF]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-360 mx-auto px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* LEFT SIDE: CONTENT & TIERS */}
            <div className="z-10">
              <div className="max-w-xl mb-16">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
                  Simplify security and compliance <br />
                  <span style={{ color: themeColor }}>at every stage</span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Whether you’re working toward your first SOC 2 audit or running 
                  a program at enterprise scale, we do the heavy lifting.
                </p>
              </div>

              {/* STAGE CARDS */}
              <div className="space-y-6">
                {[
                  {
                    stage: "Startup",
                    title: "Close larger clients fast.",
                    desc: "Get compliant and reach new milestones without manual overhead.",
                    icon: <Zap size={20} />,
                    linkText: "Explore startup solutions"
                  },
                  {
                    stage: "Mid-market",
                    title: "Scale your processes.",
                    desc: "Gain continuous visibility across your growing security program.",
                    icon: <BarChart size={20} />,
                    linkText: "Explore mid-market solutions"
                  },
                  {
                    stage: "Enterprise",
                    title: "Enterprise-grade controls.",
                    desc: "Solutions tailored to the needs and scale of global organizations.",
                    icon: <Landmark size={20} />,
                    linkText: "Explore enterprise solutions"
                  }
                ].map((tier, idx) => (
                  <div 
                    key={idx}
                    className="group flex gap-6 p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#6A5AFF]/30 hover:shadow-xl hover:shadow-[#6A5AFF]/5 transition-all duration-300 cursor-pointer"
                  >
                    <div 
                      className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${themeColor}10`, color: themeColor }}
                    >
                      {tier.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
                        {tier.stage}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{tier.title}</h3>
                      <p className="text-slate-500 text-sm mb-4 leading-relaxed">{tier.desc}</p>
                      <div 
                        className="flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all"
                        style={{ color: themeColor }}
                      >
                        {tier.linkText} <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: VISUAL IMAGE PANEL */}
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative z-10 rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl overflow-hidden aspect-4/5 sm:aspect-square lg:aspect-4/5">
                <img 
                  src="/src/assets/startup.jpg" 
                  alt="Capable Solutions Stage Dashboard" 
                  className="w-full h-full object-cover rounded-[1.8rem] bg-slate-100"
                />
                
                {/* Floating "System Vetted" Badge on Image */}
                <Motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 right-10 bg-white/95 backdrop-blur p-4 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Stage Status</div>
                    <div className="text-sm font-black text-slate-900">SYSTEM VETTED</div>
                  </div>
                </Motion.div>
              </div>

              {/* Decorative HUD Elements behind image */}
              <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-dashed border-slate-200 rounded-full -z-10 animate-spin-slow" />
              <div 
                className="absolute -bottom-20 -right-20 w-80 h-80 blur-[100px] opacity-20 -z-10" 
                style={{ backgroundColor: themeColor }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. AI & TRUST INTELLIGENCE SECTION */}
      <section className="py-15 sm:py-20 bg-white relative">
        <div className="max-w-360 mx-auto px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
          
          {/* Section Header */}
          <div className="mb-20">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Learn more about Capable and <br />
              <span style={{ color: themeColor }}>AI-powered trust management</span>
            </h2>
          </div>

          {/* Intelligence Grid */}
          <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
            
            {/* CARD 1: AI AGENT */}
            <div className="group flex flex-col">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 aspect-video mb-8 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#6A5AFF]/10 group-hover:-translate-y-2">
                {/* Placeholder for your Image 1 */}
                <img 
                  src="/src/assets/3219080.jpg" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                  alt="AI Agent Interface" 
                />
                <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-xl border border-slate-100 shadow-sm">
                  <Cpu size={20} style={{ color: themeColor }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-justify">
                The all-new Capable AI Agent to supercharge GRC teams
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6 text-justify">
                The Capable AI Agent guides you through key compliance workflows, 
                automating evidence validation and taking action on your behalf to reduce manual toil.
              </p>
              <button 
                onClick={() => navigate("/features/ai-agent")}
                className="mt-auto flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all"
                style={{ color: themeColor }}
              >
                Read more <ArrowRight size={16} />
              </button>
            </div>

            {/* CARD 2: PLATFORM EXPANSION */}
            <div className="group flex flex-col">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 aspect-video mb-8 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#6A5AFF]/10 group-hover:-translate-y-2">
                {/* Placeholder for your Image 2 */}
                <img 
                  src="/src/assets/4131759.jpg" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                  alt="Monitoring Dashboard" 
                />
                <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-xl border border-slate-100 shadow-sm">
                  <Activity size={20} style={{ color: themeColor }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-justify">
                Force multiply your team with Capable’s Trust Management Platform
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6 text-justify">
                New features and functionality designed to supercharge your security team 
                and expand continuous coverage across your entire cloud environment.
              </p>
              <button 
                onClick={() => navigate("/platform/trust-management")}
                className="mt-auto flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all"
                style={{ color: themeColor }}
              >
                Read more <ArrowRight size={16} />
              </button>
            </div>

            {/* CARD 3: VRM SOLUTIONS */}
            <div className="group flex flex-col">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 aspect-video mb-8 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#6A5AFF]/10 group-hover:-translate-y-2">
                {/* Placeholder for your Image 3 */}
                <img 
                  src="/src/assets/vendorrisk.jpg" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                  alt="Vendor Risk Oversight" 
                />
                <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-xl border border-slate-100 shadow-sm">
                  <Users size={20} style={{ color: themeColor }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-justify">
                Enhanced VRM solution transforms third-party risk management
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6 text-justify">
                Move beyond manual checkbox exercises. Unlock automated, continuous monitoring 
                to maintain complete oversight of your vendor security posture.
              </p>
              <button 
                onClick={() => navigate("/features/vendor-risk")}
                className="mt-auto flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all"
                style={{ color: themeColor }}
              >
                Read more <ArrowRight size={16} />
              </button>
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
