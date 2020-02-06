---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure App Services.
doc_link: 'https://docs.datadoghq.com/integrations/azure_app_services/'
git_integration_title: azure_app_services
has_logo: true
integration_title: Microsoft Azure App Service
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_app_services
public_title: Intégration Datadog/Microsoft Azure App Service
short_description: Surveillez des métriques clés d'Azure App Services.
version: '1.0'
---
## Présentation

Azure App Service est une plateforme en tant que service qui exécute des applications Web, mobiles, API et de logique métier, et gère automatiquement les ressources requises par ces applications.

Recueillez des métriques d'Azure App Service pour :

* Visualiser les performances de vos applications
* Corréler les performances de vos applications Azure avec vos autres applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_app_services" >}}


### Événements
L'intégration Azure App Service n'inclut aucun événement.

### Checks de service
L'intégration Azure App Service n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_services/azure_app_services_metadata.csv
[3]: https://docs.datadoghq.com/fr/help