---
app_id: snmp-dell
app_uuid: 2d90389f-0e85-49a8-8fd9-715ff1836a23
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10147
    source_type_name: Dell
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_dell/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_dell
integration_id: snmp-dell
integration_title: Dell Inc.
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_dell
public_title: Dell Inc.
short_description: Recopila métricas de los dispositivos Dell.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Notifications
  - Category::SNMP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila métricas de los dispositivos Dell.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: Dell Inc.
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Dell Inc. es una empresa tecnológica que desarrolla ordenadores y hardware para redes de alto rendimiento en pequeñas y grandes empresas. Recopila métricas para la monitorización y alerta del hardware de Dell, incluido:

* Dell PowerEdge
* Dell iDRAC
* Dell EMC Isilon

Si deseas consultar la lista completa de todas las métricas recopiladas de los dispositivos Dell, consulta la [documentación de Monitorización de dispositivos de red][1].

## Configuración

Para instalar y configurar la integración de SNMP, consulta la documentación [Monitorización de dispositivos de red][2].

## Perfiles de proveedores

En la página [proveedores de red][3] se pueden encontrar perfiles de proveedores específicos compatibles con esta integración.

## Datos recopilados

### Métricas

Para más detalles sobre las métricas monitorizadas consulta la [Documentación de monitorización de dispositivos de red][1].

### Checks de servicio

La integración de Dell no incluye ningún check de servicio.

### Eventos

La integración de Dell no incluye ningún evento.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

* [Monitorizar SNMP con Datadog][4]

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/es/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/es/network_monitoring/devices/supported_devices/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[5]: https://docs.datadoghq.com/es/help/