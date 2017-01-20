---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-AWS RDS Integration
integration_title: AWS RDS
kind: integration
doclevel:
---

<!-- In this HOWTO you will learn how to best integrate AWS Relational
Database Service (RDS) with Datadog. -->

このHOWTOでは、Datadogを使ってAWS Relational Database Service(RDS)を監視する方法を紹介します。 　


<!-- ## How this works -->

## AWS RDSのメトリクを包括的に収集する仕組み

<!-- RDS provides database instances and reports instance metrics via Cloudwatch. Cloudwatch metrics are collected at most one per minute and do not provide a comprehensive coverage of RDS performance.

To get real-time metrics from your MySQL or PostgreSQL instances you will need to use a Datadog agent that connects to your RDS instances.  Because the agent metrics will be tied to the instance where the agent
is running and not to the actual RDS instance, you will need to use the `dbinstanceidentifer` tag to connect all metrics together.

Once the agent is configured with the same tags as the RDS instance, getting MySQL/PostgreSQL metrics in the context of RDS metrics is child's play. -->

RDSは、データベースインスタンスとCloudWatch経由でインスタンスに関するメトリクスのレポートを提供します。CloudWatchのメトリクスは、収集頻度の最大は1回/1分で、RDSのパフォーマンスについて包括的なガバレッジを提供できているとは言い難いのが実情です。

起動中のMySQLやPostgreSQLのRDSインスタンスからのリアルタイムのメトリクスを取得するには、これらのRDSインスタンスに接続することが出来るDatadog Agentが必要です。一般的にDatadog Agentは、Agentが動作しているインスタンスのメトリクスに紐付けられており外部の実RDSインスタンスには紐付けられていません。このような場合には、`dbinstanceidentifer`タグを設定し、取得したメトリクスの整合性をとる必要があります。

監視対象となるRDSインスタンスのタグを、Datadog Agent上の`dbinstanceidentifer`タグに設定すれば、MySQL/PostgreSQLのメトリクスをRDSメトリクスとして取得することは簡単な作業になります。


<!-- ## Step-by-step -->

## 設定手順

<!-- ### 1. Gather connection details for your RDS instance -->

### 1. RDSインスタンスに接続するための情報を収集します

<!-- First navigate to the AWS Console and open the RDS section to find the RDS instance you want to monitor.  It should look like:

<img src="/static/images/rds-console.png" style="width:100%; border:1px solid #777777"/>

Write down the endpoint URL(e.g. **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**);
You will need it when you configure the agent.

Also make a note of the `DB Instance identifier` (e.g. **mysqlrds**).  You will need it to create graphs and dashboards. -->

AWSコンソールからRDSのセクションを開き、監視するRDSインスタンスを見つけます。以下のような情報が表示されるはずです。

<img src="/static/images/rds-console.png" style="width:100%; border:1px solid #777777"/>

RDSにアクセスするためのエンドポイントURL(例 **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**)を記録します。
以後、Datadog Angetを設定するときに必要になります。

更に`DB Instance identifier`(例: **mysqlrds**)の項目を記録しておきます。グラフやアラートを設定する際に必要になります。


<!-- ### 2. Configure an agent and connect to your RDS instance -->

### 2. Datadog Agentを設定し、RDSインスタンスに接続します

<!-- The MySQL/PostgreSQL integrations support the tagging of individual database instances.  Originally designed to allow the monitoring of multiple instances on the same machine, you can use these tags to your advantage.

Here is an example of a configuration for MySQL RDS using `mysql.yaml`, usually found in `/etc/dd-agent/conf.d`.

<%= snippet_code_block "rds-conf.yaml" %>

Then restart the agent and verify that the new check is working by running `sudo service datadog-agent info` (on linux). -->

MySQL/PostgreSQLインテグレーションは、個々のデータベースインスタンスのタグ付けをサポートしています。この機能は、もともと同ーマシン上に複数のインスタンスを起動している場合の監視を目的として設計されました。今回は、この機能を使い、先の工程で確認した情報を設定していきます。

以下は、MySQL RDSインスタンスを監視するための`mysql.yaml`の設定例です。`mysql.yaml`は、`/etc/dd-agent/conf.d`のディレクトリ以下に保存されています。

<%= snippet_code_block "rds-conf.yaml" %>

設定ファイルの変更が終わったら、Datadog Agentを再起動します。`sudo service datadog-agent info` (on linux)を実行し、MySQLのCheckが正しく動作しているかを確認します。


<!-- ### 3. Visualize RDS and MySQL/PostgreSQL metrics together -->

### 3. RDSとMySQL/PostgreSQLのメトリクスを可視化します

<!-- After a few minutes, RDS metrics and MySQL/PostgreSQL metrics will be accessible in Datadog in the Metrics Explorer, in Graphs and in Alerts.

Here's an example of a graph displaying I/O for the instance `mysqlrds` using the `dbinstanceidentifier` tag.

<img src="/static/images/rds-example.png" style="width:100% border:1px #777777"/> -->

5分ぐらいするとRDSとMySQL/PostgreSQLのメトリクスは、Datadogで使用出来るようになり、Metrics Explorerでの検索、グラフやアラートでの指定が出来るようになります。

以下は、`dbinstanceidentifier`タグを使用して`mysqlrds`インスタンスのI/Oをグラフ表示する例です。

<img src="/static/images/rds-example.png" style="width:100% border:1px #777777"/>

<!-- ## What's next? -->

## 最後に

<!-- Not working? Have questions for us? Please contact our [support team](mailto:support@datadoghq.com). -->

このドキュメント通りに作業をしてもメトリクスを取得できない場合や質問がある場合は、Datadogの[サポートチーム](mailto:support@datadoghq.com) に連絡してみてください。
