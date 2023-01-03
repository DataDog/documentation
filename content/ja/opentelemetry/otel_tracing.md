---
aliases:
- /ja/tracing/setup_overview/open_standards/
- /ja/tracing/trace_collection/open_standards/
description: アプリケーションのトレース生成にオープン標準を使用する
further_reading:
- link: tracing/glossary/
  tag: OpenTelemetry
  text: Collectorドキュメント
- link: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
  tag: ドキュメント
  text: OpenTelemetry トレースとログに接続
kind: documentation
title: OpenTelemetry によるトレース収集
---

## 概要

アプリケーションやサービスが [OpenTelemetry][1] ライブラリでインスツルメントされている場合、トレースデータを Datadog バックエンドに取得するために 2 つの経路から選択することができます。

1. [トレースを OpenTelemetry コレクターに送信し、Datadog エクスポーターで Datadog に転送する][2]、または

2. [Datadog Agent でトレースを取り込み、Datadog のために収集させます][3]。

詳しくは [OpenTelemetry][4] をお読みください。

## OpenTelemetry のトレースとログを接続する

OpenTelemetry のトレースとログを相関させることで、アプリケーションログのモニタリングと分析時に OpenTelemetry トレースにより提供されるコンテキストを追加することができます。言語固有の使用方法とサンプルコードは [OpenTelemetry トレースとログを接続][5]を参照してください。

## OpenTracing

Datadog は OpenTelemetry Collector Datadog エクスポーターまたは Datadog Agent の OTLP 取り込みを OpenTelemetry のトレーシングクライアントと併用することをお勧めしています。しかし、これがうまく動作しない場合には、サポートされている各言語でも [OpenTracing][6] のデータを Datadog に送信することをサポートしています。[対応言語ごとに OpenTracing を設定する][7]をお読みください。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: /ja/opentelemetry/otel_collector_datadog_exporter/
[3]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[4]: /ja/opentelemetry/
[5]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/
[6]: https://opentracing.io/docs/
[7]: /ja/tracing/trace_collection/open_standards/java