---
description: Configure una aplicación de muestra para enviar métricas, trazas y logs
  de OpenTelemetry a Datadog.
further_reading:
- link: https://opentelemetry.io/docs/
  tag: Sitio externo
  text: Documentación de OpenTelemetry
- link: /opentelemetry
  tag: Documentación
  text: Documentación de Datadog OpenTelemetry
- link: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
  tag: Documentación
  text: Instrumentación personalizada con OpenTelemetry
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog
  tag: Blog
  text: Haga un seguimiento de métricas de tiempo de ejecución de aplicaciones instrumentadas
    con OTel en Datadog APM
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlacione eventos de Datadog RUM con trazas de aplicaciones instrumentadas
    con OTel
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter
  tag: Blog
  text: Envíe métricas y trazas desde OpenTelemetry Collector a Datadog a través de
    Datadog Exporter
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter
  tag: Blog
  text: Reenvíe registros desde OpenTelemetry Collector con Datadog Exporter
title: Primeros pasos con OpenTelemetry en Datadog
---
{{< learning-center-callout header="Pruebe \"Understanding OpenTelemetry\" en el Learning Center" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/understanding-opentelemetry" hide_image="false" >}}
  Aprenda los fundamentos de OpenTelemetry, incluyendo sus capacidades y beneficios, componentes clave, y cómo OTel y Datadog trabajan juntos.
{{< /learning-center-callout >}}

## Descripción general {#overview}

[OpenTelemetry][11] es un framework de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de observabilidad desde aplicaciones de software. OpenTelemetry proporciona un formato consistente para {{< tooltip text="instrumenting" tooltip="La instrumentación es el proceso de añadir código a su aplicación para capturar y reportar datos de observabilidad a Datadog, tales como trazas, métricas y logs.">}}, generar, recopilar y exportar datos de observabilidad de aplicaciones---es decir, métricas, logs y trazas---a plataformas de monitoreo para su análisis y obtención de información.

Esta guía demuestra cómo configurar [una aplicación de OpenTelemetry de muestra][12] para enviar datos de observabilidad a Datadog utilizando el SDK de OpenTelemetry, el OpenTelemetry Collector y el [Datadog Exporter][14]. Esta guía también le muestra cómo explorar estos datos en la interfaz de usuario de Datadog.

<div class="alert alert-info">Esta guía utiliza el Datadog Exporter y el Datadog Connector. Para nuevas configuraciones del Collector, Datadog recomienda la canalización OTLP en <a href="/opentelemetry/setup/collector_exporter/">Configurar el OpenTelemetry Collector</a>.</div>

Siga esta guía para:

1. [Instrumente la aplicación](#instrumenting-the-application) con la API de OpenTelemetry.
2. [Configure la aplicación](#configuring-the-application) para enviar datos de observabilidad a Datadog.
3. [Correlacione datos de observabilidad](#correlating-observability-data) con unified service tagging.
4. [Ejecute la aplicación](#running-the-application) para generar datos de observabilidad.
5. [Explore los datos de observabilidad](#exploring-observability-data-in-datadog) en la interfaz de usuario de Datadog.

## Requisitos previos {#prerequisites}

Para completar esta guía, necesita lo siguiente:

1. [Cree una cuenta de Datadog][1] si aún no lo ha hecho.
2. Configure su clave de Datadog API:
   1. Busque o cree su [clave de Datadog API][2].
   2. Exporte su clave de Datadog API a una variable de entorno:
    {{< code-block lang="sh" >}}
export DD_API_KEY=<Your API Key>
{{< /code-block >}}
3. Obtenga la aplicación de ejemplo [Calendar][12].
   1. Clone el `opentelemetry-examples` repositorio en su dispositivo:
    {{< code-block lang="sh" >}}
git clone https://github.com/DataDog/opentelemetry-examples.git
{{< /code-block >}}
   2. Navegue al directorio `/calendar`:
    {{< code-block lang="sh" >}}
cd opentelemetry-examples/apps/rest-services/java/calendar
{{< /code-block >}}
4. Instale [Docker Compose][3].
5. (Opcional) Utilice Linux para enviar métricas de infraestructura.

La aplicación Calendar utiliza herramientas de OpenTelemetry para generar y recopilar métricas, logs y trazas. Los siguientes pasos explican cómo llevar estos datos de observabilidad a Datadog.

## Instrumentación de la aplicación {#instrumenting-the-application}

La aplicación de ejemplo Calendar ya está parcialmente [instrumentada][15]:

1. Vaya al archivo principal `CalendarService.java` ubicado en `./src/main/java/com/otel/service/CalendarService.java`:
2. El siguiente código instrumenta `getDate()` utilizando las anotaciones y la API de OpenTelemetry:

   {{< code-block lang="java" disable_copy="true" filename="CalendarService.java" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}

Cuando se ejecuta la aplicación Calendar, la llamada `getDate()` genera [trazas][8] y spans.

## Configuración de la aplicación {#configuring-the-application}

### Receptor de OTLP {#otlp-receiver}

La aplicación Calendar ya está configurada para enviar datos desde el SDK de OpenTelemetry al [receptor del Protocolo de OpenTelemetry (OTLP)][10] en el OpenTelemetry Collector.

1. Vaya al archivo de configuración del Collector ubicado en `./src/main/resources/otelcol-config.yaml`:
2. Las siguientes líneas configuran el receptor OTLP para recibir métricas, trazas y logs:

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

### Datadog Exporter {#datadog-exporter}

El Datadog Exporter envía los datos recopilados por el receptor OTLP al backend de Datadog.

1. Vaya al archivo `otelcol-config.yaml`.
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
      site: datadoghq.com

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
3. Establezca `exporters.datadog.api.site` en su [sitio de Datadog][16]. De lo contrario, el valor predeterminado es US1.

Esta configuración permite que el Datadog Exporter envíe métricas de tiempo de ejecución, trazas y logs a Datadog. Sin embargo, el envío de métricas de infraestructura requiere una configuración adicional.

### OpenTelemetry Collector {#opentelemetry-collector}

En este ejemplo, configure su OpenTelemetry Collector para enviar métricas de infraestructura.

<div class="alert alert-info">Para enviar métricas de infraestructura desde el OpenTelemetry Collector a Datadog, debe usar Linux. Esta es una limitación del receptor Docker Stats.</div>

Para recopilar métricas de contenedores, configure el [receptor Docker stats][5] en su OpenTelemetry Collector:

1. Agregue un bloque `docker_stats` a la sección `receivers` de `otel-config.yaml`:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
      otlp:
        protocols:
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

2. Actualice `service.pipelines.metrics.receivers` para incluir `docker_stats`:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector, docker_stats] # <- update this line
{{< /code-block >}}

Esta configuración permite que la aplicación Calendar envíe métricas de contenedores a Datadog para que usted las explore en Datadog.

### Envío de datos de observabilidad con OTLP {#sending-observability-data-with-otlp}

La aplicación Calendar utiliza el exportador de logs de OpenTelemetry en su configuración de Logback para enviar logs con el procesador de capas de OpenTelemetry (OTLP).

1. Vaya al archivo de configuración XML de Logback de la aplicación Calendar en `/src/main/resources/logback.xml`.
2. Las siguientes líneas definen el appender `OpenTelemetry`:

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
    <captureExperimentalAttributes>true</captureExperimentalAttributes>
    <captureKeyValuePairAttributes>true</captureKeyValuePairAttributes>
  </appender>
{{< /code-block >}}

3. La línea `<appender-ref ref="OpenTelemetry"/>` hace referencia al appender `OpenTelemetry` en la configuración de nivel raíz:

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<root level="INFO">
  <appender-ref ref="console"/>
  <appender-ref ref="OpenTelemetry"/>
</root>
{{< /code-block >}}

Además, las variables de entorno configuran el entorno de OpenTelemetry para exportar logs, métricas y trazas:

1. Vaya al archivo Docker Compose de la aplicación Calendar en `./deploys/docker/docker-compose-otelcol.yml`.
2. La configuración `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` permite que las métricas, trazas y logs se envíen con OTLP.

## Correlacione los datos de observabilidad {#correlating-observability-data}

[Unified service tagging][6] vincula los datos de observabilidad en Datadog para que pueda navegar entre métricas, trazas y registros con etiquetas consistentes.

La aplicación Calendar ya está configurada con unified service tagging:

1. Vaya al archivo Docker Compose de la aplicación Calendar en `./deploys/docker/docker-compose-otelcol.yml`.
2. Las siguientes líneas habilitan la correlación entre las trazas de la aplicación y otros datos de observabilidad:

   {{< code-block lang="yaml" filename="docker-compose-otelcol.yml" collapsible="true" disable_copy="true" >}}
environment:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker,service.version=<IMAGE_TAG>
{{< /code-block >}}

## Ejecución de la aplicación {#running-the-application}

Para comenzar a generar y reenviar datos de observabilidad a Datadog, debe ejecutar la aplicación Calendar con el SDK de OpenTelemetry:

1. Ejecute la aplicación desde la carpeta `calendar/`:

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otelcol.yml up
{{< /code-block >}}
   Este comando crea un contenedor de Docker con el OpenTelemetry Collector y el servicio Calendar.

2. Para probar que la aplicación Calendar se está ejecutando correctamente, ejecute el siguiente comando desde otra ventana de terminal:

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar
{{< /code-block >}}

3. Verifique que recibe una respuesta como:

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. Ejecute el comando `curl` varias veces para asegurarse de que al menos una traza se exporte al backend de Datadog.

   <div class="alert alert-info">La aplicación Calendar utiliza el procesador de muestreo probabilístico, por lo que solo el 30% de las trazas enviadas a través de la aplicación llegan al backend de destino.</div>

Cada llamada a la aplicación Calendar resulta en el reenvío de métricas, trazas y logs al OpenTelemetry Collector, luego al Datadog Exporter y, finalmente, al backend de Datadog.

## Exploración de datos de observabilidad en Datadog {#exploring-observability-data-in-datadog}

Utilice la interfaz de usuario de Datadog para explorar los datos de observabilidad de la aplicación Calendar.

**Nota**: Es posible que los datos de traza tarden unos minutos en aparecer.

### Métricas de tiempo de ejecución y de infraestructura {#runtime-and-infrastructure-metrics}

Vea las métricas de tiempo de ejecución y de infraestructura para visualizar, hacer un seguimiento y medir el rendimiento de sus applications, hosts, contenedores y procesos.

1. Vaya a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}.
2. Pase el cursor sobre el servicio `calendar-otel` y seleccione {{< ui >}}Full Page{{< /ui >}}.
3. Desplácese hasta el panel inferior y seleccione:

   * {{< ui >}}Infrastructure Metrics{{< /ui >}} para ver las métricas de sus contenedores Docker, como el uso de CPU y memoria.
   * {{< ui >}}JVM Metrics{{< /ui >}} para ver las métricas de tiempo de ejecución, como el uso del montón y el recuento de subprocesos.

   {{< img src="/getting_started/opentelemetry/infra_and_jvm2.png" alt="Vea las métricas de infraestructura y las métricas de tiempo de ejecución de JVM para la aplicación Calendar" style="width:90%;" >}}

### Registros {#logs}

Visualice los registros para monitorear y solucionar problemas de las operaciones del sistema y de la aplicación.

1. Vaya a {{< ui >}}Logs{{< /ui >}}.
2. Si tiene otros registros en la lista, agregue `@service.name:calendar-otel ` al campo {{< ui >}}Search for{{< /ui >}} para ver solo los registros de la aplicación Calendar.
2. Seleccione un registro de la lista para ver más detalles.

{{< img src="/getting_started/opentelemetry/logs2.png" alt="Vea los registros de la aplicación Calendar" style="width:90%;" >}}

### Trazas {#traces}

Vea las trazas y los spans para observar el estado y el rendimiento de las solicitudes procesadas por su aplicación.

1. Vaya a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}.
2. Busque la sección {{< ui >}}Service{{< /ui >}} en el menú de filtros y seleccione la faceta `calendar-otel` para mostrar todas las trazas de `calendar-otel`:

   {{< img src="/getting_started/opentelemetry/traces2.png" alt="Vea las trazas de la aplicación Calendar" style="width:90%;" >}}

3. [Explore sus trazas de `calendar-otel`][8].

   Para comenzar, haga clic en una traza para abrir el panel lateral de la traza y encontrar más detalles sobre la traza y sus spans. Por ejemplo, el [Flame Graph][9] captura cuánto tiempo se dedicó a cada componente de la ruta de ejecución de Calendar:

   {{< img src="/getting_started/opentelemetry/flame_graph2.png" alt="Vea el Flame Graph para una traza de la aplicación Calendar" style="width:90%;" >}}

4. Observe que puede seleccionar {{< ui >}}Infrastructure{{< /ui >}}, {{< ui >}}Metrics{{< /ui >}} o {{< ui >}}Logs{{< /ui >}} en el panel inferior para correlacionar su traza con otros datos de observabilidad.

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="Correlacionar una traza de la aplicación Calendar con registros" style="width:90%;" >}}


## Lecturas adicionales {#further-reading}

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
[14]: /es/opentelemetry/setup/collector_exporter/datadog_exporter/
[15]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[16]: /es/getting_started/site/