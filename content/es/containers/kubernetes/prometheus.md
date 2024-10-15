---
aliases:
- /es/getting_started/prometheus
- /es/getting_started/integrations/prometheus
- /es/agent/openmetrics
- /es/agent/prometheus
- /es/agent/kubernetes/prometheus
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

A partir de la versión 6.5.0, Agent incluye checks de [OpenMetrics][3] y [Prometheus][4] capaces de extraer endpoints de Prometheus. Datadog recomienda usar el check de OpenMetrics, ya que es más eficiente y completamente compatible con el formato de texto de Prometheus. Para un uso más avanzado de la interfaz `OpenMetricscheck`, incluida la escritura de un check personalizado, consulta la sección [Herramientas de desarrollo][5]. Utiliza el check de Prometheus solo cuando el endpoint de métricas no admita un formato de texto.

En esta página se explica el uso básico de estos checks, que te permiten extraer métricas personalizadas desde los endpoints de Prometheus. Para obtener una explicación de cómo se asignan las métricas de Prometheus y OpenMetrics a las métricas de Datadog, consulta la guía [Asignación de métricas de Prometheus a métricas de Datadog][6].

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
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
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
    - name: '<CONTAINER_IDENTIFIER>'
```

{{% /tab %}}
{{% tab "Kubernetes (AD v1)" %}}

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: |
      ["openmetrics"]
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: |
      [{}]
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
        }
      ]
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
```

{{% /tab %}}
{{< /tabs >}}

Con los siguientes valores de parámetros de configuración:

| Parámetro                              | Descripción                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_IDENTIFIER>`                 | El identificador utilizado en las `annotations` debe coincidir con el `name` de contenedor que expone las métricas. |
| `<PROMETHEUS_ENDPOINT>`                  | La ruta de URL para las métricas que brinda el contenedor, en formato Prometheus.                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Establece el espacio de nombres que se usará como prefijo para cada métrica cuando se visualiza en Datadog.                               |
| `<METRIC_TO_FETCH>`                      | Clave de métricas de Prometheus a recuperar del endpoint de Prometheus.                                 |
| `<NEW_METRIC_NAME>`                      | Transforma la clave de métrica `<METRIC_TO_FETCH>` en `<NEW_METRIC_NAME>` en Datadog.                   |


La configuración `metrics` es una lista de métricas para recuperar como métricas personalizadas. Incluye cada métrica a recuperar y el nombre de métrica deseado en Datadog como pares de clave-valor, por ejemplo, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. Para evitar cargos por métricas personalizadas, Datadog recomienda limitar el contexto para incluir solo las métricas que necesites. Alternativamente, puedes proporcionar una lista de cadenas de nombres de métrica, interpretadas como expresiones regulares, para obtener las métricas deseadas con sus nombres actuales. Si deseas **todas** las métricas, utiliza `".*"` en lugar de `"*"`.

**Nota:** Las expresiones regulares pueden potencialmente enviar un montón de métricas personalizadas.

Para obtener una lista completa de los parámetros disponibles para las instancias, incluidos `namespace` y `metrics`, consulta la [configuración de ejemplo openmetrics.d/conf.yaml][9].

## Empezando

### Recopilación sencilla de métrica

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

3. Ve a tu página [Resumen de métrica][12] para ver las métricas recopiladas de este pod de ejemplo. Esta configuración recopilará las métricas `promhttp_metric_handler_requests` , `promhttp_metric_handler_requests_in_flight` y todas las métricas expuestas empezando por `go_memory`.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Métrica de Prometheus recopilada en Kubernetes">}}

## Recopilación de métrica con anotaciones de Prometheus

Con Prometheus Autodiscovery, el Datadog Agent es capaz de detectar anotaciones nativas de Prometheus (por ejemplo: `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`) y programar checks de OpenMetrics automáticamente para recopilar métricas de Prometheus en Kubernetes.

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
{{% tab "Helm" %}}

En tu `values.yaml` de Helm, añade lo siguiente:

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
```
{{% /tab %}}
{{% tab "DaemonSet" %}}

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

