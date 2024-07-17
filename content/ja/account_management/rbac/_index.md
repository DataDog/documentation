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
  text: Roles API を使用してロールとアクセス許可を管理する
- link: /api/v2/roles/#list-permissions
  tag: Documentation
  text: Permission API を使用してアクセス許可を管理する
- link: /account_management/rbac/permissions
  tag: ドキュメント
  text: 利用可能なアクセス許可の一覧
- link: /account_management/saml/
  tag: Documentation
  text: SAML を使用したシングルサインオンを有効にする
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog Audit Trail で、チーム全体のコンプライアンス、ガバナンス、透明性を構築します
title: アクセス制御
---

## Overview

Datadog は、Datadog リソースへのアクセスを制御するレベルをカスタマイズできる柔軟なアクセス管理システムを提供しています。

基本的な機能を求めるユーザーは、すぐに使える[ロール](#role-based-access-control)と[権限][1]にアクセスできます。より柔軟性を求めるのであれば、独自の[カスタムロール](#custom-roles)を作成し、権限を新しいロールにまとめることができます。カスタムロールに関連付けられた権限は、特定のリソースタイプのすべてのリソースに適用されます。

最大限の柔軟性を必要とする組織やユーザーは、[きめ細かなアクセス制御][2]を使用して、個々のダッシュボード、ノートブック、およびその他のリソースへのアクセスを制御できます。

## ロールベースのアクセス制御

Roles categorize users and define what account permissions those users have, such as what data they can read or what account assets they can modify. By default, Datadog offers three roles, and you can create [custom roles](#custom-roles) so you can define a better mapping between your users and their permissions.

By granting permissions to roles, any user who is associated with that role receives that permission. When users are associated with multiple roles, they receive all the permissions granted to each of their roles. The more roles a user is associated with, the more access they have within a Datadog account.

[子組織][3]のユーザーが `org_management` 権限を持っていても、親組織で同じ権限を持っているとは限りません。ユーザーのロールは、親組織と子組織の間で共有されることはありません。

**注**: SAML ID プロバイダーを使用する場合、認証のためにそれを Datadog と統合でき、ID 属性を Datadog のデフォルトロールとカスタムロールにマップできます。詳細については、[SAML グループマッピング][4]を参照してください。

## Datadog default roles

Datadog 管理者ロール
: 請求情報へのアクセス、API キーの無効化に加えて、ユーザーの管理や[読み取り専用ダッシュボード][5]の構成が可能です。標準ユーザーを管理者に昇格させることもできます。

Datadog 標準ロール
: [ダッシュボード][5]、[モニター][6]、[イベント][7]、[ノートブック][8]など、Datadog が提供するすべてのモニタリング機能を表示および変更できます。他のユーザーをオーガニゼーションに招待することも可能です。

Datadog 読み取り専用ロール
: Datadog システム内での編集権限を持たないユーザーです。特定の読み取り専用ビューをクライアントと共有したり、ある部門のメンバーが他の部門外のユーザーと[ダッシュボード][5]を共有する場合に便利です。

## Custom roles

カスタムロール機能を使用すると、オーガニゼーションで一意の権限セットを持つ新規ロールを作成できます。Datadog サイト、[Datadog Role API][8]、または SAML から直接カスタムロールを管理できます。下記からロールの作成、更新、削除方法をご確認ください。利用可能なアクセス許可の詳細については、[Datadog ロールのアクセス許可][1]を参照してください。Datadog でロールを作成または編集できるのは、ユーザーアクセス管理のアクセス許可を持つユーザーのみです。

### Enable custom roles

1. Navigate to [Organization Settings][9]. 
2. On the left side of the page, select **Roles**.
3. Click the gear in the upper right corner. The Custom Roles pop-up appears.
4. In the Custom Roles pop-up, click **Enable**.

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Custom Roles pop-up with Enable button" style="width:90%;">}}

Alternatively, making a POST call to the [Create Role API endpoint][10] automatically enables custom roles for your organization.

### Create a custom role

{{< tabs >}}
{{% tab "Datadog application" %}}

To create a custom role:

1. Go to your [Datadog Roles page][1].
2. Select **New Role** in the upper right corner of the page.
3. Give a name to your role.
4. Assign a set of permissions to your role. See [Datadog Role Permissions][2] for more information about available permissions.

Once a role is created, you can [add the role to existing users][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions/
[3]: /ja/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

Find an example of how to create a role in [Create Role API Reference][1].


[1]: /ja/api/latest/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### Update a role

{{< tabs >}}
{{% tab "Datadog application" %}}

To edit a custom role:

1. Go to your [Datadog Roles page][1].
2. Select the edit button on the role you would like to modify.
3. Modify the set of permissions for your role. See [Role Permissions][2] for more information about available permissions.
4. Save your changes.


Once a role is modified, permissions are updated for all users with the role.


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

Find an example of how to update a role in [Update Role API Reference][1].


[1]: /ja/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### Clone a role

{{< tabs >}}
{{% tab "Datadog application" %}}

To clone an existing role:

1. Go to your [Datadog Roles page][1].
2. Hover over the role you would like to clone. A series of buttons appears to the right.
3. Select the clone button on the role you would like to clone.
4. Optionally modify the name or permissions of the role.
5. Click the **Save** button at the bottom.

{{< img src="account_management/rbac/clone_role.png" alt="List of two roles with Clone button highlighted" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Find an example of how to clone a role in the [Cloning A Role API reference][1].

[1]: /ja/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### Delete a role

{{< tabs >}}
{{% tab "Datadog application" %}}

To delete a custom role:

1. Go to your [Datadog Roles page][1].
2. Hover over the role you would like to delete. A series of buttons appears to the right.
3. Select the delete button on the role you would like to delete.
4. Confirm your decision.


Once a role is deleted, permissions are updated for all users with the role. Users without any roles cannot use Datadog effectively, but still maintain limited access.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Find an example of how to delete a role in the [Delete Role API reference][1].


[1]: /ja/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### Apply a role template

When creating or updating a role on the Datadog site, use a Datadog role template to apply a prescribed set of permissions to the role.

1. On the New Role or Edit Role page, click the **Show Role Templates** button on the right.
2. A dropdown menu populated with role templates appears.
3. From the menu, select the role template whose permissions you would like to apply to your role.
4. Click the **Apply** button.
4. Optionally make additional changes to your role.
5. Click the **Save** button.

{{< img src="account_management/rbac/role_templates.png" alt="Role Templates dropdown menu with Datadog Billing Admin Role selected" style="width:90%;">}}

## Further Reading

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