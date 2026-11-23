---
aliases:
- /es/getting_started/prometheus
- /es/getting_started/integrations/prometheus
- /es/agent/openmetrics
- /es/agent/prometheus
- /es/agent/kubernetes/prometheus
description: Recopile métricas de Prometheus y OpenMetrics de cargas de trabajo de
  Kubernetes mediante el Datadog Agent con Autodiscovery
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopile automáticamente las métricas y los registros de sus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
- link: /integrations/guide/prometheus-metrics/
  tag: Documentación
  text: Asignación de métricas de Prometheus a métricas de Datadog
- link: https://www.datadoghq.com/blog/migrate-to-gateway-api/
  tag: Blog
  text: 'Ingress NGINX ha llegado al fin de su vida útil (EOL): una guía práctica
    para migrar a Kubernetes Gateway API'
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Haga un seguimiento de sus operadores de Kubernetes para mantener las aplicaciones
    funcionando sin problemas
title: Recopilación de métricas de Prometheus y OpenMetrics en Kubernetes
---
## Descripción general {#overview}

Recopile sus métricas expuestas de Prometheus y OpenMetrics de su aplicación que se ejecuta dentro de Kubernetes mediante el Datadog Agent y las integraciones de [OpenMetrics][1] o [Prometheus][2]. De forma predeterminada, todas las métricas recuperadas por la comprobación genérica de Prometheus se consideran Custom Metrics.

A partir de la versión 6.5.0, el Agent incluye comprobaciones de [OpenMetrics][3] y [Prometheus][4] capaces de extraer métricas de los puntos de conexión de Prometheus. Para un uso más avanzado de la interfaz `OpenMetricsCheck`, incluida la escritura de una verificación personalizada, consulte la sección [Developer Tools][5].

Esta página explica el uso básico de estas comprobaciones, que le permiten recopilar Custom Metrics de los puntos de conexión de Prometheus. Para obtener una explicación de cómo se asignan las métricas de Prometheus y OpenMetrics a las métricas de Datadog, consulte la guía [Asignación de métricas de Prometheus a métricas de Datadog][6].

**Nota**: Datadog recomienda usar la comprobación de OpenMetrics, ya que es más eficiente y es totalmente compatible con el formato de texto de Prometheus. Utilice la comprobación de Prometheus solo cuando el punto de conexión de métricas no sea compatible con un formato de texto.

## Configuración {#setup}

### Instalación {#installation}

[Implemente el Datadog Agent en su clúster de Kubernetes][7]. Las comprobaciones de OpenMetrics y Prometheus se incluyen en el paquete del [Datadog Agent][8], por lo que no necesita instalar nada más en sus contenedores o hosts.

### Configuración {#configuration}

Configure su comprobación de OpenMetrics o Prometheus mediante Autodiscovery. Utilice anotaciones de pod o recursos personalizados `DatadogInstrumentation`.

{{< tabs >}}
{{% tab "Anotaciones (AD v2)" %}}

**Nota:** Las anotaciones de AD v2 se introdujeron en la versión 7.36 del Datadog Agent para simplificar la configuración de la integración. Para versiones anteriores del Datadog Agent, utilice las anotaciones de AD v1.

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "openmetrics": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
              "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
              "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
            }
          ]
        }
      }

spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{% tab "Anotaciones (AD v1)" %}}

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: |
      ["openmetrics"]
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: |
      [{}]
    ad.datadoghq.com/<CONTAINER_NAME>.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
        }
      ]
spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{% tab "CRD de DatadogInstrumentation" %}}

Utilice un recurso personalizado `DatadogInstrumentation` para configurar una comprobación de OpenMetrics sin añadir anotaciones de pod. Para obtener más información, consulte [Configurar Autodiscovery con el CRD de DatadogInstrumentation][17].

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: example-cr
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: <WORKLOAD_NAME>
  config:
    checks:
      - integration: openmetrics
        containerName: <CONTAINER_NAME>
        instances:
          - openmetrics_endpoint: "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT>"
            namespace: "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>"
            metrics:
              - "<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"
