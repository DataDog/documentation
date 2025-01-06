---
further_reading:
- link: /account_management/rbac/permissions/#monitors
  tag: ドキュメント
  text: モニターの RBAC 権限の詳細
- link: /api/latest/monitors/#create-a-monitor
  tag: ドキュメント
  text: API を使った制限付きモニターの作成について詳しく見る
- link: /monitors/configuration/#permissions
  tag: ドキュメント
  text: UI を使った制限付きモニターの作成について詳しく見る
title: モニター用に RBAC を設定する方法
---

## 概要

モニターは、システムの潜在的な問題をチームに警告します。権限のあるユーザーだけがモニターを編集できるようにすることで、モニターの構成が誤って変更されることを防ぎます。

個々のモニターの編集権限を特定のロールに制限することで、モニターを安全に管理することができます。

## ロールを設定する

デフォルトロールとカスタムロールの詳細、カスタムロールの作成方法、ロールへの権限の割り当て、ユーザーへのロールの割り当てについては、[ロールベースアクセス制御][1]を参照してください。

## モニターへのアクセスを制限する

{{< tabs >}}

{{% tab "UI" %}}

1. 新規にモニターを作成するか、既存のモニターを編集して、モニター編集画面に移動します。
2. フォームの下部で、作成者に加えてモニターの編集を許可されるロールを指定します。

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="RBAC 制限付きモニター" >}}

詳しくは、[モニター権限][1]をご覧ください。

[1]: /ja/monitors/configuration/#permissions
{{% /tab %}}

{{% tab "API" %}}

[List Roles API エンドポイント][1]を使用して、ロールの一覧とその ID を取得します。

```bash
curl --request GET 'https://api.datadoghq.com/api/v2/roles' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>'
```

```bash
{
    "meta": {
        "page": {
            "total_filtered_count": 4,
            "total_count": 4
        }
    },
    "data": [
        {
            "type": "roles",
            "id": "89f5dh86-e470-11f8-e26f-4h656a27d9cc",
            "attributes": {
                "name": "Corp IT Eng - User Onboarding",
                "created_at": "2018-11-05T21:19:54.105604+00:00",
                "modified_at": "2018-11-05T21:19:54.105604+00:00",
                "user_count": 4
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "984d2rt4-d5b4-13e8-a5yf-a7f560d33029"
                        },
                        ...
                    ]
                }
            }
        },
        ...
    ]
}
```

[Create][2] または [Edit a monitor][3] API エンドポイントと `restricted_roles` パラメーターを使用すると、モニターの編集を特定のロールセットとモニターの作成者に制限することができます。

**注:** 1 つまたは複数のロール UUID を指定することができます。`restricted_roles` を `null` に設定すると、[Monitor Write 権限][4]を持つすべてのユーザーに対して、モニター編集を許可します。

```bash
curl --location --request POST 'https://api.datadoghq.com/api/v1/monitor' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>' \
--data-raw '{
  "message": "You may need to add web hosts if this is consistently high.",
  "name": "Bytes received on host0",
  "options": {
    "no_data_timeframe": 20,
    "notify_no_data": true
  },
  "query": "avg(last_5m):sum:system.net.bytes_rcvd{host:host0} \u003e 100",
  "tags": [
    "app:webserver",
    "frontend"
  ],
  "type": "query alert",
  "restricted_roles": ["89f5dh86-e470-11f8-e26f-4h656a27d9cc"]
}'
```

詳しくは、[ロール][5]および[モニター API リファレンス][6]を参照してください。


[1]: /ja/api/latest/roles/#list-roles
[2]: /ja/api/latest/monitors/#create-a-monitor
[3]: /ja/api/latest/monitors/#edit-a-monitor
[4]: /ja/account_management/rbac/permissions/#monitors
[5]: /ja/api/latest/roles/
[6]: /ja/api/latest/monitors/
{{% /tab %}}
{{< /tabs >}}

## 制限されたロール

Datadog では、ロール制限オプションにより、特定のロールに対してモニターの編集を制限することができます。これにより、モニターの編集を許可するユーザーを柔軟に定義することができます。

### API

API または Terraform で管理されているモニターの定義を更新するには、`restricted_roles` パラメーターを使用します。また、[制限ポリシー][4]エンドポイントを使用して、モニターに対するアクセス制御ルールを定義し、一連の関係 (エディターやビューアーなど) を一連の許可されたプリンシパル (ロール、チーム、ユーザーなど) にマッピングすることもできます。制限ポリシーは、モニター上で誰がどのようなアクションを実行する権限を持つかを決定します。

詳細については、[モニターの編集 API エンドポイント][3]および[制限ポリシー API][4] を参照してください。

### UI

UI から作成されるすべての新しいモニターは `restricted_roles` パラメーターを使用します。
また、基本的なメカニズムに関係なく、すべてのモニターはロール制限オプションを表示します。

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC 非制限モニター" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/
[2]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /ja/api/latest/monitors/#edit-a-monitor
[4]: /ja/api/latest/restriction-policies/