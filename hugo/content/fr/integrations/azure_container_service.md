---
app_id: azure-containerservice
app_uuid: 6146f70c-cb70-419e-afbc-318b79b70864
assets:
  dashboards:
    azure_container_service: assets/dashboards/azure_container_service.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.containerservice_managedclusters.kube_pod_status_ready
      metadata_path: metadata.csv
      prefix: azure.containerservice_managedclusters
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 284
    source_type_name: Azure Container Service
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- incident-teams
- azure
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_service
integration_id: azure-containerservice
integration_title: Azure Container Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_service
public_title: Azure Container Service
short_description: Surveillez des métriques clés d'Azure Container Service.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Containers
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Container Service.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Kubernetes Service vous permet de déployer rapidement un cluster Kubernetes prêt pour la production.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Kubernetes Service.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{ get-metrics-from-git "azure-containerservice" }}


### Événements

L'intégration Azure Kubernetes Service n'inclut aucun événement.

### Checks de service

L'intégration Azure Kubernetes Service n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/