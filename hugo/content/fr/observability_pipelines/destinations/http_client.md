---
description: Apprenez à envoyer des logs à un client HTTP, tel qu'une plateforme de
  journalisation ou un SIEM, en utilisant l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: 'Destination client HTTP :'
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination client HTTP d'Observability Pipelines pour envoyer des logs à un client HTTP, tel qu'une plateforme de journalisation ou un SIEM.

## Configurer la destination {#set-up-destination}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants pour l'URI du client HTTP et, le cas échéant, le nom d'utilisateur et le mot de passe pour l'authentification de base ainsi que la phrase secrète de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination client HTTP lorsque vous [configurez un pipeline][3]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][4] ou avec [Terraform][5]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination client HTTP dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre URI client HTTP. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Sélectionnez votre stratégie d'autorisation ({{< ui >}}None{{< /ui >}}, {{< ui >}}Basic{{< /ui >}} ou {{< ui >}}Bearer{{< /ui >}}). Si vous avez sélectionné :
	- {{< ui >}}Basic{{< /ui >}}:
		- Saisissez l'identifiant de votre nom d'utilisateur client HTTP. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
		- Saisissez l'identifiant de votre mot de passe client HTTP. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
	- {{< ui >}}Bearer{{< /ui >}}:
		- Saisissez l'identifiant de votre jeton client HTTP. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. JSON est le seul encodeur disponible.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres facultatifs {#optional-settings}

#### Activer la compression {#enable-compression}

Basculez l'interrupteur sur {{< ui >}}Enable Compression{{< /ui >}}. Si activé :
1. GZIP est le seul algorithme de compression disponible.
1. Sélectionnez le niveau de compression que vous souhaitez utiliser.

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Mise en mémoire tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'endpoint de l'URI du client HTTP :
	- L'identifiant par défaut est `DESTINATION_HTTP_CLIENT_URI`.
- Identifiant de la phrase secrète TLS du client HTTP (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_HTTP_CLIENT_KEY_PASS`.
- Si vous utilisez l'authentification de base :
	- Identifiant du nom d'utilisateur du client HTTP :
		- L'identifiant par défaut est `DESTINATION_HTTP_CLIENT_USERNAME`.
	- Identifiant du mot de passe du client HTTP :
		- L'identifiant par défaut est `DESTINATION_HTTP_CLIENT_PASSWORD`.
- Si vous utilisez l'authentification par jeton bearer :
	- Identifiant du jeton bearer du client HTTP :
		- L'identifiant par défaut est `DESTINATION_HTTP_CLIENT_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour [les métriques de composant][6] et [les métriques de tampon de destination][7] émises par toutes les destinations, consultez la documentation sur [les métriques d'utilisation des pipelines][8]. Pour filtrer ou regrouper par métriques de destination du client HTTP, utilisez le tag `component_type:http`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'une de ces conditions se produit. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| 1 000          | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/configuration/set_up_pipelines/
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/