import { useState } from "react";
import MetaData from "../config/MetaData";

const Cover_Generator = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden">
      <MetaData
        title="UU Cover Generator"
        icon="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/33/e7/c7/33e7c78b-26d4-5562-4073-d68669fbe887/AppIcon-85-220-0-5-0-0-2x-0-0.png/1200x630bb.png"
      />

      {/* Landing screen */}
      <div
        className={`absolute inset-0 z-10 transition-all duration-700 ease-in-out ${started ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
          }`}
        style={{ background: "#1d2733" }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(33,150,243,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(33,150,243,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
            style={{
              background: "rgba(33,150,243,0.12)",
              border: "1px solid rgba(33,150,243,0.3)",
              color: "#64b5f6",
              animation: "slideDown 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              style={{ animation: "pulse 2s infinite" }}
            />
            Uttara University Cover Generator
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-tight mb-4 tracking-tight"
            style={{
              fontSize: "clamp(28px, 5vw, 52px)",
              color: "#f0f4ff",
              letterSpacing: "-0.03em",
              animation: "slideDown 0.7s 0.1s cubic-bezier(0.34,1.56,0.64,1) both",
              opacity: 0,
            }}
          >
            Your cover page,{" "}
            <span style={{ color: "#2196f3" }}>ready in 1 click</span>
          </h1>

          {/* Subtext */}
          <p
            className="max-w-md mb-10 leading-relaxed"
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "#8896b3",
              animation: "slideDown 0.7s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
              opacity: 0,
            }}
          >
            Fill in your details — topic, course, teacher, student info — and get a{" "}
            <strong style={{ color: "#b0c4e8" }}>professional assignment cover</strong> instantly.
            Download as PDF or PNG, completely{" "}
            <strong style={{ color: "#b0c4e8" }}>free</strong>.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setStarted(true)}
            className="flex items-center gap-3 font-bold rounded-xl text-white transition-all"
            style={{
              background: "#2196f3",
              padding: "14px 28px",
              fontSize: "15px",
              border: "none",
              cursor: "pointer",
              animation: "slideDown 0.7s 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1976d2";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(33,150,243,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2196f3";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            Generate Cover Page
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </button>

          {/* Feature pills */}
          <div
            className="flex flex-wrap justify-center gap-3 mt-8"
            style={{
              animation: "slideDown 0.7s 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
              opacity: 0,
            }}
          >
            {[
              {
                icon: (
                  <svg width="14" height="14" fill="none" stroke="#2196f3" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                ),
                text: "PDF & PNG export"
              },
              {
                icon: (
                  <svg width="14" height="14" fill="none" stroke="#2196f3" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                ),
                text: "Auto-saves your info"
              },
              {
                icon: (
                  <svg width="14" height="14" fill="none" stroke="#2196f3" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
                text: "Live preview"
              },
              {
                icon: (
                  <svg width="14" height="14" fill="none" stroke="#2196f3" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ),
                text: "100% free"
              },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                style={{
                  color: "#8896b3",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {icon}
                {text}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* Generator iframe */}
      <iframe
        src="/cover.html"
        className="w-full h-screen border-none"
        style={{
          opacity: started ? 1 : 0,
          transition: "opacity 0.5s ease 0.3s",
        }}
      />
    </div>
  );
};

export default Cover_Generator;