---
title: How to set up RBAC for Monitors
further_reading:
- link: "/account_management/rbac/permissions/#monitors"
  tag: Documentation
  text: Learn more about RBAC permissions for Monitors
- link: "/api/latest/monitors/#create-a-monitor"
  tag: Documentation
  text: Learn more about creating restricted monitors via API
- link: "/monitors/notify/#permissions"
  tag: Documentation
  text: Learn more about creating restricted monitors via the UI
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

[1]: /monitors/notify/#permissions
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


[1]: /api/latest/roles/#list-roles
[2]: /api/latest/monitors/#create-a-monitor
[3]: /api/latest/monitors/#edit-a-monitor
[4]: /account_management/rbac/permissions/#monitors
[5]: /api/latest/roles/
[6]: /api/latest/monitors/
{{% /tab %}}
{{< /tabs >}}

## ロックされたロールから制限されたロールへのモニターの移行

Datadog がモニターの編集を特定のロールに制限できる機能をリリースする以前は、モニターをロックすることができました。ロックされたモニターを編集できるのは、作成者と [Datadog Admin Role][2] を持つユーザーだけです。

{{< img src="/monitors/guide/monitor_rbac_locked.jpg" alt="RBAC ロックされたモニター" style="width:70%;">}}

ロックされたモニターは非推奨であり、もはやサポートされません。代わりに、どのユーザーがモニターを編集できるかを柔軟に定義するロール制限オプションを使用してください。

以下のセクションでは、モニターの管理方法に応じて、ロック機構から制限されたロールに移行する方法について説明します。

### API

上記のロックメカニズムに対応する `locked` パラメーターはもはやサポートされません。これは、API や Terraform を通じて管理されるモニターの定義を更新し、`locked` の使用を中止し、`restricted_roles` (新しいロール制限オプションに添付されたパラメーター) を使用する必要があることを意味します。

モニターの定義を更新する方法については、[モニター API エンドポイントの編集][3]および[モニター API オプション][4]を参照してください。

### UI

UI から作成されるすべての新しいモニターは `restricted_roles` パラメーターを使用します。
また、基本的なメカニズムに関係なく、すべてのモニターはロール制限オプションを表示します。

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC 非制限モニター" >}}

Datadog は、モニターが保存されるたびに、既存のモニター定義を古いロックされたメカニズムから新しいロール制限のメカニズムに更新します。

以下は、ロック機構を使用しているモニターを保存する必要がある場合の手順です。

#### 作成者または Datadog Admin Role を持つユーザーが編集したロックされたモニター (`locked:true`)

あなたは、[Datadog Admin Role][2] を持つユーザー、またはモニターの作成者です。ロックされたモニターを編集すると、次の警告が表示されます。

```
This monitor is using the locked attribute: only its creator and admins can edit it. locked is deprecated in favor of restricted_roles. On save, the monitor will be automatically updated to use a restricted_roles attribute set to all roles with Admin permissions. 
If there is no specific change you want to apply to this monitor's permissions, click Save. If you want to update this monitor's permissions, read this doc.
```
(このモニターは locked 属性を使用しています。作成者と管理者のみが編集できます。locked は廃止され、restricted_roles に代わりました。保存すると、モニターは自動的に更新され、Admin 権限を持つすべてのロールに設定された restricted_roles 属性を使用するようになります。
このモニターの権限に適用したい特定の変更がない場合、Save をクリックします。このモニターの権限を更新する場合は、このドキュメントをお読みください。)

保存すると、モニターの定義が Admin 権限を持つすべてのロールに更新されます。
この警告は、モニターに加える変更に応じて、さまざまな方法で対処することができます。

**1. モニターの権限を一切変更したくない場合**

モニターを保存します。Datadog は、ロック機構から制限されたロールにモニターを自動的に移行します。しきい値の更新やメッセージなど、モニターに行った他の更新も同時に保存されます。

何も変更せずに **Save** をクリックすると、モニターの更新も実行されます。

**2. すべてのユーザーがこのモニターを編集できるようにしたい場合**

モニターを保存すると、Datadog が制限されたロールに移行させます。編集ページを再度開きます。**Restrict editing of this monitor to** ドロップダウンメニューで、すべてのロールを削除します。**Save** を再びクリックします。

**3. モニターを一部のロールに制限したいが、Admin 権限を持つすべてのロールに制限されたくない場合**

**Restrict editing of this monitor to** ドロップダウンメニューで、このモニターを修正できるロールを選択します。モニターを保存します。モニターは選択したロールにのみ制限されます。

#### 非作成者または Datadog Admin Role を持たないユーザーが編集したロックされたモニター (`locked:true`)

あなたは、[Datadog Admin Role][2] を持たないユーザーであり、またモニターの作成者ではありません。ロックされたモニターを編集すると、次の警告が表示されます。

```
This monitor is locked: only its creator and admins can edit it. Read more here.
```
(このモニターはロックされています。作成者と管理者のみが編集可能です。詳しくはこちらをご覧ください。)

このモニターはロックされています。[Datadog Admin Role][2] を持つユーザーまたはモニターの作成者に連絡し、モニターのロール制限にあなたのロールの 1 つを追加するよう依頼してください。管理者は、[ロックされたモニター](#locked-monitors-lockedtrue-edited by-creator-or-user-with-datadog-admin-role)について上記のステップ 2 または 3 を実行する必要があります。

**注:** 警告とオプションの間に見られる不一致は予期されるものです。警告は、locked パラメーターを使用しているモニターの現在の状態を反映しています。[Datadog Admin Role][2] を持つユーザーまたはモニターの作成者が編集して保存すると、オプションは、モニターの更新後となるロール制限オプションを反映します。モニターが保存されると、警告は消え、適切な制限されたロールがドロップダウンに入力されます。

#### ロックされていないモニター (`locked:false`、`locked:null`、未定義の `locked`)

ロックされていないモニターを編集すると、次のオプションが表示されます。

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC 非制限モニター" >}}

このオプションは、モニターに加える変更に応じて、さまざまな方法で処理することができます。

**1. モニターの権限を一切変更したくない場合**

モニターを保存します。Datadog は、ロック機構から制限されたロールにモニターを自動的に移行します。しきい値の更新やメッセージなど、モニターに行った他の更新も同時に保存されます。

何も変更せずに **Save** をクリックすると、モニターの更新も実行されます。

**2. モニターを一部のロールに制限したい場合**

**Restrict editing of this monitor to** ドロップダウンメニューで、このモニターを修正できるロールを選択します。モニターを保存します。モニターは選択したロールに制限されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /api/latest/monitors/#edit-a-monitor
[4]: /monitors/guide/monitor_api_options/#permissions-options
