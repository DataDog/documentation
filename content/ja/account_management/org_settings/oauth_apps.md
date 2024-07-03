---
further_reading:
- link: /account_management/org_settings/
  tag: Documentation
  text: Learn more about organization settings
title: OAuth Apps
---
## 概要

[Organization Settings][1] の **OAuth Apps** 管理ページでは、アプリケーションに付与されたスコープや権限、アクセスを許可されたユーザーなど、組織の OAuth アプリケーションを管理し可視化することができます。

{{< img src="account_management/oauth_apps/org-management-page.png" alt="Datadog の OAuth Apps 管理ページ" style="width:100%;">}}

## セットアップ
### 権限

デフォルトでは、[Datadog Standard ロールおよび Datadog Admin ロール][2]を持つユーザーは、OAuth Apps の管理ページにアクセスできます。組織で[カスタムロール][3]が定義されている場合、ユーザーを `org_authorized_apps_read` と `org_authorized_apps_write` アクセス許可を持つ任意のカスタムロールに追加してください。

Datadog Admin ロールまたは `org_authorized_apps_write` アクセス許可を持つユーザーのみが、このページで OAuth アプリケーションを管理することができます (アプリケーションの無効化やユーザーの OAuth アクセス権の取り消しなど)。

### Enable

Enabled OAuth applications allow users with necessary permissions to authorize access on their behalf. OAuth applications include the Datadog Mobile App<!-- and your custom [UI Extensions][4] that have [OAuth API Access][5]-->. 

### Disable

アプリケーションの OAuth アクセスを無効にすると、組織内のすべてのユーザーからこのアプリケーションへのアクセスが無効になります。アプリケーションはインストールされたままですが、ユーザーはそのアプリケーションを使用できなくなり、認証しようとするとエラーが表示されます。

OAuth Apps の管理ページからアプリケーションを無効化する方法は、2 つあります。
1. アプリ一覧でアプリケーションにカーソルを合わせると、行の右側に **Disable** ボタンが表示されます。
{{< img src="account_management/oauth_apps/disable-app-table.png" alt="アプリ一覧の Disable ボタン" style="width:100%;">}}

2. アプリケーションをクリックして、アプリケーションの詳細表示を開き、**Disable Application** ボタンをクリックします。
{{< img src="account_management/oauth_apps/disable-app-detailed.png" alt="アプリの詳細ビューの Disable ボタン" style="width:100%;">}}

**注**: 再有効化した場合、以前アプリケーションを許可したユーザーは、アクセスを回復するためにアプリケーションを再許可する必要があります。

### アクセスの取り消し

あるアプリケーションに対するユーザーの OAuth アクセスを取り消すと、そのアプリケーションへのアクセスがすべて削除されます。ユーザーがアプリケーションを認可するのに必要なアクセス許可を持っている場合は、再認可することでアクセスを回復できます。
{{< img src="account_management/oauth_apps/revoke-user.png" alt="アプリの詳細ビューの Disable ボタン" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /ja/account_management/rbac/permissions/#general-permissions
[3]: /ja/account_management/rbac/?tab=datadogapplication#custom-role
[4]: /ja/developers/ui_extensions/
[5]: /ja/developers/ui_extensions/#oauth-api-access