import React from 'react';
import { IoAdd } from "react-icons/io5";

const Add_Course = () => {
    return (
        <div className="bg-[#131920] hover:scale-105  transition-all  ease-in-out cursor-pointer rounded-lg p-5 md:min-h-36 flex flex-col justify-center items-center">
            <div className='flex flex-col items-center gap-1'>
                <IoAdd className='text-2xl text-gray-300' />
                <p className='text-gray-300'>Add Course</p>
            </div>
        </div>
    );
};

export default Add_Course;