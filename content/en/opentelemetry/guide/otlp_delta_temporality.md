---
title: Producing delta temporality metrics with OpenTelemetry
kind: guide
further_reading:
- link: "/metrics/open_telemetry/otlp_metric_types"
  tag: "Documentation"
  text: "OTLP Metric Types"
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
---

## Overview

The OpenTelemetry protocol (OTLP) can send [several metric types][1] some of which can have *delta* of *cumulative* [aggregation temporality][2]. You can select which aggregation temporality to export your metrics with on your OpenTelemetry SDK. Datadog products work best with delta aggregation temporality for OTLP monotonic sums, OTLP histograms and OTLP exponential histograms, which can be configured at the OpenTelemetry SDK level or by using the [OpenTelemetry Collector cumulative to delta processor][3].

## Implications of using cumulative aggregation temporality

If you send OTLP monotonic sums, OTLP histograms or OTLP exponential histograms with cumulative aggregation temporality, Datadog products take the difference between consecutive points on a timeseries. This means that:

- Your deployment will be stateful, so you need to send all points on a timeseries to the same Datadog Agent or Datadog exporter. This affects how you scale your OpenTelemetry Collector deployments.
- Datadog products may not send the first point they receive from a given timeseries if they cannot ensure this point is the 'true' start of the timeseries. This may lead to missing points upon restarts.

## Configuring your OpenTelemetry SDK

If you are producing OTLP metrics from an OpenTelemetry SDK, you can configure your OTLP exporter to produce these metric types with delta aggregation temporality. In some languages you can use the recommended configuration by setting the `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` environment variable with the (case-insensitive) `Delta` value. The list of languages with support for this environment variable can be found on the [specification compliance matrix][4].

If your SDK does not support this environment variable you can configure this in code. The following example configures an OTLP HTTP exporter and adds 1 to a counter every 2 seconds for a total of 5 minutes:

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
/* TBD */
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

OTLP gRPC exporters can be configured in a similar fashion.

## Converting to delta temporality on the Collector

TODO: fill this section.

[1]: /metrics/open_telemetry/otlp_metric_types
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#sums
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/cumulativetodeltaprocessor
[4]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables
