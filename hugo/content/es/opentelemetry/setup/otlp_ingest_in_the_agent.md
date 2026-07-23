---
aliases:
- /es/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /es/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /es/opentelemetry/otlp_ingest_in_the_agent/
- /es/opentelemetry/interoperability/otlp_ingest_in_the_agent/
description: Ingiere datos de trazas OTLP a través del Datadog Agent
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: Ingesta de OTLP en el Agente
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipos de Métricas OTLP
- link: /opentelemetry/runtime_metrics/
  tag: Documentación
  text: Métricas de Runtime de OpenTelemetry
title: Ingesta de OTLP a través del Datadog Agent
---
La ingesta de OTLP en el Datadog Agent es una forma de enviar datos de telemetría directamente desde aplicaciones instrumentadas con [OpenTelemetry SDKs][1] al Datadog Agent. Desde las versiones 6.32.0 y 7.32.0, el Datadog Agent puede ingerir trazas OTLP y [métricas OTLP][2] a través de gRPC o HTTP. Desde las versiones 6.48.0 y 7.48.0, el Datadog Agent puede ingerir registros OTLP a través de gRPC o HTTP.

La ingesta de OTLP en el Datadog Agent le permite utilizar características de observabilidad en el Datadog Agent. Los datos de aplicaciones instrumentadas con OpenTelemetry SDK no pueden utilizarse en algunos productos propietarios de Datadog, como App and API Protection, Continuous Profiler y reglas de ingesta. [Las Métricas de Runtime de OpenTelemetry son compatibles con algunos lenguajes][10].

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Diagrama: OpenTelemetry SDK envía datos a través del protocolo OTLP a un Collector con el Exportador de Datadog, que reenvía a la plataforma de Datadog." style="width:100%;" >}}

<div class="alert alert-info">Para ver qué características de Datadog son compatibles con esta configuración, consulte la <a href="/opentelemetry/compatibility/">tabla de compatibilidad de características</a> bajo <b>OTel a Datadog Agent (OTLP)</b>.</div>

## Configuración inicial {#initial-setup}

Para comenzar, primero [instrumenta tu aplicación][3] con OpenTelemetry SDKs. Luego, exporta los datos de telemetría en formato OTLP al Datadog Agent. Configurar esto varía dependiendo del tipo de infraestructura en la que tu servicio esté desplegado, como se describe en la página a continuación. Aunque el objetivo es ser compatible con la última versión de OTLP, la ingesta de OTLP en el Datadog Agent no es compatible con todas las versiones de OTLP. Las versiones de OTLP que son compatibles con el Datadog Agent son aquellas que también son soportadas por el receptor de OTLP en el OpenTelemetry Collector. Para verificar las versiones exactas soportadas, consulta la `go.opentelemetry.io/collector`versión en el archivo `go.mod` del Datadog Agent.

Lee la documentación de instrumentación de OpenTelemetry para entender cómo apuntar tu instrumentación al Datadog Agent. La sección `receiver` descrita a continuación sigue el esquema de configuración del receptor OTLP del [OpenTelemetry Collector][5].

<div class="alert alert-warning">La configuración soportada es un agente de ingesta desplegado en cada servidor que genera datos de OpenTelemetry. No puedes enviar telemetría de OpenTelemetry desde recolectores o aplicaciones instrumentadas que se ejecutan en un host a un Agente en un host diferente. Sin embargo, siempre que el Datadog Agent sea local al recolector o a la aplicación instrumentada con el SDK, puedes configurar múltiples pipelines.</div>

## Habilitando la ingesta de OTLP en el Datadog Agent {#enabling-otlp-ingestion-on-the-datadog-agent}

{{< tabs >}}
{{% tab "Servidor" %}}

La ingesta de OTLP está desactivada por defecto, y puedes activarla actualizando la configuración de tu archivo `datadog.yaml` o estableciendo variables de entorno. Las siguientes configuraciones `datadog.yaml` habilitan puntos de conexión en los puertos predeterminados. Cuando está habilitada, la ingesta de métricas y trazas está activada por defecto. La ingesta de registros está desactivada por defecto para evitar facturación inesperada de registros.

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

Alternativamente, configura los puntos de conexión proporcionando el puerto a través de las variables de entorno:

