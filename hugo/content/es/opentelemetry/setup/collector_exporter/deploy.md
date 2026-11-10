---
aliases:
- /es/opentelemetry/collector_exporter/deployment
further_reading:
- link: /opentelemetry/setup/collector_exporter/datadog_exporter/
  tag: Documentación
  text: Configure el Datadog Exporter y el Connector
- link: https://opentelemetry.io/docs/collector/deployment/
  tag: Sitio externo
  text: Implementación de OpenTelemetry Collector
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: Centro de arquitectura
  text: OpenTelemetry Collector en Kubernetes
title: Implemente el OpenTelemetry Collector con el Datadog Exporter
---
Esta página lo guía a través de varias opciones de implementación para el OpenTelemetry Collector con el Datadog Exporter, lo que le permite enviar trazas, métricas y registros a Datadog.

## Implemente el Collector {#deploy-the-collector}

El OpenTelemetry Collector se puede implementar en varios entornos para adaptarse a diferentes necesidades de infraestructura. Esta sección cubre las siguientes opciones de implementación:

- [En un servidor](#on-a-host)
- [Docker](#docker)
- [Kubernetes](#kubernetes)

Es importante tener en cuenta que ciertas características y capacidades pueden variar según el método de implementación. Para obtener una descripción detallada de estas diferencias, consulte [Limitaciones basadas en la implementación](#deployment-based-limitations).

Elija la opción de implementación que mejor se adapte a su infraestructura y complete las siguientes instrucciones.

### En un servidor {#on-a-host}

Ejecute el Collector, especificando el archivo de configuración mediante el parámetro `--config`:

```shell
otelcontribcol_linux_amd64 --config collector.yaml
```

### Docker {#docker}

{{< tabs >}}
{{% tab "localhost" %}}
Para ejecutar el OpenTelemetry Collector como una imagen de Docker y recibir trazas desde el mismo servidor:

1. Elija una imagen de Docker publicada, como [`otel/opentelemetry-collector-contrib`][1].

2. Determine qué puertos abrir en su contenedor para que las trazas de OpenTelemetry se envíen al OpenTelemetry Collector. De forma predeterminada, las trazas se envían a través de gRPC en el puerto 4317. Si no usa gRPC, utilice el puerto 4318.

3. Ejecute el contenedor y exponga el puerto necesario, utilizando el archivo `collector.yaml`. Por ejemplo, si está usando el puerto 4317:

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
{{% /tab %}}
{{% tab "Otros contenedores" %}}

Para ejecutar el OpenTelemetry Collector como una imagen de Docker y recibir trazas de otros contenedores:

1. Cree una red de Docker:

    ```
    docker network create <NETWORK_NAME>
    ```

2. Ejecute el OpenTelemetry Collector y los contenedores de la aplicación como parte de la misma red.

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

   Al ejecutar el contenedor de la aplicación, asegúrese de que la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` esté configurada para usar el nombre de servidor apropiado para el OpenTelemetry Collector. En el ejemplo a continuación, esto es `opentelemetry-collector`.

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

### Kubernetes {#kubernetes}

{{< tabs >}}
{{% tab "DaemonSet" %}}

El uso de un DaemonSet es la forma más común y recomendada de configurar la recolección de OpenTelemetry en un entorno de Kubernetes. Para implementar el OpenTelemetry Collector y el Datadog Exporter en una infraestructura de Kubernetes:

1. Utilice esta [configuración de ejemplo][1], incluida la configuración de la aplicación, para configurar el OpenTelemetry Collector con el Datadog Exporter como un DaemonSet.
2. Asegúrese de que los puertos esenciales para el DaemonSet estén expuestos y sean accesibles para su aplicación. Las siguientes opciones de configuración [del ejemplo][2] definen estos puertos:
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
   <div class="alert alert-info">Si su aplicación no requiere tanto HTTP como gRPC, elimine los puertos no utilizados de la configuración.</div>

1. Para recopilar atributos valiosos de Kubernetes, que se utilizan para el etiquetado de contenedores de Datadog, informe la IP del Pod como un atributo de recurso, [como se muestra en el ejemplo][3]:

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

   Esto garantiza que el [Procesador de atributos de Kubernetes][4], que se utiliza en [el mapa de configuración][5], pueda extraer los metadatos necesarios para adjuntarlos a las trazas. Existen [roles][6] adicionales que deben establecerse para permitir el acceso a estos metadatos. [El ejemplo][1] está completo, listo para usarse y tiene los roles correctos configurados.
  
1. Configure su [contenedor de aplicación][7] para usar el nombre de host del punto de conexión OTLP correcto. Dado que el OpenTelemetry Collector se ejecuta como un DaemonSet, se debe apuntar al servidor actual. Configure la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` de su contenedor de aplicación según corresponda, como en el [gráfico de ejemplo][8]:

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
   
  1. Configure la recopilación de metadatos del servidor para garantizar información precisa del servidor. Configure su DaemonSet para recopilar y reenviar metadatos del servidor:

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

   Esta configuración recopila metadatos del servidor usando el procesador `resourcedetection`, agrega metadatos de Kubernetes con el procesador `k8sattributes` y establece el atributo `datadog.host.use_as_metadata` en `true`. Para obtener más información, consulte [Asignación de convenciones semánticas de OpenTelemetry a la información del servidor de listar infraestructura][9].


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

Para implementar el OpenTelemetry Collector y el Datadog Exporter en una implementación de Kubernetes Gateway:

1. Utilice esta [configuración de ejemplo][1], incluida la configuración de la aplicación, para configurar el OpenTelemetry Collector con el Datadog Exporter como un DaemonSet.
2. Asegúrese de que los puertos esenciales para el DaemonSet estén expuestos y sean accesibles para su aplicación. Las siguientes opciones de configuración [del ejemplo][2] definen estos puertos:
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
   <div class="alert alert-info">Si su aplicación no requiere tanto HTTP como gRPC, elimine los puertos no utilizados de la configuración.</div>

1. Para recopilar atributos valiosos de Kubernetes, que se utilizan para el etiquetado de contenedores de Datadog, informe la IP del Pod como un atributo de recurso, [como se muestra en el ejemplo][3]:

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

   Esto garantiza que el [Procesador de atributos de Kubernetes][4], que se utiliza en [el mapa de configuración][5], pueda extraer los metadatos necesarios para adjuntarlos a las trazas. Existen [roles][6] adicionales que deben establecerse para permitir el acceso a estos metadatos. [El ejemplo][1] está completo, listo para usarse y tiene los roles correctos configurados.
  
1. Configure su [contenedor de aplicación][7] para usar el nombre de host del punto de conexión OTLP correcto. Dado que el OpenTelemetry Collector se ejecuta como un DaemonSet, se debe apuntar al servidor actual. Configure la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` de su contenedor de aplicación según corresponda, como en el [gráfico de ejemplo][8]:

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

1. Cambie el DaemonSet para incluir un [exportador OTLP][9] en lugar del exportador de Datadog [actualmente en uso][10]:

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

1. Asegúrese de que las canalizaciones de servicio utilicen este exportador, en lugar del de Datadog que [está en uso en el ejemplo][11]:

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

   Esto garantiza que cada Agent reenvíe sus datos a través del protocolo OTLP al Collector Gateway. 

1. Reemplace `<GATEWAY_HOSTNAME>` con la dirección de su Gateway Collector de OpenTelemetry.

1. Configure el [`k8sattributes` procesador][12] para reenviar la IP del Pod al Gateway Collector para que pueda obtener los metadatos:

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   Para obtener más información sobre la opción `passthrough`, lea [su documentación][13].

1. Asegúrese de que la configuración del Collector Gateway utilice la misma configuración del exportador de Datadog que ha sido reemplazada por el exportador OTLP en los Agent. Por ejemplo (donde `<DD_SITE>` es su sitio, {{< region-param key="dd_site" code="true" >}}):

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```
1. Configure la recopilación de metadatos del servidor:
   En una implementación de gateway, debe asegurarse de que los metadatos del servidor sean recopilados por los Agent Collector y preservados por el Gateway Collector. Esto garantiza que los metadatos del servidor sean recopilados por los agentes y reenviados correctamente a través del gateway a Datadog.  
   Para obtener más información, consulte [Asignación de convenciones semánticas de OpenTelemetry a la información del servidor de la lista de infraestructura][14].

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

   **Configuración del Gateway Collector**:

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
{{% tab "Operador" %}}

Para usar el OpenTelemetry Operator, siga la [documentación oficial para implementar el OpenTelemetry Operator][1]. Como se describe allí, implemente el administrador de certificados además del OpenTelemetry Operator.

Configure el OpenTelemetry Operator utilizando una de las configuraciones estándar de Kubernetes del OpenTelemetry Collector:
* [Implementación de DaemonSet][2] - Utilice la implementación de DaemonSet si desea asegurarse de recibir métricas de servidor. 
* [Implementación de Gateway][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /es/opentelemetry/collector_exporter/deployment/?tab=daemonset#kubernetes
[3]: /es/opentelemetry/collector_exporter/deployment/?tab=gateway#kubernetes
{{% /tab %}}

{{< /tabs >}}


## Resolución de nombre de servidor {#hostname-resolution}

Consulte [Asignación de convenciones semánticas de OpenTelemetry a nombres de servidor][25] para comprender cómo se resuelve el nombre de servidor.

## Limitaciones basadas en la implementación {#deployment-based-limitations}

El Colector de OpenTelemetry tiene [dos métodos de implementación principales][20]: Agent y Gateway. Dependiendo de su método de implementación, los siguientes componentes están disponibles:

| Modo de implementación | Métricas de servidor | Métricas de orquestación de Kubernetes | Trazas | Ingesta automática de registros |
| --- | --- | --- | --- | --- |
| como Gateway | | {{< X >}} | {{< X >}} | |
| como Agent | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## Lecturas adicionales {#further-reading}

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