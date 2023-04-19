---
further_reading:
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: GitHub
  text: Datadog と OpenTelemetry のパートナーシップ
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
  tag: GitHub
  text: OpenTelemetry 用 AWS マネージド Lambda レイヤーについて
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: ブログ
  text: Datadog RUM イベントと OTel インスツルメンテーションされたアプリケーションのトレースを相関させる
kind: ドキュメント
title: Datadog の OpenTelemetry
---

## 概要

[OpenTelemetry][1] (OTel) は、オープンソースの観測可能性フレームワークで、IT チームにテレメトリーデータを収集しルーティングするための標準化されたプロトコルとツールを提供します。Cloud Native Computing Foundation][2] (CNCF) によってインキュベータープロジェクトとして作成された OTel は、アプリケーションテレメトリーデータ (メトリクス、ログ、トレースなど) をインスツルメント、生成、収集、エクスポートし、分析および洞察するための監視プラットフォームに対して一貫したフォーマットを提供するものです。

アプリケーションやサービスが OpenTelemetry ライブラリでインスツルメントされている場合、トレース、メトリクス、ログのデータを Datadog バックエンドに取得するために 2 つの経路から選択することができます。

1. [データを OpenTelemetry コレクターに送信し、Datadog エクスポーターで Datadog に転送する][3]、または

2. [Datadog Agent でデータを取り込み、Datadog に収集します][4] (メトリクスとトレースのみ)。

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="テレメトリーデータを生成し、観測可能性製品に送信するためのマップオプション。">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /ja/opentelemetry/otel_collector_datadog_exporter/
[4]: /ja/opentelemetry/otlp_ingest_in_the_agent/