---
aliases:
- /ja/guides/rbac
- /ja/account_management/rbac/role_api
- /ja/account_management/users/default_roles
- /ja/account_management/users/custom_roles
- /ja/account_management/rbac/log_management
further_reading:
- link: /api/v2/roles/
  tag: Documentation
  text: Manage roles and permissions with the Roles API
- link: /api/v2/roles/#list-permissions
  tag: Documentation
  text: Manage your permissions with the Permissions API
- link: /account_management/rbac/permissions
  tag: Documentation
  text: Discover the list of permissions available
- link: /account_management/saml/
  tag: Documentation
  text: Enable single sign on with SAML
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Build compliance, governance, and transparency across your teams with Datadog
    Audit Trail
title: Access Control
---

## 概要

Datadog offers a flexible access management system that allows you to customize the level at which you control access to your Datadog resources.

Users looking for basic functionality have access to OOTB [roles](#role-based-access-control) with [permissions][1]. For more flexibility, create your own [custom roles](#custom-roles) to combine permissions into new roles. Permissions attached to a custom role apply to all resources of a particular resource type.

Organizations and users that need maximum flexibility can control access to individual dashboards, notebooks, and other resources with [granular access control][2].

## Role based access control

ロールによりユーザーを分類し、各ユーザーが読み取ることができるデータや変更できるアカウントアセットなど、アカウントのアクセス許可を定義します。Datadog ではデフォルトで 3 つのロールを提供していますが、[カスタムロール](#カスタムロール)を作成すると、ユーザーとアクセス許可のマッピングをより適切に定義できます。

ロールにアクセス許可を付与することで、ロールに関連付けられているユーザーはアクセス許可を受け取ります。複数のロールに関連付けられているユーザーは、それぞれのロールに付与されているすべてのアクセス許可を受け取ります。ユーザーに関連付けられたロールが増えるほど、Datadog アカウント内で持つアクセス権も増えます。

If a user in a [child organization][3] has `org_management` permission, it does not mean that they have the same permission in the parent org. Users' roles are not shared between parent and child organizations.

**Note**: If you use a SAML identity provider, you can integrate it with Datadog for authentication, and you can map identity attributes to Datadog default and custom roles. For more information, see [SAML group mapping][4].

## Datadog のデフォルトのロール

Datadog Admin Role
: Users have access to billing information and the ability to revoke API keys. They can manage users and configure [read-only dashboards][5]. They can also promote standard users to administrators.

Datadog Standard Role
: Users are allowed to view and modify all monitoring features that Datadog offers, such as [dashboards][5], [monitors][6], [events][7], and [notebooks][8]. Standard users can also invite other users to organizations.

Datadog Read Only Role
: Users do not have access to edit within Datadog. This comes in handy when you'd like to share specific read-only views with a client, or when a member of one business unit needs to share a [dashboard][5] with someone outside their unit.

## カスタムロール

The custom roles feature gives your organization the ability to create new roles with unique permission sets. Manage your custom roles through the Datadog site, the [Datadog Role API][8], or SAML directly. Find out below how to create, update, or delete a role. See [Datadog Role Permissions][1] for more information about available permissions. Only users with the User Access Manage permission can create or edit roles in Datadog.

### カスタムロールを有効にする

1. [Organization Settings][9] に移動します。
2. ページ左側の **Roles** を選択します。
3. 右上のギアアイコンをクリックすると、Custom Roles のポップアップウィンドウが開きます。
4. Custom Roles で **Enable** をクリックします。

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Custom Roles ポップアップウィンドウの Enable ボタン" style="width:90%;">}}

代替として、POST 呼び出しを [Create Role API エンドポイント][10]宛てにすると、自動的にオーガニゼーションに対するカスタムロールが有効になります。

### カスタムロールを作成する

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを作成するには

1. [Datadog Roles ページ][1]に移動します。
2. ページ右上隅 **New Role** を選択します。
3. ロールに名前を付けます。
4. ロールにアクセス許可セットを割り当てます。利用可能なアクセス許可の詳細については、[Datadog ロールのアクセス許可][2]を参照してください。

ロールを作成したら、[既存のユーザーに追加][3]できます。


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions/
[3]: /ja/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

[ロールの作成 API リファレンス][1]で、ロールの作成方法の例をご紹介しています。


[1]: /ja/api/latest/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### ロールを更新する

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを編集するには

1. [Datadog Roles ページ][1]に移動します。
2. 変更するロールの編集ボタンを選択します。
3. ロールのアクセス許可セットを変更します。利用可能なアクセス許可の詳細については、[ロールのアクセス許可][2]を参照してください。
4. 変更を保存します。


ロールが変更されると、そのロールを持つすべてのユーザーのアクセス許可が更新されます。


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

[ロールの更新 API リファレンス][1]で、ロールの更新方法の例をご紹介しています。


[1]: /ja/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### ロールの複製

{{< tabs >}}
{{% tab "Datadog application" %}}

既存ロールのクローンを作成するには:

1. [Datadog Roles ページ][1]に移動します。
2. クローンを作成するロールの上にカーソルを合わせます。右側にボタン群が表示されます。
3. クローンを作成するロールのクローンボタンを選択します。
4. オプションで、ロールの名前または権限を変更します。
5. 下の **Save** ボタンをクリックします。

{{< img src="account_management/rbac/clone_role.png" alt="クローンボタンがハイライトされた 2 つのロールのリスト" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[ロールのクローン作成 API リファレンス][1]で、ロールのクローン作成方法の例をご紹介しています。

[1]: /ja/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### ロールを削除する

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを削除するには

1. [Datadog Roles ページ][1]に移動します。
2. 削除するロールの上にカーソルを合わせます。右側にボタン群が表示されます。
3. 削除するロールの削除ボタンを選択します。
4. 決定を確認します。


ロールが削除されると、このロールを持つすべてのユーザーのアクセス許可が更新されます。ロールのないユーザーは、Datadog を効率的に使用できませんが、制限付きのアクセスを保持します。


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[ロールの削除 API リファレンス][1]で、ロールの削除方法の例をご紹介しています。


[1]: /ja/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### ロールテンプレートの適用

Datadog サイトでロールを作成または更新する際、Datadog ロールテンプレートを使用すると、ロールに既定のアクセス許可を適用できます。

1. New Role または Edit Role ページで、右側の **Show Role Templates** ボタンをクリックします。
2. ロールテンプレートのドロップダウンメニューが表示されます。
3. メニューから、ロールに適用するアクセス許可のロールテンプレートを選択します。
4. **Apply** ボタンをクリックします。
4. オプションで、ロールにさらに変更を加えます。
5. **Save** ボタンをクリックします。

{{< img src="account_management/rbac/role_templates.png" alt="Datadog 請求管理者ロールが選択されたロールテンプレートのドロップダウンメニュー" style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/
[2]: /ja/account_management/rbac/granular_access/
[3]: /ja/account_management/multi_organization/
[4]: /ja/account_management/saml/mapping/
[5]: /ja/dashboards/
[6]: /ja/monitors/
[7]: /ja/events/
[8]: /ja/api/v2/roles/
[9]: https://app.datadoghq.com/organization-settings/
[10]: /ja/api/latest/roles/#create-role