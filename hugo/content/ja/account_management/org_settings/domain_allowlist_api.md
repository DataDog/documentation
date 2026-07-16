---
further_reading:
- link: https://app.datadoghq.com/organization-settings/domain-allowlist
  tag: アプリ内
  text: Domain Allowlist
- link: /account_management/org_settings/domain_allowlist
  tag: ドキュメント
  text: Domain Allowlist UI
title: Domain Allowlist API
---

{{< callout url="/help/" header="Domain Allowlist の利用を開始する" >}}
  Domain Allowlist は Enterprise プランのお客様がご利用になれます。この機能にご興味がある場合は、アクセス権のリクエストについて Datadog サポートへお問い合わせください。
{{< /callout >}}

[Domain Allowlist][1] は、通知を送信できるメール ドメインを制限します。

このドキュメントでは API を通じて Domain Allowlist にアクセスし、設定する方法を説明します。UI を使用する場合は、[Domain Allowlist][1] を参照してください。

## Domain Allowlist の取得

Domain Allowlist と、その有効/無効状態を返します。

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://api.datadoghq.com/api/v2/domain_allowlist

### リクエスト

#### 例

```bash
curl -X GET "https://api.datadoghq.com/api/v2/domain_allowlist" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### レスポンス

{{< tabs >}}
{{% tab "200" %}}

OK

#### モデル

| フィールド | 型 | 説明 |
| :----- | :---- | :----------- |
| data | object | Domain Allowlist のメール データ |
| data.type | enum | Domain Allowlist の種類。許可される enum 値: `domain_allowlist`。既定: `domain_allowlist`。|
| data.attributes | object | Domain Allowlist の属性 |
| data.attributes.enabled | Boolean | `true` の場合、Domain Allowlist は有効です |
| data.attributes.domains | [string] | Domain Allowlist に含まれるドメインの一覧 |

{{% /tab %}}
{{% tab "403" %}}

Forbidden

#### モデル

| フィールド | 型 | 説明 |
| ----- | ---- | ----------- |
| errors \[_必須_\] | [string] | エラーの一覧 |

{{% /tab %}}
{{% tab "404" %}}

Not Found

#### モデル

| フィールド | 型 | 説明 |
| ----- | ---- | ----------- |
| errors \[_必須_\] | [string] | エラーの一覧 |

{{% /tab %}}
{{% tab "429" %}}

Too many requests

#### モデル

| フィールド | 型 | 説明 |
| ----- | ---- | ----------- |
| errors \[_必須_\] | [string] | エラーの一覧 |

{{% /tab %}}
{{< /tabs >}}

#### 例

```js
{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@aol.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}
```

## Domain Allowlist の変更

Domain Allowlist を有効化/無効化し、指定したメール ドメインの一覧で許可リスト全体を上書きします。

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">PATCH</span>
https://api.datadoghq.com/api/v2/domain_allowlist

### リクエスト

#### 例

```bash
curl -X PATCH "https://api.datadog.com/api/v2/domain_allowlist" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF

{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@datadoghq.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}

EOF
```

### レスポンス

{{< tabs >}}
{{% tab "200" %}}

OK

#### モデル

| フィールド | 型 | 説明 |
| :----- | :---- | :----------- |
| data | object | Domain Allowlist のメール データ |
| data.type | enum | Domain Allowlist の種類。許可される enum 値: `domain_allowlist`。既定: `domain_allowlist`。|
| data.attributes | object | Domain Allowlist の属性 |
| data.attributes.enabled | Boolean | `true` の場合、Domain Allowlist は有効です |
| data.attributes.domains | [string] | Domain Allowlist に含まれるドメインの一覧 |

{{% /tab %}}
{{% tab "403" %}}

Forbidden

#### モデル

| フィールド | 型 | 説明 |
| ----- | ---- | ----------- |
| errors \[_必須_\] | [string] | エラーの一覧 |

{{% /tab %}}
{{% tab "404" %}}

Not Found

#### モデル

| フィールド | 型 | 説明 |
| ----- | ---- | ----------- |
| errors \[_必須_\] | [string] | エラーの一覧 |

{{% /tab %}}
{{% tab "429" %}}

Too many requests

#### モデル

| フィールド | 型 | 説明 |
| ----- | ---- | ----------- |
| errors \[_必須_\] | [string] | エラーの一覧 |

{{% /tab %}}
{{< /tabs >}}

#### 例

```js
{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@datadoghq.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}
```

## 関連資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/org_settings/domain_allowlist