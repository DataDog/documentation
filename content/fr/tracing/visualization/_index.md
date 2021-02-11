---
title: Glossaire et guide d'utilisation de l'APM
kind: documentation
aliases:
  - /fr/tracing/terminology/
  - /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: Configurer le tracing d'APM avec votre application
  - link: /tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: /tracing/visualization/service/
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: /tracing/visualization/resource/
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
---
L'interface de l'APM fournit de nombreux outils permettant de dépanner les performances de vos applications et de les mettre en corrélation avec les autres données dans Datadog, ce qui vous aide à identifier et à résoudre les problèmes liés aux systèmes hautement distribués.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Les services sont les composants d'une architecture de microservices moderne. Un service regroupe généralement des endpoints, des requêtes ou des tâches qui assurent le bon fonctionnement de votre application.                                  |
| [Ressource](#resources)          | Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan.                                                              |
| [Monitors][1]                   | Les monitors de métrique d'APM fonctionnent comme les monitors de métrique, mais proposent des commandes spécialement conçues pour l'APM. Utilisez ces monitors pour recevoir des alertes propres à chaque service concernant les hits, les erreurs et diverses mesures de latence. |
| [Trace](#trace)                 | Les traces servent à suivre le temps passé par une application à traiter une requête, ainsi que le statut de la requête. Chaque trace est composée d'une ou de plusieurs spans.                                                             |
| [Span](#spans)                  | Une span représente une unité de travail logique dans un système distribué pour une période donnée. Un groupe de plusieurs spans correspond à une trace.                                                                                          |
| [Span de premier niveau](#top-level-span) | Une span est dite « de premier niveau » lorsqu'elle constitue le point d'entrée pour une requête envoyée à un service. Dans l'APM Datadog, on les distingue par le fait que le parent immédiat sur un flamegraph est affiché dans une couleur distincte.                                                                                            |
| [Métriques de trace](#trace-metrics) | Tout comme les autres types de [métriques Datadog][1], les métriques de trace sont automatiquement collectées et conservées pendant une durée de 15 mois. Elles peuvent être utilisées pour identifier et recevoir des alertes sur les hits, les erreurs ou la latence.                       |
| [Span indexée](#indexed-span) | Les spans indexées représentent toutes les spans indexées par les filtres de rétention ou les spans analysées de l'ancienne fonction App Analytics. Elles peuvent être utilisées pour rechercher, interroger et surveiller vos données dans *Analytics*.                                                                                                |
| [Tags de span](#span-tags)         | Appliquez des tags à vos spans sous forme de paires clé-valeur pour corréler une requête dans la *Vue Trace* ou pour filtrer vos données dans *Analytics*.                                                                                                    |
| [Filtres de rétention](#retention-filters) | Les filtres de rétention sont des règles basées sur des tags définies au sein de l'interface utilisateur de Datadog. Elles déterminent les spans à indexer dans Datadog pendant 15 jours.                                                                                              |
| [Contrôles de l'ingestion](#ingestion-controls) | Les contrôles de l'ingestion servent à envoyer jusqu'à 100 % des traces à Datadog pour effectuer des recherches et des analyses en temps réel pendant 15 minutes.
| [Métrique de sous-couche](#sublayer-metric) | Une métrique de sous-couche correspond à la durée d'exécution d'un type/service donné au sein d'une trace.
| [Durée d'exécution](#execution-duration) | Temps total pendant lequel une span est considérée comme « active » (c.-à-d. qu'elle n'attend pas la finalisation d'une span enfant).


**Remarque :** les spans indexées étaient auparavant désignées par le terme de « spans analysées ». Le changement de dénomination a eu lieu à l'occasion du lancement de Tracing Without Limits le 20 octobre 2020.

## Services

[Une fois votre application instrumentée][3], la [Liste des services][4] est votre point de départ pour accéder à vos données d'APM.

{{< img src="tracing/visualization/service_list.png" alt="liste des services" >}}

Les services sont les composants d'une architecture de microservices moderne. Un service regroupe généralement des endpoints, des requêtes ou des tâches qui procèdent au scaling de vos instances. Par exemple :

* Un groupe d'endpoints d'URL formant un service d'API.
* Un groupe de requêtes de base de données formant un service de base de données.
* Un groupe de tâches périodiques configurées dans le service crond.

La capture d'écran ci-dessous montre un système distribué à base de microservices pour un développeur de sites de e-commerce. On observe un `web-store`, un `ad-server`, un `payment-db` et un `auth-service`, tous représentés en tant que services dans l'APM.

{{< img src="tracing/visualization/service_map.png" alt="service map" >}}

La page [Service List][4] affiche la liste de tous vos services, tandis que la [Service Map][5] les représente visuellement. Chaque service dispose d'une [page Service][6] distincte qui vous permet de consulter et d'inspecter des [métriques de trace](#trace-metrics) relatives au débit, à la latence et aux taux d'erreurs. Utilisez ces métriques pour créer des widgets de dashboard, définir des monitors et visualiser les performances de chaque ressource associée au service, telle qu'un endpoint web ou une requête de base de données.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="page service" >}}

<div class="alert alert-info">
Vous ne voyez pas les endpoints HTTP attendus sur la page Service ? Dans l'APM, le nom du service n'est pas le seul paramètre pris en compte pour connecter des endpoints à un service : le `span.name` de la span de point d'entrée de la trace est également utilisé. Par exemple, dans le service web-store ci-dessus, la span de point d'entrée est `web.request`.
 Vous trouverez plus d'informations à ce sujet <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">en cliquant ici</a>.
</div>

## Ressources

Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan. Pour un service Web, ces ressources peuvent être des endpoints web dynamiques regroupés sous un nom de span tel que `web.request`. Pour un service de base de données, il peut s'agir de requêtes de base de données portant le nom de span `db.query`. Par exemple, le service `web-store` possède des ressources automatiquement instrumentées (endpoints web) qui gèrent les paiements, les mises à jour de panier, les ajouts d'article, etc. Chaque ressource possède sa propre [page Ressource][6] qui affiche les [métriques de trace](#metriques-de-trace) associées à chaque endpoint spécifique. Les métriques de trace peuvent être utilisées comme n'importe quelle autre métrique Datadog : elles peuvent être exportées vers un dashboard ou utilisées pour créer des monitors. La page Ressource affiche également le widget Résumé des spans avec une vue agrégée des [spans](#spans) pour toutes les [traces](#trace), les distributions de latences des requêtes et les traces indiquant les requêtes adressées à cet endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="page ressource" >}}

## Trace

Les traces servent à suivre le temps passé par une application à traiter une requête, ainsi que le statut de la requête. Chaque trace est composée d'une ou de plusieurs spans. Durant le cycle de vie de la requête, il est possible de visualiser les appels distribués au sein de vos services (grâce à [l'injection/l'extraction d'un ID de trace via les en-têtes HTTP][8]), de vos [bibliothèques instrumentées automatiquement][3] et de vos [instrumentations manuelles][9] à l'aide d'outils open source tels que [OpenTracing][10] sous forme de Flamegraph. La page Vue Trace présente des informations sur la trace issues d'autres sections de la plateforme, telles que [Connecter vos logs à vos traces][11], [Ajouter des tags à des spans][12] et [Recueillir des métriques runtime][13].

{{< img src="tracing/visualization/trace_view.png" alt="vue trace" >}}

## Spans

Une span représente une unité de travail logique dans un système pour une période donnée. Chaque span comprend un `span.name`, une heure de début, une durée et des [tags de span](#tags-de-span). Une span peut par exemple peut décrire le temps passé pour un appel distribué sur une machine distincte ou le temps passé sur un composant minime dans le cadre d'une opération plus importante. Les spans peuvent être imbriquées les unes aux autres, ce qui crée une relation parent-enfant entre elles.

Dans l'exemple ci-dessous, la span `rack.request` correspond au point d'entrée de la trace. Cela signifie que la page du service web-store affiche les ressources composées de traces ayant une span de point d'entrée nommée `rack.request.` L'exemple montre également les tags ajoutés côté application (`merchant.name`, `merchant.tier`, etc.). Ces tags définis par l'utilisateur peuvent être utilisés pour rechercher et analyser des données d'APM dans [Analytics][14].

{{< img src="tracing/visualization/span_with_metadata.png" alt="span" >}}

## Span de premier niveau

Une span est dite « de premier niveau » lorsqu'elle constitue le point d'entrée pour une requête envoyée à un service. Dans l'APM Datadog, on les distingue par le fait que le parent immédiat sur un flamegraph est affiché dans une couleur distincte. Les services sont également affichés sur la droite lorsque vous consultez un flamegraph.

Dans l'exemple ci-dessous, les spans de premier niveau sont :
- rack.request
- aspnet_coremvc.request
- La span verte tout en haut, sous aspnet_coremvc.request
- Chaque span mongodb orange

{{< img src="tracing/visualization/toplevelspans.png" alt="span" >}}


## Métriques de trace

Tout comme les autres types de [métriques Datadog][2], les [métriques de trace][5] sont automatiquement recueillies et conservées pendant une durée de 15 mois. Elles peuvent être utilisées pour identifier des hits, des erreurs ou une latence et envoyer des alertes à ce sujet. Le host qui reçoit les traces, ainsi que le service ou la ressource, sont ajoutés en tant que tag aux métriques de service. Par exemple, après avoir instrumenté un service Web, des métriques de trace sont recueillies pour la span de point d'entrée `web.request` dans le [Metric Summary][16].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="métriques de trace" >}}

### Dashboard

Les métriques de trace peuvent être exportées vers un dashboard à partir de la page *Service* ou *Ressource*. Elles peuvent également être interrogées à partir d'un dashboard existant.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="dashboard de métriques de trace" >}}

### Monitoring

Les métriques de trace sont idéales pour la surveillance. Il est possible de définir des monitors d'APM depuis les pages [New monitor][17], [Service][6] ou [Resource][7]. Des suggestions de monitors sont affichées sur la page [Service][6] ou [Resource][7].

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="monitor de métriques de trace" >}}

## Analyse et recherche de traces

[Effectuez des recherches et des analyses][14] sur 100 % des traces ingérées pendant 15 minutes et sur toutes les [spans indexées](#span-indexee) pendant 15 jours.

## Span indexée

**Remarque :** les spans indexées étaient auparavant désignées par le terme de « spans analysées ». Le changement de dénomination a eu lieu à l'occasion du lancement de Tracing Without Limits le 20 octobre 2020.

Les spans indexées représentent les spans indexées par un [filtre de rétention](#filtres-de-retention) et stockées dans Datadog pendant 15 jours. Elles peuvent être utilisées pour rechercher, interroger et surveiller vos données via la fonctionnalité [Analyse et recherche de traces][14] en fonction des [tags](#tags-de-span) inclus dans la span.

<div class="alert alert-info">
Après l'ingestion, vous pouvez contrôler et visualiser le nombre précis de spans indexées par service en créant des <a href="https://app.datadoghq.com/apm/traces/retention-filters">filtres de rétention basés sur des tags</a>.
</div>

## Tags de span

Appliquez des tags à vos spans sous forme de paires clé-valeur pour corréler une requête dans la *Vue Trace* ou pour filtrer dans *Analytics*. Les tags peuvent être ajoutés à une seule span ou à l'ensemble d'entre elles. Dans l'exemple ci-dessous, les requêtes (`merchant.store_name`, `merchant.tier`, etc.) ont été ajoutées en tant que tags à la span.

{{< img src="tracing/visualization/span_tag.png" alt="tag de span" >}}

Pour commencer à taguer des spans dans votre application, consultez ce [guide][12].

Une fois qu'un tag a été ajouté à une span, recherchez et interrogez ce tag dans Analytics en cliquant sur le tag pour l'ajouter en tant que [facette][18]. La valeur de ce tag est alors stockée pour toutes les nouvelles traces et peut être utilisée dans la barre de recherche, le volet Facettes et la requête du graphique des traces.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Créer une facette" style="width:50%;">}}

## Filtres de rétention

[Définissez des [filtres basés sur des tags][19] dans l'interface de Datadog afin d'indexer les spans pendant 15 jours et de les utiliser avec la fonctionnalité d'[analyse et de recherche de traces](#analyse-et-recherche-de-traces).](#trace-search-and-analytics)

## Contrôles de l'ingestion

[Envoyez toutes les traces][20] de vos services à Datadog et tirez parti des [filtres de rétention basés sur des tags](#filtres-de-retention) afin de conserver uniquement les traces qui intéressent votre entreprise pendant 15 jours.

## Métrique de sous-couche

Certaines [métriques d'application de tracing][15] possèdent les tags `sublayer_service` et `sublayer_type`, qui vous permettent de calculer le temps d'exécution d'un service spécifique au sein d'une trace.

## Durée d'exécution

Les spans actives à un moment donné et pour une trace donnée regroupent toutes les spans terminales (c'est-à-dire les spans sans enfants).

{{< img src="tracing/visualization/execution_duration.png" style="width:50%;" alt="Durée d'exécution"  style="width:50%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types/apm/
[2]: /fr/developers/faq/data-collection-resolution-retention/
[3]: /fr/tracing/setup/
[4]: /fr/tracing/visualization/services_list/
[5]: /fr/tracing/visualization/services_map/
[6]: /fr/tracing/visualization/service/
[7]: /fr/tracing/visualization/resource/
[8]: /fr/tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /fr/tracing/manual_instrumentation/
[10]: /fr/tracing/opentracing/
[11]: /fr/tracing/connect_logs_and_traces/
[12]: /fr/tracing/guide/adding_metadata_to_spans/
[13]: /fr/tracing/runtime_metrics/
[14]: /fr/tracing/trace_search_and_analytics/
[15]: /fr/tracing/guide/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors#/create
[18]: /fr/tracing/trace_search_and_analytics/query_syntax/#facets
[19]: /fr/tracing/trace_retention_and_ingestion/#retention-filters
[20]: /fr/tracing/trace_retention_and_ingestion/#ingestion-controls