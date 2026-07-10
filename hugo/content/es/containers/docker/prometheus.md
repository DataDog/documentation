---
aliases:
- /es/agent/docker/prometheus
further_reading:
- link: /agent/docker/log/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/docker/apm/
  tag: Documentación
  text: Recopila tus trazas de aplicaciones
- link: /agent/docker/integrations/
  tag: Documentación
  text: Recopila las métricas de tus aplicaciones y logs automáticamente
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/docker/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Recopilación de métricas de Docker Prometheus y OpenMetrics
---

Usa Datadog Agent y las integraciones de [Datadog-OpenMetrics][1] o [Datadog-Prometheus][2] para recopilar tus métricas expuestas de Prometheus y OpenMetrics de la aplicación que se está ejecutando dentro de tus contenedores.

## Información general

A partir de la versión 6.5.0, el Agent incluye checks de [OpenMetrics][3] y [Prometheus][4] capaces de extraer los endpoints de Prometheus. Datadog recomienda usar el check de OpenMetrics, ya que es más eficiente y es compatible con el formato de texto de Prometheus. Consulta usos más avanzados de la interfaz de `OpenMetricsCheck`, incluido cómo escribir un check personalizado, en la sección de [Herramientas de desarrollo][5]. Usa el check de Prometheus solo cuando el endpoint de las métricas no sea compatible con un formato de texto.

Esta página explica el uso básico de estos checks, que permiten importar todas las métricas que tienes expuestas en Prometheus dentro de Datadog.

Los comandos de CLI en esta página son para el tiempo de ejecución de Docker. Sustituye `docker` por `nerdctl` para el tiempo de ejecución del containerd, o `podman` para el tiempo de ejecución del Podman.

## Configuración

### Instalación

Para lanzar el Docker Agent junto a tus otros contenedores, sustituye `<DATADOG_API_KEY>` por la clave API de tu organización en el comando a continuación:

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
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version < 2" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: Tu sitio de Datadog es {{< region-param key="dd_site" code="true" >}}.

### Configuración

El Agent detecta si se está ejecutando en Docker y busca etiquetas de Datadog-OpenMetrics automáticamente en todas las etiquetas de contenedores. Autodiscovery espera que las etiquetas se parezcan a estos ejemplos, según el tipo de archivo:

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

#### Ejemplo de múltiples endpoints

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics","openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
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

**Ejemplo de múltiples endpoints**:

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
{{% tab "Docker run command" %}}

```shell
# métrica única
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

**Ejemplos de formato de métricas en `com.datadoghq.ad.instances`**

```shell
# múltiples métricas
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}, {\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

```shell
# todas las métricas de un tipo de base
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\"<METRIC_BASE_TO_FETCH>.*\"]}]"
```

```shell
# todas las métricas
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\".*\"]}]"
```

**Ejemplo de múltiples endpoints**:

```shell
-l com.datadoghq.ad.check_names='["openmetrics", "openmetrics"]' -l com.datadoghq.ad.init_configs='[{},{}]' -l com.datadoghq.ad.instances='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

Con los siguientes valores de marcadores de configuración:

| Marcador             | Descripción                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `<PROMETHEUS_PORT>`     | El puerto al cual conectarse para acceder al endpoint de Prometheus. Otra opción es usar la [Variable de Plantilla de Autodiscovery][6] `%%port%%`. |
| `<PROMETHEUS_ENDPOINT>` | La ruta URL para las métricas servidas por el contenedor en formato Prometheus.                                                                   |
| `<NAMESPACE>`           | Establece el espacio de nombres que se usará como prefijo para cada métrica cuando se visualiza en Datadog.                                                                      |
| `<METRIC_TO_FETCH>`     | Clave de métricas a recuperar del endpoint de Prometheus.                                                                        |
| `<NEW_METRIC_NAME>`     | Transforma la clave de métrica `<METRIC_TO_FETCH>` en `<NEW_METRIC_NAME>` en Datadog.                                                          |


La configuración `metrics` es una lista de métricas que se recuperan como métricas personalizadas. Incluye cada métrica a recuperar y el nombre de métrica que se quiera en Datadog como pares de valores clave; por ejemplo, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. Otra opción es proporcionar una lista de cadenas de nombres de métricas, interpretadas como expresiones regulares, para reunir las métricas deseadas con sus nombres actuales. **Nota:** potencialmente, las expresiones regulares pueden enviar muchas métricas personalizadas.

Consulta el [ejemplo de configuración de openmetrics.d/conf.yaml][7] para ver una lista completa de parámetros para instancias, incluidos `namespace` y `metrics`.

## Primeros pasos

### Recopilación sencilla de métrica

Sigue los pasos a continuación para empezar a recopilar métricas expuestas por Prometheus cuando se ejecuta dentro de un contenedor:

1. Lanza el Datadog Agent:
    {{< tabs >}}
    {{% tab "Standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    gcr.io/datadoghq/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    gcr.io/datadoghq/agent:latest \
    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. Lanza un contenedor de Prometheus que expone métricas de muestra para que las recopile el Agent, con las etiquetas de Autodiscovery para el check de OpenMetrics.

    Las etiquetas a continuación harán que el Agent recopile las métricas `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` y todas la métricas expuestas que comiencen por `go_memory`.

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
    Para lanzar una muestra de contenedor Prometheus con estas etiquetas, puedes ejecutar lo siguiente:

    ```shell
    docker run -d -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[{"openmetrics_endpoint":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[{"promhttp_metric_handler_requests":"handler.requests"},{"promhttp_metric_handler_requests_in_flight":"handler.requests.in_flight"},"go_memory.*"]}]' prom/prometheus
    ```

3. Accede a tu página de [Resumen de métricas][8] para ver las métricas recopiladas:

    {{< img src="integrations/guide/prometheus_docker/openmetrics_v2_collected_metric_docker.png" alt="Prometheus metric collected docker">}}

## De la integración personalizada a la oficial

Por defecto, todas las métricas recuperadas por el check de Prometheus genérico se consideran métricas personalizadas. Si estás monitorizando software comercial y crees que merece tener una integración oficial, no dudes en [contribuir][5]!

Las integraciones oficiales tienes sus propios directorios específicos. Hay un mecanismo de instancia por defecto en el check genérico para codificar la configuración por defecto y metadatos de métricas. Por ejemplo, consulta la integración [kube-proxy][9].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/openmetrics/
[2]: /es/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /es/developers/custom_checks/prometheus/
[6]: https://docs.datadoghq.com/es/agent/guide/template_variables/
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://app.datadoghq.com/metric/summary
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy