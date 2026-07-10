---
aliases:
- /ja/network_performance_monitoring/network_table
- /ja/network_performance_monitoring/network_page
- /ja/network_monitoring/performance/network_page
- /ja/network_monitoring/performance/network_analytics
description: スタック内の各ソースと宛先間のネットワークデータを探索します。
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: ブログ
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: ブログ
  text: 強化されたクエリ機能とマップ体験でネットワーク調査を効率化する
- link: /network_monitoring/devices
  tag: ドキュメント
  text: Network Device Monitoring
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: ガイド
  text: アプリケーションの可用性をネットワークインサイトで検知する
title: Network Analytics
---
## 概要 {#overview}

Network Analytics ページは、全体的なネットワークヘルスに関するインサイトを提供し、ページの上部に[推奨クエリ](#recommended-queries)を表示します。これらの推奨クエリを使用すると、一般的なクエリを実行し、スループット、レイテンシー、DNS エラーなどの関連するメトリクスのスナップショットを確認できます。推奨クエリをクリックすると、検索バー、グループ化、要約グラフが自動的に入力され、ネットワークに関連するインサイトが提供されます。

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_3.png" alt="Cloud Network Monitoring のNetwork Analytics ランディングページ" >}}

## クエリ {#queries}

検索対象を特定のエンドポイント間のトラフィックに絞り込むには、ネットワーク接続を集計して**タグ**でフィルタリングします。Datadog インテグレーションのタグや [Unified Service Tagging][12] を使用して、自動的に集計やフィルタリングを行うことができます。Network Monitoring でタグ付けを利用する際には、特定のサービスやインフラストラクチャー全体におけるアベイラビリティゾーン間のネットワークトラフィックフローを活用できます。`client` および `server` タグでグループ化すると、これら 2 つのタグセット_間_のネットワークフローが視覚化されます。

さらに、Datadog はニーズに最も関連するネットワークトラフィックを効率的にクエリおよび分析するために使用できるデフォルトの[標準](#default-tags)タグリストを提供します。

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="タグでグループ化したときにリクエストがどのように表示されるかを示すネットワークダイアグラム" style="width:100%;">}}

例えば、`orders-app` という名前の注文サービスとすべてのアベイラビリティゾーン間のネットワークトラフィックを確認したい場合は、検索バーで `client_service:orders-app` を使用し、**グループ化**ドロップダウンに `client_service` および `server_availability-zone` タグを追加して、これら 2 つのタグセット間のトラフィックフローを視覚化します。

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag_2.png" alt="サービスでフィルタリングし、アベイラビリティゾーンでグループ化したときにリクエストがどのように表示されるかを示す Network Analytics ページ" style="width:90%;">}}

デフォルトのビューは、`service` タグでクライアントとサーバーを集計します。そのため、テーブルの各行は 1 時間単位で集計されたサービス間の接続数を表します。**自動グループ化されたトラフィック**を選択すると、`service`、`kube_service`、`short_image`、`container_name` などの一般的に使用されるいくつかのタグに、バケット化されたトラフィックが表示されます。

**注**: `NA/Untagged` トラフィックパスに関する情報については、[未解決のトラフィック](#unresolved-traffic)を参照してください。

### トラフィックの方向に関連するクライアントとサーバーの役割を理解する {#understanding-client-and-server-roles-in-relation-to-traffic-direction}

Network Analytics ページは、あるゾーンのクライアントから別のゾーンのサーバーへの方向性トラフィックフローを示します。これらのフローは対称的ではなく、逆にした場合に「送信バイト」と「受信バイト」が等しく表示されないことがあります。

このコンテキストでは:

- クライアントは接続を開始する側を指します。
- サーバーはその接続に応答する側です。

Datadog は、どちらが接続を開始したかに基づいてトラフィックをモニターします。逆方向 (サーバーからクライアント) は別のフローとして表示され、異なるボリュームメトリクスを持つ場合があったり、その方向で接続が開始されていない場合はデータが全くなかったりすることもあります。

例えば、`us-east-1d` のクライアントが `us-east-1c` のサーバーと通信する場合、かなりのトラフィックが見られることがあります。しかし、`us-east-1d` にサーバーがない場合、逆の行 (`us-east-1c → us-east-1d`) はほとんどまたは全くデータを表示しないことがあります。

**注**: トラフィックの非対称性は、アプリケーションの動作やインフラストラクチャー要素 (例: プロキシや NAT) からも生じる可能性があり、一方向での接続の開始がないことも原因となります。

### 推奨クエリ {#recommended-queries}

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_3.png" alt="3 つの推奨クエリが表示されている Datadog の Network Analytics ページ">}}

推奨クエリを使用すると、特定の問題をトラブルシューティングしている場合でも、ネットワーク全体の理解を深めるためでも、ネットワークの調査を開始できます。推奨クエリは、トラフィックを検索したりグループ化したりすることなく、関連するネットワーク情報を見つけるのに役立ちます。例えば、推奨クエリ `Find dependencies of service: web-store` は検索バーにクエリ `client_service: web-store` を入力し、サービスウェブストアがネットワーク内でトラフィックを送信しているトップサービスを表示し、その下流の依存関係を表示します。

利用可能な推奨クエリは Analytics ページの上部に提供され、[DNS ページ][10]の上部には 3 つの推奨クエリがあります。これらのクエリを使用して、一般的に使用されるデータにアクセスし、過去 1 時間のデータの変化を確認します。

推奨クエリを実行するには、タイルをクリックします。タイルの上にカーソルを置くと、クエリが返すデータの説明と概要が表示されます。

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="説明とクエリ情報が表示され、Search for、View clients as、View servers as、Visualize as の 4 つのクエリディメンションが表示されている推奨クエリの詳細ビュー" style="width:70%;">}}

### ファセットパネル {#facet-panels}

ファセットパネルを使用して、フロー上のすべての利用可能なタグをブラウズしたり、正確なタグ名を覚えることなくトラフィックをフィルタリングしたりします。ファセットパネルは、検索バーのクエリ内のタグを反映します。**クライアント**および**サーバー**タブを使用して、ファセットパネル間を切り替えます。

#### カスタムファセット {#custom-facets}

Network Analytics ページで、任意のタグによってトラフィックデータを集計およびフィルタリングします。含まれているタグのリストは、画面の左側にある**クライアント**および**サーバー**タブの下、または**グループ化**ドロップダウンメニューにあります。

含まれているタグは、`service`、`availability zone`、`env`、`environment`、`pod`、`host`、`ip`、`port` などです。メニューにまだないタグでトラフィックを集計またはフィルタリングしたい場合は、カスタムファセットとして追加します。

1. ファセットパネルの右上にある **+ Add** ボタンを選択します。
2. カスタムファセットを作成したいタグを入力します。
3. **追加**をクリックします。

カスタムファセットが作成された後、このタグを使用して Network Analytics ページおよびネットワークマップでトラフィックをフィルタリングおよび集計します。すべてのカスタムファセットは、ファセットパネルの `Custom` セクションの下部で表示できます。

### ワイルドカード検索 {#wildcard-search}
複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

- `client_service:web*` は web で始まるすべてのクライアントサービスに一致します。
- `client_service:*web`は web で終わるすべてのクライアントサービスに一致します。
- `client_service:*web*`は web という文字列を含むすべてのクライアントサービスに一致します。

ワイルドカード検索はこの構文を使用してファセット内で機能します。このクエリは、文字列 "mongo" で終わるすべてのクライアントサービスを返します。

`client_service:*mongo`

詳しくは、[検索構文][1]のドキュメントを参照してください。

### 中立タグ {#neutral-tags}

中立タグは、特定のクライアントやサーバーに特有ではなく、全体のフローに適用されるタグです。これらの中立タグを使用してトラフィックを検索およびフィルタリングできます。例えば、これらのタグを使用して TLS で暗号化されたトラフィックをフィルタリングできます。

中立タグとその説明の完全なリストについては、タグリファレンスの[中立タグ][15]を参照してください。

### グループ化 {#group-by}

グループを利用すれば、特定のタグの値によってデータをグループ化できます。例えば、**ホスト**などのグループを選択した場合、結果が個々のホスト単位でグループ化されます。さらに、自分の関心のあるグループでタグ付けされていない大量のデータが存在する場合もあるでしょう。そのような場合は、**自動グループ化されたトラフィック**を利用すれば、利用可能なタグでデータをグループ化することができます。

すべてのホストからの接続を 1 つのグループにまとめて調査するには、**グループ化**のドロップダウンから `client_host` および `Auto-Grouped-Servers` タグを追加します。

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped_client.png" alt="ホストでソートされ、自動グループ化されたトラフィックでグループ化された NPM 分析ページ" style="width:90%;">}}

**自動グループ化されたトラフィック**オプションは、タグのソースを特定する上で役立ちます。例えば、個々のアイコンにカーソルを合わせると、タグの起源を示すツールチップが表示されます。

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="アイコンのツールチップにカーソルを合わせてタグのソースを表示する" style="width:90%;">}}

## サマリーグラフ {#summary-graphs}

サマリーグラフは、ネットワークの凝縮されたビューであり、必要に応じてボリューム、スループット、接続、またはレイテンシーを表示するように変更できます。一度に最大 3 つのサマリーグラフを表示し、組織に合わせてデータタイプと視覚化タイプを変更できます。グラフのデータソースを更新するには、グラフのタイトルをクリックし、ドロップダウンメニューから選択します。

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="データをフィルターするための以下のオプションが表示されている Network Analytics ページのサマリーグラフセクション: Volume Sent、Throughput Sent、Volume Received、Throughput Received、Established Connections、Closed Connections、Established Connections / Second、Closed Connections / Second、TCP Latency" style="width:80%;">}}

視覚化タイプを変更するには、グラフの右上隅にある鉛筆アイコンをクリックします。以下のスクリーンショットのように、利用可能なオプションから選択します。

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Y 軸のスケールを Linear、Log、Pow、Sqrt で調整し、グラフの種類を Area、Line、Bars、Toplist、Change、Piechart で調整するオプションが表示されているサマリーグラフの視覚化オプション" style="width:60%;">}}

特定のグラフを非表示にするには、鉛筆アイコンの隣にある**グラフを非表示**アイコンをクリックします。グラフは 1 〜 3 個まで表示できます。グラフを追加するには、サマリーグラフの右側にあるプラスアイコン `+` をクリックし、追加するグラフを選択します。新しいグラフを追加する際に、グラフをデフォルトのグラフにリセットすることもできます。

## テーブル {#table}

ネットワークテーブルには、クエリで定義された各**ソース**と**宛先**のボリューム、スループット、TCP 再送回数、ラウンドトリップ時間 (RTT)、および RTT 変動メトリクスの詳細が表示されます。

{{< img src="network_performance_monitoring/network_analytics/network_table_3.png" alt="自動グループ化されたトラフィックとスループットの列を示すネットワークデータテーブル。" >}}

テーブルの右上にある**カスタマイズ**歯車アイコン (⚙️) を使用して、テーブル中の列を設定できます。

ページの右上にある `Filter Traffic` ボタンを使って表示されるトラフィックを構成します。

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggle.png" alt="フローの詳細" style="width:50%;">}}

外部トラフィック (パブリック IP へのトラフィック) と Datadog Agent のトラフィックは、デフォルトで表示されます。ビューを絞り込むには、`Show Datadog Traffic` と `Show External Traffic` のトグルをオフにすることができます。

### 未解決のトラフィック {#unresolved-traffic}

未解決のクライアントおよびサーバータグは `N/A` としてマークされます。トラフィックのクライアントまたはサーバーエンドポイントが未解決なのは、ソースまたは送信先情報などの識別可能なメタデータが欠落しているためです。これは、ロードバランサー、クラウドサービス、または監視対象のインフラストラクチャー内の特定の IP アドレスなどの既知のエンティティへのトラフィックを Datadog が解決できない場合に発生する可能性があります。通常、未解決のトラフィックは以下の理由で発生する可能性があります。

