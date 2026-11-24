// Kryptillion build.
// questions.js is the published source of truth. It is scrambled (not encrypted) so the answers,
// including each 1 in Kryptillion answer, can't be read at a glance in the public repo.
// Plain-text day files live in src/days/, which is git-ignored and never committed.
//
// Usage:
//   node tools/build.js                    merge src/days/*.js over the days already in questions.js, validate, write
//   node tools/build.js --from 2026-11-23  also drop days before this date from questions.js
//   node tools/build.js --unpack           write every day in questions.js out to src/days/ for editing, then stop
//
// A prompt can never be published twice: if a day reuses a prompt (same normalized text) that is
// already in "used" under a different date, the build fails. Rules for prompts and tiers: tools/TIERING.md.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const TIERS = ["a","t","b","c","d","g"];
const PER_DAY = 7;
const MIN_ANSWERS = 100;              // every prompt needs at least this many answers (entries, not aliases)
const MIN_ANSWERS_FROM = "2026-12-02"; // issues before this date were published under the old, softer rule
const PACK_KEY = "kryptillion-pull-list";

const args = process.argv.slice(2);
const fromIdx = args.indexOf("--from");
const FROM = fromIdx >= 0 ? args[fromIdx+1] : null;
const UNPACK = args.includes("--unpack");

function normStrict(s){
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")
    .replace(/&/g," and ").replace(/\bdoctor\b/g,"dr").replace(/\bmister\b/g,"mr").replace(/\bsaint\b/g,"st")
    .replace(/[^a-z0-9]/g,"");
}
const promptKey = p => normStrict(p);

function xor(buf){ const k = Buffer.from(PACK_KEY, "utf8"); const out = Buffer.alloc(buf.length); for (let i = 0; i < buf.length; i++) out[i] = buf[i] ^ k[i % k.length]; return out; }
const pack = obj => xor(Buffer.from(JSON.stringify(obj), "utf8")).toString("base64");
const unpack = str => JSON.parse(xor(Buffer.from(str, "base64")).toString("utf8"));

// Current published data
let prevDays = {}, prevUsed = [];
const qPath = path.join(root, "questions.js");
if (fs.existsSync(qPath)) {
  const w = {};
  new Function("window", fs.readFileSync(qPath, "utf8"))(w);
  const data = w.KRYPTILLION || (w.KRYPTILLION_PACK ? unpack(w.KRYPTILLION_PACK) : null);
  if (data) { prevDays = data.days || {}; prevUsed = data.used || []; }
}

const dir = path.join(root, "src", "days");
if (UNPACK) {
  fs.mkdirSync(dir, { recursive: true });
  for (const [date, prompts] of Object.entries(prevDays)) {
    const body = prompts.map(p => JSON.stringify(p).replace(/","/g, '",\n "')).join(",\n\n");
    fs.writeFileSync(path.join(dir, date + ".js"), `// Unpacked from questions.js\nD(${JSON.stringify(date)}, [\n${body}\n]);\n`);
  }
  console.log(`Unpacked ${Object.keys(prevDays).length} day(s) to src/days/.`);
  process.exit(0);
}

// Day files override the published copy of the same date
const srcDays = {};
global.D = (date, prompts) => { if (srcDays[date]) throw new Error("Duplicate day " + date); srcDays[date] = prompts; };
if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir).filter(f => /^\d{4}-\d{2}-\d{2}\.js$/.test(f)).sort()) require(path.join(dir, f));
const days = { ...prevDays, ...srcDays };
prevUsed = prevUsed.filter(u => !srcDays[u.d]);

let errors = 0, total = 0;
const usedMap = new Map(prevUsed.map(u => [promptKey(u.p), u]));
for (const [date, prompts] of Object.entries(days).sort()) {
  if (prompts.length !== PER_DAY) { console.log(`ERROR ${date} has ${prompts.length} prompts, needs ${PER_DAY}`); errors++; }
  const seenToday = new Set();
  prompts.forEach((q, i) => {
    const tag = `${date} #${i+1} "${q.p}"`;
    for (const k of Object.keys(q)) if (!["p","f","x",...TIERS].includes(k)) { console.log("ERROR unknown key", k, tag); errors++; }
    if (!q.p || !q.f || !q.a) { console.log("ERROR missing p/f/a", tag); errors++; }
    const k = promptKey(q.p);
    if (seenToday.has(k)) { console.log("ERROR prompt repeated within day", tag); errors++; }
    seenToday.add(k);
    const prior = usedMap.get(k);
    if (prior && prior.d !== date) { console.log(`ERROR prompt already used on ${prior.d}:`, tag); errors++; }
    usedMap.set(k, { d: date, p: q.p });
    const gems = (q.g || "").split(";").filter(s => s.trim());
    if (gems.length !== 1) { console.log("ERROR needs exactly one 1 in Kryptillion answer", tag); errors++; }
    const owner = new Map(); let n = 0;
    for (const t of TIERS) {
      if (!q[t]) continue;
      for (const entry of q[t].split(";")) {
        if (!entry.trim()) { console.log("ERROR empty entry", t, tag); errors++; continue; }
        n++;
        for (const name of entry.split("|")) {
          const key = normStrict(name);
          if (!key) { console.log("ERROR empty alias", tag, entry); errors++; continue; }
          if (owner.has(key) && owner.get(key) !== entry) { console.log("ERROR alias collision", JSON.stringify(name), tag, "::", owner.get(key), "vs", entry); errors++; }
          owner.set(key, entry);
        }
      }
    }
    total += n;
    if (n < MIN_ANSWERS) {
      if (date >= MIN_ANSWERS_FROM) { console.log(`ERROR only ${n} answers, needs at least ${MIN_ANSWERS}`, tag); errors++; }
      else console.log(`note small answer pool (${n})`, tag);
    }
  });
}
if (errors) { console.log(`\n${errors} errors. questions.js not written.`); process.exit(1); }

const keepDays = {};
for (const [date, prompts] of Object.entries(days).sort()) if (!FROM || date >= FROM) keepDays[date] = prompts;
const used = [...usedMap.values()].sort((a, b) => a.d.localeCompare(b.d) || a.p.localeCompare(b.p));

const header = `// Kryptillion questions. Generated by tools/build.js. Do not hand-edit.
// The data is scrambled so answers aren't readable at a glance. To edit, run: node tools/build.js --unpack
`;
fs.writeFileSync(qPath, header + `window.KRYPTILLION_PACK = "${pack({ days: keepDays, used })}";\n`);
console.log(`Wrote questions.js: ${Object.keys(keepDays).length} day(s) live (${Object.keys(keepDays).join(", ")}), ${total} answers checked, ${used.length} prompts in history.`);
