---
aliases:
- /fr/tracing/getting_further/
- /fr/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: Guide
    rank: 50
    subcategory: APM Guides
description: Guides étape par étape pour débuter avec APM, tutoriels d'activation
  du traçage, guides de configuration et techniques avancées de traçage.
disable_toc: true
private: true
title: Guides de tracing
---
{{< whatsnext desc="Débuter avec APM" >}}
    {{< nextlink href="tracing/guide/alert_anomalies_p99_database" >}}1. Alerter sur les anomalies de latence p99 des services de base de données{{< /nextlink >}}
    {{< nextlink href="tracing/guide/week_over_week_p50_comparison" >}}2. Comparer la latence p50 d'une semaine à l'autre pour un service{{< /nextlink >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}3. Créer un Dashboard pour suivre et corréler les métriques APM{{< /nextlink >}}
    {{< nextlink href="tracing/guide/slowest_request_daily" >}}4. Déboguer la trace la plus lente sur l'endpoint le plus lent d'un service web{{< /nextlink >}}
    <a id="enabling-tracing-tutorials">
    {{< nextlink href="tracing/trace_collection/custom_instrumentation" >}}5. Ajouter des span tags, puis filtrer et regrouper les performances de votre application.{{< /nextlink >}}
    {{< nextlink href="tracing/guide/instrument_custom_method" >}}6. Instrumenter une méthode personnalisée pour obtenir une visibilité approfondie sur votre logique métier.{{< /nextlink >}}
{{< /whatsnext >}}

<br>

### Tutoriels : Activation du traçage {#tutorials-enabling-tracing}

Ces tutoriels vous guident dans la configuration d'un exemple d'application multi-services avec une instrumentation automatique et personnalisée/manuelle, et dans la configuration de la pile jusqu'à ce que vous voyiez des traces dans Datadog APM. Tous les tutoriels effectuent la même opération, mais avec des langages de programmation et des configurations d'infrastructure différents. Choisissez celui qui se rapproche le plus de votre environnement de développement et de déploiement pour apprendre les bases de l'utilisation d'APM.

{{< whatsnext desc="Choisissez votre langage et votre environnement :" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Activation du traçage sur une application Python sur le même host que Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true" >}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Activation du traçage sur une application Python et Datadog Agent dans Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true" >}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Activation du traçage pour une application Python dans un conteneur et Datadog Agent sur un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Activation du traçage sur une application Java sur le même host que Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Activation du traçage sur une application Java et Datadog Agent dans Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Activation du traçage pour une application Java dans un conteneur et Datadog Agent sur un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-gke-icon.png" inline="true">}} Activation du traçage pour une application Java sur GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-eks-icon.png" inline="true">}} Activation du traçage pour une application Java sur AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-ec2-icon.png" inline="true">}} Activation du traçage pour une application Java dans Amazon ECS avec EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-fargate-icon.png" inline="true">}} Activation du traçage pour une application Java dans Amazon ECS avec Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} Activation du traçage pour une application Java avec le contrôleur d'admission{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Activation du traçage sur une application Go sur le même host que Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Activation du traçage sur une application Go et Datadog Agent dans Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-ec2-icon.png" inline="true">}} Activation du traçage pour une application Go dans Amazon ECS avec EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-fargate-icon.png" inline="true">}} Activation du traçage pour une application Go dans Amazon ECS avec Fargate{{< /nextlink >}}

{{< /whatsnext >}}
<br>

{{< whatsnext desc="Intégrations APM en action" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Traçage des files d'attente Kafka{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}Tracer des scripts CLI PHP{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Configuration de l'échantillonnage d'ingestion" >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}Contrôler le volume d'ingestion des spans avec les mécanismes d'ingestion{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}Échantillonnage d'ingestion avec OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/ingestion_sampling_use_cases/" >}}Cas d'utilisation de l'échantillonnage d'ingestion{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/resource_based_sampling/" >}}Échantillonnage basé sur les ressources{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guides de configuration" >}}
    {{< nextlink href="/tracing/guide/remote_config" >}}Mise en place de Remote Configuration pour le traçage{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guides de tracing" >}}
    {{< nextlink href="/opentelemetry/guide/otel_api_tracing_interoperability/" >}}Interopérabilité des traces instrumentées par l'API OpenTelemetry et par Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}Configurer le score Apdex par service{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}Opérations primaires dans les services {{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}Ignorer les Health Checks et autres spans indésirables en excluant certaines ressources{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}Métriques basées sur DDSketch dans APM{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}Envoyer des traces à Datadog Agent via l'API de traçage{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}Formats valides des ID de span et de trace{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}Installer l'Agent de trace depuis les sources{{< /nextlink >}}
    {{< nextlink href="/extend/community/libraries/#apm-distributed-tracing-client-libraries" >}}Bibliothèques client de traçage{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}Définir les tags principaux pour le périmètre{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Décider quand utiliser Datadog APM et AWS X-Ray {{< /nextlink >}}
    {{< nextlink href="/tracing/guide/serverless_enable_azure_app_insights/" >}}Intégration Azure App Insights{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}Configurer APM en C++{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Comprendre la politique de rétention des traces Datadog{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/agent_tracer_hostnames" >}}Comprendre la différence entre le host de l'Agent et le host du traceur{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_kubernetes_service/" >}}Configuration d'APM avec le service Kubernetes{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/aws_payload_tagging/" >}}Capturer automatiquement les requêtes et réponses des services AWS{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/websocket_observability/" >}}Observabilité WebSocket{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/service_overrides/" >}}Remplacements de service{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/injectors/" >}}Comprendre le comportement de l'injecteur avec l'instrumentation en une étape{{< /nextlink >}}
    {{< nextlink href="/tracing/code_origin/" >}}Origine du code pour les spans{{< /nextlink >}}
{{< /whatsnext >}}