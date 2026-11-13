---
description: Apprenez à collecter des logs à partir de sujets Kafka à l'aide de l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source Kafka
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Kafka d'Observability Pipelines pour recevoir des logs de vos sujets Kafka. La source Kafka utilise [librdkafka][2].

Vous pouvez également [envoyer des logs Azure Event Hub vers Observability Pipelines en utilisant la source Kafka][6].

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/kafka %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants des serveurs Kafka, du nom d'utilisateur, du mot de passe et, le cas échéant, du mot de passe de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[UI][7], en utilisant l'[API][8] ou avec [Terraform][9]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Kafka dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de vos serveurs Kafka. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez l'identifiant de votre nom d'utilisateur Kafka. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez l'identifiant de votre mot de passe Kafka. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez l'ID de groupe.
1. Saisissez le nom du sujet. S'il y en a plus d'un, cliquez sur {{< ui >}}Add Field{{< /ui >}} pour ajouter des sujets supplémentaires.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres optionnels {#optional-settings}

#### Activer l'authentification SASL {#enable-sasl-authentication}

1. Activez le commutateur pour activer {{< ui >}}SASL Authentication{{< /ui >}}
1. Sélectionnez le mécanisme ({{< ui >}}PLAIN{{< /ui >}}, {{< ui >}}SCHRAM-SHA-256{{< /ui >}} ou {{< ui >}}SCHRAM-SHA-512{{< /ui >}}) dans le menu déroulant.

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Ajouter des options librdkafka supplémentaires {#add-additional-librdkafka-options}

1. Cliquez sur {{< ui >}}Advanced{{< /ui >}} puis sur {{< ui >}}Add Option{{< /ui >}}.
1. Sélectionnez une option dans le menu déroulant.
1. Saisissez une valeur pour cette option.
1. Vérifiez vos valeurs par rapport à la [documentation librdkafka][4] pour vous assurer qu'elles sont du type correct et qu'elles se situent dans la plage définie.
1. Cliquez sur {{< ui >}}Add Option{{< /ui >}} pour ajouter une autre option librdkafka.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant des serveurs bootstrap Kafka :
	- Référence le serveur bootstrap que le client utilise pour se connecter au cluster Kafka et découvrir tous les autres hosts du cluster.
	- Dans votre gestionnaire de secrets, le host et le port doivent être saisis au format `host:port`, tel que `10.14.22.123:9092`. S'il y a plus d'un serveur, utilisez des virgules pour les séparer.
	- L'identifiant par défaut est `SOURCE_KAFKA_BOOTSTRAP_SERVERS`.
- Identifiant du nom d'utilisateur SASL Kafka :
	- L'identifiant par défaut est `SOURCE_KAFKA_SASL_USERNAME`.
- Identifiant du mot de passe SASL Kafka :
	- L'identifiant par défaut est `SOURCE_KAFKA_SASL_PASSWORD`.
- Identifiant de la phrase secrète TLS Kafka (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_KAFKA_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## Options librdkafka {#librdkafka-options}

Voici les options librdkafka disponibles :

- auto.offset.reset
- auto.commit.interval.ms
- client.id
- coordinator.query.interval.ms
- enable.auto.commit
- enable.auto.offset.store
- fetch.max.bytes
- fetch.message.max.bytes
- fetch.min.bytes
- fetch.wait.max.ms
- group.instance.id
- heartbeat.interval.ms
- queued.min.messages
- session.timeout.ms
- socket.timeout.ms

Consultez la [documentation de librdkafka][3] pour plus d'informations et pour vous assurer que vos valeurs sont du type correct et dans la plage autorisée.

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][10] et les [métriques de tampon source][11] émises par toutes les sources, consultez la documentation sur les [métriques d'utilisation des pipelines][12].

### Métriques Kafka {#kafka-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Le tag `component_type` est `kafka` pour ces métriques.

`pipelines.kafka_consumer_lag`
: **Description**: Retard du consommateur Kafka par sujet et par partition. Des valeurs élevées indiquent que la source ne parvient pas à suivre le débit des messages entrants.
: **Type de métrique**: jauge

`pipelines.kafka_consumed_messages_total`
: **Description**: Le nombre de messages que le Worker a consommés depuis les courtiers Kafka.
: **Type de métrique**: count

`pipelines.kafka_consumed_messages_bytes_total`
: **Description**: Le nombre d'octets de messages que le Worker a consommés depuis les courtiers Kafka.
: **Type de métrique**: count

`pipelines.kafka_requests_total`
: **Description**: Le nombre de requêtes que le Worker a envoyées aux courtiers Kafka.
: **Type de métrique** : count

`pipelines.kafka_requests_bytes_total`
: **Description** : Le nombre d'octets que le Worker a envoyés aux courtiers Kafka.
: **Type de métrique** : count

`pipelines.kafka_responses_total`
: **Description** : Le nombre de réponses que le Worker a reçues des courtiers Kafka après y avoir écrit.
: **Type de métrique** : count

`pipelines.kafka_responses_bytes_total`
: **Description** : Le nombre d'octets que le Worker a reçus des courtiers Kafka après y avoir écrit.
: **Type de métrique** : count

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[6]: /fr/observability_pipelines/sources/azure_event_hubs/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /fr/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[12]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/