---
aliases:
- /fr/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application

title: Dépannage et analyse approfondie pour Kafka
---

## Présentation

« La plateforme KafkaTM est utilisée pour créer des pipelines de données en temps réel et des applications de stream processing. En plus d'offrir une évolutivité horizontale, elle est insensible aux pannes, très rapide et utilisée par des milliers d'entreprises. » - [Site officiel de Kafka][1]

Kafka est avant tout un système de courtage de messages puissant et rapide qui permet de transférer une charge utile ou un message de plusieurs applications vers d'autres. Il s'agit d'une application basée sur Java qui expose des métriques via mBeans.

## Composants de Kafka

Kafka comprend quatre composants principaux :

* **Broker** : un cluster de nœuds chargé d'établir les mécanismes d'écriture et de lecture des messages. (Composant principal de Kafka, toujours en Java, habituellement géré par Apache Zookeeper)
* **Producteur** : le ou les applications qui rédigent les messages qui vous intéressent. (Souvent en Java, mais parfois aussi dans d'autres langages)
* **Consommateur** : la ou les applications qui recoivent votre ensemble de messages. (Souvent en Java, mais parfois aussi dans d'autres langages)
* **Topics** : les messageries auxquelles les producteurs et les consommateurs s'abonnent. Lorsque vous écrivez ou lisez un message dans Kafka, indiquez le « topic » qui vous intéresse. On peut imaginer un topic comme un canal Slack : pour écrire et lire des messages dans un canal, vous devez d'abord le rejoindre. Chaque topic dispose d'une liste de références qui vous indique combien de messages vous avez lus et combien il vous reste à lire.

Pour en savoir plus, consultez cette [analyse détaillée de Kafka][2] ainsi que [cet article sur le blog de Datadog][3].

## Intégrations Datadog/Kafka

Il est important de noter que Datadog propose deux intégrations Kafka distinctes. La première se nomme [Kafka][4], et la seconde [Kafka_Consumer][4].

Comme avec nos autres applications basées sur Java, telles que Cassandra, JMX ou Tomcat, l'[intégration Kafka][4] utilise l'application [JMXFetch de Datadog][5] pour récupérer des métriques à l'aide de mBeans. L'équipe d'ingénierie a inclus une liste de mBeans couramment utilisés dans le fichier Kafka.yaml. Cette liste peut être étendue à n'importe quel autre bean choisi par l'utilisateur ou, si votre version de Kafka le prend en charge, des métriques supplémentaires.

L'[intégration Kafka_Consumer][6] recueille des métriques de la même manière que nos checks standard basés sur Python. Elle utilise une API Zookeeper interne. Zookeeper est une application Apache chargée de gérer la configuration du cluster de nœuds qui forme le broker Kafka. (Dans la version 0.9 de Kafka, c'est un peu différent, car vous n'avez plus besoin de Zookeeper. Consultez la section Dépannage pour en savoir plus). Ce check ne récupère que trois métriques, celles-ci ne provenant pas de JMXFetch.

## Dépannage

### Versions antérieures de l'Agent

Ce problème concerne uniquement les versions *< 5.20* de l'[Agent Datadog][7]. Dans les anciennes versions de Kafka, les décalages des consommateurs étaient stockés exclusivement dans Zookeper. Le check Kafka_consumer initial de l'Agent a été écrit lorsque cette limitation était en place. Pour cette raison, vous ne pouvez pas obtenir la métrique `kafka.consumer_lag` si vos décalages sont stockés dans Kafka et que vous utilisez une ancienne version de l'Agent. [Installez la dernière version de l'Agent][8] pour obtenir ces métriques.

### Connexion à l'instance impossible

L'erreur suivante peut s'afficher pour l'intégration Datadog/Kafka :

```text
instance #kafka-localhost-<NUMÉRO_PORT> [ERROR]: 'Cannot connect to instance localhost:<NUMÉRO_PORT>. java.io.IOException: Failed to retrieve RMIServer stub
```

Cette erreur survient lorsque l'Agent Datadog n'arrive pas à se connecter à l'instance Kafka pour récupérer les métriques des mBeans exposés via le protocole RMI. Pour la résoudre, vous pouvez inclure les arguments Java Virtual Machine (JVM) suivants lors du démarrage de l'instance Kafka (requis pour toutes les instances Java distinctes : producteur, consommateur et broker).

```text
-Dcom.sun.management.jmxremote.port=<NUMÉRO_PORT> -Dcom.sun.management.jmxremote.rmi.port=<NUMÉRO_PORT>
```

### Métriques relatives aux producteurs et consommateurs manquantes

Par défaut, Datadog ne recueille que les métriques basées sur le broker.

Pour les producteurs et les consommateurs basés sur Java, ajoutez ce qui suit au fichier `conf.yaml` et mettez à jour les paramètres si nécessaire. Pour connaître toutes les options de configuration disponibles, consultez l'[exemple de fichier kafka.d/conf.yaml][9].
```yaml
- host: remotehost
  port: 9998 # Producer
  tags:
    - kafka: producer0
- host: remotehost
  port: 9997 # Consumer
  tags:
    - kafka: consumer0
```

**Remarque** : cette méthode ne fonctionne pas si vous utilisez des clients producteurs et consommateurs personnalisés écrits dans d'autres langages ou n'exposant pas les mBeans. Pour envoyer vos métriques à partir de votre code, utilisez [DogStatsD][10].

### La partition n'existe pas

Ce problème concerne spécifiquement le check Kafka_Consumer de l'Agent. Si vous spécifiez une partition dans `kafka_consumer.d/conf.yaml` qui n'existe pas dans votre environnement, l'erreur suivante s'affiche :

```text
instance - #0 [Error]: ''
```

Pour la résoudre, indiquez la bonne partition en fonction de votre topic. La ligne concernée est la suivante :

```yaml
#     <NOM_TOPIC_1>: [0, 1, 4, 12]
```

### Limitation des contextes de partition

La collecte des contextes de partition est limitée à 500. Pour recueillir plus de contextes, contactez l'[assistance Datadog][11].

[1]: https://kafka.apache.org
[2]: https://sookocheff.com/post/kafka/kafka-in-a-nutshell
[3]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[4]: /fr/integrations/kafka/
[5]: https://github.com/DataDog/jmxfetch
[6]: /fr/integrations/kafka/#agent-check-kafka-consumer
[7]: /fr/agent/
[8]: /fr/agent/versions/upgrade_to_agent_v6/
[9]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[10]: /fr/developers/dogstatsd/
[11]: /fr/help/
