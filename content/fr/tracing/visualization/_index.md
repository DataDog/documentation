---
title: Glossaire et procédure pas à pas de l'APM
kind: documentation
aliases:
  - /fr/tracing/terminology/
  - /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
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
---
L'interface de l'APM fournit de nombreux outils permettant de dépanner les performances des applications et de les mettre en corrélation avec l'ensemble du produit, ce qui vous aide à rechercher et à résoudre les problèmes liés aux systèmes hautement distribués.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Les services représentent les éléments constitutifs des architectures de microservices modernes. En d'autres termes, un service regroupe des endpoints, des requêtes ou des tâches afin de mettre des instances à l'échelle.                                         |
| [Ressource](#resources)          | Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan.                                                              |
| [Monitors][1]                   | Les monitors de métrique d'APM fonctionnent comme les monitors de métrique, mais proposent des commandes spécialement conçues pour l'APM. Utilisez ces monitors pour recevoir des alertes propres à chaque service concernant les hits, les erreurs et diverses mesures de latence. |
| [Trace](#trace)                 | Les traces servent à suivre le temps passé par une application à traiter une requête, ainsi que le statut de la requête. Chaque trace est composée d'une ou de plusieurs spans.                                                             |
| [Span](#spans)                  | Une span représente une unité de travail logique dans un système distribué pour une période donnée. Un groupe de plusieurs spans correspond à une trace.                                                                                          |
| [Métriques de trace](#trace-metrics) | Tout comme les autres types de [métriques Datadog][1], les métriques de trace sont automatiquement collectées et conservées pendant une durée de 15 mois. Elles peuvent être utilisées pour identifier et recevoir des alertes sur les hits, les erreurs ou la latence.                       |
| [App Analytics](#app-analytics) | La fonctionnalité App Analytics sert à filtrer les spans analysées en fonction de tags définis par l'utilisateur (customer_id, error_type, app_name, etc.) ou de tags d'infrastructure.                                                                                |
| [Span analysée](#analyzed-span) | Les spans analysées sont envoyées à un débit de 100 %, ce qui signifie qu'une span est envoyée pour chaque requête. Elles peuvent être utilisés pour rechercher, interroger et surveiller vos données App Analytics.                                                                                                |
| [Tags de span](#span-tags)         | Appliquez des tags à vos spans sous forme de paires clé-valeur pour corréler une requête dans la *Vue Trace* ou pour filtrer vos données dans *App Analytics*.                                                                                                    |

## Services

[Une fois votre application instrumentée][3], la [Liste des services][4] est votre point de départ pour accéder à vos données d'APM.

{{< img src="tracing/visualization/service_list.png" alt="liste des services" responsive="true">}}

Les services sont les composants d'une architecture de microservices moderne. Un service regroupe généralement des endpoints, des requêtes ou des tâches qui procèdent au scaling de vos instances. Par exemple :

* Un groupe d'endpoints d'URL formant un service d'API.
* Un groupe de requêtes de base de données formant un service de base de données.
* Un groupe de tâches périodiques configurées dans le service crond.

La capture d'écran ci-dessous montre un système distribué à base de microservices pour un développeur de sites de e-commerce. On observe un `web-store`, un `ad-server`, un `payment-db` et un `auth-service`, tous représentés en tant que services dans l'APM.

{{< img src="tracing/visualization/service_map.png" alt="service map" responsive="true">}}

La page [Service List][4] affiche la liste de tous vos services, tandis que la [Service Map][5] les représente visuellement. Chaque service dispose d'une [page Service][6] distincte qui vous permet de consulter et d'inspecter des [métriques de trace](#trace-metrics) relatives au débit, à la latence et aux taux d'erreurs. Utilisez ces métriques pour créer des widgets de dashboard, définir des monitors et visualiser les performances de chaque ressource associée au service, telle qu'un endpoint web ou une requête de base de données.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="page service" responsive="true">}}

<div class="alert alert-info">
Vous ne voyez pas les endpoints HTTP attendus sur la page Service ? Dans l'APM, le nom du service n'est pas le seul paramètre pris en compte pour connecter des endpoints à un service : le `span.name` de la span de point d'entrée de la trace est également utilisé. Par exemple, dans le service web-store ci-dessus, la span de point d'entrée est `web.request`.
 Vous trouverez plus d'informations à ce sujet <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">en cliquant ici</a>.
</div>

## Ressources

Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan. Pour un service Web, ces ressources peuvent être des endpoints web dynamiques regroupés sous un nom de span tel que `web.request`. Pour un service de base de données, il peut s'agir de requêtes de base de données portant le nom de span `db.query`. Par exemple, le service `web-store` possède des ressources automatiquement instrumentées (endpoints web) qui gèrent les paiements, les mises à jour de panier, les ajouts d'article, etc. Chaque ressource possède sa propre [page Ressource][6] qui affiche les [métriques de trace](#metriques-de-trace) associées à chaque endpoint spécifique. Les métriques de trace peuvent être utilisées comme n'importe quelle autre métrique Datadog : elles peuvent être exportées vers un dashboard ou utilisées pour créer des monitors. La page Ressource affiche également le widget Résumé des spans avec une vue agrégée des [spans](#spans) pour toutes les [traces](#trace), les distributions de latences des requêtes et les traces indiquant les requêtes adressées à cet endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="page ressource" responsive="true">}}

## Trace

Les traces servent à suivre le temps passé par une application à traiter une requête, ainsi que le statut de la requête. Chaque trace est composée d'une ou de plusieurs spans. Durant le cycle de vie de la requête, il est possible de visualiser les appels distribués au sein de vos services (grâce à [l'injection/l'extraction d'un ID de trace via les en-têtes HTTP][8]), de vos [bibliothèques instrumentées automatiquement][3] et de vos [instrumentations manuelles][9] à l'aide d'outils open source tels que [OpenTracing][10] sous forme de Flamegraph. La page Vue Trace présente des informations sur la trace issues d'autres sections de la plateforme, telles que [Connecter vos logs à vos traces][11], [Ajouter des tags à des spans][12] et [Recueillir des métriques de runtime][13].

{{< img src="tracing/visualization/trace_view.png" alt="vue trace" responsive="true">}}

## Spans

Une span représente une unité de travail logique dans un système pour une période donnée. Chaque span comprend un `span.name`, une heure de début, une durée et des [tags de span](#tags-de-span). Une span peut par exemple peut décrire le temps passé pour un appel distribué sur une machine distincte ou le temps passé sur un composant minime dans le cadre d'une opération plus importante. Les spans peuvent être imbriquées les unes aux autres, ce qui crée une relation parent-enfant entre elles.

Dans l'exemple ci-dessous, la span `rack.request` correspond au point d'entrée de la trace. Cela signifie que la page du service web-store affiche les ressources composées de traces ayant une span de point d'entrée nommée `rack.request.` L'exemple montre également les tags ajoutés côté application (`merchant.name`, `merchant.tier`, etc.). Ces tags définis par l'utilisateur peuvent être utilisés pour rechercher et analyser des données d'APM dans [App Analytics][14].

{{< img src="tracing/visualization/span_with_metadata.png" alt="span" responsive="true">}}

## Métriques de trace

Tout comme les autres types de [métriques Datadog][2], les métriques de trace sont automatiquement collectées et conservées pendant une durée de 15 mois. Elles peuvent être utilisées pour identifier et recevoir des alertes relatives aux hits, aux erreurs ou à la latence. Les métriques de trace sont taguées par le host qui reçoit les traces ainsi que par le service ou la ressource. Par exemple, après avoir instrumenté un service Web, des métriques de trace sont recueillies pour la span de point d'entrée `web.request` dans le [Résumé des métriques][15].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="métriques de trace" responsive="true">}}

### Dashboard

Les métriques de trace peuvent être exportées vers un dashboard à partir de la page *Service* ou *Ressource*. Elles peuvent également être interrogées à partir d'un dashboard existant.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="dashboard de métriques de trace" responsive="true">}}

### Monitoring

Les métriques de trace sont idéales pour la surveillance. Il est possible de définir des monitors d'APM depuis les pages [Nouveau monitor][16], [Service][6] ou [Ressource][7]. Des suggestions de monitors sont affichées sur la page [Service][6] ou [Ressource][7].

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="monitor de métriques de trace" responsive="true">}}


## App Analytics

La fonctionnalité App Analytics sert à filtrer les [spans analysées](#spans-analysees) en fonction de tags définis par l'utilisateur (customer_id, error_type, app_name, etc.) ou de tags d'infrastructure. Cela vous permet d'analyser en détail les requêtes Web transitant par votre service en effectuant des recherches, des représentations visuelles et une surveillance prenant en compte l'intégralité des hits, des erreurs et des mesures de latence. Cette fonctionnalité peut être activée avec la [configuration automatique][17].

{{< wistia vrmqr812sz >}}

## Span analysée

Les spans analysées sont envoyées à un débit de 100 %, ce qui signifie qu'une span est envoyée pour chaque requête. Elles peuvent être utilisés pour rechercher, interroger et surveiller vos données App Analytics en fonction des [tags](#tags-de-span) inclus dans les spans. Une fois la fonction App Analytics activée, le client de tracing analyse par défaut une span de point d’entrée pour les services Web, et offre la possibilité de [configurer des services supplémentaires][18] dans votre application. Par exemple, un service Java avec 100 requêtes générera 100 spans analysées depuis ses spans `servlet.request`. Si vous définissez `DD_TRACE_ANALYTICS_ENABLED = true`, le service` web-store` analyse toutes les spans de `rack.request` et les rend disponibles dans App Analytics. Pour cet exemple, vous pouvez représenter graphiquement la latence la plus élevée au 99e centile des 10 meilleurs marchands. `merchant_name` est un tag défini par l'utilisateur qui a été appliqué à la span dans l'application.

<div class="alert alert-info">
Vous pouvez calculer une estimation du nombre de spans analysées qui seraient générées à partir de vos services avec l'outil <a href="https://app.datadoghq.com/apm/docs/trace-search">Estimateur de span analysée</a>. Une fois ingérées, les spans analysées peuvent être filtrées de 100 % à un pourcentage inférieur pour chaque service à partir des <a href="https://app.datadoghq.com/apm/settings">paramètres de l'APM</a>. Cela vous permet de réduire le nombre de spans analysées facturables.
</div>

## Tags de span

Utilisez des tags de spans sous la forme de paires clé-valeur pour corréler une requête dans la *Vue Trace* ou pour filtrer dans *App Analytics*. Les tags peuvent être ajoutés à une seule span ou à l'ensemble d'entre elles. Dans l'exemple ci-dessous, les requêtes (`merchant.store_name`, `merchant.tier`, etc.) ont été ajoutées en tant que tags à la span.

{{< img src="tracing/visualization/span_tag.png" alt="tag de span" responsive="true">}}

Pour commencer à taguer des spans dans votre application, consultez ce [guide][12].

Une fois qu'un tag a été ajouté à une span, recherchez et interrogez ce tag dans App Analytics en cliquant sur le tag pour l'ajouter en tant que [facette][19]. Cela fait, la valeur de ce tag est stockée pour toutes les nouvelles traces et peut être utilisée dans la barre de recherche, le volet Facettes et la requête de graphique de traces.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Créer une facette" responsive="true" style="width:50%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types/apm/
[2]: /fr/developers/faq/data-collection-resolution-retention
[3]: /fr/tracing/setup
[4]: /fr/tracing/visualization/services_list
[5]: /fr/tracing/visualization/services_map
[6]: /fr/tracing/visualization/service
[7]: /fr/tracing/visualization/resource
[8]: /fr/tracing/advanced/opentracing/?tab=java#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /fr/tracing/advanced/manual_instrumentation
[10]: /fr/tracing/advanced/opentracing
[11]: /fr/tracing/advanced/connect_logs_and_traces
[12]: /fr/tracing/advanced/adding_metadata_to_spans
[13]: /fr/tracing/advanced/runtime_metrics
[14]: /fr/tracing/app_analytics
[15]: https://app.datadoghq.com/metric/summary
[16]: https://app.datadoghq.com/monitors#/create
[17]: /fr/tracing/app_analytics/#automatic-configuration
[18]: /fr/tracing/app_analytics/#configure-additional-services-optional
[19]: /fr/tracing/app_analytics/search/#facets