---
title: Modèles de logs
kind: documentation
description: Repérer les modèles de logs
aliases:
  - /fr/logs/patterns
further_reading:
  - link: 'https://www.datadoghq.com/blog/log-patterns/'
    tag: Blog
    text: "Modèles de logs\_: regrouper automatiquement vos logs dans un cluster pour des enquêtes plus rapides"
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

L'étude de grands volumes de données de log est un processus souvent chronophage : il est possible d'y passer des heures et de n'en comprendre qu'une infime partie. Pourtant, les logs d'applications sont souvent tous très similaires et ne présentent que de légères variations. On parle alors de *modèles*.

Dans le Log Explorer, les modèles peuvent être identifiés automatiquement afin de structurer le problème et vous aider à mettre rapidement en avant les données pertinentes, tout en ignorant les informations non pertinentes.

{{< img src="logs/explorer/patterns/log_patterns_nav.png" alt="Accéder aux modèles de logs;">}}

La vue Patterns vous permet de détecter et filtrer les modèles irréguliers les plus communs afin de repérer les problèmes qui vous intéressent vraiment. Elle affiche le nombre de logs correspondants au modèle, ceux-ci étant classés par service et par statut.

## Afficher les nouveaux logs et les tendances des logs au fil du temps

Basculez vers la vue Patterns pour voir automatiquement les modèles de logs pour le contexte sélectionné. Un [contexte][1] est composé d'un intervalle et d'une requête de recherche.

Chaque modèle est accompagné d'informations mises en valeur pour vous permettre d'identifier ses principales caractéristiques :

* Les sections des logs qui varient au sein du modèle sont mises en évidence pour vous aider à identifier rapidement les différences détectées sur l'ensemble des lignes de logs.
* Un petit graphique illustre l'évolution du nombre de logs correspondants au modèle afin de vous permettre d'identifier ce qui différencie ce modèle des autres.

Cliquez sur un modèle pour afficher des exemples de logs correspondants. Vous pouvez également visualiser un log spécifique plus en détail.

{{< img src="logs/explorer/patterns/patterns_overview.gif" alt="modèles de logs" responsive="true" style="width:90%;">}}

**Remarque** : les modèles présentés sont ceux détectés au sein d'un volume de 10 000 logs. Affinez la recherche pour afficher les modèles correspondants à un sous-ensemble de logs spécifiques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/#context