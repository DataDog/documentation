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
- web
- network
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/network/README.md
display_name: Network
draft: false
git_integration_title: network
guid: 43631795-8a1f-404d-83ae-397639a84050
integration_id: system
integration_title: Network
integration_version: 2.7.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.net.bytes_rcvd
name: network
public_title: Intégration Datadog/Network
short_description: Surveillez les débits binaires et de paquets d'entrée et de sortie,
  les états de connexion, les durées d'aller-retour, et plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Dashboard Network][1]

## Présentation

Le check Network recueille des statistiques TCP/IP à partir du système d'exploitation du host.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check Network est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

Pour recueillir des métriques avec cette intégration, assurez-vous que le module conntrack est activé sur votre host. Si ce n'est pas le cas, exécutez :

```shell
sudo modprobe nf_conntrack
sudo modprobe nf_conntrack_ipv4
sudo modprobe nf_conntrack_ipv6
```

*Remarque* : vous devrez peut-être installer le binaire conntrack sur l'image de l'Agent.

### Configuration

1. L'Agent active le check Network par défaut. Si toutefois vous souhaitez le configurer vous-même, modifiez le fichier `network.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple network.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

2. [Redémarrez l'Agent][5] pour prendre en compte le changement de configuration.

**Remarques** :

Certaines métriques conntrack ne peuvent être recueillies que si conntrack a été exécuté avec une élévation des privilèges.

Linux : configurez la règle sudoers suivante pour garantir le bon fonctionnement du check.

```shell
dd-agent ALL=NOPASSWD: /usr/sbin/conntrack -S
```

Kubernetes : pour les versions antérieures à 1.11, les métriques conntrack sont disponibles par défaut. Pour la version 1.11 et les versions ultérieures, elles sont disponibles lorsque vous utilisez le mode de mise en réseau `host`.

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `network` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "network" >}}


**Remarque** : les métriques `system.net.conntrack` sont disponibles avec la version 6.12 ou les versions ultérieures de l'Agent. Consultez le [CHANGELOG][8] pour en savoir plus.

### Événements

Le check Network n'inclut aucun événement.

### Checks de service

Le check Network n'inclut aucun check de service.

## Dépannage

- [Envoyer des métriques de host TCP/UDP via l'API Datadog][9]

## Pour aller plus loin

- [Créer un monitor réseau sur un check HTTP][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/network/images/netdashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/network/datadog_checks/network/data/conf.yaml.default
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/network/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/network/CHANGELOG.md#1110--2019-05-14
[9]: https://docs.datadoghq.com/fr/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api/
[10]: https://docs.datadoghq.com/fr/monitors/monitor_types/network/