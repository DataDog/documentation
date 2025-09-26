---
title: Slack
description: "Integrate Datadog Incident Management with Slack to automate incident workflows, enable team collaboration, and streamline communication in your existing Slack channels."
further_reading:
- link: "/service_management/incident_management/incident_settings/integrations"
  tag: "Documentation"
  text: "Incident Settings: Integrations"
- link: "/integrations/slack/"
  tag: "Documentation"
  text: "Slack Integration"
---

## Overview

The Datadog Incident Management Slack integration enables seamless incident response workflows within your Slack workspace. Teams can declare incidents, manage responses, and coordinate communications without leaving their familiar collaboration environment.

Key features include:

- **Incident declaration**: Declare incidents directly from Slack using slash commands or message shortcuts
- **Automatic channel creation**: Create dedicated incident channels for focused collaboration
- **Real-time sync**: Bidirectional message synchronization between Slack and Datadog incident timelines
- **Command management**: Use slash commands to update incidents, manage responders, and create tasks
- **Global notifications**: Send incident updates to designated channels across your workspace

## Prerequisites

Before configuring Incident Management's Slack features, you must:

1. [Install the Slack integration for Datadog][3] from the integrations library
2. Have appropriate permissions to configure integrations in your Datadog organization
3. Be a Slack workspace administrator or have permissions to install apps in your workspace

## Setup

After installing the Slack integration, configure the Slack features for Incident Management:

1. Navigate to **[Service Management > Incidents > Settings > Integrations][2]**
2. Locate the Slack section and configure your desired settings

### Declaring incidents in Slack

When you connect a Slack workspace to a Datadog organization, users in the workspace can use slash commands and shortcuts related to Incident Management:

* `/datadog incident` declares an incident
* `/datadog incident test` declares a test incident (if test incidents are enabled for the incident type)
* `/datadog incident list` shows active and stable incidents

_Tip: You can start any Datadog slash command in Slack with `/dd` instead of `/datadog`._

To allow any Slack user or non-guest Slack user to declare incidents in your Slack workspace, enable "Allow Slack users to declare incidents without a connected Datadog account" in Incident Management settings.

You can also declare incidents directly from a Slack message. To do this, mouse over the Slack message, click the "More actions" button, and then select "Declare incident". When you declare an incident in this way, Datadog posts a message to the Slack message thread indicating that you declared an incident.

### Incident channels

#### Automatic channel creation

You can configure Incident Management to automatically create an incident Slack for each incident or for incidents meeting criteria you define.

After you enable this automation, you can define a **channel name template** for Datadog to follow when creating the channel. The following variables are available in channel name templates:

* `{{public_id}}`: Incident's numeric ID
* `{{title}}`: Incident's title
* `{{created}}`: Incident's creation date in format MM_DD_YYYY
* `{{yyyy}}`: Incident's four-digit creation year
* `{{mm}}`: Incident's two-digit creation month
* `{{dd}}`: Incident's two-digit creation day of month
* `{{random_adjective}}`: Random adjective
* `{{random_noun}}`: Random noun

#### Incident commands

You can run the following commands inside the incident Slack channel to manage the incident:

| Command                        | Description                                                                                                    |
|--------------------------------|----------------------------------------------------------------------------------------------------------------|
| `/datadog`                     | Summons the incident action tray, which you can use to perform common actions related to managing the incident |
| `/datadog incident update`     | Updates the channel's incident                                                                                 |
| `/datadog incident private`    | Converts the incident to a private incident (if private incidents are enabled for the incident type)           |
| `/datadog incident responders` | Allows you to add new responders and manage responder types                                                    |
| `/datadog page`                | Pages the [Datadog On-call][4] team you select                                                                 |
| `/datadog task`                | Creates a new incident task                                                                                    |
| `/datadog task list`           | Shows the incident's tasks                                                                                     |

_Tip: You can start any Datadog slash command in Slack with `/dd` instead of `/datadog`._

#### Channel message syncing

You can configure Incident Management to push all incident Slack channel messages to the incident timeline. Alternatively, you can configure it to sync a Slack message only when you add a 📌 reaction to it.

The author of a synced message does not need an Incident Management or Incident Response seat for the message to be recorded. In organizations with usage-based billing for Incident Management, the author is not counted as a monthly active user.

#### Other incident channel features

You can configure Incident Management to:

* Push incident timeline messages to the incident Slack channel
* Add important links to the incident Slack channel's bookmarks
* Add team members to the incident channel when a Datadog team is added to the incident
* Send a notification to the Slack channel when a meeting has been started
* Automatically archive an incident Slack channel after the incident is resolved

### Other Slack features

**Send incident updates to a global channel**: You can configure Incident Management to inform a selected channel when an incident's state, severity, title, or incident commander changes.

To customize this behavior, deactivate this setting and [define a notification rule][5] instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/incidents/settings#Integrations
[3]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: /service_management/on-call/
[5]: /service_management/incident_management/incident_settings/notification_rules