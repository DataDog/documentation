---
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipos de métricas OTLP
- link: /opentelemetry/
  tag: Documentación
  text: Soporte de OpenTelemetry en Datadog
title: Generación de métricas de temporalidad delta con OpenTelemetry
---

## Información general

El protocolo OpenTelemetry (OTLP) envía [varios tipos de métrica][1], algunos de los cuales pueden tener una [temporalidad de agregación][2] *delta* o *acumulativa*. Datadog funciona mejor con la temporalidad de agregación delta para sumas monotónicas, histogramas e histogramas exponenciales.

Esta guía describe las implicaciones de utilizar la temporalidad de agregación acumulativa en su lugar y cómo seleccionar con qué temporalidad de agregación exportar tus métricas, ya sea en el SDK de OpenTelemetry o utilizando el [procesador `cumulativetodelta` de OpenTelemetry Collector][3].

## Implicaciones del uso de la temporalidad de agregación acumulativa

Si optas por enviar sumas monotónicas, histogramas o histogramas exponenciales OTLP con temporalidad de agregación acumulativa, Datadog toma la diferencia entre puntos consecutivos de una serie temporal. Esto significa que:

- Tu despliegue tiene estado, por lo que necesitas enviar todos los puntos de una serie temporal al mismo Datadog Agent o Exportador de Datadog. Esto afecta a cómo escalas tus despliegues de OpenTelemetry Collector.
- Datadog puede no enviar el primer punto que recibe de una serie temporal dada si no puede asegurarse de que este punto es el verdadero inicio de la serie temporal. Esto puede provocar que se pierdan puntos al reiniciar.
- El mínimo y el máximo no pueden recuperarse para los histogramas OTLP acumulativos; pueden faltar o ser aproximados según el modo de exportación de los histogramas.

## Configuración del SDK de OpenTelemetry

Si produces métricas OTLP desde un SDK de OpenTelemetry, puedes configurar tu exportador OTLP para producir estos tipos de métrica con temporalidad de agregación delta. En algunos lenguajes puedes utilizar la configuración recomendada estableciendo la variable de entorno `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` en `Delta` (no distingue entre mayúsculas y minúsculas). Para una lista de los lenguajes compatibles con esta variable de entorno, consulta [la matriz de cumplimiento de la especificación][4].

Si tu SDK no admite esta variable de entorno puedes configurar temporalidad delta en código. El siguiente ejemplo configura un exportador OTLP HTTP y añade `1` a un contador cada dos segundos durante un total de cinco minutos.

**Nota**: Estos ejemplos están pensados para ayudarte a comenzar. No deberías aplicar patrones como el uso de la consola o exportadores stdout en escenarios de producción.

{{< programming-lang-wrapper langs="python,go,java,.net" >}}

{{< programming-lang lang="python" >}}
```python
import time

from opentelemetry.exporter.otlp.proto.http.metric_exporter import (
    OTLPMetricExporter, )
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
    ConsoleMetricExporter,
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
reader = PeriodicExportingMetricReader(exporter, export_interval_millis=5_000)
provider = MeterProvider(metric_readers=[reader])

consoleReader = PeriodicExportingMetricReader(
    ConsoleMetricExporter(preferred_temporality=deltaTemporality), export_interval_millis=5_000)
consoleProvider = MeterProvider(metric_readers=[consoleReader])

meter = provider.get_meter("my-meter")
counter = meter.create_counter("example.counter")

consoleMeter = consoleProvider.get_meter("my-meter-console")
consoleCounter = consoleMeter.create_counter("example.counter.console")

for i in range(150):
  counter.add(1)
  consoleCounter.add(1)
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
    "go.opentelemetry.io/otel/exporters/stdout/stdoutmetric"
    "go.opentelemetry.io/otel/sdk/metric"
    "go.opentelemetry.io/otel/sdk/metric/metricdata"
)

func deltaSelector(kind metric.InstrumentKind) metricdata.Temporality {
    switch kind {
    case metric.InstrumentKindCounter,
    metric.InstrumentKindGauge,
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
    consoleExporter, consoleErr := stdoutmetric.New(
        stdoutmetric.WithTemporalitySelector(deltaSelector),
    )
    if err != nil || consoleErr != nil {
        panic(err)
    }

    reader := metric.NewPeriodicReader(exporter,
        metric.WithInterval(5*time.Second),
    )
    provider := metric.NewMeterProvider(metric.WithReader(reader))

    consoleReader := metric.NewPeriodicReader(consoleExporter,
        metric.WithInterval(5*time.Second),
    )
    consoleProvider := metric.NewMeterProvider(metric.WithReader(consoleReader))

    defer func() {
        err := provider.Shutdown(ctx)
        consoleErr := consoleProvider.Shutdown(ctx)
        if err != nil || consoleErr != nil {
            panic(err)
        }
    }()

    meter := provider.Meter("my-meter")
    counter, err := meter.Int64Counter("example.counter")

    consoleMeter := consoleProvider.Meter("my-meter-console")
    consoleCounter, consoleErr := consoleMeter.Int64Counter("example.counter.console")

    if err != nil || consoleErr != nil {
        panic(err)
    }

    for i := 0; i < 150; i++ {
        counter.Add(ctx, 1)
        consoleCounter.Add(ctx, 1)
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

{{< programming-lang lang=".net" >}}
```c#
// Requires: $ dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol

