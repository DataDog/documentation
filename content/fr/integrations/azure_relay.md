---
app_id: azure-relay
app_uuid: 7334eb73-4a8e-4b0a-9c18-9a755c63ca69
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.relay_namespaces.active_connections
      metadata_path: metadata.csv
      prefix: azure.relay_namespaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 300
    source_type_name: Relais Azure
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
git_integration_title: azure_relay
integration_id: azure-relay
integration_title: Relais Azure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_relay
public_title: Relais Azure
short_description: Surveillez des métriques clés d'Azure Relay.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Relay.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Relais Azure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Le service Azure Relay vous permet d'exposer en toute sécurité les services exécutés dans votre réseau d'entreprise sur le cloud public. Vous pouvez le faire sans ouvrir de port sur votre pare-feu ni apporter de changements intrusifs à votre infrastructure réseau d'entreprise.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure Relay.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_relay" >}}


### Événements

L'intégration Azure Relay n'inclut aucun événement.

### Checks de service

L'intégration Azure Relay n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_relay/azure_relay_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/