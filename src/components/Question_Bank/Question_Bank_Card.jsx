import { IoFolderOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Question_Bank_Card = ({item}) => {
    const navigate = useNavigate();
    return (
        <div
        onClick={()=>{navigate(`/questionBank/${item.id}`)}}
            className="group mt-3 relative bg-[#131920] rounded-2xl shadow p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
            {/* Tag */}
            <span className="absolute -top-3 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                Questions
            </span>

            <h2 className="text-base font-normal flex items-center justify-between text-gray-200 group-hover:text-gray-50 transition">
                {item.courseTitle}
                <IoFolderOpenOutline className="text-xl text-white  transition" />
            </h2>
        </div>
    );
};

export default Question_Bank_Card;