import {useNavigate} from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";


const CourseCard = ({ course }) => {
    const { assignments, courseName, labs, notes, semester, _id, faculty, courseCode } = course;
    const navigate = useNavigate();

    return (
        <div data-aos="zoom-in" onClick={() => { navigate(`/course/${_id}`) }} className="cursor-pointer">
            <div className="
            bg-[#131920] relative min-h-36 md:hover:scale-105  transition-all  ease-in-out flex items-center justify-center hover:shadow  duration-300 rounded-lg
            ">
                <div className="px-5">
                    <Badge badge={courseCode}/>
                    <p className="text-center">{courseName}</p>
                    {/* <p className="text-sm font-sans mt-3">{faculty}</p> */}
                </div>
            </div>
        </div>
    );
};


const Badge = ({ badge }) => {

    return (
        <div className={`absolute text-xs bg-[#2399f0] shadow-md text-white p-2 py-1 rounded-lg  top-0 left-0 rounded-b-none rounded-r-2xl pr-4`}>
            <div className="flex items-center gap-1">
                <div className="text-sm" >
                    <FaLaptopCode />
                </div>
                <p>{badge ? badge :"CSC1103"}</p>
            </div>
        </div>
    );
}

export default CourseCard;