---
app_id: system
app_uuid: 423f4b03-ce99-4ffc-a553-e522ebd451be
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.nfs.ops
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Nfsstat
  logs:
    source: nfsstat
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nfsstat/README.md
display_on_public_website: true
draft: false
git_integration_title: nfsstat
integration_id: system
integration_title: Nfsstat
integration_version: 1.11.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: nfsstat
public_title: Nfsstat
short_description: nfsstat récupère des métriques nfsiostat-sysstat.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & System
  - Category::Log Collection
  configuration: README.md#Setup
  description: nfsstat récupère des métriques nfsiostat-sysstat.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nfsstat
---



## Présentation

L'intégration NFS recueille les métriques concernant les points de montage sur le client NFS. Elle repose sur l'outil `nfsiostat`, qui permet d'afficher les [statistiques][1] par montage du client NFS.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check NFSstat est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Modifiez le fichier `nfsstat.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Pointez vers votre script binaire nfsiostat ou utilisez le script fourni avec le programme d'installation du binaire. Consultez le [fichier d'exemple nfsstat.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

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
Le check Nfsstat n'inclut aucun événement.

### Checks de service
Le check Nfststat n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

- [Créer un monitor réseau sur un check HTTP][9]

[1]: http://man7.org/linux/man-pages/man8/nfsiostat.8.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/datadog_checks/nfsstat/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://docs.datadoghq.com/fr/monitors/monitor_types/network/