---
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: Types de métriques OTLP
- link: /opentelemetry/
  tag: Documentation
  text: Prise en charge d'OpenTelemetry dans Datadog
kind: guide
title: Visualisation des histogrammes OTLP sous forme de cartes thermiques
---

## Présentation

Le protocole OpenTelemetry (OTLP) permet d'envoyer des histogrammes OTLP, un type de métrique qui compresse les informations sur un ensemble de mesures en fournissant des statistiques agrégées, telles que la somme, le nombre, le minimum et le maximum. Les histogrammes OTLP comptent également le nombre de ces mesures qui entrent dans des catégories configurables par l'utilisateur.

Vous pouvez visualiser ce type de données sous la forme d'une [carte thermique][5] dans Datadog en suivant les étapes décrites sur cette page.

**Remarque** : le type OTLP Exponential Histogram associé peut également être affiché sous forme de carte thermique, puisqu'il est converti en distribution. Pour en savoir plus sur les distributions, consultez la [page dédiée aux distributions][4].

## Implémentation

Ce guide part du principe que votre [configuration permet d'envoyer des métriques OpenTelemetry à Datadog][1].

### Configuration du SDK OpenTelemetry

Si vous générez des métriques à partir d'un SDK OpenTelemetry, suivez les étapes ci-dessous pour les configurer :

1. [Configurez la temporalité delta pour le SDK servant à envoyer vos histogrammes OTLP][2]. Cela permet au widget Carte thermique d'utiliser les valeurs minimales et maximales.
2. Choisissez si vous souhaitez remplacer les [limites de compartiment par défaut][3] de votre agrégation. **Remarque** : chaque compartiment supplémentaire est considéré comme une métrique custom distincte.

Pour les métriques provenant d'autres sources, assurez-vous, si possible, que ces métriques sont fournies en tant qu'histogrammes OTLP avec les champs de valeur minimale et de valeur maximale définis.

### Configuration avec l'exportateur Datadog ou l'Agent Datadog

Définissez le mode Histogramme et activez les métriques d'agrégation sur votre exportateur Datadog ou sur l'Agent Datadog.

{{< tabs >}}
{{% tab "Exportateur Datadog (collecteur OpenTelemetry)" %}}

Dans le fichier `collector.yaml` de l'exportateur Datadog, configurez le mode Histogramme sur `counters`, puis activez les métriques d'agrégation avec le flag `send_aggregation_metrics`.

```yaml
exporters:
  datadog:
    metrics:
      histograms:
        mode: counters
        send_aggregation_metrics: true
```

**Remarque** : `send_aggregation_metrics` est disponible à partir de la version 0.75.0 de l'exportateur Datadog. Si vous utilisez une version antérieure, utilisez plutôt le flag `send_count_sum_metrics`. Ces versions antérieures ne fournissent pas de valeur minimale et maximale.

{{% /tab %}}
{{% tab "Agent Datadog" %}}

Dans la section `otlp_config`, configurez le mode Histogramme sur `counters` et activez les métriques d'agrégation avec le flag `send_aggregation_metrics`.

```yaml
otlp_config:
  metrics:
    histograms:
      mode: counters
      send_aggregation_metrics: true
```

**Remarque** : `send_aggregation_metrics` est disponible à partir de la version 6.45.0/7.45.0 de l'Agent Datadog. SI vous utilisez une version antérieure, utilisez plutôt le flag `send_count_sum_metrics`. Ces versions antérieures ne fournissent pas de valeur minimale et maximale.

{{% /tab %}}
{{< /tabs >}}


### Configuration du widget Carte thermique

Le [widget Carte thermique][5] repose sur l'ensemble de métriques `<NOM_MÉTRIQUE>.bucket` généré par l'exportateur Datadog ou l'Agent Datadog. Chaque métrique correspondant à un compartiment d'histogramme distinct. Pour visualiser votre histogramme sous forme de carte thermique, procédez comme suit :

1. Sélectionnez la métrique `<NOM_MÉTRIQUE>.bucket` pour la visualiser.
2. Choisissez l'option `pre-binned data` dans le menu `distributions of`.

Vous pouvez alors visualiser votre histogramme OTLP au sein d'un widget Carte thermique.

## Compatibilité d'OpenMetrics

Le [check OpenMetrics de l'Agent Datadog][6] est également compatible avec l'option pre-binned data du widget Carte thermique. Si vous souhaitez envoyer directement des métriques au check OpenMetrics, sans effectuer de conversion OpenTelemetry, activez les flags `collect_histogram_buckets` et `non_cumulative_histogram_buckets` sur votre instance pour vous assurer que les données sont envoyées à Datadog sans problème de compatibilité.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/opentelemetry/otel_metrics
[2]: /fr/opentelemetry/guide/otlp_delta_temporality
[3]: https://opentelemetry.io/docs/reference/specification/metrics/sdk/#explicit-bucket-histogram-aggregation
[4]: /fr/metrics/distributions
[5]: /fr/dashboards/widgets/heatmap
[6]: /fr/integrations/openmetrics