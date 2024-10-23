---
description: Dépanner Data Streams Monitoring
title: Dépannage de Data Streams Monitoring
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}


Cette page explique les problèmes courants liés à la configuration et à l'utilisation de Data Streams Monitoring, ainsi que la manière de les résoudre. Datadog recommande de toujours installer la dernière version des bibliothèques de tracing Datadog que vous utilisez, car chaque version contient des améliorations et des correctifs.

## Diagnostiquer les problèmes courants
### Les services n'apparaissent pas dans la carte DSM

Si vous ne voyez pas vos services dans la carte ou la page d'aperçu de DSM après avoir suivi les [instructions d'installation][1], assurez-vous que les conditions suivantes sont remplies : 
* Vous utilisez lʼAgent Datadog v7.34.0 ou une version ultérieure.
* Votre service produit ou consomme directement à partir de Kafka ou RabbitMQ.
* Vous utilisez les versions suivantes des bibliothèque de tracing de lʼAgent :
   * Java : Agent v1.9.0 ou version ultérieure
   * NET : Tracer v2.28.0 ou version ultérieure (.NET Core, .NET Framework)
   * Go (instrumentation manuelle) : Bibliothèque Data Streams v0.2 ou version ultérieure


### La métrique de latence de bout en bout ne semble pas exacte

Les calculs de latence sur un chemin exigent que les messages traversant le chemin soient monothreadés. Si les messages de vos pipelines de données sont multithreadés, une instrumentation manuelle est nécessaire. Celle-ci est actuellement disponible pour les [applications Go][2] et les [applicationsJava][3]. Si vous avez besoin d'une instrumentation manuelle pour .NET, contactez [lʼassistance][8].

Dans lʼonglet Pathways, si vous voyez le message **latency values may be approximate for these pathways**, consultez la documentation sur les [directives en matière d'instrumentation][4].


### Les métriques Kafka ne sont pas disponibles
Si votre application est exécutée dans Java, assurez-vous que vous utilisez la version v1.9.0 ou une version ultérieure de lʼAgent Java, et que les services de producteur et de consommateur sont instrumentés.

Si vos applications sont exécutées en .NET ou Go, [lʼintégration Kafka Consumer][5] est nécessaire pour que les métriques Kafka soient ajoutées.

### Les métriques RabbitMQ ne sont pas disponibles
Assurez-vous que [lʼintégration RabbitMQ][6] est correctement configurée.

### Les métriques de file dʼattente ne sont pas disponibles
[Lʼintégration Kafka][7] doit être configurée pour l'auto-hébergement, MSK et les environnements Confluent Platform/Cloud pour que les métriques sʼajoutent à lʼonglet Queue.

### Le tag de cluster nʼapparaît pas
Le tag de cluster est paramétré différemment en fonction de lʼenvironnement : 
* Kafka auto-hébergé : Le tag `kafka_cluster` doit être ajouté à la configuration de votre Agent exécuté dans le même cluster que vos brokers Kafka, avec la clé définie sur `kafka_cluster` et la valeur définie sur le nom de votre cluster.
* Amazon MSK : Les informations du cluster sont automatiquement propagées dans DSM si [lʼintégration MSK][9] est activée. MSK envoie le cluster à DSM en tant que `cluster_name`.
* Confluent Cloud : Les informations du cluster sont automatiquement propagées dans DSM si [lʼintégration Confluent Cloud][10] est configurée sur le cluster que vous avez instrumenté avec DSM. 
* Confluent Platform : Comme pour Kafka auto-hébergé ci-dessus, le tag `kafka_cluster` doit être ajouté à la configuration de votre Agent. 

[1]: /fr/data_streams/#setup  
[2]: /fr/data_streams/go/
[3]: https://github.com/DataDog/dd-trace-java/blob/76f25aedf70254cb04d55eedbed6e12921c6e509/dd-trace-api/src/main/java/datadog/trace/api/experimental/DataStreamsCheckpointer.java#L25
[4]: /fr/data_streams/#setup
[5]: /fr/integrations/kafka/?tab=host#kafka-consumer-integration
[6]: /fr/integrations/rabbitmq/?tab=host
[7]: /fr/integrations/kafka/?tab=host
[8]: /fr/help/
[9]: https://docs.datadoghq.com/fr/integrations/amazon_msk/ 
[10]: https://docs.datadoghq.com/fr/integrations/confluent_cloud/