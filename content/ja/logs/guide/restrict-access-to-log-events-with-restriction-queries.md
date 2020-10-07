---
title: 制限クエリでログイベントへのアクセス権を制限
kind: ガイド
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: ログエクスプローラーの詳細
  - link: /logs/explorer/patterns/
    tag: Documentation
    text: ログパターンビューの概要
  - link: /logs/live_tail/
    tag: Documentation
    text: Live Tail のご紹介
  - link: /logs/logs_to_metrics/
    tag: Documentation
    text: 収集されたログからメトリクスを生成する方法
---
## 概要

ログには、[スクラブ][1]) されるか組織内の権限のあるユーザーのみがアクセスできる機密データが含まれている場合があります。

特定のユーザーやグループにログのサブセットへのアクセスを制限するには、Datadog で制限クエリを定義します。

本ガイドでは、**バックエンド**と**フロントエンド**の 2 チームがあり、それぞれが`team:frontend` と `team:backend` タグの付いた自身のログのみを表示できると仮定しています。

以下は、両方のチームで共通の手順です。

* [ロールを作成する](#role-creation)
* [制限クエリを作成する](#create-restriction-queries)
* [ロールに制限クエリをアタッチします](#attach-queries-to-the-role)
* [ロールをユーザーにアタッチします](#attach-role-to-the-user)
* [デフォルトの Datadog ロールからユーザーを削除します](#remove-default-roles)

## 前提条件

本ガイドは API の使用手順を説明するため、管理者ユーザーからの API キーとアプリケーションキーが必要となります。これらは [Datadog アカウントの API キーページ][2]にあります。

この記事をとおして、`<Datadog_API_キー >` および `<Datadog_アプリケーションキー >` はそれぞれご使用中の Datadog API キーおよび Datadog アプリケーションキーに置き換えて進めてください。

また、本ガイドでは `CURL` に対応するターミナルであることを前提としています。

## ロールの作成

[RBAC ドキュメント][3]にあるように、ロールは Datadog で作成することができます。

また、API と以下の手順に従いロールを作成することもできます。

### ロールを作成

[ロールの作成 API][4] を使用して、`team-frontend` および `team-backend` ロールを追加します。

{{< tabs >}}
{{% tab "Backend" %}}

API 呼び出し:

```
curl -X POST "https://app.datadoghq.com/api/v2/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "team-backend"}}}'
```

応答:

```
{"data":{"type":"roles","id":"dcf7c550-99cb-11ea-93e6-376cebac897c","attributes":{"name":"team-backend","created_at":"2020-05-19T12:25:45.284949+00:00","modified_at":"2020-05-19T12:25:45.284949+00:00"},"relationships":{"permissions":{"data":[{"type":"permissions","id":"d90f6830-d3d8-11e9-a77a-b3404e5e9ee2"},{"type":"permissions","id":"4441648c-d8b1-11e9-a77a-1b899a04b304"}]}}}}
```

{{% /tab %}}
{{% tab "Frontend" %}}

API 呼び出し:

```
curl -X POST "https://app.datadoghq.com/api/v2/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "team-frontend"}}}'
```

応答:

```
{"data":{"type":"roles","id":"63b970ea-99ca-11ea-93e6-e32eb84de6d6","attributes":{"name":"team-frontend","created_at":"2020-05-19T12:15:12.375425+00:00","modified_at":"2020-05-19T12:15:12.375425+00:00"},"relationships":{"permissions":{"data":[{"type":"permissions","id":"d90f6830-d3d8-11e9-a77a-b3404e5e9ee2"},{"type":"permissions","id":"4441648c-d8b1-11e9-a77a-1b899a04b304"}]}}}}
```

{{% /tab %}}
{{% tab "Generic API" %}}

API 呼び出し:

```
curl -X POST \
        "https://app.datadoghq.com/api/v2/roles" \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <DATADOG_API_キー>" \
        -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>" \
        -d '{
            "data": {
                "type": "roles",
                    "attributes": {
                        "name": <ロール名>
                    }
            }
        }'
```

{{% /tab %}}
{{< /tabs >}}

作成されるロールはデフォルトで読み取り専用の権限を持ちます。次の手順では、ロールにアクセス許可を追加します。
応答で取得したロール ID は、ロールにアクセス許可を割り当てる際に必要となるため、必ずメモしてください。

### 利用可能なアクセス許可を一覧表示

[既存のアクセス許可の全リスト][5]を取得します。

```
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>"
```

回答は、アクセス許可の配列で、その各アイテムを下に示します。

```
{
  "data": [
    {
      "attributes": {
        "created": "2019-09-19T10:00:00.000Z",
        "description": "string",
        "display_name": "string",
        "display_type": "string",
        "group_name": "string",
        "name": "string",
        "restricted": false
      },
      "id": "string",
      "type": "string"
    }
  ]
}
```

**注**: アクセス許可 ID は、Datadog US サイトと EU サイトでは異なります。最初のセクションで、API 呼び出しを使用して ID を回復してください。

アクセス許可には 2 種類あります。

* [一般的なアクセス許可][6] (管理者、標準、読み取り専用)
* [高度なアクセス許可][7]

本ガイドでは、ユーザーはデータへのアクセス以外制限がないものとします。それにより、管理者の一般的なものを含むすべてのアクセス許可が付与されます。

Datadog 内のログにアクセスするには、以下のアクセス許可が必須です。

* `logs_read_data`: ログデータ（Live Tail および リハイドレートされたログを含む）へのアクセスを可能にするグローバルスイッチ
* `logs_read_index_data`: インデックス付きデータに対する特定のアクセス許可（ログエクスプローラーで使用可能）。
* `logs_live_tail`: Live Tail 機能へのアクセス

収集されたログとインデックス付きログの両方を表示するには、この 3 つのアクセス許可を有効にする必要があります。 
その次に、アクセスは以下のように制限クエリで制限されます。

### ロールにアクセス許可を付与する

アクセス許可は [Roles API][8]) を使用して 1 つ 1 つ追加されます。

利用可能なすべてのアクセス許可を一覧にして取得した各アクセス許可 ID に対し、以下のようにロールを付与します。

{{< tabs >}}
{{% tab "Backend" %}}

API 呼び出し（ロール ID を使用中のものに置き換え、アクセス許可 ID を入力します):

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/dcf7c550-99cb-11ea-93e6-376cebac897c/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": <PERMISSION_ID>}}'
```

{{% /tab %}}
{{% tab "Frontend" %}}

API 呼び出し（ロール ID を使用中のものに置き換え、アクセス許可 ID を入力します):

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/63b970ea-99ca-11ea-93e6-e32eb84de6d6/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": <PERMISSION_ID>}}'
```
{{% /tab %}}
{{% tab "Generic API" %}}

API 呼び出し:

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": <PERMISSION_ID>}}'
```

{{% /tab %}}
{{< /tabs >}}

## 制限クエリを作成する

各チームに対応するログを識別するには、サービスの値を使用したり、データに `team` タグを追加したりするなど、いろいろな方法があります。

本ガイドでは、バックエンドログおよびフロントエンドログに関連づけられた `team` タグがあることを前提としています。

{{< tabs >}}
{{% tab "Backend" %}}

API 呼び出し:
```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:backend"}}}'
```

応答:

```
{
    "data": {
        "type": "logs_restriction_queries",
        "id": "76b2c0e6-98fa-11ea-93e6-775bd9258d59",
        "attributes": {
            "restriction_query": "team:backend",
            "created_at": "2020-05-18T11:26:48.887750+00:00",
            "modified_at": "2020-05-18T11:26:48.887750+00:00"
        }
    }
}
```

{{% /tab %}}
{{% tab "Frontend" %}}

API 呼び出し:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:frontend"}}}'
```

応答:

```
{
    "data": {
        "type": "logs_restriction_queries",
        "id": "b3228a0c-98fa-11ea-93e6-d30e1d2c52ee",
        "attributes": {
            "restriction_query": "team:frontend",
            "created_at": "2020-05-18T11:28:30.284202+00:00",
            "modified_at": "2020-05-18T11:28:30.284202+00:00"
        }
    }
}
```

{{% /tab %}}
{{% tab "Generic API" %}}

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "<クエリ>"}}}'
```

{{% /tab %}}
{{< /tabs >}}

これで、フロントエンドチームおよびバックエンドチームのロールとクエリの両方が作成されました。

次に、ロール ID およびクエリ ID を使用して[作成したロールに制限クエリをアタッチ][9]し、バックエンドおよびフロントエンドへのアクセスを制限します。

## ロールにクエリをアタッチします

作成呼び出しの応答からのロール ID とクエリ ID は、ロールにクエリをアタッチする際に使用します。
ID はこの例に固有のもので、ユーザーのアカウントで行う場合は全く別のロールとクエリ ID が付与されます。Datadog の制限に関する詳細は、[アクセス許可のドキュメント][10]を参照してください。

{{< tabs >}}
{{% tab "Backend" %}}

API 呼び出し:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/76b2c0e6-98fa-11ea-93e6-775bd9258d59/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "dcf7c550-99cb-11ea-93e6-376cebac897c"}}'
```

