---
algolia:
  tags:
  - database monitoring
  - dbm
cascade:
  algolia:
    rank: 70
description: Database Monitoring について学び、始めましょう
further_reading:
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: ブログ
  text: 往復クエリレイテンシーの分析
- link: https://www.datadoghq.com/blog/database-monitoring-recommendations/
  tag: ブログ
  text: Database Monitoring 推奨事項でデータベース ホストとクエリ パフォーマンスを改善する
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: ブログ
  text: データベースのパフォーマンスを監視、視覚化する
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: ブログ
  text: Datadog DBM で SQL Server や Azure のマネージドデータベースを監視する
- link: https://www.datadoghq.com/blog/mongodb-database-monitoring/
  tag: ブログ
  text: Datadog Database Monitoring を使用して MongoDB のパフォーマンスを追跡およびトラブルシューティング
- link: https://www.datadoghq.com/blog/datadog-database-research/
  tag: ブログ
  text: マイクロサービスアーキテクチャがデータベース技術の利用に与えた影響
- link: /database_monitoring/data_collected/
  tag: ドキュメント
  text: 収集データ
- link: /database_monitoring/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 対話型セッションに参加して Database Monitoring を強化しましょう
- link: https://learn.datadoghq.com/courses/database-monitoring
  tag: ラーニングセンター
  text: Datadog DBM を使用した Postgres データベースの監視
title: Database Monitoring
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Database">}}
  Database Monitoring を使用して、コストが高く低速なクエリを迅速に特定する方法を学びます。ボトルネックに対処するために、詳細な実行情報を掘り下げます。
{{< /learning-center-callout >}}

Datadog Database Monitoring は、すべてのホストにわたるデータベースの詳細な可視性を提供します。データベースの正常性とパフォーマンスを理解し、問題が発生したときにトラブルシューティングを行うために、過去のクエリパフォーマンスメトリクスを掘り下げ、実行計画とホストレベルのメトリクスをすべて 1 か所で説明します。

## はじめに {#getting-started}

Datadog Database Monitoringは、セルフホスト型およびマネージドクラウド版の **Postgres**、**MySQL**、**Oracle**、**SQL Server**、**MongoDB**、**Amazon DocumentDB**、および **ClickHouse** をサポートしています。Datadog Database Monitoring を始めるには、データベースを構成し、Datadog Agent をインストールします。セットアップ手順については、データベース技術を選択してください。

### Postgres {#postgres}

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL {#mysql}

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle {#oracle}

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL Server {#sql-server}

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

### MongoDB {#mongodb}

{{< partial name="dbm/dbm-setup-mongodb" >}}
<p></p>

### Amazon DocumentDB {#amazon-documentdb}

{{< partial name="dbm/dbm-setup-documentdb" >}}
<p></p>

### ClickHouse {#clickhouse}

{{< partial name="dbm/dbm-setup-clickhouse" >}}
<p></p>

## Datadog Database Monitoring の調査 {#explore-datadog-database-monitoring}

Datadog の [Database Monitoring][1] に移動します。

### クエリパフォーマンスメトリクスを掘り下げる {#dig-into-query-performance-metrics}

[クエリメトリクスビュー][2]には、正規化されたクエリの過去のクエリパフォーマンスが表示されます。インフラストラクチャーまたはデータセンターのアベイラビリティーゾーンなどのカスタムタグによってパフォーマンスの傾向を視覚化し、異常についてアラートを設定します。

- 遅いクエリと、最も時間を消費しているクエリを特定します。
- 更新/返された行など、APM によってキャプチャされないデータベースレベルのメトリクスを表示します。
- チーム、ユーザー、クラスター、ホストなどの任意のディメンションでクエリをフィルタリングおよびグループ化します。

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Database Monitoring" style="width:100%;">}}

### クエリサンプルを確認する {#explore-query-samples}

[クエリサンプルビュー][3]は、特定の時点で実行されているクエリを把握するのに役立ちます。各実行を、クエリおよび関連クエリの平均パフォーマンスと比較します。

- メトリクスによってキャプチャされない、異常に遅いがまれなクエリを識別します。
- クエリの実行時間または実行コストの外れ値を見つけます。
- 特定のクエリ実行をユーザー、アプリケーション、またはクライアントホストに関連付けます。

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Database Monitoring" style="width:100%;">}}

### 実行する前に理解する {#understand-before-you-run}

[実行計画][4]は、データベースがクエリの実行をどのように計画しているかを理解するのに役立ちます。

- 各操作をステップスルーして、ボトルネックを特定します。
- クエリの効率を改善し、大きなテーブルでのコストのかかる順次スキャンを節約します。
- クエリの計画が時間の経過とともにどのように変化するかを確認します。

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Database Monitoring" style="width:100%;">}}

### カスタムメトリクスの収集 {#collect-custom-metrics}

自分のデータベーステーブルからメトリクスを収集するために [`custom_queries`][7] を使用してください — アプリケーションの状態、ビジネスカウンター、キューの深さ、またはクエリパフォーマンスと相関させたい任意のデータ。

### 強化されたダッシュボードですべてを視覚化 {#visualize-everything-on-enriched-dashboards}

強化された統合ダッシュボードでデータベースメトリクスとシステムメトリクスをまとめて確認することで、セルフホスト型およびクラウド管理型インスタンスの問題領域を迅速に特定します。カスタマイズおよび機能拡張のためにダッシュボードをクローンし、自分のカスタムメトリクスを使用します。クエリメトリクスおよびクエリサンプルページの上部にある {{< ui >}}Dashboards{{< /ui >}} リンクをクリックして、Database Monitoring ダッシュボードに移動します。

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### ホストの健全性とパフォーマンスを最適化する {#optimize-host-health-and-performance}

[データベースページ][1]では、データベースホストの健全性とアクティビティを確認できます。リストを並べ替えたりフィルタリングしたりして、アラートが発生しているホストやクエリボリュームが高いホストなどを優先します。個々のホストをクリックして、その構成、一般的なブロッキングクエリ、および呼び出し元サービスなどの詳細を表示します。詳細については、[データベースホストの探索][5]を参照してください。

{{< img src="database_monitoring/databases-list.png" alt="Datadog のデータベースページ" style="width:90%;" >}}

### 最適化に関する推奨事項を表示 {#view-optimization-recommendations}

[推奨事項ページ][6]は、問題と最適化の機会を強調表示し、最も重要な項目を優先することで時間の節約に役立ちます。推奨事項を選択して、問題の概要や対処のための次のステップなどの詳細を表示します。

{{< img src="database_monitoring/recommendations-page.png" alt="Datadog の推奨事項ページ" style="width:90%;" >}}


## 参考資料 {#further-reading}

{{< learning-center-callout header="学習センターで Datadog Database Monitoring を使用して Postgres データベースを監視してみてください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  Datadog 学習センターには、このトピックについて学ぶための実践的なハンズオンコースが多数用意されています。無料で登録して、非効率を特定し、Postgres データベースを最適化してください。
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /ja/database_monitoring/query_metrics/
[3]: /ja/database_monitoring/query_samples/
[4]: /ja/database_monitoring/query_metrics/#explain-plans
[5]: /ja/database_monitoring/database_hosts/
[6]: /ja/database_monitoring/recommendations/
[7]: /ja/database_monitoring/custom_metrics/