---
app_id: nn-sdwan
app_uuid: 8ff5c833-1498-4e63-9ef2-8deecf444d09
assets:
  dashboards:
    Netnology SD-WAN Overview: assets/dashboards/nn_sdwan_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - nn_sdwan.device_control_status
      - nn_sdwan.app_aware_routing.latency
      metadata_path: metadata.csv
      prefix: nn_sdwan.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10277
    source_type_name: Netnology SD-WAN
  monitors:
    Link latency is high: assets/monitors/high-latency-monitor.json
    Packet loss percentage is high: assets/monitors/packet-loss-monitor.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Netnology
  sales_email: info@netnology.io
  support_email: info@netnology.io
categories:
- la red
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/README.md
display_on_public_website: true
draft: false
git_integration_title: nn_sdwan
integration_id: nn-sdwan
integration_title: Netnology Cisco SD-WAN
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: nn_sdwan
public_title: Netnology Cisco SD-WAN
short_description: Exportador de métricas del controlador Cisco SDWAN
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Exportador de métricas del controlador Cisco SDWAN
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Netnology Cisco SD-WAN
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza controladores Cisco SD-WAN a través del Datadog Agent utilizando una plataforma SD-WAN proporcionada por [Netnology][1]. El
check permite a los usuarios monitorizar el estado de la red y el rendimiento de varios controladores Cisco SD-WAN simultáneamente. La información recopilada entonces puede utilizarse para la creación de dashboards agregados y notificaciones en los monitores/alertas configurados.

Actualmente, sólo los dispositivos de Cisco vManage son compatibles como destinos del controlador SD-WAN.

## Configuración

La integración de Netnology Cisco SD-WAN no está incluida en el paquete del [Datadog Agent][2], por lo que deberás instalarlo manualmente.

### Instalación

Para el Agent v7.21+/v6.21+, sigue las instrucciones siguientes para instalar el check en tu host. Consulta [Utilizar integraciones de la comunidad][3] para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ``` bash
   datadog-agent integration install -t nn_sdwan==1.0.1
   ```

2. Configura tu integración como si fuese una [integración][4] básica

### Configuración

1. Edita el archivo `nn_sdwan.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Cisco SD-WAN. Consulta [ejemplo de nn_sdwan.d/conf.yaml][5] para ver todas las opciones disponibles de configuración.

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `nn_sdwan` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "nn-sdwan" >}}


### Eventos

La integración de Netnology Cisco SD-WAN no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "nn-sdwan" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://netnology.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/datadog_checks/nn_sdwan/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/