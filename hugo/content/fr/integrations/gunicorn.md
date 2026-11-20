---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    gunicorn: assets/dashboards/gunicorn_dashboard.json
  logs:
    source: gunicorn
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    gunicorn_processes: assets/saved_views/gunicorn_processes.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
- web
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gunicorn/README.md
display_name: Gunicorn
draft: false
git_integration_title: gunicorn
guid: 5347bfe1-2e9b-4c92-9410-48b8659ce10f
integration_id: gunicorn
integration_title: Gunicorn
integration_version: 2.3.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gunicorn.
metric_to_check: gunicorn.workers
name: gunicorn
process_signatures:
- 'gunicorn: master'
public_title: Intégration Datadog/Gunicorn
short_description: Surveillez les taux et les durées de requêtes, les taux de messages
  de log et les processus de travail.
support: core
supported_os:
- linux
- mac_os
---



![Dashboard Gunicorn][1]

## Présentation

L'Agent Datadog recueille une métrique clé de Gunicorn : le nombre de processus de travail en cours d'exécution. Il envoie également un check de service, qui vérifie si Gunicorn est en cours d'exécution ou non.

Gunicorn peut fournir directement d'autres métriques via DogStatsD, y compris :

- Le taux de requêtes total
- Le taux de requêtes par code de statut (2xx, 3xx, 4xx, 5xx)
- La durée des requêtes (moyenne, médiane, maximum, 95e centile, etc.)
- Le taux de message de log par niveau de log (critical, error, warning, exception)

## Configuration

### Installation

Le check Gunicorn de l'Agent Datadog est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Gunicorn.

Le check Gunicorn nécessite l'environnement Python de votre application Gunicorn pour obtenir le package [`setproctitle`][3]. Sans celui-ci, l'Agent Datadog signale qu'il ne parvient pas à trouver de processus principal `gunicorn` (et donc, qu'il ne peut pas non plus trouver de workers). Installez le package `setproctitle` dans l'environnement Python de votre application si vous souhaitez recueillir la métrique `gunicorn.workers`.

### Configuration

Modifiez le fichier `gunicorn.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Gunicorn.
Consultez le [fichier d'exemple gunicorn.yaml][5] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

##### Associer Gunicorn à DogStatsD

1. Depuis la version 19.1, Gunicorn [propose une option][6] pour envoyer ses métriques à un daemon qui implémente le protocole StatsD, tel que [DogStatsD][7]. Comme pour de nombreuses options de Gunicorn, vous pouvez la passer à `gunicorn` via l'interface de ligne de commande (`--statsd-host`) ou la définir dans le fichier de configuration de votre application (`statsd_host`). Pour vous assurer que vous recueillez **toutes les métriques Gunicorn**, configurez votre application de façon à envoyer les métriques à [DogStatsD][7] sur `"localhost:8125"`, puis redémarrez-la.

2. Ajoutez ce bloc de configuration à votre fichier `gunicorn.d/conf.yaml` pour commencer à recueillir vos [métriques Gunicorn](#metriques) :

```yaml
init_config:

instances:
    ## @param proc_name - chaîne, obligatoire
    ## Le nom du processus gunicorn. Pour le serveur gunicorn suivant :
    ##
    ## gunicorn --name <NOM_APP_WEB> <CONFIG_APP_WEB>.ini
    ##
    ## le nom du processus est `<NOM_APP_WEB>`
  - proc_name: <NOM_DE_VOTRE_APP>
```

3. [Redémarrez l'Agent][8] pour commencer à envoyer vos métriques Gunicorn à Datadog.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Utilisez la commande suivante pour configurer le chemin du fichier de [log d'accès][9] :
    `--access-logfile <CHEMIN_DU_FICHIER>`

3. Utilisez la commande suivante pour configurer le chemin du fichier de [log d'erreurs][10] :
    `--error-logfile FILE, --log-file <CHEMIN_DU_FICHIER>`

4. Ajoutez ce bloc de configuration à votre fichier `gunicorn.d/conf.yaml` pour commencer à recueillir vos logs Gunicorn :

   ```yaml
   logs:
     - type: file
       path: /var/log/gunicorn/access.log
       service: "<MY_SERVICE>"
       source: gunicorn

     - type: file
       path: /var/log/gunicorn/error.log
       service: "<MY_SERVICE>"
       source: gunicorn
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \[\d{4}-\d{2}-\d{2}
   ```

    Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple gunicorn.yaml][5] pour découvrir toutes les options de configuration disponibles.

5. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `gunicorn` dans la section Checks.

Si le statut n'est pas défini sur `OK`, consultez la section Dépannage.

Utilisez `netstat` pour vérifier que Gunicorn envoie également ses propres métriques :

```text
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:38374         127.0.0.1:8125          ESTABLISHED 15500/gunicorn: mas
```

## Données collectées

### Métriques
{{< get-metrics-from-git "gunicorn" >}}


### Événements

Le check Gunicorn n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "gunicorn" >}}


## Dépannage

### L'Agent ne trouve pas de processus Gunicorn

```shell
  Checks
  ======

    gunicorn (5.12.1)
    -----------------
      - instance #0 [ERROR]: 'Found no master process with name: gunicorn: master [my_web_app]'
      - Collected 0 metrics, 0 events & 1 service check
      - Dependencies:
          - psutil: 4.4.1
```

Soit Gunicorn ne s'exécute pas réellement, soit le paquet `setproctitle` n'est pas installé dans l'environnement Python de votre application.

Si `setproctitle` n'est pas installé, Gunicorn apparaît dans la table des processus comme suit :

```text
$ ps -ef | grep gunicorn
ubuntu   18013 16695  2 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18018 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18019 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
```

S'il est bien installé, les processus `gunicorn` apparaissent au format attendu par l'Agent Datadog :

```text
$ ps -ef | grep gunicorn
ubuntu   18457 16695  5 20:26 pts/0    00:00:00 gunicorn: master [my_app]
ubuntu   18462 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
ubuntu   18463 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
```

## Pour aller plus loin

- [Surveiller les performances de Gunicorn avec Datadog][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/gunicorn/images/gunicorn-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://pypi.python.org/pypi/setproctitle
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[6]: https://docs.gunicorn.org/en/stable/settings.html#statsd-host
[7]: https://docs.datadoghq.com/fr/guides/dogstatsd/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.gunicorn.org/en/stable/settings.html#accesslog
[10]: https://docs.gunicorn.org/en/stable/settings.html#errorlog
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/assets/service_checks.json
[14]: https://www.datadoghq.com/blog/monitor-gunicorn-performance