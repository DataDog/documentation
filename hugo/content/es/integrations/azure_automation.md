---
app_id: azure-automation
app_uuid: 4df0e16c-2c9b-472a-962a-12b6d4e3f7c8
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.automation_automationaccounts.total_job
      metadata_path: metadata.csv
      prefix: azure.automation_automationaccounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 281
    source_type_name: Azure Automation
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- automatización
- azure
- nube
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_automation
integration_id: azure-automation
integration_title: Azure Automation
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_automation
public_title: Azure Automation
short_description: Rastrea las métricas principales de Azure Automation.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Categoría::Azure
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas principales de Azure Automation.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Automation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Automation ofrece un servicio de configuración y automatización basado en la nube que proporciona una gestión consistente en los entornos que son de Azure y que no son de Azure.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Automation.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_automation" >}}


### Eventos

La integración Azure Automation no incluye ningún evento.

### Checks de servicio

La integración Azure Automation no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_automation/azure_automation_metadata.csv
[3]: https://docs.datadoghq.com/es/help/