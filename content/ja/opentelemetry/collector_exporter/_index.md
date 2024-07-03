---
aliases:
- /ja/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /ja/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /ja/opentelemetry/otel_collector_datadog_exporter/
description: Send OpenTelemetry data to the OpenTelemetry Collector and Datadog Exporter
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: 外部サイト
  text: Collector documentation
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using
    Datadog Exporter
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: Blog
  text: Use HiveMQ and OpenTelemetry to monitor IoT applications in Datadog
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: OTLP Metrics Types
title: OpenTelemetry Collector and Datadog Exporter
---

## 概要

OpenTelemetry Collector は、多くのプロセスから発せられるテレメトリデータを収集しエクスポートする、ベンダー非依存のエージェントプロセスです。OpenTelemetry Collector 用の [Datadog エクスポーター][1]では、OpenTelemetry SDK から Datadog にトレース、メトリクス、ログデータを転送することができます (Datadog Agent は不要です)。すべての対応言語で動作するほか、[OpenTelemetry トレースデータをアプリケーションログに接続する][2]ことができます。

{{< img src="metrics/otel/datadog_exporter.png" alt="アプリケーションインスツルメンテーションライブラリ、クラウドインテグレーション、その他のモニタリングソリューション (Prometheus など) -> OpenTelemetry コレクター内の Datadog エクスポーター -> Datadog" style="width:100%;">}}

## Using the Collector

The following documentation describes how to deploy and configure the Collector:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/deployment/" >}}Deployment{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/configuration/" >}}Configuration{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/integrations/" >}}Integrations{{< /nextlink >}}
{{< /whatsnext >}}

## すぐに使えるダッシュボード

Datadog provides out-of-the-box dashboards that you can copy and customize. To use Datadog's out-of-the-box OpenTelemetry dashboards:

1. Install the [OpenTelemetry integration][9].
2. Go to **Dashboards** > **Dashboards list** and search for `opentelemetry`:

   {{< img src="metrics/otel/dashboard.png" alt="ダッシュボードリストには、OpenTelemetry のすぐに使えるダッシュボードが 2 つ (ホストメトリクスとコレクターメトリクス) 表示されています。" style="width:80%;">}}

**Host Metrics** ダッシュボードは、[ホストメトリクスレシーバー][7] から収集されたデータ用です。**Collector Metrics** ダッシュボードは、有効化する[メトリクスレシーバー][8]に応じて収集された他の種類のメトリクス用です。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[9]: https://app.datadoghq.com/integrations/otel