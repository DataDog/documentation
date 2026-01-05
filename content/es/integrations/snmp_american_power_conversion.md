---
app_id: snmp-american-power-conversion
app_uuid: 6b5325b8-443d-42e0-8545-f7dc42acacb4
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10329
    source_type_name: American Power Conversion
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_american_power_conversion/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_american_power_conversion
integration_id: snmp-american-power-conversion
integration_title: American Power Conversion
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_american_power_conversion
public_title: American Power Conversion
short_description: Recopila métricas de SNMP de tus dispositivos de red American Power
  Conversion
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
  description: Recopila métricas de SNMP de tus dispositivos de red American Power
    Conversion
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Soporte
  title: American Power Conversion
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

APC ofrece productos de infraestructura TI física, como protección contra sobretensiones y baterías de reserva.

Configura la integración APC y recopilar métricas SNMP de dispositivos como los productos Uninterruptible Power Supply (UPS) de APC.

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



[1]: https://docs.datadoghq.com/es/network_monitoring/devices/data/
[2]: https://docs.datadoghq.com/es/network_monitoring/devices/setup
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/