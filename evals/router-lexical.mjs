/**
 * EVAL DE ROUTAGE — PASSE LEXICALE  (04/08/2026)
 *
 * Ce que ça teste : pour chaque question du catalogue, la skill attendue
 * est-elle celle dont la `description` colle le mieux à la question ?
 *
 * POURQUOI CE TEST EXISTE : au démarrage, un hôte ne lit QUE `name` et
 * `description` de chaque skill installée (spec agentskills.io). Le routage se
 * joue donc entièrement sur ces descriptions. Cette passe lexicale est un
 * PROXY : elle mesure le recouvrement de vocabulaire, pas le raisonnement d'un
 * modèle. Un échec ici n'est pas une condamnation — c'est un signal que la
 * description ne contient pas les mots que la question emploie. La passe
 * modèle (échantillonnée, coûteuse) vient APRÈS, sur un catalogue déjà propre.
 *
 * Sort en erreur si la précision passe sous --min (défaut 0.70).
 * Usage : node evals/router-lexical.mjs [--min=0.70] [--verbose]
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const MIN = Number((process.argv.find((a) => a.startsWith("--min=")) || "").split("=")[1] || 0.70);
const VERBOSE = process.argv.includes("--verbose");

/* ---------- vocabulaire ---------- */
const VIDES = new Set(["le", "la", "les", "un", "une", "des", "du", "de", "d", "et", "ou",
  "a", "au", "aux", "en", "pour", "par", "sur", "avec", "sans", "je", "j", "on", "mon", "ma",
  "mes", "notre", "nos", "est", "ce", "c", "que", "qui", "quoi", "il", "elle", "y", "pas",
  "plus", "me", "se", "s", "n", "l", "dans", "faire", "fait", "etre", "avoir", "quand",
  "comment", "combien", "quel", "quelle", "quels", "quelles", "si", "ne", "sont", "ai",
  "suis", "veux", "veut", "d