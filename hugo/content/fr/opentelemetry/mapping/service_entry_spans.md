---
aliases:
- /fr/opentelemetry/guide/service_entry_spans_mapping/
- /fr/opentelemetry/schema_semantics/service_entry_spans/
further_reading:
- link: /opentelemetry/integrations/trace_metrics
  tag: Documentation
  text: Métriques de trace OpenTelemetry
title: Mappage des conventions sémantiques OpenTelemetry vers les spans d'entrée de
  service
---
## Présentation {#overview}
Datadog utilise les [spans d'entrée de service][1] dans toute la plateforme pour des fonctionnalités comme les [métriques de trace][2] et l'[APM Trace Explorer][3]. Cette convention est propre à Datadog, mais peut être mappée à partir de l'attribut [`SpanKind`][4] dans OpenTelemetry en suivant le guide d'activation ci-dessous.

## Prérequis {#requirements}

- OTel Collector Contrib v0.100.0 ou version ultérieure
- Datadog Agent v7.53.0 ou version ultérieure

## Configuration {#setup}

Activez l'option de configuration en fonction de votre chemin d'ingestion :

{{< tabs >}}
{{% tab "OTel Collector et Datadog Exporter" %}}

La nouvelle logique d'identification des spans d'entrée de service peut être activée en définissant l'option de configuration `traces::compute_top_level_by_span_kind` sur true dans le [Datadog exporter][2] et le [Datadog connector][1]. Cette option de configuration doit être activée à la fois dans l'exporter et dans le connector si les deux composants sont utilisés.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/connector/datadogconnector/examples/config.yaml#L48-L53
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/exporter/datadogexporter/examples/collector.yaml#L365-L370
{{% /tab %}}
{{% tab "Pipeline d'ingestion OTLP dans le Datadog Agent" %}}

La nouvelle logique d'identification des spans d'entrée de service peut être activée en ajoutant `"enable_otlp_compute_top_level_by_span_kind"` à [apm_config.features][1] dans la configuration du Datadog Agent.

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{< /tabs >}}

## Conventions prises en charge {#supported-conventions}

Les [métriques de trace][2] sont générées pour les spans d'entrée de service et les spans mesurés. Ces conventions de span sont propres à Datadog, les spans OpenTelemetry sont donc identifiés avec le mappage suivant :
| Convention OpenTelemetry | Convention Datadog |
| --- | --- |
| Span racine | Span d'entrée de service |
| Span serveur (`span.kind: server`) | Span d'entrée de service |
| Span consommateur (`span.kind: consumer`) | Span d'entrée de service |
| Span client (`span.kind: client`) | Span mesuré |
| Span producteur (`span.kind: producer`) | Span mesuré |
| Span interne (`span.kind: internal`) | Aucune métrique de trace générée |

## Migration {#migration}

Cette nouvelle logique d'identification des spans d'entrée de service peut augmenter le nombre de spans générant des métriques de trace, ce qui peut affecter les monitors existants basés sur ces métriques de trace. Les utilisateurs qui n'ont que des spans internes verront une diminution des métriques de trace.

Si vous avez des monitors existants basés sur des métriques de trace, vous pouvez les mettre à jour après la mise à niveau, car ce changement introduit plus de cohérence dans les métriques de trace. Si vous n'avez que des spans internes, mettez à jour votre instrumentation conformément au tableau ci-dessus pour recevoir des métriques de trace et des spans d'entrée de service.

[`SpanKind`][4] est généralement défini lors de la création d'un span, mais peut également être mis à jour en utilisant le [transform processor][5] dans l'OpenTelemetry Collector pour contrôler le mappage ci-dessus. Par exemple, si des métriques de trace sont souhaitées pour un span interne, la configuration suivante transforme un span interne avec `http.path: "/health"` en un span client :

```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Client") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/glossary/#service-entry-span
[2]: https://docs.datadoghq.com/fr/opentelemetry/integrations/trace_metrics/
[3]: https://docs.datadoghq.com/fr/tracing/trace_explorer
[4]: https://opentelemetry.io/docs/specs/otel/trace/api/#spankind
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md