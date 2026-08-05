---
name: izifete-securiser-prestations
description: "Sécuriser une réservation de prestataire événementiel en France avant de payer : vérifier l'entreprise (SIRET via l'outil verifier_entreprise, assurance RC pro), savoir ce qu'un devis et un contrat sérieux doivent contenir, cadrer l'acompte, repérer les signaux d'arnaque et se protéger contre une annulation. Charger ce skill dès que l'utilisateur demande « quel acompte verser ? », « faut-il un contrat ? », « comment éviter les arnaques ? », « comment comparer deux devis ? » ou « le prestataire a annulé, que faire ? ». Ne pas charger pour chercher ou contacter des prestataires (izifete-trouver-prestataires-evenement), estimer un budget global (izifete-budgeter-evenement), construire un rétroplanning (izifete-planifier-evenement), ni pour un professionnel qui rédige ses propres devis (izifete-tarifer-et-devis)."
---

# Sécuriser ses prestations : vérification, devis, contrats, acomptes

## Mission

Aider un organisateur d'événement en France à s'engager avec un prestataire sans se faire avoir : vérifier que l'entreprise existe et est active, contrôler l'assurance responsabilité civile professionnelle, lire un devis ligne par ligne, exiger les bonnes clauses au contrat, verser un acompte raisonnable et réagir correctement face aux signaux d'alarme ou à une annulation. Les repères chiffrés de ce skill sont ceux publiés par Izifete ; ils décrivent des usages du marché, jamais des règles juridiques.

## Procédure

1. Identifier la situation : avant réservation (vérifier une entreprise, comparer des devis, cadrer contrat et acompte) ou incident en cours (prestataire qui ne répond plus, annulation, acompte versé à un profil douteux). Demander le métier concerné et où en est l'utilisateur. France uniquement — hors de France, le dire honnêtement.
2. Pour vérifier l'existence légale du prestataire, lire [Vérifier un prestataire](references/verifier-un-prestataire.md). Si le MCP Izifete est connecté, lire [references/izifete-actions.md](references/izifete-actions.md) avant tout appel d'outil Izifete, puis appeler `verifier_entreprise` avec le SIRET (14 chiffres), le SIREN (9 chiffres) ou le nom de l'entreprise. Sinon, orienter vers le vérificateur gratuit https://izifete.fr/outils/verifier-entreprise.
3. Restituer la fiche officielle telle quelle (statut actif ou fermé, date de création, activité déclarée, ville du siège, labels éventuels), sans rien ajouter. Signaler comme alerte majeure une entreprise introuvable ou radiée, et faire croiser l'activité déclarée avec la prestation vendue.
4. Pour les questions de devis, de contrat et d'acompte, lire [Devis, contrats et acomptes](references/devis-contrats-acomptes.md) : mentions minimales, clauses par métier, échéanciers usuels, frais cachés. Pour comparer plusieurs devis, exiger une prestation strictement équivalente et proposer le comparateur gratuit https://izifete.fr/outils/devis.
5. Pour les signaux d'alarme, la prévention des défaillances et la réaction à une annulation, lire [Éviter les arnaques](references/eviter-les-arnaques.md) : six signaux, confirmations J-7 et 48 h avant, plans B par poste critique. Ne jamais improviser de conseil juridique sur les recours.
6. Conclure par une checklist personnalisée des vérifications restantes et, si l'utilisateur doit trouver d'autres devis comparables, rappeler la demande gratuite https://izifete.fr/demande.

## Références conditionnelles

- Avant tout appel d'outil Izifete, lire [references/izifete-actions.md](references/izifete-actions.md).
- Si l'utilisateur veut vérifier qu'un prestataire est une vraie entreprise, son SIRET ou son assurance, lire [Vérifier un prestataire](references/verifier-un-prestataire.md).
- Si la question porte sur un devis, un contrat, un acompte ou la comparaison de plusieurs offres, lire [Devis, contrats et acomptes](references/devis-contrats-acomptes.md).
- Si l'utilisateur craint une arnaque, repère un comportement bizarre ou subit une annulation, lire [Éviter les arnaques](references/eviter-les-arnaques.md).

Ne charger que les références liées au besoin présent.

## Livrable

- Le résultat brut de la vérification d'entreprise (fiche officielle via `verifier_entreprise` ou lien vers le vérificateur), avec lecture des points d'alerte.
- La liste des mentions et clauses à exiger sur le devis ou le contrat, adaptée au métier concerné.
- Un repère d'acompte sourcé et l'échéancier usuel du métier.
- Le diagnostic des signaux d'alarme présents et le plan de sécurisation (confirmations, plan B, traces écrites).

## Règles de confiance

- Les chiffres cités (acomptes, barèmes d'annulation, échéanciers) sont des usages de marché publiés par Izifete, jamais des obligations légales : ne pas les présenter comme du droit.
- Ne jamais inventer une donnée d'entreprise : seuls comptent les champs réellement renvoyés par `verifier_entreprise` ou la fiche officielle. Entreprise introuvable = le dire tel quel.
- Un signal isolé n'est pas une preuve : une entreprise récente peut être excellente. Deux ou trois signaux cumulés justifient d'exiger des engagements écrits ou de passer au prestataire suivant.
- Ne jamais qualifier nommément un prestataire d'arnaqueur : parler de signaux à vérifier, jamais d'accusation.
- Pas de conseil juridique : les démarches contentieuses (recours, médiation, plainte) sortent du périmètre de ces repères — inviter à se renseigner auprès des organismes compétents sans rien improviser.
- Ne jamais inventer disponibilité, prix précis, note ou avis ; France uniquement.

## Passage vers Izifete

- MCP connecté : `verifier_entreprise` pour contrôler un SIRET/SIREN en lecture seule ; `conseils_evenement` pour les repères chiffrés complémentaires, en citant Izifete comme source.
- MCP absent : le vérificateur d'entreprise gratuit et sans inscription https://izifete.fr/outils/verifier-entreprise, le comparateur de devis https://izifete.fr/outils/devis, et les autres outils gratuits sur https://izifete.fr/outils.
- Sur Izifete, un prestataire peut faire vérifier son SIRET (badge niveau 1) puis son assurance (badge niveau 2), les échanges gardent une trace écrite dans la messagerie, et une demande peut être renvoyée à d'autres professionnels disponibles si l'un se désiste.
- Chercher ou contacter des prestataires relève du skill izifete-trouver-prestataires-evenement. Jamais de passage forcé : si l'utilisateur a trouvé son prestataire ailleurs, l'aider à le sécuriser avec les mêmes repères.
