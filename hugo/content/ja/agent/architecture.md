---
disable_toc: false
further_reading:
- link: /agent/supported_platforms/
  tag: ドキュメント
  text: サポートされているプラットフォーム
- link: /agent/configuration/
  tag: ドキュメント
  text: Agent 構成
title: Agent アーキテクチャ
---

## Agent アーキテクチャ

Agent 6 と 7 は、インフラストラクチャーメトリクスとログの収集、および [DogStatsD メトリクス][1]の受信を担当するメインプロセスで構成されています。このプロセスの主なコンポーネントは次のとおりです:

* Collector: チェックを実行し、メトリクスを収集します。
* Forwarder: ペイロードを Datadog へ送信します。

`datadog.yaml` 構成ファイルで有効にすると、次の 2 つのオプションのプロセスが Agent によって生成されます。

* APM Agent: [トレース][2]を収集するプロセス。デフォルトで有効です。
* Process Agent: 実行中のプロセス情報を収集するプロセス。デフォルトでは利用可能なコンテナのみを収集し、それ以外の場合は無効です。

Windows では、サービスは次のように一覧表示されます。

| サービス               | 説明           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog Agent         |
| datadog-trace-agent   | Datadog Trace Agent   |
| datadog-process-agent | Datadog Process Agent |

デフォルトでは、Agent は Linux で 3 つ、Windows と macOS で 4 つの[ポート][3]をバインドします:

| ポート | 説明                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Agent に関するランタイムメトリクスを公開します。                                                    |
| 5001 | Agent の CLI と GUI で使用され、コマンドを送信して実行中の Agent から情報を取得します。 |
| 5002 | Windows と macOS で GUI サーバを提供します。                                                   |
| 8125 | DogStatsD サーバーで使用され、外部メトリクスを受信します。                                  |

ポートの構成については、[ネットワークトラフィック][4]を参照してください。

### コレクター

Collector はすべての標準メトリクスを 15 秒ごとに収集します。Agent 6 には統合および[カスタムチェック][5]を実行するための Python 2.7 インタープリタが組み込まれています。

### Forwarder

Agent Forwarder はメトリクスを HTTPS 経由で Datadog へ送信します。バッファリングによりネットワーク分断がメトリクスレポートへ影響することを防ぎます。メトリクスはメモリ内にバッファされ、サイズまたは未送信リクエスト数が上限に達すると、Forwarder のメモリ使用量を抑えるために最も古いメトリクスから破棄されます。ログは SSL で暗号化された TCP 接続により Datadog へ送信されます。

### DogStatsD

Agent 6 では、DogStatsD は [Etsy の StatsD][6] メトリクス集約デーモンを Golang で実装したものです。DogStatsD は UDP または UNIX ソケット経由で任意のメトリクスを受信してロールアップし、レイテンシを追加することなくカスタムコードを計測できます。詳細は [DogStatsD][7] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /ja/tracing/guide/terminology/
[3]: /ja/agent/configuration/network/#open-ports
[4]: /ja/agent/configuration/network#configure-ports
[5]: /ja/developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/