import { MdAssignment } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosIntance";


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
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(',', '');
    return formatted;

}

const Course_Metarial_Details = () => {
    const [materialData, setMaterialData] = useState({});
    const location = useLocation(); 
    const {id} = useParams();

    // console.log(location.pathname)
    // console.log(materialtype(location.pathname));

    {/* // materialName , materialNo , createdAt , data [arr] , deadline , uploader {name , email , image } , _id = material ; */ }
    let type = materialtype(location.pathname);

    useEffect(()=>{
        fetchMaterials();
    },[])

    const fetchMaterials = async () =>{
        try {
            const {data} = await axiosInstance.get(`/api/${type}s/get_${type}/${id}`);
            setMaterialData(data[type]);
            
        } catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            {/* <div className="w-full h-[500px] border-gray-300 rounded-lg overflow-hidden">
                    <iframe
                        src="https://drive.google.com/file/d/15Dgm5iugODhidJWRIJbkrqow14iwESMv/preview"
                        width="100%"
                        height="500px"
                        allow="autoplay"
                    ></iframe>
            </div> */}

            <section className="max-w-[800px] mx-auto pt-3">
                <div className="flex gap-3 items-center">
                    <div className="md:text-2xl text-white border rounded-full p-2 bg-blue-500">
                        <MdAssignment />
                    </div>
                    <h1 className="md:text-4xl text-gray-700">{type == "assignment" && materialData?.assignmentName}</h1>
                </div>
                <p className="mt-3 text-gray-500">{materialData?.details ? materialData.details : "No description provided"}</p>
                <div className="flex justify-between items-center">
                    <p className="mt-3 text-gray-500 font-normal font-sans">{materialData?.createdAt && formatDate(materialData.createdAt)}</p>
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
                                        <a href={item.viewLink} className="hover:text-blue-700 cursor-pointer text-sm" target="_blank">file {indx+1}</a>
                                        <div className="flex items-center gap-1 duration-100 ease-in-out transition-all hover:text-blue-500 cursor-pointer text-base border rounded-lg p-1">
                                            {/* <LiaDownloadSolid /> */}
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                {/* <hr className="my-4  border-[1.5px] " />  */}
            </section>

        </div>
    );
};

export default Course_Metarial_Details;