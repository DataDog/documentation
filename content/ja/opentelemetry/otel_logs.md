---
title: Send Logs from OpenTelemetry to Datadog
aliases:
- /logs/log_collection/opentelemetry/
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: 外部サイト
  text: Collector documentation
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: Blog
  text: Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using Datadog Exporter
- link: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
  tag: Documentation
  text: Connect OpenTelemetry Traces and Logs
---

<div class="alert alert-warning"><a href="https://opentelemetry.io/docs/reference/specification/logs/">OpenTelemetry のロギング</a>と Datadog Exporter の Datadog にログを送信する機能は、アルファ版です。</div>

## 概要

[OpenTelemetry][1] は、オープンソースの観測可能性フレームワークで、IT チームにテレメトリーデータを収集しルーティングするための標準化されたプロトコルとツールを提供します。Cloud Native Computing Foundation][2] (CNCF) によってインキュベータープロジェクトとして作成された OpenTelemetry は、アプリケーションテレメトリーデータ (メトリクス、ログ、トレースなど) をインスツルメント、生成、収集、エクスポートし、分析および洞察するための監視プラットフォームに対して一貫したフォーマットを提供するものです。

OpenTelemetry Collector は、あらゆるベンダーに対応するエージェントプロセスで、さまざまなプロセスにより送信されたテレメトリデータを収集、エクスポートします。Datadog には、OpenTelemetry Collector で使える [Exporter][3] があり、OpenTelemetry から Datadog にトレース、メトリクス、ログデータを転送することができます。

ログを収集する場合、Datadog は Collector の [filelog レシーバー][4]の使用を推奨しています。filelog レシーバーは、指定したログファイルを追跡します。その後、Datadog Exporter (Collector で設定) がログデータを Datadog に送信します。

{{< img src="logs/log_collection/otel_collector_logs.png" alt="データを送信するホスト、コンテナ、アプリケーション、コレクター内の filelog レシーバー、コレクター内の Datadog Exporter が Datadog バックエンドにデータを送信する様子を示した図" style="width:100%;">}}

## セットアップ

アプリケーションやサービスが [OpenTelemetry][4] ライブラリでインスツルメンテーションされている場合、OpenTelemetry Collector と Datadog Exporter を使用して、ログデータを Datadog バックエンドに送信します。

[ログを OpenTelemetry コレクターに送信し、Datadog エクスポーターで Datadog に転送する][5]

詳しくは [OpenTelemetry][6] をお読みください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/reference/specification/logs/overview/#third-party-application-logs
[5]: /opentelemetry/otel_collector_datadog_exporter/?tab=onahost#step-4---configure-the-logger-for-your-application
[6]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
