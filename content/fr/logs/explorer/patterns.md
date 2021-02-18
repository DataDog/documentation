---
title: Log Patterns
kind: documentation
description: Repérer les patterns de logs
aliases:
  - /fr/logs/patterns
further_reading:
  - link: 'https://www.datadoghq.com/blog/log-patterns/'
    tag: Blog
    text: "Log Patterns\_: regrouper automatiquement vos logs dans un cluster pour des enquêtes plus rapides"
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/explorer/saved_views
    tag: Documentation
    text: Configurer automatiquement votre vue Log Explorer
---
## Présentation

L'étude de grands volumes de données de log est un processus souvent chronophage : il est possible d'y passer des heures et de n'en comprendre qu'une infime partie. Pourtant, les logs d'applications sont souvent tous très similaires et ne présentent que de légères variations. On parle alors de *patterns*.

Dans le Log Explorer, les patterns peuvent être identifiés automatiquement afin de structurer le problème et vous aider à mettre rapidement en avant les données pertinentes, tout en ignorant les informations non pertinentes.

La vue Patterns vous permet de détecter et filtrer les patterns irréguliers les plus communs afin de repérer les problèmes qui vous intéressent vraiment. Elle affiche le nombre de logs correspondants au pattern, ceux-ci étant classés par service et par statut.

## Afficher les nouveaux logs et les tendances des logs au fil du temps

Basculez vers la vue Patterns pour voir automatiquement les patterns de logs pour le contexte sélectionné. Un [contexte][1] est composé d'un intervalle et d'une requête de recherche. Chaque pattern est accompagné d'informations mises en valeur pour vous permettre d'identifier ses principales caractéristiques :

* Un petit graphique illustre l'évolution du nombre de logs correspondants au pattern afin de vous permettre d'identifier ce qui différencie ce pattern des autres.
* Les sections des logs qui varient au sein du pattern sont mises en évidence pour vous aider à identifier rapidement les différences sur l'ensemble des lignes de logs.

Cliquez sur un pattern pour afficher des exemples de logs correspondants. Vous pouvez également visualiser un log spécifique plus en détail.

**Remarque** : les patterns présentés sont ceux détectés au sein d'un volume de 10 000 logs. Affinez la recherche pour afficher les modèles correspondants à un sous-ensemble de logs spécifiques.

## Actions de pattern

Lorsque vous sélectionnez un pattern, un volet contextuel s'ouvre pour afficher des exemples de logs sous-jacents. Trois boutons sont disponibles dans le coin supérieur droit :

* **Parsing Rule** : permet d'afficher une règle de parsing générée automatiquement associée à ce pattern (voir la capture d'écran ci-dessous).
* **View All** : permet d'afficher tous les logs correspondant à la requête de pattern.
* **Graph** : permet de tracer un graphique illustrant l'évolution de ce pattern au fil du temps.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/#context
