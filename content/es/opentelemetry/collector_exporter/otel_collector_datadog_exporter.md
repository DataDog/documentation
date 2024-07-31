---
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
description: Envío de datos de OpenTelemetry al OpenTelemetry Collector y exportador
  de Datadog
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: Sitio externo
  text: Documentación de Collector
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envío de métricas, trazas y logs desde OpenTelemetry Collector a Datadog con
    el exportador de Datadog
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: Blog
  text: Uso de HiveMQ y OpenTelemetry para monitorizar aplicaciones IoT en Datadog
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipo de métricas OTLP
title: OpenTelemetry Collector y Exportador de Datadog
---

El OpenTelemetry Collector es un proceso del Agent de proveedor agnóstico para recopilar y exportar datos de telemetría emitidos por muchos procesos. El [Exportador de Datadog][1] para OpenTelemetry Collector te permite reenviar trazas (traces), métricas y datos de logs de SDKs de OpenTelemetry a Datadog (sin el Datadog Agent). Funciona con todos los lenguajes compatibles y puedes [conectar esos datos de traza de OpenTelemetry con logs de aplicación][2].

{{< img src="metrics/otel/datadog_exporter.png" alt="Biblioteca instrumentada de aplicaciones, integraciones en la nube y otras soluciones de monitorización (por ejemplo, Prometheus) -> Exportador de Datadog dentro de OpenTelemetry Collector -> Datadog" style="width:100%;">}}

## Configuración de OpenTelemetry Collector con el exportador de Datadog

Para ejecutar OpenTelemetry Collector junto con el exportador de Datadog:

### Paso 1: Descargar OpenTelemetry Collector

Descarga la última versión de la distribución OpenTelemetry Collector Contrib, desde [el repositorio del proyecto][3].

### Paso 2: Configurar el exportador de Datadog

Para utilizar el exportador de Datadog, añádelo a tu [configuración de OpenTelemetry Collector][4]. Crea un archivo de configuración y nómbralo `collector.yaml`. Utiliza el archivo de ejemplo que proporciona una configuración básica que está listo para usar después de establecer tu clave de API de Datadog como la variable de entorno `DD_API_KEY`:

{{< code-block lang="yaml" filename="collector.yaml" collapsible="true" >}}
receivers:
  otlp:
    protocols:
      http:
      grpc:
  # El receptor de métricas de host es necesario para obtener las métricas de infraestructura correctas en Datadog.
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
  # El receptor de prometheus extrae las métricas necesarias para el dashboard de OpenTelemetry Collector.
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

exporters:
  datadog:
    api:
      site: <DD_SITE>
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, prometheus, otlp]
      processors: [batch]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [datadog]
{{< /code-block >}}

Donde `<DD_SITE>` es tu sitio, {{< region-param key="dd_site" code="true" >}}.

La configuración anterior permite la recepción de datos OTLP de las bibliotecas de instrumentación de OpenTelemetry a través de HTTP y gRPC, y configura un [procesador por lotes][5], que es obligatorio para cualquier entorno que no sea de desarrollo. Ten en cuenta que pueden producirse errores en `413 - Request Entity Too Large` si almacenas demasiados datos telemétricos en el procesador por lotes.

La configuración exacta del procesador por lotes depende de tu carga de trabajo específica, así como de los tipos de señales. La ingesta de Datadog tiene diferentes límites de tamaño de carga útil para los 3 tipos de señales:
- Ingesta de traza (trace): 3,2MB
- Ingesta de log: [5MB sin comprimir][6]
- Ingesta de métricas V2: [500 KB o 5 MB tras la descompresión][7]

#### Configuración avanzada

[Este archivo de ejemplo de configuración completamente registrado][8] ilustra todas las opciones posibles de configuración para el Exportador de Datadog. Puede haber otras opciones relevantes para tu despliegue, como `api::site` o las de la sección `host_metadata`.

### Paso 3 - Configurar tu solicitud

Para obtener mejores metadatos para trazas y para simplificar la integración con Datadog:

- **Utiliza detectores de recursos**: si los proporciona el SDK del lenguaje, adjunta información de contenedor como atributos de recurso. Por ejemplo, en Go, utiliza la opción de recurso [`WithContainer()`][9].

- **Aplica [etiquetado de servicios unificado][10]**: asegúrate de haber configurado tu aplicación con los atributos de recursos apropiados para el etiquetado de servicios unificado. Esto vincula la telemetría de Datadog con etiquetas para nombre de servicio, entorno de despliegue y versión de servicio. La aplicación debe establecer estas etiquetas utilizando las convenciones semánticas de OpenTelemetry: `service.name`, `deployment.environment` y `service.version`.

### Paso 4 - Configurar el registrador para tu aplicación

{{< img src="logs/log_collection/otel_collector_logs.png" alt="Un diagrama con el host, contenedor o aplicación que envía datos al receptor de log de archivo en el Collector y el Exportador de Datadog en el recopilador que envía los datos al backend de Datadog" style="width:100%;">}}

Dado que la funcionalidad de registro de los SDKs de OpenTelemetry no es totalmente compatible (consulta tu lenguaje específico en la [documentación de OpenTelemetry][11] para más información), Datadog recomienda el uso de una biblioteca de registro estándar para tu aplicación. Sigue la [documentación de recopilación de log][12] específica del lenguaje para configurar el registrador adecuado en tu aplicación. Datadog recomienda encarecidamente la configuración de tu biblioteca de registro para la salida de logs en JSON para evitar la necesidad de [reglas de parseo personalizadas][13].

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

- `include`: la lista de archivos que el receptor pone en cola
- `start_at: end`: indica que se lea el nuevo contenido que se está escribiendo 
- `poll_internal`: establece la frecuencia de sondeo
- Operadores:
    - `json_parser`: analiza los logs JSON. Por defecto, el receptor de log de archivos convierte cada línea de log en un registro de log, que es el `body` del [modelo de datos][15] de logs. A continuación, el `json_parser` convierte el cuerpo JSON en atributos del modelo de datos.
    - `trace_parser`: extraiga `trace_id` y `span_id` del log para correlacionar logs y trazas en Datadog.

#### Reasignar el atributo `service.name` de OTel a `service` para logs

Para las versiones 0.83.0 y posteriores del Exportador de Datadog, el campo `service` de logs de OTel se rellena como la [convención semántica de OTel][25] `service.name`. Sin embargo, `service.name` no es uno de los [atributos de servicio][26] predeterminados en el preprocesamiento de logs de Datadog.

Para que el campo `service` se rellene correctamente en tus logs, puedes especificar que `service.name` sea la fuente de un servicio de log estableciendo un [procesador de reasignación de servicio de log][27].

<details>
<summary><strong>Opcional: uso de Kubernetes</strong></summary>

Hay varias maneras de desplegar el OpenTelemetry Collector y el Exportador de Datadog en una infraestructura de Kubernetes. Para que el receptor de log de archivo funcione, el [despliegue del Agent/DaemonSet][16] es el método de despliegue recomendado.

En entornos contenedorizados, las aplicaciones escriben logs en `stdout` o `stderr`. Kubernetes recopila los logs y los escribe en una localización estándar. Es necesario montar la localización en el nodo de host en el Collector para el receptor de log de archivo. A continuación, se muestra un [ejemplo de extensión][17] con los montajes necesarios para enviar logs.

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
            # La k8s.pod.ip se utiliza para asociar pods para k8sattributes
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
        # Montar nodos en la localización de archivos de log.
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```
</details>

### Paso 5: Ejecutar el Collector

{{< tabs >}}
{{% tab "En un host" %}}

Ejecuta el Collector, especificando el archivo de configuración mediante el parámetro `--config`:

```
otelcontribcol_linux_amd64 --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker (host local)" %}}

Para ejecutar el OpenTelemetry Collector como una imagen de Docker y recibir trazas del mismo host:

1. Elige una imagen de Docker publicada, como [`otel/opentelemetry-collector-contrib`][1].

2. Determina qué puertos abrir en tu contenedor para que las trazas de OpenTelemetry se envíen al OpenTelemetry Collector. Por defecto, las trazas se envían a través de gRPC en el puerto 4317. Si no utilizas gRPC, utiliza el puerto 4318.

3. Ejecuta el contenedor y expone el puerto necesario, con el archivo `collector.yaml` previamente definido. Por ejemplo, si estás utilizando el puerto 4317:

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags

{{% /tab %}}

{{% tab "Docker (otros contenedores)" %}}

Para ejecutar el OpenTelemetry Collector como una imagen de Docker y recibir trazas de otros contenedores:

1. Crea una red de Docker:

    ```
    docker network create <NETWORK_NAME>
    ```

2. Ejecuta el OpenTelemetry Collector y contenedores de aplicaciones como parte de la misma red.

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

   Al ejecutar la aplicación de contenedor, asegúrate de que la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` está configurada para utilizar el nombre de host apropiado para el OpenTelemetry Collector. En el ejemplo siguiente, se trata de `opentelemetry-collector`.

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{{% /tab %}}

{{% tab "Kubernetes (DaemonSet)" %}}

El uso de un DaemonSet es la forma más común y recomendada de configurar la recopilación de OpenTelemetry en un entorno de Kubernetes. Para desplegar el OpenTelemetry Collector y el Exportador de Datadog en una infraestructura de Kubernetes:

1. Utiliza este [ejemplo completo de configuración de OpenTelemetry Collector con el Exportador de Datadog como DaemonSet][1], incluyendo el ejemplo de configuración de la aplicación.

   Considera [algunas opciones esenciales de configuración en el ejemplo][2], que aseguran que los puertos esenciales del DaemonSet están expuestos y accesibles a tu aplicación:

   ```yaml
   # ...
           ports:
           - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
             hostPort: 4318
           - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
             hostPort: 4317
           - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```

   Si no necesitas los puertos HTTP estándar y gRPC para tu aplicación, puedes eliminarlos.

2. Recopila valiosos atributos de Kubernetes, que se utilizan para el etiquetado del contenedor de Datadog, informa la IP del pod como atributo de recurso, [como se muestra en el ejemplo][3]:

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   Esto asegura que [Kubernetes Attributes Processor][4] que se utiliza en [el mapa de configuración][5] es capaz de extraer los metadatos necesarios para adjuntar a trazas. Hay [roles][6] adicionales que deben configurarse para permitir el acceso a estos metadatos. [El ejemplo][1] está completo, listo para usar, y tiene los roles correctos configurados.

3. Proporciona tu [contenedor de aplicación][7]. Para configurar tu contenedor de aplicación, asegúrate de que se utiliza el nombre de host correcto del endpoint OTLP. El OpenTelemetry Collector se ejecuta como un DaemonSet, por lo que el actual host necesita ser dirigido. Establece tu variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` del contenedor de aplicación correctamente, como en el [gráfico de ejemplo][8]:

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32

{{% /tab %}}

{{% tab "Kubernetes (Gateway)" %}}

Para desplegar OpenTelemetry Collector y el Exportador de Datadog en un despliegue de Kubernetes Gateway:

1. Utiliza este [ejemplo completo de configuración de OpenTelemetry Collector con el Exportador de Datadog como DaemonSet][1], incluyendo el ejemplo de configuración de la aplicación.

   Considera [algunas opciones esenciales de configuración en el ejemplo][2], que aseguran que los puertos esenciales del DaemonSet están expuestos y accesibles a tu aplicación:

   ```yaml
   # ...
           ports:
           - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
             hostPort: 4318
           - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
             hostPort: 4317
           - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```

   Si no necesitas los puertos HTTP estándar y gRPC para tu aplicación, puedes eliminarlos.

2. Recopila valiosos atributos de Kubernetes, que se utilizan para el etiquetado del contenedor de Datadog, informa la IP del pod como atributo de recurso, [como se muestra en el ejemplo][3]:

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   Esto asegura que [Kubernetes Attributes Processor][4] que se utiliza en [el mapa de configuración][5] es capaz de extraer los metadatos necesarios para adjuntar a trazas. Hay [roles][6] adicionales que deben configurarse para permitir el acceso a estos metadatos. [El ejemplo][1] está completo, listo para usar, y tiene los roles correctos configurados.

