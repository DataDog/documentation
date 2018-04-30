---
categories:
- cloud
- configuration & deployment
- network
- azure
ddtype: crawler
description: Suivre les workflows de déclenchement, la latence d'action, les actions échouées, etc...
doc_link: https://docs.datadoghq.com/integrations/azure_logic_app/
git_integration_title: azure_logic_app
has_logo: true
integration_title: Microsoft Azure Logic App
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_logic_app
public_title: Intégration Datadog-Microsoft Azure Logic App
short_description: Suivre les workflows de déclenchement, la latence d'action, les actions échouées, etc...
version: '1.0'
---

## Aperçu
Logic App permet aux développeurs de concevoir des workflows articulant l'intention via un trigger et une série d'étapes.

Obtenir les métriques de Azure Logc App pour:

* Visualiser les performances de vos workflows de Logic App
* Corréler les performances de vos workflows Logic App avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/). Aucune autre étape d'installation ne doit être effectuée.


## Données collectées
### Métriques
{{< get-metrics-from-git "azure_logic_app" >}}


### Evénements
L'intégration Azure Logic App n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration Azure Logic App n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
