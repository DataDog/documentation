---
title: ネットワークページ
kind: ドキュメント
description: スタック内の各ソースと宛先間のネットワークデータを探索。
aliases:
  - /ja/network_performance_monitoring/network_table
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: ブログ
    text: ネットワークパフォーマンスモニタリング
  - link: /integrations/snmp
    tag: ドキュメント
    text: SNMP インテグレーション
  - link: /network_performance_monitoring/installation
    tag: ドキュメント
    text: Datadog Agent を使用したネットワークデータの収集。
  - link: /dashboards/widgets/network
    tag: ドキュメント
    text: ネットワークウィジェット
---
{{< img src="network_performance_monitoring/network_page/main_page_npm.png" alt="メインページ" >}}

## クエリ

検索結果を調整して特定のエンドポイント間を追跡するには、ネットワークフローを集計して**タグ**でフィルタリングを行います。ページ上部の検索バーから、**_source_** および **_destination_** に対するタグを選択できます。

以下のスクリーンショットは、_source_ と _destination_ を `service` タグで集計した場合のデフォルト表示です。テーブル内の各行が、1 時間の範囲内で集計されたサービス間フローに相当します。

{{< img src="network_performance_monitoring/network_page/context_npm.png" alt="コンテキスト"  style="width:80%;">}}

次の例は、`us-east-1` リージョン内のサービスを表す IP アドレスからアベイラビリティーゾーンまでのすべてのフローを示しています。

{{< img src="network_performance_monitoring/network_page/flow_table_region_az.png" alt="フローテーブルのフィルタリング例"  style="width:80%;">}}

ページの右上にあるタイムセレクターから、集計対象となるトラフィックに応じたタイムフレームを設定できます。

{{< img src="network_performance_monitoring/network_page/npm_timeframe.png" alt="タイムフレーム NPM"  style="width:30%;">}}

### ファセットパネル

ファセットパネルには検索バーのクエリ内にあるタグが反映されます。画面上の _Source_ と _Destination_ タブでファセットパネルの切り替えが可能です。

{{< img src="network_performance_monitoring/network_page/destination_panel.png" alt="Destination パネル"  style="width:20%;">}}

#### カスタムファセット

Datadog ネットワークページでは、タグを使用してトラフィックデータを集計およびフィルタリングできます。タグのホワイトリストは、検索バーのドロップダウンメニューからデフォルトで利用可能です。

{{< img src="network_performance_monitoring/network_page/drop_down_npm.png" alt="ドロップダウンメニュー"  style="width:90%;">}}

ホワイトリスト済みのタグには `service`、`availability zone`、`env`、`environment`、`pod`、`host`、`ip`、`port` などがあります。メニューに含まれていないタグで集計またはフィルタリングを行う場合は、該当のタグをカスタムファセットとして追加してください。

1. ファセットパネルの右上にある `+` を選択します。
2. カスタムファセットを作成したいタグを入力します。
3. `Create` をクリックします。

カスタムファセットが作成されたら、このタグを使ってネットワークページとマップ内トラフィックのフィルタリングおよび集計を行います。すべてのカスタムファセットはファセットパネル下部の `Custom` セクションに表示されます。

## ネットワークデータ

{{< img src="network_performance_monitoring/network_page/network_data.png" alt="ネットワークデータ"  style="width:90%;" >}}

ネットワークメトリクスはグラフと関連するテーブルを用いて表示されます。送受信されたメトリクスの表示はすべて、ソース側から見た場合のデータとなります。

* **送信したメトリクス**: ソース側から見て、_source_ から _destination_ へ渡される値を測定します。
* **受信したメトリクス**: ソース側から見て、_destination_ から _source_ へ渡される値を測定します。

パケットが大量にドロップされた場合は、`sent_metric` (ソースから宛先へ) と `received_metric` (宛先からソースへ) の表示値が異なることがあります。`destination` から `source` に送られた大量のバイトは、`destination` 由来のフローに含まれます。しかし、この場合に `source` 由来のフローがこのバイトを「受信した」とみなすことはありません。

**注**: デフォルトの収集インターバルは 5 分で、保存期間は 7 日です。

### メトリクス

#### ネットワークのロード

以下のネットワークロードメトリクスが利用可能です。

| メトリクス          |  説明                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **ボリューム**      | ある期間中に送受信されたバイト数。バイトを単位として (またはその大きさ順で) 双方向に測定されます。                           |
|  **スループット** | ある期間中に送受信されたバイトのレート。バイトを単位として毎秒、双方向に測定されます。                                                  |

#### TCP

