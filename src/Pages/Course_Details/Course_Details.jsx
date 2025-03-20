import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosIntance";
import { GlobalContext } from "../../context/GlobalProvider";

const Course_Details = () => {
    const courseId = useParams().id;
    const navigate = useNavigate();
    const { setMaterialData } = useContext(GlobalContext);

    const [loading, setLoading] = useState(true);
    const [materialLoading, setMaterialLoading] = useState(true);

    const [course, setCourse] = useState({});
    const [assignments, setAssignments] = useState([]);
    const [labs, setLabs] = useState([]);
    const [notes, setNotes] = useState([]);

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

    }, []);

    useEffect(() => {

        const fetchCourseMaterials = async () => {
            try {
                const [assignmentsRes, labsRes, notesRes] = await Promise.all([
                    axiosInstance.get(`/api/assignments/get_assignments/${courseId}`),
                    axiosInstance.get(`/api/labs/get_labs/${courseId}`),
                    axiosInstance.get(`/api/notes/get_notes/${courseId}`)
                ])

                const assignmentsData = assignmentsRes.data.assignments;
                const labsData = labsRes.data.labs;
                const notesData = notesRes.data.notes;

                setAssignments(assignmentsData);
                setLabs(labsData);
                setNotes(notesData);

                console.log("Assignments Data :", assignmentsData);
                console.log("Labs Data :", labsData);
                console.log("Notes Data :", notesData);

            } catch (err) {
                console.log("Course material fetching error : ", err);
            } finally {
                setMaterialLoading(false);
            }

        }

        fetchCourseMaterials();
    }, [])

    const handleMaterialDetails = (route , material) => {
        navigate(`/${route}`);
        setMaterialData(material);
    }
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
                    {/* // materialName , materialNo , createdAt , data [arr] , deadline , uploader {name , email , image } , _id = material ; */}
                    <div className="flex justify-center">
                        <div>
                            {
                                assignments &&
                                assignments.map((item, idx) => {
                                    return (
                                        <div
                                            onClick={() => { handleMaterialDetails("assignmentDetails",item) }}
                                            className="border rounded-lg p-5 md:min-w-[800px] border-gray-200 cursor-pointer hover:bg-gray-50 my-3" key={idx}>
                                            {/* <p>{item.createdAt}</p> */}
                                            <div className="flex justify-between items-center gap-4">
                                                <div className="flex items-center gap-3">
                                                    <p className="text-base font-normal">{item.assignmentName}</p>
                                                    <p className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-2xl">Assignment {item.assignmentNo}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <p className="text-sm">uploaded by</p>
                                                    <img title={item.uploader.name} className="w-6 rounded-full" src={item.uploader.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
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