[クエリにアタッチされたロールの一覧を取得する][1]ことでアタッチされていることを確認します。

```
curl -X GET "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/76b2c0e6-98fa-11ea-93e6-775bd9258d59/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>"
```

応答:

```
{
    "data": [{
        "type": "roles",
        "id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
        "attributes": {
            "name": "team-backend"
        }
    }]
}
```

[1]: https://docs.datadoghq.com/ja/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
{{% /tab %}}
{{% tab "Frontend" %}}

API 呼び出し:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/b3228a0c-98fa-11ea-93e6-d30e1d2c52ee/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "63b970ea-99ca-11ea-93e6-e32eb84de6d6"}}'
```

[クエリにアタッチされたロールの一覧を取得する][1]ことでアタッチされていることを確認します。

```
curl -X GET "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/b3228a0c-98fa-11ea-93e6-d30e1d2c52ee/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>"
```

応答:

```
{
    "data": [{
        "type": "roles",
        "id": "63b970ea-99ca-11ea-93e6-e32eb84de6d6",
        "attributes": {
            "name": "team-frontend"
        }
    }]
}
```

[1]: https://docs.datadoghq.com/ja/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
{{% /tab %}}
{{% tab "Generic API" %}}

API 呼び出し:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "<ROLE_ID>"}}'
```

