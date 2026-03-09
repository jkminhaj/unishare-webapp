import { useContext, useState } from "react";
import axiosInstance from "../../config/axiosIntance";
import toast, { Toaster } from 'react-hot-toast';
import { TbCloudUpload } from "react-icons/tb";
import { MdAssignment } from "react-icons/md";
import { PiNotebookFill } from "react-icons/pi";
import { BsPcDisplay } from "react-icons/bs";
import { GlobalContext } from "../../context/GlobalProvider";

const Add_Materials = ({ courseId, setRefetch, refetch }) => {
    const { user } = useContext(GlobalContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isInitialPage, setIsInitialPage] = useState(true);

    const [imageUploading, setImageUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const isAssignment = selectedOption === "assignment";
    const isLab = selectedOption === "lab";
    const isNote = selectedOption === "note";

    const [selectedFiles, setSelectedFiles] = useState([]);
    const styles = {
        input: "bg-[#131920] rounded-lg p-3 py-2 outline-none ",
        textarea: "outline-none bg-[#131920] p-3 rounded-lg  h-full resize-none"
    }

    const notify = (message, type = 'success') => {
        return toast(message, {
            duration: 4000,
            position: 'top-right',

            icon:
                type === 'success'
                    ? '✅'
                    : type === 'error'
                        ? '❌'
                        : type === 'loading'
                            ? '⏳'
                            : '🔔',

            iconTheme: {
                primary:
                    type === 'success'
                        ? '#14B8A6' // teal-500
                        : type === 'error'
                            ? '#F87171' // red-400
                            : '#0EA5E9', // sky-500 

                secondary: '#ffffff',
            },

            style: {
                background:
                    type === 'success'
                        ? '#F0FDFA' // teal-50
                        : type === 'error'
                            ? '#FEF2F2' // red-50
                            : '#F0F9FF', // sky-50
                color:
                    type === 'success'
                        ? '#115E59' // teal-800
                        : type === 'error'
                            ? '#991B1B' // red-800
                            : '#0C4A6E', // sky-900
                borderLeft: `4px solid ${type === 'success'
                        ? '#14B8A6'
                        : type === 'error'
                            ? '#F87171'
                            : '#0EA5E9'
                    }`,
                borderRadius: '10px',
                padding: '14px 20px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                fontWeight: 500,
                fontSize: '15px',
            },

            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });
    };




    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsInitialPage(false);
    };

    const handlePreviousPage = () => {
        setIsInitialPage(true);
        setSelectedOption(null);
    };

    const handleFiles = (files) => {
        const fileList = Array.from(files);
        setSelectedFiles(fileList);
        // if (onFilesSelected) onFilesSelected(fileList);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const files = formData.getAll("files");
        const imageFormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            imageFormData.append('file', files[i]);
        }

        setImageUploading(true);
        let uploadedFiles = [];
        try {
            const response = await axiosInstance.post('/uploadToDrive', imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.files);
            uploadedFiles = response.data.files;

        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setImageUploading(false);
            setLoading(true);
        }


        // Uploader data
        const uploader = {
            name: user.displayName,
            email: user.email,
            image: user?.photoURL
        }

        const apiData = new FormData();
        // console.log("data" , uploadedFiles);
        apiData.append("data", JSON.stringify(uploadedFiles));
        apiData.append("uploader", JSON.stringify(uploader));
        apiData.append("course", courseId);


        // console.log([...apiData.entries()]);

        setLoading(true);
        if (isLab) {
            apiData.append('labName', formData.get('lab_name'));
            apiData.append('labNo', formData.get('lab_no'));
            apiData.append('details', formData.get('lab_description'));
            // apiData.append('deadline', formData.get('lab_deadline'));

            try {
                const res = await axiosInstance.post("/api/labs/create", apiData);
                setRefetch(!refetch);
                notify("Lab uploaded successfully");
                form.reset();
                setSelectedFiles([]);

            } catch (err) {
                console.log("error", err);
                notify("Something went wrong!", "error")
            } finally {
                setLoading(false);
            }
        }

        if (isNote) {

            apiData.append('title', formData.get('note_title'));
            apiData.append('details', formData.get('note_description'));

            try {
                const res = await axiosInstance.post("/api/notes/create", apiData);
                console.log(res)
                setRefetch(!refetch);
                notify("Note uploaded successfully")
                form.reset();
                setSelectedFiles([]);


            } catch (err) {
                console.log("error", err);
                notify("Something went wrong!", "error")
            } finally {
                setLoading(false);
            }
        }

        if (isAssignment) {

            apiData.append('assignmentName', formData.get('assignment_name'));
            apiData.append('assignmentNo', formData.get('assignment_no'));
            // apiData.append('deadline', formData.get('assignment_deadline'));
            apiData.append('details', formData.get('assignment_description'));

            try {
                const res = await axiosInstance.post("/api/assignments/create", apiData);
                setRefetch(!refetch);
                notify("Assignment uploaded successfully")
                form.reset();
                setSelectedFiles([]);

            } catch (err) {
                console.log("error", err);
                notify("Something went wrong!", "error")
            } finally {
                setLoading(false);
            }

        }

    }

    // const handleCheck =()=>{
    //     notify("ssignment uploaded successfully","error")
    // }

    return (
        <div className="mt-10 pb-5">
            {isInitialPage && (
                <section>
                    <p className="my-3 mb-9 text-xl text-center">What do you want to share ?</p>
                    <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                        {/* Assignment Card - Red Theme */}
                        <div
                            onClick={() => handleOptionClick('assignment')}
                            className={`cursor-pointer transition-all duration-300 ease-in-out md:py-32 p-4 w-full md:w-1/3 text-center border rounded-xl 
                                    ${selectedOption === 'assignment'
                                    ? 'border-[#FF595A] bg-[#FF595A]/20 text-[#FF595A] shadow-[0_0_15px_rgba(255,89,90,0.2)]'
                                    : 'border-dashed border-gray-600 text-gray-200 hover:border-[#FF595A] hover:bg-[#FF595A]/10 hover:text-[#FF595A]'}`}
                        >
                            <div className="flex justify-center gap-3 flex-col items-center">
                                <MdAssignment className={`text-2xl md:text-5xl ${selectedOption === 'assignment' ? 'text-[#FF595A]' : 'text-gray-300'}`} />
                                <span className="font-medium">Assignment</span>
                            </div>
                        </div>

                        {/* Note Card - Blue Theme */}
                        <div
                            onClick={() => handleOptionClick('note')}
                            className={`cursor-pointer transition-all duration-300 ease-in-out md:py-32 p-4 w-full md:w-1/3 text-center border rounded-xl 
                                    ${selectedOption === 'note'
                                    ? 'border-[#248BED] bg-[#248BED]/20 text-[#248BED] shadow-[0_0_15px_rgba(36,139,237,0.2)]'
                                    : 'border-dashed border-gray-600 text-gray-200 hover:border-[#248BED] hover:bg-[#248BED]/10 hover:text-[#248BED]'}`}
                        >
                            <div className="flex justify-center gap-3 flex-col items-center">
                                <PiNotebookFill className={`text-2xl md:text-5xl ${selectedOption === 'note' ? 'text-[#248BED]' : 'text-gray-300'}`} />
                                <span className="font-medium">Note</span>
                            </div>
                        </div>

                        {/* Lab Card - Green Theme */}
                        <div
                            onClick={() => handleOptionClick('lab')}
                            className={`cursor-pointer transition-all duration-300 ease-in-out md:py-32 p-4 w-full md:w-1/3 text-center border rounded-xl 
                                     ${selectedOption === 'lab'
                                    ? 'border-[#34C759] bg-[#34C759]/20 text-[#34C759] shadow-[0_0_15px_rgba(52,199,89,0.2)]'
                                    : 'border-dashed border-gray-600 text-gray-200 hover:border-[#34C759] hover:bg-[#34C759]/10 hover:text-[#34C759]'}`}
                        >
                            <div className="flex justify-center gap-3 flex-col items-center">
                                <BsPcDisplay className={`text-2xl md:text-5xl ${selectedOption === 'lab' ? 'text-[#34C759]' : 'text-gray-300'}`} />
                                <span className="font-medium">Lab</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}



            {
                !isInitialPage &&
                <form onSubmit={handleSubmit}>
                    {isAssignment && (
                        <div className="gap-3 flex flex-col md:mt-2">
                            <input type="text" required={isAssignment} name="assignment_name" className={styles.input} placeholder="assignment name" />
                            <input type="number" required={isAssignment} name="assignment_no" className={styles.input} placeholder="assignment no" />
                            {/* <input type="date" required={isAssignment} name="assignment_deadline" className={styles.input} placeholder="deadline" /> */}
                            <textarea name="assignment_description" placeholder="description (optional)" className={styles.textarea} id=""></textarea>
                        </div>
                    )}

                    {isNote && (
                        <div className="gap-3 flex flex-col md:mt-2">
                            <input type="text" name="note_title" required={isNote} className={styles.input} placeholder="note title" />
                            <textarea name="note_description" className={styles.textarea} placeholder="description" id=""></textarea>
                        </div>
                    )}

                    {isLab && (
                        <div className="gap-3 flex flex-col md:mt-2">
                            <input type="text" required={isLab} name="lab_name" className={styles.input} placeholder="lab name" />
                            <input type="number" required={isLab} name="lab_no" className={styles.input} placeholder="lab no" />
                            {/* <input type="date" required={isLab} name="lab_deadline" className={styles.input} placeholder="deadline" /> */}
                            <textarea name="lab_description" className={styles.textarea} placeholder="description" id=""></textarea>
                        </div>
                    )}

                    {/* <input
                        type="file"
                        name="files"
                        multiple
                        required
                        // onChange={handleFileUpload}
                        // use another 
                        className={`${styles.input} mt-3 w-full h-16 border-dashed`}
                    /> */}
                    {/* <div className="mt-3 w-full">
                        <label
                            htmlFor="fileUpload"
                            className="flex flex-col items-center justify-center h-32 w-full cursor-pointer border-2 border-dashed border-teal-400 rounded-lg bg-teal-50 hover:bg-teal-100 transition"
                        >
                            <TbCloudUpload className="text-4xl text-teal-600 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload files</p>
                            <p className="text-xs text-gray-200">(You can select multiple files)</p>
                        </label>
                        <input
                            type="file"
                            id="fileUpload"
                            name="files"
                            multiple
                            required
                            // onChange={onChange}
                            className="hidden"
                        />
                    </div> */}

                    <div className="w-full mt-3">
                        <label
                            htmlFor="fileUpload"
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className="flex flex-col items-center justify-center h-36 w-full cursor-pointer  hover:bg-[#0e1318] border-[#131920] rounded-lg  bg-[#131920] transition text-center"
                        >
                            <TbCloudUpload className="text-4xl animate-pulse text-white mb-2" />
                            <p className="text-sm text-gray-200">Click or drag files to upload</p>
                            <p className="text-xs text-gray-200">(Multiple files allowed)</p>
                            <input
                                type="file"
                                id="fileUpload"
                                name="files"
                                multiple
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>

                        {selectedFiles.length > 0 && (
                            <div className="mt-3 space-y-1 text-sm text-gray-700">
                                <strong className="block font-normal mb-1">Selected Files :</strong>
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="truncate ml-2">
                                        {file.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button disabled={imageUploading || loading} className="btn border-0 disabled:cursor-not-allowed disabled:bg-[#131920] disabled:text-white bg-blue-500 text-white hover:bg-[#131920] mt-6 w-full">
                        {!imageUploading && !loading && "Upload"}
                        {imageUploading && <div className="flex items-center gap-3" ><span className="loading loading-spinner loading-sm"></span> Uploading file ... </div>}
                        {!imageUploading && loading && <div className="flex items-center gap-3"><span className="loading loading-spinner loading-sm"></span> <span>Finalizing data...</span></div>}
                    </button>


                </form>
            }
            <Toaster />
        </div>
    );
};

export default Add_Materials;