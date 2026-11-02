---
aliases:
- /es/tracing/getting_further/
- /es/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: Guide
    rank: 50
    subcategory: APM Guides
description: Guías paso a paso para comenzar con APM, tutoriales para habilitar la
  traza, guías de configuración y técnicas avanzadas de traza.
disable_toc: true
private: true
title: Guías de traza
---
{{< whatsnext desc="Primeros pasos con APM" >}}
    {{< nextlink href="tracing/guide/alert_anomalies_p99_database" >}}1. Alertar sobre anomalías en la latencia p99 de los servicios de base de datos{{< /nextlink >}}
    {{< nextlink href="tracing/guide/week_over_week_p50_comparison" >}}2. Comparar la latencia p50 semana tras semana para un servicio{{< /nextlink >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}3. Crear un Dashboard para realizar un seguimiento y correlacionar métricas de APM{{< /nextlink >}}
    {{< nextlink href="tracing/guide/slowest_request_daily" >}}4. Depurar la traza más lenta en el punto de conexión más lento de un servicio web{{< /nextlink >}}
    <a id="enabling-tracing-tutorials">
    {{< nextlink href="tracing/trace_collection/custom_instrumentation" >}}5. Agregar etiquetas de tramo y filtrar y agrupar el rendimiento de su aplicación{{< /nextlink >}}
    {{< nextlink href="tracing/guide/instrument_custom_method" >}}6. Instrumentar un método personalizado para obtener una visibilidad profunda de su lógica de negocio.{{< /nextlink >}}
{{< /whatsnext >}}

<br>

### Tutoriales: Habilitación de la traza {#tutorials-enabling-tracing}

Estos tutoriales lo guían a través de la configuración de una aplicación de muestra de múltiples servicios con instrumentación automática y personalizada/manual, y la configuración de la pila hasta que vea trazas en Datadog APM. Todos los tutoriales hacen lo mismo, pero con diferentes lenguajes de programación y configuraciones de infraestructura. Elija el que más se parezca a su entorno de desarrollo y despliegue para aprender los conceptos básicos para comenzar con APM.

{{< whatsnext desc="Elija su lenguaje y entorno:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitación de la traza en una aplicación Python en el mismo servidor que el Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true" >}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Habilitación de la traza en una aplicación Python y Datadog Agent en containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true" >}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitación de la traza para una aplicación Python en un contenedor y un Agent en un servidor{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitación de la traza en una aplicación Java en el mismo servidor que el Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Habilitación de la traza en una aplicación Java y Datadog Agent en containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitación de la traza para una aplicación Java en un contenedor y un Agent en un servidor{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-gke-icon.png" inline="true">}} Habilitación de la traza para una aplicación Java en GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-eks-icon.png" inline="true">}} Habilitación de la traza para una aplicación Java en AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-ec2-icon.png" inline="true">}} Habilitación de la traza para una aplicación Java en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-fargate-icon.png" inline="true">}} Habilitación de la traza para una aplicación Java en Amazon ECS con Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} Habilitación de la traza para una aplicación Java con el controlador de admisión{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitación de la traza en una aplicación Go en el mismo servidor que Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Habilitación de la traza en una aplicación Go y Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-ec2-icon.png" inline="true">}} Habilitación de la traza para una aplicación Go en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-fargate-icon.png" inline="true">}} Habilitación de la traza para una aplicación Go en Amazon ECS con Fargate{{< /nextlink >}}

{{< /whatsnext >}}
<br>

{{< whatsnext desc="Integrations de APM en acción" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Trazado de colas de Kafka{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}Rastreo de scripts PHP CLI{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Configuración de muestreo de ingesta" >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}Controlar el volumen de ingesta de tramos con mecanismos de ingesta{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}Muestreo de ingesta con OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/ingestion_sampling_use_cases/" >}}Casos de uso de muestreo de ingesta{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/resource_based_sampling/" >}}Muestreo basado en recursos{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guías de configuración" >}}
    {{< nextlink href="/tracing/guide/remote_config" >}}Configuración de Remote Configuration para la traza{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guías de traza" >}}
    {{< nextlink href="/opentelemetry/guide/otel_api_tracing_interoperability/" >}}Interoperabilidad de la API de OpenTelemetry y trazas instrumentadas por Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}Configurar la puntuación Apdex por servicio{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}Operaciones principales en servicios {{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}Descartar comprobaciones de estado y otros tramos no deseados ignorando recursos{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}Métricas basadas en DDSketch en APM{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}Enviar trazas al Agent mediante la API de traza{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}Formatos válidos de IDs de tramo y traza{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}Instalar el Agent de traza desde el código fuente{{< /nextlink >}}
    {{< nextlink href="/extend/community/libraries/#apm-distributed-tracing-client-libraries" >}}Bibliotecas de cliente de traza{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}Configurar etiquetas principales para el contexto{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Decidir cuándo usar Datadog APM y AWS X-Ray {{< /nextlink >}}
    {{< nextlink href="/tracing/guide/serverless_enable_azure_app_insights/" >}}Integración con Azure App Insights{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}Configurar APM con C++{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Comprender la política de retención de trazas de Datadog{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/agent_tracer_hostnames" >}}Comprender la diferencia entre el servidor del Agent y el servidor del trazador{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_kubernetes_service/" >}}Configurar APM con el servicio de Kubernetes{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/aws_payload_tagging/" >}}Capturar solicitudes y respuestas de servicios de AWS automáticamente{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/websocket_observability/" >}}Observabilidad de WebSocket{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/service_overrides/" >}}Anulaciones de servicio{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/injectors/" >}}Comprender el comportamiento del inyector con la instrumentación de un solo paso{{< /nextlink >}}
    {{< nextlink href="/tracing/code_origin/" >}}Origen del código para tramos{{< /nextlink >}}
{{< /whatsnext >}}