* ホスト / コンテナのクライアントまたはサーバーの IP が、トラフィック集計に使用されたクライアントまたはサーバータグでタグ付けされていない。
* エンドポイントがプライベートネットワーク外にあるため、Datadog Agent によりタグ付けされていない。
* エンドポイントがファイアウォール、サービスメッシュ、または Datadog Agent がインストールできないその他のエンティティである。
* 送信先がサービスでタグ付けされていない、または IP がどのサービスにもマッピングされていない。

未解決のトラフィックをモニターすることは、ネットワークの可視性における盲点を特定し、パフォーマンスとセキュリティ分析においてすべての関連トラフィックが考慮されることを確保するために重要です。

データテーブル右上の **該当なしと表示 (未解決のトラフィック)** トグルを使用して、未解決の (`N/A`) クライアントまたはサーバーに紐付く集約接続をフィルタリングすることができます。

### ネットワークパスにピボットする {#pivot-to-network-path}

分析テーブルの三点リーダーメニューをクリックして、[ネットワークパス][11]にピボットし、CNM で指定されたソースと送信先の間のパスを確認します。

{{< img src="network_performance_monitoring/network_analytics/view_network_path_3.png" alt="分析テーブルの三点リーダーメニューをクリックして、ネットワークパスのトグルを表示する" style="width:90%;">}}

## 保存済みビュー {#saved-views}

トラフィックデータのビューを整理して共有します。Saved Views はデバッグを迅速にし、コラボレーションを促進します。例えば、ビューを作成し、将来の一般的なクエリのために保存し、そのリンクをコピーしてチームメイトとネットワークデータを共有できます。

- ビューを保存するには、**+ Save** ボタンをクリックして、現在のクエリ、テーブル、コンフィギュレーション、グラフのメトリクスを記録するビューに名前を付けます。
- ビューを読み込むには、左上の**ビュー**をクリックして、保存ビューを表示しリストからビューを選択します。
- ビューの名前を変更するには、保存ビューのリストでビューの上にカーソルを合わせ、ギアアイコンをクリックして**名前を編集**を選択します。
- ビューを共有するには、保存ビューのリストでビューの上にカーソルを合わせ、リンクアイコンをクリックして**パーマリンクをコピー**を選択します。

詳しくは、[Saved Views][5] のドキュメントを参照してください。

## サイドパネル {#sidepanel}

サイドパネルは、ネットワーク依存関係のデバッグに役立つコンテキストテレメトリを提供します。フロー、ログ、トレース、プロセスタブを使用して、2 つのエンドポイント間のトラフィックの再送信数またはレイテンシーの増加の原因が次であるかどうかを判別します。

- 特定のポートまたは IP からのトラフィック量の急増。
- 宛先エンドポイントの CPU またはメモリを消費する重いプロセス。
- クライアントエンドポイントのコードでのアプリケーションエラー。

{{< img src="network_performance_monitoring/network_analytics/cnm_sidepanel_2.png" alt="クライアントサービトラフィックス間のトラフィックを詳細に示す CNM サイドパネル。" style="width:90%;">}}

### 一般的なタグ {#common-tags}

サイドパネルの上部には、検査された依存関係の最近の接続で共有される一般的なクライアントおよびサーバータグが表示されます。一般的なタグを使用して、故障したエンドポイントに関する追加のコンテキストを取得します。例えば、特定のサービスへの遅延通信をトラブルシューティングする際に、一般的な送信先タグが次の情報を明らかにします。
- トラフィックが流れているコンテナ、タスク、ホストなどの詳細なコンテキスト。
- サービスが実行されるアベイラビリティゾーン、クラウドプロバイダーアカウント、デプロイなどの幅広いコンテキスト。

### トレース {#traces}

**トレース**タブは、選択したネットワークフローに関連する APM トレースを表示します。このタブを使用して、高いレイテンシーや増加した再送信カウントなどのネットワークレベルの問題から、関与するサービスのアプリケーショントレースに移行します。

