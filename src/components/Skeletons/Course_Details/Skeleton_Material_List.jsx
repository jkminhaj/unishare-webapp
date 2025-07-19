const SkeletonItem = () => (
  <div className="border rounded-lg p-5 border-gray-200 animate-pulse my-3">
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-blue-100 rounded-2xl"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-4 w-16 hidden md:block bg-gray-200 rounded"></div>
        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
      </div>
    </div>
  </div>
);

const Skeleton_Material_List = () => {
  const skeletonCount = 4;
  return (
    <section>
      {/* <div className="flex gap-3 justify-between">
        <div className="max-h-80  pr-3 w-full ">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <SkeletonItem key={idx} />
          ))}
        </div>
        <div className="flex-1 border hidden md:block m-3 rounded-lg p-5 animate-pulse">
          <div className="h-4 w-24 mx-auto bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 w-full bg-gray-200 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div> */}
      <div className="flex items-center mt-16 justify-center min-h-[200px]">
        <div>
          <span className="loading loading-spinner text-emerald-600 loading-lg"></span>
        </div>
      </div>
    </section>
  );
};

export default Skeleton_Material_List;