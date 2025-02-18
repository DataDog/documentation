---
aliases:
- /ja/opentelemetry/runtime_metrics/
title: OpenTelemetry ランタイムメトリクス
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

ホストおよびコンテナのメトリクスマッピングの詳細については、[OpenTelemetry Metrics Mapping][1] を参照してください。

## セットアップ

ランタイムメトリクスを送信するための OpenTelemetry SDK のセットアップおよび構成手順を確認するには、使用する言語を選択してください。

{{< partial name="opentelemetry/otel-runtime-metrics.html" >}}
<br/>

## ランタイムメトリクスのダッシュボードを表示

セットアップ完了後は、サービスの詳細ページ (以下の Java の例を参照)、フレームグラフのメトリクスタブ、および[デフォルトのランタイムダッシュボード][7]にてランタイムメトリクスを確認できます。

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="サービスページにある JVM Metrics タブに OpenTelemetry のランタイムメトリクスが表示されている様子" style="width:100%;" >}}

[1]: /ja/opentelemetry/guide/metrics_mapping/
[5]: /ja/tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics