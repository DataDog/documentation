---
description: Apprenez à envoyer des logs vers Amazon OpenSearch à l'aide de l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Amazon OpenSearch
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Amazon OpenSearch d'Observability Pipelines pour envoyer des logs vers Amazon OpenSearch.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'URL de l'endpoint Amazon OpenSearch et, le cas échéant, le nom d'utilisateur et le mot de passe. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination Amazon OpenSearch lorsque vous [configurez un pipeline][6]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][7] ou avec [Terraform][8]. Les étapes de cette section sont configurées dans l'UI.

Après avoir sélectionné la destination Amazon OpenSearch dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre URL d'endpoint Amazon OpenSearch. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Dans le menu déroulant {{< ui >}}Mode{{< /ui >}}, sélectionnez {{< ui >}}Bulk{{< /ui >}} ou {{< ui >}}Data streams{{< /ui >}}.
	- {{< ui >}}Bulk{{< /ui >}} mode
		- Utilise l'[API Bulk][4] d'Amazon OpenSearch pour envoyer des événements groupés directement dans un index standard.
		- Choisissez ce mode lorsque vous souhaitez un contrôle direct sur le nommage de l'index et la gestion du cycle de vie. Les données sont ajoutées à l'index que vous spécifiez, et vous êtes responsable de la gestion des rollovers, des suppressions et des mappings.
		- Pour configurer le mode {{< ui >}}Bulk{{< /ui >}} :
			- Dans le champ {{< ui >}}Index{{< /ui >}}, saisissez éventuellement le nom de l'index Amazon OpenSearch. Vous pouvez utiliser la [syntaxe de modèle][3] pour acheminer dynamiquement les logs vers différents index en fonction de champs spécifiques dans vos logs, par exemple `logs-{{service}}`.
	- {{< ui >}}Data streams{{< /ui >}} mode
		- Uses [Amazon OpenSearch Data Streams][5] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for timeseries log data.
		- Choose this mode when you want Amazon OpenSearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure {{< ui >}}Data streams{{< /ui >}} mode, définissez éventuellement le nom du flux de données (la valeur par défaut est `logs-generic-default`) by entering the following information:
			- In the {{< ui >}}Type{{< /ui >}} champ, saisissez la catégorie de données en cours d'ingestion, par exemple `logs`.
			- In the {{< ui >}}Dataset{{< /ui >}} champ, spécifiez le format ou la source de données qui décrit la structure, par exemple `apache`.
			- In the {{< ui >}}Namespace{{< /ui >}} champ, saisissez le regroupement pour organiser vos flux de données, par exemple `production`.
			- You can use [template syntax][3] for the {{< ui >}}Type{{< /ui >}}, {{< ui >}}Dataset{{< /ui >}} et {{< ui >}}Namespace{{< /ui >}} champs pour construire dynamiquement le nom du flux de données en fonction de champs spécifiques dans vos logs.
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.
1. Facultativement, saisissez le nom de l'index Amazon OpenSearch. Consultez la [syntaxe de modèle][3] si vous souhaitez acheminer les logs vers différents index en fonction de champs spécifiques dans vos logs.
1. Sélectionnez une stratégie d'authentification, {{< ui >}}Basic{{< /ui >}} ou {{< ui >}}AWS{{< /ui >}}. Si vous avez sélectionné :
	- {{< ui >}}Basic{{< /ui >}} :
		- Saisissez l'identifiant de votre nom d'utilisateur Amazon OpenSearch. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
		- Saisissez l'identifiant du mot de passe Amazon OpenSearch. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
	- {{< ui >}}AWS{{< /ui >}} :
		1. Saisissez la région AWS.
		1. (Facultatif) Sélectionnez une option d'authentification AWS. L'option {{< ui >}}Assume role{{< /ui >}} ne doit être utilisée que si l'utilisateur ou le rôle que vous avez créé précédemment doit assumer un rôle différent pour accéder à la ressource AWS spécifique et que cette autorisation doit être explicitement définie.<br>Si vous sélectionnez {{< ui >}}Assume role{{< /ui >}} :
			1. Saisissez l'ARN du rôle IAM que vous souhaitez assumer.
			1. Facultativement, saisissez le nom de session du rôle assumé et l'ID externe.

{{% observability_pipelines/secrets_env_var_note %}}

#### Mise en tampon facultative {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL d'endpoint Amazon OpenSearch :
	- L'identifiant par défaut est `DESTINATION_AMAZON_OPENSEARCH_ENDPOINT_URL`.
- Identifiant du nom d'utilisateur d'authentification Amazon OpenSearch :
	- L'identifiant par défaut est `DESTINATION_AMAZON_OPENSEARCH_USERNAME`.
- Identifiant du mot de passe d'authentification Amazon OpenSearch :
	- L'identifiant par défaut est `DESTINATION_AMAZON_OPENSEARCH_PASSWORD`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][9] et les [métriques de tampon de destination][10] émises par toutes les destinations, consultez la documentation [Pipelines Usage Metrics][11]. Pour filtrer ou regrouper par métriques de destination Elasticsearch, utilisez le tag `component_type:elasticsearch`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Destinations event batching][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/destinations/#template-syntax
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/gsgupload-data.html
[5]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/data-streams.html
[6]: /fr/observability_pipelines/configuration/set_up_pipelines/
[7]: /fr/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/