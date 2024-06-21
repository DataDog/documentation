---
aliases:
- /es/agent/kubernetes/apm
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopila las métricas de tus aplicaciones y logs automáticamente
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
kind: documentación
title: Kubernetes APM - Recopilación de trazas (traces)
---

{{< learning-center-callout header="Prueba la Introducción a la monitorización con Kubernetes en el Centro de aprendizaje" btn_title="Inscríbete ahora" btn_url="https://learn.datadoghq.com/courses/intro-to-monitoring-kubernetes">}}
  Aprende sin coste alguno sobre la capacidad real de la computación en la nube y una cuenta de prueba de Datadog. Inicia estos laboratorios prácticos para ponerte al día con métricas, logs y trazas de APM que son específicos de Kubernetes.
{{< /learning-center-callout >}}

Esta página describe cómo ajustar y configurar [Application Performance Monitoring (APM)][10] para tu aplicación de Kubernetes.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="Canalización para solucionar problemas de APM: el rastreador envía datos de trazas y métricas desde el pod de aplicación al pod del Agent, el cual lo envía al backend de Datadog para mostrarlo en la interfaz de usuario de Datadog.">}}

Puedes enviar trazas a través de Unix Domain Socket (UDS), TCP (`IP:Port`), o el servicio de Kubernetes. Datadog recomienda que utilices UDS, pero es posible utilizar los tres al mismo tiempo, si es necesario.

