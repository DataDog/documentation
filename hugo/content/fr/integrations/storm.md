---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/storm/README.md
display_name: storm
draft: false
git_integration_title: storm
guid: 5a9ec2c3-8ea0-4337-8c45-a6b8a36b8721
integration_id: storm
integration_title: Storm
integration_version: 1.0.1
is_public: true
custom_kind: integration
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: storm.
metric_to_check: storm.bolt.last_60.acked
name: storm
public_title: Intégration Datadog/Storm
short_description: Statistiques d'exécution des topologies Apache Storm 1.x.x
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Storm en temps réel pour :

- Visualiser et surveiller les métriques des clusters et des topologies Storm.
- Être informé des failovers et des événements de Storm

## Configuration

Le check Storm n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Storm sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-storm==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `storm.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) Storm. Consultez le [fichier d'exemple storm.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

## Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `storm` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "storm" >}}


### Événements

Le check Storm n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "storm" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/storm/assets/service_checks.json
[10]: http://docs.datadoghq.com/help