---
aliases: null
description: アプリケーションのトレース生成にオープン標準を使用する
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: OpenTelemetry
  text: Collectorドキュメント
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: ブログ
  text: Datadog と OpenTelemetry のパートナーシップ
- link: /tracing/connect_logs_and_traces/opentelemetry
  tag: Documentation
  text: OpenTelemetry トレースとログに接続
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: ブログ
  text: OpenTelemetry 用 AWS マネージド Lambda レイヤーについて
kind: documentation
title: OpenTelemetry と OpenTracing
---
Datadog は [OpenTelemetry][1] および [OpenTracing][2] のような、さまざまなオープン標準をサポートしています。

## Datadog コンポーネントで OpenTelemetry を使用するためのオプション

アプリケーションやサービスが OpenTelemetry ライブラリでインスツルメントされている場合、トレースデータを Datadog バックエンドに取得するために 2 つの経路から選択することができます。

1. [トレースを OpenTelemetry コレクターに送信し、Datadog エクスポーターで Datadog に転送する][3]、または

2. [Datadog Agent でトレースを取り込み、Datadog のために収集させます][4]。

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="トレースデータを生成し、観測可能性製品に送信するためのマップオプション。">}}

## OpenTelemetry のトレースとログを接続する

OpenTelemetry のトレースとログを接続することで、アプリケーションログのモニタリングと分析時に OpenTelemetry トレースにより提供されるコンテキストを追加することができます。言語固有の使用方法とサンプルコードは [OpenTelemetry トレースとログを接続][5]を参照してください。

## その他の選択肢

Datadog は OpenTelemetry Collector Datadog エクスポーターまたは Datadog Agent の OTLP 取り込みを OpenTelemetry のトレーシングクライアントと併用することをお勧めしています。しかし、これがうまく動作しない場合には、サポートされている各言語でも [OpenTracing のデータを Datadog に送信する][6]ことをサポートしています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: https://opentracing.io/docs/
[3]: /ja/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
[4]: /ja/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
[5]: /ja/tracing/connect_logs_and_traces/opentelemetry
[6]: /ja/tracing/setup_overview/open_standards/java