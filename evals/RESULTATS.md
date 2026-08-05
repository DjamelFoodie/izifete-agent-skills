# Eval de routage — résultats du 04/08/2026

## Ce qui est mesuré

Une IA hôte, au démarrage, ne lit que le `name` et la `description` de chaque
skill installée. C'est **le seul** élément sur lequel elle décide quelle skill
charger. L'eval reproduit exactement ces conditions : un routeur reçoit les 10
descriptions et une question, rien d'autre. La réponse attendue est stockée à
part (`_attendu.json`), dans un fichier qu'il ne lit jamais. Le score est
calculé après coup par `scripts/scorer-eval.mjs`, en code déterministe.

## Résultat

| | |
|---|---|
| Questions routées | **1019 / 1019** |
| **Bon routage global** | **99,4 %** (1013/1019) |
| Questions simples | 99,5 % (933/938) |
| **Pièges (cas durs)** | **98,8 %** (80/81) |

Rappel par skill : de 98,8 % à 100 %. Aucune skill n'est structurellement mal
comprise ; quatre sont à 100 % (planifier, sécuriser, développer, créer-profil).

## Les 6 erreurs, examinées une par une

Aucune ne révèle une description ratée. **Cinq sont des questions à la frontière
de deux skills**, où le choix du routeur se défend autant que l'étiquette :

| Question | Étiqueté | Choisi | Lecture |
|---|---|---|---|
| « mariage en extérieur, quels risques anticiper » | cadrer | planifier | le plan B pluie est bien dans planifier — le routeur a sans doute raison |
| « les prestataires demandent combien d'acompte » | budgéter | sécuriser | l'acompte est autant un sujet de sécurité que de budget |
| « trois devis très différents, comment les comparer » | trouver | sécuriser | à cheval, les deux aident le client |
| « je loue mon lieu seul ou avec prestataires imposés » | tarifer | développer | c'est autant un choix de modèle qu'un choix de prix |
| « vrai contrat avec cession de droits ou simple facture ? » | lancer | tarifer | le contrat est traité des deux côtés |

**Le seul piège raté** est instructif :

> « un couple me demande une dégustation gratuite avant de signer, je la fais ou
> je la facture ? » → étiqueté *trouver-clients* (l'enjeu est la transformation
> d'une demande en contrat), routé vers *tarifer* (à cause de « je la facture »).

Le mot « facturer » tire vers la tarification alors que la vraie question est
commerciale. C'est le seul cas où une retouche de description serait utile :
ajouter à `trouver-clients-visibilite` une mention explicite du geste commercial
offert (dégustation, essai, séance découverte).

## Réserve méthodologique, à ne pas oublier

99,4 % est un chiffre haut, et il doit se lire avec prudence : **les questions et
les descriptions ont été écrites par des modèles de la même famille**, donc elles
partagent du vocabulaire. Un humain qui tape en abrégé, avec des fautes, ou dans
un ordre inattendu sera plus dur à router.

Le chiffre le plus solide est **80/81 sur les pièges**, car ceux-là étaient
conçus pour tromper : paires client/pro presque identiques (« je facture
combien » vs « je paie combien »), capacité vs acquisition (« je n'ai aucune
demande » vs « j'ai trop de demandes »), légal vs commercial (« ai-je le droit de
me garer » vs « où je me gare pour vendre le plus »).

## Comparaison

Mehdi (RenooLab) publie **103 fixtures de routage**. Izifete en a **1019**, dont
81 conçues comme pièges adverses.

## Reproduire

```
node scripts/preparer-eval.mjs --taille=100   # regénère les lots + le prompt figé
# router chaque lot -> evals/results/batch-NN.result.json
node scripts/scorer-eval.mjs                  # score + matrice de confusion
```
