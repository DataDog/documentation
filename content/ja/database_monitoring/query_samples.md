---
description: Get information about queries currently running and find problematic
  outliers
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: Data Collected
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Troubleshooting
title: Exploring Query Samples
---

The [Samples page][1] helps you understand which queries were running at a given time. Compare each execution to the average performance of the query and related queries.

The Samples page shows a snapshot in time of running and recently finished queries. Because it's a snapshot in time, it doesn't necessarily show a representation of _all_ queries, but can indicate proportions.

## 検索とフィルター

The Samples page shows queries on all supported database products together (unlike on the Query Metrics page where you select which database you want to dive into). Filter on the `source` facet to see data for a particular database (Postgres or MySQL).

検索フィールドにタグを入力してクエリサンプルのリストをフィルタリングするか、左側に表示されるファセットを使用します。ファセットには次のようなものがあります。

- **Core**: サービス、データベース製品のソース (Postgres または MySQL)、ホスト、実行時間。
- **Network**: データベースに接続するアプリケーションやプロキシのクライアント IP アドレスとポート。
- **Database**: データベース名、実行計画のコストスライダー、インデックス、クエリで返されるまたは影響を受ける行数を示す行数スライダー、クエリステートメント、およびユーザー。
- **Postgres と MySQL 特有のファセット**

**Options** をクリックして、テーブルに列を追加します。列の見出しをクリックすると、特定のメトリクスで並べ替えを行うことができます。

### 実行計画のコスト

実行計画のコストは、データベースが 2 つのプランを相互に比較するために使用する単位のない尺度のことです。これは、データベース上の「_モノ_」の数 (ブロックやページ) にほぼ対応していますが、主に 2 つのプランを相対的に比較する際に有効で、1 つのプランを絶対的に用いる際には使用しません。実行計画のコスト計算は、データベースがどのプランを使用するかを選択するのに役立ちます。

Query Samples ページでは、複数のクエリの実行計画コストをフィルタリング、並べ替え、比較することができます。この文脈では、実行計画コストは絶対的なものではありません。実行計画コストが 8.5 のクエリは、コストが 8.7 のクエリよりもパフォーマンスが良いとは限りません。しかし、2 つのクエリのコストが似ているはずなのに大きく異なる場合は、その理由を調査すると良いでしょう。また、クエリをコストで並べ替えることで、ネットワークのレイテンシーなどの外部要因とは別にコストの高いクエリを確認することができます。

### インデックス

実行計画を持つクエリをデータベースインデックスでフィルタリングすることで、どのクエリが特定のインデックスを使用しているかを確認することができます。また、1 週間などの長い期間 (時間経過に伴うクエリのサンプルをよく表すデータ) を選択して、最も使用されていないインデックス (インデックスファセットのリストで最も低い番号) を調べることで、使用頻度の低いインデックスを見つけることもできます。そして、そのインデックスを持つことで得られるパフォーマンスが、データベースに保持するためのコストに見合うかどうかを検討します。

### 行数

データのフィルタリングまたは並べ替えを行って、選択した時間枠内で多くの行を返したり、影響を与えたりするクエリを見つけます。

### Duration

フィルタリングや並べ替えを行うことで、選択した時間枠の中で実行に最も時間がかかるクエリを見つけることができます。全体的なパフォーマンスを最適化したい場合は、これらの遅いクエリの所有者を追跡し、その改善について話し合うのが良いでしょう。

### 結果の詳細

テーブル内のクエリをクリックすると、そのサンプルの詳細ページが表示されます。上部の Source、Host、および Client IP タイルを使用して、Sample Queries ページをこのサンプルの値でフィルタリングしたり、ホストのダッシュボードやクライアント IP のネットワークトラフィックメトリクスなど、Datadog 内の他の情報に移動することができます。

{{< img src="database_monitoring/dbm_sd_actions.png" alt="結果詳細のアクションタイル" style="width:100%;">}}

たとえば、ネットワークトラフィックのページを開いてサービスごとにグループ化することで、その IP からどのサービスがクエリを実行しているかを確認することができます。

グラフには、_[トップクエリ][2]の場合_、指定された期間におけるクエリのパフォーマンスメトリクス (実行回数、実行時間、クエリごとの行数) が表示され、参照しているサンプルスナップショットのパフォーマンスを示す線が表示されます。トップクエリでないためにメトリクスが利用できない場合は、グラフは空白になります。

{{< img src="database_monitoring/dbm_sd_graphs.png" alt="このクエリに関するクエリのパフォーマンスメトリクスグラフ" style="width:100%;">}}

実行計画セクションには、現在のサンプルの実行時間とコストの統計、_および_期間中に収集されたすべてのスナップショットの平均値と p90 が表示されます。

The explain plan also shows measures for each node (step) in the plan: startup cost, total cost, plan rows, and plan width. Hover over the column heading to see a description of each measure.

{{< img src="database_monitoring/dbm_sd_explain_plan.png" alt="実行計画のサンプル統計とステップのメトリクス" style="width:100%;">}}

## その他の視覚化ウィジェットを使用する

デフォルトのリスト表示以外にも、**Visualize as** ボタンをクリックすることで、クエリサンプルのデータをタイムスケール、トップリスト、テーブルとして表示することができます。これらを活用することで、データをさらに詳しく把握できます。たとえば、あるデータセンターで実行されている最も遅いクエリを見るには、**Timeseries** を選択し、`Statement` でグループ化して平均時間をグラフ化します。

{{< img src="database_monitoring/dbm_qs_timeseries_viz.png" alt="最も遅いクエリを特定する" style="width:100%;">}}

また、p90 や p99 の実行時間をグラフ化することで、_通常は_速く実行されるが、時々遅くなるクエリなどの外れ値を見つけることができます。

テーブルの視覚化機能を使用して、レポートのようなサマリーを作成し、他の人と共有することができます。たとえば、最もパフォーマンスの低いクエリの表を作成し (実行時間 p75)、各クエリの平均計画コストの値を記載します。

{{< img src="database_monitoring/dbm_qs_p75_duration_table.png" alt="実行時間 p75 のクエリテーブル" style="width:100%;">}}

**Export** ボタンを使ってデータをエンジニアリングチームと共有し、どこに改善の焦点を当てるべきかを話し合うことができます。

## データベースモニタリングダッシュボード

データベース関連のインフラストラクチャーとクエリメトリクスの視覚化を示すダッシュボードにすばやくアクセスするには、ページの上部にある **Dashboards** リンクをクリックします。すぐに使用できるダッシュボードを使用するか、必要に応じてクローンを作成してカスタマイズします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/samples
[2]: /ja/database_monitoring/data_collected/#which-queries-are-tracked