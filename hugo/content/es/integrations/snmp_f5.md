---
app_id: snmp-f5
app_uuid: 07050d86-968b-49e2-970e-599f535eece2
assets:
  dashboards:
    F5-Networks: assets/dashboards/f5-networks.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10179
    source_type_name: F5 Networks
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_f5/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_f5
integration_id: snmp-f5
integration_title: F5 Networks
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_f5
public_title: F5 Networks
short_description: Recopila métricas de SNMP de tus dispositivos de red F5.
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
  description: Recopila métricas de SNMP de tus dispositivos de red F5.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/network-device-monitoring/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Soporte
  title: F5 Networks
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

F5 Networks es una empresa de redes de entrega de aplicaciones y seguridad. Recopila métricas de estado y rendimiento de tus dispositivos F5, incluyendo las plataformas Big IP y LTM.

## Configuración

Todas las métricas de los dispositivos F5 se recopilan desde SNMP. Para empezar a recopilar métricas, instala y configura la integración SNMP. Para obtener más detalles y opciones de configuración, consulta la documentación de [Network Device Monitoring][1].

## Perfiles de proveedores

En la página de [proveedores de red][2] se pueden encontrar perfiles de proveedores específicos compatibles con esta integración.

## Datos recopilados

### Métricas

Todas las posibles métricas recopiladas con SNMP se pueden encontrar en la documentación de Network Device Monitoring en [Datos recopilados][3]. Todas las métricas recopiladas de los dispositivos F5 se pueden encontrar en el espacio de nombres [F5].

### Checks de servicio

La integración F5 no incluye checks de servicios.

### Eventos

No se envía ningún evento adicional a Datadog desde ningún componente de la plataforma F5.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

* [Monitorización de centros de datos y dispositivos de red con Datadog][4]
* [Monitorización de SNMP con Datadog][5]

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://docs.datadoghq.com/es/network_monitoring/devices/setup
[2]: https://docs.datadoghq.com/es/network_monitoring/devices/supported_devices/
[3]: https://docs.datadoghq.com/es/network_monitoring/devices/data
[4]: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[6]: https://docs.datadoghq.com/es/help/