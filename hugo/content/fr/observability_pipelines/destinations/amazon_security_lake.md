---
description: Apprenez à envoyer des journaux à Amazon Security Lake à l'aide de l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Amazon Security Lake
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Amazon Security Lake d'Observability Pipelines pour envoyer des journaux à Amazon Security Lake.

## Prérequis {#prerequisites}

Vous devez effectuer les opérations suivantes avant de configurer la destination Amazon Security Lake :

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

## Configuration {#setup}

Configurez la destination Amazon Security Lake lorsque vous [configurez un pipeline][6]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][7] ou avec [Terraform][8]. Les étapes de cette section sont configurées dans l'interface utilisateur.

**Remarques** :
- Lorsque vous ajoutez la destination Amazon Security Lake, le processeur OCSF est automatiquement ajouté afin que vous puissiez convertir vos journaux au format Parquet avant qu'ils ne soient envoyés à Amazon Security Lake. Consultez la [documentation sur le remappage vers OCSF][3] pour obtenir des instructions de configuration.
- Seuls les journaux formatés par le processeur OCSF sont convertis au format Parquet.

Après avoir sélectionné la destination Amazon Security Lake dans l'interface utilisateur du pipeline :

1. Saisissez le nom de votre compartiment S3.
1. Saisissez la région AWS.
1. Saisissez le nom de la source personnalisée.

#### Paramètres facultatifs {#optional-settings}

##### Authentification AWS {#aws-authentication}

1. Sélectionnez une option d'[authentification AWS][5].
1. Saisissez l'ARN du rôle IAM que vous souhaitez assumer.
1. Facultativement, saisissez le nom de session du rôle assumé et l'ID externe.

##### Activer TLS {#enable-tls}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de la phrase secrète de la clé TLS. Ne <b>saisissez</b> pas la valeur réelle.</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

##### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de la phrase secrète TLS d'Amazon Security Lake (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_AWS_SECURITY_LAKE_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{< /tabs >}}

## Fonctionnement de la destination {#how-the-destination-works}

### Authentification AWS {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### Autorisations {#permissions}

{{% observability_pipelines/aws_authentication/amazon_security_lake/permissions %}}

### Mise en lots des événements {#event-batching}

Un lot d’événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Mise en lots des événements des destinations][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 256               | 300                 |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/processors/remap_ocsf
[5]: /fr/observability_pipelines/destinations/amazon_security_lake/#aws-authentication
[6]: /fr/observability_pipelines/configuration/set_up_pipelines/
[7]: /fr/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline