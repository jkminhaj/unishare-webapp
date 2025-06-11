import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider";

const materialtype = (material) => {
    if (Object.keys(material).includes("assignmentName")) {
        return "assignment";
    } else if (Object.keys(material).includes("labName")) {
        return "lab";
    } else {
        return "note";
    }
}

const Course_Metarial_Details = () => {

    const { materialData } = useContext(GlobalContext);
    {/* // materialName , materialNo , createdAt , data [arr] , deadline , uploader {name , email , image } , _id = material ; */ }



    console.log("material data : ", materialData.data);
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
                <h1 className="text-4xl text-gray-700">General</h1>
                <p className="mt-3 text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam inventore omnis obcaecati quis, vitae quos corporis libero explicabo facilis impedit, id dicta deleniti unde, nulla vel vero sint tempora labore?</p>
                <hr className="my-4  border-[1.5px]" />
                <div className="flex gap-3">
                    {
                        materialData.data.map((item, indx) => {
                            return (
                                <div key={indx} className="border rounded w-full">
                                    {/* <p>{item.viewLink}</p> */}
                                    <p>Item</p>
                                    <a href={item.viewLink} target="_blank">View</a>
                                    
                                </div>
                            )
                        })
                    }
                </div>
            </section>

        </div>
    );
};

export default Course_Metarial_Details;