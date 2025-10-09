---
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: 설명서
  text: OTLP 메트릭 유형
- link: /opentelemetry/
  tag: 설명서
  text: Datadog의 OpenTelemetry 지원
title: OpenTelemetry를 사용하여 델타 시간성 메트릭 생성하기
---

## 개요

OpenTelemetry Protocol(OTLP)는 [여러 메트릭 유형][1]을 전송하며, 그중 일부는 *델타* 또는 *누적* [집계 시간성][2]을 가질 수 있습니다. Datadog는 단조 합계, 히스토그램 및 지수 히스토그램에 대한 델타 집계 시간성 사용 시 가장 잘 작동합니다. 

이 가이드에서는 누적 집계 시간성을 대신 사용하는 것의 의미와 OpenTelemetry 소프트웨어 SDK 또는 [OpenTelemetry 수집기 `cumulativetodelta` 프로세서][3]를 사용하여 메트릭을 사용하여 집계 시간성을 선택하는 방법에 관해 자세히 설명합니다.

## 누적 집계 시간성 사용의 의미

OpenTelemetry Protocol 단조 합계, 히스토그램 또는 누적 집계 시간성을 가진 지수 히스토그램을 보내도록 선택하면 Datadog 시계열에서 연속된 지점 간의 차이를 수집합니다. 즉, 다음을 의미합니다.

- 배포는 스테이트풀 방식이므로 시계열의 모든 포인트를 동일한 Datadog Agent 또는 Datadog 내보내기로 보내야 합니다. 이는 OpenTelemetry 수집기 배포 환경을 확장하는 방법에 영향을 줍니다.
- Datadog는 주어진 시계열에서 받은 첫 번째 포인트가 시계열의 실제 시작점인지 확인할 수 없는 경우 이 포인트를 보내지 않을 수 있습니다. 이로 인해 다시 시작할 때 포인트가 누락될 수 있습니다.
- 누적 OpenTelemetry Protocol 히스토그램의 경우 최소값과 최대값을 복구할 수 없으며, 히스토그램 내보내기 모드에 따라 누락되거나 근사치가 나올 수 있습니다. 

## OpenTelemetry SDK 구성하기

OpenTelemetry SDK에서 OTLP 메트릭을 생성하는 경우 OTLP 내보내기를 구성하여 델타 집계 시간성을 포함하는 메트릭 유형을 생성할 수 있습니다. 일부 언어에서는 `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` 환경 변수를 `Delta`(대소문자 구분)로 설정하여 권장 구성을 사용할 수 있습니다. 이 환경 변수를 지원하는 언어 목록은 [사양 준수 매트릭스][4]를 참조하세요.

SDK에서 이 환경 변수를 지원하지 않는 경우 코드에서 델타 시간성을 구성할 수 있습니다. 다음 예는 OpenTelemetry Protocol HTTP 내보내기를 구성하고 총 5분 동안 2초마다 `1`을 카운터에 추가하는 예제입니다.

**참고**: 이 예제는 시작하는 데 도움을 주려는 목적으로 제공됩니다. 프로덕션 시나리오에서는 콘솔 또는 stdout 내보내기를 사용하는 등 패턴을 적용해선 안 됩니다.

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
// 필수: $ dotnet 추가 패키지 OpenTelemetry.Exporter.OpenTelemetryProtocol

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

비슷한 방식으로 OpenTelemetry Protocol gRPC 내보내기를 구성할 수 있습니다.

## 수집기에서 델타 시간성으로 변환하기

메트릭이 OpenTelemetry 언어 라이브러리에서 제공되지 않는 경우 델타 집계 시간성을 사용하도록 구성하는 것이 불가능할 수 있습니다. 예를 들어 Prometheus와 같은 다른 오픈 소스 라이브러리로 메트릭을 생성하는 경우가 있습니다. 이때, [cumulative to delta 프로세서][3]를 사용하여 메트릭을 델타 집계 시간성에 매핑할 수 있습니다. 배포 환경이 스테이트풀인 경우, 즉 배포 환경에 여러 수집기가 있는 경우, 첫 번째 계층에서 프로세서를 사용하여 메트릭의 모든 포인트가 동일한 수집기 인스턴스로 전송되도록 해야 합니다.

cumulative-to-delta 프로세서를 활성화하여 모든 지표에 적용하려면 `processors` 섹션에서 빈 구성으로 정의합니다.

```yaml
processors:
    cumulativetodelta:
```

마지막으로 메트릭 파이프라인의 `processors` 목록에 추가합니다.

**참고**: cumulative-to-delta 프로세서는 지수 히스토그램을 지원하지 않습니다. 또한 최솟값 및 최댓값과 같은 일부 필드는 이 접근 방식으로는 복구할 수 없습니다. 대신 가능하면 OpenTelemetry SDK 접근 방식을 사용하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/open_telemetry/otlp_metric_types
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#sums
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/cumulativetodeltaprocessor
[4]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables