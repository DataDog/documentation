---
aliases:
- /es/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /es/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /es/opentelemetry/otel_collector_datadog_exporter/
- /es/opentelemetry/collector_exporter/
- /es/opentelemetry/collector_exporter/otel_collector_datadog_exporter
description: Envío de datos de OpenTelemetry al OpenTelemetry Collector y el Datadog
  Exporter
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: Sitio externo
  text: Documentación del Collector
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envío de métricas, trazas (traces) y logs desde OpenTelemetry Collector a
    Datadog con el Datadog Exporter
title: Configurar el OpenTelemetry Collector
---

## Información general

El OpenTelemetry Collector te permite recopilar, procesar y exportar datos de telemetría de tus aplicaciones de una manera independiente del proveedor. Cuando se configura con el [Datadog Exporter][1] y el [Datadog Connector][29], puedes enviar tus trazas, logs y métricas a Datadog sin necesidad del Datadog Agent.

- **Datadog Exporter**: Reenvía datos de trazas, métricas y logs de los SDK de OpenTelemetry a Datadog (sin necesidad del Datadog Agent)
- **Datadog Connector**: Calcula métricas de rastreo a partir de los datos de tramos recopilados 

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagrama: El SDK de OpenTelemetry en código envía datos a través de OTLP al host que ejecuta el OpenTelemetry Collector con el Datadog Exporter, que los reenvía a la plataforma de observabilidad de Datadog." style="width:100%;" >}}

<div class="alert alert-info">Para ver qué funciones de Datadog son compatibles con esta configuración, consulta la <a href="/opentelemetry/compatibility/">tabla de compatibilidad de funciones</a> en <b>OTel completo</b>.</div>

## Instalar y configurar

### 1 - Descargar el OpenTelemetry Collector

Descarga la última versión de la distribución OpenTelemetry Collector Contrib, desde [el repositorio del proyecto][3].

### 2 - Configurar el Datadog Exporter y el Datadog Connector

