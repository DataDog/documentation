---
title: Integrate Slack with Datadog Incident Management
description: Manage Datadog incidents directly from Slack.
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

- Respond faster by declaring Datadog incidents directly from Slack.
- Automatically create Slack channels for collaboration when Datadog incidents are declared.
- Execute your incident response in Slack — page on-call teams, assign responder roles, update severity, and more.

The Slack integration documentation is organized around the typical lifecycle of using Slack with Incident Management:

1. [**Install and connect Slack**](#setup): Set up the integration between your Slack workspace and Datadog.
2. [**Declare incidents**](#declaring-incidents-from-slack): Learn how to start incidents using Slack commands or message actions.
3. [**Manage incident channels**](#incident-channels): Use dedicated Slack channels with commands, syncing, and automations.
4. [**Configure global notifications**](#global-slack-notifications): Keep your organization informed with automatic updates.
5. [**Manage incident tasks**](#incident-tasks): Track, assign, and update tasks related to incidents directly from Slack channels.
6. **[Reference Slack configurations](#additional-slack-configurations) and [Slack commands](#slack-incident-commands)**: Explore detailed configuration options and see the full list of available Slack commands to tailor and streamline your incident response workflows.

## Prerequisites

Install the Datadog Slack integration through the [Slack Integration tile][1]. For more information, see the [Slack integration][2] documentation.

After the integration is installed, navigate to **[Service Management > Incidents > Settings > Integrations][3]** to enable Slack capabilities for Incident Management.

## Declaring incidents from Slack

When you connect a Slack workspace to a Datadog organization, you and other users in the Slack workspace can use slash commands and shortcuts related to Incident Management.

You can declare an incident with the following slash command:

```
/datadog incident
```

To declare an incident from a Slack message, hover over the message, click **More actions** (the three vertical dots), and select **Declare incident**. Datadog posts a message to the message's thread confirming the incident's creation.

By default, only Slack users connected to a Datadog organization can declare incidents. Slack users can connect to a Datadog organization by running `/datadog connect`.

To allow any Slack user or non-guest Slack user to declare incidents in your Slack workspace, enable **Allow Slack users to declare incidents without a connected Datadog account** in Incident Management settings.

## Incident channels

You can configure Incident Management to automatically create a dedicated Slack channel for each incident that meets your defined criteria. Your responders can then manage the incident directly from Slack.

To enable incident channels, go to [**Incidents** > **Settings** > **Integrations**][3] and enable **Create Slack channels for incidents**.

The **channel name template** you define determines how Datadog names the incident channels it creates. The following variables are available in channel name templates:

* `{{public_id}}`: Incident's numeric ID
* `{{title}}`: Incident's title
* `{{created}}`: Incident's creation date in format MM_DD_YYYY
* `{{yyyy}}`: Incident's four-digit creation year
* `{{mm}}`: Incident's two-digit creation month
* `{{dd}}`: Incident's two-digit creation day of month
* `{{random_adjective}}`: Random adjective
* `{{random_noun}}`: Random noun

### Slack commands in the incident channel

In an incident Slack channel, you can run Slack commands to manage the incident. These commands allow you to change the incident's states and severity, assign responder roles, and page on-call teams.

For a full list of Slack commands, see the [Incident commands](#incident-commands) section.

### Message syncing (Slack mirroring)

After enabling automatic channel creation, you can configure Incident Management to sync messages between an incident Slack channel and the incident's timeline in Datadog.

To enable syncing, enable "Push Slack channel messages to the incident timeline" in Incident Management settings, and then select one of the following options:

* **Mirror all messages in real-time**: Datadog syncs all messages posted by Slack users to the incident channel.
* **Push message when 📌 is added as a reaction**: Datadog syncs messages only when Slack users react to them with pushpins (📌).

For both options, a message's author does not need to be connected to the Datadog organization for Datadog to sync the message. For message pinning, the pinner **does** need to be connected to the Datadog organization for the message pinned to sync.

In organizations with usage-based Incident Management billing, authoring a message that is synced to Datadog does **not** make you a billable user for the current month. Pinning a message that is then synced **does** make you a billable user.

In organizations with seat-based Incident Management billing, you do not need a seat for Datadog to sync your messages to Incident Management. When you pin a message, you must have a seat for Datadog to sync the message you pinned.

## Global incident updates channel

A global incident updates channel provides your team with organization-wide visibility into the status of all incidents directly from your Slack workspace. Select which channel in your workspace to post these updates to, and the channel receives the following posts:

- Newly declared incidents.
- Changes to severity, status transition, and incident commander.
- Links to the [incident][4]'s overview page in app.
- Link to join dedicated incident Slack channels.

To set up a global incident updates channel:

1. In Datadog, navigate to the [**Incidents** > **Settings** > **Integrations**][3] page.
2. In the Slack section, click the **Send all incident updates to a global channel** toggle.
3. Select the Slack workspace and Slack channel where you want the incident updates to be posted.

## Other Slack configuration options

Access all configuration options for Slack in Incident Management through the [**Incidents** > **Settings** > **Integrations**][3] page.

| Feature                                                                 | Description & Notes                                                                                                                                                                                                                                                                         |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Push incident timeline messages to Slack**                             | Automatically send incident timeline updates from Datadog to the Slack channel.<br><br>Keeps channel participants in sync with Datadog updates.                                                                                                                                            |
| **Add important links to channel bookmarks**                             | Post incident-related links in the Slack channel bookmarks.<br><br>Provides quick access to resources.                                                                                                                                                |
| **Add team members automatically**                                       | When a Datadog team is added to the incident, its members are added to the Slack channel.<br><br>Based on emails in Datadog Teams.                                                                                                                   |
| **Send incident updates to the Slack channel**                           | Update the channel topic and post updates when state, severity, or responders change.<br><br>Keeps channel metadata aligned with incident status.                                                                                                    |
| **Send a Slack notification when a meeting starts**                      | Notify the Slack channel when a meeting is started, with participants and a join link.<br><br>Enables quick access to incident calls.                                                                                                                |
| **Activate Bits AI in incident Slack channels**                          | Enable AI features that use incident context from Datadog.<br><br>Applies to all incident types in the selected Slack workspace.                                                                                                                     |
| **Automatically archive Slack channels after resolution**                | Close out incident Slack channels once the incident is resolved.<br><br>Helps reduce channel clutter.                                                                                                         |

## Slack incident commands

You can view the full list of available Slack commands at any time by typing `/dd help` or `/datadog help` in Slack. This will open the command reference directly in your Slack workspace. To open the action tray for common incident management actions, type `/datadog`.

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
      <td rowspan="3">Declare an incident</td>
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
    <!-- Manage -->
    <tr>
      <td rowspan="6">Manage an incident (run from an incident channel)</td>
      <td><code>/datadog incident update</code></td>
      <td>Update the incident state, severity, or other attribute of the incident.</td>
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
      <td>Manage the incident's response team (add responders and assign response roles).</td>
    </tr>
    <tr>
      <td><code>/datadog task</code></td>
      <td>Create a new incident task.</td>
    </tr>
    <tr>
      <td><code>/datadog task list</code></td>
      <td>List existing incident tasks.</td>
    </tr>
    <tr>
      <td>Other</td>
      <td><code>/datadog incident list</code></td>
      <td>List all open (active and stable) incidents.</td>
    </tr>
  </tbody>
</table>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/slack/
[2]: /integrations/slack/?tab=datadogforslack
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: /integrations/jira/
