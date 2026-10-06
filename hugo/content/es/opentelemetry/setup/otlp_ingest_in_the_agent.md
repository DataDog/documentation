---
aliases:
- /es/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /es/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /es/opentelemetry/otlp_ingest_in_the_agent/
- /es/opentelemetry/interoperability/otlp_ingest_in_the_agent/
description: Ingesta de datos de trazas OTLP a través del Datadog Agent
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: Ingesta de OTLP en el Agent
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipos de métricas OTLP
- link: /opentelemetry/runtime_metrics/
  tag: Documentación
  text: Métricas de tiempo de ejecución de OpenTelemetry
title: Ingesta de OTLP por parte del Datadog Agent
---
La ingesta de OTLP en el Agent es una forma de enviar datos de telemetría directamente desde aplicaciones instrumentadas con [OpenTelemetry SDKs][1] al Datadog Agent. Desde las versiones 6.32.0 y 7.32.0, el Datadog Agent puede ingerir trazas OTLP y [métricas OTLP][2] a través de gRPC o HTTP. Desde las versiones 6.48.0 y 7.48.0, el Datadog Agent puede ingerir registros OTLP a través de gRPC o HTTP.

La ingesta de OTLP en el Agent le permite utilizar funciones de observabilidad en el Datadog Agent. Los datos de aplicaciones instrumentadas con OpenTelemetry SDK no pueden utilizarse en algunos productos propietarios de Datadog, como App and API Protection, Continuous Profiler e Ingestion Rules. [Las métricas de tiempo de ejecución de OpenTelemetry son compatibles con algunos lenguajes][10].

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Diagrama: El SDK de OpenTelemetry envía datos a través del protocolo OTLP a un Collector con Datadog Exporter, el cual los reenvía a la plataforma de Datadog." style="width:100%;" >}}

<div class="alert alert-info">Para ver qué funciones de Datadog son compatibles con esta configuración, consulte la <a href="/opentelemetry/compatibility/">tabla de compatibilidad de funciones</a> en <b>OTel to Datadog Agent (OTLP)</b>.</div>

## Configuración inicial {#initial-setup}

Para comenzar, primero [instrumente su aplicación][3] con los SDK de OpenTelemetry. Luego, exporte los datos de telemetría en formato OTLP al Datadog Agent. La configuración de esto varía según el tipo de infraestructura en la que esté implementado su servicio, como se describe en la página a continuación. Aunque el objetivo es ser compatible con la versión más reciente de OTLP, la ingesta de OTLP en el Agent no es compatible con todas las versiones de OTLP. Las versiones de OTLP que son compatibles con el Datadog Agent son aquellas que también son compatibles con el receptor OTLP en el OpenTelemetry Collector. Para verificar las versiones exactas admitidas, verifique la versión `go.opentelemetry.io/collector` en el archivo `go.mod` del Agent.

Lea la documentación de instrumentación de OpenTelemetry para comprender cómo apuntar su instrumentación al Agent. La sección `receiver` descrita a continuación sigue el [esquema de configuración del receptor OTLP de OpenTelemetry Collector][5].

<div class="alert alert-warning">La configuración admitida es un Agent de ingesta implementado en cada servidor que genera datos de OpenTelemetry. No puede enviar telemetría de OpenTelemetry desde colectores o aplicaciones instrumentadas que se ejecutan en un servidor a un Agent en un servidor diferente. Pero, siempre que el Agent sea local para el colector o la aplicación instrumentada con SDK, puede configurar múltiples pipelines.</div>

## Habilitación de la ingesta de OTLP en el Datadog Agent {#enabling-otlp-ingestion-on-the-datadog-agent}

{{< tabs >}}
{{% tab "Servidor" %}}

La ingesta de OTLP está desactivada de forma predeterminada, y puede activarla actualizando la configuración de su archivo `datadog.yaml` o estableciendo variables de entorno. Las siguientes configuraciones de `datadog.yaml` habilitan los puntos de conexión en los puertos predeterminados. Cuando está habilitada, la ingesta de métricas y trazas está activada de forma predeterminada. La ingesta de registros está deshabilitada de forma predeterminada para evitar una facturación inesperada de registros.

{{% otel-endpoint-note %}}

Para gRPC, puerto predeterminado 4317:

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
  logs:
    enabled: false
```
Para HTTP, puerto predeterminado 4318:

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
  logs:
    enabled: false
```

Alternativamente, configure los puntos de conexión proporcionando el puerto a través de las variables de entorno:

- Para gRPC (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- Para HTTP (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

Estos deben pasarse tanto al proceso del Agent principal como al proceso del Agent de trazas. Si se ejecuta en un entorno de contenedor, utilice `0.0.0.0` en lugar de `localhost` para asegurarse de que el servidor esté disponible en interfaces no locales.

Configure gRPC o HTTP para esta función. Aquí tiene [una aplicación de ejemplo que muestra la configuración para ambos][1].

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. Siga la [configuración del Agente de Datadog para Docker][1].

2. Para el contenedor del Agente de Datadog, establezca las siguientes variables de entorno de punto de conexión y exponga el puerto correspondiente:
   - Para gRPC: Establezca `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` en `0.0.0.0:4317` y exponga el puerto `4317`.
   - Para HTTP: Establezca `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` en `0.0.0.0:4318` y exponga el puerto `4318`.

<div class="alert alert-danger">
<strong>Problema conocido</strong>: A partir de la versión 7.61.0 del Agente, las pipelines de ingesta de OTLP pueden fallar al iniciarse en entornos Docker, mostrando el error: <code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code>.<br><br>
Si está utilizando una versión afectada, puede usar una de estas soluciones alternativas:<br><br>
1. Establezca la variable de entorno <code>HOST_PROC</code> a <code>/proc</code> en su contenedor Docker del Agente.<br>
2. Elimine <code>/proc/:/host/proc/:ro</code> de <code>volumes</code> en su contenedor Docker del Agente.<br>
3. Establezca <code>pid</code> a <code>host</code> en su contenedor Docker del Agente.<br><br>
Estas configuraciones se pueden aplicar a través de <code>docker</code> comando o archivo Docker compose.</div>

[1]: /es/agent/docker/
{{% /tab %}}
{{% tab "Datadog Operator" %}}

1.  Siga la [configuración del Agente de Kubernetes][1] para la instalación base.

2.  Habilite el protocolo preferido gRPC o HTTP en el manifiesto `datadog-agent.yaml` de su Operator:

    Para gRPC:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      # (...)
      features:
        otlp:
          receiver:
            protocols:
              grpc:
                enabled: true
    ```
    
    For HTTP:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      # (...)
      features:
        otlp:
          receiver:
            protocols:
              http:
                enabled: true
    ```

{{% k8s-operator-redeploy %}}

Esto habilita cada protocolo en el puerto predeterminado (`4317` para OTLP/gRPC y `4318` para OTLP/HTTP). Las métricas y las trazas están habilitadas de forma predeterminada.

[1]: /es/agent/kubernetes/
{{% /tab %}}
{{% tab "Helm" %}}

1.  Siga la [configuración del Agente de Kubernetes][1] para la instalación base.

2.  Habilite el protocolo preferido gRPC o HTTP en su archivo `datadog-values.yaml` de Helm:

    Para gRPC:
    ```yaml
    datadog:
      # (...)
      otlp:
        receiver:
          protocols:
            grpc:
              enabled: true
    ```

    For HTTP:
    ```yaml
    datadog:
      # (...)
      otlp:
        receiver:
          protocols:
            http:
              enabled: true
    ```

{{% k8s-helm-redeploy %}}

Esto habilita cada protocolo en el puerto predeterminado (`4317` para OTLP/gRPC y `4318` para OTLP/HTTP). Las métricas y las trazas están habilitadas de forma predeterminada.

[1]: /es/agent/kubernetes/
{{% /tab %}}
{{% tab "Manual (Daemonset)" %}}

1.  Siga la [guía de instalación manual de Kubernetes][1] para la instalación base.

2.  Configure las siguientes variables de entorno tanto en el contenedor `trace-agent` como en el contenedor `agent` principal:

    Para gRPC:
    ```yaml
    name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
    value: "0.0.0.0:4317"
    ```

    For HTTP:
    ```yaml
    name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
    value: "0.0.0.0:4318"
    ```

3. Asigne los puertos de contenedor 4317 o 4318 al puerto del servidor para el contenedor `agent` principal:

    Para gRPC:
    ```yaml
    ports:
      - containerPort: 4317
        hostPort: 4317
        name: traceportgrpc
        protocol: TCP
    ```

    For HTTP
    ```yaml
    ports:
      - containerPort: 4318
        hostPort: 4318
        name: traceporthttp
        protocol: TCP
    ```

[1]: /es/containers/guide/kubernetes_daemonset/
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Para obtener instrucciones detalladas sobre el uso de OpenTelemetry con AWS Lambda y Datadog, incluyendo:

- Instrumentación de sus funciones Lambda con OpenTelemetry
- Uso de la compatibilidad con la API de OpenTelemetry en los SDK de Datadog
- Envío de trazas de OpenTelemetry a Datadog Lambda Extension

Consulte la documentación de Serverless para [AWS Lambda y OpenTelemetry][100].

[100]: /es/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

### Habilitación de la ingesta de registros de OTLP {#enabling-otlp-logs-ingestion}

La ingesta de registros de OTLP está deshabilitada de forma predeterminada para evitar facturación inesperada. Para habilitarla, debe activar explícitamente tanto la recopilación de registros como la ingesta de registros de OTLP.

{{< tabs >}}
{{% tab "Servidor" %}}

1. Habilite la recopilación de logs siguiendo la [Host Agent Log collection setup][7]:

   ```yaml
   logs_enabled: true
   ```

2. Establezca `otlp_config.logs.enabled` en true:

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[7]: /es/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

Configure las siguientes variables de entorno en el contenedor del Datadog Agent:

- `DD_LOGS_ENABLED=true`
- `DD_OTLP_CONFIG_LOGS_ENABLED=true`

{{% /tab %}}
{{% tab "Datadog Operator" %}}

En su archivo `datadog-agent.yaml`

```yaml
spec:
  # (...)
  features:
    otlp:
      #(... enable gRPC or HTTP ingestion...)
    logCollection:
      enabled: true
  override:
    nodeAgent:
      containers:
        agent:
          env:
            - name: DD_OTLP_CONFIG_LOGS_ENABLED
              value: "true"
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

En su archivo `datadog-values.yaml`:

```yaml
datadog:
  # (...)
  otlp:
    #(... enable gRPC or HTTP ingestion...)
    logs:
      enabled: true
  logs:
    enabled: true
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{% tab "Manual (Daemonset)" %}}

Configure las siguientes variables de entorno en el contenedor del Agente principal:

```yaml
- name: DD_LOGS_ENABLED
  value: "true"
- name: DD_OTLP_CONFIG_LOGS_ENABLED
  value: "true"
```

Para obtener más información, consulte [recopilación de registros con su DaemonSet][8].

[8]: /es/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}
{{< /tabs >}}

Existen muchas otras variables de entorno y configuraciones compatibles en el Agente de Datadog. Para obtener una descripción general, consulte [Agent configuration files][6].

## Envío de trazas, métricas y registros de OpenTelemetry al Datadog Agent {#sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent}

Después de habilitar la ingesta de OTLP en el Datadog Agent, configure su aplicación instrumentada con OpenTelemetry para exportar datos de telemetría al punto de conexión OTLP del Datadog Agent. Configure la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` en el entorno de su **aplicación** para dirigir los datos al Agent. Sin esta configuración, su aplicación no envía datos de telemetría al Agent, incluso si el receptor OTLP del Agent está habilitado.

{{< tabs >}}
{{% tab "Servidor" %}}
Configure la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` en el entorno de su aplicación:

Para gRPC:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
```

Para HTTP:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
```
{{% /tab %}}

{{% tab "Docker" %}}
1. Para el contenedor de la aplicación, establezca la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` para que apunte al contenedor del Datadog Agent. Por ejemplo:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. Ambos contenedores deben estar definidos en la misma red bridge, lo cual se maneja automáticamente si utiliza Docker Compose. De lo contrario, siga el ejemplo de Docker en [Tracing Docker Applications][1] para configurar una red bridge con los puertos correctos.

[1]: /es/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
En el archivo de despliegue de la aplicación, configure el punto de conexión al que el cliente de OpenTelemetry envía las trazas con la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT`.

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
**Nota**: Para enriquecer las etiquetas de contenedor para métricas personalizadas, establezca los atributos de recurso apropiados en el código de la aplicación donde se generan sus métricas OTLP. Por ejemplo, establezca el atributo de recurso `container.id` utilizando un [detector de recursos][1] de contenedor.

[1]: https://opentelemetry.io/docs/concepts/resources/#resource-detectors
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Al configurar el punto de conexión para enviar trazas, asegúrese de utilizar la ruta correcta requerida por su biblioteca OTLP. Algunas bibliotecas esperan que las trazas se envíen a la <code>/v1/traces</code> ruta, mientras que otras utilizan la ruta raíz <code>/</code>.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /es/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: /es/agent/configuration/agent-configuration-files/
[10]: /es/opentelemetry/runtime_metrics/