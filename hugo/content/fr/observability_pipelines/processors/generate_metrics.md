---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur de génération de métriques basées sur les logs
---
{{< product-availability >}}

## Présentation {#overview}

De nombreux types de logs sont utilisés pour suivre des tendances, tels que les KPI, sur de longues périodes. Générer des métriques à partir de vos logs est un moyen rentable de résumer les données de logs provenant de logs volumineux, tels que les logs de CDN, les logs de flux VPC, les logs de pare-feu et les logs de réseau. Utilisez le processeur de génération de métriques pour générer des métriques de comptage, de jauge ou de distribution à partir de logs correspondant à une requête, et envoyez-les vers votre destination.

**Remarque** : Les métriques générées à partir des logs et acheminées vers Datadog sont des [métriques personnalisées][1] et facturées en conséquence. Consultez [Facturation des Custom Metrics][2] pour plus d’informations.

## Configuration {#setup}

Pour configurer le processeur :

Cliquez sur {{< ui >}}Manage Metrics{{< /ui >}} pour créer de nouvelles métriques ou modifier des métriques existantes. Cela ouvre un panneau latéral.

- Si vous n’avez pas encore créé de métriques, saisissez les paramètres de métrique comme décrit dans la section [Ajouter une métrique](#add-a-metric) pour créer une métrique.
- Si vous avez déjà créé des métriques, cliquez sur la ligne de la métrique dans le tableau de synthèse pour la modifier ou la supprimer. Utilisez la barre de recherche pour trouver une métrique spécifique par son nom, puis sélectionnez la métrique pour la modifier ou la supprimer. Cliquez sur {{< ui >}}Add Metric{{< /ui >}} pour ajouter une autre métrique.

### Ajouter une métrique {#add-a-metric}

<div class="alert alert-warning">Le processeur de génération de métriques utilise le <code>timestamp</code> champ sur un log pour définir l’horodatage de la métrique. Si le log <code>timestamp</code> est une valeur de chaîne, le temps de traitement du log est utilisé à la place. Consultez <a href="#convert-string-timestamp-to-timestamp-format">Convertir un horodatage de chaîne au format horodatage</a> pour plus d’informations.</div>

1. Saisissez une requête de filtre. Consultez [Syntaxe de recherche de logs][5] pour plus d’informations. 
   - Seuls les logs correspondant au filtre sont traités.
   - Tous les logs, qu’ils correspondent ou non à la requête de filtrage, sont envoyés à l’étape suivante du pipeline.
   - **Remarque** : Comme un seul processeur peut générer plusieurs métriques, vous pouvez définir une requête de filtrage différente pour chaque métrique.
1. Saisissez un nom pour la métrique.
1. Dans la section {{< ui >}}Define parameters{{< /ui >}}, sélectionnez le type de métrique (compte, jauge ou distribution). Consultez l’[exemple de métrique Count](#count-metric-example) et l’[exemple de métrique Distribution](#distribution-metric-example). Consultez également [Types de métriques](#metrics-types) pour plus d’informations.
    - Pour les types de métriques 'jauge' et 'distribution', sélectionnez un champ de log qui possède une valeur numérique (ou une chaîne numérique analysable) utilisée pour la valeur de la métrique générée.
    - Pour le type de métrique de distribution, la valeur du champ de log peut être un tableau de valeurs numériques (analysables), qui est utilisé pour l'ensemble d'échantillons de la métrique générée.
    - Le champ {{< ui >}}Group by{{< /ui >}} détermine comment les valeurs de métrique sont regroupées. Par exemple, si vous avez des centaines d'hôtes répartis dans quatre régions, le regroupement par région vous permet de représenter une ligne pour chaque région. Les champs listés dans le paramètre {{< ui >}}Group by{{< /ui >}} sont définis comme des tags sur la métrique configurée.
1. Cliquez sur {{< ui >}}Add Metric{{< /ui >}}.

### Configurez une destination de métriques {#configure-a-metrics-destination}

{{< callout url="#" btn_hidden="true" header="Rejoignez la Preview !">}}
L'envoi de métriques générées à partir de logs vers la destination Splunk HEC, Elasticsearch ou Client HTTP/S est en préversion. Contactez votre responsable de compte pour demander l'accès.
{{< /callout >}}

<div class="alert alert-info">L'option d'envoyer des métriques générées vers une destination autre que <a href="/observability_pipelines/destinations/datadog_metrics/">Datadog Metrics</a> est disponible pour les versions 2.18 et ultérieures de Worker.<br><br>Si vous effectuez une mise à niveau vers la version 2.18 ou ultérieure de Worker pour un pipeline existant qui possède déjà un processeur Generate Metrics et que vous souhaitez sélectionner une destination autre que Datadog Metrics, vous devez :<br>&nbsp;&nbsp;&nbsp;&nbsp;1. Supprimer le processeur Generate Metrics précédent.<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Ajouter et configurer un nouveau processeur Generate Metrics.</div>

{{< img src="observability_pipelines/processors/generate_metrics_destination.png" alt="Le processeur Generate Metrics avec « Select a destination » mis en surbrillance." style="width:50%;" >}}

1. Sur le processeur Generate Metrics, cliquez sur **Add Metrics Destination**.<br>**Remarque** : Si vous utilisez la simulation de pipeline, retournez à la page du pipeline pour configurer votre destination de métriques. Cliquez sur **Back to pipeline** dans le coin supérieur droit de la page de simulation de pipeline.
1. [Datadog Metrics][6] est la destination par défaut. Pour sélectionner une destination différente, cliquez sur l'icône en forme de crayon sur la destination Datadog Metrics et sélectionnez **Changer la destination des métriques**.
1. Sélectionnez votre destination et suivez les instructions de configuration pour la [destination][7] spécifique.

## Types de métriques {#metrics-types}

Vous pouvez générer ces types de métriques pour vos logs. Consultez la documentation sur les [Types de métriques][3] et les [Distributions][4] pour plus de détails.

| Type de métrique  | Description                                                                                                                                         | Exemple                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COMPTE        | Le nombre total d'occurrences d'événements dans un intervalle de temps. Peut être réinitialisé à zéro, mais ne peut pas être diminué.                                          | Vous souhaitez compter le nombre de logs avec `status:error`.                                     |
| JAUGE        | Un instantané d'une valeur au moment où elle est rapportée.                                                                                                   | Vous souhaitez suivre la dernière utilisation du processeur par host.                                        |
| DISTRIBUTION | Valeurs brutes envoyées à Datadog afin que les agrégations de centiles (telles que p95, p99) soient calculées côté serveur, globalement sur chaque host rapportant la métrique. | Vous souhaitez obtenir le p95 global de `response_time_seconds` sur chaque host desservant un endpoint d'API. |

### Exemple de métrique de type Count {#count-metric-example}

Pour cet exemple de log `status:error` :

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

Pour créer une métrique de type Count qui compte le nombre de logs contenant `"status":"error"` et les regroupe par `env` et `host`, saisissez les informations suivantes :

| Paramètres d'entrée | Valeur               |
|------------------|---------------------|
| Requête de filtre     | `@status:error`     |
| Nom de la métrique      | `status_error_total`|
| Type de métrique      | Count               |
| Grouper par         | `env`, `prod`       |

### Exemple de métrique de distribution {#distribution-metric-example}

Pour cet exemple de log de réponse d'API :

```
{
    "timestamp": "2018-10-15T17:01:33Z",
    "method": "GET",
    "status": 200,
    "request_body": "{"information"}",
    "response_time_seconds: 10
}
```

Pour créer une métrique de distribution qui mesure le temps moyen nécessaire pour effectuer un appel API, saisissez les informations suivantes :

| Paramètres d'entrée       | Valeur                   |
|------------------------|-------------------------|
| Requête de filtre           | `@method`               |
| Nom de la métrique            | `status_200_response`   |
| Type de métrique            | Distribution            |
| Sélectionnez un attribut de log | `response_time_seconds` |
| Grouper par               | `method`                |

## Convertir l'horodatage de chaîne au format horodatage {#convert-string-timestamp-to-timestamp-format}

Le processeur Generate Metrics ne peut utiliser le champ de log `timestamp` pour définir l'horodatage de la métrique que si le champ de log est de type horodatage. Si le champ `timestamp` est une chaîne, l'heure à laquelle le log est traité est utilisée à la place. Pour utiliser le `timestamp` de log, vous devez convertir la chaîne en type horodatage avant d'envoyer les logs au processeur Generate Metrics.

Pour convertir un horodatage de chaîne au format horodatage :

1. Ajoutez un [Custom Processor][8] à votre pipeline avant le processeur Generate Metrics.
1. Ajoutez une fonction avec le script personnalisé suivant :
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][9] for more information.

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][10] et les [métriques de tampon de processeur][11] émises par tous les processeurs, consultez la documentation [Pipelines Usage Metrics][12].

### Métriques du processeur Generate Metrics {#generate-metrics-processor-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Le tag `component_type` est `generate_metrics` pour les métriques de ce processeur.

`pipelines.generated_metrics_from_logs_total`
: **Description**: Le nombre de métriques générées à partir des événements de log par le processeur.
: **Type de métrique** : count

[1]: /fr/metrics/custom_metrics/
[2]: /fr/account_management/billing/custom_metrics/
[3]: /fr/metrics/types/
[4]: /fr/metrics/distributions/
[5]: /fr/observability_pipelines/search_syntax/logs/
[6]: /fr/observability_pipelines/destinations/datadog_metrics/
[7]: /fr/observability_pipelines/destinations/?tab=metrics#destinations
[8]: /fr/observability_pipelines/processors/custom_processor/#setup
[9]: /fr/observability_pipelines/processors/custom_processor/#parse_timestamp
[10]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[12]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/