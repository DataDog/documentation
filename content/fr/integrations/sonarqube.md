---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: sonarqube
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    status_overview: assets/saved_views/status_overview.json
  service_checks: assets/service_checks.json
categories:
  - security
  - issue tracking
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sonarqube/README.md'
display_name: SonarQube
draft: false
git_integration_title: sonarqube
guid: ce089575-93bf-47f0-80b6-ffaf6e34722c
integration_id: sonarqube
integration_title: SonarQube
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sonarqube.
metric_to_check: sonarqube.server.database.pool_active_connections
name: sonarqube
public_title: SonarQube
short_description: Surveillez votre serveur et vos projets SonarQube.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [SonarQube][1].

## Configuration

### Installation

Le check SonarQube est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `sonarqube.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données SonarQube.
   Consultez le [fichier d'exemple sonarqube.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance JMX. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][2] afin d'obtenir des instructions détaillées.
   Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][3].

2. [Redémarrez l'Agent][4].

##### Collecte de logs

1. Activez la [journalisation][5] SonarQube.

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

3. Ajoutez le bloc de configuration suivant à votre fichier `sonarqube.d/conf.yaml`. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple sonarqube.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   logs:
     - type: file
       path: /opt/sonarqube/logs/access.log
       source: sonarqube
     - type: file
       path: /opt/sonarqube/logs/ce.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/es.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/sonar.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/web.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [Redémarrez l'Agent][4].

[1]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/integrations/java/
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.sonarqube.org/latest/instance-administration/system-info/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][1].

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][2].

| Paramètre      | Valeur                                              |
| -------------- | -------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "sonarqube"}` |

[1]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/fr/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `sonarqube` dans la section **JMXFetch** :

```text
========
JMXFetch
========
  Initialized checks
  ==================
    sonarqube
      instance_name : sonarqube-localhost-10443
      message : <no value>
      metric_count : 38
      service_check_count : 0
      status : OK
```

Si vous avez défini une instance sans `is_jmx: true`, cherchez également `sonarqube` dans la section **Collector** :

```text
=========
Collector
=========
  Running Checks
  ==============
    sonarqube (1.0.0)
    -----------------
      Instance ID: sonarqube:f872f6fd88ce0d82 [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/sonarqube.d/sonarqube.yaml
      Total Runs: 2,925
      Metric Samples: Last Run: 39, Total: 114,075
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 2,925
      Average Execution Time : 29ms
      Last Execution Date : 2020-10-29 13:25:37.000000 UTC
      Last Successful Execution Date : 2020-10-29 13:25:37.000000 UTC
      metadata:
        version.build: 37579
        version.major: 8
        version.minor: 5
        version.patch: 0
        version.raw: 8.5.0.37579
        version.scheme: semver
```

## Données collectées

### Métriques
{{< get-metrics-from-git "sonarqube" >}}


### Checks de service

**sonarqube.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'endpoint JMX de l'instance SonarQube qu'il surveille et à y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

**sonarqube.api_access** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter au endpoint Web de l'instance SonarQube qu'il surveille et à y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

SonarQube n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].


[1]: https://www.sonarqube.org
[2]: https://docs.datadoghq.com/fr/agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/