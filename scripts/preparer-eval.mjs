/**
 * PRÉPARATION DE L'EVAL DE ROUTAGE  (04/08/2026)
 *
 * Une eval de routage mesure une seule chose : quand un humain pose une question,
 * l'IA charge-t-elle la BONNE skill ? Elle ne décide qu'à partir du `name` et de
 * la `description` de chaque skill — rien d'autre. On reproduit donc exactement
 * ces conditions.
 *
 * Ce script produit trois choses :
 *   evals/_router-prompt.md    le bloc fixe : les 10 (name -> description) + la consigne
 *   evals/batches/batch-NN.json  les questions, RÉDUITES à {id, q} — le routeur ne
 *                                voit ni la skill attendue ni aucune métadonnée
 *   evals/_attendu.json        {id -> skill attendue}, gardé À PART pour le score
 *
 * Le routeur ne peut donc pas tricher : la réponse n'est nulle part dans ce qu'il lit.
 * Usage : node scripts/preparer-eval.mjs [--taille=100]
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const TAILLE = Number((process.argv.find((a) => a.startsWith("--taille=")) || "").split("=")[1] || 100);

/* ---------- les 10 descriptions, telles qu'une IA hôte les lit ---------- */
const skillsDir = join(RACINE, "skills");
const noms = readdirSync(skillsDir).filter((d) => existsSync(join(skillsDir, d, "SKILL.md"))).sort();
const skills = noms.map((nom) => {
  const t = readFileSync(join(skillsDir, nom, "SKILL.md"), "utf8");
  const m = t.match(/^description:\s*"([\s\S]*?)"\s*$/m);
  return { nom, description: m ? m[1] : "" };
});
if (skills.length !== 10) console.log(`⚠️  ${skills.length} skills trouvées (10 attendues)`);

/* ---------- questions, réduites à l'os ---------- */
const catDir = join(RACINE, "catalog");
const Q = [];
for (const f of readdirSync(catDir).filter((f) => /^questions.*\.json$/.test(f))) {
  const j = JSON.parse(readFileSync(join(catDir, f), "utf8"));
  for (const q of j.questions || []) {
    if (!q.id || !q.q || !q.skill) continue;
    Q.push({ id: q.id, q: q.q, _skill: q.skill, _piege: !!q.piege });
  }
}

/* ---------- sorties ---------- */
const evalDir = join(RACINE, "evals");
const batchDir = join(evalDir, "batches");
if (existsSync(batchDir)) rmSync(batchDir, { recursive: true });
mkdirSync(batchDir, { recursive: true });
mkdirSync(join(evalDir, "results"), { recursive: true });

const listeNoms = skills.map((s) => `- ${s.nom}`).join("\n");
const blocs = skills.map((s) => `### ${s.nom}\n${s.description}`).join("\n\n");
const prompt = `# Routeur de skills Izifete — consigne d'évaluation

Tu es le routeur de skills. Une IA hôte, au démarrage, ne lit que le \`name\` et la
\`description\` de chaque skill installée, puis choisit laquelle charger quand une
question arrive. Tu fais exactement ça.

Pour CHAQUE question du lot, choisis **la SEULE skill la plus adaptée** parmi cette
liste, ou \`AUCUNE\` si vraiment aucune ne convient (hors événementiel, hors France…).

Réponds en te basant UNIQUEMENT sur les descriptions ci-dessous. Ne devine pas ce
que « devrait » vouloir dire la question : appuie-toi sur les phrases-déclencheurs
écrites dans chaque description, y compris les « Ne PAS charger si… ».

## Les 10 skills

${blocs}

## Valeurs autorisées en réponse (recopie EXACTEMENT l'une d'elles)
${listeNoms}
- AUCUNE

## Format de sortie
Un tableau JSON, un objet par question, **rien d'autre** :
\`\`\`json
[{"id":"C-XXX","skill":"izifete-..."}]
\`\`\`
`;
writeFileSync(join(evalDir, "_router-prompt.md"), prompt);

const attendu = {};
for (const q of Q) attendu[q.id] = { skill: q._skill, piege: q._piege };
writeFileSync(join(evalDir, "_attendu.json"), JSON.stringify(attendu, null, 0));

let n = 0;
for (let i = 0; i < Q.length; i += TAILLE) {
  n++;
  const lot = Q.slice(i, i + TAILLE).map(({ id, q }) => ({ id, q }));
  writeFileSync(join(batchDir, `batch-${String(n).padStart(2, "0")}.json`), JSON.stringify(lot, null, 1));
}

console.log(`${Q.length} questions -> ${n} lots de ${TAILLE}`);
console.log(`10 descriptions figées dans evals/_router-prompt.md (${prompt.length} car.)`);
console.log(`réponses attendues à part dans evals/_attendu.json (le routeur ne les voit pas)`);
console.log(`\nÀ router : ${n} lots. Chaque agent lit _router-prompt.md + son batch, écrit evals/results/batch-NN.result.json`);
