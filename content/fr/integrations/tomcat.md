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
  - 'https://github.com/DataDog/integrations-core/blob/master/tomcat/README.md'
display_name: Tomcat
git_integration_title: tomcat
guid: 60f37d34-3bb7-43c9-9b52-2659b8898997
integration_id: tomcat
integration_title: Tomcat
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tomcat.
metric_to_check: tomcat.threads.count
name: tomcat
process_signatures:
  - java tomcat
public_title: Intégration Datadog/Tomcat
short_description: 'Surveillez le nombre de requêtes par seconde, les octets traités, les hits de cache, les métriques de servlet et bien plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Tomcat][1]

## Présentation

Ce check recueille des métriques Tomcat comme :

* Les métriques relatives aux activités générales (nombre d'erreurs, nombre de requêtes, temps de traitement)
* Les métriques de pool de threads (nombre de threads, nombre de threads occupés)
* Temps de traitement des servlets

Et plus encore.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Tomcat est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs Tomcat.

Ce check étant basé sur JMX, vous devez activer JMX Remote sur vos serveurs Tomcat. Suivez les instructions dans la [documentation Tomcat][4] pour effectuer cette opération.

### Configuration

1. Modifiez le fichier `tomcat.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Tomcat. Consultez le [fichier d'exemple tomcat.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

#### Collecte de métriques

*  Ajoutez ce bloc de configuration à votre fichier `tomcat.yaml` pour commencer à recueillir vos [métriques Tomcat](#metriques) :

```
instances:
    -   host: localhost
        port: 7199
        user: <NOMUTILISATEUR_TOMCAT>
        password: <MOTDEPASSE>
        name: my_tomcat

init_config:
  conf:
    - include:
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
    - include:
        type: GlobalRequestProcessor
        attribute:
          bytesSent:
            alias: tomcat.bytes_sent
            metric_type: counter
          bytesReceived:
            alias: tomcat.bytes_rcvd
            metric_type: counter
          errorCount:
            alias: tomcat.error_count
            metric_type: counter
          requestCount:
            alias: tomcat.request_count
            metric_type: counter
          maxTime:
            alias: tomcat.max_time
            metric_type: gauge
          processingTime:
            alias: tomcat.processing_time
            metric_type: counter
    - include:
        j2eeType: Servlet
        attribute:
          processingTime:
            alias: tomcat.servlet.processing_time
            metric_type: counter
          errorCount:
            alias: tomcat.servlet.error_count
            metric_type: counter
          requestCount:
            alias: tomcat.servlet.request_count
            metric_type: counter
    - include:
        type: Cache
        attribute:
          accessCount:
            alias: tomcat.cache.access_count
            metric_type: counter
          hitsCounts:
            alias: tomcat.cache.hits_count
            metric_type: counter
    - include:
        type: JspMonitor
        attribute:
          jspCount:
            alias: tomcat.jsp.count
            metric_type: counter
          jspReloadCount:
            alias: tomcat.jsp.reload_count
            metric_type: counter
```

Consultez la [documentation relative au check JMX][8] pour découvrir la liste des options de configuration compatibles avec l'ensemble des checks basés sur JMX. Cette page décrit également comment l'Agent applique des tags aux métriques JMX.

[Redémarrez l'Agent][7] pour commencer à envoyer des métriques Tomcat à Datadog.

Options de configuration :

| Option                                        | Obligatoire | Description                                                                                                                                                                |
|-----------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `user` et `password`                         | Non       | Nom d'utilisateur et mot de passe                                                                                                                                                      |
| `process_name_regex`                          | Non       | Au lieu de spécifier un host et un port ou `jmx_url`, l'Agent peut se connecter à l'aide de l'API Attach. Pour ce faire, vous devez avoir installé le JDK et avoir défini le chemin vers tools.jar. |
| `tools_jar_path`                              | Non       | Doit être configurée lorsque l'option `process_name_regex` est définie.                                                                                                                            |
| `java_bin_path`                               | Non       | Doit être définie si l'Agent ne parvient pas à trouver votre exécutable Java.                                                                                                               |
| `java_options`                                | Non       | Options JVM Java                                                                                                                                                           |
| `trust_store_path` et `trust_store_password` | Non       | Doit être configurée si `com.sun.management.jmxremote.ssl` est définie sur true dans la configuration du JVM cible.                                                                                      |
| `key_store_path` et `key_store_password`     | Non       | Doit être configurée si `com.sun.management.jmxremote.ssl.need.client.auth` est définie sur true dans la configuration du JVM cible.                                                                     |
| `rmi_registry_ssl`                            | Non       | Doit être définie sur true si `com.sun.management.jmxremote.registry.ssl` est définie sur true dans la configuration du JVM cible.                                                                     |

Le paramètre `conf` correspond à une liste de dictionnaires. Seules deux clés sont autorisées dans ce dictionnaire :

| Clé       | Obligatoire | Description                                                                                                                   |
|-----------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `include` | Oui      | Dictionnaire de filtres. Tout attribut qui correspond à ces filtres est recueilli, sauf s'il correspond également aux filtres « exclude ». |
| `exclude` | Non       | Dictionnaire de filtres. Les attributs qui correspondent à ces filtres ne sont pas recueillis.                                              |

Pour chaque bean, les métriques sont taguées de la manière suivante :

    mondomaine:attr0=val0,attr1=val1

Vous obtenez alors une métrique mydomain (ou un nom similaire, en fonction de l'attribut au sein du bean) avec les tags `attr0:val0, attr1:val1, domain:mydomain`.

Si vous spécifiez un alias dans une clé `include` au format *camel case*, il est converti au format *snake case*. Par exemple, `MonNomMétrique` s'affiche sous la forme de `mon_nom_métrique` dans Datadog.

Consultez le [fichier d'exemple tomcat.yaml][6] pour découvrir toutes les options de configuration disponibles.

##### Le filtre Attribute

Le filtre `attribute` accepte deux types de valeurs :

* Un dictionnaire dont les clés correspondent à des noms d'attributs :

```
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

Pour le cas ci-dessus, les alias de métriques indiqués deviennent le nom de la métrique dans Datadog. Vous pouvez également indiquer le type de métriques en tant que gauge ou counter. Si vous choisissez counter, un taux par seconde est calculé pour cette métrique.

* Une liste de noms d'attributs :

```
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

Dans ce cas :

  * Le type de métrique est gauge.
  * Le nom de la métrique est `jmx.\[NOM_DOMAINE].\[NOM_ATTRIBUT]`.

Voici un autre exemple de filtre :

```
instances:
  - host: 127.0.0.1
    name: jmx_instance
    port: 9999

init_config:
  conf:
    - include:
        bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
        attribute:
          - OneMinuteRate
          - 75thPercentile
          - 95thPercentile
          - 99thPercentile
```

<div class="alert alert-warning">
  <b>Remarque :</b> la liste de filtres est uniquement prise en charge avec les versions > 5.3.0 de l'Agent Datadog. Si vous utilisez une version antérieure, utilisez plutôt des singletons et plusieurs déclarations <code>include</code>.
</div>

```
# Agent Datadog > 5.3.0
  conf:
    - include:
        domain: domain_name
        bean:
          - first_bean_name
          - second_bean_name

# Anciennes versions de l'Agent Datadog
  conf:
    - include:
        domain: domain_name
        bean: first_bean_name
    - include:
        domain: domain_name
        bean: second_bean_name
```

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. Tomcat utilise le logger `log4j` par défaut. Pour activer l'écriture des logs dans un fichier et personnaliser le format du log, modifiez le fichier `log4j.properties` dans le répertoire `$CATALINA_BASE/lib` comme suit :

    ```
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

2. Par défaut, le pipeline d'intégration de Datadog prend en charge les expressions de conversion suivantes :

    ```
      %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
      %d [%t] %-5p %c - %m%n
    ```

    Dupliquez et modifiez le [pipeline d'intégration][10]. Consultez la [documentation sur la journalisation][9] (en anglais) pour obtenir plus d'informations sur les fonctionnalités de journalisation de Tomcat.

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
          service: myapp
          #To handle multi line that starts with yyyy-mm-dd use the following pattern
          #log_processing_rules:
          #  - type: multi_line
          #    name: log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple tomcat.yaml][6] pour découvrir toutes les options de configuration disponibles.

5. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `tomcat` dans la section **Checks**.

## Données collectées
### Métriques
{{< get-metrics-from-git "tomcat" >}}


### Événements
Le check Tomcat n'inclut aucun événement.

### Checks de service

**tomcat.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance Tomcat qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
### Commandes pour afficher les métriques disponibles :

La commande `datadog-agent jmx` a été ajoutée dans la version 4.1.0.

  * Énumérer les attributs qui correspondent à au moins l'une de vos configurations d'instance :
`sudo /etc/init.d/datadog-agent jmx list_matching_attributes`
  * Énumérer les attributs qui correspondent à l'une de vos configurations d'instance, mais qui ne sont pas recueillis afin de ne pas dépasser le nombre maximum de métriques pouvant être recueillies :
`sudo /etc/init.d/datadog-agent jmx list_limited_attributes`
  * Énumérer les attributs qui sont vraiment recueillis par vos configurations d'instance actuelles :
`sudo /etc/init.d/datadog-agent jmx list_collected_attributes`
  * Énumérer les attributs qui ne correspondent à aucune de vos configurations d'instance :
`sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes`
  * Énumérer l'ensemble des attributs disponibles dont le type est pris en charge par JMXFetch :
`sudo /etc/init.d/datadog-agent jmx list_everything`
  * Démarrer la collecte de métriques en fonction de votre configuration actuelle et les afficher dans la console :
`sudo /etc/init.d/datadog-agent jmx collect`

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

* [Surveiller les métriques Tomcat avec Datadog][13]
* [Métriques clés pour la surveillance Tomcat][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tomcat/images/tomcat_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://tomcat.apache.org/tomcat-6.0-doc/monitoring.html
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/integrations/java
[9]: https://tomcat.apache.org/tomcat-7.0-doc/logging.html
[10]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/tomcat/metadata.csv
[13]: https://www.datadoghq.com/blog/monitor-tomcat-metrics
[14]: https://www.datadoghq.com/blog/tomcat-architecture-and-performance


{{< get-dependencies >}}