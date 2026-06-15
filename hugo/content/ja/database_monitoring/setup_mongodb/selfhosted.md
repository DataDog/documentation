---
further_reading:
- link: /integrations/mongo/
  tag: ドキュメント
  text: 基本的な MongoDB インテグレーション
title: セルフホスト型 MongoDB 向け Database Monitoring のセットアップ
---

Database Monitoring は、重要なメトリクス、低速な操作、操作のサンプル、実行計画、レプリケーション 状態の変更へのアクセスを提供し、MongoDB データベースに対する包括的なインサイトを提供します。MongoDB で Database Monitoring を活用するには、Datadog Agent がインストールされ、MongoDB インスタンスに接続するよう構成されていることを確認してください。本ガイドでは、セルフホスト型 MongoDB 用に Database Monitoring をセットアップする手順を説明します。

## 開始前に

サポートされている MongoDB メジャー バージョン
: 4.4, 5.0, 6.0, 7.0, 8.0

サポート対象の MongoDB エディション
: Community, Enterprise

{{% dbm-mongodb-before-you-begin %}}

## セットアップ

データベースで Database Monitoring を有効にするには:

1. [Agent に MongoDB インスタンスへのアクセス権を付与する](#grant-the-agent-access-to-your-mongodb-instances)
2. [Agent をインストールして構成する](#install-and-configure-the-agent)

### Agent に MongoDB インスタンスへのアクセス権を付与する

Datadog Agent が統計情報やクエリを収集するには、MongoDB インスタンスへの読み取り専用アクセスが必要です。

{{< tabs >}}
{{% tab "Standalone" %}}

Mongo シェルで、MongoDB インスタンスに接続して認証し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成し、必要な権限を付与します:

{{< code-block lang="shell" >}}
# admin ユーザーとして認証します。
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent 用のユーザーを作成します。
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

監視したいデータベースで、`datadog` ユーザーに追加の権限を付与します:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

すべてのデータベースを監視するには、代わりに `admin` データベースで `datadog` ユーザーに `readAnyDatabase` ロールを付与することもできます:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Replica Set" %}}

Mongo シェルで、レプリカ セットのプライマリ ノードに接続して認証し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成し、必要な権限を付与します:

{{< code-block lang="shell" >}}
# admin ユーザーとして認証します。
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent 用のユーザーを作成します。
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

監視したいデータベースで、`datadog` ユーザーに追加の権限を付与します:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

すべてのデータベースを監視するには、代わりに `admin` データベースで `datadog` ユーザーに `readAnyDatabase` ロールを付与することもできます:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Sharded Cluster" %}}

1. クラスター内の各シャードについて、該当シャードのプライマリ ノードに接続し、`admin` データベースに Datadog Agent 用の読み取り専用ユーザーを作成して、必要な権限を付与します:

{{< code-block lang="shell" >}}
# admin ユーザーとして認証します。
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent 用のユーザーを作成します。
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

監視したいデータベースで、`datadog` ユーザーに追加の権限を付与します:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

すべてのデータベースを監視するには、代わりに `admin` データベースで `datadog` ユーザーに `readAnyDatabase` ロールを付与することもできます:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

2. 同じ手順を `mongos` プロキシからも実施し、同じユーザーを作成してください。これにより、コンフィグ サーバーにローカル ユーザーが作成され、直接接続が可能になります。

{{% /tab %}}
{{< /tabs >}}

### パスワードを安全に保管する
{{% dbm-secret %}}

### Agent をインストールして構成する

Datadog は Agent を MongoDB ホストに直接インストールすることを推奨します。これにより、MongoDB 固有のテレメトリに加えて、システム テレメトリ (CPU、メモリ、ディスク、ネットワーク) も収集できます。

#### 構成ファイルを作成する

{{< tabs >}}
{{% tab "Standalone" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
{{% tab "Replica Set" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Sharded Cluster" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Agent をセットアップする

{{< tabs >}}
{{% tab "Linux Host" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}


## 収集データ

### メトリクス

MongoDB インテグレーションで収集されるメトリクスの包括的な一覧については、[MongoDB インテグレーション ドキュメント][2] を参照してください。

{{% dbm-mongodb-agent-data-collected %}}

[1]: /ja/account_management/api-app-keys/
[2]: /ja/integrations/mongo/?tab=standalone#metrics