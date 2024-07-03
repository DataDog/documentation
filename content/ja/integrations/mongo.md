---
app_id: mongodb
app_uuid: 54cca53a-3c87-4b53-beb4-fce95d1fcfb5
assets:
  dashboards:
    mongodb: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: mongodb.connections.available
      metadata_path: metadata.csv
      prefix: mongodb.
    process_signatures:
    - mongod
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19
    source_type_name: MongoDB
  monitors:
    '[MongoDB] High incoming connections': assets/monitors/high_connections.json
  saved_views:
    mongodb_processes: assets/saved_views/mongodb_processes.json
    operations_by_type_overview: assets/saved_views/operations_by_type_overview.json
    queries: assets/saved_views/queries.json
    queries_by_type_overview: assets/saved_views/queries_by_type_overview.json
    slow_queries: assets/saved_views/slow_queries.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mongo/README.md
display_on_public_website: true
draft: false
git_integration_title: mongo
integration_id: mongodb
integration_title: MongoDB
integration_version: 6.6.0
is_public: true
manifest_version: 2.0.0
name: mongo
public_title: MongoDB
short_description: 読み取り/書き込みのパフォーマンス、最も使用されたレプリカ、収集メトリクスなどを追跡。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::ログの収集
  configuration: README.md#Setup
  description: 読み取り/書き込みのパフォーマンス、最も使用されたレプリカ、収集メトリクスなどを追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: MongoDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![MongoDB ダッシュボード][1]

## 概要

MongoDB を Datadog に接続して、以下のことができます。

- MongoDB のキーメトリクスを視覚化できます。
- MongoDB のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

また、カスタム `find`/`count`/`aggregate` クエリを使用して、独自のメトリクスを作成することもできます。

**Note**: MongoDB v3.0+ is required for this integration. Integration of MongoDB Atlas with Datadog is only available on M10+ clusters. This integration also supports Alibaba AsparaDB and AWS DocumentDB Instance-Based clusters. DocumentDB Elastic clusters are not supported because they only expose the cluster (mongos) endpoints.

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
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent のユーザーを作成します。
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
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
{{% tab "レプリカセット" %}}
#### レプリカセット

このインテグレーションを MongoDB レプリカセット用に構成するには

##### MongoDB の準備
Mongo シェルで、プライマリに対して認証し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成します。

```shell
# 管理者ユーザーとして認証します。
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent のユーザーを作成します。
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

##### Agent の構成

MongoDB レプリカセットの各ホストに Datadog Agent をインストールし、そのホスト (`localhost`) 上のレプリカに接続するように Agent を構成します。各ホストで Agent を実行することで、レイテンシーと実行時間が短縮され、ホストに障害が発生した場合でもデータが接続されるようになります。

例えば、プライマリノードで、

```yaml
init_config:
instances:
  - hosts:
      - mongo-primary:27017
```

セカンダリノードで、

```yaml
init_config:
instances:
  - hosts:
      - mongo-secondary:27017
```

ターシャリノードで、

```yaml
init_config:
instances:
  - hosts:
      - mongo-tertiary:27017
```

{{% /tab %}}
{{% tab "シャード" %}}
#### シャード

このインテグレーションを MongoDB シャードクラスター用に構成するには

##### MongoDB の準備
クラスタ内のシャードごとに、レプリカセットのプライマリに接続し、`admin` データベースに Datadog Agent 用のローカル読み取り専用ユーザーを作成します。

```shell
# 管理者ユーザーとして認証します。
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent のユーザーを作成します。
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

次に、mongos プロキシから同じユーザーを作成します。このアクションにより、コンフィギュレーションサーバーにローカルユーザーが作成され、直接接続が可能になります。

##### Agent の構成
1. 各シャードのメンバーごとに 1 つの Agent を構成します。
2. コンフィギュレーションサーバーのメンバーごとに 1 つの Agent を構成します。
3. mongos プロキシを介してクラスターに接続するように 1 つの追加 Agent を構成します。この mongos プロキシは、監視目的専用の新しい mongos プロキシでも、既存の mongos プロキシでもかまいません。

