---
title: Producing Delta Temporality Metrics with OpenTelemetry
further_reading:
- link: "/metrics/open_telemetry/otlp_metric_types"
  tag: "Documentation"
  text: "OTLP Metric Types"
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
---

## Overview

The OpenTelemetry protocol (OTLP) sends [several metric types][1], some of which can have either *delta* or *cumulative* [aggregation temporality][2]. Datadog works best with delta aggregation temporality for monotonic sums, histograms, and exponential histograms. 

This guide describes the implications of using cumulative aggregation temporality instead, and how to select which aggregation temporality to export your metrics with, either in the OpenTelemetry SDK or by using the [OpenTelemetry Collector `cumulativetodelta` processor][3].

## Implications of using cumulative aggregation temporality

If you opt to send OTLP monotonic sums, histograms, or exponential histograms with cumulative aggregation temporality, Datadog takes the difference between consecutive points on a timeseries. This means that:

- Your deployment is stateful, so you need to send all points on a timeseries to the same Datadog Agent or Datadog exporter. This affects how you scale your OpenTelemetry Collector deployments.
- Datadog might not send the first point it receives from a given timeseries if it cannot ensure this point is the true start of the timeseries. This may lead to missing points upon restarts.
- The minimum and maximum cannot be recovered for cumulative OTLP Histograms; they may be missing or approximated depending on the histograms export mode. 

## Configuring your OpenTelemetry SDK

If you produce OTLP metrics from an OpenTelemetry SDK, you can configure your OTLP exporter to produce these metric types with delta aggregation temporality. In some languages you can use the recommended configuration by setting the `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` environment variable to `Delta` (case-insensitive). For a list of languages with support for this environment variable, read [the specification compliance matrix][4].

If your SDK does not support this environment variable you can configure delta temporality in code. The following example configures an OTLP HTTP exporter and adds `1` to a counter every two seconds for a total of five minutes.

**Note**: These examples are intended to help you get started. You shouldn't apply patterns like using console or stdout exporters in production scenarios.

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

You can configure OTLP gRPC exporters in a similar fashion.

## Converting to delta temporality on the Collector

When your metrics do not come from an OpenTelemetry language library, it may be infeasible to configure them to use delta aggregation temporality. This may be the case, for example, when producing metrics with other open source libraries such as Prometheus. In this situation, you can use the [cumulative to delta processor][3] to map your metrics to delta aggregation temporality. Your deployment is still stateful, so if your deployment has multiple Collectors, you need to use the processor on a first layer of stateful Collectors to ensure that all points of a metric are sent to the same Collector instance.

To enable the cumulative-to-delta processor so that it applies to all your metrics, define it with an empty configuration on the `processors` section:

```yaml
processors:
    cumulativetodelta:
```

Finally, add it to the `processors` list on your metrics pipelines.

**Note**: The cumulative-to-delta processor does not support exponential histograms. Also, some fields, such as the minimum and maximum, can't be recovered with this approach. Instead, use the OpenTelemetry SDK approach whenever possible.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/open_telemetry/otlp_metric_types
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#sums
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/cumulativetodeltaprocessor
[4]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables
