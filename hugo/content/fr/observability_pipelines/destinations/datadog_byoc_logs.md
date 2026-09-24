---
aliases:
- /fr/observability_pipelines/destinations/cloudprem/
description: Apprenez à envoyer des logs vers Datadog BYOC (Bring Your Own Cloud)
  Logs en utilisant l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Datadog BYOC Logs
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination BYOC (Bring Your Own Cloud) Logs d'Observability Pipelines pour envoyer des logs vers Datadog BYOC Logs.


## Prérequis {#prerequisites}

Avant de configurer la destination, vous devez déployer un cluster BYOC Logs. Apprenez à l'installer dans la [section d'installation de BYOC Logs][3].

## Configuration {#setup}

Configurez la destination BYOC Logs lorsque vous [configurez un pipeline][4]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][5], ou avec [Terraform][6]. Les étapes de cette section sont configurées dans l'interface utilisateur.

### Mise en tampon facultative {#optional-buffering}

Après avoir sélectionné la destination BYOC Logs dans l'interface utilisateur du pipeline, vous pouvez configurer la mise en tampon.

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/cloudprem_settings.png" alt="Les paramètres de la destination BYOC Logs" style="width:35%;" >}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL de l'endpoint BYOC Logs :
	- Référence le endpoint d'ingestion vers lequel Observability Pipelines envoie les logs.
	- Dans votre gestionnaire de secrets :
		- Définissez l'URL du cluster, telle que `http://byoc-logs.acme.internal:7280`. **Remarque** : L'URL doit inclure le port.
		- Le Worker ajoute `/api/v2/logs` et `/api/v1/validate` à l'URL de l'endpoint ; ces endpoints doivent donc être autorisés si vous utilisez des règles de transfert ou de pare-feu.
	- L'identifiant par défaut est `DESTINATION_CLOUDPREM_ENDPOINT_URL`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{< img src="observability_pipelines/destinations/cloudprem_env_vars.png" alt="La page d'installation affichant le champ de variable d'environnement BYOC Logs" style="width:75%;" >}}

- URL de l'endpoint BYOC Logs
	- Observability Pipelines envoie les logs vers le endpoint d'ingestion BYOC Logs. Définissez l'URL du cluster, telle que `http://byoc-logs.acme.internal:7280`. **Remarque** : L'URL doit inclure le port.
	- Le Worker ajoute `/api/v2/logs` et `/api/v1/validate` à l'URL de l'endpoint ; ces endpoints doivent donc être autorisés si vous utilisez des règles de transfert ou de pare-feu.
  - Stocké en tant que variable d'environnement : `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL`.

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][7] et les [métriques de tampon de destination][8] émises par toutes les destinations, consultez la documentation [Pipelines Usage Metrics][9]. Pour filtrer ou regrouper par métriques de destination Datadog Logs, utilisez le tag `component_type:datadog_logs`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| 1 000          | 4,25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/byoc-logs/install/
[4]: /fr/observability_pipelines/configuration/set_up_pipelines/
[5]: /fr/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/