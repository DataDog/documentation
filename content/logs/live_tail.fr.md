---
title: Live Tail
kind: documentation
description: Visualisez tous vos logs en temps réel.
further_reading:
- link: logs/explorer/analytics
  tag: Documentation
  text: Construire des analyses de log
- link: logs/processing
  tag: Documentation
  text: Apprenez à traiter vos logs
- link: logs/processing/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
---

{{< img src="logs/live_tail/live_tail_demo.gif" alt="Live tail" responsive="true" >}}

## Présentation

La fonctionnalité Live Tail vous donne la possibilité de visualiser tous vos événements de logs depuis n'importe où dans votre infrastructure, quasiment en temps réel. Les logs sont affichés dès leur sortie de la [section Pipeline][1] et avant [leur indexation][2] par Datadog, comme ceci : 

1. Tous les logs ingérés par Datadog sont affichés. ([Il n'y a aucune limite][2].)
2. Les logs affichés ont déjà été traités.
3. Le flux peut être interrompu.
4. Vous ne pouvez pas remonter dans le passé.

Cette fonctionnalité vous permet par exemple de vérifier si un processus a démarré correctement, ou si un déploiement récent s'est déroulé sans erreur.

## Vue Live Tail

Choisissez l'option `Live Tail` dans le sélecteur d'horizon temporel pour activer la vue Live Tail :

{{< img src="logs/live_tail/live_tail_time_selector.png" alt="Live Tail time selector" responsive="true" >}}

Le nombre d'événements reçus par seconde est affiché en haut à gauche, ainsi que la fréquence d'échantillonnage. Étant donné qu'un flux de milliers de logs par seconde n'est pas lisible par un humain, les flux de logs à haut débit sont échantillonnés.

Utilisez les [filtres de la barre de recherche Live Tail](#filtering-the-log-stream) pour filtrer le flux de logs et le bouton **Pause/Play** en haut à droite pour interrompre ou réactiver le flux.

**Remarque** : Lorsque vous sélectionnez un log, le flux est interrompu et les détails du log sélectionné sont affichés.

### Options d'affichage

Personnalisez la vue Live Tail pour mieux mettre en évidence les informations pertinentes de vos logs. 
Cliquez sur l'engrenage en haut à droite de la page pour activer l'une des options ci-dessous :

{{< img src="logs/live_tail/live_tail_column.png" alt="Live tail column" responsive="true" style="width:30%;">}}

1. Choisissez d'afficher une, trois ou dix lignes à partir de vos attributs de logs dans votre flux de logs.
2. Activez ou désactivez les colonnes Date et Message.
3. Ajoutez n'importe quel attribut de log en tant que colonne à partir de ce menu ou en cliquant directement sur l'attribut :

{{< img src="logs/live_tail/live_tail_add_as_column.png" alt="Live tail add as column" responsive="true" style="width:50%;">}}

## Filtrer le flux de logs

Une requête valide dans la barre de recherche affiche les logs qui correspondent à vos critères de recherche. 
La syntaxe de recherche en vue Live Tail est la même que celle dans les autres vues de logs. Toutefois, en vue Live Tail, la recherche se fait dans tous les logs ingérés et non pas uniquement ceux qui ont été indexés.

### Attributs JSON

Toutes les requêtes valides dans les autres vues le sont également en vue Live Tail. Vous pouvez toutefois aller encore plus loin en **recherchant les attributs qui ne sont pas définis en tant que facettes**.

Par exemple, pour rechercher l'attribut `filename` suivant, deux options s'offrent à vous :

{{< img src="logs/live_tail/live_tail_save.png" alt="Live tail save" responsive="true" style="width:50%;">}}

1. Cliquez sur l'attribut et ajoutez-le à votre recherche :

    {{< img src="logs/live_tail/live_tail_click_attribute.png" alt="Live tail click attribute" responsive="true" style="width:50%;">}}

2. Utilisez la requête suivante : `@filename:runner.go`

    {{< img src="logs/live_tail/live_tail_filtered.png" alt="Live tail filtered" responsive="true" style="width:50%;">}}

Pour rechercher tous les logs dont le nombre de lignes est supérieur à 150, utilisez la requête suivante : `@linenumber:>150`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/pipelines
[2]: /logs/logging_without_limits
[3]: /logs/explorer/search/#search-bar
