---
app_id: azure-publicipaddress
app_uuid: a829d4e6-53b4-4cd2-8e83-941066bca46b
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_publicipaddresses.byte_count
      metadata_path: metadata.csv
      prefix: azure.network_publicipaddresses
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 299
    source_type_name: Dirección IP pública de Azure
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_public_ip_address
integration_id: azure-publicipaddress
integration_title: Dirección IP pública de Azure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_public_ip_address
public_title: Dirección IP pública de Azure
short_description: Rastrea las métricas principales de Azure Public IP Address.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas principales de Azure Public IP Address.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Dirección IP pública de Azure
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Cuando se asigna una dirección IP pública de Azure a un recurso, habilita la comunicación entrante y la conectividad saliente desde Internet.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Public IP Address.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-publicipaddress" }}


### Eventos

La integración Azure Public IP Address no incluye ningún evento.

### Checks de servicio

La integración Azure Public IP Address no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_public_ip_address/azure_public_ip_address_metadata.csv
[3]: https://docs.datadoghq.com/es/help/