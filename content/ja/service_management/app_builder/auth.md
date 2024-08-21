---
description: App Builder へのアクセスおよび認証
title: アクセス・認証
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では App Builder はサポートされていません。</div>
{{< /site-region >}}

A few tools control access and authentication for apps and their components.

## アクションの資格情報

Because app [actions][1] connect with external software systems, you may need to authenticate your Datadog account to a corresponding integration. An app can run successfully only if every action that requires authentication can verify the identity of your Datadog account.

Actions can be authenticated in the following ways:
- インテグレーションタイルで構成された資格情報および権限
- 接続の資格情報

For more information on configuring credentials, see [Connections][2]. App Builder shares the Action Catalog and the connection credentials for each integration with [Datadog Workflow Automation][3].

## App permissions

デフォルト:
- While the app is in draft, the author of an app is the only user who has access to the app.
- After the app is published, the author maintains **Editor** access, while the rest of the author's Datadog organization receives **Viewer** access to the app.

You can expand access to a draft of published app using access control.

### Permissions and access control

Use [role-based access control (RBAC)][4] to control access to your apps and connections.

The coarse permissions that apply to apps include the following:

Apps View
: View and run apps. Datadog Standard and Admin roles have view access to App Builder by default.

Apps Write
: Create and edit new and existing apps. Datadog Standard and Admin roles have write access to App Builder by default.

Connections Read
: List and view available connections. Datadog Read Only, Standard, and Admin roles have read access to connections by default.

### Restrict access to a specific connection

Set permissions on individual connections to restrict their use or limit modifications. App Builder provides the following permissions for each connection:

Viewer
: View the connection

Resolver
: Resolve and view the connection

Editor
: Edit, resolve, and view the connection

By default, only the author of the connection receives **Editor** access. The author can choose to grant access to additional users, roles, or teams.

**Note**: Permission to resolve a connection includes permission to get the connection object assigned to a step and retrieve the secret associated with it.

Use the following steps to modify the permissions on a specific connection:

1. Navigate to the [App Builder page][5].
1. Click the **Connections** tab. A list of connections appears.
1. Hover over the connection that you would like to set granular permissions on. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. 南京錠 (** Permissions**) のアイコンをクリックします。
1. **Restrict Access** を選択します。
1. Select a role from the dropdown menu and click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select the desired permission from the dropdown menu.
1. ロールからアクセスを削除したい場合は、ロール名の右側にあるゴミ箱のアイコンをクリックします。
1. **Save** をクリックします。

### Restrict access to a specific app

Set permissions on each app to restrict modifications to the app. By default:
- The author of an app is the only user who has access to the app.
- アプリの公開後、作者は **Editor** 権限を維持し、作者の Datadog 組織の残りのユーザーは、アプリへの **Viewer** 権限を付与されます。

App Builder provides the following permissions for each app:

Viewer
: Run and view the app

Editor
: Edit, run, and view the app

To restrict access to the app, perform the following steps in the app canvas:
1. Navigate to the detailed editing view for the app you want to restrict access to.
1. In the app editor, click on the cog (**Settings**) icon.
1. Select **Permissions** from the dropdown.
1. **Restrict Access** を選択します。
1. ドロップダウンメニューからロールを選択します。**Add** をクリックします。選択したロールがダイアログボックスの下部に表示されます。
1. ロール名の横にある、ドロップダウンメニューから必要な権限を選択します。
1. ロールからアクセスを削除したい場合は、ロール名の右側にあるゴミ箱のアイコンをクリックします。
1. **Save** をクリックします。

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][6].

[1]: https://app.datadoghq.com/app-builder/action-catalog
[2]: /ja/service_management/app_builder/connections/
[3]: /ja/service_management/workflows/
[4]: /ja/account_management/rbac/
[5]: https://app.datadoghq.com/app-builder/
[6]: https://datadoghq.slack.com/
