---
description: Apprenez à envoyer des logs vers Kafka topics en utilisant l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Kafka
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Kafka d'Observability Pipelines pour envoyer des logs vers Kafka topics.

### Quand utiliser cette destination : {#when-to-use-this-destination}

Scénarios courants où vous pourriez utiliser cette destination :
- Pour acheminer les logs vers les destinations suivantes :
    - [Clickhouse][1] : un système de gestion de base de données orienté colonnes open source utilisé pour analyser de grands volumes de logs.
    - [Snowflake][2] : un entrepôt de données utilisé pour le stockage et les requêtes.
        - L'intégration API de Snowflake utilise Kafka comme méthode pour ingérer des logs dans sa plateforme.
    - [Databricks][3] : un lakehouse de données pour l'analyse et le stockage.
    - [Azure Event Hub][4] : un service d'ingestion et de traitement dans l'écosystème Microsoft et Azure.
- Pour acheminer des données vers Kafka et utiliser l'écosystème Kafka Connect.
- Pour traiter et normaliser vos données avec Observability Pipelines avant de les acheminer vers Apache Spark avec Kafka afin d'analyser les données et d'exécuter des charges de travail d'apprentissage automatique.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants des serveurs bootstrap Kafka et, le cas échéant, le nom d'utilisateur et le mot de passe SASL ainsi que la phrase secrète de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination Kafka lorsque vous [configurez un pipeline][10]. Vous pouvez configurer un pipeline dans le [UI][5], en utilisant l'[API][11] ou avec [Terraform][12]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Kafka dans le [UI] du pipeline :

1. Saisissez l'identifiant de vos serveurs bootstrap Kafka. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez le nom du Kafka topic vers lequel vous souhaitez envoyer les logs.
1. Dans le menu déroulant {{< ui >}}Encoding{{< /ui >}}, sélectionnez {{< ui >}}JSON{{< /ui >}} ou {{< ui >}}Raw message{{< /ui >}} comme format de sortie.

{{< img src="observability_pipelines/destinations/kafka_settings.png" alt="La destination Kafka avec des exemples de valeurs" style="width:30%;" >}}

{{% observability_pipelines/secrets_env_var_note %}}

#### Paramètres facultatifs {#optional-settings}

##### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

##### Activer l'authentification SASL {#enable-sasl-authentication}

1. Actionnez le commutateur pour activer {{< ui >}}SASL Authentication{{< /ui >}}.
1. Saisissez les identifiants de votre nom d'utilisateur et mot de passe Kafka SASL. Si vous les laissez vides, les [valeurs par défaut](#secret-defaults) sont utilisées.
1. Sélectionnez le mécanisme ({{< ui >}}PLAIN{{< /ui >}}, {{< ui >}}SCHRAM-SHA-256{{< /ui >}} ou {{< ui >}}SCHRAM-SHA-512{{< /ui >}}) dans le menu déroulant.

##### Activer la compression {#enable-compression}

1. Actionnez le commutateur pour {{< ui >}}Enable Compression{{< /ui >}}.
1. Dans le menu déroulant {{< ui >}}Compression Algorithm{{< /ui >}}, sélectionnez un algorithme de compression ({{< ui >}}gzip{{< /ui >}}, {{< ui >}}zstd{{< /ui >}}, {{< ui >}}lz4{{< /ui >}} ou {{< ui >}}snappy{{< /ui >}}).
1. (Facultatif) Sélectionnez un {{< ui >}}Compression Level{{< /ui >}} dans le menu déroulant. Si le niveau n'est pas spécifié, le niveau par défaut de l'algorithme est utilisé.

##### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

##### Options avancées {#advanced-options}

Cliquez sur {{< ui >}}Advanced{{< /ui >}} si vous souhaitez définir l'un des champs suivants :

1. {{< ui >}}Message Key Field{{< /ui >}} : Spécifiez quel champ de log contient la clé de message pour le partitionnement, le regroupement et le classement.
1. {{< ui >}}Headers Key{{< /ui >}} : Spécifiez quel champ de log contient vos en-têtes Kafka. S'il est laissé vide, aucun en-tête n'est écrit.
1. {{< ui >}}Message Timeout (ms){{< /ui >}} : Délai d'expiration local du message, en millisecondes. La valeur par défaut est `300,000 ms`.
1. {{< ui >}}Socket Timeout (ms){{< /ui >}} : Délai d'expiration par défaut, en millisecondes, pour les requêtes réseau. La valeur par défaut est `60,000 ms`.
1. {{< ui >}}Rate Limit Events{{< /ui >}} : Le nombre maximal de requêtes que le client Kafka peut envoyer dans la fenêtre temporelle de limitation de débit. La valeur par défaut est aucune limitation de débit.
1. {{< ui >}}Rate Limit Time Window (secs){{< /ui >}} : La fenêtre temporelle utilisée pour l'option de limitation de débit.
    - Ce paramètre n'a aucun effet si la limitation de débit pour les événements n'est pas définie.
    - La valeur par défaut est `1 second` si {{< ui >}}Rate Limit Events{{< /ui >}} est défini, mais que {{< ui >}}Rate Limit Time Window{{< /ui >}} ne l'est pas.
