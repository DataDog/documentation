---
description: Explore and dig into your database and query performance metrics
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /integrations/postgres/
  tag: Documentation
  text: Postgres integration
- link: /integrations/mysql/
  tag: Documentation
  text: MySQL integration
- link: /integrations/sqlserver/
  tag: Documentation
  text: SQL Server integration
- link: /integrations/oracle/
  tag: Documentation
  text: Oracle integration
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: 収集データ
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Troubleshooting
title: Exploring Query Metrics
---

クエリメトリクスビューには、正規化されたクエリの過去のクエリパフォーマンスが表示されます。インフラストラクチャーまたはデータセンターのアベイラビリティーゾーンなどのカスタムタグによってパフォーマンスの傾向を視覚化し、異常についてアラートを受け取ります。

Navigate to [the Query Metrics page][1] in Datadog.

ビューには、_上位_ 200 のクエリ、つまり、選択した時間枠で実行されている合計時間が最も長い 200 のクエリが表示されます。詳細については、[追跡されるクエリ][2]を参照してください。1 回限りの、またはほとんど実行されない高速クエリのメトリクス集計は、クエリメトリクスビューには表示されませんが、過去 15 日間に実行された場合は、[クエリサンプル][3]に表示されるスナップショットを見つけることができます。

## フィルタリングとグループ化

Select your database source (for example, Postgres) from the **source** selector at the top. Specify search tags to filter the list of queries (or list of [stored procedures][7], where available), and group by tags to organize the list.

たとえば、ホストまたはクラスターごとにグループ化して、クエリが実行されているインフラストラクチャーをすばやく確認すると便利なことがよくあります。

{{< img src="database_monitoring/dbm-qm-group-by-2.png" alt="Group by env tag" style="width:100%;">}}

最大 3 つ (たとえば、ホスト、環境、データセンター) でグループ化して、フィルター処理された結果のグループ化されたセットを取得できます。

{{< img src="database_monitoring/dbm-qm-group-by-three-2.png" alt="Grouping by three tags" style="width:100%;">}}

グループを展開してクエリのリストを表示し、**View all queries in this group** (このグループ内のすべてのクエリを表示) をクリックして、そのグループ化条件をフィルターバーの Search フィールドに移動し、ページコンテンツをその検索結果にフィルターします。

## ファセットによるフィルタリング

ビューの左側には、クエリのリストをフィルタリングするためのファセットのリストがあります。ファセットは次のとおりです。

- **Core**: サービス、ホスト、環境。
- **Database**: Postgres には `database` ファセットと `user` ファセットがあります。MySQL には `schema` ファセットがあります。
- **Infrastructure**: Agent によって収集された従来の Datadog インフラストラクチャータグ。

ファセットを選択またはクリアして、関心のあるクエリのリストを見つけます。

### クエリメトリクスビューを単一のクエリにフィルタリングする

クエリメトリクスビューのコンテンツを 1 つの[正規化クエリ][4]のみにフィルタリングする場合は、`query` ではなく `query_signature` でフィルタリングします。タグ名は 200 文字で切り捨てられます。クエリは長くなる可能性があるため、`query` タグは必ずしも一意ではありません。`query_signature` は正規化されたクエリのハッシュであり、正規化されたクエリの一意の ID として機能します。

