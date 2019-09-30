---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nfsstat/README.md'
display_name: Nfsstat
git_integration_title: nfsstat
guid: 9f2fe3a7-ae19-4da9-a253-ae817a5557ab
integration_id: system
integration_title: Nfsstat
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.nfs.ops
name: nfsstat
public_title: Intégration Datadog/Nfsstat
short_description: nfsstat récupère des métriques nfsiostat-sysstat.
support: core
supported_os:
  - linux
---
## Présentation

L'intégration NFS recueille les métriques concernant les points de montage sur le client NFS. Elle repose sur l'outil `nfsiostat`, qui permet d'afficher les [statistiques][1] par montage du client NFS.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check NFSstat est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Modifiez le fichier `nfsstat.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4], afin de spécifier votre script binaire nfsiostat. Vous pouvez également utiliser le script fourni avec le programme d'installation du binaire. Consultez le [fichier d'exemple nfsstat.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `nfsstat` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "nfsstat" >}}


### Événements
Le check Nfststat n'inclut aucun événement.

### Checks de service
Le check Nfststat n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

* [Créer un monitor réseau sur un check HTTP][9]


[1]: http://man7.org/linux/man-pages/man8/nfsiostat.8.html
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/datadog_checks/nfsstat/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://docs.datadoghq.com/fr/monitors/monitor_types/network


{{< get-dependencies >}}