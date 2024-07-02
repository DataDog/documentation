---
title: Database Monitoring
description: Learn about Database Monitoring and get started
further_reading:
- link: "https://www.datadoghq.com/blog/database-performance-monitoring-datadog"
  tag: Blog
  text: Monitor and visualize database performance
- link: "https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/"
  tag: Blog
  text: Monitor SQL Server and Azure managed databases with Datadog DBM
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: Data Collected
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Troubleshooting
- link: "https://dtdg.co/fe"
  tag: Foundation Enablement
  text: Join an interactive session to level up your Database Monitoring
algolia:
  tags: [database monitoring, dbm]
cascade:
    algolia:
        rank: 70
---
Datadog Database Monitoring は、すべてのホストにわたるデータベースの詳細な可視性を提供します。データベースの正常性とパフォーマンスを理解し、問題が発生したときにトラブルシューティングを行うために、過去のクエリパフォーマンスメトリクスを掘り下げ、計画とホストレベルのメトリクスをすべて 1 か所で説明します。

## はじめに

Datadog Database Monitoring supports self-hosted and managed cloud versions of **Postgres**, **MySQL**, **Oracle**, and **SQL Server**. To get started with Datadog Database Monitoring, configure your database and install the Datadog Agent. For setup instructions, select your database technology:

### Postgres

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL Server

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

## Datadog Database Monitoring の調査

Datadog の [Database Monitoring][1] に移動します。

### クエリパフォーマンスメトリクスを掘り下げる

[クエリメトリクスビュー][2]には、正規化されたクエリの過去のクエリパフォーマンスが表示されます。インフラストラクチャーまたはデータセンターのアベイラビリティーゾーンなどのカスタムタグによってパフォーマンスの傾向を視覚化し、異常についてアラートを設定します。

- 遅いクエリと、最も時間を消費しているクエリを特定します。
- 更新/返された行など、APM によってキャプチャされないデータベースレベルのメトリクスを表示します。
- チーム、ユーザー、クラスター、ホストなどの任意のディメンションでクエリをフィルタリングおよびグループ化します。

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Database Monitoring" style="width:100%;">}}

### クエリサンプルを確認する

[Query Samples ビュー][3]は、特定の時間に実行されているクエリを理解するのに役立ちます。各実行を、クエリおよび関連するクエリの平均パフォーマンスと比較します。

- メトリクスによってキャプチャされない、異常に遅いがまれなクエリを識別します。
- クエリの実行時間または実行コストの外れ値を見つけます。
- 特定のクエリ実行をユーザー、アプリケーション、またはクライアントホストに関連付けます。

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Database Monitoring" style="width:100%;">}}

### 実行する前に理解する

[Explain Plans][4] は、データベースがクエリの実行をどのように計画しているかを理解するのに役立ちます。

- 各操作をステップスルーして、ボトルネックを特定します。
- クエリの効率を改善し、大きなテーブルでのコストのかかる順次スキャンを節約します。
- クエリの計画が時間の経過とともにどのように変化するかを確認します。

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Database Monitoring" style="width:100%;">}}

### 強化されたダッシュボードですべてを視覚化

セルフホストインスタンスとクラウド管理インスタンスの両方の強化されたインテグレーションダッシュボードでデータベースとシステムのメトリクスを一緒に表示することにより、問題のある領域をすばやく特定します。ダッシュボードのクローンを作成して、独自のカスタムメトリクスを使用してカスタマイズおよび拡張します。Query Metrics ページと Query Samples ページの上部にある **Dashboards** リンクをクリックして、Database Monitoring ダッシュボードに移動します。

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### Optimize host health and performance

On the [Databases page][1], you can assess the health and activity of your database hosts. Sort and filter the list to prioritize hosts with triggered alerts, high query volume, and other criteria. Click on an individual host to view details such as its configuration, common blocking queries, and calling services. See [Exploring Database Hosts][5] for details.

{{< img src="database_monitoring/databases-list.png" alt="The Databases page in Datadog" style="width:90%;" >}}

## その他の参考資料

{{< learning-center-callout header="ラーニングセンターで Datadog DBM による Postgres データベースの監視をお試しください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  Datadog ラーニングセンターは、このトピックに関する実践的なコースが充実しており、無料で参加することで Postgres データベースの非効率性を特定し、最適化することができます。
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /database_monitoring/query_metrics/
[3]: /database_monitoring/query_samples/
[4]: /database_monitoring/query_metrics/#explain-plans
[5]: /database_monitoring/database_hosts/
