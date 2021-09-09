---
title: ネットワークページ
kind: documentation
description: スタック内の各ソースと宛先間のネットワークデータを探索。
aliases:
  - /ja/network_performance_monitoring/network_table
  - /ja/network_performance_monitoring/network_page
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: ブログ
    text: ネットワークパフォーマンスモニタリング
  - link: /network_monitoring/devices
    tag: Documentation
    text: ネットワークデバイスモニタリング
  - link: /network_monitoring/performance/setup
    tag: Documentation
    text: Datadog Agent を使用したネットワークデータの収集。
  - link: /dashboards/widgets/network
    tag: Documentation
    text: ネットワークウィジェット
---
{{< img src="network_performance_monitoring/network_page/main_page_npm.png" alt="メインページ" >}}

## クエリ

検索結果を調整して特定のエンドポイント間を追跡するには、ネットワーク集約接続を集計して**タグ**でフィルタリングを行います。ページ上部の検索バーから、**_source_** および **_destination_** に対するタグを選択できます。

以下のスクリーンショットは、_source_ と _destination_ を `service` タグで集計した場合のデフォルト表示です。テーブル内の各行が、1 時間の範囲内で集計されたサービス間集約接続に相当します。

{{< img src="network_performance_monitoring/network_page/context_npm.png" alt="コンテキスト"  style="width:80%;">}}

次の例は、`us-east-1` リージョン内のサービスを表す IP アドレスからアベイラビリティーゾーンまでのすべての集約接続を示しています。

{{< img src="network_performance_monitoring/network_page/flow_table_region_az.png" alt="集約接続テーブルのフィルタリング例"  style="width:80%;">}}

ページの右上にあるタイムセレクターから、集計対象となるトラフィックに応じたタイムフレームを設定できます。

{{< img src="network_performance_monitoring/network_page/npm_timeframe.png" alt="タイムフレーム NPM"  style="width:30%;">}} 

### ファセットパネル

ファセットパネルには検索バーのクエリ内にあるタグが反映されます。画面上の _Source_ と _Destination_ タブでファセットパネルの切り替えが可能です。

{{< img src="network_performance_monitoring/network_page/destination_panel.png" alt="Destination パネル"  style="width:20%;">}}

#### カスタムファセット

Datadog ネットワークページでは、タグを使用してトラフィックデータを集計およびフィルタリングできます。タグのリストは、検索バーのドロップダウンメニューからデフォルトで利用可能です。

{{< img src="network_performance_monitoring/network_page/drop_down_npm.png" alt="ドロップダウンメニュー"  style="width:90%;">}}

リスト済みのタグには `service`、`availability zone`、`env`、`environment`、`pod`、`host`、`ip`、`port` などがあります。メニューに含まれていないタグで集計またはフィルタリングを行う場合は、該当のタグをカスタムファセットとして追加してください。

1. ファセットパネルの右上にある `+` を選択します。
2. カスタムファセットを作成したいタグを入力します。
3. `Create` をクリックします。

カスタムファセットが作成されたら、このタグを使ってネットワークページとマップ内トラフィックのフィルタリングおよび集計を行います。すべてのカスタムファセットはファセットパネル下部の `Custom` セクションに表示されます。

### ワイルドカード検索
複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

- `service:web*` は、web で始まるすべてのサービスに一致します
- `service:*web` は web で終わるすべてのサービスに一致します
- `service:*web*` は web という文字列を含むすべてのサービスに一致します

ワイルドカード検索は、この構文を使用してファセット内で機能します。次のクエリは、文字列 mongo で終わるすべてのサービスを返します。

`service:*mongo`

詳しくは、[検索構文][1]のドキュメントを参照してください。

## ネットワークデータ

{{< img src="network_performance_monitoring/network_page/network_data.png" alt="ネットワークデータ"  style="width:90%;" >}}

ネットワークメトリクスはグラフと関連するテーブルを用いて表示されます。送受信されたメトリクスの表示はすべて、ソース側から見た場合のデータとなります。

* **送信したメトリクス**: ソース側から見て、_source_ から _destination_ へ渡される値を測定します。
* **受信したメトリクス**: ソース側から見て、_destination_ から _source_ へ渡される値を測定します。

