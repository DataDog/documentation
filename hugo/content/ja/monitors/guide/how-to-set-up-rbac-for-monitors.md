---
description: モニターのロールベースのアクセス制御（RBAC）を設定して、編集権限を特定のロールに制限し、不正な変更を防いでください。
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
## 概要{#overview}

モニターは、システムに関する潜在的な問題についてチームにアラートを送信します。許可されたユーザーのみがモニターを編集できるようにすることで、モニター設定の誤った変更を防ぐことができます。

個々のモニターの編集権限を特定のロールに制限することで、モニターを安全に管理することができます。

## ロールを設定する {#set-up-roles}

デフォルトロールとカスタムロールの詳細、カスタムロールの作成方法、ロールへの権限の割り当て、ユーザーへのロールの割り当てについては、[ロールベースアクセス制御][1]を参照してください。

## モニターへのアクセスを制限する {#restrict-access-to-monitors}

{{< tabs >}}

{{% tab "UI" %}}

1. 新しいモニターを作成するか、既存のモニターを編集して、モニター編集画面に移動してください。
2. フォームの下部で、作成者に加えてモニターの編集を許可するロールを指定してください。

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

[Create][2] または [Edit a monitor][3] API エンドポイントと `restricted_roles` パラメーターを使用して、モニターを編集できるユーザーを特定のロールに属するユーザーとモニターの作成者に制限してください。

**注:** 1 つまたは複数のロール UUID を指定できます。`restricted_roles` を `null` に設定すると、[Monitor Write permissions][4] を持つすべてのユーザーがモニターを編集できるようになります。

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

## 制限されたロール {#restricted-roles}

Datadog では、ロール制限オプションを使用して、モニターの編集を特定のロールに制限できます。これにより、どのユーザーがモニターを編集できるかを柔軟に定義できます。

### API{#api}

API または Terraform を通じて管理されているモニターの定義は、`restricted_roles` パラメーターを使用して更新できます。[Restriction Policies][4] エンドポイントを使用して、モニターのアクセス制御ルールを定義し、関係（編集者や閲覧者など）の集合を、許可されたプリンシパル（ロール、チーム、ユーザーなど）の集合にマッピングすることもできます。制限ポリシーは、そのモニターで誰がどのアクションを実行できるかを決定します。

モニターは、`viewer`、`muter`、および `editor` の関係をサポートしています。ミュートのみのアクセスを許可する `muter` 関係は、プレビュー版です。`muter` 関係をバインドするポリシーは `editor` 関係もバインドする必要があり、各プリンシパルはポリシーごとに 1 つの関係のみを保持できます。`restricted_roles` パラメーターは編集アクセスのみを制御します。ミュートのみのアクセス権を付与するには、制限ポリシーを使用してください。詳しくは、[アクセスレベル][5]をご覧ください。

詳細については、[モニターの編集 API エンドポイント][3]および[制限ポリシー API][4] を参照してください。

### UI {#ui}

UI から作成されたすべての新規モニターは、`restricted_roles` パラメーターを使用します。
また、すべてのモニターには、基盤となるメカニズムに関係なく、ロール制限オプションが表示されます：

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC 制限なしのモニター" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/
[2]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /ja/api/latest/monitors/#edit-a-monitor
[4]: /ja/api/latest/restriction-policies/
[5]: /ja/monitors/configuration/#access-levels