TCP は順序通りのパケット配信を実施するためのコネクション型プロトコルです。以下の TCP メトリクスが利用可能です。

| メトリクス                    |  説明                                                                                                                           |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **再送回数**           | 再送回数は検出された失敗回数 (配信確認のため再送が行われます) を示すものです。`source` からの再送回数で測定されます。 |
| **ラウンドトリップ時間 (RTT)** | ラウンドトリップ時間はレイテンシーを測るためのプロキシです。送信される TCP フレームと確認されたフレーム間の時間で測定されます。                          |
|  **RTT 変動**         | RTT はジッターを測るためのプロキシです。                                                                                                             |

### DNS 解決

Agent 7.17+ 以降において、Agent は IP を解決して外部および内部トラフィックで判読可能なドメイン名に転換できるようになりました。Domain は、S3 バケット、アプリケーションロードバランサー、API など、Datadog Agent のインストールができないクラウドプロバイダーのエンドポイントを監視する場合に役立ちます。C&C サーバーの DGA ドメインなど、認識不能なドメイン名はネットワークのセキュリティ脅威につながる恐れがあります。**Domain は Datadog 内のタグとしてエンコードされている**ため、検索バーのクエリやファセットパネルでそれを使用してトラフィックの集計とフィルタリングを行うことができます。

{{< img src="network_performance_monitoring/network_page/domain_aggregation.png" alt="Domain 集計" >}}

**注**: DNS 解決は、システムプローブがルートネットワークのネームスペースで稼働しているホストでサポートされています。通常、ホストネットワークを使用せずにコンテナ内でシステムプローブを稼働させているケースがよくみられます。

### pre-NAT IP

ネットワークアドレス変換 (NAT) は、Kubernetes とその他のシステムでコンテナ間のトラフィックをルートするために使用されるツールです。(サービス間などの) 特定の依存関係を調査する場合は、pre-NAT IP の存在可否によってそのサービスが Kubernetes ネイティブのサービス (独自のルーティングを使用) か、外部クライアントに依存してルーティングを行っているサービスか否かを判断できます。この機能では現在、NAT ゲートウェイの解決を行うことはできません。

pre-NAT および post-NAT IP を確認するには、テーブル設定から _Show pre-NAT IPs_ トグルを使用します。この設定のトグルを外した場合に、Source IP および Dest IP 列にデフォルトで表示されている IP はすべて post-NAT IP となります。ひとつの post-NAT IP に対して複数の pre-NAT IP が存在する場合は、最も一般的な pre-NAT IP のトップ 5 が表示されます。その他の製品と同様、`pre_nat.ip` タグを使用してトラフィックの集計とフィルタリングを行うことができます。

{{< img src="network_performance_monitoring/network_page/prenat_ip.png" alt="pre-NAT IP" >}}

## 表

ネットワークテーブルには、クエリで定義された各 _source_ と _destination_ の _ボリューム_、_スループット_、_TCP 再送回数_、_ラウンドトリップ時間 (RTT)_、_RTT 変動_メトリクスの詳細が表示されます。

{{< img src="network_performance_monitoring/network_page/network_table.png" alt="データテーブル" >}}

表の右上にある `Customize` ボタンを使い、表中の列を設定できます。

`Filter Traffic` ボタンで、表示するトラフィックを設定します。

{{< img src="network_performance_monitoring/network_page/filter_traffic_toggles_v2.png" alt="フローの詳細"  style="width:80%;">}}

外部トラフィック (公開 IP へ) と Datadog Agent トラフィックはデフォルトで表示されます。表示を絞り込むには、`Show Datadog Traffic` および `Show External Traffic` をオフにします。

### 未解決のトラフィック

未解決のソースおよび宛先タグは `N/A` とマークされます。トラフィックソースまたは宛先エンドポイントは、以下の理由で未解決となることがあります。

* ホスト / コンテナのソースまたは宛先の IP が、トラフィック集計に使用されたソースまたは宛先タグでタグ付けされていない。
* エンドポイントがプライベートネットワーク外にあるため、Datadog Agent によりタグ付けされていない。
* エンドポイントがファイアウォール、サービスメッシュ、または Datadog Agent がインストールできないその他のエンティティである。

データテーブル右上の _Show Unresolved Flows_ トグルを使用して、未解決の (`N/A`) ソースまたは宛先に紐付くフローをフィルタリングすることができます。

データテーブルの任意の行を選択すると、対象の _source_ <=> _destination_ フローに関連するログ、トレース、プロセスが表示されます。

{{< img src="network_performance_monitoring/network_page/flow_details.png" alt="フローの詳細"  style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
