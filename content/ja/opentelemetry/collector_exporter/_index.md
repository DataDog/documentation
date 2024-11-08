---
aliases:
- /ja/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /ja/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /ja/opentelemetry/otel_collector_datadog_exporter/
description: OpenTelemetry のデータを OpenTelemetry Collector と Datadog Exporter に送信する
further_reading:
- link: tracing/glossary/
  tag: 外部サイト
  text: Collectorドキュメント
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: ブログ
  text: OpenTelemetry コレクターを使用して Datadog エクスポーター経由で Datadog にメトリクス、トレース、ログを送信する
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: ブログ
  text: Datadog で IoT アプリケーションを監視するために HiveMQ と OpenTelemetry を使用する
- link: /metrics/open_telemetry/otlp_metric_types
  tag: ドキュメント
  text: OTLP メトリクスタイプ
title: OpenTelemetry Collector と Datadog Exporter
---

## 概要

OpenTelemetry Collector は、多くのプロセスから発せられるテレメトリデータを収集しエクスポートする、ベンダー非依存のエージェントプロセスです。OpenTelemetry Collector 用の [Datadog エクスポーター][1]では、OpenTelemetry SDK から Datadog にトレース、メトリクス、ログデータを転送することができます (Datadog Agent は不要です)。すべての対応言語で動作するほか、[OpenTelemetry トレースデータをアプリケーションログに接続する][2]ことができます。

{{< img src="metrics/otel/datadog_exporter.png" alt="アプリケーションインスツルメンテーションライブラリ、クラウドインテグレーション、その他のモニタリングソリューション (Prometheus など) -> OpenTelemetry コレクター内の Datadog エクスポーター -> Datadog" style="width:100%;">}}

## Collector の使用

以下のドキュメントでは、Collector のデプロイと構成方法について説明します。

{{< whatsnext desc=" " >}}
{{< nextlink href="/opentelemetry/collector_exporter/deployment/" >}}デプロイメント{{< /nextlink >}}
{{< nextlink href="/opentelemetry/collector_exporter/configuration/" >}}構成{{< /nextlink >}}
{{< nextlink href="/opentelemetry/integrations/" >}}インテグレーション{{< /nextlink >}}
{{< /whatsnext >}}

## すぐに使えるダッシュボード

Datadog はコピーしてカスタマイズできるすぐに使えるダッシュボードを提供します。Datadog のすぐに使える OpenTelemetry ダッシュボードを使用するには

1. [OpenTelemetry インテグレーション][9]をインストールします。
2. **Dashboards** > **Dashboards list** に移動し、`opentelemetry` を検索します。

   {{< img src="metrics/otel/dashboard.png" alt="ダッシュボードリストには、OpenTelemetry のすぐに使えるダッシュボードが 2 つ (ホストメトリクスとコレクターメトリクス) 表示されています。" style="width:80%;">}}

**Host Metrics** ダッシュボードは、[ホストメトリクスレシーバー][7] から収集されたデータ用です。**Collector Metrics** ダッシュボードは、有効化する[メトリクスレシーバー][8]に応じて収集された他の種類のメトリクス用です。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[9]: https://app.datadoghq.com/integrations/otel