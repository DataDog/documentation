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
  text: Afficher un aperçu de vos logs dans Live Tail
- link: logs/explorer/saved_views/
  tag: Documentation
  text: Configurer automatiquement votre vue Log Explorer
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: Centre d'apprentissage
  text: Bien démarrer avec le Log Explorer
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajouter une URL Log Explorer à votre presse-papiers
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: Blog
  text: Envoyer des logs de flux Amazon VPS à Amazon Kinesis Data Firehose et Datadog
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: Blog
  text: Accélérez les enquêtes grâce au parsing des logs optimisé par l'IA
title: Log Explorer
---
## Présentation {#overview}

Le [**Log Explorer**][1] est votre point de départ pour explorer les logs et résoudre les problèmes qui y sont liés. Que vous partiez de zéro, d'une [Saved View][2] ou que vous arriviez ici depuis un autre contexte, comme des notifications de monitor ou des widgets de dashboard, vous pouvez rechercher, filtrer, regrouper, visualiser et exporter des logs dans le Log Explorer.

{{< img src="/logs/explore.png" alt="Explorez vos logs ingérés" style="width:100%;">}}

## Recherchez et filtrez {#search-and-filter}

{{< ui >}}Search{{< /ui >}} et {{< ui >}}Filter{{< /ui >}} les logs pour affiner, élargir ou réorienter votre recherche vers un sous-ensemble de logs correspondant à vos besoins du moment.

  - Pour en savoir plus sur la recherche de logs dans le Log Explorer, lisez [Search Logs][3].
  - Pour commencer à créer des requêtes et à utiliser des facettes dans le Log Explorer, lisez [Log Search Syntax][4].
  - Pour savoir comment [Watchdog Insights][9] permet de repérer les logs anormaux et les valeurs aberrantes parmi les logs d'erreur dans le cadre de votre recherche, lisez [Watchdog Insights for Logs][5].

## Analysez {#analyze}

{{< ui >}}Group{{< /ui >}} les logs de votre recherche en entités de plus haut niveau, telles que des champs, des modèles et des transactions, afin d'en tirer ou d'en consolider des informations. 

Pour commencer à identifier des patterns et à agréger les logs par sous-ensembles d'événements, consultez la section [Analyse de logs][6].

## Visualisez {#visualize}

{{< ui >}}Visualize{{< /ui >}} le résultat de vos filtres et agrégations pour mieux comprendre vos logs et recueillir des informations décisives. Par exemple, vous pouvez afficher vos logs sous forme de liste pour organiser vos données de log en colonnes, ou sous forme de graphique de série temporelle pour suivre leur évolution au fil du temps. 

Pour commencer à visualiser vos données de log dans le Log Explorer, consultez la section [Visualisations de log][7].

## Export{#export}

Vous pouvez également {{< ui >}}export{{< /ui >}} votre vue du Log Explorer pour la réutiliser ultérieurement ou dans différents contextes. 

Pour découvrir comment exporter vos requêtes et visualisations de log, consultez la section [Exporter des logs][8].

## Pour aller plus loin {#further-reading}

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