3. Proporciona tu [contenedor de aplicación][7]. Para configurar tu contenedor de aplicación, asegúrate de que se utiliza el nombre de host correcto del endpoint OTLP. El OpenTelemetry Collector se ejecuta como un DaemonSet, por lo que el actual host necesita ser dirigido. Establece tu variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` del contenedor de aplicación correctamente, como en el [gráfico de ejemplo][8]:

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

4. Cambia el DaemonSet para incluir un [exportador OTLP][9] en lugar del Exportador de Datadog [actualmente en su lugar][10]:

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

5. Asegúrate de que los pipelines de servicio utilizan este exportador, en lugar del de Datadog que [está en el ejemplo][11]:

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   Esto garantiza que cada Agent reenvíe sus datos a través del protocolo OTLP a la gateway de Collector.

6. Sustituye `GATEWAY_HOSTNAME` por la dirección de tu gateway de OpenTelemetry Collector.

7. Para garantizar que los metadatos de Kubernetes sigan aplicándose a trazas, indica al [procesador`k8sattributes`][12] que reenvíe la IP del pod a la gateway de Collector para que pueda obtener los metadatos:

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   Para más información sobre la opción `passthrough`, lee [su documentación][13].

8. Asegúrate de que la configuración de la gateway de Collector utiliza la misma configuración del exportador de Datadog que ha sido sustituida por el exportador OTLP en el Agent. Por ejemplo (donde `<DD_SITE>` es tu sitio, {{< region-param key="dd_site" code="true" >}}):

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15-L18
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L27
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/e79d917/processor/k8sattributesprocessor/doc.go#L196-L220

{{% /tab %}}

{{% tab "Kubernetes (Operator)" %}}

Para utilizar el OpenTelemetry Operator:

1. Sigue la [documentación oficial para desplegar el OpenTelemetry Operator][1]. Como se describe allí, despliega el gestor de certificados, además del Operator.

2. Configura el Operator utilizando una de las configuraciones estándar de Kubernetes en OpenTelemetry Collector:
   * [Despliegue de DaemonSet][2]: utiliza el despliegue de DaemonSet si deseas asegurarte de recibir métricas de host.
   * [Despliegue de la gateway][3]

   Por ejemplo:

   ```yaml
   apiVersion: opentelemetry.io/v1alpha1
   kind: OpenTelemetryCollector
   metadata:
     name: opentelemetry-example
   spec:
     mode: daemonset
     hostNetwork: true
     image: otel/opentelemetry-collector-contrib
     env:
       - name: DD_API_KEY
         valueFrom:
           secretKeyRef:
             key:  datadog_api_key
             name: opentelemetry-example-otelcol-dd-secret
     config:
       receivers:
         otlp:
           protocols:
             grpc:
             http:
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
       processors:
         k8sattributes:
         batch:
           send_batch_max_size: 100
           send_batch_size: 10
           timeout: 10s
       exporters:
         datadog:
           api:
             key: ${env:DD_API_KEY}
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
           traces:
             receivers: [otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
   ```

[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /es/opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[3]: /es/opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesgateway#4-run-the-collector

{{% /tab %}}
{{< /tabs >}}


### Correlación de logs y trazas

Si utilizas el Exportador de Datadog para enviar también trazas de OpenTelemetry a Datadog, utiliza el operador `trace_parser` para extraer el `trace_id` de cada traza y añadirlo a los logs asociados. Datadog correlaciona automáticamente los logs y trazas relacionados. Consulta [Conectar trazas y logs de OpenTelemetry][18] para obtener más información.

{{< img src="logs/log_collection/logs_traces_correlation.png" alt="El panel de traza que muestra una lista de logs correlacionados con la traza" style="width:70%;">}}

### Resolución de nombres de host

Consulta [Asignación de convenciones semánticas de OpenTelemetry a nombres de host][28] para entender cómo se resuelve el nombre de host.

## Limitaciones basadas en el despliegue

El OpenTelemetry Collector tiene [dos métodos principales de despliegue][20]: Agent y Gateway. Según tu método de despliegue, algunos componentes no están disponibles.

| Modo de despliegue | Métricas de host | Métricas de orquestación de Kubernetes | Trazas | Autoingesta de logs |
| --- | --- | --- | --- | --- |
| como Gateway | | {{< X >}} | {{< X >}} | |
| como Agent | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## Dashboards predefinidos

Datadog proporciona dashboards 'predefinidos' que puedes copiar y personalizar. Para utilizar dashboards de OpenTelemetry predefinidos de Datadog:

1. Instala la [integración de OpenTelemetry][21].
2. Ve a **Dashboards** > **Dashboards list** (Dashboards > Lista de dashboards) y busca `opentelemetry`:

   {{< img src="metrics/otel/dashboard.png" alt="La Lista de dashboards, que muestra dos dashboards predefinidos de OpenTelemetry: métricas de host y métricas de Collector." style="width:80%;">}}

El dashboard **Métricas de host** es para los datos recopilados del [receptor de métricas de host][22]. El dashboard **Métricas de Collector** es para cualquier otro tipo de métricas recopiladas, dependiendo de qué [receptor de métricas][23] elijas habilitar.


### Dashboard de información general de contenedores

<div class="alert alert-info">El dashboard de Información general de contenedores está en fase beta privada. </a>Rellena este formulario</a> para probarlo.</div>

<div class="alert alert-warning">Esta característica se ve afectada por la <a href="/containers/guide/docker-deprecation/">obsolescencia de Docker en Kubernetes</a> y es posible que no puedas utilizar <code>dockerstatsreceiver</code> para OpenTelemetry con Kubernetes versión 1.24+.</div>

El receptor de [Docker Stats][24] genera métricas de contenedor para OpenTelemetry Collector. El exportador de Datadog traduce las métricas de contenedor a sus homólogos de Datadog.

Utiliza la siguiente configuración para habilitar atributos adicionales en el receptor de Docker Stats que rellena el dashboard de información general de contenedores:

```yaml
  docker_stats:
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
```

La versión mínima requerida de OpenTelemetry Collector que admite esta función es la v0.78.0.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://docs.datadoghq.com/es/api/latest/logs/
[7]: https://docs.datadoghq.com/es/api/latest/metrics/#submit-metrics
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
[18]: /es/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: https://docs.datadoghq.com/es/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#service-remapper
[28]: /es/opentelemetry/schema_semantics/hostname/