パケットが大量にドロップされた場合は、`sent_metric` (ソースから宛先へ) と `received_metric` (宛先からソースへ) の表示値が異なることがあります。`destination` から `source` に送られた大量のバイトは、`destination` 由来の集約接続に含まれます。しかし、この場合に `source` 由来の集約接続がこのバイトを「受信した」とみなすことはありません。

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
| **TCP Retransmits** | TCP 再送回数は検出された失敗回数 (配信確認のため再送が行われます) を示すものです。`source` からの再送回数で測定されます。 |
| **TCP Latency** | TCP のスムージングされたラウンドトリップ時間として、つまり送信される TCP フレームと確認されたフレーム間の時間で測定されます。 |
| **TCP Jitter** | TCP のスムージングされたラウンドトリップ時間の変動として測定されます。 |
| **Established Connections** | 確立された状態の TCP 接続の数。`source` からの接続/秒で測定されます。 |
| **Closed Connections** | 閉じた状態の TCP 接続の数。`source` からの接続/秒で測定されます。 |

### クラウドサービスの自動検出

S3 や Kinesis などのマネージドクラウドサービスに依存している場合は、内部アプリケーションからこれらのサービスへのトラフィックのパフォーマンスを監視できます。ビューを特定の AWS または GCP の依存関係にスコープして、レイテンシーを特定し、データベースのパフォーマンスを評価し、ネットワークをより完全に視覚化します。

{{< img src="network_performance_monitoring/network_page/cloud-service-hero-docs.png" alt="クラウドサービスマップ" >}}

たとえば、次のことができます。

- 内部 Kubernetes クラスターから[ネットワークマップ][2]の `service:aws.s3` へのデータフローを視覚化する。
- [ネットワークページ](#table)にピボットして、そのサービスへの接続を最も多く確立しているポッドを特定する。
- *Integration Metrics* タブで、特定の依存関係のサイドパネルで直接トラフィックパフォーマンスと相関している S3 パフォーマンスメトリクスを分析して、リクエストが成功したことを検証する。

NPM は自動的に、

- ネットワーク呼び出しを S3 (`s3_bucket` で分類できる)、RDS (`rds_instance_type` で分類できる)、Kinesis、ELB、Elasticache、その他の [AWS サービス][3]にマッピングします。
- API 呼び出しを AppEngine、Google DNS、Gmail、その他の [GCP サービス][4]にマッピングします。

Agent をインストールできない他のエンドポイント (パブリック API など) を監視するには、[`domain` タグ](#dns-resolution)でネットワーク概要の宛先をグループ化します。

### ドメイン解決

Agent 7.17+ 以降において、Agent は IP を解決して外部および内部トラフィックで判読可能なドメイン名に転換できるようになりました。ドメインは、S3 バケット、アプリケーションロードバランサー、API など、Datadog Agent のインストールができないクラウドプロバイダーのエンドポイントを監視する場合に役立ちます。C&C サーバーの DGA ドメインなど、認識不能なドメイン名はネットワークのセキュリティ脅威につながる恐れがあります。`domain` **は Datadog 内のタグとしてエンコードされている**ため、検索バーのクエリやファセットパネルでそれを使用してトラフィックの集計とフィルタリングを行うことができます。

{{< img src="network_performance_monitoring/network_page/domain_aggregation.png" alt="ドメイン集計" >}}

**注**: DNS 解決は、システムプローブがルートネットワークのネームスペースで稼働しているホストでサポートされています。通常、ホストネットワークを使用せずにコンテナ内でシステムプローブを稼働させているケースがよくみられます。

### ネットワークアドレス変換 (NAT)

NAT は、Kubernetes とその他のシステムでコンテナ間のトラフィックをルートするために使用されるツールです。(サービス間などの) 特定の依存関係を調査する場合は、pre-NAT IP の存在可否によってそのサービスが Kubernetes ネイティブのサービス (独自のルーティングを使用) か、外部クライアントに依存してルーティングを行っているサービスか否かを判断できます。この機能では現在、NAT ゲートウェイの解決を行うことはできません。

pre-NAT および post-NAT IP を確認するには、テーブル設定から _Show pre-NAT IPs_ トグルを使用します。この設定のトグルを外した場合に、Source IP および Dest IP 列にデフォルトで表示されている IP はすべて post-NAT IP となります。ひとつの post-NAT IP に対して複数の pre-NAT IP が存在する場合は、最も一般的な pre-NAT IP のトップ 5 が表示されます。その他の製品と同様、`pre_nat.ip` タグを使用してトラフィックの集計とフィルタリングを行うことができます。

{{< img src="network_performance_monitoring/network_page/prenat_ip.png" alt="pre-NAT IP" >}}

### ネットワーク ID

NPM ユーザーは、IP スペースが重複するようにネットワークを構築できます。たとえば、アドレス範囲が重複する複数の VPC（仮想プライベートクラウド）にデプロイし、ロードバランサーまたはクラウドゲートウェイを介してのみ通信したい場合があります。

トラフィックの宛先を正しく分類するため、NPM はタグとして表されるネットワーク ID の概念を使用します。ネットワーク ID とは、相互通信が可能な一連の IP アドレスを表す英数字の識別子です。異なるネットワーク ID を持つ複数のホストにマッピングされた IP アドレスが検出されると、この識別子を使用して特定のホストのネットワークトラフィックの送信先や送信元を判断します。

AWS や GCP では、ネットワーク ID は自動的に VPC ID に設定されます。他の環境でネットワーク ID を設定するには、次のように `datadog.yaml` で手動で設定するか、プロセスおよびコア Agent コンテナに `DD_NETWORK_ID` を追加します。

  ```shell
  network:
     Id: <your-network-id>
  ```

### 保存済みビュー

トラフィックデータのビューを整理し共有します。保存済みビューを使用すると、デバッグをすばやく行いコラボレーションを強化できます。たとえば、作成したビューを、今後の共通クエリのために保存し、リンクをコピーしてチームメイトとネットワークデータを共有できます。

{{< img src="network_performance_monitoring/network_page/npm_saved_views.png" alt="保存済みビュー" >}}

- ビューを保存するには、*+ Save* ボタンをクリックして、現在のクエリ、テーブル、コンフィギュレーション、グラフのメトリクスを記録するビューに名前を付けます。
- ビューを読み込むには、左上の *Views* をクリックして、保存済みビューを表示しリストからビューを選択します。
- ビューの名前を変更するには、保存済みビューのリストでビューの上にカーソルを合わせ、ギアアイコンをクリックして *Edit name* を選択します。
- ビューを共有するには、保存済みビューのリストでビューの上にカーソルを合わせ、リンクアイコンをクリックして *Copy permalink* を選択します。

詳しくは、[保存済みビュー][5]のドキュメントを参照してください。


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

データテーブル右上の _Show N/A (Unresolved Traffic)_ トグルを使用して、未解決の (`N/A`) ソースまたは宛先に紐付く集約接続をフィルタリングすることができます。

データテーブルの任意の行を選択すると、対象の _source_ <=> _destination_ 集約接続に関連するログ、トレース、プロセスが表示されます。

{{< img src="network_performance_monitoring/network_page/flow_details.png" alt="集約接続の詳細"  style="width:80%;">}}

## サイドパネル

サイドパネルは、ネットワーク依存関係のデバッグに役立つコンテキストテレメトリを提供します。Flows、Logs、Traces、Processes タブを使用して、2 つのエンドポイント間のトラフィックの再送信数またはレイテンシーの増加の原因が次であるかどうかを判別します。
- 特定のポートまたは IP からのトラフィック量の急増。
- 宛先エンドポイントの CPU またはメモリを消費する重いプロセス。
- ソースエンドポイントのコードでのアプリケーションエラー。

{{< img src="network_performance_monitoring/network_page/npm_sidepanel.png" alt="フローの詳細"  style="width:80%;">}}

### 一般的なタグ

サイドパネルの上部には、検査された依存関係の最新の接続で共有されている一般的なソースタグと宛先タグが表示されます。一般的なタグを使用して、障害のあるエンドポイントに関する追加のコンテキストを取得します。たとえば、特定のサービスへの潜在的な通信をトラブルシューティングする場合、一般的な宛先タグによって次が浮上します。
- トラフィックが流れているコンテナ、タスク、ホストなどの詳細なコンテキスト。
- サービスが実行されるアベイラビリティーゾーン、クラウドプロバイダーアカウント、デプロイなどの幅広いコンテキスト。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/search_syntax/
[2]: /ja/network_monitoring/performance/network_map/
[3]: /ja/network_monitoring/performance/guide/aws_supported_services/
[4]: /ja/network_monitoring/performance/guide/gcp_supported_services/
[5]: /ja/logs/explorer/saved_views/