Para utilizar el Datadog Exporter y el Datadog Connector, defínelos en tu [configuración del [OpenTelemetry Collector[4]:

1. Crea un archivo de configuración llamado `collector.yaml`.
1. Utiliza el siguiente archivo de ejemplo para empezar.
1. Configura tu clave de API Datadog como la variable de entorno `DD_API_KEY`.

{{% otel-endpoint-note %}}

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

Esta configuración básica permite recibir datos de OTLP a través de HTTP y gRPC, y configura un [procesador por lotes][5].

Si quieres consultar la lista completa de opciones de configuración del Datadog Exporter, consulta el [archivo de configuración de ejemplo completamente documentado][8]. Opciones adicionales como `api::site` y `host_metadata` pueden ser relevantes, dependiendo de tu despliegue.

#### Configuración del procesador por lotes

El procesador por lotes se requiere en entornos que no son de desarrollo. La configuración exacta depende de tu carga de trabajo específica y de los tipos de señales.

Configura el procesador por lotes basándote en los límites de ingesta de Datadog:

- Ingreso de trazas: 3,2MB
- Ingesta de log: [5MB sin comprimir][6]
- Ingesta de métricas V2: [500 KB o 5 MB tras la descompresión][7]

Pueden producirse errores en `413 - Request Entity Too Large`, si se introducen demasiados datos de telemetría en el procesador por lotes.

### 3 - Configurar tu aplicación

Para obtener mejores metadatos para trazas y para simplificar la integración con Datadog:

- **Utiliza detectores de recursos**: si los proporciona el SDK del lenguaje, adjunta información de contenedor como atributos de recurso. Por ejemplo, en Go, utiliza la opción de recurso [`WithContainer()`][9].

- **Aplica [etiquetado de servicios unificado][10]**: asegúrate de haber configurado tu aplicación con los atributos de recursos apropiados para el etiquetado de servicios unificado. Esto vincula la telemetría de Datadog con etiquetas (tags) para nombre de servicio, entorno de despliegue y versión de servicio. La aplicación debe establecer estas etiquetas utilizando las convenciones semánticas de OpenTelemetry: `service.name`, `deployment.environment` y `service.version`.

### 4 - Configurar el generador de logs para tu aplicación

{{< img src="logs/log_collection/otel_collector_logs.png" alt="Un diagrama con el host, contenedor o aplicación que envía datos al receptor de log de archivo en el Collector y el Datadog Exporter en el Collector que envía los datos al backend de Datadog" style="width:100%;">}}

Dado que la funcionalidad de generación de logs del SDK de OpenTelemetry no es totalmente compatible (consulta tu lenguaje específico en la [documentación de OpenTelemetry][11] para más información), Datadog recomienda el uso de una biblioteca de generación de logs estándar para tu aplicación. Sigue la [documentación de recopilación de logs][12] específica del lenguaje para configurar el generador de logs adecuado en tu aplicación. Datadog recomienda especialmente la configuración de tu biblioteca de registro para la salida de logs en JSON, a fin de evitar la necesidad de [reglas de análisis personalizadas][13].

#### Configurar el receptor de log de archivo

Configura el receptor de log de archivo utilizando [operadores][14]. Por ejemplo, si hay un servicio `checkoutservice` que está escribiendo logs en `/var/log/pods/services/checkout/0.log`, un ejemplo de log podría tener este aspecto:

```
{"level":"info","message":"order confirmation email sent to \"jack@example.com\"","service":"checkoutservice","span_id":"197492ff2b4e1c65","timestamp":"2022-10-10T22:17:14.841359661Z","trace_id":"e12c408e028299900d48a9dd29b0dc4c"}
```

Ejemplo de configuración de log de archivo:

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

- `include`: Lista de archivos que el receptor rastrea
- `start_at: end`: Indica que se lea el nuevo contenido que se está escribiendo
- `poll_internal`: Define la frecuencia de sondeo
- Operadores:
    - `json_parser`: analiza los logs JSON. Por defecto, el receptor de log de archivos convierte cada línea de log en un registro de log, que es el `body` del [modelo de datos][15] de logs. A continuación, el `json_parser` convierte el cuerpo JSON en atributos del modelo de datos.
    - `trace_parser`: Extrae `trace_id` y `span_id` del log para correlacionar logs y trazas en Datadog.

#### Reasignar el atributo `service.name` de OTel a `service` para logs

Para las versiones 0.83.0 y posteriores del Datadog Exporter, el campo `service` de logs de OTel se rellena como la [convención semántica de OTel][25] `service.name`. Sin embargo, `service.name` no es uno de los [atributos de servicio][26] predeterminados en el preprocesamiento de logs de Datadog.

Para que el campo `service` se rellene correctamente en tus logs, puedes especificar que `service.name` sea la fuente de un servicio de log estableciendo un [procesador de reasignación de servicio de log][27].

{{% collapse-content title="Optional: Using Kubernetes" level="h4" %}}

Hay múltiples maneras de desplegar el OpenTelemetry Collector y el Datadog Exporter en una infraestructura Kubernetes. Para que el receptor filelog funcione, el [despliegue del Agent/DaemonSet][16] es el método de despliegue recomendado.

En entornos contenedorizados, las aplicaciones escriben logs en `stdout` o `stderr`. Kubernetes recopila los logs y los escribe en una localización estándar. Es necesario montar la localización en el nodo host del Collector para el receptor filelog. A continuación se muestra un [ejemplo de extensión][17] con los montajes necesarios para enviar logs.

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

## Configuración del Datadog Exporter predefinida

Puedes encontrar ejemplos de configuración predefinida del Datadog Exporter en la [carpeta`exporter/datadogexporter/examples`][31] en el proyecto OpenTelemetry Collector Contrib. Consulta el archivo de ejemplo de configuración completo, [`ootb-ec2.yaml`][30]. Configura cada uno de los siguientes componentes para adaptarlos a tus necesidades:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}Receptor OTLP{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Nombre de host y etiquetas{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}Configuración de lote y memoria{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

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
[27]: /es/logs/log_configuration/processors/?tab=ui#service-remapper
[28]: /es/opentelemetry/schema_semantics/hostname/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[31]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[32]: /es/opentelemetry/compatibility/