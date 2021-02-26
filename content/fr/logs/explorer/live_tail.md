---
title: "Live\_Tail"
kind: documentation
description: Visualisez tous vos logs en temps réel.
aliases:
  - /fr/logs/live_tail
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
---
{{< img src="logs/explorer/live_tail/livetail.gif" alt="Live Tail">}}

## Présentation

La fonctionnalité Live Tail vous offre la possibilité de visualiser tous vos événements de log à n'importe quel endroit de votre infrastructure, et ce quasiment en temps réel. Les logs sont affichés dès leur sortie de la [section Pipeline][1] et avant [leur indexation][2] par Datadog. Ainsi :

1. Tous les logs ingérés par Datadog sont affichés. ([La fonctionnalité Logging without Limits s'applique][2]\*)
2. Les logs affichés ont déjà été traités.
3. Le flux peut être interrompu.
4. Vous ne pouvez pas consulter les données historiques.

Cette fonctionnalité vous permet par exemple de vérifier si un processus a démarré correctement, ou si un déploiement récent s'est déroulé sans erreur.

## Vue Live Tail

Choisissez l'option `Live Tail` dans le sélecteur d'intervalle pour activer la vue Live Tail :

Le nombre d'événements reçus par seconde apparaît en haut à gauche, ainsi que la fréquence d'échantillonnage. Étant donné qu'il est impossible pour un humain d'interpréter un flux de plusieurs milliers de logs par seconde, les flux de logs à haut débit sont échantillonnés.

Utilisez les [fonctions de filtres de la barre de recherche Live Tail](#filtrer-le-flux-de-logs) pour filtrer le flux de logs et le bouton **Pause/Play** en haut à droite pour interrompre ou relancer le flux.

**Remarque** : lorsque vous sélectionnez un log, le flux est interrompu et les détails du log sélectionné sont affichés.

### Options d'affichage

Personnalisez la vue Live Tail pour mieux mettre en évidence les informations pertinentes de vos logs.
Cliquez sur l'icône en forme d'engrenage en haut à droite de la page pour activer l'une des options ci-dessous :

1. Choisissez d'afficher une, trois ou dix lignes à partir de vos attributs de logs dans votre flux de logs.
2. Activez ou désactivez les colonnes Date et Message.
3. Ajoutez n'importe quel attribut de log dans ce volet ou en cliquant directement sur l'attribut :

## Filtrer le flux de logs

Une requête valide dans la barre de recherche affiche les logs qui correspondent à vos critères de recherche.
La syntaxe de recherche de la vue Live Tail est la même que celle des autres vues de logs. Toutefois, avec la vue Live Tail, la recherche se fait dans tous les logs ingérés, et non pas uniquement dans ceux qui ont été indexés.

### Attributs JSON

Toutes les requêtes valides dans les autres vues le sont également dans la vue Live Tail. Vous pouvez toutefois aller encore plus loin en **recherchant les attributs qui ne sont pas définis en tant que facettes**.

Par exemple, pour rechercher l'attribut `filename` suivant, deux options s'offrent à vous :

1. Cliquez sur l'attribut et ajoutez-le à votre recherche :

2. Utilisez la requête `@filename:runner.go` :

Pour rechercher tous les logs dont le nombre de lignes est supérieur à 150, utilisez la requête suivante : `@linenumber:>150`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/processing/pipelines/
[2]: /fr/logs/
