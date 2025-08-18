---
further_reading:
- link: https://opentelemetry.io/docs/
  tag: Sitio externo
  text: Documentación de OpenTelemetry
- link: /opentelemetry
  tag: Documentación
  text: Documentación de OpenTelemetry de Datadog
- link: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
  tag: Documentación
  text: Instrumentación personalizada con OpenTelemetry
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog
  tag: Blog
  text: Métricas de tiempo de ejecución de Monitor de aplicaciones instrumentadas
    por OTel en Datadog APM
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlacionar eventos de RUM de Datadog con trazas (traces) de aplicaciones
    instrumentadas por OTel
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter
  tag: Blog
  text: Enviar métricas y trazas desde OpenTelemetry Collector a Datadog a través
    de Datadog Exporter
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter
  tag: Blog
  text: Reenvío de logs desde OpenTelemetry Collector con Datadog Exporter
title: Empezando con OpenTelemetry en Datadog
---

{{< learning-center-callout header="Try \"Para comprender OpenTelemetry\" en el Centro de aprendizaje" btn_title="Únete ahora" btn_url="https://learn.datadoghq.com/courses/understanding-opentelemetry" hide_image="false" >}}
  Aprende los fundamentos de OpenTelemetry, incluyendo sus capacidades, beneficios, componentes clave, y cómo OTel y Datadog trabajan juntos.
{{< /learning-center-callout >}}

## Información general

[OpenTelemetry][11] es un marco de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de observabilidad de aplicaciones de software. OpenTelemetry proporciona un formato coherente para {{< tooltip text="instrumentar" tooltip="La instrumentación es el proceso de añadir código a tu aplicación para capturar e informar datos de observabilidad a Datadog, como trazas, métricas y logs.">}}, generando, recopilando y exportando datos de observabilidad de aplicaciones, a saber, métricas, logs, y trazas, a plataformas de monitorización para su análisis y comprensión.

Esta guía muestra cómo configurar [un ejemplo de aplicación OpenTelemetry][12] para enviar datos de observabilidad a Datadog utilizando el SDK de OpenTelemetry, OpenTelemetry Collector y [Datadog Exporter][14]. Esta guía también indica cómo explorar estos datos en la interfaz de usuario Datadog.

Sigue esta guía para:

