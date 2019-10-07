---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cassandra/README.md'
display_name: Cassandra
git_integration_title: cassandra
guid: 03ba454d-425c-4f61-9e9c-54682c3ebce5
integration_id: cassandra
integration_title: Cassandra
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cassandra.
metric_to_check: cassandra.load.count
name: cassandra
process_signatures:
  - java org.apache.cassandra.service.CassandraDaemon
public_title: Intégration Datadog/Cassandra
short_description: 'Surveillez les performances des clusters, leur capacité, leur santé globale, et bien plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![dashboard par défaut de Cassandra][1]

## Présentation

Recueillez des métriques du service Cassandra en temps réel pour :

* Visualiser et surveiller les états de Cassandra
* Être informé des failovers et des événements de Cassandra

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Cassandra est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos nœuds Cassandra.

Nous recommandons l'utilisation du JDK d'Oracle pour cette intégration.

Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information. Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][4] afin d'obtenir des instructions détaillées. Si vous souhaitez surveiller plus de 350 métriques, contactez [l'assistance Datadog][5].

### Configuration

Modifiez le fichier `cassandra.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Cassandra.
Consultez le [fichier d'exemple cassandra.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

La configuration par défaut de votre fichier `cassandra.d/conf.yaml` active la collecte de vos [métriques Cassandra](#metriques).
Consultez le [fichier d'exemple cassandra.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `cassandra.d/conf.yaml` pour commencer à recueillir vos logs Cassandra :

    ```yaml
      logs:
        - type: file
          path: /var/log/cassandra/*.log
          source: cassandra
          sourcecategory: database
          service: myapplication
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple cassandra.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

    Pour vous assurer que les traces de pile sont bien agrégées en un seul log, vous pouvez ajouter une [règle de traitement multiligne][8].

3. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande « status » de l'Agent][10] et cherchez `cassandra` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "cassandra" >}}


### Événements
Le check Cassandra n'inclut aucun événement.

### Checks de service
**cassandra.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance Cassandra qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

* [Comment surveiller les métriques de performance Cassandra][12]
* [Comment recueillir des métriques Cassandra][13]
* [Surveillance de Cassandra avec Datadog][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/integrations/java
[5]: https://docs.datadoghq.com/fr/help
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/logs/log_collection/?tab=tailexistingfiles#multi-line-aggregation
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/cassandra/metadata.csv
[12]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[13]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[14]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog


{{< get-dependencies >}}


## Check de l'Agent : Cassandra Nodetool

![dashboard par défaut de Cassandra][111]

## Présentation

Ce check recueille des métriques pour votre cluster Cassandra qui ne sont pas proposées par l'[intégration jmx][112].
Cette collecte repose sur l'utilitaire `nodetool`.

## Implémentation
### Installation

Le check Cassandra Nodetool est inclus avec le paquet de l'[Agent Datadog][114] : vous n'avez donc rien d'autre à installer sur vos nœuds Cassandra.

### Configuration

Modifiez le fichier `cassandra_nodetool.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][115].
Consultez le [fichier d'exemple cassandra_nodetool.d/conf.yaml][116] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:
  # Commande ou chemin vers nodetool (p. ex., /usr/bin/nodetool ou docker exec container nodetool)
  # Peut être écrasé sur une instance
  # nodetool: /usr/bin/nodetool

instances:

  # La liste des espaces de clés à surveiller
  - keyspaces: []

  # Host auquel nodetool se connectera
  # host: localhost

  # Le port sur lequel JMX effectue son écoute pour identifier les connexions
  # port: 7199

  # Les informations d'identification permettant de se connecter au host. Ces informations sont utilisées par le serveur JMX.
  # Pour que le check fonctionne, cet utilisateur doit posséder un accès en lecture/écriture afin que ce nodetool puisse exécuter la commande `status`.
  # username:
  # password:

  # Indique si le paramètre --ssl doit être utilisé pour nodetool afin d'initier une connexion via SSL vers le serveur JMX.
  # Booléen facultatif. S'il est inclus, il doit avoir pour valeur true ou false.
  # ssl: false

  # La liste des tags supplémentaires à envoyer avec les métriques
  # tags: []
```

### Validation

[Lancez la sous-commande `status` de l'Agent][117] et cherchez `cassandra_nodetool` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "cassandra_nodetool" >}}


### Événements
Le check Cassandra_nodetool n'inclut aucun événement.

### Checks de service

**cassandra.nodetool.node_up**:
L'Agent envoie ce check de service pour chaque nœud du cluster surveillé. Renvoie CRITICAL si le nœud n'est pas disponible. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][119].

## Pour aller plus loin

* [Comment surveiller les métriques de performance Cassandra][120]
* [Comment recueillir des métriques Cassandra][121]
* [Surveillance de Cassandra avec Datadog][122]

[111]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[112]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[114]: https://app.datadoghq.com/account/settings#agent
[115]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[116]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[117]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[118]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/metadata.csv
[119]: https://docs.datadoghq.com/fr/help
[120]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[121]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[122]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog


{{< get-dependencies >}}