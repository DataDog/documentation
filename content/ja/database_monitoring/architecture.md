---
description: Learn about Database Monitoring and get started
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: Blog
  text: Monitor and visualize database performance
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: Data Collected
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Troubleshooting
title: DBM Setup Architectures
---

## 概要

Datadog で Database Monitoring を設定するために必要な手順は、使用しているデータベースの種類 (Postgres、MySQL、SQL Server、Oracle)、ホストプロバイダー (セルフホスト、AWS、Google Cloud SQL、Azure、Oracle) によって異なります。どのホストプロバイダー上のどのデータベースでも Database Monitoring を使用するには、以下が必要です。

* [Datadog Agent][1]
* Datadog Agent のホスト
* データベースの読み取り専用アクセス

## Agent

Datadog Agent は、CPU、メモリ、ネットワークアクティビティなどのシステムメトリクスを監視する軽量なソフトウェアです。また、SQL ユーザーとしてデータベースに接続し、データベースパフォーマンスに関するデータを収集することもできます。

For self-hosted databases, you install the agent directly onto the host that is hosting your database. For cloud-managed databases such as Amazon RDS and Azure SQL, you configure the Agent to connect to your databases remotely.


### セルフホストデータベース

{{< img src="database_monitoring/dbm_architecture_self-hosted.png" alt="セルフホスティングのセットアップは、Agent をホストするデータベースホスト上でデータベースプロセスを通過し、Agent もホストします。そして、インターネットに接続した後、Datadog のバックエンドに接続されます。">}}

セルフホスティングのセットアップでは、Datadog Agent は、オペレーティングシステムのホストからシステムメトリクスを、データベースから直接データベースメトリクスを、そしてデータベースログからログイベントを収集します。

* [Postgresで収集したシステムメトリクス][2]
* [MySQL で収集したシステムメトリクス][3]
* [SQL Server で収集したシステムメトリクス][4]
* [System metrics collected on Oracle][17]

セルフホスト型セットアップの場合、Agent をデータベースホストに直接インストールし、データベースプロセスを実行しているシステムの健全性を完全に視覚化することができます。

Agent にデータベースへの読み取り専用アクセスを許可し、インテグレーションを構成します。Agent は、データベースに対して読み取り専用のクエリを実行できるように、ユーザーとしてログインする必要があります。

セルフホスティングプロバイダーでのデータベースモニタリングの設定方法:

* [Postgres][5]
* [MySQL][6]
* [SQL Server][7]
* [Oracle][16]

### クラウド管理型データベース

If your setup is cloud-managed (with providers such as [Amazon RDS][8] or Aurora, Google Cloud SQL, or Azure), you install the Agent on a separate host and configure it to connect to each managed instance.

データベースモニタリングは、CPU、メモリ、ディスク使用量、ログ、関連するテレメトリーなどのシステムメトリクスを、クラウドプロバイダーとの Datadog インテグレーションを利用して直接収集します。

{{< img src="database_monitoring/dbm_architecture_cloud-hosted.png" alt="データベースインスタンスは Agent ホストとは別で、Datadog バックエンドとは別になっています。クラウド API は、インターネットを通じて Datadog の AWS インテグレーションに接続します。">}}

Agent がデータベースインスタンスに接続できるのであれば、どのクラウド VM (例えば、EC2) にも Agent をインストールすることができます。

If you are not running your own Kubernetes cluster, Datadog recommends using your cloud provider's orchestration tools. For example, you can use [Amazon ECS][9] to host the Datadog Agent, as [the Agent already exists as a Docker container][10].

### Kubernetes

[Kubernetes][11] 上でアプリを運用している場合は、ポッド全体で[クラスターチェック][12]を実行できる [Datadog Cluster Agent とデータベースモニタリング][13]を使用します。

{{< img src="database_monitoring/dbm_architecture_clusters.png" alt="クラウドプロバイダーのデータベースインスタンスは Kubernetes クラスターのノードに接続し、インターネットを通じて Datadog のバックエンドに接続します。クラウド API は、Datadog の AWS インテグレーションに直接接続します。">}}

[Cluster Agent][14] は、データベースインスタンスを Agent のプールに自動的に分散させます。これにより、各ノードベースの Agent ポッドが対応するチェックを実行するのとは対照的に、各チェックのインスタンスが 1 つだけ実行されるようになります。Cluster Agent は構成を保持し、ノードベースの Agent に動的にディスパッチします。各ノード上の Agent は 10 秒ごとに Cluster Agent に接続し、実行するための構成を取得します。

Agent がレポートを停止した場合、Cluster Agent はそれをアクティブプールから削除し、他の Agent に構成を分配します。これにより、クラスターにノードが追加・削除されても、常に 1 つの (そして 1 つだけの) インスタンスが実行されるようになります。これは、多数のデータベースインスタンスがある場合に重要になります。Cluster Agent は、クラスターチェックをさまざまなノードに分散させます。

#### Aurora

[Aurora][15] を使用している場合、Agent は監視対象のホストに直接接続する必要があるため、個々の Aurora インスタンス (クラスターのエンドポイントではありません) に接続する必要があります。

Aurora データベースのモニタリングでは、Agent はプロキシ、ロードバランサー、`pgbouncer` などの接続プーラー、または Aurora クラスターのエンドポイントを通じてデータベースに接続してはいけません。各 Datadog Agent は、基礎となるホスト名に関する知識を持ち、フェイルオーバーの場合でも、その生涯を通じて単一のホストで実行する必要があります。そうでないと、メトリクスの値が不正確になります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/basic_agent_usage/
[2]: /ja/integrations/postgres/?tab=host#data-collected
[3]: /ja/integrations/mysql/?tab=host#data-collected
[4]: /ja/integrations/sqlserver/?tabs=host#data-collected
[5]: /ja/database_monitoring/setup_postgres/selfhosted/
[6]: /ja/database_monitoring/setup_mysql/selfhosted/
[7]: /ja/database_monitoring/setup_sql_server/selfhosted/
[8]: /ja/integrations/amazon_rds/
[9]: /ja/agent/amazon_ecs/
[10]: /ja/agent/docker/
[11]: /ja/agent/kubernetes/integrations/
[12]: /ja/database_monitoring/setup_postgres/rds/?tab=kubernetes
[13]: /ja/agent/cluster_agent/clusterchecks/
[14]: https://www.datadoghq.com/blog/datadog-cluster-agent/
[15]: /ja/database_monitoring/setup_postgres/aurora/
[16]: /ja/database_monitoring/setup_oracle/selfhosted/
[17]: /ja/integrations/oracle/?tab=linux#data-collected