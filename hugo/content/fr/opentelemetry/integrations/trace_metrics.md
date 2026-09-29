---
aliases:
- /fr/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentation
  text: Démarrage du Collector
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: Documentation
  text: Mappage des conventions sémantiques OpenTelemetry vers les spans d'entrée
    de service
title: Métriques de trace
---
## Présentation {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="Métriques APM d'OpenTelemetry" style="width:100%;" >}}

Pour envoyer des statistiques APM telles que les hits, les erreurs et la durée, configurez le [`span_metrics` connecteur][1]. Configurez le connecteur pour recevoir toutes les traces avant tous les processeurs d'échantillonnage, afin que les métriques de trace représentent le trafic non échantillonné.

## Configuration {#setup}

Sélectionnez votre environnement dans la [configuration recommandée du Collector][1] et utilisez son bloc de connecteur `span_metrics` complet. Conservez toutes ses dimensions, que Datadog utilise pour dériver les tags d'hôte, les services pairs, les noms d'opération et les noms de ressource.

## Données collectées {#data-collected}

Voir [Métriques de trace][2].

## Exemple de configuration complète {#full-example-configuration}

Pour des exemples de fichiers complets et fonctionnels, consultez le dépôt [`opentelemetry-examples`][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /fr/tracing/metrics/metrics_namespace/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector