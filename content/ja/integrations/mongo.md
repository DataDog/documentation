---
aliases:
  - /ja/integrations/mongodb
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    mongodb: assets/dashboards/overview.json
  logs:
    source: mongodb
  metrics_metadata: metadata.csv
  monitors:
    '[MongoDB] High incoming connections': assets/monitors/high_connections.json
  saved_views:
    operations_by_type_overview: assets/saved_views/operations_by_type_overview.json
    queries: assets/saved_views/queries.json
    queries_by_type_overview: assets/saved_views/queries_by_type_overview.json
    slow_queries: assets/saved_views/slow_queries.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mongo/README.md'
display_name: MongoDB
draft: false
git_integration_title: mongo
guid: d51c342e-7a02-4611-a47f-1e8eade5735c
integration_id: mongodb
integration_title: MongoDB
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mongodb.
metric_to_check: mongodb.connections.available
name: mongo
process_signatures:
  - mongod
public_title: Datadog-MongoDB インテグレーション
short_description: 読み取り/書き込みのパフォーマンス、最も使用されたレプリカ、収集メトリクスなどを追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![MongoDB ダッシュボード][1]

## 概要

MongoDB を Datadog に接続して、以下のことができます。

- MongoDB のキーメトリクスを視覚化できます。
- MongoDB のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

また、カスタム `find`/`count`/`aggregate` クエリを使用して、独自のメトリクスを作成することもできます。

**注**: このインテグレーションには MongoDB v2.6 以上が必要です。

## セットアップ

### インストール

MongoDB チェックは [Datadog Agent][2] パッケージに含まれています。追加でインストールする必要はありません。

### アーキテクチャ

ほとんどの低レベルのメトリクス (アップタイム、ストレージサイズなど) は、すべての mongod ノードで収集する必要があります。その他の高レベルのメトリクス (収集/インデックス統計など) は、一度だけ収集する必要があります。これらの理由により、Agent を構成する方法は、mongo クラスターのデプロイ方法によって異なります。

{{< tabs >}}
{{% tab "スタンドアロン" %}}
#### スタンドアロン

このインテグレーションを単一ノードの MongoDB デプロイ用に構成するには

##### MongoDB の準備
Mongo シェルで、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成します。

```shell
# 管理者ユーザーとして認証します。
use admin
db.auth("admin", "<MongoDB_管理者パスワード>")

# MongoDB 2.x では、addUser コマンドを使用します。
db.addUser("datadog", "<一意のパスワード>", true)

# MongoDB 3.x 以降では、createUser コマンドを使用します。
db.createUser({
  "user": "datadog",
  "pwd": "<一意のパスワード>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

##### Agent の構成
使用可能なすべての mongo メトリクスを収集するには、できれば同じノードで実行している単一の Agent だけが必要です。コンフィギュレーションオプションについては、以下を参照してください。
{{% /tab %}}
{{% tab "ReplicaSet" %}}
#### ReplicaSet

このインテグレーションを MongoDB レプリカセット用に構成するには

##### MongoDB の準備
Mongo シェルで、プライマリに対して認証し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成します。

```shell
# 管理者ユーザーとして認証します。
use admin
db.auth("admin", "<MongoDB_管理者パスワード>")

# MongoDB 2.x では、addUser コマンドを使用します。
db.addUser("datadog", "<一意のパスワード>", true)

# MongoDB 3.x 以降では、createUser コマンドを使用します。
db.createUser({
  "user": "datadog",
  "pwd": "<一意のパスワード>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

##### Agent の構成
メンバーごとに 1 つの Agent を構成する必要があります。コンフィギュレーションオプションについては、以下を参照してください。
注: [MongoDB ドキュメント][1]に記載されているように、アービターノードのモニタリングはリモートではサポートされていません。ただし、アービターノードのステータス変更は、プライマリに接続されている Agent によって報告されます。

[1]: https://docs.mongodb.com/manual/core/replica-set-arbiter/#authentication
{{% /tab %}}
{{% tab "シャード" %}}
#### シャード

このインテグレーションを MongoDB シャードクラスター用に構成するには

##### MongoDB の準備
クラスタ内のシャードごとに、レプリカセットのプライマリに接続し、`admin` データベースに Datadog Agent 用のローカル読み取り専用ユーザーを作成します。

```shell
# 管理者ユーザーとして認証します。
use admin
db.auth("admin", "<MongoDB_管理者パスワード>")

# MongoDB 2.x では、addUser コマンドを使用します。
db.addUser("datadog", "<一意のパスワード>", true)

# MongoDB 3.x 以降では、createUser コマンドを使用します。
db.createUser({
  "user": "datadog",
  "pwd": "<一意のパスワード>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

次に、mongos プロキシから同じユーザーを作成します。これには、コンフィギュレーションサーバーにローカルユーザーを作成するという副作用もあり、直接接続が可能になります。


##### Agent の構成
1. 各シャードのメンバーごとに 1 つの Agent を構成します。
2. コンフィギュレーションサーバーのメンバーごとに 1 つの Agent を構成します。
3. mongos プロキシを介してクラスターに接続するように 1 つの追加 Agent を構成します。この mongos は、監視目的専用の新しい mongos でも、既存の mongos でもかまいません。

注: [MongoDB ドキュメント][1]に記載されているように、アービターノードのモニタリングはリモートではサポートされていません。ただし、アービターノードのステータス変更は、プライマリに接続されている Agent によって報告されます。
[1]: https://docs.mongodb.com/manual/core/replica-set-arbiter/#authentication
{{% /tab %}}
{{< /tabs >}}


### コンフィギュレーション

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d` フォルダーの `mongo.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル mongo.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
       ## @param hosts - list of strings - required
       ## Hosts to collect metrics from, as is appropriate for your deployment topology.
       ## E.g. for a standalone deployment, specify the hostname and port of the mongod instance.
       ## For replica sets or sharded clusters, see instructions in the sample conf.yaml.
       ## Only specify multiple hosts when connecting through mongos
       #
     - hosts:
         - <HOST>:<PORT>

       ## @param username - string - optional
       ## The username to use for authentication.
       #
       username: datadog

       ## @param password - string - optional
       ## The password to use for authentication.
       #
       password: <UNIQUEPASSWORD>

       ## @param database - string - optional
       ## The database to collect metrics from.
       #
       database: <DATABASE>

       ## @param options - mapping - optional
       ## Connection options. For a complete list, see:
       ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
       #
       options:
         authSource: admin
   ```

2. [Agent を再起動します][3]。

##### トレースの収集

Datadog APM は Mongo を統合して、分散システム全体のトレースを確認します。Datadog Agent v6 以降では、トレースの収集はデフォルトで有効化されています。トレースの収集を開始するには、以下の手順に従います。

1. [Datadog でトレースの収集を有効にします][4]。
2. [Mongo へのリクエストを作成するアプリケーションをインスツルメントします][5]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. MongoDB のログの収集を開始するには、次の構成ブロックを `mongo.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/mongodb/mongodb.log
       service: mongo
       source: mongodb
   ```

    `service` パラメーターと `path` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル mongo.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/tracing/send_traces/
[5]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `mongo`                                                                                                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                                                             |
| `<インスタンスコンフィギュレーション>`  | `{"hosts": ["%%host%%:%%port%%], "username": "datadog", "password : "<UNIQUEPASSWORD>", "database": "<DATABASE>"}` |

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降を実行するホストでサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター                    | 値     |
| ---------------------------- | --------- |
| `<DD_API_KEY>`               | `api_key` |
| `<DD_APM_ENABLED>`           | true      |
| `<DD_APM_NON_LOCAL_TRAFFIC>` | true      |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][2]および [Kubernetes Daemon のセットアップ][3]を参照してください。

次に、[アプリケーションコンテナをインスツルメント][4]し、Agent コンテナの名前に `DD_AGENT_HOST` を設定します。


##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][5]を参照してください。

| パラメーター      | 値                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "mongodb", "service": "mongo"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/ja/tracing/setup/
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `mongo` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mongo" >}}


メトリクスの詳細については、[MongoDB 3.0 マニュアル][4]を参照してください。

**注**: 次のメトリクスは、デフォルトでは収集されません。これらを収集するには、`mongo.d/conf.yaml` ファイルで `additional_metrics` パラメーターを使用してください。

| メトリクスのプレフィックス            | 収集するために `additional_metrics` に追加する項目 |
| ------------------------ | ------------------------------------------------- |
| mongodb.collection       | collection                                        |
| mongodb.commands         | top                                               |
| mongodb.getmore          | top                                               |
| mongodb.insert           | top                                               |
| mongodb.queries          | top                                               |
| mongodb.readLock         | top                                               |
| mongodb.writeLock        | top                                               |
| mongodb.remove           | top                                               |
| mongodb.total            | top                                               |
| mongodb.update           | top                                               |
| mongodb.writeLock        | top                                               |
| mongodb.tcmalloc         | tcmalloc                                          |
| mongodb.metrics.commands | metrics.commands                                  |

### イベント

**レプリケーション状態の変化**:<br>
このチェックは、Mongo ノードでレプリケーション状態が変化するたびにイベントを送信します。

### サービスのチェック

**mongodb.can_connect**:<br>
Agent が MongoDB に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

Datadog を使用して MongoDB からメトリクスを収集する方法については、Datadog の一連のブログ記事を参照してください。

- [MongoDB パフォーマンスメトリクスの監視 (WiredTiger)][6]
- [MongoDB パフォーマンスメトリクスの監視 (MMAP)][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mongo/images/mongo_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.mongodb.org/manual/reference/command/dbStats
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger
[7]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap