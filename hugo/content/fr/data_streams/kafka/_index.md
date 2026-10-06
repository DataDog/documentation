---
aliases:
- /fr/data_streams/live_messages
- /fr/data_streams/messages
- /fr/data_streams/kafka/messages
description: Surveillez l'état de santé du cluster Kafka, connectez des services aux
  topics et inspectez les schémas et les messages avec Kafka Console.
further_reading:
- link: https://www.datadoghq.com/blog/kafka-console/
  tag: Blog
  text: Résolvez les problèmes Kafka à chaque couche de votre pile avec Kafka Console.
title: Kafka Console
---
Avec Kafka Console de Data Streams Monitoring, un check du Datadog Agent se connecte à votre cluster Kafka et commence à collecter des métriques de santé et de performance. Kafka Console vous permet de :

- **Surveiller l'état de santé de Kafka** : visualisez l'état de santé du cluster, du broker, du topic et de la partition avec des métriques de débit, de retard et de réplication.
- **Identifier la cause première** : corrélez les changements de configuration et de schéma avec le retard, le débit et les erreurs, et tracez les problèmes jusqu'au topic, à la version de schéma ou au changement de configuration exact.
- **Connecter des services aux topics** : voyez quels producteurs et consommateurs interagissent avec chaque topic, avec des propriétaires, des dépôts, des rotations d'astreinte, des traces et des logs d'erreurs liés.
- **Inspecter les schémas et les messages des topics** : affichez les schémas, comparez les versions et accédez aux messages pour déboguer des charges utiles problématiques ou explorer le topic.
- **Alertez et automatisez les réponses** : utilisez les [modèles de monitor recommandés][4] et déclenchez Workflow Automation ou des webhooks lorsqu'une condition Kafka se déclenche.

Pour commencer, consultez [Kafka Console Setup][2].

## Workflows {#workflows}

### Surveillez l'état de santé et les performances du cluster {#monitor-cluster-health-and-performance}

Les onglets {{< ui >}}Clusters{{< /ui >}}, {{< ui >}}Topics{{< /ui >}} et {{< ui >}}Brokers{{< /ui >}} affichent l'état de santé de l'ensemble de votre infrastructure Kafka. Pour chaque topic, vous pouvez voir le nombre de partitions, les partitions sous-répliquées et hors ligne, le débit des messages et le retard des consommateurs.

{{< img src="data_streams/kafka_clusters_overview-2.png" alt="La vue des clusters de Kafka Console affichant la liste des clusters avec le nombre de brokers, les noms des topics, le statut de réplication et le taux de messages entrants." >}}

Cliquez sur n'importe quel topic pour voir un résumé détaillé, incluant le taux de messages entrants, le retard maximal sur toutes les partitions et si le retard actuel approche de la limite de rétention.

{{< img src="data_streams/kafka_topic_summary-2.png" alt="Page de résumé des détails du topic affichant un taux de messages entrants de 0,8 msg/sec, un retard actuel de 1,15 seconde et le statut du retard par rapport à la rétention." >}}

À partir de n'importe quelle métrique, vous pouvez créer des monitors, des SLO et des dashboards Datadog.

### Corrélez les changements de configuration et de schéma avec les métriques de santé {#correlate-configuration-and-schema-changes-with-health-metrics}

Les événements de changement sont superposés directement sur les graphiques de débit et de retard, afin que vous puissiez voir si un changement de configuration ou de schéma a coïncidé avec une dégradation.

{{< img src="data_streams/kafka_topics_lag_change-2.png" alt="Vue des topics avec une annotation de changement topic_config à 17:02:42 superposée sur le graphique de retard par topic, montrant un pic corrélé à l'événement de changement." >}}

Pour identifier exactement ce qui a changé, cliquez sur les changements détectés sur la superposition et sélectionnez {{< ui >}}View config change{{< /ui >}}. 

{{< img src="data_streams/lag-by-topic-overlay.png" alt="Vue de comparaison de la configuration du topic entre les versions 625 et 626, avec max.message.bytes modifié de 1000012 à 1024 mis en évidence." >}}

### Connectez les services producteurs et consommateurs aux topics {#connect-producer-and-consumer-services-to-topics}

Les sections {{< ui >}}Producers{{< /ui >}} et {{< ui >}}Consumers{{< /ui >}} de chaque topic indiquent quels services lisent et écrivent dans ce topic. Le survol d'un service affiche les informations de propriété du Service Catalog : équipe, dépôt de code, ingénieur d'astreinte et canal Slack.

{{< img src="data_streams/kafka_topic_service_ownership.png" alt="Vue des producteurs et consommateurs de topics avec un panneau de service ouvert montrant l'équipe propriétaire (Frameworks), le dépôt de code, l'ingénieur d'astreinte, le canal Slack et l'état de santé." >}}

Utilisez ces informations pour contacter la bonne équipe lorsqu'un consommateur est en retard ou qu'un producteur se comporte mal.

### Inspectez les schémas et les messages des topics {#inspect-topic-schemas-and-messages}

La section {{< ui >}}Schema{{< /ui >}} affiche le schéma actuel pour la clé ou la valeur d'un topic, avec l'historique des versions. Utilisez le sélecteur de version pour comparer les schémas entre les versions.

La section {{< ui >}}Messages{{< /ui >}} vous permet de récupérer des messages par partition et offset pour inspecter directement les charges utiles. Ceci est utile pour déboguer des charges utiles problématiques ou vérifier la structure des messages après un changement de schéma. Consultez [Enable message inspection][3] pour connaître les prérequis et autorisations supplémentaires nécessaires pour récupérer les messages.

{{< img src="data_streams/kafka_schema_messages.png" alt="Vue du schéma et des messages du topic montrant une définition de schéma Protobuf et un tableau des messages récents avec la date, la partition, l'offset et la valeur du message." >}}

[2]: /fr/data_streams/kafka/setup/
[3]: /fr/data_streams/kafka/setup/#enable-message-inspection
[4]: /fr/data_streams/kafka/monitors_and_automation/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}