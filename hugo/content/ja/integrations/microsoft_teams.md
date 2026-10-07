---
app_id: microsoft-teams
app_uuid: b37c5433-6bdd-4f37-9f7e-a60d61032c33
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 203
    source_type_name: Microsoft Teams
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コラボレーション
- ネットワーク
- notifications
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_teams
integration_id: microsoft-teams
integration_title: Microsoft Teams
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_teams
public_title: Microsoft Teams
short_description: Microsoft Teams is the chat-based workspace in Office 365 that
  integrates people, content, and tools.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Network
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Setup
  description: Microsoft Teams is the chat-based workspace in Office 365 that integrates
    people, content, and tools.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Teams
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Microsoft Teams と統合して、以下のことができます。


{{< site-region region="us,us3,us5,eu,ap1" >}}

- Microsoft Teams で Datadog アラートとイベントの通知を受信
- Microsoft Teams の中からインシデントを管理することができます。
- Microsoft Teams から直接トリガーされたモニターをミュートします。
{{< /site-region >}}


{{< site-region region="gov" >}}
- Microsoft Teams で Datadog アラートとイベントの通知を受信
- Microsoft Teams から直接トリガーされたモニターをミュートします。
{{< /site-region >}}



{{< site-region region="gov" >}}
**Note**: While your Datadog account is hosted in the secure US1-FED environment, you are responsible for managing the security of your Microsoft Teams environment, including access, permissions, and data protection.
{{< /site-region >}}


## セットアップ

{{< tabs >}}

{{% tab "Datadog App (Recommended)" %}}

### Microsoft Teams チャンネルへのモニター通知の送信

Microsoft のテナントを Datadog に接続します。

1. Datadogで、[**Integrations > Microsoft Teams**][1] の順に移動します。
2. **Add Tenant** をクリックすると、Microsoft に移動します。
3. 画面の指示に従って、**OK** をクリックします。


{{< site-region region="us,us3,us5,eu,ap1" >}}
Datadog の通知を受信したいすべてのチームに Datadog アプリを追加済みであることを確認します。
{{< /site-region >}}


{{< site-region region="gov" >}}
Ensure you have added the Datadog for Government app to all teams where you want to receive Datadog notifications.
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}

1. Microsoft Teams を開きます。
2. 垂直ツールバーの **Apps** をクリックします。
3. Search for "Datadog" and click on **Open**.
4. In the modal that opens, select the primary channel of the team where the app should be added. Click **Go** to complete the installation.
   {{< /site-region >}}



{{< site-region region="gov" >}}

1. Microsoft Teams を開きます。
2. 垂直ツールバーの **Apps** をクリックします。
3. Search for "Datadog for Government" and click on **Open**.
4. In the modal that opens, select the primary channel of the team where the app should be added. Click **Go** to complete the installation.
   {{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams でアプリをチームに追加" >}}
{{< /site-region >}}


{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_gov_app_to_team.png" alt="Microsoft Teams Add App to Team" >}}
{{< /site-region >}}


ボットをチームに追加したら、Datadog で通知ハンドルを構成します。

1. 構成されたテナントの下で、**Add Handle** をクリックします。ハンドルに名前を付け、ドロップダウンメニューから希望のチームとチャンネルを選択し、**Save** をクリックします。

### 旧来コネクタのテナントベースインテグレーションへの移行

Microsoft has announced that Office 365 connectors for Microsoft Teams are being deprecated. This has the following effects:

- All Datadog Connectors will stop working on January 31, 2025.
- [URL の更新][2]が行われていない Incoming Webhook コネクタは 2025 年 1 月 31 日に機能しなくなります。
- All connectors will stop working on December 31, 2025 (previously October 1, 2024).

詳しくは、Microsoft の[ブログ記事][3]を参照してください。

To migrate all notification handles currently using the legacy Office 365 connectors over to Datadog's tenant-based integration:


{{< site-region region="us,us3,us5,eu,ap1" >}}

1. [セットアップ手順](#setup) に従って Microsoft テナントを Datadog に接続します。
2. Add the Datadog app to all teams where you have a legacy Office 365 connector configured.
3. [Microsoft Teams Integration Tile][861] の各レガシー通知コネクタ ハンドルについて:
   1. Under the configured tenant, click **Add Handle**.
   2. 新しいハンドルに、コネクタハンドルと同じ名前を付けます。例えば、旧来のコネクタハンドルの名前が `channel-123` の場合、テナント構成に `channel-123` という名前で新しいハンドルを作成します。
   3. 旧来のコネクタハンドルがメッセージを送信していたドロップダウンメニューから希望するチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存の旧来のコネクタハンドルをオーバーライドします。

[861]: https://app.datadoghq.com/integrations/microsoft-teams

{{< /site-region >}}



{{< site-region region="gov" >}}

1. [セットアップ手順](#setup) に従って Microsoft テナントを Datadog に接続します。
2. Add the Datadog for Government app to all teams where you have a legacy Office 365 connector configured.
3. [Microsoft Teams Integration Tile][871] の各レガシー通知コネクタ ハンドルについて:
   1. Under the configured tenant, click **Add Handle**.
   2. 新しいハンドルに、コネクタハンドルと同じ名前を付けます。例えば、旧来のコネクタハンドルの名前が `channel-123` の場合、テナント構成に `channel-123` という名前で新しいハンドルを作成します。
   3. 旧来のコネクタハンドルがメッセージを送信していたドロップダウンメニューから希望するチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存の旧来のコネクタハンドルをオーバーライドします。

[871]: https://app.datadoghq.com/integrations/microsoft-teams

{{< /site-region >}}


### 使用状況

Datadog モニターから、[`@-notification` 機能][4]を使用して Microsoft Teams に通知を送信します。通知はアドレス `@teams-<HANDLE>` 宛てに送信します。`<HANDLE>` は Microsoft Teams ハンドル名に置き換えます。トリガーされたモニターを Microsoft Teams からミュートするには、**Mute Monitor** をクリックし、**Mute Duration** を選択して、**Mute** をクリックします。

#### User mentions

User mentions allow you to notify specific users in your Microsoft Teams channels when monitor alerts are triggered. This helps ensure that the right people are notified about important events. To mention a specific user, follow the steps below to find their User Principal Name (UPN).

**Syntax**: `<at>{User Principal Name}</at>`

**Example**: `<at>user@microsoft.com</at>`

**Complete notification example**: `@teams-CHANNEL_NAME <at>user@microsoft.com</at> <at>another.user@microsoft.com</at>`

**To find a user's User Principal Name (UPN):**

1. **Method 1 (only works if UPN matches email):**
   - In Microsoft Teams, click on the user's profile picture or name to open their contact card.
   - The email shown in the `Chat` field is often the UPN. If they differ, use Method 2 below.

2. **Method 2 (always works, but requires Azure Portal permissions):**
   - [Microsoft Azure Portal][5] にサインインします。
   - Navigate to `Microsoft Entra ID` > `Manage` > `Users`
   - Locate the user in the list and copy their UPN from the `User principal name` column.

確実な配信を確認するため、Datadog はモニター通知のテストを推奨します。手順については、[通知のテスト][6]を参照してください。

#### ダッシュボード

任意のチームまたはチャットにダッシュボード ウィジェットのスナップショットを投稿できます。サポートされるウィジェットの一覧については、[スケジュール済みレポート][7]を参照してください。

Teams でダッシュボードウィジェットを共有するには

1. Datadog でダッシュボードウィジェットにカーソルを合わせ、`CMD + C` または `CTRL + C` を押すか、共有メニューから **Copy** ボタンをクリックします。
2. リンクを Teams に貼り付けます。


{{< site-region region="us,us3,us5,eu,ap1" >}}
{{< img src="integrations/microsoft_teams/dashboard_share.png" alt="Microsoft Teams でダッシュボード ウィジェットを共有">}}
{{< /site-region >}}



{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/dashboard_share_gov.png" alt="Sharing a dashboard widget in Microsoft Teams">}}
{{< /site-region >}}


### 編集アクセス権の制限

By default, all users have full access to connected Microsoft Teams tenants.

[詳細なアクセス制御][8]を使用して、特定のテナントを編集できるロールを制限します:

1. While viewing a tenant, click the gear icon in the upper-right corner to open the settings menu.
2. **Permissions** を選択します。
3. **Restrict Access** をクリックします。ダイアログボックスが更新され、組織のメンバーはデフォルトで **Viewer** アクセス権を持っていることが表示されます。
4. Use the dropdown to select one or more roles, teams, or users that can edit the Microsoft Teams tenant.
5. Click **Add**. The dialog box updates to show that the role you selected has the **Editor** permission.
6. **Save** をクリックします。

**Note:** To maintain your edit access to the tenant, you must include at least one role you belong to before saving.

If you have edit access, you can restore general access to a restricted tenant by completing the following steps:

1. While viewing the tenant, click the gear icon in the upper-right corner to open the settings menu.
2. **Permissions** を選択します。
3. **Restore Full Access** をクリックします。
4. **Save** をクリックします。

API 経由でテナントの権限を編集するには:

1. [Microsoft Teams Integration Tile][4] に移動します。
2. **Tenants** タブをクリックします。
3. 選択したテナントについて表示されたテナント ID をコピーします。
4. [Restriction Policies API][9] を使用します。Resource Type は `integration-account`、id は `microsoft-teams:<tenant_id>` です。


[1]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[2]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[3]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[4]: https://app.datadoghq.com/integrations/microsoft-teams
[5]: https://portal.azure.com
[6]: https://docs.datadoghq.com/ja/monitors/notify/#test-notifications
[7]: https://docs.datadoghq.com/ja/dashboards/scheduled_reports/
[8]: https://docs.datadoghq.com/ja/account_management/rbac/granular_access/
[9]: https://docs.datadoghq.com/ja/api/latest/restriction-policies/
{{% /tab %}}

{{% tab "Microsoft Workflows Webhooks" %}}

### What are Microsoft Workflows Webhooks?

Workflows / Power Automate は、自動化されたワークフローを作成するための Microsoft 製品です。Microsoft Workflows を使用すると、Incoming Webhook で通知を送信できます。Microsoft Teams テナントへの Datadog アプリのインストールが推奨されますが、インストールできない場合やプライベート チャネルに通知を送信したい場合は、Datadog ハンドルを構成して Microsoft Workflows 経由で Microsoft Teams のチャネルに通知を送信できます。このインテグレーションは、次の Microsoft Workflows テンプレートでの使用を想定しています: [Webhook リクエストを受信したときにチャネルに投稿][1]

{{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template.png" alt="Post to a channel when a webhook request is received template" style="width:30%;" >}}

### Are you migrating legacy connectors to the Microsoft Workflows Webhooks integration?

Microsoft は、Microsoft Teams 向け Office 365 コネクタの非推奨化を[発表しました][2]。既存のコネクタ URL は 2025 年 1 月 31 日に動作を停止します。Microsoft は、レガシー コネクタの代替として Microsoft Workflows の incoming webhooks の使用を推奨しています。現在レガシー Office 365 コネクタを使用しているすべての通知ハンドルを Datadog の Microsoft Workflows webhooks インテグレーションに移行するには、以下の手順に従ってください。

For each legacy notification connector handle in the Microsoft Teams Integration Tile:

1. Follow the [setup steps](#create-a-microsoft-workflows-webhook) to create a workflow webhook handle for the desired Microsoft Teams channel.
2. Under the Microsoft Workflows Webhooks section, give the new handle the same name as the connector handle it should replace. For example, if your legacy connector handle is named `channel-123`, name your new handle in the Microsoft Workflows Webhooks section with the name `channel-123`. This new handle overrides the existing legacy connector handle.

### Create a Microsoft Workflows Webhook

#### 前提条件

- When creating a new workflow, a Microsoft account is required for both ownership of the workflow and sending notifications to channels (these do not need to be the same Microsoft account).
- The account that owns the workflow (configured in step 2 below) is the account that can edit and renew the workflow. For easier shared access, use a service account.
- The account that sends notifications to channels (configured in step 8 below) posts as the user of the account. This account must be part of the team that you want to send notifications to. If sending notifications to a private channel, then this account must be also be added to the channel. If you want to give this account a name like "Datadog Notifications," use a service account.

#### 手順

**Note:** Most of these steps are in Microsoft Workflows. As Microsoft makes changes to Workflows, the steps below may not reflect the most recent changes.

1. Microsoft Teams で、通知したいすべてのチームに [Workflows アプリ][3]を追加します。チームにアプリを追加できない場合は、以下の「プライベート チャネル」セクションの手順に従ってください。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_1.png" alt="Instructions step 1" style="width:90%;" >}}
2. Microsoft の [Webhook リクエストを受信したときにチャネルに投稿][1]テンプレートから、Power Automate で新しいワークフローを作成します。
3. Choose the Microsoft account that you would like to use to own the workflow (use a service account for easier shared access), then click **Continue**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_3.png" alt="Instructions step 3" style="width:90%;" >}}
4. Click **Edit in advanced mode**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_4.png" alt="Instructions step 4" style="width:90%;" >}}
5. Expand **Send each adaptive card**, then click **Post card in a chat or channel**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template_dropdown_step_5.png" alt="Instructions step 5" style="width:90%;" >}}
6. Use the **Post As** dropdown to set **Post as** to **Flow bot**. Notifications will appear to be sent by "`<NAME>` via Workflows". To receive these notifications, the Workflows application must be added to the desired team. If sending notifications to a private channel, **Post As** must be set to a user in the channel. See the "Private channels" section below for more information. **Note:** Changing **Post as** will reset the **Post in** field.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_6.png" alt="Instructions step 6" style="width:90%;" >}}
7. To access the team and channel drop-downs, remove the @ symbols by deleting them or clicking the **X** icons.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_7.png" alt="Instructions step 7" style="width:90%;" >}}
8. Use the drop-downs to select the desired team and channel.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_8.png" alt="Instructions step 8" style="width:90%;" >}}
9. Ensure that the workflow is connected to the intended Microsoft account for sending notifications (such as a service account named "Datadog Notifications"). Notifications will appear to be sent by "`<NAME>` through Workflows". This account must have access to the configured Microsoft Teams channel. To change the account, click **Change connection** and follow the prompts to configure another Microsoft account.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_9.png" alt="Instructions step 9" style="width:90%;" >}}
10. **Save** ボタンをクリックします。
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_10.png" alt="Instructions step 10" style="width:90%;" >}}
11. To find your webhook link, click the first block of the workflow.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_11.png" alt="Instructions step 11" style="width:50%;" >}}
12. Make sure that **Anyone** can trigger the flow, and then copy the link.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_12.png" alt="Instructions step 12" style="width:90%;" >}}
13. Click the **Back** button to navigate to the dashboard for the workflow.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_13.png" alt="Instructions step 13" style="width:90%;" >}}
14. Ensure that the workflow is on by checking the dashboard. If it is off, click the "Turn on" button.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_14.png" alt="Instructions step 14" style="width:90%;" >}}
15. Datadog で [**Integrations > Microsoft Teams**][4] に移動します。
16. On the Configuration tab, go to the Microsoft Workflows Webhooks section and click **Add Handle**. Give the handle a name (if migrating from a legacy connector handle, use the same name as the corresponding connector handle), and paste the webhook URL.
17. **Save** をクリックします。

### Private channels

To send notifications to private channels, the account configured within the **Post Card to chat or channel** block must have access to the channel. This enables the workflow to send notifications on behalf of that user account.

1. Within the **Post Card to chat or channel** block, change **Post as** to **User**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_1.png" alt="Private channels instructions step 1" style="width:30%;" >}}
2. Then to choose the account, click **Change connection** and follow the prompts to change the account.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_2.png" alt="Private channels instructions step 2" style="width:90%;" >}}

### 制限

- If you are a Microsoft 365 customer, workflows will automatically turn off after 90 days of no successful triggers. When a workflow is nearing expiration, Microsoft sends an email to the account that owns the workflow. This 90 day timer can be reset by running a test within Microsoft Workflows.
- When using the template, all messages are appended with a line of text stating who created the workflow along with a link to the template.
  {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_used_a_template.png" alt="User used a template" style="width:90%;" >}}

  To remove this, go to your workflow and click **Save As** to make a copy, navigate to the copy by finding it within **My Flows**, and use the new webhook from the copied workflow instead of the original workflow.

- Microsoft Workflows does not support interactive features for the messages that it posts (such as muting monitors directly from Microsoft Teams).
- Microsoft Workflows does not support shared channels.
- Microsoft Workflows does not support user mentions when posting a Workflows Webhook as a User.

### 使用状況

Datadog モニターから、[`@-notification` 機能][1]を使用して Microsoft Teams に通知を送信します。通知はアドレス `@teams-<HANDLE>` 宛てに送信します。`<HANDLE>` は Microsoft Teams ハンドル名に置き換えます。

#### User mentions with Microsoft Workflows Webhooks handles

User mentions allow you to notify specific users in your Microsoft Teams channels when monitor alerts are triggered. This helps ensure that the right people are notified about important events. To mention a specific user, follow the steps below to find their User Principal Name (UPN).

**Syntax**: `<at>{User Principal Name}</at>`

**Example**: `<at>user@microsoft.com</at>`

**Complete notification example**: `@teams-CHANNEL_NAME <at>user@microsoft.com</at> <at>another.user@microsoft.com</at>`

**To find a user's User Principal Name (UPN):**

1. **Method 1 (only works if UPN matches email):**
   - In Microsoft Teams, click on the user's profile picture or name to open their contact card.
   - The email shown in the `Chat` field is often the UPN. If they differ, use Method 2 below.

2. **Method 2 (always works, but requires Azure Portal permissions):**
   - [Microsoft Azure Portal][5] にサインインします。
   - Navigate to `Microsoft Entra ID` > `Manage` > `Users`
   - Locate the user in the list and copy their UPN from the `User principal name` column.

<div class="alert alert-warning">User mentions are NOT supported for Workflows Webhook handles posted as a User (for private channels). Including a user mention when posting a Workflows Webhook as a user will fail. To include user mentions using Workflows Webhooks, you must use the Flow Bot.</div>

確実な配信を確認するため、Datadog はモニター通知のテストを推奨します。手順については、[通知のテスト][6]を参照してください。

### 編集アクセス権の制限

By default, all users have full access to each Microsoft Workflows webhook handle.

特定の Workflows Webhook ハンドルを編集できるロールを制限するには、[詳細なアクセス制御][7]を使用します:

1. While viewing the **Workflows Webhooks**, hover over a handle to reveal actions on the right side of the row.
2. Click the lock icon labeled **Permissions**.
3. **Restrict Access** をクリックします。ダイアログボックスが更新され、組織のメンバーはデフォルトで **Viewer** アクセス権を持っていることが表示されます。
4. Use the dropdown to select one or more roles, teams, or users that can edit the Workflows webhook handle.
5. Click **Add**. The dialog box updates to show that the role you selected has the **Editor** permission.
6. **Save** をクリックします。

**Note:** To maintain your edit access to the Workflows webhook handle, you must include at least one role you belong to before saving.

If you have edit access, you can restore general access to a restricted Workflows webhook handle by completing the following steps:

1. While viewing the **Workflows Webhooks**, hover over the restricted handle to reveal actions on the right side of the row.
2. Click the lock icon labeled **Permissions**.
3. **Restore Full Access** をクリックします。
4. **Save** をクリックします。

To edit Workflows Webhooks permissions through the API:

1. [Microsoft Teams Integration API][8] を使用して Workflows Webhooks の ID を取得します。
2. [Restriction Policies API][9] を使用します。Resource Type は `integration-webhook`、id は `microsoft-teams:<workflows_webhook_id>` です。


[1]: https://make.preview.powerautomate.com/galleries/public/templates/d271a6f01c2545a28348d8f2cddf4c8f/post-to-a-channel-when-a-webhook-request-is-received
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://teams.microsoft.com/l/app/c3a1996d-db0f-4857-a6ea-7aabf0266b00?source=app-details-dialog
[4]: https://app.datadoghq.com/integrations/microsoft-teams
[5]: https://portal.azure.com
[6]: https://docs.datadoghq.com/ja/monitors/notify/#test-notifications
[7]: https://docs.datadoghq.com/ja/account_management/rbac/granular_access/
[8]: https://docs.datadoghq.com/ja/api/latest/microsoft-teams-integration/#get-all-workflows-webhook-handles
[9]: https://docs.datadoghq.com/ja/api/latest/restriction-policies/
{{% /tab %}}

{{% tab "Connectors (Deprecated)" %}}

### 旧来コネクタのテナントベースインテグレーションへの移行

Microsoft has announced that Office 365 connectors for Microsoft Teams are being deprecated. This has the following effects:

- All Datadog Connectors will stop working on January 31, 2025.
- [URL の更新][1]が行われていない Incoming Webhook コネクタは 2025 年 1 月 31 日に機能しなくなります。
- All connectors will stop working on December 31, 2025 (previously October 1, 2024).

詳しくは、Microsoft の[ブログ記事][2]を参照してください。

To migrate all notification handles currently using the legacy Office 365 connectors over to the tenant-based Datadog app:


{{< site-region region="us,us3,us5,eu,ap1" >}}

1. [セットアップ手順][992]に従って Microsoft テナントを Datadog に接続します。
2. Add the Datadog app to all teams where you have a legacy Office 365 connector configured.
3. [Microsoft Teams Integration Tile][991] の各レガシー通知コネクタ ハンドルについて:
   1. Under the configured tenant, click **Add Handle**.
   2. 新しいハンドルに、コネクタハンドルと同じ名前を付けます。例えば、旧来のコネクタハンドルの名前が `channel-123` の場合、テナント構成に `channel-123` という名前で新しいハンドルを作成します。
   3. 旧来のコネクタハンドルがメッセージを送信していたドロップダウンメニューから希望するチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存の旧来のコネクタハンドルをオーバーライドします。

[991]: https://app.datadoghq.com/integrations/microsoft-teams
[992]: https://docs.datadoghq.com/ja/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}



{{< site-region region="gov" >}}

1. [セットアップ手順][982]に従って Microsoft テナントを Datadog に接続します。
2. Add the Datadog for Government app to all teams where you have a legacy Office 365 connector configured.
3. [Microsoft Teams Integration Tile][981] の各レガシー通知コネクタ ハンドルについて:
   1. Under the configured tenant, click **Add Handle**.
   2. 新しいハンドルに、コネクタハンドルと同じ名前を付けます。例えば、旧来のコネクタハンドルの名前が `channel-123` の場合、テナント構成に `channel-123` という名前で新しいハンドルを作成します。
   3. 旧来のコネクタハンドルがメッセージを送信していたドロップダウンメニューから希望するチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存の旧来のコネクタハンドルをオーバーライドします。

[981]: https://app.datadoghq.com/integrations/microsoft-teams
[982]: https://docs.datadoghq.com/ja/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}


### Migrate from legacy connectors to the Microsoft Workflows Webhooks integration

Microsoft has announced that Office 365 connectors for Microsoft Teams are being deprecated. This has the following effects:

- All Datadog Connectors will stop working on January 31, 2025.
- [URL の更新][1]が行われていない Incoming Webhook コネクタは 2025 年 1 月 31 日に機能しなくなります。
- All connectors will stop working on December 31, 2025 (previously October 1, 2024).

詳しくは、Microsoft の[ブログ記事][2]を参照してください。

現在レガシー Office 365 コネクタを使用しているすべての通知ハンドルを Datadog の Microsoft Workflows webhooks インテグレーションに移行するには、[Microsoft Workflows Webhooks][3] を参照してください。

### Connector setup (deprecated)

<div class="alert alert-info">
レガシー通知ハンドルは、同じ <code>@teams-HANDLE_NAME</code> を<em>使用しない限り</em>新しいセットアップの影響を受けませんが、使用する場合は新しい構成がレガシー構成をオーバーライドします。
</div>

1. チャンネルのリストで、チャンネル名の横にある `...` ボタンを選択し、**Connectors** を選択します。

   {{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams step 1" >}}

2. Datadog を検索し、**Configure** をクリックします。

   {{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams step 2" >}}

3. コネクタ構成モーダルで、Webhook URL をコピーします。
4. Datadogで [**Integrations > Microsoft Teams**][4] に移動します。
5. Configuration タブで、**Add Handle** をクリックしてハンドルに名前を付け、webhook URL を貼り付けます。
6. コネクタ構成モーダルで、**Save** をクリックします。


[1]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://docs.datadoghq.com/ja/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[4]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}
{{< /tabs >}}


{{< site-region region="us,us3,us5,eu,ap1" >}}

## Microsoft Teams における Datadog Incident Management

### アカウント設定

First, install the Datadog App in Microsoft Teams:

1. Microsoft Teams を開きます。
2. 垂直ツールバーの **Apps** をクリックします。
3. Search for "Datadog" and click on **Open**.
4. In the modal that opens, select the primary channel of the team where the app should be added. Click **Go** to complete the installation.
   {{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams Add App to Team" >}}

次に、Microsoft のテナントを Datadog に接続します。

1. Datadog で、[Microsoft Teams Integration Tile][121] に移動します。
2. **Add Tenant** をクリックすると、Microsoft に移動します。
3. 画面の指示に従って、**OK** をクリックします。


### Granting additional permissions
一部の Datadog Incident Management 機能では、テナント上での操作 (例: インシデント用の新規チャネルの作成) を実行するための権限が必要です。*Global Admin* ロールを割り当てられたユーザーなど、Microsoft 組織を代表して同意を付与できる権限を持つ人物が、テナント全体の管理者同意を付与する必要があります。Datadog アプリケーションに対してテナント全体の管理者同意を付与できるのは誰かについては、[Microsoft Entra ID のドキュメント][122]を参照してください。

Datadog に対してアプリケーション権限と委任された権限の両方を付与するか、委任された権限のみを付与するかを選択できます。両方の権限を使用する方法は設定が容易で、委任された権限のみを使用する方法は、テナント内の Datadog アプリに対してよりきめ細かな制御が可能になります。詳細は、[Microsoft の権限と同意の概要ドキュメント][123]を参照してください。

[121]: https://app.datadoghq.com/integrations/microsoft-teams
[122]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[123]: https://docs.datadoghq.com/ja/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< tabs >}}

{{% tab "Using Application Permissions" %}}

1. Datadog で [Microsoft Teams インテグレーションタイル][1]に移動します。
2. For the tenant in which you want to use Incident Management, click the gear icon on the right-hand side.
3. Click **Grant application permissions**, which redirects you to Microsoft. A user who can grant tenant-wide admin consent must perform this step. This user must have a Datadog account, but the email used for their Datadog account does not need to match the email for their Microsoft account.
4. 画面の指示に従って、**OK** をクリックします。


[1]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}

{{% tab "委任された権限を使用する場合" %}}
委任された権限を使用すると、Datadog は Microsoft Teams テナント内でユーザーとして動作できます。Datadog は、そのユーザーが実行できるあらゆる操作を行い、同ユーザーがアクセスできるリソースにアクセスできます。

First, grant the Datadog app delegated permissions:
1. Datadog で [Microsoft Teams インテグレーションタイル][1]に移動します。
2. For the tenant in which you want to use Incident Management, click the gear icon on the right-hand side.
3. Click **Grant delegated permissions**, which redirects you to Microsoft. A user who can grant tenant-wide admin consent must perform this step. This user must have a Datadog account, but the email used for their Datadog account does not need to match the email for their Microsoft account.
4. 画面の指示に従って、**OK** をクリックします。

Next, create the service account for Datadog to act as:
1. Create an Office365 service account user. Datadog recommends giving this service account user a name such as 'Datadog' to distinguish it from actual Microsoft Teams users and avoid confusion.
2. Assign a Microsoft Teams license to the service account.
3. Add the service account user to each team where you would like to manage incident response. This includes teams where new incident channels are created and teams from which users declare incidents.
4. Ensure that those teams have the following permissions enabled:
   - `Allow members to create and update channels`
   - `Allow members to delete and restore channels`
   - `Allow members to create, update, and remove tabs`

   To enable these permissions, click **...** next to the team name > **Manage Team** > **Settings** > **Member Permissions**.

Finally, connect the service account user that you created in the first step.
1. Ensure you are logged in as the service account user you just created. **Note**: You do not need to create a Datadog user for the service account, and the service account user is not connected to the Datadog user that performs this step.
2. Datadog で [Microsoft Teams インテグレーションタイル][1]に移動します。
3. For the tenant in which you want to use Incident Management, click the gear icon on the right-hand side.
4. Click **Connect delegated user**, which redirects you to Microsoft. **Note**: You do not need to be a tenant-wide admin to perform this step.
5. 画面の指示に従って、**OK** をクリックします。

#### Important note about refresh tokens

When you connect Microsoft Teams using a delegated service account, Datadog uses a refresh token to maintain access without requiring repeated logins. This token can become invalid if the service account's password changes, the account is disabled, or Microsoft revokes the token.

これらのトークンも 90 日後に期限切れになります。Datadog が委任ユーザーの代理でアクションを実行するたびに新しいトークンが発行されますが、委任ユーザーを利用したアクションが 90 日間行われない場合はトークンが失効し、インテグレーションは動作を停止します。

If the token becomes invalid or expires you'll need to reconnect the service account to restore functionality.

詳細は、Microsoft のドキュメント [Microsoft ID プラットフォームにおけるリフレッシュ トークン][2]を参照してください。


[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens
{{% /tab %}}

{{< /tabs >}}

### ユーザー設定

Microsoft Teams から Datadog のアクションを実行するには、Datadog と Microsoft Team のアカウントを接続する必要があります。

Microsoft Teams からアカウントを接続するには

1. Microsoft Teams を開きます。
2. 垂直ツールバーの `...` ボタンをクリックし、Datadog を選択すると、Datadog ボットとのチャットが開始されます。
3. "accounts" と入力し、エンターキーを押します。
   {{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Microsoft Teams からのアカウント接続" >}}

4. Datadog ボットが、アカウントの接続方法について応答します。**Connect Datadog Account** をクリックします。
5. その後、Datadog ボットが、アカウントを接続するためのリンクが含まれたメッセージを送信します。リンクをクリックし、プロンプトに従います。
6. [Microsoft Teams Integration Tile][303] にリダイレクトされます。
7. [Microsoft Teams Integration Tile][303] 上のプロンプトで **Create** をクリックして、アプリケーション キーを作成します。

Datadog からアカウントを接続することも可能です。

1. Datadog で、[Microsoft Teams Integration Tile][303] に移動します。
2. 表示されたテナントの中から、**Connect** をクリックします。
3. 画面の指示に従って、**OK** をクリックします。
4. 上記のプロンプトで **Create** をクリックして、[Microsoft Teams Integration Tile][303] からアプリケーション キーを作成します。

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Datadog Microsoft Teams インテグレーションタイルからアカウントを接続します" >}}

### Incident Usage

#### インシデント

Microsoft Teams から新しいインシデントを宣言するには

1. Start a conversation in a channel in any team, or a chat with the Datadog app.
2. Type `@Datadog incident`
3. An adaptive card appears. Click the **Declare Incident** button to open the Datadog tab and declare an incident.

A user must connect their Microsoft Teams account to their Datadog account to declare an incident.

インシデントを更新するには、作成と同様の手順で行います。

1. インシデントチームにいながら、会話を始めます。
2. `@Datadog` と入力するか、`...` ボタンで **Messaging extensions** メニューを開き、**Datadog** アプリを選択します。
3. **Update Incident** を選択します。
4. 希望の情報をフォームに入力します。
5. **Update** をクリックします。

次を使用してオープン（アクティブで安定している）インシデントをリスト表示します。

```
@Datadog list incidents
```

インシデントチーム内のメッセージの右端にある "More actions" メニューを使用すると、そのメッセージをインシデントタイムラインに送信することができます。

#### インシデントの更新チャンネル

インシデント更新チャンネルを使用すると、関係者は Microsoft Teams から直接、すべてのインシデントのステータスを組織全体で確認することができます。これらのアップデートを投稿するチームとチャンネルをアカウントで選択すると、チャンネルは次の投稿を受け取ります。

- 新しく宣言されたインシデント。
- 重要度、ステータスの移行、インシデントコマンダーへの変更点。
- Links to the incident's overview page in App.
- インシデント専門チームへの参加リンク。

Microsoft Teams アプリがインストールされたら、**Incident Settings** ページに移動できます。ここから、**Incident Updates** Channel セクションまでスクロールダウンし、セットアップフローを開始することができます。

#### インシデントチャンネルの設定方法

1. [Incidents Settings][304] に移動します。
2. Microsoft Teams セクションで、接続している Microsoft Teams テナントを選択します。
3. **Automatically create a Microsoft Teams channel for every incident** (インシデントごとに Microsoft Teams チャンネルを自動的に作成する) をオンに切り替えます。
4. 新しいチャンネルを自動的に作成するチームを選択します。
5. 設定を保存します。

{{< img src="integration/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Microsoft Teams インシデント更新チャンネル設定" >}}

[301]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[302]: https://docs.datadoghq.com/ja/help/
[303]: https://app.datadoghq.com/integrations/microsoft-teams
[304]: https://app.datadoghq.com/incidents/settings#Integrations
[305]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[306]: https://learn.microsoft.com/en-us/graph/permissions-reference
[307]: https://docs.datadoghq.com/ja/dashboards/scheduled_reports/
[308]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[309]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[3010]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3011]: https://learn.microsoft.com/en-us/graph/permissions-overview
{{< /site-region >}}


## 収集されたデータ

### メトリクス

Microsoft Teams インテグレーションは、メトリクスを提供しません。

### イベント

Microsoft Teams インテグレーションには、イベントは含まれません。

### サービスチェック

Microsoft Teams インテグレーションには、サービスのチェック機能は含まれません。

## 権限

Microsoft Teams インテグレーションは、追加されたチームに対して次の権限を受け取ります。詳細は、[Microsoft アプリの権限リファレンス][978]を参照してください。

| 権限の説明                                                                                                                                                                    | リクエスト理由                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 私が提供するメッセージとデータを受信します。                                                                                                                                           | ユーザーは、Datadog アプリと個人チャットでやり取りすることができます。                                    |
| 私にメッセージや通知を送信します。                                                                                                                                                       | ユーザーは、Datadog アプリと個人チャットでやり取りすることができます。                                    |
| 名前、メールアドレス、会社名、使用言語など、私のプロフィール情報にアクセスします。                                                                                       | Datadog UI 内で Microsoft Teams の通知やワークフローを構成することができます。 |
| チームやチャットのメンバーがチャンネルやチャットで提供するメッセージやデータを受信します。                                                                                                   | ユーザーは、@Datadog コマンドを通して Datadog とやり取りすることができます。                                   |
| チャンネルやチャットでメッセージや通知を送信します。                                                                                                                                     | 構成されたターゲットに Datadog 通知を送信します。                                            |
| チームやチャットの情報 (チーム名やチャット名、チャンネルリスト、名簿 (チームやチャットメンバーの名前やメールアドレスを含む)) にアクセスし、それを使って連絡を取ることができます。 | ユーザーが Datadog 内で Microsoft Teams の通知やワークフローを構成できるようにします。        |


{{< site-region region="us,us3,us5,eu,ap1" >}}

Microsoft Teams インテグレーションで Incident Management 機能を使用するには、追加の権限が必要です。これらはテナント全体に対する権限を持つユーザーによって承認される必要があります (詳細な手順は [Microsoft Teams の Datadog Incident Management: アカウントのセットアップ](#account-setup) を参照)。
これらの権限の詳細は、[Microsoft Graph の権限リファレンス][976]を参照してください。
{{< tabs >}}
{{% tab "アプリケーション権限を使用する場合" %}}
<table>
  <tr>
    <td style="width:40%;"><strong>API / 権限名</strong></td>
    <td style="width:15%;"><strong>種類</strong></td>
    <td><strong>リクエスト理由</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>Datadog Incident Management を使用してインシデントを管理・復旧するためにチャネルを作成します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete.All</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>指定した期間後にインシデント チャネルを自動アーカイブします。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>インシデント チャネルからインシデント タイムラインへ、タイムライン メッセージを自動同期します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>Datadog Incident Management を使用してインシデントを復旧するため、チャネルを作成および変更します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Directory.Read.All</code>,<code>GroupMember.Read.All</code></td>
    <td style="width:15%;">アプリケーション権限</td>
    <td>Datadog Incident Management の構成時に、チーム名およびチャネル名のオート コンプリート候補を提供します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Create</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>Datadog アプリ用にチーム内にタブを作成します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>OnlineMeetings.ReadWrite</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリ用にチーム内で会議を自動作成します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.
    ReadWriteSelfForTeam</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリがチームのメンバーであるかどうかを確認できるようにします。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>チャネルに Datadog タブが作成されているかどうかを確認します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Microsoft Teams アカウントを対応する Datadog アカウントに接続するため、サインイン中のユーザーに関する詳細を提供します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデントを更新または作成した Microsoft Teams ユーザーの名前を表示します。</td>
  </tr> 
  <tr>
    <td style="width:40%;"><code>Team.ReadBasic.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデント設定ページに、サービス アカウントがメンバーであるチームを表示します。</td>
  </tr>
</table>
{{% /tab %}}

{{% tab "委任された権限を使用する場合" %}}

<table>
  <tr>
    <td style="width:40%;"><strong>API / 権限名</strong></td>
    <td style="width:15%;"><strong>種類</strong></td>
    <td><strong>リクエスト理由</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog Incident Management を使用してインシデントを管理・復旧するためにチャネルを作成します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>指定した期間後にインシデント チャネルを自動アーカイブします。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデント チャネルからインシデント タイムラインへ、タイムライン メッセージを自動同期します。</td> 
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog Incident Management を使用してインシデントを復旧するため、チャネルを作成および変更します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Create</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリ用にチーム内にタブを作成します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>OnlineMeetings.ReadWrite</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリ用にチーム内で会議を自動作成します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.
    ReadWriteSelfForTeam</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリがチームのメンバーであるかどうかを確認できるようにします。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>チャネルに Datadog タブが作成されているかどうかを確認します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Microsoft Teams アカウントを対応する Datadog アカウントに接続するため、サインイン中のユーザーに関する詳細を提供します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデントを更新または作成した Microsoft Teams ユーザーの名前を表示します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.ReadBasic.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデント設定ページに、サービス アカウントがメンバーであるチームを表示します。</td>
  </tr>
</table>

{{% /tab %}}
{{< /tabs >}}

[971]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[972]: https://docs.datadoghq.com/ja/help/
[973]: https://app.datadoghq.com/integrations/microsoft-teams
[974]: https://app.datadoghq.com/incidents/settings#Integrations
[975]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[976]: https://learn.microsoft.com/en-us/graph/permissions-reference
[977]: https://docs.datadoghq.com/ja/dashboards/scheduled_reports/
[978]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[979]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[9710]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/

{{< /site-region >}}


## トラブルシューティング

### SSO の使用

次の手順を使用して、新しいチャンネルコネクターを設定します。

1. Datadog にログインし、セットアップ手順 1 および 2 を完了します。

2. セットアップ手順 3 で MS Teams ページから Datadog にリダイレクトされたら、新しいタブを開き、SSO で Datadog にログインします。次に、セットアップ手順 4 を個別に実行します。

### インテグレーションタイルにチームが表示されないのはなぜですか？


{{< site-region region="us,us3,us5,eu,ap1" >}}
Datadog にテナントを追加する前にボットをチームに追加した場合、Datadog はチームが存在することを認識するためのチーム参加イベントを受信できていません。
次のいずれかを試してください:

- そのチームの任意の標準チャンネルに `@Datadog sync` を投稿して、チームの標準チャンネルを Datadog と同期します。

1. 同期したい Team 内の標準チャンネルに移動します。
2. そのチャンネルで投稿を開始します。
3. チャンネルに `@Datadog sync` を投稿し、操作が成功したことを示す確認メッセージがスレッドに表示されるのを待ちます。

- Remove the Datadog app from the team, then add it back again. **Note**: This removes configured connectors for that team. Perform this action only when you are ready to migrate all connectors for that team to Datadog's tenant-based integration:

1. 左サイドバーのチーム名の横にある 3 つの点をクリックします。
2. **Manage Team** をクリックします。
3. **Apps** というラベルの付いたタブに移動します。
4. Datadog アプリの横にある 3 つの点をクリックします。
5. **Remove** をクリックします。
6. [セットアップ手順][951]に従って Datadog アプリを追加し直します。

[951]: https://docs.datadoghq.com/ja/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}



{{< site-region region="gov" >}}
If you added the bot to the team before adding the tenant to Datadog, then Datadog would have missed the team join event to know that the team exists.
You can:

- Synchronize your team standard channels to Datadog by posting `@Datadog for Government sync` on any standard channel for that team:

1. 同期したい Team 内の標準チャンネルに移動します。
2. そのチャンネルで投稿を開始します。
3. Post `@Datadog for Government sync` to the channel and wait for a confirmation message in the thread indicating the operation's success.

- Remove the Datadog for Government app from the team, then add it back. **Note**: This removes configured connectors for that team. Perform this action only when you are ready to migrate all connectors for that team to Datadog's tenant-based integration.

1. 左サイドバーのチーム名の横にある 3 つの点をクリックします。
2. **Manage Team** をクリックします。
3. **Apps** というラベルの付いたタブに移動します。
4. Click the three dots next to the Datadog for Government app.
5. **Remove** をクリックします。
6. [セットアップ手順][941]に従って Datadog for Government アプリを追加し直します。

[941]: https://docs.datadoghq.com/ja/integrations/microsoft_teams/?tab=datadogapprecommended#setup&site=gov

{{< /site-region >}}


### プライベートチャンネルはボットでサポートされていますか？

[Microsoft Teams][1] のプライベート チャネルの制限により、プライベート チャネルはボットではサポートされていません。プライベート チャネルに通知を送信したい場合は、[Microsoft Workflows Webhooks][2] を参照してください。


{{< site-region region="us,us3,us5,eu,ap1" >}}

### Are multiple user mentions supported in monitor notifications?

Yes, you can include multiple user mentions in a single notification to ensure all relevant team members are notified.

**Example**: `@teams-handle <at>user1@microsoft.com</at> <at>user2@microsoft.com</at> <at>user3@microsoft.com</at>`

<div class="alert alert-warning">When multiple user mentions are included in a notification and one is invalid, the valid users will still receive notifications, but invalid user mentions may cause the mentions to appear out of order.</div>

{{< /site-region >}}



{{< site-region region="gov" >}}

### Is the Datadog for Government app supported in GCC or GCC High?

Currently, the Datadog for Government app only supports Datadog US1-FED customers who are trying to connect to their `commercial` Microsoft Teams tenant. GCC and GCC High tenants are not supported by the app.
{{< /site-region >}}


### Why isn't an incident feature working when using delegated permissions?
First, ensure that the service account user is a member of the team that the feature is being used in.
- If incident tab is not being created, ensure that you have allowed members to create, update, and remove tabs in channels in that team.
- If new incident channels are not being created or renamed, ensure that you have allowed members to create and update channels in that team.
- If incident channels are not being archived, ensure that you have allowed members to delete and restore channels in that team.

Lastly, it is possible that the delegated user's token has expired or been revoked. If that's the case, re-connect the delegated user.

### Why am I getting prompted to check my app configuration when trying to declare an incident?
In order to use the new incident declaration experience, ensure the following:
- アプリのバージョンが 3.1.23 以上であること。[アプリのバージョンを更新する][3]方法をご覧ください。
- If you're using application permissions, ensure you have granted the `TeamsTab.Create` application permission
- If you're using delegated permissions, ensure you have granted the `TeamsTab.Create` and `TeamsTab.Read.All` delegated permissions.
- If you're using delegated permissions, ensure that the service account is a member of the team you're running the `@Datadog incident` command in.

You can also use the new incident declaration experience by clicking the `+` sign at the top of a channel and searching for the Datadog app.

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[2]: https://docs.datadoghq.com/ja/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[3]: https://support.microsoft.com/en-us/office/update-an-app-in-microsoft-teams-3d53d136-5c5d-4dfa-9602-01e6fdd8015b
[4]: https://docs.datadoghq.com/ja/help/