---
app_id: velocloud-sd-wan
app_uuid: 45072425-fa07-4138-a67f-68f18ec441c9
assets:
  dashboards:
    VeloCloud Overview: assets/dashboards/velocloud_sd_wan_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - velocloud.flow_count
      metadata_path: metadata.csv
      prefix: velocloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26860628
    source_type_name: VeloCloud SD-WAN
  monitors:
    '[Velocloud] CPU usage high for {{edge_name.name}}': assets/monitors/high_cpu.json
    '[Velocloud] Edge {{edge_name.name}} is in a failing state': assets/monitors/down_edge.json
    '[Velocloud] Edge {{edge_name.name}}''s Link {{link_interface.name}} is in a failing state': assets/monitors/down_link.json
    '[Velocloud] Memory usage high for {{edge_name.name}}': assets/monitors/high_memory.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: velocloud_sd_wan
integration_id: velocloud-sd-wan
integration_title: VMware VeloCloud SD-WAN
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: velocloud_sd_wan
public_title: VMware VeloCloud SD-WAN
short_description: Monitorizar tu entorno VMware VeloCloud SD-WAN utilizando Network
  Device Monitoring y logs
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar tu entorno VMware VeloCloud SD-WAN utilizando Network Device
    Monitoring y logs
  media:
  - caption: Dashboard de información general de VeloCloud
    image_url: images/overview-dashboard.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/architecture/network-observability-sd-wan-reference-architecture/
  - resource_type: Blog
    url: https://www.datadoghq.com/product/network-monitoring/network-device-monitoring/
  support: README.md#Support
  title: VMware VeloCloud SD-WAN
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->


## Información general

<div class="alert alert-info">Network Device Monitoring para VMware VeloCloud SD-WAN está actualmente en Vista previa.</div>

Esta integración ofrece visibilidad de tu entorno VMware VeloCloud SD-WAN recopilando métricas de la salud del borde, del rendimiento de enlaces y del análisis de flujos para [Network Device Monitoring][1].

**Edge Health Monitoring**

Edge Health Monitor proporciona información sobre la salud general y la conectividad de los dispositivos del borde dentro de la red VeloCloud, lo que permite una gestión proactiva y una rápida identificación de los problemas que afectan al rendimiento del borde.

Con la detección automática de dispositivos de borde, esta integración extrae metadatos para permitir un análisis detallado por localización, tipo de borde y otras dimensiones.

**Network Link Performance**

Network Link Performance monitoriza conexiones de red para garantizar una calidad de enlace y una conectividad óptima entre localizaciones, lo que permite a los administradores identificar y solucionar rápidamente los problemas de red.

**Application Flow Analysis**

Application Flow Analysis proporciona una visibilidad detallada de los patrones de tráfico específicos de las aplicaciones, lo que ayuda a optimizar el uso del ancho de banda y a garantizar que las aplicaciones críticas mantengan un alto rendimiento.

**Logs**

Además de las métricas, se pueden recopilar logs de alertas. Busca tus logs de Datadog con `source:velocloud-sd-wan`. Si instalaste la integración correctamente, deberías poder visualizar eventos de VeloCloud.


## Configuración

### Instalación

1. En la aplicación, abre el [cuadro de integración de VeloCloud][2].
2. Haz clic en **Add Account** (Añadir cuenta).
3. Elige un nombre para tu cuenta de VeloCloud.
4. Sigue las instrucciones del cuadro para instalar la integración.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "velocloud_sd_wan" >}}
recopila, consulta la [documentación de VeloCloud][3]


### Checks de servicio

VeloCloud SD-WAN no incluye checks de servicios.

### Eventos

VeloCloud SD-WAN no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://app.datadoghq.com/devices
[2]: https://app.datadoghq.com/integrations/velocloud-sd-wan
[3]: https://developer.broadcom.com/xapis/vmware-sd-wan-orchestration-api-v2/latest/api/sdwan/v2/enterprises/enterpriseLogicalId/events/get/
[4]: https://docs.datadoghq.com/es/help/