using System.Diagnostics;
using System.Diagnostics.Metrics;
using OpenTelemetry;
using OpenTelemetry.Exporter;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using System.Threading;
using System;
using System.Threading.Tasks;

namespace GettingStarted;

public class Program
{
    public static void Main()
    {
        using var meter = new Meter("my-meter");
        var providerBuilder = Sdk.CreateMeterProviderBuilder().AddMeter(meter.Name);
        providerBuilder
        .AddConsoleExporter((exporterOptions, metricReaderOptions) =>
            {
                metricReaderOptions.PeriodicExportingMetricReaderOptions = new PeriodicExportingMetricReaderOptions
                    {
                        ExportIntervalMilliseconds = Convert.ToInt32("5000"),
                    };
                metricReaderOptions.TemporalityPreference = MetricReaderTemporalityPreference.Delta;
            })
        .AddOtlpExporter((exporterOptions, metricReaderOptions) =>
            {
                metricReaderOptions.PeriodicExportingMetricReaderOptions = new PeriodicExportingMetricReaderOptions
                    {
                        ExportIntervalMilliseconds = Convert.ToInt32("5000"),
                    };
                exporterOptions.Protocol = OtlpExportProtocol.HttpProtobuf;
                metricReaderOptions.TemporalityPreference = MetricReaderTemporalityPreference.Delta;
            });
        using var provider = providerBuilder.Build();

        Counter<int> counter = meter.CreateCounter<int>("example.counter", "1", "Example counter");
        for (int i = 0; i < 150; i++) {
            counter?.Add(1);
            Task.Delay(2000).Wait();
        }
  }
}

```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Puedes configurar exportadores OTLP gRPC de manera similar.

## Conversión a temporalidad delta en el Collector

Cuando tus métricas no proceden de una biblioteca de lenguaje de OpenTelemetry, puede resultar inviable configurar el uso de la temporalidad de agregación delta. Este puede ser el caso, por ejemplo, al producir métricas con otras bibliotecas de código abierto, como Prometheus. En esta situación, puedes utilizar el [procesador acumulativo a delta][3] para asignar tus métricas a la temporalidad de agregación delta. Tu despliegue sigue teniendo estado, por lo que, si tu despliegue tiene varios recopiladores, deberás utilizar el procesador en una primera capa de recopiladores con estado para asegurar que todos los puntos de una métrica se envían a la misma instancia de recopilador.

Para activar el procesador acumulativo a delta de modo que se aplique a todas tus métricas, defínelo con una configuración vacía en la sección `processors`:

```yaml
processors:
    cumulativetodelta:
```

Por último, añádelo a la lista de `processors` en tus pipelines de métricas.

**Nota**: El procesador acumulativo a delta no admite histogramas exponenciales. Además, algunos campos, como el mínimo y el máximo, no se pueden recuperar con este enfoque. En su lugar, utiliza el enfoque del SDK de OpenTelemetry siempre que sea posible.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/open_telemetry/otlp_metric_types
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#sums
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/cumulativetodeltaprocessor
[4]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables