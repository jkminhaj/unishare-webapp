const Skeleton_CourseCard = () => {
    return (
        <div className="border  relative animate-pulse rounded-lg p-5 min-h-36 flex flex-col justify-center items-center">
            <div className={`absolute text-xs bg-gray-300 shadow text-white p-2 py-1 rounded-lg  top-0 left-0 rounded-b-none rounded-r-2xl pr-4`}>
                <div className="flex items-center gap-1">
                    <span className="loading loading-ring loading-xs"></span>
                    <p>loading</p>
                </div>
            </div>

            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        </div>
    );
};

export default Skeleton_CourseCard;