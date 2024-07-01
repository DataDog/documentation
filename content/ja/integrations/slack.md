---
"aliases":
- "/integrations/hipchat/"
"categories":
- "collaboration"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"description": "Send Datadog alerts and graphs to your team's Slack channel."
"doc_link": "https://docs.datadoghq.com/integrations/slack/"
"draft": false
"git_integration_title": "slack"
"has_logo": true
"integration_id": ""
"integration_title": "Slack"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "slack"
"public_title": "Datadog-Slack Integration"
"short_description": "Send Datadog alerts and graphs to your team's Slack channel."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect Slack to Datadog to help your team collaborate by:

- Sharing graphs in private or public Slack channels.
- Receiving alerts and notifications from Datadog within Slack.
- Muting triggering monitors and declaring incidents from Slack.
- Automatically unfurling links to display a preview for log events, traces, and dashboard widgets.

## Setup

{{< tabs >}}

{{% tab "Datadog for Slack" %}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    <a href="https://www.datadoghq.com/blog/datadog-slack-app/">Datadog for Slack</a> is not available for the {{< region-param key="dd_site_name" >}} site. To send notifications to Slack on the US1-FED site, use the Slack webhook (Legacy).
</div>
{{% /site-region %}}

### Install the Datadog app in your Slack workspace

1. In the [Slack integration tile][1], click **Configuration**, then click **Connect Slack Account**.
2. Click **Allow** to grant Datadog permission to access your Slack workspace. You may need your Slack workspace admin to approve this change. See [Permissions][2] for a breakdown of the app's permissions and the reasons for requesting those permissions.

### Configure which Slack channels can receive notifications

1. Use the [Slack integration tile][1] to configure which Slack channels can receive notifications from Datadog.
2. To configure a **private channel**, the Datadog app must be a member of that channel. Navigate to the channel in Slack and use `/invite @Datadog` to ensure the Datadog app is a member. Upon completing this step, the channel will be automatically added to the [Slack integration tile][1]. 

Once the Slack integration is installed, you can use the `/datadog` command in any Slack channel. The available actions change depending on the channel you're in. Use `/datadog help` to view all available commands. You can also use the `/dd` alias to run `/datadog` commands.


[1]: https://app.datadoghq.com/integrations/slack
[2]: https://docs.datadoghq.com/integrations/slack#permissions
{{% /tab %}}

{{% tab "Slack Webhook (Legacy)" %}}

### Installation

Use the [Slack integration tile][1] on the Datadog site to install the integration.

### Configuration

1. In your Slack account, go to the [Datadog (Legacy) app][2].
2. Click **Install** > **Add Integration**, then copy the Slack **Webhook URL**.
3. On the [Slack integration tile][1], click **Configuration**, then click **Add Account**.
4. Enter a **Slack Account Name** of your choice.
5. Paste the webhook URL in the **Slack Account Hook** field.
6. Click **Save**.
7. Add your Slack **Channels to post to**:
  {{< img src="integrations/slack/slack_configuration.png" alt="Slack configuration" >}}

You can also send notifications to Slack from [monitors][3] and [events][4].


[1]: https://app.datadoghq.com/integrations/slack
[2]: https://slack.com/apps/A0F7XDT7F-datadog-legacy
[3]: https://docs.datadoghq.com/monitors/notifications/
[4]: https://docs.datadoghq.com/service_management/events/explorer/notifications/
{{% /tab %}}
{{< /tabs >}}

## Monitors

With the Slack integration, you can receive monitor alerts and mute monitors directly from Slack. For detailed instructions on how to create monitors, see [Configuring Monitors][1]. To send monitor alerts to a Slack channel, invite Datadog to the channel first using the `/invite @Datadog` command.

### Notification messages

You can use the same rules, variables, and tags as standard Datadog [Notifications][2]. For example, this notification pings a team in a Slack channel called `infrastructure` when a monitor is renotifying:

```
CPU usage has exceeded {{warn_threshold}} on {{ @machine_id.name }}.
{{#is_renotify}}
Notifying @slack-infrastructure <!subteam^12345>
{{/is_renotify}}
```

#### Channels

To specify a Slack channel when configuring a notification message, type `@slack` in the monitor message box to see the available list of channels you can send the notification to.

**Note**: Trailing special characters in a channel name are not supported for Slack @-notifications. For example, `@----critical_alerts` works, but `@--critical_alerts--` does not.

#### @-mentions

Use the following commands to create @-mentions in notification messages:

**@users**
: command: `<@username>`
: Notify a Slack user using their Slack username. Their username can be found in their [Slack account settings][3] under **Username**. For example: `@slack-SLACK_CHANNEL <@USERNAME>`, or `@slack-SLACK_ACCOUNT-SLACK_CHANNEL <@USERNAME>`.

**@here**
: command: `<!here>`
: Notify every online member that is a part of the channel the alert is being sent to.

**@channel**
: command: `<!channel>`
: Notify every member that is a part of the channel the alert is being sent to.

**@usergroups**
: command: `<!subteam^GROUP_ID>`
: Notify every member belonging to a user group in Slack. For example, you would use `<!subteam^12345>` for a user group with an ID of `12345`. To find the `GROUP_ID`, navigate to **More** > **Your organization** > **People** > **User groups**. Select a user group, click the ellipsis, and select **Copy group ID**. You can also [query the `usergroups.list` API endpoint][4].

You can also use message template variables to dynamically build @-mentions. For example, if the rendered variable corresponds to a specific channel in Slack:

- `@slack-{{owner.name}}` sends notifications to the **#owner.name**'s channel.
- `@slack-{{host.name}}` sends notifications to the **#host.name** channel.

To create @-mentions that go to specific email addresses:

- `@team-{{team.name}}@company.com` sends an email to the team's mailing list.

### Monitor alerts in Slack

When a monitor alert is sent a Slack channel, it contains several fields:

- The notification message
- A snapshot (graph) of the query that triggered your monitor
- Related tags
- The names of the users or groups that were notified

To customize the content included in monitor alert messages in Slack, navigate to the [Slack integration tile][5]. For each channel, select or clear the checkbox for each monitor alert option.

{{< img src="integrations/slack/slack_monitor_options.png" alt="Monitor alert message options in the Slack integration tile" style="width:90%;" >}}

### Migrate monitors from Slack Webhook (Legacy) to Datadog for Slack

If your monitors are using the legacy Slack webhooks, there are two ways you can update your monitors to be sent from the Slack app:

- **Bulk upgrade**: Bulk upgrade all of your monitors by clicking the **Upgrade** button at the top of the configuration for each of your Slack accounts in the [Slack integration tile][5].
- **Individual upgrades**: Manually add channels to the new configuration in the [Slack integration tile][5]. You may need to remove duplicate references to the same channels.

## Dashboards

You can post dashboard widget snapshots to any Slack channel. For a list of supported widgets, see [Scheduled Reports][6].

To share a dashboard widget in Slack:

- In Datadog, hover over a dashboard widget and press `CMD + C` or `CTRL + C`, or click the  **Copy** button from the share menu, and then paste the link into Slack.
- In a Slack channel, send the `/datadog dashboard` or `/datadog` command, and then click the **Share Dashboard Widget** button.

**Note:** Slack recently introduced a new version of Workflow Builder that does not yet support third-party app integrations including Datadog.

{{< img src="integrations/slack/dashboard_share.mp4" alt="Sharing a dashboard widget in Slack" video="true" width=90% >}}

## Home Tab

Use the **Home** tab on the Datadog App in Slack to view your starred dashboards, notebooks, and services. You can also view a list of monitors that were triggered in the past 24 hours and their associated Slack channels. If you're a member of more than one Datadog account, filter the tab by switching between accounts.

{{< img src="integrations/slack/datadog_homepage.mp4" alt="Datadog homepage starring items and seeing triggered monitors" video="true" width=90% >}}

## Incidents

Anyone in your Slack org can declare an incident, regardless of whether they have access to Datadog. When a new incident is created, a corresponding Slack channel `#incident-(unique number ID)` is created, and a message is sent to the channel telling you the new incident channel to use. The channel topic changes with the incident.

### Incident commands

To declare a new incident from Slack:

```
/datadog incident 
```

To update the incident state (such as severity):

```
/datadog incident update
```

To list all open (active and stable) incidents:

```
/datadog incident list
```

To send the message to the Incident Timeline, use the message actions command (the three vertical dots that appear hovering over a message sent in an #incident channel).

{{< img src="integrations/slack/incidents2.png" alt="Slack configuration" style="width:60%;">}}

### Global incident updates channel

A global incident updates channel provides your team with organization-wide visibility into the status of all incidents directly from your Slack workspace. Select which channel in your workspace to post these updates to, and the channel receives the following posts: 

- Newly declared incidents.
- Changes to severity, status transition, and incident commander.
- Links to the [incident][7]'s overview page in app.
- Link to join dedicated incident Slack channels.

To set up a global incident updates channel:

1. In Datadog, navigate to the [**Incidents** > **Settings** > **Integrations**][8] page.
2. In the Slack section, click the **Send all incident updates to a global channel** toggle.
3. Select the Slack workspace and Slack channel where you want the incident updates to be posted.

#### Manage incident tasks

By using Slack actions and the `/datadog` Slack commands, you can create and manage incident tasks directly from Slack. Incident task commands must be used in an incident channel.

##### Slack actions

To create a task using Slack actions, hover over any message sent in an incident channel. On hover, three dots appear to the right of the message, allowing you to **Add Task to Incident**.

##### Slack commands

To create a task for an incident, use the `/datadog task` command. A modal appears that allows you to include a description of the task, assign teammates, and set a due date. 

To show a list of all tasks created for the incident, use the `/datadog task list` command. Use this list to mark tasks as complete or reopen them.

All tasks created can be managed on the **Remediation** tab of an incident. For more information, see [Incident Management][9].

## Enterprise Grid audit logs

Ingest events and actions that occur within your Slack Enterprise Grid.

### Start collecting Slack audit logs

Only owners of an Enterprise Grid organization may authorize Datadog to collect Slack audit logs.

1. On the [Slack integration tile][5], click the **Audit Logs** tab.
2. Click **Connect Enterprise Grid** to be redirected to Slack for authorization.

### Collected events and actions

- User management events, such as user creation, deletion, and updates. This includes changes to user roles, permissions, and profiles.
- Workspace and channel management events, including actions related to the creation, modification, and deletion of channels and workspaces. It also tracks changes in workspace settings and permissions.
- File and app management events, including tracking the upload, download, and deletion of files, as well as monitoring the installation, update, and removal of Slack apps and integrations.
- Security and compliance events, including login attempts, password changes, and two-factor authentication events, as well as compliance-related actions like data exports and access to sensitive information.
- Audit trail of administrative actions, including changes made by Slack admins and workspace owners, such as policy updates, security settings changes, and other administrative modifications.
- External sharing and collaboration events, including the creation of shared channels, external invitations, and guest account activities.

Each event captured provides detailed insights, including:

- Action: What activity was performed.
- Actor: The user in the workspace who generated the event.
- Entity: The thing the actor has taken action upon.
- Context: The location (workspace or enterprise) where the actor took action on the entity.

For more information, see the [official Slack documentation][10].

## Permissions

Datadog for Slack requires the following OAuth Scopes. See the [Slack permission scopes documentation][11] for more information.

### Bot Token Scopes

| Scopes                   | Request Reason                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `channels:join`          | Automatically join public channels configured in the Slack integration tile in Datadog.                        |
| `channels:manage`        | Create channels to manage and remediate incidents using Datadog Incident Management.                           |
| `channels:read`          | Provides channel name auto-complete suggestions in the Slack integration tile in Datadog.                      |
| `chat:write`             | Receive Datadog alerts and notifications in approved channels and conversations.                               |
| `commands`               | Enables the /datadog command, and its /dd alias, to perform actions in Datadog.                                |
| `groups:read`            | Provides channel name auto-complete suggestions for private channels in the Slack integration tile in Datadog. |
| `im:history`             | Allows Datadog to send messages to you in the Messages tab, for example, onboarding instructions.              |
| `im:read`                | Enables the /datadog command, and /dd alias, to perform actions in Datadog from direct messages.               |
| `im:write`               | Receive messages, prompts, and errors from the Datadog bot related to your Datadog account.                    |
| `links:read`             | Unfurls Datadog links in conversations with additional information like graphs and log samples.                |
| `links:write`            | Unfurls Datadog links in conversations with additional information like graphs and log samples.                |
| `mpim:read`              | Enables the /datadog command, and /dd alias, to perform actions in Datadog from group direct messages.         |
| `reactions:write`        | Adds an emoji reaction to messages that have been added to an incident timeline by shortcut.                   |
| `team:read`              | Keep the Slack integration tile in Datadog up to date with the state of your workspace.                        |
| `users:read`             | Perform actions from Slack as a Datadog user associating with Datadog account.                                 |
| `users:read.email`       | Adding messaging and users for incidents created outside of Slack in Datadog.                                  |
| `workflow.steps:execute` | Automatically send messages with Datadog dashboard widgets from a Slack Workflow Step.                         |

### Optional Bot Token Scopes

Datadog for Slack offers features that require enabling additional optional Bot Token Scopes. These scopes are added dynamically based on feature enablement and are not added during the initial installation.

| Scopes              | Request Reason                                                                               |
|---------------------|----------------------------------------------------------------------------------------------|
| `channels:history`  | Automatically sync messages from an incident channel to the incident timeline.               |
| `groups:write`      | Create private channels to manage and remediate incidents using Datadog Incident Management. |
| `pins:write`        | Create pins in incident channels for relevant Datadog incident links and resources.          |
| `bookmarks:write`   | Bookmark important links in an incident channel during the response process.                  |
| `bookmarks:read`    | Edit bookmarks for important links when they change.                                          |

### User Token Scopes

| Scopes   | Request Reason                                                            |
|----------|---------------------------------------------------------------------------|
| `openid` | Perform actions in Datadog from Slack by connecting your Datadog account. |


### Optional User Token Scopes

Datadog for Slack offers features that require enabling additional optional User Token Scopes. These scopes are added dynamically based on feature enablement and are not added during the initial installation.

| Scopes           | Request Reason                                                    |
|------------------|-------------------------------------------------------------------|
| `auditlogs:read` | Collect enterprise grid audit logs to view in Datadog Cloud SIEM. |

## Data Collected

### Metrics

The integration for Slack does not provide any metrics.

### Events

The integration for Slack does not include any events.

### Service Checks

The integration for Slack does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][12].

[1]: https://docs.datadoghq.com/monitors/configuration/
[2]: https://docs.datadoghq.com/monitors/notifications/
[3]: http://slack.com/account/settings
[4]: https://api.slack.com/methods/usergroups.list
[5]: https://app.datadoghq.com/integrations/slack
[6]: https://docs.datadoghq.com/dashboards/scheduled_reports/
[7]: https://app.datadoghq.com/incidents
[8]: https://app.datadoghq.com/incidents/settings#Integrations
[9]: https://docs.datadoghq.com/service_management/incident_management/
[10]: https://api.slack.com/admins/audit-logs-call
[11]: https://api.slack.com/scopes
[12]: https://docs.datadoghq.com/help/

