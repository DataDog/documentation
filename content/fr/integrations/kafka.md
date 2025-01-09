---
app_id: kafka
app_uuid: 39640d5e-54be-48ff-abf1-8871499e2fd3
assets:
  dashboards:
    kafka: assets/dashboards/kafka_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kafka.net.bytes_out.rate
      metadata_path: metadata.csv
      prefix: kafka.
    process_signatures:
    - java kafka.kafka
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Kafka
  logs:
    source: kafka
  monitors:
    '[Kafka] High produce latency on broker': assets/monitors/broker_produce_latency.json
    '[Kafka] High producer request rate': assets/recommended_monitors/kafka_high_producer_request_rate.json
    '[Kafka] Offline partition': assets/recommended_monitors/kafka_offline_partition.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    kafka_patterns: assets/saved_views/kafka_patterns.json
    kafka_processes: assets/saved_views/kafka_processes.json
    logger_overview: assets/saved_views/logger_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- processing
- messaging
- log collection
- autodiscovery
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kafka/README.md
display_on_public_website: true
draft: false
git_integration_title: kafka
integration_id: kafka
integration_title: Kafka
integration_version: 2.13.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: kafka
public_title: Kafka
short_description: Recueillez des métriques sur les producteurs et les consommateurs,
  la réplication,  le retard maximal, et plus encore.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Processing
  - Category::Messaging
  - Category::Log Collection
  - Category::Autodiscovery
  configuration: README.md#Setup
  description: Recueillez des métriques sur les producteurs et les consommateurs,
    la réplication,  le retard maximal, et plus encore.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kafka
---



![Dashboard Kafka][1]

## Présentation

Associez Kafka à Datadog pour :

- Visualiser les performances de votre cluster en temps réel
- Corréler les performances de Kafka avec le reste de vos applications

Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information. Choisissez des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment personnaliser la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][2] afin d'obtenir des instructions détaillées.

Pour recueillir les métriques relatives aux consommateurs de Kafka, consultez la section [check kafka_consumer][3].

**Remarque** : cet exemple de configuration de l'intégration ne fonctionne que pour Kafka 0.8.2 ou les versions ultérieures. Si vous utilisez une version antérieure, consultez les [exemples de fichier pour les versions 5.2.x de l'Agent][4].

## Configuration

### Installation

Le check Kafka de l'Agent est inclus avec le paquet de l'[Agent Datadog][5] : vous n'avez donc rien d'autre à installer sur vos nœuds Kafka.

Le check recueille des métriques à partir de JMX avec [JMXFetch][6]. Pour que l'Agent puisse exécuter JMXFetch, chaque nœud Kafka nécessite une JVM. Il peut s'agir de la même JVM que celle utilisée par Kafka.

**Remarque** : Il n'est pas possible d'utiliser le check Kafka avec Managed Streaming for Apache Kafka (Amazon MSK). Utilisez plutôt l'[intégration Amazon MSK][7].

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

2. Par défaut, le pipeline d'intégration de Datadog prend en charge les expressions de conversion suivantes :

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

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                              |
| -------------- | -------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "kafka", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `kafka` dans la section **JMXFetch** :

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
{{< get-service-checks-from-git "kafka" >}}


## Dépannage

- [Dépannage et analyse approfondie pour Kafka][9]
- [Échec de la récupération du stub RMIServer par l'Agent][10]

## Pour aller plus loin

- [Surveillance des métriques de performance Kafka][11]
- [Collecte des métriques de performance Kafka][12]
- [Surveillance de Kafka avec Datadog][13]




## Intégration Kafka Consumer

![Dashboard Kafka][14]

## Présentation

Ce check d'Agent recueille uniquement les métriques pour les décalages de messages. Si vous souhaitez recueillir les métriques JMX sur des agents Kafka ou des consommateurs/producteurs basés sur Java, consultez le check Kafka.

Ce check récupère les décalages records des agents Kafka, les décalages des consommateurs qui sont stockés dans Kafka ou Zookeeper (pour ceux qui l'utilisent encore) et le retard des consommateurs calculé (qui correspond à la différence entre le décalage des agents et celui des consommateurs).

**Remarque :** cette intégration veille à ce que les décalages des consommateurs soient vérifiés avant les décalages des agents. Avec un tel procédé, dans le pire des cas, le retard des consommateurs est légèrement exagéré. L'approche inverse peut minimiser le retard des consommateurs, à tel point qu'il est possible d'atteindre des valeurs négatives. De telles valeurs apparaissent uniquement pour l'un des pires scénarios, à savoir lorsque des messages sont ignorés.

## Configuration

### Installation

Le check Kafka Consumer de l'Agent est inclus avec le package de l'[Agent Datadog][5] : vous n'avez donc rien d'autre à installer sur vos nœuds Kafka.

### Configuration

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `kafka_consumer.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][15]. Consultez le [fichier d'exemple kafka_consumer.d/conf.yaml][16] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][17].

##### Collecte de logs

Ce check ne recueille aucun log supplémentaire. Pour recueillir des logs à partir de vos agents Kafka, consultez les [instructions de collecte de logs pour Kafka][18].

<!-- xxz tab xxx -->
<!-- xxx tab "Environnement conteneurisé" xxx -->

#### Environnement conteneurisé

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][19].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `kafka_consumer` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kafka_consumer" >}}


### Événements

**consumer_lag** :<br>
L'Agent Datadog génère un événement lorsque la valeur de la métrique `consumer_lag` descend en dessous de 0, et lui ajoute les tags `topic`, `partition` et `consumer_group`.

### Checks de service

Le check Kafka-consumer n'inclut aucun check de service.

## Dépannage

- [Dépannage et analyse approfondie pour Kafka][9]
- [Échec de la récupération du stub RMIServer par l'Agent][10]

**Authentification à l'aide de la GSSAPI Kerberos**

Selon la configuration Kerberos de votre cluster Kafka, vous devrez peut-être configurer les éléments suivants :

* Le client Kafka permettant à l'Agent Datadog de se connecter à l'agent Kafka. Le client Kafka doit être ajouté en tant que principal Kerberos, puis ajouté à un keytab Kerberos. Le client Kafka doit également posséder un ticket Kerberos valide.
* Le certificat TLS permettant d'authentifier une connexion sécurisée à l'agent Kafka.
  * Si le keystore JKS est utilisé, un certificat doit être exporté à partir de ce keystore et le chemin du fichier doit être configuré avec les options `tls_cert` et/ou `tls_ca_cert` applicables.
  * Si une clé privée est requise pour authentifier le certificat, elle doit être configurée avec l'option `tls_private_key`. Le mot de passe de la clé privée doit être configuré avec l'option `tls_private_key_password`, le cas échéant.
* La variable d'environnement `KRB5_CLIENT_KTNAME` pointant vers l'emplacement du keytab Kerberos du client Kafka, si son emplacement ne correspond pas au chemin par défaut (par exemple, `KRB5_CLIENT_KTNAME=/etc/krb5.keytab`).
* La variable d'environnement `KRB5CCNAME` pointant vers le cache du ticket des identifiants Kerberos du client Kafka, si son emplacement ne correspond pas au chemin par défaut (par exemple, `KRB5CCNAME=/tmp/krb5cc_xxx`).
* Si l'Agent Datadog ne peut pas accéder aux variables d'environnement, définissez-les dans un fichier de remplacement de la configuration du service de l'Agent Datadog pour votre système d'exploitation. La procédure de modification du fichier d'unité du service de l'Agent Datadog peut varier selon la version du système d'exploitation Linux utilisée. Par exemple, dans un environnement Linux `systemd` :

**Exemple de Systemd Linux**

1. Configurez les variables d'environnement dans un fichier d'environnement.
   Par exemple : `/chemin/vers/fichier/environnement`

  ```
  KRB5_CLIENT_KTNAME=/etc/krb5.keytab
  KRB5CCNAME=/tmp/krb5cc_xxx
  ```

2. Créez un fichier de remplacement de la configuration du service de l'Agent Datadog : `sudo systemctl edit datadog-agent.service`.

3. Configurez ce qui suit dans le fichier de remplacement :

  ```
  [Service]
  EnvironmentFile=/path/to/environment/file
  ```

4. Exécutez les commandes suivantes pour recharger le daemon systemd, le service datadog-agent et l'Agent Datadog :

```
sudo systemctl daemon-reload
sudo systemctl restart datadog-agent.service
sudo service datadog-agent restart
```

## Pour aller plus loin

- [Surveillance des métriques de performance Kafka][11]
- [Collecte des métriques de performance Kafka][12]
- [Surveillance de Kafka avec Datadog][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png
[2]: https://docs.datadoghq.com/fr/integrations/java/
[3]: https://docs.datadoghq.com/fr/integrations/kafka/?tab=host#kafka-consumer-integration
[4]: https://raw.githubusercontent.com/DataDog/dd-agent/5.2.1/conf.d/kafka.yaml.example
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://github.com/DataDog/jmxfetch
[7]: https://docs.datadoghq.com/fr/integrations/amazon_msk/#pagetitle
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/fr/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[10]: https://docs.datadoghq.com/fr/integrations/guide/agent-failed-to-retrieve-rmiserver-stub/
[11]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[12]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[13]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
[14]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png
[15]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[16]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
[17]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[18]: https://docs.datadoghq.com/fr/integrations/kafka/#log-collection
[19]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent