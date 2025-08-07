---
app_id: azure-datafactory
app_uuid: b85b780d-5e7f-4406-b2e6-d958445cb4f6
assets:
  dashboards:
    azure_data_factory: assets/dashboards/azure_data_factory.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.datafactory_factories.integration_runtime_available_memory
      - azure.datafactory_factories.trigger_succeeded_runs
      - azure.datafactory_factories.activity_succeeded_runs
      - azure.datafactory_factories.pipeline_succeeded_runs
      metadata_path: metadata.csv
      prefix: azure.datafactory_factories
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 287
    source_type_name: Azure Data Factory
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
git_integration_title: azure_data_factory
integration_id: azure-datafactory
integration_title: Azure Data Factory
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_data_factory
public_title: Azure Data Factory
short_description: Surveillez des métriques clés d'Azure Data Factory.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Data Factory.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Data Factory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Data Factory est un service d'intégration des données cloud, pour composer des services de stockage, de déplacement et de traitement des données au sein de pipelines de données automatisés.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de Data Factory.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, configurez l'[intégration Microsoft Azure][1]. Aucune étape d'installation supplémentaire n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_data_factory" >}}


### Événements

L'intégration Azure Data Factory n'inclut aucun événement.

### Checks de service

L'intégration Azure Data Factory n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_factory/azure_data_factory_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/