import React from 'react';

const UploadMaterialTest = () => {
    return (
        <div className='p-5'>
           <p>Assingment posting</p>

           <section className='mt-5'>
            <input type="text" className='border outline-none p-2 px-4 rounded-xl' name="" id="" placeholder='assignment name' />
            <input type="number" className='border outline-none p-2 px-4 rounded-xl' name="" id="" placeholder='assignment no' />
            <input className='border outline-none p-2 px-4 rounded-xl' type="date" name="" id="" />
           </section>

        </div>
    );
};

export default UploadMaterialTest;