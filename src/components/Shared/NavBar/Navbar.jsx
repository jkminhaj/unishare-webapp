import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoBellFill } from "react-icons/go";
import { LiaRandomSolid } from "react-icons/lia";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalProvider";
import extractUser from "../../../Helper/ExtractUser";

const Navbar = () => {
    const navigate = useNavigate();
    const { log_out, user } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const handleSignOut = () => {
        setLoading(true);
        log_out();
        setLoading(false);
        navigate("/login");
        localStorage.removeItem("user");
    }
    function isUniName(str) {
        return /\d/.test(str);
    }
    return (
        <div className="py-2 fixed top-0 z-50 w-full bg-white border-b border-gray-200 text-gray-800  shadow-gray-50-200 mb-4 shadow-sm">
            <div className="w-11/12 md:w-10/12 mx-auto flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <NavLink data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        to="/" className="text-2xl hover:underline text-blue-500"
                    >Uni Share</NavLink>

                    <div>
                        Back
                    </div>
                </div>

                <div data-aos="fade-left"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine" className="flex items-center gap-3">
                    <div className="flex flex-row-reverse gap-2 items-center">
                        <div className="border border-gray-300 flex flex-row-reverse items-center rounded-2xl py-2 pl-2 pr-2 md:pr-4">
                            <FiSearch className="text-xl text-gray-400" />
                            <input type="text" className="outline-none px-2 hidden md:block" placeholder="Search materials" />
                        </div>

                        <div className="bg-blue-500 flex items-center rounded-2xl p-2">
                            <GoBellFill className="text-xl text-white" />
                        </div>
                    </div>

                    {
                        user &&
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-9 md:w-10 border  rounded-2xl">
                                    {user?.photoURL ? (
                                        <img
                                            referrerPolicy="no-referrer"
                                            alt={user?.displayName || "User"}
                                            src={user.photoURL}
                                        />
                                    ) : (
                                        <div className="bg-gray-300 w-full h-full flex items-center justify-center rounded-2xl">
                                            <FaUser className="text-gray-600" />
                                        </div>
                                    )}
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 border bg-base-100 rounded-xl min-w-52">
                                <li><a className="flex items-center gap-2">
                                    {/* <FaUser /> */}
                                    <img
                                        referrerPolicy="no-referrer"
                                        className="w-5 rounded-full"
                                        src={user.photoURL}
                                    />
                                    {
                                        isUniName(user?.displayName) ? extractUser(user?.displayName).nickName : "Demo user"
                                    }
                                </a></li>
                                <li><a className="flex items-center gap-2"><LiaRandomSolid /> Change theme </a></li>
                                <li onClick={() => { handleSignOut() }}><a className="flex items-center gap-2"><TbLogout2 />{loading ? "Signing out .." : "Sign out"} </a></li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
};


export default Navbar;