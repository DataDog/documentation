---
title: Page de statut de l'Agent v6
kind: guide
further_reading:
  - link: /agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent
  - link: /agent/guide/agent-configuration-files/
    tag: Guide
    text: Fichiers de configuration de l'Agent
  - link: /agent/guide/agent-commands/
    tag: Guide
    text: Commandes de l'Agent
---
La page de statut de l'Agent v6 affiche des informations sur votre Agent en cours d'exécution. Consultez les [commandes de l'Agent][1] pour obtenir la commande de statut pour votre environnement. Les sections ci-dessous fournissent des détails sur le contenu de la page de statut.

**Remarque** : la page de statut peut varier en fonction de la version de l'Agent.

## Version de l'Agent

Les informations générales sur l'Agent s'affichent sous la version de l'Agent, par exemple :
```text
  Status date: 2019-08-29 18:16:41.526203 UTC
  Agent start: 2019-08-29 18:04:18.060507 UTC
  Pid: 12141
  Go Version: go1.11.5
  Python Version: 2.7.16
  Check Runners: 4
  Log Level: info
```

### Paths

Cette section affiche les chemins vers le fichier de configuration Datadog, le répertoire `conf.d` et le répertoire `checks.d`, par exemple :
```text
    Config File: /etc/datadog-agent/datadog.yaml
    conf.d: /etc/datadog-agent/conf.d
    checks.d: /etc/datadog-agent/checks.d
```

### Clocks

Cette section affiche le [décalage avec NTP][2] et l'heure au format UTC du système, par exemple :
```text
    NTP offset: 2.095ms
    System UTC time: 2019-08-29 18:16:41.526203 UTC
```

### Host info

Cette section affiche les informations du host sur lequel l'Agent s'exécute, par exemple :
```text
    bootTime: 2019-08-29 18:01:27.000000 UTC
    kernelVersion: 4.4.0-109-generic
    os: linux
    platform: ubuntu
    platformFamily: debian
    platformVersion: 16.04
    procs: 175
    uptime: 2m53s
    virtualizationRole: guest
    virtualizationSystem: vbox
```

### Hostnames

Cette section affiche les hostnames découverts par l'Agent (voir l'exemple ci-dessous). Le `hostname` est le hostname final signalé au backend. Pour en savoir plus, consultez [Comment Datadog détermine-t-il le hostname de l'Agent ?][3].

```text
    hostname: ubuntu-xenial
    socket-fqdn: ubuntu-xenial
    socket-hostname: ubuntu-xenial
    hostname provider: os
    unused hostname providers:
      aws: not retrieving hostname from AWS: the host is not an ECS instance, and other providers already retrieve non-default hostnames
      configuration/environment: hostname is empty
      gce: unable to retrieve hostname from GCE: Get http://169.254.169.254/computeMetadata/v1/instance/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

## Collector

### Running checks

Cette section affiche une liste des instances de check en cours d'exécution, par exemple :

```text
    load
    ----
      Instance ID: load [OK]
      Total Runs: 4
      Metric Samples: Last Run: 6, Total: 24
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 0, Total: 0
      Average Execution Time : 6ms
```

Termes et descriptions :

| Terme                   | Description                                                      |
|------------------------|------------------------------------------------------------------|
| Instance ID            | L'ID de l'instance et le statut du check.                     |
| Total Runs             | Le nombre total d'exécutions de l'instance.                  |
| Metric Samples         | Le nombre de métriques récupérées.                                   |
| Événements                 | Le nombre d'événements déclenchés.                                  |
| Checks de service         | Le nombre de checks de service signalés.                           |
| Average Execution Time | La durée d'exécution moyenne de l'instance.                      |
| Last Run               | Le nombre durant la dernière exécution du check.                            |
| Total                  | Le nombre total depuis le démarrage ou redémarrage de l'Agent le plus récent. |

### Config errors

Cette section s'affiche uniquement en cas de checks avec des erreurs de configuration, par exemple :

```text
    test
    ----
      Configuration file contains no valid instances
```

### Loading errors

Cette section s'affiche uniquement en cas de checks avec des erreurs de chargement, par exemple :

```text
    test
    ----
      Core Check Loader:
        Check test not found in Catalog

      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so

      Python Check Loader:
        unable to import module 'test': No module named test
```

## JMXFetch

Cette section affiche une liste des checks JMX initialisés et échoués, même sans aucun check, par exemple :

```text
  Initialized checks
  ==================
    no checks

  Failed checks
  =============
    no checks
```

## Forwarder

Le Forwarder utilise un certain nombre de workers pour envoyer des charges utiles à Datadog.

Si l'avertissement `the forwarder dropped transactions, there is probably an issue with your network` s'affiche, cela signifie que tous les workers sont occupés. Revoyez les performances de votre réseau et réglez les options `forwarder_num_workers` et `forwarder_timeout`.

### Transactions

Cette section affiche les transactions effectuées par le Forwarder, par exemple :

```text
    CheckRunsV1: 2
    Dropped: 0
    DroppedOnInput: 0
    Events: 0
    HostMetadata: 0
    IntakeV1: 2
    Metadata: 0
    Requeued: 0
    Retried: 0
    RetryQueueSize: 0
    Series: 0
    ServiceChecks: 0
    SketchSeries: 0
    Success: 6
    TimeseriesV1: 2
    Errors: 1
```

Termes et descriptions :

| Terme           | Description                                                                  |
|----------------|------------------------------------------------------------------------------|
| Success        | Le nombre de transactions envoyées réussies.                                |
| Errors         | Le nombre de fois qu'un envoi de transaction a échoué et a été retenté.         |
| RetryQueueSize | Le nombre de transactions actuellement en attente de renvoi.                    |
| Retried        | Le nombre de fois qu'une transaction a été retentée.                               |
| DroppedOnInput | Le nombre de transactions abandonnées lorsque tous les workers étaient occupés.  |
| Dropped        | Le nombre de transactions abandonnées après un nombre de tentatives trop élevé. |

### API keys status

Cette section affiche le statut de votre clé d'API configurée, par exemple :

```text
    API key ending with ab123: API Key valid
```

## Endpoints

Cette section affiche la liste des endpoints utilisés par l'Agent Datadog, par exemple :

```text
  https://app.datadoghq.com - API Key ending with:
      - ab123
```

## Agent de logs

Si l'Agent de logs est activé, cette section affiche les informations sur les logs traités et envoyés, par exemple :

```text
    LogsProcessed: 10
    LogsSent: 10
```

## Aggregator

Cette section affiche des informations sur l'aggregator de l'Agent, par exemple :

```text
  Checks Metric Sample: 399
  Dogstatsd Metric Sample: 123
  Event: 1
  Events Flushed: 1
  Number Of Flushes: 2
  Series Flushed: 273
  Service Check: 20
  Service Checks Flushed: 20
  Sketches Flushed: 8
  Checks Histogram Bucket Metric Sample: 24
```

Termes et descriptions :

| Terme                                         | Description                                                                                           |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Checks Metric Sample                         | Le nombre total de métriques envoyées des checks vers l'aggregator.                                   |
| Dogstatsd Metric Sample                      | Le nombre total de métriques envoyées du serveur DogStatsD vers l'aggregator.                         |
| Event                                        | Le nombre total d'événements envoyés vers l'aggregator.                                                    |
| Service Check                                | Le nombre total de checks de service envoyés vers l'aggregator.                                            |
| Flush                                        | Le nombre de fois que des métriques agrégées ont été transmises au Forwarder pour les envoyer à Datadog.              |
| Sketches Flushed                             | Le nombre de fois que des métriques de distribution agrégées ont été transmises au Forwarder pour les envoyer à Datadog. |
| Checks Histogram Bucket Metric Sample        | Le nombre de métriques histogram bucket envoyées depuis les checks à l'Aggregator.                        |

## DogStatsD

Cette section affiche le nombre de paquets reçus par le serveur DogStatsD pour chaque type de données et erreur associée, par exemple :

```text
  Event Packets: 0
  Event Parse Errors: 0
  Metric Packets: 122
  Metric Parse Errors: 0
  Service Check Packets: 0
  Service Check Parse Errors: 0
  Udp Bytes: 7,672
  Udp Packet Reading Errors: 0
  Udp Packets: 123
  Uds Bytes: 0
  Uds Origin Detection Errors: 0
  Uds Packet Reading Errors: 0
  Uds Packets: 0
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/agent-commands/#agent-information
[2]: /fr/agent/troubleshooting/ntp/
[3]: /fr/agent/faq/how-datadog-agent-determines-the-hostname/