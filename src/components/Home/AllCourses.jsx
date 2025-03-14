import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const AllCourses = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        const fetchCourses = async () => {
            try {
                const response = await axios.get("https://unishare-server.vercel.app/api/courses/get_all_courses");
                setCourses(response.data.courses);
                // console.log(response.data.courses);
            } catch (err) {
                console.log("Courses fetching error : ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, [])

    return (
        <div>
            <p>Total Courses {courses.length}</p>

            <div className="flex gap-4">
                {
                    !loading && courses.map(course => {
                        return <div key={course._id}><CourseCard course={course} /></div>;
                    })
                }
            </div>

            {
                loading && <div>Loading</div>
            }
        </div>
    );
};

export default AllCourses;