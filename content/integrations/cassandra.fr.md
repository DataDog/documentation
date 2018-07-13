---
categories:
- data store
- log collection
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/cassandra/
git_integration_title: cassandra
guid: 03ba454d-425c-4f61-9e9c-54682c3ebce5
has_logo: true
integration_title: Cassandra
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: cassandra
public_title: Intégration Datadog-Cassandra
short_description: Suivez la performance des clusters, leurs capacité, leur santé globale et bien plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.2.1
---


{{< img src="integrations/cassandra/cassandra.png" alt="Cassandra default dashboard" responsive="true" >}}
## Aperçu

Obtenez les métriques du service Cassandra en temps réel pour:

* Visualiser et monitorer les états de Cassandra
* Être informé des failovers et des événements de Cassandra.

## Implémentation
### Installation

Le check Cassandra est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos noeuds Cassandra.

Nous recommandons l'utilisation du JDK d'Oracle pour cette intégration.

Cette check a une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'informations. Vous pouvez spécifier les métriques qui vous intéressent en modifiant la configuration ci-dessous. Pour savoir comment personnaliser les métriques à collecter, consultez la [documentation de JMX Checks](https://docs.datadoghq.com/integrations/java/) pour obtenir des instructions plus détaillées. Si vous avez besoin de monitorer plus de métriques, envoyez-nous un courriel à support@datadoghq.com

### Configuration

Créez un fichier `cassandra.yaml` dans le répertoire` conf.d` de l'Agent:

#### Collecte de métrique

*  La configuration par défaut dans votre fichier `cassandra.yaml` active la collecte de [vos métriques Cassandra](#metrics).
 Consultez l'exemple du [canevas cassandra.yaml](https://github.com/DataDog/integrations-core/blob/master/cassandra/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

2. [Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent).

#### Collecte de log

**Disponible pour l'Agent >6.0**

* La collecte des logs est désactivée par défaut dans l'Agent Datadog, vous devez l'activer dans `datadog.yaml`:

  ```
  logs_enabled: true
  ```

* Ajoutez cette configuration à votre fichier `cassandra.yaml` pour commencer à collecter vos logs Cassandra:

  ```
    logs:
        - type: file
          path: /var/log/cassandra/*.log
          source: cassandra
          sourcecategory: database
          service: myapplication
  ```

  Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
Consultez l'exemple du [canevas cassandra.yaml](https://github.com/DataDog/integrations-core/blob/master/cassandra/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

* [Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent).

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `cassandra` dans la section Checks.

## Compatibilité

Le check Cassandra est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "cassandra" >}}


### Évènements
Le check Cassandra n'inclut aucun événement pour le moment.

### Checks de Service
**cassandra.can_connect**

Renvoie `CRITICAL` si l'agent ne peut pas se connecter et collecter les métriques de l'instance Cassandra surveillée. Renvoie `OK` sinon.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Comment monitorer les métriques de performance de Cassandra](https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics/)
* [Comment collecter les métriques de Cassandra](https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics/)
* [Monitorer Cassandra avec Datadog](https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog/)



## Check de l'Agent: Cassandra Nodetool

## Aperçu

Ce check collecte des métriques pour votre cluster Cassandra qui ne sont pas disponibles via [l'intégration JMX] (https://github.com/DataDog/integrations-core/tree/master/cassandra).
Il utilise l'utilitaire `nodetool` pour les collecter.

## Implémentation
### Installation

Le check Cassandra nodetool est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos noeuds Cassandra.

### Configuration

Créez un fichier `cassandra_nodetool.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas cassandra_nodetool.yaml](https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:
  # command or path to nodetool (e.g. /usr/bin/nodetool or docker exec container nodetool)
  # can be overwritten on an instance
  # nodetool: /usr/bin/nodetool

instances:

  # the list of keyspaces to monitor
  - keyspaces: []

  # host that nodetool will connect to.
  # host: localhost

  # the port JMX is listening to for connections.
  # port: 7199

  # a set of credentials to connect to the host. These are the credentials for the JMX server.
  # For the check to work, this user must have a read/write access so that nodetool can execute the `status` command
  # username:
  # password:

  # a list of additionnal tags to be sent with the metrics
  # tags: []
```

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `cassandra_nodetool` dans la section Checks.

## Compatibilité

Le check `cassandra_nodetool` est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "cassandra_nodetool" >}}


### Évènements
Le check Cassandra_nodetool n'inclut aucun événement pour le moment.

### Checks de Service

**cassandra.nodetool.node_up**:
L'agent envoie ce check de service pour chaque noeud monitoré du cluster. Renvoie CRITICAL si le nœud est en tombé, sinon OK.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Comment monitorer les métriques de performance de Cassandra](https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics/)
* [Comment collecter les métriques de Cassandra](https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics/)
* [Monitorer Cassandra avec Datadog](https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog/)

