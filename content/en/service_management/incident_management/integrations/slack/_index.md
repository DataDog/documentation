---
title: Integrate Slack with Datadog Incident Management
further_reading:
- link: "integrations/slack/"
  tag: "Documentation"
  text: "Install the Slack Integration"
- link: "https://app.datadoghq.com/integrations/slack"
  tag: "App"
  text: "In-app Slack integration tile"
- link: "https://www.datadoghq.com/blog/slack-incident-management/"
  tag: "Blog"
  text: "Manage incidents seamlessly with the Datadog integration for Slack"
---

## Overview

Slack is a messaging and collaboration platform widely used by teams to communicate in real time. The Datadog Slack integration connects your incident response workflows directly to Slack, so teams can declare, manage, and resolve incidents without leaving their chat environment.

With the integration, you can:

- Respond faster by declaring and updating incidents directly from Slack.
- Collaborate in dedicated channels that sync messages and timelines across Slack and Datadog.
- Streamline workflows with automations for channel creation, message syncing, and notifications.

The Slack integration documentation is organized around the typical lifecycle of using Slack with Incident Management:

1. [**Install and connect Slack**](#setup): Set up the integration between your Slack workspace and Datadog.
2. [**Declare incidents**](#declaring-incidents-from-slack): Learn how to start incidents using Slack commands or message actions.
3. [**Manage incident channels**](#incident-channels): Use dedicated Slack channels with commands, syncing, and automations.
4. [**Configure global notifications**](#global-slack-notifications): Keep your organization informed with automatic updates.
5. [**Manage incident tasks**](#incident-tasks): Track, assign, and update tasks related to incidents directly from Slack channels.
5. **[Reference Slack configurations](#additional-slack-configurations) and [Slack commands](#slack-incident-commands)**: Explore detailed configuration options and see the full list of available Slack commands to tailor and streamline your incident response workflows.


<!-- ## Prerequisites -->
<!-- What permissions does the user need to be aware of to use this, can anyone enable Slack or do they need to be Admin? -->


## Setup

1. Install the integration through the [Slack Integration tile][1]. For more information, see the [Slack integration][20] documentation.
1. After the integration is installed, navigate to **[Service Management > Incidents > Settings > Integrations][2]**.
1. Select the Slack integration.
1. Toggle **Create Slack channels for incidents** to enable the Slack feature for Incident Management.

## Declaring incidents from slack

When you connect a Slack workspace to a Datadog organization, users in the workspace can use slash commands and shortcuts related to Incident Management. To allow any Slack user or non-guest Slack user to declare incidents in your Slack workspace, enable **Allow Slack users to declare incidents without a connected Datadog account** in Incident Management settings.

To declare an incident from a Slack message, hover over the message, click **More actions** (the three vertical dots), and select **Declare incident**. Datadog posts a message to the original thread confirming the incident's creation.

Anyone in your Slack organization can declare an incident, regardless of whether they have access to Datadog. When a new incident is created, a corresponding Slack channel `#incident-(unique number ID)` is created, and a message is sent to the channel telling you the new incident channel to use. The channel topic changes with the incident.

You can also declare an incident with the following slash command:
```
/datadog incident
```

For a full list of channel commands, see the [Incident channel commands](#incident-channel-commands) section.

## Incident channels

You can configure Incident Management to automatically create a dedicated Slack channel for each incident that meets your defined criteria.

After you enable this automation, you can define a **channel name template** for Datadog to follow when creating the channel. The following variables are available in channel name templates.

### Channel name templates

You can define a template for Datadog to follow when creating the channel name. The following variable are available:

* `{{public_id}}`: Incident's numeric ID
* `{{title}}`: Incident's title
* `{{created}}`: Incident's creation date in format MM_DD_YYYY
* `{{yyyy}}`: Incident's four-digit creation year
* `{{mm}}`: Incident's two-digit creation month
* `{{dd}}`: Incident's two-digit creation day of month
* `{{random_adjective}}`: Random adjective
* `{{random_noun}}`: Random noun

### Incident channel commands

You can run the slack commands to manage the incident from within the incident Slack channel. Commands allow you to make an incident private, or paging the associated On-call team. For a full list of channel commands, see the [Incident channel commands](#incident-channel-commands) section.

### Channel message syncing

Configure Incident Management to automatically push all messages from the incident Slack channel to the Datadog incident timeline. Alternatively, you can sync a message only when a user adds a pushpin (📌) reaction to it.

Any Slack user can author a synced message, and the message is still recorded in the incident timeline. For organizations with usage-based billing, these authors are not counted as monthly active users.

### Global incident updates channel

A global incident updates channel provides your team with organization-wide visibility into the status of all incidents directly from your Slack workspace. Select which channel in your workspace to post these updates to, and the channel receives the following posts:

- Newly declared incidents.
- Changes to severity, status transition, and incident commander.
- Links to the [incident][11]'s overview page in app.
- Link to join dedicated incident Slack channels.

To set up a global incident updates channel:

1. In Datadog, navigate to the [**Incidents** > **Settings** > **Integrations**][2] page.
2. In the Slack section, click the **Send all incident updates to a global channel** toggle.
3. Select the Slack workspace and Slack channel where you want the incident updates to be posted.


## Incident tasks

By using Slack actions and the `/datadog` Slack commands, you can create and manage incident tasks directly from Slack. Incident task commands must be used in an incident channel.

To create a task using Slack actions, hover over any message sent in an incident channel. On hover, three dots appear to the right of the message, allowing you to **Add Task to Incident**.

To send the message to the Incident Timeline, use the message actions command (the three vertical dots that appear hovering over a message sent in an #incident channel).

{{< img src="integrations/slack/incidents2.png" alt="Slack configuration" style="width:60%;">}}

To show a list of all tasks created for the incident, use the following slack command to list tasks and to mark tasks as complete or reopen them.

```
/datadog task list
```
For a full list of channel commands, see the [Incident channel commands](#incident-channel-commands) section.


## Additional Slack configurations

Access all configuration options for Slack in Incident Management through the [**Incidents** > **Settings** > **Integrations**][2] page.


| Feature                                                                 | Description & Notes                                                                                                                                                                                                                                                                         |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Push Slack channel messages to the incident timeline**                 | Mirror messages from the incident Slack channel into the Datadog incident timeline.<br><br>Options: mirror all messages in real-time, or push only pinned (📌) messages.<br>Images supported (reauthorization required).                                                                   |
| **Push incident timeline messages to Slack**                             | Automatically send incident timeline updates from Datadog to the Slack channel.<br><br>Keeps channel participants in sync with Datadog updates.                                                                                                                                            |
| **Add important links to channel bookmarks**                             | Post incident-related links in the Slack channel bookmarks.<br><br>Provides quick access to resources.                                                                                                                                                |
| **Add team members automatically**                                       | When a Datadog team is added to the incident, its members are added to the Slack channel.<br><br>Based on emails in Datadog Teams.                                                                                                                   |
| **Send incident updates to the Slack channel**                           | Update the channel topic and post updates when state, severity, or responders change.<br><br>Keeps channel metadata aligned with incident status.                                                                                                    |
| **Send a Slack notification when a meeting starts**                      | Notify the Slack channel when a meeting is started, with participants and a join link.<br><br>Enables quick access to incident calls.                                                                                                                |
| **Activate Bits AI in incident Slack channels**                          | Enable AI features that use incident context from Datadog.<br><br>Applies to all incident types in the selected Slack workspace.                                                                                                                     |
| **Send incident updates to a global channel**                            | Post updates (state, severity, title, commander changes) to a designated Slack channel.<br><br>Alternative: use Notification Rules for more customization.                                                                                           |
| **Allow Slack users to declare incidents without a Datadog account**     | Let any non-guest Slack user declare incidents in the workspace.<br><br>Controlled in Incident Management settings.                                                                                            |
| **Automatically archive Slack channels after resolution**                | Close out incident Slack channels once the incident is resolved.<br><br>Helps reduce channel clutter.                                                                                                         |

## Slack incident commands

You can view the full list of available Slack commands at any time by typing `/dd help` or `/datadog help` in Slack. This will open the command reference directly in your Slack workspace. To open the action tray for common incident management actions, type `/datadog`.
<!-- 

| Command                          | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| `/datadog` or `/dd`              | Open the incident action tray for common incident management actions        |
| `/datadog incident`              | Declare a new incident                                                      |
| `/datadog incident test`         | Declare a new test incident (if test incidents are enabled)                 |
| `/datadog incident list`         | List all open (active and stable) incidents                                 |
| `/datadog incident update`       | Update the incident state (for example, severity)                           |
| `/datadog incident notify`       | Notify @-handles about the incident                                         |
| `/datadog incident private`      | Make the incident private (if private incidents are enabled)                |
| `/datadog incident responders`   | Manage the incident's response team                                         |
| `/datadog task`                  | Create a new incident task                                                  |
| `/datadog task list`             | List the incident's tasks                                                   |
 -->

<table>
  <thead>
    <tr>
      <th scope="col">Category</th>
      <th scope="col">Command</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <!-- Declare an incident -->
    <tr>
      <td rowspan="4">Declare an incident</td>
      <td><code>/datadog</code></td>
      <td>Open the incident action tray to perform common actions.</td>
    </tr>
    <tr>
      <td><code>/datadog incident</code></td>
      <td>Declare a new incident.</td>
    </tr>
    <tr>
      <td><code>/datadog incident test</code></td>
      <td>Declare a new test incident (if test incidents are enabled for the incident type).</td>
    </tr>
    <tr>
      <td><code>/datadog incident list</code></td>
      <td>List all open (active and stable) incidents.</td>
    </tr>
    <!-- Manage incident channels -->
    <tr>
      <td rowspan="4">Manage incident channels</td>
      <td><code>/datadog incident update</code></td>
      <td>Update the incident state (for example, severity).</td>
    </tr>
    <tr>
      <td><code>/datadog incident notify</code></td>
      <td>Notify <code>@</code>-handles about the incident.</td>
    </tr>
    <tr>
      <td><code>/datadog incident private</code></td>
      <td>Make the incident private (if private incidents are enabled).</td>
    </tr>
    <tr>
      <td><code>/datadog incident responders</code></td>
      <td>Manage the incident's response team (add responders and manage types).</td>
    </tr>
    <!-- Manage incident tasks -->
    <tr>
      <td rowspan="2">Manage incident tasks</td>
      <td><code>/datadog task</code></td>
      <td>Create a new incident task.</td>
    </tr>
    <tr>
      <td><code>/datadog task list</code></td>
      <td>List existing incident tasks.</td>
    </tr>
  </tbody>
</table>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/slack/
[20]: /integrations/slack/?tab=datadogforslack
[2]: https://app.datadoghq.com/incidents/settings#Integrations
[3]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: /service_management/on-call/
[5]: /service_management/incident_management/incident_settings/notification_rules
[6]: /integrations/microsoft-teams/?tab=datadogapprecommended
[7]: /integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[8]: /integrations/pagerduty/
[9]: /integrations/opsgenie/
[10]: /coscreen
[11]: /integrations/jira/
[12]: /integrations/webhooks/
[13]: /integrations/webhooks/#sending-sms-through-twilio
[14]: /integrations/statuspage/
[15]: /integrations/servicenow/
[16]: /integrations/zoom_incident_management/