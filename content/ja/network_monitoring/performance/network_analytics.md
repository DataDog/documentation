---
aliases:
- /ja/network_performance_monitoring/network_table
- /ja/network_performance_monitoring/network_page
- /ja/network_monitoring/performance/network_page
description: Explore your Network data between each source and destination across
  your stack.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Streamline network investigations with an enhanced querying and map experience
- link: /network_monitoring/devices
  tag: Documentation
  text: Network Device Monitoring
- link: /network_monitoring/performance/setup
  tag: Documentation
  text: Collect your Network Data with the Datadog Agent.
title: Network Analytics
---

## 概要

The Network Analytics page provides insights into your overall network health and shows [recommended queries](#recommended-queries) at the top of the page. These recommended queries enable you to run common queries and see snapshots of relevant metrics, so that you can see changes in throughput, latency, DNS errors, and more. Clicking on a recommended query automatically populates the search bar, group bys, and summary graphs to provide you with relevant insights into your network.

{{< img src="network_performance_monitoring/network_analytics/main_page_npm3.png" alt="Network Analytics landing page under Network Performance" >}}

## クエリ

検索対象を特定のエンドポイント間のトラフィックに絞るには、ネットワーク集約接続を集計して**タグ**でフィルタリングを行います。ページ上部の検索バーから、クライアントおよびサーバーに対するタグを選択できます。クライアントは接続が発生した場所、サーバーは接続が終結した場所を意味します。

{{< img src="network_performance_monitoring/network_analytics/network_diagram2.png" alt="インバウンドとアウトバウンドのリクエストを示したネットワーク図" style="width:100%;">}}

以下のスクリーンショットは、クライアントとサーバーを `service` タグで集計した場合のデフォルト表示です。テーブル内の各行が、1 時間の範囲内で集計されたサービス間集約接続に相当します。

{{< img src="network_performance_monitoring/network_analytics/context_npm2.png" alt="Query interface, with the inputs 'Search for', 'View clients as', and 'View servers as'" style="width:90%;">}}

次の例は、`us-east-1` リージョン内のサービスを表す IP アドレスからアベイラビリティーゾーンまでのすべての集約接続を示しています。

{{< img src="network_performance_monitoring/network_analytics/flow_table_region_az2.png" alt="集計接続テーブルのフィルタリング" style="width:80%;">}}

ページの右上にあるタイムセレクターから、集計対象となるトラフィックに応じたタイムフレームを設定できます。

{{< img src="network_performance_monitoring/network_analytics/npm_timeframe.png" alt="タイムフレーム NPM" style="width:30%;">}}

Tags from Datadog integrations or [Unified Service Tagging][12] can be used for aggregating and filtering automatically. See [custom facets](#custom-facets), below, for other tags. You can also select "Auto-grouped traffic" to see traffic bucketed into several commonly used tags such as `service`, `kube_service`, `short_image`, and `container_name`.

`CIDR(network.client.ip, 10.0.0.0/8)` または`CIDR(network.server.ip, 10.0.0.0/8)` でクライアントまたはサーバーが CIDR に一致するトラフィックにフィルターすることができます。

### 推奨クエリ

{{< img src="network_performance_monitoring/network_analytics/recommended_query_options.png" alt="3 つの推奨クエリが表示されている Datadog の Network Analytics ページ">}}

Recommended queries allow you to begin investigating into your network—whether you're troubleshooting a specific issue or gaining a better overall understanding of your network. The recommended queries help you quickly find relevant network information without needing to search for or group the traffic. For example, the recommended query `Find dependencies of service: web-store` populates the search bar with the query `client_service: web-store` and displays the top services that the service web-store is sending traffic to within the network, and therefore its downstream dependencies.

Any available recommended queries are provided at the top of the Analytics page, and there are three recommended queries at the top of the [DNS page][10]. Use these queries to access commonly used data, and see any changes in that data in the last hour.

推奨クエリを実行するには、タイルをクリックします。タイルの上にカーソルを置くと、クエリが返すデータの説明と概要が表示されます。

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="説明とクエリ情報が表示され、Search for、View clients as、View servers as、Visualize as の 4 つのクエリディメンションが表示されている推奨クエリの詳細ビュー" style="width:80%;">}}

