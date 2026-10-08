---
aliases:
- /fr/observability_pipelines/destinations/splunk_hec/
code_lang: logs
description: Apprenez à configurer la destination Splunk HEC pour les logs dans Observability
  Pipelines.
disable_toc: false
title: Destination Splunk HTTP Event Collector (HEC)
type: multi-code-lang
weight: 1
---
## Présentation {#overview}

Utilisez la destination Splunk HTTP Event Collector (HEC) d'Observability Pipelines pour envoyer des logs à Splunk HEC.

**Remarque** : Observability Pipelines compresse les logs avec l'algorithme gzip (niveau 6).

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants du jeton et de l'endpoint Splunk HEC. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination Splunk HEC lorsque vous [configurez un pipeline][5]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][6] ou avec [Terraform][7]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Splunk HEC dans l'interface utilisateur du pipeline :

1. Pour le menu déroulant {{< ui >}}Token strategy{{< /ui >}} :
	- Sélectionnez uniquement {{< ui >}}From Source{{< /ui >}} si vous utilisez une [source Splunk HEC][8] et que vous avez activé {{< ui >}}Store HEC token{{< /ui >}} sur la source. Sinon, une erreur se produit et vous ne pouvez pas procéder à l'installation du Worker. Cette option transfère le jeton reçu par Observability Pipelines vers la destination Splunk HEC.
	- Si vous utilisez la stratégie de jeton {{< ui >}}Custom{{< /ui >}} par défaut, saisissez l'identifiant de votre jeton. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez l'identifiant de votre URL d'endpoint. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Sélectionnez le {{< ui >}}Encoding{{< /ui >}} dans le menu déroulant ({{< ui >}}JSON{{< /ui >}} ou {{< ui >}}Raw{{< /ui >}}).
	- Si vous sélectionnez {{< ui >}}JSON{{< /ui >}}, cliquez éventuellement sur {{< ui >}}Add Field{{< /ui >}} pour spécifier les champs à extraire en tant que [champs indexés][4]. Splunk HTTP Event Collector indexe les champs spécifiés lors de l'ingestion des logs.
	- **Remarque** : La {{< ui >}}Raw{{< /ui >}} [cible de l'endpoint](#endpoint-target) ne prend pas en charge {{< ui >}}Index Fields{{< /ui >}}.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres facultatifs {#optional-settings}

#### Index Splunk {#splunk-index}

Entrez le nom de l'index Splunk vers lequel vous souhaitez envoyer vos données. Votre HEC doit être autorisé à accéder à cet index. Consultez la [syntaxe de modèle][3] si vous souhaitez acheminer les logs vers différents index en fonction de champs spécifiques dans vos logs.

#### Cible de l'endpoint {#endpoint-target}

Dans le menu déroulant {{< ui >}}Endpoint Target{{< /ui >}}, sélectionnez l'endpoint Splunk HEC vers lequel envoyer les événements :
- {{< ui >}}Event{{< /ui >}} (par défaut) : Envoie les événements à l'endpoint HEC `/event` de Splunk, qui prend en charge les horodatages et les champs indexés extraits automatiquement.
- {{< ui >}}Raw{{< /ui >}} : Envoie les événements à l'endpoint HEC `/raw` de Splunk.

#### Extraction automatique de l'horodatage {#auto-extract-timestamp}

Sélectionnez si l'horodatage doit être extrait automatiquement. S'il est défini sur `true`, Splunk extrait l'horodatage du message avec le format attendu de `yyyy-mm-dd hh:mm:ss`.

**Remarque** : La {{< ui >}}Raw{{< /ui >}} [cible de l'endpoint](#endpoint-target) ne prend pas en charge {{< ui >}}Auto-extract timestamp{{< /ui >}}.

#### Remplacement du type de source {#sourcetype-override}

Définissez le `sourcetype` pour remplacer la valeur par défaut de Splunk, qui est `httpevent` pour les données HEC. Consultez la [syntaxe de modèle][3] si vous souhaitez acheminer les logs vers différents types de sources en fonction de champs spécifiques dans vos logs.

#### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

{{% observability_pipelines/splunk_hec_secrets %}}

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

## Dépannage {#troubleshooting}

### Erreurs 401 Non autorisées {#401-unauthorized-errors}

{{% observability_pipelines/splunk_hec_unauthorized_error %}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][9] et les [métriques de tampon de destination][10] émises par toutes les destinations, consultez la documentation [Pipelines Usage Metrics][11].

### Métriques Splunk HEC {#splunk-hec-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Le tag `component_type` est `splunk_hec_logs` pour les métriques Splunk HEC.

`pipelines.splunk_pending_acks`
: **Description**: Le nombre d'accusés de réception d'indexeur Splunk HEC en attente d'une réponse.
: **Type de métrique** : jauge

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/destinations/#template-syntax
[4]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/9.0/get-data-with-http-event-collector/automate-indexed-field-extractions-with-http-event-collector
[5]: /fr/observability_pipelines/configuration/set_up_pipelines/
[6]: /fr/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /fr/observability_pipelines/sources/splunk_hec/
[9]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/