詳細については、[APM][17] を参照してください。

### セキュリティ {#security}

**セキュリティ**タブでは、[Workload Protection][6] および [Cloud Security Misconfigurations][7] によって検出された潜在的なネットワークの脅威と所見を確認できます。これらのシグナルは、Datadog が[検出ルールまたはコンプライアンスルール][8]に一致するネットワークアクティビティを検出した際や、選択したネットワークフローに関連するその他の脅威や誤構成があった場合に生成されます。

ネットワークトラフィックのクエリおよびフィルタリングに利用可能なデフォルトタグの完全なリファレンスについては、[タグリファレンス][16]を参照してください。

## ネットワークデータ {#network-data}

ネットワークメトリクスはグラフと関連するテーブルを用いて表示されます。送受信されたメトリクスの表示はすべて、ソース側から見た場合のデータとなります。

* **送信したメトリクス**: ソース側から見て、_ソース_から_送信先_へ渡される値を測定します。
* **受信したメトリクス**: ソース側から見て、_送信先_から_ソース_へ渡される値を測定します。

パケットが大量にドロップされた場合は、`sent_metric(source to destination)` (ソースから宛先へ) と `received_metric(destination to source)` (宛先からソースへ) の表示値が異なることがあります。`destination` から `source` に送られた大量のバイトは、`destination` 由来のフローに含まれます。しかし、この場合に `source` 由来のフローがこのバイトを「受信した」とみなすことはありません。

**注:** データは 30 秒ごとに収集され、5 分ごとに集計され、14 日間保持されます。

### メトリクス {#metrics}

#### ネットワークのロード {#network-load}

以下のネットワークロードメトリクスが利用可能です。

| メトリクス          |  説明                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **ボリューム**      | ある期間中に送受信されたバイト数。バイトを単位として (またはその大きさ順で) 双方向に測定されます。                          |
| **スループット**  | ある期間中に送受信されたバイトのレート。バイトを単位として毎秒、双方向に測定されます。                                                 |

#### TCP {#tcp}

TCP は順序通りのパケット配信を実施するためのコネクション型プロトコルです。

以下の TCP メトリクスが利用可能です。

| メトリクス | 説明 |
|---|---|
| **クローズされた接続の数** | 閉じた状態の TCP 接続の数。クライアントからの接続/秒で測定されます。|
| **確立された接続の数** | 確立された状態の TCP 接続の数。クライアントからの接続/秒で測定されます。|
| **ホスト到達不能** | ターゲットホストがオフラインであるか、ルーターまたはファイアウォールによってトラフィックがブロックされていることを示します。**Agent 7.68 以上**で利用可能。|
| **ネットワーク到達不能** | Agent のホストマシン上のローカルネットワークに関する問題を示します。**Agent 7.68 以上**で利用可能。|
| **コネクションキャンセル** | TCP コネクションのキャンセルと、`Go` や `Node.js` などの言語ランタイムにおけるユーザースペースコネクションのタイムアウトを追跡します。**Agent 7.70 以上**で利用可能。|
| **TCPジッター** | TCP のスムージングされたラウンドトリップ時間の変動として測定されます。|
| **TCPレイテンシー** | TCP のラウンドトリップタイム (TCP フレームの送信から確認応答までの時間) を平滑化した値として測定されます。|
| **TCP 拒否**  | サーバーによって拒否された TCP 接続の数。これは通常、接続を受け付けていない IP / ポートへの接続試行、またはファイアウォール / セキュリティの誤構成を示します。|
| **TCP リセット**  | サーバーによってリセットされた TCP 接続の数。 |
| **TCP 再送回数** | TCP 再送回数は、検出された失敗回数 (配信確認のため再送が行われます) を示すものです。クライアントからの再送回数で測定されます。|
| **TCP タイムアウト**  | オペレーティングシステムから見た場合のタイムアウトした TCP 接続の数。これは一般的な接続性やレイテンシーの問題を示す可能性があります。 |

すべてのメトリクスは、利用可能な場合は接続の `client` 側から測定され、それ以外の場合はサーバー側から測定されます。

## クラウドサービスの自動検出 {#cloud-service-autodetection}

S3 や Kinesis などのマネージドクラウドサービスに依存している場合は、内部アプリケーションからこれらのサービスへのトラフィックのパフォーマンスをモニターできます。ビューを特定の AWS、Google Cloud、または Azure の依存関係にスコープして、レイテンシーを特定し、データベースのパフォーマンスを評価し、ネットワークをより完全に視覚化します。

{{< img src="network_performance_monitoring/network_analytics/cloud_service.png" alt="`server_service:aws.s3` によってスコープされたネットワーク接続のサイドパネル" >}}

たとえば、次のことができます。

- 内部 Kubernetes クラスターから[ネットワークマップ][2]の `server_service:aws.s3` へのデータフローを視覚化する。
- [ネットワークページ](#table)にピボットして、そのサービスへの接続を最も多く確立しているポッドを特定する。
- *インテグレーションのメトリクス* タブで S3 パフォーマンスメトリクスを分析して、リクエストが成功したことを検証する。S3 パフォーマンスメトリクスは、特定の依存関係のサイドパネルで、トラフィックパフォーマンスとの相関が直接示されます。

CNM は次を自動的にマップします。

- ネットワーク呼び出しを S3 (`s3_bucket` で分類できる)、RDS (`rds_instance_type` で分類できる)、Kinesis、ELB、Elasticache、その他の [AWS サービス][3]にマッピングします。
- API 呼び出しを AppEngine、Google DNS、Gmail、その他の [Google Cloud サービス][4]にマッピングします。

Agent をインストールできない他のエンドポイント (パブリック API など) をモニターするには、[`domain` タグ](#domain-resolution) で宛先をグループ化します。または、クラウドサービスの解決については以下のセクションを参照してください。

### クラウドサービスエンハンスドレゾリューション {#cloud-service-enhanced-resolution}

AWS または Azure 用に[エンハンスドレゾリューションを構成済み][9]の場合、CNM はこれらのクラウドプロバイダーから収集されたリソースを使用してネットワークトラフィックをフィルタリングおよびグループ化します。利用可能なタグは、クラウドプロバイダーおよびリソースによって異なります。Datadog は、ユーザー定義のタグに加えて、以下に示すタグを自動的に適用します。

#### Amazon Web Services {#amazon-web-services}

{{< tabs >}}
{{% tab "ロードバランサー" %}}
- 名前
- ロードバランサー
- load_balancer_arn
- dns_name (形式: loadbalancer/dns:)
- リージョン
- account_id
- スキーム
- AWS ロードバランサーに適用されるカスタム (ユーザー定義) タグ
{{% /tab %}}

{{% tab "NAT ゲートウェイ" %}}
- gateway_id
- gateway_type
- aws_nat_gateway_id
- aws_nat_gateway_public_ip
- aws_account
- availability-zone
- リージョン
- AWS Nat ゲートウェイに適用されるカスタム (ユーザー) タグ
{{% /tab %}}

{{% tab "VPC インターネットゲートウェイ" %}}
- gateway_id
- gateway_type
- aws_internet_gateway_id
- aws_account
- リージョン
- VPC インターネットゲートウェイに適用されるカスタム (ユーザー) タグ
{{% /tab %}}

{{% tab "VPC エンドポイント" %}}
- gateway_id
- gateway_type
- aws_vpc_endpoint_id
- VPC インターネットエンドポイントに適用されるカスタム (ユーザー) タグ
{{% /tab %}}

{{< /tabs >}}

#### Azure {#azure}

{{< tabs >}}
{{% tab "ロードバランサーとアプリケーションゲートウェイ" %}}
- 名前
- ロードバランサー
- cloud_provider
- リージョン
- タイプ
- resource_group
- tenant_name
- subscription_name
- subscription_id
- sku_name
- Azure ロードバランサーとアプリケーションゲートウェイに適用されるカスタム (ユーザー定義) タグ
{{% /tab %}}
{{< /tabs >}}

## ドメイン解決 {#domain-resolution}

Agent 7.17+ 以降において、Agent は IP を解決して外部および内部トラフィックで判読可能なドメイン名に転換できるようになりました。ドメインは、S3 バケット、アプリケーションロードバランサー、API など、Datadog Agent のインストールができないクラウドプロバイダーのエンドポイントをモニターする場合に役立ちます。C&C サーバーの DGA ドメインなど、認識不能なドメイン名はネットワークのセキュリティ脅威につながる恐れがあります。`domain` **は Datadog 内のタグとしてエンコードされている**ため、検索バーのクエリやファセットパネルでそれを使用してトラフィックの集計とフィルタリングを行うことができます。

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_2.png" alt="ドメイン集計" >}}

**注**: DNS 解決は、システムプローブがルートネットワークのネームスペースで稼働しているホストでサポートされています。通常、ホストネットワークを使用せずにコンテナ内でシステムプローブを稼働させているケースがよく見られます。

## ネットワークアドレス変換 (NAT) {#network-address-translation-nat}

NAT は、Kubernetes とその他のシステムでコンテナ間のトラフィックをルートするために使用されるツールです。(サービス間などの) 特定の依存関係を調査する場合は、pre-NAT IP の存在可否によってそのサービスが Kubernetes ネイティブのサービス (独自のルーティングを使用) か、外部クライアントに依存してルーティングを行っているサービスか否かを判断できます。この機能では現在、NAT ゲートウェイの解決を行うことはできません。

pre-NAT および post-NAT IP を確認するには、テーブル設定の **pre-NAT IP を表示**トグルを使用します。この設定のトグルを外した場合に、**クライアント IP** および **サーバー IP** 列にデフォルトで表示されている IP はすべて post-NAT IP となります。ひとつの post-NAT IP に対して複数の pre-NAT IP が存在する場合は、最も一般的な pre-NAT IP のトップ 5 が表示されます。`pre_nat.ip` タグは、製品の他のタグ同様、トラフィックの集計とフィルタリングに使用できます。

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="pre-NAT IP" >}}

