---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/disk/README.md
display_name: Disk
draft: false
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
integration_id: system
integration_title: Disk
integration_version: 4.7.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.free
monitors:
  disk-space-forecast: assets/monitors/disk_monitor.json
name: disk
public_title: Intégration Datadog/Disk
short_description: Le check Disk rassemble des métriques sur les disques montés.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Recueillez les métriques relatives à l'utilisation du disque et aux E/S.

## Configuration

### Installation

Le check Disk est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Le check Disk est activé par défaut et l'Agent recueille des métriques sur toutes les partitions locales. Pour configurer le check avec des options personnalisées, modifiez le fichier `disk.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple disk.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

#### Remarque concernant les hosts Windows
Le check Disk peut être utilisé dans les trois cas de figure suivants :

1. Surveillance de lecteurs physiques

  Le check Disk prend en charge par défaut la surveillance des lecteurs physiques (qui sont représentés par une lettre, par exemple, C:\, D:\, etc.). Cette surveillance ne nécessite aucune disposition particulière.

2. Surveillance de points de montage imbriqués

  Pour surveiller des dossiers montés dans un système de fichiers, des autorisations administrateur sont requises. En effet, elles permettent d'effectuer l'appel de la fonction Windows sous-jacente, [FindFirstVolumeMountPoint][4].
  Pour recueillir ces métriques sans octroyer d'autorisations administrateur à l'Agent, vous pouvez utiliser le [check PDH][5]. Cette approche vous permet de recueillir des métriques sur les points de montage à partir des compteurs de performances correspondants.

3. Surveillances des partages de fichiers

  Vous devez impérativement utiliser l'option `create_mounts` dans la configuration pour recueillir des métriques sur les points de montage pour les partages de fichiers sous Windows.
  Dans Windows, seul l'utilisateur qui a monté un partage peut consulter le dossier monté.
  L'option `create_mounts` permet ainsi à l'Agent de créer des points de montage afin de surveiller le contexte de l'utilisateur de l'Agent.

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `disk` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "disk" >}}


### Événements

Le check Disk n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "disk" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default
[4]: https://docs.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-findfirstvolumemountpointw
[5]: https://docs.datadoghq.com/fr/integrations/pdh_check/#pagetitle
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/disk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/disk/assets/service_checks.json
[9]: https://docs.datadoghq.com/fr/help/