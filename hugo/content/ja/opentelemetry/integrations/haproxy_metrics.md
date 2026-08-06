---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: HAProxy メトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/haproxy_metrics.png" alt="HAProxy ダッシュボードの OpenTelemetry HAProxy メトリクス" style="width:100%;" >}}

[HAProxy レシーバー][1]は、HAProxy メトリクスの収集と [HAProxy Overview][4] ダッシュボードへのアクセスを可能にします。`haproxyreceiver` の最新バージョンの仕様に従ってレシーバーを構成してください。

詳しくは、OpenTelemetry プロジェクトドキュメントの [HAProxy レシーバー][1]を参照してください。

## セットアップ

Datadog で使用するために OpenTelemetry で HAProxy メトリクスを収集するには:

1. OpenTelemetry Collector の構成で [HAProxy レシーバー][1]を構成します。
2. OpenTelemetry Collector が [Datadog にエクスポートするように構成されている][5]ことを確認します。

詳細な構成オプションと要件については、[HAProxy レシーバーのドキュメント][1]を参照してください。

## 収集されたデータ

{{< mapping-table resource="haproxy.csv">}}

詳細は [OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/28/haproxy---overview
[5]: /ja/opentelemetry/setup/collector_exporter/