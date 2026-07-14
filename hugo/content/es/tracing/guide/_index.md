---
aliases:
- /es/tracing/getting_further/
- /es/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: Guía
    rank: 50
    subcategory: Guías de APM
description: Guías paso a paso para empezar con APM, habilitando tutoriales de rastreo,
  guías de configuración y técnicas avanzadas de rastreo.
disable_toc: true
private: true
title: Guías para el rastreo
---


{{< whatsnext desc="Empezando con APM" >}}
    {{< nextlink href="tracing/guide/alert_anomalies_p99_database" >}}1. Alerta sobre anomalías en la latencia p99 de los servicios de bases de datos{{< /nextlink >}}
    {{< nextlink href="tracing/guide/week_over_week_p50_comparison" >}}2. Compara la latencia p50 semana a semana para un servicio{{< /nextlink >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}3. Crea un dashboard para rastrear y correlacionar las métricas de APM{{< /nextlink >}}
    {{< nextlink href="tracing/guide/slowest_request_daily" >}}4. Depura la traza (trace) más lenta en el endpoint más lento de un servicio web{{< /nextlink >}}
    <a id="enabling-tracing-tutorials">
    {{< nextlink href="tracing/guide/add_span_md_and_graph_it" >}}5. Agrega tags (etiquetas) de tramos (spans), y filtra y agrupa el rendimiento de la aplicación{{< /nextlink >}}
    {{< nextlink href="tracing/guide/instrument_custom_method" >}}6. Instrumenta un método personalizado para obtener una visibilidad profunda de la lógica empresarial.{{< /nextlink >}}
{{< /whatsnext >}}

<br>

### Tutoriales: Habilitación del rastreo

Estos tutoriales te guiarán a través de la configuración de una aplicación multiservicio de ejemplo con instrumentación automática y personalizada/manual, y la configuración del stack hasta que vea trazas en Datadog APM. Todos los tutoriales muestran lo mismo, pero con diferentes lenguajes de programación y configuraciones de infraestructura. Elige el que más se parezca a tu entorno de desarrollo e implementación a fin de aprender lo básico para empezar a usar APM.

{{< whatsnext desc="Elige tu lenguaje y tu entorno:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Python en el mismo host del Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true" >}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Python y el Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true" >}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Python en un contenedor y un Agent en un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Java en el mismo host del Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Java y el Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Java en un contenedor y un Agent en un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-gke-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Java en GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-eks-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Java en AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-ec2-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Java en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-fargate-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Java en Amazon ECS con Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} Habilitar el rastreo de una aplicación Java con el Admission Controller{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Go en el mismo host del Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Go y el Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-ec2-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Go en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-fargate-icon.png" inline="true">}} Habilitar el rastreo de una aplicación Go en Amazon ECS con Fargate{{< /nextlink >}}

{{< /whatsnext >}}
<br>

{{< whatsnext desc="Integraciones de APM en acción" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Rastreo de colas de Kafka{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}Rastreo de scripts de CLI PHP{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Configuración del muestreo de la ingesta" >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}Controlar el volumen de consumo de tramos con Mecanismos de ingesta{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}Muestreo de la ingesta con OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/ingestion_sampling_use_cases/" >}}Casos prácticos de muestreo de la ingesta{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/resource_based_sampling/" >}}Muestreo basado en recursos{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guías de configuración" >}}
    {{< nextlink href="/tracing/guide/remote_config" >}}Preparación de la configuración remota del rastreo{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guías de rastreo" >}}
    {{< nextlink href="/opentelemetry/guide/otel_api_tracing_interoperability/" >}}Interoperabilidad de la API de OpenTelemetry y las trazas instrumentadas por Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}Configurar Apdex Score por servicio{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}Operaciones primarias en servicios{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}Descartar checks de estado y otros tramos no deseados ignorando recursos{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}Métricas basadas en DDSketch en APM{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}Envío de trazas al Agent mediante la API de rastreo{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}Formatos válidos de los ID de tramos y trazas{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}Instalar el Trace Agent desde la fuente{{< /nextlink >}}
    {{< nextlink href="/developers/community/libraries/#apm-distributed-tracing-client-libraries" >}}Bibliotecas de rastreo de clientes{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}Configurar etiquetas primarias de contexto{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Decidir cuándo utilizar Datadog APM y AWS X-Ray {{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}Configurar APM con C++{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Comprender la política de retención de trazas de Datadog{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/agent_tracer_hostnames" >}}Comprender la diferencia entre el host del Agent y el host del rastreador{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_kubernetes_service/" >}}Configurar APM con el servicio Kubernetes{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/aws_payload_tagging/" >}}Capturar solicitudes y respuestas de servicios de AWS automáticamente{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/service_overrides/" >}}Desactivación de servicios{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/injectors/" >}}Comprender el comportamiento del inyector con la Instrumentación de un solo paso{{< /nextlink >}}
    {{< nextlink href="/tracing/code_origin/" >}}Origen del código de tramos{{< /nextlink >}}
{{< /whatsnext >}}