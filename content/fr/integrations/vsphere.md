---
aliases:
  - /fr/integrations/vmware/
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vsphere/README.md'
display_name: vSphere
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

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][11] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check vSphere est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur vCenter.

### Configuration

Dans la section **Administration** de vCenter, ajoutez un utilisateur en lecture seule appelé `datadog-readonly`.

Modifiez ensuite le fichier `vsphere.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple vsphere.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

```
init_config:

instances:
  - name: main-vcenter # le tag appliqué aux métriques, p. ex. 'vcenter_server:main-vcenter'
    host: <HOSTNAME_VCENTER>          # p. ex. monvcenter.exemple.com
    username: <UTILISATEUR_CRÉÉ_PLUS_TÔT> # p. ex. datadog-readonly@vsphere.local
    password: <MOTDEPASSE>
```

[Redémarrez l'Agent][5] pour commencer à envoyer des métriques et des événements vSphere à Datadog.

**Remarque** : l'Agent Datadog ne doit pas nécessairement être sur le même serveur que le logiciel vSphere. Lorsque le check vSphere est activé, l'Agent peut être configuré de façon à pointer vers le serveur vSphere (et ce, quel que soit le système d'exploitation sur lequel il s'exécute). Mettez à jour votre `<HOSTNAME_VCENTER>` en fonction.

### Compatibilité

À partir de la version 3.3.0 du check (incluse avec l'Agent version 6.5.0/5.27.0), un nouveau paramètre facultatif `collection_level` est disponible pour sélectionner les métriques à recueillir à partir du vCenter, le paramètre facultatif `all_metrics` étant désormais obsolète. Les noms des métriques envoyées à Datadog par l'intégration ont également changé, avec l'ajout d'un suffixe spécifiant le type de cumul de la métrique exposée par vCenter (`.avg`, `.sum`, etc.).

Par défaut, à partir de la version 3.3.0, le paramètre `collection_level` est défini sur 1 et l'intégration envoie les nouveaux noms de métrique avec le suffixe supplémentaire.

Les scénarios suivants sont possible lors de l'utilisation de l'intégration vSphere :
1. Vous n'avez jamais utilisé l'intégration auparavant et vous venez d'installer un Agent version 6.5.0+/5.27.0+. Vous n'avez rien de particulier à faire dans ce cas. Utilisez l'intégration, configurez le paramètre `collection_level` et visualisez vos métriques dans Datadog.

2. Vous avez utilisé l'intégration avec un Agent antérieur à 6.5.0/5.27.0, et vous êtes depuis passé à une version plus récente.
    - Si le paramètre `all_metrics` est spécifiquement défini sur `true` ou `false` dans votre configuration, rien ne change (les mêmes métriques sont envoyées à Datadog). Vous devez alors mettre à jour vos dashboards et monitors pour utiliser les nouveaux noms de métrique avant de passer au nouveau paramètre `collection_level`, car le paramètre `all_metrics` est obsolète et sera prochainement supprimé.
    - Si le paramètre `all_metrics` n'est pas spécifié dans votre configuration, une fois la nouvelle version installée, l'intégration définit le paramètre `collection_level` sur 1 par défaut et envoie les métriques à Datadog avec le nouveau nom.
    **Avertissement** : étant donné que les métriques obsolètes ne seront plus envoyées, vos graphiques de dashboard et vos monitors basés sur ces dernières cesseront de fonctionner. Pour empêcher cela, définissez `all_metrics: false` dans votre configuration afin de continuer à transmettre les mêmes métriques ; ensuite, mettez à jour vos dashboards et monitors afin de les faire utiliser les nouvelles métriques avant de recommencer à utiliser `collection_level`.

#### Options de configuration

| Options                   | Obligatoire | Description                                                                                                                                                                                                                                                                               |
|---------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ssl_verify`              | Non       | Définir sur false pour désactiver la vérification SSL lors de la connexion à vCenter.                                                                                                                                                                                                                     |
| `ssl_capath`              | Non       | Définir sur le chemin absolu d'un répertoire contenant les certificats d'autorité de certification au format PEM.                                                                                                                                                                                                    |
| `host_include_only_regex` | Non       | Utiliser une expression régulière comme celle-ci pour que le check ne récupère que les métriques de ces hosts ESXi, ainsi que celles des machines virtuelles fonctionnant sur ces hosts.                                                                                                                                                                         |
| `vm_include_only_regex`   | Non       | Utiliser une expression régulière pour inclure uniquement les machines virtuelles correspondant à cette expression.                                                                                                                                                                                                                       |
| `include_only_marked`     | Non       | Définir sur true pour recueillir uniquement les métriques des machines virtuelles vSphere marquées par un champ personnalisé avec la valeur « DatadogMonitored ». Ce champ personnalisé peut être défini depuis l'interface en appliquant un tag ou via l'interface de ligne de commande avec [PowerCLI][6] Exemple fonctionnant avec vSphere 5.1 : `Get-VM VM | Set-CustomField -Name "DatadogMonitored" -Value "DatadogMonitored"`.|
| `collection_level`        | Non       | Un nombre entre 1 et 4 pour spécifier combien de métriques sont envoyées : 1 signifie uniquement les métriques de surveillance importantes et 4 signifie toutes les métrique disponibles.                                                                                                                                          |
| `all_metrics`             | Non       | (Obsolète) Lorsque défini sur true, TOUTES les métriques de vCenter (soit un TRÈS grand nombre) sont recueillies. Lorsque défini sur false, un sous-ensemble de métriques intéressantes à surveiller est recueilli.                                                                                    |
| `event_config`            | Non       | La configuration d'événements est un dictionnaire. Pour le moment, le seul paramètre activable est `collect_vcenter_alarms`, qui envoie les alarmes définies dans vCenter en tant qu'événements.                                                                                                                                           |

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `vsphere` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "vsphere" >}}


### Événements

Ce check surveille le gestionnaire d'événements de vCenter à la recherche d'événements et les envoie à Datadog. Il n'envoie PAS les types d'événement suivants :

* AlarmStatusChangedEvent:Gray
* VmBeingHotMigratedEvent
* VmResumedEvent
* VmReconfiguredEvent
* VmPoweredOnEvent
* VmMigratedEvent
* TaskEvent:Initialize powering On
* TaskEvent:Power Off virtual machine
* TaskEvent:Power On virtual machine
* TaskEvent:Reconfigure virtual machine
* TaskEvent:Relocate virtual machine
* TaskEvent:Suspend virtual machine
* TaskEvent:Migrate virtual machine
* VmMessageEvent
* VmSuspendedEvent
* VmPoweredOffEvent

### Checks de service

`vcenter.can_connect` :
Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à vCenter pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage

* [Est-il possible de limiter le nombre de machines virtuelles récupérées via l'intégration VMWare ?][9]

## Pour aller plus loin
Lisez notre [article de blog][10] à propos de la surveillance des environnements vSphere avec Datadog.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/vsphere/images/vsphere_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://pubs.vmware.com/vsphere-51/index.jsp?topic=%2Fcom.vmware.powercli.cmdletref.doc%2FSet-CustomField.html
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/vsphere/metadata.csv
[9]: https://docs.datadoghq.com/fr/integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[10]: https://www.datadoghq.com/blog/unified-vsphere-app-monitoring-datadog/#auto-discovery-across-vm-and-app-layers
[11]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}