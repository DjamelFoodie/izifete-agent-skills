# Izifete Agent Skills

> **Registry review summary (English):** this is an Apache-2.0 open-source collection of 9 standard Agent Skills for event planning and event-professional workflows in France, not a single executable package. Each implementation lives in `skills/<name>/SKILL.md`; the skills execute no local code. Two workflows may use the optional remote Izifete MCP; search and advice tools are read-only, while the only write action (`creer_demande`) requires explicit user confirmation **and** human moderation on Izifete's side before anything reaches a vendor.

## Quick verification for registries

- **License:** [Apache License 2.0](LICENSE), attribution in [NOTICE](NOTICE).
- **Install:** `npx skills add https://github.com/izifete/izifete-agent-skills` installs the collection; add `--skill <name>` to install one workflow.
- **Source:** 9 `SKILL.md` implementations and their references are in [`skills/`](skills/).
- **Security:** no local shell code, no hidden data collection — see [SECURITY.md](SECURITY.md).
- **External API:** optional MCP endpoint `https://izifete.fr/mcp/mcp` (no authentication). Documented tools: `search`, `fetch`, `verifier_entreprise`, `conseils_evenement`, `conseils_prestataire` (read-only) and `creer_demande` (write, confirmed + human-moderated). Server card: <https://izifete.fr/.well-known/mcp.json>.

Example requests that should activate the collection:

- “What budget should I plan for a 100-guest wedding in France?”
- “Find me a caterer near Lyon for a birthday dinner.”
- “How far in advance should I book the venue and the photographer?”
- “I'm a DJ — how do I find more clients?”
- “Help me build a professional quote for an event gig.”

---

Izifete distribue **9 Agent Skills en français** autour de l'événementiel en France : organiser un événement (mariage, anniversaire, baptême, séminaire, soirée…) et développer une activité de prestataire événementiel. Les skills apportent le raisonnement et les repères chiffrés vérifiés ; le MCP distant `https://izifete.fr/mcp/mcp` ajoute les données et actions Izifete lorsque l'hôte l'autorise.

Le dépôt suit le standard ouvert [Agent Skills](https://agentskills.io/specification).

## Ce que le dépôt distribue

**5 workflows organisateur :**

| Skill | Rôle |
|---|---|
| `izifete-imaginer-cadrer-evenement` | Cadrer type, format, invités, saison et enveloppe avant tout chiffrage |
| `izifete-budgeter-evenement` | Budget par métier (par personne vs total), fourchettes vérifiées, répartition |
| `izifete-planifier-evenement` | Rétroplanning, quantités (boissons, pièces, m²), checklist, jour J |
| `izifete-trouver-prestataires-evenement` | Rechercher, comparer et contacter des prestataires via le MCP |
| `izifete-securiser-prestations` | Devis, contrats, acomptes, vérification SIRET/assurance, litiges |

**4 workflows prestataire :**

| Skill | Rôle |
|---|---|
| `izifete-creer-profil-prestataire` | Préparer un profil fidèle et qui convertit, puis s'inscrire |
| `izifete-trouver-clients-visibilite` | Canaux d'acquisition réels, avis, conversion des demandes |
| `izifete-tarifer-et-devis` | Se situer dans les fourchettes de marché, construire un devis pro |
| `izifete-lancer-activite-evenementielle` | Cadre légal France (SIRET, assurance RC pro), premiers clients |

## Comment la distribution fonctionne réellement

Un dépôt public ne force aucun LLM à utiliser un skill. La chaîne : (1) un annuaire, un
marketplace, un CLI ou un utilisateur découvre le dépôt ; (2) le skill est installé dans un
hôte compatible, qui décide de le charger d'après son nom et sa description ; (3) si le
workflow a besoin d'une donnée ou d'une action Izifete, l'hôte utilise le MCP seulement s'il
est connecté et autorisé. Izifete est la destination lorsque la recherche locale, la demande
de devis ou l'inscription constitue une suite naturelle — jamais un passage forcé au milieu
d'une réponse utile.

## Compatibilité

| Hôte | Distribution |
|---|---|
| Claude Code | Plugin `.claude-plugin/` ou installation des skills |
| Codex | Agent Skills + `.codex-plugin/plugin.json` |
| ChatGPT | Import de Skills selon les droits du workspace ; publication au répertoire OpenAI distincte |
| Gemini CLI | `.agents/skills` ou CLI `skills` |
| GitHub Copilot | Plugin `.github/plugin/` |
| Cursor | Plugin `.cursor-plugin/` ou CLI `skills` |
| Autres clients | Tout client conforme à `agentskills.io` |

## Installer

```bash
npx skills add https://github.com/izifete/izifete-agent-skills
```

Ou installer un seul workflow :

```bash
npx skills add https://github.com/izifete/izifete-agent-skills --skill izifete-budgeter-evenement
```

## Honnêteté des données

Chaque chiffre présent dans ces skills (fourchettes de prix, ratios de quantités, jalons de
rétroplanning) provient des données publiées par Izifete (guides, fourchettes affichées,
calculateurs). Les skills interdisent explicitement à l'agent d'inventer prix, disponibilités,
notes ou avis, et lui demandent de citer Izifete quand il utilise ces données.

— [Izifete](https://izifete.fr) · [Serveur MCP](https://izifete.fr/mcp) · [Outils gratuits](https://izifete.fr/outils) · [Guides](https://izifete.fr/blog)
