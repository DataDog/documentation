---
aliases: []
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eventstore/README.md
display_name: Event Store
draft: false
git_integration_title: eventstore
guid: 4BEB8E51-E7DA-4145-B780-E3B3A6A8CD60
integration_id: eventstore
integration_title: Event Store
integration_version: 2.0.0
is_public: true
custom_kind: integration
maintainer: '@xorima'
manifest_version: 1.0.0
metric_prefix: eventstore.
metric_to_check: eventstore.proc.mem
name: eventstore
public_title: Intégration Datadog/Event Store
short_description: Recueille des métriques d'Event Store
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Recueillez des métriques d'Event Store en temps réel pour :

* Visualiser et surveiller les files d'attente Event Store
* Enregistrer toutes les métriques disponibles dans les endpoints d'API suivants : statistiques, informations de nœud, projections non transitoires et abonnements, bavardage de cluster (la liste d'endpoints à analyser est configurable)

## Configuration

Le check EventStore n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check EventStore sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-eventstore==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `eventstore.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) EventStore.
   Consultez le [fichier d'exemple eventstore.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `eventstore` dans la section Checks.

## Compatibilité

Ce check est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "eventstore" >}}


### Événements

Le check Event Store n'inclut aucun événement.

### Checks de service

Le check Event Store n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez le [responsable de la maintenance][9] de cette intégration.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json