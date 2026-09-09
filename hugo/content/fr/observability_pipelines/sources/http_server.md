---
description: Apprenez à collecter des logs client HTTP en utilisant la source HTTP/S
  Server d'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source HTTP/S Server
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source HTTP/S Server d'Observability Pipelines pour collecter des logs client HTTP.

Vous pouvez également [envoyer des logs fournis par AWS avec le Datadog Lambda Forwarder vers Observability Pipelines](#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines).

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/http_server %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : Saisissez uniquement les identifiants pour l'adresse du HTTP/S Server et, le cas échéant, le nom d'utilisateur et le mot de passe pour l'autorisation simple (également appelée basique) ainsi que la clé de mot de passe TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][3]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][4] ou avec [Terraform][5]. Les instructions de cette section concernent la configuration de la source dans l'IU.

Après avoir sélectionné la source HTTP/S Server dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de l'adresse du HTTP/S Server. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
    - **Remarque** : Saisissez uniquement l'identifiant de l'adresse. Ne **saisissez pas** l'adresse réelle.
1. Sélectionnez votre stratégie d'autorisation. Si vous avez sélectionné {{< ui >}}Plain{{< /ui >}} :
    - Saisissez les identifiants de votre nom d'utilisateur et de votre mot de passe pour le HTTP/S Server. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. (Facultatif) Configurez des jetons d'authentification. Consultez [Configurer des jetons d'authentification](#configure-authentication-tokens) pour plus de détails.
1. Sélectionnez le décodeur que vous souhaitez utiliser sur les messages HTTP. Vos logs client HTTP doivent être dans ce format. **Remarque** : Si vous sélectionnez le décodage `bytes`, le log brut est stocké dans le champ `message`.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres optionnels {#optional-settings}

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### Configurer les jetons d'authentification {#configure-authentication-tokens}

Si vous stockez des jetons en tant qu'identifiants dans l'en-tête d'autorisation de votre requête HTTP, vous pouvez configurer le Worker pour vérifier si les requêtes HTTP entrantes possèdent un jeton valide. Les événements de requête qui ne possèdent pas de jeton valide sont abandonnés. Le Worker peut également rechercher un chemin d'endpoint ou une adresse IP au lieu d'un en-tête.

**Remarque** : Vous ne pouvez pas configurer de jetons d'authentification avec la stratégie d'autorisation {{< ui >}}Plain{{< /ui >}}.

{{% observability_pipelines/configure_authentication_tokens %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse du HTTP/S Server :
	- Référence l'adresse de socket, telle que `0.0.0.0:9997`, sur laquelle l'Observability Pipelines Worker écoute les logs client HTTP.
	- L'identifiant par défaut est `SOURCE_HTTP_SERVER_ADDRESS`.
- Identifiant de la phrase secrète TLS du HTTP/S Server (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_HTTP_SERVER_KEY_PASS`.
- Si vous utilisez une authentification simple :
	- Identifiant du nom d'utilisateur du HTTP/S Server :
		- L'identifiant par défaut est `SOURCE_HTTP_SERVER_USERNAME`.
	- Identifiant du mot de passe du HTTP/S Server :
		- L'identifiant par défaut est `SOURCE_HTTP_SERVER_PASSWORD`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

{{% /tab %}}
{{< /tabs >}}

## Envoyez les logs fournis par AWS avec le Datadog Lambda Forwarder vers Observability Pipelines {#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines}

Pour envoyer des logs fournis par AWS vers Observability Pipelines avec la source HTTP/S Server :

- [Configurez un pipeline avec la source HTTP/S Server](#set-up-a-pipeline).
- [Déployez le Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Remarque** : Ceci est disponible pour les versions 2.51 ou ultérieures du Worker.

### Configurez un pipeline {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

### Déployez le Datadog Lambda Forwarder {#deploy-the-datadog-lambda-forwarder}

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/observability_pipelines/configuration/set_up_pipelines/
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline