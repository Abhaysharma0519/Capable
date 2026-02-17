import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Shield,
  Globe,
  Cpu,
  Users,
  Activity,
  Lock,
  CheckCircle,
  Layers,
  MessageSquare,
  Briefcase,
  Zap,
  BarChart,
  Terminal,
  ShieldAlert,
  Fingerprint,
  ArrowRight
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const themeColor = "#6A5AFF";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const createSlug = (label, title) => {
    const key = `${label}|${title}`;
    const routes = {
      "Platform|Authentic Compliance": "/platform/authentic-compliance",
      "Platform|Continuous GRC": "/platform/continuous-grc",
      "Platform|Third Party Risk": "/platform/third-party-risk",
      "Platform|Risk Management": "/platform/risk-management",
      "Platform|Trust Center": "/platform/trust-center",
      "Platform|Personnel & Access": "/platform/personnel-access",
      "Features|Smart Mapping": "/features/smart-mapping",
      "Features|Audit Dashboards": "/features/audit-dashboards",
      "Features|Task Automation": "/features/task-automation",
      "Company|About": "/company/about",
      "Company|Contact Us": "/company/contact",
      "Company|Partners": "/company/partners",
      "Company|Terms": "/company/terms",
      "Frameworks|ISO/IEC 27001:2022": "/frameworks/iso-27001",
      "Frameworks|ISO 22301:2019": "/frameworks/iso-22301",
      "Frameworks|ISO/IEC 33001:2015": "/frameworks/iso-33001",
      "Frameworks|ISO/IEC 42001:2023": "/frameworks/iso-42001",
      "Frameworks|ISO 14001:2015": "/frameworks/iso-14001",
      "Frameworks|ISO/IEC 27701:2025": "/frameworks/iso-27701",
      "Frameworks|GDPR": "/frameworks/gdpr",
      "Frameworks|DPDPA": "/frameworks/dpdpa",
      "Frameworks|PDPL": "/frameworks/pdpl",
      "Frameworks|HIPAA": "/frameworks/hipaa",
      "Frameworks|PCI DSS": "/frameworks/pci-dss",
      "Frameworks|CCPA": "/frameworks/ccpa",
      "Frameworks|SOC1/SOC2/SOC3": "/frameworks/soc",
      "Frameworks|FedRAMP": "/frameworks/fedramp",
      "Frameworks|HITRUST": "/frameworks/hitrust",
      "Frameworks|NIST CSF": "/frameworks/nist-csf",
      "Frameworks|CISA Assessment": "/frameworks/cisa",
      "Frameworks|Cloud Security Assessments": "/frameworks/cloud-security",
    };
    return routes[key] || "/";
  };

  const navItems = [
    {
      label: "Platform",
      children: [
        { title: "Authentic Compliance", desc: "Verifiable, real-time proof.", icon: <Shield /> },
        { title: "Continuous GRC", desc: "Governance at scale.", icon: <Activity /> },
        { title: "Third Party Risk", desc: "Manage vendor risk.", icon: <Users /> },
        { title: "Risk Management", desc: "Identify threats early.", icon: <ShieldAlert /> },
        { title: "Trust Center", desc: "Public security portal.", icon: <Globe /> },
        { title: "Personnel & Access", desc: "Manage access controls.", icon: <Fingerprint /> },
      ],
    },
    {
      label: "Frameworks",
      isMega: true,
      children: [
        { title: "ISO/IEC 27001:2022", icon: <Shield /> },
        { title: "ISO 22301:2019", icon: <Shield /> },
        { title: "ISO/IEC 33001:2015", icon: <Shield /> },
        { title: "ISO/IEC 42001:2023", icon: <Shield /> },
        { title: "ISO 14001:2015", icon: <Shield /> },
        { title: "ISO/IEC 27701:2025", icon: <Shield /> },
        { title: "GDPR", icon: <Lock /> },
        { title: "DPDPA", icon: <Lock /> },
        { title: "PDPL", icon: <Lock /> },
        { title: "HIPAA", icon: <Lock /> },
        { title: "PCI DSS", icon: <Lock /> },
        { title: "CCPA", icon: <Lock /> },
        { title: "SOC1/SOC2/SOC3", icon: <CheckCircle /> },
        { title: "FedRAMP", icon: <CheckCircle /> },
        { title: "HITRUST", icon: <CheckCircle /> },
        { title: "NIST CSF", icon: <CheckCircle /> },
        { title: "CISA Assessment", icon: <CheckCircle /> },
        { title: "Cloud Security Assessments", icon: <CheckCircle /> },
      ],
    },
    {
      label: "Features",
      children: [
        { title: "Smart Mapping", desc: "One control, many frameworks.", icon: <Layers /> },
        { title: "Audit Dashboards", desc: "Direct auditor access.", icon: <BarChart /> },
        { title: "Task Automation", desc: "Zero-touch workflows.", icon: <Zap /> },
      ],
    },
    {
      label: "Company",
      children: [
        { title: "About", desc: "Our mission.", icon: <ShieldCheck /> },
        { title: "Contact Us", desc: "Get in touch.", icon: <MessageSquare /> },
        { title: "Partners", desc: "Join our ecosystem.", icon: <Briefcase /> },
        { title: "Terms", desc: "Legal docs.", icon: <Terminal /> },
      ],
    },
  ];

  const handleNavigation = (label, title) => {
    const path = createSlug(label, title);
    navigate(path);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100/50 transition-all duration-300">
      <div className="max-w-360 mx-auto px-12 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 font-black text-2xl tracking-tighter cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="p-1.5 rounded-xl bg-[#6A5AFF] text-white shadow-lg shadow-[#6A5AFF]/20 transition-transform group-hover:rotate-6">
            <ShieldCheck size={28} />
          </div>
          <span className="text-slate-950">Capable</span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative h-20 flex items-center"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 text-[15px] font-bold px-4 py-2 rounded-full transition-all ${
                  activeDropdown === idx ? "text-[#6A5AFF] bg-[#6A5AFF]/5" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === idx ? "rotate-180" : ""}`} />
              </button>

              {/* DROPDOWN MENU */}
              {activeDropdown === idx && (
                <div className={`absolute top-[80%] pt-2 z-50 ${item.isMega ? "-left-60 w-225" : "left-0 w-80"}`}>
                  <div className="bg-white border border-slate-100 shadow-[0px_30px_90px_rgba(0,0,0,0.1)] rounded-4xl overflow-hidden p-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    {item.isMega ? (
                      <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                         <div className="col-span-3 mb-6 px-4 flex items-center justify-between">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Supported Frameworks</h4>
                            <div className="h-px flex-1 mx-6 bg-slate-100" />
                         </div>
                        {item.children.map((framework, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group/item"
                            onClick={() => handleNavigation(item.label, framework.title)}
                          >
                            <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:text-[#6A5AFF] group-hover/item:bg-[#6A5AFF]/10 transition-all border border-transparent group-hover/item:border-[#6A5AFF]/20 shadow-sm">
                              {React.cloneElement(framework.icon, { size: 20 })}
                            </div>
                            <span className="text-[13px] font-bold text-slate-700 group-hover/item:text-[#6A5AFF] transition-colors">
                              {framework.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {item.children.map((child, cIdx) => (
                          <div
                            key={cIdx}
                            onClick={() => handleNavigation(item.label, child.title)}
                            className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group/item"
                          >
                            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover/item:text-[#6A5AFF] group-hover/item:bg-[#6A5AFF]/10 transition-all border border-transparent group-hover/item:border-[#6A5AFF]/20">
                              {React.cloneElement(child.icon, { size: 20 })}
                            </div>
                            <div>
                              <div className="text-[14px] font-black text-slate-800 group-hover/item:text-[#6A5AFF] transition-colors flex items-center gap-2">
                                {child.title}
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                              </div>
                              <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-0.5">{child.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={() => navigate("/login")} className="text-sm font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
            Login
          </button>
          <button
            onClick={() => navigate("/request-demo")}
            className="px-8 py-3.5 rounded-full text-sm font-black text-white shadow-xl transition-all hover:scale-105 active:scale-95 shadow-[#6A5AFF]/20"
            style={{ backgroundColor: themeColor }}
          >
            Request a demo
          </button>
        </div>

        {/* MOBILE TRIGGER */}
        <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 bg-white z-100 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto`}>
        <div className="p-8 pb-20">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter" style={{ color: themeColor }} onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }}>
              <ShieldCheck size={32} />
              <span className="text-slate-900 uppercase">Capable</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-50 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-12">
            {navItems.map((item, idx) => (
              <div key={idx}>
                <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-300 mb-6">{item.label}</h4>
                <div className="grid gap-6">
                  {item.children.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 cursor-pointer group" onClick={() => handleNavigation(item.label, c.title)}>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#6A5AFF]">{c.icon}</div>
                      <div className="text-lg font-black text-slate-800">{c.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col gap-4">
            <button onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }} className="w-full py-5 rounded-2xl border-2 border-slate-100 font-black text-slate-800 text-lg uppercase tracking-widest">Login</button>
            <button onClick={() => { navigate("/request-demo"); setIsMobileMenuOpen(false); }} className="w-full py-5 rounded-2xl text-white font-black text-lg shadow-2xl uppercase tracking-widest" style={{ backgroundColor: themeColor }}>Request Demo</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;