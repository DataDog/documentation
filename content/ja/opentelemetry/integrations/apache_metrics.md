---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: Apache Web Server メトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/apache_metrics.png" alt="Apache ダッシュボードの OpenTelemetry Apache メトリクス" style="width:100%;" >}}

[Apache レシーバー][1]は、Apache Web Server メトリクスの収集を可能にします。`apachereceiver` の最新バージョンの仕様に従ってレシーバーを構成してください。

詳しくは、OpenTelemetry プロジェクトドキュメントの [Apache レシーバー][1]を参照してください。

## セットアップ

Datadog で使用するために OpenTelemetry で Apache Web Server メトリクスを収集するには:

1. OpenTelemetry Collector の構成で [Apache レシーバー][1]を構成します。
2. OpenTelemetry Collector が [Datadog にエクスポートするように構成されている][4]ことを確認します。

詳細な構成オプションと要件については、[Apache レシーバーのドキュメント][1]を参照してください。

## 収集されたデータ

{{< mapping-table resource="apache.csv">}}

詳細は [OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[4]: /ja/opentelemetry/setup/collector_exporter/