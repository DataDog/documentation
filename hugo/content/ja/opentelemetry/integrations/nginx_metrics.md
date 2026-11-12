---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: NGINX メトリクス
---
## 概要 {#overview}

{{< img src="/opentelemetry/collector_exporter/nginx_metrics.png" alt="NGINX ダッシュボードでの OpenTelemetry NGINX メトリクス" style="width:100%;" >}}

[NGINX receiver][1] は、[NGINX Overview][4] ダッシュボードに表示される NGINX メトリクスを収集します。

詳細については、[NGINX receiver][1] に関する OpenTelemetry プロジェクトのドキュメントを参照してください。

## セットアップ {#setup}

この例では、OpenTelemetry Collector Contrib v0.154.0 のコンポーネント識別子を使用しています。他のバージョンやディストリビューションの場合は、そのディストリビューションがサポートする識別子を使用します。

NGINX receiver は、[`ngx_http_stub_status_module`][6] モジュールからステータスページを読み取ります。開始する前に、モジュールを有効にしてステータスページを公開します。ステータスページへのアクセス元を、たとえば localhost に制限します。

Collector 構成に以下の行を追加し、`endpoint` をステータスページのアドレスに設定します。

```yaml
receivers:
  nginx:
    endpoint: http://localhost:80/status
```

構成のメトリクスパイプラインの `receivers` リストに `nginx` を追加します。すでにそのパイプラインにあるプロセッサーはそのまま維持します。Datadog OTLP メトリクスインテークはデルタメトリクスのみを受け付けますが、このレシーバーは累積合計を生成するため、パイプラインには `cumulativetodelta` が必要です。[推奨される Collector セットアップ][5]にはそれが含まれています。

すべての構成オプションについては、[NGINX receiver のドキュメント][1]を参照してください。

## 収集データ {#data-collected}

{{< mapping-table resource="nginx.csv">}}

OpenTelemetry と Datadog のメトリクス名の完全なマッピングについては、[OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/21/nginx---overview
[5]: /ja/opentelemetry/setup/collector_exporter/
[6]: https://nginx.org/en/docs/http/ngx_http_stub_status_module.html