### ファセットパネル

ファセットパネルを利用すれば、フローで利用可能なすべてのタグを検索したり、探していたタグを正確に思い出せない場合にトラフィックをフィルタリングしたりすることができます。ファセットパネルには検索バーのクエリ内にあるタグが反映されます。画面上部の**クライアント**と**サーバー**タブでファセットパネルの切り替えが可能です。

{{< img src="network_performance_monitoring/network_analytics/destination_panel2.png" alt="Destination パネル" style="width:20%;">}}

#### カスタムファセット

Datadog ネットワークページでは、タグを使用してトラフィックデータを集計およびフィルタリングできます。タグのリストは、検索バーのドロップダウンメニューからデフォルトで利用可能です。

{{< img src="network_performance_monitoring/network_analytics/drop_down_npm.png" alt="ドロップダウンメニュー" style="width:90%;">}}

リスト済みのタグには `service`、`availability zone`、`env`、`environment`、`pod`、`host`、`ip`、`port` などがあります。メニューに含まれていないタグで集計またはフィルタリングを行う場合は、該当のタグをカスタムファセットとして追加してください。

1. ファセットパネルの右上にある `+` を選択します。
2. カスタムファセットを作成したいタグを入力します。
3. `Create` をクリックします。

カスタムファセットが作成されたら、このタグを使ってネットワークページとマップ内トラフィックのフィルタリングおよび集計を行います。すべてのカスタムファセットはファセットパネル下部の `Custom` セクションに表示されます。

### ワイルドカード検索
複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

- `client_service:web*` は、web で始まるすべてのクライアントサービスに一致します
- `client_service:*web` は、web で終わるすべてのクライアントサービスに一致します
- `client_service:*web*` は web という文字列を含むすべてのクライアントサービスに一致します

ワイルドカード検索は、この構文を使用してファセット内で機能します。次のクエリは、文字列 "mongo" で終わるすべてのクライアントサービスを返します。

`client_service:*mongo`

詳しくは、[検索構文][1]のドキュメントを参照してください。

### グループ化

グループを利用すれば、特定のタグの値によってデータをグループ化できます。例えば、**host** などのグループを選択した場合、結果が個々のホスト単位でグループ化されます。また、オプション **Ungrouped traffic** を選択して、すべてのデータを単一のグループとして表示することも可能です。さらに、自分の関心のあるグループでタグ付けされていない大量のデータが存在する場合もあるでしょう。そのような場合は、**Auto-grouped traffic** を利用すれば、利用可能なタグでデータをグループ化することができます。

## サマリーグラフ

サマリーグラフは、ネットワークの凝縮されたビューであり、必要に応じてボリューム、スループット、接続、またはレイテンシーを表示するように変更できます。一度に最大 3 つのサマリーグラフを表示し、組織に合わせてデータタイプと視覚化タイプを変更できます。グラフのデータソースを更新するには、グラフのタイトルをクリックし、ドロップダウンメニューから選択します。

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="データをフィルターするための以下のオプションが表示されている Network Analytics ページのサマリーグラフセクション: Volume Sent、Throughput Sent、Volume Received、Throughput Received、Established Connections、Closed Connections、Established Connections / Second、Closed Connections / Second、TCP Latency" style="width:80%;">}}

視覚化タイプを変更するには、グラフの右上隅にある鉛筆アイコンをクリックします。以下のスクリーンショットのように、利用可能なオプションから選択します。

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Y 軸のスケールを Linear、Log、Pow、Sqrt で調整し、グラフの種類を Area、Line、Bars、Toplist、Change、Piechart で調整するオプションが表示されているサマリーグラフの視覚化オプション" style="width:80%;">}}

