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
                background: "white",
                color: "black",
                fontSize: "0.85rem",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
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
        <section>
            <div className="flex pt-20  items-center justify-center">
                <MetaData title="Unishare • Login" />
                {!isCheckingEmail &&
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full  max-w-[400px] bg-white p-8"
                        >
                            <h2 className=" text-2xl text-center font-bold text-black">Unishare</h2>
                            <p className="mb-8 text-center">Connect, contribute, and collaborate</p>

                            <div className="relative">
                                <LuUser className="absolute left-3 text-gray-500 top-[11px]" />
                                <input
                                    className="mb-3 w-full text-sm outline-0  rounded-xl  border pl-8 px-4 p-2"
                                    type="email"
                                    name="email"
                                    defaultValue=""
                                    placeholder="Email"
                                    required

                                />
                            </div>

                            <div className="relative">
                                <MdLockOutline className="absolute left-3 text-gray-500 top-[11px]" />
                                <input
                                    className="mb-3 w-full text-sm outline-0  rounded-xl  border pl-8 px-4 p-2"
                                    type="password"
                                    name="password"
                                    defaultValue=""
                                    placeholder="Password"
                                    required

                                />
                            </div>
                            {error && <p className="mb-3 ml-1 text-sm flex items-center gap-1 text-red-600"><MdErrorOutline /> {error}</p>}
                            <div className="flex mt-3 justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="cursor-pointer font-semibold shadow-xl bg-blue-600 px-4 rounded-xl py-2 text-white hover:bg-blue-700"
                                >
                                    {loading ? <span className="flex flex-row-reverse justify-center gap-3 min-w-11"><span className="loading-spinner text-sm loading " /></span> : "Login"} 
                                </button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="px-3 text-sm text-gray-600 "><span className="font-semibold">Login</span> with Others</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button disabled={loading} onClick={() => { handleGoogleLogin() }} className="border rounded-xl w-full border-gray-200 py-2 flex justify-center cursor-pointer hover:shadow-sm">
                            <div className="flex items-center gap-2">
                                <FcGoogle className="text-2xl" />
                                <p className="text-sm">Continue with <span className="font-semibold">Google</span></p>
                            </div>
                        </button>

                        <div onClick={() => { handleFacebookLogin() }} className="border rounded-xl mt-3 border-gray-200 py-2 flex justify-center cursor-pointer hover:shadow-sm">
                            <div className="flex items-center gap-2">
                                <MdOutlineFacebook className="text-2xl text-blue-500" />
                                <p className="text-sm">Continue with <span className="font-semibold">Facebook</span></p>
                            </div>
                        </div>

                        <div className="text-center text-sm mt-16">
                            <p>New here ? <span  onClick={() => { handleFacebookLogin() }}  className="font-semibold underline cursor-pointer text-blue-600">Sign up</span></p>
                        </div>
                    </div>
                }

                {isCheckingEmail &&
                    <div className="mt-40 ">
                        <p className="flex items-center gap-3 ">Checking email ..<LuMailSearch className="animate-bounce text-lg" /></p>
                    </div>
                }

                <Toaster />

            </div>
        </section>
    );
};

export default Login;