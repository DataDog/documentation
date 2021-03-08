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
  - 'https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/README.md'
display_name: Redis Sentinel
draft: false
git_integration_title: redis_sentinel
guid: 8efe0a8c-88c6-4a2f-aa04-60d92051c458
integration_id: redis-sentinel
integration_title: Redis Sentinel
is_public: true
kind: integration
maintainer: '@krasnoukhov'
manifest_version: 1.1.0
metric_prefix: redis.
metric_to_check: redis.sentinel.known_sentinels
name: redis_sentinel
public_title: "Intégration Datadog/Redis\_Sentinel"
short_description: "Redis\_Sentinel optimise la disponibilité de Redis."
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

Le check Sentinel de Redis n'est **PAS** inclus avec le package de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Redis Sentinel sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec [une version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][1].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-redis_sentinel==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `redis_sentinel.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#metriques) Redis Sentinel.
   Consultez le [fichier d'exemple upsc.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

## Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `redis_sentinel` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "redis_sentinel" >}}


### Événements

Le check Redis Sentinel n'inclut aucun événement.

### Checks de service

**`redis.sentinel.master_is_down`**

Le check renvoie :

- `OK` si le serveur maître est disponible.
- `CRITICAL` si le serveur maître est indisponible.

**`redis.sentinel.master_is_disconnected`**

Le check renvoie :

- `OK` si le serveur maître n'est pas déconnecté.
- `CRITICAL` si le serveur maître est déconnecté.

**`redis.sentinel.slave_master_link_down`**

Le check renvoie :

- `OK` si la connexion au serveur maître est fonctionnelle.
- `CRITICAL` si la connexion au serveur maître n'est pas fonctionnelle.

**`redis.sentinel.slave_is_disconnected`**

Le check renvoie :

- `OK` si l'instance esclave n'est pas déconnectée.
- `CRITICAL` si l'instance esclave est déconnectée.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/datadog_checks/redis_sentinel/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/metadata.csv