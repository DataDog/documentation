---
description: Database Monitoring について学び、始めましょう
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: ブログ
  text: データベースのパフォーマンスを監視、視覚化する
- link: /database_monitoring/data_collected/
  tag: ドキュメント
  text: 収集データ
- link: /database_monitoring/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング
kind: documentation
title: DBM セットアップアーキテクチャ
---


## 概要

Datadog でデータベースモニタリングを設定するために必要な手順は、使用しているデータベースの種類 (Postgres、MySQL、SQL Server) およびホストプロバイダー (セルフホスト、AWS、Google Cloud SQL、またはAzure) によっても変化します。どのデータベースやホストプロバイダーを使用していても、データベースのデータベースモニタリングを使用できるようにするには、次のものが必要です。

* [Datadog Agent][1]
* Datadog Agent のホスト
* データベースの読み取り専用アクセス

## エージェント

Datadog Agent は、CPU、メモリ、ネットワークアクティビティなどのシステムメトリクスを監視する軽量なソフトウェアです。また、SQL ユーザーとしてデータベースに接続し、データベースパフォーマンスに関するデータを収集することもできます。

セルフホスティングデータベースの場合、データベースをホストしているホストに直接 Agent をインストールします。AWS RDS や Azure SQL などのクラウド管理型データベースの場合は、データベースにリモートで接続するように Agent を構成します。


### セルフホストデータベース

{{< img src="database_monitoring/dbm_architecture_self-hosted.png" alt="セルフホスティングのセットアップは、Agent をホストするデータベースホスト上でデータベースプロセスを通過し、Agent もホストします。そして、インターネットに接続した後、Datadog のバックエンドに接続されます。">}}

セルフホスティングのセットアップでは、Datadog Agent は、オペレーティングシステムのホストからシステムメトリクスを、データベースから直接データベースメトリクスを、そしてデータベースログからログイベントを収集します。

* [Postgresで収集したシステムメトリクス][2]
* [MySQL で収集したシステムメトリクス][3]
* [SQL Server で収集したシステムメトリクス][15]


セルフホスト型セットアップの場合、Agent をデータベースホストに直接インストールし、データベースプロセスを実行しているシステムの健全性を完全に視覚化することができます。

Agent にデータベースへの読み取り専用アクセスを許可し、インテグレーションを構成します。Agent は、データベースに対して読み取り専用のクエリを実行できるように、ユーザーとしてログインする必要があります。

セルフホスティングプロバイダーでのデータベースモニタリングの設定方法:

* [Postgres][4]
* [MySQL][5]
* [SQL Server][14]


### クラウド管理型データベース

クラウド管理型 ([AWS RDS][6] や Aurora、Google Cloud SQL、Azure などのプロバイダー) の場合、別のホストに Agent をインストールし、管理対象インスタンスに接続するように構成します。

データベースモニタリングは、CPU、メモリ、ディスク使用量、ログ、関連するテレメトリーなどのシステムメトリクスを、クラウドプロバイダーとの Datadog インテグレーションを利用して直接収集します。

{{< img src="database_monitoring/dbm_architecture_cloud-hosted.png" alt="データベースインスタンスは Agent ホストとは別で、Datadog バックエンドとは別になっています。クラウド API は、インターネットを通じて Datadog の AWS インテグレーションに接続します。">}}

Agent がデータベースインスタンスに接続できるのであれば、どのクラウド VM (例えば、EC2) にも Agent をインストールすることができます。

独自の Kubernetes クラスターを実行していない場合、Datadog はクラウドプロバイーダのオーケストレーションツールを使用することを推奨しています。例えば、[AWS ECS][7] を使用して Datadog Agent をホストすることができます。[Agent はすでに Docker コンテナとして存在する][8]からです。

### Kubernetes

[Kubernetes][9] 上でアプリを運用している場合は、ポッド全体で[クラスターチェック][11]を実行できる [Datadog Cluster Agent とデータベースモニタリング][10]を使用します。

{{< img src="database_monitoring/dbm_architecture_clusters.png" alt="クラウドプロバイダーのデータベースインスタンスは Kubernetes クラスターのノードに接続し、インターネットを通じて Datadog のバックエンドに接続します。クラウド API は、Datadog の AWS インテグレーションに直接接続します。">}}

[Cluster Agent][12] は、データベースインスタンスを Agent のプールに自動的に分散させます。これにより、各ノードベースの Agent ポッドが対応するチェックを実行するのとは対照的に、各チェックのインスタンスが 1 つだけ実行されるようになります。Cluster Agent は構成を保持し、ノードベースの Agent に動的にディスパッチします。各ノード上の Agent は 10 秒ごとに Cluster Agent に接続し、実行するための構成を取得します。

Agent がレポートを停止した場合、Cluster Agent はそれをアクティブプールから削除し、他の Agent に構成を分配します。これにより、クラスターにノードが追加・削除されても、常に 1 つの (そして 1 つだけの) インスタンスが実行されるようになります。これは、多数のデータベースインスタンスがある場合に重要になります。Cluster Agent は、クラスターチェックをさまざまなノードに分散させます。



#### Aurora

[Aurora][13] を使用している場合、Agent は監視対象のホストに直接接続する必要があるため、個々の Aurora インスタンス (クラスターのエンドポイントではありません) に接続する必要があります。

Aurora データベースのモニタリングでは、Agent はプロキシ、ロードバランサー、`pgbouncer` などの接続プーラー、または Aurora クラスターのエンドポイントを通じてデータベースに接続してはいけません。各 Datadog Agent は、基礎となるホスト名に関する知識を持ち、フェイルオーバーの場合でも、その生涯を通じて単一のホストで実行する必要があります。そうでないと、メトリクスの値が不正確になります。



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/basic_agent_usage/
[2]: /ja/integrations/postgres/?tab=host#data-collected
[3]: /ja/integrations/mysql/?tab=host#data-collected
[4]: /ja/database_monitoring/setup_postgres/selfhosted/
[5]: /ja/database_monitoring/setup_mysql/selfhosted/
[6]: /ja/integrations/amazon_rds/
[7]: /ja/agent/amazon_ecs/
[8]: /ja/agent/docker/
[9]: /ja/agent/kubernetes/integrations/
[10]: /ja/database_monitoring/setup_postgres/rds/?tab=kubernetes
[11]: /ja/agent/cluster_agent/clusterchecks/
[12]: https://www.datadoghq.com/blog/datadog-cluster-agent/
[13]: /ja/database_monitoring/setup_postgres/aurora/
[14]: /ja/database_monitoring/setup_sql_server/selfhosted/
[15]: /ja/integrations/sqlserver/?tabs=host#data-collected