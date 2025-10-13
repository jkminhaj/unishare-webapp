export default function extractUser(line) {

    const prefixSet = new Set([
        "MD", "MD.", "MUHAMMAD", "MOHAMMAD", "MOHAMED", "MOHAMMED",
        "MST", "MST.", "MOSAMMAT",
        "AL", "AL-", "AL."
    ]);

    function normalize(word) {
        return word.replace(/[\.\-]/g, "").toUpperCase().trim();
    }

    const parts = line.trim().split(/\s+/);
    if (parts.length < 2) return null;

    const id = parts.pop();
    const fullName = parts.join(" ");

    let nickName = "";
    for (let w of parts) {
        if (!prefixSet.has(normalize(w))) {
            nickName = w;
            break;
        }
    }
    if (!nickName) nickName = parts[0];

    return { id, fullName, nickName };
}