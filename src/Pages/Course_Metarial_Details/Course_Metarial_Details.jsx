import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosIntance";

const Course_Metarial_Details = () => {
    const id = useParams().id;
    const location = useLocation();
    const [materials, setMaterials] = useState({});
    const [loading, setLoading] = useState(true);

    let type = "";
    if (location.pathname.startsWith("/assignment")) {
        type = "assignments";
    } else if (location.pathname.startsWith("/note")) {
        type = "notes";
    } else if (location.pathname.startsWith("/lab")) {
        type = "labs";
    }
    // get_notes

    useEffect(() => {

        const fetchMaterials = async () => {
            try {
                const response = await axiosInstance.get(`/api/${type}/get_${type}/${id}`);
                console.log(response.data);
            } catch (err) {
                console.log(`${type} fetching error : `, err);
            } finally {
                setLoading(false);
            }
        }

        fetchMaterials();

    }, [])

    return (
        <div>
            {type} {id}
        </div>
    );
};

export default Course_Metarial_Details;