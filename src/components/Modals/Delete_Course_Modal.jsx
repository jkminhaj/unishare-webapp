import React, { useState, useRef } from 'react';
import { FiEye, FiEyeOff, FiTrash2, FiX } from 'react-icons/fi';
import axiosInstance from '../../config/axiosIntance';
export const Delete_Course_Modal = ({ courseName, courseId, onClose, refetch }) => {
    const [pass, setPass]       = useState("");
    const [show, setShow]       = useState(false);
    const [error, setError]     = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const overlayRef            = useRef(null);
    const PASSCODE = import.meta.env.VITE_DELETE_PASSCODE || "unishare123";
    const handleDelete = async () => {
        if (!pass.trim()) return setError("Passcode is required.");
        if (pass !== PASSCODE) return setError("Wrong passcode. Try again.");
        setLoading(true);
        setError("");
        try {
            await axiosInstance.delete(`/api/courses/delete/${courseId}`);
            setSuccess(true);
            setTimeout(() => { onClose(); }, 900);
            refetch();
        } catch (err) {
            console.error("Delete course error:", err);
            setError(err?.response?.data?.message || "Delete failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            ref={overlayRef}
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            style={{ animation: "fdIn .18s ease" }}
        >
            <div
                className="w-full max-w-[400px] rounded-[20px] overflow-hidden bg-[#141e2b] border border-white/[0.08]"
                style={{ animation: "slideUp .2s ease" }}
            >
                <div className="" />

                <div className="flex items-start justify-between p-5 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-[#FF595A]/10 flex items-center justify-center flex-shrink-0">
                            <FiTrash2 className="text-[#FF595A] text-[15px]" />
                        </div>
                        <div>
                            <p className="text-[15px] font-semibold text-white">Delete Course</p>
                            <p className="text-[11px] text-[#5a6a7a] mt-[2px] max-w-[200px] truncate">{courseName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/[0.08] text-[#8899aa] flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition-colors"
                    >
                        <FiX className="text-[13px]" />
                    </button>
                </div>

                <div className="px-5 pb-6 flex flex-col gap-4">
                    <p className="text-[12px] text-[#7a8a9a] leading-relaxed">
                        This action is <span className="text-[#FF595A] font-semibold">permanent</span> and cannot be undone.
                        Enter the admin passcode to confirm.
                    </p>

                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[.6px] text-[#5a6a7a] mb-[5px]">
                            Passcode
                        </label>
                        <div className="relative">
                            <input
                                type={show ? "text" : "password"}
                                value={pass}
                                placeholder="Enter passcode"
                                autoFocus
                                onKeyDown={(e) => { if (e.key === "Enter") handleDelete(); }}
                                onChange={(e) => { setPass(e.target.value); setError(""); }}
                                className={`w-full bg-[#0d1520] rounded-xl px-[14px] py-[10px] pr-10 text-[13px] text-[#e8edf2] outline-none transition-all placeholder:text-[#3a4a5a]
                                    ${error
                                        ? "border border-[#FF595A] shadow-[0_0_0_3px_rgba(255,89,90,0.1)]"
                                        : "border border-white/[0.08] focus:border-[#2399f0] focus:shadow-[0_0_0_3px_rgba(35,153,240,0.12)]"
                                    }`}
                            />
                            <button
                                onClick={() => setShow(v => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6a7a] hover:text-[#8899aa] transition-colors"
                            >
                                {show ? <FiEyeOff className="text-[14px]" /> : <FiEye className="text-[14px]" />}
                            </button>
                        </div>
                        {error && <p className="text-[11px] text-[#FF595A] font-medium mt-[5px]">{error}</p>}
                    </div>

                </div>

                <div className="flex gap-3 px-5 pb-5">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 bg-white/5 border border-white/[0.08] text-[#8899aa] rounded-xl py-[10px] text-[13px] font-semibold hover:bg-white/[0.09] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading || success}
                        className={`flex-[2] rounded-xl py-[10px] text-[13px] font-semibold text-white flex items-center justify-center gap-2 transition-all
                            ${success ? "bg-[#34C759]" : "bg-[#FF595A] hover:opacity-90"}
                            ${(loading || success) ? "opacity-80 cursor-not-allowed" : ""}`}
                    >
                        {loading ? (
                            <>
                                <span className="w-[14px] h-[14px] rounded-full border-2 border-white/30 border-t-white animate-spin flex-shrink-0" />
                                Deleting…
                            </>
                        ) : success ? (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                                Deleted!
                            </>
                        ) : (
                            <>
                                <FiTrash2 className="text-[14px]" />
                                Delete Course
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fdIn    { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};