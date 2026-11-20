---
app_id: azure-container-apps
app_uuid: 4cfaeef2-96d5-4497-be6a-8d06169e8ddb
assets:
  dashboards:
    azure_container_apps: assets/dashboards/azure_container_apps.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.app_containerapps.requests
      metadata_path: metadata.csv
      prefix: azure.app_containerapps
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 800
    source_type_name: Azure Container Apps
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- incident-teams
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_apps
integration_id: azure-container-apps
integration_title: Azure Container Apps
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_apps
public_title: Azure Container Apps
short_description: Suivez les indicateurs clés d'Azure Container Apps.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: Suivez les indicateurs clés d'Azure Container Apps.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Apps
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Container Apps vous permet de créer et déployer des applications modernes et des microservices à l'aide de conteneurs sans serveur. Pour en savoir plus, consultez la [documentation de Microsoft][1] dédiée à Azure Container Apps.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez l'[intégration Microsoft Azure][2].

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-container-apps" >}}


### Événements

L'intégration Azure Container Apps n'inclut aucun événement.

### Checks de service

L'intégration Azure Container Apps n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/fr/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/