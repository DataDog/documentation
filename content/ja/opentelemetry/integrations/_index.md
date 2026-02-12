---
further_reading:
- link: /opentelemetry/schema_semantics/metrics_mapping/
  tag: ドキュメント
  text: OpenTelemetry メトリクスマッピング
title: インテグレーション
---

このページでは、Datadog がサポートする OpenTelemetry (OTel) インテグレーションについて説明します。これらのインテグレーションを利用すると、OpenTelemetry を介して Datadog で可観測性データを収集・監視できます。

## 概要

OpenTelemetry (OTel) インテグレーションは、OpenTelemetry 標準を使用してさまざまなソースから可観測性データ (メトリクス、トレース、ログ) を収集するためのコンポーネントです。これらのインテグレーションは OpenTelemetry Collector と連携するよう設計されており、Collector はテレメトリーデータを受信・処理し、Datadog などの可観測性バックエンドにエクスポートします。

すべての OpenTelemetry インテグレーションの詳細な一覧については、[OpenTelemetry Registry][1] を参照してください。ここでは、OpenTelemetry エコシステム内のレシーバーやエクスポーター、その他のコンポーネントに関する情報が提供されています。

## Datadog がサポートする OpenTelemetry インテグレーション

Datadog は次の OpenTelemetry インテグレーションをサポートしています。

### APM (Application Performance Monitoring)

アプリケーションのパフォーマンスを監視・最適化する:

- [Trace Metrics][2]
- [Runtime Metrics][3]

### コレクター

OpenTelemetry Collector の状態とパフォーマンスを監視する:

- [Collector Health Metrics][8]

### コンテナおよびホスト

コンテナ化された環境とホストシステムを可視化する:

- [Docker Metrics][4]
- [Host Metrics][5]

### ベンダーテクノロジー

一般的なベンダーテクノロジーに対して可観測性を拡張する:

- [Kafka Metrics][6]

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /ja/opentelemetry/integrations/trace_metrics
[3]: /ja/opentelemetry/integrations/runtime_metrics/
[4]: /ja/opentelemetry/integrations/docker_metrics/
[5]: /ja/opentelemetry/integrations/host_metrics/
[6]: /ja/opentelemetry/integrations/kafka_metrics/
[8]: /ja/opentelemetry/integrations/collector_health_metrics/