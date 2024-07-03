---
aliases:
- /ja/metrics/open_telemetry/
further_reading:
- link: /opentelemetry/
  tag: Documentation
  text: Learn more about OpenTelemetry
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog
    Exporter
title: Send Metrics from OpenTelemetry to Datadog
---

## 概要

[OpenTelemetry][1] は、オープンソースの観測可能性フレームワークで、IT チームにテレメトリーデータを収集しルーティングするための標準化されたプロトコルとツールを提供します。Cloud Native Computing Foundation][2] (CNCF) によってインキュベータープロジェクトとして作成された OpenTelemetry は、アプリケーションテレメトリーデータ (メトリクス、ログ、トレースなど) をインスツルメント、生成、収集、エクスポートし、分析および洞察するための監視プラットフォームに対して一貫したフォーマットを提供するものです。

## セットアップ

OpenTelemetry のメトリクスを Datadog に送信するには、Datadog Agent、または OpenTelemetry コレクターの 2 つのオプションがあります。Datadog Agent を使用すると、すべての [Agent 関数][3]を使用し続けることができます。よりベンダーに依存しないセットアップを行うには、OpenTelemetry コレクターを使用します。

アプリケーションやサービスが [OpenTelemetry][4] ライブラリでインスツルメントされている場合、メトリクスデータを Datadog バックエンドに取得するために 2 つの経路から選択することができます。

1. [Send metrics to the OpenTelemetry collector, and use the Datadog exporter to forward them to Datadog][5], or

2. [Ingest metrics with the Datadog Agent, which collects them for Datadog][6].

詳しくは [OpenTelemetry][7] をお読みください。

## すぐに使えるダッシュボード

Datadog は、すぐに使えるダッシュボードを提供しており、コピーしてカスタマイズすることができます。Datadog のすぐに使える OpenTelemetry ダッシュボードを使用するには、**Dashboards** > **Dashboards list** に移動し、`opentelemetry` を検索してください。

{{< img src="metrics/otel/dashboard.png" alt="ダッシュボードリストには、OpenTelemetry のすぐに使えるダッシュボードが 2 つ (ホストメトリクスとコレクターメトリクス) 表示されています。" style="width:80%;">}}

**Host Metrics** ダッシュボードは、[ホストメトリクスレシーバー][8]から収集されたデータ用です。**Collector Metrics** ダッシュボードは、有効化する[メトリクスレシーバー][9]に応じて収集された他の種類のメトリクス用です。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://www.datadoghq.com/pricing/?product=infrastructure#infrastructure
[4]: https://opentelemetry.io/docs/
[5]: /ja/opentelemetry/otel_collector_datadog_exporter/
[6]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[7]: /ja/opentelemetry/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver