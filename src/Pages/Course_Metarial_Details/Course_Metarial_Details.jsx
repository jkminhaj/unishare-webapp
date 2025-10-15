import { MdAssignment } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosIntance";
import { BsPcDisplay } from "react-icons/bs";
import { PiNotebookFill } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import Sekeleton_Materials_Details from "../../components/Skeletons/Sekeleton_Materials_Details";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3, FiLink } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import extractUser from "../../Helper/ExtractUser";
import { FaFilePdf } from "react-icons/fa";


const materialtype = (str) => {
    if (str.includes("assignment")) {
        return "assignment";
    } else if (str.includes("lab")) {
        return "lab";
    } else {
        return "note";
    }
}

const formatDate = (date) => {
    const d = new Date(date);
    const formatted = d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).replace(',', '');
    return formatted;
}
const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

const Course_Metarial_Details = () => {
    const [materialData, setMaterialData] = useState({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [delLoading, setDelLoading] = useState(false);
    const { id } = useParams();
    const [copied, setCopied] = useState(false);

    // console.log(location.pathname)
    // console.log(materialtype(location.pathname));

    {/* // materialName , materialNo , createdAt , data [arr] , deadline , uploader {name , email , image } , _id = material ; */ }
    let type = materialtype(location.pathname);

    useEffect(() => {
        fetchMaterials();
    }, [])

    const fetchMaterials = async () => {
        try {
            const { data } = await axiosInstance.get(`/api/${type}s/get_${type}/${id}`);
            setMaterialData(data[type]);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    const domain = "unishare.me"
    console.log(materialData)
    const handleMaterialDelete = async () => {
        try {
            setDelLoading(true);
            const res = await axiosInstance.delete(`/api/${type}s/delete/${materialData.course}/${id}`);
            window.history.back();
        } catch (err) {
            alert("Something went wrong!")
        } finally {
            setDelLoading(false);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(`${domain}/#/${type}Details/${id}`)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            }).catch(() => {
                alert("something wernt wront")
            })
    }
    function isUniName(str) {
        return /\d/.test(str);
    }
    return (
        <div>
            {
                !loading &&
                <section className="max-w-[800px] mx-auto pt-5 relative">
                    {
                        copied &&
                        <div
                            data-aos="zoom-in"
                            className="absolute flex items-center gap-2 -bottom-8 left-1/2 -translate-x-1/2  border text-sm px-3 py-1 rounded-full shadow"
                        >
                            <MdContentCopy />Copied
                        </div>
                    }
                    <div className="flex justify-between items-start">
                        <div className="flex items-start md:items-center gap-3">
                            <div className="md:text-2xl text-white border rounded-full p-2 bg-blue-500">
                                {type === 'assignment' && <MdAssignment />}
                                {type === 'lab' && <BsPcDisplay />}
                                {type === 'note' && <PiNotebookFill />}
                            </div>

                            <h1 className="text-2xl md:text-4xl text-gray-700">
                                {type === 'assignment' && materialData?.assignmentName}
                                {type === 'lab' && materialData?.labName}
                                {type === 'note' && materialData?.title}
                            </h1>
                        </div>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="cursor-pointer">
                                <div className="border border-transparent  transition duration-300 ease-in-out active:scale-110 hover:border-gray-200 rounded-full p-2">
                                    <SlOptionsVertical />
                                </div>
                            </label>

                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 border bg-base-100 rounded-xl min-w-52">
                                <li><a className="flex items-center gap-2"><FiEdit3 /> Edit {type}</a></li>
                                <li onClick={() => { handleMaterialDelete() }}><a className="flex items-center gap-2"><AiOutlineDelete /> {delLoading ? "Deleting.." : "Delete"}</a></li>
                                <li onClick={() => { handleCopy() }}><a className="flex items-center gap-2"><FiLink /> Copy link</a></li>
                            </ul>
                        </div>
                    </div>


                    {/* {type === 'assignment' && materialData?.assignmentNo}
                {type === 'lab' && materialData?.labNo} */}


                    {/* {(type === 'assignment' || type === 'lab') && materialData?.deadline && (
                    <p className="text-red-500">Deadline: {formatDate(materialData.deadline)}</p>
                )} */}

                    <p className="mt-3  mb-5 text-gray-500">{materialData?.details ? materialData.details : "No description provided"}</p>
                    <div className="flex justify-between items-center">
                        <p className="mt-3 text-sm text-gray-500 font-normal font-sans">{materialData?.createdAt && formatDate(materialData.createdAt)} • <span className="text-sm">{formatTime(materialData?.createdAt)}</span>
                        </p>
                        <div className="flex items-center gap-3">
                            <p className="text-base text-gray-600 hidden md:block">{isUniName(materialData?.uploader?.name) ? extractUser(materialData?.uploader?.name).fullName : materialData?.uploader?.name}</p>
                            {
                                isUniName(materialData?.uploader?.name) &&
                                <p className="text-sm md:text-base text-gray-600 block md:hidden ">{extractUser(materialData?.uploader?.name).nickName}
                                </p>
                            }
                            <img referrerPolicy="no-referrer" title={materialData?.uploader?.name} className="w-7 rounded-xl" src={materialData?.uploader?.image} alt="" />
                        </div>
                    </div>


                    <hr className="my-4  border-[1.5px]" />
                    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {materialData?.data?.map((item, indx) => (
                            <a
                                key={indx}
                                href={item.viewLink}
                                target="_blank"
                                className="flex border cursor-pointer rounded-xl overflow-hidden15 hover:shadow-sm transition"
                            >
                                {/* Left Side with bg image */}
                                {
                                    item.thumbnailLink ?
                                        <img
                                            referrerPolicy="no-referrer"
                                            src={"https://www.staceyeburke.com/wp-content/uploads/2019/04/Folders-770x484.jpg"||item.thumbnailLink}
                                            className="w-1/2 max-h-16 md:max-h-20  md:h-24 rounded-l-xl  bg-cover bg-center"
                                        // style={{ backgroundImage: `url(${item?.thumbnailLink || "/fallback.jpg"})` }}
                                        >
                                        </img>
                                        :
                                        <div className="w-1/2 h-16 md:max-h-20 flex justify-center items-center  md:h-24 rounded-l-xl bg-blue-500 text-white">
                                            <p className="text-xl font-semibold">PDF</p>
                                        </div>
                                }

                                {/* Right Side with text */}
                                <div className="w-1/2 flex items-center justify-center p-2">
                                    <a
                                        className="text-sm text-gray-700 hover:text-blue-600 transition"
                                    >
                                        Doc {indx + 1}
                                    </a>
                                </div>
                            </a>
                        ))}
                    </div>

                </section>
            }
            {loading && <Sekeleton_Materials_Details />}
            {/* <hr className="my-4  border-[1.5px] " />  */}

        </div>
    );
};

export default Course_Metarial_Details;