# Sécurité

## Ce que ces skills font — et ne font pas

- **Aucune exécution de code par l'hôte.** Les 10 skills sont uniquement des instructions
  (`SKILL.md` + références Markdown) : rien n'y est exécutable, et un hôte qui charge une
  skill ne lance aucun script. Le dépôt contient par ailleurs 5 fichiers `.mjs` dans
  `scripts/` et `evals/` — ce sont des outils de **maintenance** (validation du format des
  skills, contrôle du catalogue, mesure du routage). Ils ne sont jamais appelés par un
  hôte ni par une skill : ils se lancent à la main via `npm test`. Ils n'accèdent qu'aux
  fichiers de ce dépôt.
- **Lecture seule par défaut.** Les 10 workflows peuvent utiliser le MCP distant optionnel
  d'Izifete lorsque l'hôte y donne accès, et **chacun reste utilisable sans lui** (repli
  documenté vers les pages publiques d'izifete.fr). Cinq des six outils —
  `search`, `fetch`, `verifier_entreprise`, `conseils_evenement`, `conseils_prestataire` —
  sont en **lecture seule**. La seule écriture (`creer_demande`) exige une confirmation
  explicite de l'utilisateur **ET** passe par une validation humaine côté Izifete avant
  toute transmission à un prestataire.
- **Aucune collecte cachée.** Les seules données transmises au MCP sont celles que
  l'utilisateur fournit explicitement pour une demande de devis (et qu'il confirme).
- **Aucun secret.** Le serveur MCP public ne demande aucune clé ni authentification.

## Signaler un problème

Écrivez à contact@izifete.fr en décrivant le problème. Merci de ne pas ouvrir
d'issue publique pour une vulnérabilité avant qu'elle soit corrigée.
