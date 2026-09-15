---
description: Apprenez à collecter des logs depuis Amazon S3 à l'aide de l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source Amazon S3
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Amazon S3 d'Observability Pipelines pour recevoir des logs depuis Amazon S3.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/amazon_s3 %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'URL Amazon S3 et, le cas échéant, de la phrase secrète de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans le [UI][3], en utilisant l'[API][4] ou avec [Terraform][5]. Les instructions de cette section concernent la configuration de la source dans l'IU.

Après avoir sélectionné la source Amazon S3 dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre URL Amazon S3. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez la région AWS.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres optionnels {#optional-settings}

#### Authentification AWS {#aws-authentication}

Sélectionnez une option {{< ui >}}AWS authentication{{< /ui >}} . Si vous sélectionnez {{< ui >}}Assume role{{< /ui >}} :
1. Saisissez l'ARN du rôle IAM que vous souhaitez assumer.
1. Facultativement, saisissez le nom de session du rôle assumé et l'ID externe.

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL Amazon S3 :
	- Fait référence à l'URL de la file d'attente SQS vers laquelle le compartiment S3 envoie les événements de notification.
	- L'identifiant par défaut est `SOURCE_AWS_S3_SQS_URL`.
- Identifiant de la phrase secrète TLS Amazon S3 (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_AWS_S3_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Authentification AWS {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

### Autorisations{#permissions}

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][6] et les [métriques de tampon de source][7] émises par toutes les sources, consultez la documentation sur les [Métriques d'utilisation des pipelines][8]. Pour filtrer ou regrouper par métriques de source Amazon S3, utilisez le tag `component_type:aws_s3`.

### Métriques Amazon S3 {#amazon-s3-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Utilisez le tag `component_type` pour filtrer ou regrouper par type de source.

`pipelines.sqs_message_received_messages_total`
: **Description**: Le nombre de messages SQS reçus.
: **Type de métrique**: count

`pipelines.sqs_message_processing_succeeded_total`
: **Description**: Le nombre de messages SQS traités avec succès.
: **Type de métrique**: count

`pipelines.sqs_message_delete_succeeded_total`
: **Description**: Le nombre de suppressions réussies de messages SQS.
: **Type de métrique**: count

`pipelines.sqs_message_defer_succeeded_total`
: **Description**: Le nombre de messages SQS pour lesquels le report du délai de visibilité a réussi.
: **Type de métrique** : count

`pipelines.sqs_s3_event_record_ignored_total`
: **Description** : Le nombre d'enregistrements d'événements S3 dans un message SQS qui ont été ignorés car il ne s'agissait pas de types d'événements `ObjectCreated`.
: **Type de métrique** : count

`pipelines.s3_object_processing_succeeded_duration_seconds`
: **Description** : Temps, en secondes, nécessaire pour traiter avec succès un objet S3.
: **Type de métrique** : distribution

`pipelines.s3_object_processing_failed_duration_seconds`
: **Description** : Temps, en secondes, nécessaire pour traiter un objet S3 ayant échoué.
: **Type de métrique** : distribution

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/