---
app_id: snmp-aruba
app_uuid: 39ecfe88-b733-43f6-b8c5-99450430b776
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10354
    source_type_name: Aruba
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notificaciones
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_aruba/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_aruba
integration_id: snmp-aruba
integration_title: Aruba
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_aruba
public_title: Aruba
short_description: Recopila métricas de SNMP de tus dispositivos de red Aruba.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Notificaciones
  - Categoría::Red
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila métricas de SNMP de tus dispositivos de red Aruba.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Soporte
  title: Aruba
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Aruba Networks es una filial de redes inalámbricas de Hewlett Packard Enterprise y ofrece soluciones cableadas, inalámbricas y SD-WAN. Configura la integración Aruba y recopila métricas SNMP de dispositivos como conmutadores y puntos de acceso Aruba.

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