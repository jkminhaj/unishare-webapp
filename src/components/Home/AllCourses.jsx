import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axiosInstance from "../../config/axiosIntance";
import { Link } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Skeleton_CourseCard from "../Skeletons/Skeleton_CourseCard";
import Add_Course from "./Add_Course";


const AllCourses = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get("/api/courses/get_all_courses");
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
            <p className="text-center md:text-2xl animate-pulse text-red-400 my-3">Website Under Construction</p>
            {/* <div className="flex mb-7 items-center justify-between">
                <p>Total Courses {courses.length}</p>
                <Link to="/">
                
                    <div className="flex border items-center gap-2  p-3 py-1  rounded-xl hover:text-white transition-all hover:bg-blue-500">
                        <p>test</p>
                        <AiOutlineCloudUpload className="text-lg" />
                    </div>
                </Link>

            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    !loading ?
                        courses.slice().reverse().map(course => {
                            return <CourseCard course={course} key={course._id} />;
                        })
                        :
                        Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton_CourseCard key={index} />
                        ))
                }
                
                {/* add more course  */}
                {!loading && <Add_Course/>}
            </div>
        </div>
    );
};

export default AllCourses;