特定のグラフを非表示にするには、鉛筆アイコンの隣にある非表示アイコンをクリックします。グラフは 1〜3 つまで表示できます。グラフを追加するには、サマリーグラフの右側にあるプラスアイコン `+` をクリックし、追加するグラフを選択します。新しいグラフを追加する際に、グラフをデフォルトのグラフにリセットすることもできます。

{{< img src="network_performance_monitoring/network_analytics/summary_graphs_reset_graphs.png" alt="グラフの追加とグラフのリセットのオプションを表示しているサマリーグラフセクション" style="width:80%;">}}

## ネットワークデータ

{{< img src="network_performance_monitoring/network_analytics/network_data2.png" alt="ネットワークデータ" style="width:90%;" >}}

ネットワークメトリクスはグラフと関連するテーブルを用いて表示されます。送受信されたメトリクスの表示はすべて、ソース側から見た場合のデータとなります。

* **送信したメトリクス**: ソース側から見て、_source_ から _destination_ へ渡される値を測定します。
* **受信したメトリクス**: ソース側から見て、_destination_ から _source_ へ渡される値を測定します。

パケットが大量にドロップされた場合は、`sent_metric` (ソースから宛先へ) と `received_metric` (宛先からソースへ) の表示値が異なることがあります。`destination` から `source` に送られた大量のバイトは、`destination` 由来の集約接続に含まれます。しかし、この場合に `source` 由来の集約接続がこのバイトを「受信した」とみなすことはありません。

**注:** データは 30 秒ごとに収集され、5 分ごとに集計され、14 日間保持されます。

### メトリクス

#### ネットワークのロード

以下のネットワークロードメトリクスが利用可能です。

| メトリクス          |  説明                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **ボリューム**      | ある期間中に送受信されたバイト数。バイトを単位として (またはその大きさ順で) 双方向に測定されます。                           |
| **スループット**  | ある期間中に送受信されたバイトのレート。バイトを単位として毎秒、双方向に測定されます。                                                  |

#### TCP

TCP is a connection-oriented protocol that guarantees in-order delivery of packets. 

The following TCP metrics are available: 

| メトリクス | 説明 |
|---|---|
| **TCP Retransmits** | TCP 再送回数は検出された失敗回数 (配信確認のため再送が行われます) を示すものです。クライアントからの再送回数で測定されます。 |
| **TCP Latency** | TCP のラウンドトリップタイム (TCP フレームの送信から確認応答までの時間) を平滑化した値として測定されます。 |
| **TCP Jitter** | TCP のスムージングされたラウンドトリップ時間の変動として測定されます。 |
| **TCP Timeouts** (Private Beta) | The number of TCP connections that timed out from the perspective of the operating system. This can indicate general connectivity and latency issues.  |
| **TCP Refusals** (Private Beta) | The number of TCP connections that were refused by the server. Typically this indicates an attempt to connect to an IP/Port that isn’t receiving connections, or a firewall/security misconfiguration. |
| **TCP Resets** (Private Beta) | The number of TCP connections that were reset by the server.  |
| **Established Connections** | 確立された状態の TCP 接続の数。クライアントからの接続/秒で測定されます。 |
| **Closed Connections** | 閉じた状態の TCP 接続の数。クライアントからの接続/秒で測定されます。 |

<div class="alert alert-warning">TCP Timeouts, Refusals, and Resets are in private beta. Reach out to your Datadog representative to request access. Once you've signed up, follow the <a href="/network_monitoring/performance/setup/?tab=agentlinux#failed-connections-private-beta">instructions</a> to enable the feature on your agent.</div>

All metrics are instrumented from the perspective of the `client` side of the connection when available, or the server if not.

### クラウドサービスの自動検出

If you're relying on managed cloud services like S3 or Kinesis, you can monitor the performance of traffic to those services from your internal applications. Scope your view to a particular AWS, Google Cloud, or Azure dependency to pinpoint latency, assess database performance, and visualize your network more completely.

{{< img src="network_performance_monitoring/network_analytics/cloud-service-hero-docs2.png" alt="クラウドサービスマップ" >}}

For instance, you can:

- Visualize data flow from your internal Kubernetes cluster to `server_service:aws.s3` in the [Network Map][2].
- Pivot to the [Network Page](#table) to isolate which pods are establishing the most connections to that service, and
- Validate that their request is successful by analyzing S3 performance metrics, which are correlated with traffic performance directly in the side panel for a given dependency, under the *Integration Metrics* tab.

NPM automatically maps:

- Network calls to S3 (which can broken down by `s3_bucket`), RDS (which can be broken down by `rds_instance_type`), Kinesis, ELB, Elasticache, and other [AWS services][3].
- API 呼び出しを AppEngine、Google DNS、Gmail、その他の [Google Cloud サービス][4]にマッピングします。

Agent をインストールできない他のエンドポイント (パブリック API など) を監視するには、[`domain` タグ](#domain-resolution)でネットワーク概要の宛先をグループ化します。または、次のセクションのクラウドサービスレゾリューションを参照してください。

### クラウドサービスエンハンスドレゾリューション
AWS または Azure 用にエンハンスドレゾリューションを[セットアップ][9]した場合は、これらのクラウドプロバイダーから収集した複数のリソースを使って、NPM でネットワークトラフィックのフィルタリングとグループ化が可能です。クラウドプロバイダーおよびリソースによって、使用できるタグの組み合わせは異なります。ユーザー定義のタグに加え、Datadog が以下のタグを適用します。

 #### Amazon Web Services
 {{< tabs >}}
 {{% tab "ロードバランサー" %}}
 - name
 - loadbalancer
 - load_balancer_arn
 - dns_name (形式: loadbalancer/dns:)
 - region
 - account_id
 - scheme
 - AWS ロードバランサーに適用されるカスタム (ユーザー定義) タグ
 {{% /tab %}}

 {{% tab "NAT ゲートウェイ" %}}
 - gateway_id
 - gateway_type
 - aws_nat_gateway_id
 - aws_nat_gateway_public_ip
 - aws_account
 - availability-zone
 - region
 - AWS Nat ゲートウェイに適用されるカスタム (ユーザー) タグ
 {{% /tab %}}

 {{% tab "VPC インターネットゲートウェイ" %}}
 - gateway_id
 - gateway_type
 - aws_internet_gateway_id
 - aws_account
 - region
 - VPC インターネットゲートウェイに適用されるカスタム (ユーザー) タグ
 {{% /tab %}}

{{% tab "VPC エンドポイント" %}}
 - gateway_id
 - gateway_type
 - aws_vpc_endpoint_id
 - VPC インターネットエンドポイントに適用されるカスタム (ユーザー) タグ
 {{% /tab %}}

 {{< /tabs >}}

#### Azure
##### ロードバランサーとアプリケーションゲートウェイ
 - name
 - loadbalancer
 - cloud_provider
 - region
 - type
 - resource_group
 - tenant_name
 - subscription_name
 - subscription_id
 - sku_name
 - Azure ロードバランサーとアプリケーションゲートウェイに適用されるカスタム (ユーザー定義) タグ


### ドメイン解決

Agent 7.17+ 以降において、Agent は IP を解決して外部および内部トラフィックで判読可能なドメイン名に転換できるようになりました。ドメインは、S3 バケット、アプリケーションロードバランサー、API など、Datadog Agent のインストールができないクラウドプロバイダーのエンドポイントを監視する場合に役立ちます。C&C サーバーの DGA ドメインなど、認識不能なドメイン名はネットワークのセキュリティ脅威につながる恐れがあります。`domain` **は Datadog 内のタグとしてエンコードされている**ため、検索バーのクエリやファセットパネルでそれを使用してトラフィックの集計とフィルタリングを行うことができます。

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation2.png" alt="ドメイン集計" >}}

**注**: DNS 解決は、システムプローブがルートネットワークのネームスペースで稼働しているホストでサポートされています。通常、ホストネットワークを使用せずにコンテナ内でシステムプローブを稼働させているケースがよくみられます。

### ネットワークアドレス変換 (NAT)

NAT は、Kubernetes とその他のシステムでコンテナ間のトラフィックをルートするために使用されるツールです。(サービス間などの) 特定の依存関係を調査する場合は、pre-NAT IP の存在可否によってそのサービスが Kubernetes ネイティブのサービス (独自のルーティングを使用) か、外部クライアントに依存してルーティングを行っているサービスか否かを判断できます。この機能では現在、NAT ゲートウェイの解決を行うことはできません。

pre-NAT および post-NAT IP を確認するには、テーブル設定の **Show pre-NAT IPs** トグルを使用します。この設定のトグルを外した場合に、**Client IP** および **Server IP** 列にデフォルトで表示されている IP はすべて post-NAT IP となります。ひとつの post-NAT IP に対して複数の pre-NAT IP が存在する場合は、最も一般的な pre-NAT IP のトップ 5 が表示されます。`pre_nat.ip` タグは、製品の他のタグ同様、トラフィックの集計とフィルタリングに使用できます。

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="pre-NAT IPs" >}}

