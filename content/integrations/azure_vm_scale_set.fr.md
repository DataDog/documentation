---
categories:
- cloud
- azure
ddtype: crawler
description: 'Suivre les métriques de by-set: octets entrant sortant, opérations de disque, utilisation de CPU,
  and more.'
doc_link: https://docs.datadoghq.com/integrations/azure_vm_scale_set/
git_integration_title: azure_vm_scale_set
has_logo: true
integration_title: Microsoft Azure Virtual Machine Scale Set
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_vm_scale_set
public_title: Intégration Datadog-Microsoft Azure Virtual Machine Scale Set
short_description: 'Suivre les métriques de by-set: octets entrant sortant, opérations de disque, utilisation de CPU,
  and more.'
version: '1.0'
---

{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="azure vm scale set dashboard" responsive="true" >}}

## Aperçu
Les « Virtual Machine Scale Sets » sont des ressources d'Azure Compute que vous pouvez utiliser pour déployer, gérer et mettre à l'échelle automatiquement un ensemble de machines virtuelles identiques. 

Obtenir les métriques d'Azure Virtual Machine Scale Set afin de :

* Visualiser les performances de vos Virtual Machine Scale Sets
* Corréler les performances de vos Virtual Machine Scale Sets avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_vm_scale_set" >}}


### Evénements
L'intégration Azure Virtual Machine scale sets n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Azure Virtual Machine scale sets n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
