---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - messaging
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kafka/README.md'
display_name: Kafka
git_integration_title: kafka
guid: f201c0b7-4b31-4528-9955-ae756a4580b8
integration_id: kafka
integration_title: Kafka
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kafka.
metric_to_check: kafka.net.bytes_out
name: kafka
process_signatures:
  - java kafka.kafka
public_title: Intégration Datadog/Kafka
short_description: 'Recueillez des métriques sur des producteurs et des consommateurs, sur la réplication, sur le retard maximal, et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Kafka][1]

## Présentation

Associez Kafka à Datadog pour :

* Visualiser les performances de votre cluster en temps réel
* Corréler les performances de Kafka avec le reste de vos applications

Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information. Choisissez des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][2] afin d'obtenir des instructions détaillées.

Pour recueillir les métriques relatives aux consommateurs de Kafka, consultez la section [check kafka_consumer][3].

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][4] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Kafka de l'Agent est inclus avec le paquet de l'[Agent Datadog][5] : vous n'avez donc rien d'autre à installer sur vos nœuds Kafka.

Le check recueille des métriques via JMX, un JVM est donc nécessaire sur chaque nœud Kafka pour que l'Agent puisse dupliquer [jmxfetch][6]. Vous pouvez utiliser le même JVM que Kafka.

### Configuration

Modifiez le fichier `kafka.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7].

#### Collecte de métriques

Les noms des beans de Kafka dépendent de la version précise de Kafka que vous exécutez. Utilisez le [fichier d'exemple de configuration][9] fourni avec l'Agent pour vous guider. Il s'agit de la configuration la plus récente. **Remarque** : la version de l'Agent citée dans l'exemple peut correspondre à une version plus récente que celle que vous avez installée.

Après avoir configuré `kafka.yaml`, [redémarrez l'Agent][10] pour commencer à envoyer vos métriques Kafka à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. Kafka utilise l'enregistreur `log4j` par défaut. Pour activer la journalisation dans un fichier et personnaliser le format, modifiez le fichier `log4j.properties` :

    ```
      # Set root logger level to INFO and its only appender to R
      log4j.rootLogger=INFO, R
      log4j.appender.R.File=/var/log/kafka/server.log
      log4j.appender.R.layout=org.apache.log4j.PatternLayout
      log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
    ```

2. Par défaut, notre pipeline d'intégration prend en charge les expressions de conversion suivantes :

    ```
      %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
      %d [%t] %-5p %c - %m%n
      %r [%t] %p %c %x - %m%n
    ```

    Dupliquez et modifiez le [pipeline d'intégration][11] si vous utilisez un autre format.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

4. Ajoutez le bloc de configuration suivant à votre fichier `kafka.d/conf.yaml`. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple kafka.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      logs:
        - type: file
          path: /var/log/kafka/server.log
          source: kafka
          service: myapp
          #To handle multi line that starts with yyyy-mm-dd use the following pattern
          #log_processing_rules:
          #  - type: multi_line
          #    name: log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

5. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande status de l'Agent][13] et cherchez `kafka` dans la section **JMXFetch** :

```
========
JMXFetch
========
  Initialized checks
  ==================
    kafka
      instance_name : kafka-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## Données collectées
### Métriques
{{< get-metrics-from-git "kafka" >}}


### Événements
Le check Kafka n'inclut aucun événement.

### Checks de service
**kafka.can_connect**:<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance Kafka qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

* [Dépannage et analyse approfondie pour Kafka][15]
* [Échec de la récupération du stub RMIServer par l'Agent][16]
* [Les métriques relatives aux producteurs et consommateurs n'apparaissent pas dans mon application Datadog][17]

## Pour aller plus loin

* [Surveillance des métriques de performance Kafka][18]
* [Collecte des métriques de performance Kafka][19]
* [Surveillance de Kafka avec Datadog][20]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png
[2]: https://docs.datadoghq.com/fr/integrations/java
[3]: https://docs.datadoghq.com/fr/integrations/kafka/#agent-check-kafka-consumer
[4]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://github.com/DataDog/jmxfetch
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/kafka/metadata.csv
[15]: https://docs.datadoghq.com/fr/integrations/faq/troubleshooting-and-deep-dive-for-kafka
[16]: https://docs.datadoghq.com/fr/integrations/faq/agent-failed-to-retrieve-rmierver-stub
[17]: https://docs.datadoghq.com/fr/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[18]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[19]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[20]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog


{{< get-dependencies >}}


## Check de l'Agent : Kafka consumer

![Dashboard Kafka][111]

## Présentation

Ce check d'Agent recueille uniquement les métriques pour les décalages de messages. Si vous souhaitez recueillir les métriques JMX sur des agents Kafka ou des consommateurs/producteurs basés sur Java, consultez le check Kafka.

Ce check récupère les décalages records des agents Kafka, les décalages des consommateurs qui sont stockés dans Kafka ou Zookeeper (pour ceux qui l'utilisent encore) et le retard des consommateurs calculé (qui correspond à la différence entre le décalage des agents et le celui des consommateurs).

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][112] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Kafka consumer de l'Agent est inclus avec le paquet de l'[Agent Datadog][113] : vous n'avez donc rien d'autre à installer sur vos nœuds Kafka.

### Configuration

Créez un fichier `kafka_consumer.yaml` en vous inspirant de [ce fichier d'exemple][114]. Ensuite, [redémarrez l'Agent Datadog][115] pour commencer à envoyer des métriques à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][116] et cherchez `kafka_consumer` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "kafka_consumer" >}}


### Événements

`consumer_lag` :

L'Agent Datadog génère un événement lorsque la valeur de la métrique `consumer_lag` descend en dessous de 0, et lui ajoute
les tags `topic`, `partition` et `consumer_group`.

### Checks de service
Le check Kafka-consumer n'inclut aucun check de service.

## Dépannage

* [Dépannage et analyse approfondie pour Kafka][118]
* [Échec de la récupération du stub RMIServer par l'Agent][119]
* [Les métriques relatives aux producteurs et consommateurs n'apparaissent pas dans mon application Datadog][120]

## Pour aller plus loin

* [Surveillance des métriques de performance Kafka][121]
* [Collecte des métriques de performance Kafka][122]
* [Surveillance de Kafka avec Datadog][123]

[111]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png
[112]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[113]: https://app.datadoghq.com/account/settings#agent
[114]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
[115]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[116]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[117]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/metadata.csv
[118]: https://docs.datadoghq.com/fr/integrations/faq/troubleshooting-and-deep-dive-for-kafka
[119]: https://docs.datadoghq.com/fr/integrations/faq/agent-failed-to-retrieve-rmierver-stub
[120]: https://docs.datadoghq.com/fr/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
[121]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[122]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[123]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog


{{< get-dependencies >}}