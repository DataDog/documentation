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

| Concept                                             | Description                                                                                                                                                                                    |
|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)                                | Les services représentent les éléments constitutifs des architectures de microservices modernes. En d'autres termes, un service regroupe des endpoints, des requêtes ou des tâches afin de mettre des instances à l'échelle.                   |
| [Ressource](#resources)                              | Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan.                                        |
| [Trace](#trace)                                     | Une trace sert à suivre le temps que passe une application pour traiter une demande et le statut de cette demande. Chaque trace consiste en une ou plusieurs spans.                                       |
| [Span](#spans)                                      | Une span représente une unité de travail logique dans un système distribué pour une période donnée. Les spans multiples construisent une trace.                                                                    |
| [Métriques de trace](#trace-metrics)                     | Les métriques de trace sont automatiquement collectées et conservées. Une politique de rétention de 15 mois s'y applique, tout comme pour les autres [métriques Datadog][1]. Elles peuvent être utilisées pour identifier et donner des alertes sur les hits, les erreurs ou la latence. |
| [Analyse et recherche de traces](#trace-search-analytics) | L'analyse et la recherche de traces sert à filtrer les événements de l'APM avec des tags définis par l'utilisateur (customer_id, error_type, app_name, par exemple) ou avec des tags d'infrastructure.                                                   |
| [Événement de l'APM](#apm-event)                             | Les événements de l'APM possèdent un débit de requête de 100 % et peuvent être utilisés pour effectuer des recherches, des interrogations et une surveillance dans l'analyse et la recherche de traces.                                                                   |
| [Tags de span](#span-tags)                             | Les tags de spans prennent la forme de paires clé-valeur pour corréler une demande dans la *Vue Trace* ou pour filtrer dans *l'analyse et la recherche de traces*.                                                                   |

## Services

Après avoir [instrumenté votre application][2], la [Liste des services][3] devient votre page de destination principale pour les données de l'APM.

{{< img src="tracing/visualization/service_list.png" alt="liste de services" responsive="true">}}

Les services représentent les éléments constitutifs des architectures de microservices modernes. En d'autres termes, un service regroupe des endpoints, des requêtes ou des tâches afin de mettre des instances à l'échelle. Par exemple :

* Un groupe d'URL d'endpoints peut être regroupé sous un service d'API.
* Un groupe de requêtes de base de données regroupées dans un service de base de données.
* Un groupe de tâches périodiques configurées dans le service crond.

La capture d'écran ci-dessous montre un système distribué par microservices pour un développeur de sites de e-commerce. Il existe un `web-store`, `ad-server`, `payment-db`, et `auth-service`, tous représentés comme des services dans l'APM.

{{< img src="tracing/visualization/service_map.png" alt="service map" responsive="true">}}

Tous les services sont affichés [Liste de services][3] et représentés visuellement sur la [Service Map][4]. Chaque service possède sa propre [page de service][5], où des [métriques de trace] telles que le débit, la latence et les taux d'erreur peuvent être visualisées et inspectées. Utilisez ces métriques pour créer des widgets de dashboard ou des monitors et pour voir les performances de chaque ressource, telle qu'un endpoint web ou une requête de base de données appartenant au service.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="page services" responsive="true">}}

<div class="alert alert-info">
Vous ne voyez pas les endpoints HTTP que vous espériez sur la page Service ? Dans l'APM, le nom du service n'est pas le seul facteur permettant aux endpoints de se connecter à un service. Ils peuvent également se connecter grâce au `span.name` de la span de point d'entrée de la trace. Par exemple, dans le service web-store ci-dessus, `web.request` constitue la span de point d'entrée.
 Vous trouverez plus d'informations <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">en cliquant ici</a>.
</div>

## Ressources

Les ressources représentent un domaine particulier d'une application client. Il peut s'agir généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan. Pour un service Web, ces ressources peuvent être des endpoints web dynamiques regroupés sous un nom de span tel que `web.request`. Dans un service de base de données, il peut s'agir de requêtes de base de données portant le nom de span `db.query`. Par exemple, le service `web-store` possède des ressources automatiquement instrumentées (endpoints web) qui gèrent les paiements, mises_a_jour_de_panier, ajouts_d_article, etc. Chaque ressource possède sa propre [page Ressource][6] avec des [métriques de trace](#metriques-de-trace) définies pour chaque endpoint spécifique. Les métriques de trace peuvent être utilisées comme n'importe quelle autre métrique de Datadog : elles peuvent être exportées vers un dashboard ou utilisées pour créer des monitors. La page Ressource affiche également le widget de résumé de span avec une vue agrégée des [spans](#spans) pour toutes les [traces](#trace), la distribution de latence des demandes et les traces indiquant les demandes adressées à cet endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="page ressource" responsive="true">}}

## Trace

Une trace sert à suivre le temps que passe une application pour traiter une demande et le statut de cette demande. Chaque trace consiste en une ou plusieurs spans. Pendant la durée de la demande, vous pouvez voir les appels distribués sur tous les services (car un [ID de trace est injecté / extrait via des en-têtes HTTP [7]), les [bibliothèques instrumentées automatiquement][2], et [l'instrumentation manuelle][8] à l'aide d'outils open source tels que [OpenTracing][9] dans la vue Flamegraph. Dans la page Vue Trace, chaque trace collecte des informations qui la connectent à d'autres parties de la plate-forme, notamment la [connexion des logs aux traces][10], [l'ajout de tags aux spans][11] et la [collecte de métriques d'exécution][12].

{{< img src="tracing/visualization/trace_view.png" alt="vue trace" responsive="true">}}

## Spans

Une span représente une unité de travail logique dans un système pour une période donnée. Chaque span comprend un `span.name`, une heure de début, une durée et des [tags de span](#tags-de-span). Une span peut par exemple peut décrire le temps passé pour un appel distribué sur une machine distincte ou le temps passé sur un composant minime dans le cadre d'une opération plus importante. Les spans peuvent être imbriquées les unes aux autres, ce qui crée une relation parent-enfant entre elles.

Pour l'exemple ci-dessous, la span `rack.request` constitue la span du point d'entrée de la trace. Cela signifie que la page de service web-store affiche des ressources constituées de traces ayant une span de point d’entrée nommée `rack.request.`. L’exemple montre également les tags ajoutés du côté de l'application (`merchant.name`, `merchant.tier`, etc). Ces tags définis par l'utilisateur peuvent être utilisés pour rechercher et analyser des données de l'APM dans [Analyse et recherche de traces][13].

{{< img src="tracing/visualization/span_with_metadata.png" alt="span" responsive="true">}}

## Métriques de trace

Les métriques de trace sont automatiquement collectées et conservées. Une politique de rétention de 15 mois s'y applique, tout comme pour les autres [métriques Datadog][1]. Elles peuvent être utilisées pour identifier et donner des alertes sur les hits, les erreurs ou la latence. Les métriques de trace sont taguées par l'host recevant les traces avec le service ou la ressource. Par exemple, après avoir instrumenté un service Web, des métriques de trace sont collectées pour la span de point d'entrée `web.request` dans le [Résumé des métriques][14].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="métriques de trace" responsive="true">}}

### Dashboard

Les métriques de trace peuvent être exportées vers un dashboard à partir de la page *Service* ou *Ressource*. De plus, les métriques de trace peuvent être interrogées à partir d'un dashboard existant.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="dashboard de métriques de trace" responsive="true">}}

### Surveillance

Les métriques de trace sont utiles pour la surveillance. Les monitors de l'APM peuvent être configurés sur la page [Nouveaux Monitors][15], [Service][5] ou [Ressource][6]. Un ensemble de monitors suggérés est disponible sur la page [Service][5] ou [Ressources][6].

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="monitor de métriques de trace" responsive="true">}}


## Analyse et recherche de traces

L'analyse et la recherche de traces sert à filtrer les [événements de l'APM] (#evenement-de-l-apm) avec tags définis par l'utilisateur (customer_id, error_type, app_name, par exemple) ou avec des tags d'infrastructure. Cela permet d'explorer en profondeur des requêtes web transitant par votre service, tout en permettant de rechercher, de représenter graphiquement et de surveiller le débit de 100 % des hits, des erreurs et du temps de latence. Cette fonctionnalité peut être activée avec la [configuration automatique][16].

{{< vimeo 278748711 >}}

## Événement de l'APM

Les événements de l'APM possèdent un débit de requête à 100 % et peuvent être utilisés pour effectuer des recherches, des interrogations et une surveillance dans l'analyse et la recherche de traces avec les [tags](#tags-de-span) inclus dans les spans. Après avoir activé l'Analyse et la recherche de traces, le client de tracing analyse par défaut une span de point d’entrée pour les services Web, et offre la possibilité de [configurer des services supplémentaires][17] dans votre application. Par exemple, un service Java avec 100 demandes génère 100 événements de l'APM depuis sa span `servlet.request`. Si vous définissez `DD_TRACE_ANALYTICS_ENABLED = true`, le service` web-store` analyse toutes les spans de `rack.request` et les rend disponibles dans l'Analyse et la recherche de traces. Pour cet exemple, vous pouvez représenter graphiquement la latence la plus élevée au 99e centile des 10 meilleurs marchands. `merchant_name` est un tag défini par l'utilisateur qui a été appliqué à la span dans l'application.

{{< img src="tracing/visualization/analyzed_span.mp4" video="true" alt="span analysée" responsive="true">}}


<div class="alert alert-info">
Vous pouvez exécuter une estimation du nombre d'événements de l'APM qui seraient générés à partir de vos services avec l'outil <a href="https://app.datadoghq.com/apm/docs/trace-search">Estimateur de span analysée</a>. Une fois ingérés, vous pouvez filtrer les événements de l'APM de 100 % à un pourcentage inférieur sur un plan service par service sous <a href="https://app.datadoghq.com/apm/settings">paramètres de l'APM </a>. Cela réduit les événements de l'APM facturables.
</div>

## Tags de span

Les tags de spans prennent la forme de paires clé-valeur pour corréler une demande dans la *Vue Trace* ou pour filtrer dans *l'analyse et la recherche de traces*. Les tags peuvent être ajoutés à une seule span ou globalement à toutes les spans. Pour l'exemple ci-dessous, les requêtes (`merchant.store_name`,` merchant.tier`, etc.) ont été ajoutées en tant que tags ajoutés à la span.

{{< img src="tracing/visualization/span_tag.png" alt="tag de span" responsive="true">}}

Pour commencer à tagger des spans dans votre application, consultez cette [procédure pas à pas][18].

Une fois qu'un tag a été ajouté à une span, recherchez et interrogez le tag dans Analyse et recherche de traces en cliquant sur le tag pour l'ajouter en tant que [facette][19]. Une fois effectué, la valeur de ce tag est stockée pour toutes les nouvelles traces et peut être utilisée dans la barre de recherche, le panneau de facettes et la requête du graphique de traces.

{{< img src="tracing/advanced/search/create_facet.png" style="width:50%;" alt="Créer une facette" responsive="true" style="width:50%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/faq/data-collection-resolution-retention
[2]: /fr/tracing/setup
[3]: /fr/tracing/visualization/services_list
[4]: /fr/tracing/visualization/services_map
[5]: /fr/tracing/visualization/service
[6]: /fr/tracing/visualization/resource
[7]: /fr/tracing/advanced/opentracing/?tab=java#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[8]: /fr/tracing/advanced/manual_instrumentation
[9]: /fr/tracing/advanced/opentracing
[10]: /fr/tracing/advanced/connect_logs_and_traces
[11]: /fr/tracing/advanced/adding_metadata_to_spans
[12]: /fr/tracing/advanced/runtime_metrics
[13]: /fr/tracing/app_analytics
[14]: https://app.datadoghq.com/metric/summary
[15]: https://app.datadoghq.com/monitors#/create
[16]: /fr/tracing/app_analytics/#automatic-configuration
[17]: /fr/tracing/app_analytics/#configure-additional-services-optional
[18]: /fr/tracing/advanced/adding_metadata_to_spans
[19]: /fr/tracing/advanced/search/#facets