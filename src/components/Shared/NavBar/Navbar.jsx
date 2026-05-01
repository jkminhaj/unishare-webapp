import { useContext, useState, useRef, useEffect } from "react";
import { FaUser, FaQuestion, FaBookOpen, FaUsers } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoBellFill } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
import { FaRegFilePdf, FaGraduationCap, FaOrcid } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalProvider";
import extractUser from "../../../Helper/ExtractUser";
import { FaAngleRight } from "react-icons/fa";



const Navbar = () => {
    const navigate = useNavigate();
    const { log_out, user, breadcrumb } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSignOut = () => {
        setLoading(true);
        log_out();
        setLoading(false);
        navigate("/login");
        localStorage.removeItem("user");
    };

    function isUniName(str) {
        return /\d/.test(str);
    }

    const displayName = user?.displayName
        ? isUniName(user.displayName)
            ? extractUser(user.displayName).nickName
            : user.displayName
        : "Demo User";


    // Extract student ID / roll from displayName if it contains digits
    const studentId = user?.displayName && isUniName(user.displayName)
        ? extractUser(user.displayName)?.id || "N/A"
        : null;

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="py-2 fixed top-0 z-50 w-full bg-[#1d2733] text-gray-800 shadow-gray-50-200 mb-4 shadow-xl border-b border-[#9999990c]">
            <div className="w-11/12 md:w-10/12 mx-auto flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <NavLink to="/" className="text-2xl hover:underline text-white  tracking-wide">
                        Uni Share
                    </NavLink>
                    {/* <FaAngleRight className="text-white"/>
                    <NavLink to="/#" className="text-sm hover:underline text-gray-400">
                        Java Materials
                    </NavLink>
                    <FaAngleRight className="text-white"/>
                    <NavLink to="/#" className="text-sm hover:underline text-gray-400">
                        OOP Concepts
                    </NavLink> */}
                </div>

                
                {/* Breadcrumb bar */}
                {breadcrumb.length > 0 && (
                    <div className="w-11/12 md:w-10/12 mx-auto flex items-center gap-1 pt-1 pb-0.5 text-xs text-gray-400 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        
                        {breadcrumb.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-1">
                                {i > 0 && <span className="text-gray-600 select-none">›</span>}
                                {i < breadcrumb.length - 1 ? (
                                    <span
                                        onClick={() => navigate(crumb.path)}
                                        className="cursor-pointer hover:text-[#2399f0] transition-colors"
                                    >
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <span className="text-white font-medium truncate max-w-[180px]">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </div>
                )}

                {/* Right section */}
                <div className="flex items-center gap-3">

                    {/* Search */}
                    {/* <div className="flex bg-[#131920] flex-row-reverse items-center rounded-2xl py-2 pl-2 pr-2 md:pr-4">
                        <FiSearch className="text-xl text-gray-400" />
                        <input
                            type="text"
                            className="outline-none bg-[#131920] text-white px-2 hidden md:block"
                            placeholder="Search materials"
                        />
                    </div> */}

                    {/* Question Bank */}
                    <div
                        onClick={() => navigate("/questionBank")}
                        className="bg-[#2399f0] cursor-pointer flex items-center rounded-2xl p-2"
                        title="Question Bank"
                    >
                        <FaQuestion className="text-xl text-white" />
                    </div>

                    {/* Notifications */}
                    <div className="bg-[#2399f0] flex items-center rounded-2xl p-2" title="Notifications">
                        <GoBellFill className="text-xl text-white" />
                    </div>

                    {/* User Dropdown */}
                    {user && (
                        <div className="relative" ref={dropdownRef}>
                            {/* Avatar Button */}
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-2 rounded-2xl hover:bg-[#ffffff10] px-2 py-1 transition"
                            >
                                <div className="w-9 h-9 rounded-xl overflow-hidden ">
                                    {user?.photoURL ? (
                                        <img
                                            referrerPolicy="no-referrer"
                                            alt={user?.displayName || "User"}
                                            src={user.photoURL}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="bg-gray-600 w-full h-full flex items-center justify-center">
                                            <FaUser className="text-gray-300 text-sm" />
                                        </div>
                                    )}
                                </div>
                                {/* Name visible on md+ */}
                                <span className="text-white text-sm font-medium hidden md:block max-w-[100px] truncate">
                                    {displayName}
                                </span>
                                {/* Chevron */}
                                <svg
                                    className={`w-3 h-3 text-gray-400 transition-transform hidden md:block ${dropdownOpen ? "rotate-180" : ""}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Panel */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-60 rounded-2xl overflow-hidden shadow-2xl border border-[#ffffff12] bg-[#1a2332] animate-fadeIn z-50">

                                    {/* User Info Header */}
                                    <div className="px-4 pt-4 pb-3 border-b border-[#ffffff10]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                                                {user?.photoURL ? (
                                                    <img
                                                        referrerPolicy="no-referrer"
                                                        src={user.photoURL}
                                                        alt={displayName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="bg-gray-600 w-full h-full flex items-center justify-center">
                                                        <FaUser className="text-gray-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Signed in as</p>
                                                <p className="text-white font-semibold text-sm truncate">{displayName}</p>
                                            </div>
                                        </div>

                                        {/* Role & Student ID badges */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="flex items-center gap-1 bg-[#2399f015] border border-[#2399f030] text-[#2399f0] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                                                <FaGraduationCap className="text-xs" />
                                                Student
                                            </span>
                                            {studentId && (
                                                <span className="flex items-center gap-1 bg-[#ffffff08] border border-[#ffffff15] text-gray-300 text-[11px] font-medium px-2 py-0.5 rounded-full">
                                                    <FaOrcid className="text-xs" />
                                                    {studentId}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2 px-2">
                                        <MenuItem
                                            icon={<FaUsers />}
                                            label="Users"
                                            onClick={() => { navigate("/users"); setDropdownOpen(false); }}
                                        />

                                        {/* <MenuItem
                                            icon={<FaQuestion />}
                                            label="Question Bank"
                                            onClick={() => { navigate("/questionBank"); setDropdownOpen(false); }}
                                        /> */}
                                        <MenuItem
                                            icon={<FaRegFilePdf />}
                                            label="Cover Generator"
                                            onClick={() => { navigate("/cover-generator"); setDropdownOpen(false); }}
                                        />
                                    </div>

                                    {/* Logout */}
                                    <div className="border-t border-[#ffffff10] px-2 py-2">
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-[#ff444415] transition text-sm font-medium"
                                        >
                                            <TbLogout2 className="text-base" />
                                            {loading ? "Signing out..." : "Logout"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Fade-in keyframe — add to your global CSS or tailwind config instead */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.18s ease; }
            `}</style>
        </div>
    );
};

/* Reusable menu item */
const MenuItem = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-300 hover:bg-[#2399f015] hover:text-[#2399f0] transition text-sm font-medium group"
    >
        <span className="text-base text-gray-400 group-hover:text-[#2399f0] transition">{icon}</span>
        {label}
    </button>
);

export default Navbar;
