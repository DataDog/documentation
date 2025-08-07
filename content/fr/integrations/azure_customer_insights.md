---
app_id: azure-customerinsights
app_uuid: 34e71ee6-2bd4-4de6-bd15-60052a12811e
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.customerinsights_hubs.dciapi_calls
      metadata_path: metadata.csv
      prefix: azure.customerinsights_hubs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 286
    source_type_name: Azure Customer Insights
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
git_integration_title: azure_customer_insights
integration_id: azure-customerinsights
integration_title: Azure Customer Insights
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_customer_insights
public_title: Azure Customer Insights
short_description: Surveillez des métriques clés d'Azure Customer Insights.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Customer Insights.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Customer Insights
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Customer Insights permet aux organisations de toute taille de consolider divers jeux de données et de générer des informations et des statistiques pour bénéficier d'une vue globale sur leurs clients.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de Customer Insights.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_customer_insights" >}}


### Événements

L'intégration Azure Customer Insights n'inclut aucun événement.

### Checks de service

L'intégration Azure Customer Insights n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_customer_insights/azure_customer_insights_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/