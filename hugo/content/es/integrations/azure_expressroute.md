---
app_id: azure-expressroute
app_uuid: 654f1eb4-a966-4d5c-b8e6-f8b434b4b7c9
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_expressroutecircuits.bits_in_per_second
      metadata_path: metadata.csv
      prefix: azure.network_expressroute
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 292
    source_type_name: Azure Express Route
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- network
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_expressroute
integration_id: azure-expressroute
integration_title: Azure Express Route
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_expressroute
public_title: Azure Express Route
short_description: Rastrea las métricas clave de Azure Express Route.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Express Route.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Express Route
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Utiliza el servicio Azure ExpressRoute para extender tus redes locales a la nube de Microsoft a través de una conexión privada facilitada por un proveedor de conectividad.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure ExpressRoute.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_expressroute" >}}


### Eventos

La integración Azure ExpressRoute no incluye eventos.

### Checks de servicio

La integración Azure ExpressRoute no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_express_route/azure_express_route_metadata.csv
[3]: https://docs.datadoghq.com/es/help/