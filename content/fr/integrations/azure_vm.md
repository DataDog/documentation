---
categories:
- cloud
- azure
- os & system
ddtype: crawler
dependencies: []
description: Surveillez l'utilisation des ressources des machines virtuelles Azure,
  les statistiques réseau, et plus encore.
doc_link: https://docs.datadoghq.com/integrations/azure_vm/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/video-streaming-performance-monitoring-conviva/
  tag: Blog
  text: Surveiller Conviva avec Datadog
git_integration_title: azure_vm
has_logo: true
integration_id: azure-vm
integration_title: Microsoft Azure VM
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_vm
public_title: Intégration Datadog/Machine virtuelle Azure Microsoft
short_description: Surveillez l'utilisation des ressources des machines virtuelles
  Azure, les statistiques réseau, et plus encore.
version: '1.0'
---

## Présentation

Machine virtuelle Azure vous permet d'exécuter de manière flexible des environnements virtualisés et de faire évoluer à la demande vos capacités.

Recueillez des métriques de Machine Virtuelle Azure pour :

- Visualiser les performances de vos machines virtuelles
- Corréler les performances de vos machines virtuelles avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1].

Pour les machines virtuelles déployées avec **ARM**, vous devez activer Diagnostics et sélectionner les métriques des machines virtuelles que vous souhaitez recueillir. Consultez la section [Activer Diagnostics][2] pour obtenir des instructions.

### Désactivation automatique des monitors

En cas d'arrêt ou d'interruption des machines virtuelles Azure, que ce soit suite à une intervention manuelle ou à la mise à l'échelle automatique d'Azure, Datadog peut désactiver de façon proactive les monitors en fonction des statuts de santé fournis par l'[API Azure Resource Health][3]. En désactivant les monitors lors des arrêts planifiés des machines virtuelles Azure, vous réduisez le nombre d'alertes inutiles envoyées.

Pour que les machines virtuelles désactivées automatiquement soient répertoriées sur la page [Monitor Downtime][4], cochez l'option **Show automatically muted hosts**. L'intégration Azure doit être activée pour que la désactivation automatique soit appliquée.

Pour désactiver les monitors lors de l'arrêt ou de l'interruption des machines virtuelles Azure, cochez la case **Azure automuting** dans le carré d'intégration Azure.

Pour créer des monitors de métrique prenant en charge la désactivation automatique, assurez-vous de les déclencher en fonction du tag `host`. Les monitors de métrique qui n'incluent pas le tag `host` dans le groupe surveillé ne sont pas automatiquement désactivés.

{{< img src="integrations/azure_vm/azure_vm_automute2.png" alt="Un monitor générant des alertes sur une requête comprenant le tag host" >}}

**Remarque :** si vous n'exécutez pas l'Agent Datadog, le tag `host` sur votre machine virtuelle Azure correspond à un GUID. Utilisez la template variable de message `{{host.name_tag}}` dans la réponse de la notification pour inclure également le nom lisible.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_vm" >}}


### Événements

L'intégration Machine Virtuelle Azure n'inclut aucun événement.

### Checks de service

L'intégration Machine Virtuelle Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

- [Comment surveiller des machines virtuelles Microsoft Azure][7]
- [Comment recueillir des métriques Azure][8]
- [Surveiller des machines virtuelles Azure avec Datadog][9]


[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://docs.datadoghq.com/fr/integrations/faq/azure-troubleshooting/#enable-diagnostics
[3]: https://docs.microsoft.com/en-us/rest/api/resourcehealth/
[4]: https://app.datadoghq.com/monitors#downtime
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm/azure_vm_metadata.csv
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms
[8]: https://www.datadoghq.com/blog/how-to-collect-azure-metrics
[9]: https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog