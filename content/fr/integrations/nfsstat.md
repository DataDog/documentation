---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: nfsstat
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nfsstat/README.md'
display_name: Nfsstat
draft: false
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

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check NFSstat est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Modifiez le fichier `nfsstat.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3], afin de spécifier votre script binaire nfsiostat. Vous pouvez également utiliser le script fourni avec le programme d'installation du binaire. Consultez le [fichier d'exemple nfsstat.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer dans `datadog.yaml`, apportez la modification suivante :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `nfsstat.d/conf.yaml` pour commencer à recueillir vos logs NFSstat :

   ```yaml
   logs:
     - type: file
       path: /var/log/messages
       source: nfsstat
   ```

   Modifiez la valeur du paramètre `path` et configurez-la pour votre environnement.
   Consultez le [fichier d'exemple nfsstat.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][5].


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
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/datadog_checks/nfsstat/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://docs.datadoghq.com/fr/monitors/monitor_types/network/