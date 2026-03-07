import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Question_Bank_Details() {
    const [tab, setTab] = useState("mid");

    const questions = [
        { id: 1, title: "Mid Question 2022" },
        { id: 2, title: "Mid Question 2023" },
        { id: 3, title: "Mid Question 2024" }
    ];

    return (
        <div className="min-h-screen  p-6">

            {/* Page Header */}
            <div className="max-w-5xl mx-auto mb-3">
                <h1 className="text-3xl font-semibold ">
                    Data Structures Question Bank
                </h1>
                <p className="text-gray-500 mt-1">
                    Browse previous mid and final exam questions
                </p>
            </div>

            <div className="max-w-5xl mx-auto rounded-2xl pt-5">

                {/* Top Controls */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    {/* Tabs */}
                    <div className="relative flex bg-gray-100 rounded-lg p-1 w-fit">

                        {/* Sliding background */}
                        <span
                            className={`absolute top-1 bottom-1 w-1/2 bg-blue-500 rounded-md shadow transition-all duration-300 ${tab === "mid" ? "left-1" : "left-[calc(50%-2px)]"
                                }`}
                        ></span>

                        <button
                            onClick={() => setTab("mid")}
                            className={`relative px-5 py-2 rounded-md text-sm font-medium z-10 transition-colors duration-300 ${tab === "mid" ? "text-white" : "text-gray-600"
                                }`}
                        >
                            Mid Exam
                        </button>

                        <button
                            onClick={() => setTab("final")}
                            className={`relative px-5 py-2 rounded-md text-sm font-medium z-10 transition-colors duration-300 ${tab === "final" ? "text-white" : "text-gray-600"
                                }`}
                        >
                            Final Exam
                        </button>

                    </div>

                    {/* Batch Select */}
                    <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option>Batch 52</option>
                        <option>Batch 53</option>
                        <option>Batch 54</option>
                    </select>
                </div>

                {/* Question List */}
                <div className="grid sm:grid-cols-2 gap-4">
                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md hover:border-blue-400 transition cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <IoDocumentTextOutline className="text-xl text-blue-500" />
                                <span className="text-gray-700 font-medium">{q.title}</span>
                            </div>

                            <button className="text-sm text-blue-500 hover:underline">
                                View
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}