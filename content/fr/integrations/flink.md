---
assets:
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - data streams
  - dataflow
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/flink/README.md'
display_name: flink
git_integration_title: flink
guid: 8b3e5591-533e-4504-aabb-e697f07461ca
integration_id: flink
integration_title: Flink
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: flink.
metric_to_check: flink.taskmanager.Status.JVM.CPU.load
name: flink
public_title: Intégration Datadog/Flink
short_description: Surveillez des métriques associées à vos tâches Flink.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Flink][1]. Datadog recueille des métriques Flink via le [HTTP Reporter Datadog][4] de Flink, qui repose sur l'[API HTTP de Datadog][2].

## Configuration

### Installation

Le check Flink est inclus avec le paquet de l'[Agent Datadog][3].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Collecte de métriques

1. Configurez le [HTTP Reporter Datadog][4] dans Flink.

     Copiez `<RÉPERTOIRE_FLINK>/opt/flink-metrics-datadog-1.9.2.jar` dans votre dossier `<RÉPERTOIRE_FLINK>/lib`. Ajoutez les lignes suivantes dans votre fichier `<RÉPERTOIRE_FLINK>/conf/flink-conf.yaml`, en remplaçant `<DATADOG_API_KEY>` par votre [clé d'API][10] Datadog :

    ```yaml
    metrics.reporter.dghttp.class: org.apache.flink.metrics.datadog.DatadogHttpReporter
    metrics.reporter.dghttp.apikey: <DATADOG_API_KEY>
    ```

2. Remappez les contextes système dans votre fichier `<RÉPERTOIRE_FLINK>/conf/flink-conf.yaml`.

    ```yaml
    metrics.scope.jm: flink.jobmanager
    metrics.scope.jm.job: flink.jobmanager.job
    metrics.scope.tm: flink.taskmanager
    metrics.scope.tm.job: flink.taskmanager.job
    metrics.scope.task: flink.task
    metrics.scope.operator: flink.operator
    ```

     **Remarque** : vous devez remapper les contextes système pour envoyer des métriques Flink. Sans cela, les données sont envoyées sous la forme de métriques custom.

3. Configurez des [tags][4] supplémentaires dans le fichier `<RÉPERTOIRE_FLINK>/conf/flink-conf.yaml`. L'exemple ci-dessous définit des tags personnalisés :

    ```yaml
    metrics.reporter.dghttp.tags: <KEY1>:<VALUE1>, <KEY1>:<VALUE2>
    ```

     **Remarque** : par défaut, toutes les variables des noms de métriques sont envoyées sous la forme de tags. Vous n'avez donc pas besoin d'ajouter de tags personnalisés pour `job_id`, `task_id`, etc.

4. Redémarrez Flink pour commencer à envoyer vos métriques Flink à l'Agent.

#### Collecte de logs

_Disponible à partir de la version > 6.0 de l'Agent_

1. Flink utilise le logger `log4j` par défaut. Pour activer la journalisation dans un fichier et personnaliser le format, modifiez le fichier `log4j.properties`, `log4j-cli.properties`, `log4j-yarn-session.properties` ou `log4j-console.properties` file. Consultez la [documentation de Flink][13] (en anglais) pour obtenir les configurations par défaut. Voici la configuration par défaut de `log4j.properties` :

   ```conf
   log4j.appender.file=org.apache.log4j.FileAppender
   log4j.appender.file.file=${log.file}
   log4j.appender.file.append=false
   log4j.appender.file.layout=org.apache.log4j.PatternLayout
   log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

2. Par défaut, notre pipeline d'intégration prend en charge l'expression de conversion suivante :

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

     `2020-02-03 18:43:12,251` est un exemple d'horodatage valide.

     Dupliquez et modifiez le [pipeline d'intégration][11] si vous utilisez un autre format.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

4. Supprimez la mise en commentaire du bloc de configuration des logs du fichier `flink.d/conf.yaml` et modifiez les paramètres. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple flink.d/conf.yaml][12] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/flink/server.log
       source: flink
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```

5. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `flink` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "flink" >}}


### Checks de service

Flink n'inclut aucun check de service.

### Événements

Flink n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://flink.apache.org/
[2]: https://docs.datadoghq.com/fr/api/?lang=bash#api-reference
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://ci.apache.org/projects/flink/flink-docs-release-1.9/monitoring/metrics.html#datadog-orgapacheflinkmetricsdatadogdatadoghttpreporter
[5]: https://ci.apache.org/projects/flink/flink-docs-stable/monitoring/metrics.html#system-scope
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/flink/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
[12]: https://github.com/DataDog/integrations-core/blob/master/flink/datadog_checks/flink/data/conf.yaml.example
[13]: https://github.com/apache/flink/tree/master/flink-dist/src/main/flink-bin/conf