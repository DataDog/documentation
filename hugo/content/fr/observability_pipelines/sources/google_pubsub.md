---
description: Apprenez à extraire des journaux de Google Cloud Pub/Sub à l'aide d'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source Google Pub/Sub
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Google Pub/Sub d'Observability Pipelines pour extraire des journaux du système de messagerie Google Cloud Pub/Sub.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/google_pubsub %}}

## Configuration {#setup}

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans le [UI][5], en utilisant l'[API][6] ou avec [Terraform][7]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Google Pub/Sub dans le [UI] du pipeline :

1. Saisissez le nom du projet source.
1. Si vous disposez d'un fichier JSON d'identifiants, saisissez le chemin d'accès à votre fichier JSON d'identifiants. Le fichier d'identifiants doit être placé sous `DD_OP_DATA_DIR/config`. Alternativement, vous pouvez utiliser la variable d'environnement `GOOGLE_APPLICATION_CREDENTIALS` pour fournir le chemin d'accès aux identifiants.
    - Si vous utilisez [workload identity][2] sur Google Kubernetes Engine (GKE), le `GOOGLE_APPLICATION_CREDENTIALS` est fourni pour vous.
    - Le Worker utilise des [méthodes d'authentification Google][4] standards.
1. Saisissez le nom de l'abonnement.
1. Sélectionnez le décodeur que vous souhaitez utiliser (Bytes, GELF, JSON, syslog).

### Paramètres TLS optionnels {#optional-tls-settings}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant du mot de passe de la clé TLS. Ne <b>saisissez pas</b> la valeur réelle.</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

Il n'existe aucun identifiant de secret par défaut pour cette source.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][8] et les [métriques de tampon source][9] émises par toutes les sources, consultez la documentation sur les [métriques d'utilisation des pipelines][10]. Pour filtrer ou regrouper par métriques de source Google Pub/Sub, utilisez le tag `component_type:gcp_pubsub`.

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[4]: https://cloud.google.com/docs/authentication#auth-flowchart
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /fr/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[10]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/