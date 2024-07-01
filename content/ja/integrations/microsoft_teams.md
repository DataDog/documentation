---
"categories":
- collaboration
- notifications
"custom_kind": "integration"
"dependencies": []
"description": "Be notified of Datadog alerts and events in Microsoft Teams."
"doc_link": "https://docs.datadoghq.com/integrations/microsoft_teams/"
"draft": false
"git_integration_title": "microsoft_teams"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Teams"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "microsoft_teams"
"public_title": "Datadog-Microsoft Teams Integration"
"short_description": "Be notified of Datadog alerts and events in Microsoft Teams."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Integrate with Microsoft Teams to:

- Be notified of Datadog alerts and events in Microsoft Teams.
- Manage incidents from within Microsoft Teams.

## Send monitor notifications to a Microsoft Teams channel

### Setup

Connect your Microsoft tenant to Datadog.

1. In Datadog, navigate to [**Integrations > Microsoft Teams**][1].
2. Click **Add Tenant**, which redirects you to Microsoft. 
3. Follow the prompts and click **OK**.

Ensure you have added the Datadog app to all teams in which you want to receive Datadog notifications.

1. In the left sidebar in Microsoft Teams, click **Apps** and search for the Datadog app.
2. Next to the **Add** button, click the drop-down arrow, then click **Add to a team**.
3. Select the team in which you want to receive Datadog notifications.
4. Click **Set up a bot**.

Once the bot has been added to the team, configure the notification handle in Datadog.

1. Under a configured tenant, click **Add Handle**. Give the handle a name, select the desired team and channel from the drop-down menus, and click **Save**.

### Connector setup (legacy)

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

Note: If you have the same `@teams-<HANDLE>` notification handle name configured in both the modern and legacy configuration, notifications will be sent using the modern configuration by default. You can utilize this behavior to override legacy handles already configured in Datadog monitors to upgrade them to the modern configuration. 

## Datadog Incident Management in Microsoft Teams

### Account setup

First, install the Datadog App in Microsoft Teams: 

1. Open Microsoft Teams.
2. In the vertical toolbar, click **Apps**.
3. Search for "Datadog" and click on the tile.
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

Datadog for Microsoft Teams requires the following permissions. For more information, see the [Microsoft Graph permission reference][6].

| API / Permissions name               | Type        | Request Reason                                                                                  |
|--------------------------------------|-------------|-------------------------------------------------------------------------------------------------|
| `ChannelSettings.ReadWrite.All`      | Application | Create and modify channels to remediate incidents using Datadog Incident Management. |
| `GroupMember.Read.All`               | Application | Provides team and channel name auto-complete suggestions for Datadog Incident Management configuration.        |
| `Team.Create`                        | Application | Create teams to manage and remediate incidents using Datadog Incident Management.               |
| `TeamMember.ReadWrite.All`           | Application | Add users to Teams to manage incidents with Datadog Incident Management. |
| `TeamsAppInstallation.ReadWrite.All` | Application | Adds the Datadog App to teams created by Datadog Incident Management.  |
| `TeamSettings.ReadWrite.All`         | Application | Keeps Datadog Incident Management up to date with the state of incident teams.            |

## Troubleshooting

### Using SSO

Use the following steps to set new channel connectors:

1. Login to Datadog, then complete setup steps 1 and 2.

2. After setup step 3 redirects you to Datadog from the MS Teams page, open a new tab and log into Datadog with your SSO. Then perform setup step 4 separately.

Need help? Contact [Datadog support][7].

[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://docs.datadoghq.com/monitors/notifications/#notification
[3]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[4]: https://docs.datadoghq.com/dashboards/scheduled_reports/
[5]: https://app.datadoghq.com/incidents/settings#Integrations
[6]: https://learn.microsoft.com/en-us/graph/permissions-reference
[7]: https://docs.datadoghq.com/help/

