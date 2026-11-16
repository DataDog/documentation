---
aliases:
- /fr/tracing/terminology/
- /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /fr/tracing/visualization/
description: Apprenez la terminologie essentielle de l'APM, notamment les services,
  les ressources, les traces, les spans, l'instrumentation et d'autres concepts clés
  pour le traçage distribué.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing d'APM avec votre application
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
  text: Apprenez à lire une trace dans Datadog
- link: /monitors/types/apm/
  tag: Documentation
  text: En savoir plus sur les monitors APM
title: Termes et concepts de la solution APM
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

L'interface utilisateur APM fournit de nombreux outils pour analyser les performances des applications et les mettre en corrélation avec les données de l'ensemble du produit, afin de trouver et de résoudre les problèmes dans les systèmes distribués.

Pour des définitions et descriptions supplémentaires de termes APM importants tels que _spans_ et _indexés_, consultez le [Glossaire principal][22]. 

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Les services sont les éléments constitutifs des architectures de microservices modernes : globalement, un service regroupe des points de terminaison, des requêtes ou des tâches dans le but de construire votre application.                                  |
| [Ressource](#resources)          | Les ressources représentent un domaine particulier d'une application client : il s'agit généralement d'un point de terminaison web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan.                                                              |
| [Monitors][23]                   | Les monitors de métriques APM fonctionnent comme les monitors de métriques classiques, mais avec des contrôles spécialement adaptés à l'APM. Utilisez ces monitors pour recevoir des alertes au niveau du service sur les requêtes, les erreurs et diverses mesures de latence. |
| [Trace](#trace)                 | Une trace est utilisée pour suivre le temps passé par une application à traiter une requête et le statut de cette requête. Chaque trace se compose d'un ou plusieurs spans.                                                             |
| [Propagation du contexte de trace](#trace-context-propagation)| La méthode consistant à transmettre des identifiants de trace entre les services, permettant à Datadog d'assembler des spans individuels en une trace distribuée complète. |
| [Retention Filters](#retention-filters) | Les Retention Filters sont des contrôles basés sur des tags, définis dans l'interface Datadog, qui déterminent quels spans indexer dans Datadog pendant 15 jours.                                                                                              |
| [Ingestion Controls](#ingestion-controls) | Les Ingestion Controls permettent d'envoyer jusqu'à 100% des traces à Datadog pour la recherche en direct et l'analyse pendant 15 minutes.
| [Instrumentation](#instrumentation) | L'instrumentation est le processus consistant à ajouter du code à votre application pour capturer et transmettre des données d'observabilité. |
| [Baggage](#baggage) | Le baggage contient des informations contextuelles transmises entre les traces, les métriques et les logs sous forme de paires clé-valeur. |

## Services {#services}

Après avoir [instrumenté votre application][3], le [Catalog][4] est votre principale page d'accueil pour les données APM.

{{< img src="tracing/visualization/software_catalog.png" alt="Catalog" >}}

Les services représentent les éléments constitutifs des architectures de microservices modernes. En d'autres termes, un service regroupe des endpoints, des requêtes ou des tâches afin de mettre des instances à l'échelle. Quelques exemples :

* Un groupe de points de terminaison URL peut être regroupé sous un service API.
* Un groupe de requêtes de base de données regroupées au sein d'un même service de base de données.
* Un groupe de tâches périodiques configurées dans le service crond.

La capture d'écran ci-dessous représente un système distribué de microservices pour un outil de création de sites e-commerce. `web-store`, `ad-server`, `payment-db` et `auth-service` sont tous représentés comme des services dans APM.

{{< img src="tracing/visualization/service_map.png" alt="Service Map" >}}

Tous les services sont répertoriés dans le [Catalog][4] et représentés visuellement sur la [Service Map][5]. Chaque service possède sa propre [Service page][6], où vous pouvez consulter et examiner les [métriques de trace](#trace-metrics), telles que le débit, la latence et les taux d'erreur. Utilisez ces métriques pour créer des widgets de tableau de bord et des monitors, et pour consulter les performances de chaque ressource appartenant au service, telle qu'un point de terminaison web ou une requête de base de données.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="service page" >}}

<div class="alert alert-info">
Vous ne voyez pas les points de terminaison HTTP attendus sur la Service page ? Dans APM, les points de terminaison sont connectés à un service par bien plus que le nom du service. Cela se fait également avec le <code>span.name</code> du span de point d'entrée de la trace. Par exemple, sur le service web-store ci-dessus, <code>web.request</code> est le span de point d'entrée. Plus d'informations à ce sujet <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">ici</a>.
</div>

## Ressources {#resources}

Les ressources représentent un domaine particulier d'une application client. Il peut s'agir généralement d'un point de terminaison web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan. Pour un service web, ces ressources peuvent être des points de terminaison web dynamiques regroupés sous un nom de span statique : `web.request`. Dans un service de base de données, il s'agirait de requêtes de base de données avec le nom de span `db.query`. Par exemple, le service `web-store` a instrumenté automatiquement des ressources — des points de terminaison web — qui gèrent les paiements, la mise à jour des paniers, l'ajout d'articles, etc. Un nom de ressource peut être la méthode HTTP et la route HTTP, par exemple `GET /productpage` ou `ShoppingCartController#checkout`. 

Chaque ressource possède sa propre [Resource page][7], avec des [métriques de trace][15] propres au point de terminaison concerné. Les métriques de trace peuvent être utilisées comme n'importe quelle autre métrique Datadog : vous pouvez les exporter vers un tableau de bord ou les utiliser pour créer des monitors. La Resource page affiche également le widget de résumé des spans avec une vue agrégée des [spans][21] pour toutes les [traces](#trace), la distribution de la latence des requêtes et les traces qui montrent les requêtes effectuées vers ce point de terminaison.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="Resource page" >}}

## Trace {#trace}

Une trace est utilisée pour suivre le temps passé par une application à traiter une requête et le statut de cette requête. Chaque trace se compose d'un ou plusieurs spans. Pendant la durée de vie de la requête, vous pouvez voir, dans la vue sous forme de graphique en flammes, les appels distribués entre les services (car un [identifiant de trace est injecté et extrait au moyen des en-têtes HTTP][8]), les [bibliothèques instrumentées automatiquement][3] et l'[instrumentation manuelle][9] utilisant des outils open source comme [OpenTracing][10]. Sur la page Trace View, chaque trace collecte des informations qui la relient à d'autres parties de la plateforme, notamment [la connexion des logs aux traces][11], [l'ajout de tags aux spans][12] et [la collecte de métriques d'exécution][13].

{{< img src="tracing/visualization/trace_view.png" alt="Trace View" >}}

## Propagation du contexte de trace {#trace-context-propagation}

La propagation du contexte de trace est la méthode permettant de transmettre les identifiants de trace entre les services dans un système distribué. Elle permet à Datadog d'assembler des spans individuels provenant de différents services en une seule trace distribuée. La propagation du contexte de trace fonctionne en injectant des identifiants, tels que l'ID de trace et l'ID de span parent, dans les en-têtes HTTP à mesure que la requête circule dans le système. Le service en aval extrait ensuite ces identifiants et poursuit la trace. Cela permet à Datadog de reconstruire le chemin complet d'une requête à travers plusieurs services.

Pour plus d'informations, consultez [la propagation du contexte de trace][27] pour le langage de votre application.

## Filtres de rétention {#retention-filters}

[Définissez des filtres basés sur les tags][19] dans l'interface utilisateur pour indexer les spans pendant 15 jours afin de les utiliser avec [Trace Search and Analytics][14].

## Ingestion Controls {#ingestion-controls}

[Envoyez 100% des traces][20] de vos services à Datadog et combinez-les avec des [Retention Filters basés sur les tags](#retention-filters) pour conserver pendant 15 jours les traces importantes pour votre activité.

## Instrumentation {#instrumentation}

L'instrumentation est le processus consistant à ajouter du code à votre application pour capturer et rapporter des données d'observabilité à Datadog, telles que des traces, des métriques et des logs. Datadog fournit des bibliothèques d'instrumentation pour divers langages de programmation et frameworks.

Vous pouvez instrumenter automatiquement votre application en installant le Datadog Agent avec [Single Step Instrumentation][24] ou en [ajoutant manuellement les SDK Datadog][25] à votre code.

Vous pouvez utiliser une instrumentation personnalisée en intégrant directement du code de traçage dans le code de votre application. Cela vous permet de créer, modifier ou supprimer par programmation des traces à envoyer à Datadog.

Pour en savoir plus, consultez [Application Instrumentation][26].

## Baggage {#baggage}

Le Baggage vous permet de propager des paires clé-valeur (également appelées éléments de baggage) au-delà des limites de service dans un système distribué. Contrairement au contexte de trace, qui concerne les identifiants de trace, Baggage permet de transmettre des données métier et d'autres informations contextuelles avec les traces.  

Pour en savoir plus, consultez les [formats de propagation][28] pris en charge pour le langage de votre application.

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
[16]: https://app.datadoghq.com/metric/summary
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