---
aliases:
  - /fr/integrations/redis/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    redis: assets/dashboards/overview.json
  logs:
    source: redis
  metrics_metadata: metadata.csv
  monitors:
    '[Redis] High memory consumption': assets/monitors/high_mem.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    pid_overview: assets/saved_views/pid_overview.json
    redis_pattern: assets/saved_views/redis_pattern.json
    redis_processes: assets/saved_views/redis_processes.json
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
draft: false
git_integration_title: redisdb
guid: 0e2f3ed1-d36b-47a4-b69c-fedb50adf240
integration_id: redis
integration_title: Redis
is_public: true
custom_kind: integration
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

Le check Redis est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Redis.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `redisdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Les paramètres suivants peuvent nécessiter une mise à jour. Consultez le [fichier d'exemple redisdb.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:
   instances:
     ## @param host - string - required
     ## Enter the host to connect to.
     - host: localhost
       ## @param port - integer - required
       ## Enter the port of the host to connect to.
       port: 6379

       ## @param username - string - optional
       ## The username to use for the connection. Redis 6+ only.
       #
       # username: <USERNAME>

       ## @param password - string - optional
       ## The password to use for the connection.
       #
       # password: <PASSWORD>
   ```

2. Si vous utilisez Redis 6+ et des ACL, assurez-vous que l'utilisateur dispose au moins des autorisations `DB  Viewer` au niveau de la base de données, et des autorisations `Cluster Viewer` en cas d'utilisation d'un environnement de cluster. Pour en savoir plus, consultez la [documentation][3] à ce sujet.

3. [Redémarrez l'Agent][4].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

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

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple redisdb.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

##### Collecte de traces

L'APM Datadog s'intègre à Redis pour vous permettre de visualiser les traces sur l'ensemble de votre système distribué. La collecte de traces est activée par défaut dans les versions 6 et ultérieures de l'Agent Datadog. Pour commencer à recueillir des traces :

1. [Activez la collecte de trace dans Datadog][5].
2. [Instrumentez l'application qui envoie des requêtes à Redis][6].


[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[3]: https://docs.redislabs.com/latest/rs/administering/access-control/user-roles/#cluster-management-roles
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/tracing/send_traces/
[6]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

Pour configurer ce check lorsque l'Agent est exécuté sur un conteneur :

##### Collecte de métriques

Définissez les [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```yaml
LABEL "com.datadoghq.ad.check_names"='["redisdb"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"host":"%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

**Remarque** : la logique de template variable `"%%env_<VAR_ENV>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être définie sur le conteneur de l'Agent. Consultez la documentation relative aux [template variables Autodiscovery][2] pour plus de détails. L'Agent peut également se servir du package `secrets` afin d'exploiter n'importe quel backend de [gestion des secrets][3] (comme HashiCorp Vault ou AWS Secrets Manager).

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][4].

Ensuite, définissez les [intégrations de logs][5] en tant qu'étiquettes Docker :

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"redis","service":"<NOM_APPLICATION>"}]'
```

##### Collecte de traces

L'APM pour applications conteneurisées est pris en charge sur les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour commencer à recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez la section [Tracer des applications Docker][6] pour voir la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez votre conteneur d'application qui envoie des requêtes à Redis][7] et définissez `DD_AGENT_HOST` sur le nom du conteneur de votre Agent.


[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/fr/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#installation
[5]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/fr/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Pour configurer ce check lorsque l'Agent est exécuté sur Kubernetes :

##### Collecte de métriques

Définissez les [modèles d'intégration Autodiscovery][1] en tant qu'annotations de pod sur votre conteneur d'application. En outre, les modèles peuvent également être configurés via [un fichier,  une configmap, ou un stockage clé/valeur][2]. 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Remarque** : la logique de template variable `"%%env_<VAR_ENV>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être définie sur le conteneur de l'Agent. Consultez la documentation relative aux [template variables Autodiscovery][3]. L'Agent peut également se servir du package `secrets` afin d'exploiter n'importe quel backend de [gestion des secrets][4] (comme HashiCorp Vault ou AWS Secrets Manager).

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][5].

Ensuite, définissez des [intégrations de logs][6] en tant qu'annotations de pod. Cette configuration peut également être réalisée avec [un fichier, une configmap ou un stockage key/value][7]. 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"<NOM_APPLICATION>"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge par les hosts exécutant les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections [Tracing d'applications Kubernetes][8] et [Configuration de DaemonSet Kubernetes][9] pour consulter la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez l'application qui envoie des requêtes à Redis][10].

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/fr/agent/faq/template_variables/
[4]: https://docs.datadoghq.com/fr/agent/guide/secrets-management/?tab=linux
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[6]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=daemonset#configuration
[8]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[9]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[10]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Pour configurer ce check lorsque l'Agent est exécuté sur ECS :

##### Collecte de métriques

Définissez les [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```json
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"redisdb\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"host\":\"%%host%%\",\"port\":\"6379\",\"password\":\"%%env_REDIS_PASSWORD%%\"}]"
    }
  }]
}
```

*Remarque** : la logique de template variable `"%%env_<VAR_ENV>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être définie sur le conteneur de l'Agent. Consultez la documentation relative aux [template variables Autodiscovery][2]. L'Agent peut également se servir du package `secrets` afin d'exploiter n'importe quel backend de [gestion des secrets][3] (comme HashiCorp Vault ou AWS Secrets Manager).

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec ECS][4].

Ensuite, définissez les [intégrations de logs][5] en tant qu'étiquettes Docker :

```yaml
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"redis\",\"service\":\"<VOTRE_APPLICATION>\"}]"
    }
  }]
}
```

##### Collecte de traces

L'APM pour applications conteneurisées est pris en charge sur les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour commencer à recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections [Tracer des applications Docker][6] pour voir la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez votre conteneur d'application qui envoie des requêtes à Redis][7] et définissez `DD_AGENT_HOST` sur l'[adresse IP privée EC2][8].

[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/fr/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/fr/agent/amazon_ecs/logs/?tab=linux
[5]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/fr/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/fr/tracing/setup/
[8]: https://docs.datadoghq.com/fr/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][2] et cherchez `redisdb` dans la section Checks.

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

- [Erreur avec l'intégration Redis : « unknown command 'CONFIG' »][3]

### Connexion de l'Agent impossible

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'Error 111 connecting to localhost:6379. Connection refused.'
      - Collected 0 metrics, 0 events & 1 service chec
```

Vérifiez que les informations de connexion dans `redisdb.yaml` sont correctes.

### Authentification de l'Agent impossible

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'NOAUTH Authentication required.'
      - Collected 0 metrics, 0 events & 1 service check
```

Configurez un `password` dans `redisdb.yaml`.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Comment surveiller les métriques de performance Redis][4]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/integrations/faq/redis-integration-error-unknown-command-config/
[4]: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics