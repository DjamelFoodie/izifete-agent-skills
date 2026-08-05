/**
 * CONTRÔLE DU CATALOGUE DE QUESTIONS  (04/08/2026)
 *
 * Le catalogue nourrit trois choses : le champ `description` de chaque SKILL.md
 * (le SEUL que l'agent lit pour choisir une skill), les fixtures d'eval, et la
 * feuille de route de contenu. Un doublon y coûte deux fois : il gonfle
 * faussement la couverture, et il fausse le taux de réussite des evals.
 *
 * Sort en erreur (exit 1) si un défaut bloquant est trouvé.
 * Usage : node scripts/valider-catalogue.mjs [--seuil=0.75]
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const SEUIL = Number((process.argv.find((a) => a.startsWith("--seuil=")) || "").split("=")[1] || 0.75);

/** Métiers et événements de référence — doivent rester alignés sur le site. */
const METIERS = ["traiteur", "streetfood", "dj", "photographe", "videaste", "photobooth",
  "decorateur", "animation", "patissier", "fleuriste", "location", "chef", "maquilleur",
  "coiffeur", "lieu", "esthetique"];
const EVENEMENTS = ["mariage", "anniversaire", "bapteme", "seminaire", "soiree-entreprise",
  "evjf-evg", "fete-famille", "noel-fin-annee", "association-village"];

/* ---------- chargement ---------- */
const dossier = join(RACINE, "catalog");
const fichiers = readdirSync(dossier).filter((f) => /^questions.*\.json$/.test(f)).sort();
if (!fichiers.length) { console.error("Aucun fichier de questions dans catalog/."); process.exit(1); }

/** « presta » et « prestataire » désignent la même chose selon les fichiers.
 *  Sans cette normalisation le comptage sous-estime silencieusement une cohorte
 *  entière — c'est exactement le genre d'erreur qu'un contrôle doit empêcher,
 *  pas produire. */
const normCote = (c) => (/^presta/i.test(c || "") ? "presta" : /^client/i.test(c || "") ? "client" : null);

const Q = [];
for (const f of fichiers) {
  let j;
  try { j = JSON.parse(readFileSync(join(dossier, f), "utf8")); }
  catch (e) { console.error(`${f} : JSON illisible — ${e.message}`); process.exit(1); }
  const parDefaut = j.meta?.cote;
  for (const q of j.questions || []) Q.push({ ...q, cote: normCote(q.cote || parDefaut), _fichier: f });
}
const sansCote = Q.filter((q) => !q.cote);
if (sansCote.length) console.log(`⚠️  ${sansCote.length} question(s) sans côté identifiable (ex. ${sansCote[0].id})`);

/* ---------- normalisation ----------
 * On compare le SENS, pas la ponctuation : minuscules, accents retirés, mots
 * vides écartés. Deux questions qui ne diffèrent que par la ville restent
 * distinctes (la ville est un mot porteur) — c'est voulu, une ville différente
 * est une vraie variante de formulation.                                     */
const VIDES = new Set(["le", "la", "les", "un", "une", "des", "du", "de", "d", "et", "ou",
  "a", "au", "aux", "en", "pour", "par", "sur", "avec", "sans", "je", "j", "on", "mon", "ma",
  "mes", "notre", "nos", "est", "ce", "c", "que", "qui", "quoi", "il", "elle", "y", "pas",
  "plus", "me", "se", "s", "n", "l", "dans", "faire", "fait", "etre", "avoir"]);

const mots = (s) => (s || "").toLowerCase()
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/)
  .filter((m) => m.length > 1 && !VIDES.has(m));

const jaccard = (a, b) => {
  const A = new Set(a), B = new Set(b);
  if (!A.size || !B.size) return 0;
  let inter = 0; for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
};

/* ---------- contrôles bloquants ---------- */
const bloquants = [];

const ids = Q.map((q) => q.id);
const idsDup = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
if (idsDup.length) bloquants.push(`${idsDup.length} identifiant(s) en double : ${idsDup.slice(0, 8).join(", ")}`);

const incompletes = Q.filter((q) => !q.id || !q.q || !q.skill);
if (incompletes.length) bloquants.push(`${incompletes.length} entrée(s) sans id, sans question ou sans skill`);

const skillsReelles = new Set(readdirSync(join(RACINE, "skills")));
const skillsInconnues = [...new Set(Q.map((q) => q.skill).filter((s) => s && !skillsReelles.has(s)))];
if (skillsInconnues.length) bloquants.push(`skill(s) inexistante(s) : ${skillsInconnues.join(", ")}`);

