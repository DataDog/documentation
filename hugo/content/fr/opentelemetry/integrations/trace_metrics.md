---
aliases:
- /fr/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentation
  text: Démarrage du Collector
- link: /opentelemetry/ingestion_sampling/
  tag: Documentation
  text: Échantillonnage d'ingestion avec OpenTelemetry
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: Documentation
  text: Mappage des conventions sémantiques OpenTelemetry vers les spans d'entrée
    de service
title: Métriques de trace
---
## Présentation {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="Métriques APM d'OpenTelemetry" style="width:100%;" >}}

Datadog APM utilise des métriques de trace, qui mesurent le taux de requêtes, les erreurs et la durée (RED), pour alimenter le Catalog, la Service Page, la Resource Page et tout ce qui repose sur les métriques `trace.*`.

Cette page couvre les configurations qui envoient des données OTLP à Datadog, telles que l'[OpenTelemetry Collector en amont][1]. Si vous utilisez le [DDOT Collector][4] ou le [Datadog Exporter and Connector][6], le Datadog Connector calcule les métriques de trace. Pour les SDK DDOT (SDK Datadog en mode OpenTelemetry), consultez la [configuration de l'extrapolation des métriques de trace et les versions minimales][3].

## Choisissez une source {#choose-a-source}

Vous pouvez calculer des métriques de trace à partir de trois sources. Datadog recommande le connecteur `span_metrics`.

| Source | Comportement d'échantillonnage | Facturation |
|---|---|---|
| [`span_metrics` connecteur](#use-the-span_metrics-connector) (recommandé) | Calcule les métriques à partir de chaque span reçu par le Collector. Placez le connecteur avant tout processeur d'échantillonnage. | Inclus dans l'APM. |
| [Métriques HTTP du SDK](#use-http-metrics-from-the-sdk) | Non affectées par l'échantillonnage des spans, car le SDK agrège chaque requête avant l'exportation. | Les attributs utilisés pour les métriques de trace sont inclus dans l'APM. Les métriques HTTP brutes sont facturées en tant que [Custom Metrics][7], sauf si vous les supprimez. |
| [Spans envoyés à l'ingestion Datadog](#compute-trace-metrics-in-the-datadog-intake) | Calcule les métriques uniquement à partir des spans reçus par l'ingestion. Pour couvrir tout le trafic, envoyez des spans non échantillonnés. | Inclus dans l'APM. |

N'utilisez pas les métriques HTTP avec le connecteur `span_metrics`, car Datadog calcule alors les métriques de trace à partir des deux sources.

## Utilisez le connecteur span_metrics {#use-the-span-metrics-connector}

Sélectionnez votre environnement dans la [configuration recommandée du Collector][1] et utilisez son bloc de connecteur `span_metrics` complet. Conservez toutes ses dimensions, que Datadog utilise pour dériver les tags d'hôte, les services pairs, les noms d'opération et les noms de ressource.

Placez le connecteur avant tout processeur d'échantillonnage afin qu'il calcule les métriques à partir de tous les spans reçus par le Collector.

Dans un [déploiement de passerelle][8], donnez à chaque collecteur en amont son propre connecteur `span_metrics`. Une passerelle qui reçoit des spans déjà échantillonnés produit des métriques sous-évaluées.

## Utilisez les métriques HTTP du SDK {#use-http-metrics-from-the-sdk}

Datadog peut calculer des métriques de trace à partir des [métriques HTTP][9] émises par les SDK OpenTelemetry. Cette source présente les limites suivantes :

- Les SDK de langage n'émettent pas tous de métriques HTTP.
- Les métriques HTTP n'ont pas d'équivalent pour les spans RPC, de base de données ou de messagerie.
- Seuls `http.server.request.duration` et `http.client.request.duration` sont stables dans la spécification OpenTelemetry.

Pour utiliser cette source, définissez `trace_metrics.instrumentation_metrics_calc` sur `true` dans l'[en-tête `dd-otel-metric-config`][10]. Définissez `raw_instrumentation_metrics_drop` pour conserver ou supprimer les métriques HTTP brutes.

Le tableau suivant montre le résultat de chaque combinaison. Les deux champs ont `false` comme valeur par défaut.

| `trace_metrics.instrumentation_metrics_calc` | `raw_instrumentation_metrics_drop` | Résultat |
|---|---|---|
| `true` | `true` | Les métriques HTTP alimentent les métriques de trace avec une cardinalité réduite. Datadog supprime les métriques HTTP brutes, elles ne sont donc pas facturées en tant que Custom Metrics. |
| `true` | `false` | Les métriques HTTP alimentent les métriques de trace. Datadog conserve également les métriques HTTP brutes avec une cardinalité complète en tant que Custom Metrics, que vous pouvez utiliser dans vos propres dashboards et monitors. |
| `false` | `true` | Aucun effet, car `raw_instrumentation_metrics_drop` ne s'applique que lorsque `trace_metrics.instrumentation_metrics_calc` est `true`. Datadog conserve les métriques HTTP brutes à cardinalité complète en tant que Custom Metrics. Pour les supprimer sans activer les métriques de trace, filtrez-les dans le Collector ou désactivez-les dans le SDK. |
| `false` | `false` | Datadog conserve les métriques HTTP brutes à cardinalité complète en tant que Custom Metrics. |

## Calculez les métriques de trace au niveau du point d'ingestion de Datadog {#compute-trace-metrics-in-the-datadog-intake}

Par défaut, Datadog ne calcule pas les métriques de trace pour les traces envoyées à l'ingestion de traces OTLP. Pour les calculer à partir des spans que vous envoyez, définissez l'en-tête `compute_stats` sur `true` dans l'exporter qui envoie les traces. Pour des exemples, consultez [Envoyer des traces au point de collecte OTLP][11].

## Données collectées {#data-collected}

Voir [Métriques de trace][2].

## Exemple de configuration complète {#full-example-configuration}

Pour des exemples de fichiers complets et fonctionnels, consultez le dépôt [`opentelemetry-examples`][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /fr/tracing/metrics/metrics_namespace/
[3]: /fr/opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks
[4]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/#datadog-connector
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector
[6]: /fr/opentelemetry/setup/collector_exporter/datadog_exporter/
[7]: /fr/metrics/custom_metrics/
[8]: https://opentelemetry.io/docs/collector/deploy/gateway/
[9]: https://opentelemetry.io/docs/specs/semconv/http/http-metrics/
[10]: /fr/opentelemetry/setup/collector_exporter/#dd-otel-metric-config-header
[11]: /fr/opentelemetry/setup/otlp_ingest/traces/