/**
 * SCORE DE L'EVAL DE ROUTAGE  (04/08/2026)
 *
 * Compare ce que le routeur a choisi (evals/results/*.json) à ce qui était attendu
 * (evals/_attendu.json). Le score se calcule ICI, dans du code déterministe —
 * jamais dans l'agent, qui n'a jamais vu la réponse.
 *
 * Sort :
 *   - le taux de bon routage global
 *   - le taux sur les PIÈGES seuls (les cas durs : une question qui ressemble à une
 *     autre skill) — c'est là que se juge la qualité des descriptions
 *   - le rappel par skill (sur les questions qui LUI reviennent, combien sont bien routées)
 *   - la matrice de confusion : quelle skill est prise à la place de quelle autre
 *   - la liste des erreurs, matière première pour corriger les descriptions
 * Usage : node scripts/scorer-eval.mjs
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const evalDir = join(RACINE, "evals");
const resDir = join(evalDir, "results");

const attendu = JSON.parse(readFileSync(join(evalDir, "_attendu.json"), "utf8"));

/* ---------- réponses du routeur ---------- */
const choisi = {};
let fichiers = 0;
if (existsSync(resDir)) {
  for (const f of readdirSync(resDir).filter((f) => /\.json$/.test(f))) {
    fichiers++;
    let arr;
    try { arr = JSON.parse(readFileSync(join(resDir, f), "utf8")); }
    catch (e) { console.log(`⚠️  ${f} illisible : ${e.message}`); continue; }
    for (const r of Array.isArray(arr) ? arr : []) if (r && r.id) choisi[r.id] = r.skill;
  }
}
const ids = Object.keys(attendu);
const routes = ids.filter((id) => choisi[id] !== undefined);
const manquants = ids.filter((id) => choisi[id] === undefined);

console.log(`EVAL DE ROUTAGE — ${fichiers} lot(s) de résultats`);
console.log(`  questions attendues : ${ids.length}`);
console.log(`  questions routées   : ${routes.length}${manquants.length ? `   (⚠️ ${manquants.length} sans réponse)` : ""}`);
if (!routes.length) { console.log("\nAucune réponse de routeur trouvée dans evals/results/."); process.exit(1); }

/* ---------- score ---------- */
const bon = (id) => choisi[id] === attendu[id].skill;
const justes = routes.filter(bon);
const pieges = routes.filter((id) => attendu[id].piege);
const piegesJustes = pieges.filter(bon);
const normaux = routes.filter((id) => !attendu[id].piege);
const normauxJustes = normaux.filter(bon);

const pct = (a, b) => (b ? (a / b * 100).toFixed(1) : "—") + " %";

console.log(`\n=== TAUX DE BON ROUTAGE ===`);
console.log(`  GLOBAL            ${pct(justes.length, routes.length)}   (${justes.length}/${routes.length})`);
console.log(`  questions simples ${pct(normauxJustes.length, normaux.length)}   (${normauxJustes.length}/${normaux.length})`);
console.log(`  PIÈGES (cas durs) ${pct(piegesJustes.length, pieges.length)}   (${piegesJustes.length}/${pieges.length})`);

/* ---------- rappel par skill ---------- */
console.log(`\n=== RAPPEL PAR SKILL (sur les questions qui lui reviennent) ===`);
const parSkill = {};
for (const id of routes) {
  const att = attendu[id].skill;
  (parSkill[att] ||= { total: 0, ok: 0 }).total++;
  if (bon(id)) parSkill[att].ok++;
}
for (const [s, v] of Object.entries(parSkill).sort((a, b) => a[1].ok / a[1].total - b[1].ok / b[1].total))
  console.log(`  ${pct(v.ok, v.total).padStart(7)}  (${String(v.ok).padStart(3)}/${String(v.total).padStart(3)})  ${s}`);

/* ---------- confusion ---------- */
const confus = {};
for (const id of routes) if (!bon(id)) {
  const cle = `${attendu[id].skill}  →  ${choisi[id]}`;
  confus[cle] = (confus[cle] || 0) + 1;
}
const confusTri = Object.entries(confus).sort((a, b) => b[1] - a[1]);
if (confusTri.length) {
  console.log(`\n=== CONFUSIONS LES PLUS FRÉQUENTES (attendu → choisi) ===`);
  for (const [c, n] of confusTri.slice(0, 15)) console.log(`  ${String(n).padStart(3)}×  ${c}`);
}

/* ---------- liste des erreurs pour corriger les descriptions ---------- */
const erreurs = routes.filter((id) => !bon(id))
  .map((id) => ({ id, attendu: attendu[id].skill, choisi: choisi[id], piege: attendu[id].piege }));
writeFileSync(join(evalDir, "_erreurs.json"), JSON.stringify(erreurs, null, 1));
console.log(`\n${erreurs.length} erreur(s) détaillée(s) dans evals/_erreurs.json (pour retoucher les descriptions).`);

const valeursInvalides = routes.filter((id) => choisi[id] !== "AUCUNE" && !parSkill[choisi[id]] && !(choisi[id] in
  Object.fromEntries(readdirSync(join(RACINE, "skills")).map((s) => [s, 1]))));
if (valeursInvalides.length) console.log(`⚠️  ${valeursInvalides.length} réponse(s) hors liste (ex. ${choisi[valeursInvalides[0]]})`);

if (manquants.length) console.log(`\n⚠️  ${manquants.length} question(s) jamais routées — relancer les lots manquants.`);
