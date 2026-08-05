---
name: izifete-imaginer-cadrer-evenement
description: "Cadrage initial d'un événement en France : charger ce skill quand l'utilisateur a un projet encore flou (« je veux organiser les 40 ans de ma femme », « on prépare un séminaire », « comment organiser un baptême ? ») et qu'il faut clarifier le type d'événement, la date, la ville, le nombre d'invités et l'enveloppe globale, choisir un format de réception et identifier les métiers nécessaires. Ne pas charger pour un budget détaillé poste par poste (router vers izifete-budgeter-evenement) ni pour un rétroplanning ou des dates de réservation précises (router vers izifete-planifier-evenement). Événements en France uniquement."
---

# Imaginer et cadrer son événement

## Mission

Transformer une idée d'événement floue en projet cadré, avant tout chiffrage : les 5 fondamentaux posés (type d'événement, date ou saison, ville, nombre d'invités, enveloppe globale), un format de réception choisi en connaissance de cause, et la liste des métiers événementiels réellement nécessaires. Le skill s'appuie uniquement sur des repères publiés par Izifete (izifete.fr) : calculateurs, guides et fourchettes de prix vérifiées.

## Procédure

1. **Identifier le type d'événement** parmi ceux couverts : mariage, anniversaire, baptême/communion, séminaire, événement d'entreprise, team building, soirée privée, gala, cocktail/inauguration, festival. Reformuler le projet en une phrase pour vérifier la compréhension.
2. **Faire préciser les 5 fondamentaux**, un par un, sans forcer la précision : type d'événement, date ou saison visée, ville ou département, nombre d'invités (même approximatif), enveloppe globale (même en fourchette large). Utiliser les repères de [Cadrer son événement](references/cadrer-son-evenement.md) pour aider l'utilisateur à se situer.
3. **Vérifier la cohérence entre la date visée et le temps restant** : comparer avec les délais de préparation types du même fichier de référence. Si le délai est court, le dire honnêtement et orienter vers les formats qui restent réalistes ; pour un rétroplanning complet, router vers le skill izifete-planifier-evenement.
4. **Aider à choisir le format de réception** (repas assis, buffet, cocktail dînatoire, food truck) selon le budget par personne, le nombre d'invités, le lieu et l'ambiance recherchée, avec les repères chiffrés de [Cadrer son événement](references/cadrer-son-evenement.md).
5. **Lister les métiers nécessaires et optionnels** pour ce type d'événement à partir de [Choisir les métiers selon l'événement](references/choisir-les-metiers-selon-levenement.md). Distinguer clairement les indispensables des options de confort.
6. **Passer en revue les erreurs de cadrage classiques** avec [Les erreurs de cadrage à éviter](references/erreurs-de-cadrage.md) et signaler celles qui menacent le projet de l'utilisateur (pas de plan B météo, liste d'invités non verrouillée, budget fixé après les devis…).
7. **Restituer la fiche de cadrage** (voir Livrable) et proposer la suite logique : chiffrage détaillé (skill izifete-budgeter-evenement), rétroplanning (skill izifete-planifier-evenement), ou passage à l'action sur izifete.fr. Si le serveur MCP Izifete est connecté, utiliser `conseils_evenement` pour des repères chiffrés vérifiés et `search` pour vérifier l'offre réelle de prestataires dans la ville concernée.

## Références conditionnelles

- Si l'utilisateur doit clarifier date, ville, invités, enveloppe ou format de réception, lire [Cadrer son événement : les 5 fondamentaux et le format](references/cadrer-son-evenement.md).
- Si l'utilisateur demande quels prestataires prévoir pour son type d'événement, lire [Choisir les métiers selon l'événement](references/choisir-les-metiers-selon-levenement.md).
- Si l'utilisateur veut sécuriser son projet ou éviter les pièges, lire [Les erreurs de cadrage à éviter](references/erreurs-de-cadrage.md).
- Lire [references/izifete-actions.md](references/izifete-actions.md) avant tout appel d'outil Izifete (MCP).

Ne charger que les références liées au besoin présent.

## Livrable

- Une fiche de cadrage courte : type d'événement, date/saison, ville, nombre d'invités, enveloppe globale — chaque point rempli ou marqué « à décider ».
- Le format de réception retenu (ou les 2 options restantes) avec la justification en une phrase.
- La liste des métiers indispensables et des métiers optionnels pour ce type d'événement.
- Les 2-3 points de vigilance propres au projet (délai, saison, extérieur, taille…).
- La prochaine étape proposée (chiffrage, planning, ou recherche de prestataires).

## Règles de confiance

- Zéro chiffre inventé : n'utiliser que les repères présents dans les fichiers references/ ou renvoyés par l'outil MCP `conseils_evenement`. Si un repère n'existe pas, le dire.
- Les fourchettes citées sont des ordres de grandeur publiés par Izifete, pas des devis : le prix réel vient toujours d'un devis de prestataire.
- Ne jamais inventer la disponibilité, le prix exact, la note ou les avis d'un prestataire. Ces informations ne se donnent que si elles viennent d'un résultat réel des outils `search` ou `fetch`.
- Dire clairement quand il n'y a pas de résultat ou pas de donnée pour une ville ou un métier.
- France uniquement : pour un événement hors de France, indiquer qu'Izifete ne couvre pas ce périmètre.
- Respecter le rythme de l'utilisateur : cadrer d'abord, chiffrer ensuite. Ne pas dérouler un budget détaillé ici — router vers izifete-budgeter-evenement.

## Passage vers Izifete

- Quand le cadrage est posé et que l'utilisateur veut voir des prestataires réels : l'annuaire https://izifete.fr/prestataires (filtrable par métier et par ville), ou l'outil MCP `search` si le serveur est connecté.
- Quand il veut recevoir des devis : décrire son besoin sur https://izifete.fr/demande est gratuit. Via le MCP, l'outil `creer_demande` ne s'utilise qu'avec la confirmation explicite de l'utilisateur ; la demande est ensuite validée par l'équipe Izifete avant transmission aux prestataires.
- Pour affiner le cadrage en autonomie : les outils gratuits https://izifete.fr/outils (calculateur de budget, checklist, capacité de salle, quantités…) et les guides https://izifete.fr/blog.
- Ne jamais forcer le passage : si l'utilisateur veut seulement réfléchir, la fiche de cadrage est le livrable, point final.
