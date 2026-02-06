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
  BookOpen,
  Activity,
  Lock,
  CheckCircle,
  Layers,
  MessageSquare,
  Briefcase,
  Zap,
  BarChart,
  FileText,
  Megaphone,
  Terminal,
  ShieldAlert,
  Fingerprint,
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const themeColor = "#6A5AFF";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ✅ Working slug mapper
  const createSlug = (label, title) => {
    const key = `${label}|${title}`;
    const routes = {
      "Platform|Authentic Compliance": "/platform/authentic-compliance",
      "Platform|Continuous GRC": "/platform/continuous-grc",
      "Platform|Third Party Risk": "/platform/third-party-risk",
      "Platform|Risk Management": "/platform/risk-management",
      "Platform|Trust Center": "/platform/trust-center",
      "Platform|Personnel & Access": "/platform/personnel-access",

      "Features|AI Evidence Collector": "/features/ai-evidence-collector",
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
        {
          title: "Authentic Compliance",
          desc: "Verifiable, real-time proof of security.",
          icon: <Shield className="w-5 h-5" />,
        },
        {
          title: "Continuous GRC",
          desc: "Governance, Risk, and Compliance at scale.",
          icon: <Activity className="w-5 h-5" />,
        },
        {
          title: "Third Party Risk",
          desc: "Assess and manage vendor vulnerabilities.",
          icon: <Users className="w-5 h-5" />,
        },
        {
          title: "Risk Management",
          desc: "Identify threats before they become issues.",
          icon: <ShieldAlert className="w-5 h-5" />,
        },
        {
          title: "Trust Center",
          desc: "Publicly showcase your security posture.",
          icon: <Globe className="w-5 h-5" />,
        },
        {
          title: "Personnel & Access",
          desc: "Manage identity and access controls.",
          icon: <Fingerprint className="w-5 h-5" />,
        },
      ],
    },
    {
      label: "Frameworks",
      isMega: true,
      children: [
        { title: "ISO/IEC 27001:2022", icon: <Shield className="w-5 h-5" /> },
        { title: "ISO 22301:2019", icon: <Shield className="w-5 h-5" /> },
        { title: "ISO/IEC 33001:2015", icon: <Shield className="w-5 h-5" /> },
        { title: "ISO/IEC 42001:2023", icon: <Shield className="w-5 h-5" /> },
        { title: "ISO 14001:2015", icon: <Shield className="w-5 h-5" /> },
        { title: "ISO/IEC 27701:2025", icon: <Shield className="w-5 h-5" /> },
        { title: "GDPR", icon: <Lock className="w-5 h-5" /> },
        { title: "DPDPA", icon: <Lock className="w-5 h-5" /> },
        { title: "PDPL", icon: <Lock className="w-5 h-5" /> },
        { title: "HIPAA", icon: <Lock className="w-5 h-5" /> },
        { title: "PCI DSS", icon: <Lock className="w-5 h-5" /> },
        { title: "CCPA", icon: <Lock className="w-5 h-5" /> },
        { title: "SOC1/SOC2/SOC3", icon: <CheckCircle className="w-5 h-5" /> },
        { title: "FedRAMP", icon: <CheckCircle className="w-5 h-5" /> },
        { title: "HITRUST", icon: <CheckCircle className="w-5 h-5" /> },
        { title: "NIST CSF", icon: <CheckCircle className="w-5 h-5" /> },
        { title: "CISA Assessment", icon: <CheckCircle className="w-5 h-5" /> },
        {
          title: "Cloud Security Assessments",
          icon: <CheckCircle className="w-5 h-5" />,
        },
      ],
    },
    {
      label: "Features",
      children: [
        {
          title: "AI Evidence Collector",
          desc: "Automate logs and screenshots.",
          icon: <Cpu className="w-5 h-5" />,
        },
        {
          title: "Smart Mapping",
          desc: "One control to multiple frameworks.",
          icon: <Layers className="w-5 h-5" />,
        },
        {
          title: "Audit Dashboards",
          desc: "Direct access portal for auditors.",
          icon: <BarChart className="w-5 h-5" />,
        },
        {
          title: "Task Automation",
          desc: "Zero-touch compliance workflows.",
          icon: <Zap className="w-5 h-5" />,
        },
      ],
    },
    {
      label: "Company",
      children: [
        {
          title: "About",
          desc: "Our mission and team.",
          icon: <ShieldCheck className="w-5 h-5" />,
        },
        {
          title: "Contact Us",
          desc: "Get in touch with support.",
          icon: <MessageSquare className="w-5 h-5" />,
        },
        {
          title: "Partners",
          desc: "Join our ecosystem.",
          icon: <Briefcase className="w-5 h-5" />,
        },
        {
          title: "Terms",
          desc: "Legal & Privacy documents.",
          icon: <Terminal className="w-5 h-5" />,
        },
      ],
    },
  ];

  const handleNavigation = (label, title) => {
    const path = createSlug(label, title);
    navigate(path);
    setIsMobileMenuOpen(false); // Ensure menu closes on mobile
    setActiveDropdown(null); // Ensure dropdown closes on desktop click
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 font-sans">
      <div className="max-w-360 mx-auto px-12 h-25 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer group"
          style={{ color: themeColor }}
          onClick={() => navigate("/")}
        >
          <div className="p-1.5 rounded-lg bg-[#6A5AFF]/10 group-hover:bg-[#6A5AFF]/20 transition-colors">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <span className="text-slate-900 group-hover:text-[#6A5AFF] transition-colors">
            Capable
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-2 h-full">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 text-[16px] font-semibold transition-all px-4 py-2 rounded-full ${activeDropdown === idx ? "text-[#6A5AFF] bg-slate-50" : "text-black hover:text-[#6A5AFF]"}`}
              >
                {item.label}
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-100 ${activeDropdown === idx ? "rotate-180" : ""}`}
                />
              </button>

              {/* DROPDOWN BOX */}
              {activeDropdown === idx && (
                <div
                  className={`absolute top-[80%] pt-4 z-50 ${item.isMega ? "-left-50 w-225" : "left-0 w-85"}`}
                >
                  <div className="bg-white border border-slate-100 shadow-[0px_25px_60px_rgba(0,0,0,0.12)] rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.isMega ? (
                      <div className="p-8 bg-white">
                        <h4 className="text-[11px] uppercase tracking-widest font-extrabold text-slate-400 mb-8 px-4">
                          Frameworks
                        </h4>
                        <div className="grid grid-cols-3 gap-y-2 gap-x-4">
                          {item.children.map((framework, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group/item"
                              onClick={() =>
                                handleNavigation(item.label, framework.title)
                              }
                            >
                              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover/item:text-[#6A5AFF] group-hover/item:bg-[#6A5AFF]/10 transition-all shadow-sm">
                                {framework.icon}
                              </div>
                              <span className="text-[14px] font-bold text-slate-800 group-hover/item:text-[#6A5AFF] transition-colors">
                                {framework.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 grid gap-1">
                        {item.children.map((child, cIdx) => (
                          <div
                            key={cIdx}
                            onClick={() =>
                              handleNavigation(item.label, child.title)
                            }
                            className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group/item"
                          >
                            <div className="mt-0.5 p-2 rounded-xl bg-slate-50 text-slate-400 group-hover/item:text-[#6A5AFF] group-hover/item:bg-[#6A5AFF]/10 transition-colors shadow-sm">
                              {child.icon}
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-slate-800 group-hover/item:text-[#6A5AFF] transition-colors">
                                {child.title}
                              </div>
                              {child.desc && (
                                <div className="text-[12px] text-slate-500 leading-relaxed mt-0.5">
                                  {child.desc}
                                </div>
                              )}
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

        {/* AUTH */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-bold text-slate-600 hover:text-[#6A5AFF] transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-white px-7 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-[#6A5AFF]/20 hover:shadow-[#6A5AFF]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            style={{ backgroundColor: themeColor }}
          >
            Get Started
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-white z-60 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto`}
      >
        <div className="p-8 flex flex-col min-h-full">
          <div className="flex justify-between items-center mb-12">
            <div
              className="flex items-center gap-2 font-bold text-2xl cursor-pointer"
              style={{ color: themeColor }}
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            >
              <ShieldCheck className="w-8 h-8" />
              <span className="text-slate-900">Capable</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-10">
            {navItems.map((item, idx) => (
              <div key={idx}>
                <div className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-300 mb-5">
                  {item.label}
                </div>
                <div className="grid grid-cols-1 gap-6 pl-2">
                  {item.children.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => handleNavigation(item.label, c.title)}
                    >
                      <div className="text-[#6A5AFF]">{c.icon}</div>
                      <div className="text-lg font-bold text-slate-800">
                        {c.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col gap-4 pb-10">
            <button
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-4 rounded-2xl border border-slate-200 font-bold text-slate-800"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-4 rounded-2xl text-white font-bold shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
