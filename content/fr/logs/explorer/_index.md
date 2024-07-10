---
aliases:
- /fr/logs/explore
- /fr/logs/patterns
- /fr/logs/graph
- /fr/logs/analytics
- /fr/logs/explorer/list
- /fr/logs/explorer/patterns
- /fr/logs/explorer/transactions/
description: Effectuez des recherches et des analyses sur l'ensemble de vos logs
further_reading:
- link: logs/explorer/live_tail
  tag: Documentation
  text: Afficher un aperçu de vos logs dans la vue Live Tail
- link: logs/explorer/saved_views/
  tag: Documentation
  text: Configurer automatiquement votre vue Log Explorer
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajouter une URL Log Explorer à votre presse-papiers
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-kinesis-firehose-and-datadog/
  tag: Blog
  text: Envoyer des logs de flux Amazon VPS à Amazon Kinesis Data Firehose et Datadog
title: Log Explorer
---

## Présentation

Accédez au [**Log Explorer**][1] pour débuter vos diagnostics et plonger au cœur de vos logs. Que vous partiez de zéro, d'une [vue enregistrée][2] ou des données de contexte associées à une notification de monitor ou un widget de dashboard, le Log Explorer vous permet de rechercher et de filtrer, de regrouper, de visualiser et d'exporter vos logs.

{{< img src="/logs/explore.png" alt="Explorer vos logs ingérés" style="width:100%;">}}

## Rechercher et filtrer des événements

**Recherchez** et **filtrez** vos logs pour retrouver des logs précis ou généraux, ou pour vous concentrer sur un groupe spécifique de logs pertinents.

  - Pour en savoir plus sur la recherche de logs dans le Log Explorer, consultez la section [Rechercher des logs][3].
  - Pour commencer à créer des requêtes et à utiliser des facettes dans le Log Explorer, consultez la section [Syntaxe de recherche de logs][4].
  - Pour découvrir comment la fonctionnalité [Watchdog Insights][9] vous permet de consulter les logs anormaux et singuliers au sein de votre contexte de recherche, consultez la section [Watchdog Insights pour les logs][5].

## Analyser

**Regroupez** vos logs interrogés au sein d'entités de plus haut niveau, telles que des champs, patterns et transactions, afin de déduire ou de consolider des informations. 

Pour commencer à identifier des patterns et à agréger les logs par sous-ensembles d'événements, consultez la section [Analyse de logs][6].

## Visualiser les données

**Visualisez** les résultats de vos filtres et agrégations pour mieux comprendre vos logs et obtenir des informations clés. Vous pouvez par exemple consulter vos logs sous forme de liste afin d'organiser les données dans des colonnes, ou sous forme de graphique de série temporelle pour mesurer l'évolution de vos données. 

Pour commencer à visualiser vos données de log dans le Log Explorer, consultez la section [Visualisations de log][7].

## Exporter

Vous pouvez également **exporter** votre vue Log Explorer pour la réutiliser plus tard ou dans un autre contexte.

Pour découvrir comment exporter vos requêtes et visualisations de log, consultez la section [Exporter des logs][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /fr/logs/explorer/saved_views/
[3]: /fr/logs/explorer/search
[4]: /fr/logs/explorer/search_syntax/
[5]: /fr/logs/explorer/insights
[6]: /fr/logs/explorer/analytics
[7]: /fr/logs/explorer/visualize
[8]: /fr/logs/explorer/export
[9]: /fr/watchdog/insights