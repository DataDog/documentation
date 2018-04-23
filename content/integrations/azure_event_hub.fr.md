---
categories:
- cloud
- processing
- notification
- azure
ddtype: crawler
description: Suivre les métriques Azure Event Hub.
doc_link: https://docs.datadoghq.com/integrations/azure_event_hub/
git_integration_title: azure_event_hub
has_logo: true
integration_title: Microsoft Azure Event Hub
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_event_hub
public_title: Intégration Datadog-Microsoft Azure Event Hub
short_description: Suivre les métriques Azure Event Hub.
version: '1.0'
---

## Aperçu
Azure Event Hub est un service géré de flux de données à grande échelle.

Obtenir les métriques de Azure Event Hub pour:

* Visualiser les performances de vos hubs d'évènements
* Corréler les performances de votre  Event Hubs avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_event_hub" >}}


### Evénements
L'intégration Azure Event Hub n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration Azure Event Hub n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

