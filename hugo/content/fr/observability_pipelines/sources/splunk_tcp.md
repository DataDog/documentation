---
description: Apprenez à collecter des journaux à partir de Splunk Heavy ou Universal
  Forwarders via TCP en utilisant l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source Splunk Heavy ou Universal Forwarders (TCP)
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Splunk Heavy et Universal Forwards (TCP) d'Observability Pipelines pour recevoir les journaux envoyés à vos Splunk forwarders.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'adresse TCP Splunk et, le cas échéant, de la clé de passe TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[UI][2], en utilisant l'[API][3], ou avec [Terraform][4]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source TCP Splunk dans l'interface utilisateur du pipeline, saisissez l'identifiant de votre adresse TCP Splunk. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.

**Remarques** :
- Par défaut, la source TCP Splunk ne limite pas la taille d'un événement. Pour éviter une consommation de mémoire illimitée, par exemple due à des connexions mal formées ou restant ouvertes indéfiniment, utilisez la variable d'environnement `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` pour définir une longueur de trame maximale en octets.
- Si vous saisissez des identifiants de secret puis choisissez d'utiliser des variables d'environnement, la variable d'environnement est l'identifiant saisi précédé de `DD_OP_`. Par exemple, si vous avez saisi <code>PASSWORD_1</code> pour un identifiant de mot de passe, la variable d'environnement pour ce mot de passe est `DD_OP_PASSWORD_1`.

### Paramètres optionnels {#optional-settings}

#### Durée maximale de connexion {#maximum-connection-duration}

Saisissez le nombre maximal de secondes pour maintenir une connexion ouverte. Si ce champ n'est pas défini, les connexions peuvent rester ouvertes indéfiniment.

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse TCP Splunk :
	- Référence l'adresse du socket, telle que `0.0.0.0:9997` sur laquelle l'Observability Pipelines Worker écoute pour recevoir les journaux du Splunk Forwarder.
	- L'identifiant par défaut est `SOURCE_SPLUNK_TCP_ADDRESS`.
- Identifiant de la phrase secrète TLS TCP Splunk (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_SPLUNK_TCP_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline