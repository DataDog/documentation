---
aliases:
- /fr/data_streams/troubleshooting
- /fr/data_streams/data_pipeline_lineage
- /fr/data_streams/business_transaction_tracking
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Intégration Kafka
- link: /integrations/amazon_sqs/
  tag: Documentation
  text: Intégration Amazon SQS
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Catalog
- link: https://learn.datadoghq.com/courses/monitor-a-kafka-pipeline-with-dsm
  tag: Centre d'apprentissage
  text: Surveiller un pipeline Kafka avec Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: Blog
  text: Suivez et améliorez les performances de vos pipelines de données en streaming
    avec Datadog Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: Blog
  text: Dépanner des pipelines de diffusion de données directement depuis la solution
    APM avec Datadog Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: Blog
  text: Surveiller SQS avec Data Streams Monitoring
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: Blog
  text: Découvrez automatiquement les connecteurs Confluent Cloud et surveillez facilement
    leurs performances dans Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-observability/
  tag: Blog
  text: Assurez la confiance sur l'ensemble du cycle de vie des données avec Datadog
    Data Observability
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: Blog
  text: 'Surveillance des pipelines de données : notions de base – suivi de l''état
    et des performances dans la pile de données'
- link: https://www.datadoghq.com/blog/kafka-console/
  tag: Blog
  text: Résolvez les problèmes Kafka à chaque couche de votre pile avec Kafka Console.
- link: https://www.datadoghq.com/architecture/monitoring-financial-data-mesh-on-aws-using-datadog/
  tag: Architecture Center
  text: Surveillance d'un Data Mesh financier sur AWS avec Datadog
- link: https://www.datadoghq.com/architecture/observability-in-event-driven-architecture/
  tag: Architecture Center
  text: Observabilité dans les architectures pilotées par les événements
title: Data Streams Monitoring
---
{{< img src="data_streams/map_view2.png" alt="Page Data Streams Monitoring dans Datadog, affichant la vue Carte. Met en évidence un service appelé « authenticator ». Une visualisation cartographique de la topologie du flux de données de gauche à droite, où le service authenticator est affiché au centre avec ses services et files d'attente en amont et en aval." style="width:100%;" >}}

La solution Data Streams Monitoring permet aux équipes d'analyser et de gérer leurs pipelines à grande échelle via un outil centralisé. Vous pourrez ainsi facilement :
* Mesurez la santé du pipeline grâce aux latences de bout en bout pour les événements traversant votre système.
* Identifiez les producteurs, consommateurs ou files d'attente défectueux, puis basculez vers les logs ou clusters associés pour résoudre les problèmes plus rapidement.
* Évitez les retards en cascade en permettant aux responsables de services d'empêcher les événements en attente de saturer les services en aval.

### Langages et technologies pris en charge {#supported-languages-and-technologies}

Data Streams Monitoring instrumente les _clients_ Kafka (consommateurs/producteurs). Si vous pouvez instrumenter votre infrastructure client, vous pouvez utiliser Data Streams Monitoring.

|   | Java | Python | .NET | Node.js | Go | Ruby |
| - | ---- | ------ | ---- | ------- | -- | ---- |
| Apache Kafka <br/>(auto-hébergé, Amazon MSK, Confluent Cloud ou toute autre plateforme d'hébergement) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Amazon Kinesis | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SNS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SQS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Azure Service Bus | | | {{< X >}} | | | |
| Google Pub/Sub | {{< X >}} | {{< X >}} | | {{< X >}} | | |
| IBM MQ | {{< X >}} | | {{< X >}} | | | |
| RabbitMQ | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |

Data Streams Monitoring nécessite des versions minimales du SDK Datadog. Consultez chaque page de configuration pour plus de détails.

#### Prise en charge d'OpenTelemetry {#support-for-opentelemetry}
Data Streams Monitoring prend en charge OpenTelemetry. Si vous avez configuré Datadog APM pour fonctionner avec OpenTelemetry, aucune configuration supplémentaire n'est requise pour utiliser Data Streams Monitoring. Consultez [Compatibilité OpenTelemetry][11].

## Configuration {#setup}

### Par langage {#by-language}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/data_streams/java/" src="integrations_logos/java.png" alt="java" >}}
  {{< image-card href="/data_streams/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/data_streams/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/data_streams/nodejs/" src="integrations_logos/node.png" alt="Node" >}}
  {{< image-card href="/data_streams/go" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/data_streams/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}


### Par technologie {#by-technology}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/data_streams/setup/technologies/kafka/" src="integrations_logos/kafka.png" alt="Kafka" >}}
  {{< image-card href="/data_streams/setup/technologies/sqs/" src="integrations_logos/sqs.png" alt="Amazon SQS" >}}
  {{< image-card href="/data_streams/setup/technologies/rabbitmq/" src="integrations_logos/rabbitmq.png" alt="RabbitMQ" >}}
  {{< image-card href="/data_streams/setup/technologies/sns/" src="integrations_logos/amazon_sns.png" alt="Amazon SNS" >}}
  {{< image-card href="/data_streams/setup/technologies/kinesis/" src="integrations_logos/amazon_kinesis.png" alt="Kinesis" >}}
  {{< image-card href="/data_streams/setup/technologies/google_pubsub/" src="integrations_logos/google_cloud_pubsub.png" alt="Google Cloud Pub/Sub" >}}
  {{< image-card href="/data_streams/setup/technologies/ibm_mq/" src="integrations_logos/ibm_mq.png" alt="IBM MQ" >}}
  {{< image-card href="/data_streams/setup/technologies/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="Azure Service Bus" >}}
  {{< image-card href="/data_streams/setup/technologies/bullmq/" src="integrations_logos/bullmq2.png" alt="BullMQ" >}}
{{< /card-grid >}}

## Explorer Data Streams Monitoring {#explore-data-streams-monitoring}

### Visualisez l'architecture de vos pipelines de données de streaming {#visualize-the-architecture-of-your-streaming-data-pipelines}

{{< img src="data_streams/topology_map.png" alt="Une visualisation cartographique de la topologie DSM. " style="width:100%;" >}}

Data Streams Monitoring fournit une [carte de topologie][10] prête à l'emploi, afin que vous puissiez visualiser le flux de données à travers vos pipelines et identifier les services producteurs/consommateurs, les dépendances de file d'attente, la propriété des services et les métriques de santé clés.

### Mesurez la santé du pipeline de bout en bout avec de nouvelles métriques {#measure-end-to-end-pipeline-health-with-new-metrics}

Avec Data Streams Monitoring, vous pouvez mesurer le temps qu'il faut habituellement aux événements pour transiter entre deux points quelconques de votre système asynchrone :

| Nom de la métrique | Tags notables | Description |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | Latence de bout en bout d'un chemin depuis une source spécifiée jusqu'au service de destination. |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | Retard en secondes entre le producteur et le consommateur. Nécessite l'Agent Java v1.9.0 ou une version ultérieure. |
| data_streams.payload_size | `consumer_group`, `topic`, `env` | Débit entrant et sortant en octets.|


Vous pouvez également représenter graphiquement et visualiser ces métriques sur n'importe quel dashboard ou notebook :

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Monitor Datadog Data Streams Monitoring" style="width:100%;" >}}

### Surveillez la latence de bout en bout de n'importe quel chemin {#monitor-end-to-end-latency-of-any-pathway}

Selon la manière dont les événements traversent votre système, différents chemins peuvent entraîner une latence accrue : Avec l'onglet [{{< ui >}}Measure{{< /ui >}}][7], vous pouvez sélectionner un service de début et un service de fin pour obtenir des informations sur la latence de bout en bout afin d'identifier les goulots d'étranglement et d'optimiser les performances. Créez facilement un monitor pour ce chemin, ou exportez-le vers un dashboard.

Alternativement, cliquez sur un service pour ouvrir un panneau latéral détaillé et afficher l'onglet {{< ui >}}Pathways{{< /ui >}} pour la latence entre le service et les services en amont.

### Alertez sur les ralentissements dans les applications pilotées par les événements {#alert-on-slowdowns-in-event-driven-applications}

Les ralentissements causés par un retard important des consommateurs ou des messages obsolètes peuvent entraîner des défaillances en cascade et augmenter le downtime. Grâce aux alertes prêtes à l'emploi, vous pouvez identifier où se produisent les goulots d'étranglement dans vos pipelines et y répondre immédiatement. Pour des métriques supplémentaires, Datadog fournit des intégrations additionnelles pour les technologies de file d'attente de messages comme [Kafka][4] et [SQS][5].

Grâce aux modèles de monitors prêts à l'emploi de Data Streams Monitoring, vous pouvez configurer des monitors sur des métriques telles que le retard des consommateurs, le débit et la latence en un seul clic.

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Modèles de monitors Datadog Data Streams Monitoring" style="width:100%;" caption="Cliquez sur « Add Monitors and Synthetic Tests » pour afficher les modèles de monitors" >}}

### Attribuez les messages entrants à n'importe quelle file d'attente, service ou cluster {#attribute-incoming-messages-to-any-queue-service-or-cluster}

Un délai important sur un service consommateur, une utilisation accrue des ressources sur un broker Kafka ou une augmentation de la taille d'une file d'attente RabbitMQ ou Amazon SQS s'explique souvent par des changements dans la manière dont les services adjacents produisent ou consomment auprès de ces entités.

Cliquez sur l'onglet {{< ui >}}Throughput{{< /ui >}} de n'importe quel service ou file d'attente dans Data Streams Monitoring pour détecter rapidement les changements de débit et identifier le service amont ou aval à l'origine de ces changements. Une fois le [Catalogue][2] configuré, vous pouvez immédiatement basculer vers le canal Slack ou l'ingénieur d'astreinte de l'équipe correspondante.

En affichant les données propres à un certain cluster Kafka, RabbitMQ ou Amazon SQS, vous pouvez détecter les variations du trafic entrant ou sortant pour l'ensemble des sujets ou files d'attente détectés sur le cluster en question :

### Passez rapidement à l'identification des causes profondes dans l'infrastructure, les logs ou les traces {#quickly-pivot-to-identify-root-causes-in-infrastructure-logs-or-traces}

Datadog lie automatiquement l'infrastructure alimentant vos services et les logs associés via le [Unified Service Tagging][3], afin que vous puissiez facilement localiser les goulots d'étranglement. Cliquez sur les onglets {{< ui >}}Infra{{< /ui >}}, {{< ui >}}Logs{{< /ui >}} ou {{< ui >}}Traces{{< /ui >}} pour approfondir le dépannage des raisons pour lesquelles la latence du chemin ou le retard du consommateur a augmenté.

### Surveillez le débit et le statut du connecteur {#monitor-connector-throughput-and-status}
{{< img src="data_streams/connectors_topology.png" alt="Une carte de topologie DSM, montrant un connecteur appelé « analytics-sink ». La visualisation indique que le connecteur a un statut FAILED (ÉCHEC)." style="width:100%;" >}}

Datadog peut détecter automatiquement vos connecteurs [Confluent Cloud][8] gérés et les visualiser dans la carte de topologie de Data Streams Monitoring. Installez et configurez l'[intégration Confluent Cloud][9] pour collecter des informations à partir de vos connecteurs Confluent Cloud, notamment le débit, le statut et les dépendances de topics.

## Dépannage {#troubleshooting}

### La métrique de latence de bout en bout ne semble pas exacte {#end-to-end-latency-metric-doesnt-look-accurate}

Les calculs de latence pour un chemin nécessitent un traitement des messages sur un seul thread. Si les messages de votre pipeline utilisent plusieurs threads, ajoutez une instrumentation manuelle. L'instrumentation manuelle est disponible pour les applications [Go][12] et [Java][13]. Pour les autres langages, consultez le [guide d'instrumentation manuelle][14]. Pour l'instrumentation manuelle .NET, contactez le [support][15].

Dans l'onglet Pathways, le message **les valeurs de latence peuvent être approximatives pour ces chemins** s'affiche pour les chemins qui nécessitent une instrumentation manuelle pour obtenir des valeurs de latence précises.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_streams/go#manual-instrumentation
[2]: /fr/internal_developer_portal/catalog/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/integrations/kafka/
[5]: /fr/integrations/amazon_sqs/
[6]: /fr/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure
[8]: https://www.confluent.io/confluent-cloud/
[9]: /fr/integrations/confluent_cloud/
[10]: https://app.datadoghq.com/data-streams/map
[11]: /fr/opentelemetry/compatibility
[12]: /fr/data_streams/go#manual-instrumentation
[13]: /fr/data_streams/java#manual-instrumentation
[14]: /fr/data_streams/manual_instrumentation/
[15]: /fr/help/