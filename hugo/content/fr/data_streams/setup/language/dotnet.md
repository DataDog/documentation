---
aliases:
- /fr/data_streams/dotnet
further_reading:
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: Blog
  text: Détecter automatiquement les connecteurs Confluent Cloud et surveiller facilement
    les performances dans Data Streams Monitoring
title: Configurer Data Streams Monitoring pour .NET
---

### Prérequis

* [Agent Datadog v7.34.0 ou version ultérieure][10]

### Bibliothèques compatibles

| Technologies                                                  | Bibliothèque                          | Version minimale du traceur                                                                   | Version recommandée du traceur                                                                   |
|-------------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Kafka                                                       | [Confluent.Kafka][3]             | {{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="minimal" >}}            | {{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="recommended" >}}            |
| RabbitMQ                                                    | [RabbitMQ.Client][4]             | {{< dsm-tracer-version lang="dotnet" lib="rabbitmq-client" type="minimal" >}}            | {{< dsm-tracer-version lang="dotnet" lib="rabbitmq-client" type="recommended" >}}            |
| Amazon SQS                                                  | [Amazon SQS SDK][5]              | {{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="minimal" >}}             | {{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="recommended" >}}             |
| Amazon SNS                                                  | [Amazon SNS SDK][6]              | {{< dsm-tracer-version lang="dotnet" lib="amazon-sns-sdk" type="minimal" >}}             | {{< dsm-tracer-version lang="dotnet" lib="amazon-sns-sdk" type="recommended" >}}             |
| Amazon Kinesis                                              | [Amazon Kinesis SDK][7]          | {{< dsm-tracer-version lang="dotnet" lib="amazon-kinesis-sdk" type="minimal" >}}         | {{< dsm-tracer-version lang="dotnet" lib="amazon-kinesis-sdk" type="recommended" >}}         |
| IBM MQ                                                      | [IBMMQDotnetClient][8]           | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="minimal" >}}          | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="recommended" >}}          |
| Azure Service Bus <br><br> (nécessite une [configuration supplémentaire][9]) | [Azure.Messaging.ServiceBus][10] | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="minimal" >}} | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="recommended" >}} |

### Installation

.NET utilise l'auto-instrumentation pour injecter et extraire les métadonnées supplémentaires requises par Data Streams Monitoring pour mesurer les latences de bout en bout et les relations entre les files d'attente et les services.

{{< tabs >}}
{{% tab ".NET Tracer >= v3.22.0 (Recommended)" %}}

À partir de la version 3.22.0 du traceur .NET, Data Streams Monitoring est activé par défaut. Les applications dotées du traceur APM envoient automatiquement des données de télémétrie DSM, ce qui permet aux équipes d'essayer DSM sans étape d'instrumentation supplémentaire. Si votre organisation dispose d'APM Enterprise, d'APM Pro ou de DSM dans le contrat, les données sont traitées et stockées, activant automatiquement les vues et métriques DSM.

Lorsque `DD_DATA_STREAMS_ENABLED` n'est pas défini :

* Le suivi des schémas est désactivé.
* Data Streams n'est pas activé lors de l'exécution dans un environnement serverless.
* Les informations Data Streams ne sont pas propagées pour certains messages trop petits ou trop grands. Consultez la section [Tailles des messages](#tailles-des-messages) pour en savoir plus.
* Les tailles des messages ne sont pas suivies.

Lorsque `DD_DATA_STREAMS_ENABLED` est défini sur `true` :

* Le suivi des schémas est activé.
* Data Streams est activé pour les environnements serverless.
* Les informations Data Streams sont envoyées pour **tous** les messages.
* Les tailles des messages sont suivies. 

Lorsque `DD_DATA_STREAMS_ENABLED` est défini sur `false`, toutes les fonctionnalités de Data Streams Manager sont désactivées.

Si vous avez des questions concernant le comportement activé par défaut, contactez votre Customer Success Manager.

{{% /tab %}}
{{% tab ".NET Tracer < v3.22.0 (Legacy)" %}}

Pour activer Data Streams Monitoring, définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED` sur `true` sur les services envoyant des messages à vos applications de streaming (ou en consommant).

Exemple :
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

{{% data_streams/monitoring-azure-service-bus %}}

### Surveillance des connecteurs

#### Connecteurs Confluent Cloud
{{% data_streams/dsm-confluent-connectors %}}

### Tailles des messages

Lorsque Data Streams Monitoring est activé en mode par défaut, certains messages ne sont pas instrumentés s'ils sont trop petits ou trop grands.

Les seuils de taille suivants s'appliquent lorsque Data Streams Monitoring est activé en mode par défaut :

- **Kafka**
  - Les messages de moins de 34 octets ne sont pas instrumentés par défaut.

- **RabbitMQ**
  - Les messages de plus de 128 kilo-octets ne sont pas instrumentés par défaut.

- **Amazon Kinesis**
  - Les messages de moins de 34 octets ne sont pas instrumentés par défaut.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[10]: /fr/agent
[3]: https://www.nuget.org/packages/Confluent.Kafka
[4]: https://www.nuget.org/packages/RabbitMQ.Client
[5]: https://www.nuget.org/packages/AWSSDK.SQS
[6]: https://www.nuget.org/packages/AWSSDK.SimpleNotificationService
[7]: https://www.nuget.org/packages/AWSSDK.Kinesis
[8]: https://www.nuget.org/packages/IBMMQDotnetClient
[9]: #monitoring-azure-service-bus
[10]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus
[11]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md#enabling-experimental-tracing-features