---
integration_title: HDFS
is_public: true
kind: integration
short_description: 'Surveillez l''utilisation des disques du cluster, les échecs de volume, les DataNodes morts, etc. more.'
---
## Intégration DataNode HDFS

![Dashboard HDFS][1]

## Présentation

Surveillez l'utilisation du disque et les volumes ayant échoué sur chacun de vos DataNodes HDFS. Ce check de l'Agent recueille des métriques pour ces derniers, ainsi que des métriques liées aux blocs et au cache.

Utilisez ce check (hdfs_datanode) et son check complémentaire (hdfs_namenode), et non l'ancien check deux-en-un (hdfs), désormais obsolète.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check HDFS DataNode est inclus avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos DataNodes.

### Configuration

#### Préparer le DataNode

1. L'Agent recueille des métriques à partir de l'interface distante JMX de DataNode. L'interface est désactivée par défaut. Activez-la en définissant l'option suivante dans `hadoop-env.sh` (qui se trouve généralement dans $HADOOP_HOME/conf) :

   ```conf
   export HADOOP_DATANODE_OPTS="-Dcom.sun.management.jmxremote
     -Dcom.sun.management.jmxremote.authenticate=false
     -Dcom.sun.management.jmxremote.ssl=false
     -Dcom.sun.management.jmxremote.port=50075 $HADOOP_DATANODE_OPTS"
   ```

2. Redémarrez le processus DataNode pour activer l'interface JMX.

#### Associer l'Agent

##<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `hdfs_datanode.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4]. Consultez le [fichier d'exemple hdfs_datanode.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param hdfs_datanode_jmx_uri - string - required
     ## The HDFS DataNode check retrieves metrics from the HDFS DataNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on a HDFS DataNode. The HDFS
     ## DataNode JMX URI is composed of the DataNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.datanode.http.address
     ## https://hadoop.apache.org/docs/r2.7.1/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_datanode_jmx_uri: http://localhost:50075
   ```

2. [Redémarrez l'Agent][6].

<!-- xxz tab xxx -->
<!-- xxx tab "Environnement conteneurisé" xxx -->

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                |
| -------------------- | ---------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `hdfs_datanode`                                      |
| `<CONFIG_INIT>`      | vide ou `{}`                                        |
| `<CONFIG_INSTANCE>`  | `{"hdfs_datanode_jmx_uri": "http://%%host%%:50075"}` |

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans le fichier `datadog.yaml` avec :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `hdfs_datanode.d/conf.yaml` pour commencer à recueillir vos logs DataNode :

    ```yaml
      logs:
        - type: file
          path: /var/log/hadoop-hdfs/*.log
          source: hdfs_datanode
          service: <SERVICE_NAME>
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][6].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `hdfs_datanode` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hdfs_datanode" >}}


### Événements

Le check HDFS DataNode n'inclut aucun événement.

### Checks de service

**hdfs.datanode.jmx.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'interface JMX de DataNode pour une raison quelconque (p. ex, mauvais port fourni, délai d'expiration dépassé, parsing de la réponse JSON impossible).

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

- [Vue d'ensemble de l'architecture Hadoop][9]
- [Comment surveiller des métriques Hadoop][10]
- [Comment recueillir des métriques Hadoop][11]
- [Comment surveiller Hadoop avec Datadog][12]




## Intégration NameNode HDFS

![Dashboard HDFS][13]

## Présentation

Surveillez vos NameNodes HDFS primaires _et_ secondaires pour savoir si votre cluster est en situation précaire, c'est-à-dire s'il ne reste plus qu'un seul NameNode ou si vous devez renforcer les capacités du cluster. Ce check de l'Agent recueille des métriques pour la capacité restante, les blocs corrompus/manquants, les DataNodes morts, la charge du système de fichiers, les blocs sous-répliqués, les échecs de volumes totaux (sur tous les DataNodes), et bien plus encore.

Utilisez ce check (hdfs_namenode) et son check complémentaire (hdfs_datanode), et non l'ancien check deux-en-un (hdfs) qui est obsolète.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check HDFS NameNode est inclus avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos NameNodes.

### Configuration

#### Préparer le NameNode

1. L'Agent recueille des métriques à partir de l'interface distante JMX de NameNode. L'interface est désactivée par défaut. Activez-la en définissant l'option suivante dans `hadoop-env.sh` (qui se trouve généralement dans \$HADOOP_HOME/conf) :

    ```conf
    export HADOOP_NAMENODE_OPTS="-Dcom.sun.management.jmxremote
      -Dcom.sun.management.jmxremote.authenticate=false
      -Dcom.sun.management.jmxremote.ssl=false
      -Dcom.sun.management.jmxremote.port=50070 $HADOOP_NAMENODE_OPTS"
    ```

2. Redémarrez le processus NameNode pour activer l'interface JMX.

#### Associer l'Agent

##<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `hdfs_namenode.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4]. Consultez le [fichier d'exemple hdfs_namenode.d/conf.yaml][14] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param hdfs_namenode_jmx_uri - string - required
     ## The HDFS NameNode check retrieves metrics from the HDFS NameNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on
     ## a HDFS NameNode. The HDFS NameNode JMX URI is composed of the NameNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.namenode.http-address
     ## https://hadoop.apache.org/docs/r2.7.1/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_namenode_jmx_uri: http://localhost:50070
   ```

2. [Redémarrez l'Agent][6].

<!-- xxz tab xxx -->
<!-- xxx tab "Environnement conteneurisé" xxx -->

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                 |
| -------------------- | ----------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `hdfs_namenode`                                       |
| `<CONFIG_INIT>`      | vide ou `{}`                                         |
| `<CONFIG_INSTANCE>`  | `{"hdfs_namenode_jmx_uri": "https://%%host%%:50070"}` |

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans le fichier `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `hdfs_namenode.d/conf.yaml` pour commencer à recueillir vos logs NameNode :

    ```yaml
      logs:
        - type: file
          path: /var/log/hadoop-hdfs/*.log
          source: hdfs_namenode
          service: <SERVICE_NAME>
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][6].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `hdfs_namenode` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hdfs_namenode" >}}


### Événements

Le check HDFS NameNode n'inclut aucun événement.

### Checks de service

**hdfs.namenode.jmx.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'interface JMX de NameNode pour une raison quelconque (p. ex, mauvais port fourni, délai d'expiration dépassé, parsing de la réponse JSON impossible).

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

- [Vue d'ensemble de l'architecture Hadoop][9]
- [Comment surveiller des métriques Hadoop][10]
- [Comment recueillir des métriques Hadoop][11]
- [Comment surveiller Hadoop avec Datadog][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_datanode/images/hadoop_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/datadog_checks/hdfs_datanode/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[10]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[11]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[12]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_namenode/images/hadoop_dashboard.png
[14]: https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/datadog_checks/hdfs_namenode/data/conf.yaml.example