---
app_id: nvidia-jetson
app_uuid: eccb9836-9dc7-443c-ac05-9c341e5ccf90
assets:
  dashboards:
    Nvidia Jetson: assets/dashboards/nvidia_jetson.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: nvidia.jetson.mem.used
      metadata_path: metadata.csv
      prefix: nvidia.jetson.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10134
    source_type_name: Nvidia Jetson
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- iot
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/README.md
display_on_public_website: true
draft: false
git_integration_title: nvidia_jetson
integration_id: nvidia-jetson
integration_title: Nvidia Jetson
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nvidia_jetson
public_title: Nvidia Jetson
short_description: Obtén métricas sobre tu placa Nvidia Jetson
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::IoT
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtén métricas sobre tu placa Nvidia Jetson
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia Jetson
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza una placa [NVIDIA Jetson][1].
Informa las métricas recopiladas de `tegrastats`.

## Configuración

### Instalación

El check de NVIDIA Jetson está incluidoo en el paquete del [Datadog Agent ][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Crea un archivo `jetson.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu
   directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Jetson.
   Consulta el [jetson.d/conf.yaml.example de ejemplo][3] para conocer todas las opciones disponibles de configuración.

2. [Reinicia el Agent][4].

### Validación

Ejecuta el [subcomando de estado del Agent][5] y busca `jetson` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "nvidia_jetson" >}}


Algunas métricas solo se notifican si `use_sudo` está configurado como verdadero:
- `nvidia.jetson.iram.used`
- `nvidia.jetson.iram.total`
- `nvidia.jetson.iram.lfb`
- `nvidia.jetson.emc.freq`
- `nvidia.jetson.gpu.freq`
- `nvidia.jetson.cpu.freq`

### Checks de servicio

La integración de NVIDIA Jetson no incluye ningún check de servicio.

### Eventos

La integración de NVIDIA Jetson no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://developer.nvidia.com/embedded-computing
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jetson.d/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/metadata.csv
[7]: https://docs.datadoghq.com/es/help/