---
description: Apprenez à collecter des logs depuis Amazon Data Firehose à l'aide de
  l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source Amazon Data Firehose
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Amazon Data Firehose d'Observability Pipelines pour recevoir des logs depuis Amazon Data Firehose.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'adresse Amazon Data Firehose et, le cas échéant, de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans le [UI][3], en utilisant l'[API][4] ou avec [Terraform][5]. Les instructions de cette section concernent la configuration de la source dans l'IU.

Après avoir sélectionné la source Amazon Data Firehose dans l'interface utilisateur du pipeline, saisissez l'identifiant de votre adresse Amazon Data Firehose. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.

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

- Identifiant de l'adresse Amazon Data Firehose :
	- Référence l'adresse de socket sur laquelle l'Observability Pipelines Worker écoute pour recevoir des logs.
	- L'identifiant par défaut est `SOURCE_AWS_DATA_FIREHOSE_ADDRESS`.
- Identifiant de la phrase secrète TLS Amazon Data Firehose (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_AWS_DATA_FIREHOSE_KEY_PASS`.

{{% /tab %}}

{{% tab "Avec des variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

{{% /tab %}}
{{< /tabs >}}

## Envoyer des logs à l'Observability Pipelines Worker via Amazon Data Firehose {#send-logs-to-the-observability-pipelines-worker-over-amazon-data-firehose}

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

## Authentification AWS {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

### Autorisations{#permissions}

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][6] et les [métriques de tampon de source][7] émises par toutes les sources, consultez la documentation sur les [Métriques d'utilisation des pipelines][8]. Pour filtrer ou regrouper par les métriques de la source Amazon Data Firehose, utilisez le tag `component_type:aws_kinesis_firehose`.

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/