## Configuración
1. Si aún no lo has hecho, [instala el Datadog Agent][1] en tu entorno de Kubernetes.
2. [Configura el Datadog Agent](#configure-the-datadog-agent-to-collect-traces) para recopilar trazas.
3. [Configura pods de aplicación](#configure-your-application-pods-to-submit-traces-to-datadog-agent) para enviar trazas al Datadog Agent.

### Configura el Datadog Agent para recopilar trazas

Las instrucciones de esta sección configuran el Datadog Agent para recibir trazas a través de UDS. Para utilizar TCP, consulta la sección [Configuración adicional](#additional-configuration). Para utilizar el servicio de Kubernetes, consulta [Configuración de APM con el servicio de Kubernetes][9].

{{< tabs >}}
{{% tab "Operator" %}}
Después de [utilizar el Operator para instalar el Datadog Agent][1], edita tu `datadog-agent.yaml` para establecer `features.apm.enabled` en `true`.

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

Cuando APM está habilitado, la configuración por defecto crea un directorio en el host y lo monta dentro del Agent. El Agent entonces crea y escucha en un archivo de socket `/var/run/datadog/apm/apm.socket`. Los pods de aplicación pueden entonces montar de forma similar este volumen y escribir en este mismo socket. Puedes modificar la ruta y el socket con el valor de configuración `features.apm.unixDomainSocketConfig.path`.

{{% k8s-operator-redeploy %}}

**Nota**: En minikube, puedes recibir un error `Unable to detect the kubelet URL automatically`. En este caso, establece `global.kubelet.tlsVerify` en `false`.

[1]: /es/containers/kubernetes/installation/?tab=operator#installation
{{% /tab %}}
{{% tab "Helm" %}}

Si [utilizaste Helm para instalar el Datadog Agent][1], APM está **habilitado por defecto** sobre la canalización de UDS o Windows.

Para comprobarlo, asegúrate de que `datadog.apm.socketEnabled` está configurado como `true` en tu `values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

La configuración por defecto crea un directorio en el host y lo monta dentro del Agent. A continuación, el Agent crea y escucha en un archivo de socket `/var/run/datadog/apm.socket`. Los pods de aplicación pueden entonces montar de forma similar este volumen y escribir en este mismo socket. Puedes modificar la ruta y el socket con los valores de configuración `datadog.apm.hostSocketPath` y `datadog.apm.socketPath`.

```yaml
datadog:
  apm:
    # los siguientes valores son predeterminados:
    socketEnabled: true
    hostSocketPath: /var/run/datadog/
    socketPath: /var/run/datadog/apm.socket
```

Para desactivar APM, establece `datadog.apm.socketEnabled` en `false`.

{{% k8s-helm-redeploy %}}

**Nota**: En minikube, puedes recibir un error `Unable to detect the kubelet URL automatically`. En este caso, establece `datadog.kubelet.tlsVerify` en `false`.

[1]: /es/containers/kubernetes/installation?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

### Configura tus pods de aplicación para enviar trazas al Datadog Agent

{{< tabs >}}

{{% tab "Datadog Admission Controller" %}}
El Controlador de admisión de Datadog (Admission Controller) es un componente del Datadog Cluster Agent que simplifica tu configuración de pod de aplicación. Obtén más información leyendo la [documentación del Datadog Admission Controller][1].

Utiliza el Controlador de admisión de Datadog (Admission Controller) para inyectar las variables de entorno y montar los volúmenes necesarios en nuevos pods de aplicación, configurando automáticamente la comunicación de trazas entre el pod y el Agent. Aprende cómo configurar automáticamente tu aplicación para enviar trazas al Datadog Agent leyendo la documentación [Inyectar bibliotecas con el Admission Controller][2].

[1]: /es/agent/cluster_agent/admission_controller/
[2]: /es/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "Unix Domain Socket (UDS)" %}}
Si estás enviando trazas al Agent utilizando UDS, monta el directorio de host en el que se encuentra el socket (que el Agent ha creado) en el contenedor de aplicación y especifica la ruta al socket con `DD_TRACE_AGENT_URL`:

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

### Configura tus trazadores de aplicaciones para emitir trazas:
Después de configurar tu Datadog Agent para recopilar trazas y establecer en tus pods de aplicación la configuración sobre *dónde* enviar trazas, instala el trazador de Datadog en tus aplicaciones para emitir trazas. Una vez hecho esto, el trazador envía las trazas al endpoint `DD_TRACE_AGENT_URL` apropiado.

{{% /tab %}}


{{% tab TCP %}}
Si estás enviando trazas al Agent mediante TCP (`<IP_ADDRESS>:8126`), proporciona esta dirección IP a tus pods de aplicación, ya sea de forma automática con el [Controlador de admisión de Datadog][1], o de forma manual mediante la API descendente para obtener la IP de host. El contenedor de aplicación necesita la variable de entorno `DD_AGENT_HOST` que apunta a `status.hostIP`:

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
**Nota:** Esta configuración requiere que el Agent esté configurado para aceptar trazas sobre TCP.

### Configura tus trazadores de aplicaciones para emitir trazas:
Después de configurar tu Datadog Agent para recopilar trazas y establecer en tus pods de aplicación la configuración sobre *dónde* enviar trazas, instala el trazador de Datadog en tus aplicaciones para emitir trazas. Una vez hecho esto, el trazador envía automáticamente las trazas al endpoint `DD_AGENT_HOST` apropiado.

[1]: /es/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

Para obtener más ejemplos, consulta la [documentación específica en tu idioma de la instrumentación de APM][2].

## Configuración adicional

### Configura el Datadog Agent para aceptar trazas sobre TCP
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualiza tu `datadog-agent.yaml` con lo siguiente:

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

**Atención**: El parámetro `hostPort` abre un puerto en tu host. Asegúrate de que tu cortafuegos solo permite el acceso desde tus aplicaciones o fuentes de confianza. Si tu complemento de red no admite `hostPorts`, añade `hostNetwork: true` en las especificaciones de pod de tu Agent. Esto comparte el espacio de nombres de red de tu host con el Datadog Agent. Esto también significa que todos los puertos abiertos en el contenedor se abren en el host. Si un puerto se utiliza tanto en el host como en tu contenedor, entran en conflicto (ya que comparten el mismo espacio de nombres de red) y el pod no arranca. Algunas instalaciones de Kubernetes no permiten esto.
{{% /tab %}}
{{% tab "Helm" %}}

Actualiza tu archivo `values.yaml` con la siguiente configuración de APM:

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126 # default
```

{{% k8s-helm-redeploy %}}

**Atención**: El parámetro `datadog.apm.portEnabled` abre un puerto en tu host. Asegúrate de que tu cortafuegos solo permite el acceso desde tus aplicaciones o fuentes de confianza. Si tu complemento de red no admite `hostPorts`, añade `hostNetwork: true` en las especificaciones de pod de tu Agent. Esto comparte el espacio de nombres de red de tu host con el Datadog Agent. Esto también significa que todos los puertos abiertos en el contenedor se abren en el host. Si un puerto se utiliza tanto en el host como en tu contenedor, entran en conflicto (ya que comparten el mismo espacio de nombres de red) y el pod no arranca. Algunas instalaciones de Kubernetes no permiten esto.
{{% /tab %}}
{{< /tabs >}}

## Variables de entorno del Agent

**Nota**: Como práctica recomendada, Datadog recomienda utilizar el etiquetado de servicio unificado al asignar etiquetas. El etiquetado de servicio unificado une la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para saber cómo configurar tu entorno con el etiquetado unificado, consulta la documentación específica del [etiquetado de servicio unificado][3].

Lista de todas las variables de entorno disponibles para rastrear dentro del Agent que se ejecuta en Kubernetes:

| Variable de entorno       | Descripción                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | Clave de API de Datadog                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | Configura la URL para que lo pueda usar el proxy.                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [Borre los datos confidenciales de su tramo (span)'s etiquetas (tags)][4].                                                                                                                                                                                                                                                                            |
| `DD_HOSTNAME`              | Si la detección automática falla, o durante la ejecución del Datadog Cluster Agent, establece el nombre de host que hay que usar para las métricas.                                                                                                                                                                                                               |
| `DD_DOGSTATSD_PORT`        | Establece el puerto DogStatsD.                                                                                                                                                                                                                                                                                                     |
| `DD_APM_RECEIVER_SOCKET`  | Recopila tus trazas a través de un Unix Domain Sockets que tiene prioridad sobre el nombre de host y la configuración del puerto si está establecido. Apagado por defecto, cuando está establecido, debe señalar a un archivo socket válido.                                                                                                                                            |
| `DD_BIND_HOST`             | Introduce el StatsD y el nombre de host del receptor.                                                                                                                                                                                                                                                                                         |
| `DD_LOG_LEVEL`             | Establece el nivel de logging. (`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                             |
| `DD_APM_ENABLED`           | Cuando se establece en `true`, el Datadog Agent acepta rastrear métricas. El valor por defecto es `true` (Agent 7.18+)                                                                                                                                                                                                                                                                |
| `DD_APM_CONNECTION_LIMIT`  | Establece el límite máximo de conexión para una ventana de tiempo de 30 segundos.                                                                                                                                                                                                                                                              |
| `DD_APM_DD_URL`            | Establece el endpoint del Datadog API donde se envían tus trazas: `https://trace.agent.{{< region-param key="dd_site" >}}`. Cambia por defecto a `https://trace.agent.datadoghq.com`.                                                                                                                                                                                                   |
| `DD_APM_RECEIVER_PORT`     | El puerto por el que escucha el receptor de trazas del Datadog Agent. El valor por defecto es `8126`.                                                                                                                                                                                                                                           |
| `DD_APM_NON_LOCAL_TRAFFIC` | Permite el tráfico no local cuando se rastrea desde otros contenedores. El valor por defecto es `true` (Agent 7.18+)                                                                                                                                                                                                                               |
| `DD_APM_IGNORE_RESOURCES`  | Configura recursos para que el Agent los ignore. El formato debe incluir expresiones regulares separadas por comas. Como <code>GET /ignore-me,(GET\|POST) /and-also-me</code>.                                                                                                                                                       |
| `DD_ENV`                   | Establece el `env` global para todos los datos emitidos por el Agent. Si `env` no está presente en tus datos de traza, se utiliza esta variable. Ver [configuración del entorno de APM][5] para más detalles.


### Variables de entorno del Operator
| Variable de entorno       | Descripción                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent.apm.enabled`                                                                                          | Activa esta opción para habilitar APM y el rastreo, en el puerto 8126. Consulta la [documentación de Datadog Docker][6].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `agent.apm.env`                                                                                              | La página del Datadog Agent admite muchas [variables de entorno][7].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `agent.apm.hostPort`                                                                                         | Número de puerto a exponer en el host. Si se especifica, debe ser un número de puerto válido, 0 < x < 65536. Si se especifica `HostNetwork`, debe coincidir con `ContainerPort`. La mayoría de los contenedores no lo necesitan.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.limits`                                                                                 | Limits describe la cantidad máxima de recursos informáticos permitidos. Para más información, consulta la [documentación de Kubernetes][8].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.requests`                                                                               | Requests describe la cantidad mínima de recursos informáticos que se requieren. Si se omite `requests` para un contenedor, el valor por defecto es `limits` si se especifica explícitamente, o un valor definido por la implementación. Para más información, consulta la [documentación de Kubernetes ][8].     |                                                                                                                                                                                                                                                                                                                               |


## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}


[1]: /es/containers/kubernetes/installation
[2]: /es/tracing/setup/
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/tracing/configure_data_security#scrub-sensitive-data-from-your-spans
[5]: /es/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/es/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[9]: /es/tracing/guide/setting_up_apm_with_kubernetes_service/
[10]: /es/tracing