---
app_id: tailscale
app_uuid: e3f4a5cf-3594-43fc-9d4e-4e86b9c91ea2
assets:
  dashboards:
    tailscale-overview: assets/dashboards/tailscale_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10420
    source_type_name: Tailscale
  monitors:
    High Physical Traffic Received by Destination: assets/monitors/physical_traffic_received.json
    High Virtual Traffic Received by Destination: assets/monitors/virtual_traffic_received.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguridad
- recopilación de logs
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tailscale/README.md
display_on_public_website: true
draft: false
git_integration_title: tailscale
integration_id: tailscale
integration_title: Tailscale
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tailscale
public_title: Tailscale
short_description: Mira la auditoría de Tailscale y los logs de flujo de red en Datadog.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Log Collection
  - Category::Network
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Mira la auditoría de Tailscale y los logs de flujo de red en Datadog.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-tailscale-with-datadog/
  support: README.md#Support
  title: Tailscale
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

[Tailscale][1] es un servicio de VPN entre iguales que simplifica y asegura la conectividad de red.

Con esta integración, puedes:

1. Controlar la retención de datos de Tailscale.
2. Crear widgets y dashboards personalizados.
3. Realizar una referencia cruzada a eventos de Tailscale con los datos de otros servicios de tu stack tecnológico.

Esta integración transmite dos tipos de logs de Tailscale:

[Logs de auditoría de configuración][2]:

Los logs de auditoría de configuración te permiten identificar quién hizo qué y cuándo en tu tailnet. Estos logs registran las acciones que modifican una configuración de tailnet, incluido el tipo de acción, el actor, el recurso de destino y el tiempo.

[Logs de flujo de red][3]:

Los logs de flujo de red te indican qué nodos se conectaron a qué otros nodos y cuándo en tu red de Tailscale. Puedes exportar logs de red para el almacenamiento prolongado, el análisis de seguridad, la detección de amenazas o la investigación de incidentes.

Después del análisis de tus logs de Tailscale, Datadog rellena el dashboard de la información general de Tailscale predefinido con información de eventos relacionados con la seguridad de tu tráfico físico y virtual.

## Configuración

Para activar el streaming de logs:

1. Accede a tu consola de administración de Tailscale
2. Ve a la pestaña Logs
3. Selecciona el botón **Iniciar streaming...**.
4. En el menú, selecciona Datadog y añade un URL + token o [clave de API][4].
5. Selecciona el botón **Iniciar streaming**.

## Datos recopilados

### Métricas

Tailscale no incluye ninguna métrica.

### Checks de servicio

Tailscale no incluye ningún check de servicio.

### Eventos

Tailscale no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitoriza el estado de tu red privada de Tailscale con Datadog][6]

[1]: https://tailscale.com/
[2]: https://tailscale.com/kb/1203/audit-logging/
[3]: https://tailscale.com/kb/1219/network-flow-logs/
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.datadoghq.com/blog/monitor-tailscale-with-datadog/