## ネットワーク ID {#network-id}

CNM ユーザーは、IP スペースが重複するようにネットワークを構成できます。たとえば、アドレス範囲が重複する複数の VPC (仮想プライベートクラウド) にデプロイし、ロードバランサーまたはクラウドゲートウェイを介してのみ通信したい場合があります。

トラフィックの宛先を正しく分類するため、CNM はタグとして表されるネットワーク ID の概念を使用します。ネットワーク ID とは、相互通信が可能な一連の IP アドレスを表す英数字の識別子です。異なるネットワーク ID を持つ複数のホストにマッピングされた IP アドレスが検出されると、この識別子を使用して特定のホストのネットワークトラフィックの送信先や送信元を判断します。

AWS や Google Cloud では、ネットワーク ID は自動的に VPC ID に設定されます。他の環境でネットワーク ID を設定するには、次のように `datadog.yaml` で手動で設定するか、プロセスおよびコア Agent コンテナに `DD_NETWORK_ID` を追加します。

```yaml
network:
   Id: <your-network-id>
```


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/search_syntax/
[2]: /ja/network_monitoring/cloud_network_monitoring/network_map/
[3]: /ja/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/
[4]: /ja/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/
[5]: /ja/logs/explorer/saved_views/
[6]: /ja/security/workload_protection/
[7]: /ja/security/cloud_security_management/misconfigurations/
[8]: /ja/security/detection_rules/
[9]: /ja/network_monitoring/cloud_network_monitoring/setup/#enhanced-resolution
[10]: /ja/network_monitoring/dns/#recommended-queries
[11]: /ja/network_monitoring/network_path
[12]: /ja/getting_started/tagging/unified_service_tagging/
[15]: /ja/network_monitoring/cloud_network_monitoring/tags_reference/#neutral-tags
[16]: /ja/network_monitoring/cloud_network_monitoring/tags_reference/
[17]: /ja/tracing/