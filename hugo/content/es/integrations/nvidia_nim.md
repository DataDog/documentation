---
app_id: nvidia-nim
app_uuid: c7307eb9-7bbf-4dae-b74f-6396bf5bf514
assets:
  dashboards:
    NVIDIA NIM Overview: assets/dashboards/nvidia_nim_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nvidia_nim.num_requests.running
      metadata_path: metadata.csv
      prefix: nvidia_nim.
    process_signatures:
    - vllm_nvext.entrypoints.openai.api_server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30338252
    source_type_name: nvidia_nim
  monitors:
    Average Request Latency is High: assets/monitors/latency.json
  saved_views:
    NVIDIA NIM Errors: assets/saved_views/nim_errors.json
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
- https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/README.md
display_on_public_website: true
draft: false
git_integration_title: nvidia_nim
integration_id: nvidia-nim
integration_title: Nvidia NIM
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: nvidia_nim
public_title: Nvidia NIM
short_description: La integración de NVIDIA NIM con Datadog permite la observabilidad
  de la GPU en tiempo real mediante la recopilación de métricas de  Prometheus para
  la monitorización.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: La integración de NVIDIA NIM con Datadog permite la observabilidad
    de la GPU en tiempo real mediante la recopilación de métricas de  Prometheus para
    la monitorización.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia NIM
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [NVIDIA NIM][1] a través del Datadog Agent.

## Configuración

<div class="alert alert-danger">
Esta integración está actualmente en vista previa. Su disponibilidad está sujeta a cambios en el futuro. 
</div>

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos contenedorizados, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

**Requisitos**:
- Este check requiere Agent v7.61.0+
- Este check utiliza [OpenMetrics][3] para la recopilación de métricas, que requiere Python 3.

### Instalación
El check de NVIDIA NIM está incluido en el paquete del [Datadog Agent][4]. No es necesaria ninguna instalación adicional en tu servidor.

#### Observabilidad de LLM: obtén visibilidad de extremo a extremo de las llamadas de tu aplicación LLM a NVIDIA Nim.
NVIDIA NIM utiliza el cliente OpenAI para gestionar las llamadas a la API desde [NVIDIA NIM][5]. Para monitorizar tu aplicación usando NVIDIA NIM y configurar la Observailidad de LLM, sigue las instrucciones de la documentación de la [integración de OpenAI][6].
`
### Configuración

NVIDIA NIM proporciona Prometheus [métricas][1] indicando las estadísticas de las peticiones. Por defecto, estas métricas están disponibles en http://localhost:8000/métricas. El Datadog Agent puede recopilar los métricas expuestos utilizando este integración. Siga las siguientes instrucciones para Configurar recopilar datos de cualquiera de los componentes o de todos ellos.

Para empezar a recopilar los datos de rendimiento de NVIDIA NIM:
1. Edita el archivo `nvidia_nim.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de NVIDIA NIM. Consulta el [nvidia_nim.d/conf.yaml de ejemplo][7] para ver todas las opciones disponibles de configuración.

2. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `nvidia_nim` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "nvidia_nim" >}}


### Eventos

La integración de NVIDIA NIM no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "nvidia_nim" >}}


## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][12].


[1]: https://docs.nvidia.com/nim/large-language-models/latest/observability.html
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/es/integrations/openmetrics/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://www.nvidia.com/en-us/ai/
[6]: https://docs.datadoghq.com/es/integrations/openai
[7]: https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/datadog_checks/nvidia_nim/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/assets/service_checks.json
[12]: https://docs.datadoghq.com/es/help/