---
categories:
- cloud
- configuration & deployment
- azure
ddtype: crawler
description: Suivre les métriques clés du service Azure Batch.
doc_link: https://docs.datadoghq.com/integrations/azure_batch/
git_integration_title: azure_batch
has_logo: true
integration_title: Microsoft Azure Batch
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_batch
public_title: Intégration Datadog-Microsoft Azure Batch
short_description: Suivre les métriques clés du service Azure Batch.
version: '1.0'
---

## Aperçu
Azure Batch Service est un planificateur de tâches géré et un processeur pour vos applications Azure.

Obtenir les métriques de Azure Batch Service pour:

* Visualiser les performances de vos comptes Batch
* Corréler les performances de vos comptes Batch avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_batch" >}}


### Evénements
L'intégration Azure Batch Service n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration Azure Batch Service n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

