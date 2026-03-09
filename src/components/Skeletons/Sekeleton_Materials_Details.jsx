const Sekeleton_Materials_Details = () => {
    return (
        <section className="max-w-[800px] mx-auto pt-5 animate-pulse">
            <div className="flex gap-3 items-center">
                <div className="md:text-2xl text-white rounded-full p-5 bg-[#131920]" />
                <div className="h-8 w-2/3 bg-[#131920] rounded" />
            </div>

            <div className="mt-3 mb-5 h-4 w-full bg-[#131920] rounded" />
            <div className="mt-2 mb-5 h-4 w-4/5 bg-[#131920] rounded" />

            <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-[#131920] rounded" />
                <div className="flex items-center gap-3">
                    <div className="h-4 w-24 bg-[#131920] rounded" />
                    <div className="w-7 h-7 bg-[#131920] rounded-full" />
                </div>
            </div>

            <hr className="my-4 border-[#131920]" />

            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                {[1].map((_, idx) => (
                    <div key={idx} className="bg-[#131920] p-2 rounded-xl w-full">
                        <div className="h-10 md:h-16 w-2/3 rounded mx-auto" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Sekeleton_Materials_Details;