const metiersInconnus = [...new Set(Q.flatMap((q) => q.metiers || []).filter((m) => !METIERS.includes(m)))];
if (metiersInconnus.length) bloquants.push(`métier(s) hors référentiel : ${metiersInconnus.join(", ")}`);

const evInconnus = [...new Set(Q.map((q) => q.evenement).filter((e) => e && !EVENEMENTS.includes(e)))];
if (evInconnus.length) bloquants.push(`événement(s) hors référentiel : ${evInconnus.join(", ")}`);

/* ---------- doublons de sens ---------- */
const prep = Q.map((q) => ({ ...q, _m: mots(q.q) }));
const exact = new Map();
const quasi = [];
for (let i = 0; i < prep.length; i++) {
  const cle = prep[i]._m.slice().sort().join(" ");
  if (exact.has(cle)) exact.get(cle).push(prep[i]); else exact.set(cle, [prep[i]]);
  for (let j = i + 1; j < prep.length; j++) {
    const s = jaccard(prep[i]._m, prep[j]._m);
    if (s >= SEUIL) quasi.push({ a: prep[i], b: prep[j], s });
  }
}
const identiques = [...exact.values()].filter((g) => g.length > 1);
if (identiques.length) bloquants.push(`${identiques.length} groupe(s) de questions IDENTIQUES au sens près`);

/* ---------- rapport ---------- */
const n = (x) => String(x).padStart(4);
console.log(`CATALOGUE — ${fichiers.length} fichier(s), ${Q.length} questions\n`);
console.log(`  client       ${n(Q.filter((q) => q.cote === "client").length)}`);
console.log(`  prestataire  ${n(Q.filter((q) => q.cote === "presta").length)}`);
console.log(`  pièges       ${n(Q.filter((q) => q.piege).length)}`);

const grouper = (cle) => Q.reduce((acc, q) => {
  const v = q[cle]; if (!v) return acc;
  for (const x of Array.isArray(v) ? v : [v]) acc[x] = (acc[x] || 0) + 1;
  return acc;
}, {});

console.log("\nPAR SKILL");
const parSkill = grouper("skill");
for (const s of [...skillsReelles].sort()) {
  const c = parSkill[s] || 0;
  console.log(`  ${n(c)}  ${s}${c === 0 ? "   <-- AUCUNE QUESTION" : c < 15 ? "   (faible)" : ""}`);
}

console.log("\nPAR MÉTIER");
const parMetier = grouper("metiers");
for (const [m, c] of METIERS.map((m) => [m, parMetier[m] || 0]).sort((a, b) => a[1] - b[1]))
  console.log(`  ${n(c)}  ${m}${c < 12 ? "   (à renforcer)" : ""}`);

console.log("\nPAR ÉVÉNEMENT");
const parEv = grouper("evenement");
const totEv = Object.values(parEv).reduce((a, b) => a + b, 0) || 1;
for (const [e, c] of EVENEMENTS.map((e) => [e, parEv[e] || 0]).sort((a, b) => b[1] - a[1])) {
  const pct = Math.round((c / totEv) * 100);
  console.log(`  ${n(c)}  (${String(pct).padStart(2)} %)  ${e}${e === "mariage" && pct > 35 ? "   <-- Izifete n'est pas un site de mariage" : ""}`);
}

if (quasi.length) {
  console.log(`\nQUASI-DOUBLONS (ressemblance >= ${SEUIL}) : ${quasi.length}`);
  for (const d of quasi.sort((a, b) => b.s - a.s).slice(0, 15)) {
    console.log(`  ${d.s.toFixed(2)}  ${d.a.id} « ${d.a.q.slice(0, 62)} »`);
    console.log(`        ${d.b.id} « ${d.b.q.slice(0, 62)} »`);
  }
  if (quasi.length > 15) console.log(`  … et ${quasi.length - 15} autres`);
}

for (const g of identiques.slice(0, 10))
  console.log(`\nIDENTIQUES : ${g.map((x) => x.id).join(" = ")}\n   « ${g[0].q} »`);

if (bloquants.length) {
  console.log("\n" + "=".repeat(60));
  console.log("DÉFAUTS BLOQUANTS :");
  for (const b of bloquants) console.log("  - " + b);
  process.exit(1);
}
console.log("\nAucun défaut bloquant.");
