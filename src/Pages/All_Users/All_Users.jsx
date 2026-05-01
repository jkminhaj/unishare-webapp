import { useEffect, useMemo, useState, useContext } from "react";
import axiosInstance from "../../config/axiosIntance";
import { FiSearch } from "react-icons/fi";
import { GlobalContext } from "../../context/GlobalProvider";

function extractUser(line) {
    const prefixSet = new Set(["MD","MD.","MUHAMMAD","MOHAMMAD","MOHAMED","MOHAMMED","MST","MST.","MOSAMMAT","AL","AL-","AL."]);
    const normalize = w => w.replace(/[\.\-]/g,"").toUpperCase().trim();
    const parts = line.trim().split(/\s+/);
    if (parts.length < 2) return null;
    const id = parts.pop();
    let nickName = "";
    for (let w of parts) { if (!prefixSet.has(normalize(w))) { nickName = w; break; } }
    return { id, fullName: parts.join(" "), nickName: nickName || parts[0] };
}
function isUniName(str) { return /\d/.test(str); }
function isUniStudent(u) { return isUniName(u.name || u.studentId || u.id || ""); }
function totalContrib(u) {
    return (u.contribution?.assignments?.length ?? 0)
         + (u.contribution?.labs?.length ?? 0)
         + (u.contribution?.notes?.length ?? 0);
}
function fmtDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-GB",{ day:"2-digit", month:"short", year:"numeric" });
}


const AVATAR_PALETTE = ["#2399f0","#8b5cf6","#14b8a6","#f59e0b","#FF595A","#34C759"];
const MEDAL = { 1:"🥇", 2:"🥈", 3:"🥉" };
const MEMBER_FILTERS = ["all","student","cr","developer"];
const FILTER_LABEL   = { all:"All", student:"Students", cr:"CR", developer:"Dev" };

const DEPT_COLOR = { CSE:"text-[#2399f0]", MAT:"text-purple-400", EEE:"text-teal-400", CS:"text-amber-400" };

const ROLE_BADGE = {
    cr:        { label:"CR",      cls:"bg-amber-400/10 text-amber-400" },
    developer: { label:"Dev",     cls:"bg-purple-400/10 text-purple-400" },
    student:   { label:"Student", cls:"bg-[#2399f0]/10 text-[#2399f0]" },
};

function avatarColor(name="") {
    let h=0; for (const c of name) h=c.charCodeAt(0)+((h<<5)-h);
    return AVATAR_PALETTE[Math.abs(h)%AVATAR_PALETTE.length];
}
function initials(name="") { return name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(); }

const Avatar = ({ user, size="w-9 h-9" }) => {
    const bg = avatarColor(user.name);
    return user.photo
        ? <img referrerPolicy="no-referrer" src={user.photo} alt={user.name}
               className={`${size} rounded-[10px] object-cover flex-shrink-0 border border-white/[.07]`} />
        : <div className={`${size} rounded-[10px] flex-shrink-0 flex items-center justify-center
                           text-xs font-bold text-white border border-white/[.07]`}
               style={{ background: bg }}>
              {initials(user.name)}
          </div>;
};


const RoleBadge = ({ role }) => {
    const cfg = ROLE_BADGE[role] || ROLE_BADGE.student;
    return (
        <span className={`text-[10px] font-bold uppercase tracking-[.5px] px-2 py-[2px] rounded-full ${cfg.cls}`}>
            {cfg.label}
        </span>
    );
};


