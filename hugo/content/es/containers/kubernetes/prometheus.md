---
aliases:
- /es/getting_started/prometheus
- /es/getting_started/integrations/prometheus
- /es/agent/openmetrics
- /es/agent/prometheus
- /es/agent/kubernetes/prometheus
description: Recopila Prometheus y OpenMetrics de las cargas de trabajo de Kubernetes
  utilizando el Agente de Datadog con Autodiscovery
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Monitorea tus operadores de Kubernetes para mantener las aplicaciones funcionando
    sin problemas
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopila los registros de tu aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopila las trazas de tu aplicación
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopila automáticamente las métricas y registros de tus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos a un subconjunto de contenedores solamente
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asigna etiquetas a todos los datos emitidos por un contenedor
- link: /integrations/guide/prometheus-metrics/
  tag: Documentación
  text: Mapeo de métricas de Prometheus a métricas de Datadog
title: Recopilación de métricas de Prometheus y OpenMetrics en Kubernetes
---
## Resumen {#overview}

Recopila tus métricas expuestas de Prometheus y OpenMetrics de tu aplicación que se ejecuta dentro de Kubernetes utilizando el Agente de Datadog y las integraciones de [OpenMetrics][1] o [Prometheus][2]. Por defecto, todas las métricas recuperadas por la verificación genérica de Prometheus se consideran métricas personalizadas.

A partir de la versión 6.5.0, el Agente incluye verificaciones de [OpenMetrics][3] y [Prometheus][4] capaces de extraer puntos de conexión de Prometheus. Para un uso más avanzado de la interfaz `OpenMetricsCheck`, incluyendo la escritura de una verificación personalizada, consulta la sección de [Herramientas para Desarrolladores][5].

Esta página explica el uso básico de estas verificaciones, que te permiten extraer métricas personalizadas de los puntos finales de Prometheus. Para una explicación de cómo las métricas de Prometheus y OpenMetrics se mapean a las métricas de Datadog, consulta la guía de [Mapeo de métricas de Prometheus a métricas de Datadog][6].

**Nota**: Datadog recomienda utilizar la verificación de OpenMetrics ya que es más eficiente y soporta completamente el formato de texto de Prometheus. Utiliza la verificación de Prometheus solo cuando el punto de conexión de métricas no soporte un formato de texto.

## Configuración {#setup}

### Instalación {#installation}

[Despliega el Agente de Datadog en tu clúster de Kubernetes][7]. Las verificaciones de OpenMetrics y Prometheus están incluidas en el paquete del [Agente de Datadog][8], por lo que no necesitas instalar nada más en tus contenedores o servidores.

### Configuración {#configuration}

Configura tu verificación de OpenMetrics o Prometheus utilizando Autodiscovery, aplicando lo siguiente `annotations` a tu **pod** que expone las métricas de OpenMetrics/Prometheus:

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Nota:** Las Anotaciones de AD v2 se introdujeron en la versión 7.36 del Agente de Datadog para simplificar la configuración de integración. Para versiones anteriores del Agente de Datadog, utiliza las Anotaciones de AD v1.

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

Con los siguientes valores de marcador de posición de configuración:

| Marcador de posición                              | Descripción                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_NAME>`                 | Coincide con el nombre del contenedor que expone las métricas. |
| `<PROMETHEUS_ENDPOINT>`                  | Ruta URL para las métricas servidas por el contenedor, en formato Prometheus.                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Establece el espacio de nombres que se prefijará a cada métrica cuando se visualice en Datadog.                               |
| `<METRIC_TO_FETCH>`                      | Clave de métricas de Prometheus que se debe obtener del punto de conexión de Prometheus.                                 |
| `<NEW_METRIC_NAME>`                      | Transforma la clave métrica `<METRIC_TO_FETCH>` a `<NEW_METRIC_NAME>` en Datadog.                   |


La configuración `metrics` es una lista de métricas para recuperar como métricas personalizadas. Incluye cada métrica a obtener y el nombre de la métrica deseada en Datadog como pares clave-valor, por ejemplo, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. Para evitar cargos excesivos por métricas personalizadas, Datadog recomienda limitar el alcance para incluir solo las métricas que necesitas. Alternativamente, puedes proporcionar una lista de nombres de métricas como cadenas, interpretadas como expresiones regulares, para traer las métricas deseadas con sus nombres actuales. Si deseas **todas** las métricas, entonces usa `".*"` en lugar de `"*"`.

**Nota:** Las expresiones regulares pueden potencialmente enviar muchas métricas personalizadas.

Para una lista completa de parámetros disponibles para instancias, incluyendo `namespace` y `metrics`, consulta el [archivo de configuración de muestra openmetrics.d/conf.yaml][9].

**Nota**: La verificación se limita a 2000 métricas por defecto. Especifica el parámetro opcional `max_returned_metrics` para modificar este límite.

## Introducción {#getting-started}

### Recolección simple de métricas (Verificación de OpenMetrics) {#simple-metric-collection-openmetrics-check}

1. [Lanza el Agente de Datadog][10].

2. Usa el [Prometheus `prometheus.yaml`][11] para lanzar un ejemplo de implementación de Prometheus con la configuración de Autodiscovery en el pod:
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **Nota:** Las Anotaciones de AD v2 se introdujeron en la versión 7.36 del Agente de Datadog para simplificar la configuración de integración. Para versiones anteriores del Agente de Datadog, utiliza las Anotaciones de AD v1.

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

     Command to create the Prometheus Deployment:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. Ve a tu página de [Fleet Automation][16] y filtra por la integración `openmetrics` para ver información detallada sobre el estado de tus verificaciones.

4. Ve a tu página de [Resumen de métricas][12] para ver las métricas recolectadas de este pod de ejemplo. Esta configuración recopilará la métrica `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` y todas las métricas expuestas que comiencen con `go_memory`.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Métrica de Prometheus recopilada de Kubernetes">}}

## Recopilación de métricas con anotaciones de Prometheus (Verificación de Prometheus) {#metric-collection-with-prometheus-annotations-prometheus-check}

Con Prometheus Autodiscovery, el Agente de Datadog puede detectar anotaciones nativas de Prometheus (por ejemplo: `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`) y programar verificaciones de OpenMetrics automáticamente para recopilar métricas de Prometheus en Kubernetes.

**Nota**: Datadog recomienda usar la verificación de OpenMetrics ya que es más eficiente y admite completamente el formato de texto de Prometheus. Utiliza la verificación de Prometheus solo cuando el punto de conexión de métricas no soporte un formato de texto.

### Requisitos {#requirements}

- Agente de Datadog v7.27+ o v6.27+ (para verificaciones de Pod)
- Datadog Cluster Agent v1.11+ (para verificaciones de servicio y punto de conexión)

### Configuración {#configuration-1}

Se recomienda primero verificar qué pods y servicios tienen la anotación `prometheus.io/scrape=true` antes de habilitar esta función. Esto se puede hacer con los siguientes comandos:

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Una vez que la función de raspado de Prometheus esté habilitada, el Agente de Datadog recopila métricas personalizadas de estos recursos. Si no deseas recopilar las métricas personalizadas de estos recursos, puedes eliminar esta anotación o actualizar las reglas de Autodiscovery como se describe en la [sección de configuración avanzada](#advanced-configuration).

**Nota**: Habilitar esta función sin configuración avanzada puede causar un aumento significativo en las métricas personalizadas, lo que puede llevar a implicaciones de facturación. Consulta la [sección de configuración avanzada](#advanced-configuration) para aprender cómo recopilar métricas solo de un subconjunto de contenedores/pods/servicios.

#### Configuración básica {#basic-configuration}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualiza la configuración de tu Datadog Operator para contener lo siguiente:

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

Actualiza tu configuración de Helm para contener lo siguiente:

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

En tu manifiesto de DaemonSet para el Agente `daemonset.yaml`, agrega las siguientes variables de entorno para el contenedor del Agente:

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
Si el Cluster Agent está habilitado, dentro de tu manifiesto `cluster-agent-deployment.yaml`, agrega las siguientes variables de entorno para el contenedor del Cluster Agent:

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true"
```

