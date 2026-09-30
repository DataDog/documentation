---
app_id: nvidia-triton
app_uuid: 72d17043-fa30-4f5c-95cb-939906d86fb7
assets:
  dashboards:
    Nvidia Triton Overview: assets/dashboards/nvidia_triton_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nvidia_triton.cpu.memory.total_bytes
      metadata_path: metadata.csv
      prefix: nvidia_triton.
    process_signatures:
    - tritonserver
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10416
    source_type_name: Nvidia Triton
  monitors:
    Nvidia Triton CPU memory usage is high!: assets/monitors/cpu_memory.json
    Nvidia Triton GPU Utilization is high!: assets/monitors/gpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- ia/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/README.md
display_on_public_website: true
draft: false
git_integration_title: nvidia_triton
integration_id: nvidia-triton
integration_title: Nvidia Triton
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: nvidia_triton
public_title: Nvidia Triton
short_description: NVIDIA Triton Inference Server es un software de código abierto
  para servicios de inferencia
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
  - Categoría::Recopilación de logs
  - Categoría::IA/ML
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: NVIDIA Triton Inference Server es un software de código abierto para
    servicios de inferencia
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Nvidia Triton
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Nvidia Triton][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Nvidia Triton está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

#### Endpoint de OpenMetrics

Por defecto, el servidor Nvidia Triton expone todas las métricas a través del endpoint Prometheus.
Para habilitar todos los informes de métricas:

```
tritonserver --allow-metrics=true
```

Para cambiar el endpoint de métricas, utiliza la opción `--métricas-address`.

Ejemplo:

```
tritonserver --metrics-address=http://0.0.0.0:8002
```

En este caso, el endpoint de OpenMetrics se expone en esta URL: `http://<NVIDIA_TRITON_ADDRESS>:8002/metrics`.

Las métricas de [resumen de latencia][4] están desactivadas por defecto. Para activar las métricas de resumen de latencia, utiliza el siguiente comando:

```
tritonserver --metrics-config summary_latencies=true
```

Las [métricas de caché de respuesta][5] no se informan por defecto. Es necesario habilitar una implementación de caché del lado del servidor especificando una <cache_implementation> y la configuración correspondiente.

Por ejemplo:

```
tritonserver --cache-config local,size=1048576
```

Nvidia Triton también ofrece la posibilidad de exponer [métricas personalizadas][6] a través de su endpoint Openemtrics. Datadog también puede recopilar estas métricas personalizadas utilizando la opción `extra_metrics`.
<div class="alert alert-danger">Estas métricas Nvidia Triton personalizadas se consideran métricas estándar en Datadog.</div>

### Configuración

1. Edita el archivo `nvidia_triton.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu nvidia_triton. Para conocer todas las opciones de configuración disponibles, consulta el [nvidia_triton.d/conf.yaml de ejemplo][7].

2. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `nvidia_triton` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "nvidia-triton" >}}


### Eventos

La integración Nvidia Triton no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "nvidia-triton" >}}


### Logs

La integración Nvidia Triton puede recopilar logs del servidor Nvidia Triton y reenviarlos a Datadog.

{{< tabs >}}
{{% tab "Host" %}}

1. La recopilación de logs está desactivada por defecto en el Datadog Agent . Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `nvidia_triton.d/conf.yaml`. A continuación podrás ver un ejemplo:

   ```yaml
   logs:
     - type: docker
       source: nvidia_triton
       service: nvidia_triton
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
  name: nvidia_triton
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"nvidia_triton","service":"nvidia_triton"}]'
spec:
  containers:
    - name: ray
```

[1]: https://docs.datadoghq.com/es/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].



[1]: https://www.nvidia.com/en-us/ai-data-science/products/triton-inference-server/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#summaries
[5]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#response-cache-metrics
[6]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#custom-metrics
[7]: https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/datadog_checks/nvidia_triton/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/es/help/