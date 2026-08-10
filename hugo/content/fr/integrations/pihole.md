---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- network
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pihole/README.md
display_name: pihole
draft: false
git_integration_title: pihole
guid: f0a69a1e-3961-43e2-9848-469342734e34
integration_id: pihole
integration_title: Pi-hole
integration_version: 3.14.1
is_public: true
custom_kind: integration
maintainer: monganai@tcd.ie
manifest_version: 1.0.0
metric_prefix: pihole.
metric_to_check: pihole.clients_ever_seen
name: pihole
public_title: Intégration Datadog/Pi-hole
short_description: Intégration pour recueillir les métriques Pi-hole par défaut
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Pi-hole][1] avec l'Agent Datadog.

## Configuration

Le check Pi-hole n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Pi-hole sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-pihole==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `pihole.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Pi-hole. Consultez le [fichier d'exemple pihole.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `pihole` dans la section Checks.

### Collecte de logs

Sur les plateformes Linux, l'activation de la collecte de logs pour l'Agent Datadog se fait dans `/etc/datadog-agent/datadog.yaml`. Sur les autres plateformes, consultez la [section Fichiers de configuration de l'Agent][8] pour connaître l'emplacement de votre fichier de configuration :

```yaml
logs_enabled: true
```

- Activez ce bloc de configuration dans votre fichier `pihole.d/conf.yaml` pour commencer à recueillir vos logs :
    ```yaml
    logs:
      - type: file
        path: /var/log/pihole.log
        source: pihole
    ```

## Données collectées

### Métriques
{{< get-metrics-from-git "pihole" >}}


### Événements

Pi-hole n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "pihole" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].


[1]: https://pi-hole.net/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/pihole/datadog_checks/pihole/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[9]: https://github.com/DataDog/integrations-extras/blob/master/pihole/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/pihole/assets/service_checks.json
[11]: https://docs.datadoghq.com/fr/help/