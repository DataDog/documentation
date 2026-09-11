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
  text: Configurer automatiquement votre vue Log Explorer
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajouter une URL Log Explorer à votre presse-papiers
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: Blog
  text: Envoyer des logs de flux Amazon VPS à Amazon Kinesis Data Firehose et Datadog
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: Blog
  text: Accélérez les enquêtes avec l'analyse des journaux alimentée par l'IA
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: Centre d'apprentissage
  text: Commencez avec Log Explorer
title: LogxmExplorer
---
## Aperçu {#overview}

L'[**Log Explorer**][1] constitue votre point de départ pour le dépannage et l'exploration des journaux. Que vous commenciez de zéro, à partir d'un [Saved View][2], ou que vous arriviez ici depuis un autre contexte, tel que des monitor notifications ou des dashboard widgets, vous pouvez rechercher et filtrer, regrouper, visualiser et exporter des journaux dans Log Explorer.

{{< img src="/logs/explore.png" alt="Explorez vos journaux ingérés" style="width:100%;">}}

## Rechercher et filtrer {#search-and-filter}

{{< ui >}}Search{{< /ui >}} et {{< ui >}}Filter{{< /ui >}} sur les journaux pour affiner, élargir ou réorienter votre attention sur un sous-ensemble de journaux adapté à votre intérêt actuel.

  - Pour en savoir plus sur la recherche de journaux dans Log Explorer, lisez [Search Logs][3].
  - Pour commencer à créer des requêtes et à utiliser des facettes dans Log Explorer, lisez [Log Search Syntax][4].
  - Pour apprendre comment [Watchdog Insights][9] met en évidence des journaux anormaux et des valeurs aberrantes dans les journaux d'erreurs dans votre contexte de recherche, lisez [Watchdog Insights for Logs][5].

## Analysez {#analyze}

{{< ui >}}Group{{< /ui >}} vos journaux interrogés en entités de niveau supérieur telles que des champs, des modèles et des transactions afin de dériver ou de consolider des informations. 

Pour commencer à identifier des patterns et à agréger les logs par sous-ensembles d'événements, consultez la section [Analyse de logs][6].

## Visualisez {#visualize}

{{< ui >}}Visualize{{< /ui >}} le résultat de vos filtres et agrégations pour mieux comprendre vos journaux et recueillir des informations décisives. Par exemple, vous pouvez afficher vos journaux dans une liste pour organiser vos données de journaux en colonnes, ou dans un graphique temporel pour mesurer vos données de journaux au fil du temps. 

Pour commencer à visualiser vos données de log dans le Log Explorer, consultez la section [Visualisations de log][7].

## Exportez {#export}

Vous pouvez également {{< ui >}}export{{< /ui >}} votre vue de Log Explorer pour la réutiliser plus tard ou dans différents contextes. 

Pour découvrir comment exporter vos requêtes et visualisations de log, consultez la section [Exporter des logs][8].

## Lectures complémentaires {#further-reading}

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