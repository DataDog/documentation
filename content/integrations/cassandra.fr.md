---
categories:
- data store
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


{{< img src="integrations/cassandra/cassandra.png" alt="Cassandra default dashboard" responsive="true" popup="true">}}
## Aperçu

Obtenez les métriques du service Cassandra en temps réel pour:

* Visualiser et monitorer les états de Cassandra
* Soyez informé des failovers et des événements de Cassandra.

## Implémentation
### Installation

Le check Cassandra est packagé avec l'agent, il vous faut donc simplement [installer l'agent] [1] sur vos noeuds Cassandra.

Nous recommandons l'utilisation du JDK d'Oracle pour cette intégration.

Cette check a une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'informations. Vous pouvez spécifier les métriques qui vous intéressent en modifiant la configuration ci-dessous. Pour savoir comment personnaliser les métriques à collecter, consultez la [documentation de JMX Checks][2] pour obtenir des instructions plus détaillées. Si vous avez besoin de monitorer plus de métriques, envoyez-nous un courriel à support@datadoghq.com

### Configuration

1. Configurer l'Agent pour qu'il se connecte à Cassandra en éditant le fichier `cassandra.yaml`. Consultez l'exemple du [canevas cassandra.yaml][3] pour apprendre toutes les options de configuration disponibles:
2. [Redémarrez votre Agent][4]

### Validation

[Lancez la commande `status`de l'Agent][5] et cherchez `cassandra` dans la section Checks:

```
  Checks
  ======
    [...]

    cassandra
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Le check Cassandra est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "cassandra" >}}


### Evénements
Le check Cassandra n'inclut aucun événement pour le moment.

### Checks de Service
**cassandra.can_connect**

Renvoie `CRITICAL` si l'agent ne peut pas se connecter et collecter les métriques de l'instance Cassandra surveillée. Renvoie `OK` sinon.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][6].

## En apprendre plus

* [Comment monitorer les métriques de performance de Cassandra][7]
* [Comment collecter les métriques de Cassandra][8]
* [Monitorer Cassandra avec Datadog][9]



## Check de l'Agent: Cassandra Nodetool

## Aperçu

Ce check collecte des métriques pour votre cluster Cassandra qui ne sont pas disponibles via [l'intégration JMX] [10].
Il utilise l'utilitaire `nodetool` pour les collecter.

## Implémentation
### Installation

Le check Cassandra nodetool est packagé avec l'agent, il vous faut donc simplement [installer l'agent] [1] sur vos noeuds Cassandra.

### Configuration

Créez un fichier `cassandra_nodetool.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas cassandra_nodetool.yaml][11] pour apprendre toutes les options de configuration disponibles:

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

[Lancez la commande `status`de l'Agent][5] et cherchez `cassandra_nodetool` dans la section Checks:

    Checks
    ======

        cassandra_nodetool
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check `cassandra_nodetool` est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "cassandra_nodetool" >}}


### Evénements
Le check Cassandra_nodetool n'inclut aucun événement pour le moment.

### Checks de Service

**cassandra.nodetool.node_up**:
L'agent envoie ce check de service pour chaque noeud monitoré du cluster. Renvoie CRITICAL si le nœud est en tombé, sinon OK.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][6].

## En apprendre plus

* [Comment monitorer les métriques de performance de Cassandra][7]
* [Comment collecter les métriques de Cassandra][8]
* [Monitorer Cassandra avec Datadog][9]



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/integrations/java/
[3]: https://github.com/DataDog/integrations-core/blob/master/cassandra/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[6]: http://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics/
[8]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics/
[9]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog/
[10]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[11]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/conf.yaml.example
