import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoBellFill } from "react-icons/go";
import { LiaRandomSolid } from "react-icons/lia";
import { TbLogout2 } from "react-icons/tb";

const Navbar = () => {
    return (
        <div className="py-2 shadow-gray-50-200 mb-5 shadow">
            <div className="w-11/12 md:w-10/12 mx-auto flex items-center justify-between">
                <div>
                    <p className="text-2xl  text-blue-500">Uni Share</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex gap-2 items-center">
                        <div className="border border-gray-300 flex items-center rounded-2xl py-2 pl-3">
                            <FiSearch className="text-xl text-gray-400" />
                            <input type="text" className="outline-none px-2" placeholder="Search materials" />
                        </div>
        
                        <div className="bg-blue-500 flex items-center rounded-2xl p-2">
                            <GoBellFill className="text-xl text-white" />
                        </div>
                    </div>

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="md:w-10 w-7 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 border bg-base-100 rounded-xl w-52">
                            <li><a className="flex items-center gap-2"><FaUser /> Profile</a></li>
                            <li><a className="flex items-center gap-2"><LiaRandomSolid /> Change theme </a></li>
                            <li><a className="flex items-center gap-2"><TbLogout2 />Sign out </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
};


export default Navbar;