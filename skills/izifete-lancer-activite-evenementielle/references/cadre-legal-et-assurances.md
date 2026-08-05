# Cadre légal et assurances pour se lancer dans l'événementiel en France

## Le principe de base : facturer suppose une entreprise déclarée

En France, exercer une activité de prestataire contre rémunération suppose d'avoir une entreprise immatriculée. L'identifiant en est le **SIRET : 14 chiffres, délivrés par l'INSEE à tout établissement d'entreprise déclarée** (le SIREN, 9 chiffres, identifie l'entreprise entière). Le SIRET figure **obligatoirement sur les devis, factures et contrats**. Un prestataire sans SIRET valide n'est pas une entreprise en règle : impossible de facturer légalement, et aucune garantie pour le client en cas de litige. C'est aussi le premier signal que les clients apprennent à vérifier — l'absence de SIRET est en tête des signaux d'alerte listés dans les guides Izifete côté client.

Une entreprise « fermée » ou « radiée » dans les registres ne devrait plus démarcher de clients : si le projet consiste à réactiver une ancienne activité, vérifier d'abord le statut réel de la structure.

## Choisir une structure juridique

Les guides Izifete (guide « Ouvrir un food truck en 2026 ») posent le paysage : **micro-entreprise (auto-entrepreneur), entreprise individuelle, EURL ou SASU**. La micro-entreprise séduit par sa simplicité pour démarrer, mais ses plafonds de chiffre d'affaires peuvent devenir limitants, notamment pour une activité de restauration. Le registre d'immatriculation dépend de l'activité réelle : chambre de métiers et de l'artisanat (RNE) ou chambre de commerce et d'industrie (RCS) — par exemple, un exploitant de food truck qui cuisine relève de l'artisanat.

Côté TVA, beaucoup de prestataires démarrent en **franchise en base** : la mention exacte à porter sur les devis et factures est alors **« TVA non applicable, art. 293 B du CGI »**. Au-delà des seuils, la TVA s'applique (en restauration : généralement 10 % pour la consommation immédiate, 5,5 % sur certains produits). Dans tous les cas, conserver ses justificatifs et tenir une comptabilité à jour.

**Limite claire** : le choix définitif du statut (plafonds à jour, cotisations sociales, options fiscales, cumul avec un emploi salarié) est une question juridique et fiscale personnalisée. La renvoyer vers service-public.fr, l'URSSAF et les chambres consulaires — ne pas improviser de réponse de droit.

## L'assurance responsabilité civile professionnelle (RC pro)

La RC pro couvre les **dommages corporels, matériels et immatériels** que le prestataire pourrait causer à ses clients ou à des tiers pendant une prestation. Elle est fortement recommandée pour tous les métiers de l'événementiel, et en pratique souvent demandée : les clients réclament l'attestation avant de signer (particulièrement pour un traiteur, un loueur de matériel ou toute prestation recevant du public), et de nombreux lieux de réception l'exigent des prestataires qui interviennent chez eux.

Repère publié dans le guide food truck Izifete : souscrite seule, une RC pro se situe en 2026 autour de **20 à 50 € par mois** pour un food truck. S'y ajoutent selon l'activité l'assurance du véhicule (obligatoire pour tout véhicule à moteur) et, fortement recommandée pour les métiers de bouche mobiles, une multirisque professionnelle couvrant l'incendie, le bris de matériel et la perte des denrées en cas de panne de froid.

Le guide traiteur d'Izifete rapporte qu'environ **1 traiteur sur 4 contactés en France n'est pas à jour de ses assurances** : être irréprochable sur ce point est donc un vrai argument face aux clients qui vérifient.

## Cas particulier : les métiers artistiques

Certains métiers artistiques de l'événementiel peuvent relever de la **licence d'entrepreneur du spectacle**, visible sur les registres officiels — c'est l'un des labels que les clients peuvent voir en vérifiant une entreprise. Si le projet touche au spectacle vivant, vérifier ce point auprès des sources officielles avant de démarrer.

## Vérifier un SIRET (le sien ou celui d'un partenaire)

La vérification d'une entreprise est gratuite et instantanée via l'**API publique recherche-entreprises.api.gouv.fr**, alimentée par l'INSEE (répertoire SIRENE), le Registre National des Entreprises et l'ADEME : statut actif ou fermé, ancienneté, activité déclarée, labels officiels. Si le MCP Izifete est connecté, l'outil `verifier_entreprise` fait exactement cela en lecture seule — utile pour contrôler son propre numéro dès réception, ou une entreprise avec qui l'on veut s'associer.

Sur Izifete, le SIRET **n'est pas exigé à l'inscription** : on peut créer son profil et découvrir la plateforme, puis il devient obligatoire à partir du 3e contact client (un délai de tolérance de 48 heures est activable une seule fois). La vérification donne accès à des badges visibles par les clients : **niveau 1 « Vérifié SIRET »**, **niveau 2 « Vérifié Complet »** (SIRET + attestation d'assurance RC pro). Préparer ces deux documents dès le lancement permet d'afficher le badge complet dès les premières demandes.

## Checklist cadre légal

- [ ] Statut choisi avec l'appui des sources officielles (service-public.fr, URSSAF, chambre consulaire).
- [ ] Entreprise immatriculée, SIRET reçu et vérifié via l'API publique.
- [ ] Mention TVA correcte prête pour les devis (« TVA non applicable, art. 293 B du CGI » en franchise en base).
- [ ] Attestation RC pro souscrite ; assurances complémentaires selon l'activité (véhicule, multirisque).
- [ ] Si métier artistique : point licence d'entrepreneur du spectacle vérifié auprès des sources officielles.
