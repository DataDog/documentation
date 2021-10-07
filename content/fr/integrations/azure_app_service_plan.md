---
aliases:
  - /fr/integrations/azure_appserviceplan
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés des plans Azure App Service.
doc_link: https://docs.datadoghq.com/integrations/azure_app_service_plan/
draft: false
git_integration_title: azure_app_service_plan
has_logo: true
integration_id: azure-appserviceplan
integration_title: Plan Microsoft Azure App Service
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_app_service_plan
public_title: Intégration Datadog/Plan Microsoft Azure App Service
short_description: Surveillez des métriques clés des plans Azure App Service.
version: '1.0'
---
## Présentation

Un plan App Service définit un ensemble de ressources de calcul nécessaires à l'exécution d'une application web. Ces ressources de calcul sont analogues à la batterie de serveurs dans l'hébergement web classique.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de plans Azure App Service.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_app_service_plan" >}}


### Événements

L'intégration Plan Azure App Service n'inclut aucun événement.

### Checks de service

L'intégration Plan Azure App Service n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_plan/azure_app_service_plan_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/