### ネットワーク ID

NPM ユーザーは、IP スペースが重複するようにネットワークを構築できます。たとえば、アドレス範囲が重複する複数の VPC (仮想プライベートクラウド) にデプロイし、ロードバランサーまたはクラウドゲートウェイを介してのみ通信したい場合があります。

トラフィックの宛先を正しく分類するため、NPM はタグとして表されるネットワーク ID の概念を使用します。ネットワーク ID とは、相互通信が可能な一連の IP アドレスを表す英数字の識別子です。異なるネットワーク ID を持つ複数のホストにマッピングされた IP アドレスが検出されると、この識別子を使用して特定のホストのネットワークトラフィックの送信先や送信元を判断します。

AWS や Google Cloud では、ネットワーク ID は自動的に VPC ID に設定されます。他の環境でネットワーク ID を設定するには、次のように `datadog.yaml` で手動で設定するか、プロセスおよびコア Agent コンテナに `DD_NETWORK_ID` を追加します。

  ```yaml
  network:
     Id: <your-network-id>
  ```

### 保存ビュー

トラフィックデータのビューを整理し共有します。保存ビューを使用すると、デバッグをすばやく行いコラボレーションを強化できます。たとえば、作成したビューを、今後の共通クエリのために保存し、リンクをコピーしてチームメイトとネットワークデータを共有できます。

{{< img src="network_performance_monitoring/network_analytics/npm_saved_views2.png" alt="保存ビュー" >}}

- ビューを保存するには、*+ Save* ボタンをクリックして、現在のクエリ、テーブル、コンフィギュレーション、グラフのメトリクスを記録するビューに名前を付けます。
- ビューを読み込むには、左上の *Views* をクリックして、保存ビューを表示しリストからビューを選択します。
- ビューの名前を変更するには、保存ビューのリストでビューの上にカーソルを合わせ、ギアアイコンをクリックして *Edit name* を選択します。
- ビューを共有するには、保存ビューのリストでビューの上にカーソルを合わせ、リンクアイコンをクリックして *Copy permalink* を選択します。

詳しくは、[保存ビュー][5]のドキュメントを参照してください。


## 表

ネットワークテーブルには、クエリで定義された各 _source_ と _destination_ の _ボリューム_、_スループット_、_TCP 再送回数_、_ラウンドトリップ時間 (RTT)_、_RTT 変動_メトリクスの詳細が表示されます。

{{< img src="network_performance_monitoring/network_analytics/network_table2.png" alt="データテーブル" >}}

表の右上にある `Customize` ボタンを使い、表中の列を設定できます。

`Filter Traffic` ボタンで、表示するトラフィックを設定します。

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggles_v2.png" alt="フローの詳細" style="width:80%;">}}

