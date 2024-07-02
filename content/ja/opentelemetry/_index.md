---
title: OpenTelemetry in Datadog
aliases:
- /tracing/setup_overview/open_standards/
further_reading:
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: Blog
  text: Datadog's partnership with OpenTelemetry
- link: "https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/"
  tag: Blog
  text: Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: Blog
  text: Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog Exporter 
- link: "https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/"
  tag: Blog
  text: Forward logs from the OpenTelemetry Collector with the Datadog Exporter
- link: "https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/"
  tag: Blog
  text: OTLP ingestion in the Agent
- link: "https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/"
  tag: Blog
  text: Learn more about AWS's managed Lambda Layer for OpenTelemetry
- link: "https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/"
  tag: Blog
  text: Correlate Datadog RUM events with traces from OpenTelemetry-instrumented applications
- link: "https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/"
  tag: Blog
  text: Monitor runtime metrics from OTel-instrumented apps with Datadog APM
algolia:
  tags: [opentelemetry, open telemetry, otel]
cascade:
    algolia:
        rank: 70
---

<div class="alert alert-danger">
  <strong>Important:</strong> OpenTelemetry Collector Contrib v0.95.0 introduces a breaking change that disables Trace Metrics computation in the Datadog Exporter. Follow Datadog's <a href="/opentelemetry/guide/migration/">migration guide</a> when upgrading.
</div>

## 概要

[OpenTelemetry][1] は、オープンソースの観測可能性フレームワークで、IT チームにテレメトリーデータを収集しルーティングするための標準化されたプロトコルとツールを提供します。Cloud Native Computing Foundation][2] (CNCF) によってインキュベータープロジェクトとして作成された OpenTelemetry は、アプリケーションテレメトリーデータ (メトリクス、ログ、トレースなど) をインスツルメント、生成、収集、エクスポートし、分析および洞察するための監視プラットフォームに対して一貫したフォーマットを提供するものです。

アプリケーションやサービスが OpenTelemetry ライブラリでインスツルメントされている場合、トレース、メトリクス、ログのデータを Datadog バックエンドに取得する方法を選択することができます。

1. [データを OpenTelemetry コレクターに送信し、Datadog エクスポーターで Datadog に転送する][3]、または

2. [Ingest data with the Datadog Agent, which collects it for Datadog][4].

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="テレメトリーデータを生成し、観測可能性製品に送信するためのマップオプション。">}}

<div class="alert alert-info"><strong>ベータ版: OpenTelemetry API を使用したカスタムインスツルメンテーション</strong></br>サポートされている一部の言語では、スパンとトレースを処理するために Datadog トレーシングライブラリを使用するように、OpenTelemetry インスツルメンテーションアプリケーションを構成することができます。詳しくは、<a href="/tracing/trace_collection/otel_instrumentation/">OpenTelemetry API を使用したカスタムインスツルメンテーション</a>をお読みください。</div>

Datadog supports the [W3C Trace Context standard][6], ensuring complete traces are captured even when a request travels between services that have been instrumented with different tools. Services need only be instrumented with any system, such as an OpenTelemetry library or Datadog tracing library, that follows the W3C Trace Context standard. Read [Propagating Trace Context][5] for more information.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /opentelemetry/collector_exporter/
[4]: /opentelemetry/otlp_ingest_in_the_agent/
[5]: /tracing/trace_collection/trace_context_propagation/
[6]: https://www.w3.org/TR/trace-context/
