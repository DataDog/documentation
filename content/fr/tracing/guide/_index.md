---
aliases:
- /fr/tracing/getting_further/
- /fr/tracing/guide/ecommerce_and_retail_use_cases/
disable_toc: true
kind: guide
private: true
aliases:
  - /fr/tracing/getting_further/
cascade:
    algolia:
        rank: 20
        category: Guide
        subcategory: Guides de tracing
title: Guides de tracing
---


{{< whatsnext desc="Débuter avec APM" >}}
    {{< nextlink href="tracing/guide/alert_anomalies_p99_database" >}}1. Être alerté en cas de latence au 99e centile anormale pour un service de base de données{{< /nextlink >}}
    {{< nextlink href="tracing/guide/week_over_week_p50_comparison" >}}2. Comparer la latence au 50e centile d'un service avec celle de la semaine précédente{{< /nextlink >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}3. Créer un dashboard pour suivre et corréler les métriques APM{{< /nextlink >}}
    {{< nextlink href="tracing/guide/slowest_request_daily" >}}4. Débuguer la trace la plus lente sur l'endpoint le plus lent d'un service Web{{< /nextlink >}}
    <a id="enabling-tracing-tutorials">
    {{< nextlink href="tracing/guide/add_span_md_and_graph_it" >}}5. Ajouter des tags de span et filtrer ou regrouper les données de performance de votre application{{< /nextlink >}}
    {{< nextlink href="tracing/guide/instrument_custom_method" >}}6. Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle{{< /nextlink >}}
{{< /whatsnext >}}

<br>
{{< whatsnext desc="Tutorials: Enabling Tracing" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}Activer le tracing sur une application Python installée sur le même host que l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}Activer le tracing sur une application Python lorsque l'application et l'Agent Datadog sont installés dans un conteneur{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}Activer le tracing sur une application Python lorsque l'application est installée dans un conteneur et que l'Agent est installé sur un host{{< /nextlink >}}
{{< /whatsnext >}}
<br>


{{< whatsnext desc="Les intégrations APM en action" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Tracer des fils d'attente Kafka{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}Tracer des scripts CLI PHP{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guides de tracing" >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}Configurer un score Apdex par service{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}Opérations primaires dans les services {{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}Ignorer les checks de santé et d'autres spans non désirées en ignorant des ressources{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}Métriques basées sur DDSketch dans APM{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}Envoyer des traces à l'Agent via l'API de tracing{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}Formats valides des ID de trace et de span{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}Installer l'Agent de trace depuis les sources{{< /nextlink >}}
    {{< nextlink href="/developers/community/libraries/#apm-distributed-tracing-client-libraries" >}}Bibliothèques client de tracing{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}Configurer les tags primaires{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Choisir entre Datadog APM et AWS X-Ray {{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}Configurer APM avec C++{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}Contrôler le volume d'ingestion de traces avec les mécanismes d'ingestion{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}Échantillonner les traces ingérées avec OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}