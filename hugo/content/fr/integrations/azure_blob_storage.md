---
app_id: azure-blob-storage
app_uuid: 57ef97b4-651a-432d-9dc5-f56a94449d75
assets:
  dashboards:
    azure_blob_storage: assets/dashboards/azure_blob_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_blobservices.blob_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_blobservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 226
    source_type_name: Azure Blob Storage
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
git_integration_title: azure_blob_storage
integration_id: azure-blob-storage
integration_title: Azure Blob Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_blob_storage
public_title: Azure Blob Storage
short_description: Surveillez des métriques clés de Stockage Blob Azure.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés de Stockage Blob Azure.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Blob Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Stockage Blob Azure est une solution de stockage d'objets conçue par Microsoft pour le cloud. Le stockage de blobs est optimisé pour d'importants volumes de données non structurées. Recueillez des métriques de Stockage Blob Azure pour :

- Visualiser les performances de Stockage Blob
- Corréler les performances de Stockage Blob avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-blob-storage" >}}


### Événements

L'intégration Stockage Blob Azure n'inclut aucun événement.

### Checks de service

L'intégration Stockage Blob Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/