**注**: アービターノードの監視はサポートされていません (詳細については、[MongoDB Replica Set Arbiter][1] を参照してください)。ただし、アービターノードのステータス変更は、プライマリに接続されている Agent によって報告されます。

[1]: https://docs.mongodb.com/manual/core/replica-set-arbiter/#authentication
{{% /tab %}}
{{< /tabs >}}


### 構成

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[Docker](?tab=docker#docker)、[Kubernetes](?tab=kubernetes#kubernetes)、または [ECS](?tab=ecs#ecs) セクションを参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

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

##### ログ収集

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
{{% tab "Docker" %}}

#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["mongo"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"hosts": ["%%host%%:%%port%%"], "username": "datadog", "password" : "<UNIQUEPASSWORD>", "database": "<DATABASE>"}]'
```

##### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mongodb","service":"<SERVICE_NAME>"}]'
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降でサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数およびコンフィギュレーションの全リストについては、[Docker アプリケーションのトレース][4] を参照してください。

次に、[アプリケーションコンテナをインスツルメント][5]し、Agent コンテナの名前に `DD_AGENT_HOST` を設定します。


[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ja/agent/docker/apm/?tab=linux
[5]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。他にも、[ファイル、ConfigMap、または key-value ストア][2]を使用してテンプレートを構成できます。

**Annotations v1** (Datadog Agent < v7.36 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.check_names: '["mongo"]'
    ad.datadoghq.com/mongo.init_configs: '[{}]'
    ad.datadoghq.com/mongo.instances: |
      [
        {
          "hosts": ["%%host%%:%%port%%"],
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "database": "<DATABASE>"
        }
      ]
spec:
  containers:
    - name: mongo
```

**Annotations v2** (Datadog Agent v7.36+ 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.checks: |
      {
        "mongo": {
          "init_config": {},
          "instances": [
            {
              "hosts": ["%%host%%:%%port%%"],
              "username": "datadog",
              "password": "<UNIQUEPASSWORD>",
              "database": "<DATABASE>"
            }
          ]
        }
      }
spec:
  containers:
    - name: mongo
```

##### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

次に、[ログのインテグレーション][4]をポッドアノテーションとして設定します。これは、[ファイル、ConfigMap、または key-value ストア][5]を使用して構成することも可能です。

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.logs: '[{"source":"mongodb","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: mongo
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降を実行するホストでサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][6]および [Kubernetes DaemonSet のセットアップ][7]を参照してください。

次に、[アプリケーションコンテナをインスツルメント][8]し、Agent コンテナ名に `DD_AGENT_HOST` を設定します。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset#configuration
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=java
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[8]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "mongo",
    "image": "mongo:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mongo\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"hosts\": [\"%%host%%:%%port%%\"], \"username\": \"datadog\", \"password\": \"<UNIQUEPASSWORD>\", \"database\": \"<DATABASE>\"}]"
    }
  }]
}
```

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[ECS ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "mongo",
    "image": "mongo:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"mongodb\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降でサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数およびコンフィギュレーションの全リストについては、[Docker アプリケーションのトレース][4] を参照してください。

次に、[アプリケーションのコンテナをインスツルメント][5]し、[EC2 プライベート IP アドレス][6]に `DD_AGENT_HOST` を設定します。


[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ja/agent/docker/apm/?tab=linux
[5]: https://docs.datadoghq.com/ja/tracing/setup/
[6]: https://docs.datadoghq.com/ja/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `mongo` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mongo" >}}


メトリクスの詳細については、[MongoDB 3.0 マニュアル][4]を参照してください。

#### 追加のメトリクス

次のメトリクスは、デフォルトでは収集**されません**。これらを収集するには、`mongo.d/conf.yaml` ファイルで `additional_metrics` パラメーターを使用してください。

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

### サービスチェック
{{< get-service-checks-from-git "mongo" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [MongoDB パフォーマンスメトリクスの監視 (WiredTiger)][6]
- [MongoDB パフォーマンスメトリクスの監視 (MMAP)][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mongo/images/mongo_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.mongodb.org/manual/reference/command/dbStats
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger
[7]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap