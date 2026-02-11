import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const themeColor = "#6A5AFF";

  const createSlug = (label, title) => {
    const cleanTitle = title
      .toLowerCase()
      .replace(/[\/:]/g, "")
      .replace(/\s+/g, "-");
    return `/${label.toLowerCase()}/${cleanTitle}`;
  };

  const footerData = [
    {
      label: "Platform",
      links: [
        "Authentic Compliance",
        "Continuous GRC",
        "Risk Management",
        "Risk Management",
        "Trust Center",
        "Personnel and Access",
      ],
    },
    {
      label: "Frameworks",
      links: [
        "ISO/IEC 27001:2022",
        "ISO 22301:2019",
        "ISO/IEC 33001:2015",
        "ISO/IEC 42001:2023",
        "ISO 14001:2015",
        "ISO/IEC 27701:2025",

        "GDPR",
        "DPDPA",
        "PDPL",
        "CCPA",],
    },
    {
      links: [
        "HIPAA",
        "PCI DSS",

        "SOC1/SOC2/SOC3",
        "FedRAMP",
        "HITRUST",
        "NIST CSF",
        "CISA Assessment",
        "CSA",
      ],
    },
    {
      label: "Company",
      links: ["About", "Contact us", "Partners", "Terms"],
    },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Top CTA Strip */}
      <div className="w-full px-16 xl:px-12 mb-20">
        <div className="rounded-3xl bg-slate-900 border border-[#F0f4ff] p-10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          <div>
            <h3 className="text-3xl font-bold mb-2">Ready to scale trust?</h3>
            <p className="text-white/70 max-w-md">
              Join teams using Capable to simplify compliance and prove
              security.
            </p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 hover:scale-105 transition-all"
            style={{ backgroundColor: themeColor }}
          >
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="w-full px-16 xl:px-12">
        {/* Brand Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          <div className="max-w-sm">
            <div
              className="flex items-center gap-3 font-bold text-4xl cursor-pointer mb-6"
              onClick={() => navigate("/")}
            >
              <div className="p-2 rounded-xl bg-white text-[#6A5AFF]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              Capable
            </div>
            <p className="text-slate-400 leading-relaxed text-justify">
              The modern compliance and trust management platform helping
              organizations stay audit-ready and security-first.
            </p>

            <div className="flex gap-4 mt-6">
              {[Linkedin, Twitter, Mail].map((Icon, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-800 rounded-full hover:bg-white hover:text-[#6A5AFF] transition-all cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-14 gap-y-10 flex-1">
            {footerData.map((section) => (
              <div key={section.label}>
                <h4 className="text-xl uppercase tracking-widest text-white mb-6 font-semibold">
                  {section.label}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() =>
                          navigate(createSlug(section.label, link))
                        }
                        className="text-slate-400 hover:text-white transition-all text-sm hover:translate-x-1"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-[#F0f4ff] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-300">
          <div className="flex gap-8">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-white"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="hover:text-white"
            >
              Terms
            </button>
            <button
              onClick={() => navigate("/security")}
              className="hover:text-white"
            >
              Security
            </button>
          </div>
          <div>© 2026 Capable. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
