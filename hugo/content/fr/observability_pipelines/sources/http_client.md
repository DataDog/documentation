---
description: Apprenez à extraire des logs d'un serveur HTTP/S en amont à l'aide de
  l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source du client HTTP/S
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source du client HTTP/S d'Observability Pipelines pour extraire les logs du serveur HTTP/S en amont.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/http_client %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'URL de l'endpoint du client HTTP/S et, le cas échéant, les secrets de votre stratégie d'autorisation et le mot de passe de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans le [UI][3], en utilisant l'[API][4] ou avec [Terraform][5]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source du client HTTP/S dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de l'URL de l'endpoint du client HTTP/S . Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Sélectionnez votre stratégie d'autorisation. Si vous avez sélectionné :
   - {{< ui >}}Basic{{< /ui >}} :
      - Saisissez l'identifiant du nom d'utilisateur du client HTTP/S . Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
      - Saisissez l'identifiant du mot de passe du client HTTP/S . Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
   - {{< ui >}}Bearer{{< /ui >}} : Saisissez l'identifiant de votre jeton porteur. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Sélectionnez le décodeur que vous souhaitez utiliser sur les messages HTTP. Les logs extraits de la source HTTP doivent être dans ce format.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres optionnels {#optional-settings}

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Paramètres de scraping {#scrape-settings}

- Saisissez l'intervalle entre les scrapes.
   - Votre serveur HTTP doit être capable de gérer les requêtes GET à cet intervalle.
   - Comme les requêtes s'exécutent simultanément, si un scrape prend plus de temps que l'intervalle indiqué, un nouveau scrape est lancé, ce qui peut entraîner une consommation supplémentaire de ressources. Définissez le délai d'expiration sur une valeur inférieure à l'intervalle entre les scrapes pour éviter ce problème.
- Saisissez le délai d'expiration pour chaque requête de scrape.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL de l'endpoint du client HTTP/S :
	- Référence l'endpoint à partir duquel l'Observability Pipelines Worker collecte les événements de log.
	- L'identifiant par défaut est `SOURCE_HTTP_CLIENT_ENDPOINT_URL`.
- Identifiant de la phrase secrète TLS du client HTTP/S (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_HTTP_CLIENT_KEY_PASS`.
- Si vous utilisez l'authentification de base :
	- Identifiant du nom d'utilisateur du client HTTP/S :
		- L'identifiant par défaut est `SOURCE_HTTP_CLIENT_USERNAME`.
	- Identifiant du mot de passe du client HTTP/S :
		- L'identifiant par défaut est `SOURCE_HTTP_CLIENT_PASSWORD`.
- Si vous utilisez l'authentification par jeton bearer :
	- Identifiant du jeton porteur du client HTTP/S :
		- L'identifiant par défaut est `SOURCE_HTTP_CLIENT_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline