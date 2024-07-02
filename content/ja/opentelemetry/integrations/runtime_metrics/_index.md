---
title: OpenTelemetry Runtime Metrics
aliases:
- /opentelemetry/runtime_metrics/
type: multi-code-lang
---

## 概要

ランタイムメトリクスとは、メモリ使用量、ガベージコレクション、または並列化に関するアプリケーションメトリクスです。Datadog のトレーシングライブラリは、各サポート言語での[ランタイムメトリクスの収集][5]を提供していますが、さらに OpenTelemetry (OTel) もランタイムメトリクスを収集し、OpenTelemetry SDK を通じて Datadog に送信することができます。

Datadog は、以下の言語で OpenTelemetry のランタイムメトリクスを収集します。
- Java
- .NET
- Go

## メトリクスの命名規則

ランタイムメトリクスは、そのソース (OpenTelemetry Collector Datadog Exporter、Datadog Agent OTLP Ingestion、または Datadog トレーシングライブラリ) に応じて異なる命名規則に従います。Datadog で OpenTelemetry のランタイムメトリクスを使用する場合、元の OpenTelemetry のランタイムメトリクスと、同等のメトリクスにマッピングされた Datadog のランタイムメトリクスの両方を受け取ります。ランタイムメトリクスには、そのソースを示す以下のプレフィックスがあります。

| OTel Collector Datadog Exporter | Datadog Agent OTLP Ingestion |  Datadog トレーシングライブラリ |
| --- | --- | --- |
| `otel.process.runtime.*` | `process.runtime.*` | `runtime.<LANG>.*` |

**注**: OpenTelemetry のランタイムメトリクスはメトリクス名で Datadog にマッピングされます。OpenTelemetry ランタイムメトリクスのホストメトリクスの名前を変更しないでください。変更すると機能が壊れます。

For details about host and container metrics mapping, read [OpenTelemetry Metrics Mapping][1].

## セットアップ

Select your language to see instructions for setting up and configuring the OpenTelemetry SDK to send runtime metrics:

{{< partial name="opentelemetry/otel-runtime-metrics.html" >}}
<br/>

## View runtime metric dashboards

After setup is complete, see your runtime metrics in the a service's details page (see Java example below), the flame graph metrics tab, and in [default runtime dashboards][7].

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="Service page showing OpenTelemetry runtime metrics on the JVM Metrics tab" style="width:100%;" >}}

[1]: /opentelemetry/guide/metrics_mapping/
[5]: /tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics
