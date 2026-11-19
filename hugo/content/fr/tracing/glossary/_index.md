---
aliases:
- /fr/tracing/terminology/
- /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /fr/tracing/visualization/
description: Découvrez la terminologie essentielle de l'APM, notamment les services,
  les ressources, les traces, les spans, l'instrumentation et d'autres concepts clés
  pour le tracing distribué.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Découvrez comment configurer le tracing APM avec votre application
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Découvrez et cataloguez les services qui envoient des rapports à Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Découvrez comment lire une trace dans Datadog
- link: /monitors/types/apm/
  tag: Documentation
  text: Découvrez les monitors APM
title: Termes et concepts de la solution APM
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

L'interface utilisateur APM fournit de nombreux outils pour dépanner les performances des applications et les corréler à travers le produit, vous permettant de trouver et de résoudre les problèmes dans les systèmes distribués.

Pour des définitions et descriptions supplémentaires de termes APM importants tels que _spans_ et _indexés_, consultez le [Glossaire principal][22]. 

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Les services sont les éléments constitutifs des architectures de microservices modernes : globalement, un service regroupe des endpoints, des requêtes ou des jobs dans le but de construire votre application.                                  |
| [Ressource](#resources)          | Les ressources représentent un domaine particulier d'une application client : il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'un job en arrière-plan.                                                              |
| [Monitors][23]                   | Les monitors de métriques APM fonctionnent comme des monitors de métriques classiques, mais avec des contrôles spécifiquement adaptés à l'APM. Utilisez ces monitors pour recevoir des alertes au niveau du service sur les hits, les erreurs et diverses mesures de latence. |
| [Trace](#trace)                 | Une trace est utilisée pour suivre le temps passé par une application à traiter une requête et le statut de cette requête. Chaque trace se compose d'un ou plusieurs spans.                                                             |
| [Propagation du contexte de trace](#trace-context-propagation)| La méthode consistant à transmettre des identifiants de trace entre les services, permettant à Datadog d'assembler des spans individuels en une trace distribuée complète. |
| [Filtres de rétention](#retention-filters) | Les filtres de rétention sont des contrôles basés sur des tags définis dans l'interface utilisateur de Datadog qui déterminent quels spans indexer dans Datadog pendant 15 jours.                                                                                              |
| [Contrôles d'ingestion](#ingestion-controls) | Les contrôles d'ingestion sont utilisés pour envoyer jusqu'à 100 % des traces à Datadog pour la recherche en direct et l'analyse pendant 15 minutes.
| [Instrumentation](#instrumentation) | L'instrumentation est le processus consistant à ajouter du code à votre application pour capturer et rapporter des données d'observabilité. |
| [Baggage](#baggage) | Le baggage est une information contextuelle transmise entre les traces, les métriques et les logs sous forme de paires clé-valeur. |

## Services {#services}

Après avoir [instrumenté votre application][3], le [Catalog][4] est votre page d'accueil principale pour les données APM.

{{< img src="tracing/visualization/software_catalog.png" alt="Catalog" >}}

Les services sont les éléments constitutifs des architectures de microservices modernes ; globalement, un service regroupe des endpoints, des requêtes ou des jobs afin de mettre à l'échelle les instances. Quelques exemples :

* Un groupe d'endpoints URL peut être regroupé sous un service API.
* Un groupe de requêtes de base de données regroupées au sein d'un seul service de base de données.
* Un groupe de jobs périodiques configurés dans le service crond.

La capture d'écran ci-dessous représente un système distribué de microservices pour un constructeur de sites e-commerce. Il y a un `web-store`, un `ad-server`, un `payment-db` et un `auth-service`, tous représentés en tant que services dans APM.

{{< img src="tracing/visualization/service_map.png" alt="Service Map" >}}

Tous les services se trouvent dans le [Catalog][4] et sont représentés visuellement sur la [Service Map][5]. Chaque service possède sa propre [Service page][6] où des [métriques de trace](#trace-metrics) telles que le débit, la latence et les taux d'erreur peuvent être visualisées et inspectées. Utilisez ces métriques pour créer des widgets de tableau de bord, créer des monitors et visualiser les performances de chaque ressource, telle qu'un endpoint web ou une requête de base de données appartenant au service.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="page de service" >}}

<div class="alert alert-info">
Vous ne voyez pas les endpoints HTTP attendus sur la Service page ? Dans APM, les endpoints sont associés à un service par plus que son seul nom. Cela se fait également avec le <code>span.name</code> du span de point d'entrée de la trace. Par exemple, sur le service web-store ci-dessus, <code>web.request</code> est le span de point d'entrée. Plus d'informations à ce sujet <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">ici</a>.
</div>

## Ressources {#resources}

Les ressources représentent un domaine particulier d'une application client. Il peut généralement s'agir d'un endpoint web instrumenté, d'une requête de base de données ou d'un job en arrière-plan. Pour un service web, ces ressources peuvent être des endpoints web dynamiques regroupés par un nom de span statique - `web.request`. Dans un service de base de données, il s'agirait de requêtes de base de données avec le nom de span `db.query`. Par exemple, le service `web-store` dispose de ressources instrumentées automatiquement - des endpoints web - qui gèrent les paiements, la mise à jour des paniers, l'ajout d'articles, etc. Un nom de ressource peut être la méthode HTTP et la route HTTP, par exemple `GET /productpage` ou `ShoppingCartController#checkout`. 

Chaque ressource possède sa propre [Resource page][7] avec des [métriques de trace][15] limitées à cet endpoint. Les métriques de trace peuvent être utilisées comme n'importe quelle autre métrique Datadog : elles sont exportables vers un tableau de bord ou peuvent être utilisées pour créer des monitors. La Resource page affiche également le widget de résumé des spans avec une vue agrégée des [spans][21] pour toutes les [traces](#trace), la distribution de la latence des requêtes et les traces qui montrent les requêtes effectuées vers cet endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="page de ressource" >}}

## Trace {#trace}

Une trace est utilisée pour suivre le temps passé par une application à traiter une requête et le statut de cette requête. Chaque trace se compose d'un ou plusieurs spans. Pendant la durée de vie de la requête, vous pouvez voir les appels distribués entre les services (car un [ID de trace est injecté/extrait via des en-têtes HTTP][8]), les [bibliothèques instrumentées automatiquement][3] et l'[instrumentation manuelle][9] à l'aide d'outils open source comme [OpenTracing][10] dans la vue en graphique en flamme. Sur la page Trace View, chaque trace collecte des informations qui la relient à d'autres parties de la plateforme, notamment [la connexion des logs aux traces][11], [l'ajout de tags aux spans][12] et [la collecte de métriques d'exécution][13].

{{< img src="tracing/visualization/trace_view.png" alt="vue trace" >}}

## Propagation du contexte de trace {#trace-context-propagation}

La propagation du contexte de trace est la méthode permettant de transmettre des identifiants de trace entre les services dans un système distribué. Elle permet à Datadog d'assembler des spans individuels provenant de différents services en une seule trace distribuée. La propagation du contexte de trace fonctionne en injectant des identifiants, tels que l'ID de trace et l'ID de span parent, dans les en-têtes HTTP à mesure que la requête circule dans le système. Le service en aval extrait ensuite ces identifiants et poursuit la trace. Cela permet à Datadog de reconstruire le chemin complet d'une requête à travers plusieurs services.

Pour plus d'informations, consultez [la propagation du contexte de trace][27] pour le langage de votre application.

## Filtres de rétention {#retention-filters}

[Définissez des filtres basés sur des tags][19] dans l'interface utilisateur pour indexer les spans pendant 15 jours afin de les utiliser avec [Trace Search and Analytics][14].

## Contrôles d'ingestion {#ingestion-controls}

[Envoyez 100 % des traces][20] depuis vos services vers Datadog et combinez-les avec des [filtres de rétention basés sur des tags](#retention-filters) pour conserver pendant 15 jours les traces qui comptent pour votre activité.

## Instrumentation {#instrumentation}

L'instrumentation est le processus consistant à ajouter du code à votre application pour capturer et rapporter des données d'observabilité à Datadog, telles que des traces, des métriques et des logs. Datadog fournit des bibliothèques d'instrumentation pour divers langages de programmation et frameworks.

Vous pouvez instrumenter automatiquement votre application lorsque vous installez le Datadog Agent avec [Single Step Instrumentation][24] ou lorsque vous [ajoutez manuellement les SDK Datadog][25] à votre code.

Vous pouvez utiliser une instrumentation personnalisée en intégrant directement le code de tracing dans le code de votre application. Cela vous permet de créer, modifier ou supprimer par programmation des traces à envoyer à Datadog.

Pour en savoir plus, lisez [Instrumentation des applications][26].

## Baggage {#baggage}

Le baggage vous permet de propager des paires clé-valeur (également appelées éléments de baggage) entre les services d'un système distribué. Contrairement au contexte de trace, qui se concentre sur les identifiants de trace, le baggage permet la transmission de données métier et d'autres informations contextuelles avec les traces.  

Pour en savoir plus, consultez les [formats de propagation][28] pris en charge par le langage de votre application.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/extend/guide/data-collection-resolution/
[3]: /fr/tracing/setup/
[4]: /fr/internal_developer_portal/catalog/
[5]: /fr/tracing/services/services_map/
[6]: /fr/tracing/services/service_page/
[7]: /fr/tracing/services/resource_page/
[8]: /fr/tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /fr/tracing/manual_instrumentation/
[10]: /fr/tracing/opentracing/
[11]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[12]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: /fr/tracing/metrics/runtime_metrics/
[14]: /fr/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans
[15]: /fr/tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/catalog
[17]: https://app.datadoghq.com/monitors/create
[18]: /fr/tracing/trace_explorer/query_syntax/#facets
[19]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /fr/tracing/trace_pipeline/ingestion_controls/
[21]: /fr/glossary/#span
[22]: /fr/glossary/
[23]: /fr/monitors/types/apm/
[24]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm
[25]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[26]: /fr/tracing/trace_collection/
[27]: /fr/tracing/trace_collection/trace_context_propagation
[28]: /fr/tracing/trace_collection/trace_context_propagation/#supported-formats