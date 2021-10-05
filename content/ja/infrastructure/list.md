---
title: インフラストラクチャーリスト
kind: documentation
aliases:
  - /ja/hostnames
  - /ja/graphing/infrastructure/list/
further_reading:
  - link: /infrastructure/hostmap/
    tag: ドキュメント
    text: Host Map
  - link: /infrastructure/livecontainers/
    tag: ドキュメント
    text: コンテナマップ
  - link: /infrastructure/process/
    tag: ドキュメント
    text: ライブプロセスモニタリング
---
## 概要

インフラストラクチャーリストには、Datadog によって監視されているすべてのホストが、過去 2 時間 (デフォルト) のアクティビティとともに最大 1 週間分表示されます。ホストを検索するか、タグでグループ化します。

## ホスト

ホストのインフラストラクチャーリストに次の情報が表示されます。

Hostname
: 優先ホスト名[エイリアス](#aliases) (オプションメニューを使用してクラウド名またはインスタンス ID を表示します)。

Cloud Name
: ホスト名[エイリアス](#aliases)。

Instance ID
: ホスト名[エイリアス](#aliases)。

Status
: 予想されるメトリクスが受信されると `UP` と表示され、メトリクスが受信されないと `???` と表示されます。

CPU
: 使用された CPU の割合（アイドル以外のすべて）。

IOWait
: IO での待機に費やされた CPU の割合（すべてのプラットフォームでレポートされるわけではありません）。

Load 15
: 過去 15 分間のシステム負荷。

Apps
: ホストのメトリクスをレポートする Datadog インテグレーション。

Operating System 
: 追跡対象のオペレーティングシステム

Cloud Platform
: ホストが実行されているクラウドプラットフォーム。(例: AWS、GCP、Azure など)

Datadog Agent
: ホストでデータを収集する Agent のバージョン。

### ホスト名

Datadog Agent は、さまざまなソースから潜在的なホスト名を収集します。詳細については、[Datadog が Agent ホスト名を決定する方法][1]を参照してください。

**注**: ホスト名は、Datadog アカウント内で一意である必要があります。そうでない場合、ホストのグラフに不整合が生じる可能性があります。

### 検査

任意のホストをクリックして、[エイリアス](#aliases)、[タグ][2]、[メトリクス][3]、[コンテナ][4]、[ログ][5] (有効化されている場合) などの詳細を表示します:

{{< img src="infrastructure/index/Infra-List.png" alt="インフラストラクチャーリストのホストの詳細"  style="width:90%;">}}

#### エイリアス

Datadog は、1 つのホストに一意に識別可能な名前が複数ある場合、ホスト名のエイリアスを作成します。Agent によって収集されたこれらの名前は、選択された正規名のエイリアスとして追加されます。あたとえば、EC2 で実行している単一のホストは、インスタンス ID (`i-abcd1234`)、ホストの IP アドレスに基づいて EC2 が提供する汎用ホスト名 (`ip-192-0-0-1`)、および内部 DNS サーバーまたは config で管理されるホストファイルが提供するわかりやすいホスト名 (`myhost.mydomain`) を持つ可能性があります。

{{< img src="infrastructure/index/Infra-List-Alias.png" alt="ホストエイリアス"  style="width:90%;">}}

### エクスポート

Datadog にレポートするホストの JSON 形式のリストについては、次のいずれかを使用します。

* インフラストラクチャーリストの下部にある **JSON API パーマリンク**。
* [検索ホスト API エンドポイント][6] - 例については、[開発者ガイド][7]を参照してください。

#### Agent バージョン

Agent のバージョンを監査して、最新バージョンを実行していることを確認することも役立つ場合があります。この場合、[get_host_agent_list script][8] を使用します。これにより、JSON パーマリンクを利用して、現在実行中の Agent がバージョン番号とともに出力されます。また、JSON 出力を CSV ファイルに変換するための `json_to_csv` スクリプトもあります。

#### Agent なし

JSON エクスポートのもう 1 つのユースケースは、Agent がインストールされていない AWS EC2 インスタンスのリストを取得することです。これらのインスタンスは、Datadog AWS インテグレーションタイルで AWS アカウントを設定することにより、インフラストラクチャーリストに表示されます。この[サンプルスクリプト][9]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/how-datadog-agent-determines-the-hostname/
[2]: /ja/getting_started/tagging/
[3]: /ja/metrics/
[4]: /ja/infrastructure/livecontainers/?tab=helm#overview
[5]: /ja/logs/
[6]: /ja/api/v1/hosts/#get-the-total-number-of-active-hosts
[7]: /ja/developers/guide/query-the-infrastructure-list-via-the-api/
[8]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[9]: https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38