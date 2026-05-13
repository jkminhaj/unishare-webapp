import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { FiTrash2, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import axiosInstance from "../../config/axiosIntance";
import { Delete_Course_Modal } from "../Modals/Delete_Course_Modal";


const CourseCard = ({ course, onDeleted , refetch }) => {
    const { courseName, _id, courseCode } = course;
    const navigate  = useNavigate();
    const [modal, setModal] = useState(false);

    return (
        <>
            <div
                data-aos="zoom-in"
                onClick={() => navigate(`/course/${_id}`)}
                className="cursor-pointer group"
            >
                <div className="bg-[#131920] relative min-h-36 md:min-h-40 flex flex-col items-center justify-center
                    rounded-xl border border-white/[0.05] hover:border-[#2399f0]/30 hover:bg-[#161e28]
                    transition-all duration-200 p-5">

                    <p className="text-sm font-medium text-center text-slate-300 leading-snug">
                        {courseName}
                    </p>

                    <div className="absolute top-0 left-0 flex items-center gap-1.5 text-[11px] font-medium tracking-wide
                        bg-[#2399f0]/10 border border-[#2399f0]/20 text-[#2399f0] px-2.5 py-1 rounded-tl-xl rounded-br-lg">
                        <FaLaptopCode className="text-[11px]" />
                        <span>{courseCode || "N/A"}</span>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); setModal(true); }}
                        className="absolute top-0 right-0 flex items-center justify-center
                            bg-[#FF595A]/8 border border-[#FF595A]/15 text-[#FF595A]
                            p-[5px] rounded-tr-xl rounded-bl-lg
                            hover:bg-[#FF595A]/20 transition-colors"
                        title="Delete course"
                    >
                        <FiTrash2 className="text-[12px]" />
                    </button>
                </div>
            </div>

            {modal && (
                <Delete_Course_Modal
                    courseName={courseName}
                    courseId={_id}
                    onClose={() => setModal(false)}
                    onDeleted={onDeleted}
                    refetch={refetch}
                />
            )}
        </>
    );
};

export default CourseCard;
