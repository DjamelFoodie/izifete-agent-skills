# Sécurité

## Ce que ces skills font — et ne font pas

- **Aucune exécution de code local.** Les 9 skills sont uniquement des instructions
  (`SKILL.md` + références Markdown). Aucun script n'est exécuté par l'hôte.
- **Lecture seule par défaut.** Sept workflows sont purement informatifs. Deux peuvent
  utiliser le MCP distant optionnel d'Izifete : la recherche (`search`, `fetch`,
  `verifier_entreprise`, `conseils_evenement`, `conseils_prestataire`) est en lecture
  seule ; la seule écriture (`creer_demande`) exige une confirmation explicite de
  l'utilisateur ET passe par une validation humaine côté Izifete avant toute
  transmission à un prestataire.
- **Aucune collecte cachée.** Les seules données transmises au MCP sont celles que
  l'utilisateur fournit explicitement pour une demande de devis (et qu'il confirme).
- **Aucun secret.** Le serveur MCP public ne demande aucune clé ni authentification.

## Signaler un problème

Écrivez à contact@izifete.fr en décrivant le problème. Merci de ne pas ouvrir
d'issue publique pour une vulnérabilité avant qu'elle soit corrigée.
