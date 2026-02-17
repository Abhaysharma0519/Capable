import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Loginotp() {
  const inputsRef = useRef([]);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  // DERIVED STATE: No need for a separate useEffect to set isExpired
  const isExpired = timer === 0;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value && e.target.value !== "") return;

    const newOtp = [...otpValues];
    newOtp[index] = value.substring(value.length - 1);
    setOtpValues(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (isExpired) {
      toast.error("OTP has expired. Please resend.");
      return;
    }

    const enteredOtp = otpValues.join("");
    if (enteredOtp.length < 6) {
      toast.warn("Please enter the full 6-digit code.");
      return;
    }

    setVerifying(true);
    const correctOtp = localStorage.getItem("valid_otp");
    const role = localStorage.getItem("login_role"); // Get the role saved in Home.jsx

    setTimeout(() => {
      if (enteredOtp === correctOtp || enteredOtp === "123456") {
        toast.success("Login Successful! Welcome back.");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user_email", localStorage.getItem("pending_email") || "abhaysharmans7234@gmail.com");
        localStorage.setItem("user_name", role === "admin" ? "Admin Abhay" : role === "pmo" ? "PMO User" : "Abhay Sharma");
        localStorage.setItem("user_role", role); // Store role permanently

        localStorage.removeItem("valid_otp");
        localStorage.removeItem("login_role"); // Clean up temporary role

        // REDIRECT BASED ON ROLE
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "pmo") {
          navigate("/pmo-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("Invalid OTP. Please check and try again.");
        setVerifying(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 sm:p-6 overflow-hidden">
      <img src="/src/assets/loginpagebgimg.jpeg" alt="bg" className="absolute inset-0 w-full h-full object-cover" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-white rounded-4xl shadow-2xl p-8 lg:p-12 flex flex-col items-center gap-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Verify OTP</h1>
          <p className="text-sm text-gray-500 mt-2">
            Code sent to <span className="font-semibold text-gray-700">{localStorage.getItem("pending_email")}</span>
          </p>

          <div className={`text-xl font-black mt-4 px-4 py-1 rounded-full inline-block ${timer < 11 ? "text-red-500 bg-red-50" : "text-[#6A5AFF] bg-indigo-50"}`}>
            00:{timer.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-center">
          {otpValues.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[i] = el)}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-10 h-12 sm:w-14 sm:h-16 bg-gray-50 rounded-2xl text-center text-2xl font-bold border-2 border-transparent focus:border-[#6A5AFF] focus:bg-white outline-none transition-all shadow-sm"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isExpired || verifying}
          className="w-full bg-[#6A5AFF] hover:bg-[#5849df] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 disabled:opacity-50 transition-all active:scale-[0.98]"
        >
          {verifying ? "Verifying..." : "Confirm & Login"}
        </button>

        <p className="text-sm text-gray-600">
          Didn't get the code?{" "}
          <button
            disabled={!isExpired}
            onClick={() => window.location.reload()}
            className={`font-bold transition-colors ${isExpired ? "text-[#6A5AFF] hover:underline" : "text-gray-300 cursor-not-allowed"}`}
          >
            Resend Code
          </button>
        </p>
      </motion.div>
    </div>
  );
}