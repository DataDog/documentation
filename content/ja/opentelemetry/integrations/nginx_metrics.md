---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: NGINX メトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/nginx_metrics.png" alt="NGINX ダッシュボードの OpenTelemetry NGINX メトリクス" style="width:100%;" >}}

[NGINX レシーバー][1]は、NGINX メトリクスの収集と [NGINX Overview][4] ダッシュボードへのアクセスを可能にします。`nginxreceiver` の最新バージョンの仕様に従ってレシーバーを構成してください。

詳しくは、OpenTelemetry プロジェクトドキュメントの [NGINX レシーバー][1]を参照してください。

## セットアップ

Datadog で使用するために OpenTelemetry で NGINX メトリクスを収集するには:

1. OpenTelemetry Collector の構成で [NGINX レシーバー][1]を構成します。
2. OpenTelemetry Collector が [Datadog にエクスポートするように構成されている][5]ことを確認します。

詳細な構成オプションと要件については、[NGINX レシーバーのドキュメント][1]を参照してください。

## 収集されたデータ

{{< mapping-table resource="nginx.csv">}}

詳細は [OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/21/nginx---overview
[5]: /ja/opentelemetry/setup/collector_exporter/