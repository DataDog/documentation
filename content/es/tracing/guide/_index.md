---
aliases:
- /es/tracing/getting_further/
- /es/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: Guía
    rank: 50
    subcategory: Guías de APM
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

Estos tutoriales te guiarán a través de la configuración de una aplicación multiservicio de ejemplo con instrumentación automática y personalizada/manual, y la configuración del stack hasta que vea trazas (traces) en Datadog APM. Todos los tutoriales muestran lo mismo, pero con diferentes lenguajes de programación y configuraciones de infraestructura. Elige el que más se parezca a tu entorno de desarrollo e implementación a fin de aprender lo básico para empezar a usar APM.

{{< whatsnext desc="Elige tu lenguaje y entorno:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo en una aplicación Python en el mismo host que el Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitación del rastreo en una aplicación Python y un Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo para una aplicación Python en un contenedor y un Agent en un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo en una aplicación Java en el mismo host que el Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitación del rastreo en una aplicación Java y un Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo para una aplicación Java en un contenedor y un Agent en un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Habilitación del rastreo para una aplicación Java en GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Habilitación del rastreo para una aplicación Java en AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Habilitación del rastreo para una aplicación Java en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Habilitación del rastreo para una aplicación Java en Amazon ECS con Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Habilitación del rastreo para una aplicación Java con el Controlador de admisión{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo en una aplicación Go en el mismo host que el Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitación del rastreo en una aplicación Go y un Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Habilitación del rastreo para una aplicación Go en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Habilitación del rastreo para una aplicación Go en Amazon ECS con Fargate{{< /nextlink >}}

{{< /whatsnext >}}
<br>

{{< whatsnext desc="Integraciones de APM en acción" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Rastreo de colas de Kafka{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}Rastreo de scripts de CLI PHP{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Configuración de muestreo de consumo" >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}Controla el volumen de consumo de tramos (spans) con mecanismos de consumo{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}Muestreo de consumo con OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/ingestion_sampling_use_cases/" >}}Casos de uso de muestreo de consumo{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Guías para el rastreo" >}}
    {{< nextlink href="/opentelemetry/guide/otel_api_tracing_interoperability/" >}}Interoperabilidad de la API de OpenTelemetry y los rastreos instrumentados de Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}Configurar la puntuación de Apdex por servicio{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}Operaciones principales en los servicios {{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}Descartar checks de estado y otros tramos (spans) no deseados ignorando recursos{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}Métricas basadas en DDSketch en APM{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}Enviar trazas (traces) al Agent mediante la API de rastreo{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}Formatos válidos de ID de tramo (span) y traza (trace){{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}Instalación del Agent de rastreo desde la fuente{{< /nextlink >}}
    {{< nextlink href="/developers/community/libraries/#apm-distributed-tracing-client-libraries" >}}Bibliotecas cliente de rastreo{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}Configuración de etiquetas (tags) principales como contexto{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Decidir cuándo utilizar Datadog APM y AWS X-Ray {{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}Configuración de APM con C++{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Comprender la política de retención de trazas (traces) de Datadog{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/agent_tracer_hostnames" >}}Comprender la diferencia entre el host del Agent y el host del rastreador{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_kubernetes_service/" >}}Configuración de APM con el servicio Kubernetes{{< /nextlink >}}
{{< /whatsnext >}}