1. Pour ajouter des [options librdkafka](#librdkafka-options) supplémentaires, cliquez sur {{< ui >}}Add Option{{< /ui >}} et sélectionnez une option dans le menu déroulant.
    1. Saisissez une valeur pour cette option.
    1. Vérifiez vos valeurs par rapport à la [documentation librdkafka][7] pour vous assurer qu'elles sont du type correct et dans la plage définie.
    1. Cliquez sur {{< ui >}}Add Option{{< /ui >}} pour ajouter une autre option librdkafka.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant des serveurs bootstrap Kafka :
    - Référence le serveur bootstrap que le client utilise pour se connecter au cluster Kafka et découvrir tous les autres hosts du cluster.
	- Dans votre gestionnaire de secrets, le host et le port doivent être saisis au format `host:port`, tel que `10.14.22.123:9092`. S'il y a plus d'un serveur, utilisez des virgules pour les séparer.
	- L'identifiant par défaut est `DESTINATION_KAFKA_BOOTSTRAP_SERVERS`.
- Identifiant de la phrase secrète TLS Kafka (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_KAFKA_KEY_PASS`.
- Authentification SASL (lorsqu'elle est activée) :
	- Identifiant du nom d'utilisateur SASL Kafka :
		- L'identifiant par défaut est `DESTINATION_KAFKA_SASL_USERNAME`.
	- Identifiant du mot de passe SASL Kafka :
		- L'identifiant par défaut est `DESTINATION_KAFKA_SASL_PASSWORD`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{< img src="observability_pipelines/destinations/kafka_env_var.png" alt="La page d'installation affichant le champ des variables d'environnement Kafka" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## Options librdkafka {#librdkafka-options}

Voici les options librdkafka disponibles :

- client.id
- queue.buffering.max_messages
- transactional.id
- enable.idempotence
- acks

Consultez la [documentation librdkafka][7] pour plus d'informations et pour vous assurer que vos valeurs sont du type correct et dans la plage définie.

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][13] et les [métriques de tampon de destination][14] émises par toutes les destinations, consultez la documentation [Pipelines Usage Metrics][8].

### Métriques Kafka {#kafka-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Le tag `component_type` est `kafka` pour les métriques de destination Kafka.

`pipelines.kafka_produced_messages_total`
: **Description**: Le nombre de messages produits et envoyés aux courtiers Kafka.
: **Type de métrique**: count

`pipelines.kafka_produced_messages_bytes_total`
: **Description**: Le nombre d'octets de messages produits et envoyés aux courtiers Kafka.
: **Type de métrique**: count

`pipelines.kafka_queue_messages`
: **Description**: Nombre actuel de messages dans la file d'attente du producteur librdkafka.
: **Type de métrique**: jauge

`pipelines.kafka_queue_messages_bytes`
: **Description**: Taille totale actuelle, en octets, des messages dans la file d'attente du producteur librdkafka.
: **Type de métrique**: jauge

`pipelines.kafka_requests_total`
: **Description** : Le nombre de requêtes envoyées aux courtiers Kafka.
: **Type de métrique** : count

`pipelines.kafka_requests_bytes_total`
: **Description** : Le nombre d'octets transmis aux courtiers Kafka.
: **Type de métrique** : count

`pipelines.kafka_responses_total`
: **Description** : Le nombre de réponses reçues des courtiers Kafka.
: **Type de métrique** : count

`pipelines.kafka_responses_bytes_total`
: **Description** : Le nombre d'octets reçus des courtiers Kafka.
: **Type de métrique** : count

### Traitement par lots d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][9] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| 10,000         | 1                 | 1                   |

[1]: https://clickhouse.com/docs/engines/table-engines/integrations/kafka
[2]: https://docs.snowflake.com/en/user-guide/kafka-connector
[3]: https://docs.databricks.com/aws/en/connect/streaming/kafka
[4]: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
[5]: https://app.datadoghq.com/observability-pipelines
[7]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /fr/observability_pipelines/destinations/#event-batching
[10]: /fr/observability_pipelines/configuration/set_up_pipelines/
[11]: /fr/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics