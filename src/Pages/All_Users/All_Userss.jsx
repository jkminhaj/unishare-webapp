import { useEffect, useMemo, useState, useContext } from "react";
import axiosInstance from "../../config/axiosIntance";
import { FiSearch } from "react-icons/fi";
import { GlobalContext } from "../../context/GlobalProvider";


function extractUser(line) {
    const prefixSet = new Set([
        "MD", "MD.", "MUHAMMAD", "MOHAMMAD", "MOHAMED", "MOHAMMED",
        "MST", "MST.", "MOSAMMAT", "AL", "AL-", "AL."
    ]);
    function normalize(word) { return word.replace(/[\.\-]/g, "").toUpperCase().trim(); }

    const parts = line.trim().split(/\s+/);
    if (parts.length < 2) return null;

    const id = parts.pop();
    const fullName = parts.join(" ");
    let nickName = "";
    for (let w of parts) {
        if (!prefixSet.has(normalize(w))) { nickName = w; break; }
    }
    if (!nickName) nickName = parts[0];
    return { id, fullName, nickName };
}

function isUniName(str) { return /\d/.test(str); }

function isUniStudent(user) {
    return isUniName(user.name || user.studentId || user.id || "");
}

const DEPT_COLORS = {
    CSE: "#2399f0", MAT: "#8b5cf6", EEE: "#14b8a6", CS: "#f59e0b",
};

const ROLE_CONFIG = {
    cr:        { label: "CR",        icon: "⭐", bg: "rgba(245,158,11,.15)",  color: "#f59e0b" },
    developer: { label: "Dev",       icon: "⚡", bg: "rgba(139,92,246,.15)",  color: "#a78bfa" },
    student:   { label: "Student",   icon: "🎓", bg: "rgba(35,153,240,.15)",  color: "#2399f0" },
};

const AVATAR_PALETTE = ["#2399f0","#8b5cf6","#14b8a6","#f59e0b","#FF595A","#34C759"];

function getAvatarColor(name = "") {
    let h = 0;
    for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
    return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length];
}

function initials(name = "") {
    return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function fmtDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function totalContrib(user) {
    const a = user.contribution?.assignments?.length ?? 0;
    const l = user.contribution?.labs?.length ?? 0;
    const n = user.contribution?.notes?.length ?? 0;
    return a + l + n;
}


const Avatar = ({ user, size = 34 }) => {
    const color = getAvatarColor(user.name);
    return user.photo
        ? <img referrerPolicy="no-referrer" src={user.photo} alt={user.name}
               className="rounded-[9px] object-cover flex-shrink-0"
               style={{ width: size, height: size, border: "1.5px solid rgba(255,255,255,.08)" }} />
        : <div className="rounded-[9px] flex items-center justify-center font-bold text-white flex-shrink-0"
               style={{ width: size, height: size, background: color, fontSize: size * 0.35,
                        border: "1.5px solid rgba(255,255,255,.08)" }}>
               {initials(user.name)}
           </div>;
};

const RoleBadge = ({ role }) => {
    const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.student;
    return (
        <span className="inline-flex items-center gap-[3px] text-[10px] font-bold uppercase tracking-[.4px]
                         px-[7px] py-[2px] rounded-full"
              style={{ background: cfg.bg, color: cfg.color }}>
            {cfg.icon} {cfg.label}
        </span>
    );
};


const MemberRow = ({ user, rank, showEmail, isDeveloper }) => {
    const deptColor = DEPT_COLORS[user.department] || "#5a6a7a";

    // Try to extract structured info from name+id string
    const parsed = extractUser(`${user.name} ${user.studentId || user.username || ""}`);

    return (
        <div className="flex items-center gap-3 px-4 py-[10px] transition-colors duration-150 group"
             style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}
             onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.025)"}
             onMouseLeave={e => e.currentTarget.style.background = "transparent"}>

            {/* rank / index */}
            {rank !== undefined && (
                <span className="text-[11px] w-5 text-right flex-shrink-0"
                      style={{ color: "#334455" }}>
                    {rank}
                </span>
            )}

            <Avatar user={user} size={34} />

            {/* name + meta */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-[#d8e3ec] truncate">
                        {user.name}
                    </span>
                    <RoleBadge role={user.role} />
                </div>
                <div className="flex items-center gap-3 mt-[3px] flex-wrap">
                    {parsed?.id && (
                        <span className="text-[10px] font-mono" style={{ color: "#445566" }}>
                            {parsed.id}
                        </span>
                    )}
                    {user.department && (
                        <span className="text-[10px] font-semibold" style={{ color: deptColor }}>
                            {user.department}
                        </span>
                    )}
                    {isDeveloper && showEmail && user.email && (
                        <span className="text-[10px]" style={{ color: "#4a5a6a" }}>
                            {user.email}
                        </span>
                    )}
                </div>
            </div>

            {/* joined date */}
            <div className="text-right flex-shrink-0 hidden sm:block">
                <p className="text-[10px] uppercase tracking-[.4px]" style={{ color: "#334455" }}>Joined</p>
                <p className="text-[11px] mt-[2px]" style={{ color: "#5a6a7a" }}>{fmtDate(user.createdAt)}</p>
            </div>
        </div>
    );
};


const MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };

const RankRow = ({ user, position }) => {
    const total = totalContrib(user);
    const a = user.contribution?.assignments?.length ?? 0;
    const l = user.contribution?.labs?.length ?? 0;
    const n = user.contribution?.notes?.length ?? 0;
    const deptColor = DEPT_COLORS[user.department] || "#5a6a7a";
    const barW = total > 0 ? Math.max(4, Math.min(100, total * 5)) : 0;

    return (
        <div className="flex items-center gap-3 px-4 py-[10px] transition-colors duration-150"
             style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}
             onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.025)"}
             onMouseLeave={e => e.currentTarget.style.background = "transparent"}>

            {/* medal or number */}
            <div className="w-7 text-center flex-shrink-0">
                {MEDAL[position]
                    ? <span className="text-[15px]">{MEDAL[position]}</span>
                    : <span className="text-[11px] font-bold" style={{ color: "#334455" }}>{position}</span>}
            </div>

            <Avatar user={user} size={32} />

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#d8e3ec] truncate">{user.name}</span>
                    {user.department && (
                        <span className="text-[10px] font-semibold flex-shrink-0" style={{ color: deptColor }}>
                            {user.department}
                        </span>
                    )}
                </div>
                {/* progress bar */}
                <div className="mt-[5px] h-[3px] rounded-full overflow-hidden w-full"
                     style={{ background: "rgba(255,255,255,.06)" }}>
                    <div className="h-full rounded-full transition-all duration-500"
                         style={{ width: `${barW}%`, background: position <= 3
                             ? ["#f59e0b","#9aabb8","#CD7F32"][position - 1]
                             : "#2399f0" }} />
                </div>
                <div className="flex gap-3 mt-[4px]">
                    {[["Assign", a], ["Labs", l], ["Notes", n]].map(([label, val]) => (
                        <span key={label} className="text-[9px] uppercase tracking-[.3px]"
                              style={{ color: "#445566" }}>
                            {label} <span style={{ color: "#6a7a8a" }}>{val}</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex-shrink-0 text-right">
                <span className="text-[15px] font-bold" style={{ color: position <= 3 ? "#f59e0b" : "#5a6a7a" }}>
                    {total}
                </span>
                <p className="text-[9px] uppercase tracking-[.3px]" style={{ color: "#334455" }}>pts</p>
            </div>
        </div>
    );
};



const MEMBER_FILTERS = ["all", "student", "cr", "developer"];
const filterLabel    = { all: "All", student: "Students", cr: "CR", developer: "Dev" };

export default function All_Users() {
    const [loading, setLoading] = useState(true);
    const [users,   setUsers]   = useState([]);
    const [tab,     setTab]     = useState("members"); // "members" | "ranking"
    const [filter,  setFilter]  = useState("all");
    const [search,  setSearch]  = useState("");

    // Get logged-in user from your auth context — adjust as needed
    const { user: loggedUser } = useContext(GlobalContext);
    const isDeveloper = loggedUser?.role === "developer";

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/api/users/get_users");
                console.log("Fetched users:", res.data.users);
                setUsers(res.data.users);
            } catch (err) {
                console.log("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Only uni students
    const uniStudents = useMemo(() => users.filter(isUniStudent), [users]);

    const counts = useMemo(() => {
        const c = { all: uniStudents.length };
        ["student","cr","developer"].forEach(r => {
            c[r] = uniStudents.filter(u => u.role === r).length;
        });
        return c;
    }, [uniStudents]);

    const filteredMembers = useMemo(() => {
        let list = filter === "all" ? uniStudents : uniStudents.filter(u => u.role === filter);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(u =>
                u.name?.toLowerCase().includes(q) ||
                u.studentId?.toLowerCase().includes(q) ||
                u.username?.toLowerCase().includes(q)
            );
        }
        return list;
    }, [uniStudents, filter, search]);

    const rankedUsers = useMemo(() =>
        [...uniStudents].sort((a, b) => totalContrib(b) - totalContrib(a)),
    [uniStudents]);

    const Skeleton = () => (
        <div className="overflow-hidden rounded-xl" style={{ border: "1px solid rgba(255,255,255,.05)" }}>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-[10px] animate-pulse"
                     style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                    <div className="w-5 h-3 rounded" style={{ background: "#1a2535" }} />
                    <div className="w-[34px] h-[34px] rounded-[9px]" style={{ background: "#1a2535" }} />
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 rounded" style={{ background: "#1a2535" }} />
                        <div className="h-2 w-1/4 rounded" style={{ background: "#141e2b" }} />
                    </div>
                    <div className="w-16 h-3 rounded hidden sm:block" style={{ background: "#141e2b" }} />
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="pt-5 pb-16 flex flex-col" style={{ height: "calc(100vh - 60px)" }}>

                {/* ── Header ── */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5 flex-shrink-0">
                    <div>
                        <h1 className="text-[20px] font-bold text-white">Members</h1>
                        <p className="text-[12px] mt-1" style={{ color: "#5a6a7a" }}>
                            {uniStudents.length} university student{uniStudents.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    {/* Search — only in members tab */}
                    {tab === "members" && (
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2 min-w-[200px] w-full sm:w-auto"
                             style={{ background: "#141e2b", border: "1px solid rgba(255,255,255,.07)" }}>
                            <FiSearch className="text-[#5a6a7a] text-[14px] flex-shrink-0" />
                            <input
                                type="text" value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Search name or ID…"
                                className="bg-transparent outline-none text-white text-[13px] w-full placeholder:text-[#445566]"
                            />
                        </div>
                    )}
                </div>

                {/* ── Tabs ── */}
                <div className="flex gap-1 mb-4 flex-shrink-0 p-[3px] rounded-xl w-fit"
                     style={{ background: "#0e1620" }}>
                    {[["members", "Members"], ["ranking", "Ranking"]].map(([key, label]) => (
                        <button key={key} onClick={() => setTab(key)}
                                className="text-[12px] font-semibold px-4 py-[6px] rounded-[10px] transition-all duration-200"
                                style={tab === key
                                    ? { background: "#141e2b", color: "#e8edf2",
                                        boxShadow: "0 1px 6px rgba(0,0,0,.4)" }
                                    : { color: "#445566" }}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── Members tab: role filters ── */}
                {tab === "members" && (
                    <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                        {MEMBER_FILTERS.map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                    className="flex items-center gap-[5px] text-[11px] font-bold
                                               px-[12px] py-[4px] rounded-full transition-all border"
                                    style={filter === f
                                        ? { background: "#2399f0", color: "#fff", borderColor: "#2399f0" }
                                        : { background: "transparent", color: "#8899aa",
                                            borderColor: "rgba(255,255,255,.09)" }}>
                                {filterLabel[f]}
                                <span className="text-[10px] px-[6px] py-[1px] rounded-full"
                                      style={{ background: filter === f
                                          ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.1)" }}>
                                    {counts[f] ?? 0}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {/* ── Scrollable list container ── */}
                <div className="flex-1 overflow-ellipsis rounded-xl min-h-0"
                     style={{ border: "1px solid rgba(255,255,255,.06)", background: "#0f1924" }}>

                    {loading ? <Skeleton /> : tab === "members" ? (
                        filteredMembers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-2">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                                     stroke="#2a3a4a" strokeWidth="1.5">
                                    <circle cx="12" cy="8" r="4"/>
                                    <path d="M20 21a8 8 0 1 0-16 0"/>
                                </svg>
                                <p className="text-[12px]" style={{ color: "#5a6a7a" }}>No members found</p>
                            </div>
                        ) : (
                            filteredMembers.map((user, i) => (
                                <MemberRow
                                    key={user._id || i}
                                    user={user}
                                    rank={i + 1}
                                    isDeveloper={isDeveloper}
                                    showEmail={isDeveloper}
                                />
                            ))
                        )
                    ) : (
                        rankedUsers.map((user, i) => (
                            <RankRow key={user._id || i} user={user} position={i + 1} />
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}