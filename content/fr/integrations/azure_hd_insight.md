---
app_id: azure-hdinsight
app_uuid: 2b5359ca-2d39-4a43-8f8a-49ec30f6bee3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.hdinsight_clusters.gateway_requests
      metadata_path: metadata.csv
      prefix: azure.hdinsight_clusters
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 294
    source_type_name: Azure HD Insight
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
git_integration_title: azure_hd_insight
integration_id: azure-hdinsight
integration_title: Azure HD Insight
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_hd_insight
public_title: Azure HD Insight
short_description: Suivre les indicateurs clés d'Azure HD Insight.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Suivre les indicateurs clés d'Azure HD Insight.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure HD Insight
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure HDInsight est un service cloud qui simplifie, accélère et rentabilise le traitement de quantités importantes de données.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure HDInsight.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_hd_insight" >}}


### Événements

L'intégration Azure HDInsight n'inclut aucun événement.

### Checks de service

L'intégration Azure HDInsight n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/