---
app_id: snmp-juniper
app_uuid: 783d0088-b478-4b3c-9654-ec4fbfefc18d
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10146
    source_type_name: Juniper Networks
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_juniper/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_juniper
integration_id: snmp-juniper
integration_title: Juniper Networks
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_juniper
public_title: Juniper Networks
short_description: Recopila métricas de tus dispositivos de Juniper Networks.
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
  description: Recopila métricas de tus dispositivos de Juniper Networks.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-juniper-network-devices-with-datadog/
  support: README.md#Soporte
  title: Juniper Networks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Juniper Networks desarrolla y comercializa productos de red, incluyendo enrutadores, conmutadores, software de gestión red y productos de seguridad de red. Configura la integración Juniper y recopila métricas de SNMP de dispositivos, incluyendo:

- Conmutadores EX Ethernet de Juniper
- Enrutadores MX de Juniper
- Cortafuegos SRX de Juniper

Para ver más detalles sobre métricas monitorizadas, consulta la sección [Datos NDM recopilados][1].

## Configuración

Para instalar y configurar la integración SNMP, consulta la documentación [Monitorización de dispositivos de red][2].

## Perfiles de proveedores

Puedes encontrar perfiles de proveedores específicos compatibles con esta integración, consulta la página de [proveedores de red][3].

## Datos recopilados

### Métricas

Para ver más detalles sobre métricas monitorizadas, consulta la sección [Datos NDM recopilados][1].

### Checks de servicio

Juniper no incluye checks de servicio.

### Eventos

Juniper no incluye eventos.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de SNMP con Datadog][4]
- [Monitorización de dispositivos de red de Juniper con Datadog][5]

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://docs.datadoghq.com/es/network_monitoring/devices/data/
[2]: https://docs.datadoghq.com/es/network_monitoring/devices/setup/
[3]: https://docs.datadoghq.com/es/network_monitoring/devices/supported_devices/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[5]: https://www.datadoghq.com/blog/monitor-juniper-network-devices-with-datadog/
[6]: https://docs.datadoghq.com/es/help/