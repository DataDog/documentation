---
aliases:
- /es/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /es/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /es/opentelemetry/otel_collector_datadog_exporter/
- /es/opentelemetry/collector_exporter/otel_collector_datadog_exporter
description: Envíe datos de OpenTelemetry a Datadog con el Datadog Exporter y el Datadog
  Connector
further_reading:
- link: /opentelemetry/setup/collector_exporter/deploy/
  tag: Documentación
  text: Implemente el OpenTelemetry Collector con el Datadog Exporter
- link: /opentelemetry/integrations/datadog_extension/
  tag: Documentación
  text: Habilite la extensión de Datadog para inspeccionar las configuraciones del
    recopilador en Fleet Automation
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envíe métricas, trazas y registros desde OpenTelemetry Collector a Datadog
    utilizando Datadog Exporter
- link: https://www.datadoghq.com/blog/native-otel-with-datadog/
  tag: Blog
  text: Utilice la observabilidad nativa de OpenTelemetry con Datadog desde la ingesta
    hasta la investigación
- link: https://opentelemetry.io/docs/collector/
  tag: Sitio externo
  text: Documentación del Collector
title: Configure el Datadog Exporter y el Connector
---
## Descripción general {#overview}

El OpenTelemetry Collector le permite recopilar, procesar y exportar datos de telemetría de sus aplicaciones de una manera neutral respecto al proveedor. Cuando se configura con el [Datadog Exporter][1] y el [Datadog Connector][29], usted puede enviar sus trazas, registros y métricas a Datadog sin el Datadog Agent.

<div class="alert alert-info">Para las nuevas configuraciones de OpenTelemetry Collector, Datadog recomienda el <a href="/opentelemetry/setup/collector_exporter/">exportador OTLP HTTP y <code>span_metrics</code> configuración del conector</a>. El Datadog Exporter y el Datadog Connector siguen siendo compatibles, y las configuraciones existentes no necesitan migrarse.</div>

- **Datadog Exporter**: Reenvía datos de trazas, métricas y registros desde los SDK de OpenTelemetry a Datadog (sin el Datadog Agent)
- **Datadog Connector**: Calcula métricas de traza a partir de los datos de tramo recopilados

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagrama: El SDK de OpenTelemetry en el código envía datos a través de OTLP al servidor que ejecuta el OpenTelemetry Collector con el Datadog Exporter, el cual los reenvía a la plataforma de observabilidad de Datadog." style="width:100%;" >}}

## Instale y configure {#install-and-configure}

### 1 - Descargue el OpenTelemetry Collector {#1-download-the-opentelemetry-collector}

Descargue la versión más reciente de la distribución OpenTelemetry Collector Contrib, desde [el repositorio del proyecto][3].

### 2 - Configure el Datadog Exporter y el Datadog Connector {#2-configure-the-datadog-exporter-and-connector}

Para usar el Datadog Exporter y el Datadog Connector, configúrelos en su [configuración del OpenTelemetry Collector][4]:

1. Cree un archivo de configuración llamado `collector.yaml`.
1. Utilice el siguiente archivo de ejemplo para comenzar.
1. Establezca su clave de Datadog API como la variable de entorno `DD_API_KEY`.

{{% otel-endpoint-note %}}

<div class="alert alert-warning">AWS EKS Fargate no es un entorno compatible con OpenTelemetry Collector en este momento. Implementar el Collector en EKS Fargate resultará en una facturación incorrecta del servidor de infraestructura.</div>

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

Esta configuración básica permite la recepción de datos OTLP a través de HTTP y gRPC, y establece un [procesador por lotes][5].

Para obtener una lista completa de las opciones de configuración del Datadog Exporter, consulte el [archivo de configuración de ejemplo totalmente documentado][8]. Opciones adicionales como los ajustes de `api::site` y `host_metadata` pueden ser relevantes dependiendo de su despliegue.

#### Configuración del procesador de lotes {#batch-processor-configuration}

El procesador de lotes es necesario para entornos que no son de desarrollo. La configuración exacta depende de su carga de trabajo específica y de los tipos de señales.

Configure el procesador de lotes según los límites de ingesta de Datadog:

- Ingesta de trazas: 3.2MB
- Ingesta de registros: [5MB sin comprimir][6]
- Ingesta de métricas V2: [500KB o 5MB después de la descompresión][7]

Es posible que obtenga errores `413 - Request Entity Too Large` si procesa por lotes demasiados datos de telemetría en el procesador de lotes.

### 3 - Configure su aplicación {#3-configure-your-application}

Para obtener mejores metadatos para las trazas y para una integración fluida con Datadog:

- **Utilice detectores de recursos**: Si los proporciona el SDK del lenguaje, adjunte la información del contenedor como atributos de recurso. Por ejemplo, en Go, utilice la opción de recurso [`WithContainer()`][9].

- **Aplique [unified service tagging][10]**: Asegúrese de haber configurado su aplicación con los atributos de recurso adecuados para unified service tagging. Esto vincula la telemetría de Datadog con etiquetas para el nombre del servicio, el entorno de despliegue y la versión del servicio. La aplicación debe establecer estas etiquetas utilizando las convenciones semánticas de OpenTelemetry: `service.name`, `deployment.environment.name` y `service.version`.

### 4 - Configure el registrador para su aplicación {#4-configure-the-logger-for-your-application}

{{< img src="logs/log_collection/otel_collector_logs.png" alt="Un diagrama que muestra el host, el contenedor o la aplicación enviando datos al receptor filelog en el collector y al Datadog Exporter en el collector enviando los datos al backend de Datadog" style="width:100%;">}}

Dado que la funcionalidad de registro de los SDK de OpenTelemetry no es totalmente compatible (consulte su lenguaje específico en la [documentación de OpenTelemetry][11] para obtener más información), Datadog recomienda utilizar una biblioteca de registro estándar para su aplicación. Siga la [Log Collection documentation][12] específica del lenguaje para configurar el registrador adecuado en su aplicación. Datadog recomienda encarecidamente configurar su biblioteca de registro para que genere sus registros en JSON a fin de evitar la necesidad de [reglas de parseo personalizadas][13].

#### Configure el receptor filelog {#configure-the-filelog-receiver}

Configure el receptor filelog usando [operadores][14]. Por ejemplo, si hay un servicio `checkoutservice` que está escribiendo registros en `/var/log/pods/services/checkout/0.log`, un registro de muestra podría verse así:

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

- `include`: La lista de archivos que el receptor sigue (tails)
- `start_at: end`: Indica leer el contenido recién escrito
- `poll_internal`: Establece la frecuencia de sondeo
- Operadores:
    - `json_parser`: Realiza el parseo de registros JSON. De forma predeterminada, el receptor filelog convierte cada línea de registro en un registro, que es el `body` del modelo de datos de los registros [data model][15]. Luego, el `json_parser` convierte el cuerpo JSON en atributos en el modelo de datos.
    - `trace_parser`: Extraiga el `trace_id` y el `span_id` del registro para correlacionar registros y trazas en Datadog.

#### Reasigne el atributo `service.name` de OTel a `service` para registros {#remap-otels-servicename-attribute-to-service-for-logs}

Para las versiones 0.83.0 y posteriores del Datadog Exporter, el campo `service` de los registros de OTel se completa como `service.name` de la [OTel semantic convention][25]. Sin embargo, `service.name` no es uno de los [atributos de servicio][26] predeterminados en el preprocesamiento de registros de Datadog.

Para que el campo `service` se complete correctamente en sus registros, puede especificar que `service.name` sea la fuente del servicio de un registro configurando un [log service remapper processor][27].

{{% collapse-content title="Opcional: Uso de Kubernetes" level="h4" %}}

<div class="alert alert-warning">AWS EKS Fargate no es un entorno compatible con OpenTelemetry Collector en este momento. Implementar el Collector en EKS Fargate resultará en una facturación incorrecta del servidor de infraestructura.</div>

Existen múltiples formas de implementar el OpenTelemetry Collector y el Datadog Exporter en una infraestructura de Kubernetes. Para que el receptor filelog funcione, el [Agent/DaemonSet deployment][16] es el método de despliegue recomendado.

En entornos en contenedores, las aplicaciones escriben registros en `stdout` o `stderr`. Kubernetes recopila los registros y los escribe en una ubicación estándar. Debe montar la ubicación en el nodo servidor dentro del Collector para el receptor filelog. A continuación se muestra un [ejemplo de extensión][17] con los montajes necesarios para enviar registros.

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
          image: otel/opentelemetry-collector-contrib:0.154.0
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

## Ejemplos de Datadog Exporter {#datadog-exporter-examples}

El repositorio OpenTelemetry Collector Contrib proporciona ejemplos ejecutables de Datadog Exporter para tareas de configuración comunes. Los siguientes enlaces están fijados a la versión v0.154.0 para que los ejemplos no cambien inesperadamente:

- [Configuración completa del Collector][8]
- [Host metrics][34]
- [Métricas de Docker][35]
- [Métricas de Kafka][36]
- [Log Collection][37]
- [Batch and memory limits][38]
- [Configuración lista para usar de EC2][30]

Si utiliza una versión diferente del Collector, consulte los ejemplos incluidos en esa versión. Para aplicaciones en contenedores, consulte la [documentación de despliegue][33].

Configure cada uno de los siguientes componentes según sus necesidades:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/config/otlp_receiver/" >}}Receptor de OTLP{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging/" >}}Hostname y etiquetado{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/collector_batch_memory/" >}}Límites de memoria del Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Valide sus configuraciones del Collector en Fleet Automation {#validate-your-collector-configurations-in-fleet-automation}

Inspeccione y solucione problemas de sus configuraciones de OpenTelemetry Collector en Fleet Automation habilitando la extensión de Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: /es/api/latest/logs/
[7]: /es/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /es/getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /es/logs/log_collection/?tab=host
[13]: /es/logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: /es/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: /es/logs/log_configuration/processors/service_remapper/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/ootb-ec2.yaml
[33]: /es/opentelemetry/setup/collector_exporter/deploy/
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/host-metrics.yaml
[35]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/docker-stats.yaml
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/kafka.yaml
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/logs.yaml
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/batch-memory.yaml