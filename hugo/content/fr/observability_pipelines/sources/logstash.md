---
description: Apprenez à collecter des journaux à partir d'un agent Logstash en utilisant
  l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Logstash Source
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Logstash d'Observability Pipelines pour recevoir des journaux de votre agent Logstash.

Vous pouvez également utiliser la source Logstash pour [envoyer des journaux à Observability Pipelines en utilisant Filebeat][2].

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/logstash%}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'adresse Logstash et, le cas échéant, la phrase secrète de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][4], en utilisant l'[API][5] ou avec [Terraform][6]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Logstash dans l'interface utilisateur du pipeline, saisissez l'identifiant de votre adresse Logstash. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres TLS optionnels {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse Logstash :
	- Référence l'adresse sur laquelle l'Observability Pipelines Worker écoute les messages de logs entrants.
	- L'identifiant par défaut est `SOURCE_LOGSTASH_ADDRESS`.
- Identifiant de la phrase secrète TLS Logstash (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_LOGSTASH_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

{{% /tab %}}
{{< /tabs >}}

## Envoyez des journaux à l'Observability Pipelines Worker via Logstash {#send-logs-to-the-observability-pipelines-worker-over-logstash}

{{% observability_pipelines/log_source_configuration/logstash %}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: /fr/observability_pipelines/sources/filebeat/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /fr/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline