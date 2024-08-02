---
further_reading:
- link: /opentelemetry/collector_exporter/configuration/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
- link: https://opentelemetry.io/docs/collector/deployment/
  tag: Sitio externo
  text: Despliegue de OpenTelemetry Collector
title: Despliegue
---

## Descargar el Collector

Para ejecutar OpenTelemetry Collector junto con el Exportador de Datadog, descarga la última versión de [la distribución de OpenTelemetry Collector Contrib][3]. 

## Ejecución del Collector

{{< tabs >}}
{{% tab "En un host" %}}

Ejecuta el Collector, especificando el archivo de configuración mediante el parámetro `--config`:

```
otelcontribcol_linux_amd64 --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker (host local)" %}}
Para ejecutar el OpenTelemetry Collector como una imagen de Docker y recibir trazas (traces) del mismo host:

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

   [Algunas opciones de configuración en el ejemplo][2] (repetidas más abajo) aseguran que los puertos esenciales del DaemonSet están expuestos y accesibles a tu aplicación:

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

   Si no necesitas los puertos HTTP estándar y gRPC para tu aplicación, puedes eliminar las opciones correspondientes de configuración.

2. Para recopilar valiosos atributos de Kubernetes, que se utilizan para el etiquetado del contenedor de Datadog, informa la IP del pod como atributo de recurso, [como se muestra en el ejemplo][3]:

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


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39

{{% /tab %}}
{{% tab "Kubernetes (Gateway)" %}}

Para desplegar OpenTelemetry Collector y el Exportador de Datadog en un despliegue de Kubernetes Gateway

1. Utiliza este [ejemplo completo de configuración de OpenTelemetry Collector con el Exportador de Datadog como DaemonSet][1], incluyendo el ejemplo de configuración de la aplicación.

   [Algunas opciones de configuración en el ejemplo][2] (repetidas más abajo) aseguran que los puertos esenciales del DaemonSet están expuestos y accesibles a tu aplicación:

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

   Si no necesitas los puertos HTTP estándar y gRPC para tu aplicación, puedes eliminar las opciones correspondientes de configuración.

2. Para recopilar valiosos atributos de Kubernetes, que se utilizan para el etiquetado del contenedor de Datadog, informa la IP del pod como atributo de recurso, [como se muestra en el ejemplo][3]:

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

   Esto asegura que cada Agent reenvíe sus datos a través del protocolo OTLP a la gateway de Collector. 

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

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

Para utilizar el OpenTelemetry Operator, sigue la [documentación oficial para desplegar el OpenTelemetry Operator][1]. Como se describe allí, despliega el gestor de certificados, además del Operator.

Configura el Operator utilizando una de las configuraciones estándar de Kubernetes en OpenTelemetry Collector:
* [Despliegue de DaemonSet][2]: utiliza el despliegue de DaemonSet si deseas asegurarte de recibir métricas de host.
* [Despliegue de la gateway][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /es/opentelemetry/collector_exporter/?tab=kubernetesdaemonset#running-the-collector
[3]: /es/opentelemetry/collector_exporter/?tab=kubernetesgateway#running-the-collector
{{% /tab %}}

{{< /tabs >}}


### Resolución de nombres de host

Consulta [Asignación de convenciones semánticas de OpenTelemetry a nombres de host][25] para entender cómo se resuelve el nombre de host.

## Limitaciones basadas en el despliegue

El OpenTelemetry Collector tiene [dos métodos principales de despliegue][20]: Agent y Gateway. Según tu método de despliegue, los siguientes componentes están disponibles:

| Modo de despliegue | Métricas de host | Métricas de orquestación de Kubernetes | Trazas  | Autoingesta de logs |
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