const MemberRow = ({ user, rank, isDeveloper }) => {
    const parsed  = extractUser(`${user.name} ${user.studentId||user.username||""}`);
    const deptCls = DEPT_COLOR[user.department] || "text-slate-500";
    return (
        <div className="flex items-center gap-3 px-5 py-[10px] border-b border-white/[.035]
                        hover:bg-[#2399f0]/[.04] transition-colors duration-150 cursor-default">
            <span className="w-5 text-right text-[11px] font-semibold text-slate-700 flex-shrink-0">{rank}</span>
            <Avatar user={user} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-[#dce8f0] tracking-[.1px]">{user.name}</span>
                    <RoleBadge role={user.role} />
                    {user.department && (
                        <span className={`text-[10px] font-bold tracking-[.4px] ${deptCls}`}>{user.department}</span>
                    )}
                </div>
                {parsed?.id && (
                    <span className="text-[10px] font-mono text-slate-600 mt-[2px] block">{parsed.id}</span>
                )}
                {isDeveloper && user.email && (
                    <span className="text-[10px] text-slate-700 mt-[1px] block">{user.email}</span>
                )}
            </div>
            <div className="text-right flex-shrink-0 hidden sm:block">
                <p className="text-[9px] uppercase tracking-[.5px] text-slate-700">Joined</p>
                <p className="text-[11px] text-slate-500 mt-[2px]">{fmtDate(user.createdAt)}</p>
            </div>
        </div>
    );
};

const RankRow = ({ user, position }) => {
    const total  = totalContrib(user);
    const a      = user.contribution?.assignments?.length ?? 0;
    const l      = user.contribution?.labs?.length ?? 0;
    const n      = user.contribution?.notes?.length ?? 0;
    const barW   = total > 0 ? Math.max(4, Math.min(100, total*8)) : 0;
    const deptCls = DEPT_COLOR[user.department] || "text-slate-500";
    const podium  = position===1?"text-amber-400":position===2?"text-slate-400":position===3?"text-orange-400":"text-[#2399f0]";
    const barClr  = position===1?"#f59e0b":position===2?"#9aabb8":position===3?"#CD7F32":"#2399f0";

    return (
        <div className="flex items-center gap-3 px-5 py-[10px] border-b border-white/[.035]
                        hover:bg-[#2399f0]/[.04] transition-colors duration-150 cursor-default">
            <div className="w-7 text-center flex-shrink-0">
                {MEDAL[position]
                    ? <span className="text-base">{MEDAL[position]}</span>
                    : <span className="text-[11px] font-bold text-slate-700">{position}</span>}
            </div>
            <Avatar user={user} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#dce8f0]">{user.name}</span>
                    {user.department && (
                        <span className={`text-[10px] font-bold ${deptCls}`}>{user.department}</span>
                    )}
                </div>
                <div className="mt-[6px] h-[3px] rounded-full overflow-hidden bg-white/[.05] w-full">
                    <div className="h-full rounded-full transition-all duration-500"
                         style={{ width:`${barW}%`, background:barClr }} />
                </div>
                <div className="flex gap-4 mt-1">
                    {[["Assign",a],["Labs",l],["Notes",n]].map(([lbl,val])=>(
                        <span key={lbl} className="text-[9px] uppercase tracking-[.4px] text-slate-700">
                            {lbl} <span className="text-slate-600">{val}</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0 text-right">
                <span className={`text-lg font-black leading-none ${podium}`}>{total}</span>
                <p className="text-[9px] uppercase tracking-[.5px] text-slate-700 mt-[2px]">pts</p>
            </div>
        </div>
    );
};


const SkeletonRow = () => (
    <div className="flex items-center gap-3 px-5 py-[10px] border-b border-white/[.035] animate-pulse">
        <div className="w-5 h-3 rounded bg-[#1a2535]" />
        <div className="w-9 h-9 rounded-[10px] bg-[#1a2535] flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-[#1a2535]" />
            <div className="h-2 w-1/5 rounded bg-[#141e2b]" />
        </div>
        <div className="w-14 h-3 rounded bg-[#141e2b] hidden sm:block" />
    </div>
);


export default function All_Users() {
    const [loading, setLoading] = useState(true);
    const [users,   setUsers]   = useState([]);
    const [tab,     setTab]     = useState("members");
    const [filter,  setFilter]  = useState("all");
    const [search,  setSearch]  = useState("");
    const [focused, setFocused] = useState(false);

    const { user: loggedUser } = useContext(GlobalContext);
    const isDeveloper = loggedUser?.role === "developer";

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/api/users/get_users");
                setUsers(res.data.users);
            } catch (err) { console.log(err); }
            finally { setLoading(false); }
        })();
    }, []);

    const uniStudents = useMemo(() => users.filter(isUniStudent), [users]);

    const counts = useMemo(() => {
        const c = { all: uniStudents.length };
        ["student","cr","developer"].forEach(r => { c[r] = uniStudents.filter(u=>u.role===r).length; });
        return c;
    }, [uniStudents]);

    const filteredMembers = useMemo(() => {
        let list = filter==="all" ? uniStudents : uniStudents.filter(u=>u.role===filter);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(u =>
                u.name?.toLowerCase().includes(q) ||
                u.studentId?.toLowerCase().includes(q) ||
                u.username?.toLowerCase().includes(q));
        }
        return list;
    }, [uniStudents, filter, search]);

    const rankedUsers = useMemo(() =>
        [...uniStudents].sort((a,b) => totalContrib(b)-totalContrib(a)), [uniStudents]);

    return (
        <div className="flex flex-col py-6 pt-4 overflow-hidden" style={{ height:"calc(100vh - 68px)" }}>

            {/* hide scrollbar globally for this page */}
            <style>{`
                .no-scroll::-webkit-scrollbar { display:none; }
                .no-scroll { scrollbar-width:none; -ms-overflow-style:none; }
                @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
                .fade-up { animation:fadeUp .2s ease both; }
            `}</style>

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 flex-shrink-0">
                <div>
                    <h1 className="text-xl font-semibold text-[#e0ecf5] tracking-tight m-0">University Users</h1>
                    <p className="text-xs text-slate-600 mt-1">
                        {uniStudents.length} university student{uniStudents.length!==1?"s":""}
                    </p>
                </div>

                {/* Search */}
                {tab === "members" && (
                    <div className={`flex items-center gap-2 rounded-2xl px-4 py-[9px] min-w-[220px]
                                     transition-all duration-200
                                     ${focused
                                        ? "bg-[#2399f0]/[.06] border border-[#2399f0]/40 shadow-[0_0_0_3px_rgba(35,153,240,.07)]"
                                        : "bg-[#0d1722] border border-white/[.06]"}`}>
                        <FiSearch className={`text-sm flex-shrink-0 transition-colors duration-200
                                              ${focused ? "text-[#2399f0]" : "text-slate-600"}`} />
                        <input
                            type="text" value={search} onChange={e=>setSearch(e.target.value)}
                            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
                            placeholder="Search name or ID…"
                            className="bg-transparent border-none outline-none text-[#dce8f0] text-[13px]
                                       w-full placeholder:text-slate-700 caret-[#2399f0]"
                        />
                        {search && (
                            <button onClick={()=>setSearch("")}
                                    className="text-slate-600 hover:text-[#2399f0] text-lg leading-none
                                               bg-transparent border-none cursor-pointer flex-shrink-0
                                               transition-colors duration-150">
                                ×
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-[3px] mb-4 flex-shrink-0 bg-[#0a1219] rounded-xl p-[3px] w-fit">
                {[["members","Members"],["ranking","Ranking"]].map(([key,lbl])=>(
                    <button key={key} onClick={()=>setTab(key)}
                            className={`text-xs font-bold px-5 py-[6px] rounded-[10px] border-none
                                        cursor-pointer transition-all duration-200 tracking-[.2px]
                                        ${tab===key
                                            ? "bg-[#131f2e] text-[#e0ecf5] shadow-[0_2px_8px_rgba(0,0,0,.35)]"
                                            : "bg-transparent text-slate-600 hover:text-slate-400"}`}>
                        {lbl}
                    </button>
                ))}
            </div>

            {/* Role filters */}
            {tab === "members" && (
                <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                    {MEMBER_FILTERS.map(f => (
                        <button key={f} onClick={()=>setFilter(f)}
                                className={`flex items-center gap-[6px] text-[11px] font-bold uppercase
                                            tracking-[.3px] px-3 py-[5px] rounded-full border cursor-pointer
                                            transition-all duration-150
                                            ${filter===f
                                                ? "bg-[#2399f0] border-[#2399f0] text-white"
                                                : "bg-transparent border-white/[.07] text-slate-500 hover:text-slate-300"}`}>
                            {FILTER_LABEL[f]}
                            <span className={`text-[10px] px-[6px] py-[1px] rounded-full
                                              ${filter===f ? "bg-white/25 text-white" : "bg-white/[.08] text-slate-600"}`}>
                                {counts[f]??0}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* List */}
            <div className="no-scroll flex-1 overflow-y-auto rounded-2xl min-h-0
                            bg-[#0b1620] border border-white/[.05]">
                {loading ? (
                    [...Array(7)].map((_,i)=><SkeletonRow key={i}/>)
                ) : tab==="members" ? (
                    filteredMembers.length===0 ? (
                        <div className="flex flex-col items-center justify-center h-44 gap-3">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                                 stroke="#1e3040" strokeWidth="1.5">
                                <circle cx="12" cy="8" r="4"/>
                                <path d="M20 21a8 8 0 1 0-16 0"/>
                            </svg>
                            <p className="text-xs text-slate-700">No members found</p>
                        </div>
                    ) : (
                        <div className="fade-up">
                            {filteredMembers.map((u,i)=>(
                                <MemberRow key={u._id||i} user={u} rank={i+1} isDeveloper={isDeveloper}/>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="fade-up">
                        {rankedUsers.map((u,i)=>(
                            <RankRow key={u._id||i} user={u} position={i+1}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
