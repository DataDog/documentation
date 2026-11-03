---
description: Apprenez à envoyer des logs à SentinelOne en utilisant l'Observability
  Pipelines Worker.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-sentinelone/
  tag: blog
  text: Optimisez les logs EDR et acheminez-les vers SentinelOne avec Observability
    Pipelines
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination SentinelOne
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination SentinelOne d'Observability Pipelines pour envoyer des logs à SentinelOne.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant du jeton. Ne <b>saisissez pas</b> la valeur réelle.</div>

Configurez la destination SentinelOne lorsque vous [configurez un pipeline][4]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][5], ou avec [Terraform][6]. Les étapes de cette section sont configurées dans l'UI.

Après avoir sélectionné la destination SentinelOne dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre jeton. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Sélectionnez votre environnement de logs SentinelOne dans le menu déroulant.

{{% observability_pipelines/secrets_env_var_note %}}

### Mise en tampon facultative {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant du jeton d'accès en écriture SentinelOne :
	- L'identifiant par défaut est `DESTINATION_SENTINEL_ONE_TOKEN`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{< /tabs >}}

## Afficher les logs dans un cluster SentinelOne {#view-logs-in-a-sentinelone-cluster}

Une fois que vous avez configuré le pipeline pour envoyer des logs vers la destination SentinelOne, vous pouvez afficher les logs dans un cluster SentinelOne :

1. Connectez-vous à la [console S1][2].
2. Accédez à la page Singularity Data Lake (SDL) {{< ui >}}Search{{< /ui >}}. Pour y accéder depuis la console, cliquez sur {{< ui >}}Visibility{{< /ui >}} dans le menu de gauche pour aller à SDL, et assurez-vous d'être sur l'onglet {{< ui >}}Search{{< /ui >}}.
3. Assurez-vous que le filtre à côté de la barre de recherche est défini sur {{< ui >}}All Data{{< /ui >}}.
4. Cette page affiche les logs que vous avez envoyés depuis Observability Pipelines vers SentinelOne.

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][7] et les [métriques de tampon de destination][8] émises par toutes les destinations, consultez la documentation [Pipelines Usage Metrics][9]. Pour filtrer ou grouper par métriques de destination Splunk HEC, utilisez le tag `component_type:splunk_hec_logs`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [le traitement par lots des événements de destination][3] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 1                 | 1                   |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://usea1-partners.sentinelone.net/login
[3]: /fr/observability_pipelines/destinations/#event-batching
[4]: /fr/observability_pipelines/configuration/set_up_pipelines/
[5]: /fr/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/