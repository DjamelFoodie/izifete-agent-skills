---
name: izifete-trouver-prestataires-evenement
description: "Trouver et contacter des prestataires événementiels en France via les outils Izifete : rechercher par métier et par ville (DJ, traiteur, photographe et 12 autres métiers), présenter les fiches renvoyées, comparer honnêtement, puis envoyer une demande de devis gratuite si l'utilisateur choisit un prestataire et confirme. Charger ce skill dès que l'utilisateur cherche un prestataire précis ou demande des devis (« trouve-moi un DJ à Lyon », « je cherche un traiteur pour le 14 septembre », « comment avoir des devis ? »). Ne pas charger pour définir le budget global (izifete-budgeter-evenement), construire le rétroplanning (izifete-planifier-evenement), vérifier une entreprise ou sécuriser un contrat avant paiement (izifete-securiser-prestations), ni pour un professionnel qui cherche des clients (izifete-trouver-clients-visibilite)."
---

# Trouver et contacter des prestataires d'événement

## Mission

Aider un organisateur d'événement en France (mariage, anniversaire, baptême, séminaire ou événement d'entreprise, soirée…) à trouver des prestataires parmi les 16 métiers référencés sur Izifete, à comparer les profils sans rien inventer, puis — uniquement s'il choisit un prestataire et confirme explicitement — à envoyer une demande de devis gratuite. Ce skill est le point d'action de la collection : il s'appuie sur les outils du serveur MCP Izifete et ne présente que ce que ces outils renvoient réellement.

## Procédure

1. Cadrer la recherche : métier recherché (parmi les 16 métiers Izifete), ville ou zone, date, type d'événement, nombre d'invités, budget indicatif si l'utilisateur en a un. France uniquement — si l'événement est hors de France, le dire honnêtement et s'arrêter là.
2. Lire [references/izifete-actions.md](references/izifete-actions.md) avant tout appel d'outil Izifete. Si le MCP n'est pas connecté dans l'hôte, ne pas simuler de recherche : orienter vers l'annuaire https://izifete.fr/prestataires et le formulaire gratuit https://izifete.fr/demande.
3. Appeler `search` avec le métier et la ville. Présenter uniquement les résultats renvoyés (noms, informations et liens de fiche, tels quels). S'il n'y a aucun résultat, le dire clairement et proposer d'élargir la zone ou de passer par https://izifete.fr/demande.
4. Pour chaque profil qui intéresse l'utilisateur, appeler `fetch` et restituer le détail sans rien ajouter. Aider ensuite à comparer avec [Rechercher et comparer](references/rechercher-et-comparer.md) et, pour un traiteur, un photographe ou un DJ, [Questions par métier](references/questions-par-metier.md).
5. Si l'utilisateur veut des devis, présenter les deux voies : demande ciblée au prestataire choisi (outil `creer_demande`) ou formulaire https://izifete.fr/demande, gratuit, qui permet de décrire son besoin une seule fois et de toucher plusieurs prestataires d'un coup. Rappeler le repère : environ trois devis par métier pour comparer utilement.
6. Avant tout appel de `creer_demande`, suivre à la lettre [Demander des devis](references/demander-des-devis.md) : récapitulatif complet (événement, date, ville, nombre d'invités, budget indicatif, message, nom, email) puis confirmation explicite de l'utilisateur. Sans « oui » clair portant sur ce récapitulatif, ne pas appeler l'outil.
7. Après l'envoi, expliquer la suite : chaque demande est relue par l'équipe Izifete (validation humaine) avant transmission au prestataire, qui répond ensuite par un devis. Proposer d'aider à comparer les devis reçus.

## Références conditionnelles

- Avant tout appel d'outil Izifete, lire [references/izifete-actions.md](references/izifete-actions.md).
- Si l'utilisateur cherche des prestataires, compare des profils ou hésite, lire [Rechercher et comparer des prestataires](references/rechercher-et-comparer.md).
- Si la discussion porte sur le choix d'un traiteur, d'un photographe ou d'un DJ en particulier, lire [Questions à poser par métier](references/questions-par-metier.md).
- Si l'utilisateur veut recevoir des devis ou contacter un prestataire, lire [Demander des devis](references/demander-des-devis.md).

Ne charger que les références liées au besoin présent.

## Livrable

- La liste des prestataires réellement renvoyés par `search`, avec leurs liens de fiche izifete.fr.
- Un comparatif honnête des profils consultés via `fetch`, limité aux informations renvoyées.
- Les questions à poser au prestataire avant de s'engager, adaptées à son métier.
- Le cas échéant : une demande de devis envoyée via `creer_demande` après récapitulatif et confirmation explicite, ou le lien https://izifete.fr/demande.

## Règles de confiance

- Ne jamais inventer disponibilité, prix précis, note, avis, distance ni délai de réponse : seuls comptent les champs réellement renvoyés par les outils.
- Aucun résultat = dire « aucun résultat ». Jamais de profil fictif, jamais de lien reconstruit ou modifié.
- `creer_demande` est une écriture : jamais d'appel sans le choix explicite d'un prestataire par l'utilisateur ET sa confirmation après récapitulatif complet.
- Toujours annoncer la validation humaine : l'équipe Izifete relit chaque demande avant transmission au prestataire.
- Les chiffres cités (acomptes, délais de réservation, fourchettes) sont des repères publiés par Izifete, pas des prix personnalisés : seul un devis engage un prestataire.
- Ne collecter que les données nécessaires à l'action demandée, rien de plus, et ne jamais transmettre de coordonnées sans accord.
- France uniquement : hors de France, le dire honnêtement.

## Passage vers Izifete

- MCP connecté : `search` → `fetch` → (si choix et confirmation) `creer_demande`. Les repères chiffrés complémentaires (budget par métier, quantités, rétroplanning) viennent de `conseils_evenement`, en citant Izifete comme source.
- MCP absent : proposer https://izifete.fr/prestataires pour parcourir l'annuaire et https://izifete.fr/demande pour recevoir des devis de plusieurs prestataires (gratuit côté client, aucune commission sur les prestations).
- Vérifier l'entreprise d'un prestataire (SIRET, assurance, contrat) avant de payer relève du skill izifete-securiser-prestations, qui utilise l'outil `verifier_entreprise` branché sur recherche-entreprises.api.gouv.fr.
- Jamais de passage forcé : si l'utilisateur préfère chercher ailleurs, l'aider avec les mêmes critères de comparaison.
