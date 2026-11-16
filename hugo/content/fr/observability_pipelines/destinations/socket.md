---
description: Apprenez à envoyer des journaux vers un endpoint de socket en utilisant
  l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Socket
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Socket d'Observability Pipelines pour envoyer des logs vers un endpoint de socket.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'adresse du socket et, le cas échéant, le mot de passe de la clé. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination Socket lorsque vous [configurez un pipeline][2]. Vous pouvez configurer un pipeline dans l'[UI][1], en utilisant l'[API][3] ou avec [Terraform][4]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Socket dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre adresse. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1.  Dans le menu déroulant {{< ui >}}Mode{{< /ui >}}, sélectionnez le type de socket à utiliser.
1.  Dans le menu déroulant {{< ui >}}Encoding{{< /ui >}}, sélectionnez {{< ui >}}JSON{{< /ui >}} ou {{< ui >}}Raw message{{< /ui >}} comme format de sortie.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres facultatifs {#optional-settings}

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Mise en mémoire tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse du socket:
	- Référence l'adresse vers laquelle l'Observability Pipelines Worker envoie les logs traités.
	- L'identifiant par défaut est `DESTINATION_SOCKET_ADDRESS`.
- Identifiant de passphrase TLS du socket (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_SOCKET_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

La destination Socket ne regroupe pas les événements en lots.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: /fr/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline