---
algolia:
  tags:
  - データベースモニタリング
  - dbm
cascade:
  algolia:
    rank: 70
description: Database Monitoring について学び、始めましょう
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: ブログ
  text: データベースのパフォーマンスを監視、視覚化する
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: ブログ
  text: Datadog DBM で SQL Server や Azure のマネージドデータベースを監視する
- link: /database_monitoring/data_collected/
  tag: ドキュメント
  text: 収集データ
- link: /database_monitoring/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: データベースモニタリングのレベルアップのためのインタラクティブなセッションに参加できます
title: データベース モニタリング
---
Datadog Database Monitoring は、すべてのホストにわたるデータベースの詳細な可視性を提供します。データベースの正常性とパフォーマンスを理解し、問題が発生したときにトラブルシューティングを行うために、過去のクエリパフォーマンスメトリクスを掘り下げ、計画とホストレベルのメトリクスをすべて 1 か所で説明します。

## はじめに

Datadog Database Monitoring は、**Postgres**、**MySQL**、**Oracle**、**SQL Server** のセルフホストおよびマネージドクラウドバージョンをサポートします。Datadog Database Monitoring の使用を開始するには、データベースを構成し、Datadog Agent をインストールします。セットアップ手順については、ご利用のデータベーステクノロジーを選択してください。

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

### ホストの健全性とパフォーマンスを最適化する

[Databases ページ][1]では、データベースホストの健全性とアクティビティにアクセスすることができます。トリガーされたアラートの有無、クエリ量の多さ、その他の条件でリストの並び替えやフィルタリングを行って、ホストの優先順位付けを行います。個々のホストをクリックすると、構成、共通のブロッキングクエリ、呼び出しサービスなどの詳細が表示されます。詳しくは、[データベースホストを調べる][5]を参照してください。

{{< img src="database_monitoring/databases-list.png" alt="Datadog の Databases ページ" style="width:90%;" >}}

## その他の参考資料

{{< learning-center-callout header="ラーニングセンターで Datadog DBM による Postgres データベースの監視をお試しください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  Datadog ラーニングセンターは、このトピックに関する実践的なコースが充実しており、無料で参加することで Postgres データベースの非効率性を特定し、最適化することができます。
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /ja/database_monitoring/query_metrics/
[3]: /ja/database_monitoring/query_samples/
[4]: /ja/database_monitoring/query_metrics/#explain-plans
[5]: /ja/database_monitoring/database_hosts/