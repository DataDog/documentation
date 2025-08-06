---
app_id: azure-automation
app_uuid: 4df0e16c-2c9b-472a-962a-12b6d4e3f7c8
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.automation_automationaccounts.total_job
      metadata_path: metadata.csv
      prefix: azure.automation_automationaccounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 281
    source_type_name: Automatisation Azure
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- automation
- azure
- cloud
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_automation
integration_id: azure-automation
integration_title: Automatisation Azure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_automation
public_title: Automatisation Azure
short_description: Surveillez des métriques clés d'Azure Automation.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Azure
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Automation.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Automatisation Azure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Automation offre un service d'automatisation et de configuration cloud permettant une gestion cohérente de vos environnements Azure et non-Azure.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Automation.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_automation" >}}


### Événements

L'intégration Azure Automation n'inclut aucun événement.

### Checks de service

L'intégration Azure Automation n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_automation/azure_automation_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/