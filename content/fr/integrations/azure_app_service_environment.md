---
aliases:
  - /fr/integrations/azure_appserviceenvironment
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure App Service Environment.
doc_link: https://docs.datadoghq.com/integrations/azure_app_service_environment/
draft: false
git_integration_title: azure_app_service_environment
has_logo: true
integration_id: azure-appserviceenvironment
integration_title: Microsoft Azure App Service Environment
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_app_service_environment
public_title: Intégration Datadog/Microsoft Azure App Service Environment
short_description: Surveillez des métriques clés d'Azure App Service Environment.
version: '1.0'
---
## Présentation

Azure App Service Environment est une fonctionnalité d'Azure App Service qui fournit un environnement totalement isolé et dédié pour l'exécution sécurisée de vos applications App Service à grande échelle.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure App Service Environment.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_app_service_environment" >}}


### Événements

L'intégration Azure App Service Environment n'inclut aucun événement.

### Checks de service

L'intégration Azure App Service Environment n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_environment/azure_app_service_environment_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/