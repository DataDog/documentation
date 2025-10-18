---
aliases:
- /es/getting_started/prometheus
- /es/getting_started/integrations/prometheus
- /es/agent/openmetrics
- /es/agent/prometheus
- /es/agent/kubernetes/prometheus
description: Recopila Prometheus y OpenMetrics de las cargas de trabajo de Kubernetes
  utilizando el módulo Datadog Agent con Autodiscovery
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopila tus trazas de aplicaciones
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopila automáticamente los datos de métricas y logs de tus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
- link: /integrations/guide/prometheus-metrics/
  tag: Documentación
  text: Asignación de métricas de Prometheus a métricas de Datadog
title: Recopilación de métricas de Kubernetes Prometheus y OpenMetrics
---

## Información general

Recopila tus métricas de Prometheus y OpenMetrics expuestas desde tu aplicación que se ejecuta dentro de Kubernetes utilizando el Datadog Agent y las integraciones de [OpenMetrics][1] o [Prometheus][2]. Por defecto, todas las métricas recuperadas por el check genérico de Prometheus se consideran métricas personalizadas.

A partir de la versión 6.5.0, el Agent incluye checks de [OpenMetrics][3] y [Prometheus][4] capaces de rastrear los endpoints de Prometheus. Para un uso más avanzado de la interfaz `OpenMetricsCheck`, incluida la escritura de un check personalizado, consulta la sección [Herramientas para desarrolladores][5].

En esta página se explica el uso básico de estos checks, que te permiten extraer métricas personalizadas desde los endpoints de Prometheus. Para obtener una explicación de cómo se asignan las métricas de Prometheus y OpenMetrics a las métricas de Datadog, consulta la guía [Asignación de métricas de Prometheus a métricas de Datadog][6].

**Nota**: Datadog recomienda utilizar el check de OpenMetrics, ya que es más eficiente y admite totalmente el formato de texto de Prometheus. Utiliza el check de Prometheus sólo cuando el endpoint de métricas no admita un formato de texto.

## Configuración

### Instalación

[Despliega el Datadog Agent en tu clúster de Kubernetes][7]. Los checks de OpenMetrics y Prometheus están incluidos en el paquete de [Datadog Agent ][8], por lo que no necesitas instalar nada más en tus contenedores o hosts.

### Configuración

Configura tu check de OpenMetrics o Prometheus con Autodiscovery, aplicando las siguientes `annotations` a tu **pod** exponiendo las métricas de OpenMetrics/Prometheus:

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Nota:** AD Annotations v2 se introdujo en Datadog Agent versión 7.36 para simplificar la configuración de la integración. Para versiones anteriores de Datadog Agent, utiliza AD Annotations v1.

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
{{% tab "Kubernetes (AD v1)" %}}

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
{{< /tabs >}}

Con los siguientes valores de parámetros de configuración:

| Parámetro                              | Descripción                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_NAME>`                 | Coincide con el nombre del contenedor que expone las métricas. |
| `<PROMETHEUS_ENDPOINT>`                  | La ruta de URL para las métricas que brinda el contenedor, en formato Prometheus.                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Establece el espacio de nombres que se usará como prefijo para cada métrica cuando se visualiza en Datadog.                               |
| `<METRIC_TO_FETCH>`                      | Clave de métricas de Prometheus a recuperar del endpoint de Prometheus.                                 |
| `<NEW_METRIC_NAME>`                      | Transforma la clave de métrica `<METRIC_TO_FETCH>` en `<NEW_METRIC_NAME>` en Datadog.                   |


La configuración `metrics` es una lista de métricas para recuperar como métricas personalizadas. Incluye cada métrica a recuperar y el nombre de métrica deseado en Datadog como pares de clave-valor, por ejemplo, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. Para evitar cargos por métricas personalizadas, Datadog recomienda limitar el contexto para incluir solo las métricas que necesites. Alternativamente, puedes proporcionar una lista de cadenas de nombres de métrica, interpretadas como expresiones regulares, para obtener las métricas deseadas con sus nombres actuales. Si deseas **todas** las métricas, utiliza `".*"` en lugar de `"*"`.

**Nota:** Las expresiones regulares pueden potencialmente enviar un montón de métricas personalizadas.

Para obtener una lista completa de los parámetros disponibles para las instancias, incluidos `namespace` y `metrics`, consulta la [configuración de ejemplo openmetrics.d/conf.yaml][9].

**Nota**: El check se limita a 2000 métricas en forma predeterminada. Especifica el parámetro opcional `max_returned_metrics` para modificar este límite.

## Empezando

### Recopilación sencilla de métricas (OpenMetrics Check)

1. [Inicia el Datadog Agent][10].

2. Utiliza [Prometheus `prometheus.yaml`][11] para iniciar un ejemplo de despliegue de Prometheus con la configuración de Autodiscovery en el pod:
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **Nota:** AD Annotations v2 se introdujo en Datadog Agent versión 7.36 para simplificar la configuración de la integración. Para versiones anteriores de Datadog Agent, utiliza AD Annotations v1.

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
   {{< /tabs >}}

     Comando para crear el despliegue de Prometheus:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. Entra en tu page (página) [Fleet Automation][16] y filtra por la integración `openmetrics` para ver información detallada sobre el estado de tus checks.

4. Ve a tu página [Resumen de métrica][12] para ver las métricas recopiladas de este pod de ejemplo. Esta configuración recopilará las métricas `promhttp_metric_handler_requests` , `promhttp_metric_handler_requests_in_flight` y todas las métricas expuestas empezando por `go_memory`.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Métrica de Prometheus recopilada en Kubernetes">}}

## Recopilación de métricas con anotaciones de Prometheus (Prometheus Check)

Con Prometheus Autodiscovery, el Datadog Agent es capaz de detectar anotaciones nativas de Prometheus (por ejemplo: `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`) y programar checks de OpenMetrics automáticamente para recopilar métricas de Prometheus en Kubernetes.

**Nota**: Datadog recomienda utilizar el check de OpenMetrics, ya que es más eficiente y admite totalmente el formato de texto de Prometheus. Utiliza el check de Prometheus sólo cuando el endpoint de métricas no admita un formato de texto.

### Requisitos

- Datadog Agent v7.27+ o v6.27+ (para checks de pod)
- Datadog Cluster Agent v1.11+ (para checks de servicio y endpoint)

### Configuración

Es recomendado primero comprobar qué pods y servicios tienen la anotación `prometheus.io/scrape=true` antes de activar esta función. Esto se puede hacer con los siguientes comandos:

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Una vez activada la función de extracción de Prometheus, Datadog Agent recopila métricas personalizadas de estos recursos. Si no deseas recopilar las métricas personalizadas de estos recursos, puedes eliminar esta anotación o actualizar las reglas de Autodiscovery tal y como se describe en la [sección de configuración avanzada](#advanced-configuration).

**Nota**: Activar esta función sin la configuración avanzada puede causar un aumento significativo de las métricas personalizadas, lo que puede afectar tu facturación. Consulta la sección [configuración avanzada](#advanced-configuration) para saber cómo recopilar métricas únicamente de un subconjunto de contenedores/pods/servicios.

#### Configuración básica

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualiza tu configuración del Datadog Operador para que contenga lo siguiente:

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

Actualiza tu configuración de Helm para que contenga lo siguiente:

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

En tu manifiesto de DaemonSet para el Agent `daemonset.yaml` , añade las siguientes variables de entorno para el contenedor del Agent:
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
Si el Cluster Agent está habilitado, dentro de su manifiesto `cluster-agent-deployment.yaml`, añade las siguientes variables de entorno para el contenedor del Cluster Agent:
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true"
```

{{% /tab %}}
{{< /tabs >}}

Esto indica a Datadog Agent que detecte los pods que tienen anotaciones nativas de Prometheus y genere los checks de OpenMetrics correspondientes.

También indica a Datadog Cluster Agent (si está habilitado) que detecte los servicios que tienen anotaciones nativas de Prometheus y genere los checks correspondientes de OpenMetrics.

- `prometheus.io/scrape=true`: obligatorio.
- `prometheus.io/path`: opcional, por defecto es `/metrics`.
- `prometheus.io/port`: opcional, por defecto es `%%port%%`, una [variable de plantilla][13] que se sustituye por el puerto del contenedor/servicio.

Esta configuración genera un check que recopila todas las métricas expuestas utilizando la configuración por defecto de la [integración de OpenMetrics][1].

#### Configuración avanzada

Puedes configurar aún más la recopilación de métricas (más allá de las anotaciones nativas de Prometheus) con el campo `additionalConfigs`.

##### Configuraciones adicionales del check de OpenMetrics

Utiliza `additionalConfigs.configurations` para definir configuraciones adicionales del check de OpenMetrics. Consulta la [lista de parámetros de OpenMetrics compatibles][15] que puedes pasar en `additionalConfigs`.

##### Reglas personalizadas de Autodiscovery

Utiliza `additionalConfigs.autodiscovery` para definir reglas personalizadas de Autodiscovery. Estas reglas pueden basarse en nombres de contenedores, anotaciones de Kubernetes o ambos.

`additionalConfigs.autodiscovery.kubernetes_container_names`
: una lista de nombres de contenedores a los que apuntar, en formato de expresión regular.

`additionalConfigs.autodiscovery.kubernetes_annotations`
: Dos mapas (`include` y `exclude`) de anotaciones para definir reglas de detección.

  Por defecto:
  ```yaml
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
  ```

Si se definen tanto `kubernetes_container_names` como `kubernetes_annotations`, se utiliza la lógica **AND** (ambas reglas deben coincidir).

##### Ejemplos

La siguiente configuración se dirige a un contenedor llamado `my-app` que se ejecuta en un pod con la anotación `app=my-app`. La configuración del check de OpenMetrics se personaliza para activar la opción `send_distribution_buckets` y definir un tiempo de espera personalizado de 5 segundos.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualiza tu configuración del Datadog Operador para que contenga lo siguiente:

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

Para el DaemonSet, la configuración avanzada se define en la variable de entorno`DD_PROMETHEUS_SCRAPE_CHECKS`, no en un campo `additionalConfigs`.

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

## De la integración personalizada a la oficial

Por defecto, todas las métricas recuperadas por el check genérico de Prometheus se consideran métricas personalizadas. Si estás monitorizando software comercial y crees que merece tener una integración oficial, no dudes en [contribuir][5].

Las integraciones oficiales tienen sus propios directorios específicos. Hay un mecanismo de instancia por defecto en el check genérico para codificar la configuración predeterminada y los metadatos de métricas. Por ejemplo, consulta la integración [kube-proxy][14].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/openmetrics/
[2]: /es/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /es/developers/custom_checks/prometheus/
[6]: /es/integrations/guide/prometheus-metrics
[7]: /es/agent/kubernetes/#installation
[8]: /es/getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[11]: /resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: /es/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L57-L123
[16]: https://app.datadoghq.com/fleet?query=integration:openmetrics