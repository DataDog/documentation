---
aliases:
- /fr/tracing/terminology/
- /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /fr/tracing/visualization/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing d'APM avec votre application
- link: /tracing/software_catalog/
  tag: Documentation
  text: Découvrir et cataloguer les services transmettant des données à Datadog
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
  text: En savoir plus sur les moniteurs APM
title: Termes et concepts d'APM
---

{{< jqmath-vanilla >}}

## Présentation

L'interface de l'APM fournit de nombreux outils permettant de surveiller les performances de vos applications et de les mettre en corrélation avec les données des autres solutions Datadog. Vous pouvez ainsi identifier et résoudre plus facilement les problèmes liés aux systèmes distribués.

Pour consulter les définitions et descriptions des termes clés d'APM comme _spans_ et _indexed_, consultez le [glossaire principal][22]. 

| Concept                         | Rôle                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Les services sont les composants d'une architecture de microservices moderne. Un service regroupe généralement des endpoints, des requêtes ou des tâches qui assurent le bon fonctionnement de votre application.                                  |
| [Ressource](#ressources)          | Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan.                                                              |
| [Monitors][23]                   | Les monitors de métrique d'APM fonctionnent comme les monitors de métrique, mais proposent des commandes spécialement conçues pour l'APM. Utilisez ces monitors pour recevoir des alertes propres à chaque service concernant les hits, les erreurs et diverses mesures de latence. |
| [Trace](#trace)                 | Les traces servent à suivre le temps passé par une application à traiter une requête, ainsi que le statut de la requête. Chaque trace est composée d'une ou de plusieurs spans.                                                             |
| [Propagation du contexte de trace](#propagation-du-contexte-de-trace)| Méthode de transmission des identifiants de trace entre services, permettant à Datadog d'assembler les spans individuelles en une trace distribuée complète. |
| [Filtres de rétention](#filtres-de-retention) | Les filtres de rétention sont des règles basées sur des tags définies au sein de l'interface utilisateur de Datadog. Elles déterminent les spans à indexer dans Datadog pendant 15 jours.                                                                                              |
| [Paramètres d'ingestion](#parametres-d-ingestion) | Les paramètres d'ingestion permettent d'envoyer jusqu'à 100 % des traces à Datadog pour effectuer des recherches et des analyses en temps réel pendant 15 minutes.
| [Instrumentation](#instrumentation) | L'instrumentation est le processus qui consiste à ajouter du code à votre application afin de collecter et remonter des données d'observabilité. |
| [Bagage](#bagage) | Le bagage est une information contextuelle transmise entre les traces, les métriques et les logs sous forme de paires clé-valeur. |

## Services

Une fois [votre application instrumentée][3], le [Software Catalog][4] devient votre point d'entrée principal pour les données APM.

{{< img src="tracing/visualization/software_catalog.png" alt="Software Catalog" >}}

Les services sont les composants d'une architecture de microservices moderne. Un service regroupe généralement des endpoints, des requêtes ou des tâches qui procèdent au scaling de vos instances. Par exemple :

* Un groupe d'endpoints d'URL formant un service d'API.
* Un groupe de requêtes de base de données formant un service de base de données.
* Un groupe de tâches périodiques configurées dans le service crond.

La capture d'écran ci-dessous montre un système distribué à base de microservices pour un développeur de sites de e-commerce. On observe un `web-store`, un `ad-server`, un `payment-db` et un `auth-service`, tous représentés en tant que services dans l'APM.

{{< img src="tracing/visualization/service_map.png" alt="service map" >}}

Tous les services sont répertoriés dans le [Software Catalog][4] et représentés visuellement sur la [Service Map][5]. Chaque service dispose de sa propre [page de service][6], où vous pouvez consulter et analyser des [métriques de trace](#metriques-de-trace) telles que le débit, la latence et le taux d'erreurs. Utilisez ces métriques pour créer des widgets de tableau de bord, configurer des monitors et visualiser les performances de chaque ressource, comme un endpoint web ou une requête de base de données associée au service.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="page service" >}}

<div class="alert alert-info">
Vous ne voyez pas les endpoints HTTP attendus sur la page du service ? Dans la solution APM, les endpoints sont rattachés à un service non seulement par le nom du service, mais aussi via le `span.name` de la span d’entrée de la trace. Par exemple, pour le service web-store ci-dessus, `web.request` est la span d’entrée. Plus d'infos à ce sujet <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">ici</a>. </div>

## Ressources

Les ressources représentent un domaine particulier d'une application client. Il s'agit généralement d'un endpoint web instrumenté, d'une requête de base de données ou d'une tâche en arrière-plan. Pour un service Web, ces ressources peuvent être des endpoints web dynamiques regroupés sous un nom de span tel que `web.request`. Pour un service de base de données, il peut s'agir de requêtes de base de données portant le nom de span `db.query`. Par exemple, le service `web-store` possède des ressources automatiquement instrumentées (endpoints web) qui gèrent les paiements, les mises à jour de panier, les ajouts d'articles, etc. Le nom d'une ressource peut correspondre à la méthode ou route HTTP, par exemple `GET /productpage` ou `ShoppingCartController#checkout`. 

Chaque ressource possède sa propre [page de ressource][7] avec des [métriques de trace][15] ciblées sur l'endpoint concerné. Les métriques de trace peuvent être utilisées comme n'importe quelle autre métrique Datadog : elles sont exportables vers un tableau de bord ou peuvent servir à créer des monitors. La page des ressources affiche également le widget de résumé de span avec une vue agrégée des [spans][21] pour toutes les [traces](#trace), la distribution de la latence des requêtes, et les traces correspondant aux requêtes adressées à cet endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="page ressource" >}}

## Trace

Les traces servent à suivre le temps passé par une application à traiter une requête, ainsi que le statut de la requête en question. Chaque trace est composée d'une ou de plusieurs spans. Durant le cycle de vie de la requête, il est possible de visualiser les appels distribués au sein de vos services (grâce à [l'injection/l'extraction d'un ID de trace via les en-têtes HTTP][8]), de vos [bibliothèques instrumentées automatiquement][3] et de vos [instrumentations manuelles][9] à l'aide d'outils open source, tels que [OpenTracing][10], sous forme de flamegraph. La page Trace View présente des informations sur une trace issues d'autres solutions de la plateforme, notamment les données provenant de l'[association de vos logs à vos traces][11], de l'[ajout de tags à des spans][12] et de la [collecte de métriques runtime][13].

{{< img src="tracing/visualization/trace_view.png" alt="vue trace" >}}

## Propagation du contexte de trace

La propagation du contexte de trace est la méthode qui permet de transmettre les identifiants de trace entre les services dans un système distribué. Elle permet à Datadog d'assembler les spans individuelles provenant de différents services en une trace distribuée unique. La propagation du contexte de trace fonctionne en injectant des identifiants, tels que l'ID de trace et l'ID de la span parente, dans les en-têtes HTTP à mesure que la requête circule dans le système. Le service en aval extrait ensuite ces identifiants et poursuit la trace. Cela permet à Datadog de reconstruire le chemin complet d'une requête à travers plusieurs services.

Pour en savoir plus, consultez [la documentation sur la propagation du contexte de trace][27] pour le langage de votre application.

## Filtres de rétention

[Configurez des filtres basés sur des tags][19] dans l'interface pour indexer les spans pendant 15 jours en vue de leur utilisation avec la fonctionnalité d'[analyse et de recherche de traces][14].

## Paramètres d'ingestion

[Envoyez toutes les traces][20] de vos services à Datadog et tirez parti des [filtres de rétention basés sur des tags](#filtres-de-retention) afin de conserver uniquement les traces qui intéressent votre entreprise pendant 15 jours.

## Instrumentation

L'instrumentation consiste à ajouter du code à votre application pour capturer et envoyer à Datadog des données d'observabilité, telles que des traces, des métriques et des logs. Datadog fournit des bibliothèques d'instrumentation pour différents langages de programmation et frameworks.

Vous pouvez instrumenter automatiquement votre application en installant l'Agent Datadog avec [l'instrumentation en une seule étape][24] ou en [ajoutant manuellement les bibliothèques de tracing Datadog][25] à votre code.

Vous pouvez également utiliser une instrumentation personnalisée en intégrant directement du code de tracing dans votre application. Cela vous permet de créer, modifier ou supprimer des traces par programmation avant de les envoyer à Datadog.

Pour en savoir plus, consultez la page [Instrumentation de l'application][26].

## Bagage

Le bagage permet de propager des paires clé-valeur (également appelées éléments de bagage) entre les services d'un système distribué. Contrairement au contexte de trace, qui se concentre sur les identifiants de trace, le bagage permet la transmission de données métier et d'autres informations contextuelles en parallèle des traces.  

Pour en savoir plus, consultez les [formats de propagation pris en charge][28] pour le langage de votre application.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/developers/guide/data-collection-resolution/
[3]: /fr/tracing/setup/
[4]: /fr/tracing/software_catalog/
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