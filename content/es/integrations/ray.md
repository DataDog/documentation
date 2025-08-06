---
app_id: ray
app_uuid: bae260a0-91be-4dc4-9767-61f072f82d76
assets:
  dashboards:
    Ray Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ray.process.open_fds
      metadata_path: metadata.csv
      prefix: ray.
    process_signatures:
    - ray.util.client.server
    - servidor_gcs
    - raylet
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10393
    source_type_name: Ray
  monitors:
    High CPU Utilization on Ray.io node: assets/monitors/cpu_utilization.json
    High Memory Usage: assets/monitors/mem_utilization.json
    High Number of Failed Tasks on Ray.io Node: assets/monitors/failed_task.json
    Low GPU Utilization low on Ray.io Node: assets/monitors/gpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ray/README.md
display_on_public_website: true
draft: false
git_integration_title: ray
integration_id: ray
integration_title: Ray
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: ray
public_title: Ray
short_description: Monitorizar el estado y el rendimiento de Ray
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::IA/ML
  - Categoría::Recopilación de logs
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar el estado y el rendimiento de Ray
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Ray
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Ray][1] a través del Datadog Agent. Ray es un marco informático unificado de código abierto que facilita el escalado de cargas de trabajo IA y Python, desde el aprendizaje por refuerzo hasta el aprendizaje profundo, pasando por el ajuste y el servicio de modelos.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

A partir del Agent versión 7.49.0, el check de Ray está incluido en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu servidor.

**ADVERTENCIA**: Este check utiliza [OpenMetrics][4] para recopilar métricas desde el endpoint de OpenMetrics que Ray puede exponer, lo que requiere Python v3.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Recopilación de métricas

1. Edita el archivo `ray.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu Ray. Para conocer todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][1].

    Este ejemplo muestra la página de configuración:

    ```yaml
    init_config:
      ...
    instances:
      - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    ```

2. [Reinicia el Agent][2] después de modificar la configuración.

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

##### Recopilación de métricas

Este ejemplo muestra la configuración como una etiqueta (label) de Docker dentro de `docker-compose.yml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo[1].

```yaml
labels:
  com.datadoghq.ad.checks: '{"ray":{"instances":[{"openmetrics_endpoint":"http://%%host%%:8080"}]}}'
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

##### Recopilación de métricas

Este ejemplo demuestra la configuración como anotaciones de Kubernetes en tus pods Ray. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][1].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/ray.checks: |-
      {
        "ray": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'ray'
# (...)
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

Las métricas Ray están disponibles en el endpoint de OpenMetrics. Además, Ray te permite [exportar métricas a nivel de aplicación][5]. Puedes configurar la integración Ray para recopilar estas métricas utilizando la opción `extra_metrics`. Todas las métricas Ray, incluyendo tus métricas personalizadas, utilizan el prefijo `ray.`.

**Nota:** Las métricas Ray personalizadas se consideran métricas estándar en Datadog.

Este ejemplo muestra una configuración que aprovecha la opción `extra_metrics`:

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    # Also collect your own Ray metrics
    extra_metrics:
      - my_custom_ray_metric
```

Encontrarás más información sobre cómo configurar esta opción en el [archivo de configuración `ray.d/conf.yaml` de ejemplo][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `ray` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ray" >}}


### Eventos

La integración Ray no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "ray" >}}


### Logs

La integración Ray puede recopilar logs del servicio Ray y reenviarlos a Datadog. 

{{< tabs >}}
{{% tab "Host" %}}

1. La recopilación de logs está desactivada por defecto en el Datadog Agent . Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `ray.d/conf.yaml`. A continuación podrás ver un ejemplo:

   ```yaml
   logs:
     - type: file
       path: /tmp/ray/session_latest/logs/dashboard.log
       source: ray
       service: ray
     - type: file
       path: /tmp/ray/session_latest/logs/gcs_server.out
       source: ray
       service: ray
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][1].

A continuación, configura las Integraciones de logs como anotaciones de pod. Esto también se puede configurar con un archivo, un configmap o un almacén de valores clave. Para obtener más información, consulta la sección [Recopilación de logs de Kubernetes][2].


**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ray
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"ray","service":"ray"}]'
spec:
  containers:
    - name: ray
```

[1]: https://docs.datadoghq.com/es/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

Para obtener más información sobre la configuración de la generación de logs con Ray, consulta la [documentación oficial de Ray][8].

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: https://www.ray.io/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/integrations/openmetrics/
[5]: https://docs.ray.io/en/latest/ray-observability/user-guides/add-app-metrics.html
[6]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example#L59-L105
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.ray.io/en/latest/ray-observability/user-guides/configure-logging.html
[9]: https://docs.datadoghq.com/es/help/