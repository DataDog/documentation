---
aliases:
- /es/integrations/faq/gathering-kubernetes-events
- /es/agent/kubernetes/event_collection
- /es/agent/kubernetes/configuration
description: Opciones de configuración adicionales para APM, logs, procesos, eventos
  y otras funciones después de instalar el Datadog Agent
title: Configurar mejor el Datadog Agent en Kubernetes
---

## Información general

Después de haber instalado el Datadog Agent en tu entorno de Kubernetes, puedes elegir opciones de configuración adicionales.

### Habilita a Datadog para recopilar:
- [Trazas (traces) (APM)](#enable-apm-and-tracing)
- [Eventos de Kubernetes](#enable-kubernetes-event-collection)
- [CNM](#enable-cnm-collection)
- [Logs](#enable-log-collection)
- [Procesos](#enable-process-collection)

### Otras capacidades
- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Integraciones](#integrations)
- [Vista de contenedores](#containers-view)
- [Orchestrator Explorer](#orchestrator-explorer)
- [Servidor de métricas externas](#custom-metrics-server)

### Más configuraciones
- [Variables de entorno](#environment-variables)
- [Métricas personalizadas de DogStatsD](#configure-dogstatsd)
- [Asignación de etiqueta (tag)](#configure-tag-mapping)
- [Secretos](#using-secret-files)
- [Ignorar contenedores](#ignore-containers)
- [Tiempo de ejecución del servidor de la API de Kubernetes](#kubernetes-api-server-timeout)
- [Configuración del proxy](#proxy-settings)
- [Autodiscovery](#Autodiscovery)
- [Definir nombre de clúster](#set-cluster-name)
- [Miscelánea](#miscellaneous)

## Activar APM y rastreo

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
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

En Helm, APM está **habilitado por defecto** sobre la canalización de UDS o Windows.

Para comprobarlo, asegúrate de que `datadog.apm.socketEnabled` está configurado como `true` en tu `values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

{{% /tab %}}
{{< /tabs >}}

Para obtener más información, consulta [Recopilación de trazas de Kubernetes][16].

## Activar la recopilación de eventos de Kubernetes

Utiliza el [Datadog Cluster Agent][2] para recopilar eventos de Kubernetes.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

La recopilación de eventos está activada por defecto por el Datadog Operator. Esto se puede gestionar en la configuración `features.eventCollection.collectKubernetesEvents` en tu `datadog-agent.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>

  features:
    eventCollection:
      collectKubernetesEvents: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Para recopilar eventos de Kubernetes con el Datadog Cluster Agent, asegúrate de que las opciones `clusterAgent.enabled`, `datadog.collectEvents` y `clusterAgent.rbac.create` están configuradas como `true` en tu archivo `datadog-values.yaml`.

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

Si no deseas utilizar la opción de Cluster Agent, puedes hacer que un Node Agent recopila eventos de Kubernetes configurando las opciones `datadog.leaderElection`, `datadog.collectEvents` y `agents.rbac.create` como `true` en tu archivo `datadog-values.yaml`.

```yaml
datadog:
  leaderElection: true
  collectEvents: true
agents:
  rbac:
    create: true
```

[1]: /es/containers/cluster_agent

{{% /tab %}}
{{< /tabs >}}

Para la configuración de DaemonSet, consulta [Recopilación de eventos de Cluster Agent en DaemonSet][14].

## Activar la recopilación de CNM

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En tu `datadog-agent.yaml`, define `features.npm.enabled` como `true`.

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
    npm:
      enabled: true
```

A continuación, aplica la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Actualiza tu `datadog-values.yaml` con la siguiente configuración:

```yaml
datadog:
  # (...)
  networkMonitoring:
    enabled: true
```

A continuación, actualiza tu tabla de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

Para ver más información, consulta [Cloud Network Monitoring][18].

## Activar la recopilación de log

{{< tabs >}}
{{% tab "Datadog Operator" %}}
En tu `datadog-agent.yaml`, establece `features.logCollection.enabled` y `features.logCollection.containerCollectAll` en `true`.

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
    logCollection:
      enabled: true
      containerCollectAll: true
```

A continuación, aplica la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Actualiza tu `datadog-values.yaml` con la siguiente configuración:

```yaml
datadog:
  # (...)
  logs:
    enabled: true
    containerCollectAll: true
```

A continuación, actualiza tu tabla de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Para obtener más información, consulta [Recopilación de log de Kubernetes][17].

## Activar la recopilación de procesos

{{< tabs >}}
{{% tab "Datadog Operator" %}}
En tu `datadog-agent.yaml`, establece `features.liveProcessCollection.enabled` en `true`.

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
    liveProcessCollection:
      enabled: true
```

A continuación, aplica la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Actualiza tu `datadog-values.yaml` con la siguiente configuración:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
    processCollection: true
```

A continuación, actualiza tu tabla de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Para obtener más información, consulta [Live Processes][23]
## Datadog Cluster Agent

Datadog Cluster Agent proporciona un enfoque optimizado y centralizado para recopilar datos de monitorización del clúster. Datadog recomienda encarecidamente el uso de Cluster Agent para la monitorización de Kubernetes.

Datadog Operator v1.0.0+ y tabla de Helm v2.7.0+ **habilitan por defecto el Cluster Agent **. No es necesaria ninguna otra configuración.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

El Datadog Operator v1.0.0+ habilita el Cluster Agent por defecto. El Operator crea los RBAC necesarios y despliega Cluster Agent. Ambos Agents utilizan la misma clave de API.

El Operador genera automáticamente un token aleatorio en un `Secret` de Kubernetes que lo compartirán el Datadog Agent y Cluster Agent para una comunicación segura.

Puedes especificar manualmente este token en el campo `global.clusterAgentToken` de tu `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
```

También puedes especificar este token haciendo referencia al nombre de un `Secret` existente y a la clave de datos que contiene este token:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentTokenSecret: 
      secretName: <SECRET_NAME>
      keyName: <KEY_NAME>
```

**Nota**: Cuando se configura manualmente, este token debe tener 32 caracteres alfanuméricos.

A continuación, aplica la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

La tabla de Helm v2.7.0+ activa por defecto el Cluster Agent.

Para comprobarlo, asegúrate de que `clusterAgent.enabled` está configurado como `true` en tu `datadog-values.yaml`:

```yaml
clusterAgent:
  enabled: true
```

Helm genera automáticamente un token aleatorio en un `Secret` de Kubernetes compartido por el Datadog Agent y Cluster Agent para una comunicación segura.

Puedes especificar manualmente este token en el campo `clusterAgent.token` de tu `datadog-agent.yaml`:

```yaml
clusterAgent:
  enabled: true
  token: <DATADOG_CLUSTER_AGENT_TOKEN>
```

Alternativamente, puedes especificar este token haciendo referencia al nombre de un `Secret` existente, donde el token se encuentra en una clave llamada `token`:

```yaml
clusterAgent:
  enabled: true
  tokenExistingSecret: <SECRET_NAME>
```

{{% /tab %}}
{{< /tabs >}}

Para más información, consulta la [documentación de Datadog Cluster Agent][2].

## Servidor de métricas personalizadas

Para utilizar la función [servidor de métricas personalizadas][22] de Cluster Agent, debes proporcionar una [clave de aplicación][24] de Datadog y activar el proveedor de métricas.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
En `datadog-agent.yaml`, proporcione una clave de aplicación en `spec.global.credentials.appKey` y establece `features.externalMetricsServer.enabled` en `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>

  features:
    externalMetricsServer:
      enabled: true
```

A continuación, aplica la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
En `datadog-values.yaml`, proporcione una clave de aplicación en `datadog.appKey` y establece `clusterAgent.metricsProvider.enabled` en `true`.

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

clusterAgent:
  enabled: true
  metricsProvider:
    enabled: true
```

A continuación, actualiza tu tabla de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

## Integraciones

Una vez que Agent esté funcionando en tu clúster, utiliza [la característica Autodiscovery de Datadog][5] para recopilar métricas y logs automáticamente de tus pods.

## Vista de contenedores

Para utilizar el [Explorador de contenedores][3] de Datadog, active el Agent de proceso. Datadog Operator y la tabla de Helm **habilitan el Agent de proceso por defecto**. No es necesario ninguna otra configuración.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

De manera predeterminada, el Datadog Operator habilita el Process Agent.

Para comprobarlo, asegúrate de que `features.liveContainerCollection.enabled` está configurado como `true` en tu `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
```
En algunas configuraciones, el Process Agent y Cluster Agent no pueden detectar de manera automática un nombre de clúster de Kubernetes. Si esto ocurre, la función no se inicia y aparece la siguiente advertencia en el log del Cluster Agent: `Orchestrator explorer enabled but no cluster name set: disabling`. En este caso, debes definir `datadog.clusterName` con tu nombre de clúster en `values.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

La tabla de Helm activa el Agent de proceso por defecto. 

Para comprobarlo, asegúrate de que `processAgent.enabled` está configurado como `true` en tu `datadog-values.yaml`:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

En algunas configuraciones, el Process Agent y Cluster Agent no pueden detectar de manera automática un nombre de clúster de Kubernetes. Si esto ocurre, la función no se inicia y aparece la siguiente advertencia en el log del Cluster Agent: `Orchestrator explorer enabled but no cluster name set: disabling.`. En este caso, debes definir`datadog.clusterName` con tu nombre de clúster en `values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    enabled: true
```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

Para conocer las restricciones de los nombres de clúster válidos, consulta [Definir el nombre de clúster](#set-cluster-name).

Consulta la documentación [Vista de contenedores][15] para obtener información adicional.

## Orchestrator Explorer

El Datadog Operator y la tabla de Helm **habilitan por defecto el [Orchestrator Explorer][20] de Datadog**. No es necesario ninguna otra configuración.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Orchestrator Explorer está activado por defecto en el Datadog Operator. 

Para comprobarlo, asegúrate de que el parámetro `features.orchestratorExplorer.enabled` está configurado como `true` en tu `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

En algunas configuraciones, el Process Agent y Cluster Agent no pueden detectar de manera automática un nombre de clúster de Kubernetes. Si esto ocurre, la función no se inicia y aparece la siguiente advertencia en el log del Cluster Agent: `Orchestrator explorer enabled but no cluster name set: disabling`. En este caso, debes definir `datadog.clusterName` con tu nombre de clúster en `values.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```


{{% /tab %}}
{{% tab "Helm" %}}

La tabla de Helm habilita Orchestrator Explorer por defecto.

Para comprobarlo, asegúrate de que el parámetro `orchestratorExplorer.enabled` está configurado como `true` en tu archivo `datadog-values.yaml`:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

En algunas configuraciones, el Process Agent y Cluster Agent no pueden detectar de manera automática un nombre de clúster de Kubernetes. Si esto ocurre, la función no se inicia y aparece la siguiente advertencia en el log del Cluster Agent: `Orchestrator explorer enabled but no cluster name set: disabling.` En este caso, debes establecer `datadog.clusterName` con tu nombre de clúster en `values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

Para conocer las restricciones de los nombres de clúster válidos, consulta [Definir el nombre de clúster](#set-cluster-name).

Consulta la [documentación de Orchestrator Explorer][21] para obtener información adicional.

## Configuración básica

Utiliza los siguientes campos de configuración para configurar el Datadog Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| Parámetro (v2alpha1) |  Descripción |
| --------------------------- | ----------- |
| `global.credentials.apiKey` |  Configura tu clave de API Datadog. |
| `global.credentials.apiSecret.secretName` | En lugar de `global.credentials.apiKey`, indica el nombre de un `Secret` de Kubernetes que contenga tu clave de API de Datadog.|
| `global.credentials.apiSecret.keyName` | En lugar de `global.credentials.apiKey`, proporciona la clave del `Secret` de Kubernetes nombrada en `global.credentials.apiSecret.secretName`.|
| `global.credentials.appKey` |  Configura tu clave de aplicación de Datadog. Si utilizas el servidor de métricas externas, debes configurar una clave de aplicación de Datadog para el acceso de lectura a tus métricas. |
| `global.credentials.appSecret.secretName` | En lugar de `global.credentials.apiKey`, indica el nombre de un `Secret` de Kubernetes que contenga la clave de tu aplicación de Datadog.|
| `global.credentials.appSecret.keyName` | En lugar de `global.credentials.apiKey`, proporciona la clave del `Secret` de Kubernetes nombrada en `global.credentials.appSecret.secretName`.|
| `global.logLevel` | Establece la intensidad del registro. Esto puede ser anulado por el contenedor. Los niveles de log válidos son: `trace`, `debug`, `info`, `warn`, `error`, `critical` y `off`. Por defecto: `info`. |
| `global.registry` | Registro de imágenes a utilizar para todas las imágenes de Agent. Por defecto: `gcr.io/datadoghq`. |
| `global.site` | Establece el [sitio de entrada][1] de Datadog al que se envían los datos del Agent. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el SITIO correcto a la derecha). |
| `global.tags` | Un lista de etiquetas para adjuntar a cada métrica, evento y check de servicio recopilados. |

Para obtener una lista completa de los campos de configuración del Datadog Operator, consulta la [especificación del Operator v2alpha1][2]. Para ver versiones anteriores, consulta [Migración de CRD de Datadog Agents a v2alpha1][3]. Los campos de configuración también pueden consultarse mediante `kubectl explain datadogagent --recursive`.

[1]: /es/getting_started/
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[3]: /es/containers/guide/v2alpha1_migration/
{{% /tab %}}
{{% tab "Helm" %}}
| Helm | Descripción |
| ---- | ----------- |
| `datadog.apiKey` | Configura tu clave de API de Datadog. |
| `datadog.apiKeyExistingSecret` | En lugar de `datadog.apiKey`, proporciona el nombre de un `Secret` de Kubernetes existente que contenga tu clave de API de Datadog, configurada con el nombre de clave `api-key`. |
| `datadog.appKey` | Configura tu clave de aplicación de Datadog. Si utilizas el servidor de métricas externas, debes configurar una clave de aplicación de Datadog para el acceso de lectura a tus métricas. |
| `datadog.appKeyExistingSecret` | En lugar de `datadog.appKey`, proporciona el nombre de un `Secret` de Kubernetes existente que contenga tu clave de aplicación de Datadog, configurada con el nombre de clave `app-key`. |
| `datadog.logLevel` | Establece la verbosidad del registro. Esto puede ser anulado por el contenedor. Los niveles válidos de log son: `trace`, `debug`, `info`, `warn`, `error`, `critical` y `off`. Por defecto: `info`. |
| `registry` | Registro de imagen a utilizar para todas las imágenes del Agent. Por defecto: `gcr.io/datadoghq`. |
| `datadog.site` | Establece el [sitio de entrada][1] de Datadog al que se envían los datos del Agent. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el SITIO correcto a la derecha). |
| `datadog.tags` | Un lista de etiquetas para adjuntar a cada métrica, evento y check de servicio recopilados. |

Si deseas consultar la lista completa de las variables de entorno para la tabla de Helm, consulta la [ lista completa de opciones][2] para `datadog-values.yaml`.

[1]: /es/getting_started/site
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
{{% /tab %}}
{{% tab "DaemonSet" %}}
| Variable de Ent | Descripción |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY` | Tu Datadog clave de API (**obligatorio**) |
| `DD_ENV` | Establece la etiqueta global `env` para todos los datos emitidos.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME` | Nombre de host a utilizar para métricas (si falla la detección automática) | | | 
| `DD_TAGS` | Etiquetas de host separadas por espacios. Por ejemplo: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE` | Sitio de destino para tus métricas, trazas y logs. Tu `DD_SITE` es {{< region-param key="dd_site" code="true">}}. Por defecto es `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL` | Opcional para anular la URL de envío de métrica.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+) | Alias para `DD_DD_URL`. Ignorado si `DD_DD_URL` ya está configurado.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS` | El Agent ejecuta todos los checks de forma concurrente por defecto (valor por defecto = `4` ejecutores). Para ejecutar checks secuencialmente, ajusta el valor en `1`. Si necesitas ejecutar un número elevado de checks (o checks lentos), el componente `collector-queue` podría retrasarse y el check de estado podría fallar. Puede aumentar el número de ejecutores para iniciar checks en paralelo. |
| `DD_LEADER_ELECTION` | Si se están ejecutando múltiples instancias del Agent en tu clúster, establece esta variable en `true` para evitar la duplicación de la recopilación de eventos.                                                                                                                                                                                                                         |
{{% /tab %}}
{{< /tabs >}}

## Variables de entorno
El Datadog Agent en contenedores puede configurarse utilizando variables de entorno. Para una amplia lista de las variables de entorno compatibles, consulta la sección [variables de entorno][26] de la documentación del Docker Agent.

### Ejemplos
{{< tabs >}}
{{% tab "Datadog Operator" %}}
Al utilizar el Datadog Operator, puedes establecer variables de entorno adicionales en `override` para un componente con `[key].env []object`, o para un contenedor con `[key].containers.[key].env []object`. Se admiten las siguientes claves: 

- `nodeAgent`
- `clusterAgent`
- `clusterChecksRunner`

Los ajustes de contenedor tienen prioridad sobre los ajustes de componente.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
clusterAgent:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
Añade variables de entorno al DaemonSet o al despliegue (para Datadog Cluster Agent).
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

## Configurar DogStatsD

DogStatsD puede enviar métricas personalizadas sobre UDP con el protocolo StatsD. **DogStatsD está habilitado por defecto por Datadog Operator y Helm**. Consulta la [documentación de DogStatsD][19] para obtener más información.

Puedes utilizar las siguientes variables de entorno para configurar DogStatsD con DaemonSet:

| Variable de entorno                     | Descripción                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Escucha los paquetes de DogStatsD de otros contenedores (obligatorio para enviar métricas personalizadas).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Los percentiles de histogramas para calcular (separados por espacios). Por defecto es `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Los agregados del histograma a calcular (separados por espacios). El valor por defecto es `"max median avg count"`.                                                          |
| `DD_DOGSTATSD_SOCKET`            | La ruta al socket Unix que se va a escuchar. Debe estar en un volumen montado en `rw`.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Habilita la detección y el etiquetado de contenedores para las métricas del socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Etiquetas adicionales para anexar a todas las métricas, los eventos y los checks de servicios recibidos por este servidor de DogStatsD, por ejemplo: `"env:golden group:retrievers"`. |

## Configurar la asignación de etiquetas

Datadog recopila automáticamente etiquetas comunes de Kubernetes.

Además, puedes asignar etiquetas de nodos de Kubernetes, etiquetas de pods y anotaciones a las etiquetas de Datadog. Utiliza las siguientes variables de entorno para configurar esta asignación:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| Parámetro (v2alpha1) |  Descripción |
| --------------------------- |  ----------- |
| `global.namespaceLabelsAsTags` |  Proporciona una asignación entre las etiquetas de espacio de nombres de Kubernetes y etiquetas de Datadog. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.nodeLabelsAsTags` | Proporciona una asignación entre las etiquetas de nodo de Kubernetes y etiquetas de Datadog. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.podAnnotationsAsTags` |  Proporciona una asignación entre anotaciones de Kubernetes y etiquetas de Datadog. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
| `global.podLabelsAsTags` |  Proporciona una asignación entre las etiquetas de Kubernetes y las etiquetas de Datadog. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### Ejemplos

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    namespaceLabelsAsTags:
      env: environment
      # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
    nodeLabelsAsTags:
      beta.kubernetes.io/instance-type: aws-instance-type
      kubernetes.io/role: kube_role
      # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
    podLabelsAsTags:
      app: kube_app
      release: helm_release
      # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
    podAnnotationsAsTags:
      iam.amazonaws.com/role: kube_iamrole
       # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{% tab "Helm" %}}

|  Helm | Descripción |
| --------------------------- | ----------- |
|  `datadog.namespaceLabelsAsTags` | Proporciona una asignación entre las etiquetas de espacio de nombres de Kubernetes y etiquetas de Datadog. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.nodeLabelsAsTags` | Proporciona una asignación entre las etiquetas de nodo de Kubernetes y etiquetas de Datadog. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.podAnnotationsAsTags` | Proporciona una asignación entre anotaciones de Kubernetes y etiquetas de Datadog. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
|  `datadog.podLabelsAsTags` | Proporciona una asignación entre las etiquetas de Kubernetes y las etiquetas de Datadog. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### Ejemplos

```yaml
datadog:
  # (...)
  namespaceLabelsAsTags:
    env: environment
    # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
  nodeLabelsAsTags:
    beta.kubernetes.io/instance-type: aws-instance-type
    kubernetes.io/role: kube_role
    # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
  podLabelsAsTags:
    app: kube_app
    release: helm_release
    # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
  podAnnotationsAsTags:
    iam.amazonaws.com/role: kube_iamrole
     # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{< /tabs >}}

## Usar archivos secretos

Las credenciales de integración pueden almacenarse en los secretos de Docker o Kubernetes y utilizarse en las plantillas de Autodiscovery. Para obtener más información, consulta [Gestión de secretos][12].

## Ignora los contenedores

Excluye contenedores de la recopilación de logs, métricas y Autodiscovery. Datadog excluye los contenedores `pause` de Kubernetes y OpenShift por defecto. Estas listas de permisos y denegaciones se aplican únicamente a Autodiscovery; las trazas y DogStatsD no se ven afectados. Estas variables de entorno admiten expresiones regulares en sus valores.

Consulta la página [Gestión de detección de contenedores][13] para ver ejemplos.

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se ven afectadas por estos ajustes. Se cuentan todos los contenedores.

## Tiempo de espera del servidor de API de Kubernetes

Por defecto, [el check de las métricas centrales de estado de Kubernetes][25] espera 10 segundos para recibir una respuesta del servidor de la API de Kubernetes. En el caso de clústeres de gran tamaño, es posible que se agote el tiempo de espera y se pierdan métricas.

Puedes evitarlo al configurar la variable de entorno `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT` en un valor superior al predeterminado de 10 segundos.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Actualiza tu `datadog-agent.yaml` con la siguiente configuración:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
          value: <value_greater_than_10>
```

A continuación, aplica la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Actualiza tu `datadog-values.yaml` con la siguiente configuración:

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

A continuación, actualiza tu tabla de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

## Parámetros del proxy

A partir del Agent v6.4.0 (y v6.5.0 para el Trace Agent), se pueden sobreescribir los valores de configuración de proxy del Agent con las siguientes variables de entorno:

| Variable de entorno             | Descripción                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | Una URL HTTP para usar como proxy para las solicitudes `http`.                     |
| `DD_PROXY_HTTPS`         | Una URL HTTPS para usar como proxy para las solicitudes `https`.                   |
| `DD_PROXY_NO_PROXY`      | Una lista separada por espacios de las URL para las que no se debe usar ningún proxy.      |
| `DD_SKIP_SSL_VALIDATION` | Una opción para comprobar si el Agent tiene problemas para conectarse a Datadog. |

## Definir el nombre de clúster

Algunas capacidades requieren que se defina un nombre de clúster Kubernetes. Un nombre de clúster válido debe ser único y debe estar separado por puntos, con las siguientes restricciones:

- Sólo puede contener letras minúsculas, números y guiones
- Debe empezar por una letra
- La longitud total debe ser inferior o igual a 80 caracteres

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Define `spec.global.clusterName` con tu nombre de clúster en `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
```
{{% /tab %}}

{{% tab "Helm" %}}
Define `datadog.clusterName` con tu nombre de clúster en `datadog-values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
```
{{% /tab %}}
{{< /tabs >}}

## Autodiscovery

| Variable de entorno                 | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | Oyentes de Autodiscovery para ejecutar.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | Oyentes de Autodiscovery adicionales para ejecutar. Se añaden además de las variables definidas en la sección `listeners` del archivo de configuración `datadog.yaml`.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | Los proveedores a los que el Agent debe llamar para recopilar las configuraciones de check. Los proveedores disponibles son: <br>`kubelet`: maneja plantillas incrustadas en anotaciones de pods. <br>`docker`: maneja plantillas incrustadas en etiquetas de contenedor. <br> `clusterchecks`: recupera configuraciones de check de clúster del Cluster Agent . <br>`kube_services`: controla servicios de Kubernetes para checks de clústeres. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | Proveedores de configuración de Autodiscovery adicionales a utilizar. Se añaden además de las variables definidas en la sección `config_providers` del archivo de configuración `datadog.yaml`. |

## Miscelánea

| Variable de entorno                        | Descripción                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Sobreescribe la detección automática del origen del contenedor para forzar un único origen. Por ejemplo: `"docker"`, `"ecs_fargate"`, `"kubelet"`. Esto ya no es necesario a partir de Agent v7.35.0.                                                                                                     |
| `DD_HEALTH_PORT`                    | Configura esto como `5555` para exponer el check de estado del Agent en el puerto `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Establece un identificador de clústeres de Kubernetes personalizado para evitar colisiones de alias de host. El nombre del clúster puede tener un máximo de 40 caracteres con las siguientes restricciones: solo letras minúsculas, números y guiones. Debe empezar por una letra. Debe terminar con un número o una letra. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Habilita la recopilación de eventos con el Agent. Si estás ejecutando varias instancias del Agent en tu clúster, configura también `DD_LEADER_ELECTION` en `true`.                                                                                                                       |


[1]: /es/agent/
[2]: /es/containers/cluster_agent/
[3]: https://app.datadoghq.com/containers
[5]: /es/containers/kubernetes/integrations/
[12]: /es/agent/configuration/secrets-management/
[13]: /es/agent/guide/autodiscovery-management/
[14]: /es/containers/guide/kubernetes_daemonset#cluster-agent-event-collection
[15]: /es/infrastructure/containers/
[16]: /es/containers/kubernetes/apm
[17]: /es/containers/kubernetes/log
[18]: /es/network_monitoring/cloud_network_monitoring/
[19]: /es/developers/dogstatsd
[20]: https://app.datadoghq.com/orchestration/overview
[21]: /es/infrastructure/containers/orchestrator_explorer
[22]: /es/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[23]: /es/infrastructure/process/ 
[24]: /es/account_management/api-app-keys/#application-keys
[25]: /es/integrations/kubernetes_state_core/
[26]: /es/containers/docker/?tab=standard#environment-variables