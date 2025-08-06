---
app_id: azure-appserviceplan
app_uuid: a44b7b0f-fd60-4a5a-8a18-03498111db31
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.web_serverfarms.cpu_percentage
      metadata_path: metadata.csv
      prefix: azure.web_serverfarms
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 279
    source_type_name: Plan Azure App Service
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- azure
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_app_service_plan
integration_id: azure-appserviceplan
integration_title: Plan Azure App Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_app_service_plan
public_title: Plan Azure App Service
short_description: Surveillez des métriques clés des plans Azure App Service.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés des plans Azure App Service.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Plan Azure App Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure App Service Plan définit un ensemble de ressources informatiques utilisées pour exécuter une application web, à l'instar d'une ferme de serveurs dans l'hébergement web traditionnel. 

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de plans Azure App Service.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, configurez l'[intégration Microsoft Azure][1]. Aucune étape d'installation supplémentaire n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_app_service_plan" >}}


### Événements

L'intégration Plan Azure App Service n'inclut aucun événement.

### Checks de service

L'intégration Plan Azure App Service n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_plan/azure_app_service_plan_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/