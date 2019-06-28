---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/network/README.md'
display_name: Réseau
git_integration_title: network
guid: 43631795-8a1f-404d-83ae-397639a84050
integration_id: system
integration_title: Réseau
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.net.bytes_rcvd
name: network
public_title: Intégration Datadog/Réseau
short_description: 'Surveillez les débits binaires et de paquets d''entrée et de sortie, les états de connexion, les durées d''aller-retour, et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Réseau][1]

## Présentation

Le check réseau recueille des statistiques TCP/IP à partir du système d'exploitation du host.

## Implémentation
### Installation

Le check réseau est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

Pour recueillir des métriques avec cette intégration, assurez-vous que le module conntrack est activé sur votre host. Si ce n'est pas le cas, exécutez :

```
sudo modprobe nf_conntrack
sudo modprobe nf_conntrack_ipv4
sudo modprobe nf_conntrack_ipv6
```

### Configuration

1. L'Agent vous permet d'activer le check réseau par défaut. Si toutefois vous souhaitez le configurer vous-même, modifiez le fichier `network.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
  Consultez le [fichier d'exemple network.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      init_config:

      instances:
        # Network check only supports one configured instance
        - collect_connection_state: false # set to true to collect TCP connection state metrics, e.g. SYN_SENT, ESTABLISHED
          excluded_interfaces: # the check will collect metrics on all other interfaces
            - lo
            - lo0
      # ignore any network interface matching the given regex:
      #   excluded_interface_re: eth1.*
    ```

2. [Redémarrez l'Agent][5] pour prendre en compte le changement de configuration.


**Remarque** : certaines métriques conntrack ne peuvent être recueillies que si conntrack a été exécuté avec une élévation des privilèges. Pour garantir leur bon fonctionnement, configurez la règle sudoers suivante :

```
dd-agent ALL=NOPASSWD: /usr/sbin/conntrack -S
```

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `network` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "network" >}}


### Événements
Le check réseau n'inclut aucun événement.

### Checks de service
Le check réseau n'inclut aucun check de service.

## Dépannage

* [Comment envoyer des métriques de host TCP/UDP via l'API Datadog ?][8]

## Pour aller plus loin

* [Créer un monitor réseau sur un check HTTP][9]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/network/images/netdashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/network/datadog_checks/network/data/conf.yaml.default
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/network/metadata.csv
[8]: https://docs.datadoghq.com/fr/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
[9]: https://docs.datadoghq.com/fr/monitors/monitor_types/network


{{< get-dependencies >}}