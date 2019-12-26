---
aliases:
  - /fr/integrations/redis/
assets:
  dashboards: {}
  monitors: {}
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
short_description: 'Suivez les performances, l''utilisation de la mémoire, les clients bloqués ainsi que les clés expulsées de Redis, et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Que vous utilisiez Redis en tant que base de données, cache ou file d'attente de messages, cette intégration vous permet de suivre les problèmes affectant vos serveurs Redis et les composants de votre infrastructure qu'ils desservent. Le check Redis de l'Agent Datadog recueille des métriques associées aux performances, à l'utilisation de la mémoire, aux clients bloqués, aux connexions esclaves, à la persistance du disque, aux clés expirées et expulsées, et bien plus encore.

## Implémentation
### Installation

Le check Redis est inclus dans le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Redis.

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Agent conteneurisé](#agent-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `redisdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Les paramètres suivants peuvent nécessiter une mise à jour. Consultez le [fichier d'exemple redisdb.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

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

2. [Redémarrez l'Agent][5].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Supprimez la mise en commentaire et modifiez ce bloc de configuration au bas de votre fichier `redisdb.d/conf.yaml` :

    ```yaml
      logs:
          - type: file
            path: /var/log/redis_6379.log
            source: redis
            sourcecategory: database
            service: myapplication
    ```

   Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple redisdb.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][5].

#### Agent conteneurisé
Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                       |
|----------------------|---------------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `redisdb`                                                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                               |
| `<CONFIG_INSTANCE>`  | <pre>{"host": "%%host%%",<br> "port":"6379",<br> "password":"%%env_REDIS_PASSWORD%%"}</pre> |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [collecte de logs avec Docker][11].

| Paramètre      | Valeur                                               |
|----------------|-----------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "redis", "service": "<YOUR_APP_NAME>"}` |

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `redisdb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "redisdb" >}}


### Événements

Le check Redis n'inclut aucun événement.

### Checks de service

**redis.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Redis pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

**redis.replication.master_link_status** :<br>
Renvoie `CRITICAL` si cette instance Redis n'est pas capable de se connecter à son instance principale. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

* [Erreur avec l'intégration Redis : « unknown command 'CONFIG' »][8]

### Connexion impossible de l'Agent

```
    redisdb
    -------
      - instance #0 [ERROR]: 'Error 111 connecting to localhost:6379. Connection refused.'
      - Collected 0 metrics, 0 events & 1 service check
```

Vérifiez que les informations de connexion dans `redisdb.yaml` sont correctes.

### Authentification impossible de l'Agent

```
    redisdb
    -------
      - instance #0 [ERROR]: 'NOAUTH Authentication required.'
      - Collected 0 metrics, 0 events & 1 service check
```

Configurez un `password` dans `redisdb.yaml`.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Comment surveiller les métriques de performance Redis][10]


[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/redisdb/metadata.csv
[8]: https://docs.datadoghq.com/fr/integrations/faq/redis-integration-error-unknown-command-config
[9]: https://docs.datadoghq.com/fr/developers/integrations
[10]: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics
[11]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#setup


{{< get-dependencies >}}