1. [Instrumentar la aplicación](#instrumenting-the-application) con la API OpenTelemetry.
2. [Configurar la aplicación](#configuring-the-application) para enviar datos de observabilidad a Datadog.
3. [Correlacionar datos de observabilidad](#correlating-observability-data) con servicio unificado etiquetado.
4. [Ejecutar la aplicación](#running-the-application) para generar datos de observabilidad.
5. [Explorar datos de observabilidad](#exploring-observability-data-in-datadog) en la interfaz de usuario Datadog.

## Requisitos previos

Para completar esta guía, necesitas lo siguiente:

1. [Crea una cuenta en Datadog][1] si aún no lo has hecho.
2. Configura tu clave de API en Datadog:
   a. Busca o crea tu [clave de API de Datadog][2].
   b. Exporta tu clave de API de Datadog a una variable de entorno:
    {{< code-block lang="sh" >}}
export DD_API_KEY=<Your API Key>
{{< /code-block >}}
3. Obtén la aplicación de ejemplo de [Calendario][12].
   a. Clona el repositorio `opentelemetry-examples` en tu dispositivo:
    {{< code-block lang="sh" >}}
git clone https://github.com/DataDog/opentelemetry-examples.git
{{< /code-block >}}
   b. Navega hasta el directorio `/calendar`:
    {{< code-block lang="sh" >}}
cd opentelemetry-examples/apps/rest-services/java/calendar
{{< /code-block >}}
4. Instalar [Docker Compose][3].
5. (Opcional) Utiliza Linux para enviar métricas de infraestructura.

La aplicación de Calendario utiliza herramientas de OpenTelemetry para generar y recopilar métricas, logs y trazas. Los siguientes pasos explican cómo obtener estos datos de observabilidad en Datadog.

## Instrumentación de la aplicación

La aplicación de muestra de Calendario ya está parcialmente [instrumentada][15]:

1. Ve al archivo principal `CalendarService.java` localizado en: `./src/main/java/com/otel/service/CalendarService.java`.
2. El siguiente código instrumenta `getDate()` utilizando las anotaciones y la API de OpenTelemetry:

   {{< code-block lang="java" disable_copy="true" filename="CalendarService.java" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}

Cuando se ejecuta la aplicación Calendario, la llamada a `getDate()` genera [trazas][8] y tramos (spans).

## Configurar la aplicación

### Receptor OTLP

La aplicación Calendario ya está configurada para enviar datos desde el SDK de OpenTelemetry al [Receptor del Protocolo de OpenTelemetry (OTLP)][10] en OpenTelemetry Collector.

1. Accede al archivo de configuración de Collector situado en: `./src/main/resources/otelcol-config.yaml`.
2. Las siguientes líneas configuran el OpenTelemetry Protocol Receiver para recibir métricas, trazas y logs:

    {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
...
service:
  pipelines:
    traces:
      receivers: [otlp]
    metrics:
      receivers: [otlp]
    logs:
      receivers: [otlp]
{{< /code-block >}}

### Datadog Exporter

El Datadog Exporter envía los datos recogidos por el receptor de OTLP al backend de Datadog.

1. Ve al archivo `otelcol-config.yaml`.
2. Las siguientes líneas configuran el Datadog Exporter para enviar datos de observabilidad a Datadog:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      trace_buffer: 500
    hostname: "otelcol-docker"
    api:
      key: ${DD_API_KEY}
      sitio: datadoghq.com

connectors:
    datadog/connector:
      traces:
        compute_stats_by_span_kind: true

service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector] # <- update this line
      exporters: [datadog]
    traces:
      exporters: [datadog, datadog/connector]
    logs:
      exporters: [datadog]
{{< /code-block >}}
3. Establece `exporters.datadog.api.site` en tu [sitio de Datadog][16]. De lo contrario, por defecto es US1.

Esta configuración permite a Datadog Exporter enviar métricas, trazas y logs de tiempo de ejecución a Datadog. Sin embargo, el envío de métricas de infraestructura requiere configuración adicional.

### OpenTelemetry Collector

En este ejemplo, configura tu OpenTelemetry Collector para enviar métricas de infraestructura .

<div class="alert alert-info">Para enviar métricas de infraestructura desde OpenTelemetry Collector a Datadog, debes utilizar Linux. Se trata de una limitación del receptor Docker Stats.</div>

Para recopilar métricas de contenedores, configura el [receptor de estadísticas de Docker][5] en tu Datadog Exporter:

1. Añade un bloque de `docker_stats` a la sección `receivers` de `otel-config.yaml`:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
      otlp:
        protocolos:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      # add the following block
      docker_stats:
        endpoint: unix:///var/run/docker.sock # default; if this is not the Docker socket path, update to the correct path
        metrics:
          container.network.io.usage.rx_packets:
            enabled: true
          container.network.io.usage.tx_packets:
            enabled: true
          container.cpu.usage.system:
            enabled: true
          container.memory.rss:
            enabled: true
          container.blockio.io_serviced_recursive:
            enabled: true
          container.uptime:
            enabled: true
          container.memory.hierarchical_memory_limit:
            enabled: true
{{< /code-block >}}

2. Actualiza `service.pipelines.metrics.receivers` para incluir `docker_stats`:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector, docker_stats] # <- update this line
{{< /code-block >}}

Esta configuración permite a la aplicación Calendario enviar las métricas del contenedor a Datadog para que lo explores en Datadog.

### Envío de datos de observabilidad con OTLP

La aplicación Calendario utiliza el exportador de registro OpenTelemetry en su configuración de Logback para enviar logs con OpenTelemetry Layer Processor (OTLP).

1. Ve al archivo de configuración Logback XML de la aplicación Calendario en `/src/main/resources/logback.xml`.
2. Las siguientes líneas definen el appender `OpenTelemetry`:

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
    <captureExperimentalAttributes>true</captureExperimentalAttributes>
    <captureKeyValuePairAttributes>true</captureKeyValuePairAttributes>
  </appender>
{{< /code-block >}}

3. La línea `<appender-ref ref="OpenTelemetry"/>` hace referencia al appender `OpenTelemetry` en la configuración de nivel de raíz:

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<root level="INFO">
  <appender-ref ref="console"/>
  <appender-ref ref="OpenTelemetry"/>
</root>
{{< /code-block >}}

Además, las variables del entorno configuran el entorno de OpenTelemetry para exportar logs, métricas y trazas:

1. Ve al archivo Docker Compose de la aplicación de Calendario en `./deploys/docker/docker-compose-otelcol.yml`.
2. La configuración de `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` permite el envío de métricas, trazas y logs con OTLP.

## Correlacionar los datos de observabilidad

El [etiquetado de servicio unificado][6] vincula los datos de observabilidad en Datadog para que puedas navegar por métricas, trazas y logs con etiquetas (tags) coherentes.

La aplicación Calendario ya está configurada con etiquetado de servicio unificado:

1. Ve al archivo Docker Compose de la aplicación de Calendario en `./deploys/docker/docker-compose-otelcol.yml`.
2. Las líneas siguientes permiten la correlación entre las trazas de aplicación y otros datos de observabilidad:

   {{< code-block lang="yaml" filename="docker-compose-otelcol.yml" collapsible="true" disable_copy="true" >}}
environment:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker,service.version=<IMAGE_TAG>
{{< /code-block >}}

## Ejecutar la aplicación

Para empezar a generar y enviar datos de observabilidad a Datadog, es necesario ejecutar la aplicación Calendario con el SDK de OpenTelemetry:

1. Ejecuta la aplicación desde la carpeta `calendar/`:

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otelcol.yml up
{{< /code-block >}}
   Este comando crea un contenedor de Docker con el OpenTelemetry Collector y el servicio de Calendario.

2. Para probar que la aplicación Calendario funciona correctamente, ejecuta el siguiente comando desde otra ventana de terminal:

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar
{{< /code-block >}}

3. Comprueba que recibes una respuesta tal como:

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. Ejecuta el comando `curl` varias veces para asegurarte de que al menos una traza exporta al backend de Datadog.

   <div class="alert alert-info">La aplicación Calendario utiliza el procesador de muestreo probabilístico, por lo que solo el 30 % de las trazas enviadas a través de la aplicación llegan al backend de destino.</div>

Cada llamada a la aplicación Calendario resulta en métricas, trazas y logs que son reenviados al OpenTelemetry Collector, luego al Datadog Exporter y finalmente al backend de Datadog. 

## Exploración de los datos de observabilidad en Datadog

Utiliza la interfaz de usuario de Datadog para explorar los datos de observabilidad de la aplicación de Calendario.

**Nota**: Los datos de tu traza pueden tardar unos minutos en aparecer.

### Tiempo de ejecución y métricas de infraestructura

Consulta el tiempo de ejecución y métricas de infraestructura para visualizar, monitorizar y medir el rendimiento de tus aplicaciones, hosts, contenedores y procesos.

1. Ve a **APM** > **Software Catalog** (APM > Catálogo de software).
2. Pasa el ratón por encima del servicio `calendar-otel` y selecciona **Full Page** (Página completa).
3. Desplázate hasta el panel inferior y selecciona:

   * **Infrastructure Metrics** (Métricas de infraestructura) para ver tus métricas de contenedor de Docker, como el uso de CPU y memoria.
   * **Métricas JVM** para ver las métricas de tiempo de ejecución, como el uso del stack tecnológico y el recuento de subprocesos.

   {{< img src="/getting_started/opentelemetry/infra_and_jvm2.png" alt="Visualizar métricas de infraestructura y métricas de tiempo de ejecución de máquinas virtuales Java de la aplicación Calendar" style="width:90%;" >}}

### Logs

Consulta los logs para monitorizar y solucionar problemas de funcionamiento de la aplicación y el sistema.

1. Accede a **Logs**.
2. Si tienes otros logs en la lista, añade `@service.name:calendar-otel ` al campo **Search for** (Buscar) para ver solo los logs de la aplicación Calendario.
2. Selecciona un log de la lista para ver más detalles.

{{< img src="/getting_started/opentelemetry/logs2.png" alt="Visualizar logs de la aplicación Calendar" style="width:90%;" >}}

### Trazas

Consulta las trazas y tramos para observar el estado y el rendimiento de las solicitudes que ha procesado tu aplicación.

1. Ve a **APM** > **Traces** (APM > Trazas).
2. Busca la sección **Service** (Servicio) en el menú de filtros y selecciona la faceta `calendar-otel` para visualizar todas las trazas `calendar-otel`:

   {{< img src="/getting_started/opentelemetry/traces2.png" alt="Visualizar trazas de la aplicación Calendar" style="width:90%;" >}}

3. [Explora tus trazas en `calendar-otel`][8].

   Para empezar, haz clic en una traza para abrir el panel lateral de la traza y ver más detalles sobre la traza y sus tramos. Por ejemplo, el [gráfico de llamas][9] refleja cuánto tiempo se ha dedicado a cada componente de la ruta de ejecución del Calendario:

   {{< img src="/getting_started/opentelemetry/flame_graph2.png" alt="Visualizar el gráfico de llamas de una traza de la aplicación Calendar" style="width:90%;" >}}

4. Observa que puedes seleccionar **Infrastructure**, **Metrics** o **Logs** en el panel inferior para correlacionar tu traza con otros datos de observabilidad. 

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="Correlacionar una traza de la aplicación Calendario con logs" style="width:90%;" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.docker.com/compose/install/
[4]: /es/opentelemetry/collector_exporter/
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver/
[6]: /es/getting_started/tagging/unified_service_tagging/
[7]: https://app.datadoghq.com/services
[8]: /es/tracing/glossary/#trace
[9]: https://www.datadoghq.com/knowledge-center/distributed-tracing/flame-graph/
[10]: /es/opentelemetry/collector_exporter/otlp_receiver/
[11]: https://opentelemetry.io/
[12]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[14]: /es/opentelemetry/collector_exporter/
[15]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[16]: /es/getting_started/site/