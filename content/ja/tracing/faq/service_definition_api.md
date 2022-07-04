---
further_reading:
- link: /tracing/faq/service_catalog/
  tag: ドキュメント
  text: Datadog サービスカタログ
is_beta: true
kind: faq
title: Datadog Service Definition API によるサービスの登録
---

<div class="alert alert-warning">この機能は非公開ベータ版で、エンドポイントは変更される可能性があります。</div>

## 概要

サービスとは、独立した、デプロイ可能なソフトウェアの単位です。Datadog [統合サービスタグ付け][1]は、インフラストラクチャーのメトリクス、ログ、トレースなど、複数のテレメトリータイプで一貫してサービスを管理、監視するための標準的な方法を提供します。追加の基準を使用してサービスを定義したい場合は、アーキテクチャースタイルに合わせてサービス定義をカスタマイズします。[Datadog サービスカタログ][2]でサービスリストを表示し、すべてのサービスの信頼性とセキュリティに関する洞察を得ることができます。


## 要件

始める前に、[Datadog API とアプリのキー][3]が必要です。

## 既存の APM サービスを充実させる
すでに APM を使用してアプリケーションを追跡している場合は、それらのサービスに関する情報を追加します。初期状態では、Service Catalog ページにリストされた APM 監視対象サービスには `UNDEFINED` というラベルが貼られています。

チーム名、Slack チャンネル、ソースコードリポジトリなどのサービス所有権情報を、後述の POST エンドポイントを用いて YAML ファイルをプッシュすることで追加します。

## Datadog テレメトリーなしで新しいサービスを登録する
Datadog テレメトリー (APM トレースなど) を発信していないサービスでも、Service Catalog でサービスの所有権情報を管理することができます。YAML ファイルでサービスの所有権、オンコール情報、カスタムタグを指定すると、その情報が Service Catalog UI に反映されます。


## サービス定義を投稿する

```
POST https://api.datadoghq.com/api/unstable/services/definition
```

### 引数

#### ヘッダーパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `DD-API-KEY` | 組織を識別します。キーを作成したり、既存のキーを再利用したりするには、[API キーのページ][4]をご覧ください。 |
| `DD-APPLICATION-KEY` | ユーザーを識別します。キーを作成したり、既存のキーを再利用したりするには、[アプリケーションキーのページ][5]をご覧ください。 |

### リクエスト

#### 本文データ (必須)

| フィールド                       | タイプ            | 説明 |
| --------------------------- | --------------- | ------------------------------------------------------- |
| schema-version&nbsp;[_必須_] | 文字列          | 使用するサービス定義スキーマのバージョン。値 `v2` のみがサポートされます。|
| dd-service&nbsp;[_必須_]     | 文字列          | サービスの一意な識別子。すべてのサービスで一意である必要があり、Datadog でサービスと照合するために使用されます。 |
| チーム                        | 文字列          | サービスを担当するチーム名。 |
| contacts                    | オブジェクト          | チーム内の連絡先の一覧。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type&nbsp;[_必須_]      | 文字列          | 連絡先タイプ  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name                        | 文字列          | 連絡先名  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contact&nbsp;[_必須_]   | 文字列          | 連絡先の値 |
| links                       | オブジェクト          | サービス (ランブックなど) に関連する重要なリンクの一覧。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name&nbsp;[_必須_]      | 文字列          | リンク名     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type&nbsp;[_必須_]      | 文字列          | Resource type |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;[_必須_]       | URL&nbsp;文字列      | リソースリンク |
| repos                       | オブジェクト          | サービスに関連するコードリポジトリの一覧。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name&nbsp;[_必須_]      | 文字列          | コードリポジトリの名前     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider                    | 文字列          | コードリポジトリのプロバイダー |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;[_必須_]       | URL&nbsp;文字列      | コードリポジトリへのリンク |
| ドキュメント                        | オブジェクト          | サービスに関するドキュメントリンクの一覧。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name&nbsp;[_必須_]      | 文字列          | ドキュメント名     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider                    | 文字列          | ドキュメントプロバイダー |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;[_必須_]       | URL&nbsp;文字列      | ドキュメントへのリンク |
| タグ                        | オブジェクト          | サービス定義のカスタムタグのセット。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"key:value"`&nbsp;or&nbsp;`"value"` | 文字列           | custom tags |
| integrations                | オブジェクト          | サポートされているインテグレーションに関する構成。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pagerduty&nbsp;[_必須_] | URL&nbsp;文字列          | `https://www.pagerduty.com/service-directory/{service-name}` Datadog 内に PagerDuty をインテグレーションしている場合、その URL は、現在サービスのためにオンコールしている人、アクティブなポケットベルなど、サービスに関する PagerDuty データを取得するために使用されます。 |
| extensions                  | オブジェクト          | カスタムメタデータ。サービス定義パーサーは、拡張子以下のすべてをテキストブロブとして扱います。  |


