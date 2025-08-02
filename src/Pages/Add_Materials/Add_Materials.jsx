import { useState } from "react";
import axiosInstance from "../../config/axiosIntance";
import toast, { Toaster } from 'react-hot-toast';
import { TbCloudUpload } from "react-icons/tb";
import { MdAssignment } from "react-icons/md";
import { PiNotebookFill } from "react-icons/pi";
import { BsPcDisplay } from "react-icons/bs";

const Add_Materials = ({ courseId, setRefetch, refetch }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isInitialPage, setIsInitialPage] = useState(true);

    const [imageUploading, setImageUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const isAssignment = selectedOption === "assignment";
    const isLab = selectedOption === "lab";
    const isNote = selectedOption === "note";

    const [selectedFiles, setSelectedFiles] = useState([]);
    const styles = {
        input: "border rounded-lg p-3 py-2 outline-none",
        textarea: "border outline-none p-3 rounded-lg  h-full resize-none"
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
                        : '#0EA5E9', // sky-500 for default

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
            borderLeft: `4px solid ${
                type === 'success'
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
        if (onFilesSelected) onFilesSelected(fileList);
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
            name: "Minhaj",
            email: "mmminhaj221@gmail.com",
            image: "https://lh3.googleusercontent.com/a/ACg8ocL6P9DblykuGNOEoWW66u3OcagbR7lGWApRBFWg2350J8qeYBa3pg=s288-c-no"
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
            apiData.append('deadline', formData.get('lab_deadline'));

            try {
                const res = await axiosInstance.post("/api/labs/create", apiData);
                setRefetch(!refetch);
                notify("Lab uploaded successfully");
                form.reset();
                setSelectedFiles([]);

            } catch (err) {
                console.log("error", err);
                notify("Something went wrong!","error")
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
                notify("Something went wrong!","error")
            } finally {
                setLoading(false);
            }
        }

        if (isAssignment) {

            apiData.append('assignmentName', formData.get('assignment_name'));
            apiData.append('assignmentNo', formData.get('assignment_no'));
            apiData.append('deadline', formData.get('assignment_deadline'));
            apiData.append('details', formData.get('assignment_description'));

            try {
                const res = await axiosInstance.post("/api/assignments/create", apiData);
                setRefetch(!refetch);
                notify("Assignment uploaded successfully")
                form.reset();
                setSelectedFiles([]);

            } catch (err) {
                console.log("error", err);
                notify("Something went wrong!","error")
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
                    <div className="flex flex-col md:flex-row  justify-between gap-3 mb-4">
                        <div
                            // data-aos="fade-right"
                            // data-aos-duration="1000"
                            onClick={() => handleOptionClick('assignment')}
                            className={`cursor-pointer md:py-32 p-4 w-full md:w-1/3 text-center border rounded ${selectedOption === 'assignment' ? 'bg-blue-600 text-white' : 'border-dashed border-teal-500 hover:bg-teal-50'}`}
                        >
                            <div className="flex justify-center gap-3 flex-col items-center">
                                <MdAssignment className="text-2xl md:text-5xl text-teal-500" />
                                Assignment
                            </div>
                        </div>
                        <div
                            // data-aos="fade-up"
                            // data-aos-duration="1000"
                            onClick={() => handleOptionClick('note')}
                            className={`cursor-pointer md:py-32 p-4 w-full md:w-1/3 text-center border rounded ${selectedOption === 'note' ? 'bg-blue-600 text-white' : 'border-dashed border-teal-500 hover:bg-teal-50'}`}
                        >
                            <div className="flex justify-center gap-3 flex-col items-center">
                                <PiNotebookFill className="text-2xl md:text-5xl text-teal-500" />
                                Note
                            </div>
                        </div>
                        <div
                            // data-aos="fade-left"
                            // data-aos-duration="1000"
                            onClick={() => handleOptionClick('lab')}
                            className={`cursor-pointer md:py-32 p-4 w-full md:w-1/3 text-center border rounded ${selectedOption === 'lab' ? 'bg-blue-600 text-white' : 'border-dashed border-teal-500 hover:bg-teal-50'}`}
                        >
                            <div className="flex justify-center gap-3 flex-col items-center">
                                <BsPcDisplay className="text-2xl md:text-5xl text-teal-500" />
                                Lab
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
                            <input type="date" required={isAssignment} name="assignment_deadline" className={styles.input} placeholder="deadline" />
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
                            <input type="date" required={isLab} name="lab_deadline" className={styles.input} placeholder="deadline" />
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
                            <p className="text-xs text-gray-400">(You can select multiple files)</p>
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
                            className="flex flex-col items-center justify-center h-36 w-full cursor-pointer border-2 border-dashed border-teal-400 rounded-lg bg-teal-50 hover:bg-teal-100 transition text-center"
                        >
                            <TbCloudUpload className="text-4xl text-teal-600 mb-2" />
                            <p className="text-sm text-gray-600">Click or drag files to upload</p>
                            <p className="text-xs text-gray-400">(Multiple files allowed)</p>
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

                    <button disabled={imageUploading || loading} className="btn disabled:cursor-not-allowed disabled:bg-teal-600 disabled:text-white bg-teal-600 text-white hover:bg-teal-700 mt-6 w-full">
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