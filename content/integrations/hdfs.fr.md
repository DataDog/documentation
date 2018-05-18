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

Le check HDFS DataNode est fourni avec l'Agent; il vous suffit donc d'[installer l'Agent][101] sur vos DataNodes.

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

Modifiez le fichier `hdfs_datanode.d/conf.yaml` dans le dossier `conf.d/`, à la racine du répertoire de l'Agent. Consultez le [fichier d'exemple hdfs_datanode.d/conf.yaml][102] pour découvrir toutes les options de configuration disponibles:

```
init_config:

instances:
  - hdfs_datanode_jmx_uri: http://localhost:50075
```

[Redémarrez l'Agent][103] pour commencer à envoyer vos métriques DataNode à Datadog.

### Validation

[Exécutez le sous-commande `status` de l'Agent][104] et cherchez  `hdfs_datanode` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "hdfs_datanode" >}}


### Évènements
Le check HDFS-datanode n'inclut aucun événement pour le moment.

### Checks de Service

`hdfs.datanode.jmx.can_connect`:

Renvoie `Critical` si l'agent ne peut pas se connecter à l'interface JMX de DataNode's pour une raison quelconque. Renvoie `OK` sinon.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][106].

## En apprendre plus

* [Vue d'ensemble de l'architecture Hadoop][107]
* [Comment monitorer les métriques Hadoop][108]
* [Comment collecter les métriques de Hadoop][109]
* [Comment monitorer Hadoop avec Datadog][1010]


[101]: https://app.datadoghq.com/account/settings#agent
[102]: https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/conf.yaml.example
[103]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[104]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[105]: https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/metadata.csv
[106]: http://docs.datadoghq.com/help/
[107]: https://www.datadoghq.com/blog/hadoop-architecture-overview/
[108]: https://www.datadoghq.com/blog/monitor-hadoop-metrics/
[109]: https://www.datadoghq.com/blog/collecting-hadoop-metrics/
[1010]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog/



## Intégration HDFS NameNode

## Aperçu

Surveillez vos nœuds primaires et secondaires HDFS NameNode pour savoir si votre cluster tombe dans un état précaire: quand il ne reste plus qu'un seul NameNode, ou quand il est temps d'ajouter plus de capacité au cluster. Ce check de l'Agent collecte les métriques pour la capacité restante, les blocs corrompus/manquants, les DataNodes morts, la charge du système de fichiers, les blocs sous-répliqués, les échecs de volumes totaux (sur tous les DataNodes) et bien d'autres métriques.

Utilisez ce check (hdfs_namenode) et son check complémentaire (hdfs_datanode), et non l'ancienne vérification deux-en-un (hdfs); ce check est en effet obsolète.

## Implémentation
### Installation

Le check HDFS NameNode est fourni avec l'Agent; il vous suffit donc d'[installer l'Agent][101] sur vos NameNode.

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

Modifiez le fichier `hdfs_namenode.d/conf.yaml` dans le dossier `conf.d/`, à la racine du répertoire de l'Agent. Consultez le [fichier d'exemple hdfs_namenode.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles:

```
init_config:

instances:
  - hdfs_namenode_jmx_uri: http://localhost:50070
```

[Redémarrez l'Agent][3] pour commencer à envoyer vos métriques NameNode à Datadog.

### Validation

[Exécutez le sous-commande `status` de l'Agent][4] et cherchez `hdfs_namenode` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "hdfs_namenode" >}}


### Évènements
Le check HDFS-namenode n'inclut aucun événement pour le moment.

### Checks de Service

`hdfs.namenode.jmx.can_connect`:

Renvoie `Critical` si l'agent ne peut pas se connecter à l'interface JMX de NameNode pour une raison quelconque. Renvoie `OK` sinon.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][6].

## En apprendre plus

* [Vue d'ensemble de l'architecture Hadoop][7]
* [Comment monitorer les métriques Hadoop][8]
* [Comment collecter les métriques de Hadoop][9]
* [Comment monitorer Hadoop avec Datadog][10]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/metadata.csv
[6]: http://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/hadoop-architecture-overview/
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics/
[9]: https://www.datadoghq.com/blog/collecting-hadoop-metrics/
[10]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog/

