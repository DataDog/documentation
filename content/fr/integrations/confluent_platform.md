---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Confluent Platform Overview: assets/dashboards/overview.json
  logs:
    source: confluent_platform
  metrics_metadata: metadata.csv
  monitors:
    '[Confluent Platform] Unclean leader election': assets/monitors/unclean_leader_election.json
    '[Confluent Platform] Unused topic partition': assets/monitors/unused_partition.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- processing
- messaging
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/confluent_platform/README.md
display_name: Confluent Platform
draft: false
git_integration_title: confluent_platform
guid: 8e4a6d7e-44bc-440c-aafa-a0f98df87cc0
integration_id: confluent-platform
integration_title: Confluent Platform
integration_version: 1.8.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: confluent.
metric_to_check: confluent.kafka.producer.outgoing_byte_rate
name: confluent_platform
public_title: Intégration Datadog/Confluent Platform
short_description: Surveillez des composants de Confluent Platform.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller des composants de Confluent Platform et de Kafka avec l'Agent Datadog.

Cette intégration recueille des métriques JMX pour les composants suivants :

- Broker
- Connect
- Replicator
- Schema Registry
- ksqlDB Server
- Streams
- REST Proxy

## Configuration


### Installation

Le check Confluent Platform est inclus avec le package de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer sur le serveur du composant Confluent Platform.

**Remarque** : ce check recueille des métriques via JMX, une JVM est donc nécessaire sur chaque nœud pour que l'Agent puisse exécuter [jmxfetch][2]. Nous vous conseillons d'utiliser un JVM fourni par Oracle.


### Configuration

1. Modifiez le fichier `confluent_platform.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour recueillir vos données de performance Confluent Platform. Consultez le [fichier d'exemple confluent_platform.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

    Une instance distincte doit être créée pour chaque composant dont vous souhaitez recueillir les métriques JMX. Les métriques par défaut recueillies sont énumérées dans le [fichier `metrics.yaml`][4], par exemple :

    ```yaml
    instances:
     - host: localhost
       port: 8686
       name: broker_instance
       user: username
       password: password
     - host: localhost
       port: 8687
       name: schema_registry_instance
     - host: localhost
       port: 8688
       name: rest_proxy_instance
    ```

2. [Redémarrez l'Agent][5].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `confluent_platform.d/conf.yaml` pour commencer à recueillir vos logs de composant Confluent Platform :

   ```yaml
     logs:
       - type: file
         path: <CONFLUENT_COMPONENT_PATH>/logs/*.log
         source: confluent_platform
         service: <SERVICE_NAME>
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple confluent_platform.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `confluent_platform` dans la section **JMXFetch** :

```
    ========
    JMXFetch
    ========

      Initialized checks
      ==================
        confluent_platform
          instance_name : confluent_platform-localhost-31006
          message :
          metric_count : 26
          service_check_count : 0
          status : OK
```

## Données collectées

### Métriques
{{< get-metrics-from-git "confluent_platform" >}}


### Événements

Le check Confluent Platform n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "confluent_platform" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/jmxfetch
[3]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/metadata.csv
[7]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/