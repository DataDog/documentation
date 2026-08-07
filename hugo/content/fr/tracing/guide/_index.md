---
aliases:
- /fr/tracing/getting_further/
- /fr/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: Guide
    rank: 50
    subcategory: Guides APM
disable_toc: true

private: true
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

### Tutoriels : activation du tracing

Ces tutoriels vous expliquent comment configurer un exemple d'application dotée de plusieurs services à l'aide de l'instrumentation automatique et manuelle/personnalisée. Vous découvrirez également comment configurer la pile afin de faire apparaître des traces avec la solution APM Datadog. Ces tutoriels accomplissent tous la même chose, mais pour différents langages et différentes configurations d'infrastructure. Choisissez le tutoriel qui correspond le mieux à votre environnement de développement et de déploiement afin d'apprendre les principes fondamentaux d'APM.

{{< whatsnext desc="Choisissez le tutoriel correspondant à votre langage et votre environnement :" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Python sur le même host que l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" />Activer le tracing d'une application Python et de l'Agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Python dans un conteneur et d'un Agent sur un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Java sur le même host que l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" />Activer le tracing d'une application Java et de l'Agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Java dans un conteneur et d'un Agent sur un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" />Activer le tracing d'une application Java dans GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" />Activer le tracing d'une application Java dans AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" />Activer le tracing d'une application Java dans AWS ECS avec EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" />Activer le tracing d'une application Java dans AWS ECS avec Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" />Activer le tracing d'une application Java avec le contrôleur d'admission{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" />Activer le tracing d'une application Go sur le même host que l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" />Activer le tracing d'une application Go  et de l'Agent Datadog dans des conteneurs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" />Activer le tracing d'une application Go dans AWS ECS avec EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" />Activer le tracing d'une application Go dans AWS ECS avec Fargate{{< /nextlink >}}

{{< /whatsnext >}}
<br>

{{< whatsnext desc="Les intégrations APM en action" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Tracer des fils d'attente Kafka{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}Tracer des scripts CLI PHP{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Configuration de l'échantillonnage de l'ingestion" >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}Contrôler le volume d'ingestion de spans avec les mécanismes d'ingestion{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}Échantillonnage de l'ingestion avec OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/ingestion_sampling_use_cases/" >}}Scénarios d'utilisation de l'échantillonnage de l'ingestion{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guides sur le tracing" >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}Configurer un score Apdex par service{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}Opérations primaires dans les services{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}Ignorer des ressources pour ne pas tenir compte de checks de santé et d'autres spans inutiles{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}Métriques basées sur DDSketch dans APM{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}Envoyer des traces à l'Agent via l'API de tracing{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}Formats des ID de trace et de span{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}Installer l'Agent de trace depuis les sources{{< /nextlink >}}
    {{< nextlink href="/developers/community/libraries/#apm-distributed-tracing-client-libraries" >}}Bibliothèques client pour le tracing{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}Configurer les tags primaires{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Choisir quand utiliser la solution APM Datadog et AWS X-Ray{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}Configurer APM en C++{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Maîtriser la logique de la stratégie de rétention des traces Datadog{{< /nextlink >}}
{{< /whatsnext >}}