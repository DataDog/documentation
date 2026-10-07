---
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: Types de métriques OTLP
- link: /opentelemetry/
  tag: Documentation
  text: Prise en charge d'OpenTelemetry dans Datadog
title: Générer des métriques de temporalité delta avec OpenTelemetry
---

## Présentation

Le protocole OpenTelemetry (OTLP) envoie [plusieurs types de métriques][1], certains pouvant avoir une [temporalité d'agrégation][2] *delta* ou *cumulée*[2]. Pour un fonctionnement optimal, il est préférable d'utiliser la temporalité delta pour les sommes monotones, les histogrammes et les histogrammes exponentiels dans Datadog.

Ce guide décrit les points à prendre en compte si la temporalité d'agrégation cumulée est utilisée au lieu de la temporalité delta. Il explique également comment sélectionner la temporalité d'agrégation pour l'exportation de vos métriques, que vous utilisiez le SDK OpenTelemetry ou [le processeur `cumulativetodelta` du Collector OpenTelemetry][3].

## Points à prendre en compte en cas d'utilisation de la temporalité d'agrégation cumulée

Si vous choisissez d'envoyer des sommes monotones, des histogrammes ou des histogrammes exponentiels OTLP avec la temporalité d'agrégation cumulée, Datadog calcule la différence entre les points consécutifs d'une série temporelle. Cela signifie que :

- Votre déploiement étant de type stateful, vous devrez envoyer l'intégralité des points d'une série temporelle au même Agent Datadog ou au même exportateur Datadog. Cela affectera la mise à l'échelle de vos déploiements du Collector OpenTelemetry.
- Datadog risque de ne pas envoyer le premier point qu'il reçoit d'une série temporelle donnée s'il ne peut pas s'assurer que ce point est le véritable début de la série temporelle, ce qui peut conduire à des points manquants en cas de redémarrage.

## Configurer votre SDK OpenTelemetry

Si vous générez des métriques OTLP à partir d'un SDK OpenTelemetry, vous pouvez configurer votre exportateur OTLP pour qu'il génère ces types de métriques en utilisant la temporalité d'agrégation delta. Avec certains langages, vous pouvez utiliser la configuration recommandée en définissant la variable d'environnement `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` sur `Delta` (sensible à la casse). Pour obtenir la liste des langages qui prennent en charge cette variable d'environnement, consultez le [tableau des conformités à la spécification][4].

Si votre SDK ne prend pas en charge cette variable d'environnement, vous pouvez configurer la temporalité delta dans le code. L'exemple suivant configure un exportateur HTTP OTLP et ajoute `1` à une métrique counter toutes les deux secondes pendant cinq minutes :

{{< programming-lang-wrapper langs="python,go,java" >}}

{{< programming-lang lang="python" >}}
```python
import time

from opentelemetry.exporter.otlp.proto.http.metric_exporter import (
    OTLPMetricExporter,
)
from opentelemetry.sdk.metrics import (
    Counter,
    Histogram,
    MeterProvider,
    ObservableCounter,
    ObservableGauge,
    ObservableUpDownCounter,
    UpDownCounter,
)
from opentelemetry.sdk.metrics.export import (
    AggregationTemporality,
    PeriodicExportingMetricReader,
)

deltaTemporality = {
    Counter: AggregationTemporality.DELTA,
    UpDownCounter: AggregationTemporality.CUMULATIVE,
    Histogram: AggregationTemporality.DELTA,
    ObservableCounter: AggregationTemporality.DELTA,
    ObservableUpDownCounter: AggregationTemporality.CUMULATIVE,
    ObservableGauge: AggregationTemporality.CUMULATIVE,
}

exporter = OTLPMetricExporter(preferred_temporality=deltaTemporality)
reader = PeriodicExportingMetricReader(exporter)
provider = MeterProvider(metric_readers=[reader])

meter = provider.get_meter("my-meter")

counter = meter.create_counter("example.counter")

for i in range(150):
    counter.add(1)
    time.sleep(2)
```
{{< /programming-lang >}}


{{< programming-lang lang="go" >}}
```go
package main

import (
    "context"
    "time"

    "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"
    "go.opentelemetry.io/otel/sdk/metric"
    "go.opentelemetry.io/otel/sdk/metric/metricdata"
)

func deltaSelector(kind metric.InstrumentKind) metricdata.Temporality {
    switch kind {
    case metric.InstrumentKindCounter,
        metric.InstrumentKindHistogram,
        metric.InstrumentKindObservableGauge,
        metric.InstrumentKindObservableCounter:
        return metricdata.DeltaTemporality
    case metric.InstrumentKindUpDownCounter,
        metric.InstrumentKindObservableUpDownCounter:
        return metricdata.CumulativeTemporality
    }
    panic("unknown instrument kind")
}

func main() {
    ctx := context.Background()
    exporter, err := otlpmetrichttp.New(ctx,
        otlpmetrichttp.WithTemporalitySelector(deltaSelector),
    )
    if err != nil {
        panic(err)
    }

    reader := metric.NewPeriodicReader(exporter)
    provider := metric.NewMeterProvider(metric.WithReader(reader))
    defer func() {
        if err := meterProvider.Shutdown(ctx); err != nil {
            panic(err)
        }
    }()

    meter := provider.Meter("my-meter")
    counter, err := meter.Int64Counter("example.counter")
    if err != nil {
        panic(err)
    }

    for i := 0; i < 150; i++ {
        counter.Add(ctx, 1)
        time.Sleep(2 * time.Second)
    }
}
```
{{< /programming-lang >}}


{{< programming-lang lang="java" >}}
```java
package io.opentelemetry.example.delta;

import io.opentelemetry.api.metrics.LongCounter;
import io.opentelemetry.api.metrics.Meter;
import io.opentelemetry.api.metrics.MeterProvider;
import io.opentelemetry.exporter.otlp.http.metrics.OtlpHttpMetricExporter;
import io.opentelemetry.sdk.metrics.export.AggregationTemporalitySelector;
import io.opentelemetry.sdk.metrics.export.MetricReader;
import io.opentelemetry.sdk.metrics.SdkMeterProvider;
import io.opentelemetry.sdk.metrics.export.PeriodicMetricReader;

public final class Main {
  public static void main(String[] args) throws InterruptedException {
    OtlpHttpMetricExporter exporter = 
        OtlpHttpMetricExporter.builder()
        .setAggregationTemporalitySelector(
            AggregationTemporalitySelector.deltaPreferred())
        .build();

    MetricReader reader = 
        PeriodicMetricReader.builder(exporter).build();

    MeterProvider provider = SdkMeterProvider.builder()
        .registerMetricReader(reader)
        .build();

    Meter meter = provider.get("my-meter");

    LongCounter counter = 
        meter.counterBuilder("example.counter").build();

    for (int i = 0; i < 150; i++) {
      counter.add(1);
      Thread.sleep(2000);
    }
  }
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Vous pouvez configurer des exportateurs gRPC OTLP en appliquant la même méthode.

## Convertir vos métriques en temporalité delta à l'aide du Collector

Si vos métriques ne proviennent pas d'une bibliothèque d'un langage pris en charge par OpenTelemetry, il est possible que vous ne puissiez pas les configurer de façon à utiliser la temporalité delta. Ce problème peut notamment survenir lorsque vous générez des métriques avec d'autres bibliothèques open source, telles que Prometheus. Si vous êtes dans ce cas de figure, vous pouvez utiliser le [processeur de temporalité cumulée vers temporalité delta][3] afin de convertir vos métriques en temporalité delta. Étant donné que votre déploiement sera toujours de type stateful, si vous utilisez plusieurs Collectors, vous devrez appliquer le processeur sur une première couche de Collectors stateful pour que l'ensemble des points d'une métrique soient envoyés à la même instance du Collector.

Pour activer le processeur de temporalité cumulée vers temporalité delta afin qu'il s'applique à l'ensemble de vos métriques, définissez-le avec une configuration vide dans la section `processors` :

```yaml
processors:
    cumulativetodelta:
```

Enfin, ajoutez-le à la liste `processors` sur vos pipelines de métriques.

**Remarque** : le processeur de temporalité cumulée vers temporalité delta ne prend pas en charge les histogrammes exponentiels. Par ailleurs, certains champs tels que le minimum et le maximum ne peuvent pas être récupérés avec cette méthode. Il est préférable d'utiliser le SDK OpenTelemetry dans la mesure du possible.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/open_telemetry/otlp_metric_types
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#sums
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/cumulativetodeltaprocessor
[4]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables