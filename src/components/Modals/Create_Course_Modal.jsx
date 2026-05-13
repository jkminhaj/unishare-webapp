import { useEffect, useRef, useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import axiosInstance from "../../config/axiosIntance";

const DEFAULT_SECTION  = "61B";
const DEFAULT_SEMESTER = 6;

const InputField = ({ label, id, placeholder, value, onChange, error, optional }) => (
    <div className="flex flex-col gap-[5px]">
        <label
            htmlFor={id}
            className="text-[11px] font-bold uppercase tracking-[.6px]"
            style={{ color: "#5a6a7a" }}
        >
            {label}
            {optional && (
                <span className="ml-1 text-[10px] font-medium normal-case tracking-normal" style={{ color: "#3a4a5a" }}>
                    optional
                </span>
            )}
        </label>
        <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            className="rounded-xl px-[14px] py-[11px] text-[13px] outline-none transition-all"
            style={{
                background: "#0d1520",
                border: `1px solid ${error ? "#FF595A" : "rgba(255,255,255,.08)"}`,
                color: "#e8edf2",
                boxShadow: error ? "0 0 0 3px rgba(255,89,90,.1)" : "none",
            }}
            onFocus={e => {
                if (!error) {
                    e.target.style.borderColor = "#2399f0";
                    e.target.style.boxShadow   = "0 0 0 3px rgba(35,153,240,.12)";
                }
            }}
            onBlur={e => {
                if (!error) {
                    e.target.style.borderColor = "rgba(255,255,255,.08)";
                    e.target.style.boxShadow   = "none";
                }
            }}
        />
        {error && (
            <p className="text-[11px] font-medium" style={{ color: "#FF595A" }}>{error}</p>
        )}
    </div>
);

export default function Create_Course_Modal({ open, onClose, refetch}) {
    const [form, setForm]       = useState({ courseName: "", courseCode: "", faculty: "" });
    const [errors, setErrors]   = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const overlayRef            = useRef(null);

    useEffect(() => {
        if (!open) return;
        setForm({ courseName: "", courseCode: "", faculty: "" });
        setErrors({});
        setSuccess(false);
    }, [open]);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape" && open) handleClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open]);

    const set = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors(er => ({ ...er, [field]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.courseName.trim()) e.courseName = "Course name is required";
        if (!form.faculty.trim())    e.faculty    = "Faculty name is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            const payload = {
                courseName : form.courseName.trim(),
                courseCode : form.courseCode.trim() || "Not provided",
                faculty    : form.faculty.trim(),
                section    : DEFAULT_SECTION,
                semester   : DEFAULT_SEMESTER,
            };
            const res = await axiosInstance.post("/api/courses/create", payload);
            setSuccess(true);
            setTimeout(() => {
                handleClose();
                refetch();
            }, 900);
        } catch (err) {
            console.error("Create course error:", err);
            setErrors({ api: err?.response?.data?.message || "Something went wrong. Try again." });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => { if (!loading) onClose(); };

    if (!open) return null;

    return (
        <div
            ref={overlayRef}
            onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,.65)", backdropFilter: "blur(4px)", animation: "fdIn .18s ease" }}
        >
            <div
                className="w-full max-w-[460px] rounded-[22px] overflow-hidden"
                style={{ background: "#141e2b", border: "1px solid rgba(255,255,255,.08)", animation: "slideUp .2s ease" }}
            >
                

                <div className="flex items-start justify-between px-6 pt-[22px] pb-[18px]">
                    <div>
                        <h2 className="text-[17px] font-semibold text-white">Create New Course</h2>
                        <p className="text-[12px] mt-[3px]" style={{ color: "#5a6a7a" }}>
                            Section {DEFAULT_SECTION} · Semester {DEFAULT_SEMESTER}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "#8899aa" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
                    >
                        <FiX className="text-[14px]" />
                    </button>
                </div>

                <div className="flex flex-col gap-[14px] px-6 pb-2">
                    <InputField
                        label="Course Name"
                        id="courseName"
                        placeholder="e.g. Java Programming"
                        value={form.courseName}
                        onChange={set("courseName")}
                        error={errors.courseName}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <InputField
                            label="Course Code"
                            id="courseCode"
                            placeholder="e.g. CSE0613207"
                            value={form.courseCode}
                            onChange={set("courseCode")}
                            optional
                        />
                        <InputField
                            label="Faculty"
                            id="faculty"
                            placeholder="e.g. Dr. Rafiqul"
                            value={form.faculty}
                            onChange={set("faculty")}
                            error={errors.faculty}
                        />
                    </div>

                    {errors.api && (
                        <p
                            className="text-[12px] font-medium px-3 py-2 rounded-xl"
                            style={{ background: "rgba(255,89,90,.08)", color: "#FF595A", border: "1px solid rgba(255,89,90,.15)" }}
                        >
                            {errors.api}
                        </p>
                    )}
                </div>

                <div className="flex gap-3 px-6 py-5">
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="flex-1 rounded-xl py-[11px] text-[13px] font-semibold transition-colors"
                        style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "#8899aa" }}
                        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "rgba(255,255,255,.09)"; }}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || success}
                        className="flex-[2] rounded-xl py-[11px] text-[13px] font-semibold text-white flex items-center justify-content-center justify-center gap-2 transition-opacity"
                        style={{
                            background: success ? "#34C759" : "#2399f0",
                            opacity: loading || success ? 0.85 : 1,
                            cursor: loading || success ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? (
                            <>
                                <span
                                    className="w-[14px] h-[14px] rounded-full border-2 border-white/30 border-t-white animate-spin"
                                    style={{ flexShrink: 0 }}
                                />
                                Creating…
                            </>
                        ) : success ? (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Created!
                            </>
                        ) : (
                            <>
                                <FiPlus className="text-[14px]" />
                                Create Course
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fdIn    { from{opacity:0}              to{opacity:1}                              }
                @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
            `}</style>
        </div>
    );
}
