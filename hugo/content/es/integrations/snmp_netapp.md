---
app_id: snmp-netapp
app_uuid: d50aeab6-c26b-49df-aeb1-910d5d1a3e48
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10333
    source_type_name: NetApp
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_netapp/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_netapp
integration_id: snmp-netapp
integration_title: NetApp
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_netapp
public_title: NetApp
short_description: Recopila métricas SNMP de tus dispositivos de red NetApp.
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
  description: Recopila métricas SNMP de tus dispositivos de red NetApp.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Soporte
  title: NetApp
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

NetApp es una empresa de gestión de datos y de servicios de datos en la nube que ofrece servicios de datos en la nube físicos y en línea para gestionar datos y aplicaciones.

Para obtener más detalles sobre métricas monitorizadas, consulta la sección [Datos SNMP recopilados][1].

## Configuración

Para instalar y configurar la integración SNMP, consulta la documentación de [Network Device Monitoring][2].

## Datos recopilados

### Métricas

Para obtener más detalles sobre métricas monitorizadas, consulta la sección [Datos SNMP recopilados][1].


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

* [Monitorizar SNMP con Datadog][4]



[1]: https://docs.datadoghq.com/es/network_monitoring/devices/data
[2]: https://docs.datadoghq.com/es/network_monitoring/devices/setup
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/