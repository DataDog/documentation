---
further_reading:
- link: /integrations/mongo/
  tag: ドキュメント
  text: Basic MongoDB Integration
title: セルフホストの MongoDB の Database Monitoring の設定
---
Database Monitoring は、重要なメトリクス、低速な操作、操作サンプル、実行計画、レプリケーション状態の変更へのアクセスを提供することで、MongoDB データベースに関する包括的なインサイトを提供します。MongoDB の Database Monitoring を活用するには、Datadog Agent がインストールされ、MongoDB インスタンスに接続するように構成されていることを確認してください。このガイドでは、セルフホストの MongoDB の Database Monitoring を設定するステップを説明します。

## はじめに {#before-you-begin}

サポートされている MongoDB のメジャーバージョン
: 4.4、5.0、6.0、7.0、8.0

サポートされている MongoDB のエディション
: Community、Enterprise

{{% dbm-mongodb-before-you-begin %}}

## セットアップ {#setup}

データベースで Database Monitoring を有効にするには、以下を行います。

1. [Agent に MongoDB インスタンスへのアクセスを付与します](#grant-the-agent-access-to-your-mongodb-instances)
2. [Agent をインストールし構成します](#install-and-configure-the-agent)

### Agent に MongoDB インスタンスへのアクセスを付与 {#grant-the-agent-access-to-your-mongodb-instances}

Datadog Agent が統計情報とクエリを収集するには、MongoDB インスタンスへの読み取り専用アクセスが必要です。

{{< tabs >}}
{{% tab "スタンドアロン" %}}

Mongo シェルで MongoDB インスタンスに認証し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成して、必要な権限を付与します。

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "read", db: "local" },
    { role: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

監視するデータベース内の `datadog` ユーザーに追加の権限を付与します。

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

または、`admin` データベースの `datadog` ユーザーに `readAnyDatabase` ロールを付与して、すべてのデータベースを監視することもできます。

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "レプリカセット" %}}

Mongo シェルでレプリカセットのプライマリノードに認証し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成して、必要な権限を付与します。

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "read", db: "local" },
    { role: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

監視するデータベース内の `datadog` ユーザーに追加の権限を付与します。

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

または、`admin` データベースの `datadog` ユーザーに `readAnyDatabase` ロールを付与して、すべてのデータベースを監視することもできます。

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "シャーディングされたクラスター" %}}

1. クラスター内の各シャードについて、シャードのプライマリノードに接続し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成して、必要な権限を付与します。

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "read", db: "local" },
    { role: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

監視するデータベース内の `datadog` ユーザーに追加の権限を付与します。

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

または、`admin` データベースの `datadog` ユーザーに `readAnyDatabase` ロールを付与して、すべてのデータベースを監視することもできます。

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

2. 同じステップに従い、`mongos` プロキシから同じユーザーを作成します。このアクションにより、構成サーバーにローカルユーザーが作成され、直接接続が可能になります。

{{% /tab %}}
{{< /tabs >}}

### パスワードを安全に保管する {#securely-store-your-password}
{{% dbm-secret %}}

### Agent をインストールして構成 {#install-and-configure-the-agent}

Datadog では、Agent を MongoDB ホストに直接インストールすることをお勧めします。そうすることで、MongoDB 固有のテレメトリに加え、さまざまなシステムテレメトリ (CPU、メモリ、ディスク、ネットワーク) を収集することができるからです。

#### 構成ファイルの作成 {#create-the-configuration-file}

{{< tabs >}}
{{% tab "スタンドアロン" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
{{% tab "レプリカセット" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "シャーディングされたクラスター" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Agent のセットアップ {#set-up-the-agent}

{{< tabs >}}
{{% tab "Linux ホスト" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## クエリメトリクス {#query-metrics}

セルフホスト型の MongoDB のクエリメトリクスには MongoDB 8.0 以降が必要であり、`$queryStats` 集計パイプラインに依存しています。クエリ統計の収集は、MongoDB サーバー上でデフォルトで無効になっています。各 `mongod` または `mongos` プロセスで有効にします。必要なサーバーパラメーターは、MongoDB のバージョンによって異なります。

### MongoDB 8.0.20 以降 {#mongodb-8020-or-later}

`internalQueryStatsSampleRate` を `1.0` に設定します (100% サンプリング)。

MongoDB 構成ファイルにパラメーターを追加します。

{{< code-block lang="yaml" >}}
setParameter:
  internalQueryStatsSampleRate: 1.0
{{< /code-block >}}

または、コマンドラインで渡します。

{{< code-block lang="shell" >}}
mongod --setParameter internalQueryStatsSampleRate=1.0
{{< /code-block >}}

次回の再起動まで実行時に有効にするには、以下を実行します。

{{< code-block lang="javascript" >}}
db.adminCommand({setParameter: 1, internalQueryStatsSampleRate: 1.0})
{{< /code-block >}}

### MongoDB 8.0.0 から 8.0.19 {#mongodb-800-through-8019}

`internalQueryStatsRateLimit` を `-1` に設定します (レート制限なし)。

MongoDB 構成ファイルにパラメーターを追加します。

{{< code-block lang="yaml" >}}
setParameter:
  internalQueryStatsRateLimit: -1
{{< /code-block >}}

または、コマンドラインで渡します。

{{< code-block lang="shell" >}}
mongod --setParameter internalQueryStatsRateLimit=-1
{{< /code-block >}}

次回の再起動まで実行時に有効にするには、以下を実行します。

{{< code-block lang="javascript" >}}
db.adminCommand({setParameter: 1, internalQueryStatsRateLimit: -1})
{{< /code-block >}}

クエリ統計収集を制御するサーバーパラメーターの詳細については、[MongoDB Query Stats ドキュメント][4]を参照してください。

## 収集されたデータ {#data-collected}

### 標準的なメトリクス {#standard-metrics}

MongoDB インテグレーションが収集するメトリクスの包括的なリストについては、[MongoDB インテグレーション ドキュメント][2]を参照してください。

### クエリメトリクス {#query-metrics-1}

<div class="alert alert-info">
  これには、Datadog Agent v7.78 以降またはセルフホストの場合は MongoDB 8.0 以降が必要です。
</div>

クエリメトリクスは、MongoDB 操作のパフォーマンスに関するインサイトを提供します。詳細については、[クエリメトリクス][3]を参照してください。

クエリメトリクスを収集するには、[[Grant the Agent access](#grant-the-agent-access-to-your-mongodb-instances)] セクションで説明されている必要な権限が付与されていることを確認してください。

`conf.d/mongo.d/conf.yaml` 設定ファイルでクエリメトリクスを有効にしてください。以下に例を示します。

{{< highlight yaml "hl_lines=11-12" >}}
init_config:
instances:
  - hosts:
      - <HOST>:<PORT>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    options:
      authSource: admin
    tls: true
    dbm: true
    query_metrics:
      enabled: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections_indexes_stats: true
    database_autodiscovery:
      enabled: true
{{< /highlight >}}

{{% dbm-mongodb-agent-data-collected %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/api-app-keys/
[2]: /ja/integrations/mongo/?tab=standalone#metrics
[3]: /ja/database_monitoring/query_metrics/
[4]: https://github.com/mongodb/mongo/blob/master/src/mongo/db/query/query_stats/README.md#server-parameters