- Para gRPC (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- Para HTTP (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

Estos deben pasarse tanto a los procesos del Datadog Agent central como al del Datadog Agent de trazas. Si se ejecuta en un entorno de contenedor, utiliza `0.0.0.0` en lugar de `localhost` para asegurar que el servidor esté disponible en interfaces no locales.

Configura gRPC o HTTP para esta función. Aquí hay [una aplicación de ejemplo que muestra la configuración para ambos][1].

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. Sigue la [configuración del Datadog Docker Agent][1].

2. Para el contenedor del Datadog Agent, establece las siguientes variables de entorno de punto de conexión y expone el puerto correspondiente:
   - Para gRPC: Establece `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` en `0.0.0.0:4317` y expone el puerto `4317`.
   - Para HTTP: Establece `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` en `0.0.0.0:4318` y expone el puerto `4318`.

<div class="alert alert-danger">
<strong>Problema conocido</strong>: A partir de la versión 7.61.0 del Datadog Agent, los pipelines de ingestión de OTLP pueden no iniciar en entornos de Docker, mostrando el error: <code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code>.<br><br>
Si estás utilizando una versión afectada, puedes usar una de estas soluciones alternativas:<br><br>
1. Establece la variable de entorno <code>HOST_PROC</code> en <code>/proc</code> tu contenedor de Docker del Datadog Agent.<br>
2. Elimina <code>/proc/:/host/proc/:ro</code> de <code>volumes</code> tu contenedor de Docker del Datadog Agent.<br>
3. Establece <code>pid</code> en <code>host</code> en tu contenedor de Docker del Datadog Agent.<br><br>
Estas configuraciones se pueden aplicar a través de cualquiera de los <code>docker</code> archivo de comando o Docker compose.</div>

[1]: /es/agent/docker/
{{% /tab %}}
{{% tab "Datadog Operator" %}}

1.  Sigue la [configuración del agente de Kubernetes][1] para la instalación base.

2.  Habilita el protocolo preferido gRPC o HTTP en el manifiesto de tu operador `datadog-agent.yaml`:

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

Esto habilita cada protocolo en el puerto predeterminado (`4317` para OTLP/gRPC y `4318` para OTLP/HTTP). Las métricas y trazas están habilitadas por defecto.

[1]: /es/agent/kubernetes/
{{% /tab %}}
{{% tab "Helm" %}}

1.  Sigue la [configuración del agente de Kubernetes][1] para la instalación base.

2.  Habilita el protocolo preferido gRPC o HTTP en el archivo `datadog-values.yaml` de tu Helm:

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

Esto habilita cada protocolo en el puerto predeterminado (`4317` para OTLP/gRPC y `4318` para OTLP/HTTP). Las métricas y trazas están habilitadas por defecto.

[1]: /es/agent/kubernetes/
{{% /tab %}}
{{% tab "Manual (Daemonset)" %}}

1.  Sigue la [guía de instalación manual de Kubernetes][1] para la instalación base.

2.  Configura las siguientes variables de entorno en el contenedor `trace-agent` y en el contenedor principal `agent`:

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

3. Mapea los puertos del contenedor 4317 o 4318 al puerto del servidor para el contenedor principal `agent`:

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

Para instrucciones detalladas sobre el uso de OpenTelemetry con AWS Lambda y Datadog, incluyendo:

- Instrumentando tus funciones Lambda con OpenTelemetry
- Usando el soporte de la API de OpenTelemetry dentro de los SDKs de Datadog
- Enviando trazas de OpenTelemetry a la Extensión de Lambda de Datadog

Consulta la documentación Serverless para [AWS Lambda y OpenTelemetry][100].

[100]: /es/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

### Habilitando la ingestión de registros OTLP {#enabling-otlp-logs-ingestion}

La ingestión de registros OTLP está deshabilitada por defecto para evitar facturación inesperada. Para habilitarlo, debes habilitar explícitamente tanto la recolección de registros como la ingestión de registros OTLP.

{{< tabs >}}
{{% tab "Servidor" %}}

1. Habilita la recolección de registros siguiendo [la configuración de recolección de registros del Host Agent][7]:

   ```yaml
   logs_enabled: true
   ```

2. Establece `otlp_config.logs.enabled` en verdadero:

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[7]: /es/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

Establece las siguientes variables de entorno en el contenedor del Datadog Agent:

- `DD_LOGS_ENABLED=true`
- `DD_OTLP_CONFIG_LOGS_ENABLED=true`

{{% /tab %}}
{{% tab "Datadog Operator" %}}

En tu `datadog-agent.yaml` archivo

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

En tu `datadog-values.yaml` archivo:

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

Establezca las siguientes variables de entorno en el contenedor del Agent central:

```yaml
- name: DD_LOGS_ENABLED
  value: "true"
- name: DD_OTLP_CONFIG_LOGS_ENABLED
  value: "true"
```

Para más información, consulte [la recolección de registros con su DaemonSet][8].

[8]: /es/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}
{{< /tabs >}}

Hay muchas otras variables de entorno y configuraciones soportadas en el Datadog Agent. Para obtener una visión general de todas ellas, consulte [la plantilla de configuración][6].

## Enviando trazas, métricas y registros de OpenTelemetry al Datadog Agent {#sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent}

Después de habilitar la ingestión de OTLP en el Datadog Agent, configure su aplicación instrumentada con OpenTelemetry para exportar datos de telemetría al punto de conexión OTLP del Agent. Establezca la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` en el entorno de su **aplicación** para dirigir los datos al Agent. Sin esta configuración, su aplicación no envía datos de telemetría al Agent, incluso si el receptor OTLP del Agent está habilitado.

{{< tabs >}}
{{% tab "Servidor" %}}
Establezca la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` en el entorno de su aplicación:

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
1. Para el contenedor de la aplicación, establezca la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` para apuntar al contenedor del Datadog Agent. Por ejemplo:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. Ambos contenedores deben definirse en la misma red puente, lo que se gestiona automáticamente si utiliza Docker Compose. De lo contrario, siga el ejemplo de Docker en [Rastreo de Aplicaciones Docker][1] para configurar una red puente con los puertos correctos.

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
**Nota**: Para enriquecer las etiquetas de los contenedores para métricas personalizadas, establezca los atributos de recurso apropiados en el código de la aplicación donde se generan sus métricas OTLP. Por ejemplo, establezca el atributo de recurso `container.id` al UID del pod.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Al configurar el punto de conexión para enviar trazas, asegúrese de utilizar la ruta correcta requerida por su biblioteca OTLP. Algunas bibliotecas esperan que las trazas se envíen a la <code>/v1/traces</code> ruta, mientras que otras utilizan la ruta raíz <code>/</code>.</div>

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /es/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[10]: /es/opentelemetry/runtime_metrics/