#### 例
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
---
schema-version: v2
dd-service: shopping-cart 
team: e-commerce 
contacts:
  - type: slack
    contact: http://slack/e-commerce
  - type: email 
    name: E-commerce team
    contact: ecommerce@example.com  
links: 
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
repos: 
  - name: Source 
    provider: github 
    url: http://github.com/shopping-cart 
  - name: Deployment 
    provider: github 
    url: http://github.com/shopping-cart 
  - name: Config
    provider: github 
    url: http://github.com/consul-config/shopping-cart
docs: 
  - name: E-Commerce Team
    provider: wiki
    url: http://wiki/ecommerce
  - name: Shopping Cart Architecture
    provider: wiki
    url: http://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    provider: google doc
    url: http://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations: 
  pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
extensions:
  your_org/your_domain: 
    customField: customValue
{{< /code-block >}}

### 応答

Status: `200 OK`

### Curl の例

{{< code-block lang="curl" >}}
curl --request POST 'https://api.datadoghq.com/api/unstable/services/definition' \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
<service.definition.yaml> 
}'
{{< /code-block >}}

## サービス定義を取得する

```
GET https://api.datadoghq.com/api/unstable/services/definition/{service_name}?schema_version="v2"
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
| `DD-API-KEY` | 組織を識別します。キーを作成したり、既存のキーを再利用したりするには、[API キーのページ][4]をご覧ください。 |
| `DD-APPLICATION-KEY` | ユーザーを識別します。キーを作成したり、既存のキーを再利用したりするには、[アプリケーションキーのページ][5]をご覧ください。 |

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

## クエリサービス定義

```
GET https://api.datadoghq.com/api/unstable/services/definition
```

### 引数

#### ヘッダーパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `DD-API-KEY` | 組織を識別します。キーを作成したり、既存のキーを再利用したりするには、[API キーのページ][4]をご覧ください。 |
| `DD-APPLICATION-KEY` | ユーザーを識別します。キーを作成したり、既存のキーを再利用したりするには、[アプリケーションキーのページ][5]をご覧ください。 |

### 応答

このエンドポイントは、Datadog が組織に対して持っているすべてのサービス定義を返します。[サービス定義を取得する](#get-a-service-definition)のレスポンス例を参照してください。

### Curl の例

{{< code-block lang="curl" >}}
curl --request GET 'https://api.datadoghq.com/api/unstable/services/definition \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}'
{{< /code-block >}}

## サービス定義を削除する

```
DELETE https://api.datadoghq.com/api/unstable/services/definition/{service_name}
```

#### パスパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `service_name` | その定義を削除するためにサービスを特定します。 |

#### ヘッダーパラメーター

| 必須フィールド  | 説明 |
| ---------- | ----------- |
| `DD-API-KEY` | 組織を識別します。キーを作成したり、既存のキーを再利用したりするには、[API キーのページ][4]をご覧ください。 |
| `DD-APPLICATION-KEY` | ユーザーを識別します。キーを作成したり、既存のキーを再利用したりするには、[アプリケーションキーのページ][5]をご覧ください。 |

### 応答

Status: `200 OK (Deleted)`

### Curl の例

{{< code-block lang="curl" >}}
curl --request DELETE 'https://api.datadoghq.com/api/unstable/services/definition/shopping-cart \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}'
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/unified-service-tagging/
[2]: /ja/tracing/faq/service_catalog/
[3]: /ja/account_management/api-app-keys/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/organization-settings/application-keys