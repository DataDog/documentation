---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: HAProxy メトリクス
---
## 概要 {#overview}

{{< img src="/opentelemetry/collector_exporter/haproxy_metrics.png" alt="HAProxy ダッシュボードでの OpenTelemetry HAProxy メトリクス" style="width:100%;" >}}

[HAProxy receiver][1] は、[HAProxy Overview][4] ダッシュボードに表示される HAProxy メトリクスを収集します。

詳細については、[HAProxy receiver][1] に関する OpenTelemetry プロジェクトのドキュメントを参照してください。

## セットアップ {#setup}

この例では、OpenTelemetry Collector Contrib v0.154.0 のコンポーネント識別子を使用しています。他のバージョンやディストリビューションの場合は、そのディストリビューションがサポートする識別子を使用します。

Collector の構成に以下の行を追加します。レシーバーにはデフォルトのエンドポイントがないため、`endpoint` を HAProxy 統計ページへの URL または統計ソケットへのパス (`/var/run/haproxy.sock` など) に設定します。統計ページやソケットにはサーバーの詳細が表示されるため、アクセス元をたとえば localhost に制限します。

`metrics` セクションは、レシーバーがデフォルトで収集しないメトリクスを有効にします。HAProxy ダッシュボードはそれらを使用します。

```yaml
receivers:
  haproxy:
    endpoint: http://127.0.0.1:8080/stats
    metrics:
      haproxy.connections.total:
        enabled: true
      haproxy.sessions.total:
        enabled: true
      haproxy.failed_checks:
        enabled: true
      haproxy.clients.canceled:
        enabled: true
      haproxy.compression.bypass:
        enabled: true
      haproxy.compression.count:
        enabled: true
      haproxy.compression.input:
        enabled: true
      haproxy.compression.output:
        enabled: true
```

構成のメトリクスパイプラインの `receivers` リストに `haproxy` を追加します。すでにそのパイプラインにあるプロセッサーはそのまま維持します。Datadog OTLP メトリクスインテークはデルタメトリクスのみを受け付けますが、このレシーバーは累積合計を生成するため、パイプラインには `cumulativetodelta` が必要です。[推奨される Collector セットアップ][5]にはそれが含まれています。

すべての構成オプションについては、[HAProxy receiver のドキュメント][1]を参照してください。

## 収集データ {#data-collected}

{{< mapping-table resource="haproxy.csv">}}

OpenTelemetry と Datadog のメトリクス名の完全なマッピングについては、[OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/28/haproxy---overview
[5]: /ja/opentelemetry/setup/collector_exporter/