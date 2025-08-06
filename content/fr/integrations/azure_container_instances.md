---
app_id: azure-containerinstances
app_uuid: 88867a91-04d4-41d3-8ced-36cd87c2a887
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.containerinstance_containergroups.cpu_usage
      metadata_path: metadata.csv
      prefix: azure.containerinstance_containergroups
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 283
    source_type_name: Instances de conteneurs Azure
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- incident-teams
- provisioning
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_instances
integration_id: azure-containerinstances
integration_title: Instances de conteneurs Azure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_instances
public_title: Instances de conteneurs Azure
short_description: Surveillez des métriques clés d'Azure Container Instances.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Container Instances.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Instances de conteneurs Azure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Container Instances est un service qui permet aux développeurs de déployer des conteneurs sans avoir à provisionner ou gérer l'infrastructure sous-jacente.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Container Instances.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_container_instances" >}}


### Événements

L'intégration Azure Container Instances n'inclut aucun événement.

### Checks de service

L'intégration Azure Container Instances n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_instances/azure_container_instances_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/