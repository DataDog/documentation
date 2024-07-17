---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
aliases:
- /ja/tracing/setup_overview/open_standards/
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

<div class="alert alert-danger">
  <strong>Important:</strong> OpenTelemetry Collector Contrib v0.95.0 introduces a breaking change that disables Trace Metrics computation in the Datadog Exporter. Follow Datadog's <a href="/opentelemetry/guide/migration/">migration guide</a> when upgrading.
</div>

## Overview

[OpenTelemetry][1] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OpenTelemetry provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

If your applications and services are instrumented with OpenTelemetry libraries, you can choose how to get traces, metrics, and logs data to the Datadog backend:

1. [Send data to the OpenTelemetry collector, and use the Datadog exporter to forward it to Datadog][3], or

2. [Ingest data with the Datadog Agent, which collects it for Datadog][4].

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Map options for generating telemetry data and sending it to observability products.">}}

<div class="alert alert-info"><strong>Beta: Custom Instrumentation with the OpenTelemetry API</strong></br>For some supported languages, you can configure OpenTelemetry instrumented applications to use the Datadog tracing library to process spans and traces. For more information, read <a href="/tracing/trace_collection/otel_instrumentation/">Custom Instrumentation with the OpenTelemetry API</a>.</div>

Datadog supports the [W3C Trace Context standard][6], ensuring complete traces are captured even when a request travels between services that have been instrumented with different tools. Services need only be instrumented with any system, such as an OpenTelemetry library or Datadog tracing library, that follows the W3C Trace Context standard. Read [Propagating Trace Context][5] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /ja/opentelemetry/collector_exporter/
[4]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[5]: /ja/tracing/trace_collection/trace_context_propagation/
[6]: https://www.w3.org/TR/trace-context/