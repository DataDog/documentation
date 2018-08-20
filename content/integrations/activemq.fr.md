---
categories:
- processing
- messaging
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/activemq/
git_integration_title: activemq
guid: 496df16d-5ad0-438c-aa2a-b8ba8ee3ae05
has_logo: true
integration_title: ActiveMQ
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: activemq
public_title: Intégration Datadog-ActiveMQ
short_description: Collecter des métriques pour des courtiers, queues, producteurs et consommateurs de messages,
  and more.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.0.1
---



## Aperçu

Le check ActiveMQ vous permettez de collectionner des métriques pour des courtiers, queues, producteurs et consommateurs de messages, et encore plus.

## Implémentation
### Installation

Le check ActiveMQ est packagé avec l'agent, il vous faut simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) dans vos noeuds ActiveMQ.

Le check collectionne les métriques via JMX, donc vous avez besoin d'un JVM dans chaque noeud pour que l'agent puisse bifurquer [jmxfetch](https://github.com/DataDog/jmxfetch). Nous vous conseillons d'utiliser un JVM approuvé par Oracle.

### Configuration

1. **Assurez-vous que [JMX Remote est activé](http://activemq.apache.org/jmx.html) dans votre serveur ActiveMQ.**
2. Configurer l'agent pour qu'il se connecte vers ActiveMQ. Editez le fichier `${confd_help('`conf.d/activemq.yaml`')}`. Consultez l'exemple [activemq.yaml](https://github.com/DataDog/integrations-core/blob/master/activemq/conf.yaml.example) pour apprendre toutes les options de configuration disponibles.

```
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

3. Redémarrez votre Agent

```bash
sudo /etc/init.d/datadog-agent restart


if [ $(sudo supervisorctl status | egrep "datadog-agent.*RUNNING" | wc -l) == 3 ]; \
then echo -e "\e[0;32mAgent is running\e[0m"; \
else echo -e "\e[031mAgent is not running\e[0m"; fi
```

{{< insert-example-links check="none" >}}

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `activemq` dans la section Checks.

## Compatibilité

Le check d'ActiveMQ ne fonctionne que sous Linux ou macOS. 

## Données collectées
### Métriques
Consultez [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv) pour avoir la liste complète des métriques fournies par cette intégration.

### Évènements
Le check ActiveMQ n'inclut aucun événement pour le moment.

### Checks de Service
**activemq.can_connect**:

Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter et de collecter des métriques depuis l'instance ActiveMQ qu'il monitor. Sinon renvoie `OK`.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Surveilliez les métriques et la performance d'ActiveMQ.](https://www.datadoghq.com/blog/monitor-activemq-metrics-performance/)



## Intégration Activemq_xml

## Aperçu

Obtenir les métriques du service activemq_xml en temps réel pour:

* Visualiser et monitorer les états de activemq_xml
* Être informé des basculements et événements de activemq_xml.

## Implémentation
### Installation

Le check ActiveMQ XML est packagé avec l'Agent, il vous faut donc simplement [installer l'Agent](https://app.datadoghq.com/account/settings#agent) dans vos serveurs.

### Configuration

Editez le fichier `activemq_xml.yaml` afin de d'indiquer votre serveur et son port, configurez le master à surveiller. Consultez l'exemple du [activemq_xml.yaml](https://github.com/DataDog/integrations-core/blob/master/activemq_xml/conf.yaml.example) pour apprendre toutes les options de configuration disponibles.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `activemq_xml` dans la section Checks.

## Compatibilité

Le check activemq_xml est compatible avec toutes les plateformes principales.

## Données collectées
### Métriques
{{< get-metrics-from-git "activemq_xml" >}}


### Évènements
Le check Activemq_xml n'inclut aucun événement pour le moment.

### Checks de Service
Le check Activemq_xml n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Surveilliez les métriques et la performance d'ActiveMQ.](https://www.datadoghq.com/blog/monitor-activemq-metrics-performance/)

