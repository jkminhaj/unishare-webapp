import { useState } from "react";
import axiosInstance from "../../config/axiosIntance";

const Add_Materials = ({ courseId , setRefetch , refetch}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isInitialPage, setIsInitialPage] = useState(true);
    const [data, setData] = useState([]);

    const [imageUploading , setImageUploading] = useState(false);
    const [loading , setLoading] = useState(false);

    const isAssignment = selectedOption === "assignment";
    const isLab = selectedOption === "lab";
    const isNote = selectedOption === "note";

    const styles = {
        input: "border rounded-lg p-3 outline-none",
        textarea: "border outline-none p-3 rounded-lg  h-full resize-none"
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsInitialPage(false);
    };

    const handlePreviousPage = () => {
        setIsInitialPage(true);
        setSelectedOption(null);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Getting files to upload it on google drive

        const files = formData.getAll("files");
        const imageFormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            imageFormData.append('file', files[i]);
        }

        setImageUploading(true);
        try {
            const response = await axiosInstance.post('/uploadToDrive', imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(response.data.files);
            setData(response.data.files);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setImageUploading(false);
        }


        // Uploader data
        const uploader = {
            name: "Minhaj",
            email: "mmminhaj221@gmail.com",
            image: "https://lh3.googleusercontent.com/a/ACg8ocL6P9DblykuGNOEoWW66u3OcagbR7lGWApRBFWg2350J8qeYBa3pg=s288-c-no"
        }

        const apiData = new FormData();
        apiData.append("data",JSON.stringify(data));
        apiData.append("uploader",JSON.stringify(uploader));
        apiData.append("course",courseId);
        

        setLoading(true);
        if (isLab) {
            apiData.append('labName', formData.get('lab_name'));
            apiData.append('labNo', formData.get('lab_no'));
            apiData.append('details', formData.get('lab_description'));
            apiData.append('deadline', formData.get('lab_deadline'));

            try {
                const res = await axiosInstance.post("/api/labs/create",apiData);
                setRefetch(!refetch);
                alert("Successs Bro")

            } catch(err){
                console.log("error",err);
                alert("Failed")
            } finally {
                setLoading(false);
            }
        }

        if (isNote) {
            
            apiData.append('title', formData.get('note_title'));
            apiData.append('details', formData.get('note_description'));

            try {
                const res = await axiosInstance.post("/api/notes/create",apiData);
                setRefetch(!refetch);
                alert("Successs Bro")


            } catch(err){
                console.log("error",err);
                alert("Failed")
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
                const res = await axiosInstance.post("/api/assignments/create",apiData);
                setRefetch(!refetch);
                alert("Successs Bro")

            } catch(err){
                console.log("error",err);
                alert("Failed")
            } finally {
                setLoading(false);
            }

        }

    }

    return (
        <div>
            {isInitialPage && (
                <section>
                    <p className="my-3 mb-9 text-xl text-center">What do you want to share ?</p>
                    <div className="flex justify-between gap-3 mb-4">
                        <div
                            onClick={() => handleOptionClick('assignment')}
                            className={`cursor-pointer py-9 p-4 w-1/3 text-center border rounded ${selectedOption === 'assignment' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            Assignment
                        </div>
                        <div
                            onClick={() => handleOptionClick('note')}
                            className={`cursor-pointer py-9 p-4 w-1/3 text-center border rounded ${selectedOption === 'note' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            Note
                        </div>
                        <div
                            onClick={() => handleOptionClick('lab')}
                            className={`cursor-pointer py-9 p-4 w-1/3 text-center border rounded ${selectedOption === 'lab' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            Lab
                        </div>
                    </div>
                </section>
            )}



            {
                !isInitialPage &&
                <form onSubmit={handleSubmit}>
                    {isAssignment && (
                        <div className="gap-3 flex flex-col mt-2">
                            <input type="text" required={isAssignment} name="assignment_name" className={styles.input} placeholder="assignment name" />
                            <input type="number" required={isAssignment} name="assignment_no" className={styles.input} placeholder="assignment no" />
                            <input type="date" required={isAssignment} name="assignment_deadline" className={styles.input} placeholder="deadline" />
                            <textarea name="assignment_description" placeholder="description (optional)" className={styles.textarea} id=""></textarea>
                        </div>
                    )}

                    {isNote && (
                        <div className="gap-3 flex flex-col mt-2">
                            <input type="text" name="note_title" required={isNote} className={styles.input} placeholder="note title" />
                            <textarea name="note_description" className={styles.textarea} placeholder="description" id=""></textarea>
                        </div>
                    )}

                    {isLab && (
                        <div className="gap-3 flex flex-col mt-2">
                            <input type="text" required={isLab} name="lab_name" className={styles.input} placeholder="lab name" />
                            <input type="number" required={isLab} name="lab_no" className={styles.input} placeholder="lab no" />
                            <input type="date" required={isLab} name="lab_deadline" className={styles.input} placeholder="deadline" />
                            <textarea name="lab_description" className={styles.textarea} placeholder="description" id=""></textarea>
                        </div>
                    )}

                    <input
                        type="file"
                        name="files"
                        multiple
                        required
                        // onChange={handleFileUpload}
                        // use another 
                        className={`${styles.input} mt-3 w-full opacity-35`}
                    />

                    <button className="btn mt-3 w-full">Submit</button>


                </form>
            }

        </div>
    );
};

export default Add_Materials;