---
app_id: azure-service-bus
app_uuid: 9db052dc-1cb1-405a-833d-dfb77a2db9df
assets:
  dashboards:
    azure_service_bus: assets/dashboards/azure_service_bus.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.servicebus_namespaces.count
      metadata_path: metadata.csv
      prefix: azure.servicebus_namespaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 227
    source_type_name: Azure Service Bus
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
git_integration_title: azure_service_bus
integration_id: azure-service-bus
integration_title: Azure Service Bus
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_service_bus
public_title: Azure Service Bus
short_description: Surveillez des métriques clés d'Azure Service Bus.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Service Bus.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Service Bus
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Microsoft Azure Service Bus est un courtier de messages d'intégration d'entreprise entièrement géré.

Recueillez des métriques d'Azure Service Bus pour :

- Visualiser les performances de votre Service Bus
- Corréler les performances de vos Service Bus avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-service-bus" >}}


### Événements

L'intégration Azure Service Bus n'inclut aucun événement.

### Checks de service

L'intégration Azure Service Bus n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_service_bus/azure_service_bus_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/