---
further_reading:
- link: https://opentelemetry.io/docs/
  tag: OpenTelemetry
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
  text: Enviar métricas y trazas (traces) desde OpenTelemetry Collector a Datadog
    a través de Datadog Exporter
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter
  tag: Blog
  text: Reenvío de logs desde OpenTelemetry Collector con Datadog Exporter
title: Empezando con OpenTelemetry en Datadog
---


## Información general

[OpenTelemetry][11] es un marco de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de observabilidad de aplicaciones de software. OpenTelemetry proporciona un formato coherente para instrumentar, generar, recopilar y exportar datos de observabilidad de aplicaciones ---a saber, métricas, logs y trazas (traces)--- a plataformas de monitorización para el análisis y entendimiento.

Esta guía demuestra cómo configurar [un ejemplo de aplicación OpenTelemetry][12] para enviar datos de observabilidad a Datadog utilizando el SDK de OpenTelemetry, OpenTelemetry Collector, y [Datadog Exporter][14]. Esta guía también muestra cómo explorar estos datos en la interfaz de usuario Datadog.

Sigue esta guía para:

1. [Instrumentar la aplicación](#instrumentar-la-aplicación) con la API OpenTelemetry.
2. [Configurar la aplicación](#configurar-la-aplicación) para enviar datos de observabilidad a Datadog.
3. [Correlacionar datos de observabilidad](#correlacionar-datos-de-observabilidad) con servicio unificado etiquetado.
4. [Ejecutar la aplicación](#ejecutar-la-aplicación) para generar datos de observabilidad.
5. [Explorar datos de observabilidad](#explorar-datos-de-observabilidad-en-Datadog) en la interfaz de usuario Datadog.

## Requisitos previos

Para completar esta guía, necesitas lo siguiente:

1. [Crea una cuenta en Datadog ][1] si aún no lo has hecho.
2. Configura tu clave de API de Datadog: 
   a. Busca o crea tu [clave de API de Datadog][2].  
   b. Exporta tu clave de API de Datadog a una variable entorno: 
    {{< code-block lang="sh" >}}
exportar DD_API_KEY=<Tu clave de API>
{{< /code-block >}}
3. Obtén la aplicación [Calendario][12] de muestra.  
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

La aplicación Calendario utiliza herramientas de OpenTelemetry para generar y recopilar métricas, logs, y trazas (traces). Los siguientes pasos explican cómo obtener estos datos de observabilidad en Datadog. 

## Instrumentación de la aplicación

La aplicación de muestra de Calendario ya está parcialmente [instrumentada][15]:

1. Ve al archivo principal `CalendarController.java` ubicado en: `./src/main/java/com/otel/controller/CalendarController.java`.
2. El siguiente código instrumenta `getDate()` utilizando la API de OpenTelemetry:

   {{< code-block lang="java" disable_copy="true" filename="CalendarController.java" >}}
Cadena privada getDate() {
  tramo (span) tramo (span) = GlobalOpenTelemetry.getTracer("calendar").spanBuilder("getDate").startSpan();
  Prueba (contexto contexto = tramo (span).makeCurrent()) {
   ...
  } finalmente {
    tramo (span).end();
  }
}
{{< /code-block >}}  

Cuando se ejecuta la aplicación Calendario, la llamada a `getDate()` genera [trazas (traces)][8] y tramos (spans).

## Configurar la aplicación

### Receptor de OTLP 

La aplicación Calendario ya está configurada para enviar datos desde el SDK de OpenTelemetry al [Receptor del Protocolo de OpenTelemetry (OTLP)][10] en OpenTelemetry Collector.

1. Vaya al archivo de configuración de Collector situado en: `./src/main/resources/otelcol-config.yaml`.
2. Las siguientes líneas configuran el receptor de OTLP para recibir métricas, trazas (traces) y logs:  

    {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receptores:
  otlp:
    protocolos:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
...
servicio:
  tuberías:
    trazas (traces):
      receptores: [otlp]
    métricas:
      receptores: [otlp]
    logs:
      receptores: [otlp]
{{< /code-block >}}  

### Datadog Exporter

El Datadog Exporter envía los datos recogidos por el receptor de OTLP al backend de Datadog.

1. Ve al archivo `otelcol-config.yaml`.
2. Las siguientes líneas configuran el Datadog Exporter para enviar datos de observabilidad a Datadog: 

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
exportadores:
  Datadog:
    trazas (traces):
      span_name_as_resource_name: verdadero
      trace_buffer: 500
    nombre de host: "otelcol-Docker"
    api:
      clave: ${DD_API_KEY}
      sitio: datadoghq.com

conectores:
   Datadog/conector:

servicio:
  tuberías:
    métricas:
      receptores: [otlp, Datadog/connector] # <- actualizar esta línea
      exportadores: [Datadog]
   trazas (traces):
      exportadores: [Datadog, Datadog/conector]
   logs:
      exportadores: [Datadog]
{{< /code-block >}}  
3. Establece `exporters.datadog.api.site` en tu [sitio de Datadog][16]. De lo contrario, por defecto es US1.

Esta configuración permite a Datadog Exporter enviar métricas, trazas (traces), y logs de tiempo de ejecución a Datadog. Sin embargo, el envío de métricas de infraestructura requiere configuración adicional.

### OpenTelemetry Collector

En este ejemplo, configura tu OpenTelemetry Collector para enviar métricas de infraestructura .

<div class="alert alert-info">Para enviar métricas de infraestructura desde OpenTelemetry Collector a Datadog, debes utilizar Linux. Se trata de una limitación del receptor Docker Stats.</div>

Para recopilar métricas de contenedor, configura el [Docker receptor de estadísticas][5] en tu Datadog Exportador: 

1. Añade un bloque de `docker_stats` a la sección `receivers` de `otel-config.yaml`:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receptores:
      otlp:
        protocolos:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      # añadir el siguiente bloque
      docker_stats: 
        endpoint: unix:///var/run/Docker.sock # por defecto; si esta no es la ruta del socket Docker, actualiza a la ruta correcta.
       métricas:
         container.network.io.usage.rx_packets:
            habilitado: verdadero
         container.network.io.usage.tx_packets:
            habilitado: verdadero
         container.cpu.usage.system:
            habilitado: verdadero
         container.memory.rss
            habilitado: verdadero
         container.blockio.io_serviced_recursive
            habilitado: verdadero
         container.uptime
            habilitado: verdadero
         container.memory.hierarchical_memory_limit
            habilitado: verdadero
{{< /code-block >}}  

2. Actualiza `service.pipelines.metrics.receivers` para incluir `docker_stats`:

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
servicio:
  tuberías:
    métricas:
      receptores: [otlp, Datadog/connector, docker_stats] # <- actualiza esta línea
{{< /code-block >}}

Esta configuración permite a la aplicación Calendario enviar las métricas del contenedor a Datadog para que lo explores en Datadog.

### Envío de datos de observabilidad con OTLP

La aplicación Calendario utiliza el exportador de registro OpenTelemetry en su configuración de Logback para enviar logs con OpenTelemetry Layer Processor (OTLP).

1. Ve al archivo de configuración Logback XML de la aplicación Calendario en `/src/main/resources/logback.xml`.
2. Las siguientes líneas definen el appender `OpenTelemetry`:

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>verdadero</immediateFlush>
    <captureExperimentalAttributes>verdadero</captureExperimentalAttributes>
    <captureKeyValuePairAttributes>verdadero</captureKeyValuePairAttributes>
  </appender>
{{< /code-block >}}

3. La línea `<appender-ref ref="OpenTelemetry"/>` hace referencia al appender `OpenTelemetry` en la configuración de nivel de raíz:

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<root level="INFO">
  <appender-ref ref="console"/>
  <appender-ref ref="OpenTelemetry"/>
</root>
{{< /code-block >}}

Además, las variables del entorno configuran el entorno de OpenTelemetry para exportar logs, métricas, y trazas (traces):

1. Ve al archivo Docker Compose de la aplicación Calendario en `./deploys/docker/docker-compose-otel.yml`.
2. La configuración `OTEL_LOGS_EXPORTER=otlp` permite enviar los logs con OTLP.
3. La configuración `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` permite enviar las métricas y trazas (traces) con OTLP.

## Correlación de los datos de observabilidad

[Etiquetado de servicio unificado][6] vincula los datos de observabilidad en Datadog para que puedas navegar por métricas, trazas (traces) y logs con etiquetas (tags) coherentes.

La aplicación Calendario ya está configurada con etiquetado de servicio unificado:

1. Ve al archivo Docker Compose de la aplicación Calendario en `./deploys/docker/docker-compose-otel.yml`.
2. Las siguientes líneas permiten la correlación entre las trazas (traces) de la aplicación y otros datos de observabilidad: 

   {{< code-block lang="yaml" filename="docker-compose-otel.yml" collapsible="true" disable_copy="true" >}}
entorno:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker
{{< /code-block >}}

## Ejecutar la aplicación

Para empezar a generar y enviar datos de observabilidad a Datadog, es necesario ejecutar la aplicación Calendario con el SDK de OpenTelemetry:

1. Ejecuta la aplicación desde la carpeta `calendar/`:

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otel.yml up
{{< /code-block >}}
   Este comando crea un contenedor de Docker con el OpenTelemetry Collector y el servicio de Calendario.

2. Para probar que la aplicación Calendario se ejecuta correctamente, ejecuta el siguiente comando desde otra ventana de terminal:

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar 
{{< /code-block >}}

3. Comprueba que recibes una respuesta tal como:

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. Ejecuta el comando `curl` varias veces para asegurarte de que al menos una traza (trace) exporta al backend de Datadog.

   <div class="alert alert-info">La aplicación Calendario utiliza el procesador de muestreo probabilístico, por lo que solo el 30 % de las trazas (traces) enviadas a través de la aplicación llegan al backend de destino.</div>

Cada llamada a la aplicación Calendario resulta en métricas, trazas (traces) y logs que son reenviados al OpenTelemetry Collector, luego al Datadog Exporter y finalmente al backend de Datadog. 

## Exploración de los datos de observabilidad en Datadog

Utiliza la interfaz de usuario de Datadog para explorar los datos de observabilidad de la aplicación Calendario.   

**Nota**: Los datos de tu traza (trace) pueden tardar unos minutos en aparecer.

### Tiempo de ejecución y métricas de infraestructura

Ve el tiempo de ejecución y métricas de infraestructura para visualizar, monitorear, y medir el rendimiento de tus aplicaciones, hosts, contenedores y procesos.

1. Ve a **APM** >  **Catálogo de servicio**.
2. Pasa el ratón por encima del servicio `calendar-otel` y selecciona **Página completa**.
3. Desplázate hasta el panel inferior y selecciona:

   * **Métricas de infraestructura ** para ver tus métricas de contenedor de Docker, como el uso de CPU y memoria.
   * **Métricas JVM** para ver las métricas del tiempo de ejecución, como el uso de heap y el recuento de hilos. 

   {{< img src="/getting_started/opentelemetry/infra_and_jvm.png" alt="Ver las métricas de infraestructura y del tiempo de ejecución de JVM para la aplicación Calendario" style="width:90%;" >}}

### Google

Consulta los logs para monitorear y solucionar problemas de funcionamiento de la aplicación y el sistema.

1. Ve a **logs**.
2. Si tienes otros logs en la lista, añade `@service.name:calendar-otel ` al campo **Buscar para** para ver solo los logs desde la aplicación Calendario.
2. Selecciona un log desde la lista para ver más detalles.

{{< img src="/getting_started/opentelemetry/logs.png" alt="Ver logs para la aplicación Calendario" style="width:90%;" >}}

### Trazas (traces)

Consulta las trazas (traces) y los tramos (spans) para observar el estado y el rendimiento de las solicitudes que tu aplicación procesó.

1. Ve a **APM** > **trazas (traces)**.
2. Busca la sección **servicio** en el menú de filtros y selecciona la faceta `calendar-otel` para visualizar todas las trazas (traces) `calendar-otel`:

   {{< img src="/getting_started/opentelemetry/traces.png" alt="Ver las trazas (traces) para la aplicación Calendario" style="width:90%;" >}}

3. [Explora tus trazas (traces) de `calendar-otel`][8]. 

   Para empezar, haz clic en una traza (trace) para abrir el panel lateral de la traza (trace) y encontrar más detalles sobre la traza (trace) y sus tramos (spans). Por ejemplo, el [Gráfico de llamas][9] captura cuánto tiempo se empleó en cada componente de la ruta de ejecución del Calendario:

   {{< img src="/getting_started/opentelemetry/flame_graph.png" alt="Ver el Gráfico de llamas para una traza (trace) de la aplicación Calendario" style="width:90%;" >}}

4. Observa que puedes seleccionar **infraestructura**, **métricas** o **logs** en el panel inferior para correlacionar tu traza (trace) con otros datos de observabilidad. 

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="Correlacionar una traza (trace) de la aplicación Calendario con logs" style="width:90%;" >}}


## Leer más

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