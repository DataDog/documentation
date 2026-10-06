---
description: Apprenez à envoyer des logs à un collecteur hébergé Sumo Logic à l'aide
  de l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination du collecteur hébergé Sumo Logic
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Sumo Logic d'Observability Pipelines pour envoyer des logs à votre collecteur hébergé Sumo Logic.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'URL de l'endpoint. Ne <b>saisissez pas</b> la valeur réelle.</div>

Configurez la destination Sumo Logic lorsque vous [configurez un pipeline][3]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][4] ou avec [Terraform][5]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Sumo Logic dans l'interface utilisateur du pipeline, saisissez l'identifiant de votre URL d'endpoint. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres facultatifs {#optional-settings}

1. Dans le menu déroulant {{< ui >}}Encoding{{< /ui >}}, sélectionnez si vous souhaitez encoder la sortie de votre pipeline en texte `JSON`, `Logfmt` ou `Raw`. Si aucun décodage n'est sélectionné, le décodage par défaut est JSON.
1. Saisissez un {{< ui >}}source name{{< /ui >}} pour remplacer la valeur par défaut `name` configurée pour la source de votre collecteur Sumo Logic.
1. Saisissez un {{< ui >}}host name{{< /ui >}} pour remplacer la valeur par défaut `host` configurée pour la source de votre collecteur Sumo Logic.
1. Saisissez un {{< ui >}}category name{{< /ui >}} pour remplacer la valeur par défaut `category` configurée pour la source de votre collecteur Sumo Logic.
1. Cliquez sur {{< ui >}}Add Header{{< /ui >}} pour ajouter des champs d'en-tête et des valeurs personnalisés.

#### Options de mise en tampon {#buffering-options}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL du collecteur HTTP Sumo Logic :
	- Référence l'endpoint de la source HTTP Sumo Logic. L'Observability Pipelines Worker envoie les logs traités à cet endpoint. Par exemple, `https://<ENDPOINT>.collection.sumologic.com/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>`, où :
        - `<ENDPOINT>` est votre endpoint de collecte Sumo Logic.
        - `<UNIQUE_HTTP_COLLECTOR_CODE>` est la chaîne qui suit la dernière barre oblique (`/`) dans l'URL de téléchargement de la source HTTP.
	- L'identifiant par défaut est `DESTINATION_SUMO_LOGIC_HTTP_COLLECTOR_URL`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour [les métriques de composant][6] et [les métriques de tampon de destination][7] émises par toutes les destinations, consultez la documentation sur [les métriques d'utilisation des pipelines][8]. Pour filtrer ou regrouper par métriques de destination Sumo Logic, utilisez le tag `component_type:sumo_logic`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/configuration/set_up_pipelines/
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/