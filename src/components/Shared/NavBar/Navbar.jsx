import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoBellFill } from "react-icons/go";
import { LiaRandomSolid } from "react-icons/lia";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleSignOut = () =>{
        // localStorage.clear();
        navigate("/login");
        localStorage.removeItem("user");
    }
    return (
        <div className="py-2 bg-white border-b border-gray-200 text-gray-800  shadow-gray-50-200 mb-4 shadow-sm">
            <div className="w-11/12 md:w-10/12 mx-auto flex items-center justify-between">
                <div>
                    <NavLink data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        to="/" className="text-2xl hover:underline text-blue-500"
                    >Uni Share</NavLink>
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

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="md:w-10 border w-7 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://media.istockphoto.com/id/1154370446/photo/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=kkZiaB9Q-GbY5gjf6WWURzEpLzNrpjZp_tn09GB21bI=" 
                                    />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 border bg-base-100 rounded-xl w-52">
                            <li><a className="flex items-center gap-2"><FaUser /> Test User</a></li>
                            <li><a className="flex items-center gap-2"><LiaRandomSolid /> Change theme </a></li>
                            <li onClick={()=>{handleSignOut()}}><a className="flex items-center gap-2"><TbLogout2 />Sign out </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
};


export default Navbar;