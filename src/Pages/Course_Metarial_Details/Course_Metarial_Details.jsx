import { MdAssignment } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosIntance";
import { BsPcDisplay } from "react-icons/bs";
import { PiNotebookFill } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import Sekeleton_Materials_Details from "../../components/Skeletons/Sekeleton_Materials_Details";


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
    const { id } = useParams();

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
    console.log(materialData)
    return (
        <div>
            {
                !loading &&
                <section className="max-w-[800px] mx-auto pt-3">
                    <div className="flex gap-3 items-center">
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
                            <p className="text-base text-gray-600">{materialData?.uploader?.name}</p>
                            <img title={materialData?.uploader?.name} className="w-7 rounded-full" src={materialData?.uploader?.image} alt="" />
                        </div>
                    </div>



                    <hr className="my-4  border-[1.5px]" />
                    <div className="grid gap-3 grid-cols-4">
                        {
                            materialData?.data?.map((item, indx) => {
                                return (
                                    <div key={indx} className="border p-2 rounded-xl w-full">
                                        {/* <p>{item.viewLink}</p> */}
                                        {/* <p>Title</p>     */}
                                        <div className="flex px-1 items-center justify-between">
                                            <a href={item.viewLink} className="hover:text-blue-700 cursor-pointer text-sm" target="_blank">file {indx + 1}</a>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            }
            {loading && <Sekeleton_Materials_Details />}
            {/* <hr className="my-4  border-[1.5px] " />  */}

        </div>
    );
};

export default Course_Metarial_Details;