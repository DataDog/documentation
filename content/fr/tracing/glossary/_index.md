---
aliases:
- /fr/tracing/terminology/
- /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /fr/tracing/visualization/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing d'APM avec votre application
- link: /tracing/services/services_list/
  tag: Documentation
  text: Découvrir la liste des services transmettant des données à Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Comprendre comment lire une trace Datadog
title: Termes et concepts de l'APM
---

{{< jqmath-vanilla >}}

L'interface de l'APM fournit de nombreux outils permettant de surveiller les performances de vos applications et de les mettre en corrélation avec les données des autres solutions Datadog. Vous pouvez ainsi identifier et résoudre plus facilement les problèmes liés aux systèmes distribués.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Les services sont les composants d'une architecture de microservices moderne. Un service regroupe généralement des endpoints, des requêtes ou des tâches qui assurent le bon fonctionnement de votre application.                                  |
| [Ressource](#ressources)          | Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan.                                                              |
| [Monitors][1]                   | Les monitors de métrique d'APM fonctionnent comme les monitors de métrique, mais proposent des commandes spécialement conçues pour l'APM. Utilisez ces monitors pour recevoir des alertes propres à chaque service concernant les hits, les erreurs et diverses mesures de latence. |
| [Trace](#trace)                 | Les traces servent à suivre le temps passé par une application à traiter une requête, ainsi que le statut de la requête. Chaque trace est composée d'une ou de plusieurs spans.                                                             |
| [Span](#spans)                  | Une span représente une unité de travail logique dans un système distribué pour une période donnée. Un groupe de plusieurs spans correspond à une trace.                                                                                          |
| [Span d'entrée de service](#span-d-entree-de-service) | Une span est dite « d'entrée de service » lorsqu'elle constitue le point d'entrée pour une requête envoyée à un service. Dans l'APM Datadog, on distingue ce type de span par le fait que le parent immédiat est affiché dans une couleur distincte sur un flamegraph.                                                                                            |
| [Span racine de trace](#span-racine-de-trace) | Une span est dite « racine » lorsqu'elle constitue le point d'entrée pour une trace. Sa création marque le début de la trace. |
| [Métriques de trace](#metriques-de-trace) | Tout comme les autres types de [métriques Datadog][2], les métriques de trace sont automatiquement recueillies et conservées pendant une durée de 15 mois. Elles peuvent être utilisées pour identifier des hits, des erreurs ou de la latence et générer des alertes à ce sujet. Les statistiques et les métriques sont toujours calculées en fonction de _toutes_ les traces, et ne sont pas affectés par les contrôles d'ingestion.                       |
| [Span indexée](#span-indexee) | Les spans indexées représentent toutes les spans indexées par les filtres de rétention ou les spans analysées de l'ancienne fonction App Analytics. Elles peuvent être utilisées pour rechercher, interroger et surveiller vos données dans *Analytics*.                                                                                                |
| [Tags de span](#tags-de-span)         | Appliquez des tags à vos spans sous forme de paires clé-valeur pour corréler une requête dans la *Vue Trace* ou pour filtrer vos données dans *Analytics*.                                                                                                    |
| [Filtres de rétention](#filtres-de-retention) | Les filtres de rétention sont des règles basées sur des tags définies au sein de l'interface utilisateur de Datadog. Elles déterminent les spans à indexer dans Datadog pendant 15 jours.                                                                                              |
| [Contrôles d'ingestion](#controles-d-ingestion) | Les contrôles d'ingestion servent à envoyer jusqu'à 100 % des traces à Datadog pour effectuer des recherches et des analyses en temps réel pendant 15 minutes.
| [Métrique de sous-couche](#metrique-de-sous-couche) | Une métrique de sous-couche correspond à la durée d'exécution d'un type/service donné au sein d'une trace.
| [Durée d'exécution](#duree-d-execution) | Temps total pendant lequel une span est considérée comme « active » (c.-à-d. qu'elle n'attend pas la finalisation d'une span enfant).

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

Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan. Pour un service Web, ces ressources peuvent être des endpoints web dynamiques regroupés sous un nom de span tel que `web.request`. Pour un service de base de données, il peut s'agir de requêtes de base de données portant le nom de span `db.query`. Par exemple, le service `web-store` possède des ressources automatiquement instrumentées (endpoints web) qui gèrent les paiements, les mises à jour de panier, les ajouts d'articles, etc. Le nom d'une ressource peut correspondre à la méthode ou route HTTP, par exemple `GET /productpage` ou `ShoppingCartController#checkout`. 

Chaque ressource possède sa propre [page Ressource][7] qui affiche les [métriques de trace](#metriques-de-trace) associées à chaque endpoint spécifique. Les métriques de trace peuvent être utilisées comme n'importe quelle autre métrique Datadog : elles peuvent être exportées vers un dashboard ou utilisées pour créer des monitors. La page Ressource affiche également le widget Résumé des spans avec une vue agrégée des [spans](#spans) pour toutes les [traces](#trace), les distributions de latences des requêtes et les traces indiquant les requêtes adressées à cet endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="page ressource" >}}

## Trace

Les traces servent à suivre le temps passé par une application à traiter une requête, ainsi que le statut de la requête en question. Chaque trace est composée d'une ou de plusieurs spans. Durant le cycle de vie de la requête, il est possible de visualiser les appels distribués au sein de vos services (grâce à [l'injection/l'extraction d'un ID de trace via les en-têtes HTTP][8]), de vos [bibliothèques instrumentées automatiquement][3] et de vos [instrumentations manuelles][9] à l'aide d'outils open source, tels que [OpenTracing][10], sous forme de flamegraph. La page Trace View présente des informations sur une trace issues d'autres solutions de la plateforme, notamment les données provenant de l'[association de vos logs à vos traces][11], de l'[ajout de tags à des spans][12] et de la [collecte de métriques runtime][13].

{{< img src="tracing/visualization/trace_view.png" alt="vue trace" >}}

## Spans

Une span représente une unité de travail logique dans un système pour une période donnée. Chaque span comprend un `span.name`, une heure de début, une durée et des [tags de span](#tags-de-span). Une span peut par exemple peut décrire le temps passé pour un appel distribué sur une machine distincte ou le temps passé sur un composant minime dans le cadre d'une opération plus importante. Les spans peuvent être imbriquées les unes aux autres, ce qui crée une relation parent-enfant entre elles.

Dans l'exemple ci-dessous, la span `rack.request` correspond au point d'entrée de la trace. Cela signifie que la page du service web-store affiche les ressources composées de traces ayant une span de point d'entrée `rack.request`. Cet exemple contient également les tags ajoutés côté application (`merchant.name`, `merchant.tier`, etc.). Ces tags définis par l'utilisateur servent notamment à rechercher et à analyser des données APM dans [Analytics][14].

{{< img src="tracing/visualization/span_with_metadata.png" alt="span" >}}

### Span d'entrée de service

Une span est dite « d'entrée de service » lorsqu'elle constitue le point d'entrée pour une requête envoyée à un service. Dans l'APM Datadog, on distingue ce type de span par le fait que le parent immédiat est affiché dans une couleur distincte sur un flamegraph. Lorsque vous consultez un flamegraph, les services sont également répertoriés sur la droite.

### Span racine de trace

Une span est dite « racine de trace » lorsqu'elle représente la première span d'une trace. La span racine constitue le point d'entrée de la requête tracée. Sa création marque le début de la trace.

Dans l'exemple ci-dessous, les **spans d'entrée de service** sont :
- `rack.request` (qui est également la _span racine_)
- `aspnet_coremvc.request`
- La span verte tout en haut, sous `aspnet_coremvc.request`
- Chaque span `mongodb` orange

{{< img src="tracing/visualization/toplevelspans.png" alt="span" >}}

## Résumé des spans

Le tableau de résumé des spans affiche des métriques pour les spans agrégées sur l'ensemble des traces, notamment sur la fréquence d'apparition des spans dans toutes les traces, le pourcentage de traces contenant une certaine span, la durée moyenne de la span et sa contribution à la durée totale d'exécution des requêtes. Ces informations vous aident à détecter les problèmes N+1 dans votre code, afin d'améliorer les performances de votre application.


Le tableau Span Summary n'est disponible que pour les ressources contenant des spans d'entrée de service.


Le tableau de résumé des spans contient les colonnes suivantes :

Average spans per trace
: Le nombre moyen d'occurrences de la span pour les traces, y compris pour la ressource actuelle, où la span est présente au moins une fois.

Percentage of traces
: Le pourcentage de traces, y compris pour la ressource actuelle, où la span est présente au moins une fois.

Average duration
: La durée moyenne de la span pour les traces, y compris pour la ressource actuelle, où la span est présente au moins une fois.

Average percentage of execution time
: Le pourcentage moyen de la durée d'exécution pendant laquelle la span est active pour les traces, y compris pour la ressource actuelle, où la span est présente au moins une fois.

{{< img src="tracing/visualization/span-summary.png" alt="Tableau de résumé des spans" >}}

## Métriques de trace

Tout comme les autres types de [métriques Datadog][2], les [métriques de trace][5] sont automatiquement recueillies et conservées pendant une durée de 15 mois. Elles peuvent être utilisées pour identifier des hits, des erreurs ou une latence et envoyer des alertes à ce sujet. Le host qui reçoit les traces, ainsi que le service ou la ressource, sont ajoutés en tant que tag aux métriques de service. Par exemple, après avoir instrumenté un service Web, des métriques de trace sont recueillies pour la span de point d'entrée `web.request` dans le [Metric Summary][16].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="métriques de trace" >}}

### Dashboard

Les métriques de trace peuvent être exportées vers un dashboard à partir de la page *Service* ou *Ressource*. Elles peuvent également être interrogées à partir d'un dashboard existant.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="dashboard de métriques de trace" >}}

### Monitoring

Les métriques de trace sont idéales pour la surveillance. Il est possible de définir des monitors d'APM depuis les pages [New monitor][17], [Service][6] ou [Resource][7]. Des suggestions de monitors sont affichées sur la page [Service][6] ou [Resource][7].

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="monitor de métriques de trace" >}}

## Trace Explorer

[Effectuez des recherches et des analyses][14] sur l'ensemble des traces ingérées pendant 15 minutes et sur toutes les [spans indexées](#span-indexee) pendant 15 jours.

## Span indexée

Les spans indexées représentent les spans indexées par un [filtre de rétention](#filtres-de-retention) et stockées dans Datadog pendant 15 jours. Elles peuvent être utilisées pour rechercher, interroger et surveiller vos données via la fonctionnalité [Analyse et recherche de traces][14] en fonction des [tags](#tags-de-span) inclus dans la span.

<div class="alert alert-info">
Vous pouvez contrôler et visualiser le nombre précis de spans indexées par service en créant des <a href="https://app.datadoghq.com/apm/traces/retention-filters">filtres de rétention basés sur des tags</a>.
</div>

## Tags de span

Appliquez des tags à vos spans sous forme de paires clé-valeur pour corréler une requête dans la *Vue Trace* ou pour filtrer dans *Analytics*. Les tags peuvent être ajoutés à une seule span ou à l'ensemble d'entre elles. Dans l'exemple ci-dessous, les requêtes (`merchant.store_name`, `merchant.tier`, etc.) ont été ajoutées en tant que tags à la span.

{{< img src="tracing/visualization/span_tag.png" alt="tag de span" >}}

Pour commencer à taguer des spans dans votre application, consultez ce [guide][12].

Une fois qu'un tag a été ajouté à une span, recherchez et interrogez ce tag dans Analytics en cliquant sur le tag pour l'ajouter en tant que [facette][18]. La valeur de ce tag est alors stockée pour toutes les nouvelles traces et peut être utilisée dans la barre de recherche, le volet Facettes et la requête du graphique des traces.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Créer une facette" style="width:50%;">}}

## Filtres de rétention

[Définissez des filtres basés sur des tags][19] dans l'interface Datadog afin d'indexer les spans pendant 15 jours et de les utiliser avec la fonctionnalité d'[analyse et de recherche de traces](#analyse-et-recherche-de-traces).

## Contrôles d'ingestion

[Envoyez toutes les traces][20] de vos services à Datadog et tirez parti des [filtres de rétention basés sur des tags](#filtres-de-retention) afin de conserver uniquement les traces qui intéressent votre entreprise pendant 15 jours.

## Métrique de sous-couche

Certaines [métriques d'application de tracing][15] possèdent les tags `sublayer_service` et `sublayer_type`, qui vous permettent de calculer la durée d'exécution d'un service spécifique au sein d'une trace.

Les métriques de sous-couche ne sont disponibles que si un service possède des dépendances en aval. 

## Durée d'exécution

La durée d'exécution est calculée à partir de la durée d'activité d'une span (à savoir, lorsqu'elle n'a aucune span enfant). Pour les tâches qui ne sont pas simultanées, ce calcul est relativement simple. Dans l'image suivante, la durée d'exécution de la span 1 est calculé comme suit : $\D1 + \D2 + \D3$. La durée d'exécution des spans 2 et 3 correspond à leur largeur respective.

{{< img src="tracing/visualization/execution-time1.png" style="width:50%;" alt="Durée d'exécution" >}}

Lorsque des spans enfant sont exécutées simultanément, la durée d'exécution est obtenue en divisant le temps partagé entre plusieurs spans par le nombre de spans simultanément actives. Dans l'image suivante, les spans 2 et 3 sont exécutées simultanément (elles sont toutes les deux les spans enfant de la span 1) et les durées se chevauchent donc. Ainsi, la durée d'exécution de la span 2 est égale à $\D2 ÷ 2 + \D3$, tandis que celle de la span 3 est égale à $\D2 ÷ 2$.  

{{< img src="tracing/visualization/execution-time2.png" style="width:50%;" alt="Durée d'exécution pour les tâches simultanées" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/create/types/apm/
[2]: /fr/developers/guide/data-collection-resolution-retention/
[3]: /fr/tracing/setup/
[4]: /fr/tracing/services/services_list/
[5]: /fr/tracing/services/services_map/
[6]: /fr/tracing/services/service_page/
[7]: /fr/tracing/services/resource_page/
[8]: /fr/tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /fr/tracing/manual_instrumentation/
[10]: /fr/tracing/opentracing/
[11]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[12]: /fr/tracing/guide/add_span_md_and_graph_it/
[13]: /fr/tracing/metrics/runtime_metrics/
[14]: /fr/tracing/trace_explorer/
[15]: /fr/tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors#/create
[18]: /fr/tracing/trace_explorer/query_syntax/#facets
[19]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /fr/tracing/trace_pipeline/ingestion_controls/