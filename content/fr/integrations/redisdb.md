---
aliases:
  - /fr/integrations/redis/
assets:
  dashboards: {}
  monitors: {}
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    pid_overview: assets/saved_views/pid_overview.json
    redis_pattern: assets/saved_views/redis_pattern.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - caching
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/redisdb/README.md'
display_name: Redis
git_integration_title: redisdb
guid: 0e2f3ed1-d36b-47a4-b69c-fedb50adf240
integration_id: redis
integration_title: Redis
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: redis.
metric_to_check: redis.net.clients
name: redisdb
process_signatures:
  - redis-server
public_title: Intégration Datadog/Redis
short_description: 'Surveillez les performances, l''utilisation de la mémoire, les clients bloqués ainsi que les clés expulsées de Redis, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Que vous utilisiez Redis en tant que base de données, cache ou file d'attente de messages, cette intégration vous permet de suivre les problèmes affectant vos serveurs Redis et les composants de votre infrastructure qu'ils desservent. Le check Redis de l'Agent Datadog recueille des métriques associées aux performances, à l'utilisation de la mémoire, aux clients bloqués, aux connexions esclaves, à la persistance du disque, aux clés expirées et expulsées, et bien plus encore.

## Configuration

### Installation

Le check Redis est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Redis.

### Configuration

#### Host

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `redisdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Les paramètres suivants peuvent nécessiter une mise à jour. Consultez le [fichier d'exemple redisdb.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:
   instances:
     ## @param host - string - required
     ## Enter the host to connect to.
     - host: localhost
       ## @param port - integer - required
       ## Enter the port of the host to connect to.
       port: 6379
   ```

2. [Redémarrez l'Agent][4].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Supprimez la mise en commentaire du bloc de configuration suivant en bas de votre fichier `redisdb.d/conf.yaml`, puis modifiez-le :

   ```yaml
   logs:
     - type: file
       path: /var/log/redis_6379.log
       source: redis
       service: myapplication
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple redisdb.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

##### Collecte de traces

L'APM Datadog s'intègre à Redis pour vous permettre de visualiser les traces sur l'ensemble de votre système distribué. La collecte de traces est activée par défaut dans les versions 6 et ultérieures de l'Agent Datadog. Pour commencer à recueillir des traces :

1. [Activez la collecte de trace dans Datadog][5].
2. [Instrumentez l'application qui envoie des requêtes à Redis][6].


#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][7] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `redisdb`                                                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                                                              |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%", "port":"6379", "password":"%%env_MOTDEPASSE_REDIS%%"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][8].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "redis", "service": "<NOM_APP>"}` |

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge par les hosts exécutant les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections [Tracing d'applications Kubernetes][9] et [Configuration de DaemonSet Kubernetes][10] pour consulter la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez le conteneur de votre application][6] et définissez `DD_AGENT_HOST` sur le nom de votre conteneur d'Agent.


### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `redisdb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "redisdb" >}}


### Événements

Le check Redis n'inclut aucun événement.

### Checks de service

**redis.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à Redis pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

**redis.replication.master_link_status** :<br>
Renvoie `CRITICAL` si cette instance Redis ne parvient pas à se connecter à son instance principale. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

- [Erreur avec l'intégration Redis : « unknown command 'CONFIG' »][13]

### Connexion impossible de l'Agent

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'Error 111 connecting to localhost:6379. Connection refused.'
      - Collected 0 metrics, 0 events & 1 service chec
```

Vérifiez que les informations de connexion dans `redisdb.yaml` sont correctes.

### Authentification impossible de l'Agent

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'NOAUTH Authentication required.'
      - Collected 0 metrics, 0 events & 1 service check
```

Configurez un `password` dans `redisdb.yaml`.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Comment surveiller les métriques de performance Redis][14]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/tracing/send_traces/
[6]: https://docs.datadoghq.com/fr/tracing/setup/
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[8]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[9]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[10]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/redisdb/metadata.csv
[13]: https://docs.datadoghq.com/fr/integrations/faq/redis-integration-error-unknown-command-config/
[14]: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics