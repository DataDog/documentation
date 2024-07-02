---
title: Security Filters with the Cloud SIEM API
aliases:
  - /security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
  - /security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/
  - /security_monitoring/guide/how-to-setup-security-filters-using-cloud-siem-api/
  - /cloud_siem/guide/how-to-setup-security-filters-using-security-monitoring-api/
  - /security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
  - /security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
  - /security/guide/how-to-setup-security-filters-using-security-monitoring-api/
---

## 概要

Cloud SIEM 製品は、ログを脅威インテリジェンスと照合したり、[検出規則][1]を適用して攻撃や異常を検出したりするなどして、取り込んだログを分析して脅威をリアルタイムで検出します。

Datadog は、Datadog Cloud SIEM サービスによって取り込まれ分析されたギガバイトの総数に基づいて、分析されたログの料金を請求します。デフォルトでは、Cloud SIEM は、取り込んだすべてのログを分析して、検出範囲を最大化します。ただし、[Cloud SIEM API][2] を使用すると、プログラムでセキュリティフィルターを設定して、取り込んだログのどのサブセットを分析するかを構成できます。

このガイドでは、以下の例についてご説明します、

* [特定のログを除外するようにデフォルトのセキュリティフィルターを構成する](#add-an-exclusion)
* [カスタムセキュリティフィルターを作成して、分析するログソースを指定する](#create-a-custom-filter)

**注**: セキュリティフィルターは、Cloud SIEM 製品によって分析されたログを制御するためにのみ必要です。Cloud Security Management Threats (`source:runtime-security-agent`) および Cloud Security Management Misconfigurations (`source:compliance-agent`) 製品の一部として Datadog Agent によって生成されたログを除外するために、セキュリティフィルターを作成する必要はありません。分析ログとして請求されないためです。

## 前提条件

* API を使用するには**管理者ユーザーが保有する** API キーとアプリケーションキーが必要です。これらは [Datadog アカウントの API キーページ][3]で確認できます。`<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を Datadog API キーおよび Datadog アプリケーションキーで置き換えてください。

* このガイドでは `curl` の例を解説しています。[cURL][4] をまだインストールしていない場合はインストールするか、[API ドキュメント][2]でこの API エンドポイントについての他言語の例を参照してください。

## 例

### 除外を追加する

デフォルトでは、取り込んだすべてのログを分析する単一のセキュリティフィルターが存在します。これは `all ingested logs` という名前で、クエリは `*` です。タグに基づいてログのサブセットを除外する除外を追加することで、カスタマイズできます。そのためには、まず、フィルターの `id` を取得するために、セキュリティフィルターのリストを取得する必要があります。

**API call:**

```bash
curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
```

**Response:**

```json
{
    "data": [
        {
            "attributes": {
                "is_enabled": true,
                "is_builtin": true,
                "name": "all ingested logs",
                "filtered_data_type": "logs",
                "exclusion_filters": [],
                "version": 1,
                "query": "*"
            },
            "type": "security_filters",
            "id": "l6l-rmx-mqx"
        }
    ]
}
```

この例では、フィルターの `id` は `"l6l-rmx-mqx"` です。次に、それを変更して除外を追加できます。たとえば、`env:staging` でタグ付けされたすべてのログを除外します。

**注**: `version` は、更新したいフィルターの現在のバージョンを示します。このフィールドはオプションです。このフィールドを省略した場合は、最新バージョンが更新されます。

**API call:**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
             "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 1
        },
        "type": "security_filters"
    }
}'
```

**Response:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 2,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

### カスタムフィルターを作成する

分析を明示的に指定されたログに制限するために、カスタムセキュリティフィルターを作成することもできます。たとえば、`source:cloudtrail` のみに一致するフィルターを使用して AWS CloudTrail からのログを分析することを選択できます。

**API call:**

```bash
curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'
```

**Response:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}
```

**注**: `version` は、更新したいフィルターの現在のバージョンを示します。このフィールドはオプションです。このフィールドを省略した場合は、最新バージョンが更新されます。

セキュリティフィルターは包括的です。つまり、特定のログが**少なくとも 1 つのセキュリティフィルタに一致する場合**に分析されます。分析するログのサブセットを指定する場合は、`all ingested logs` という名前のデフォルトの組み込みフィルターを無効にすることもできます。これを行うには、次のように、その `is_enabled` 属性を `false` に設定します。

**API call:**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false
        },
        "type": "security_filters"
    }
}'
```

**Response:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

**注**: `version` は、更新したいフィルターの現在のバージョンを示します。このフィールドはオプションです。このフィールドを省略した場合は、最新バージョンが更新されます。

## 主要なセキュリティ関連のタグと属性

明示的に指定されたログのカテゴリのみを分析する場合は、セキュリティに関連する貴重なユーザーやエンティティ、またはセキュリティログの主要なソースを含むログを除外しないように注意してください。以下の表は、有用な例を示しています。

**主要なユーザーとエンティティ**

| 名前                  | クエリ                                            |
| --------------------- |--------------------------------------------------|
| すべての名前付きイベント      | `@evt.name:*`                                    |
| すべてのクライアント IP        | `@network.client.ip:*`                           |
| すべての宛先 IP   | `@network.destination.ip:*`                      |
| 全てのユーザー             | `@usr.id:* OR @usr.name:* @usr.email:*`          |
| すべてのホスト             | `host:* OR instance-id:*`                        |

**主要なセキュリティソース**

| 名前                  | クエリ                                            |
| --------------------- |--------------------------------------------------|
| AWS セキュリティログ     | `source:(cloudtrail OR guardduty OR route53)`    |
| AWS ネットワークログ      | `source:(vpc OR waf OR elb OR alb)`              |
| Google Cloud Logs     | `source:gcp*`                                    |
| Azure ログ            | `source:azure*`                                  |
| Kubernetes 監査ログ | `source:kubernetes.audit`                        |
| ID プロバイダーログ| `source:(okta OR gsuite OR auth0)`               |
| CDN ログ              | `source:(cloudfront OR cloudflare OR fastly)`    |
| Web サーバーログ       | `source:(nginx* OR apache OR iis)`               |

[1]: /security/default_rules#cat-cloud-siem
[2]: /api/latest/security-monitoring/#get-all-security-filters
[3]: /api/v1/authentication/
[4]: https://curl.haxx.se/download.html
