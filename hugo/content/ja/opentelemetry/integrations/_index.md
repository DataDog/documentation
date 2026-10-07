---
further_reading:
- link: /opentelemetry/schema_semantics/metrics_mapping/
  tag: ドキュメント
  text: OpenTelemetry メトリクスマッピング
title: Integrations
---
このページでは、Datadog がサポートする OTel (OpenTelemetry) インテグレーションについて説明します。これらのインテグレーションでは、OpenTelemetry を使用して Datadog で可観測性データを収集および監視できます。

## 概要 {#overview}

OTel (OpenTelemetry) インテグレーションは、OpenTelemetry 標準を使用してさまざまなソースから可観測性データ (メトリクス、トレース、ログ) を収集できるようにするコンポーネントです。これらのインテグレーションは、OpenTelemetry コレクターと連携するように設計されており、テレメトリデータを受信、処理し、Datadog などの可観測性バックエンドにエクスポートします。

すべての OpenTelemetry インテグレーションの包括的なリストについては、[OpenTelemetry レジストリ][1]をご覧ください。このレジストリは、OpenTelemetry エコシステム内のレシーバー、エクスポーター、およびその他のコンポーネントに関する情報を提供します。

## メトリクス料金 {#metric-pricing}

Datadog は、サポートされている OpenTelemetry レシーバーからのメトリクスを追加料金なしで収集します。追加料金のかからないメトリクスは、次のとおりです。
- 各レシーバーの `metadata.yaml` ファイルで定義されています。
- [メトリクスマッピング][14]テーブルに記載されています。

たとえば、[`dockerstatsreceiver`][15] `metadata.yaml` ファイルには、追加料金なしで収集できるメトリクスが記載されています。

<div class="alert alert-danger">OpenTelemetry レシーバーのドキュメントに従ってレシーバーを構成していることを確認してください。レシーバーの構成が正しくない場合、メトリクスがカスタムとして分類され、追加料金が発生することがあります。</div>

## Datadog がサポートする OpenTelemetry インテグレーション {#datadog-supported-opentelemetry-integrations}

Datadog は次の OpenTelemetry インテグレーションをサポートしています。

### APM (Application Performance Monitoring) {#apm-application-performance-monitoring}

アプリケーションのパフォーマンスを監視・最適化する:

- [トレースメトリクス][2] - ヒット数、エラー数、期間などの APM 統計を生成します。
- [ランタイムメトリクス][3] - Java、.NET、Go アプリケーションのランタイムメトリクスを収集します。

### コレクター {#collector}

OpenTelemetry Collector の状態とパフォーマンスを監視する:

- [コレクターのヘルスメトリクス][4] - OpenTelemetry コレクターのパフォーマンスを追跡します。
- [Datadog 拡張機能][17] - Datadog Infrastructure Monitoring でコレクターの構成およびビルド情報を表示します。

### コンテナおよびホスト {#containers-and-hosts}

コンテナ化された環境とホストシステムを可視化する:

- [Docker メトリクス][5] - Docker コンテナのパフォーマンスを監視します。
- [ホストメトリクス][6] - CPU、ディスク、メモリ使用量などのシステムメトリクスを追跡します。
- [Kubernetes メトリクス][18] - Kubernetes インフラストラクチャーメトリクスを収集し、Kubernetes エクスプローラーにリソースデータを送信します。
- [Podman メトリクス][16] - Podman コンテナのパフォーマンスを監視します。

### Web サーバーおよびプロキシ {#web-servers-and-proxies}

Web サーバーおよびプロキシテクノロジーを監視します。

- [Apache Web サーバーメトリクス][7] - Apache HTTP サーバーからメトリクスを収集します。
- [NGINX メトリクス][8] - NGINX Web サーバーのパフォーマンスを監視します。
- [IIS メトリクス][9] - IIS (Internet Information Services) メトリクスを追跡します。
- [HAProxy メトリクス][10] - HAProxy ロードバランサーのパフォーマンスを監視します。

### データベースおよびメッセージング {#databases-and-messaging}

データベースおよびメッセージングシステムを監視します。

- [MySQL メトリクス][11] - MySQL データベースのパフォーマンスを追跡します。
- [PostgreSQL メトリクス][19] - PostgreSQL データベースのパフォーマンスを追跡します。
- [SQL サーバーメトリクス][20] - SQL サーバーデータベースのパフォーマンスを追跡します。
- [Kafka メトリクス][12] - Apache Kafkaメッセージングプラットフォームを監視します。

### ビッグデータおよび処理 {#big-data-and-processing}

ビッグデータ処理フレームワークを監視します。

- [Apache Spark メトリクス][13] - Apache Spark のパフォーマンスメトリクスを追跡します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /ja/opentelemetry/integrations/trace_metrics
[3]: /ja/opentelemetry/integrations/runtime_metrics/
[4]: /ja/opentelemetry/integrations/collector_health_metrics/
[5]: /ja/opentelemetry/integrations/docker_metrics/
[6]: /ja/opentelemetry/integrations/host_metrics/
[7]: /ja/opentelemetry/integrations/apache_metrics/
[8]: /ja/opentelemetry/integrations/nginx_metrics/
[9]: /ja/opentelemetry/integrations/iis_metrics/
[10]: /ja/opentelemetry/integrations/haproxy_metrics/
[11]: /ja/opentelemetry/integrations/mysql_metrics/
[12]: /ja/opentelemetry/integrations/kafka_metrics/
[13]: /ja/opentelemetry/integrations/spark_metrics/
[14]: /ja/opentelemetry/mapping/metrics_mapping/#metrics-mappings
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/metadata.yaml
[16]: /ja/opentelemetry/integrations/podman_metrics/
[17]: /ja/opentelemetry/integrations/datadog_extension/
[18]: /ja/opentelemetry/integrations/kubernetes_metrics/
[19]: /ja/opentelemetry/integrations/postgres_metrics/
[20]: /ja/opentelemetry/integrations/sqlserver_metrics/