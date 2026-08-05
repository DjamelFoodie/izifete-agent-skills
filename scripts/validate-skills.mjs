// Validation de la collection — lancée par `npm test`.
// Vérifie pour chaque skill : frontmatter conforme (name == dossier, description non vide),
// liens de références qui résolvent, manifeste openai.yaml présent et branché sur le bon
// endpoint, et absence de formulations interdites (allégations invérifiables).
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const SKILLS_DIR = join(ROOT, "skills");
const MCP_URL = "https://izifete.fr/mcp/mcp";
// `(?!\d)` : on vise l'allégation de leadership (« le n° 1 français »), pas un
// numéro de texte officiel. Sans ce garde-fou, la règle bloquait la citation
// exacte du règlement INCO « (UE n° 1169/2011) » sur les allergènes.
const FORBIDDEN = [/n\s*°\s*1(?!\d)/i, /num[ée]ro\s+1(?!\d)/i, /\bleader\b/i, /en quelques heures/i, /jeton/i, /crédit/i];
const KNOWN_TOOLS = ["search", "fetch", "verifier_entreprise", "creer_demande", "conseils_evenement", "conseils_prestataire"];

let errors = 0;
const fail = (msg) => { console.error("  ✗ " + msg); errors += 1; };

const skills = readdirSync(SKILLS_DIR).filter((d) => statSync(join(SKILLS_DIR, d)).isDirectory());
if (!skills.length) { console.error("Aucun skill dans skills/"); process.exit(1); }

for (const name of skills) {
  console.log("• " + name);
  const dir = join(SKILLS_DIR, name);
  const skillMd = join(dir, "SKILL.md");
  if (!existsSync(skillMd)) { fail("SKILL.md manquant"); continue; }
  const md = readFileSync(skillMd, "utf8");

  const fm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) { fail("frontmatter YAML manquant"); continue; }
  const nameMatch = fm[1].match(/^name:\s*(.+)$/m);
  if (!nameMatch || nameMatch[1].trim().replace(/^["']|["']$/g, "") !== name)
    fail(`frontmatter name ≠ dossier (${nameMatch ? nameMatch[1].trim() : "absent"})`);
  const desc = fm[1].match(/^description:\s*(.+)/m);
  if (!desc || desc[1].trim().replace(/^["']|["']$/g, "").length < 80)
    fail("description absente ou trop courte (< 80 caractères — c'est elle qui déclenche le chargement)");

  // Liens relatifs references/*.md → le fichier doit exister.
  for (const m of md.matchAll(/\]\((references\/[^)#]+\.md)\)/g)) {
    if (!existsSync(join(dir, m[1]))) fail(`lien cassé : ${m[1]}`);
  }

  // Outils MCP cités → uniquement les 6 réels.
  for (const m of md.matchAll(/`([a-z_]+)`/g)) {
    const t = m[1];
    if (/^(search|fetch|verifier_|creer_|conseils_)/.test(t) && !KNOWN_TOOLS.includes(t))
      fail(`outil MCP inconnu cité : ${t}`);
  }

  // Formulations interdites, dans SKILL.md et toutes les références.
  const refDir = join(dir, "references");
  const files = [skillMd, ...(existsSync(refDir) ? readdirSync(refDir).map((f) => join(refDir, f)) : [])];
  for (const f of files) {
    const txt = readFileSync(f, "utf8");
    for (const rx of FORBIDDEN) {
      const m = txt.match(rx);
      if (m) fail(`formulation interdite « ${m[0]} » dans ${f.split(/[\\/]/).slice(-2).join("/")}`);
    }
  }

  // openai.yaml : présent, bon endpoint, bon $skill.
  const oy = join(dir, "agents", "openai.yaml");
  if (!existsSync(oy)) fail("agents/openai.yaml manquant");
  else {
    const y = readFileSync(oy, "utf8");
    if (!y.includes(MCP_URL)) fail("openai.yaml : endpoint MCP absent ou incorrect");
    if (!y.includes("$" + name)) fail("openai.yaml : default_prompt sans $" + name);
  }
}

console.log(errors ? `\n${errors} erreur(s).` : `\n✅ ${skills.length} skills valides.`);
process.exit(errors ? 1 : 0);
