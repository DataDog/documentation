---
title: Mappage de métriques Prometheus avec des métriques Datadog

aliases:
  - /fr/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
  - link: https://www.datadoghq.com/blog/sql-server-metrics/#creer-une-procedure-stockee-pour-generer-et-recueillir-des-metriques
    tag: Blog
    text: Créer une procédure stockée pour générer et recueillir des métriques
  - link: /integrations/mysql/
    tag: Documentation
    text: Intégration Datadog/MySQL
  - link: /agent/kubernetes/prometheus/
    tag: Documentation
    text: Collecte de métriques Prometheus et OpenMetrics avec Kubernetes
---
Si vous utilisez le check Prometheus ou OpenMetrics de Datadog, il peut être utile de savoir comment ces métriques sont mappées avec les métriques Datadog existantes.

Consultez la section [Collecte de métriques Prometheus et OpenMetrics avec Kubernetes][1] pour en savoir plus.

## Types de métriques Prometheus et OpenMetrics

* `counter` : une métrique cumulative qui représente un nombre unique à augmentation monotone. Sa valeur ne peut qu'augmenter ou être réinitialisée à zéro.
* `gauge` : une métrique qui représente une valeur numérique unique pouvant augmenter et diminuer de façon arbitraire.
* `histogram` : effectue un échantillonnage d'observations et les comptabilise dans des compartiments configurables ; calcule également la somme de toutes les valeurs observées.
* `summary` : similaire à une métrique histogram. Effectue un échantillonnage d'observations, calcule la somme de toutes les valeurs observées et calcule des quantiles configurables sur une période glissante.

## Mappage de métriques Prometheus/OpenMetrics avec des métriques Datadog

Pour en savoir plus, consultez la documentation sur les [types de métriques Datadog][2].

### Counter

Par défaut, les métriques [`counter` de Prometheus/OpenMetrics][3] sont mappées avec les métriques `monotonic_count` de Datadog.

Cependant, si le paramètre `send_monotonic_counter` est défini sur `false`, ces métriques sont alors envoyées en tant que `gauge`. [En savoir plus sur les counters monotones][4].

### Gauge

Les métriques [`gauge` de Prometheus/OpenMetrics][5] sont mappées avec les métriques `gauge` de Datadog.

### Histogram

Pour les métriques [`histogram` de Prometheus/OpenMetrics][6], les valeurs `_count` et `_sum` de chaque métrique sont toutes les deux mappées avec la métrique `gauge` de Datadog.

Si le paramètre `send_histograms_buckets` est défini sur `true`, chaque `_bucket` est également mappé avec la métrique `gauge` de Datadog.

Si le paramètre `send_distribution_buckets` est défini sur `true`, chaque `_bucket` est mappé avec une métrique `distribution` de Datadog. Les données des métriques histogram Prometheus/OpenMetrics sont converties en métriques de distribution Datadog pour pouvoir surveiller les métriques Kubernetes en tant que centiles dans Datadog. Les métriques de distribution Datadog sont basées sur l'[algorithme DDSketch][7]. Pour en savoir plus, consultez l'[article de blog sur les métriques OpenMetrics et de distribution][8] (en anglais).

Si le paramètre `send_distribution_counts_as_monotonic` est défini sur `true`, chaque métrique qui se termine par `_count` est envoyée en tant que `monotonic_count`. [En savoir plus sur les counters monotones][4].

### Summary

Pour les métriques [`summary` de Prometheus/OpenMetrics][9], les valeurs `_count` et `_sum` de chaque métrique summary sont toutes les deux mappées avec la métrique `gauge` de Datadog.

Si le paramètre `send_distribution_buckets` est défini sur `true`, les métriques histogram sont converties en métriques distribution, et chaque `_bucket` peut être récupérée à l'aide de tags `distribution`.

Si le paramètre `send_distribution_counts_as_monotonic` est défini sur `true`, chaque métrique qui se termine par `_count` est envoyée en tant que `monotonic_count`. [En savoir plus sur les counters monotones][4].

[1]: /fr/agent/kubernetes/prometheus/
[2]: /fr/metrics/types/
[3]: https://prometheus.io/docs/concepts/metric_types/#counter
[4]: /fr/metrics/agent_metrics_submission/?tab=count#monotonic-count
[5]: https://prometheus.io/docs/concepts/metric_types/#gauge
[6]: https://prometheus.io/docs/concepts/metric_types/#histogram
[7]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[8]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[9]: https://prometheus.io/docs/concepts/metric_types/#summary