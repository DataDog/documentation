---
description: Apprenez à envoyer des logs à Datadog Log Management en utilisant l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Datadog Logs
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Datadog Logs d'Observability Pipelines pour envoyer des logs à Datadog Log Management. Vous pouvez également utiliser [AWS PrivateLink](#aws-privatelink) pour envoyer des logs depuis Observability Pipelines vers Datadog.

## Configuration {#setup}

Configurez la destination Datadog Logs lorsque vous [configurez un pipeline][4]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][5], ou avec [Terraform][6]. Les étapes de cette section sont configurées dans l'UI.

<div class="alert alert-info">Avant d'acheminer les logs via Observability Pipelines, examinez tous les index, pipelines ou filtres d'exclusion qui utilisent le <code>datadog.pipelines:false</code> tag. Pour les logs provenant d'une source Datadog Agent, la destination Datadog Logs définit <code>source_type</code> par <code>datadog_agent</code> (<code>@source_type:datadog_agent</code> dans la recherche de logs). Datadog évalue ensuite ces logs comme des logs <code>datadog_agent</code> lorsqu'il décide s'il doit appliquer le <code>datadog.pipelines:false</code> tag. Pour modifier ce comportement avant que les logs ne soient transmis, utilisez le <a href="/observability_pipelines/processors/edit_fields/">Edit Fields processor</a> ou le <a href="/observability_pipelines/processors/custom_processor/">Custom Processor</a> pour supprimer l' <code>source_type</code> attribut des logs.</div>

### Paramètres facultatifs {#optional-settings}

Après avoir sélectionné la destination Datadog Logs dans l'interface utilisateur du pipeline, vous pouvez configurer ces paramètres optionnels.

#### Acheminer les logs vers plusieurs organisations Datadog {#route-logs-to-multiple-datadog-organizations}

