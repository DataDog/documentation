---
description: Apprenez à envoyer des logs à Google SecOps à l'aide de l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Google SecOps
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Google SecOps d'Observability Pipelines pour envoyer des logs à Google SecOps.

L'Observability Pipelines Worker utilise les méthodes d'authentification Google standard. Consultez [Méthodes d'authentification sur Google][3] pour plus d'informations sur le choix de la méthode d'authentification adaptée à votre cas d'utilisation.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'URL d'endpoint Google SecOps. Ne <b>saisissez pas</b> la valeur réelle.</div>

Configurez la destination Google SecOps lorsque vous [configurez un pipeline][8]. Vous pouvez configurer un pipeline dans le [UI][1], en utilisant l'[API][9] ou avec [Terraform][10]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Google SecOps dans l'[UI] du pipeline :

1. Saisissez l'identifiant de votre URL d'endpoint Google SecOps. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Saisissez l'identifiant client de votre instance Google SecOps.
1. Si vous disposez d'un fichier JSON d'identifiants, saisissez le chemin d'accès à ce fichier. Le fichier d'identifiants doit être placé sous `DD_OP_DATA_DIR/config`. Alternativement, vous pouvez utiliser la variable d'environnement `GOOGLE_APPLICATION_CREDENTIALS` pour fournir le chemin d'accès aux identifiants.
    - Si vous utilisez [workload identity][6] sur Google Kubernetes Engine (GKE), le `GOOGLE_APPLICATION_CREDENTIALS` est fourni automatiquement.
    - Le Worker utilise les [méthodes d'authentification Google][7] standard.
1. Sélectionnez l'encodage {{< ui >}}JSON{{< /ui >}} ou {{< ui >}}Raw{{< /ui >}} dans le menu déroulant.
1. Saisissez le type de log. Consultez la [syntaxe des modèles][4] si vous souhaitez acheminer les logs vers différents types de logs en fonction de champs spécifiques dans vos logs.

{{% observability_pipelines/secrets_env_var_note %}}

### Mise en tampon facultative {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

**Remarque** : Les logs envoyés à la destination Google SecOps doivent comporter des libellés d'ingestion. Par exemple, si les logs proviennent d'un équilibreur de charge A10, ils doivent comporter le libellé d'ingestion `A10_LOAD_BALANCER`. Consultez la page [Types de logs pris en charge avec un analyseur par défaut][5] de Google Cloud pour obtenir la liste des types de logs disponibles et leurs libellés d'ingestion respectifs.

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL d'endpoint Google Chronicle :
	- L'identifiant par défaut est `DESTINATION_GOOGLE_CHRONICLE_UNSTRUCTURED_ENDPOINT_URL`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][11] et les [métriques de tampon de destination][12] émises par toutes les destinations, consultez la documentation sur les [métriques d'utilisation des pipelines][13]. Pour filtrer ou regrouper par métriques de destination Google SecOps, utilisez le tag `component_type:gcp_chronicle_unstructured`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 1                 | 15                  |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: https://cloud.google.com/docs/authentication#auth-flowchart
[4]: /fr/observability_pipelines/destinations/#template-syntax
[5]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
[6]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[7]: https://cloud.google.com/docs/authentication#auth-flowchart
[8]: /fr/observability_pipelines/configuration/set_up_pipelines/
[9]: /fr/api/latest/observability-pipelines/
[10]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[11]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[12]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/