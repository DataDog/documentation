---
title: Integrate Microsoft Teams with Datadog Incident Management
description: Integrate Microsoft Teams with Datadog Incident Management to automate incident channel creation, synchronize messages, and collaborate with your team directly within Microsoft Teams.
further_reading:
- link: "/service_management/incident_management/incident_settings/integrations"
  tag: "Documentation"
  text: "Incident Integrations Settings"
- link: "/integrations/microsoft-teams"
  tag: "Documentation"
  text: "Microsoft Teams Integration"
---

## Overview

The Microsoft Teams integration for Datadog Incident Management enables you to declare and manage incidents, automatically create incident channels, sync messages to timelines, and keep your team informed, all from within Microsoft Teams.

## Prerequisites

To use Incident Management's Microsoft Teams features, you must first [install the Microsoft Teams integration for Datadog][1] and connect your Microsoft Teams account to your Datadog account.

After installation, go to **[Incident Response > Incident Management > Settings > Integrations][2]** to configure the Microsoft Teams features for Incident Management.

## Incident channels

### Automatic channel creation

You can configure Incident Management to automatically create an incident Microsoft Teams channel for each incident or for incidents meeting criteria you define. To set up automatic incident channel creation:

1. Navigate to [Incident Settings][2] and select **Microsoft Teams**.
2. From the **Tenant** dropdown, select your connected Microsoft Teams tenant.
3. Toggle on **Automatically create a Microsoft Teams channel for every incident**.
4. Select the Team in which you want to automatically create new channels.
5. Save your settings.

After you enable this automation, you can define a **channel name template** for Datadog to follow when creating the channel. The following variables are available in channel name templates:

* `{{public_id}}`: Incident's numeric ID
* `{{title}}`: Incident's title
* `{{created}}`: Incident's creation date in format MM_DD_YYYY
* `{{yyyy}}`: Incident's four-digit creation year
* `{{mm}}`: Incident's two-digit creation month
* `{{dd}}`: Incident's two-digit creation day of month
* `{{random_adjective}}`: Random adjective
* `{{random_noun}}`: Random noun

### Channel message syncing

You can configure Incident Management to push all incident Microsoft Teams channel messages to the incident timeline.

The author of a synced message does not need an Incident Management or Incident Response seat for the message to be recorded. In organizations with usage-based billing for Incident Management, the author is not counted as a monthly active user.

### Automatic channel archiving

You can configure Incident Management to automatically archive an incident channel after the incident is resolved.

## Global channel for incident updates

Use an incident updates channel to provide your stakeholders with organization-wide visibility into the status of all incidents directly from Microsoft Teams.

1. In Datadog, navigate to **[Incident Response > Incident Management > Settings > Integrations][2]**.
1. Select the Microsoft Teams integration and enable **Send all incident updates to a global channel**.
1. Select the Team and channel where you want the incident updates to be posted.

Datadog automatically notifies the selected channel about any newly declared incidents, as well as changes to incident states, severities, and incident commanders.

To customize this behavior, deactivate this setting and [define a notification rule][4] instead.

## Microsoft Teams meetings

### One-click meeting creation

Delegated permissions are required for one-click Microsoft Teams meetings. To enable one-click Microsoft Teams meetings for incidents:

1. Navigate to [Incident Settings][2].
2. In Microsoft Teams, select your connected Microsoft Teams tenant.
3. Toggle on **Enable meeting creation**.
4. Save your settings.

After enabling one-click Microsoft Teams meetings, start a meeting by clicking **Start Teams Meeting** from the incident header. You are redirected to instantly join the meeting through the browser.

### Automatic meeting creation

Delegated permissions are required for automatic, criteria-based Microsoft Teams meetings. To enable automatic, criteria-based Microsoft Teams meetings for incidents:

1. Navigate to [Incident Settings][2].
2. In Microsoft Teams, select your connected Microsoft Teams tenant.
3. Toggle on **Enable meeting creation**.
   1. Toggle on **Automatically create Microsoft Teams meetings**.
   2. (Optional) Specify the incident criteria that creates a Microsoft Teams meeting. If left blank, any changes to an incident without an existing Microsoft Teams meeting will create a Microsoft Teams meeting.
4. Save your settings.

## Using the Datadog tab in Microsoft Teams

In an incident channel (a channel created specifically for an incident) the Datadog tab displays that specific incident's information and allows you to manage it. In non-incident channels, you can only declare new incidents.

### Declaring and managing incidents

To declare an incident from a specific team:
1. [Add the Datadog application][3] to the team.
1. In any **non-incident** channel, click on the **Datadog** tab.
1. Fill out the incident details and click **Declare Incident**.

To manage an incident from a specific team:
1. In an **incident channel**, click on the **Datadog** tab.
1. Edit the incident details and attributes.

### Sending messages to the timeline

Use the "More actions" menu on any message inside an incident team on the far right to send that message to the incident timeline.

## Microsoft Teams commands

You can view the full list of available commands at any time by typing `@Datadog help` in Microsoft Teams.

<table>
  <thead>
    <tr>
      <th scope="col">Category</th>
      <th scope="col">Command</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">Global commands (run anywhere)</td>
      <td><code>@Datadog incident</code></td>
      <td>Declare a new incident.</td>
    </tr>
    <tr>
      <td><code>@Datadog list incidents</code></td>
      <td>Show a list of all open incidents.</td>
    </tr>
    <tr>
      <td><code>@Datadog help</code></td>
      <td>Show all supported commands.</td>
    </tr>
  </tbody>
</table>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/microsoft-teams/?tab=datadogapprecommended
[2]: https://app.datadoghq.com/incidents/settings#Integrations
[3]: /integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[4]: /service_management/incident_management/incident_settings/notification_rules