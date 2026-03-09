import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosIntance";
import { GlobalContext } from "../../context/GlobalProvider";
import { ImLab } from "react-icons/im";
import { PiNotebookFill } from "react-icons/pi";
import { MdAssignment } from "react-icons/md";
import Sekeleton_CD_Header from "../../components/Skeletons/Course_Details/Sekeleton_CD_Header";
import Add_Materials from "../Add_Materials/Add_Materials";
import { FaPlus } from "react-icons/fa";
import messages from "../../noFilesMessages.json";
import Skeleton_Material_List from "../../components/Skeletons/Course_Details/Skeleton_Material_List";
import { BsPcDisplay } from "react-icons/bs";
import MetaData from "../../config/MetaData";
import { IoIosArrowBack } from "react-icons/io";

const Course_Details = () => {
    const courseId = useParams().id;
    const navigate = useNavigate();
    const { setMaterialData } = useContext(GlobalContext);
    const [refetch, setRefetch] = useState(0);
    const [random] = useState(() => {
        return messages[Math.floor(Math.random() * messages.length)];
    });
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
        navigate(`/${route}/${material._id}`);
        setMaterialData(material);
    }
    return (
        <section className="min-h-max">
            <MetaData title={course?.courseName} />
            <div className="mt-3 pb-5">
                {
                    !loading &&
                    <section>
                        {/* assignments ,  courseName , labs , notes , semester , _id , faculty , courseCode = course ; */}
                        <header className={`bg-gradient-to-r from-blue-600 to-blue-500 ease-in-out duration-300 transform transition-all
                            ${viewingCourse ? "md:p-7 p-5" : "p-4 px-7"}
                             text-white   rounded-lg ${viewingCourse ? "pt-5 md:pt-16" : "py-5 md:py-10"}`}>
                            <div className={`flex justify-between ${viewingCourse ? "items-end" : "items-center"}`}>
                                <div>
                                    <p className="md:text-4xl text-xl font-semibold ">{course?.courseName}</p>

                                    {
                                        viewingCourse &&
                                        <div className=" ease-in-out duration-300 transform transition-all">
                                            <p className="md:text-xl text-sm my-3 transition-all">{course?.faculty}</p>
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center gap-1">
                                                    {/* <ImLab /> */}
                                                    <BsPcDisplay />
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
                                </div>
                                <button className="flex items-center  bg-white text-blue-600 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition md:px-3 p-2  md:py-2 hover:shadow text-xs md:text-base shadow-none gap-2 " onClick={() => { setViewingCourse(!viewingCourse) }}>{viewingCourse ? <FaPlus className="text-xs" /> : <IoIosArrowBack />} {viewingCourse ? "Upload" : "Back"} </button>
                            </div>
                        </header>


                        {/* main materials */}
                        {/* // materialName , materialNo , createdAt , data [arr] , deadline , uploader {name , email , image } , _id = material ; */}
                        {
                            viewingCourse && !materialLoading &&
                            <section>
                                <div className="mt-5">
                                    <div className=" pr-2">
                                        {
                                            assignments &&
                                            assignments.map((item, idx) => {
                                                return (
                                                    <div

                                                        onClick={() => { handleMaterialDetails("assignmentDetails", item) }}
                                                        className=" rounded-lg p-5 bg-[#131920] cursor-pointer  hover:ml-5 transition-all duration-300 ease-in-out border border-transparent my-3" key={idx}>
                                                        {/* <p>{item.createdAt}</p> */}
                                                        <div className="flex justify-between items-center gap-4">
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-xs md:text-base font-normal">{item.assignmentName}</p>
                                                                {/* <p className="text-xs text-white bg-blue-500 px-2 py-1 rounded-2xl md:hidden block">Assig. {item.assignmentNo}</p> */}
                                                                <p className="text-xs text-white bg-[#FF595A] px-2 py-1 rounded-2xl md:block hidden">Assignment {item.assignmentNo}</p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-sm hidden md:block">Uploaded by</p>
                                                                <img title={item.uploader.name} className="w-8 md:w-6 rounded-xl" src={item.uploader.image} alt="" />
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
                                                        className="rounded-lg p-5 bg-[#131920] cursor-pointer  hover:ml-5 transition-all duration-300 ease-in-out border border-transparent my-3" key={idx}>
                                                        {/* <p>{item.createdAt}</p> */}
                                                        <div className="flex justify-between items-center gap-4">
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-xs md:text-base font-normal">{item.labName}</p>
                                                                <p className="text-xs  text-white bg-[#34C759] px-2 py-1 rounded-2xl">Lab {item.labNo}</p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-sm hidden md:block">Uploaded by</p>
                                                                <img title={item.uploader.name} className="w-8 md:w-6 rounded-xl" src={item.uploader.image} alt="" />
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
                                                        onClick={() => { handleMaterialDetails("noteDetails", item) }}
                                                        className="rounded-lg p-5 bg-[#131920] cursor-pointer  hover:ml-5 transition-all duration-300 ease-in-out border border-transparent my-3" key={idx}>
                                                        {/* <p>{item.createdAt}</p> */}
                                                        <div className="flex justify-between items-center gap-4">
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-xs md:text-base font-normal">{item.title}</p>
                                                                <p className="text-xs text-white bg-[#248BED] px-2 py-1 rounded-2xl">Note</p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-sm hidden md:block">Uploaded by</p>
                                                                <img title={item.uploader.name} className="w-8 md:w-6 rounded-xl" src={item.uploader.image} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>

                                    {/* <div className="flex-1 border hidden md:block  m-3 rounded-lg p-5">
                                        <p className="text-center underline">Notices</p>
                                    </div> */}
                                </div>
                            </section>
                        }



                        {
                            !viewingCourse &&
                            <Add_Materials setRefetch={setRefetch} refetch={refetch} courseId={course._id} />
                        }

                        {
                            viewingCourse && assignments.length == 0 && !materialLoading && notes.length == 0 && labs.length == 0 &&
                            <div className="flex text-gray-200 flex-col items-center justify-center my-16 text-center px-4">
                                {/* <h1 className="text-6xl font-bold text-gray-800 animate-bounce">Nothing to see !</h1> */}
                                {/* <div className="mt-6 text-3xl animate-bounce">¯\_(ツ)_/¯</div> */}
                                <p className="mt-2 md:text-2xl font-semibold ">
                                    {random.title}
                                </p>
                                <p className=" md:text-base text-sm mt-1">
                                    {random.subtitle}
                                </p>
                                <button
                                    onClick={() => window.history.back()}
                                    className="mt-6 md:px-6 py-2 text-white md:text-base text-xs rounded-xl shadow-md bg-[#2399f0] transition duration-300 px-3"
                                >
                                    <span className="flex items-center gap-1">
                                        <IoIosArrowBack />
                                        Go Back
                                    </span>
                                </button>

                            </div>

                        }

                    </section>
                }

                {loading && <Sekeleton_CD_Header />}
                {viewingCourse && materialLoading && <Skeleton_Material_List />}

            </div>
        </section>
    );
};

export default Course_Details;