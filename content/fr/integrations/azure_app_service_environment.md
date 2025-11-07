---
app_id: azure-appserviceenvironment
app_uuid: 918d0126-a4b0-4d8d-b38b-718c6115938d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.web_hostingenvironments_multirolepools.cpu_percentage
      metadata_path: metadata.csv
      prefix: azure.web_hostingenv
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 278
    source_type_name: Environnement Azure App Service
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
git_integration_title: azure_app_service_environment
integration_id: azure-appserviceenvironment
integration_title: Environnement Azure App Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_app_service_environment
public_title: Environnement Azure App Service
short_description: Surveillez des métriques clés d'Azure App Service Environment.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure App Service Environment.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Environnement Azure App Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure App Service Environment est une fonctionnalité d'Azure App Service qui fournit un environnement totalement isolé et dédié pour l'exécution sécurisée de vos applications App Service à grande échelle.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure App Service Environment.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{ get-metrics-from-git "azure-appserviceenvironment" }}


### Événements

L'intégration Azure App Service Environment n'inclut aucun événement.

### Checks de service

L'intégration Azure App Service Environment n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_environment/azure_app_service_environment_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/