---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Speedtest: assets/dashboards/speedtest.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - isp
  - network
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md
display_name: speedtest
draft: false
git_integration_title: speedtest
guid: 4bf81e32-170a-44f3-868d-1683ef39464f
integration_id: speedtest
integration_title: speedtest
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: cody.lee@datadoghq.com
manifest_version: 1.0.0
metric_prefix: speedtest.
metric_to_check: speedtest.download.bandwidth
name: speedtest
public_title: Intégration Datadog/Speedtest
short_description: Exécutez un test Speedtest avec l'outil speedtest-cli
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Speedtest][1] avec l'Agent Datadog.

## Configuration

Le check Speedtest n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Speedtest sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-speedtest==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

**Remarque** : vous devez installer la [CLI Speedtest][1] sur chaque host et accepter l'accord en tant qu'utilisateur de l'Agent Datadog (par exemple, `sudo -u dd-agent speedtest`) pour utiliser l'intégration.

### Configuration

1. Modifiez le fichier `speedtest.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Speedtest. Consultez le [fichier d'exemple speedtest.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `speedtest` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "speedtest" >}}


### Événements

Le check Speedtest n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "speedtest" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://www.speedtest.net/apps/cli
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/