外部トラフィック (公開 IP へ) と Datadog Agent トラフィックはデフォルトで表示されます。表示を絞り込むには、`Show Datadog Traffic` および `Show External Traffic` をオフにします。  

### 未解決のトラフィック

未解決のクライアントおよびサーバータグは `N/A` とマークされます。トラフィックのクライアントまたはサーバーエンドポイントは、以下の理由で未解決となることがあります。

* ホスト / コンテナのクライアントまたはサーバーの IP が、トラフィック集計に使用されたクライアントまたはサーバータグでタグ付けされていない。
* エンドポイントがプライベートネットワーク外にあるため、Datadog Agent によりタグ付けされていない。
* エンドポイントがファイアウォール、サービスメッシュ、または Datadog Agent がインストールできないその他のエンティティである。

データテーブル右上の **Show N/A (Unresolved Traffic)** トグルを使用して、未解決の (`N/A`) クライアントまたはサーバーに紐付く集約接続をフィルタリングすることができます。

データテーブルの任意の行を選択すると、対象の**クライアント**  <=> **サーバー**集約接続に関連するログ、トレース、プロセスが表示されます。

{{< img src="network_performance_monitoring/network_analytics/flow_details.png" alt="集計接続の詳細" style="width:80%;">}}

### Pivot to network path

Hover over a row in the analytics table to pivot to [network path][11] and see the paths between the source and destination specified in NPM.

{{< img src="network_performance_monitoring/network_analytics/view_network_path.png" alt="Example of hovering over a row in the Analytics table to show the Network Path toggle" style="width:90%;">}}

## サイドパネル

サイドパネルは、ネットワーク依存関係のデバッグに役立つコンテキストテレメトリを提供します。Flows、Logs、Traces、Processes タブを使用して、2 つのエンドポイント間のトラフィックの再送信数またはレイテンシーの増加の原因が次であるかどうかを判別します。
- 特定のポートまたは IP からのトラフィック量の急増。
- 宛先エンドポイントの CPU またはメモリを消費する重いプロセス。
- クライアントエンドポイントのコードでのアプリケーションエラー。

{{< img src="network_performance_monitoring/network_analytics/npm_sidepanel2.png" alt="フローの詳細" style="width:80%;">}}

### 一般的なタグ

サイドパネルの上部には、検査された依存関係の最新の接続で共有されている一般的なクライアントタグとサーバータグが表示されます。一般的なタグを使用して、障害のあるエンドポイントに関する追加のコンテキストを取得します。たとえば、特定のサービスへの通信遅延についてトラブルシューティングする場合、一般的な宛先タグによって以下の情報が明らかになります。
- トラフィックが流れているコンテナ、タスク、ホストなどの詳細なコンテキスト。
- サービスが実行されるアベイラビリティゾーン、クラウドプロバイダーアカウント、デプロイなどの幅広いコンテキスト。

### セキュリティ

**Security** タブでは、[Cloud Security Management Threats][6] と [Cloud Security Management Misconfigurations][7] によって検出された潜在的なネットワークの脅威と所見を確認できます。これらのシグナルは、Datadog が[検出ルールまたはコンプライアンスルール][8]に一致するネットワークアクティビティを検出した際や、選択したネットワークフローに関連するその他の脅威や誤構成があった場合に生成されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/search_syntax/
[2]: /ja/network_monitoring/performance/network_map/
[3]: /ja/network_monitoring/performance/guide/aws_supported_services/
[4]: /ja/network_monitoring/performance/guide/gcp_supported_services/
[5]: /ja/logs/explorer/saved_views/
[6]: /ja/security/threats/
[7]: /ja/security/cloud_security_management/misconfigurations/
[8]: /ja/security/detection_rules/
[9]: /ja/network_monitoring/performance/setup/#enhanced-resolution
[10]: /ja/network_monitoring/dns/#recommended-queries
[11]: /ja/getting_started/tagging/unified_service_tagging/
[12]: /ja/network_monitoring/network_path