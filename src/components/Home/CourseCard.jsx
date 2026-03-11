import {useNavigate} from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";


const CourseCard = ({ course }) => {
    const { assignments, courseName, labs, notes, semester, _id, faculty, courseCode } = course;
    const navigate = useNavigate();

    return (
        <div data-aos="zoom-in" onClick={() => { navigate(`/course/${_id}`) }} className="cursor-pointer group">
            <div className="
            bg-[#131920] relative min-h-36 md:min-h-40 transition-all duration-200 ease-in-out
            flex flex-col justify-center
            rounded-xl border border-white/[0.05] 
            hover:border-[#2399f0]/30 hover:bg-[#161e28]
            p-5 
            ">
                {/* Course name */}
                <p className="text-sm font-medium text-center text-slate-300 leading-snug">
                    {courseName}
                </p>

                {/* Bottom row */}
                {/* <div className="flex items-center justify-between mt-4">
                    <p className="text-sm font-sans mt-3">{faculty}</p>
                    <span className="text-xs text-slate-600">{semester}</span>
                    <svg
                        className="w-3.5 h-3.5 text-slate-700 group-hover:text-[#2399f0] group-hover:translate-x-0.5 transition-all duration-150"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div> */}

                <Badge badge={courseCode}/>
            </div>
        </div>
    );
};


const Badge = ({ badge }) => {

    return (
        <div className={`absolute text-xs bg-[#2399f0]/10 border border-[#2399f0]/20 text-[#2399f0] px-2.5 py-1 rounded-tl-xl rounded-br-lg top-0 left-0`}>
            <div className="flex items-center gap-1.5">
                <FaLaptopCode className="text-[11px]" />
                <p className="font-medium tracking-wide">{badge ? badge : "CSC1103"}</p>
            </div>
        </div>
    );
}

export default CourseCard;
