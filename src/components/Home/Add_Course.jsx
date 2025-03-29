import React from 'react';
import { IoAdd } from "react-icons/io5";

const Add_Course = () => {
    return (
        <div className="border hover:shadow transition duration-300 cursor-pointer rounded-lg p-5 md:min-h-36 flex flex-col justify-center items-center">
            <div className='flex flex-col items-center gap-1'>
                <IoAdd className='text-2xl text-gray-400' />
                <p className='text-gray-400'>Add Course</p>
            </div>
        </div>
    );
};

export default Add_Course;