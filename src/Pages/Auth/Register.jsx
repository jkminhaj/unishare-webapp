import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdErrorOutline, MdOutlineFacebook } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalProvider";
import toast, { Toaster } from "react-hot-toast";
import MetaData from "../../config/MetaData";
import axiosInstance from "../../config/axiosIntance";


const Register = () => {
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const { connect_google } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(false);
    const from = location.state?.from || "/";
    const timeoutRef = useRef(null);

    const handleFacebookLogin = () => {
        if (timeoutRef.current) return;
        toast("Coming soon!", {
            icon: "🌟",
            style: {
                background: "#131920",
                color: "#e2e8f0",
                fontSize: "0.85rem",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "1px solid #2a3547",
                maxWidth: "300px",
            },
            duration: 3000,
        });
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
        }, 3000);
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);

            // wait for google connection
            const result = await connect_google();
            navigate(from, { replace: true });
            console.log("Connected to google");

            const user = result.user;

            // wait for backend user creation
            await axiosInstance.post("/api/users/create", {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            });

        } catch (error) {
            if (error.message == "Firebase: Error (auth/popup-closed-by-user).") setError("Pop up closed , Please try again.")
                else setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // show loading for 2s then show google nudge
    const handleSubmit = e => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDone(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#1d2733] flex">
            <MetaData title="Unishare • Register" />

            {/* ── Left panel — desktop only ── */}
            <div className="hidden lg:flex flex-col justify-between w-[42%] bg-[#131920] p-12 border-r border-white/[0.05]">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2399f0] flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                            <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">Unishare</span>
                </div>

                {/* Center text */}
                <div>
                    <p className="text-2xl font-bold text-white leading-snug mb-3 tracking-tight">
                        The place where students<br />
                        <span className="text-[#2399f0]">share, learn, and grow.</span>
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Join thousands of students already collaborating on projects, notes, and ideas.
                    </p>
                </div>

                <p className="text-xs text-slate-700">© 2024 Unishare. All rights reserved.</p>
            </div>

            {/* ── Right panel — form ── */}
            <div className="flex-1 flex items-center justify-center p-5 sm:p-10">
                <div className="w-full max-w-[360px]">

                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-7 h-7 rounded-md bg-[#2399f0] flex items-center justify-center shrink-0">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                            </svg>
                        </div>
                        <span className="text-white font-bold tracking-tight text-sm">Unishare</span>
                    </div>

                    {/* Page heading */}
                    <div className="mb-6">
                        <h1 className="text-xl font-bold text-white tracking-tight mb-1">
                            {done ? "One more step" : "Create an account"}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {done
                                ? "We recommend signing up with Google."
                                : <>Already have one?{" "}<span onClick={() => navigate("/login")} className="text-[#2399f0] cursor-pointer hover:underline underline-offset-2">Log in</span></>
                            }
                        </p>
                    </div>

                    {/* ── Default form state ── */}
                    {!done && (
                        <>
                            <form onSubmit={handleSubmit} className="space-y-2.5 mb-5">

                                {/* Name */}
                                <div className="relative">
                                    <LuUser className="absolute left-3 top-[11px] text-slate-600 text-[13px]" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full name"
                                        required
                                        className="w-full bg-[#131920] border border-white/[0.07] focus:border-[#2399f0] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <MdOutlineEmail className="absolute left-3 top-[11px] text-slate-600 text-[13px]" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        className="w-full bg-[#131920] border border-white/[0.07] focus:border-[#2399f0] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
                                    />
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <MdLockOutline className="absolute left-3 top-[11px] text-slate-600 text-[13px]" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        className="w-full bg-[#131920] border border-white/[0.07] focus:border-[#2399f0] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
                                    />
                                </div>

                                {/* Error */}
                                {error && (
                                    <p className="flex items-center gap-1.5 text-xs text-red-400 bg-red-400/[0.07] border border-red-400/10 rounded-lg px-3 py-2">
                                        <MdErrorOutline className="shrink-0" /> {error}
                                    </p>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#2399f0] hover:bg-[#1d8add] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs" />
                                            <span className="opacity-70 text-xs">Creating account…</span>
                                        </>
                                    ) : "Register"}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-1 h-px bg-white/[0.05]" />
                                <span className="text-xs text-slate-600">or</span>
                                <div className="flex-1 h-px bg-white/[0.05]" />
                            </div>

                            {/* Social buttons */}
                            <div className="space-y-2">
                                <button
                                    disabled={loading}
                                    onClick={handleGoogleLogin}
                                    className="w-full bg-transparent border border-white/[0.07] hover:border-white/[0.13] hover:bg-white/[0.03] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl py-2.5 flex items-center justify-center gap-2.5 text-sm text-slate-400 transition-colors cursor-pointer"
                                >
                                    <FcGoogle className="text-base shrink-0" />
                                    Continue with <span className="font-medium text-slate-300">Google</span>
                                </button>

                                <button
                                    onClick={handleFacebookLogin}
                                    className="w-full bg-transparent border border-white/[0.07] hover:border-white/[0.13] hover:bg-white/[0.03] rounded-xl py-2.5 flex items-center justify-center gap-2.5 text-sm text-slate-400 transition-colors cursor-pointer"
                                >
                                    <MdOutlineFacebook className="text-base text-[#2399f0] shrink-0" />
                                    Continue with <span className="font-medium text-slate-300">Facebook</span>
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── Google nudge state ── */}
                    {done && (
                        <div className="space-y-4">
                            {/* Info card */}
                            <div className="bg-[#131920] border border-white/[0.07] rounded-xl p-4 flex gap-3 items-start">
                                <div className="w-8 h-8 rounded-lg bg-[#2399f0]/10 border border-[#2399f0]/15 flex items-center justify-center shrink-0 mt-0.5">
                                    <FcGoogle className="text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white mb-0.5">
                                        Please register with Google
                                    </p>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        We only support Google sign-up right now. It's faster and more secure.
                                    </p>
                                </div>
                            </div>

                            {/* Google CTA */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full bg-[#2399f0] hover:bg-[#1d8add] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl py-2.5 flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-xs" />
                                ) : (
                                    <>
                                        <FcGoogle className="text-base" />
                                        Continue with Google
                                    </>
                                )}
                            </button>

                            {/* Back */}
                            <button
                                onClick={() => { setDone(false); setError(false); }}
                                className="w-full text-xs text-slate-600 hover:text-slate-500 transition-colors py-1 cursor-pointer"
                            >
                                ← Go back
                            </button>
                        </div>
                    )}

                    {/* Terms */}
                    <p className="text-xs text-slate-700 mt-8 leading-relaxed">
                        By continuing you agree to our{" "}
                        <span className="text-slate-600 hover:text-slate-400 cursor-pointer transition-colors">Terms</span>
                        {" "}and{" "}
                        <span className="text-slate-600 hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>.
                    </p>
                </div>
            </div>

            <Toaster />
        </div>
    );
};

export default Register;
