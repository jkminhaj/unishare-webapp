import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosIntance";

const Course_Details = () => {
    const courseId = useParams().id;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [materialLoading , setMaterialLoading] = useState(true);
    
    const [course, setCourse] = useState({});
    const [assignments , setAssignments] = useState([]);
    const [labs , setLabs] = useState([]);
    const [notes , setNotes] = useState([]);

    // assignments ,  courseName , labs , notes , semester , _id , faculty , courseCode = course ;
    // materialName , materialNo , createdAt , data [arr] , deadline , uploader {name , email , image } , _id = material ;
    
    useEffect(() => {

        const fetchCourse = async () => {
            try {
                const response = await axiosInstance.get(`/api/courses/get_course/${courseId}`)
                // console.log(response.data.course);
                setCourse(response.data.course);
            } catch (err) {
                console.log("Error while fetching course : ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCourse();

    }, []) ;

    useEffect(()=>{

        const fetchCourseMaterials = async () =>{
            try {
                const [assignmentsRes , labsRes , notesRes ] = await Promise.all([
                    axiosInstance.get(`/api/assignments/get_assignments/${courseId}`),
                    axiosInstance.get(`/api/labs/get_labs/${courseId}`),
                    axiosInstance.get(`/api/notes/get_notes/${courseId}`)
                ])

                const assignmentsData = assignmentsRes.data.assignments ;
                const labsData = labsRes.data.labs ;
                const notesData = notesRes.data.notes ;

                setAssignments(assignmentsData);
                setLabs(labsData);
                setNotes(notesData);

                console.log("Assignments Data :", assignmentsData);
                console.log("Labs Data :", labsData);
                console.log("Notes Data :", notesData);

            } catch(err){
                console.log("Course material fetching error : ",err);
            } finally {
                setMaterialLoading(false);
            }

        }

        fetchCourseMaterials();
    },[])


    return (
        <div className="mt-5">
            {
                !loading &&
                <section>
                    <p className="text-5xl font-semibold mb-3 text-center">{course?.courseName}</p>

                    <header className="flex justify-center gap-4">
                        <p className="border rounded-md p-5 my-3 max-w-max">Assignments : {course?.assignments.length}</p>
                        <p className="border rounded-md p-5 my-3 max-w-max">Labs : {course?.labs.length}</p>
                        <p className="border rounded-md p-5 my-3 max-w-max">Notes : {course?.notes.length}</p>
                    </header>

                    {/* main materials */}
                    <div>
                        {
                            assignments && 
                            assignments.map((item,idx)=>{
                                return (
                                    <div className="border rounded my-3" key={idx}>
                                        {item.assignmentName}
                                    </div>
                                )
                            })
                        }
                    </div>

                </section>
            }

            {
                loading && <p>loading</p>
            }

        </div>
    );
};

export default Course_Details;