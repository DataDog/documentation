---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Hudi Overview: assets/dashboards/overview.json
  logs:
    source: hudi
  metrics_metadata: metadata.csv
  monitors:
    commit_duration: assets/monitors/commit_duration.json
  saved_views:
    hudi_error_logs: assets/saved_views/error_logs.json
    hudi_overview: assets/saved_views/hudi_overview.json
    hudi_patterns: assets/saved_views/hudi_patterns.json
  service_checks: assets/service_checks.json
categories:
- log collection
- processing
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hudi/README.md
display_name: Hudi
draft: false
git_integration_title: hudi
guid: abfa7624-ac5d-4601-b96c-03a2243ff7c7
integration_id: hudi
integration_title: Hudi
integration_version: 2.1.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hudi.
metric_to_check: hudi.action.duration
name: hudi
public_title: Hudi
short_description: Surveillez des métriques en lien avec votre configuration Hudi.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Hudi][1]. Il est compatible avec les [versions][2] `0.10.0` et ultérieures d'Hudi.

## Configuration

### Installation

Le check Hudi est inclus avec le package de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Procédure à suivre

1. [Configurez][4] l'[outil de transmission de métriques JMX][5] dans Hudi :

    ```
    hoodie.metrics.on=true
    hoodie.metrics.reporter.type=JMX
    hoodie.metrics.jmx.host=<JMX_HOST>
    hoodie.metrics.jmx.port=<JMX_PORT>
    ```


2. Modifiez le fichier `hudi.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Hudi.
   Consultez le [fichier d'exemple hudi.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Exécutez la [commande status][7] de l'Agent Datadog pour vérifier le nombre de métriques actuellement renvoyées.
   Choisissez les métriques qui vous intéressent en modifiant la [configuration][6].
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][8] afin d'obtenir des instructions détaillées.
   Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][9].

3. [Redémarrez l'Agent][10].


### Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `hudi` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hudi" >}}



### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. Hudi utilise le logger `log4j` par défaut. Pour personnaliser le format des logs, modifiez le fichier `log4j.properties` dans votre répertoire `conf` [Flink][13] ou [Spark][14]. Voici un exemple de fichier `log4j.properties` :

   ```conf
    log4j.rootCategory=INFO, file
    log4j.appender.file=org.apache.log4j.FileAppender
    log4j.appender.file.File=/var/log/hudi.log
    log4j.appender.file.append=false
    log4j.appender.file.layout=org.apache.log4j.PatternLayout
    log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

2. Par défaut, le pipeline d'intégration de Datadog prend en charge l'expression de conversion suivante :

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

     `2020-02-03 18:43:12,251` est un exemple d'horodatage valide.

     Dupliquez et modifiez le [pipeline d'intégration][15] si vous utilisez un autre format.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

4. Supprimez la mise en commentaire du bloc de configuration des logs du fichier `hudi.d/conf.yaml` et modifiez les paramètres. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple hudi.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/hudi.log
       source: hudi
       log_processing_rules:
         - type: multi_line
           pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           name: new_log_start_with_date
   ```
### Événements

L'intégration Hudi n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "hudi" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://hudi.apache.org/
[2]: https://github.com/apache/hudi/releases
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://hudi.apache.org/docs/configurations#Metrics-Configurations
[5]: https://hudi.apache.org/docs/metrics/#jmxmetricsreporter
[6]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[7]: https://github.com/DataDog/integrations-core/blob/master/hudi/assets/service_checks.json
[8]: https://docs.datadoghq.com/fr/integrations/java/
[9]: https://docs.datadoghq.com/fr/help/
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/hudi/metadata.csv
[13]: https://github.com/apache/flink/tree/release-1.11.4/flink-dist/src/main/flink-bin/conf
[14]: https://github.com/apache/spark/tree/v3.1.2/conf
[15]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines