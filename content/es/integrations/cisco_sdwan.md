---
app_id: cisco-sdwan
app_uuid: 2da35edb-5e33-4e5f-93c3-65e08478d566
assets:
  dashboards:
    Cisco SD-WAN: assets/dashboards/cisco_sd-wan.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cisco_sdwan.device.reachable
      metadata_path: metadata.csv
      prefix: cisco_sdwan.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 12300976
    source_type_name: Cisco SDWAN
  monitors:
    Cisco SD-WAN Device has rebooted several times: assets/monitors/device_reboot.json
    Cisco SD-WAN Device is unreachable: assets/monitors/device_unreachable.json
    Cisco SD-WAN Tunnel is down: assets/monitors/tunnel_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_sdwan/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_sdwan
integration_id: cisco-sdwan
integration_title: Cisco SD-WAN
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_sdwan
public_title: Cisco SD-WAN
short_description: Monitoriza tu entorno de Cisco SD-WAN con Datadog.
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
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza tu entorno de Cisco SD-WAN con Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco SD-WAN
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->



## Información general

La integración de Cisco SD-WAN te permite monitorizar tu entorno de Cisco SD-WAN dentro de [Network Device Monitoring][1]. Obtén información completa sobre el rendimiento y el estado de tu infraestructura de SD-WAN, incluidos sitios, túneles y dispositivos.

## Configuración

**La integración de Cisco SD-WAN NDM está en fase de vista previa y no se facturará hasta que esté disponible de forma generalizada.**

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Cisco SD-WAN se incluye en el paquete del [Datadog Agent ][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

Las integraciones de Cisco SD-WAN necesitan credenciales válidas para acceder a la instancia de Catalyst Manager.
Las credenciales deben tener el grupo de permisos "Monitorización de dispositivos".

1. Edita el archivo `cisco_sdwan.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Cisco SD-WAN. Consults el [cisco_sd_wan.d/conf.yaml de ejemplo][4] para ver todas las opciones disponibles de configuración.

2. [Reinicia el Agent][5].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cisco_sdwan" >}}


### Eventos

El check de Cisco SD-WAN no incluye ningún evento.

### Checks de servicio

El check de Cisco SD-WAN no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://app.datadoghq.com/devices
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/cisco_sdwan.d/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/cisco_sdwan/metadata.csv
[7]: https://docs.datadoghq.com/es/help/