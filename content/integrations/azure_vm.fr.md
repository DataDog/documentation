---
categories:
- cloud
- azure
- os & system
ddtype: crawler
description: Suivre l'utilisation des ressources de VM Azure, les statistiques réseau, etc...
doc_link: https://docs.datadoghq.com/integrations/azure_vm/
git_integration_title: azure_vm
has_logo: true
integration_title: Microsoft Azure VM
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_vm
public_title: Intégration Datadog-Microsoft Azure VM 
short_description: Suivre l'utilisation des ressources de VM Azure, les statistiques réseau, etc...
version: '1.0'
---

## Aperçu
Azure Virtual Machine vous permet d'exécuter de manière flexible des environnements virtualisés avec la possibilité d'évoluer à la demande.

Obtenir les métriques de Azure VM pour:

* Visualiser les performances de vos machines virtuelles
* Corréler les performances de vos machines virtuelles avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_vm" >}}


### Evénements
L'intégration Azure Virtual Machine n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Azure Virtual Machine n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
