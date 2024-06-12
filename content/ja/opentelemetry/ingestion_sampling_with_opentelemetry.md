---
aliases:
- /ja/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control
  tag: ガイド
  text: トレース取り込み量制御
- link: /tracing/trace_pipeline/ingestion_controls
  tag: ドキュメント
  text: Expression Language
- link: /opentelemetry/
  tag: ドキュメント
  text: Datadog の OpenTelemetry サポート
kind: ドキュメント
title: OpenTelemetry による取り込みサンプリング
---

## 概要

アプリケーションやサービスが OpenTelemetry のライブラリでインスツルメンテーションされている場合、次のことが可能です。
- トレースを **[OpenTelemetry コレクター][1]**に送信し、Datadog エクスポーターで Datadog に転送する
- Datadog Agent と一緒に **[OpenTelemetry コレクター][2]**にトレースを送信し、Datadog に転送する
- トレースを **[Datadog Agent OTLP 取り込み][3]**に送信し、Datadog に転送する

1 つ目と 2 つ目のシナリオでは、Datadog エクスプローラーで [APM RED メトリクス][4] (サービス、演算子、リソースごとのリクエスト/エラー回数とレイテンシー分布) が計算されます。3 つ目のケースでは、Datadog Agent がこれらのメトリクスを計算します。

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation.png" alt="Otel APM メトリクス計算" style="width:100%;" >}}

APM メトリクスと分散型トレーシングは、どちらもアプリケーションのパフォーマンスをモニターするのに便利なツールです。メトリクスは特定のリソースのレイテンシーやエラー率の上昇を発見するのに役立ち、分散型トレーシングは個々のリクエストレベルまで掘り下げることができます。

### サンプリングが役立つ理由

Datadog トレーシングライブラリ、Datadog Agent、OpenTelemetry SDK、OpenTelemetry コレクターは全てサンプリング機能を備えています。なぜなら、ほとんどのサービスでは、アプリケーションの健全性を可視化するために、100% のトレースを取り込む必要はないためです。

Datadog にトレースを送信する前にサンプリングレートを構成することで、以下のことが可能になります。
- ビジネスと観測可能性の目標に最も関連性の高いデータを取り込みます。
- 未使用のトレースデータを Datadog プラットフォームに送信しないようにすることで、ネットワークコストを削減します。
- 全体のコストをコントロールし、管理します。

## 取り込み量を減らす

OpenTelemetry では、OpenTelemetry ライブラリと OpenTelemetry コレクターの両方でサンプリングの構成が可能です。
- OpenTelemetry SDK の**ヘッドベースサンプリング**
- OpenTelemetry コレクターでの**追跡ベースサンプリング**

{{< img src="/opentelemetry/guide/ingestion_otel/otel_head_tail_based_sampling.png" alt="Otel APM メトリクス計算" style="width:100%;" >}}

### SDK レベルのサンプリング

SDK レベルでは、_ヘッドベースサンプリング_を実装することができ、これはサンプリングの決定がトレースの開始時に行われる場合です。このタイプのサンプリングは、高スループットのアプリケーションで、アプリケーションの健全性を監視するためにトラフィックの 100% を可視化する必要がないことが分かっている場合に特に有用です。また、OpenTelemetry がもたらすオーバーヘッドを抑制するのにも有効です。

[TraceIdRatioBased][5] と [ParentBased][6] は、SDK レベルで `trace_id` に基づく決定論的なヘッドベースサンプリングを実装することができる SDK の組み込みサンプラーです。

ヘッドベースサンプリングでは、サンプリングされたトラフィックのみが OpenTelemetry コレクターまたは Datadog Agent に送信され、そこでメトリクスの計算が行われるため、APM メトリクスは**サンプリングされたトラフィック**で計算されます。

正確な統計情報を得るためには、SDK で構成されたサンプリングレートを知っていれば、Datadog のダッシュボードやモニターで[計算式と関数][7]を使ってメトリクスをアップスケールすることが可能です。

スパンからのトレース分析モニターとメトリクスにトレースサンプリングを設定することの意味については、[取り込み量制御ガイド][8]を参照してください。

### コレクターレベルのサンプリング

OpenTelemetry コレクターレベルでは、_追跡ベースサンプリング_を行うことができ、より高度なルールを定義して、エラーや高レイテンシーのトレースに対する可視性を維持することができます。

[Tail Sampling Processor][9] と [Probabilistic Sampling Processor][10] は、コレクターレベルで一連のルールに基づいてトレースをサンプリングすることが可能です。

**注**: 追跡サンプリングの主な制限は、効果的なサンプリング決定のために、与えられたトレースのすべてのスパンが同じコレクターインスタンスによって受信されなければならないということです。トレースが複数のコレクターインスタンスに分散している場合、トレースの一部がドロップされ、同じトレースの他の一部が Datadog に送信される危険性があります。

コレクターレベルのテールベースサンプリングを使用しながら、APM メトリクスがアプリケーションのトラフィックの 100% に基づいて計算されるようにするには、[Datadog Connector][11] を使用します。

<div class="alert alert-info">Datadog Connector は v0.83.0 から利用可能です。古いバージョンから移行する場合は、<a href="/opentelemetry/guide/switch_from_processor_to_connector">OpenTelemetry APM メトリクスのために Datadog Processor から Datadog Connector に切り替える</a>をお読みください。</div>

スパンからのトレース分析モニターとメトリクスにトレースサンプリングを設定することの意味については、[取り込み量制御ガイド][8]を参照してください。

### Datadog Agent によるサンプリング

[Datadog Agent OTLP Ingest][3] を使用する場合、Agent バージョン 7.44.0 から[確率的サンプラー][10]が利用できます。環境変数 `DD_OTLP_CONFIG_TRACES_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE` を使用して設定するか、Agent のコンフィグレーションファイルで以下の YAML を設定します。

```yaml
otlp_config:
  # ...
  traces:
    probabilistic_sampler:
      sampling_percentage: 50
```

上記の例では、50% のトレースがキャプチャされます。

**注**: 確率的サンプラーのプロパティは、すべての Agent で同じサンプリング率を使用すると仮定した場合、完全なトレースのみが取り込まれることを保証します。

確率的サンプラーは、SDK レベルでサンプリング優先度がすでに設定されているスパンを無視します。さらに、確率的サンプラーでキャプチャされなかったスパンは、Datadog Agent の[エラーサンプラーと希少サンプラー][12]でキャプチャされる可能性があり、取り込みデータセットにおいてエラーと稀少エンドポイントトレースの高い反映を確保することができます。

## Datadog UI から取り込み量を監視する

[APM 推定使用量ダッシュボード][13]と推定使用量メトリクス `datadog.estimated_usage.apm.ingested_bytes` を活用すると、特定の期間の取り込み量を視覚化することができます。ダッシュボードで特定の環境とサービスをフィルターして、取り込み量の最大のシェアを占めるサービスを確認できます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/otel_collector_datadog_exporter
[2]: /ja/opentelemetry/otel_collector_datadog_exporter/?tab=alongsidetheagent#step-5---run-the-collector
[3]: /ja/opentelemetry/otlp_ingest_in_the_agent
[4]: /ja/tracing/metrics/metrics_namespace/
[5]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[6]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[7]: /ja/dashboards/functions/#add-a-function
[8]: /ja/tracing/guide/trace_ingestion_volume_control/#effects-of-reducing-trace-ingestion-volume
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector#datadog-connector
[12]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#error-and-rare-traces
[13]: https://app.datadoghq.com/dash/integration/apm_estimated_usage