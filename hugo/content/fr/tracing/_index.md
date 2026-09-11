---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
  - trace
  - tracing
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
  text: Découvrez les dernières versions de Datadog APM ! (Connexion à l'application
    requise)
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centre d'apprentissage
  text: Commencer avec les métriques et les traces APM
- link: https://www.datadoghq.com/blog/monitor-rust-otel/
  tag: Blog
  text: Comment surveiller vos applications Rust avec OpenTelemetry
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Générez des métriques basées sur les spans pour suivre les tendances historiques
    de la performance des applications.
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security d'APM
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Surveillez vos applications web Linux sur Azure App Service avec Datadog.
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Gérez la performance, la sécurité et la propriété des API avec Datadog API
    Catalog.
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: Blog
  text: Améliorez l'expérience des développeurs et la collaboration grâce à Software
    Catalog.
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Apportez une observabilité haute performance aux environnements Kubernetes
    sécurisés avec Datadog's CSI driver.
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour maîtriser la solution APM
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Résolvez les problèmes plus rapidement avec l'intégration du code source GitLab
    dans Datadog.
- link: https://www.datadoghq.com/blog/pubsub-cloud-run-tracing
  tag: Blog
  text: Tracez les charges de travail Google Pub/Sub dans Cloud Run avec Datadog.
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: Blog
  text: Analyse de la latence des requêtes aller-retour
title: APM
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>


{{< learning-center-callout header="Participez à une session de webinaire de formation." hide_image="true" btn_title="Inscrivez-vous." btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=APM">}}
  Participez à une session de formation d’introduction ou intermédiaire pour découvrir comment Datadog APM propose un traçage distribué au niveau du code, alimenté par l’IA, depuis les applications web et mobiles jusqu’aux services backend et aux bases de données.
{{< /learning-center-callout >}}

## Aperçu {#overview}

La solution Application Performance Monitoring (APM) de Datadog vous permet dʼanalyser vos applications en détail, et ainsi d'identifier les goulets d'étranglement, de résoudre les problèmes et d'optimiser vos services. Avec le traçage distribué, des tableaux de bord prêts à l'emploi et une corrélation transparente avec d'autres données de télémétrie, Datadog APM aide à garantir la meilleure performance et expérience utilisateur possible pour vos applications.

Pour découvrir la terminologie en lien avec la solution APM Datadog, consultez la section [Termes et concepts d'APM][1].

## Commencer {#getting-started}

La manière la plus simple de démarrer avec Datadog APM consiste à utiliser Single Step Instrumentation. Cette approche installe l'Agent Datadog et instrumente votre application en une seule étape, sans étapes de configuration supplémentaires requises. Pour en savoir plus, lisez [Single Step Instrumentation][27].

Pour les configurations nécessitant davantage de personnalisation, Datadog prend en charge l'instrumentation personnalisée avec les Datadog SDKs et [Dynamic Instrumentation][30] dans l'interface utilisateur de Datadog. Pour en savoir plus, lisez [Application Instrumentation][2].

<div class="alert alert-info">Si vous êtes nouveau dans Datadog APM, lisez <a href="https://docs.datadoghq.com/getting_started/tracing/">Getting Started with APM</a> pour apprendre à envoyer votre première trace à Datadog.</div>

## Cas d'utilisation {#use-cases}

Découvrez comment la solution APM de Datadog peut vous permettre de répondre à vos cas d'utilisation :

| Vous souhaitez...| Comment Datadog APM peut aider |
| ----------- | ----------- |
| Comprendre comment les requêtes circulent dans votre système. | Utilisez le [Trace Explorer][21] pour interroger et visualiser les traces de bout en bout à travers des services distribués. |
| Surveillez la santé et la performance des services individuels. | Utilisez les [pages de service][26] et [pages de ressources][28] pour évaluer la santé des services en analysant les métriques de performance, en suivant les déploiements et en identifiant les ressources problématiques. |
| Corrélez les traces avec DBM, RUM, les journaux, les synthétiques et les profils. | Corrélation des traces avec d'autres données de télémétrie |
| Contrôlez comment les données entrent dans Datadog. | Utilisez les [Contrôles d'Ingestion][6] pour ajuster la configuration d'ingestion et les taux d'échantillonnage par service et ressource. Utilisez les [Filtres de rétention][7] pour choisir quelles spans conserver pendant 15 jours. |

### Trace Explorer {#trace-explorer}

Le [Trace Explorer][21] vous permet de rechercher et d'analyser vos traces en temps réel. Identifiez les goulets d'étranglement de performance, dépannez les erreurs et passez aux journaux et métriques connexes pour comprendre le contexte complet autour de tout problème.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Vue de l'explorateur de traces." style="width:100%;" >}}

### Page de service {#service-page}

La [page des services][26] vous aide à surveiller les performances de vos services et [comparer les versions lors des déploiements][15].

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions sur la page de service" style="width:100%;">}}

### Corréler les traces avec d'autres télémetries {#correlating-traces-with-other-telemetry}

La solution APM de Datadog s'intègre parfaitement aux logs, à la surveillance des utilisateurs réels (RUM), à la surveillance Synthetic, entre autres :

- [Affichez vos journaux d'application côte à côte avec les traces][9] pour trouver des journaux pour des requêtes, services ou versions spécifiques.
- [Associez les sessions RUM avec les traces backend][10] pour comprendre comment la performance backend affecte l'expérience utilisateur.
- [Associez les tests synthétiques avec les traces][11] pour résoudre les échecs à travers les requêtes frontend et backend.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connectez les journaux et les traces." style="width:100%;">}}

### Contrôles d'ingestion et filtres de rétention {#ingestion-controls-and-retention-filters}

Les traces démarrent dans vos applications instrumentées et circulent dans Datadog.

Datadog APM fournit des outils pour gérer le volume et la rétention de vos données de trace. Utilisez [Contrôles d'ingestion][6] pour ajuster les taux d'échantillonnage et [filtres de rétention][7] pour contrôler quelles spans sont stockées.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Flux de données à travers Datadog APM." style="width:100%;" >}}

## Dépannage {#troubleshooting}

En cas de problème, vous pouvez consulter le guide [Dépannage d'APM][29].

## Lectures complémentaires {#further-reading}

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
[10]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm
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
[29]: /fr/tracing/troubleshooting/
[30]: /fr/tracing/dynamic_instrumentation/