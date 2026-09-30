---
app_id: snmp-fortinet
app_uuid: e501cab9-ba54-495c-80c2-ca3d373561a8
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10331
    source_type_name: Fortinet
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: ayuda@datadoghq.com
categories:
- la red
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/Datadog/integraciones-core/blob/master/snmp_fortinet/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_fortinet
integration_id: snmp-fortinet
integration_title: Fortinet
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_fortinet
public_title: Fortinet
short_description: Recopila métricas SNMP de tus dispositivos de red Fortinet.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Red
  - Categoría::Notificaciones
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila métricas SNMP de tus dispositivos de red Fortinet.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Soporte
  title: Fortinet
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza los dispositivos Fortinet.

Para obtener más detalles sobre métricas monitorizadas, consulta la sección [Datos SNMP recopilados][1].

## Configuración

Para instalar y configurar la integración SNMP, consulta la documentación de [Network Device Monitoring][2].

## Perfiles de proveedores

En la página de [proveedores de red][3] se pueden encontrar perfiles de proveedores específicos compatibles con esta integración.

## Datos recopilados

### Métricas

Para obtener más detalles sobre métricas monitorizadas, consulta la sección [Datos SNMP recopilados][1].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

* [Monitorizar SNMP con Datadog][5]



[1]: https://docs.datadoghq.com/es/network_monitoring/devices/data
[2]: https://docs.datadoghq.com/es/network_monitoring/devices/setup
[3]: https://docs.datadoghq.com/es/network_monitoring/devices/supported_devices/
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/