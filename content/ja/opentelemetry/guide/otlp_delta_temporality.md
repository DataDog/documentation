---
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: OTLP メトリクスタイプ
- link: /opentelemetry/
  tag: Documentation
  text: Datadog の OpenTelemetry サポート
title: OpenTelemetry によるデルタ一時性メトリクスの生成
---

## 概要

OpenTelemetry プロトコル (OTLP) は、*デルタ*または*累積*[集計一時性][2]のいずれかを持つことができる[いくつかのメトリクスタイプ][1]を送信します。Datadog は、単調和、ヒストグラム、指数ヒストグラムのデルタ集計の一時性を最もよく機能させることができます。

このガイドでは、代わりに累積集計一時性を使用することの意味と、OpenTelemetry SDK または [OpenTelemetry Collector `cumulativetodelta`プロセッサ][3]を使用して、どの集計一時性でメトリクスをエクスポートするか選択する方法について説明します。

## 累積集計一時性を利用することの意味

OTLP の単調和、ヒストグラム、または累積集計一時性を持つ指数ヒストグラムの送信を選択した場合、Datadog は時系列上の連続するポイント間の差分を取ります。これは、次のことを意味します。

- デプロイはステートフルなので、時系列のすべてのポイントを同じ Datadog Agent または Datadog エクスポーターに送信する必要があります。これは、OpenTelemetry Collector のデプロイをスケールする方法に影響します。
- Datadog は、ある時系列から受信した最初のポイントが、その時系列の真の開始点であることを確認できない場合、そのポイントを送信しないことがあります。このため、再起動時にポイントが欠落することがあります。
- 累積 OTLP ヒストグラムの場合、最小値と最大値は復元できません。ヒストグラムのエクスポートモードによっては、欠落するか近似値になる可能性があります。

## OpenTelemetry SDK の構成

OpenTelemetry SDK から OTLP メトリクスを生成する場合、これらのメトリクスタイプをデルタ集計一時性で生成するように OTLP エクスポーターを構成することができます。一部の言語では、`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` 環境変数を `Delta` に設定することで推奨構成を使用できます (大文字と小文字は区別されません)。この環境変数がサポートされている言語の一覧は、[仕様準拠マトリックス][4]を参照してください。

SDK がこの環境変数をサポートしていない場合は、コードでデルタ一時性を構成することができます。次の例は、OTLP HTTP エクスポーターを構成し、2 秒ごとにカウンターに `1` を追加し、合計で 5 分とします。

{{< programming-lang-wrapper langs="python,go,java,.net" >}}

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

{{< programming-lang lang=".net" >}}
```c#
// 必須: $ dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol

using System.Diagnostics;
using System.Diagnostics.Metrics;
using OpenTelemetry;
using OpenTelemetry.Exporter;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;

namespace GettingStarted;

public class Program
{
    public static void Main()
    {
        using var meter = new Meter("my-meter");
        var providerBuilder = Sdk.CreateMeterProviderBuilder().AddMeter(meter.Name);
        providerBuilder.AddOtlpExporter((exporterOptions, metricReaderOptions) =>
            {
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

OTLP gRPC エクスポーターも同様に構成することができます。

## Collector でデルタ一時性に変換する

メトリクスが OpenTelemetry 言語ライブラリから提供されていない場合、デルタ集計一時性を使用するように構成することが不可能な場合があります。例えば、Prometheus のような他のオープンソースライブラリでメトリクスを作成する場合などがそうです。このような場合、[累積-デルタプロセッサ][3]を使用して、メトリクスをデルタ集計一時性にマッピングすることができます。デプロイはまだステートフルなので、デプロイメントに複数の Collector がある場合は、メトリクスのすべてのポイントが同じ Collector インスタンスに送信されるように、ステートフル Collector の最初のレイヤーでプロセッサを使用する必要があります。

累積-デルタプロセッサを有効にして、すべてのメトリクスに適用するには、`processors` セクションに空の構成で定義します。

```yaml
processors:
    cumulativetodelta:
```

最後に、メトリクスパイプラインの `processors` リストに追加します。

**注**: 累積-デルタプロセッサは指数ヒストグラムをサポートしません。また、最小値や最大値など一部のフィールドは、このアプローチでは回復できません。代わりに、可能な限り OpenTelemetry SDK のアプローチを使用してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/open_telemetry/otlp_metric_types
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#sums
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/cumulativetodeltaprocessor
[4]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables