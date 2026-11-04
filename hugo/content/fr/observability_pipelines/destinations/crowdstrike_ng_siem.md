---
description: Apprenez à envoyer des logs à CrowdStrike Next-Gen SIEM en utilisant
  l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination CrowdStrike Next-Gen SIEM
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination CrowdStrike Next-Gen SIEM d'Observability Pipelines pour envoyer des logs à CrowdStrike Next-Gen SIEM.

## Prérequis {#prerequisites}

Pour utiliser la destination CrowdStrike NG-SIEM, vous devez configurer un connecteur de données CrowdStrike en utilisant le HEC/HTTP Event Connector. Consultez [Étape 1 : Configurer le connecteur de données d'événement HEC/HTTP][3] pour obtenir des instructions. Lorsque vous configurez le connecteur de données, une clé d'API HEC et une URL vous sont fournies, que vous utilisez lors de la configuration de l'Observability Pipelines Worker.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'URL d'endpoint CrowdStrike NG-SIEM, du jeton et, le cas échéant, de la phrase secrète TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination CrowdStrike NG-SIEM lorsque vous [configurez un pipeline][4]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][5], ou avec [Terraform][6]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination CrowdStrike NG-SIEM dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre URL d'endpoint CrowdStrike NG-SIEM. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez l'identifiant de votre jeton CrowdStrike NG-SIEM. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Sélectionnez l'encodage {{< ui >}}JSON{{< /ui >}} ou {{< ui >}}Raw{{< /ui >}} dans le menu déroulant.

{{% observability_pipelines/secrets_env_var_note %}}

#### Paramètres facultatifs {#optional-settings}

##### Activez la compression {#enable-compressions}

1. Basculez l'interrupteur sur {{< ui >}}Enable compressions{{< /ui >}}.
1. Sélectionnez un algorithme ({{< ui >}}gzip{{< /ui >}} ou {{< ui >}}zlib{{< /ui >}}) dans le menu déroulant.

##### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

##### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL d'endpoint CrowdStrike NG-SIEM :
	- Dans votre gestionnaire de secrets, **n'incluez pas** le suffixe `/services/collector` dans l'URL. L'URL doit respecter le format suivant : `https://<your_instance_id>.ingest.us-1.crowdstrike.com`.
	- L'identifiant par défaut est `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_ENDPOINT_URL`.
- Identifiant du jeton CrowdStrike NG-SIEM :
	- L'identifiant par défaut est `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_TOKEN`.
- Identifiant de la phrase secrète TLS de CrowdStrike NG-SIEM (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{< /tabs >}}

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: https://falcon.us-2.crowdstrike.com/documentation/page/bdded008/hec-http-event-connector-guide
[4]: /fr/observability_pipelines/configuration/set_up_pipelines/
[5]: /fr/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline