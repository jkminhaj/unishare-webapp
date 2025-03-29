import React from 'react';

const Sekeleton_CD_Header = () => {
    return (
        <header className="bg-gray-200 text-white pt-16 p-7 rounded-lg animate-pulse">
            <div className="h-10 w-2/3 bg-gray-100 rounded mb-3"></div>
            <div className="h-6 w-1/3 bg-gray-100 rounded mb-3"></div>

            <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-100 rounded-full"></div>
                    <div className="h-4 w-8 bg-gray-100 rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-100 rounded-full"></div>
                    <div className="h-4 w-8 bg-gray-100 rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-100 rounded-full"></div>
                    <div className="h-4 w-8 bg-gray-100 rounded"></div>
                </div>
            </div>
        </header>
    );
};

export default Sekeleton_CD_Header;
