import axios from 'axios';
import React, { useState } from 'react';

const UploadMaterialTest = () => {
  return (
    <div className='p-5'>
      <p>Assingment posting</p>
      <FileUpload />
      <section className='mt-5'>
        <input type="text" className='border outline-none p-2 px-4 rounded-xl' name="" id="" placeholder='assignment name' />
        <input type="number" className='border outline-none p-2 px-4 rounded-xl' name="" id="" placeholder='assignment no' />
        <input className='border outline-none p-2 px-4 rounded-xl' type="date" name="" id="" />
      </section>

    </div>
  );
};

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    console.log("file", e.target.files[0]);

    try {
      const response = await axios.post('http://localhost:5000/uploadToDrive', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      setFileUrl(response.data.url);
      console.log(response.data);
      setFile(e.target.files[0]);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Open the modal for previewing the file
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileUpload}
          className="border p-2"
        />
      </div>

      {file && (
        <div className="mb-4">
          <h3>Uploaded File:</h3>
          {file.type.startsWith('image') ? (
            <img
              src={fileUrl}
              alt="Thumbnail"
              onClick={openModal}
              className="cursor-pointer max-w-xs"
            />
          ) : (
            <div className="cursor-pointer text-blue-500" onClick={openModal}>
              Preview PDF
            </div>
          )}
        </div>
      )}


      <div>
        <a href={fileUrl} download className="text-blue-500">
          Download File
        </a>
      </div>
    </div>
  );
};

export default UploadMaterialTest;