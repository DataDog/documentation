---
aliases:
- /tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /opentelemetry/otlp_ingest_in_the_agent/
description: Ingesta de datos de traza OTLP a través del Datadog Agent
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: Ingesta OTLP en el Agent
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipo de métricas OTLP
- link: /opentelemetry/runtime_metrics/
  tag: Documentación
  text: Métricas de tiempo de ejecución de OpenTelemetry
title: Ingesta OTLP por el Datadog Agent
---


La ingesta OTLP en el Agent es una forma de enviar datos de telemetría directamente desde aplicaciones instrumentadas con [SDKs de OpenTelemetry][1] al Datadog Agent. Desde las versiones 6.32.0 y 7.32.0, el Datadog Agent puede ingerir trazas (traces) OTLP y [métricas OTLP][2] a través de gRPC o HTTP. Desde las versiones 6.48.0 y 7.48.0, el Datadog Agent puede ingerir logs OTLP a través de gRPC o HTTP.

La ingesta OTLP en el Agent te permite utilizar características de observabilidad en el Datadog Agent. Los datos de las aplicaciones instrumentadas con SDK de OpenTelemetry no pueden ser utilizados en algunos productos propiedad de Datadog, tales como Application Security Management, Continuous Profiler e Ingestion Rules. [Las métricas de tiempo de ejecución de OpenTelemetry son compatibles con algunos lenguajes][10].

Para empezar, primero [instrumentas tu aplicación][3] con SDKs de OpenTelemetry. A continuación, exportas los datos de telemetría en formato OTLP al Datadog Agent. La configuración de esto varía en función del tipo de infraestructura en la que se despliega tu servicio, como se describe en la página siguiente. Aunque el objetivo es ser compatible con la última versión de OTLP, la ingesta OTLP en el Agent no es compatible con todas las versiones de OTLP. Las versiones de OTLP que son compatible con el Datadog Agent son las que también son compatibles con el receptor OTLP en el OpenTelemetry Collector. Para verificar las versiones exactas compatibles, comprueba la versión `go.opentelemetry.io/collector` en el archivo `go.mod` del Agent.

Lea la documentación de instrumentación de OpenTelemetry para entender cómo dirigir tu instrumentación al Agent. La sección `receiver` descrita a continuación sigue el [esquema de configuración del receptor OTLP de OpenTelemetry Collector][5].

{{< img src="metrics/otel/otlp_ingestion_update.png" alt="Bibliotecas/SDKs de OTel, biblioteca de rastreo de Datadog, integraciones de Datadog -> Datadog Agent -> Datadog" style="width:100%;">}}

<div class="alert alert-warning"><strong>Nota</strong>: La configuración admitida es una ingesta desde el Agent desplegado en cada host que genera datos de OpenTelemetry. No se puede enviar telemetría de OpenTelemetry desde recopiladores o aplicaciones instrumentadas que ejecutan un host en un Agent en un host diferente. Pero, siempre que el Agent sea local del recopilador o aplicación instrumentada por SDK, puedes configurar múltiples pipelines.</div>

## Activación de la ingesta OTLP en el Datadog Agent

{{< tabs >}}
{{% tab "Host" %}}

La ingesta OTLP está desactivada por defecto, y puedes activarla actualizando la configuración de tu archivo `datadog.yaml` o estableciendo las variables de entorno. Las siguientes configuraciones de `datadog.yaml` habilitan endpoints en los puertos por defecto.

Para gRPC, puerto por defecto 4317:

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: localhost:4317
```
Para HTTP, puerto por defecto 4318:

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: localhost:4318
```

Alternativamente, configura los endpoints proporcionando el puerto a través de las variables de entorno:

- Para gRPC (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- Para HTTP (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

Estos deben pasarse tanto a los procesos centrales del Agent como los del Trace Agent. Si se ejecuta en un entorno contenedorizado, utiliza `0.0.0.0` en lugar de `localhost` para garantizar que el servidor esté disponible en interfaces no locales.

Configura ya sea gRPC o HTTP para esta función. Aquí hay [una aplicación de ejemplo que muestra la configuración para ambos][1].

La ingesta OTLP de logs en el Datadog Agent está desactivada por defecto para que no se produzca un uso inesperado de logs que pueda afectar tu facturación. Para habilitar la ingesta OTLP de logs:

1. Habilita explícitamente la recopilación de logs en su conjunto siguiendo [la configuración de la recopilación de logs del Host Agent][2]:

   ```yaml
   logs_enabled: true
   ```

2. Establece `otlp_config.logs.enabled` en true:

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
[2]: /es/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

1. Sigue la [configuración del Datadog Docker Agent][1].

2. Para el contenedor del Datadog Agent, establece las siguientes variables de entorno de endpoint y expone el puerto correspondiente:
   - Para gRPC: establece `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` en `0.0.0.0:4317` y expone el puerto `4317`.
   - Para HTTP: establece `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` en `0.0.0.0:4318` y expone el puerto `4318`.

3. Si deseas habilitar la ingesta OTLP de logs, configura las siguientes variables de entorno de endpoint en el contenedor del Datadog Agent:
   - Establece `DD_LOGS_ENABLED` en true.
   - Establece `DD_OTLP_CONFIG_LOGS_ENABLED` en true.

[1]: /es/agent/docker/
{{% /tab %}}
{{% tab "Kubernetes (Daemonset)" %}}

1. Sigue la [configuración de Kubernetes Agent[1].

2. Configura las siguientes variables de entorno tanto en el contenedor del Trace Agent como en el contenedor principal del Agent:

   Para gRPC:
   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
   value: "0.0.0.0:4317"
   ```

   Para HTTP:
   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
   value: "0.0.0.0:4318"
   ```
3. Asigna los puertos de contenedor 4317 o 4318 al puerto host para el contenedor principal del Agent:

   Para gRPC:
   ```
   ports:
     - containerPort: 4317
       hostPort: 4317
       name: traceportgrpc
       protocol: TCP
   ```

   Para HTTP
   ```
   ports:
     - containerPort: 4318
       hostPort: 4318
       name: traceporthttp
       protocol: TCP
   ```

4. Si deseas habilitar la ingesta OTLP de logs, configura las siguientes variables de entorno de endpoint en el contenedor principal del Agent:

   Habilita [la recopilación de logs con tu DaemonSet][2]:
   ```
   name: DD_LOGS_ENABLED
   value: "true"
   ```

   Y activa la ingesta OTLP de logs:
   ```
   name: DD_OTLP_CONFIG_LOGS_ENABLED
   value: "true"
   ```

[1]: /es/agent/kubernetes/?tab=daemonset
[2]: /es/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}

{{% tab "Kubernetes (Helm) - values.yaml" %}}

1. Sigue la [configuración de Kubernetes Agent[1].

2. Habilita los endpoints OTLP en el Agent editando la sección `datadog.otlp` del archivo `values.yaml`:

   Para gRPC:
   ```
   otlp:
    receiver:
      protocols:
        grpc:
          enabled: true
   ```

   Para HTTP:
   ```
   otlp:
    receiver:
      protocols:
        http:
          enabled: true
   ```

Esto habilita cada protocolo en el puerto por defecto (`4317` para OTLP/gRPC y `4318` para OTLP/HTTP).


[1]: /es/agent/kubernetes/?tab=helm
{{% /tab %}}

{{% tab "Kubernetes (Helm) - set" %}}

1. Sigue la [configuración de Kubernetes Agent[1].

2. Activa el protocolo preferido:

   Para gRPC:
   ```
   --set "datadog.otlp.receiver.protocols.grpc.enabled=true"
   ```
   Para HTTP:
   ```
   --set "datadog.otlp.receiver.protocols.http.enabled=true"
   ```

Esto habilita cada protocolo en el puerto por defecto (`4317` para OTLP/gRPC y `4318` para OTLP/HTTP).

[1]: /es/agent/kubernetes/?tab=helm
{{% /tab %}}
{{< /tabs >}}

Hay muchas otras variables y configuraciones de entorno compatibles con el Datadog Agent. Para obtener información general de todas ellas, consulte [la plantilla de configuración][6].

## Envío de trazas, métricas y logs de OpenTelemetry al Datadog Agent

{{< tabs >}}
{{% tab "Docker" %}}
1. Para el contenedor de la aplicación, configura la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` para que apunte al contenedor del Datadog Agent. Por ejemplo:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. Ambos contenedores deben estar definidos en el mismo puente red, que se gestiona automáticamente si utilizas Docker Compose. De lo contrario, sigue el ejemplo de Docker en [Rastreo de aplicaciones Docker][1] para configurar un puente red con los puertos correctos.

[1]: /es/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
En el archivo de despliegue de la aplicación, configura el endpoint al que el cliente de OpenTelemetry envía trazas con la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT`.

Para gRPC:
```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4317" # sends to gRPC receiver on port 4317
```

Para HTTP:
```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4318" # sends to HTTP receiver on port 4318
```
**Nota**: Para mejorar las etiquetas (tags) de contenedor para métricas personalizadas, establece los atributos de recurso apropiados en el código de la aplicación donde se generan tus métricas OTLP. Por ejemplo, establece el atributo de recurso `container.id` en el UID del pod.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Cuando configures el endpoint para enviar trazas, asegúrate de utilizar la ruta correcta que pide tu biblioteca OTLP. Algunas bibliotecas esperan que las trazas se envíen a la ruta <code>/v1/traces</code>, mientras que otros utilizan la ruta raíz <code>/</code>.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /es/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[10]: /es/opentelemetry/runtime_metrics/