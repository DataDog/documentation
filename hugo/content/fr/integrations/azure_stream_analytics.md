---
app_id: azure-streamanalytics
app_uuid: 190f11bb-ba6e-42ed-bdf8-b86c747d64be
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.streamanalytics_streamingjobs.input_events
      metadata_path: metadata.csv
      prefix: azure.streamanalytics_streamingjobs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 302
    source_type_name: Azure Stream Analytics
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
git_integration_title: azure_stream_analytics
integration_id: azure-streamanalytics
integration_title: Azure Stream Analytics
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_stream_analytics
public_title: Azure Stream Analytics
short_description: Surveillez des métriques clés d'Azure Stream Analytics.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Stream Analytics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Stream Analytics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Stream Analytics est un moteur de traitement d'événements conçu pour analyser d'importants volumes de données diffusées à partir d'appareils.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Stream Analytics.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{ get-metrics-from-git "azure-streamanalytics" }}


### Événements

L'intégration Azure Stream Analytics n'inclut aucun événement.

### Checks de service

L'intégration Azure Stream Analytics n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_stream_analytics/azure_stream_analytics_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/