(クエリシグネチャ値を検索せずに) 特定のクエリにフィルタリングする方法の1つが、リストからクエリをクリックすることです。これにより、[Query Details ページ](#query-details-page)が開くので、**Filter to This Query** をクリックします。これにより、クエリメトリクスページが `query_signature` ファセットでフィルタリングされます。

## メトリクスの確認

クエリメトリクスリストには、リクエスト、平均レイテンシー、合計時間、パーセント時間のメトリクスに加えて、データベース製品に依存するその他のメトリクスが表示されます。**Options** メニューをクリックして、リストに表示するメトリクスを制御します。列見出しにカーソルを合わせると、各タイプのメトリクスの説明が表示されます。列見出しをクリックして、そのメトリクスでリストを並べ替えます。

収集されたメトリクスの完全なリストを表示するには、データベース製品のインテグレーションデータ収集ドキュメントを参照してください。

{{< partial name="dbm/dbm-data-collected" >}}
<p></p>

データベースモニタリングビューに使用されるメトリクスは、主に次のとおりです。
- **MySQL**: `mysql.queries.*`
- **Postgres**: `postgresql.queries.*`
- **SQL Server**: `sqlserver.queries.*`
- **Oracle**: `oracle.queries.*`

## クエリの詳細ページ

When you click a query in the Query Metrics list, the Query Details page for that query opens. The top of the page shows the full text of the [normalized query][4], and a list of all tags associated with the query. The list of tags is the union of all tags from each host that the query runs on. Browse the list to see information such as what server the query is running on:

{{< img src="database_monitoring/dbm_qd_tags.png" alt="クエリのタグリスト" style="width:100%;">}}

このクエリのコンテキストにとどまり、**View Query Samples** ボタンを使用して [Query Samples ページ][3]に移動するか、**Filter by This Query** ボタンを使用してこのクエリでフィルタリングされたクエリメトリクスに戻ります。

{{< img src="database_monitoring/dbm_qd_jump_buttons.png" alt="このクエリのクエリサンプルまたはメトリクスをすばやく確認する" style="width:100%;">}}

クエリの詳細を確認していて、クエリが実行されているホストを見つけたい場合は、**Filter by This Query** をクリックしてから、ホストでグループ化します。メトリクスリストには、クエリが実行されている各ホストが表示されます。**Percent time** で並べ替えて、特定のホストがクエリの実行の大部分を担っているかどうかを確認します。

{{< img src="database_monitoring/dbm_qm_by_host_usecase.png" alt="ホストごとにグループ化されたクエリのメトリクス" style="width:100%;">}}

**Rows/Query** で並べ替えて、特定のホストがより多くの行を返す傾向があるかどうかを確認します。これは、シャーディングがホスト間で不均衡であることを示しています。

### メトリクスグラフ

グラフには、このクエリを除くすべてのクエリと比較した、このクエリのメトリクスが表示されます。このクエリの平均レイテンシーは他のクエリの平均よりもはるかに高いかもしれませんが、実行頻度が低いため、全体的な影響はわずかです。他のすべてのクエリと比較して、データベースの実行時にデータベースがどれだけの時間を費やしているかを確認できます。

**Metrics** タブをクリックして、このクエリのメトリクスのグラフをさらに表示します。

### 説明プラン

Datadog collects explain plans continuously, so a given query can have multiple plans. Those plans are normalized and shown separately so that you can see if a query has plans that perform better or have higher relative cost than others. For example, the following explain plan contains information for a query:

{{< img src="database_monitoring/dbm-qd-explain-plans-2.png" alt="Explain plans information for a query" style="width:100%;">}}

プランを選択して、コストメトリクスまたはその JSON を表示します。**View All Samples for This Plan** をクリックして、[それに関連付けられているサンプル][5]の Query Samples ビューに移動します。

クエリの種類やさまざまなコンフィギュレーション設定など、さまざまな理由から、すべてのクエリに説明プランがあるわけではありません。詳細については、[トラブルシューティング][6]を参照してください。

### このクエリを実行しているホスト

**Hosts Running This Query** タブには、このクエリを実行しているホストが一覧表示され、ログやネットワークデータなど、ホストの関連情報に移動できるコンテキストメニューが表示されます。これは、レイテンシーの問題が発生している場所のトラブルシューティングに役立ちます。

{{< img src="database_monitoring/dbm_qd_hosts_running_query_menu.png" alt="詳細情報にピボットするためのホストアクションメニュー" style="width:100%;">}}

## データベースモニタリングダッシュボード

データベース関連のインフラストラクチャーとクエリメトリクスの視覚化を示すダッシュボードにすばやくアクセスするには、ページの上部にある **Dashboards** リンクをクリックします。すぐに使用できるダッシュボードを使用するか、必要に応じてクローンを作成してカスタマイズします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/queries
[2]: /ja/database_monitoring/data_collected/#which-queries-are-tracked
[3]: /ja/database_monitoring/query_samples/
[4]: /ja/database_monitoring/data_collected/#normalized-queries
[5]: /ja/database_monitoring/query_samples/#sample-details
[6]: /ja/database_monitoring/troubleshooting/#queries-are-missing-explain-plans
[7]: /ja/database_monitoring/database_hosts/#stored-procedures