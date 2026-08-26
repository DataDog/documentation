---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    tomcat: assets/dashboards/metrics.json
    tomcat--overview: assets/dashboards/overview.json
  logs:
    source: tomcat
  metrics_metadata: metadata.csv
  monitors:
    '[Tomcat] % of busy threads is high for host: {{host.name}}': assets/monitors/thread_busy.json
    '[Tomcat] % of thread count managed by the thread pool is high for host: {{host.name}}': assets/monitors/thread_count_max.json
    '[Tomcat] Anomalous average processing time for host {{host.name}}': assets/monitors/processing_time.json
    '[Tomcat] Anomalous max processing time for host {{host.name}}': assets/monitors/max_proc_time.json
    '[Tomcat] Anomalous request rate for host {{host.name}}': assets/monitors/req_count.json
    '[Tomcat] Increase of the errors/second rate for host: {{host.name}}': assets/monitors/error_count.json
  saved_views:
    tomcat_processes: assets/saved_views/tomcat_processes.json
  service_checks: assets/service_checks.json
categories:
- web
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tomcat/README.md
display_name: Tomcat
draft: false
git_integration_title: tomcat
guid: 60f37d34-3bb7-43c9-9b52-2659b8898997
integration_id: tomcat
integration_title: Tomcat
integration_version: 1.11.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tomcat.
metric_to_check: tomcat.threads.count
name: tomcat
process_signatures:
- java tomcat
public_title: Intégration Datadog/Tomcat
short_description: Surveillez le nombre de requêtes par seconde, les octets traités,
  les hits de cache, les métriques de servlet et plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Dashboard Tomcat][1]

## Présentation

Ce check recueille des métriques Tomcat comme :

- Les métriques relatives aux activités générales (nombre d'erreurs, nombre de requêtes, temps de traitement, etc.)
- Les métriques de pool de threads (nombre de threads, nombre de threads occupés, etc.)
- Les temps de traitement des servlets

## Configuration

### Installation

Le check Tomcat est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Tomcat.

Ce check étant basé sur JMX, vous devez activer les connexions JMX à distance sur vos serveurs Tomcat. Suivez les instructions de la section [Surveillance et gestion de Tomcat][3] (en anglais).

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `tomcat.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour recueillir vos métriques et [logs](#collecte-de-logs) Tomcat. Consultez le [fichier d'exemple tomcat.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

Consultez la [documentation relative au check JMX][4] pour découvrir la liste des options de configuration disponibles pour l'ensemble des checks basés sur JMX.

#### Liste des métriques

Le paramètre `conf` correspond à la liste des métriques devant être recueillies par l'intégration. Seules deux clés sont autorisées :

- `include` (**requis**) : dictionnaire de filtres. Tout attribut qui correspond à ces filtres est recueilli, sauf s'il correspond également aux filtres `exclude` (voir ci-dessous).
- `exclude` (**facultatif**) : dictionnaire de filtres. Les attributs qui correspondent à ces filtres ne sont pas recueillis.

Pour chaque bean, les métriques sont taguées de la manière suivante :

```text
mydomain:attr0=val0,attr1=val1
```

Dans cet exemple, votre métrique est `mondomaine` (ou un nom similaire, en fonction de l'attribut au sein du bean). Elle est associée aux tags `attr0:val0`, `attr1:val1` et `domain:mondomaine`.

Si vous spécifiez un alias dans une clé `include` au format _camel case_, il est converti au format _snake case_. Par exemple, `MonNomMétrique` devient `mon_nom_métrique` dans Datadog.

##### Le filtre attribute

Le filtre `attribute` accepte deux types de valeurs :

- Un dictionnaire dont les clés correspondent à des noms d'attributs (voir ci-dessous). Vous pouvez alors spécifier un alias pour la métrique, qui correspondra au nom de la métrique dans Datadog. Vous pouvez également indiquer le type de métrique, à savoir « gauge » ou « counter ». Si vous choisissez counter, un taux par seconde est calculé pour cette métrique.

  ```yaml
  conf:
    - include:
      attribute:
        maxThreads:
          alias: tomcat.threads.max
          metric_type: gauge
        currentThreadCount:
          alias: tomcat.threads.count
          metric_type: gauge
        bytesReceived:
          alias: tomcat.bytes_rcvd
          metric_type: counter
  ```

- Une liste de noms d'attributs (voir ci-dessous). La métrique est alors de type gauge, et son nom correspond à `jmx.\[NOM_DOMAINE].\[NOM_ATTRIBUT]`.

  ```yaml
  conf:
    - include:
      domain: org.apache.cassandra.db
      attribute:
        - BloomFilterDiskSpaceUsed
        - BloomFilterFalsePositives
        - BloomFilterFalseRatio
        - Capacity
        - CompressionRatio
        - CompletedTasks
        - ExceptionCount
        - Hits
        - RecentHitRate
  ```

#### Anciennes versions

La liste de filtres est uniquement prise en charge pour les versions > 5.3.0 de l'Agent Datadog. Si vous utilisez une version antérieure, utilisez plutôt des singletons et plusieurs déclarations `include`.

```yaml
# Agent Datadog > 5.3.0
  conf:
    - include:
      domain: nom_domaine
      bean:
        - premier_nom_domaine
        - deuxieme_nom_domaine
# Anciennes versions de l'Agent Datadog
  conf:
    - include:
      domain: nom_domaine
      bean: premier_nom_bean
    - include:
      domain: nom_domaine
      bean: deuxieme_nom_bean
```

#### Collecte de logs


1. Tomcat utilise le logger `log4j` pour envoyer les logs à Datadog. Avec les versions < 8.0 de Tomcat, `log4j` est configuré par défaut. À partir de la version 8.0, vous devez configurer Tomcat afin d'utiliser `log4j`. Pour ce faire, suivez les instructions de la rubrique [Utilisation de Log4j][5] (en anglais). À la première étape de ces instructions, modifiez le fichier `log4j.properties` dans le répertoire `$CATALINA_BASE/lib` comme suit :

   ```conf
     log4j.rootLogger = INFO, CATALINA

     # Define all the appenders
     log4j.appender.CATALINA = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.CATALINA.File = /var/log/tomcat/catalina.log
     log4j.appender.CATALINA.Append = true

     # Roll-over the log once per day
     log4j.appender.CATALINA.layout = org.apache.log4j.PatternLayout
     log4j.appender.CATALINA.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.LOCALHOST = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.LOCALHOST.File = /var/log/tomcat/localhost.log
     log4j.appender.LOCALHOST.Append = true
     log4j.appender.LOCALHOST.layout = org.apache.log4j.PatternLayout
     log4j.appender.LOCALHOST.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.MANAGER = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.MANAGER.File = /var/log/tomcat/manager.log
     log4j.appender.MANAGER.Append = true
     log4j.appender.MANAGER.layout = org.apache.log4j.PatternLayout
     log4j.appender.MANAGER.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.HOST-MANAGER = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.HOST-MANAGER.File = /var/log/tomcat/host-manager.log
     log4j.appender.HOST-MANAGER.Append = true
     log4j.appender.HOST-MANAGER.layout = org.apache.log4j.PatternLayout
     log4j.appender.HOST-MANAGER.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.CONSOLE = org.apache.log4j.ConsoleAppender
     log4j.appender.CONSOLE.layout = org.apache.log4j.PatternLayout
     log4j.appender.CONSOLE.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     # Configure which loggers log to which appenders
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost] = INFO, LOCALHOST
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/manager] =\
       INFO, MANAGER
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/host-manager] =\
       INFO, HOST-MANAGER
   ```
   Ensuite, suivez le reste des instructions spécifiées dans la [documentation Tomcat][5] pour configurer `log4j`.

2. Par défaut, le pipeline d'intégration de Datadog prend en charge les expressions de conversion suivantes :

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
   ```

    Dupliquez et modifiez le [pipeline d'intégration][6] si vous utilisez un autre format. Consultez la section [Journalisation dans Tomcat][7] (en anglais) pour obtenir plus d'informations sur les fonctionnalités de journalisation de Tomcat.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

4. Ajoutez ce bloc de configuration à votre fichier `tomcat.d/conf.yaml` pour commencer à recueillir vos logs Tomcat :

   ```yaml
   logs:
     - type: file
       path: /var/log/tomcat/*.log
       source: tomcat
       service: "<SERVICE>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple tomcat.yaml][2] pour découvrir toutes les options de configuration disponibles.

5. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/integrations/java/
[5]: https://tomcat.apache.org/tomcat-8.0-doc/logging.html#Using_Log4j
[6]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
[7]: https://tomcat.apache.org/tomcat-7.0-doc/logging.html
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][1].

[1]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `tomcat` dans la section **Checks**.

## Données collectées

### Métriques
{{< get-metrics-from-git "tomcat" >}}


### Événements

Le check Tomcat n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "tomcat" >}}


## Dépannage

### Métriques `tomcat.*` manquantes
L'intégration recueille des métriques Tomcat par défaut depuis le nom de domaine du bean `Catalina`. Si le nom des métriques Tomcat exposées est précédé par le nom de domaine d'un autre bean, par exemple `Tomcat`, copiez les métriques par défaut depuis le fichier `metrics.yaml` vers la section `conf` du fichier `tomcat.d/conf.yaml`, puis modifiez le filtre `domain` de façon à utiliser le nom de domaine du bean applicable.

```yaml
- include:
    domain: Tomcat      # Valeur par défaut : Catalina
    type: ThreadPool
    attribute:
      maxThreads:
        alias: tomcat.threads.max
        metric_type: gauge
      currentThreadCount:
        alias: tomcat.threads.count
        metric_type: gauge
      currentThreadsBusy:
        alias: tomcat.threads.busy
        metric_type: gauge
```

Consultez la [section JMX][5] pour obtenir plus d'informations à ce sujet.

### Commandes pour afficher les métriques disponibles

La commande `datadog-agent jmx` a été ajoutée dans la version 4.1.0.

- Énumérer les attributs qui correspondent au moins à l'une de vos configurations d'instance :
  `sudo /etc/init.d/datadog-agent jmx list_matching_attributes`
- Énumérer les attributs qui correspondent à l'une de vos configurations d'instance, mais qui ne sont pas recueillis afin de ne pas dépasser le nombre maximum de métriques pouvant être recueillies :
  `sudo /etc/init.d/datadog-agent jmx list_limited_attributes`
- Énumérer les attributs qui sont véritablement recueillis par vos configurations d'instance actuelles :
  `sudo /etc/init.d/datadog-agent jmx list_collected_attributes`
- Énumérer les attributs qui ne correspondent à aucune de vos configurations d'instance :
  `sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes`
- Énumérer l'ensemble des attributs disponibles dont le type est pris en charge par JMXFetch :
  `sudo /etc/init.d/datadog-agent jmx list_everything`
- Démarrer la collecte de métriques en fonction de votre configuration actuelle et les afficher dans la console :
  `sudo /etc/init.d/datadog-agent jmx collect`

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller les métriques Tomcat avec Datadog][6]
- [Métriques clés pour la surveillance de Tomcat][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tomcat/images/tomcat_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://tomcat.apache.org/tomcat-6.0-doc/monitoring.html
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/integrations/java/
[6]: https://www.datadoghq.com/blog/monitor-tomcat-metrics
[7]: https://www.datadoghq.com/blog/tomcat-architecture-and-performance