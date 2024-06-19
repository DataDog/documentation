---
aliases:
- /es/agent/guide/cluster-agent-custom-metrics-server
- /es/agent/cluster_agent/external_metrics
- /es/containers/cluster_agent/external_metrics
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Presentación del Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Autoescalar sus cargas de trabajo Kubernetes con cualquier métrica Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentación
  text: Ejecución de Cluster Checks con Autodiscovery
- link: /agent/kubernetes/daemonset_setup/
  tag: Documentación
  text: Configuración de Kubernetes DaemonSet
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Datadog Cluster Agent
kind: documentación
title: Escalado automático con Cluster Agent personalizado y métricas externas
---

## Información general

El escalado automático horizontal de pods, introducido en [Kubernetes v1.2][1], permite el escalado automático a partir de métricas básicas como `CPU`, pero requiere un recurso llamado `metrics-server` para ejecutarse junto a tu aplicación. A partir de Kubernetes v1.6, es posible el escalado automático a partir de [métricas personalizadas][2].

Las métricas personalizadas son definidas por el usuario y se recopilan desde dentro del clúster. A partir de Kubernetes v1.10, se introdujo el soporte para métricas externas para escalar automáticamente cualquier métrica procedente de fuera de clúster, como las recopiladas por Datadog.

Primero debes registrar Cluster Agent como proveedor de métricas externas. A continuación, adapta tus HPA para que se basen en las métricas proporcionadas por Cluster Agent.

A partir de la v1.0.0, el Custom Metrics Server de Datadog Cluster Agent implementa el Proveedor de métricas externas para las métricas externas. En esta página, se explica cómo configurarlo y cómo escalar automáticamente tu carga de trabajo de Kubernetes en función de las métricas de Datadog.

## Configuración

### Requisitos

1. Kubernetes >v1.10: debes registrar el recurso Proveedor de métricas externas en el servidor de la API.
2. Activa la [capa de agregación] de Kubernetes[3].
3. Una [Clave de API de Datadog **y** Clave de aplicación][4] válidas.

### Instalación

{{< tabs >}}
{{% tab "Helm" %}}

Para habilitar el servidor de métricas externas con tu Cluster Agent en Helm, actualiza tu archivo [values.yaml][1] con las siguientes configuraciones. Proporciona una Clave de API de Datadog válida, una clave de aplicación, y configura el `clusterAgent.metricsProvider.enabled` en `true`. Luego vuelve a desplegar tu tabla de Datadog Helm:

  ```yaml
  datadog:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
    #(...)

  clusterAgent:
    enabled: true
    # Habilite metricsProvider para poder escalar según las métricas en Datadog
    metricsProvider:
      # clusterAgent.metricsProvider.enabled
      # Establézca esto como verdadero para habilitar el Proveedor de métricas
      enabled: true
  ```

Esto actualiza automáticamente las configuraciones RBAC necesarias y establece las correspondientes `Service` y `APIService` para que Kubernetes las utilice.

Alternativamente, las claves pueden establecerse haciendo referencia a los nombres de `Secrets` creados previamente que contienen las claves de datos `api-key` y `app-key` con las configuraciones `datadog.apiKeyExistingSecret` y `datadog.appKeyExistingSecret`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

Para habilitar el servidor de métricas externas con tu Cluster Agent gestionado por el Datadog Operator, primero [configura el Datadog Operator][1]. A continuación, proporciona una clave de API de Datadog válida, una clave de aplicación, y configura `features.externalMetricsServer.enabled` en `true` en tu recurso personalizado `DatadogAgent`:

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_API_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

Operator actualiza automáticamente las configuraciones RBAC necesarias y establece los correspondientes `Service` y `APIService` para que Kubernetes los utilice.

Las claves pueden establecerse alternativamente haciendo referencia a los nombres de `Secrets` creados previamente y a las claves de datos que almacenan tus claves de API y de aplicación de Datadog.
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiSecret:
          secretName: <SECRET_NAME>
          keyName: <KEY_FOR_DATADOG_API_KEY>
        appSecret:
          secretName: <SECRET_NAME>
          keyName: <KEY_FOR_DATADOG_APP_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

