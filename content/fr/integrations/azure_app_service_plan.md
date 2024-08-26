---
aliases:
- /fr/integrations/azure_appserviceplan
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques clés des plans Azure App Service.
doc_link: https://docs.datadoghq.com/integrations/azure_app_service_plan/
draft: false
git_integration_title: azure_app_service_plan
has_logo: true
integration_id: azure-appserviceplan
integration_title: Plan Microsoft Azure App Service
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_app_service_plan
public_title: Intégration Datadog/Plan Microsoft Azure App Service
short_description: Surveillez des métriques clés des plans Azure App Service.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Un plan App Service définit un ensemble de ressources de calcul nécessaires à l'exécution d'une application web. Ces ressources de calcul sont analogues à la batterie de serveurs dans l'hébergement web classique.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de plans Azure App Service.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_app_service_plan" >}}


### Aide

L'intégration Plan Azure App Service n'inclut aucun événement.

### Aide

L'intégration Plan Azure App Service n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_plan/azure_app_service_plan_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/