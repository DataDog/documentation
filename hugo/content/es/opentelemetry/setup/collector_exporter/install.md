---
aliases:
- /es/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /es/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /es/opentelemetry/otel_collector_datadog_exporter/
- /es/opentelemetry/collector_exporter/
- /es/opentelemetry/collector_exporter/otel_collector_datadog_exporter
description: Envía datos de OpenTelemetry al OpenTelemetry Collector y al Exportador
  de Datadog
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: Sitio Externo
  text: Documentación del Collector
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envía métricas, trazas y registros desde el OpenTelemetry Collector a Datadog
    utilizando el Exportador de Datadog
- link: /opentelemetry/integrations/datadog_extension/
  tag: Documentación
  text: Habilita la extensión de Datadog para inspeccionar configuraciones del Collector
    en Fleet Automation.
title: Configura el OpenTelemetry Collector
---
## Resumen {#overview}

El OpenTelemetry Collector te permite recopilar, procesar y exportar datos de telemetría de tus aplicaciones de manera neutral ante proveedores. Cuando se configura con el [Exportador de Datadog][1] y el [Conector de Datadog][29], puedes enviar tus trazas, registros y métricas a Datadog sin el Datadog Agent.

- **Exportador de Datadog**: Reenvía datos de trazas, métricas y registros desde los SDKs de OpenTelemetry a Datadog (sin el Datadog Agent)
- **Conector de Datadog**: Calcula métricas de traza a partir de los datos de tramo recopilados

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagrama: El SDK de OpenTelemetry en el código envía datos a través de OTLP al servidor que ejecuta el OpenTelemetry Collector con el Exportador de Datadog, que reenvía a la plataforma de observabilidad de Datadog." style="width:100%;" >}}

<div class="alert alert-info">Para ver qué características de Datadog son compatibles con esta configuración, consulta la <a href="/opentelemetry/compatibility/">tabla de compatibilidad de funciones</a> bajo <b>Full OTel</b>.</div>

## Instala y configura {#install-and-configure}

### 1 - Descarga el OpenTelemetry Collector {#1-download-the-opentelemetry-collector}

Descarga la última versión de la distribución OpenTelemetry Collector Contrib, desde [el repositorio del proyecto][3].

### 2 - Configura el Exportador y el Conector de Datadog {#2-configure-the-datadog-exporter-and-connector}

Para usar el Exportador de Datadog y el Conector de Datadog, configúralos en tu [configuración del OpenTelemetry Collector][4]:

1. Crea un archivo de configuración llamado `collector.yaml`.
1. Utiliza el siguiente archivo de ejemplo para comenzar.
1. Establece tu clave de API de Datadog como la variable de entorno `DD_API_KEY`.

{{% otel-endpoint-note %}}

<div class="alert alert-warning">AWS EKS Fargate no es un entorno compatible para el OpenTelemetry Collector en este momento. Desplegar el Collector en EKS Fargate resultará en una facturación incorrecta del servidor de infraestructura.</div>

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
  # The hostmetrics receiver is required to get correct infrastructure metrics in Datadog.
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:
  # The prometheus receiver scrapes metrics needed for the OpenTelemetry Collector Dashboard.
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']

  filelog:
    include_file_path: true
    poll_interval: 500ms
    include:
      - /var/log/**/*example*/*.log

processors:
  batch:
    send_batch_max_size: 100
    send_batch_size: 10
    timeout: 10s

connectors:
  datadog/connector:

exporters:
  datadog/exporter:
    api:
      site: {{< region-param key="dd_site" >}}
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, prometheus, otlp, datadog/connector]
      processors: [batch]
      exporters: [datadog/exporter]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/connector, datadog/exporter]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [datadog/exporter]
```

Esta configuración básica permite la recepción de datos OTLP a través de HTTP y gRPC, y configura un [procesador por lotes][5].

Para una lista completa de opciones de configuración para el Exportador de Datadog, consulta el [archivo de configuración de ejemplo completamente documentado][8]. Opciones adicionales como `api::site` y `host_metadata` pueden ser relevantes dependiendo de tu despliegue.

#### Configuración del procesador por lotes {#batch-processor-configuration}

El procesador por lotes es necesario para entornos que no son de desarrollo. La configuración exacta depende de tu carga de trabajo y tipos de señales específicos.

Configura el procesador por lotes según los límites de recepción de Datadog:

- Recepción de trazas: 3.2MB
- Recepción de registros: [5MB sin comprimir][6]
- Recepción de métricas V2: [500KB o 5MB después de la descompresión][7]

Puedes obtener `413 - Request Entity Too Large` errores si agrupas demasiados datos de telemetría en el procesador por lotes.

### 3 - Configura tu aplicación {#3-configure-your-application}

Para obtener mejores metadatos para trazas y una integración fluida con Datadog:

- **Utiliza detectores de recursos**: Si son proporcionados por el SDK del lenguaje, adjunta información del contenedor como atributos de recurso. Por ejemplo, en Go, utiliza la opción de recurso [`WithContainer()`][9].

- **Aplica [Unified Service Tagging]**: Asegúrate de haber configurado tu aplicación con los atributos de recurso apropiados para unified service tagging. Esto une la telemetría de Datadog con etiquetas para el nombre del servicio, el entorno de despliegue y la versión del servicio. La aplicación debe establecer estas etiquetas utilizando las convenciones semánticas de OpenTelemetry: `service.name`, `deployment.environment` y `service.version`.

### 4 - Configura el registrador para tu aplicación {#4-configure-the-logger-for-your-application}

{{< img src="logs/log_collection/otel_collector_logs.png" alt="Un diagrama que muestra el host, contenedor o aplicación enviando datos al receptor de filelog en el Collector y al Exportador de Datadog en el Collector enviando los datos al backend de Datadog." style="width:100%;">}}

Dado que la funcionalidad de registro de los SDK de OpenTelemetry no está completamente soportada (consulta tu lenguaje específico en la [documentación de OpenTelemetry][11] para más información), Datadog recomienda usar una biblioteca de registro estándar para tu aplicación. Sigue la [documentación de Recolección de Registros][12] específica del lenguaje para configurar el registrador apropiado en tu aplicación. Datadog recomienda encarecidamente configurar tu biblioteca de registro para que emita tus registros en JSON para evitar la necesidad de [reglas de parseo personalizadas][13].

#### Configura el receptor de filelog {#configure-the-filelog-receiver}

Configura el receptor de filelog utilizando [operadores][14]. Por ejemplo, si hay un servicio `checkoutservice` que está escribiendo registros en `/var/log/pods/services/checkout/0.log`, un registro de muestra podría verse así:

```
{"level":"info","message":"order confirmation email sent to \"jack@example.com\"","service":"checkoutservice","span_id":"197492ff2b4e1c65","timestamp":"2022-10-10T22:17:14.841359661Z","trace_id":"e12c408e028299900d48a9dd29b0dc4c"}
```

Ejemplo de configuración de filelog:

```
filelog:
   include:
     - /var/log/pods/**/*checkout*/*.log
   start_at: end
   poll_interval: 500ms
   operators:
     - id: parse_log
       type: json_parser
       parse_from: body
     - id: trace
       type: trace_parser
       trace_id:
         parse_from: attributes.trace_id
       span_id:
         parse_from: attributes.span_id
   attributes:
     ddtags: env:staging
```

- `include`: La lista de archivos que el receptor realiza el seguimiento de las últimas líneas
- `start_at: end`: Señales para leer el contenido recién escrito
- `poll_internal`: Establece la frecuencia de sondeo
- Operadores:
    - `json_parser`: Realiza el parseo de registros JSON. Por defecto, el receptor de filelog convierte cada línea de registro en un registro de log, que es el `body` del [modelo de datos][15] de los registros. Luego, el `json_parser` convierte el cuerpo JSON en atributos en el modelo de datos.
    - `trace_parser`: Extrae el `trace_id` y `span_id` del registro para correlacionar registros y trazas en Datadog.

#### Remapea el atributo `service.name` de OTel a `service` para los registros {#remap-otels-servicename-attribute-to-service-for-logs}

Para las versiones 0.83.0 y posteriores del Exportador de Datadog, el campo `service` de los registros de OTel se llena como [convención semántica de OTel][25] `service.name`. Sin embargo, `service.name` no es uno de los [atributos de servicio][26] predeterminados en el preprocesamiento de registros de Datadog.

Para que el campo `service` se llene correctamente en tus registros, puedes especificar `service.name` como la fuente del servicio de un registro configurando un [procesador de remapeo de servicio de registro][27].

{{% collapse-content title="Opcional: Usando Kubernetes" level="h4" %}}

<div class="alert alert-warning">AWS EKS Fargate no es un entorno compatible para el OpenTelemetry Collector en este momento. Desplegar el Collector en EKS Fargate resultará en una facturación incorrecta del servidor de infraestructura.</div>

Existen múltiples formas de desplegar el OpenTelemetry Collector y el Exportador de Datadog en una infraestructura de Kubernetes. Para que el receptor de filelog funcione, el [método de despliegue de Agent/DaemonSet][16] es el método de despliegue recomendado.

En entornos contenedorizados, las aplicaciones escriben registros en `stdout` o `stderr`. Kubernetes recopila los registros y los escribe en una ubicación estándar. Necesitas montar la ubicación en el nodo servidor dentro del Collector para el receptor de filelog. A continuación se muestra un [ejemplo de extensión][17] con los montajes requeridos para enviar registros.

```
apiVersion: apps/v1
metadata:
  name: otel-agent
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-collector
    spec:
      containers:
        - name: collector
          command:
            - "/otelcol-contrib"
            - "--config=/conf/otel-agent-config.yaml"
          image: otel/opentelemetry-collector-contrib:0.71.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # The k8s.pod.ip is used to associate pods for k8sattributes
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
              hostPort: 4318
            - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
              hostPort: 4317
            - containerPort: 8888 # Default endpoint for querying metrics.
          volumeMounts:
            - name: otel-agent-config-vol
              mountPath: /conf
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: otel-agent-config-vol
          configMap:
            name: otel-agent-conf
            items:
              - key: otel-agent-config
                path: otel-agent-config.yaml
        # Mount nodes log file location.
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

{{% /collapse-content %}}

## Configuración del Exportador de Datadog lista para usar {#out-of-the-box-datadog-exporter-configuration}

Puedes encontrar ejemplos funcionales de configuración lista para usar para el Exportador de Datadog en la [carpeta `exporter/datadogexporter/examples`][31] del proyecto OpenTelemetry Collector Contrib. Consulta el archivo de ejemplo de configuración completo, [`ootb-ec2.yaml`][30]. **Nota**: Este ejemplo es para aplicaciones que se ejecutan directamente en un host EC2. Para aplicaciones contenedorizadas, consulta la [documentación de despliegue][33].

Configura cada uno de los siguientes componentes según tus necesidades:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}Receptor OTLP{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Nombre de host y Etiquetas{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}Configuraciones de Lote y Memoria{{< /nextlink >}}
{{< /whatsnext >}}

## Valida tus configuraciones del Collector en Fleet Automation {#validate-your-collector-configurations-in-fleet-automation}

Inspecciona y soluciona problemas en tus configuraciones de OpenTelemetry Collector en Fleet Automation habilitando la Extensión de Datadog. 

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: /es/api/latest/logs/
[7]: /es/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /es/getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /es/logs/log_collection/?tab=host
[13]: /es/logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: /es/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: /es/logs/log_configuration/processors/service_remapper/
[28]: /es/opentelemetry/schema_semantics/hostname/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[31]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[32]: /es/opentelemetry/compatibility/
[33]: /es/opentelemetry/collector_exporter/deployment