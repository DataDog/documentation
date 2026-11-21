---
aliases:
- /es/agent/docker/prometheus
description: Recopile métricas de Prometheus y OpenMetrics de aplicaciones Docker
  en contenedores mediante el Datadog Agent
further_reading:
- link: /agent/docker/log/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/docker/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/docker/integrations/
  tag: Documentación
  text: Recopile automáticamente las métricas y los registros de sus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/docker/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Recopilación de métricas de Prometheus y OpenMetrics de Docker
---
Recopile sus métricas expuestas de Prometheus y OpenMetrics de su aplicación que se ejecuta dentro de sus contenedores mediante el Datadog Agent y las integraciones de [Datadog-OpenMetrics][1] o [Datadog-Prometheus][2].

## Descripción general {#overview}

A partir de la versión 6.5.0, el Agent incluye comprobaciones de [OpenMetrics][3] y [Prometheus][4] capaces de recopilar datos de puntos de conexión de Prometheus. Datadog recomienda utilizar la comprobación de OpenMetrics, ya que es más eficiente y es totalmente compatible con el formato de texto de Prometheus. Para un uso más avanzado de la interfaz `OpenMetricsCheck`, incluida la escritura de una verificación personalizada, consulte la sección [Developer Tools][5]. Utilice la comprobación de Prometheus solo cuando el punto de conexión de métricas no sea compatible con un formato de texto.

Esta página explica el uso básico de estas comprobaciones, lo que le permite importar todas sus métricas expuestas de Prometheus dentro de Datadog.

Los comandos de la CLI en esta página son para el tiempo de ejecución de Docker. Reemplace `docker` con `nerdctl` para el tiempo de ejecución de containerd, o `podman` para el tiempo de ejecución de Podman.

## Configuración {#setup}

### Instalación {#installation}

Inicie el Docker Agent junto a sus otros contenedores reemplazando `<DATADOG_API_KEY>` con la clave de API de su organización en el comando a continuación:

{{< tabs >}}
{{% tab "Standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux versión < 2" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: su sitio de Datadog es {{< region-param key="dd_site" code="true" >}}.

### Configuración {#configuration}

El Agent detecta si se está ejecutando en Docker y busca automáticamente en todas las etiquetas de los contenedores las etiquetas de Datadog-OpenMetrics. Autodiscovery espera que las etiquetas tengan el formato de los siguientes ejemplos, según el tipo de archivo:

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
```

#### Ejemplo de múltiples puntos de conexión {#multiple-endpoints-example}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics","openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}, {"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
```

{{% /tab %}}
{{% tab "docker-compose.yaml" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["openmetrics"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: |
    [
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      }
    ]
```

**Ejemplo de múltiples puntos de conexión**:

```yaml
labels:
  com.datadoghq.ad.check_names: '["openmetrics", "openmetrics"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: |
    [
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      },
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      }
    ]
```

{{% /tab %}}
{{% tab "Comando docker run" %}}

```shell
# single metric
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

**Ejemplos de formato de métricas en `com.datadoghq.ad.instances`**

```shell
# multiple metrics
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}, {\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

```shell
# all metrics of a base type
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\"<METRIC_BASE_TO_FETCH>.*\"]}]"
```

```shell
# all metrics
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\".*\"]}]"
```

**Ejemplo de múltiples puntos de conexión**:

```shell
-l com.datadoghq.ad.check_names='["openmetrics", "openmetrics"]' -l com.datadoghq.ad.init_configs='[{},{}]' -l com.datadoghq.ad.instances='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

Con los siguientes valores de marcador de posición de configuración:

| Marcador de posición             | Descripción                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `<PROMETHEUS_PORT>`     | Puerto al que conectarse para acceder al punto de conexión de Prometheus. Como alternativa, puede usar la [variable de plantilla de Autodiscovery][6] `%%port%%`. |
| `<PROMETHEUS_ENDPOINT>` | Ruta de URL para las métricas servidas por el contenedor, en formato Prometheus.                                                                   |
| `<NAMESPACE>`           | Establezca el espacio de nombres que se antepondrá a cada métrica cuando se vea en Datadog.                                                                      |
| `<METRIC_TO_FETCH>`     | Clave de métricas de Prometheus que se obtendrá del punto de conexión de Prometheus.                                                                        |
| `<NEW_METRIC_NAME>`     | Transforma la clave de métrica `<METRIC_TO_FETCH>` a `<NEW_METRIC_NAME>` en Datadog.                                                          |


La configuración `metrics` es una lista de métricas para recuperar como métricas personalizadas. Incluya cada métrica que desee obtener y el nombre de métrica deseado en Datadog como pares clave-valor, por ejemplo, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. También puede proporcionar una lista de cadenas de nombres de métricas, interpretadas como expresiones regulares, para obtener las métricas deseadas con sus nombres actuales. **Nota:** Las expresiones regulares pueden enviar potencialmente una gran cantidad de métricas personalizadas.

Para obtener una lista completa de los parámetros disponibles para las instancias, incluidos `namespace` y `metrics`, consulte la [configuración de ejemplo openmetrics.d/conf.yaml][7].

## Primeros pasos {#getting-started}

### Recopilación simple de métricas {#simple-metric-collection}

Para comenzar a recopilar las métricas que expone Prometheus cuando se ejecuta dentro de un contenedor, siga estos pasos:

1. Inicie el Datadog Agent:
    {{< tabs >}}
    {{% tab "Standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    registry.datadoghq.com/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    registry.datadoghq.com/agent:latest \
    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. Inicie un contenedor de Prometheus que exponga métricas de ejemplo para que el Agent las recopile, con las etiquetas de Autodiscovery para la comprobación de OpenMetrics.

    Las siguientes etiquetas harán que el Agent recopile las métricas `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` y todas las métricas expuestas que comiencen con `go_memory`.

    ```yaml
    labels:
      com.datadoghq.ad.check_names: '["openmetrics"]'
      com.datadoghq.ad.init_configs: '[{}]'
      com.datadoghq.ad.instances:  |
        [
          {
            "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
            "namespace": "documentation_example_docker",
            "metrics": [
              {"promhttp_metric_handler_requests": "handler.requests"},
              {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
              "go_memory.*"
            ]
          }
        ]
    ```
    To launch an example Prometheus container with these labels you can run:

    ```shell
    docker run -d -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[{"openmetrics_endpoint":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[{"promhttp_metric_handler_requests":"handler.requests"},{"promhttp_metric_handler_requests_in_flight":"handler.requests.in_flight"},"go_memory.*"]}]' prom/prometheus
    ```

3. Vaya a su página de [Metrics Catalog][8] para ver las métricas recopiladas:

    {{< img src="integrations/guide/prometheus_docker/openmetrics_v2_collected_metric_docker.png" alt="Métrica de Prometheus recopilada en Docker">}}

## De integración personalizada a oficial {#from-custom-to-official-integration}

De forma predeterminada, todas las métricas recuperadas por la comprobación genérica de Prometheus se consideran métricas personalizadas. Si está monitoreando software listo para usar y cree que merece una integración oficial, ¡no dude en [contribuir][5]!

Las integraciones oficiales tienen sus propios directorios dedicados. La comprobación genérica tiene un mecanismo de instancia predeterminada para definir directamente en el código la configuración predeterminada y los metadatos de las métricas. Por ejemplo, consulte la integración de [kube-proxy][9].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/openmetrics/
[2]: /es/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /es/extend/custom_checks/prometheus/
[6]: https://docs.datadoghq.com/es/agent/guide/template_variables/
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://app.datadoghq.com/metric/catalog
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy