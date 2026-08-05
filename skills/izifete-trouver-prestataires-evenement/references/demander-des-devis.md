# Demander des devis via Izifete

Lire [izifete-actions.md](izifete-actions.md) avant tout appel d'outil. Côté client, tout est gratuit : publier une demande ne coûte rien et Izifete ne prend aucune commission sur les prestations.

## Deux voies pour obtenir des devis

1. **Demande ciblée** — l'utilisateur a choisi UN prestataire précis parmi les résultats de `search` / `fetch` : utiliser l'outil `creer_demande` en suivant la procédure ci-dessous.
2. **Demande ouverte** — l'utilisateur veut toucher plusieurs prestataires d'un coup : l'orienter vers https://izifete.fr/demande, où il décrit son besoin une seule fois et reçoit des devis de professionnels disponibles près de chez lui.

Dans les deux cas, rappeler le repère : environ trois devis par métier pour comparer utilement.

## Préconditions absolues de `creer_demande`

- L'utilisateur a explicitement choisi le prestataire (pas « le premier de la liste » décidé par l'agent).
- Toutes les informations ont été fournies par l'utilisateur lui-même — aucun champ deviné, aucun email inventé, aucun budget supposé.
- Le récapitulatif complet a été présenté ET l'utilisateur a confirmé l'envoi par un « oui » clair. Une réponse ambiguë (« ok pourquoi pas », « on verra ») n'est pas une confirmation : reformuler la question.

## Informations à réunir

- Type d'événement (mariage, anniversaire, baptême, séminaire, soirée…)
- Date de l'événement
- Ville
- Nombre d'invités
- Budget indicatif (si l'utilisateur en a un — ne pas le forcer)
- Message au prestataire
- Nom de l'utilisateur
- Email de l'utilisateur

Ne collecter que ces données, rien de plus. Ne jamais placer de coordonnées dans le message libre si l'utilisateur ne le demande pas.

## Le récapitulatif de consentement (obligatoire, juste avant l'appel)

Présenter le récapitulatif en une seule fois, par exemple :

> Voici la demande qui sera envoyée à [nom du prestataire] :
> - Événement : mariage · Date : 14 septembre · Ville : Lyon · Invités : 80
> - Budget indicatif : [montant donné par l'utilisateur, ou « non précisé »]
> - Message : « … »
> - Vos coordonnées : [nom] · [email]
> La demande est gratuite et sans engagement. Elle sera d'abord relue par l'équipe Izifete avant d'être transmise au prestataire. Je l'envoie ?

Attendre la confirmation. Ensuite seulement, appeler `creer_demande`.

## Après l'envoi

- Expliquer la validation humaine : chaque demande est relue par l'équipe Izifete avant toute transmission au prestataire. Ne jamais promettre de délai de réponse ni garantir que le prestataire répondra.
- Le prestataire intéressé répond ensuite par un devis ; les échanges gardent une trace écrite sur la plateforme.
- Proposer d'aider à comparer les devis reçus ligne par ligne (voir [rechercher-et-comparer.md](rechercher-et-comparer.md)) : à prestation équivalente, en traquant frais de déplacement, heures supplémentaires et postes non inclus.

## Écrire un bon message de demande

Un message précis produit des devis comparables ; un message flou produit des devis incomparables. Aider l'utilisateur à mentionner :

- le format exact (repas assis, buffet, cocktail…) et la durée souhaitée ;
- les contraintes du lieu (extérieur, étage, accès, horaires de la salle) ;
- les restrictions alimentaires ou demandes particulières à signaler par écrit ;
- ce qu'il attend du prestataire (options, matériel, style).

## Interdits

- Appeler `creer_demande` sans récapitulatif confirmé, ou deux fois pour la même demande.
- Inventer ou compléter un champ (email, budget, date) à la place de l'utilisateur.
- Annoncer une disponibilité, un prix ou un délai de réponse que l'outil n'a pas renvoyés.
- Présenter la demande comme un engagement : c'est une demande de devis, gratuite, rien d'autre.
