---
description: Apprenez à collecter les journaux envoyés vers un collecteur hébergé
  Sumo Logic à l'aide de l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Collecteur hébergé Sumo Logic
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source de collecteur hébergé Sumo Logic d'Observability Pipelines pour recevoir les journaux envoyés vers votre collecteur hébergé Sumo Logic.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/sumo_logic %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'adresse Sumo Logic. Ne <b>saisissez pas</b> la valeur réelle.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[UI][2], en utilisant l'[API][3], ou avec [Terraform][4]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Sumo Logic dans l'interface utilisateur du pipeline, saisissez l'identifiant de votre adresse Sumo Logic. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres optionnels {#optional-settings}

Dans le menu déroulant {{< ui >}}Decoding{{< /ui >}}, sélectionnez si votre format d'entrée est brut {{< ui >}}Bytes{{< /ui >}}, {{< ui >}}JSON{{< /ui >}}, Graylog Extended Log Format ({{< ui >}}Gelf{{< /ui >}}), ou {{< ui >}}Syslog{{< /ui >}}. Si aucun décodage n'est sélectionné, le décodage par défaut est JSON.

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse Sumo Logic :
	- Fait référence à l'adresse de liaison, telle que `0.0.0.0:80.`, sur laquelle votre Observability Pipelines Worker écoute pour recevoir les journaux initialement destinés à la source HTTP Sumo Logic.
	- L'identifiant par défaut est `SOURCE_SUMO_LOGIC_ADDRESS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline