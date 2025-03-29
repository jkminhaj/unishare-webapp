import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider";

const Course_Metarial_Details = () => {
    // const id = useParams().id;
    // const location = useLocation();
    // const [materials, setMaterials] = useState({});
    // const [loading, setLoading] = useState(true);

    // let type = "";
    // if (location.pathname.startsWith("/assignment")) {
    //     type = "assignments";
    // } else if (location.pathname.startsWith("/note")) {
    //     type = "notes";
    // } else if (location.pathname.startsWith("/lab")) {
    //     type = "labs";
    // }
    // get_notes

    // useEffect(() => {

    //     const fetchMaterials = async () => {
    //         try {
    //             const response = await axiosInstance.get(`/api/${type}/get_${type}/${id}`);
    //             console.log(response.data);
    //         } catch (err) {
    //             console.log(`${type} fetching error : `, err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchMaterials();

    // }, [])


    const { materialData } = useContext(GlobalContext);
    {/* // materialName , materialNo , createdAt , data [arr] , deadline , uploader {name , email , image } , _id = material ; */ }
    console.log("material data : ", materialData);
    return (
        <div>
            {/* <p>{materialData.assignmentName}</p>
            {materialData.data[0]} */}
            
            <div className="w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                    src="https://drive.google.com/file/d/15Dgm5iugODhidJWRIJbkrqow14iwESMv/preview"
                    width="100%"
                    height="500px"
                    allow="autoplay"
                ></iframe>
            </div>

        </div>
    );
};

export default Course_Metarial_Details;