[1]: /es/agent/guide/operator-advanced
{{% /tab %}}
{{% tab "Daemonset" %}}

#### Custom Metrics Server

Para activar Custom Metrics Server, primero sigue las instrucciones para [configurar el Datadog Cluster Agent][1] dentro de tu clúster. Una vez que hayas verificado que el despliegue base se ha realizado correctamente, edita tu manifiesto `Deployment` para el Datadog Cluster Agent con los siguientes pasos:

1. Establece la variable de entorno `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` en `true`.
2. Asegúrate de tener **ambas** variables de entorno `DD_APP_KEY` y `DD_API_KEY` establecidas.
3. Asegúrate de que tienes tu variable de entorno `DD_SITE` establecida para el sitio de Datadog: {{< region-param key="dd_site" code="true" >}}. Por defecto es el sitio `US` `datadoghq.com`.

#### Registrar el servicio del proveedor de métricas externas

Una vez que Datadog Cluster Agent esté en funcionamiento, aplica algunas políticas RBAC adicionales y configura `Service` para enrutar las solicitudes correspondientes.

1. Crea un `Service` llamado `datadog-custom-metrics-server`, exponiendo el puerto `8443` con el siguiente manifiesto `custom-metric-server.yaml`:

    ```yaml
    kind: Service
    apiVersion: v1
    metadata:
      name: datadog-custom-metrics-server
    spec:
      selector:
        app: datadog-cluster-agent
      ports:
      - protocol: TCP
        port: 8443
        targetPort: 8443
    ```
    **Nota:** Por defecto, Cluster Agent espera estas solicitudes a través del puerto `8443`. Sin embargo, si tu Cluster Agent `Deployment` ha establecido la variable de entorno `DD_EXTERNAL_METRICS_PROVIDER_PORT` en algún otro valor de puerto, cambia el `targetPort` de este `Service` en consecuencia.

    Aplica este `Service` ejecutando `kubectl apply -f custom-metric-server.yaml`
2. Descarga el archivo [archivo de reglas RBAC `rbac-hpa.yaml`][2].
3. Registra el Cluster Agent como proveedor de métricas externas aplicando este archivo:
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

[1]: /es/agent/cluster_agent/setup/?tab=daemonset
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
{{% /tab %}}
{{< /tabs >}}

