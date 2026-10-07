---
title: Amazon DocumentDB 用 Database Monitoring のセットアップ
---

Database Monitoring は、重要なメトリクス、オペレーション サンプル、実行計画、レプリケーション 状態の変更へのアクセスを提供することで、MongoDB 互換の Amazon DocumentDB データベースに対する包括的なインサイトを提供します。Amazon DocumentDB で Database Monitoring を利用するには、Datadog Agent がインストールされ、Amazon DocumentDB インスタンスに接続するように構成されていることを確認してください。このガイドでは、Amazon DocumentDB 用 Database Monitoring をセットアップする手順を説明します。

## 開始する前に

サポートされている Amazon DocumentDB メジャー バージョン
: 4.0.0, 5.0.0

サポートされている Amazon DocumentDB クラスター タイプ
: インスタンス ベース クラスター。<br /><br />
**注**: Amazon DocumentDB Elastic クラスターには対応していません。

{{% dbm-documentdb-before-you-begin %}}

## セットアップ

データベースで Database Monitoring を有効にするには、次の手順を実行します:

1. [Datadog Agent に Amazon DocumentDB インスタンスへのアクセスを許可する](#grant-the-agent-access-to-your-amazon-documentdb-instances)
2. [Agent をインストールして構成する](#install-and-configure-the-agent)
3. [(任意) Amazon DocumentDB インテグレーションをインストールする](#install-the-amazon-documentdb-integration)

### Datadog Agent に Amazon DocumentDB インスタンスへのアクセスを許可する

Datadog Agent が統計情報とクエリを収集するためには、Amazon DocumentDB インスタンスへの読み取り専用アクセスが必要です。

Mongo シェルでレプリカ セットのプライマリ ノードに認証し、`admin` データベースで Datadog Agent 用の読み取り専用ユーザーを作成して、必要な権限を付与します:

{{< code-block lang="shell" >}}

# admin ユーザーとして認証します。

use admin
db.auth("admin", "<YOUR_AMAZON_DOCUMENTDB_ADMIN_PASSWORD>")

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

監視対象データベースで `datadog` ユーザーに追加の権限を付与します:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "read", db: "mydatabase" },
{ role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

代わりに、すべてのデータベースを監視するために、`admin` データベースで `datadog` ユーザーに `readAnyDatabase` ロールを付与することもできます:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

### パスワードを安全に保管

{{% dbm-secret %}}

### Agent をインストールして構成する

Amazon DocumentDB クラスターを監視するには、[リモート アクセス][1] が可能なホストに Datadog Agent をインストールして構成する必要があります。このホストは Linux ホスト、Docker コンテナ、または Kubernetes ポッドのいずれでもかまいません。

#### 構成ファイルを作成する

{{% dbm-amazon-documentdb-agent-config-replica-set %}}

インスタンスに Amazon DocumentDB インテグレーション テレメトリを追加するために [Amazon DocumentDB インテグレーション][3] をインストールした場合は、このセクションを構成に追加してください:

```yaml
## @param aws - mapping - optional
## このブロックは Amazon DocumentDB インスタンスの構成を定義します。
## これらの値は `dbm: true` オプションが設定されている場合のみ適用されます。
#
aws:
    ## @param instance_endpoint - string - optional
    ## Agent が接続するインスタンスの Endpoint.Address と同じ値です。
    ## `host` にインスタンス エンドポイントがすでに設定されている場合は省略可能です。
    ##
    ## インスタンス エンドポイントの詳細については、
    ## AWS ドキュメント https://docs.aws.amazon.com/documentdb/latest/developerguide/API_Endpoint.html を参照してください
    #
    instance_endpoint: <AMAZON_DOCUMENTDB_ENDPOINT>
    ## @param cluster_identifier - string - optional
    ## Agent が接続するインスタンスのクラスター識別子と同じ値です。
    ## `cluster_name` にクラスター識別子がすでに設定されている場合は省略可能です。
    ##
    ## クラスター識別子の詳細については、
    ## AWS ドキュメント https://docs.aws.amazon.com/documentdb/latest/developerguide/API_DBCluster.html を参照してください
    #
    cluster_identifier: <AMAZON_DOCUMENTDB_CLUSTER_IDENTIFIER>
```

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

### Amazon DocumentDB インテグレーションをインストールする

Amazon DocumentDB からより包括的なデータベース メトリクスを収集するには、[Amazon DocumentDB インテグレーション][3] をインストールしてください (任意)。

## 収集されるデータ

### メトリクス

インテグレーションで収集されるメトリクスの詳細な一覧については、[インテグレーション ドキュメント][2] を参照してください。

{{% dbm-amazon-documentdb-agent-data-collected %}}

[1]: /ja/account_management/api-app-keys/
[2]: /ja/integrations/mongo/?tab=replicaset#metrics
[3]: /ja/integrations/amazon_documentdb/
[4]: /ja/integrations/amazon_documentdb/#metrics