---
aliases:
- /ja/account_management/org_settings/oauth_apps/
description: 組織内の OAuth アプリケーションを管理および監視します。これには、権限、アプリケーションスコープ管理、ユーザーアクセス、アプリケーションステータスの制御が含まれます。
further_reading:
- link: /account_management/org_settings/
  tag: ドキュメント
  text: 組織設定の詳細を見る
- link: /account_management/rbac/permissions/
  tag: ドキュメント
  text: Datadog ロールの権限
title: モバイルおよびサードパーティアクセス
---
## 概要 {#overview}

[組織設定][1]の [{{< ui >}}Mobile and Third-Party Access{{< /ui >}}](モバイルおよびサードパーティアクセス) ページを使用して、アプリケーションに付与されたスコープや権限、そのアクセスを承認したユーザーなど、組織の OAuth アプリケーションを管理し、詳細を把握します。

{{< img src="account_management/mobile_third_party_access/org-management-page.png" alt="Datadog の [Mobile and Third-Party Access] 管理ページ" style="width:100%;">}}

## セットアップ {#setup}
### 権限 {#permissions}

デフォルトでは、[Datadog Admin ロール][2]を持つユーザーが [Mobile and Third-Party Access] ページにアクセスできます。組織で[カスタムロール][3]が定義されている場合は、`org_authorized_apps_read` および `org_authorized_apps_write` 権限を持つカスタムロールにユーザーを追加してください。

Datadog Admin ロール、または `org_authorized_apps_read` および `org_authorized_apps_write` 権限を持つユーザーのみが、このページで OAuth アプリケーションの管理 (アプリケーションの無効化やユーザーの OAuth アクセスの取り消しなど) を行うことができます。

### 有効化 {#enable}

OAuth アプリケーションを有効にすると、必要な権限を持つユーザーが自身の代わりのアクセスを承認できるようになります。OAuth アプリケーションには、Datadog モバイルアプリが含まれます。

### 無効化 {#disable}

アプリケーションの OAuth アクセスを無効にすると、組織内のすべてのユーザーに対してそのアプリケーションへのアクセスが取り消されます。アプリケーションはインストールされたままですが、ユーザーはアプリケーションを使用できなくなり、承認を試みるとエラーが表示されます。

[Mobile and Third-Party Access] ページからアプリケーションを無効にするには:
1. アプリケーションテーブルで、ご使用のアプリケーションにカーソルを合わせると、行の右側に [{{< ui >}}Disable{{< /ui >}}](無効化) ボタンが表示されます。
{{< img src="account_management/mobile_third_party_access/disable-app-table.png" alt="カーソルが置かれ、[Disable] ボタンが表示されているアプリケーションテーブル" style="width:100%;">}}

2. アプリケーションをクリックしてアプリケーションの詳細表示を開き、[{{< ui >}}Disable Application{{< /ui >}}](アプリケーションの無効化) ボタンをクリックします。
{{< img src="account_management/mobile_third_party_access/app-detail-scopes.png" alt="スコープと [Disable Application] ボタンが表示されている、アプリケーションの詳細表示" style="width:100%;">}}

**注**: 再度有効化した場合、以前にアプリケーションを承認したユーザーは、アクセスを回復するためにアプリケーションを再承認する必要があります。

### アクセスを取り消す {#revoke-access}

アプリケーションへのユーザーの OAuth アクセスを取り消すと、そのアプリケーションへのすべてのアクセスが削除されます。ユーザーがアプリケーションを承認するために必要な権限を持っている場合、再承認することでアクセスを回復できます。

{{< img src="account_management/mobile_third_party_access/revoke-user.png" alt="ユーザーのアクセスを取り消すオプションがある [Users] タブが表示されている、アプリケーションの詳細表示" style="width:100%;">}}

### アプリケーションスコープ管理 {#application-scope-management}

アプリケーションスコープ管理を有効にすると、アプリケーションに許可されるスコープを変更できます。

スコープの追加や削除は、組織内のすべてのユーザーのアプリケーションへのアクセスに影響します。スコープを無効にすると、そのスコープを含む既存の承認が取り消されます。影響を受けるユーザーは、許可されているほかのスコープでのアクセスを回復するために、アプリケーションを再承認する必要があります。スコープを有効にしても、既存の承認にそのスコープが追加されることはありません。新たに許可されたスコープを付与するには、ユーザーがアプリケーションを再承認する必要があります。

[{{< ui >}}Automatically allow new scopes{{< /ui >}}](新しいスコープを自動的に許可) を使用して、設定の保存後にアプリケーションが要求を開始したスコープを Datadog がどのように処理するかを選択します。

- 選択すると、Datadog は新しく要求されたスコープを自動的に許可します。明示的に無効にしたスコープはブロックされたままになります。
- 選択を解除すると、管理者が許可するまで、Datadog は新たに要求されたスコープをブロックします。

Datadog モバイルアプリの場合、必須スコープは常に許可され、無効にすることはできません。

1. [{{< ui >}}Mobile and Third-Party Access{{< /ui >}}] ページで、アプリケーションをクリックして詳細表示を開きます。

2. [{{< ui >}}Scopes{{< /ui >}}] タブを選択し、各スコープの [{{< ui >}}Allowed{{< /ui >}}](許可) チェックボックスを使用して、そのスコープをアプリケーションに付与するかどうかを制御します。

3. [{{< ui >}}Automatically allow new scopes{{< /ui >}}] を選択または選択解除して、保存後にアプリケーションが要求した新しいスコープを Datadog が自動的に許可するかどうかを選択します。

4. [{{< ui >}}Enable{{< /ui >}}](有効化) または [{{< ui >}}Save{{< /ui >}}](保存) をクリックして、スコープ設定を保存します。

{{< img src="account_management/mobile_third_party_access/scope-restrictions-enable-2.png" alt="[Automatically allow new scopes] および [allowed] スコープコントロールが表示されている、[Application Scope Management](アプリケーションスコープ管理) 画面" style="width:100%;">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /ja/account_management/rbac/permissions/#general-permissions
[3]: /ja/account_management/rbac/?tab=datadogapplication#custom-role