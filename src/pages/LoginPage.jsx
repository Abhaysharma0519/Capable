import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { motion as Motion } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  Lock,
  Globe,
  Cpu,
  Users,
} from "lucide-react";

const LoginPage = () => {
  const hudNodes = [
    { icon: <ShieldCheck size={20} /> },
    { icon: <Activity size={20} /> },
    { icon: <Lock size={20} /> },
    { icon: <Globe size={20} /> },
    { icon: <Cpu size={20} /> },
    { icon: <Users size={20} /> },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const USER_EMAIL = "abhaysharmans7234@gmail.com";
  const ADMIN_EMAIL = "abhaysharmans9148@gmail.com";
  const ADMIN_PWD = "Imking@2001";
  const PMO_EMAIL = "abhaysharmans8397@gmail.com";
  const PMO_PWD = "Imking@2001";

  const handleLogin = async (e) => {
    e.preventDefault();

    const isAdmin = email === ADMIN_EMAIL && password === ADMIN_PWD;
    const isUser = email === USER_EMAIL;
    const isPmo = email === PMO_EMAIL && password === PMO_PWD;

    if (!isAdmin && !isUser && !isPmo) {
      toast.error("Invalid credentials or Email not registered.");
      return;
    }

    setLoading(true);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

    if (!serviceId || !templateId || !publicKey) {
      toast.warn("System configuration error.");
      setLoading(false);
      return;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("valid_otp", generatedOtp);
    localStorage.setItem("pending_email", email);
    localStorage.setItem("login_role", isAdmin ? "admin" : isPmo ? "pmo" : "user");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: email,
          otp_code: generatedOtp,
          user_name: isAdmin ? "Admin" : isPmo ? "PMO" : "Abhay Sharma",
        },
        publicKey,
      );
      toast.success(`OTP sent to ${email}`);
      navigate("/otp");
    } catch {
      toast.info("Proceeding to verification.");
      navigate("/otp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] bg-white overflow-hidden">
      {/* LEFT — SECURITY HUD */}
      <div className="relative hidden lg:flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(#6A5AFF_1px,transparent_1px),linear-gradient(90deg,#6A5AFF_1px,transparent_1px)] bg-size-[60px_60px]" />
        </div>

        {/* Concentric Rings - Responsive sizing */}
        {[1, 2, 3].map((r) => (
          <Motion.div
            key={r}
            className="absolute rounded-full border border-[#6A5AFF]/10"
            style={{
              width: `${Math.min(600 + r * 120, 90)}%`,
              aspectRatio: "1/1",
              maxWidth: `${600 + r * 120}px`,
            }}
            animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 80 + r * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Radar Sweep Beam */}
        <Motion.div
          className="absolute w-[90%] max-w-175 aspect-square rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(106,90,255,0.35), transparent 40%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Moving Radar Sweep */}
        <Motion.div
          className="absolute w-[95%] max-w-225 aspect-square rounded-full border border-[#6A5AFF]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <Motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#6A5AFF] rounded-full"
            initial={{
              x: Math.random() * 1000 - 500,
              y: Math.random() * 800 - 400,
              opacity: 0.2,
            }}
            animate={{
              y: [null, Math.random() * 800 - 400],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating Data Cards */}
        {["ISO 27001", "SOC 2", "GDPR", "HIPAA"].map((txt, i) => (
          <Motion.div
            key={i}
            className="absolute bg-slate-900/80 backdrop-blur border border-slate-700 text-xs text-slate-300 px-4 py-2 rounded-xl shadow-xl z-20"
            style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 5}%`,
            }}
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {txt}
          </Motion.div>
        ))}

        {/* Glow Effects */}
        <div className="absolute w-[60%] max-w-175 aspect-square bg-[#6A5AFF]/20 blur-[140px] rounded-full" />
        <div className="absolute w-[80%] max-w-225 aspect-square bg-indigo-500/10 blur-[180px] rounded-full" />
        
        <img
          src="/src/assets/temporarylogo.svg"
          alt="logo-bg"
          className="absolute opacity-[0.03] w-full max-w-125 pointer-events-none"
        />

        {/* HUD Center Content */}
        <div className="relative flex items-center justify-center w-full h-full scale-[0.7] md:scale-90 xl:scale-100 2xl:scale-125">
          <Motion.div
            className="absolute w-130 h-130 border border-dashed border-slate-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          <Motion.div
            className="absolute w-95 h-95 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {hudNodes.map((node, i) => (
              <div
                key={i}
                className="absolute p-3 bg-slate-900 border border-slate-700 shadow-xl rounded-xl text-[#6A5AFF]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-190px) rotate(${-i * 60}deg)`,
                }}
              >
                {node.icon}
              </div>
            ))}
          </Motion.div>

          <Motion.div
            className="relative w-55 h-55 bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center shadow-[0_0_80px_rgba(106,90,255,0.25)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Motion.div
              className="absolute inset-3 border-t-2 border-[#6A5AFF] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="z-10 bg-[#6A5AFF]/10 p-8 rounded-full border border-[#6A5AFF]/30 flex items-center justify-center">
              <img
                src="/src/assets/temporarylogo.svg"
                alt="Capable Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            <div className="absolute -top-12 -right-10 bg-slate-900/90 backdrop-blur p-3 rounded-xl border border-slate-700 text-xs">
              <div className="text-slate-400">SYSTEM</div>
              <div className="text-green-400 font-bold">SECURE</div>
            </div>
          </Motion.div>
        </div>
      </div>

      {/* RIGHT — LOGIN FORM */}
      <div className="flex items-center justify-center p-6 md:p-10 bg-white overflow-y-auto min-h-screen">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 my-auto"
        >
          <div className="flex flex-col gap-6">
            <img
              src="/src/assets/temporarylogo.svg"
              alt="Logo"
              className="h-10 w-fit"
            />
            <h2 className="text-3xl font-bold text-slate-900">
              Login to Capable
            </h2>
            <p className="text-slate-500 text-sm">
              Secure access to your compliance workspace
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Work email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-50 border border-slate-200 px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#6A5AFF] w-full"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-50 border border-slate-200 px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#6A5AFF] w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6A5AFF] text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:brightness-110 transition-all"
            >
              {loading ? "Sending OTP..." : "Login"}
            </button>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-center text-[#6A5AFF] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;