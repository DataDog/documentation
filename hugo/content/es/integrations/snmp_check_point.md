---
app_id: snmp-check-point
app_uuid: ea753ad3-1b17-4b05-bca5-d6933308e55a
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10334
    source_type_name: Check Point
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: ayuda@datadoghq.com
categories:
- la red
- notificaciones
- snmp
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_check_point/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_check_point
integration_id: snmp-check-point
integration_title: Check Point
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_check_point
public_title: Check Point
short_description: Recopila métricas de SNMP de tus dispositivos de red Check Point.
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
  description: Recopila métricas de SNMP de tus dispositivos de red Check Point.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Soporte
  title: Check Point
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Check Point es un proveedor de productos de software y hardware para la seguridad informática, incluida la seguridad de red.

Configura la integración Check Point y recopila métricas SNMP de dispositivos como los cortafuegos Check Point.

## Configuración

Para instalar y configurar la integración SNMP, consulta la documentación [Monitorización de dispositivos de red][1].

## Datos recopilados

### Métricas

Para obtener más detalles sobre métricas monitorizadas, consulta la sección [Datos SNMP recopilados][2].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

* [Monitorizar SNMP con Datadog][4]



[1]: https://docs.datadoghq.com/es/network_monitoring/devices/setup
[2]: https://docs.datadoghq.com/es/network_monitoring/devices/data
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/