---
aliases:
- /ja/tracing/faq/service_definition_api/
further_reading:
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog サービスカタログ
kind: documentation
title: Datadog Service Definition API によるサービスの登録
---

## 概要

サービスとは、独立した、デプロイ可能なソフトウェアの単位です。Datadog [統合サービスタグ付け][1]は、あらゆるテレメトリータイプにおいて、一貫してサービスオーナーシップを管理・監視するための標準的な方法を提供します。もし、追加の基準を使用してサービスを定義したい場合は、アーキテクチャースタイルに合ったサービス定義をカスタマイズし、この API を使用して登録してください。

## 要件

始める前に、[Datadog API とアプリのキー][3]が必要です。


## サービス定義スキーマ (v2)
サービスの基本情報。 
| フィールド                       |   説明      |タイプ  | 必須 |
| --------------------------- | --------------- | ------------------------------------------------------- | -------- |
| schema-version&nbsp;[_必須_] | 文字列          | 使用するサービス定義スキーマのバージョン。値 `v2` のみがサポートされる。| はい |
| dd-service&nbsp;[_必須_]     | 文字列          | サービスの一意な識別子。すべてのサービスで一意である必要があり、Datadog でサービスと照合するために使用される。 | はい |
| team                        | 文字列          | サービスを担当するチーム名。 | はい |

#### 例
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
schema-version: v2
dd-service: shopping-cart
team: E-Commerce Team
{{< /code-block >}}

#### 連絡先 (オプション)
| フィールド                       |   説明     |  タイプ| 必須 |
| --------------------------- | --------------- | ------------------------------------------------------- | -------- |
| タイプ | 連絡先タイプ          | 文字列| はい |
| name | 連絡先名          | 文字列| いいえ |
| contact | 連絡先の値       | 文字列| はい |

#### 例
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
contacts:
  - type: slack
    contact: http://slack/e-commerce
  - type: email 
    contact: ecommerce@example.com  
外部リソース (オプション)
{{< /code-block >}}

スキーマの全容は [GitHub][4] でご確認ください。

## サービス定義を投稿する

```
POST /api/v2/services/definitions
```

### 引数

#### ヘッダーパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `DD-API-KEY` | 組織を識別します。キーを作成したり、既存のキーを再利用したりするには、[API キーのページ][5]をご覧ください。 |
| `DD-APPLICATION-KEY` | ユーザーを識別します。キーを作成したり、既存のキーを再利用したりするには、[アプリケーションキーのページ][6]をご覧ください。 |

### リクエスト

#### 本文データ (必須)

この本文データは、[Service Catalog Getting Started ページ][7]で生成することができます。

##### モデル
| フィールド                       | タイプ            | 説明 |
| --------------------------- | --------------- | ------------------------------------------------------- |
| リクエスト本文                | JSON または YAML    | サービス定義スキーマ [v2][4] を参照してください |

#### 例
{{< code-block lang="json" filename="service.definition.json" collapsible="true" >}}
{
  "schema-version": "v2",
  "dd-version": "shopping-service"
}
{{< /code-block >}}

#### 例
{{< code-block lang="json" filename="service.definition.json" collapsible="true" >}}
{
    "data": [
        {
            "attributes": {
                "meta": {
                    "ingested-schema-version": "v2",
                    "ingestion-source": "api",
                    "last-modified-time": "2022-07-13T19:45:14.974121477Z",
                    "github-html-url": "",
                    "warnings": []
                },
                "schema": {
                    "dd-service": "shopping-service",
                    "schema-version": "v2",
                    "links": [],
                    "contacts": [],
                    "docs": [],
                    "repos": [],
                    "tags": null,
                    "integrations": {},
                    "team": "",
                    "extensions": {}
                }
            },
            "type": "service-definition"
        }
    ]
}
{{< /code-block >}}

### 応答

Status: <br>
`200 OK` <br>
`400 Invalid Request` <br>
`429 Too Many Requests` 


### Curl の例

{{< code-block lang="curl" >}}
curl --request POST 'https://api.datadoghq.com/api/v2/services/definitions' \
--header 'DD-API-KEY: <API_KEY>' \
--header 'DD-APPLICATION-KEY: <APPLICATION_KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "schema-version": "v2",
  "dd-service": "shopping-service"
}'
{{< /code-block >}}

## サービス定義を取得する
このエンドポイントでは、あるサービスに対する単一の定義ファイルを取得することができます。

```
GET /api/v2/services/definitions/<service_name>
```

### 引数

#### パスパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `service_name` | その定義を取得するためにサービスを特定します。 |
| `schema_version` | `v2` の使用 |

#### ヘッダーパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `DD-API-KEY` | 組織を識別します。キーを作成したり、既存のキーを再利用したりするには、[API キーのページ][5]をご覧ください。 |
| `DD-APPLICATION-KEY` | ユーザーを識別します。キーを作成したり、既存のキーを再利用したりするには、[アプリケーションキーのページ][6]をご覧ください。 |

### 応答

サービス定義の JSON オブジェクト。例:

