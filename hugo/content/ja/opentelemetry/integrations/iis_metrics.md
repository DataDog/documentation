---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: IIS メトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/iis_metrics.png" alt="IIS ダッシュボードの OpenTelemetry IIS メトリクス" style="width:100%;" >}}

[IIS レシーバー][1]は、IIS (Internet Information Services) メトリクスの収集と [IIS Overview][4] ダッシュボードへのアクセスを可能にします。`iisreceiver` の最新バージョンの仕様に従ってレシーバーを構成してください。

詳しくは、OpenTelemetry プロジェクトドキュメントの [IIS レシーバー][1]を参照してください。

## セットアップ

Datadog で使用するために OpenTelemetry で IIS メトリクスを収集するには:

1. OpenTelemetry Collector の構成で [IIS レシーバー][1]を構成します。
2. OpenTelemetry Collector が [Datadog にエクスポートするように構成されている][5]ことを確認します。

詳細な構成オプションと要件については、[IIS レシーバーのドキュメント][1]を参照してください。

## 収集されたデータ

{{< mapping-table resource="iis.csv">}}

詳細は [OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/screen/integration/243/iis---overview
[5]: /ja/opentelemetry/setup/collector_exporter/