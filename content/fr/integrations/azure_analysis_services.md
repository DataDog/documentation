---
app_id: azure-analysisservices
app_uuid: 1705f0be-a2cb-4ebe-83f4-edc42bf735f6
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.analysisservices_servers.command_pool_job_queue_length
      metadata_path: metadata.csv
      prefix: azure.analysisservices_servers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 276
    source_type_name: Azure Analysis Services
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
git_integration_title: azure_analysis_services
integration_id: azure-analysisservices
integration_title: Azure Analysis Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_analysis_services
public_title: Azure Analysis Services
short_description: Surveillez des métriques clés d'Azure Analysis Services.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Analysis Services.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Analysis Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Analysis Services est une plateforme entièrement gérée en tant que service (PaaS) qui fournit des modèles de données de qualité professionnelle dans le cloud.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Analysis Services.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_analysis_services" >}}


### Événements

L'intégration Azure Analysis Services n'inclut aucun événement.

### Checks de service

L'intégration Azure Analysis Service n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_analysis_services/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/