---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: GitHub
  text: Datadog と OpenTelemetry のパートナーシップ
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: GitHub
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: GitHub
  text: OpenTelemetry コレクターから Datadog エクスポーター経由で Datadog にメトリクスとトレースを送信する
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/
  tag: GitHub
  text: Datadog Exporter で OpenTelemetry Collector からログを転送する
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: GitHub
  text: Agent における OTLP の取り込み
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: ブログ
  text: OpenTelemetry 用の AWS のマネージド Lambda レイヤーについて
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: ブログ
  text: Datadog RUM イベントと OpenTelemetry インスツルメンテーションされたアプリケーションのトレースを相関させる
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/
  tag: ブログ
  text: Datadog APM で OTel インスツルメンテーションさ れたアプリのランタイムメトリクスを監視する
title: Datadog の OpenTelemetry
---

## 概要

[OpenTelemetry][1] は、オープンソースの観測可能性フレームワークで、IT チームにテレメトリーデータの収集とルーティングのための標準化されたプロトコルとツールを提供します。Cloud Native Computing Foundation][2] (CNCF) によってインキュベータープロジェクトとして作成された OpenTelemetry は、アプリケーションテレメトリーデータ (メトリクス、ログ、トレースなど) をインスツルメント、生成、収集、エクスポートし、分析および洞察するための監視プラットフォームに対して一貫したフォーマットを提供するものです。

アプリケーションやサービスが OpenTelemetry ライブラリでインスツルメントされている場合、トレース、メトリクス、ログのデータを Datadog バックエンドに取得する方法を選択することができます。

1. [データを OpenTelemetry コレクターに送信し、Datadog エクスポーターで Datadog に転送する][3]、または

2. [Datadog Agent でデータを取り込み、それを Datadog のために収集します][4]。

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="テレメトリーデータを生成し、観測可能性製品に送信するためのマップオプション。">}}

<div class="alert alert-info"><strong>ベータ版: OpenTelemetry API を使用したカスタムインスツルメンテーション</strong></br>サポートされている一部の言語では、スパンとトレースを処理するために Datadog トレーシングライブラリを使用するように、OpenTelemetry インスツルメンテーションアプリケーションを構成することができます。詳しくは、<a href="/tracing/trace_collection/otel_instrumentation/">OpenTelemetry API を使用したカスタムインスツルメンテーション</a>をお読みください。</div>

Datadog は、[W3C トレースコンテキスト規格][6]をサポートしており、リクエストが異なるツールでインスツルメンテーションされたサービス間を移動する場合でも、完全なトレースをキャプチャすることを保証します。サービスは、OpenTelemetry ライブラリや Datadog トレーシングライブラリなど、W3C トレースコンテキスト規格に準拠した任意のシステムでインスツルメンテーションするだけでよいのです。詳しくは、[トレースコンテキストの伝搬][5]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /ja/opentelemetry/collector_exporter/
[4]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[5]: /ja/tracing/trace_collection/trace_context_propagation/
[6]: https://www.w3.org/TR/trace-context/