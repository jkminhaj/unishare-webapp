import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosIntance";
import { GlobalContext } from "../../context/GlobalProvider";
import { ImLab } from "react-icons/im";
import { PiNotebookFill } from "react-icons/pi";
import { MdAssignment } from "react-icons/md";
import Sekeleton_CD_Header from "../../components/Skeletons/Course_Details/Sekeleton_CD_Header";
import Add_Materials from "../Add_Materials/Add_Materials";



const Course_Details = () => {
    const courseId = useParams().id;
    const navigate = useNavigate();
    const { setMaterialData } = useContext(GlobalContext);
    const [refetch, setRefetch] = useState(0);

    const [viewingCourse, setViewingCourse] = useState(true);

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

    }, [refetch]);

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

                // console.log("Assignments Data :", assignmentsData);
                // console.log("Labs Data :", labsData);
                // console.log("Notes Data :", notesData);

            } catch (err) {
                console.log("Course material fetching error : ", err);
            } finally {
                setMaterialLoading(false);
            }

        }

        fetchCourseMaterials();
    }, [refetch])

    const handleMaterialDetails = (route, material) => {
        navigate(`/${route}`);
        setMaterialData(material);
    }
    return (
        <section>
            <div className="mt-3  mb-8">
                {
                    !loading &&
                    <section>
                        {/* assignments ,  courseName , labs , notes , semester , _id , faculty , courseCode = course ; */}
                        <header className={`bg-teal-600 ease-in-out duration-300 transform transition-all
                            ${viewingCourse ? "p-7" : "p-4 px-7"}
                             text-white   rounded-lg ${viewingCourse ? "pt-16" : "pt-7"}`}>
                            <p className="text-4xl font-semibold mb-3">{course?.courseName}</p>

                            {
                                viewingCourse &&
                                <div className="ease-in-out duration-300 transform transition-all">
                                    <p className="text-xl mb-3 transition-all">{course?.faculty}</p>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-1">
                                            <ImLab />
                                            <p className="text-xs">{course?.labs.length}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MdAssignment />
                                            <p className="text-xs">{course?.assignments.length}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <PiNotebookFill />
                                            <p className="text-xs">{course?.notes.length}</p>
                                        </div>
                                    </div>
                                </div>
                            }

                        </header>

                        <button className="btn font-normal my-2" onClick={() => { setViewingCourse(!viewingCourse) }}>Add Materials</button>

                        {/* main materials */}
                        {/* // materialName , materialNo , createdAt , data [arr] , deadline , uploader {name , email , image } , _id = material ; */}
                        {
                            viewingCourse &&
                            <section>
                                <div className="flex gap-3 justify-between">
                                    <div className="max-h-80 overflow-y-auto pr-3">
                                        {
                                            assignments &&
                                            assignments.map((item, idx) => {
                                                return (
                                                    <div
                                                        onClick={() => { handleMaterialDetails("assignmentDetails", item) }}
                                                        className="border rounded-lg p-5 border-gray-200 cursor-pointer hover:bg-gray-50 my-3" key={idx}>
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
                                        {
                                            labs &&
                                            labs.map((item, idx) => {
                                                return (
                                                    <div
                                                        onClick={() => { handleMaterialDetails("labDetails", item) }}
                                                        className="border rounded-lg p-5 border-gray-200 cursor-pointer hover:bg-gray-50 my-3" key={idx}>
                                                        {/* <p>{item.createdAt}</p> */}
                                                        <div className="flex justify-between items-center gap-4">
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-base font-normal">{item.labName}</p>
                                                                <p className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-2xl">Lab {item.labNo}</p>
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
                                        {
                                            notes &&
                                            notes.map((item, idx) => {
                                                return (
                                                    <div
                                                        onClick={() => { handleMaterialDetails("labDetails", item) }}
                                                        className="border rounded-lg p-5 border-gray-200 cursor-pointer hover:bg-gray-50 my-3" key={idx}>
                                                        {/* <p>{item.createdAt}</p> */}
                                                        <div className="flex justify-between items-center gap-4">
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-base font-normal">{item.title}</p>
                                                                <p className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-2xl">Note</p>
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

                                    <div className="flex-1 border  m-3 rounded-lg p-5">
                                        <p className="text-center underline">Notices</p>
                                    </div>
                                </div>
                            </section>
                        }

                        {
                            !viewingCourse && <Add_Materials setRefetch={setRefetch} refetch={refetch} courseId={course._id} />
                        }

                    </section>
                }

                {
                    loading && <Sekeleton_CD_Header />
                }

            </div>
        </section>
    );
};

export default Course_Details;