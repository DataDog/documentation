---
description: Apprenez à collecter des logs à partir d'un agent Fluentd ou Fluent Bit
  en utilisant l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sources Fluentd et Fluent Bit
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Fluentd ou Fluent Bit d'Observability Pipelines pour recevoir des logs de votre agent Fluentd ou Fluent Bit.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/fluent %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'adresse Fluent et, le cas échéant, du mot de passe de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans le [UI][3], en utilisant l'[API][4] ou avec [Terraform][5]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Fluent dans l'UI du pipeline, saisissez l'identifiant de votre adresse Fluent. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres optionnels {#optional-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse Fluent :
	- Référence l'adresse sur laquelle l'Observability Pipelines Worker écoute les messages de logs entrants.
	- L'identifiant par défaut est `SOURCE_FLUENT_ADDRESS`.
- Identifiant de la phrase secrète TLS Fluent (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_FLUENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

{{% /tab %}}
{{< /tabs >}}

## Envoyer des logs à l'Observability Pipelines Worker via Fluent {#send-logs-to-the-observability-pipelines-worker-over-fluent}

{{% observability_pipelines/log_source_configuration/fluent %}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][6] et les [métriques de tampon de source][7] émises par toutes les sources, consultez la documentation sur les [métriques d'utilisation des pipelines][8]. Pour filtrer ou regrouper par métriques de source Fluent, utilisez le tag `component_type:fluent`.

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/