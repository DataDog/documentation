---
app_id: snmp-cisco
app_uuid: 91202d4a-1af4-4c64-88e4-5ba02b23c69f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10136
    source_type_name: Cisco
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- la red
- notificaciones
- snmp
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_cisco/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_cisco
integration_id: snmp-cisco
integration_title: Cisco
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_cisco
public_title: Cisco
short_description: Recopila métricas de SNMP de tus dispositivos de red Cisco.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Red
  - Categoría::Notificaciones
  - Categoría::SNMP
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila métricas de SNMP de tus dispositivos de red Cisco.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Soporte
  title: Cisco
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Cisco es el líder mundial en soluciones de TI, redes y ciberseguridad. Instala la integración para monitorizar todos tus dispositivos Cisco, incluyendo routers, conmutadores, equipos de voz, dispositivos de seguridad y mucho más.

Recopila métricas de SNMP de dispositivos Cisco, incluyendo:

- Cisco Catalyst
- [Cisco Adaptive Security Appliance][1] (ASA)
- [Cisco Meraki][2] 
  **Nota**: Se pueden recopilar eventos adicionales de Meraki a través del [cuadro de la integración Meraki][3]
- Cisco Nexus
- Cisco ICM
- Cisco ISR
- [Cisco SD-WAN][4]
- Máquinas virtuales Cisco UC

**Nota**: Para encontrar más perfiles de proveedores compatibles con esta integración, consulta la página de [proveedores de red][5].

## Configuración

Para instalar y configurar la integración SNMP, consulta la documentacipn [Monitorización de dispositivos de red][6].

## Datos recopilados

### Métricas

Para ver más detalles sobre métricas monitorizadas, consulta el [cuadro de la integración SNMP][7].

### Checks de servicio

SNMP Cisco no incluye checks de servicio.

### Eventos

SNMP Cisco no incluye eventos.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

* [Monitorización de SNMP con Datadog][8]

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://docs.datadoghq.com/es/integrations/crest_data_systems_cisco_asa/
[2]: https://docs.datadoghq.com/es/integrations/meraki/
[3]: https://app.datadoghq.com/account/settings#integrations/meraki
[4]: https://docs.datadoghq.com/es/integrations/cisco_sdwan/
[5]: https://docs.datadoghq.com/es/network_monitoring/devices/supported_devices/
[6]: https://docs.datadoghq.com/es/network_performance_monitoring/devices/setup
[7]: https://app.datadoghq.com/account/settings#integrations/snmp
[8]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[9]: https://docs.datadoghq.com/es/help/