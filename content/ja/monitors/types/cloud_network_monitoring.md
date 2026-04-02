---
aliases:
- /ja/monitors/types/network_performance/
further_reading:
- link: /network_monitoring/cloud_network_monitoring/
  tag: ドキュメント
  text: Cloud Network Monitoring の詳細
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスを確認
- link: /monitors/templates/
  tag: ドキュメント
  text: Monitor Templates
title: クラウド ネットワーキング モニター
---

## 概要

Datadog [Cloud Network Monitoring][1] (CNM) は、サービス、コンテナ、アベイラビリティ ゾーン、および Datadog の任意のタグ間のネットワーク トラフィックに対する可視性を提供します。CNM を有効にすると、CNM モニターを作成し、設定したしきい値を TCP ネットワーク メトリクスが超えた場合にアラートを受け取れます。たとえば、特定のクライアント / サーバー 間のネットワーク スループットを監視し、そのスループットがしきい値を超えたときにアラートを受け取れるようにできます。

## モニターの作成

Datadog で CNM モニターを作成するには、メイン ナビゲーション: [**Monitors** --> **New Monitor** --> **Cloud Network**][2] を使用します。

### 検索クエリを定義する

{{< img src="monitors/monitor_types/network_performance/example_dns_failures.png" alt="クライアント / サーバー トラフィックの自動グループ化、N/A 値の非表示、メトリクスは DNS Failures の合計、上限 100 の設定例" style="width:100%;" >}}

1. [CNM アナリティクス][3] の検索バーと同じロジックで検索クエリを構築します。
1. クライアントとサーバーをグループ化するためのタグを選択します。
1. N/A トラフィックを表示するか非表示にするかを選択します。
1. ドロップダウン リストから測定したいメトリクスを選択します。既定では、モニターは選択したメトリクスの合計を測定します。CNM モニターで利用可能なメトリクスは [メトリクス定義](#metric-definitions) を参照してください。
1. クエリに含める結果の上限を設定します。

### 数式と関数の使用

CNM モニターは数式と関数を使って作成できます。たとえば、クライアントとサーバー間のスループットに基づくモニターを作成できます。

次の例は、クライアントからサーバーへの再送信率を計算するための数式の使用例です。

{{< img src="monitors/monitor_types/network_performance/npm_formulas_functions.png" alt="クライアントからサーバーへの再送信の割合を示す CNM モニターの設定例" style="width:100%;" >}}

詳細は [Functions][4] ドキュメントを参照してください。

## メトリクス定義

以下の表は、CNM で作成できるさまざまなメトリクスを示します。

### Volume
| メトリクス名    | 定義                 | 
| -------------- | -------------------------  | 
| Bytes Received | クライアントから受信したバイト数。 |
| Bytes Sent     | クライアントから送信したバイト数。     |
| Packets Sent   | クライアントから送信したパケット数。   |

### TCP
| メトリクス名             | 定義                                    | 
| ----------------------  | --------------------------------------------- | 
| 再送回数             | クライアント / サーバー 間の再送信数。              |
| レイテンシー                 | 接続を確立するまでの平均時間。   |
| RTT (Round-Trip Time)   | 応答を受信するまでの平均時間。 |
| ジッター                  | RTT の平均ばらつき。                     |
| TCP タイムアウト | オペレーティング システムの観点でタイムアウトした TCP 接続の数。これは一般的な接続性やレイテンシの問題を示す可能性があります。  |
| TCP 拒否 | サーバーにより拒否された TCP 接続の数。通常これは、接続を受け付けていない IP/ ポート への接続試行、またはファイアウォール / セキュリティ の設定ミスを示します。 |
| TCP リセット | サーバーによりリセットされた TCP 接続の数。  |
| Established Connections | クライアント / サーバー 間で確立された接続数。 |
| クローズされた接続の数      | クライアント / サーバー 間でクローズされた接続数。      |

### DNS
| メトリクス名              | 定義                               |
| -----------------------  | ---------------------------------------  |
| DNS Requests             | DNS リクエストの合計数。             |
| DNS 失敗             | DNS 失敗の合計数。             |
| DNS Timeouts             | DNS タイムアウトの合計数。             |
| DNS Failed Responses     | DNS 失敗応答の合計数。             |
| DNS Successful Responses | DNS 成功応答の合計数。     |
| DNS Failure Latency      | 平均 DNS 失敗レイテンシ。 |
| DNS Success Latency      | 平均 DNS 成功レイテンシ。              |
| NXDOMAIN Errors          | NXDOMAIN エラーの合計数。              |
| SERVFAIL Errors          | SERVFAIL エラーの合計数。          |
| Other Errors             | その他のエラーの合計数。           |


### アラートの条件を設定する

クエリ値がしきい値を超えたときにトリガーするようモニターを構成し、復旧しきい値や評価の遅延などの高度なアラート オプションをカスタマイズします。詳細は [Monitors の設定][5] を参照してください。

### 通知
**Configure notifications and automations** (通知と自動化の構成) セクションの詳しい説明は、[通知][6]のページをご覧ください。

## 一般的なモニター
以下は、CNM で作成を開始できる一般的なモニターです。これらはネットワークを追跡し、異常なトラフィックや予期しないネットワーク動作が発生している可能性がある場合にアラートを受けるための良い出発点となります。

### スループット モニター
このモニターは、クエリで指定した 2 つのエンドポイント間のスループットがしきい値を超えた場合にアラートします。スループットを監視することで、ネットワーク帯域幅を踏まえてネットワークが容量の限界に近づいているかどうかを判断できます。これを把握しておくと、ボトルネックや下流へのその他の影響を回避するためにネットワークを調整する時間を確保できます。

{{< img src="monitors/monitor_types/network_performance/common_monitors_throughput.png" alt="スループット モニターの設定例。Query A を Bytes Sent の測定に設定し、throughput(a) の数式を追加" style="width:100%;" >}}

### 再送信率
再送信はパケットが破損または損失した際に発生し、信頼性の低いネットワークを示します。再送信率モニターは、送信パケット総数に対する再送信の割合がしきい値を超えた場合にアラートします。

{{< img src="monitors/monitor_types/network_performance/common_monitors_retransmits.png" alt="再送信率モニターの設定例。Query A を Retransmits、Query B を Packets Sent に設定し、(a/b)*100 で割合を計算する数式を追加" style="width:100%;" >}}

### DNS 失敗
DNS 失敗モニターは DNS サーバーのパフォーマンスを追跡し、サーバー側およびクライアント側の DNS 問題の特定に役立ちます。このモニターを使用して、DNS 失敗の合計がしきい値を超えた場合にアラートします。

{{< img src="monitors/monitor_types/network_performance/common_monitors_dns_failure.png" alt="DNS 失敗の設定例。Query A を DNS Failures の測定に設定" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/cloud_network_monitoring/
[2]: https://app.datadoghq.com/monitors/create/network-performance
[3]: /ja/network_monitoring/cloud_network_monitoring/network_analytics/
[4]: /ja/dashboards/functions/
[5]: /ja/monitors/configuration/
[6]: /ja/monitors/notify/