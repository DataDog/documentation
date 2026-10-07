---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: Apache Spark メトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/spark_metrics.png" alt="Spark ダッシュボードの OpenTelemetry Apache Spark メトリクス" style="width:100%;" >}}

[Apache Spark レシーバー][1]は、Apache Spark メトリクスの収集と [Spark Overview][4] ダッシュボードへのアクセスを可能にします。`apachesparkreceiver` の最新バージョンの仕様に従ってレシーバーを構成してください。

詳しくは、OpenTelemetry プロジェクトドキュメントの [Apache Spark レシーバー][1]を参照してください。

## セットアップ

Datadog で使用するために OpenTelemetry で Apache Spark メトリクスを収集するには:

1. OpenTelemetry Collector の構成で [Apache Spark レシーバー][1]を構成します。
2. OpenTelemetry Collector が [Datadog にエクスポートするように構成されている][3]ことを確認します。

詳細な構成オプションと要件については、[Apache Spark レシーバーのドキュメント][1]を参照してください。

## 収集されたデータ

{{< mapping-table resource="apachespark.csv">}}

詳細は [OpenTelemetry メトリクス マッピング][2] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[3]: /ja/opentelemetry/setup/collector_exporter/
[4]: https://app.datadoghq.com/screen/integration/95/spark---overview