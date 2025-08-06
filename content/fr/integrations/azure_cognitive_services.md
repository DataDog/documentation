---
app_id: azure-cognitiveservices
app_uuid: 0d77c8ca-d9b6-46a5-925e-c942e00425a2
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.cognitiveservices_accounts.total_calls
      metadata_path: metadata.csv
      prefix: azure.cognitiveservices_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 282
    source_type_name: Azure Cognitive Services
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
git_integration_title: azure_cognitive_services
integration_id: azure-cognitiveservices
integration_title: Azure Cognitive Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_cognitive_services
public_title: Azure Cognitive Services
short_description: Surveillez des métriques clés Azure Cognitive Services.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés Azure Cognitive Services.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Cognitive Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Cognitive Services proposent des API, des kits de développement et des services conçus pour aider les développeurs à créer des applications intelligentes sans disposer directement de l'intelligence artificielle ni de connaissances ou compétences en science des données.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure Cognitive Services.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, configurez l'[intégration Microsoft Azure][1]. Aucune installation supplémentaire n'est nécessaire.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_cognitive_services" >}}


### Événements

L'intégration Azure Cognitive Services n'inclut aucun événement.

### Checks de service

L'intégration Azure Cognitive Services n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/