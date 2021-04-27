---
title: "Live\_Tail"
kind: documentation
description: Effectuer des recherches et des analyses sur l'ensemble de vos logs
aliases:
  - /fr/logs/explore/livetail
  - /fr/logs/live_tail
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/explorer/side_panel
    tag: Documentation
    text: Volet latéral des logs
  - link: 'logs/explorer/#list-of-logs'
    tag: Documentation
    text: Liste des logs
---
## Présentation

Grâce à la fonctionnalité Live Tail, vous pouvez accéder à tous les événements de log de votre infrastructure, quasiment en temps réel. La vue Live Tail offre une visibilité sur **tous** les logs, qu'ils soient indexés ou non (voir également les [Filtres d'exclusion][1] pour les index de logs). Les logs qui transitent par la fonctionnalité Live Tail sont tous structurés, traités et enrichis à partir des [pipelines de logs][2].

La solution Live Tail s'avère par exemple particulièrement utile pour vérifier si un processus a démarré correctement, ou si un déploiement récent s'est déroulé sans erreur.

## Vue Live Tail

Dans le [Log Explorer][3], sélectionnez l'option Live Tail dans l'intervalle pour interroger les logs qui transitent par Datadog.

{{< img src="logs/explorer/live_tail/livetail.gif" alt="Live Tail des logs" style="width:100%;" >}}

Contrairement aux requêtes sur les logs indexés dans le [Log Explorer][3], il n'est *pas* nécessaire de [déclarer une facette][4] avant de pouvoir créer une requête dans la vue Live Tail.

**Remarque** : par souci de lisibilité, la sortie de la fonctionnalité Live Tail est échantillonnée en cas de réception d'un trop grand nombre de logs correspondant à la requête. L'échantillonnage est appliqué de façon aléatoire et uniforme, afin que vos logs Live Tail constituent un échantillon statistiquement représentatif de votre débit de logs réel. Si vous avez besoin de visualiser chaque log entrant, vous pouvez affiner davantage votre requête en appliquant des filtres de recherche supplémentaires.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/indexes#exclusion-filters
[2]: /fr/logs/processing
[3]: /fr/logs/explorer
[4]: /fr/logs/explorer/facets/