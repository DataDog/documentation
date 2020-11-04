---
aliases:
  - /fr/integrations/vmware/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    vsphere-overview: assets/dashboards/vsphere_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vsphere/README.md'
display_name: vSphere
draft: false
git_integration_title: vsphere
guid: 930b1839-cc1f-4e7a-b706-0e8cf3218464
integration_id: vsphere
integration_title: vSphere
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vsphere.
metric_to_check: vsphere.vm.count
name: vsphere
public_title: Intégration Datadog/vSphere
short_description: Découvrez comment l'utilisation des ressources de vSphere affecte votre application.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique Vsphere][1]

## Présentation

Ce check recueille des métriques d'utilisation des ressources depuis votre cluster vSphere : charge processeur, disque, mémoire et réseau. Il surveille également votre serveur vCenter à la recherche d'événements et les envoie à Datadog.

## Configuration

### Installation

Le check vSphere est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur vCenter.

### Configuration

Dans la section **Administration** de vCenter, ajoutez un utilisateur en lecture seule du nom de `datadog-readonly`.

Modifiez ensuite le fichier `vsphere.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple vsphere.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

[Redémarrez l'Agent][5] pour commencer à envoyer des métriques et des événements vSphere à Datadog.

**Remarque** : l'Agent Datadog ne doit pas nécessairement être sur le même serveur que le logiciel vSphere. Lorsque le check vSphere est activé, l'Agent peut être configuré de façon à pointer vers le serveur vSphere (et ce, quel que soit le système d'exploitation sur lequel il s'exécute). Mettez à jour votre `<HOSTNAME>` en fonction.

### Compatibilité

À partir de la version 5.0.0 du check (incluse avec l'Agent version 6.18.0/7.18.0), une nouvelle implémentation de l'intégration a été mise en place, ce qui signifie que le fichier de configuration a été modifié. Pour assurer la compatibilité avec les versions précédentes, un paramètre de configuration intitulé `use_legacy_implementation` est temporairement disponible.
Si vous mettez à jour l'intégration depuis une version plus ancienne, ce paramètre n'est pas défini dans la configuration et oblige l'Agent à utiliser l'ancienne implémentation.
Si vous configurez l'intégration pour la première fois ou si vous souhaitez bénéficier des nouvelles fonctionnalités (comme la collecte de tags et les options de filtrage avancées), reportez-vous à l'exemple de fichier de configuration [vsphere.d/conf.yaml][4]. En particulier, assurez-vous de définir `use_legacy_implementation: false`.

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `vsphere` dans la section Checks.

## Données collectées

En fonction de la valeur `collection_level` configurée dans votre configuration du check, les métriques ci-dessous ne seront pas toutes recueillies. Consultez la [documentation relative aux niveaux de collecte des données Vsphere][7] pour découvrir les métriques collectées en fonction du niveau de collecte choisi.

### Métriques
{{< get-metrics-from-git "vsphere" >}}


### Événements

Ce check surveille le gestionnaire d'événements de vCenter à la recherche d'événements et les envoie à Datadog. Il envoie les types d'événements suivants :

- AlarmStatusChangedEvent:Gray
- VmBeingHotMigratedEvent
- VmReconfiguredEvent
- VmPoweredOnEvent
- VmMigratedEvent
- TaskEvent:Initialize powering On
- TaskEvent:Power Off virtual machine
- TaskEvent:Power On virtual machine
- TaskEvent:Reconfigure virtual machine
- TaskEvent:Relocate virtual machine
- TaskEvent:Suspend virtual machine
- TaskEvent:Migrate virtual machine
- VmMessageEvent
- VmSuspendedEvent
- VmPoweredOffEvent

### Checks de service

**vcenter.can_connect**:<br>
Renvoie CRITICAL si l'Agent ne parvient pas à se connecter à vCenter pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage

- [Est-il possible de limiter le nombre de machines virtuelles récupérées via l'intégration VMWare ?][9]

## Pour aller plus loin

Lisez notre [article de blog][10] (en anglais) à propos de la surveillance des environnements vSphere avec Datadog.

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/vsphere/images/vsphere_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.monitoring.doc/GUID-25800DE4-68E5-41CC-82D9-8811E27924BC.html
[8]: https://github.com/DataDog/integrations-core/blob/master/vsphere/metadata.csv
[9]: https://docs.datadoghq.com/fr/integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration/
[10]: https://www.datadoghq.com/blog/unified-vsphere-app-monitoring-datadog/#auto-discovery-across-vm-and-app-layers