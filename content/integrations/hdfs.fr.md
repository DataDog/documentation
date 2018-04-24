---
integration_title: Hdfs
is_public: true
kind: integration
short_description: Suivre l'utilisation des disques du cluster, les échecs de volume, les DataNodes morts et
  more.
---


## Intégration HDFS DataNode

## Aperçu

Suivre l'utilisation du disque et les volumes ayant échoué sur chacun de vos DataNodes HDFS. Ce check d'agent collecte les métriques pour ces derniers, ainsi que les métriques liées aux blocs et au cache.

Utilisez ce check (hdfs_datanode) et son check complémentaire (hdfs_namenode), et non l'ancienne vérification deux-en-un (hdfs); ce check est en effet obsolète.

## Implémentation
### Installation

Le check HDFS DataNode est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos DataNodes.

### Configuration
#### Préparer le DataNode

L'agent collecte les métriques à partir de l'interface distante JMX de DataNode. L'interface est désactivée par défaut,  activez-la en définissant l'option suivante dans `hadoop-env.sh` (généralement trouvé dans $HADOOP_HOME/conf):

```
export HADOOP_DATANODE_OPTS="-Dcom.sun.management.jmxremote
  -Dcom.sun.management.jmxremote.authenticate=false
  -Dcom.sun.management.jmxremote.ssl=false
  -Dcom.sun.management.jmxremote.port=50075 $HADOOP_DATANODE_OPTS"
```

Redémarrez le processus DataNode pour activer l'interface JMX.

#### Connectez l'Agent

Créez un fichier `hdfs_datanode.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas hdfs_datanode.yaml](https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - hdfs_datanode_jmx_uri: http://localhost:50075
```

[Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques DataNode à Datadog

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `hdfs_datanode` dans la section Checks:

```
  Checks
  ======
    [...]

    hdfs_datanode
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Le check hdfs_datanode est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "hdfs_datanode" >}}


### Évènements
Le check HDFS-datanode n'inclut aucun événement pour le moment.

### Checks de Service

`hdfs.datanode.jmx.can_connect`:

Renvoie `Critical` si l'agent ne peut pas se connecter à l'interface JMX de DataNode's pour une raison quelconque. Renvoie `OK` sinon.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Vue d'ensemble de l'architecture Hadoop](https://www.datadoghq.com/blog/hadoop-architecture-overview/)
* [Comment monitorer les métriques Hadoop](https://www.datadoghq.com/blog/monitor-hadoop-metrics/)
* [Comment collecter les métriques de Hadoop](https://www.datadoghq.com/blog/collecting-hadoop-metrics/)
* [Comment monitorer Hadoop avec Datadog](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog/)



## Intégration HDFS NameNode

## Aperçu

Surveillez vos nœuds primaires et secondaires HDFS NameNode pour savoir si votre cluster tombe dans un état précaire: quand il ne reste plus qu'un seul NameNode, ou quand il est temps d'ajouter plus de capacité au cluster. Ce check de l'Agent collecte les métriques pour la capacité restante, les blocs corrompus/manquants, les DataNodes morts, la charge du système de fichiers, les blocs sous-répliqués, les échecs de volumes totaux (sur tous les DataNodes) et bien d'autres métriques.

Utilisez ce check (hdfs_namenode) et son check complémentaire (hdfs_datanode), et non l'ancienne vérification deux-en-un (hdfs); ce check est en effet obsolète.

## Implémentation
### Installation

Le check HDFS NameNode est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos NameNode.

### Configuration
#### Préparer le NameNode

L'agent collecte les métriques à partir de l'interface distante JMX de NameNode's. L'interface est désactivée par défaut,  activez-la en définissant l'option suivante dans `hadoop-env.sh` (généralement trouvé dans $HADOOP_HOME/conf):

```
export HADOOP_NAMENODE_OPTS="-Dcom.sun.management.jmxremote
  -Dcom.sun.management.jmxremote.authenticate=false
  -Dcom.sun.management.jmxremote.ssl=false
  -Dcom.sun.management.jmxremote.port=50070 $HADOOP_NAMENODE_OPTS"
```

Redémarrez le processus NameNode pour activer l'interface JMX.

#### Connectez l'Agent

Créez un fichier `hdfs_namenode.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas hdfs_namenode.yaml](https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - hdfs_namenode_jmx_uri: http://localhost:50070
```

[Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques NameNode à Datadog.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `hdfs_namenode` dans la section Checks:

```
  Checks
  ======
    [...]

    hdfs_namenode
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Le check hdfs_namenode est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "hdfs_namenode" >}}


### Évènements
Le check HDFS-namenode n'inclut aucun événement pour le moment.

### Checks de Service

`hdfs.namenode.jmx.can_connect`:

Renvoie `Critical` si l'agent ne peut pas se connecter à l'interface JMX de NameNode pour une raison quelconque. Renvoie `OK` sinon.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Vue d'ensemble de l'architecture Hadoop](https://www.datadoghq.com/blog/hadoop-architecture-overview/)
* [Comment monitorer les métriques Hadoop](https://www.datadoghq.com/blog/monitor-hadoop-metrics/)
* [Comment collecter les métriques de Hadoop](https://www.datadoghq.com/blog/collecting-hadoop-metrics/)
* [Comment monitorer Hadoop avec Datadog](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog/)