{{% /tab %}}
{{< /tabs >}}

Esto instruye al Agente de Datadog a detectar los pods que tienen anotaciones nativas de Prometheus y generar las verificaciones correspondientes de OpenMetrics.

También instruye al Datadog Cluster Agent (si está habilitado) a detectar los servicios que tienen anotaciones nativas de Prometheus y generar las verificaciones correspondientes de OpenMetrics.

- `prometheus.io/scrape=true`: Requerido.
- `prometheus.io/path`: Opcional, por defecto es `/metrics`.
- `prometheus.io/port`: Opcional, el valor por defecto es `%%port%%`, una [variable de plantilla][13] que es reemplazada por el puerto del contenedor/servicio.

Esta configuración genera una verificación que recopila todas las métricas expuestas utilizando la configuración predeterminada de la [integración de OpenMetrics][1].

#### Configuración avanzada {#advanced-configuration}

Puedes configurar aún más la recopilación de métricas (más allá de las anotaciones nativas de Prometheus) con el campo `additionalConfigs`.

##### Configuraciones adicionales de verificación de OpenMetrics {#additional-openmetrics-check-configurations}

Usa `additionalConfigs.configurations` para definir configuraciones adicionales de verificación de OpenMetrics. Consulta la [lista de parámetros de OpenMetrics soportados][15] que puedes pasar en `additionalConfigs`.

##### Reglas personalizadas de Autodiscovery {#custom-autodiscovery-rules}

Usa `additionalConfigs.autodiscovery` para definir reglas personalizadas de Autodiscovery. Estas reglas pueden basarse en nombres de contenedores, anotaciones de Kubernetes, o ambos.

`additionalConfigs.autodiscovery.kubernetes_container_names`
: Una lista de nombres de contenedores a los que se dirigen las reglas, en formato de expresión regular.

`additionalConfigs.autodiscovery.kubernetes_annotations`
: Dos mapas (`include` y `exclude`) de anotaciones para definir reglas de descubrimiento.

  Predeterminado:
  ```yaml
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
  ```

Si tanto `kubernetes_container_names` como `kubernetes_annotations` están definidos, se utiliza la lógica **Y** (ambas reglas deben coincidir).

##### Ejemplos {#examples}

La siguiente configuración apunta a un contenedor llamado `my-app` que se ejecuta en un pod con la anotación `app=my-app`. La configuración de verificación de OpenMetrics se personaliza para habilitar la opción `send_distribution_buckets` y definir un tiempo de espera personalizado de 5 segundos.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualice la configuración de su Datadog Operator para contener lo siguiente:

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

## De la integración personalizada a la oficial {#from-custom-to-official-integration}

Por defecto, todas las métricas recuperadas por la verificación genérica de Prometheus se consideran métricas personalizadas. Si está monitoreando software comercial y cree que merece una integración oficial, ¡no dude en [contribuir][5]!

Las integraciones oficiales tienen sus propios directorios dedicados. Hay un mecanismo de instancia predeterminado en la verificación genérica para codificar la configuración predeterminada y los metadatos de métricas. Por ejemplo, consulte la integración de [kube-proxy][14].

## Lectura adicional {#further-reading}

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
[12]: https://app.datadoghq.com/metric/summary
[13]: /es/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L57-L123
[16]: https://app.datadoghq.com/fleet?query=integration:openmetrics