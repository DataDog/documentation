---
app_id: azure-networkinterface
app_uuid: b027e3ae-abcf-4beb-bab4-5dec50c611b2
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_networkinterfaces.bytes_received_rate
      metadata_path: metadata.csv
      prefix: azure.network_networkinterfaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 297
    source_type_name: Azure Network Interface
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- network
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_network_interface
integration_id: azure-networkinterface
integration_title: Azure Network Interface
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_network_interface
public_title: Azure Network Interface
short_description: Surveillez des métriques clés d'Azure Network Interface.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Network Interface.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Network Interface
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Network Interface permet à une machine virtuelle Azure de communiquer avec Internet, Azure et des ressources sur site.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure Network Interface.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{ get-metrics-from-git "azure-networkinterface" }}


### Événements

L'intégration Azure Network Interface n'inclut aucun événement.

### Checks de service

L'intégration Azure Network Interface n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/