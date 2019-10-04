---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/gunicorn/README.md'
display_name: Gunicorn
git_integration_title: gunicorn
guid: 5347bfe1-2e9b-4c92-9410-48b8659ce10f
integration_id: gunicorn
integration_title: Gunicorn
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gunicorn.
metric_to_check: gunicorn.workers
name: gunicorn
process_signatures:
  - 'gunicorn: master'
public_title: Intégration Datadog/Gunicorn
short_description: 'Surveillez les taux et les durées de requêtes, les taux de messages de log et les processus de travail. processes.'
support: core
supported_os:
  - linux
  - mac_os
---
![Dashboard Gunicorn][1]

## Présentation

L'Agent Datadog recueille une métrique clé de Gunicorn : le nombre de processus de travail en cours d'exécution. Il envoie également un check de service, qui vérifie si Gunicorn est en cours d'exécution ou non.

Gunicorn peut fournir directement d'autres métriques via DogStatsD, y compris concernant :

* Le taux de requêtes total
* Le taux de requêtes par code de statut (2xx, 3xx, 4xx, 5xx)
* La durée des requêtes (moyenne, médiane, maximum, 95e centile, etc.)
* Le taux de message de log par niveau de log (critical, error, warning, exception)

## Implémentation

### Installation

Le check Gunicorn de l'Agent Datadog est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Gunicorn.

Le check Gunicorn nécessite l'environnement Python de votre application Gunicorn pour obtenir le package [`setproctitle`][3]. Sans celui-ci, l'Agent Datadog signalera toujours qu'il ne parvient pas à trouver de processus principal `gunicorn` (et donc, qu'il ne peut pas non plus trouver de workers). Installez le package `setproctitle` dans l'environnement Python de votre application si vous souhaitez recueillir la métrique `gunicorn.workers`.

### Configuration

Modifiez le fichier `gunicorn.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Gunicorn.
Consultez le [fichier d'exemple gunicorn.yaml][5] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

* Ajoutez ce bloc de configuration à votre fichier `gunicorn.d/conf.yaml` pour commencer à recueillir vos [métriques Gunicorn](#metriques) :

    ```yaml
    init_config:

    instances:
        # as set
        # 1) in your app's config.py (proc_name = <YOUR_APP_NAME>), OR
        # 2) via CLI (gunicorn --name <YOUR_APP_NAME> your:app)
        - proc_name: <YOUR_APP_NAME>
    ```

* [Redémarrez l'Agent][2] pour commencer à envoyer vos métriques Gunicorn à Datadog.

#### Associer Gunicorn à DogStatsD

Depuis la version 19.1, Gunicorn [dispose d'une option][6] pour envoyer ses métriques à un démon qui implémente le protocole StatsD, comme [DogStatsD][7]. Comme pour de nombreuses options de Gunicorn, vous pouvez transmettre cela à `gunicorn` sur l'interface de ligne de commande (`--statsd-host`) ou le définir dans le fichier de configuration de votre application (`statsd_host`). Configurez votre application de façon à envoyer des métriques à DogStatsD sur `"localhost:8125"`, puis redémarrez-la.

**Remarque** : si vous utilisez cette option, **n'ajoutez pas** le bloc de configuration pour la collecte de métriques à `gunicorn.d/conf.yaml`. Ainsi, si vous associez Gunicorn à DogStatsD, ignorez les instructions de la section [Collecte de métriques](#collecte-de-metriques) de cette page.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

* La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

  ```
  logs_enabled: true
  ```

* Utilisez la commande suivante pour configurer le chemin du fichier de log d'accès comme expliqué dans la [documentation Gunicorn][8] (en anglais) : `--access-logfile <CHEMIN_DU_FICHIER>`
* Utilisez la commande suivante pour configurer le chemin du fichier de log d'erreurs comme expliqué dans la [documentation Gunicorn][9] (en anglais) : `--error-logfile FILE, --log-file <CHEMIN_DU_FICHIER>`

*  Ajoutez ce bloc de configuration à votre fichier `gunicorn.d/conf.yaml` pour commencer à recueillir vos logs Gunicorn :

  ```
  logs:
    - type: file
      path: /var/log/gunicorn/access.log
      service: <MY_SERVICE>
      source: gunicorn
      sourcecategory: http_web_access

    - type: file
      path: /var/log/gunicorn/error.log
      service: <MY_SERVICE>
      source: gunicorn
      sourcecategory: sourcecode
      log_processing_rules:
        - type: multi_line
          name: log_start_with_date
          pattern: \[\d{4}-\d{2}-\d{2}
  ```

  Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
  Consultez le [fichier d'exemple gunicorn.yaml][5] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][2].

### Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `gunicorn` dans la section Checks.

Si le statut n'est pas défini sur `OK`, consultez la section Dépannage.

Utilisez `netstat` pour vérifier que Gunicorn envoie également ses propres métriques :__

```
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:38374         127.0.0.1:8125          ESTABLISHED 15500/gunicorn: mas
```

## Données collectées

### Métriques
{{< get-metrics-from-git "gunicorn" >}}


### Événements
Le check Gunicorn n'inclut aucun événement.

### Checks de service

`gunicorn.is_running` :

Renvoie `CRITICAL` si l'Agent n'est pas capable de trouver un processus principal Gunicorn ou s'il ne trouve aucun processus de travail, actif ou non.


## Dépannage

### L'Agent ne trouve pas de processus Gunicorn
```
  Checks
  ======

    gunicorn (5.12.1)
    -----------------
      - instance #0 [ERROR]: 'Found no master process with name: gunicorn: master [mon_application_web]'
      - Collected 0 metrics, 0 events & 1 service check
      - Dependencies:
          - psutil: 4.4.1
```

Soit Gunicorn ne s'exécute pas réellement, soit le package `setproctitle` n'est pas installé dans l'environnement Python de votre application.

Si `setproctitle` n'est pas installé, Gunicorn apparaît dans la table des processus comme suit :

```
$ ps -ef | grep gunicorn
ubuntu   18013 16695  2 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18018 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18019 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
```

S'il est bien installé, les processus `gunicorn` apparaissent au format attendu par l'Agent Datadog :__

```
$ ps -ef | grep gunicorn
ubuntu   18457 16695  5 20:26 pts/0    00:00:00 gunicorn: master [mon_application]
ubuntu   18462 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [mon_application]
ubuntu   18463 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [mon_application]
```

## Pour aller plus loin
Pour mieux comprendre comment (ou pourquoi) intégrer vos applications Gunicorn à Datadog, consultez cet [article de notre blog][12].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/gunicorn/images/gunicorn-dash.png
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[3]: https://pypi.python.org/pypi/setproctitle
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[6]: https://docs.gunicorn.org/en/stable/settings.html#statsd-host
[7]: https://docs.datadoghq.com/fr/guides/dogstatsd
[8]: https://docs.gunicorn.org/en/stable/settings.html#accesslog
[9]: https://docs.gunicorn.org/en/stable/settings.html#errorlog
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/metadata.csv
[12]: https://www.datadoghq.com/blog/monitor-gunicorn-performance


{{< get-dependencies >}}