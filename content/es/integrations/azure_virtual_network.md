---
app_id: azure-virtual-network
app_uuid: b3dc6629-0cf1-4d31-8052-300bf1e0afec
assets:
  dashboards:
    azure_nat_gateway: assets/dashboards/azure_nat_gateway.json
    azure_virtual_network: assets/dashboards/azure_virtual_network.json
    azure_vpn_gateway: assets/dashboards/azure_vpn_gateway.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_virtualnetworks.total_addresses
      metadata_path: metadata.csv
      prefix: azure.network_virtualnetworks
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 307
    source_type_name: Azure Virtual Network
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- red
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_virtual_network
integration_id: azure-virtual-network
integration_title: Azure Virtual Network
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_virtual_network
public_title: Azure Virtual Network
short_description: Azure Virtual Networks permiten comunicaciones seguras en red entre
  muchos tipos de recursos de Azure
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Virtual Networks permiten comunicaciones seguras en red entre
    muchos tipos de recursos de Azure
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Virtual Network
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Virtual Network es el componente fundamental de tu red privada en Azure. Virtual Network permite que muchos tipos de recursos de Azure, como Azure Virtual Machines, se comuniquen de forma segura entre sí, con Internet y con las redes locales. Usa Datadog para monitorizar el espacio de direcciones disponible y evitar quedarte sin espacio en momentos críticos.

Obtén métricas de Azure Virtual Network para:

* Monitorizar la cantidad de direcciones asignadas y no asignadas para tus redes virtuales.
* Rastrear el número de interconexiones de red totales y conectadas.
* Rastrear el número de direcciones disponibles frente a las asignadas dentro de tus subredes.
* Evitar quedarte sin espacio de direcciones en momentos críticos.

**Las métricas de esta integración no están disponibles en Azure Monitor**. Datadog las genera consultando las API de metadatos de Azure y convirtiendo las respuestas en puntos de datos de series temporales. Se proporcionan en Datadog como métricas estándar de la integración de Azure.

## Configuración

**Nota**: Azure no admite el uso de subredes de gateway y devuelve un valor de (-1) tanto para el espacio de direcciones disponible como para el asignado. Asegúrate de tener esto en cuenta al analizar el uso agregado en las redes virtuales que contienen subredes de gateway.

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados
### Métricas
{{< get-metrics-from-git "azure_virtual_network" >}}


### Eventos
La integración Azure Virtual Network no incluye eventos.

### Checks de servicio
La integración Azure Virtual Network no incluye checks de servicios.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_virtual_networks/azure_virtual_networks_metadata.csv
[3]: https://docs.datadoghq.com/es/help/