Una vez habilitado, el Cluster Agent está listo para buscar métricas para el HPA. Hay dos opciones:
- [Escalado automático con consultas de DatadogMetric](#autoscaling-with-datadogmetric-queries)
- [Escalado automático sin consultas de DatadogMetric](#autoscaling-without-datadogmetric-queries)

Datadog recomienda utilizar la opción `DatadogMetric`. Aunque esto requiere un paso adicional de despliegue de `DatadogMetric` CustomResourceDefinition (CRD), aporta mucha más flexibilidad en las consultas realizadas. Si no utilizas consultas de `DatadogMetric`, tus HPA utilizan el formato de métricas externas nativo de Kubernetes, que el Cluster Agent traduce en una consulta de métrica de Datadog.

Si realizas un envío doble de tus métricas a varias organizaciones de Datadog, puedes configurar el Cluster Agent para obtener información de estos múltiples endpoints y lograr una alta disponibilidad. Para obtener más información, consulta la documentación [Dual Shipping][5].

## Escalado automático con consultas de DatadogMetric

Puedes escalar automáticamente una consulta de Datadog utilizando las versiones `DatadogMetric` [Custom Resource Definition (CRD)][6] y Datadog Cluster Agent `1.7.0` o versiones posteriores. Este es un enfoque más flexible y te permite escalar con la consulta de Datadog exacta que utilizarías en la aplicación.

### Requisitos

Para que el escalado automático funcione correctamente, las consultas personalizadas deben seguir estas reglas:

- La consulta **debe** ser sintácticamente correcta, de lo contrario impide la actualización de **TODAS** las métricas utilizadas para el escalado automático (detiene efectivamente el escalado automático).
- El resultado de la consulta **debe** mostrar solo una serie (de lo contrario, los resultados se consideran inválidos).
- La consulta **debería** devolver al menos dos puntos no nulos con marca de temporal (es posible utilizar una consulta que devuelva un único punto, aunque en este caso, el escalado automático podría utilizar puntos incompletos).

**Nota**: Aunque la consulta es arbitraria, las horas de inicio y fin siguen fijadas por defecto en `Now() - 5 minutes` y `Now()`.

### Configuración de DatadogMetric CRD

La Definición personalizada de recursos (CRD) para el objeto `DatadogMetric` puede ser añadida a tu clúster de Kubernetes usando Helm, Datadog Operator, o Daemonset:

{{< tabs >}}
{{% tab "Helm" %}}

Para activar el uso de `DatadogMetric` CRD, actualiza tu configuración [values.yaml][1] de Helm para establecer `clusterAgent.metricsProvider.useDatadogMetrics` en `true`. A continuación, vuelve a desplegar tu tabla Helm de Datadog:

  ```yaml
  clusterAgent:
    enabled: true
    metricsProvider:
      enabled: true
      # clusterAgent.metricsProvider.useDatadogMetrics
      # Habilitar el uso de DatadogMetric CRD para el escalado automático en consultas arbitrarias de Datadog
      useDatadogMetrics: true
  ```

**Nota:** Esto intenta instalar `DatadogMetric` CRD automáticamente. Si ese CRD ya existe antes de la instalación inicial de Helm, puede entrar en conflicto.

Esto actualiza automáticamente los archivos RBAC necesarios y dirige el Cluster Agent para gestionar estas consultas HPA a través de estos recursos `DatadogMetric`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

Para activar el uso de `DatadogMetric` CRD, actualiza tu recurso personalizado de `DatadogAgent` y establece `features.externalMetricsServer.useDatadogMetrics` en `true`.

  ```yaml
  kind: DatadogAgent
  apiVersion: datadoghq.com/v2alpha1
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_API_KEY>
    features:
      externalMetricsServer:
        enabled: true
        useDatadogMetrics: true
  ```

Operator actualiza automáticamente las configuraciones RBAC necesarias y dirige el Cluster Agent para gestionar estas consultas HPA a través de estos recursos `DatadogMetric`.

{{% /tab %}}
{{% tab "DaemonSet" %}}
Para activar el uso de `DatadogMetric` CRD, sigue estos pasos adicionales:

1. Instala el `DatadogMetric` CRD en tu clúster.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/helm-charts/master/crds/datadoghq.com_datadogmetrics.yaml"
    ```

2. Actualiza el manifiesto RBAC de Datadog Cluster Agent, se ha actualizado para permitir el uso de `DatadogMetric` CRD.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent-datadogmetrics/cluster-agent-rbac.yaml"
    ```

3. Establece el `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` en `true` en el despliegue del Datadog Cluster Agent.
{{% /tab %}}
{{< /tabs >}}

### Cree el objeto DatadogMetric
Una vez añadido el recurso personalizado `DatadogMetric` a tu clúster, puedes crear objetos `DatadogMetric` para que tus HPA los referencien. Aunque cualquier HPA puede hacer referencia a cualquier `DatadogMetric`, Datadog recomienda crearlos en el mismo espacio de nombres que tu HPA.

**Nota**: Varias HPA pueden utilizar el mismo `DatadogMetric`.

Puedes crear un `DatadogMetric` con el siguiente manifiesto:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <DATADOG_METRIC_NAME>
spec:
  query: <CUSTOM_QUERY>
```

#### Ejemplo de objeto DatadogMetric
Por ejemplo, un objeto `DatadogMetric` para el escalado automático de un despliegue NGINX basado en la métrica `nginx.net.request_per_s` de Datadog:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

### Utiliza DatadogMetric en HPA
Una vez configurado tu Cluster Agent y creado `DatadogMetric`, actualiza tu HPA para que haga referencia a este `DatadogMetric` en relación con su espacio de nombres y su nombre. El formato general es especificar la métrica para la HPA como `type: External` y especificar el nombre de métrica como `datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>`.

#### Ejemplo de HPA con DatadogMetric
Una HPA que utiliza el `DatadogMetric` denominado `nginx-requests`, suponiendo que ambos objetos se encuentran en el espacio de nombres `nginx-demo`.

Uso de `apiVersion: autoscaling/v2`:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@nginx-demo:nginx-requests
      target:
        type: Value
        value: 9
```

Uso de `apiVersion: autoscaling/v2beta1`:

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: datadogmetric@nginx-demo:nginx-requests
      targetValue: 9
```

En estos manifiestos:
- La HPA está configurada para escalar automáticamente el despliegue denominado `nginx`.
- El número máximo de réplicas creadas es `3` y el mínimo es `1`.
- La HPA se basa en el `DatadogMetric` `nginx-requests` en el espacio de nombres `nginx-demo`.

Una vez que el `DatadogMetric` está vinculado a una HPA, el Datadog Cluster Agent lo marca como activo. A continuación, Cluster Agent realiza solicitudes a Datadog para la consulta, almacena los resultados en el objeto `DatadogMetric` y proporciona los valores a la HPA.

## Escalado automático sin consultas de DatadogMetric
Si no deseas escalar automáticamente con `DatadogMetric`, puedes seguir creando tus HPA con el formato nativo de Kubernetes. El Cluster Agent convierte el formato HPA en una consulta de métrica de Datadog.

Una vez que tengas el Datadog Cluster Agent funcionando y el servicio registrado, crea un manifiesto [HPA][7] y especifica `type: External` para tus métricas. Esto notifica a la HPA que extraiga las métricas del servicio Datadog Cluster Agent:

```yaml
spec:
  metrics:
    - type: External
      external:
        metricName: "<METRIC_NAME>"
        metricSelector:
          matchLabels:
            <TAG_KEY>: <TAG_VALUE>
```

### Ejemplo de HPA sin DatadogMetric
Un manifiesto HPA para el escalado automático de un despliegue NGINX basado en la métrica de Datadog `nginx.net.request_per_s` usando `apiVersion: autoscaling/v2`:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metric:
        name: nginx.net.request_per_s
      target:
        type: Value
        value: 9
```

A continuación, se muestra el mismo manifiesto HPA anterior utilizando `apiVersion: autoscaling/v2beta1`:
```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: nginx.net.request_per_s
      metricSelector:
        matchLabels:
            kube_container_name: nginx
      targetValue: 9
```

En estos manifiestos:

- La HPA está configurada para el escalado automático del despliegue denominado `nginx`.
- El número máximo de réplicas creadas es `3` y el mínimo es `1`.
- La métrica utilizada es `nginx.net.request_per_s` y el contexto es `kube_container_name: nginx`. Este formato corresponde al de las métricas de Datadog.

Cada 30 segundos, Kubernetes consulta a Datadog Cluster Agent para obtener el valor de esta métrica y se hace el escalado automático proporcionalmente si es necesario. Para casos de uso avanzados, es posible tener varias métricas en la misma HPA. Como se indica en el [escalado automático horizontal del pod de Kubernetes][8], se elige el mayor de los valores propuestos.

### Migración

Las HPA existentes se migran automáticamente utilizando métricas externas.

Cuando se establece `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` en `true` pero aún se tienen HPA que **no** hacen referencia a `DatadogMetric`, la sintaxis normal (sin hacer referencia a `DatadogMetric` mediante `datadogmetric@...`) sigue siendo compatible.

Para ello, Datadog Cluster Agent crea automáticamente recursos de `DatadogMetric` en su propio espacio de nombres (su nombre empieza por `dcaautogen-`), lo que permite una transición fluida a `DatadogMetric`.

Si decides migrar una HPA posteriormente para hacer referencia a un `DatadogMetric`, Datadog Cluster Agent limpia el recurso generado automáticamente al cabo de unas horas.

## Consultas al Cluster Agent
El Cluster Agent realiza las consultas de los objetos `DatadogMetric` cada 30 segundos. Cluster Agent también agrupa en lotes de 35 las consultas realizadas a la métrica. Por lo tanto, se incluyen 35 consultas `DatadogMetric` en una única solicitud a la API de métricas de Datadog.

Al agrupar estas consultas por lotes, Cluster Agent puede realizarlas con mayor eficacia y evitar los límites de velocidad.

Esto significa que Cluster Agent realiza aproximadamente 120 solicitudes API por hora por cada 35 objetos `DatadogMetric`. A medida que se añaden más objetos `DatadogMetric` o se añade la funcionalidad de escalado automático a clústeres de Kubernetes adicionales, aumenta el número de llamadas para buscar métricas dentro de la misma organización.

Cluster Agent también consulta los últimos cinco minutos de datos por defecto para cada una de estas consultas de métrica. Esto es para asegurar que Cluster Agent está escalando datos *recientes*. Sin embargo, si tus consultas de métrica se basan en datos de una de las integraciones en la nube (AWS, Azure, GCP, etc.), estos se [obtienen con un ligero retraso][9] y no se incluyen dentro del intervalo de cinco minutos. En estos casos, proporciona las variables de entorno al Cluster Agent para aumentar el intervalo de fechas y la antigüedad de los datos permitidos para las consultas de métricas.

```yaml
- name: DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE
  value: "900"
- name: DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE
  value: "900"
```

## Resolución de problemas

### Estado de DatadogMetric
Datadog Cluster Agent se encarga de actualizar el subrecurso `status` de todos los recursos `DatadogMetric` para reflejar los resultados de las consultas a Datadog. Esta es la principal fuente de información para entender qué ocurre si algo está fallando. Puedes ejecutar lo siguiente para obtener esta información:

```shell
kubectl describe datadogmetric <RESOURCE NAME>
```

#### Ejemplo

La parte `status` de un `DatadogMetric`:

```yaml
status:
  conditions:
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Active
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Valid
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Updated
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "False"
    type: Error
  currentValue: "1977.2"
```

Las cuatro condiciones te dan una idea del estado actual de tu `DatadogMetric`:

- `Active`: Datadog considera que un `DatadogMetric` está activo si al menos una HPA hace referencia a él. Los `DatadogMetrics` inactivos no se actualizan para minimizar el uso de la API.
- `Valid`: Datadog considera que un `DatadogMetric` es válido cuando la respuesta para la consulta asociada es válida. Un estado no válido probablemente significa que tu consulta personalizada no es semánticamente correcta. Consulta el campo `Error` para obtener más detalles.
- `Updated`: esta condición se actualiza **siempre** cuando el Datadog Cluster Agent toca un `DatadogMetric`.
- `Error`: si procesar este `DatadogMetric` desencadena un error, esta condición es verdadera y contiene los detalles del error.

`currentValue` es el valor recogido en Datadog y devuelto a las HPA.

### Value frente a AverageValue para la métrica de destino
Las HPA de este ejemplo utilizan el tipo de destino `Value` en lugar de `AverageValue`. Ambas opciones son compatibles. Ajusta tus consultas de métrica de Datadog en consecuencia.

Cuando se utiliza `Value`, el valor de métrica devuelto por la consulta de métrica de Datadog se proporciona exactamente tal cual a la HPA para su decisión de escalado. Cuando se utiliza `AverageValue`, el valor de métrica devuelto se divide por el número actual de pods. Configura tu `<Metric Value>` en función de cómo deseas que tu HPA escale en función de tu consulta y el valor devuelto.

Utilizando `apiVersion: autoscaling/v2`, la configuración de métrica de destino para `Value` tiene el siguiente aspecto:
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>
      target:
        type: Value
        value: <METRIC_VALUE>
```

Por su parte, `AverageValue` luce así:
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>
      target:
        type: AverageValue
        averageValue: <METRIC_VALUE>
```

Para `apiVersion: autoscaling/v2beta1`, las opciones respectivas son `targetValue` y `targetAverageValue`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /es/account_management/api-app-keys/
[5]: /es/agent/configuration/dual-shipping/?tab=helm#cluster-agent-metrics-provider
[6]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions
[7]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[9]: /es/integrations/guide/cloud-metric-delay