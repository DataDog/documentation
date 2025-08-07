---
app_id: azure-apimanagement
app_uuid: 122539f9-dc11-4099-9d64-cbd6f50159a5
assets:
  dashboards:
    azure_api_management: assets/dashboards/azure_api_management.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.apimanagement_service.capacity
      metadata_path: metadata.csv
      prefix: azure.apimanagement_service
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 277
    source_type_name: Gestion de l'API Azure
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
git_integration_title: azure_api_management
integration_id: azure-apimanagement
integration_title: Gestion de l'API Azure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_api_management
public_title: Gestion de l'API Azure
short_description: Surveillez des métriques clés du service Gestion des API Azure.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés du service Gestion des API Azure.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gestion de l'API Azure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Le service Gestion des API Azure est un service entièrement géré qui permet aux clients de publier, sécuriser, transformer, gérer et surveiller leurs API.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques du service Gestion des API Azure.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_api_management" >}}


### Événements

L'intégration Gestion des API Azure n'inclut aucun événement.

### Checks de service

L'intégration Gestion des API Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_api_management/azure_api_management_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/