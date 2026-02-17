import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Bell, User, LogOut, Settings as SettingsIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PMOSidebar from "../components/PMOSidebar";

const stripedBg = {
    background: `linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)`,
    backgroundSize: '1.5rem 1.5rem'
};

export default function PMODashboard() {
    const navigate = useNavigate();

    // Check if user is actually a PMO, redirect if not
    useEffect(() => {
        const userRole = localStorage.getItem("user_role");
        if (userRole !== "pmo") {
            navigate("/login"); // Redirect to login if not PMO
        }
    }, [navigate]);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "System",
            desc: "Welcome to PMO Dashboard",
            time: "Just now",
            type: "info",
        },
        {
            id: 2,
            title: "Alert",
            desc: "New project milestone scheduled",
            time: "2h ago",
            type: "urgent",
        },
    ]);

    const [userData] = useState({
        name: localStorage.getItem("user_name") || "PMO User",
        email: localStorage.getItem("user_email") || "abhaysharmans8397@gmail.com",
    });

    // Project team members data
    const teamMembers = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Project Lead",
            location: "Bengaluru, Karnataka",
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Technical Lead",
            location: "Bengaluru, Karnataka",
            avatar: "https://i.pravatar.cc/150?img=2"
        },
        {
            id: 3,
            name: "Emma Williams",
            role: "QA Manager",
            location: "Bengaluru, Karnataka",
            avatar: "https://i.pravatar.cc/150?img=3"
        },
        {
            id: 4,
            name: "David Brown",
            role: "Business Analyst",
            location: "Bengaluru, Karnataka",
            avatar: "https://i.pravatar.cc/150?img=4"
        },
        {
            id: 5,
            name: "Lisa Anderson",
            role: "DevOps Engineer",
            location: "Bengaluru, Karnataka",
            avatar: "https://i.pravatar.cc/150?img=5"
        }
    ];

    // Projects data
    const projects = [
        {
            id: 1,
            name: "Digital Transformation Initiative",
            status: "In Progress",
            completion: 65,
            startDate: "1st Jan, 2025",
            endDate: "30th Jun, 2025"
        },
        {
            id: 2,
            name: "Cloud Migration Project",
            status: "In Progress",
            completion: 42,
            startDate: "15th Jan, 2025",
            endDate: "15th Aug, 2025"
        },
        {
            id: 3,
            name: "Security Enhancement",
            status: "Planning",
            completion: 25,
            startDate: "1st Feb, 2025",
            endDate: "30th Apr, 2025"
        }
    ];

    // Get visible team members for carousel (3 at a time)
    const visibleTeamMembers = [
        teamMembers[currentSlide % teamMembers.length],
        teamMembers[(currentSlide + 1) % teamMembers.length],
        teamMembers[(currentSlide + 2) % teamMembers.length]
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="flex min-h-screen w-full bg-[#F3F4F9] font-sans text-[#1F2937]">
            <PMOSidebar />

            <main className="flex-1 px-4 py-24 md:px-10 md:py-8 lg:py-10 max-w-7xl mx-auto overflow-x-hidden">
                <header className="flex justify-between items-center mb-8 pb-6 border-b border-blue-500">
                    <div className="flex flex-col text-left">
                        <h2 className="text-2xl font-black text-[#111827] tracking-tight">Overview</h2>
                        <p className="text-xs text-gray-500 font-medium md:hidden">Welcome, {userData.name}</p>
                    </div>

                    <div className="flex gap-3 relative">
                        <div className="relative">
                            <button
                                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all relative ${showNotifications ? "bg-[#6A5AFF] text-white border-[#6A5AFF]" : "bg-white text-gray-400 border-gray-100 shadow-sm hover:text-[#6A5AFF]"}`}
                            >
                                <Bell size={18} />
                                {notifications.length > 0 && (
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                                )}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <>
                                        <div className="fixed inset-0 z-90" onClick={() => setShowNotifications(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-100"
                                        >
                                            <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                                <h4 className="font-bold text-sm text-gray-800">Activity Log</h4>
                                                <button onClick={() => setNotifications([])} className="text-[10px] font-bold text-rose-500 hover:underline">Clear</button>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-10 text-center text-gray-400 text-xs">No new activities</div>
                                                ) : (
                                                    notifications.map((n) => (
                                                        <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 text-left">
                                                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.type === "urgent" ? "bg-rose-500" : "bg-[#6A5AFF]"}`} />
                                                            <div>
                                                                <div className="flex justify-between items-center w-full gap-10">
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{n.title}</span>
                                                                    <span className="text-[9px] text-gray-300 font-medium whitespace-nowrap">{n.time}</span>
                                                                </div>
                                                                <p className="text-xs text-gray-600 font-medium leading-snug">{n.desc}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                                className="w-10 h-10 bg-[#6A5AFF] rounded-xl flex items-center justify-center text-white shadow-md hover:bg-[#5D45FD] transition-all"
                            >
                                <User size={18} />
                            </button>
                            <AnimatePresence>
                                {showProfileMenu && (
                                    <>
                                        <div className="fixed inset-0 z-90" onClick={() => setShowProfileMenu(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-gray-50 py-3 z-100"
                                        >
                                            <div className="px-4 pb-3 border-b border-gray-50 mb-2 text-left">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged in as</p>
                                                <p className="text-sm font-bold text-gray-800 truncate">{userData.name}</p>
                                            </div>
                                            <button
                                                onClick={() => { navigate("/pmo/settings"); setShowProfileMenu(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left"
                                            >
                                                <SettingsIcon size={16} /> Account Settings
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 font-semibold transition-colors text-left"
                                            >
                                                <LogOut size={16} /> Sign Out
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-linear-to-r from-[#6A5AFF] to-[#8B7AFF] rounded-4xl p-10 text-white shadow-xl mb-10 relative overflow-hidden"
                >
                    <div className="relative z-10 text-left">
                        <p className="text-[11px] font-black uppercase opacity-70 tracking-[0.2em]">WELCOME TO CAPABLE</p>
                        <h3 className="text-3xl font-bold mt-2 mb-2 tracking-tight">Good Afternoon, {userData.name}</h3>
                        <p className="text-sm text-indigo-100 max-w-3xl font-medium">
                            Manage your projects, track team progress, and ensure timely delivery with our comprehensive PMO dashboard.
                        </p>
                    </div>
                    <div className="absolute -left-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                </motion.div>

                {/* Ongoing Projects Section */}
                <div className="space-y-6">
                    <div className="text-left">
                        <h3 className="text-xl font-black text-slate-800 mb-1">Team Members</h3>
                        <p className="text-sm text-slate-500">View your project team and their roles.</p>
                    </div>

                    {/* Team Members Carousel */}
                    <div className="relative">
                        <div className="flex items-center gap-4">
                            {visibleTeamMembers.map((member, index) => (
                                <motion.div
                                    key={`${member.id}-${currentSlide}`}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex-1"
                                >
                                    <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#6A5AFF] transition-all hover:shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-16 rounded-full overflow-hidden bg-linear-to-br from-cyan-400 to-blue-500 shrink-0">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <h4 className="font-black text-slate-800 text-sm mb-0.5 truncate">
                                                    {member.name}
                                                </h4>
                                                <p className="text-xs text-slate-500 font-medium truncate">
                                                    {member.role}
                                                </p>
                                                <p className="text-xs text-slate-400 font-medium truncate">
                                                    {member.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Navigation Arrow */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextSlide}
                                className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-[#6A5AFF] to-[#5A4AEF] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                            >
                                <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search here with project name, team member or status"
                            className="w-full px-6 py-4 pr-16 rounded-2xl border-2 border-gray-200 focus:border-[#6A5AFF] focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-slate-800 text-sm"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-linear-to-br from-[#6A5AFF] to-[#5A4AEF] text-white flex items-center justify-center shadow-lg"
                        >
                            <Search size={20} />
                        </motion.button>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#6A5AFF] transition-all hover:shadow-xl group"
                            >
                                {/* Card Content */}
                                <div className="p-6">
                                    <h4 className="text-lg font-black text-slate-800 mb-6">
                                        {project.name}
                                    </h4>

                                    {/* Status and Progress */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-start gap-4">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                                    Status
                                                </p>
                                                <p className="text-base font-black text-slate-700">
                                                    {project.status}
                                                </p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                                    Completion
                                                </p>
                                                <div className="h-10 bg-[#F1F4F9] rounded-xl overflow-hidden flex relative">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${project.completion}%` }}
                                                        transition={{ duration: 1, delay: index * 0.2 }}
                                                        className="h-full bg-linear-to-r from-[#FFBD69] to-[#FFA940] flex items-center justify-center text-xs font-black text-white z-10 rounded-xl"
                                                    >
                                                        {project.completion}%
                                                    </motion.div>
                                                    <div className="flex-1 opacity-20" style={stripedBg} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dates and Arrow */}
                                    <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                                        <div className="flex gap-6">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                                    Start Date
                                                </p>
                                                <p className="text-xs font-black text-slate-800">
                                                    {project.startDate}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                                    End Date
                                                </p>
                                                <p className="text-xs font-black text-slate-800">
                                                    {project.endDate}
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: -45 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-12 h-12 rounded-full bg-linear-to-br from-[#6A5AFF] to-[#5A4AEF] text-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all"
                                        >
                                            <ArrowRight size={20} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
