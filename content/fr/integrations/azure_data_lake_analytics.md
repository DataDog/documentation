---
app_id: azure-datalakeanalytics
app_uuid: cf9c8822-5df9-451a-a84b-3acee9f6dc28
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.datalakeanalytics_accounts.job_ended_success
      metadata_path: metadata.csv
      prefix: azure.datalakeanalytics_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 288
    source_type_name: Azure Data Lake Analytics
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- data stores
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_data_lake_analytics
integration_id: azure-datalakeanalytics
integration_title: Azure Data Lake Analytics
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_data_lake_analytics
public_title: Azure Data Lake Analytics
short_description: Surveillez des métriques clés Azure Data Lake Analytics.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés Azure Data Lake Analytics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Data Lake Analytics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Data Lake Analytics est un service d'analytique à la demande qui simplifie la gestion des Big Data.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de Data Lake Analytics.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{ get-metrics-from-git "azure-datalakeanalytics" }}


### Événements

L'intégration Azure Data Lake Analytics n'inclut aucun événement.

### Checks de service

L'intégration Azure Data Lake Analytics n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_analytics/azure_data_lake_analytics_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/