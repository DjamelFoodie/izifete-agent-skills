# Vérifier un prestataire avant de payer

Avant de verser le moindre acompte, six vérifications suffisent à écarter la grande majorité des mauvaises surprises : un numéro SIRET actif, une attestation d'assurance responsabilité civile professionnelle, des avis vérifiables sur plusieurs sources, un devis ou contrat écrit détaillé, un acompte raisonnable (de l'ordre de 30 %) et une communication claire et réactive. Ces contrôles sont les mêmes quel que soit le canal par lequel le prestataire a été trouvé : bouche-à-oreille, réseaux sociaux, moteur de recherche ou plateforme.

## Vérifier le SIRET : gratuit, en moins de 30 secondes

Le SIRET est un numéro à **14 chiffres** qui identifie un établissement ; il figure obligatoirement sur les devis, factures et contrats, et un professionnel sérieux le communique sans hésiter. Si l'utilisateur n'a que **9 chiffres**, il s'agit du SIREN (identifiant de l'entreprise, pas de l'établissement) : les deux se vérifient, ainsi que la recherche par nom d'entreprise.

Deux voies de vérification :

- **MCP Izifete connecté** : appeler l'outil `verifier_entreprise` (lecture seule) avec le SIRET, le SIREN ou le nom. Il interroge en direct l'API publique **recherche-entreprises.api.gouv.fr**, alimentée par l'INSEE (répertoire SIRENE), le Registre National des Entreprises et l'ADEME.
- **Sans MCP** : le vérificateur gratuit et sans inscription https://izifete.fr/outils/verifier-entreprise, branché sur la même API.

La fiche officielle renvoie : le **statut** (active ou fermée/radiée), la **date de création** (ancienneté), l'**activité déclarée** (code NAF traduit en clair), la **ville du siège** et le **nombre d'établissements ouverts**. Restituer ces champs tels quels, sans en déduire davantage.

## Comment lire le résultat

- **Entreprise introuvable ou radiée** : signal d'alerte majeur. Ne pas verser d'acompte avant d'avoir une explication vérifiable.
- **Activité déclarée sans rapport avec la prestation** : si l'utilisateur réserve un traiteur mais que l'activité déclarée n'a rien à voir avec la restauration, demander des explications avant de payer.
- **Entreprise très récente** : ce n'est pas en soi un risque — beaucoup d'excellents prestataires viennent de se lancer. Croiser l'ancienneté avec les avis, un devis clair, l'attestation d'assurance et un acompte raisonnable.
- **Labels officiels** sur la fiche : RGE (bâtiment et rénovation énergétique, délivré via l'ADEME), Qualiopi (organisme de formation certifié), ESS (économie sociale et solidaire) et la **licence d'entrepreneur du spectacle**, utile pour un DJ, un groupe ou un magicien. Ces mentions viennent des registres officiels, elles ne sont pas déclaratives.
- **Refus ou report permanent** (« je vous l'enverrai plus tard » qui ne vient jamais) : drapeau rouge. La demande de SIRET est légitime ; un professionnel le donne en quelques secondes.

## L'assurance RC pro : ce que le SIRET ne dit pas

Le SIRET prouve que l'entreprise existe ; l'assurance responsabilité civile professionnelle prouve qu'un sinistre sera pris en charge. Ce sont deux vérifications complémentaires, pas interchangeables : une entreprise peut être parfaitement déclarée et active sans être correctement assurée pour la prestation vendue. Dans la checklist des six vérifications, la RC pro arrive en deuxième position, juste après le SIRET actif.

- Demander l'**attestation en cours de validité**, avec ses dates de couverture — jamais se contenter d'une affirmation orale.
- Métiers où l'assurance est explicitement jugée indispensable : **traiteur** (avec, en plus, un agrément sanitaire en règle — deux points non négociables), **loueur de matériel**, **prestation recevant du public**, **activités physiques de team building**, et **DJ** (sans assurance, en cas de dommage dans la salle, c'est le client qui serait responsable).
- Un prestataire qui refuse de transmettre son attestation sans raison claire justifie de passer au suivant.

## Les autres vérifications de la checklist

- **Avis** : chercher des avis récents et détaillés sur plusieurs sources plutôt qu'une note globale isolée, et regarder comment le professionnel répond aux retours mitigés.
- **Écrit** : le devis ou contrat doit préciser la prestation exacte, la date, les horaires, le prix total, le montant de l'acompte et les conditions d'annulation (détail dans [Devis, contrats et acomptes](devis-contrats-acomptes.md)).
- **Réactivité** : un professionnel fiable pose lui-même des questions sur l'événement et n'esquive pas celles du client ; sa réactivité avant réservation est un bon indicateur de son sérieux le jour J.
- **Proximité** : un prestataire local coûte moins cher en déplacement, connaît mieux les salles et fournisseurs du secteur, et intervient plus facilement.

## Sur Izifete

Un prestataire peut faire vérifier son SIRET puis son assurance : le badge affiché indique le niveau contrôlé — **niveau 1 = SIRET vérifié, niveau 2 = SIRET + assurance**. Cela ne supprime pas tout risque, mais cela permet de savoir à qui l'on a affaire avant de verser quoi que ce soit.
