---
description: Apprenez à collecter les métriques envoyées par les clients Prometheus
  à l'aide de l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Source Prometheus
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Prometheus d'Observability Pipelines pour recevoir les métriques envoyées par vos clients Prometheus.

## Configuration {#setup}

<div class="alert alert-danger">Pour Secrets Management : saisissez uniquement les identifiants de l’adresse Prometheus et, le cas échéant, ceux du nom d’utilisateur et du mot de passe pour l’autorisation simple (également appelée basique). Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[UI][2], en utilisant l'[API][3], ou avec [Terraform][4]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Prometheus dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre adresse Prometheus. Un exemple de l'adresse de socket à laquelle l'identifiant fait référence : `0.0.0.0:9091`. Si vous laissez le champ de l'identifiant vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Saisissez le chemin d'URL sur lequel les requêtes POST de métriques sont acceptées, par exemple `/api/v1/write`.
1. Sélectionnez votre stratégie d'autorisation. Si vous avez sélectionné {{< ui >}}Plain{{< /ui >}} :
    - Saisissez les identifiants correspondant à votre nom d'utilisateur et à votre mot de passe Prometheus. Si vous les laissez vides, les [valeurs par défaut](#secret-defaults) sont utilisées.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres facultatifs {#optional-settings}

#### Configurer les jetons d'authentification {#configure-authentication-tokens}

Si vous stockez des jetons comme informations d’identification dans l’en-tête d’autorisation de votre client Prometheus, vous pouvez configurer le Worker pour vérifier si les requêtes entrantes contiennent un jeton valide. Les événements de requête qui ne possèdent pas de jeton valide sont abandonnés. Le Worker peut également rechercher un chemin d'endpoint ou une adresse IP au lieu d'un en-tête. Vous ne pouvez définir des jetons d’authentification que lorsque la stratégie d’autorisation est définie sur **None**.

{{% observability_pipelines/configure_authentication_tokens %}}

#### Configurez le keepalive {#configure-keepalive}

Pour configurer les paramètres keepalive pour les connexions à la source, activez le commutateur {{< ui >}}Configure keepalive{{< /ui >}} :

- {{< ui >}}Max connection age{{< /ui >}} : Le nombre maximal de secondes après lequel une connexion est fermée. La valeur par défaut est `300` secondes.
- {{< ui >}}Max connection age jitter factor{{< /ui >}} : Le facteur utilisé pour faire varier aléatoirement la durée de vie maximale des connexions, afin qu'elles ne se ferment pas toutes simultanément. La valeur par défaut est `0.1`.

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse Prometheus :
	- Fait référence à l’adresse de socket sur laquelle l’Observability Pipelines Worker écoute les métriques Prometheus. Un exemple de l'adresse de socket à laquelle l'identifiant fait référence : `0.0.0.0:9091`.
	- L'identifiant par défaut est `SOURCE_PROMETHEUS_REMOTE_WRITE_ADDRESS`.
- Si vous utilisez une authentification simple :
	- Identifiant de nom d'utilisateur Prometheus :
		- L'identifiant par défaut est `SOURCE_PROMETHEUS_REMOTE_WRITE_USERNAME`.
	- Identifiant de mot de passe Prometheus :
		- L'identifiant par défaut est `SOURCE_PROMETHEUS_REMOTE_WRITE_PASSWORD`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline