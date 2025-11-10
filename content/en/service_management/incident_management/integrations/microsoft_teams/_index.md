---
title: Integrate Microsoft Teams with Datadog Incident Management
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---
To use Incident Management's Microsoft Teams features, you must first [install the Microsoft Teams integration for Datadog][6].

After you do that, go to **[Service Management > Incidents > Settings > Integrations][2]** to configure the Microsoft Teams features for Incident Management.

### Declaring and managing incidents in Microsoft Teams

To declare or manage an incident from a specific team:
1. [Add the Datadog application][7] to the team.
2. Add the **Datadog** tab to any channel in that team. 
3. From this tab, declare incidents and manage existing ones (for example, update fields, impacts, and responders). 

**Note**: In an incident channel, the tab shows and lets you manage the incident associated with that channel. In other channels, you can only declare new incidents.

### Incident channels

#### Automatic channel creation

You can configure Incident Management to automatically create an incident Microsoft Teams channel for each incident or for incidents meeting criteria you define.

After you enable this automation, you can define a **channel name template** for Datadog to follow when creating the channel. The following variables are available in channel name templates:

* `{{public_id}}`: Incident's numeric ID
* `{{title}}`: Incident's title
* `{{created}}`: Incident's creation date in format MM_DD_YYYY
* `{{yyyy}}`: Incident's four-digit creation year
* `{{mm}}`: Incident's two-digit creation month
* `{{dd}}`: Incident's two-digit creation day of month
* `{{random_adjective}}`: Random adjective
* `{{random_noun}}`: Random noun

#### Channel message syncing

You can configure Incident Management to push all incident Microsoft Teams channel messages to the incident timeline.

The author of a synced message does not need an Incident Management or Incident Response seat for the message to be recorded. In organizations with usage-based billing for Incident Management, the author is not counted as a monthly active user.

#### Other incident channel features

You can configure Incident Management to:

* Automatically archive an incident channel after the incident is resolved

### Other Microsoft Teams features

*Send incident updates to a global channel*: You can configure Incident Management to notify a selected channel when an incident's state, severity, title, or incident commander changes.

To customize this behavior, deactivate this setting and [define a notification rule][5] instead.

## Other integrations

In addition to integrating with Slack and Microsoft Teams, Incident Management also integrates with:

- [PagerDuty][8] and [Opsgenie][9] to send incident notifications to your on-call engineers.
- [CoScreen][10] to launch collaborative meetings with multi-user screen sharing, remote control, and built-in audio and video chat.
- [Jira][11] to create a Jira ticket for an incident.
- [Webhooks][12] to send incident notifications using webhooks (for example, [sending SMS to Twilio][13]).
- [Statuspage][14] to create and update Statuspage incidents.
- [ServiceNow][15] to create a ServiceNow ticket for an incident.
- [Zoom][16] to create Zoom meetings for an incident.

---

Integrations page 

### Incident Usage

#### Incidents

To declare a new incident from Microsoft Teams:

1. Start a conversation in a channel in any team, or a chat with the Datadog app.
2. Type `@Datadog incident`
3. An adaptive card appears. Click the **Declare Incident** button to open the Datadog tab and declare an incident.

A user must connect their Microsoft Teams account to their Datadog account to declare an incident.

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

1. Navigate to [Incidents Settings][304].
2. Under the Microsoft Teams section, select your connected Microsoft Teams tenant.
3. Toggle on **Automatically create a Microsoft Teams channel for every incident**.
4. Select the Team in which you want to automatically create new channels.
5. Save your settings.

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Microsoft Teams Incident Update Channel Settings." >}}

#### Enabling one-click Microsoft Teams meetings

Delegated permissions are required for one-click Microsoft Teams meetings. To enable one-click Microsoft Teams meetings for incidents:

1. Navigate to [Incident Settings][304].
2. Under the Microsoft Teams section, select your connected Microsoft Teams tenant.
3. Toggle on **Enable meeting creation**.
4. Save your settings.

After enabling one-click Microsoft Teams meetings, start a meeting by clicking **Start Teams Meeting** from the incident header.

You are redirected to instantly join the meeting through the browser.

![ms_teams_one_click_meeting](images/microsoft_teams_create_one_click_meetings.png)

#### Enabling automatic meeting creation

Delegated permissions are required for automatic, criteria-based Microsoft Teams meetings. To enable automatic, criteria-based Microsoft Teams meetings for incidents:

1. Navigate to [Incident Settings][304].
2. Under the Microsoft Teams section, select your connected Microsoft Teams tenant.
3. Toggle on **Enable meeting creation**.
   1. Toggle on **Automatically create Microsoft Teams meetings**.
   2. (Optional) Specify the incident criteria that creates a Microsoft Teams meeting. If left blank, any changes to an incident without an existing Microsoft Teams meeting will create a Microsoft Teams meeting.
4. Save your settings.

![ms_teams_automatic_meeting](images/microsoft_teams_enable_automatic_meeting_creation.png)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
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

[301]: https://docs.datadoghq.com/monitors/notify/#notification
[302]: https://docs.datadoghq.com/help/
[303]: /integrations/microsoft-teams
[304]: /incidents/settings#Integrations
[305]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[306]: https://learn.microsoft.com/en-us/graph/permissions-reference
[307]: https://docs.datadoghq.com/dashboards/sharing/scheduled_reports/
[308]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[309]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[3010]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3011]: https://learn.microsoft.com/en-us/graph/permissions-overview