{{% /tab %}}
{{< /tabs >}}

## ロールをユーザーにアタッチします

これで、アクセス許可と制限クエリがロールに設定されたため、これらのロールをユーザーに与えることができます。

### ユーザー ID の取得

まず最初に、[ユーザー一覧を取得][11]します。

```
curl -X GET "https://api.datadoghq.com/api/v2/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>"
```

応答内の `data` オブジェクトで、`Backend` ロールおよび `Frontend` ロールに属する必要のあるユーザーのユーザー ID を抽出します。

また、すでにロールと ID があるかも確認します。

### ロールをユーザーにアタッチします

それぞれのユーザーに、[作成したバックエンドロールとフロントエンドロールを割り当てます][12]。

```
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ロール_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>" -d '{"data": {"type":"users","id":"<ユーザー_ID>"}}'
```

### デフォルトのロールを削除します

ユーザーにはデフォルトの Datadog ロール（管理者、標準、読み取り専用）があります。初めてカスタムロールを作成しユーザーに割り当てる場合、ユーザーはデフォルトの Datadog ロールによりデータにアクセスできます。

ユーザーリストで、そのユーザーのロールのリストも確認できます。ユーザーが属する他のロールについては、標準のロールかを再確認する必要があります。

```
curl -X GET "https://api.datadoghq.com/api/v2/roles/{role_id}" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_キー>" -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>"
```

ロール名が Datadog 標準ロールまたは Datadog 管理者ロールの場合、[そのユーザーから取り除き][13]、Datadog のデフォルトのロールではなく、新しく作成されたロールにのみ属するようにしてください。

ユーザーは複数のロールに属することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: https://app.datadoghq.com/account/settings#api
[3]: /ja/account_management/rbac/?tab=datadogapplication#create-a-custom-role
[4]: /ja/api/v2/roles/#create-role
[5]: /ja/api/v2/roles/#list-permissions
[6]: /ja/account_management/rbac/permissions?tab=datadogapplication#general-permissions
[7]: /ja/account_management/rbac/permissions?tab=datadogapplication#advanced-permissions
[8]: /ja/api/v2/roles/#grant-permission-to-a-role
[9]: /ja/api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[10]: /ja/account_management/rbac/permissions?tab=datadogapplication#log-data-access
[11]: /ja/api/v2/users/#list-all-users
[12]: /ja/api/v2/roles/#add-a-user-to-a-role
[13]: /ja/api/v2/roles/#remove-a-user-from-a-role