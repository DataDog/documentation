---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: IIS メトリクス
---
## 概要 {#overview}

{{< img src="/opentelemetry/collector_exporter/iis_metrics.png" alt="IIS ダッシュボードでの OpenTelemetry IIS メトリクス" style="width:100%;" >}}

[IIS receiver][1] は、[IIS Overview][4] ダッシュボードに表示される IIS (Internet Information Services) メトリクスを収集します。

詳細については、[IIS receiver][1] に関する OpenTelemetry プロジェクトのドキュメントを参照してください。

## セットアップ {#setup}

この例では、OpenTelemetry Collector Contrib v0.154.0 のコンポーネント識別子を使用しています。他のバージョンやディストリビューションの場合は、そのディストリビューションがサポートする識別子を使用します。

IIS receiver は Windows パフォーマンスカウンターを読み取るため、Windows 上でのみ実行されます。Collector を IIS ホスト上で実行します。

このレシーバーに必須の設定はありません。Collector の構成に以下の行を追加します。

```yaml
receivers:
  iis:
```

構成のメトリクスパイプラインの `receivers` リストに `iis` を追加します。すでにそのパイプラインにあるプロセッサーはそのまま維持します。Datadog OTLP メトリクスインテークはデルタメトリクスのみを受け付けますが、このレシーバーは累積合計を生成するため、パイプラインには `cumulativetodelta` が必要です。[推奨される Collector セットアップ][5]にはそれが含まれています。

すべての構成オプションについては、[IIS receiver のドキュメント][1]を参照してください。

## 収集データ {#data-collected}

{{< mapping-table resource="iis.csv">}}

OpenTelemetry と Datadog のメトリクス名の完全なマッピングについては、[OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/243/iis---overview
[5]: /ja/opentelemetry/setup/collector_exporter/