{{< tabs >}}
{{% tab "Helm" %}}

Puedes definir configuraciones avanzadas del check de OpenMetrics o reglas personalizadas de Autodiscovery distintas de las anotaciones nativas de Prometheus con el campo de configuración `additionalConfigs` en `values.yaml`.

`additionalConfigs` es una lista de estructuras que contienen configuraciones de check de OpenMetrics y reglas de Autodiscovery.

Solo los parámetros [en esta página][2] son compatibles con OpenMetrics v2 con Autodiscovery y se pueden pasar a la lista de configuraciones.

La configuración de Autodiscovery puede basarse en nombres de contenedor, anotaciones de Kubernetes, o ambos. Cuando se definen tanto `kubernetes_container_names` como `kubernetes_annotations`, se utiliza la lógica AND (ambas reglas deben coincidir).

- `kubernetes_container_names` es una lista de nombres de contenedor a los que apuntar, en formato de expresión regular.
- `kubernetes_annotations` contiene dos mapas de anotaciones para definir las reglas de detección: `include` y `exclude`.

**Nota:** El valor por defecto de `kubernetes_annotations` en la configuración de Datadog Agent es el siguiente:

```yaml
kubernetes_annotations:
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
```

**Ejemplo:**

En este ejemplo, estamos definiendo una configuración avanzada dirigida a un contenedor llamado `my-app`, que se ejecuta en un pod con la anotación `app=my-app`. También estamos personalizando la configuración del check de OpenMetrics, al activar la opción `send_distribution_buckets` y definir un tiempo de espera personalizado de 5 segundos.

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      -
        configurations:
        - timeout: 5
          send_distribution_buckets: true
        autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L99-L123
{{% /tab %}}
{{% tab "DaemonSet" %}}

Puedes definir configuraciones avanzadas de check de OpenMetrics o reglas personalizadas de Autodiscovery distintas de las anotaciones nativas de Prometheus con la variable de entorno `DD_PROMETHEUS_SCRAPE_CHECKS` en los manifiestos de Agent y Cluster Agent.

`DD_PROMETHEUS_SCRAPE_CHECKS` es una lista de estructuras que contienen configuraciones de check de OpenMetrics y reglas de Autodiscovery.

Solo los parámetros [en esta página][2] son compatibles con OpenMetrics v2 con Autodiscovery y se pueden pasar a la lista de configuraciones.

La configuración de Autodiscovery puede basarse en nombres de contenedor, anotaciones de Kubernetes, o ambos. Cuando se definen tanto `kubernetes_container_names` como `kubernetes_annotations`, se utiliza la lógica AND (ambas reglas deben coincidir).

- `kubernetes_container_names` es una lista de nombres de contenedor a los que apuntar, en formato de expresión regular.
- `kubernetes_annotations` contiene dos mapas de anotaciones para definir las reglas de detección: `include` y `exclude`.

**Nota:** El valor por defecto de `kubernetes_annotations` en la configuración de Datadog Agent es el siguiente:

```yaml
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"exclude\":{\"prometheus.io/scrape\":\"false\"},\"include\":{\"prometheus.io/scrape\":\"true\"}}}}]"
```

**Ejemplo:**

Este ejemplo de configuración avanzada está dirigido a un contenedor llamado `my-app`, que se ejecuta en un pod con la anotación `app=my-app`. La configuración de check de OpenMetrics se personaliza al activar la opción `send_distribution_buckets` y definir un tiempo de espera personalizado de 5 segundos.

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

Por defecto, todas las métricas recuperadas por el check de Prometheus genérico se consideran métricas personalizadas. Si estás monitorizando software comercial y crees que merece tener una integración oficial, no dudes en [contribuir][5]!

Las integraciones oficiales tienen sus propios directorios específicos. Hay un mecanismo de instancia por defecto en el check genérico para codificar la configuración predeterminada y los metadatos de métricas. Por ejemplo, consulta la integración [kube-proxy][14].

## Leer más

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