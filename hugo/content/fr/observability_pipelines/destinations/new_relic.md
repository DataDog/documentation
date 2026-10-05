---
description: Apprenez à envoyer des journaux à New Relic en utilisant l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination New Relic
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination New Relic d'Observability Pipelines pour envoyer des journaux à New Relic.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants pour l'ID de compte et la licence. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination New Relic lorsque vous [configurez un pipeline][3]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][4] ou avec [Terraform][5]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination New Relic dans l'interface utilisateur du pipeline :

1.  Saisissez l'identifiant pour votre ID de compte. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1.  Saisissez l'identifiant pour votre licence. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Sélectionnez la région du centre de données ({{< ui >}}US{{< /ui >}} ou {{< ui >}}EU{{< /ui >}}) de votre compte New Relic.

{{% observability_pipelines/secrets_env_var_note %}}

### Mise en tampon facultative {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de compte New Relic :
	- L'identifiant par défaut est `DESTINATION_NEW_RELIC_ACCOUNT_ID`.
- Identifiant de licence New Relic :
	- L'identifiant par défaut est `DESTINATION_NEW_RELIC_LICENSE_KEY`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{< /tabs >}}

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| 100            | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/configuration/set_up_pipelines/
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline