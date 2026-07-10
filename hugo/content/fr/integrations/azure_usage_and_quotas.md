---
app_id: azure-usage-and-quotas
app_uuid: 26bac8f2-d8b8-4623-8d55-3b4a5cc94abd
assets:
  dashboards:
    azure_usage_and_quotas: assets/dashboards/azure_usage_and_quotas.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.usage.current_value
      metadata_path: metadata.csv
      prefix: azure.usage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 306
    source_type_name: Azure Usage and Quotas
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- cost management
- network
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_usage_and_quotas
integration_id: azure-usage-and-quotas
integration_title: Azure Usage and Quotas
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_usage_and_quotas
public_title: Azure Usage and Quotas
short_description: Azure Usage and Quotas allows you to keep track of your current
  usages and limits.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Cost Management
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Usage and Quotas allows you to keep track of your current usages
    and limits.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Usage and Quotas
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Votre utilisation des ressources Azure doit respecter certaines limites prédéfinies en fonction de votre abonnement. Pour éviter tout problème de provisionnement inattendu, il est important de tenir compte de ces limites lors de la création ou de la mise à l'échelle de votre environnement Azure. Recueillez des métriques via l'intégration Utilisation et quotas Azure pour :

- Comparer votre utilisation des ressources réseau, de calcul et de stockage par rapport à vos quotas
- Identifier et éviter les échecs de provisionnement liés à l'atteinte de vos quotas

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-usage-and-quotas" >}}


### Événements

L'intégration Quotas Azure n'inclut aucun événement.

### Checks de service

L'intégration Quotas Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/