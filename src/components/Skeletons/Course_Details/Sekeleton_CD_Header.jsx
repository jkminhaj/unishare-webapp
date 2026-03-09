import React from 'react';

const Sekeleton_CD_Header = () => {
    return (
        <header className="bg-[#131920] text-white md:pt-16 p-6 md:p-7 rounded-lg animate-pulse">
            <div className="h-7 md:h-10 w-2/3 bg-[#333a42] rounded mb-3"></div>
            <div className="h-5 md:h-6 w-1/3 bg-[#333a42] rounded mb-3"></div>

            <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-[#333a42] rounded-full"></div>
                    <div className="h-4 w-8 bg-[#333a42] rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-[#333a42] rounded-full"></div>
                    <div className="h-4 w-8 bg-[#333a42] rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-[#333a42] rounded-full"></div>
                    <div className="h-4 w-8 bg-[#333a42] rounded"></div>
                </div>
            </div>
        </header>
    );
};

export default Sekeleton_CD_Header;
