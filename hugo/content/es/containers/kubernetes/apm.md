---
aliases:
- /es/agent/kubernetes/apm
description: Habilitar la recolección de trazas APM para aplicaciones en contenedores
  que se ejecutan en entornos de Kubernetes
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopila los registros de tu aplicación
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopila automáticamente las métricas y registros de tus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recolección de datos a un subconjunto de contenedores solamente
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asigna etiquetas a todos los datos emitidos por un contenedor
title: Kubernetes APM - Recolección de Trazas
---
{{< learning-center-callout header="Intenta la Introducción a la Monitorización de Kubernetes en el Centro de Aprendizaje" btn_title="Inscríbete ahora" btn_url="https://learn.datadoghq.com/courses/intro-to-monitoring-kubernetes">}}
  Aprende sin costo en capacidad de computación en la nube real y una cuenta de prueba de Datadog. Comienza estos laboratorios prácticos para ponerte al día con las métricas, registros y trazas APM que son específicas de Kubernetes.
{{< /learning-center-callout >}}

Esta página describe cómo configurar [Application Performance Monitoring (APM)][10] para tu aplicación de Kubernetes.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="La canalización de solución de problemas de APM: El rastreador envía trazas y datos de métricas desde el pod de la aplicación al pod del Agent, que los envía al backend de Datadog para ser mostrados en la interfaz de usuario de Datadog.">}}

Puedes enviar trazas a través de Unix Domain Socket (UDS), TCP (`IP:Port`), o servicio de Kubernetes. Datadog recomienda que uses UDS, pero es posible utilizar los tres al mismo tiempo, si es necesario.

**Nota**: Para instrumentación automática sin configuración manual, consulta [Instrumentación de Un Solo Paso para Kubernetes][13].

## Configuración {#setup}
1. Si aún no lo has hecho, [instala el Datadog Agent][1] en tu entorno de Kubernetes.
2. [Configura el Datadog Agent](#configure-the-datadog-agent-to-collect-traces) para recopilar trazas.
3. [Configura los pods de la aplicación](#configure-your-application-pods-to-submit-traces-to-datadog-agent) para enviar trazas al Datadog Agent.

### Configura el Datadog Agent para recolectar trazas {#configure-the-datadog-agent-to-collect-traces}

Las instrucciones en esta sección configuran el Datadog Agent para recibir trazas a través de UDS. Para usar TCP, consulta la sección de [configuración adicional](#additional-configuration). Para usar el servicio de Kubernetes, consulta [Configurando APM con el Servicio de Kubernetes][9].

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Edita tu `datadog-agent.yaml` para establecer `features.apm.enabled` en `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
      unixDomainSocketConfig:
        path: /var/run/datadog/apm.socket # default
```

Cuando APM está habilitado, la configuración predeterminada crea un directorio en el host y lo monta dentro del Agente. El Agente luego crea y escucha en un archivo de socket `/var/run/datadog/apm/apm.socket`. Los pods de la aplicación pueden montar este volumen de manera similar y escribir en este mismo socket. Puedes modificar la ruta y el socket con el valor de configuración `features.apm.unixDomainSocketConfig.path`.

{{% k8s-operator-redeploy %}}

**Nota**: En minikube, puedes recibir un `Unable to detect the kubelet URL automatically` error. En este caso, establece `global.kubelet.tlsVerify` en `false`.

{{% /tab %}}
{{% tab "Helm" %}}

Si [usaste Helm para instalar el Datadog Agent][1], APM está **habilitado por defecto** a través de UDS o tubería nombrada de Windows.

Para verificar, asegúrate de que `datadog.apm.socketEnabled` esté establecido en `true` en tu `datadog-values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

La configuración predeterminada crea un directorio en el host y lo monta dentro del Datadog Agent. El Datadog Agent luego crea y escucha en un archivo de socket `/var/run/datadog/apm.socket`. Los pods de la aplicación pueden montar este volumen de manera similar y escribir en este mismo socket. Puedes modificar la ruta y el socket con los valores de configuración `datadog.apm.hostSocketPath` y `datadog.apm.socketPath`.

```yaml
datadog:
  apm:
    # the following values are default:
    socketEnabled: true
    hostSocketPath: /var/run/datadog/
    socketPath: /var/run/datadog/apm.socket
```

Para deshabilitar APM, establece `datadog.apm.socketEnabled` en `false`.

{{% k8s-helm-redeploy %}}

**Nota**: En minikube, puedes recibir un `Unable to detect the kubelet URL automatically` error. En este caso, establece `datadog.kubelet.tlsVerify` en `false`.

[1]: /es/containers/kubernetes/installation?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

### Configura tus pods de aplicación para enviar trazas al Agente de Datadog {#configure-your-application-pods-to-submit-traces-to-datadog-agent}

{{< tabs >}}

{{% tab "Controlador de Admisión de Datadog" %}}
El Datadog Admission Controller es un componente del Datadog Cluster Agent que simplifica la configuración de tus pods de aplicación. Aprende más leyendo la [documentación del Datadog Admission Controller][1].

Utiliza el Datadog Admission Controller para inyectar variables de entorno y montar los volúmenes necesarios en nuevos pods de aplicación, configurando automáticamente la comunicación de trazas entre el pod y el Datadog Agent. Aprende cómo configurar automáticamente tu aplicación para enviar trazas al Datadog Agent leyendo la documentación de [Injecting Libraries Using Datadog Admission Controller][2].

[1]: /es/agent/cluster_agent/admission_controller/
[2]: /es/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "Socket de Dominio Unix (UDS)" %}}
Si estás enviando trazas al Datadog Agent usando UDS, monta el directorio del host donde se encuentra el socket (que creó el Datadog Agent) en el contenedor de la aplicación y especifica la ruta al socket con `DD_TRACE_AGENT_URL`:

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
        - name: DD_TRACE_AGENT_URL
          value: 'unix:///var/run/datadog/apm.socket'
        volumeMounts:
        - name: apmsocketpath
          mountPath: /var/run/datadog
        #(...)
      volumes:
        - hostPath:
            path: /var/run/datadog/
          name: apmsocketpath
```

### Configura tus SDKs de aplicación para emitir trazas: {#configure-your-application-sdks-to-emit-traces}
Después de configurar tu Datadog Agent para recolectar trazas y dar a tus pods de aplicación la configuración sobre *dónde* enviar trazas, instala el SDK de Datadog en tus aplicaciones para emitir las trazas. Una vez hecho esto, el SDK envía las trazas al `DD_TRACE_AGENT_URL` punto de conexión apropiado.

{{% /tab %}}


{{% tab TCP %}}
Si estás enviando trazas al Datadog Agent usando TCP (`<IP_ADDRESS>:8126`), proporciona esta dirección IP a tus pods de aplicación—ya sea automáticamente con el [Datadog Admission Controller][1], o manualmente usando la API descendente para obtener la IP del host. El contenedor de la aplicación necesita la variable de entorno `DD_AGENT_HOST` que apunta a `status.hostIP`:

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```
**Nota:** Esta configuración requiere que el Datadog Agent esté configurado para aceptar trazas a través de TCP

### Configura tus SDKs de aplicación para emitir trazas: {#configure-your-application-sdks-to-emit-traces-1}
Después de configurar el Datadog Agent para recolectar trazas y dar a tus pods de aplicación la configuración sobre *dónde* enviar trazas, instala el Datadog SDK en tus aplicaciones para emitir las trazas. Una vez hecho esto, el SDK envía automáticamente las trazas al `DD_AGENT_HOST` punto de conexión apropiado.

[1]: /es/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

Consulte la [documentación de instrumentación APM específica del idioma][2] para más ejemplos.

## Configuración adicional {#additional-configuration}

### Configure el Datadog Agent para aceptar trazas a través de TCP {#configure-the-datadog-agent-to-accept-traces-over-tcp}
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualice su `datadog-agent.yaml` con lo siguiente:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
        hostPort: 8126 # default
```

{{% k8s-operator-redeploy %}}

**Advertencia**: El parámetro `hostPort` abre un puerto en su host. Asegúrese de que su firewall solo permita el acceso desde sus aplicaciones o fuentes de confianza. Si su complemento de red no admite `hostPorts`, agregue `hostNetwork: true` en las especificaciones del pod del Datadog Agent. Esto comparte el espacio de nombres de red de su host con el Datadog Agent. Esto también significa que todos los puertos abiertos en el contenedor están abiertos en el host. Si un puerto se utiliza tanto en el host como en su contenedor, hay un conflicto (ya que comparten el mismo espacio de nombres de red) y el pod no se inicia. Algunas instalaciones de Kubernetes no permiten esto.
{{% /tab %}}
{{% tab "Helm" %}}

Actualice su archivo `datadog-values.yaml` con la siguiente configuración de APM:

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126 # default
```

{{% k8s-helm-redeploy %}}

**Advertencia**: El parámetro `datadog.apm.portEnabled` abre un puerto en su host. Asegúrese de que su firewall solo permita el acceso desde sus aplicaciones o fuentes de confianza. Si su complemento de red no admite `hostPorts`, agregue `hostNetwork: true` en las especificaciones del pod del Datadog Agent. Esto comparte el espacio de nombres de red de su host con el Datadog Agent. Esto también significa que todos los puertos abiertos en el contenedor están abiertos en el host. Si un puerto se utiliza tanto en el host como en su contenedor, hay un conflicto (ya que comparten el mismo espacio de nombres de red) y el pod no se inicia. Algunas instalaciones de Kubernetes no permiten esto.
{{% /tab %}}
{{< /tabs >}}

## Variables de entorno de APM {#apm-environment-variables}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Establezca variables de entorno adicionales de APM bajo `override.nodeAgent.containers.trace-agent.env`:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
Establezca variables de entorno adicionales de APM bajo `agents.containers.traceAgent.env`:
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "DaemonSet" %}}
Agregue variables de entorno al DaemonSet o Despliegue (para el Datadog Cluster Agent).

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          ...
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{< /tabs >}}

Lista de variables de entorno disponibles para configurar APM:

| Variable de entorno | Descripción |
| -------------------- | ----------- |
| `DD_APM_ENABLED`           | Cuando se establece en `true`, el Agente de Datadog acepta métricas de traza. <br/>**Predeterminado**: `true` (Agente 7.18+) |
| `DD_APM_ENV`           | Establece la etiqueta `env:` en las trazas recolectadas.  |
| `DD_APM_RECEIVER_SOCKET` | Para trazas sobre UDS. Cuando se establece, debe apuntar a un archivo de socket válido. |
| `DD_APM_RECEIVER_PORT`     | Para trazas sobre TCP, el puerto en el que escucha el receptor de trazas del Agente de Datadog. <br/>**Predeterminado**: `8126` |
| `DD_APM_NON_LOCAL_TRAFFIC` | Permitir tráfico no local al trazar desde otros contenedores. <br/>**Predeterminado**: `true` (Agente 7.18+) |
| `DD_APM_DD_URL`            | El punto de conexión de la API de Datadog donde se envían sus trazas: `https://trace.agent.{{< region-param key="dd_site" >}}`. <br/>**Default**:  `https://trace.agent.datadoghq.com` |
| `DD_APM_TARGET_TPS`     | The target traces per second to sample. <br/>**Default**: `10` |
| `DD_APM_ERROR_TPS`     | The target error trace chunks to receive per second. <br/>**Default**: `10` |
| `DD_APM_MAX_EPS`     | Maximum number of APM events per second to sample. <br/>**Default**: `200` |
| `DD_APM_MAX_MEMORY`     | What the Datadog Agent aims to use in terms of memory. If surpassed, the API rate limits incoming requests. <br/>**Default**: `500000000` |
| `DD_APM_MAX_CPU_PERCENT`     | The CPU percentage that the Datadog Agent aims to use. If surpassed, the API rate limits incoming requests. <br/>**Default**: `50` |
| `DD_APM_FILTER_TAGS_REQUIRE`     | Collects only traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_FILTER_TAGS_REJECT`     | Rejects traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_REPLACE_TAGS` | [Scrub sensitive data from your span's tags][4]. |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. <br/>For example: `GET /ignore-me,(GET\|POST) /and-also-me` |
| `DD_APM_LOG_FILE`  | Path to file where APM logs are written. |
| `DD_APM_CONNECTION_LIMIT`  | Maximum connection limit for a 30 second time window. <br/>**Default**: 2000 |
| `DD_APM_ADDITONAL_ENDPOINTS`     | Send data to multiple endpoints and/or with multiple API keys. <br/>See [Dual Shipping][12]. |
| `DD_APM_DEBUG_PORT`     | Port for the debug endpoints for the Trace Agent. Set to `0` to disable the server. <br/>**Default**: `5012`. |
| `DD_BIND_HOST`             | Set the StatsD and receiver hostname. |
| `DD_PUERTO_DOGSTATSD`        | For tracing over TCP, set the DogStatsD port. |
| `DD_ENV`                   | Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used. |
| `DD_HOSTNAME`         | Manually set the hostname to use for metrics if autodetection fails, or when running the Datadog Cluster Agent. |
| `DD_LOG_LEVEL`             | Set the logging level. <br/>**Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off` |
| `DD_PROXY_HTTPS`     | Configura la URL para el proxy a utilizar. |


## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/containers/kubernetes/installation
[2]: /es/tracing/setup/
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/tracing/configure_data_security/?tab=kubernetes#replace-tags
[5]: /es/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/es/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[9]: /es/tracing/guide/setting_up_apm_with_kubernetes_service/
[10]: /es/tracing
[11]: /es/tracing/guide/ignoring_apm_resources/?tab=kubernetes
[12]: /es/agent/configuration/dual-shipping/
[13]: /es/tracing/trace_collection/single-step-apm/kubernetes/