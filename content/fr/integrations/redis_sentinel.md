---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/README.md
display_name: Redis Sentinel
draft: false
git_integration_title: redis_sentinel
guid: 8efe0a8c-88c6-4a2f-aa04-60d92051c458
integration_id: redis-sentinel
integration_title: Redis Sentinel
integration_version: 1.1.0
is_public: true
custom_kind: integration
maintainer: '@krasnoukhov'
manifest_version: 1.0.0
metric_prefix: redis.
metric_to_check: redis.sentinel.known_sentinels
name: redis_sentinel
public_title: Intégration Datadog/Redis Sentinel
short_description: Redis Sentinel optimise la disponibilité de Redis.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Recueillez des métriques du service Sentinel de Redis en temps réel pour :

- Visualiser et surveiller les états de Sentinel
- Être informé des failovers

## Configuration

Le check Redis Sentinel n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Redis Sentinel sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-redis_sentinel==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `redis_sentinel.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) Redis Sentinel.
   Consultez le [fichier d'exemple upsc.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

## Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `redis_sentinel` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "redis_sentinel" >}}


### Événements

Le check Redis Sentinel n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "redis_sentinel" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/datadog_checks/redis_sentinel/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/assets/service_checks.json
[10]: http://docs.datadoghq.com/help