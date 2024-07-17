---
categories:
- コラボレーション
- notifications
custom_kind: integration
dependencies: []
description: Microsoft Teams で Datadog アラートとイベントの通知を受信
doc_link: https://docs.datadoghq.com/integrations/microsoft_teams/
draft: false
git_integration_title: microsoft_teams
has_logo: true
integration_id: ''
integration_title: Microsoft Teams
integration_version: ''
is_public: true
manifest_version: '1.0'
name: microsoft_teams
public_title: Datadog-Microsoft Teams インテグレーション
short_description: Microsoft Teams で Datadog アラートとイベントの通知を受信
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Microsoft Teams と統合して、以下のことができます。

- Microsoft Teams で Datadog アラートとイベントの通知を受信
- Microsoft Teams の中からインシデントを管理することができます。

## Microsoft Teams チャンネルへのモニター通知の送信

### セットアップ

Microsoft のテナントを Datadog に接続します。

1. Datadogで、[**Integrations > Microsoft Teams**][1] の順に移動します。
2. **Add Tenant** をクリックすると、Microsoft に移動します。
3. 画面の指示に従って、**OK** をクリックします。

Datadog 通知を受信させたいすべてのチームに Datadog アプリが追加されていることを確認します。

1. Microsoft Teams の左サイドバーで、**Apps** をクリックし、Datadog アプリを検索します。
2. **Add** ボタンの横にあるドロップダウン矢印をクリックし、**Add to a team** をクリックします。
3. Datadog 通知を受信させたいチームを選択します。
4. **Set up a bot** をクリックします。

ボットをチームに追加したら、Datadog で通知ハンドルを構成します。

1. 構成されたテナントの下で、**Add Handle** をクリックします。ハンドルに名前を付け、ドロップダウンメニューから希望のチームとチャンネルを選択し、**Save** をクリックします。

### コネクターのセットアップ (レガシー)
<div class="alert alert-info">
Legacy notification handles will not be affected by the new setup <em>unless</em> you use the same <code>@teams-HANDLE_NAME</code>, in which case the new configuration will override the legacy configuration.
</div>

1. Choose the `...` button next to the channel name in the list of channels and then choose **Connectors**.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams step 1" >}}

2. Search for Datadog and click **Configure**.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams step 2" >}}

3. In the connector configuration modal, copy the webhook URL.
4. In Datadog, navigate to [**Integrations > Microsoft Teams**][1].
5. On the Configuration tab, click **Add Handle**, give the handle a name, and paste the webhook URL.
6. In the connector configuration modal, click **Save**.

### Usage

From a Datadog monitor, send a notification to Microsoft Teams using the [`@-notification` feature][2]. Send the notification to the address `@teams-<HANDLE>`, replacing `<HANDLE>` with the name of your Microsoft Teams handle.

## Microsoft Teams における Datadog Incident Management

### アカウント設定

まず、Microsoft Teams に Datadog アプリをインストールします。

1. Microsoft Teams を開きます。
2. 垂直ツールバーの **Apps** をクリックします。
3. "Datadog" を検索し、タイルをクリックします。
4. Click **Add** to install the Datadog App. Next to the "Add" button, open the dropdown and select **Add to a team**.

{{< img src="integrations/microsoft_teams/microsoft_teams_install_datadog_in_teams_v2.png" alt="Datadog install app tile in Microsoft Teams" >}}

5. On the dropdown menu, select the team that the App should be added to, then click **Set Up** to complete the installation. 


Next, connect your Microsoft tenant to Datadog:

1. In Datadog, navigate to the [Microsoft Teams Integration Tile][1].
2. Click **Add Tenant**, which redirects you to Microsoft.
3. Follow the prompts and click **OK**.

Some Datadog Incident Management features need permission to perform actions on your tenant, for example, creating a new 
team for an incident. You need someone who is authorized to consent on behalf of the Microsoft organization to 
grant tenant-wide admin consent, such as a user assigned the *Global Admin* role. View [Microsoft Entra ID documentation][3] for more 
information on who can grant tenant-wide admin consent to the Datadog application.

To grant consent:

1. Navigate to the [Microsoft Teams Integration Tile][1] in Datadog.
2. For the tenant in which you want to use Incident Management, click the gear icon on the right-hand side. 
3. Click **Authorize Tenant**, which redirects you to Microsoft. A user who can grant tenant-wide admin consent must perform this step. Note that the Microsoft user does not need to have a Datadog account.
4. Follow the prompts and click **OK**.

### User setup

Performing actions in Datadog from Microsoft Teams requires you to connect your Datadog and Microsoft Team accounts.

To connect your account from Microsoft Teams:

1. Open Microsoft Teams.
2. Start a chat with the Datadog bot by clicking on the `...` button in the vertical toolbar and selecting Datadog.
3. Type "accounts" and hit enter.
   {{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Connect accounts from Microsoft Teams" >}}

4. The Datadog bot will respond with instructions on how to connect your accounts. Click **Connect Datadog Account**.
5. The Datadog bot will then send a message containing a link to connect your accounts. Click the link and follow the prompts.
6. You will be redirected back to the [Microsoft Teams Integration Tile][1]. 
7. Create an application key by clicking **Create** in the prompt on the [Microsoft Teams Integration Tile][1].


You can also connect your accounts from Datadog:

1. In Datadog, navigate to the [Microsoft Teams Integration Tile][1].
2. Click **Connect** in the tenant listed.
3. Follow the prompts and click **OK**.
5. From the [Microsoft Teams Integration Tile][1], create an application key by clicking **Create** in the above prompt.

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Connect accounts from Datadog Microsoft Teams integration tile" >}}

### Usage

#### Dashboards

You can post dashboard widget snapshots on any team or chat. For a list of supported widgets, see [Scheduled Reports][4].

To share a dashboard widget in Teams:

1. In Datadog, hover over a dashboard widget and press `CMD + C` or `CTRL + C`, or click the **Copy** button from the share menu.
1. Paste the link into Teams.

{{< img src="integrations/microsoft_teams/dashboard_share.png" alt="Sharing a dashboard widget in Microsoft Teams">}}

#### Incidents

To declare a new incident from Microsoft Teams:

1. Start a conversation in any team.
2. Type `@Datadog` or use the `...` button to open the **Messaging extensions** menu and select the **Datadog** App.
3. Select **Create an Incident**.
4. Complete the form with your desired information.
5. Click **Create**.

Anyone in your Microsoft Teams tenant can declare an incident, regardless of whether they have access to Datadog.

When a new incident is created, a corresponding team named `incident-(unique number ID)` is created.

To update an incident, follow a similar process as creation:

1. Start a conversation while in an incident team.
2. Type `@Datadog` or use the `...` button to open the **Messaging extensions** menu and select the **Datadog** App.
3. Select **Update Incident**.
4. Complete the form with your desired information.
5. Click **Update**.

List all open (active and stable) incidents with:

```
@Datadog list incidents
```

Use the "More actions" menu on any message inside an incident team on the far right to send that message to the incident Timeline.

#### Incident updates channel
Using an incident updates channel provides your stakeholders with organization-wide visibility into the status of all incidents directly from Microsoft Teams. Select which team and channel in your account to post these updates to, and the channel receives the following posts:

   - Newly declared incidents.
   - Changes to severity, status transition, and incident commander. 
   - Links to the incident's overview page in App. 
   - Link to join the dedicated incident team.

Once the Microsoft Teams App has been installed, you can navigate to the **Incident Settings** page. From this, you can scroll down to the **Incident Updates** Channel section and begin the set-up flow.

#### How to set up an incident channel:

1. Navigate to [Incidents Settings][5].
2. Under the Microsoft Teams section, select your connected Microsoft Teams tenant.
3. Toggle on **Automatically create a Microsoft Teams channel for every incident**.
4. Select the Team in which you want to automatically create new channels.
5. Save your settings.

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates_v2" alt="Microsoft Teams Incident Update Channel Settings." >}}

## Data collected

### Metrics

The Microsoft Teams integration does not provide any metrics.

### Events

The Microsoft Teams integration does not include any events.

### Service checks

The Microsoft Teams integration does not include any service checks.

## Permissions

The Microsoft Teams integration receives the following permissions for Teams it has been added to. For more information, see [Microsoft App permission reference][6].

| Permission description                                                                                                                                                                   | Request Reason                                                                           |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Receive messages and data that I provide to it.                                                                                                                                          | Users can interact with the Datadog app in personal chat.                                |
| Send me messages and notifications.                                                                                                                                                      | Users can interact with the Datadog app in personal chat.                                |
| Access my profile information such as my name, email address, company name, and preferred language.                                                                                      | Enable users to configure Microsoft Teams notifications/workflows within the Datadog UI. |
| Receive messages and data that team or chat members provide to it in a channel or chat.                                                                                                  | Users can interact with the Datadog app via @Datadog commands.                           |
| Send messages and notifications in a channel or chat.                                                                                                                                    | Send Datadog notifications to configured targets.                                        |
| Access information from this team or chat such as team or chat name, channel list and roster (including team or chat member's names and email addresses) - and use this to contact them. | Enable users to configure Microsoft Teams notifications/workflows within the Datadog UI. |


Additional permissions are needed to use Incident Management features in the Microsoft Teams integration. These must be authorized by a user with tenant-wide permissions (see [Datadog Incident Management in Microsoft Teams: Account setup](#Account-setup) for detailed instructions).
For more information on these permissions, see the [Microsoft Graph permission reference][7].

| API / Permissions name               | Type        | Request Reason                                                                                          |
|--------------------------------------|-------------|---------------------------------------------------------------------------------------------------------|
| `ChannelSettings.ReadWrite.All`      | Application | Create and modify channels to remediate incidents using Datadog Incident Management.                    |
| `GroupMember.Read.All`               | Application | Provides team and channel name auto-complete suggestions for Datadog Incident Management configuration. |
| `Team.Create`                        | Application | Create teams to manage and remediate incidents using Datadog Incident Management.                       |
| `TeamMember.ReadWrite.All`           | Application | Add users to Teams to manage incidents with Datadog Incident Management.                                |
| `TeamsAppInstallation.ReadWrite.All` | Application | Adds the Datadog App to teams created by Datadog Incident Management.                                   |
| `TeamSettings.ReadWrite.All`         | Application | Keeps Datadog Incident Management up to date with the state of incident teams.                          |


## Troubleshooting

### Using SSO

Use the following steps to set new channel connectors:

1. Login to Datadog, then complete setup steps 1 and 2.

2. After setup step 3 redirects you to Datadog from the MS Teams page, open a new tab and log into Datadog with your SSO. Then perform setup step 4 separately.

Need help? Contact [Datadog support][8].

[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[3]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[4]: https://docs.datadoghq.com/ja/dashboards/scheduled_reports/
[5]: https://app.datadoghq.com/incidents/settings#Integrations
[6]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[7]: https://learn.microsoft.com/en-us/graph/permissions-reference
[8]: https://docs.datadoghq.com/ja/help/