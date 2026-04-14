---
app_id: snmp-chatsworth-products
app_uuid: 344b37df-ba82-4352-b277-ba1f1ccf716f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10330
    source_type_name: Chatsworth Products
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- red
- notificaciones
- snmp
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_chatsworth_products/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_chatsworth_products
integration_id: snmp-chatsworth-products
integration_title: Chatsworth Products
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_chatsworth_products
public_title: Chatsworth Products
short_description: Recopila métricas de SNMP de tus dispositivos de red Chatsworth
  Products.
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
  description: Recopila métricas de SNMP de tus dispositivos de red Chatsworth Products.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Soporte
  title: Chatsworth Products
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Chatsworth Products (CPI) es un fabricante mundial de productos y soluciones diseñados para proteger equipos informáticos e industriales.

Configura la integración Chatsworth Products y recopila métricas SNMP de dispositivos como PDU de Chatsworth Products.

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