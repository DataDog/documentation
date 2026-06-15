---
app_id: azure-table-storage
app_uuid: 0d649e43-2cb7-4706-8d4b-3d4156c212f1
assets:
  dashboards:
    azure_table_storage: assets/dashboards/azure_table_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_tableservices.table_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_tableservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 222
    source_type_name: Azure Table Storage
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
git_integration_title: azure_table_storage
integration_id: azure-table-storage
integration_title: Azure Table Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_table_storage
public_title: Azure Table Storage
short_description: Surveillez des métriques clés de Stockage Table Azure.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés de Stockage Table Azure.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Table Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Stockage Table Azure est un magasin de paires valeurs/clés NoSQL qui vous permet d'effectuer un développement rapide à l'aide de volumineux jeux de données semi-structurés.

Recueillez des métriques de Stockage Table Azure pour :

- Visualiser les performances de votre stockage de tables
- Corréler les performances de votre stockage de tables avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-table-storage" >}}


### Événements

L'intégration Stockage Table Azure n'inclut aucun événement.

### Checks de service

L'intégration Stockage Table Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/