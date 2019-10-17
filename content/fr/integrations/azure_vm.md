---
categories:
  - cloud
  - azure
  - os & system
ddtype: crawler
dependencies: []
description: 'Surveillez l''utilisation des ressources des machines virtuelles Azure, les statistiques réseau, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/azure_vm/'
git_integration_title: azure_vm
has_logo: true
integration_title: Machine virtuelle Azure Microsoft
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_vm
public_title: Intégration Datadog/Machine virtuelle Azure Microsoft
short_description: 'Surveillez l''utilisation des ressources des machines virtuelles Azure, les statistiques réseau, et plus encore.'
version: '1.0'
---
## Présentation
Machine virtuelle Azure vous permet d'exécuter de manière flexible des environnements virtualisés et de faire évoluer à la demande vos capacités.

Recueillez des métriques de Machine Virtuelle Azure pour :

* Visualiser les performances de vos machines virtuelles
* Corréler les performances de vos machines virtuelles avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1].

Pour les machines virtuelles déployées avec **ARM**, vous devez activer Diagnostics et sélectionner les métriques des machines virtuelles que vous souhaitez recueillir. Consultez la section [Activer Diagnostics][7] pour obtenir des instructions.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_vm" >}}


### Événements
L'intégration Machine Virtuelle Azure n'inclut aucun événement.

### Checks de service
L'intégration Machine Virtuelle Azure n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

* [Comment surveiller des machines virtuelles Microsoft Azure][4]  
* [Comment recueillir des métriques Azure][5]  
* [Surveiller des machines virtuelles Azure avec Datadog][6]  

[1]: https://docs.datadoghq.com/fr/integrations/azure
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm/azure_vm_metadata.csv
[3]: https://docs.datadoghq.com/fr/help
[4]: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms
[5]: https://www.datadoghq.com/blog/how-to-collect-azure-metrics
[6]: https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog
[7]: https://docs.datadoghq.com/fr/integrations/faq/azure-troubleshooting/#enable-diagnostics


{{< get-dependencies >}}