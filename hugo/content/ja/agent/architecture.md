---
description: メインプロセス、Collector や Forwarder などのコンポーネント、ポート構成を含む Datadog Agent アーキテクチャの概要。
disable_toc: false
further_reading:
- link: /agent/supported_platforms/
  tag: ドキュメント
  text: サポート対象のプラットフォーム
- link: /agent/configuration/
  tag: ドキュメント
  text: Agent 構成
title: Agent アーキテクチャ
---
## Agent アーキテクチャ {#agent-architecture}

Agent 6 および Agent 7 は、インフラストラクチャーのメトリクスとログの収集、および [DogStatsD メトリクス][1] の受信に対応するメインプロセスで構成されています。このプロセスの主なコンポーネントは次のとおりです。

* Collector: チェックを実行し、メトリクスを収集します。
* Forwarder: ペイロードを Datadog に送信します。

以下のオプションのプロセスは、`datadog.yaml` 構成ファイルで有効にされている場合、Agent によって生成されます。

* APM Agent は、[トレース][2] を収集するプロセスです。デフォルトでは、有効になっています。
* Process Agent は、ライブプロセス情報を収集するプロセスです。デフォルトでは、Process Agent は利用可能な Containers のみを収集し、利用可能な Containers がない場合は無効になります。
* [Agent Data Plane][8] (プレビュー) は、メインプロセスの代わりに [DogStatsD メトリクス][1] を受信、集計、転送するプロセスです。デフォルトでは無効になっています。

Windows では、サービスは次のようにリストされます。

| サービス               | 説明           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog Agent         |
| datadog-trace-agent   | Datadog Trace Agent   |
| datadog-process-agent | Datadog Process Agent |

デフォルトでは、Agent は Linux で 3 つの [ポート][3]、Windows と macOS で 4 つのポートをバインドします。

| ポート | 説明                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Agent に関するランタイムメトリクスを公開します。                                                   |
| 5001 | Agent CLI および GUI がコマンドを送信し、実行中の Agent から情報を取得するために使用されます。|
| 5002 | Windows と macOS で GUI サーバーを提供します。                                                  |
| 8125 | DogStatsD サーバーが外部メトリクスを受信するために使用されます。                                 |

Agent Data Plane が有効な場合、メインプロセスの代わりにポート 8125 にバインドされ、さらに以下のポートにバインドされます。

| ポート | 説明                                                                                           |
|------|-------------------------------------------------------------------------------------------------------|
| 5100 | Agent Data Plane に関するランタイムメトリクスを公開します。                                                  |
| 5101 | Agent Data Plane CLI およびメイン Agent プロセスが Agent Data Plane にコマンドを送信するために使用されます。|

ポートの設定に関する詳細については、[ネットワークトラフィック][4] を参照してください。

### コレクター {#collector}

コレクターは、15 秒ごとにすべての標準メトリクスを収集します。Agent 6 には、Integrations と [カスタムチェック][5] を実行するための Python 2.7 インタープリターが組み込まれています。

### Forwarder {#forwarder}

Agent Forwarder は、HTTPS 経由で Datadog にメトリクスを送信します。バッファリングにより、ネットワークの分断がメトリクスのレポートに影響を与えるのを防ぎます。メトリクスは、サイズの制限に達するまで、または未完了の送信リクエスト数の制限に達するまで、メモリ内にバッファリングされます。その後、Forwarder のメモリ使用量を適切な範囲に抑えるため、最も古いメトリクスから破棄されます。ログは、SSL で暗号化された TCP コネクション経由で Datadog に送信されます。

### DogStatsD {#dogstatsd}

Agent 6 において、DogStatsD は [Etsy の StatsD][6] メトリクス集計デーモンの Golang 実装です。DogStatsD は、UDP または UNIX ソケット経由で任意のメトリクスを受信して集計するため、レイテンシーを増加させることなくカスタムコードをインスツルメントできます。[DogStatsD][7] についての詳細をご覧ください。

[Agent Data Plane][8] が有効な場合、メインの Agent プロセスの代わりに DogStatsD サーバーが実行されます。チェックからのメトリクスは、引き続きメインの Agent プロセスによって処理されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /ja/tracing/guide/terminology/
[3]: /ja/agent/configuration/network/#open-ports
[4]: /ja/agent/configuration/network#configure-ports
[5]: /ja/extend/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[8]: /ja/agent/configuration/agent-data-plane/