{{< code-block lang="json" collapsible="true" >}}
{
    "data": {
        "type": "service_definitions",
        "attributes": {
            "service_definitions": [
                {
                    "docs": [],
                    "links": [
                        {
                            "url": "https://wiki/shopping-cart",
                            "type": "wiki",
                            "name": "shopping-cart service Wiki"
                        },
                        {
                            "url": "https://google.drive/shopping-cart-architecture",
                            "type": "doc",
                            "name": "shopping-cart architecture"
                        },
                        {
                            "url": "https://runbook/shopping-cart",
                            "type": "runbook",
                            "name": "shopping-cart runbook"
                        }
                    ],
                    "tags": [
                        "cost-center:engineering",
                        "business-unit:retail"
                    ],
                    "service_name": "shopping-cart",
                    "repos": [],
                    "contacts": [
                        {
                            "contact": "team@shopping.com",
                            "type": "email",
                            "name": ""
                        },
                        {
                            "contact": "shopping-cart",
                            "type": "slack",
                            "name": ""
                        }
                    ],
                    "integrations": [
                        {
                            "type": "pagerduty",
                            "param": "https://www.pagerduty.com/service-directory/shopping-cart"
                        },
                        {
                            "type": "github",
                            "param": "https://www.github.com/org/shopping-cart"
                        }
                    ],
                    "schema_version": "v1",
                    "team_handle": "",
                    "ingestion_source": "api",
                    "extensions": {},
                    "team": "e-commerce",
                    "last_modified_time": "2022-03-09T14:54:38Z",
                    "github_html_url": ""
                }
            ]
        }
    }
}
{{< /code-block >}}
### Curl の例

{{< code-block lang="curl" >}}
curl --request GET 'https://api.datadoghq.com/api/unstable/services/definition/shopping-cart?schema_version="v2"' \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}' 
{{< /code-block >}}

## すべてのサービス定義をクエリする

```
GET /api/v2/services/definitions
```

### 引数

#### ヘッダーパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `DD-API-KEY` | 組織を識別します。キーを作成したり、既存のキーを再利用したりするには、[API キーのページ][5]をご覧ください。 |
| `DD-APPLICATION-KEY` | ユーザーを識別します。キーを作成したり、既存のキーを再利用したりするには、[アプリケーションキーのページ][6]をご覧ください。 |

### 応答

このエンドポイントは、Datadog が組織に対して持っているすべてのサービス定義を返します。[サービス定義を取得する](#get-a-service-definition)のレスポンス例を参照してください。

### 例
{{< code-block lang="curl" >}}
{
  "data": [
    {
      "attributes": {
        "meta": {
          "ingested-schema-version": "v2",
          "ingestion-source": "api",
          "last-modified-time": "2022-07-13T19:45:14Z",
          "github-html-url": "",
          "warnings": []
        },
        "schema": {
          "links": [],
          "contacts": [],
          "docs": [],
          "repos": [],
          "tags": [],
          "integrations": {},
          "schema-version": "v2",
          "team": "",
          "extensions": {},
          "dd-service": "shopping-service"
        }
      },
      "type": "service-definition",
      "id": "0007484c47fea9a3cd74d7fc4a1c4e8f"
    },
    {
      "attributes": {
        "meta": {
          "ingested-schema-version": "v2",
          "ingestion-source": "api",
          "last-modified-time": "2022-07-12T15:06:00Z",
          "github-html-url": "",
          "warnings": []
        },
        "schema": {
          "links": [],
          "contacts": [],
          "docs": [],
          "repos": [],
          "tags": [],
          "integrations": {},
          "schema-version": "v2",
          "team": "",
          "extensions": {},
          "dd-service": "delivery-service"
        }
      },
      "type": "service-definition",
      "id": "0007484c47fea9a3cd74d7fc4a1c4e8f"
    }
  ]
}
{{< /code-block >}}


### Curl の例

{{< code-block lang="curl" >}}
curl --location --request GET 'https://api.datadoghq.com/api/v2/services/definitions' \
--header 'DD-API-KEY: <API_KEY>' \
--header 'DD-APPLICATION-KEY: <APPLICATION_KEY>' 
{{< /code-block >}}

## サービス定義を削除する

```
DELETE /api/v2/services/definitions/<service_name>
```

#### パスパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `service_name` | その定義を削除するためにサービスを特定します。 |

#### ヘッダーパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `DD-API-KEY` | 組織を識別します。キーを作成したり、既存のキーを再利用したりするには、[API キーのページ][5]をご覧ください。 |
| `DD-APPLICATION-KEY` | ユーザーを識別します。キーを作成したり、既存のキーを再利用したりするには、[アプリケーションキーのページ][6]をご覧ください。 |

### 応答

Status: `200 OK (Deleted)`

### Curl の例

{{< code-block lang="curl" >}}
curl --location --request DELETE 'https://api.datadoghq.com/api/v2/services/definitions/shopping-cart' \
--header 'DD-API-KEY: <API_KEY>' \
--header 'DD-APPLICATION-KEY: <APPLICATION_KEY>'
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/unified-service-tagging/
[2]: /ja/tracing/service_catalog/
[3]: /ja/account_management/api-app-keys/
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://app.datadoghq.com/services/setup