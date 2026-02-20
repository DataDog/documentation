---
app_id: azure-networkinterface
app_uuid: b027e3ae-abcf-4beb-bab4-5dec50c611b2
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_networkinterfaces.bytes_received_rate
      metadata_path: metadata.csv
      prefix: azure.network_networkinterfaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 297
    source_type_name: Azure Network Interface
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
git_integration_title: azure_network_interface
integration_id: azure-networkinterface
integration_title: Azure Network Interface
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_network_interface
public_title: Azure Network Interface
short_description: Rastrea las métricas clave de Azure Network Interface.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Network Interface.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Network Interface
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Network Interface permite que una máquina virtual de Azure se comunique con Internet, Azure y recursos locales.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Network Interface.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_network_interface" >}}


### Eventos

La integración Azure Network Interface no incluye eventos.

### Checks de servicio

La integración Azure Network Interface no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/es/help/