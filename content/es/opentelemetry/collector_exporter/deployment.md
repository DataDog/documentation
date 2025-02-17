---
further_reading:
- link: /opentelemetry/collector_exporter/configuration/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
- link: https://opentelemetry.io/docs/collector/deployment/
  tag: Sitio externo
  text: Despliegue de OpenTelemetry Collector
title: Implementación
---

Esta página te guía a través de varias opciones de implementación para OpenTelemetry Collector con el Exportador Datadog, que te permite enviar trazas (traces), métricas, y logs a Datadog.

## Descargar el Collector

Para ejecutar OpenTelemetry Collector junto con el Exportador de Datadog, descarga la última versión de [la distribución de OpenTelemetry Collector Contrib][3]. 

## Implementar el Collector

El OpenTelemetry Collector se puede implementar en varios entornos para adaptarse a diferentes necesidades de infraestructura. Esta sección cubre las siguientes opciones de implementación:

- [En un host](#on-a-host)
- [Docker](#docker)
- [Kubernetes](#kubernetes)

Es importante tener en cuenta que determinadas funciones y capacidades pueden variar en función del método de implementación. Para obtener una descripción detallada de estas diferencias, consulta las [Limitaciones basadas en la implementación](#deployment-based-limitations).

Elige la opción de implementación que mejor se adapte a tu infraestructura y completa las siguientes instrucciones.

### En un host

Ejecuta el programa Collector, especificando el archivo de configuración mediante el parámetro `--config`:

```shell
otelcontribcol_linux_amd64 --config collector.yaml
```

### Docker

{{< tabs >}}
{{% tab "localhost" %}}
Para ejecutar el OpenTelemetry Collector como una imagen de Docker y recibir trazas (traces) desde el mismo host:

1. Elige una imagen de Docker publicada, como [`otel/opentelemetry-collector-contrib`][1].

2. Determina qué puertos abrir en tu contenedor para que las trazas de OpenTelemetry se envíen al OpenTelemetry Collector. Por defecto, las trazas se envían a través de gRPC en el puerto 4317. Si no utilizas gRPC, utiliza el puerto 4318.

3. Ejecuta el contenedor y expone el puerto necesario, con el archivo `collector.yaml`. Por ejemplo, si estás utilizando el puerto 4317:

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
{{% /tab %}}
{{% tab "Other containers" %}}

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

   Al ejecutar la aplicación de contenedor, asegúrate de que la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` esté configurada para utilizar el nombre de host apropiado para el OpenTelemetry Collector. En el ejemplo siguiente, se trata de `opentelemetry-collector`.

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{{% /tab %}}
{{< /tabs >}}

### Kubernetes

{{< tabs >}}
{{% tab "DaemonSet" %}}

El uso de un DaemonSet es la forma más común y recomendada de configurar la recopilación de OpenTelemetry en un entorno de Kubernetes. Para desplegar el OpenTelemetry Collector y el Exportador de Datadog en una infraestructura de Kubernetes:

1. Utiliza esta [configuración del ejemplo][1], incluida la configuración de la aplicación, para configurar OpenTelemetry Collector con el Exportador de Datadog como DaemonSet.
2. Asegúrate de que los puertos esenciales para el DaemonSet estén expuestos y accesibles para tu aplicación. Las siguientes opciones de configuración [del ejemplo][2] definen estos puertos:
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
   <div class="alert alert-info">Si tu aplicación no requiere HTTP ni gRPC, elimina los puertos no utilizados de la configuración.</div>

1. Para recopilar valiosos atributos de Kubernetes, que se utilizan para el etiquetado del contenedor de Datadog, informa la IP del pod como atributo de recurso, [como se muestra en el ejemplo][3]:

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

   Esto asegura que [Kubernetes Attributes Processor][4], que se utiliza en [el mapa de configuración][5], sea capaz de extraer los metadatos necesarios para adjuntar a trazas (traces). Hay [roles][6] adicionales que se deben configurar para permitir el acceso a estos metadatos. [El ejemplo][1] está completo, listo para usar y tiene configurados los roles correctos.

1. Configura tu [contenedor de la aplicación][7] para utilizar el nombre correcto del host del endpoint de OTLP. Dado que el OpenTelemetry Collector se ejecuta como un DaemonSet, se debe seleccionar el host actual. Ejecuta la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` de tu contenedor de la aplicación en consecuencia, como en el [gráfico del ejemplo][8]:

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

  1. Configura la recopilación de metadatos del host para garantizar la exactitud de la información del host. Configura tu DaemonSet para recopilar y reenviar metadatos del host:

     ```yaml
     processors:
       resourcedetection:
         detectors: [system, env]
       k8sattributes:
         # existing k8sattributes config
       transform:
         trace_statements:
           - context: resource
             statements:
               - set(attributes["datadog.host.use_as_metadata"], true)
     ...
     service:
       pipelines:
         traces:
           receivers: [otlp]
           processors: [resourcedetection, k8sattributes, transform, batch]
           exporters: [datadog]
     ```

   Esta configuración recopila metadatos del host utilizando el procesador `resourcedetection`, añade metadatos de Kubernetes con el procesador `k8sattributes` y configura el atributo `datadog.host.use_as_metadata` en `true`. Para obtener más información, consulta [Asignar las convenciones semánticas de OpenTelemetry a la información del host de la lista de infraestructuras][9].


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39
[9]: /es/opentelemetry/schema_semantics/host_metadata/


{{% /tab %}}
{{% tab "Gateway" %}}

Para desplegar OpenTelemetry Collector y el Exportador de Datadog en un despliegue de Kubernetes Gateway:

1. Utiliza esta [configuración del ejemplo][1], incluida la configuración de la aplicación, para configurar OpenTelemetry Collector con el Exportador de Datadog como DaemonSet.
2. Asegúrate de que los puertos esenciales para el DaemonSet estén expuestos y accesibles para tu aplicación. Las siguientes opciones de configuración [del ejemplo][2] definen estos puertos:
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
   <div class="alert alert-info">Si tu aplicación no requiere HTTP ni gRPC, elimina los puertos no utilizados de la configuración.</div>

1. Para recopilar valiosos atributos de Kubernetes, que se utilizan para el etiquetado del contenedor de Datadog, informa la IP del pod como atributo de recurso, [como se muestra en el ejemplo][3]:

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

   Esto asegura que [Kubernetes Attributes Processor][4], que se utiliza en [el mapa de configuración][5], sea capaz de extraer los metadatos necesarios para adjuntar a trazas (traces). Hay [roles][6] adicionales que se deben configurar para permitir el acceso a estos metadatos. [El ejemplo][1] está completo, listo para usar y tiene configurados los roles correctos.

1. Configura tu [contenedor de la aplicación][7] para utilizar el nombre correcto del host del endpoint de OTLP. Dado que el OpenTelemetry Collector se ejecuta como un DaemonSet, se debe seleccionar el host actual. Configura la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` de tu contenedor de la aplicación en consecuencia, como en el [gráfico del ejemplo][8]:

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

1. Cambia el DaemonSet para incluir un [exportador OTLP][9] en lugar del Exportador de Datadog [actualmente en su lugar][10]:

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

1. Asegúrate de que los pipelines de servicio utilizan este exportador, en lugar del de Datadog que [está en el ejemplo][11]:

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

   Esto asegura que cada Agent reenvíe sus datos a través del protocolo OTLP a la gateway de Collector. 

1. Sustituye `<GATEWAY_HOSTNAME>` por la dirección de tu puerta enlace de OpenTelemetry Collector.

1. Configura el [procesador `k8sattributes`][12] para reenviar la IP del pod al Collector de puertas de enlace, de manera tal que pueda obtener los metadatos:

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   Para más información sobre la opción `passthrough`, lee [su documentación][13].

1. Asegúrate de que la configuración de la gateway de Collector utiliza la misma configuración del exportador de Datadog que ha sido sustituida por el exportador OTLP en el Agent. Por ejemplo (donde `<DD_SITE>` es tu sitio, {{< region-param key="dd_site" code="true" >}}):

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```
1. Configura la recopilación de metadatos del host:
   En una implementación de puerta de enlace, debes asegurarte de que los recopiladores del Agent recopilen los metadatos del host y que el recopilador de puertas de enlace los conserve. Esto garantiza que los agentes recopilen los metadatos del host y que se reenvíen correctamente a través de la puerta de enlace a Datadog. 
   Para obtener más información, consulta [Asignar convenciones semánticas de OpenTelemetry a la información del host de la lista de infraestructuras][14].

   **Configuración del Agent Collector**:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true

   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [resourcedetection, k8sattributes, transform, batch]
         exporters: [otlp]
   ```

   **Configuración del recopilador de puertas de enlace**:

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]

   exporters:
     datadog:
       api:
         key: ${DD_API_KEY}
       hostname_source: resource_attribute

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [k8sattributes, batch]
         exporters: [datadog]
   ```

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L56-L59
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L136-L148
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L69
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#as-a-gateway
[14]: /es/opentelemetry/schema_semantics/host_metadata/

{{% /tab %}}
{{% tab "Operator" %}}

Para utilizar el OpenTelemetry Operator, sigue la [documentación oficial para desplegar el OpenTelemetry Operator][1]. Como se describe allí, despliega el gestor de certificados, además del Operator.

Configura el Operator utilizando una de las configuraciones estándar de Kubernetes en OpenTelemetry Collector:
* [Despliegue de DaemonSet][2]: utiliza el despliegue de DaemonSet si deseas asegurarte de recibir métricas de host.
* [Despliegue de la gateway][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /es/opentelemetry/collector_exporter/deployment/?tab=daemonset#kubernetes
[3]: /es/opentelemetry/collector_exporter/deployment/?tab=gateway#kubernetes
{{% /tab %}}

{{< /tabs >}}


## Resolución de nombres de host

Consulta [Asignación de convenciones semánticas de OpenTelemetry a nombres de host][25] para entender cómo se resuelve el nombre de host.

## Limitaciones basadas en el despliegue

El OpenTelemetry Collector tiene [dos métodos principales de despliegue][20]: Agent y Gateway. Según tu método de despliegue, los siguientes componentes están disponibles:

| Modo de despliegue | Métricas de host | Métricas de orquestación de Kubernetes | Trazas | Autoingesta de logs |
| --- | --- | --- | --- | --- |
| como Gateway | | {{< X >}} | {{< X >}} | |
| como Agent | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[18]: /es/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[25]: /es/opentelemetry/schema_semantics/hostname/