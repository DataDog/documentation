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

Que vous utilisiez Redis en tant que base de données, cache ou file d'attente de messages, cette intégration vous permet de suivre les problèmes avec vos serveurs Redis et les composants de votre infrastructure qu'ils desservent. Le check Redis de l'Agent Datadog recueille de nombreuses métriques associées aux performances, à l'utilisation de la mémoire, aux clients bloqués, aux connexions esclaves, à la persistance du disque, aux clés expirées et expulsées, et bien plus encore.

## Implémentation

Vous trouverez ci-dessous les instructions pour installer et configurer le check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Redis est inclus dans le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Redis.

### Configuration

Modifiez le fichier `redisdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et vos [logs](#collecte-de-logs) Redis.
Consultez le [fichier d'exemple redis.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

Ajoutez ce bloc de configuration à votre fichier `redisdb.d/conf.yaml` pour commencer à recueillir vos [métriques Redis](#metriques) :

```
init_config:

instances:
  - host: localhost
    port: 6379 # ou tout autre port utilisé par votre serveur Redis pour l'écoute
  # unix_socket_path: /var/run/redis/redis.sock # si votre serveur Redis utilise un socket au lieu de TCP
  # password: monmotdepasseredis                   # si votre serveur Redis exige une authentification
```

Options de configuration :

* `unix_socket_path` (facultatif) : peut être utilisé à la place de `host` et `port`.
* `db`, `password` et `socket_timeout` : (facultatifs) : options de connexion supplémentaires.
* `warn_on_missing_keys` (facultatif) : affiche un avertissement sur la page d'informations si les clés qui font l'objet du suivi sont manquantes.
* `slowlog-max-len` (facultatif) : nombre maximal d'entrées à récupérer à partir du log de requêtes lentes. Par défaut, le check
        lit cette valeur à partir du fichier de configuration de Redis. Si elle est supérieure à 128, la valeur par défaut de 128 sera utilisée étant donné que la récupération de
        plus de 128 entrées du log de requêtes lentes toutes les 15 secondes entraîne un risque de latence accru. Si vous avez besoin de récupérer plus d'entrées des logs de requêtes lentes,
        définissez la valeur ici. Avertissement : cela peut avoir une incidence sur les performances de votre instance Redis
* `command_stats` (facultatif) : recueille la sortie INFO COMMANDSTATS en tant que métriques.

Consultez le [fichier d'exemple redisdb.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

[Redémarrez l'Agent][5] pour commencer à envoyer des métriques Redis à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `redisdb.d/conf.yaml` pour commencer à recueillir vos logs Redis :

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

## Développement

Consultez la [documentation principale sur les outils de développement][9] pour découvrir comment tester et développer des intégrations reposant sur l'Agent.

### Procédures de test

Ce check comprend 2 matrices de test, dont une qui fournit des détails sur le type de test :

* tests d'unité (aucune instance Redis en cours d'exécution nécessaire)
* tests d'intégration (une instance Redis doit s'exécuter en local)

L'autre matrice définit les versions de Redis à utiliser avec les tests d'intégration :

* redis 3.2
* redis 4.0

La première matrice est gérée par pytest avec l'option `mark`. Les tests qui nécessitent une instance Redis en cours d'exécution doivent être décorés comme suit :

```python
@pytest.mark.integration
def tester_élément_nécessitant_exécution_redis():
  pass
```

L'exécution des tests avec `pytest -m"integration"` entraînera l'exécution des tests d'intégration *uniquement*, tandis que `pytest -m"not integration"` entraînera l'exécution de tout élément non marqué en tant que test d'intégration.

La deuxième matrice est définie avec `tox` comme suit :

```ini
envlist = unit, redis{32,40}, flake8

...

[testenv:redis32]
setenv = REDIS_VERSION=3.2
...

[testenv:redis40]
setenv = REDIS_VERSION=4.0
...
```

#### Tests d'intégration

Les instances Redis sont orchestrées avec `docker-compose`, qui constitue maintenant une dépendance
pour l'exécution des tests d'intégration. `pytest` est utilisé pour démarrer/arrêter/supprimer une
instance au moyen du concept `fixture`.

Voici à quoi ressemble une orchestration d'instances Redis avec fixture :

```python
@pytest.fixture(scope="session")
def redis_auth():
    # configuration d'appel de docker-compose omise ici…
    subprocess.check_call(args + ["up", "-d"], env=env)
    yield
    subprocess.check_call(args + ["down"], env=env)
```

Le concept de base est le suivant : `docker-compose up` est exécuté directement après la mise à disposition de fixture
dans la fonction de test (celle-ci se bloque au niveau de la commande `yield`). Une fois que le test
est terminé, la commande `yield` est bloquée et la commande `docker-compose down` est appelée. Notez
l'argument `scope=session` transmis au décorateur fixture : il permet à la
commande `yield` de n'être bloquée qu'une seule fois pour **tous les tests** et d'être débloquée seulement après le
dernier test, ce qui est utile afin d'éviter que les commandes `docker-compose up` et `down`
soient appelées à chaque test. Mise en garde concernant cette approche : si vous avez des données
dans Redis, certains tests peuvent s'exécuter sur une base de données corrompue. Cela ne pose pas de problème
dans ce cas, mais il est important de ne pas l'oublier lorsque vous utilisez `scope=session`.

#### Exécution des tests en local

**Remarque** : `docker` et `docker-compose` doivent être installés sur votre système
pour exécuter des tests en local.

Lors du développement, les tests peuvent être exécutés en local avec tox, de la même façon que dans le CI. Dans le cas de Redis, il n'est pas forcément nécessaire de tester l'ensemble de la matrice tout le temps. Ainsi, si vous souhaitez par exemple exécuter uniquement les tests d'unité ou de simulation :

```shell
tox -e unit
```

Si vous souhaitez exécuter les tests d'intégration, mais en vous basant sur une seule version de Redis :

```shell
tox -e redis40
```

L'outil tox est particulièrement utile car il créé un environnement Python virtuel pour chaque environnement tox. Si toutefois vous n'avez pas besoin de ce niveau d'isolation, vous pouvez accélérer les itérations de développement en utilisant `pytest` directement (comme le fait tox en réalité) :

```shell
REDIS_VERSION=4.0 pytest
```

Si vous ne souhaitez pas exécuter des tests d'intégration :

```shell
pytest -m"not integration"
```

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


{{< get-dependencies >}}