---
title: Monitors d'analyse de traces
kind: documentation
description: Analyse des données de votre APM avec une cardinalité infinie
aliases:
  - /fr/monitors/monitor_types/trace_search/
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
  - link: tracing/app_analytics/search
    tag: Documentation
    text: Recherche globale sur toutes vos traces avec des tags
---
## Présentation

L'analyse et la recherche de traces vous permettent de rechercher, filtrer et agréger les données d'APM en fonction des événements d'APM qui s'exécutent dans votre système et en fonction des tags que vous créez. La surveillance de l'analyse de traces vous permet de configurer des monitors personnalisés en fonction de ces données. Utilisez ces monitors pour visualiser les données dans le temps et pour définir des alertes en fonction des événements d'APM. Par exemple, en cas de pic de requêtes lentes ou de toute autre chose, vous pouvez utiliser des événements d'APM pour effectuer le suivi.

## Création d'un monitor d'analyse de traces

1. Pour [créer un nouveau monitor][1], passez le curseur sur **Monitors** dans le menu principal et cliquez sur **New Monitor** dans le sous-menu. Pour programmer la création d'un monitor, consultez la documentation relative à l'[API Datadog][2] ou aux [bibliothèques entretenues par la communauté][3].
2. Sur la page du nouveau monitor, sélectionnez le monitor **APM**.
3. Sélectionnez *App Analytics* puis définissez votre [requête de recherche de trace][4] :
    {{< img src="monitors/monitor_types/trace_search/trace_search.png" alt="Monitor de recherche de traces"  style="width:75%;" >}}
4. Définissez vos conditions d'alerte.
5. Nommez et décrivez votre monitor.
6. Configurez vos **options de notification** :
    Reportez-vous aux [notifications][5] pour en savoir plus sur les options.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: /fr/api/#monitors
[3]: /fr/developers/libraries/#managing-monitors
[4]: /fr/tracing/search
[5]: /fr/monitors/notifications
