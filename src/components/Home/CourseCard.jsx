import { Link, useNavigate } from "react-router-dom";

const CourseCard = ({course}) => {
    const {assignments ,  courseName , labs , notes , semester , _id , faculty , courseCode } = course ;
    const navigate = useNavigate();
    return (
        <div>
            <div className="border hover:shadow transition duration-300  my-4 rounded-lg p-5">
                <p className="hover:underline cursor-pointer" onClick={()=>{navigate(`/course/${_id}`)}}>{courseName}</p>
                <p className="text-sm font-sans mt-3">{faculty}</p>
            </div>
        </div>
    );
};

export default CourseCard;