Vous pouvez acheminer les logs vers plusieurs organisations Datadog. Une fois le routage configuré, vous pouvez [afficher les métriques du composant ou d'organisations spécifiques](#view-metrics-for-the-component-or-specific-organizations) vers lesquelles vous acheminez les logs.

**Remarque** : Vous pouvez acheminer vers jusqu'à 100 organisations Datadog.

{{< img src="observability_pipelines/destinations/multi_dd_orgs.png" alt="La destination Datadog Logs nous montrant les organisations us1 et us3" style="width:45%;" >}}

Cliquez sur {{< ui >}}Route to Multiple Organizations{{< /ui >}} pour configurer le routage vers plusieurs organisations Datadog.

- Si vous n'avez pas encore ajouté d'organisations, saisissez les détails de l'organisation comme décrit dans la section [Ajouter une organisation Datadog](#add-an-organization).
- Si vous avez déjà ajouté des organisations, vous pouvez :
  - Cliquez sur une organisation dans le tableau pour la modifier ou la supprimer.
  - Utilisez la barre de recherche pour trouver une organisation spécifique par nom, requête de filtre ou site Datadog, puis sélectionnez l'organisation pour la modifier ou la supprimer.
  - [Afficher les métriques](#view-metrics-for-the-component-or-specific-organizations) pour une organisation.
  - Cliquez sur {{< ui >}}Add organization{{< /ui >}} pour acheminer vers une autre organisation Datadog.

**Remarque** : Si vous ne configurez pas le routage vers plusieurs organisations Datadog, les logs sont acheminés vers l'organisation Datadog par défaut. Il s'agit de l'organisation liée à la clé d'API lors de l'installation du Worker.

#### Ajouter une organisation {#add-an-organization}

<div class="alert alert-warning">Les logs qui ne correspondent à aucun des filtres d'organisation sont supprimés. La <a href="#component-level-metrics">métrique du composant</a> <code>Data dropped (intentional)</code> indique le nombre de logs qui ne correspondent pas aux filtres et qui sont supprimés.</div>

1. Saisissez un nom pour l'organisation.
	- **Remarque** : Le nom n'a pas besoin de correspondre au nom réel de l'organisation Datadog.
1. Définissez une requête de filtre. Seuls les logs qui correspondent à la requête de filtre spécifiée sont envoyés à l'organisation. Consultez la [Observability Pipelines Search Syntax][3] pour plus d'informations sur la rédaction de requêtes de filtrage.
1. Sélectionnez le site de l'organisation Datadog.
1. Saisissez l'identifiant de la clé d'API pour cette organisation Datadog.
	- **Remarque** : Saisissez uniquement l'identifiant de la clé d'API. Ne **saisissez pas** la clé d'API réelle.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

#### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut du secret {#secret-defaults}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

Il n'y a aucun identifiant de secret pour cette destination.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

<!-- vale Datadog.words_case_sensitive = NO -->
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}
<!-- vale Datadog.words_case_sensitive = YES -->

{{% /tab %}}
{{< /tabs >}}

## Afficher les métriques pour le composant ou des organisations spécifiques {#view-metrics-for-the-component-or-specific-organizations}

Vous pouvez afficher les métriques au [niveau du composant](#component-level-metrics) ou au [niveau de l'organisation](#organization-level-metrics).

### Métriques au niveau du composant {#component-level-metrics}

Pour afficher les métriques de la destination Datadog Logs globale :

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez votre pipeline.
1. Cliquez sur la roue dentée de la {{< ui >}}Datadog Logs{{< /ui >}} destination et sélectionnez {{< ui >}}View details{{< /ui >}}.

**Remarque** : La métrique {{< ui >}}Data dropped (intentional){{< /ui >}} affiche les logs qui ne correspondent à aucun des filtres des organisations.

### Métriques au niveau de l'organisation {#organization-level-metrics}

Pour afficher les métriques d'une organisation Datadog spécifique :

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez votre pipeline.
1. Cliquez sur la {{< ui >}}Datadog Logs{{< /ui >}} destination pour que les organisations s'affichent.
  {{< img src="observability_pipelines/destinations/multi_dd_orgs_highlighted.png" alt="La destination Datadog Logs affichant les organisations us1 et us3 en surbrillance" style="width:45%;" >}}
1. Cliquez sur l'organisation pour laquelle vous souhaitez voir les métriques.
1. Cliquez sur {{< ui >}}View Health Metrics{{< /ui >}}.

Sinon, cliquez sur {{< ui >}}Review Configured Organizations{{< /ui >}} dans la destination Datadog Logs. Ensuite, cliquez sur l'icône de graphique dans la colonne {{< ui >}}Metrics{{< /ui >}} pour l'organisation.

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][7] et les [métriques de tampon de destination][8] émises par toutes les destinations, consultez la documentation [Pipelines Usage Metrics][9].

{{< site-region region="us,ap1,ap2,uk1" >}}

## AWS PrivateLink {#aws-privatelink}

Pour envoyer des logs depuis Observability Pipelines vers Datadog en utilisant AWS PrivateLink, consultez [Connect to Datadog over AWS PrivateLink][1] pour obtenir les instructions de configuration. Les deux endpoints que vous devez configurer sont :

- Logs (User HTTP intake): {{< region-param key=http_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Remarque** : L'endpoint `obpipeline-intake.datadoghq.com` est utilisé pour Live Capture et n'est pas disponible en tant qu'endpoint PrivateLink.

[1]: /fr/agent/guide/private-link/?tab=crossregionprivatelinkendpoints

{{< /site-region >}}
{{< site-region region="us3" >}}

<!-- vale Datadog.headings = NO -->
## Azure Private Link {#azure-private-link}
<!-- vale Datadog.headings = YES -->

Pour envoyer des logs depuis Observability Pipelines vers Datadog en utilisant Azure Private Link, consultez [Connect to Datadog over Azure Private Link][1] pour obtenir les instructions de configuration. Les deux endpoints que vous devez configurer sont :

- Logs (User HTTP intake): `http-intake.logs.us3.datadoghq.com`
- Remote Configuration: `config.us3.datadoghq.com`

**Remarque** : L'endpoint `obpipeline-intake.datadoghq.com` est utilisé pour Live Capture et n'est pas disponible en tant que Private Link endpoint.

[1]: /fr/agent/guide/azure-private-link/?site=us3

{{< /site-region >}}

### Métriques Datadog Logs {#datadog-logs-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Le tag `component_type` est `datadog_logs` pour les métriques de destination Datadog Logs.

`pipelines.datadog_logs_reserved_attribute_conflicts_total`
: **Description**: Le nombre de conflits rencontrés lors du déplacement de champs ayant une signification sémantique vers un [reserved attribute][10] Datadog. Consultez l'[exemple](#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute). Disponible dans la version 2.18 de Worker et ultérieures.
: **Type de métrique** : count

#### Example of relocating fields with semantic meaning to a Datadog reserved attribute {#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute}

La source OpenTelemetry décode l'événement suivant, où `severity_text` correspond sémantiquement à the reserved `status` attribute:

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "attributes": {
    "status": 404,
    "http.method": "GET"
  },
  "timestamp": "..."
}
```

Un processeur aplatit ensuite l'événement, de sorte que `status` et `severity_text` existent tous deux au niveau supérieur :

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "status": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

Comme the reserved `status` attribute existe déjà, la destination le renomme en `_RESERVED_severity` pour éviter qu'il ne soit écrasé par le champ en conflit :

```json
{
  "message": "GET /api/users returned 404",
  "status": "WARN",
  "_RESERVED_severity": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Destinations event batching][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| 1 000          | 4,25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/search_syntax/logs/
[4]: /fr/observability_pipelines/configuration/set_up_pipelines/
[5]: /fr/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[10]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes