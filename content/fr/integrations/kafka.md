---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    kafka: assets/dashboards/kafka_dashboard.json
  logs:
    source: kafka
  metrics_metadata: metadata.csv
  monitors:
    '[Kafka] High producer request rate': assets/recommended_monitors/kafka_high_producer_request_rate.json
    '[Kafka] Offline partition': assets/recommended_monitors/kafka_offline_partition.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    kafka_patterns: assets/saved_views/kafka_patterns.json
    kafka_processes: assets/saved_views/kafka_processes.json
    logger_overview: assets/saved_views/logger_overview.json
  service_checks: assets/service_checks.json
categories:
  - processing
  - messaging
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kafka/README.md'
display_name: Kafka
draft: false
git_integration_title: kafka
guid: f201c0b7-4b31-4528-9955-ae756a4580b8
integration_id: kafka
integration_title: Kafka
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kafka.
metric_to_check: kafka.net.bytes_out.rate
name: kafka
process_signatures:
  - java kafka.kafka
public_title: Intégration Datadog/Kafka
short_description: 'Recueillez des métriques sur les producteurs et les consommateurs, la réplication,  le retard maximal, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Kafka][1]

## Présentation

Associez Kafka à Datadog pour :

- Visualiser les performances de votre cluster en temps réel
- Corréler les performances de Kafka avec le reste de vos applications

Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information. Choisissez des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][2] afin d'obtenir des instructions détaillées.

Pour recueillir les métriques relatives aux consommateurs de Kafka, consultez la section [check kafka_consumer][3].

*Remarque* : cet exemple de configuration de l'intégration ne fonctionne que pour Kafka >= 0.8.2.
Si vous utilisez une version antérieure, vous pouvez vous reporter aux fichiers d'exemple de l'Agent 5.2.x, disponibles à l'adresse https://raw.githubusercontent.com/DataDog/dd-agent/5.2.1/conf.d/kafka.yaml.example

## Configuration

### Installation

Le check Kafka de l'Agent est inclus avec le package de l'[Agent Datadog][4] : vous n'avez donc rien d'autre à installer sur vos nœuds Kafka.

Le check recueille des métriques via JMX, une JVM est donc nécessaire sur chaque nœud Kafka pour que l'Agent puisse faire un fork de [jmxfetch][5]. Vous pouvez utiliser la même JVM que Kafka.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `kafka.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Les noms des beans de Kafka dépendent de la version précise de Kafka que vous exécutez. Utilisez le [fichier d'exemple de configuration][2] fourni avec l'Agent pour vous guider. Il s'agit de la configuration la plus récente. **Remarque** : la version de l'Agent citée dans l'exemple peut correspondre à une version plus récente que celle que vous avez installée.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. Kafka utilise le logger `log4j` par défaut. Pour activer la journalisation dans un fichier et personnaliser le format, modifiez le fichier `log4j.properties` :

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/kafka/server.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
   ```

2. Par défaut, notre pipeline d'intégration prend en charge les expressions de conversion suivantes :

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
     [%d] %p %m (%c)%n
   ```

    Dupliquez et modifiez le [pipeline d'intégration][4] si vous utilisez un autre format.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

4. Ajoutez le bloc de configuration suivant à votre fichier `kafka.d/conf.yaml`. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple kafka.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

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

5. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][1].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                              |
| -------------- | -------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "kafka", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `kafka` dans la section **JMXFetch** :

```text
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
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance Kafka qu'il surveille et à y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

- [Dépannage et analyse approfondie pour Kafka][7]
- [Échec de la récupération du stub RMIServer par l'Agent][8]
- [Les métriques relatives aux producteurs et consommateurs n'apparaissent pas dans mon application Datadog][9]

## Pour aller plus loin

- [Surveillance des métriques de performance Kafka][10]
- [Collecte des métriques de performance Kafka][11]
- [Surveillance de Kafka avec Datadog][12]




## Check de l'Agent : Kafka consumer

![Dashboard Kafka][13]

## Présentation

Ce check d'Agent recueille uniquement les métriques pour les décalages de messages. Si vous souhaitez recueillir les métriques JMX sur des agents Kafka ou des consommateurs/producteurs basés sur Java, consultez le check Kafka.

Ce check récupère les décalages records des agents Kafka, les décalages des consommateurs qui sont stockés dans Kafka ou Zookeeper (pour ceux qui l'utilisent encore) et le retard des consommateurs calculé (qui correspond à la différence entre le décalage des agents et le celui des consommateurs).

**Remarque :** cette intégration veille à ce que les décalages des consommateurs soient vérifiés avant les décalages des agents. Avec un tel procédé, dans le pire des cas, le retard des consommateurs est légèrement exagéré. Toute autre méthode peut minimiser le retard des consommateurs, à tel point qu'il est possible d'atteindre des valeurs négatives. De telles valeurs apparaissent uniquement pour l'un des pires scénarios, à savoir lorsque des messages sont ignorés.

## Configuration

### Installation

Le check Kafka consumer de l'Agent est inclus avec le package de l'[Agent Datadog][4] : vous n'avez donc rien d'autre à installer sur vos nœuds Kafka.

### Configuration

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `kafka_consumer.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][14]. Consultez le [fichier d'exemple kafka_consumer.d/conf.yaml][15] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][16].

##### Collecte de logs

Ce check ne recueille aucun log supplémentaire. Pour recueillir des logs à partir de vos brokers Kafka, consultez les [instructions de collecte de logs pour Kafka][17].

<!-- xxz tab xxx -->
<!-- xxx tab "Environnement conteneurisé" xxx -->

#### Environnement conteneurisé

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][18].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `kafka_consumer` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kafka_consumer" >}}


### Événements

**consumer_lag** :<br>
L'Agent Datadog génère un événement lorsque la valeur de la métrique `consumer_lag` descend en dessous de 0, et lui ajoute les tags `topic`, `partition` et `consumer_group`.

### Checks de service

Le check Kafka-consumer n'inclut aucun check de service.

## Dépannage

- [Dépannage et analyse approfondie pour Kafka][7]
- [Échec de la récupération du stub RMIServer par l'Agent][8]
- [Les métriques relatives aux producteurs et consommateurs n'apparaissent pas dans mon application Datadog][9]

## Pour aller plus loin

- [Surveillance des métriques de performance Kafka][10]
- [Collecte des métriques de performance Kafka][11]
- [Surveillance de Kafka avec Datadog][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png
[2]: https://docs.datadoghq.com/fr/integrations/java/
[3]: https://docs.datadoghq.com/fr/integrations/kafka/#agent-check-kafka-consumer
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/jmxfetch
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[8]: https://docs.datadoghq.com/fr/integrations/faq/agent-failed-to-retrieve-rmierver-stub/
[9]: https://docs.datadoghq.com/fr/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application/
[10]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[11]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[12]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png
[14]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[15]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
[16]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[17]: https://docs.datadoghq.com/fr/integrations/kafka/#log-collection
[18]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent