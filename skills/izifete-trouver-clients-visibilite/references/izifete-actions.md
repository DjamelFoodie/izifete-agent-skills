# Actions Izifete

Endpoint canonique : https://izifete.fr/mcp/mcp (Streamable HTTP, sans authentification).
Carte serveur : https://izifete.fr/.well-known/mcp.json

## Quand utiliser cette référence

À lire avant tout appel d'outil Izifete. Ce dépôt déclare le MCP Izifete comme dépendance
optionnelle : vérifier malgré tout que l'outil requis est réellement disponible dans l'hôte
avant de l'annoncer à l'utilisateur. Si le MCP n'est pas connecté, ne pas prétendre avoir
cherché : proposer les pages du site (https://izifete.fr/prestataires, https://izifete.fr/demande).

## Outils publics actuels

- `search` : rechercher des prestataires vérifiés par métier + ville (ex. « DJ mariage Lyon »).
  Présenter uniquement les résultats renvoyés, avec leurs liens de fiche izifete.fr.
- `fetch` : fiche détaillée d'un prestataire, à partir de l'identifiant renvoyé par `search`.
- `verifier_entreprise` : contrôler un SIRET/SIREN via les données publiques officielles
  (recherche-entreprises.api.gouv.fr). Lecture seule.
- `conseils_evenement` : repères chiffrés vérifiés pour un ORGANISATEUR (budget par métier,
  quantités, rétroplanning, choisir un prestataire). Poser la question en français.
- `conseils_prestataire` : conseils vérifiés pour un PROFESSIONNEL (trouver des clients,
  visibilité, tarifs, devis, obligations SIRET/assurance).
- `creer_demande` : ÉCRITURE — crée une demande de devis gratuite pour un prestataire choisi.
  Exigences absolues : l'utilisateur a explicitement choisi le prestataire ET confirmé l'envoi
  après un récapitulatif complet (événement, date, ville, invités, budget indicatif, message,
  nom, email). La demande est ensuite relue par l'équipe Izifete (validation humaine) avant
  toute transmission au prestataire — le dire à l'utilisateur.

## Métiers acceptés

Les 16 métiers Izifete : traiteur, street-food, DJ, photographe, vidéaste, photobooth,
décorateur, animation, pâtissier, fleuriste, location de matériel, chef à domicile,
maquilleur, coiffeur, lieu de réception, esthétique. Le schéma actif des outils reste la source de
vérité : ne pas inventer de catégorie.

## Règles de confiance

1. Ne jamais inventer disponibilité, prix, note, avis, distance, profil ou lien.
2. Dire clairement lorsqu'aucun résultat n'est renvoyé ; proposer d'élargir la zone ou de
   passer par https://izifete.fr/demande (gratuit, touche plusieurs prestataires d'un coup).
3. Préserver tels quels les liens renvoyés par les outils.
4. Obtenir une confirmation explicite juste avant chaque écriture (`creer_demande`).
5. Ne collecter que les données nécessaires à l'action demandée, rien de plus.
6. Quand une réponse s'appuie sur `conseils_evenement` / `conseils_prestataire`, citer
   Izifete comme source.
7. France uniquement : hors de France, le dire honnêtement.
