import { useContext, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { LuUser } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalProvider";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const {user} = useContext(GlobalContext);
    const navigate = useNavigate();
    const [error , setError] = useState(false);

    const timeoutRef = useRef(null);
    const handleGoogleLogin = () => {
    if (timeoutRef.current) return;
    toast("Coming soon!", {
        icon: "🌟",
        style: {
        background: "white", 
        color: "black",     
        fontSize: "0.85rem",  
        padding: "12px 20px",
        borderRadius: "12px",
        border:"1px solid #e5e7eb",
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


    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        const form = e.target ;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email , password);

        if(email == "test@gmail.com" && password == 1234){
            navigate("/");
            localStorage.setItem("user",email);
        } else setError("Incorrect email or password");
        setLoading(false);
    }
    return (
        <div className="flex mt-20 md:mt-36  items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[400px] bg-white p-8"
            >
                <h2 className=" text-2xl text-center font-bold text-black">LOGIN</h2>
                <p className="mb-8 text-center">Connect, contribute, and collaborate</p>

                <div className="relative">
                    <LuUser className="absolute left-3 text-gray-500 top-[12px]" />
                    <input
                        className="mb-3 w-full text-sm outline-0  rounded-xl  border pl-8 px-4 p-2"
                        type="email"
                        name="email"
                        defaultValue="test@gmail.com"
                        placeholder="Email"
                        required

                    />
                </div>

                <div className="relative">
                    <MdLockOutline className="absolute left-3 text-gray-500 top-[12px]" />
                    <input
                        className="mb-3 w-full text-sm outline-0  rounded-xl  border pl-8 px-4 p-2"
                        type="password"
                        name="password"
                        defaultValue="1234"
                        placeholder="Password"
                        required

                    />
                </div>



                {error && <p className="mb-3 ml-2 text-sm text-red-600">{error}</p>}
                <div className="flex mt-3 justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer font-semibold shadow-xl bg-blue-600 px-4 rounded-xl py-2 text-white hover:bg-blue-700"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>

                <div className="flex items-center justify-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-3 text-sm text-gray-600 "><span className="font-semibold">Login</span> with Others</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div onClick={()=>{handleGoogleLogin()}} className="border rounded-xl border-gray-200 py-2 flex justify-center cursor-pointer hover:shadow-sm">
                    <div className="flex items-center gap-1">
                        <FcGoogle className="text-2xl" />
                        <p className="text-sm">Login with <span className="font-semibold">Google</span></p>
                    </div>
                </div>


                {/* <div className="text-center mt-5">
                    New Here ? <span><Link to="/signup" className="text-[#5f45ba] hover:underline">Create an account</Link></span>
                </div> */}
            </form>
            <Toaster/>
            
        </div>
    );
};

export default Login;