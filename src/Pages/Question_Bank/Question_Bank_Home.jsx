import { FiPlus } from "react-icons/fi";
import Question_Bank_Card from "../../components/Question_Bank/Question_Bank_Card";

const Question_Bank_Home = () => {
    const courses = [
        { "id": 1, "courseTitle": "Introduction to Computer Science" },
        { "id": 2, "courseTitle": "Programming Fundamentals" },
        { "id": 3, "courseTitle": "Object Oriented Programming" },
        { "id": 4, "courseTitle": "Data Structures" },
        { "id": 5, "courseTitle": "Algorithms Design and Analysis" },
        { "id": 6, "courseTitle": "Discrete Mathematics" },
        { "id": 7, "courseTitle": "Digital Logic Design" },
        { "id": 8, "courseTitle": "Computer Architecture" },
        { "id": 9, "courseTitle": "Operating Systems" },
        { "id": 10, "courseTitle": "Database Management Systems" },
        { "id": 11, "courseTitle": "Computer Networks" },
        { "id": 12, "courseTitle": "Software Engineering" },
        { "id": 13, "courseTitle": "Theory of Computation" },
        { "id": 14, "courseTitle": "Artificial Intelligence" },
    ];
    return (
        <div>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
                    {courses.map((item, index) => {
                        return (
                            // <div
                            //     key={index}
                            //     className="group mt-3 relative bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            // >
                            //     {/* Tag */}
                            //     <span className="absolute -top-3 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                            //         Questions
                            //     </span>

                            //     <h2 className="text-lg font-normal flex items-center justify-between text-gray-800 group-hover:text-blue-600 transition">
                            //         {item.courseTitle}
                            //         <IoFolderOpenOutline className="text-xl text-gray-500 group-hover:text-blue-500 transition" />
                            //     </h2>
                            // </div>
                            <Question_Bank_Card key={index} item={item}/>
                        );
                    })}
                    <div
                        className="group mt-3 relative bg-[#131920] rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 flex items-center justify-between transition-all duration-300 cursor-pointer"
                    >
                        Add a course
                        <FiPlus className="font-bold" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question_Bank_Home;