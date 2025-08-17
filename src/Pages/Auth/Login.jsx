import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { LuUser } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";


const Login = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {

    }
    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[400px] bg-white p-8"
            >
                <h2 className=" text-2xl text-center font-bold text-black">LOGIN</h2>
                <p className="mb-8 text-center">Connect, contribute, and collaborate</p>

                <div className="relative">
                    <LuUser className="absolute left-3 text-gray-500 top-[10px]" />
                    <input
                        className="mb-3 w-full text-sm outline-0  rounded-xl  border pl-8 px-4 p-2"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required

                    />
                </div>

                <div className="relative">
                    <MdLockOutline className="absolute left-3 text-gray-500 top-[10px]" />
                    <input
                        className="mb-3 w-full text-sm outline-0  rounded-xl  border pl-8 px-4 p-2"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required

                    />
                </div>



                {/* {error && <p className="mb-3 ml-4 text-sm text-red-600">{error}</p>} */}
                <div className="flex mt-3 justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer font-semibold shadow-xl bg-blue-600 px-4 rounded-xl py-2 text-white hover:bg-blue-700"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>

                <div class="flex items-center justify-center my-6">
                    <div class="flex-grow border-t border-gray-300"></div>
                    <span class="px-3 text-sm text-gray-600 "><span className="font-semibold">Login</span> with Others</span>
                    <div class="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="border rounded-xl border-gray-200 py-2 flex justify-center cursor-pointer hover:shadow-sm">
                    <div className="flex items-center gap-1">
                        <FcGoogle className="text-2xl" />
                        <p className="text-sm">Login with <span className="font-semibold">Google</span></p>
                    </div>
                </div>


                {/* <div className="text-center mt-5">
                    New Here ? <span><Link to="/signup" className="text-[#5f45ba] hover:underline">Create an account</Link></span>
                </div> */}
            </form>
        </div>
    );
};

export default Login;