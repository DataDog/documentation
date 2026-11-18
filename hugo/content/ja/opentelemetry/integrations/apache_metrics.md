---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: Apache Web Server メトリクス
---
## 概要 {#overview}

{{< img src="/opentelemetry/collector_exporter/apache_metrics.png" alt="Apache ダッシュボード内の OpenTelemetry Apache メトリクス" style="width:100%;" >}}

[Apache receiver][1] は Apache Web Server メトリクスを収集します。

詳細については、[Apache receiver][1] に関する OpenTelemetry プロジェクトのドキュメントを参照してください。

## セットアップ {#setup}

この例では、OpenTelemetry Collector Contrib v0.154.0 のコンポーネント識別子を使用しています。他のバージョンやディストリビューションの場合は、そのディストリビューションがサポートする識別子を使用します。

Apache receiver は、サーバーの `server-status?auto` ページを読み取ります。開始する前に、Apache サーバーで [`mod_status` を有効に][5]します。ステータスページにはサーバーとそのリクエストに関する詳細が表示されるため、アクセスを localhost などに制限します。

Collector 構成に以下の行を追加し、`endpoint` をステータスページのアドレスに設定します。

```yaml
receivers:
  apache:
    endpoint: http://localhost:8080/server-status?auto
```

構成のメトリクスパイプラインの `receivers` リストに `apache` を追加します。すでにそのパイプラインにあるプロセッサーはそのまま維持します。Datadog OTLP メトリクスインテークはデルタメトリクスのみを受け付けますが、このレシーバーは累積合計を生成するため、パイプラインには `cumulativetodelta` が必要です。[推奨される Collector セットアップ][4]にはそれが含まれています。

すべての構成オプションについては、[Apache receiver のドキュメント][1]を参照してください。

## 収集データ {#data-collected}

{{< mapping-table resource="apache.csv">}}

OpenTelemetry と Datadog のメトリクス名の完全なマッピングについては、[OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[4]: /ja/opentelemetry/setup/collector_exporter/
[5]: https://httpd.apache.org/docs/2.4/mod/mod_status.html