```

[17]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{< /tabs >}}

Con los siguientes valores de marcador de posición de configuración:

| Marcador de posición                              | Descripción                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<WORKLOAD_NAMESPACE>`                   | Espacio de nombres que contiene la carga de trabajo de destino y el recurso `DatadogInstrumentation`.             |
| `<WORKLOAD_NAME>`                        | Nombre de la carga de trabajo a la que apunta el recurso `DatadogInstrumentation`.                            |
| `<CONTAINER_NAME>`                       | Coincide con el nombre del contenedor que expone las métricas.                                        |
| `<PROMETHEUS_ENDPOINT>`                  | Ruta de URL para las métricas servidas por el contenedor, en formato Prometheus.                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Establezca el espacio de nombres que se antepondrá a cada métrica cuando se vea en Datadog.                               |
| `<METRIC_TO_FETCH>`                      | Clave de métricas de Prometheus que se obtendrá del punto de conexión de Prometheus.                                 |
| `<NEW_METRIC_NAME>`                      | Transforma la clave de métrica `<METRIC_TO_FETCH>` a `<NEW_METRIC_NAME>` en Datadog.                   |


La configuración `metrics` es una lista de métricas que se recuperarán como Custom Metrics. Incluya cada métrica que desee obtener y el nombre de métrica deseado en Datadog como pares clave-valor, por ejemplo, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. Para evitar cargos excesivos por Custom Metrics, Datadog recomienda limitar el contexto para incluir solo las métricas que necesita. Como alternativa, puede proporcionar una lista de cadenas de nombres de métricas, interpretadas como expresiones regulares, para obtener las métricas deseadas con sus nombres actuales. Si desea **todas** las métricas, utilice `".*"` en lugar de `"*"`.

**Nota:** Las expresiones regulares pueden enviar una gran cantidad de Custom Metrics.

Para obtener una lista completa de los parámetros disponibles para las instancias, incluidos `namespace` y `metrics`, consulte la [configuración de ejemplo openmetrics.d/conf.yaml][9].

**Nota**: La comprobación se limita a 2000 métricas de forma predeterminada. Especifique el parámetro opcional `max_returned_metrics` para modificar este límite.

## Primeros pasos {#getting-started}

### Recopilación simple de métricas (OpenMetrics Check) {#simple-metric-collection-openmetrics-check}

1. [Inicie el Datadog Agent][10].

2. Utilice [Prometheus `prometheus.yaml`][11] para iniciar un Deployment de Prometheus de ejemplo con la configuración de Autodiscovery en el pod:
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **Nota:** Las anotaciones de AD v2 se introdujeron en la versión 7.36 del Datadog Agent para simplificar la configuración de la integración. Para versiones anteriores del Datadog Agent, utilice las anotaciones de AD v1.

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.checks: |
              {
                "openmetrics": {
                  "instances": [
                    {
                      "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                      "namespace": "documentation_example_kubernetes",
                      "metrics": [
                          {"promhttp_metric_handler_requests": "handler.requests"},
                          {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                          "go_memory.*"
                        ]
                    }
                  ]
                }
              }
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```
   {{% /tab %}}
   {{% tab "Kubernetes (AD v1)" %}}

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.check_names: |
              ["openmetrics"]
            ad.datadoghq.com/prometheus-example.init_configs: |
              [{}]
            ad.datadoghq.com/prometheus-example.instances: |
              [
                {
                  "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                  "namespace": "documentation_example_kubernetes",
                  "metrics": [
                    {"promhttp_metric_handler_requests": "handler.requests"},
                    {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                    "go_memory.*"
                  ]
                }
              ]
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```

   {{% /tab %}}
   {{% tab "CRD de DatadogInstrumentation" %}}

   <div class="alert alert-info">

   Esta configuración requiere Datadog Agent y Cluster Agent v7.82 o posterior. Habilite el controlador con Datadog Operator v1.29+ o Datadog Helm chart v3.236.0+. Para obtener instrucciones de configuración, consulte [Configurar Autodiscovery con el CRD de DatadogInstrumentation][17].

   </div>

  El archivo `prometheus.yaml` de ejemplo define la misma comprobación que una anotación de pod. Elimine esa anotación porque las anotaciones tienen prioridad sobre los recursos `DatadogInstrumentation`. Guarde el siguiente recurso como `prometheus-instrumentation.yaml`:

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogInstrumentation
   metadata:
     name: prometheus-example
     namespace: <WORKLOAD_NAMESPACE>
   spec:
     targetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: prometheus-example
     config:
       checks:
         - integration: openmetrics
           containerName: prometheus-example
           instances:
             - openmetrics_endpoint: "http://%%host%%:%%port%%/metrics"
               namespace: "documentation_example_kubernetes"
               metrics:
                 - promhttp_metric_handler_requests: "handler.requests"
                 - promhttp_metric_handler_requests_in_flight: "handler.requests.in_flight"
                 - "go_memory.*"
   ```

   [17]: /containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

   {{% /tab %}}
   {{< /tabs >}}

     Command to create the Prometheus Deployment:

    ```shell
    kubectl create -f prometheus.yaml
    ```

   Si utiliza un recurso `DatadogInstrumentation`, aplíquelo después de crear el Deployment:

    

```shell
    kubectl apply -f prometheus-instrumentation.yaml
    ```

3. Vaya a su página de [Fleet Automation][16] y filtre por la integración `openmetrics` para ver información detallada sobre el estado de sus comprobaciones.

4. Vaya a su página de [Metrics Catalog][12] para ver las métricas recopiladas de este pod de ejemplo. Esta configuración recopilará la métrica `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` y todas las métricas expuestas que comiencen con `go_memory`.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Métrica de Prometheus recopilada en Kubernetes">}}

## Recopilación de métricas con anotaciones de Prometheus (Prometheus Check) {#metric-collection-with-prometheus-annotations-prometheus-check}

Con Prometheus Autodiscovery, el Datadog Agent puede detectar anotaciones nativas de Prometheus (por ejemplo: `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`) y programar comprobaciones de OpenMetrics automáticamente para recopilar métricas de Prometheus en Kubernetes.

**Nota**: Datadog recomienda usar la comprobación de OpenMetrics, ya que es más eficiente y es totalmente compatible con el formato de texto de Prometheus. Utilice la comprobación de Prometheus solo cuando el punto de conexión de métricas no sea compatible con un formato de texto.

### Requisitos {#requirements}

- Datadog Agent v7.27+ o v6.27+ (para comprobaciones de pod)
- Datadog Cluster Agent v1.11+ (para comprobaciones de servicio y punto de conexión)

### Configuración {#configuration-1}

Se recomienda verificar primero qué pods y servicios tienen la anotación `prometheus.io/scrape=true` antes de habilitar esta función. Esto se puede hacer con los siguientes comandos:

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Una vez habilitada la función de scrape de Prometheus, el Datadog Agent recopila Custom Metrics de estos recursos. Si no desea recopilar las Custom Metrics de estos recursos, puede eliminar esta anotación o actualizar las reglas de Autodiscovery como se describe en la [sección de configuración avanzada](#advanced-configuration).

**Nota**: Habilitar esta función sin una configuración avanzada puede causar un aumento significativo en las Custom Metrics, lo que puede generar implicaciones en la facturación. Consulte la [sección de configuración avanzada](#advanced-configuration) para aprender cómo recopilar métricas solo de un subconjunto de contenedores/pods/servicios.

#### Configuración básica {#basic-configuration}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualice su configuración de Datadog Operator para que contenga lo siguiente:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Actualice su configuración de Helm para que contenga lo siguiente:

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
{{< /code-block >}}

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}

En su manifiesto de DaemonSet para el Agent `daemonset.yaml`, agregue las siguientes variables de entorno para el contenedor del Agent:

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
Si el Cluster Agent está habilitado, dentro de su manifiesto `cluster-agent-deployment.yaml`, agregue las siguientes variables de entorno para el contenedor del Cluster Agent:

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true"
```

{{% /tab %}}
{{< /tabs >}}

Esto indica al Datadog Agent que detecte los pods que tienen anotaciones nativas de Prometheus y genere las verificaciones de OpenMetrics correspondientes.

También indica al Datadog Cluster Agent (si está habilitado) que detecte los servicios que tienen anotaciones nativas de Prometheus y genere las verificaciones de OpenMetrics correspondientes.

- `prometheus.io/scrape=true`: Obligatorio.
- `prometheus.io/path`: Opcional, el valor predeterminado es `/metrics`.
- `prometheus.io/port`: Opcional, el valor predeterminado es `%%port%%`, una [variable de plantilla][13] que se reemplaza por el puerto del contenedor/servicio.

Esta configuración genera una verificación que recopila todas las métricas expuestas utilizando la configuración predeterminada de la [integración de OpenMetrics][1].

#### Configuración avanzada {#advanced-configuration}

Puede configurar aún más la recopilación de métricas (más allá de las anotaciones nativas de Prometheus) con el campo `additionalConfigs`.

##### Configuraciones adicionales de verificación de OpenMetrics {#additional-openmetrics-check-configurations}

Utilice `additionalConfigs.configurations` para definir configuraciones adicionales de verificación de OpenMetrics. Consulte la [lista de parámetros de OpenMetrics admitidos][15] que puede pasar en `additionalConfigs`.

##### Reglas de Autodiscovery personalizadas {#custom-autodiscovery-rules}

Utilice `additionalConfigs.autodiscovery` para definir reglas de Autodiscovery personalizadas. Estas reglas pueden basarse en nombres de contenedores, anotaciones de Kubernetes o ambos.

`additionalConfigs.autodiscovery.kubernetes_container_names`
: Una lista de nombres de contenedores a los que apuntar, en formato de expresión regular.

`additionalConfigs.autodiscovery.kubernetes_annotations`
: Dos mapas (`include` y `exclude`) de anotaciones para definir reglas de descubrimiento.

  Predeterminado:
  ```yaml
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
  ```

Si se definen tanto `kubernetes_container_names` como `kubernetes_annotations`, se utiliza la lógica **AND** (ambas reglas deben coincidir).

##### Ejemplos {#examples}

La siguiente configuración apunta a un contenedor llamado `my-app` que se ejecuta en un pod con la anotación `app=my-app`. La configuración de la verificación de OpenMetrics se personaliza para habilitar la opción `send_distribution_buckets` y definir un tiempo de espera personalizado de 5 segundos.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualice su configuración de Datadog Operator para que contenga lo siguiente:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true
      additionalConfigs: |-
        - autodiscovery:
            kubernetes_container_names:
              - my-app
            kubernetes_annotations:
              include:
                app: my-app
          configurations:
            - timeout: 5
              send_distribution_buckets: true
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      - autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
        configurations:
          - timeout: 5
            send_distribution_buckets: true

{{< /code-block >}}
{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}

Para DaemonSet, la configuración avanzada se define en la variable de entorno `DD_PROMETHEUS_SCRAPE_CHECKS`, no en un campo `additionalConfigs`.

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"include\":{\"app\":\"my-app\"}},\"kubernetes_container_names\":[\"my-app\"]},\"configurations\":[{\"send_distribution_buckets\":true,\"timeout\":5}]}]"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L99-L123
{{% /tab %}}
{{< /tabs >}}

## De integración personalizada a oficial {#from-custom-to-official-integration}

De forma predeterminada, todas las métricas recuperadas por la verificación genérica de Prometheus se consideran Custom Metrics. Si está monitoreando software listo para usar y cree que merece una integración oficial, ¡no dude en [contribuir][5]!

Las Integrations oficiales tienen sus propios directorios dedicados. Existe un mecanismo de instancia predeterminado en la verificación genérica para incorporar directamente en el código la configuración predeterminada y los metadatos de las métricas. Por ejemplo, consulte la integración de [kube-proxy][14].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/openmetrics/
[2]: /es/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /es/extend/custom_checks/prometheus/
[6]: /es/integrations/guide/prometheus-metrics
[7]: /es/agent/kubernetes/#installation
[8]: /es/getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[11]: /es/resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/catalog
[13]: /es/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L57-L123
[16]: https://app.datadoghq.com/fleet?query=integration:openmetrics