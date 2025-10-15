---
app_id: torchserve
app_uuid: d5400c22-0f0a-4ce4-894d-c3cda48140e9
assets:
  dashboards:
    torchserve_overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - torchserve.openmetrics.inference.count
      - torchserve.management_api.models
      metadata_path: metadata.csv
      prefix: torchserve.
    process_signatures:
    - torchserve
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10357
    source_type_name: TorchServe
  monitors:
    Request error ratio is high: assets/monitors/error_ratio.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- Configuración y despliegue
- recopilación de logs
- ai/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/torchserve/README.md
display_on_public_website: true
draft: false
git_integration_title: torchserve
integration_id: torchserve
integration_title: TorchServe
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: torchserve
public_title: TorchServe
short_description: Monitorización del estado y el rendimiento de TorchServe
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorización del estado y el rendimiento de TorchServe
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TorchServe
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [TorchServe][1] a través del Datadog Agent . 

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos de contenedores, consulta las [Plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

A partir del Agent versión 7.47.0, el check de TorchServe está incluido en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu servidor.

<div class="alert alert-danger">Este check utiliza <a href="https://docs.datadoghq.com/integrations/openmetrics/">OpenMetrics</a> para recopilar métricas desde el endepoint de OpenMetrics que TorchServe puede exponer, lo que requiere Python 3.</div>

### Requisitos previos

El check de TorchServe recopila las métricas y los datos de rendimiento de TorchServe utilizando tres endpoints diferentes:
   - La [interferencia de la API][4] para recopilar el estado de mantenimiento general de tu instancia de TorchServe.
   - La [API de administración][5] para recopilar métricas sobre los distintos modelos que estás ejecutando.
   - El [endpoint de OpenMetrics][6] expuesto por TorchServe.

Puedes configurar estos endpoints utilizando el archivo `config.properties`, como se describe en [la documentación de TorchServe][7]. Por ejemplo:

```
inference_address=http://0.0.0.0:8080
management_address=http://0.0.0.0:8081
metrics_address=http://0.0.0.0:8082
metrics_mode=prometheus
number_of_netty_threads=32
default_workers_per_model=10
job_queue_size=1000
model_store=/home/model-server/model-store
workflow_store=/home/model-server/wf-store
load_models=all
```

Este archivo de configuración expone los tres endpoints diferentes que puede utilizar la integración para monitorizar tu instancia.

#### Endpoint de OpenMetrics

Para activar el endpoint de Prometheus, necesitas configurar dos opciones: 

- `metrics_address`: Dirección de enlace a la API de métricas. En forma predeterminada, es `http://127.0.0.1:8082`
- `metrics_mode`: TorchServe admite dos modos de métricas: `log` y `prometheus`. En forma predeterminada, es `log`. Tienes que configurarlo en `prometheus` para recopilar métricas desde este endpoint.

Por ejemplo:

```
metrics_address=http://0.0.0.0:8082
metrics_mode=prometheus
```

En este caso, el endpoint de OpenMetrics se expone en esta URL: `http://<TORCHSERVE_ADDRESS>:8082/metrics`.

### Configuración

Estos tres endpoints diferentes pueden monitorizarse en forma independiente y deben configurarse por separado en el archivo de configuración, una API por instancia. Consulta el [ejemplo de torchserve.d/conf.yaml][8] para ver todas las opciones disponibles de configuración.

{{< tabs >}}
{{% tab "OpenMetrics endpoint" %}}
#### Configurar el endpoint de OpenMetrics

Las opciones de configuración para el endpoint de OpenMetrics pueden estar en el archivo de configuración en la sección `TorchServe OpenMetrics endpoint configuration`. La configuración mínima sólo requiere la opción `openmetrics_endpoint`:

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<TORCHSERVE_ADDRESS>:8082/metrics
```

Para más opciones, consulta el [ejemplo del archivo `torchserve.d/conf.yaml`][1].

TorchServe permite que el código personalizado de servicio emita [métricas que están disponibles en el `metrics_mode` configurado][2]. Puedes configurar esta integración para recopilar estas métricas utilizando la opción `extra_metrics`. Estas métricas tendrán el prefijo `torchserve.openmetrics`, como cualquier otra métrica procedente de este endpoint.

<div class="alert alert-info">Estas métricas personalizadas de TorchServe se consideran estándar en Datadog.</div>

[1]: https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example
[2]: https://pytorch.org/serve/metrics.html#custom-metrics-api
{{% /tab %}}
{{% tab "Inference API" %}}
#### Configurar la API de inferencia

Esta integración se basa en la [API de inferencia][1] para obtener el estado general de tu instancia de TorchServe. Las opciones de configuración para la API de inferencia pueden estar en el [archivo de configuración][2] en la sección `TorchServe Inference API endpoint configuration`. La configuración mínima sólo requiere la opción `inference_api_url`:

```yaml
init_config:
  ...
instances:
  - inference_api_url: http://<TORCHSERVE_ADDRESS>:8080
```

Esta integración aprovecha el [endpoint de Ping][3] para recopilar el estado de mantenimiento general de tu servidor de TorchServe.

[1]: https://pytorch.org/serve/inference_api.html
[2]: https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example
[3]: https://pytorch.org/serve/inference_api.html#health-check-api
{{% /tab %}}
{{% tab "Management API" %}}
#### Configurar la API de administración

Puedes recopilar métricas relacionadas con los modelos que se están ejecutando actualmente en tu servidor de TorchServe utilizando la [API de administración][1]. Las opciones de configuración para la API de inferencia pueden estar en el [archivo de configuración][2] en la sección `TorchServe Management API endpoint configuration`. La configuración mínima sólo requiere la opción `management_api_url`:

```yaml
init_config:
  ...
instances:
  - management_api_url: http://<TORCHSERVE_ADDRESS>:8081
```

En forma predeterminada, la integración recopila datos de cada uno de los modelos, hasta 100 modelos. Esto puede modificarse mediante las opciones `limit`, `include` y `exclude`. Por ejemplo:

```yaml
init_config:
  ...
instances:
  - management_api_url: http://<TORCHSERVE_ADDRESS>:8081
    limit: 25
    include: 
      - my_model.* 
```

Esta configuración sólo recopila métricas para los nombres de los modelos que coinciden con la expresión regular `my_model.*`, hasta 25 modelos. 

También puedes excluir algunos modelos:

```yaml
init_config:
  ...
instances:
  - management_api_url: http://<TORCHSERVE_ADDRESS>:8081
    exclude: 
      - test.* 
```

Esta configuración recopila métricas por cada nombre de modelo que no coincida con la expresión regular `test.*`, hasta 100 modelos.

<div class="alert alert-info">Puedes utilizar las opciones `include` y `exclude` en la misma configuración. Los filtros `exclude` se aplican después de los `include`.</div>

En forma predeterminada, la integración recupera la lista completa de los modelos cada vez que se ejecuta el check. Puedes almacenar en caché este lista utilizando la opción `interval` para aumentar el rendimiento de este check. 

<div class="alert alert-danger">El uso de la opción `interval` también puede retrasar algunas métricas y eventos.</div>

[1]: https://pytorch.org/serve/management_api.html
[2]: https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

#### Configuración completa

{{< tabs >}}
{{% tab "Host" %}}

Este ejemplo demuestra la configuración completa aprovechando las tres API diferentes descritas en las secciones anteriores:

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<TORCHSERVE_ADDRESS>:8082/metrics
    # Also collect your own TorchServe metrics
    extra_metrics:
      - my_custom_torchserve_metric
  - inference_api_url: http://<TORCHSERVE_ADDRESS>:8080
  - management_api_url: http://<TORCHSERVE_ADDRESS>:8081
    # Include all the model names that match this regex   
    include:
      - my_models.*
    # But exclude all the ones that finish with `-test`
    exclude: 
      - .*-test 
    # Refresh the list of models only every hour
    interval: 3600
```

[Reinicia el Agent][1] después de modificar la configuración.

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Este ejemplo demuestra la configuración completa aprovechando las tres API diferentes descritas en las secciones anteriores como una etiqueta de Docker en `docker-compose.yml`:

```yaml
labels:
  com.datadoghq.ad.checks: '{"torchserve":{"instances":[{"openmetrics_endpoint":"http://%%host%%:8082/metrics","extra_metrics":["my_custom_torchserve_metric"]},{"inference_api_url":"http://%%host%%:8080"},{"management_api_url":"http://%%host%%:8081","include":["my_models.*"],"exclude":[".*-test"],"interval":3600}]}}'
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Este ejemplo demuestra la configuración completa aprovechando las tres API diferentes descritas en las secciones anteriores como anotaciones de Kubernetes en tus pods de Torchserve:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/torchserve.checks: |-
      {
        "torchserve": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8082/metrics",
              "extra_metrics": [
                "my_custom_torchserve_metric"
              ]
            },
            {
              "inference_api_url": "http://%%host%%:8080"
            },
            {
              "management_api_url": "http://%%host%%:8081",
              "include": [
                ".*"
              ],
              "exclude": [
                ".*-test"
              ],
              "interval": 3600
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'torchserve'
# (...)
```

{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando del estado del Agent][9] y busca `torchserve` en la sección checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "torchserve" >}}


Se colocan prefijos en las métricas mediante la API de la que proceden:
- `torchserve.openmetrics.*` para métricas procedentes del endpoint de OpenMetrics.
- `torchserve.inference_api.*` para métricas procedentes de la API de inferencia.
- `torchserve.management_api.*` para métricas procedentes de la API de administración.

### Eventos

La integración de TorchServe incluye tres eventos utilizando la API de administración:

- `torchserve.management_api.model_added`: Este evento se activa cuando se añade un nuevo modelo.
- `torchserve.management_api.model_removed`: Este evento se activa cuando se ha eliminado un modelo.
- `torchserve.management_api.default_version_changed`: Este evento se activa cuando se ha configurado una versión en forma predeterminada para un modelo determinado.

<div class="alert alert-info">Puedes desactivar los eventos configurando la opción `submit_events` como `false` en tu <a href="https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example">archivo de configuración</a>.</div>

### Checks de servicio
{{< get-service-checks-from-git "torchserve" >}}


### Logs

La integración de TorchServe puede recopilar logs del servicio de TorchServe y reenviarlos a Datadog. 

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Quita el comentario y edita el bloque de configuración de logs en tu archivo `torchserve.d/conf.yaml`. He aquí un ejemplo:

   ```yaml
   logs:
     - type: file
       path: /var/log/torchserve/model_log.log
       source: torchserve
       service: torchserve
     - type: file
       path: /var/log/torchserve/ts_log.log
       source: torchserve
       service: torchserve
   ```

Consulta [el ejemplo de archivo de configuración ][8] para saber cómo recopilar todos los logs.

Para obtener más información sobre el registro de configuración con TorchServe, consulta la [documentación oficial de TorchServe][10].

<div class="alert alert-danger">También puedes recopilar logs del archivo `access_log.log`. Sin embargo, estos logs están incluidos en el archivo `ts_log.log`, lo que te lleva a duplicar logs en Datadog si configuras ambos archivos.</div>

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].


[1]: https://pytorch.org/serve/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://pytorch.org/serve/inference_api.html
[5]: https://pytorch.org/serve/management_api.html
[6]: https://pytorch.org/serve/metrics_api.html
[7]: https://pytorch.org/serve/configuration.html#configure-torchserve-listening-address-and-port
[8]: https://github.com/DataDog/integrations-core/blob/master/torchserve/datadog_checks/torchserve/data/conf.yaml.example
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://pytorch.org/serve/logging.html?highlight=logs
[11]: https://docs.datadoghq.com/es/help/