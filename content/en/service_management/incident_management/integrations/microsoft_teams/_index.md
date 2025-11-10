---
title: Integrate Microsoft Teams with Datadog Incident Management
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

## Setup

To use Incident Management's Microsoft Teams features, you must first [install the Microsoft Teams integration for Datadog][1].

After installation, go to **[Service Management > Incidents > Settings > Integrations][2]** to configure the Microsoft Teams features for Incident Management.

## Declaring and managing incidents

### From the Datadog tab

To declare or manage an incident from a specific team:
1. [Add the Datadog application][3] to the team.
2. Add the **Datadog** tab to any channel in that team.
3. From this tab, declare incidents and manage existing ones (for example, update fields, impacts, and responders).

**Note**: In an incident channel, the tab shows and lets you manage the incident associated with that channel. In other channels, you can only declare new incidents.

### Using @mentions

To declare a new incident from Microsoft Teams using @mentions:

1. Start a conversation in a channel in any team, or a chat with the Datadog app.
2. Type `@Datadog incident`.
3. An adaptive card appears. Click the **Declare Incident** button to open the Datadog tab and declare an incident.

**Note**: A user must connect their Microsoft Teams account to their Datadog account to declare an incident.

### Updating incidents

To update an incident:

1. Start a conversation while in an incident team.
2. Type `@Datadog` or use the `...` button to open the **Messaging extensions** menu and select the **Datadog** App.
3. Select **Update Incident**.
4. Complete the form with your desired information.
5. Click **Update**.

### Listing incidents

List all open (active and stable) incidents with:

```
@Datadog list incidents
```

### Sending messages to the timeline

Use the "More actions" menu on any message inside an incident team on the far right to send that message to the incident timeline.

## Incident channels

### Automatic channel creation

You can configure Incident Management to automatically create an incident Microsoft Teams channel for each incident or for incidents meeting criteria you define.

To set up automatic incident channel creation:

1. Navigate to [Incident Settings][4].
2. Under the Microsoft Teams section, select your connected Microsoft Teams tenant.
3. Toggle on **Automatically create a Microsoft Teams channel for every incident**.
4. Select the Team in which you want to automatically create new channels.
5. Save your settings.

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Microsoft Teams Incident Update Channel Settings." >}}

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

## Microsoft Teams meetings

### One-click meeting creation

Delegated permissions are required for one-click Microsoft Teams meetings. To enable one-click Microsoft Teams meetings for incidents:

1. Navigate to [Incident Settings][4].
2. Under the Microsoft Teams section, select your connected Microsoft Teams tenant.
3. Toggle on **Enable meeting creation**.
4. Save your settings.

After enabling one-click Microsoft Teams meetings, start a meeting by clicking **Start Teams Meeting** from the incident header. You are redirected to instantly join the meeting through the browser.

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

<!-- ![ms_teams_one_click_meeting](images/microsoft_teams_create_one_click_meetings.png) -->

### Automatic meeting creation

Delegated permissions are required for automatic, criteria-based Microsoft Teams meetings. To enable automatic, criteria-based Microsoft Teams meetings for incidents:

1. Navigate to [Incident Settings][4].
2. Under the Microsoft Teams section, select your connected Microsoft Teams tenant.
3. Toggle on **Enable meeting creation**.
   1. Toggle on **Automatically create Microsoft Teams meetings**.
   2. (Optional) Specify the incident criteria that creates a Microsoft Teams meeting. If left blank, any changes to an incident without an existing Microsoft Teams meeting will create a Microsoft Teams meeting.
4. Save your settings.

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

<!-- ![ms_teams_automatic_meeting](images/microsoft_teams_enable_automatic_meeting_creation.png) -->

## Incident updates channel

Using an incident updates channel provides your stakeholders with organization-wide visibility into the status of all incidents directly from Microsoft Teams. Select which team and channel in your account to post these updates to, and the channel receives the following posts:

- Newly declared incidents
- Changes to severity, status transition, and incident commander
- Links to the incident's overview page in App
- Link to join the dedicated incident team

To customize this behavior, deactivate this setting and [define a notification rule][5] instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/microsoft-teams/?tab=datadogapprecommended
[2]: https://app.datadoghq.com/incidents/settings#Integrations
[3]: /integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[4]: /incidents/settings#Integrations
[5]: /service_management/incident_management/incident_settings/notification_rules
