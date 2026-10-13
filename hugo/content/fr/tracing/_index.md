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
- link: https://www.datadoghq.com/architecture/observability-in-event-driven-architecture/
  tag: Architecture Center
  text: Observabilité dans les architectures pilotées par les événements
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centre d'apprentissage
  text: Démarrer avec les métriques et les traces APM
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour maîtriser la solution APM
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Générez des métriques basées sur les spans pour suivre les tendances historiques
    des performances des applications
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security d'APM
- link: https://www.datadoghq.com/blog/pubsub-cloud-run-tracing
  tag: Blog
  text: Tracez les charges de travail Google Pub/Sub dans Cloud Run avec Datadog
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: Blog
  text: Analyse de la latence aller-retour des requêtes
- link: https://www.datadoghq.com/blog/boomi-observability-opentelemetry-datadog/
  tag: Blog
  text: Instrumentez et surveillez les flux d'intégration Boomi avec OpenTelemetry
    et Datadog
- link: https://www.datadoghq.com/blog/dbm-supabase/
  tag: Blog
  text: Surveillez et optimisez les performances des requêtes Supabase avec Datadog
    Database Monitoring
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: Notes de version
  text: Découvrez les dernières versions de Datadog APM ! (Connexion à l'application
    requise)
title: APM
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>


{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=APM">}}
  Rejoignez une session d'initiation ou de niveau intermédiaire pour en savoir plus sur la manière dont Datadog Application Performance Monitoring (APM) fournit un traçage distribué au niveau du code, optimisé par l'IA, depuis les applications de navigateur et mobiles jusqu'aux services backend et aux bases de données.
{{< /learning-center-callout >}}

## Présentation {#overview}

Datadog Application Performance Monitoring (APM) vous permet d'analyser vos applications en détail, et ainsi d'identifier les goulets d'étranglement, de résoudre les problèmes et d'optimiser vos services. Grâce au traçage distribué, aux tableaux de bord prêts à l'emploi et à la corrélation transparente avec d'autres données de télémétrie, Datadog APM contribue à garantir les meilleures performances et la meilleure expérience utilisateur possibles pour vos applications.

Pour découvrir la terminologie en lien avec la solution Datadog APM, consultez la section [Termes et concepts d'APM][1].

## Mise en route {#getting-started}

Le moyen le plus simple de commencer avec Datadog APM est d'utiliser l'instrumentation en une seule étape (Single Step Instrumentation). Cette approche installe Datadog Agent et instrumente votre application en une seule étape, sans aucune étape de configuration supplémentaire requise. Pour en savoir plus, lisez [Instrumentation en une seule étape][27].

Pour les configurations nécessitant plus de personnalisation, Datadog prend en charge l'instrumentation personnalisée avec les SDK Datadog et [Dynamic Instrumentation][30] dans l'interface utilisateur Datadog. Pour en savoir plus, lisez [Application Instrumentation][2].

<div class="alert alert-info">Si vous débutez avec Datadog APM, lisez <a href="https://docs.datadoghq.com/getting_started/tracing/">Getting Started with APM</a> pour apprendre à envoyer votre première trace à Datadog.</div>

## Cas d'utilisation {#use-cases}

Découvrez comment la solution Datadog APM peut vous permettre de répondre à vos cas d'utilisation :

| Vous souhaitez...| Comment Datadog APM peut vous aider |
| ----------- | ----------- |
| Comprenez comment les requêtes circulent dans votre système. | Utilisez le [Trace Explorer][21] pour interroger et visualiser les traces de bout en bout à travers les services distribués. |
| Surveillez l'état de santé et les performances des services individuels. | Utilisez les [pages de service][26] et les [pages de ressources][28] pour évaluer l'état de santé des services en analysant les métriques de performance, en suivant les déploiements et en identifiant les ressources problématiques. |
| Corrélez les traces avec DBM, RUM, les logs, les tests Synthetic et les profils. | [Corrélez les données APM avec d'autres données de télémétrie][20] pour donner du contexte à vos données et obtenir une analyse plus complète. |
| Contrôlez la manière dont les données circulent dans Datadog. | Utilisez les [contrôles d'ingestion][6] pour ajuster la configuration de l'ingestion et les taux d'échantillonnage par service et par ressource. Utilisez les [filtres de rétention][7] pour choisir les spans à conserver pendant 15 jours. |

### Trace Explorer{#trace-explorer}

[Trace Explorer][21] vous permet de rechercher et d'analyser vos traces en temps réel. Identifiez les goulots d'étranglement de performance, dépannez les erreurs et pivotez vers les logs et métriques associés pour comprendre le contexte complet de tout problème.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Vue de Trace Explorer." style="width:100%;" >}}

### Page de service {#service-page}

La [page des services][26] vous aide à surveiller les performances de vos services et [comparer les versions lors des déploiements][15].

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions sur la page de service" style="width:100%;">}}

### Corrélation des traces avec d'autres données de télémétrie {#correlating-traces-with-other-telemetry}

La solution Datadog APM s'intègre parfaitement aux logs, à la surveillance des utilisateurs réels (RUM), au Synthetic Monitoring, entre autres :

- [Affichez vos logs d'application côte à côte avec les traces][9] pour trouver les logs correspondant à des requêtes, services ou versions spécifiques.
- [Associez les sessions RUM aux traces backend][10] pour comprendre comment les performances backend affectent l'expérience utilisateur.
- [Associez les tests Synthetic aux traces][11] pour dépanner les échecs sur l'ensemble des requêtes frontend et backend.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connectez les logs et les traces" style="width:100%;">}}

### Contrôles d'ingestion et filtres de rétention {#ingestion-controls-and-retention-filters}

Les traces démarrent dans vos applications instrumentées et circulent dans Datadog.

Datadog APM fournit des outils pour gérer le volume et la rétention de vos données de trace. Utilisez les [contrôles d'ingestion][6] pour ajuster les taux d'échantillonnage et les [filtres de rétention][7] pour contrôler les spans qui sont stockés.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Flux de données via Datadog APM." style="width:100%;" >}}

## Dépannage {#troubleshooting}

En cas de problème, vous pouvez consulter le guide [Dépannage d'APM][29].

## Pour aller plus loin {#further-reading}

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