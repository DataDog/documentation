---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
aliases:
- /fr/tracing/faq/terminology
- /fr/tracing/guide/terminology
- /fr/tracing/guide/distributed_tracing/
- /fr/tracing/advanced/
- /fr/tracing/api
- /fr/tracing/faq/distributed-tracing/
cascade:
  algolia:
    rank: 70
description: Instrumenter votre code pour améliorer ses performances
further_reading:
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: Notes de version
  text: Découvrez les dernières versions de la solution APM Datadog (connexion à l'application
    requise)
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Générer des métriques basées sur des spans pour suivre les tendances historiques
    relatives aux performances des applications
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security d'APM
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Surveiller vos applications Web Linux sur Azure App Service avec Datadog
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Gérez les performances, la sécurité et la propriété des API avec le catalogue
    des API de Datadog
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour maîtriser la solution APM
kind: documentation
title: APM
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>

## Présentation

La solution Application Performance Monitoring (APM) de Datadog vous permet dʼanalyser vos applications en détail, et ainsi d'identifier les goulets d'étranglement, de résoudre les problèmes et d'optimiser vos services. Grâce au tracing distribué, à des dashboards prêts à l'emploi et à la corrélation fluide avec d'autres données de télémétrie, la solution APM de Datadog vous permet de garantir les meilleures performances et la meilleure expérience utilisateur pour vos applications.

Pour découvrir la terminologie en lien avec la solution APM Datadog, consultez la section [Termes et concepts d'APM][1].

## Prise en main

Afin de bien débuter avec la solution APM de Datadog, essayez l'instrumentation en une seule étape. Cette approche consiste à installer l'Agent Datadog et à instrumenter votre application en une seule étape, sans aucune autre étape de configuration. Pour en savoir plus, référez-vous à la section relative à [l'instrumentation en une seule étape][27].

Afin de s'adapter aux configurations qui nécessitent davantage de personnalisation, Datadog prend en charge l'instrumentation personnalisée avec les bibliothèques de tracing de Datadog. Pour en savoir plus, référez-vous à la section relative à [l'instrumentation d'application][2].

## Cas d'utilisation

Découvrez comment la solution APM de Datadog peut vous permettre de répondre à vos cas d'utilisation :

| Vous voulez...| Ce que la solution APM de Datadog peut faire pour vous aider |
| ----------- | ----------- |
| Comprenez comment les requêtes circulent dans votre système. | Utilisez le [Trace Explorer][21] pour interroger et visualiser les traces de bout en bout dans les services distribués. |
| Surveillez la santé et les performances de chacun de vos services. | Référez-vous aux pages relatives aux [services][26] et aux [ressources][28] pour évaluer l'état de santé de vos services en analysant les métriques de performances, en suivant les déploiements et en identifiant les ressources problématiques. |
| Corréler des traces avec DBM, RUM, les logs, synthetics et les profils. | [Corrélez les données de l'APM avec d'autres données télémétriques][20] pour donner un contexte à vos données en vue d'une analyse plus complète. |
| Contrôlez la façon dont les données circulent dans Datadog. | Utilisez les [paramètres d'ingestion][6] pour régler la configuration et les taux d'échantillonnage de l'ingestion par service et par ressource. Utilisez les [filtres de rétention][7] pour choisir les spans à conserver pendant 15 jours. |

### Trace Explorer

Le [Trace Explorer][21] vous permet de rechercher et d'analyser votre traces en temps réel. Identifiez les goulets d'étranglement en matière de performances, résolvez les erreurs et consultez les logs et les métriques pour comprendre le contexte complet d'un problème.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Vue du Trace explorer." style="width:100%;" >}}

### Page Service

La [page des services][26] vous aide à surveiller les performances de vos services et [comparer les versions lors des déploiements][15].

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions sur la page Service" style="width:100%;">}}

### Corréler des traces avec dʼautres données de télémétrie

La solution APM de Datadog s'intègre parfaitement aux logs, à la surveillance des utilisateurs réels (RUM), à la surveillance Synthetic, entre autres :

- [Visualisez les logs de votre application côte à côte avec des traces][9] pour retrouver des logs correspondant à des requêtes, des services ou des versions spécifiques.
- [Associer les sessions RUM aux traces du backend][10] pour comprendre comment les performances du backend affectent l'expérience de l'utilisateur.
- [Associez les tests Synthetic à des traces][11] pour résoudre les problèmes liés aux requêtes du frontend et du backend.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Associer vos logs à vos traces" style="width:100%;">}}

### Paramètres d'ingestion et filtres de rétention

Les traces démarrent dans vos applications instrumentées et circulent dans Datadog.

La solution APM de Datadog fournit des outils pour gérer le volume et la conservation des données de vos traces. Utilisez les [paramètres d'ingestion][6] pour ajuster les taux d'échantillonnage et les [filtres de rétention][7] afin de contrôler les spans qui sont stockées.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Flux de données dans la solution APM de Datadog." style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/
[2]: /fr/tracing/trace_collection/
[3]: /fr/tracing/trace_collection/proxy_setup/
[4]: /fr/serverless/distributed_tracing
[5]: /fr/tracing/trace_collection/otel_instrumentation/
[6]: /fr/tracing/trace_pipeline/ingestion_controls/
[7]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /fr/tracing/trace_pipeline/generate_metrics/
[9]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[10]: /fr/real_user_monitoring/platform/connect_rum_and_traces
[11]: /fr/synthetics/apm/
[12]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[13]: /fr/tracing/services/services_map/
[14]: /fr/tracing/services/service_page/
[15]: /fr/tracing/services/deployment_tracking/
[16]: /fr/profiler/
[17]: /fr/tracing/trace_collection/automatic_instrumentation/
[18]: /fr/tracing/trace_collection/custom_instrumentation/
[19]: /fr/tracing/metrics/
[20]: /fr/tracing/other_telemetry/
[21]: /fr/tracing/trace_explorer/
[22]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[23]: /fr/agent/
[24]: /fr/tracing/metrics/metrics_namespace/
[25]: /fr/tracing/metrics/runtime_metrics/
[26]: /fr/tracing/services/service_page/
[27]: /fr/tracing/trace_collection/single-step-apm/
[28]: /fr/tracing/services/resource_page/