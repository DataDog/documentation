---
aliases:
- /fr/tracing/terminology/
- /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /fr/tracing/visualization/
description: Apprenez les termes essentiels de l'APM, y compris les services, les
  ressources, les traces, les spans, l'instrumentation et d'autres concepts clés pour
  le traçage distribué.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing d'APM avec votre application
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Découvrez et cataloguez les services rapportant à Datadog
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
  text: Découvrez les moniteurs APM
title: Termes et concepts de la solution APM
---
{{< jqmath-vanilla >}}

## Aperçu {#overview}

L'interface utilisateur APM fournit de nombreux outils pour résoudre les problèmes de performance des applications et les corréler à travers le produit, vous permettant de trouver et de résoudre des problèmes dans des systèmes distribués.

Pour des définitions et des descriptions supplémentaires des termes APM importants tels que _spans_ et _indexés_, consultez le [glossaire principal][22]. 

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Les services constituent les éléments fondamentaux des architectures modernes de microservices – en général, un service regroupe des endpoints, des requêtes ou des jobs afin de construire votre application.                                  |
| [Ressource](#resources)          | Les ressources représentent un domaine particulier d'une application client - elles sont généralement un point de terminaison web instrumenté, une requête de base de données ou une tâche en arrière-plan.                                                              |
| [Moniteurs][23]                   | Les moniteurs de métriques APM fonctionnent comme des moniteurs de métriques réguliers, mais avec des contrôles spécifiquement adaptés à l'APM. Utilisez ces moniteurs pour recevoir des alertes au niveau du service sur les hits, les erreurs et une variété de mesures de latence. |
| [Trace](#trace)                 | Une trace est utilisée pour suivre le temps passé par une application à traiter une requête et l'état de cette requête. Chaque trace se compose d'un ou plusieurs spans.                                                             |
| [Propagation du Contexte de Trace](#trace-context-propagation)| La méthode de passage des identifiants de trace entre les services, permettant à Datadog de relier des spans individuels en une trace distribuée complète. |
| [Filtres de Rétention](#retention-filters) | Les filtres de rétention sont des contrôles basés sur des balises définis dans l'interface utilisateur de Datadog qui déterminent quels spans indexer dans Datadog pendant 15 jours.                                                                                              |
| [Contrôles d'Ingestion](#ingestion-controls) | Les contrôles d'ingestion sont utilisés pour envoyer jusqu'à 100 % des traces à Datadog pour une recherche et une analyse en direct pendant 15 minutes.
| [Instrumentation](#instrumentation) | L'instrumentation est le processus d'ajout de code à votre application pour capturer et rapporter des données d'observabilité. |
| [Bagages](#baggage) | Les bagages sont des informations contextuelles qui sont transmises entre les traces, les métriques et les journaux sous forme de paires clé-valeur. |

## Services {#services}

Après avoir [instrumenté votre application][3], le [Catalogue][4] est votre page d'accueil principale pour les données APM.

{{< img src="tracing/visualization/software_catalog.png" alt="Catalogue" >}}

Les services représentent les éléments constitutifs des architectures de microservices modernes. En d'autres termes, un service regroupe des endpoints, des requêtes ou des tâches afin de mettre des instances à l'échelle. Quelques exemples :

* Un groupe de points de terminaison URL peut être regroupé sous un service API.
* Un groupe de requêtes DB qui sont regroupées au sein d'un service de base de données.
* Un groupe de tâches périodiques configurées dans le service crond.

La capture d'écran ci-dessous est un système de microservices pour un constructeur de site e-commerce. Il y a un `web-store`, `ad-server`, `payment-db` et `auth-service` tous représentés comme des services dans APM.

{{< img src="tracing/visualization/service_map.png" alt="carte des services" >}}

Tous les services peuvent être trouvés dans le [Catalogue][4] et représentés visuellement sur la [Carte des Services][5]. Chaque service a sa propre [page de service][6] où [les métriques de trace](#trace-metrics) comme le débit, la latence et les taux d'erreur peuvent être consultés et inspectés. Utilisez ces métriques pour créer des widgets de tableau de bord, créer des moniteurs et voir la performance de chaque ressource telle qu'un point de terminaison web ou une requête de base de données appartenant au service.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="service page" >}}

<div class="alert alert-info">
Ne voyez-vous pas les points de terminaison HTTP que vous attendiez sur la page de service ? Dans APM, les points de terminaison sont connectés à un service par plus que le nom du service. C'est également fait avec le `span.name` du span de point d'entrée de la trace. Par exemple, sur le service de boutique en ligne ci-dessus, `web.request` est le span de point d'entrée. Plus d'informations sur ce <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">ici</a>.
</div>

## Ressources {#resources}

Les ressources représentent un domaine particulier d'une application client. Elles peuvent typiquement être un point de terminaison web instrumenté, une requête de base de données ou un travail en arrière-plan. Pour un service web, ces ressources peuvent être des points de terminaison web dynamiques regroupés par un nom de span statique - `web.request`. Dans un service de base de données, il s'agirait de requêtes de base de données avec le nom de span `db.query`. Par exemple, le `web-store` service dispose de ressources instrumentées automatiquement – des points de terminaison web – qui gèrent la finalisation des achats, la mise à jour des paniers, l'ajout d'articles, etc. Un nom de ressource peut être la méthode HTTP et la route HTTP, par exemple `GET /productpage` ou `ShoppingCartController#checkout`. 

Chaque ressource a sa propre [page de ressource][7] avec des [métriques de trace][15] spécifiques au point de terminaison. Les métriques de trace peuvent être utilisées comme n'importe quelle autre métrique Datadog - elles sont exportables vers un tableau de bord ou peuvent être utilisées pour créer des moniteurs. La page de ressource montre également le widget de résumé de span avec une vue agrégée des [spans][21] pour toutes les [traces](#trace), la distribution de latence des requêtes et les traces qui montrent les requêtes effectuées vers ce point de terminaison.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="page de ressource" >}}

## Trace {#trace}

Une trace est utilisée pour suivre le temps passé par une application à traiter une requête et l'état de cette requête. Chaque trace se compose d'un ou plusieurs spans. Au cours de la durée de la requête, vous pouvez voir des appels distribués à travers les services (car un [trace-id est injecté/extrait à travers les en-têtes HTTP][8]), [des bibliothèques instrumentées automatiquement][3] et [une instrumentation manuelle][9] utilisant des outils open-source comme [OpenTracing][10] dans la vue du flame graph. Dans la page de vue de trace, chaque trace collecte des informations qui la relient à d'autres parties de la plateforme, y compris [la connexion des journaux aux traces][11], [l'ajout de balises aux spans][12], et [la collecte de métriques d'exécution][13].

{{< img src="tracing/visualization/trace_view.png" alt="vue de trace" >}}

## Propagation du contexte de trace {#trace-context-propagation}

La propagation du contexte de trace est la méthode de transmission des identifiants de trace entre les services dans un système distribué. Elle permet à Datadog de relier des spans individuels provenant de différents services en une seule trace distribuée. La propagation du contexte de trace fonctionne en injectant des identifiants, tels que l'ID de trace et l'ID de span parent, dans les en-têtes HTTP au fur et à mesure que la requête circule dans le système. Le service en aval extrait ensuite ces identifiants et continue la trace. Cela permet à Datadog de reconstruire le chemin complet d'une requête à travers plusieurs services.

Pour plus d'informations, consultez la [propagation du contexte de trace][27] pour le langage de votre application.

## Filtres de rétention {#retention-filters}

[Définissez des filtres basés sur des tags][19] dans l'interface utilisateur pour indexer les spans pendant 15 jours pour une utilisation avec [Trace Search and Analytics][14].

## Contrôles d'ingestion {#ingestion-controls}

[Envoyez 100 % des traces][20] de vos services vers Datadog et combinez-les avec [des filtres de rétention basés sur des tags](#retention-filters) pour conserver les traces qui comptent pour votre entreprise pendant 15 jours.

## Instrumentation {#instrumentation}

L'instrumentation est le processus d'ajout de code à votre application pour capturer et rapporter des données d'observabilité à Datadog, telles que des traces, des métriques et des journaux. Datadog fournit des bibliothèques d'instrumentation pour divers langages de programmation et frameworks.

Vous pouvez instrumenter automatiquement votre application lorsque vous installez l'Agent Datadog avec [Single Step Instrumentation][24] ou lorsque vous [ajoutez manuellement les SDK Datadog][25] à votre code.

Vous pouvez utiliser une instrumentation personnalisée en intégrant du code de traçage directement dans le code de votre application. Cela vous permet de créer, modifier ou supprimer des traces de manière programmatique à envoyer à Datadog.

Pour en savoir plus, lisez [Application Instrumentation][26].

## Baggage {#baggage}

Le baggage permet de propager des paires clé-valeur (également appelées baggage items) à travers les frontières de service dans un système distribué. Contrairement au contexte de trace, qui se concentre sur les identifiants de trace, le baggage permet la transmission de données commerciales et d'autres informations contextuelles aux côtés des traces.  

Pour en savoir plus, lisez les [formats de propagation][28] pris en charge pour le langage de votre application.

## Lectures complémentaires {#further-reading}

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