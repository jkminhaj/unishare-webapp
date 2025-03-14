import axios from "axios";
import { useEffect, useState } from "react";

const AllCourses = () => {
    const [loading , setLoading] = useState(true);
    const [courses , setCourses] = useState({});

    useEffect(()=>{

        const fetchCourses = async () =>{
            try {
                const response = await axios.get("https://unishare-server.vercel.app/api/courses/get_all_courses");
                console.log(response.data);
            } catch (err) {
                console.log("Courses fetching error : ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    },[])

    return (
        <div>
            <p>All Courses</p>
        </div>
    );
};

export default AllCourses;