---
aliases:
- /es/integrations/faq/gathering-kubernetes-events
- /es/agent/kubernetes/event_collection
- /es/agent/kubernetes/configuration
description: Opciones de configuración adicionales para APM, registros, procesos,
  eventos y otras capacidades después de instalar el Agente de Datadog
title: Configurar aún más el Agente de Datadog en Kubernetes
---
## Descripción general {#overview}

Después de haber instalado el Agente de Datadog en su entorno de Kubernetes, puede elegir opciones de configuración adicionales.

### Habilitar a Datadog para recopilar: {#enable-datadog-to-collect}
- [Trazas (APM)](#enable-apm-and-tracing)
- [Eventos de Kubernetes](#enable-kubernetes-event-collection)
- [CNM](#enable-cnm-collection)
- [Registros](#enable-log-collection)
- [Procesos](#enable-process-collection)

### Otras capacidades {#other-capabilities}
- [Agente de Clúster de Datadog](#datadog-cluster-agent)
- [Integraciones](#integrations)
- [Vista de contenedores](#containers-view)
- [Explorador de Orquestador](#orchestrator-explorer)
- [Servidor de métricas externas](#custom-metrics-server)

### Más configuraciones {#more-configurations}
- [Variables de entorno](#environment-variables)
- [DogStatsD para métricas personalizadas](#configure-dogstatsd)
- [Mapeo de etiquetas](#configure-tag-mapping)
- [Secretos](#using-secret-files)
- [Ignorar contenedores](#ignore-containers)
- [Tiempo de espera del servidor API de Kubernetes](#kubernetes-api-server-timeout)
- [Configuraciones de proxy](#proxy-settings)
- [Autodiscovery](#autodiscovery)
- [Establecer nombre del clúster](#set-cluster-name)
- [Varios](#miscellaneous)

## Habilitar APM y trazado {#enable-apm-and-tracing}

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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

En Helm, APM está **habilitado por defecto** sobre UDS o tubería con nombre de Windows.

Para verificar, asegúrate de que `datadog.apm.socketEnabled` esté establecido en `true` en tu `values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

{{% /tab %}}
{{< /tabs >}}

Para más información, consulta [Colección de trazas de Kubernetes][16].

## Habilitar colección de eventos de Kubernetes {#enable-kubernetes-event-collection}

Usa el [Agente de Clúster de Datadog][2] para recopilar eventos de Kubernetes. 

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

La colección de eventos está habilitada por defecto por el Operador de Datadog. Esto se puede gestionar en la configuración `features.eventCollection.collectKubernetesEvents` en tu `datadog-agent.yaml`.

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

Para recopilar eventos de Kubernetes con el Agente de Clúster de Datadog, asegúrate de que las opciones `clusterAgent.enabled`, `datadog.collectEvents` y `clusterAgent.rbac.create` estén establecidas en `true` en tu archivo `datadog-values.yaml`.

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

Si no deseas usar el Agente de Clúster, aún puedes tener un Agente de Nodo que recopile eventos de Kubernetes estableciendo las opciones `datadog.leaderElection`, `datadog.collectEvents` y `agents.rbac.create` en `true` en tu archivo `datadog-values.yaml`.

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

Para la configuración de DaemonSet, consulte [Recopilación de eventos del Cluster Agent de DaemonSet][14].

## Habilitar la colección de CNM {#enable-cnm-collection}

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

En su `datadog-agent.yaml`, configure `features.npm.enabled` a `true`.

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

Luego aplique la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Actualice su `datadog-values.yaml` con la siguiente configuración:

```yaml
datadog:
  # (...)
  networkMonitoring:
    enabled: true
```

Luego actualice su gráfico de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

Para más información, consulte [Monitoreo de red en la nube][18].

## Habilitar la colección de registro {#enable-log-collection}

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
En su `datadog-agent.yaml`, configure `features.logCollection.enabled` y `features.logCollection.containerCollectAll` a `true`.

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

Luego aplique la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Actualice su `datadog-values.yaml` con la siguiente configuración:

```yaml
datadog:
  # (...)
  logs:
    enabled: true
    containerCollectAll: true
```

Luego actualice su gráfico de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Para más información, consulte [Colección de registro de Kubernetes][17].

## Habilitar la colección de procesos {#enable-process-collection}

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
En su `datadog-agent.yaml`, configure `features.liveProcessCollection.enabled` a `true`.

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

Luego aplique la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Actualice su `datadog-values.yaml` con la siguiente configuración:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
    processCollection: true
```

Luego actualice su gráfico de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Para más información, consulte [Live Processes][23]
## Datadog Cluster Agent {#datadog-cluster-agent}

El Datadog Cluster Agent proporciona un enfoque centralizado y simplificado para la recopilación de datos de seguimiento a nivel de clúster. Datadog recomienda encarecidamente utilizar el Cluster Agent para monitorear Kubernetes.

El operador de Datadog v1.0.0+ y el gráfico de Helm v2.7.0+ **habilitan el Cluster Agent por defecto**. No se requiere configuración adicional.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

El operador de Datadog v1.0.0+ habilita el agente de clúster por defecto. El operador crea los RBAC necesarios y despliega el agente de clúster. Ambos Agentes utilizan la misma clave de API.

El Operador genera automáticamente un token aleatorio en un Kubernetes `Secret` que será compartido por el Datadog Agent y el Cluster Agent para una comunicación segura. 

Puedes especificar manualmente este token en el campo `global.clusterAgentToken` en tu `datadog-agent.yaml`:

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

Alternativamente, puedes especificar este token haciendo referencia al nombre de un `Secret` existente y la clave de datos que contiene este token:

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

**Nota**: Cuando se establece manualmente, este token debe tener 32 caracteres alfanuméricos.

Luego aplique la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

El gráfico de Helm v2.7.0+ habilita el Cluster Agent por defecto.

Para verificación, asegúrate de que `clusterAgent.enabled` esté configurado en `true` en tu `datadog-values.yaml`:

```yaml
clusterAgent:
  enabled: true
```

Helm genera automáticamente un token aleatorio en un Kubernetes `Secret` que será compartido por el Agente de Datadog y el Agente de Clúster para una comunicación segura. 

Puedes especificar manualmente este token en el campo `clusterAgent.token` en tu `datadog-agent.yaml`:

```yaml
clusterAgent:
  enabled: true
  token: <DATADOG_CLUSTER_AGENT_TOKEN>
```

Alternativamente, puedes especificar este token haciendo referencia al nombre de un `Secret` existente, donde el token está en una clave llamada `token`:

```yaml
clusterAgent:
  enabled: true
  tokenExistingSecret: <SECRET_NAME>
```

{{% /tab %}}
{{< /tabs >}}

Para más información, consulta la [documentación del Agente de Clúster de Datadog][2].

## Servidor de métricas personalizadas {#custom-metrics-server}

Para utilizar la función de [servidor de métricas personalizadas][22] del Agente de Clúster, debes proporcionar una [clave de aplicación][24] de Datadog y habilitar el proveedor de métricas.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
En `datadog-agent.yaml`, proporciona una clave de aplicación bajo `spec.global.credentials.appKey` y establece `features.externalMetricsServer.enabled` en `true`.

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

Luego aplique la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
En `datadog-values.yaml`, proporciona una clave de aplicación bajo `datadog.appKey` y establece `clusterAgent.metricsProvider.enabled` en `true`.

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

clusterAgent:
  enabled: true
  metricsProvider:
    enabled: true
```

Luego actualice su gráfico de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

## Integraciones {#integrations}

Una vez que el Agente esté en funcionamiento en tu clúster, utiliza la función de [Autodiscovery de Datadog][5] para recopilar métricas y registro automáticamente de tus pods.

## Visualización de contenedores {#containers-view}

Para utilizar el [Explorador de contenedores][3] de Datadog, habilita el Agente de Procesos. El Operador de Datadog y el gráfico de Helm **habilitan el Agente de Procesos por defecto**. No se requiere configuración adicional.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

El Operador de Datadog habilita el Agente de Procesos por defecto. 

Para verificación, asegúrate de que `features.liveContainerCollection.enabled` esté configurado en `true` en tu `datadog-agent.yaml`:

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
En algunas configuraciones, el Agente de Procesos y el Agente de Clúster no pueden detectar automáticamente el nombre de un clúster de Kubernetes. Si esto sucede, la función no se inicia y la siguiente advertencia se muestra en el registro del Agente de Clúster: `Orchestrator explorer enabled but no cluster name set: disabling`. En este caso, debes establecer `spec.global.clusterName` como el nombre de tu clúster en `datadog-agent.yaml`:

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

El gráfico de Helm habilita el Agente de Proceso por defecto.

Para verificación, asegúrate de que `processAgent.enabled` esté configurado en `true` en tu `datadog-values.yaml`:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

En algunas configuraciones, el Agente de Procesos y el Agente de Clúster no pueden detectar automáticamente el nombre de un clúster de Kubernetes. Si esto sucede, la función no se inicia y la siguiente advertencia se muestra en el registro del Agente de Clúster: `Orchestrator explorer enabled but no cluster name set: disabling.`. En este caso, debes establecer `datadog.clusterName` como el nombre de tu clúster en `datadog-values.yaml`.

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

Para restricciones sobre nombres de clúster válidos, consulta [Establecer nombre de clúster](#set-cluster-name).

Consulta la documentación de la [Containers view][15] para información adicional.

## Orchestrator Explorer {#orchestrator-explorer}

El Datadog Operator y el Helm chart **habilitan por defecto [Orchestrator Explorer][20] de Datadog**. No se requiere configuración adicional.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

El Orchestrator Explorer está habilitado en el Datadog Operator por defecto. 

Para verificación, asegúrese de que el parámetro `features.orchestratorExplorer.enabled` esté establecido en `true` en su `datadog-agent.yaml`:

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

En algunas configuraciones, el Agente de Procesos y el Agente de Clúster no pueden detectar automáticamente el nombre de un clúster de Kubernetes. Si esto sucede, la función no se inicia y la siguiente advertencia se muestra en el registro del Agente de Clúster: `Orchestrator explorer enabled but no cluster name set: disabling`. En este caso, debe establecer `spec.global.clusterName` como el nombre de su clúster en `datadog-agent.yaml`:

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

El gráfico de Helm habilita el Explorador de Orquestador por defecto.

Para verificación, asegúrate de que el parámetro `orchestratorExplorer.enabled` esté establecido en `true` en tu archivo `datadog-values.yaml`:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

En algunas configuraciones, el Agente de Procesos y el Agente de Clúster no pueden detectar automáticamente el nombre de un clúster de Kubernetes. Si esto sucede, la función no se inicia y la siguiente advertencia se muestra en el registro del Agente de Clúster: `Orchestrator explorer enabled but no cluster name set: disabling.`. En este caso, debe establecer `datadog.clusterName` como el nombre de su clúster en `values.yaml`.

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

Para restricciones sobre nombres de clúster válidos, consulta [Establecer nombre de clúster](#set-cluster-name).

Consulta la [Orchestrator Explorer documentation][21] para información adicional.

## Configuración básica {#basic-configuration}

Utilice los siguientes campos de configuración para configurar el Agente de Datadog.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| Parámetro (v2alpha1) |  Descripción |
| --------------------------- | ----------- |
| `global.credentials.apiKey` |  Configure su clave de API de Datadog. |
| `global.credentials.apiSecret.secretName` | En lugar de `global.credentials.apiKey`, proporcione el nombre de un `Secret` de Kubernetes que contenga su clave de API de Datadog.|
| `global.credentials.apiSecret.keyName` | En lugar de `global.credentials.apiKey`, proporcione la clave del `Secret` de Kubernetes nombrado en `global.credentials.apiSecret.secretName`.|
| `global.credentials.appKey` |  Configure su clave de aplicación de Datadog. Si está utilizando el servidor de métricas externo, debe establecer una clave de aplicación de Datadog para el acceso de lectura a sus métricas. |
| `global.credentials.appSecret.secretName` | En lugar de `global.credentials.apiKey`, proporcione el nombre de un `Secret` de Kubernetes que contenga su clave de aplicación de Datadog.|
| `global.credentials.appSecret.keyName` | En lugar de `global.credentials.apiKey`, proporcione la clave del `Secret` de Kubernetes nombrado en `global.credentials.appSecret.secretName`.|
| `global.logLevel` | Establece la verbosidad de los registros. Esto puede ser anulado por el contenedor. Los niveles de registro válidos son: `trace`, `debug`, `info`, `warn`, `error`, `critical` y `off`. Predeterminado: `info`. |
| `global.registry` | Registro de imágenes a utilizar para todas las imágenes del Agente. Predeterminado: `gcr.io/datadoghq`. |
| `global.site` | Establece el [sitio de recepción][1] de Datadog al cual se envían los datos del Agente. Su sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el SITIO correcto esté seleccionado a la derecha). |
| `global.tags` | Una lista de etiquetas para adjuntar a cada métrica, evento y verificación de servicio recolectados. |

Para una lista completa de campos de configuración para el Datadog Operator, consulte la [especificación del Operador v2alpha1][2]. Para versiones anteriores, consulte [Migrar CRDs de DatadogAgent a v2alpha1][3]. Los campos de configuración también se pueden consultar utilizando `kubectl explain datadogagent --recursive`.

[1]: /es/getting_started/
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[3]: /es/containers/guide/v2alpha1_migration/
{{% /tab %}}
{{% tab "Helm" %}}
|  Helm | Descripción |
|  ---- | ----------- |
|  `datadog.apiKey` | Configure su clave de API de Datadog. |
| `datadog.apiKeyExistingSecret` | En lugar de `datadog.apiKey`, proporcione el nombre de un `Secret` de Kubernetes existente que contenga su clave de API de Datadog, configurada con el nombre de clave `api-key`. |
|  `datadog.appKey` | Configure su clave de aplicación de Datadog. Si está utilizando el servidor de métricas externo, debe establecer una clave de aplicación de Datadog para el acceso de lectura a sus métricas. |
| `datadog.appKeyExistingSecret` | En lugar de `datadog.appKey`, proporcione el nombre de un `Secret` de Kubernetes existente que contenga su clave de aplicación de Datadog, configurada con el nombre de clave `app-key`. |
| `datadog.logLevel` | Establece la verbosidad de los registros. Esto puede ser anulado por el contenedor. Los niveles de registro válidos son: `trace`, `debug`, `info`, `warn`, `error`, `critical` y `off`. Predeterminado: `info`. |
| `registry` | Registro de imágenes a utilizar para todas las imágenes del Agente. Predeterminado: `gcr.io/datadoghq`. |
| `datadog.site` | Establece el [sitio de recepción][1] de Datadog al que se envían los datos del Agente. Su sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el SITIO correcto esté seleccionado a la derecha). |
| `datadog.tags` | Una lista de etiquetas para adjuntar a cada métrica, evento y verificación de servicio recolectados. |

Para una lista completa de variables de entorno para el gráfico de Helm, consulte la [lista completa de opciones][2] para `datadog-values.yaml`.

[1]: /es/getting_started/site
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
{{% /tab %}}
{{% tab "DaemonSet" %}}
| Variable de entorno         | Descripción                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Su clave de API de Datadog (**requerida**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Establece la etiqueta global `env` para todos los datos emitidos.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Nombre de servidor a utilizar para métricas (si la autodetección falla)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Etiquetas de servidor separadas por espacios. Por ejemplo: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Sitio de destino para sus métricas, trazas y registros. Su `DD_SITE` es {{< region-param key="dd_site" code="true">}}. Por defecto es `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Configuración opcional para anular la URL para la presentación de métricas.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | Alias para `DD_DD_URL`. Ignorado si `DD_DD_URL` ya está configurado.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | El Agente ejecuta todas las verificaciones de manera concurrente por defecto (valor predeterminado = `4` ejecutores). Para ejecutar las verificaciones de manera secuencial, establezca el valor en `1`. Si necesita ejecutar un gran número de verificaciones (o verificaciones lentas), el componente `collector-queue` podría quedarse atrás y fallar la verificación de salud. Puede aumentar el número de ejecutores para ejecutar verificaciones en paralelo. |
| `DD_LEADER_ELECTION` | Si múltiples instancias del Agente están ejecutándose en su clúster, establezca esta variable en `true` para evitar la duplicación de la recolección de eventos.                                                                                                                                                                                                                         |
{{% /tab %}}
{{< /tabs >}}

## Variables de entorno {#environment-variables}
El Agente de Datadog en contenedores se puede configurar utilizando variables de entorno. Para una lista extensa de variables de entorno soportadas, consulte la sección de [Variables de entorno][26] de la documentación del Agente de Docker.

### Ejemplos {#examples}
{{< tabs >}}
{{% tab "Datadog Operator" %}}
Al usar el Datadog Operator, puede establecer variables de entorno adicionales en `override` para un componente con `[key].env []object`, o para un contenedor con `[key].containers.[key].env []object`. Las siguientes claves son soportadas: 

- `nodeAgent`
- `clusterAgent`
- `clusterChecksRunner`

Las configuraciones a nivel de contenedor tienen prioridad sobre cualquier configuración a nivel de componente.

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
Agregue variables de entorno al DaemonSet o al Deployment (para el Agente de Clúster de Datadog).

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

## Configurar DogStatsD {#configure-dogstatsd}

DogStatsD puede enviar métricas personalizadas a través de UDP con el protocolo StatsD. **DogStatsD está habilitado por defecto por el Datadog Operator y Helm**. Consulte la [documentación de DogStatsD][19] para más información.

Puede usar las siguientes variables de entorno para configurar DogStatsD con DaemonSet:

| Variable de Entorno                     | Descripción                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Escuchar paquetes de DogStatsD de otros contenedores (requerido para enviar métricas personalizadas).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Los percentiles del histograma a calcular (separados por espacios). El valor por defecto es `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Los agregados del histograma a calcular (separados por espacios). El valor por defecto es `"max median avg count"`.                                                          |
| `DD_DOGSTATSD_SOCKET`            | Ruta al socket Unix para escuchar. Debe estar en un `rw` volumen montado.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Habilitar la detección y etiquetado de contenedores para métricas de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Etiquetas adicionales para agregar a todas las métricas, eventos y verificaciones de servicio recibidos por este servidor DogStatsD, por ejemplo: `"env:golden group:retrievers"`. |

## Configurar el mapeo de etiquetas {#configure-tag-mapping}

Datadog recopila automáticamente etiquetas comunes de Kubernetes.

Además, puede mapear las etiquetas de los nodos de Kubernetes, las etiquetas de los pods y las anotaciones a las etiquetas de Datadog. Utilice las siguientes variables de entorno para configurar este mapeo:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| Parámetro (v2alpha1) |  Descripción |
| --------------------------- |  ----------- |
| `global.namespaceLabelsAsTags` |  Proporcionar un mapeo de las etiquetas de espacio de nombres de Kubernetes a las etiquetas de Datadog. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.nodeLabelsAsTags` | Proporcionar un mapeo de las etiquetas de nodos de Kubernetes a las etiquetas de Datadog. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.podAnnotationsAsTags` |  Proporcionar un mapeo de las anotaciones de Kubernetes a las etiquetas de Datadog. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
| `global.podLabelsAsTags` |  Proporcionar un mapeo de las etiquetas de Kubernetes a las etiquetas de Datadog. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### Ejemplos {#examples-1}

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
|  `datadog.namespaceLabelsAsTags` | Proporcionar un mapeo de las etiquetas de espacio de nombres de Kubernetes a las etiquetas de Datadog. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.nodeLabelsAsTags` | Proporcionar un mapeo de las etiquetas de nodos de Kubernetes a las etiquetas de Datadog. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.podAnnotationsAsTags` | Proporcionar un mapeo de las anotaciones de Kubernetes a las etiquetas de Datadog. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
|  `datadog.podLabelsAsTags` | Proporcionar un mapeo de las etiquetas de Kubernetes a las etiquetas de Datadog. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### Ejemplos {#examples-2}

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

## Usando archivos secretos {#using-secret-files}

Las credenciales de integración se pueden almacenar en secretos de Docker o Kubernetes y utilizarse en plantillas de Autodiscovery. Para más información, consulte [Gestión de Secretos][12].

## Ignorar contenedores {#ignore-containers}

Excluya contenedores de la recopilación de registros, la recopilación de métricas y la Autodiscovery. Datadog excluye `pause` contenedores de Kubernetes y OpenShift por defecto. Estas listas de permitidos y bloqueados se aplican solo a Autodiscovery; las trazas y DogStatsD no se ven afectados. Estas variables de entorno admiten expresiones regulares en sus valores.

Consulte la página de [Gestión de Descubrimiento de Contenedores][13] para ejemplos.

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se ven afectadas por estas configuraciones. Todos los contenedores son contados.

## Tiempo de espera del servidor API de Kubernetes {#kubernetes-api-server-timeout}

Por defecto, la [verificación de Métricas del Estado de Kubernetes][25] espera 10 segundos para una respuesta del servidor API de Kubernetes. Para clústeres grandes, la solicitud puede agotar el tiempo, lo que resulta en métricas faltantes.

Puede evitar esto configurando la variable de entorno `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT` a un valor más alto que el tiempo predeterminado de 10 segundos.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Actualice su `datadog-agent.yaml` con la siguiente configuración:

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

Luego aplique la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Actualice su `datadog-values.yaml` con la siguiente configuración:

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

Luego actualice su Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

## Configuraciones de proxy {#proxy-settings}

A partir de la versión 6.4.0 del Agente (y de la 6.5.0 para el Trace Agent), puede anular las configuraciones de proxy del Agente con las siguientes variables de entorno:

| Variable de Entorno             | Descripción                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | Una URL HTTP para usar como proxy para solicitudes de `http`.                     |
| `DD_PROXY_HTTPS`         | Una URL HTTPS para usar como proxy para solicitudes de `https`.                   |
| `DD_PROXY_NO_PROXY`      | Una lista de URLs separadas por espacios para las cuales no se debe usar proxy.      |
| `DD_SKIP_SSL_VALIDATION` | Una opción para probar si el Agente tiene problemas para conectarse a Datadog. |

## Establecer el nombre del clúster {#set-cluster-name}

Algunas capacidades requieren que establezca un nombre de clúster de Kubernetes. Un nombre de clúster válido debe ser único y estar separado por puntos, con las siguientes restricciones:

- Puede contener solo letras minúsculas, números y guiones
- Debe comenzar con una letra
- La longitud total es menor o igual a 80 caracteres

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Establezca `spec.global.clusterName` como el nombre de su clúster en `datadog-agent.yaml`:

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
Establezca `datadog.clusterName` como el nombre de su clúster en `datadog-values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
```
{{% /tab %}}
{{< /tabs >}}

## Autodiscovery {#autodiscovery}

| Variable de entorno                 | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | Listeners de Autodiscovery para ejecutar.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | Listeners de Autodiscovery adicionales para ejecutar. Se añaden además de las variables definidas en la sección `listeners` del archivo de configuración `datadog.yaml`.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | Los proveedores que el Agente debe llamar para recopilar configuraciones de verificación. Los proveedores disponibles son: <br>`kubelet` - Maneja plantillas incrustadas en anotaciones de pod. <br>`docker` - Maneja plantillas incrustadas en etiquetas de contenedor. <br>`clusterchecks` - Recupera configuraciones de verificación a nivel de clúster desde el Cluster Agent. <br>`kube_services` - Observa los servicios de Kubernetes para verificaciones de clúster. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | Proveedores adicionales de configuración de Autodiscovery para usar. Se añaden además de las variables definidas en la sección `config_providers` del archivo de configuración `datadog.yaml`. |

## Varios {#miscellaneous}

| Variable de entorno                        | Descripción                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Anula la detección automática de la fuente del contenedor para forzar una única fuente. p. ej. `"docker"`, `"ecs_fargate"`, `"kubelet"`. Esto ya no es necesario desde la versión 7.35.0 del Agente.                                                                                                     |
| `DD_HEALTH_PORT`                    | Establezca esto en `5555` para exponer la verificación de salud del Agente en el puerto `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Establezca un identificador de clúster de Kubernetes personalizado para evitar colisiones de alias de host. El nombre del clúster puede tener hasta 40 caracteres con las siguientes restricciones: solo letras minúsculas, números y guiones. Debe comenzar con una letra. Debe terminar con un número o una letra. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Habilitar la recopilación de eventos con el Agente. Si está ejecutando múltiples instancias del Agente en su clúster, establezca `DD_LEADER_ELECTION` en `true` también.                                                                                                                       |


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
[19]: /es/extend/dogstatsd
[20]: https://app.datadoghq.com/orchestration/overview
[21]: /es/infrastructure/containers/orchestrator_explorer
[22]: /es/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[23]: /es/infrastructure/process/ 
[24]: /es/account_management/api-app-keys/#application-keys
[25]: /es/integrations/kubernetes_state_core/
[26]: /es/containers/docker/?tab=standard#environment-variables