import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  Lock,
  Globe,
  Shield,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const themeColor = "#6A5AFF";

  // Creates clean URLs for your framework and platform pages
  const createSlug = (label, title) => {
    const cleanTitle = title
      .toLowerCase()
      .replace(/[\/:]/g, "")
      .replace(/\s+/g, "-");
    return `/${label.toLowerCase().replace(/\s+/g, "-")}/${cleanTitle}`;
  };

  const footerData = [
    {
      label: "Platform",
      links: [
        "Authentic Compliance",
        "Continuous GRC",
        "Risk Management",
        "Trust Center",
        "Personnel and Access",
      ],
    },
    {
      label: "ISO Standards",
      links: [
        "ISO/IEC 27001:2022",
        "ISO 22301:2019",
        "ISO/IEC 33001:2015",
        "ISO/IEC 42001:2023",
        "ISO 14001:2015",
        "ISO/IEC 27701:2025",
      ],
    },
    {
      label: "Global Privacy",
      links: ["GDPR", "DPDPA (India)", "PDPL", "CCPA", "HIPAA", "PCI DSS"],
    },
    {
      label: "Regulatory",
      links: [
        "SOC 1 / SOC 2 / SOC 3",
        "FedRAMP",
        "HITRUST",
        "NIST CSF",
        "CISA Assessment",
        "Cloud Security Assessments",
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-32 pb-12 font-sans relative overflow-hidden">
      {/* Background Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />

      <div className="max-w-360 mx-auto px-12 relative z-10">
        {/* TOP CTA CARD — PRETTY HOVER & MAC BUTTONS */}
        <div className="mb-32 relative group">
          <div
            className="absolute -inset-1 rounded-[3rem] blur opacity-10 group-hover:opacity-25 transition duration-1000"
            style={{ backgroundColor: themeColor }}
          />
          <div className="relative rounded-[3rem] bg-slate-900 border border-slate-800 p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl">
            {/* macOS Traffic Lights Decoration */}
            <div className="absolute top-8 left-10 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner opacity-80" />
            </div>

            <div className="max-w-2xl">
              <h3 className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter">
                Ready to scale trust?
              </h3>
              <p className="text-slate-400 text-xl leading-relaxed">
                Join leading GRC teams using Capable to manage compliance with
                expert precision and zero manual friction.
              </p>
            </div>

            <button
              onClick={() => navigate("/request-demo")}
              className="px-12 py-5 rounded-2xl font-black text-white flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl group/btn overflow-hidden relative"
              style={{ backgroundColor: themeColor }}
            >
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight
                size={22}
                className="relative z-10 group-hover/btn:translate-x-2 transition-transform"
              />
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>

        {/* MAIN LINKS GRID */}
        <div className="grid lg:grid-cols-12 gap-20 mb-28">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4">
            <div
              className="flex items-center gap-3 font-black text-3xl cursor-pointer mb-8 tracking-tighter uppercase group"
              onClick={() => navigate("/")}
            >
              <div className="p-2.5 rounded-xl bg-white text-slate-950 transition-transform group-hover:rotate-6 shadow-xl">
                <ShieldCheck
                  className="w-8 h-8"
                  style={{ color: themeColor }}
                />
              </div>
              Capable
            </div>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-sm text-justify">
              The modern compliance and trust management platform designed for
              security teams who demand accuracy and audit-readiness.
            </p>

            <div className="flex gap-4">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Mail, label: "Email" },
              ].map((social, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center hover:border-slate-500 transition-all cursor-pointer group hover:bg-slate-800"
                >
                  <social.Icon
                    size={20}
                    className="text-slate-500 group-hover:text-white transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC LINK COLUMNS */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {footerData.map((section) => (
              <div key={section.label}>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
                  {section.label}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() =>
                          navigate(createSlug(section.label, link))
                        }
                        className="text-slate-500 hover:text-white transition-all text-[14px] font-bold text-left hover:translate-x-1"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* COMPANY COLUMN (Extracted for better control) */}
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
                Company
              </h4>
              <ul className="space-y-4">
                {["About", "Contact us", "Partners", "Terms"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() =>
                        navigate(`/${link.toLowerCase().replace(/\s+/g, "-")}`)
                      }
                      className="text-slate-500 hover:text-white transition-all text-[14px] font-bold text-left hover:translate-x-1"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP — SECURITY & COPYRIGHT */}
        <div className="border-t border-slate-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-10 text-[14px] font-black uppercase tracking-widest text-slate-600">
            <button
              onClick={() => navigate("/privacy")}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="hover:text-white transition-colors"
            >
              Terms and Conditions
            </button>
            <button
              onClick={() => navigate("/security")}
              className="hover:text-white transition-colors"
            >
              Security Statement
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
              <Lock size={12} /> System Status: Optimal
            </div>

            <div className="text-[14px] font-bold text-white/80">
              © 2026 Developed By{" "}
              <a
                href="https://thinkways.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6A5AFF] hover:text-white transition-colors duration-200 underline underline-offset-4"
              >
                Thinkways.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
