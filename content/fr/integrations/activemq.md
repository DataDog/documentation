---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
  - processing
  - messaging
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/activemq/README.md'
display_name: ActiveMQ
git_integration_title: activemq
guid: 496df16d-5ad0-438c-aa2a-b8ba8ee3ae05
integration_id: activemq
integration_title: ActiveMQ
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: activemq.
metric_to_check: activemq.queue.size
name: activemq
process_signatures:
  - activemq
public_title: Intégration Datadog/ActiveMQ
short_description: 'Recueillez des métriques sur les agents, les files d''attente, les producteurs, les consommateurs, et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le check ActiveMQ recueille des métriques sur les agents, les files d'attente, les producteurs, les consommateurs, et plus encore.

**Remarque** : si vous utilisez une version d'ActiveMQ antérieure à la version 5.8.0, consultez les [fichiers d'exemple de l'Agent 5.10.x][1].

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][13] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check ActiveMQ de l'Agent est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds ActiveMQ.

Le check recueille des métriques via JMX, un JVM est donc nécessaire sur chaque nœud pour que l'Agent puisse dupliquer [jmxfetch][3]. Nous recommandons l'utilisation d'un JVM fourni par Oracle.

### Configuration

1. **Vérifiez que l'[accès distant à JMX est activé][4] sur votre serveur ActiveMQ.**
2. Configurez l'Agent pour le connecter à ActiveMQ. Modifiez `activemq.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5]. Consultez le [fichier d'exemple activemq.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

      ```yaml
      instances:
        - host: localhost
          port: 7199
          user: username
          password: password
          name: activemq_instance
      # List of metrics to be collected by the integration
      # You should not have to modify this.
      init_config:
        conf:
          - include:
            Type: Queue
            attribute:
              AverageEnqueueTime:
                alias: activemq.queue.avg_enqueue_time
                metric_type: gauge
              ConsumerCount:
                alias: activemq.queue.consumer_count
                metric_type: gauge
              ProducerCount:
                alias: activemq.queue.producer_count
                metric_type: gauge
              MaxEnqueueTime:
                alias: activemq.queue.max_enqueue_time
                metric_type: gauge
              MinEnqueueTime:
                alias: activemq.queue.min_enqueue_time
                metric_type: gauge
              MemoryPercentUsage:
                alias: activemq.queue.memory_pct
                metric_type: gauge
              QueueSize:
                alias: activemq.queue.size
                metric_type: gauge
              DequeueCount:
                alias: activemq.queue.dequeue_count
                metric_type: counter
              DispatchCount:
                alias: activemq.queue.dispatch_count
                metric_type: counter
              EnqueueCount:
                alias: activemq.queue.enqueue_count
                metric_type: counter
              ExpiredCount:
                alias: activemq.queue.expired_count
                type: counter
              InFlightCount:
                alias: activemq.queue.in_flight_count
                metric_type: counter

          - include:
            Type: Broker
            attribute:
              StorePercentUsage:
                alias: activemq.broker.store_pct
                metric_type: gauge
              TempPercentUsage:
                alias: activemq.broker.temp_pct
                metric_type: gauge
              MemoryPercentUsage:
                alias: activemq.broker.memory_pct
                metric_type: gauge
      ```

3. [Redémarrez l'Agent][7].

#### Collecte de logs

 **Disponible à partir des versions > 6.0 de l'Agent**

 1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

 2. Ajoutez ce bloc de configuration à votre fichier `activemq.d/conf.yaml` pour commencer à recueillir vos logs Riak :

     ```
      logs:
        - type: file
          path: <ACTIVEMQ_BASEDIR>/data/activemq.log
          source: activemq
          service: <SERVICE_NAME>
        - type: file
          path: <ACTIVEMQ_BASEDIR>/data/audit.log
          source: activemq
          service: <SERVICE_NAME>
    ```

 3. [Redémarrez l'Agent][7].


### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `activemq` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "activemq" >}}


### Événements
Le check ActiveMQ n'inclut aucun événement.

### Checks de service
**activemq.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance ActiveMQ qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

* [Architecture et métriques clés d'ActiveMQ][11]
* [Surveiller les métriques et performances d'ActiveMQ][12]


[1]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/jmxfetch
[4]: https://activemq.apache.org/jmx.html
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv
[10]: https://docs.datadoghq.com/fr/help
[11]: https://www.datadoghq.com/blog/activemq-architecture-and-metrics
[12]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[13]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}


## Intégration ActiveMQ XML

## Présentation

Recueillez des métriques du service ActiveMQ XML en temps réel pour :

* Visualiser et surveiller les états d'ActiveMQ XML
* Être informé des failovers et des événements d'ActiveMQ XML

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][121] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check ActiveMQ XML est inclus avec le paquet de l'[Agent Datadog][111] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

1. Modifiez le fichier `activemq_xml.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][112]. Consultez le [fichier d'exemple activemq_xml.d/conf.yaml][113] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][114].

#### Collecte de métriques
L'intégration ActiveMQ XML peut potentiellement générer des [métriques custom][115], ce qui peut avoir une incidence sur votre [facture][116]. Par défaut, une limite de 350 métriques est appliquée. Si vous souhaitez utiliser davantage de métriques, contactez l'[assistance Datadog][117].

### Validation

[Lancez la sous-commande status de l'Agent][118] et cherchez `activemq_xml` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "activemq_xml" >}}


### Événements
Le check ActiveMQ XML n'inclut aucun événement.

### Checks de service
Le check ActiveMQ XML n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][117].

## Pour aller plus loin

* [Surveiller les métriques et performances d'ActiveMQ][120]


[111]: https://app.datadoghq.com/account/settings#agent
[112]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[113]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example
[114]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[115]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics
[116]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics
[117]: https://docs.datadoghq.com/fr/help
[118]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[119]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/metadata.csv
[120]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[121]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}