---
description: Découvrez les composants source, processeur et destination qui constituent
  un pipeline, ainsi que la manière de les créer et de les déployer.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: Documentation
  text: Configurez des pipelines
- link: observability_pipelines/configuration/install_the_worker/
  tag: Documentation
  text: Installez le Worker
- link: observability_pipelines/configuration/live_capture/
  tag: Documentation
  text: En savoir plus sur Live Capture
- link: observability_pipelines/troubleshooting
  tag: Documentation
  text: Dépannage
title: Configuration
---
## Présentation {#overview}

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="La page des pipelines avec une source allant vers deux groupes de processeurs et deux destinations" style="width:100%;" >}}

Observability Pipelines vous permet de collecter et de traiter {{< tooltip text="logs, metrics, and traces" tooltip="Contactez votre responsable de compte pour discuter des cas d'utilisation et de la tarification." >}} au sein de votre propre infrastructure, puis acheminez-les vers différentes destinations. Un pipeline se compose de trois composants principaux :

- [Source][1] : reçoit des données provenant d'un outil tel que le Datadog Agent.
- [Processors][2] : transforment, enrichissent ou filtrent les données.
- [Destinations][3] : où les données sont envoyées (par exemple, Datadog, Amazon S3, Splunk, Google Security Operations et Microsoft Sentinel).

Créez et déployez des pipelines pour collecter, transformer et acheminer vos données en utilisant l'une de ces méthodes :

 - [Pipeline UI][4]
 - [API][5]
 - [Terraform][6]

## Types de pipelines {#pipeline-types}

Il existe deux types de pipelines :

{{< tabs >}}
{{% tab "Logs" %}}

Utilisez l'un des [modèles de logs][1] pour créer un pipeline de logs.

- Archiver les logs
- Dual Ship Logs
- Générer des métriques basées sur les logs
- Log Enrichment
- Log Volume Control
- Rédaction de données sensibles
- Fractionner les logs

Consultez [Set Up Pipelines][2] pour plus d'informations sur la configuration d'une source, de processors et de destinations.

[1]: /fr/observability_pipelines/configuration/explore_templates/?tab=logs#templates
[2]: /fr/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}

{{% tab "Métriques" %}}

Utilisez le modèle [Metric Tag Governance][1] pour créer un pipeline de métriques.

Consultez [Set Up Pipelines][2] pour plus d'informations sur la configuration d'une source, de processors et d'une destination.

### Données de métriques {#metrics-data}

Les métriques envoyées à Observability Pipelines incluent les éléments suivants :

- `name` : Le nom de la métrique.
- `kind` : Il existe deux types de métriques :
  - `absolute` métriques : Représente la valeur actuelle d'une mesure au moment où elle est rapportée.
  - `incremental` métriques : Représente le changement d'une mesure depuis la dernière valeur rapportée, que le système agrège au fil du temps.
- `value` : Le [type de métrique](#metric-types) :
	- `counter`
	- `gauge`
	- `distribution`
	- `histogram`
- `timestamp` : La date et l'heure auxquelles la métrique est créée.
- `tags` : Inclut des tags tels que `host`.

Le fait qu'une métrique reçue soit `incremental` ou `absolute` dépend de la source. Par exemple, les métriques provenant d'OpenTelemetry peuvent être incrémentielles ou absolues en fonction de leur [temporalité][4]. Le tableau suivant est un exemple de métrique de compteur OTel envoyée avec une temporalité delta par rapport à une temporalité cumulative.

| Type de métrique | Incrémentiel                      | Absolu                               |
|-------------|----------------------------------|----------------------------------------|
| Compteur     | Envoyé sous forme de deltas : `+2`, `+4`, `+6` | Envoyé sous forme de somme cumulative : `2`, `6`, `10` |

Un exemple de métrique :

```
{
  "name":"datadog.agent.retry_queue_duration.bytes_per_sec",
  "tags":{
    "agent":"core",
    "domain":"https://7-72-3-app.agent.datadoghq.com",
    "host":"COMP-YGVQDJG75L",
    "source_type_name":"System",
    "env:prod"
  },
  "timestamp":"2025-11-28T13:03:09Z",
  "kind":"absolute",
  "gauge":{"value":454.1372767857143}
}
```

### Types de métriques {#metric-types}

Les types de métriques disponibles :

| Type de métrique ; | Description                                                                                                                                                       | Exemple                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNTER      | Le nombre total d'occurrences d'événements dans un intervalle de temps. Peut être réinitialisé à zéro, mais ne peut pas être diminué.                                                        | Vous souhaitez compter le nombre de logs avec `status:error`.                                     |
| GAUGE        | Un instantané d'une valeur au moment où elle est rapportée.                                                                                                                 | Vous souhaitez suivre la dernière utilisation du CPU pour chaque host.                                   |
| HISTOGRAM    | Agrégations statistiques (`avg`, `min`, `max`, `count`, `median`, percentiles) calculées par host par le Datadog Agent dans un intervalle de temps, puis envoyées à Datadog. | Vous souhaitez des agrégations de latence de requête par host à partir de chaque serveur web.                          |
| DISTRIBUTION | Valeurs brutes envoyées à Datadog afin que les agrégations de percentiles soient calculées côté serveur, globalement sur chaque host rapportant la métrique dans un intervalle de temps.             | Vous souhaitez la latence p95 globale d'un endpoint d'API, calculée sur chaque host qui le dessert.  |

Consultez [Metric Types][3] pour plus d'informations.

[1]: /fr/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[2]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: /fr/metrics/types/?tab=gauge#metric-types
[4]: https://opentelemetry.io/docs/specs/otel/metrics/data-model/#temporality

{{% /tab %}}

{{% tab "Traces" %}}

Vous pouvez ingérer, traiter et envoyer {{< tooltip text="traces" tooltip="Contactez votre responsable de compte pour demander l'accès." >}} vers différentes destinations en utilisant le modèle [Trace Sampling][1].

Consultez [Set Up Pipelines][2] pour plus d'informations sur la configuration d'une source, de processors et de destinations.

[1]: /fr/observability_pipelines/configuration/explore_templates/?tab=traces#trace-sampling
[2]: /fr/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}
{{< /tabs >}}

## Lectures complémentaires {#further-reading}

 {{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/sources/
[2]: /fr/observability_pipelines/processors/
[3]: /fr/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /fr/api/latest/observability-pipelines/#create-a-new-pipeline
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs