import { useContext, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdErrorOutline, MdOutlineFacebook } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalProvider";
import toast, { Toaster } from "react-hot-toast";
import MetaData from "../../config/MetaData";
import { LuMailSearch } from "react-icons/lu";
import axiosInstance from "../../config/axiosIntance";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const { user, log_out, login_user, connect_google, connect_facebook, globalLoading } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
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
                boxShadow: "0 0 0 rgba(0,0,0,0.2)",
                maxWidth: "300px",
                textAlign: "right",
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

            // console.log(res.status);
            // // console.log(res.data.status);
            // console.log(user.email.endsWith("@uttarauniversity.edu.bd"));

            // if (!user.email.endsWith("@uttarauniversity.edu.bd")) {
            //   log_out();
            //   setError("Please use your university account");
            //   console.log("Logged out due to invalid email domain");
            // } else {
            //   console.log("move further");
            // }

        } catch (error) {
            if (error.message == "Firebase: Error (auth/popup-closed-by-user).") setError("Pop up closed , Please try again.")
                else setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        login_user(email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigate(from, { replace: true });
                setLoading(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
                console.log(errorMessage)
                if (errorMessage == "Firebase: Error (auth/invalid-credential).") setError("Incorrect email or password");
                if (errorMessage == "Firebase: Error (auth/too-many-requests).") setError("Too many attempts. Try again later.");
                if (errorMessage == "Firebase: Error (auth/network-request-failed).") setError("Please check your internet connection");
                if (errorMessage == "Firebase: Error (auth/popup-blocked).") setError("Pop up blocked , Please refresh the page");
                if (errorMessage == "Firebase: Error (auth/popup-closed-by-user).") setError("Pop up closed , Please try again.");
                // ..
            });

        // if (email == "test@gmail.com" && password == 1234) {
        //     localStorage.setItem("user", email);
        //     console.log(location);

        // } else setError("Incorrect email or password");

    }

    return (
        <section
            style={{ background: "#1d2733", minHeight: "100vh" }}
            className="flex items-center justify-center px-4"
        >
            <MetaData title="Unishare • Login" />

            {!isCheckingEmail && (
                <div
                    style={{
                        animation: "fadeUp 0.45s ease both",
                        width: "100%",
                        maxWidth: "400px",
                    }}
                >
                    {/* Card */}
                    <div
                        style={{
                            background: "#131920",
                            borderRadius: "20px",
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset",
                            padding: "2.25rem 2rem",
                        }}
                    >
                        {/* Logo mark */}
                        <div className="flex flex-col items-center mb-8">
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 14,
                                    background: "linear-gradient(135deg, #2399f0 0%, #1578c2 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "0.9rem",
                                    boxShadow: "0 8px 24px rgba(35,153,240,0.35)",
                                }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9" />
                                    <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
                                    <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                                </svg>
                            </div>
                            <h2
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: "1.4rem",
                                    fontWeight: 700,
                                    color: "#f1f5f9",
                                    letterSpacing: "-0.02em",
                                    marginBottom: "0.2rem",
                                }}
                            >
                                Unishare
                            </h2>
                            <p style={{ color: "#64748b", fontSize: "0.82rem" }}>
                                Connect, contribute, and collaborate
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Email */}
                            <div className="relative">
                                <LuUser
                                    style={{ color: "#475569", position: "absolute", left: 13, top: 12, fontSize: 15 }}
                                />
                                <input
                                    style={{
                                        width: "100%",
                                        background: "#1d2733",
                                        border: "1.5px solid rgba(255,255,255,0.07)",
                                        borderRadius: 12,
                                        padding: "10px 14px 10px 36px",
                                        fontSize: "0.875rem",
                                        color: "#e2e8f0",
                                        outline: "none",
                                        transition: "border-color 0.2s",
                                    }}
                                    onFocus={e => e.target.style.borderColor = "#2399f0"}
                                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
                                    type="email"
                                    name="email"
                                    defaultValue=""
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <MdLockOutline
                                    style={{ color: "#475569", position: "absolute", left: 13, top: 12, fontSize: 15 }}
                                />
                                <input
                                    style={{
                                        width: "100%",
                                        background: "#1d2733",
                                        border: "1.5px solid rgba(255,255,255,0.07)",
                                        borderRadius: 12,
                                        padding: "10px 14px 10px 36px",
                                        fontSize: "0.875rem",
                                        color: "#e2e8f0",
                                        outline: "none",
                                        transition: "border-color 0.2s",
                                    }}
                                    onFocus={e => e.target.style.borderColor = "#2399f0"}
                                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
                                    type="password"
                                    name="password"
                                    defaultValue=""
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <p
                                    style={{
                                        fontSize: "0.8rem",
                                        color: "#f87171",
                                        background: "rgba(248,113,113,0.08)",
                                        border: "1px solid rgba(248,113,113,0.15)",
                                        borderRadius: 10,
                                        padding: "8px 12px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                    }}
                                >
                                    <MdErrorOutline /> {error}
                                </p>
                            )}

                            {/* Forgot */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    style={{
                                        fontSize: "0.78rem",
                                        color: "#2399f0",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 0,
                                    }}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: "100%",
                                    background: loading ? "#1578c2" : "linear-gradient(135deg, #2399f0 0%, #1a7dd4 100%)",
                                    color: "white",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    fontFamily: "'Syne', sans-serif",
                                    border: "none",
                                    borderRadius: 12,
                                    padding: "11px 0",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    transition: "all 0.2s",
                                    boxShadow: "0 4px 20px rgba(35,153,240,0.3)",
                                    marginTop: 4,
                                    letterSpacing: "0.01em",
                                }}
                                onMouseEnter={e => { if (!loading) e.target.style.boxShadow = "0 6px 28px rgba(35,153,240,0.45)"; }}
                                onMouseLeave={e => { e.target.style.boxShadow = "0 4px 20px rgba(35,153,240,0.3)"; }}
                            >
                                {loading ? (
                                    <span className="flex justify-center items-center gap-2">
                                        <span className="loading loading-spinner loading-xs" />
                                    </span>
                                ) : "Login"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-5">
                            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                            <span style={{ fontSize: "0.75rem", color: "#475569", whiteSpace: "nowrap" }}>
                                <span style={{ color: "#64748b", fontWeight: 600 }}>Login</span> with Others
                            </span>
                            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                        </div>

                        {/* Social buttons */}
                        <div className="space-y-2.5">
                            <button
                                disabled={loading}
                                onClick={() => { handleGoogleLogin() }}
                                style={{
                                    width: "100%",
                                    background: "#1d2733",
                                    border: "1.5px solid rgba(255,255,255,0.07)",
                                    borderRadius: 12,
                                    padding: "10px 0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10,
                                    cursor: loading ? "not-allowed" : "pointer",
                                    transition: "border-color 0.2s, background 0.2s",
                                    color: "#cbd5e1",
                                    fontSize: "0.875rem",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "#243040"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "#1d2733"; }}
                            >
                                <FcGoogle style={{ fontSize: 18 }} />
                                <p>Continue with <span style={{ fontWeight: 600, color: "#e2e8f0" }}>Google</span></p>
                            </button>

                            <div
                                onClick={() => { handleFacebookLogin() }}
                                style={{
                                    width: "100%",
                                    background: "#1d2733",
                                    border: "1.5px solid rgba(255,255,255,0.07)",
                                    borderRadius: 12,
                                    padding: "10px 0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10,
                                    cursor: "pointer",
                                    transition: "border-color 0.2s, background 0.2s",
                                    color: "#cbd5e1",
                                    fontSize: "0.875rem",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "#243040"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "#1d2733"; }}
                            >
                                <MdOutlineFacebook style={{ fontSize: 20, color: "#2399f0" }} />
                                <p>Continue with <span style={{ fontWeight: 600, color: "#e2e8f0" }}>Facebook</span></p>
                            </div>
                        </div>

                        {/* Sign up */}
                        <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#475569", marginTop: "1.5rem" }}>
                            New here?{" "}
                            <span
                                onClick={() => navigate('/register')}
                                style={{
                                    color: "#2399f0",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    textUnderlineOffset: 3,
                                }}
                            >
                                Sign up
                            </span>
                        </p>
                    </div>

                    {/* Bottom note */}
                    <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#334155", marginTop: "1.25rem" }}>
                        By continuing, you agree to our Terms & Privacy Policy
                    </p>
                </div>
            )}

            {isCheckingEmail && (
                <div style={{ color: "#64748b", display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem" }}>
                    Checking email ..
                    <LuMailSearch style={{ animation: "bounce 1s infinite", fontSize: "1.1rem" }} />
                </div>
            )}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                input::placeholder { color: #334155; }
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px #1d2733 inset !important;
                    -webkit-text-fill-color: #e2e8f0 !important;
                }
            `}</style>

            <Toaster />
        </section>
    );
};

export default Login;
