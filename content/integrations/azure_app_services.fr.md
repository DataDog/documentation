---
categories:
- cloud
- azure
ddtype: crawler
description: Suivre les métriques clés de Azure App Services
doc_link: https://docs.datadoghq.com/integrations/azure_app_services/
git_integration_title: azure_app_services
has_logo: true
integration_title: Microsoft Azure App Service
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_app_services
public_title: Intégration Datadog-Microsoft Azure App Service
short_description: Suivre les métriques clefs de Azure App Services
version: '1.0'
---

## Aperçu

Azure App Service est une plate-forme en tant que service qui exécute des applications web, mobiles, API et de logique métier, et gère automatiquement les ressources requises par ces applications.

Obtenir les métriques de Azure App Service pour:

* Visualiser les performances de votre application
* Corréler les performances de vos applications Azure avec vos autres applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_app_services" >}}


### Evénements
L'intégration Azure App Service n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration Azure App Service n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

