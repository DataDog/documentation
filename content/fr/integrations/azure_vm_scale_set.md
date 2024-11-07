---
categories:
  - cloud
  - azure
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques sur vos groupes de machines virtuelles\_: octets entrants/sortants, opérations de disque, charge CPU, et plus encore."
doc_link: https://docs.datadoghq.com/integrations/azure_vm_scale_set/
draft: false
git_integration_title: azure_vm_scale_set
has_logo: true
integration_id: azure-vm-scale-set
integration_title: Azure Virtual Machine Scale Set
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_vm_scale_set
public_title: Intégration Datadog/Azure Virtual Machine Scale Set
short_description: "Surveillez des métriques sur vos groupes de machines virtuelles\_: octets entrants/sortants, opérations de disque, charge CPU, et plus encore."
version: '1.0'
---
{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="dashboard groupes de machines virtuelles identiques azure" popup="true">}}

## Présentation

Les groupes de machines virtuelles identiques sont des ressources de calcul Azure utilisées pour déployer, gérer et mettre automatiquement à l'échelle un ensemble de machines virtuelles identiques.

Recueillez des métriques des groupes de machines virtuelles identiques Azure pour :

- Visualiser les performances de vos groupes de machines virtuelles identiques
- Corréler les performances de vos groupes de machines virtuelles identiques avec vos applications

## Configuration

### Installation

Les métriques d'intégration sont incluses avec l'[intégration Microsoft Azure][1]. Pour recueillir des métriques avec l'Agent Datadog, suivez les instructions relatives au [déploiement d'Agents][2].

### Collecte de logs

Pour recueillir des logs à partir de certains événements Windows, ajoutez manuellement des canaux au fichier `conf.d/win32_event_log.d/conf.yaml` ou utilisez Datadog Agent Manager. Par exemple :

```yaml
logs:
  - type: windows_event
    channel_path: '<CANAL_1>'
    source: '<CANAL_1>'
    service: myservice
    sourcecategory: windowsevent
   - type: windows_event
    channel_path: '<CANAL_2>'
    source: '<CANAL_2>'
    service: myservice
    sourcecategory: windowsevent
```

Pour en savoir plus, consultez les informations relatives à l'intégration des [logs d'événement Win 32][3].

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_vm_scale_set" >}}


### Événements

L'intégration Azure Virtual Machine Scale Set n'inclut aucun événement.

### Checks de service

L'intégration Azure Virtual Machine Scale Set n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://docs.datadoghq.com/fr/integrations/azure/#deploy-agents
[3]: https://docs.datadoghq.com/fr/integrations/win32_event_log/#log-collection
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm_scale_set/azure_vm_scale_set_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/