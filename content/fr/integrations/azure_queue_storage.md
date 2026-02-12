---
app_id: azure-queue-storage
app_uuid: fafca6a4-8820-4a42-bc84-1d53f322366e
assets:
  dashboards:
    azure_queue_storage: assets/dashboards/azure_queue_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_queueservices.queue_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_queueservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 224
    source_type_name: Azure Queue Storage
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
git_integration_title: azure_queue_storage
integration_id: azure-queue-storage
integration_title: Azure Queue Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_queue_storage
public_title: Azure Queue Storage
short_description: Surveillez des métriques clés de Stockage File d'attente Azure.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés de Stockage File d'attente Azure.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Queue Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Stockage File d'attente Azure est un service qui vous permet de stocker un grand nombre de messages afin de pouvoir y accéder où que vous soyez par l'intermédiaire d'appels authentifiés, à l'aide du protocole HTTP ou HTTPS.

Recueillez des métriques de Stockage File d'attente Azure pour :

- Visualiser les performances de votre stockage de file d'attente
- Corréler les performances de votre stockage de file d'attente avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-queue-storage" >}}


### Événements

L'intégration Stockage File d'attente Azure n'inclut aucun événement.

### Checks de service

L'intégration Stockage File d'attente Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_queue_storage/azure_queue_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/