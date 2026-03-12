import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdErrorOutline, MdOutlineFacebook } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalProvider";
import toast, { Toaster } from "react-hot-toast";
import MetaData from "../../config/MetaData";
import axiosInstance from "../../config/axiosIntance";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { login_user, connect_google } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(false);
    const from = location.state?.from || "/";
    const timeoutRef = useRef(null);

    const handleFacebookLogin = () => {
        if (timeoutRef.current) return;
        toast("Coming soon!", {
            icon: "🌟",
            style: { background: "#131920", color: "#e2e8f0", fontSize: "0.85rem", padding: "12px 20px", borderRadius: "12px", border: "1px solid #2a3547", maxWidth: "300px" },
            duration: 3000,
        });
        timeoutRef.current = setTimeout(() => { timeoutRef.current = null; }, 3000);
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await connect_google();
            navigate(from, { replace: true });
            const user = result.user;
            await axiosInstance.post("/api/users/create", { name: user.displayName, email: user.email, photo: user.photoURL });
        } catch (error) {
            if (error.message == "Firebase: Error (auth/popup-closed-by-user).") setError("Pop up closed, please try again.");
            else setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;

        login_user(email, password)
            .then(() => { navigate(from, { replace: true }); setLoading(false); })
            .catch((error) => {
                setLoading(false);
                const m = error.message;
                if (m == "Firebase: Error (auth/invalid-credential).")      setError("Incorrect email or password");
                else if (m == "Firebase: Error (auth/too-many-requests).")  setError("Too many attempts. Try again later.");
                else if (m == "Firebase: Error (auth/network-request-failed).") setError("Please check your internet connection");
                else setError(m);
            });
    };

    return (
        <div className="min-h-screen bg-[#1d2733] flex">
            <MetaData title="Unishare • Login" />

            {/* ── Left panel — desktop only ── */}
            <div className="hidden lg:flex flex-col justify-between w-[42%] bg-[#131920] p-12 border-r border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2399f0] flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                            <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">Unishare</span>
                </div>
                <div>
                    <p className="text-2xl font-bold font-poppins text-white leading-snug mb-3 tracking-tight">
                        The place where students<br />
                        <span className="text-[#2399f0]">share, learn, and grow.</span>
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Join hundreds of students already collaborating on projects, notes, and ideas.
                    </p>
                </div>
                <p className="text-xs text-slate-700">© 2024 Unishare. All rights reserved.</p>
            </div>

            {/* ── Right panel ── */}
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

                    {/* Heading */}
                    <div className="mb-6">
                        <h1 className="text-xl font-bold text-white tracking-tight mb-1">Welcome back</h1>
                        <p className="text-sm text-slate-500">
                            Don't have an account?{" "}
                            <span onClick={() => navigate("/register")} className="text-[#2399f0] cursor-pointer hover:underline underline-offset-2">
                                Sign up
                            </span>
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-2.5 mb-5">
                        <div className="relative">
                            <LuUser className="absolute left-3 top-[11px] text-slate-600 text-[13px]" />
                            <input type="email" name="email" placeholder="Email" required
                                className="w-full bg-[#131920] border border-white/[0.07] focus:border-[#2399f0] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors" />
                        </div>

                        <div className="relative">
                            <MdLockOutline className="absolute left-3 top-[11px] text-slate-600 text-[13px]" />
                            <input type="password" name="password" placeholder="Password" required
                                className="w-full bg-[#131920] border border-white/[0.07] focus:border-[#2399f0] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors" />
                        </div>

                        <div className="flex justify-end pt-0.5">
                            <button type="button" className="text-xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">
                                Forgot password?
                            </button>
                        </div>

                        {error && (
                            <p className="flex items-center gap-1.5 text-xs text-red-400 bg-red-400/[0.07] border border-red-400/10 rounded-lg px-3 py-2">
                                <MdErrorOutline className="shrink-0" /> {error}
                            </p>
                        )}

                        <button type="submit" disabled={loading}
                            className="w-full bg-[#2399f0] hover:bg-[#1d8add] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            {loading ? <span className="loading loading-spinner loading-xs" /> : "Login"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1 h-px bg-white/[0.05]" />
                        <span className="text-xs text-slate-600">or</span>
                        <div className="flex-1 h-px bg-white/[0.05]" />
                    </div>

                    <div className="space-y-2">
                        <button disabled={loading} onClick={handleGoogleLogin}
                            className="w-full bg-transparent border border-white/[0.07] hover:border-white/[0.13] hover:bg-white/[0.03] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl py-2.5 flex items-center justify-center gap-2.5 text-sm text-slate-400 transition-colors cursor-pointer">
                            <FcGoogle className="text-base shrink-0" />
                            Continue with <span className="font-medium text-slate-300">Google</span>
                        </button>

                        <button onClick={handleFacebookLogin}
                            className="w-full bg-transparent border border-white/[0.07] hover:border-white/[0.13] hover:bg-white/[0.03] rounded-xl py-2.5 flex items-center justify-center gap-2.5 text-sm text-slate-400 transition-colors cursor-pointer">
                            <MdOutlineFacebook className="text-base text-[#2399f0] shrink-0" />
                            Continue with <span className="font-medium text-slate-300">Facebook</span>
                        </button>
                    </div>

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

export default Login;
