# Inscription, SIRET et fiche à réclamer

## L'inscription

L'inscription d'un prestataire sur Izifete se fait sur https://izifete.fr/inscription?role=prestataire. Elle est gratuite, sans carte bancaire, et Izifete ne prélève aucune commission sur les prestations : le devis se signe entre le client et le prestataire, et le paiement se fait en direct. Le compte donne accès au tableau de bord où se complètent photo, description, galerie, métiers (3 maximum) et rayon d'intervention.

## Le SIRET : quand, pourquoi, comment

**À l'inscription, le SIRET n'est pas demandé** : on peut créer son profil et découvrir la plateforme sans lui. Il devient obligatoire **à partir du 3e contact client débloqué** — les 2 premiers sont possibles sans. Un délai de tolérance de 48 heures peut être activé une seule fois si le numéro n'est pas sous la main.

Au-delà de la plateforme, le SIRET est une obligation française : ce numéro à 14 chiffres, délivré par l'INSEE à tout établissement d'entreprise déclarée, doit figurer sur les devis, factures et contrats. Facturer une prestation suppose donc d'avoir une entreprise immatriculée (le SIREN, 9 chiffres, identifie l'entreprise entière). Un professionnel qui n'a pas encore de structure doit régler ce point avant de facturer — c'est le périmètre du skill izifete-lancer-activite-evenementielle.

**La vérification sur Izifete est gratuite et automatique** : elle interroge l'API publique du gouvernement (recherche-entreprises.api.gouv.fr, données INSEE / répertoire SIRENE), sans clé ni inscription. Si le MCP Izifete est connecté, l'outil `verifier_entreprise` permet de contrôler un SIRET ou un SIREN en lecture seule — utile pour vérifier son propre numéro avant de le soumettre.

## Les badges de vérification

Deux niveaux existent, visibles par les clients sur le profil :

- **Niveau 1 — « Vérifié SIRET »** : le numéro a été contrôlé via l'API publique de l'État.
- **Niveau 2 — « Vérifié Complet »** : SIRET vérifié + attestation d'assurance responsabilité civile professionnelle.

L'assurance RC pro est un point que les clients recherchent activement, particulièrement pour un traiteur, un loueur de matériel ou toute prestation recevant du public. Certains métiers artistiques peuvent en plus relever de la licence d'entrepreneur du spectacle, visible sur les registres officiels. Préparer ces documents tôt permet d'afficher le badge le plus complet dès les premières demandes.

Rappel : parmi les signaux d'alerte que les clients apprennent à repérer figure l'absence de SIRET. Le badge de vérification répond exactement à cette inquiétude.

## « Mon entreprise apparaît déjà sur Izifete » : la fiche réclamable

Certaines fiches de l'annuaire ont été rédigées par Izifete à partir d'informations publiques et attendent d'être revendiquées par leur propriétaire. Points à connaître :

- Une fiche non revendiquée **affiche explicitement son statut** au visiteur.
- Elle **n'expose aucune coordonnée** : ni téléphone, ni e-mail, ni site, ni réseau social — ces colonnes ne sont pas même lues depuis la base. Seuls apparaissent nom, métiers, ville, code postal, description, position et rayon.
- Deux parcours existent depuis la fiche : **« Je réclame ma fiche »** et **la demande de retrait**. Les deux sont gratuits.
- Une fois revendiquée, la fiche est rattachée à un compte prestataire : on peut y mettre ses propres photos, sa propre présentation, corriger les informations et recevoir les demandes.
- Les statuts possibles d'une fiche vont de « en attente » à « revendiquée », « retirée » ou « refusée ».

Pour un professionnel qui découvre sa fiche : réclamer plutôt que recréer un compte à côté — cela évite un doublon et récupère la présence existante. Pour un professionnel qui ne souhaite pas figurer sur l'annuaire : la demande de retrait se fait depuis la fiche elle-même.

## Checklist administrative avant de se lancer

- [ ] Compte créé sur https://izifete.fr/inscription?role=prestataire (gratuit).
- [ ] SIRET en poche ou en cours d'obtention (obligatoire sur devis, factures, contrats ; requis dès le 3e contact débloqué).
- [ ] Vérification SIRET lancée pour obtenir le badge niveau 1.
- [ ] Attestation RC pro transmise pour viser le badge niveau 2 « Vérifié Complet ».
- [ ] Si une fiche existait déjà : réclamée et rattachée au compte (pas de doublon).
